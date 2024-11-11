import { useState, useEffect } from 'react'
import { openDB, DBSchema, IDBPDatabase } from 'idb'

const CACHE_PREFIX = 'chris-tyt-'
const DEFAULT_CACHE_TIME = 5 * 60 * 1000 // 5 minutes
const IMAGE_CACHE_TIME = 24 * 60 * 60 * 1000 // 24 hours
const DB_NAME = 'chris-tyt-cache'
const STORE_NAME = 'images'

interface CacheItem<T> {
  data: T
  timestamp: number
}

interface ImageCache extends DBSchema {
  images: {
    key: string
    value: {
      data: Blob
      timestamp: number
    }
  }
}

let db: IDBPDatabase<ImageCache> | null = null

async function getDB() {
  if (!db) {
    db = await openDB<ImageCache>(DB_NAME, 1, {
      upgrade(db) {
        db.createObjectStore(STORE_NAME)
      },
    })
  }
  return db
}

export function setCachedData<T>(key: string, data: T): void {
  const item: CacheItem<T> = {
    data,
    timestamp: Date.now()
  }
  try {
    localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(item))
  } catch (e) {
    console.warn('Failed to cache data:', e)
  }
}

export function getCachedData<T>(key: string, maxAge = DEFAULT_CACHE_TIME): T | null {
  try {
    const item = localStorage.getItem(`${CACHE_PREFIX}${key}`)
    if (!item) return null

    const parsedItem: CacheItem<T> = JSON.parse(item)
    if (Date.now() - parsedItem.timestamp > maxAge) {
      localStorage.removeItem(`${CACHE_PREFIX}${key}`)
      return null
    }

    return parsedItem.data
  } catch (e) {
    console.warn('Failed to retrieve cached data:', e)
    return null
  }
}

export async function clearCache(): Promise<void> {
  // Clear localStorage
  Object.keys(localStorage)
    .filter(key => key.startsWith(CACHE_PREFIX))
    .forEach(key => localStorage.removeItem(key))
  
  // Clear IndexedDB
  try {
    const db = await getDB()
    await db.clear(STORE_NAME)
  } catch (e) {
    console.warn('Failed to clear image cache:', e)
  }
}

async function getCachedImageBlob(url: string): Promise<Blob | null> {
  try {
    const db = await getDB()
    const cache = await db.get(STORE_NAME, url)
    
    if (!cache || Date.now() - cache.timestamp > IMAGE_CACHE_TIME) {
      if (cache) {
        await db.delete(STORE_NAME, url)
      }
      return null
    }
    
    return cache.data
  } catch (e) {
    console.warn('Failed to get cached image:', e)
    return null
  }
}

async function setCachedImageBlob(url: string, blob: Blob): Promise<void> {
  try {
    const db = await getDB()
    await db.put(STORE_NAME, {
      data: blob,
      timestamp: Date.now()
    }, url)
  } catch (e) {
    console.warn('Failed to cache image:', e)
  }
}

export async function cacheImage(url: string): Promise<string> {
  try {
    // Check IndexedDB cache first
    const cachedBlob = await getCachedImageBlob(url)
    if (cachedBlob) {
      return URL.createObjectURL(cachedBlob)
    }

    // Fetch through proxy if not cached
    const proxyUrl = `/api/proxy/image?url=${encodeURIComponent(url)}`
    const response = await fetch(proxyUrl)
    const blob = await response.blob()
    
    // Cache the blob
    await setCachedImageBlob(url, blob)
    
    // Return object URL
    return URL.createObjectURL(blob)
  } catch (e) {
    console.warn('Failed to cache image:', e)
    return url
  }
}

export function useCachedImage(url: string | undefined) {
  const [cachedUrl, setCachedUrl] = useState<string | undefined>(url)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!url) {
      setIsLoading(false)
      return
    }

    let mounted = true
    const loadImage = async () => {
      try {
        setIsLoading(true)
        const cachedData = await cacheImage(url)
        if (mounted) {
          setCachedUrl(cachedData)
        }
      } catch (e) {
        console.warn('Failed to load cached image:', e)
        if (mounted) {
          setCachedUrl(url)
        }
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    loadImage()
    return () => {
      mounted = false
      // Cleanup object URL if it exists
      if (cachedUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(cachedUrl)
      }
    }
  }, [url])

  return { cachedUrl, isLoading }
}