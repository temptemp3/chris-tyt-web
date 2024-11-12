'use client'

import { useRef, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ContractGroup } from "@/types"

interface CollectionTabsProps {
  collections: ContractGroup[]
  activeContractId: number | null
  onSelect: (contractId: number) => void
}

export function CollectionTabs({ 
  collections, 
  activeContractId, 
  onSelect 
}: CollectionTabsProps) {
  const tabsRef = useRef<HTMLDivElement>(null)
  const [showLeftScroll, setShowLeftScroll] = useState(false)
  const [showRightScroll, setShowRightScroll] = useState(false)

  // Update scroll buttons visibility
  const checkScroll = () => {
    if (!tabsRef.current) return
    
    const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current
    setShowLeftScroll(scrollLeft > 0)
    setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 1)
  }

  // Handle scroll events and window resize
  useEffect(() => {
    const tabsElement = tabsRef.current
    if (!tabsElement) return

    const handleScroll = () => checkScroll()
    const handleResize = () => {
      checkScroll()
      scrollActiveTabIntoView()
    }

    // Initial check
    checkScroll()

    // Add event listeners
    tabsElement.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)

    return () => {
      tabsElement.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [collections])

  // Scroll active tab into view
  const scrollActiveTabIntoView = () => {
    if (!tabsRef.current || !activeContractId) return

    const activeTab = tabsRef.current.querySelector(
      `[data-contract-id="${activeContractId}"]`
    ) as HTMLElement

    if (!activeTab) return

    const { offsetLeft, offsetWidth } = activeTab
    const { scrollLeft, clientWidth } = tabsRef.current

    // Check if the active tab is not fully visible
    if (offsetLeft < scrollLeft || offsetLeft + offsetWidth > scrollLeft + clientWidth) {
      tabsRef.current.scrollTo({
        left: offsetLeft - (clientWidth - offsetWidth) / 2,
        behavior: 'smooth'
      })
    }
  }

  // Scroll active tab into view when it changes
  useEffect(() => {
    scrollActiveTabIntoView()
  }, [activeContractId])

  const scrollTabs = (direction: 'left' | 'right') => {
    if (!tabsRef.current) return
    
    const scrollAmount = direction === 'left' ? -200 : 200
    tabsRef.current.scrollBy({ 
      left: scrollAmount, 
      behavior: 'smooth' 
    })
  }

  // Don't render scroll buttons if there aren't enough collections
  if (collections.length <= 2) {
    return (
      <div className="flex border-b">
        {collections.map(collection => (
          <CollectionTab
            key={collection.contractId}
            collection={collection}
            isActive={collection.contractId === activeContractId}
            onClick={() => onSelect(collection.contractId)}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="relative">
      {showLeftScroll && (
        <ScrollButton 
          direction="left" 
          onClick={() => scrollTabs('left')} 
        />
      )}
      
      {showRightScroll && (
        <ScrollButton 
          direction="right" 
          onClick={() => scrollTabs('right')} 
        />
      )}

      <div 
        ref={tabsRef}
        className="flex overflow-x-auto scrollbar-hide border-b scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {collections.map(collection => (
          <CollectionTab
            key={collection.contractId}
            collection={collection}
            isActive={collection.contractId === activeContractId}
            onClick={() => onSelect(collection.contractId)}
          />
        ))}
      </div>
    </div>
  )
}

// Sub-components for better organization
interface ScrollButtonProps {
  direction: 'left' | 'right'
  onClick: () => void
}

function ScrollButton({ direction, onClick }: ScrollButtonProps) {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight
  const className = cn(
    "absolute top-0 bottom-0 z-10 h-full rounded-none bg-white/50 backdrop-blur-sm hover:bg-white/80",
    direction === 'left' ? "left-0 border-r" : "right-0 border-l"
  )

  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
    </Button>
  )
}

interface CollectionTabProps {
  collection: ContractGroup
  isActive: boolean
  onClick: () => void
}

function CollectionTab({ collection, isActive, onClick }: CollectionTabProps) {
  return (
    <button
      data-contract-id={collection.contractId}
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 whitespace-nowrap transition-colors min-w-fit",
        "hover:text-primary hover:bg-muted/50",
        isActive ? "border-b-2 border-primary font-medium" : "text-muted-foreground"
      )}
    >
      <span className="truncate">{collection.collectionName}</span>
      <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium min-w-[2rem] justify-center">
        {collection.nfts.length}
      </span>
    </button>
  )
}