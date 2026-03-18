import { Button } from "@/components/ui/button"

export function RevenueChart() {
  return (
    <div className="lg:col-span-2 bg-surface-container-low rounded-[0.75rem] p-10 overflow-hidden relative">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="font-inter font-medium text-[1.125rem] text-primary">Revenue Trends</h3>
          <p className="font-inter text-[0.875rem] text-on-surface-variant">Quarterly growth analysis</p>
        </div>
        <Button className="bg-primary text-on-primary rounded-full font-inter text-xs font-semibold px-6 hover:scale-95 duration-150 transition-transform">
          EXPORT DATA
        </Button>
      </div>
      {/* Mock Chart Visualization */}
      <div className="h-64 flex items-end justify-between gap-4 mt-8">
        <div className="flex-1 bg-surface-container-highest rounded-t-xl hover:bg-primary transition-colors duration-300 h-[40%]"></div>
        <div className="flex-1 bg-surface-container-highest rounded-t-xl hover:bg-primary transition-colors duration-300 h-[65%]"></div>
        <div className="flex-1 bg-surface-container-highest rounded-t-xl hover:bg-primary transition-colors duration-300 h-[50%]"></div>
        <div className="flex-1 bg-primary rounded-t-xl h-[85%]"></div>
        <div className="flex-1 bg-surface-container-highest rounded-t-xl hover:bg-primary transition-colors duration-300 h-[60%]"></div>
        <div className="flex-1 bg-surface-container-highest rounded-t-xl hover:bg-primary transition-colors duration-300 h-[75%]"></div>
        <div className="flex-1 bg-surface-container-highest rounded-t-xl hover:bg-primary transition-colors duration-300 h-[90%]"></div>
      </div>
      <div className="flex justify-between mt-4 font-label text-[0.6875rem] text-on-surface-variant uppercase tracking-widest">
        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
      </div>
    </div>
  )
}
