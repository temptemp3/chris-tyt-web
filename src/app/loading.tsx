export default function Loading() {
    return (
      <main className="min-h-screen bg-background py-12">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="animate-pulse space-y-6">
            <div className="h-64 bg-gray-200 rounded-lg"></div>
            <div className="h-32 bg-gray-200 rounded-lg"></div>
            <div className="h-96 bg-gray-200 rounded-lg"></div>
            <div className="h-64 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </main>
    )
  }