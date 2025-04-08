'use client'

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface DropdownProps {
  triggerText: string // Main button text
  triggerIcon?: React.ReactNode // Icon for the button
  subText?: string // Small text under the button
  items: { label: string; onClick: () => void }[] // Dropdown items
  onMainClick: () => void // Function for main button click
  className?: string
}

// Main Dropdown Component
export const Dropdown = ({ triggerText, triggerIcon, subText, items, onMainClick, className }: DropdownProps) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggleDropdown = () => setIsOpen((prev) => !prev)
  const closeDropdown = () => setIsOpen(false)

  return (
    <div className={cn("relative inline-flex flex-col items-center", className)}>
      {/* Main Button */}
      <Button
        onClick={onMainClick} // Handles the "Roll the Dice" functionality
        className="inline-flex items-center justify-between gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md"
      >
        {triggerIcon}
        <span>{triggerText}</span>
        {/* Arrow as a separate clickable element */}
        <span
          className="ml-2 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation() // Prevent triggering the main button click
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