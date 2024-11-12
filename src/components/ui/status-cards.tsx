import { Card, CardContent } from "@/components/ui/card"

export function LoadingCard() {
  return (
    <Card className="mt-6">
      <CardContent className="p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      </CardContent>
    </Card>
  )
}

export function ErrorCard({ message }: { message: string }) {
  return (
    <Card className="mt-6">
      <CardContent className="p-8 text-center text-red-500">
        {message}
      </CardContent>
    </Card>
  )
}