'use client'

import { Button } from "@/components/ui/button"
import { Copy, CheckCircle2 } from "lucide-react"
import * as Tooltip from '@radix-ui/react-tooltip'
import { formatAddress } from "@/lib/utils"
import { useClipboard } from "@/hooks/useClipboard"

interface CopyableAddressProps {
  address: string
  name?: string
  truncateLength?: number
  variant?: 'address' | 'numeric' | 'name'
}

export function CopyableAddress({ 
  address, 
  name,
  truncateLength = 8,
  variant = 'address',
}: CopyableAddressProps) {
  const { copy, copied } = useClipboard()
  
  const displayValue = variant === 'address' 
    ? formatAddress(address, truncateLength)
    : variant === 'name' ? !!name ? name : formatAddress(address, truncateLength) : address

  return (
    <div className="flex items-center gap-2">
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <span className={`cursor-help ${variant === 'address' ? 'font-mono' : ''}`}>
            {displayValue}
          </span>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="bg-black/90 text-white px-3 py-1.5 rounded-md text-sm font-mono"
            sideOffset={5}
          >
            {address}
            <Tooltip.Arrow className="fill-black/90" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 hover:bg-background hover:text-primary"
        onClick={() => copy(address)}
        title="Copy"
      >
        {copied(address) ? (
          <CheckCircle2 className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}