'use client'

import { X } from "lucide-react"

interface ModalProps {
  onClose: () => void
  children: React.ReactNode
}

export function Modal({ onClose, children }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200"
          aria-label="Close modal"
        >
          <X className="h-6 w-6" />
        </button>
        {children}
      </div>
    </div>
  )
}