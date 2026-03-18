import { Globe } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function GlobalReach() {
  return (
    <Card className="bg-surface-container p-10 rounded-[0.75rem] border-none shadow-none">
      <CardContent className="p-0">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-manrope text-xl font-bold text-primary">Global Reach</h4>
          <Globe className="w-6 h-6 text-on-surface-variant" />
        </div>
        <div className="w-full h-32 rounded-xl bg-surface-container-highest flex items-center justify-center overflow-hidden">
          {/* Using img tag to match the original, but can be upgraded to next/image later if hostname is configured */}
          <img 
            alt="World map" 
            className="w-full h-full object-cover opacity-50 grayscale" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXRzuxBCgsTQQBYcYBmDAK88q2tnLd7HCWhJbfO7KRp6m51RDbLDvrLWt14qPxoSvwDK2AdJ0ZWApoNDl44k2ZsILC6kYhoNGgmtWVxU502QhOf-Ykojfw1mTc7F3uttIYRNz7uhq7hftcvwsww-gOD4Dt5WF5Ub_ULaSnlmF66gzXv2jZLkOMUhMGo_IuN6gq-j6Q_PULbfIbJOV2NjtGje_ZTq-VX_UR0jWrCv9TpL-XVPMuQrWGK1-0iWEozmCxeE9_q3wgriA" 
          />
        </div>
      </CardContent>
    </Card>
  )
}
