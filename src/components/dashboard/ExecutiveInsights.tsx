import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function ExecutiveInsights() {
  return (
    <Card className="bg-primary p-10 rounded-[0.75rem] text-on-primary relative overflow-hidden border-none shadow-none">
      <CardContent className="p-0 relative z-10">
        <h4 className="font-manrope text-2xl font-bold mb-2">Executive Insights</h4>
        <p className="text-on-primary-container font-body text-sm mb-6 max-w-sm">
          AI-driven summary suggests optimizing supply chain routes for the upcoming Q3 peak.
        </p>
        <Button className="bg-white text-primary px-6 py-2 rounded-full font-bold text-xs uppercase tracking-wider hover:opacity-90 hover:bg-white/90">
          Review Insights
        </Button>
      </CardContent>
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-primary-container rounded-full opacity-50 blur-3xl"></div>
    </Card>
  )
}
