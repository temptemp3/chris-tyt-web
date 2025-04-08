'use client'

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface DropdownProps {
  triggerText: string 
  triggerIcon?: React.ReactNode 
  subText?: string 
  items: { label: string; onClick: () => void }[] 
  onMainClick: () => void 
  className?: string
}

export const Dropdown = ({ triggerText, triggerIcon, subText, items, onMainClick, className }: DropdownProps) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggleDropdown = () => setIsOpen((prev) => !prev)
  const closeDropdown = () => setIsOpen(false)

  return (
    <div className={cn("relative inline-flex flex-col items-center", className)}>
 
      <Button
        onClick={onMainClick} 
        className="inline-flex items-center justify-between gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md"
      >
        {triggerIcon}
        <span>{triggerText}</span>
        <span
          className="ml-2 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation() 
            toggleDropdown()
          }}
        >
          ▼
        </span>
      </Button>
      {subText && (
        <span className="text-xs text-gray-500 mt-1">{subText}</span>
      )}
      {isOpen && (
        <div
          className="absolute top-full mt-2 bg-white shadow-md border rounded-md z-10 w-full"
          onBlur={closeDropdown}
        >
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.onClick()
                closeDropdown()
              }}
              className="block px-4 py-2 text-left w-full text-sm hover:bg-gray-200"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}