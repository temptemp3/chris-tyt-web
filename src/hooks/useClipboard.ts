import { useState, useCallback } from 'react'

interface UseClipboardOptions {
  /** How long to show the "copied" state in milliseconds */
  timeout?: number
}

export function useClipboard({ timeout = 2000 }: UseClipboardOptions = {}) {
  const [copiedText, setCopiedText] = useState<string | null>(null)

  const copy = useCallback(async (text: string) => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      console.error('Clipboard API is not available')
      return false
    }

    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      setTimeout(() => setCopiedText(null), timeout)
      return true
    } catch (err) {
      console.error('Failed to copy:', err)
      return false
    }
  }, [timeout])

  return {
    copiedText,
    copy,
    copied: (text: string) => copiedText === text,
  }
}