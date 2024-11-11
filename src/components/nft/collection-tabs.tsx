'use client'

import { useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ContractGroup } from "@/types"

import { useState } from 'react'

interface CollectionTabsProps {
  collections: ContractGroup[]
  activeContractId: number | null
  onSelect: (contractId: number) => void
}

export function CollectionTabs({ collections, activeContractId, onSelect }: CollectionTabsProps) {
  const tabsRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Show/hide scroll buttons based on scroll position
  const [showLeftScroll, setShowLeftScroll] = useState(false)
  const [showRightScroll, setShowRightScroll] = useState(false)

  const checkScroll = () => {
    if (tabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current
      setShowLeftScroll(scrollLeft > 0)
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  // Update scroll buttons visibility on mount and when content changes
  useEffect(() => {
    checkScroll()
    const tabsElement = tabsRef.current
    if (tabsElement) {
      tabsElement.addEventListener('scroll', checkScroll)
      window.addEventListener('resize', checkScroll)
      return () => {
        tabsElement.removeEventListener('scroll', checkScroll)
        window.removeEventListener('resize', checkScroll)
      }
    }
  }, [collections])

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200
      tabsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  // Scroll active tab into view
  useEffect(() => {
    if (tabsRef.current && activeContractId) {
      const activeTab = tabsRef.current.querySelector(`[data-contract-id="${activeContractId}"]`)
      if (activeTab) {
        const { offsetLeft, offsetWidth } = activeTab as HTMLElement
        const { scrollLeft, clientWidth } = tabsRef.current
        
        // Check if the active tab is not fully visible
        if (offsetLeft < scrollLeft || offsetLeft + offsetWidth > scrollLeft + clientWidth) {
          tabsRef.current.scrollTo({
            left: offsetLeft - (clientWidth - offsetWidth) / 2,
            behavior: 'smooth'
          })
        }
      }
    }
  }, [activeContractId])

  return (
    <div className="relative" ref={containerRef}>
      {(collections.length > 2 && showLeftScroll) && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-0 bottom-0 z-10 h-full rounded-none border-r bg-white/50 backdrop-blur-sm hover:bg-white/80"
          onClick={() => scrollTabs('left')}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}
      {(collections.length > 2 && showRightScroll) && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 bottom-0 z-10 h-full rounded-none border-l bg-white/50 backdrop-blur-sm hover:bg-white/80"
          onClick={() => scrollTabs('right')}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
      <div 
        ref={tabsRef}
        className="flex overflow-x-auto scrollbar-hide border-b scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {collections.map(collection => (
          <button
            key={collection.contractId}
            data-contract-id={collection.contractId}
            onClick={() => onSelect(collection.contractId)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 whitespace-nowrap transition-colors min-w-fit",
              "hover:text-primary hover:bg-muted/50",
              activeContractId === collection.contractId ? 
                "border-b-2 border-primary font-medium" : 
                "text-muted-foreground"
            )}
          >
            <span className="truncate">{collection.collectionName}</span>
            <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium min-w-[2rem] justify-center">
              {collection.nfts.length}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}