'use client'

import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import * as Tooltip from '@radix-ui/react-tooltip'

interface RefreshButtonProps {
  onRefresh: () => void
  loading?: boolean
  lastRefresh: Date
}

export function RefreshButton({ onRefresh, loading, lastRefresh }: RefreshButtonProps) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Button
          variant="outline"
          size="icon"
          onClick={onRefresh}
          disabled={loading}
          className="relative"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          className="bg-black/90 text-white px-3 py-1.5 rounded-md text-sm"
          sideOffset={5}
        >
          Last refreshed: {lastRefresh.toLocaleTimeString()}
          <Tooltip.Arrow className="fill-black/90" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  )
}