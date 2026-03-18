import { MetricCard } from "@/components/dashboard/MetricCard"
import { RevenueChart } from "@/components/dashboard/RevenueChart"
import { ActivityStream } from "@/components/dashboard/ActivityStream"
import { ExecutiveInsights } from "@/components/dashboard/ExecutiveInsights"
import { GlobalReach } from "@/components/dashboard/GlobalReach"

export default function DashboardOverview() {
  return (
    <main className="max-w-[1440px] mx-auto px-6 py-12">
      {/* Header Section */}
      <section className="mb-12">
        <p className="font-inter font-semibold text-[0.6875rem] uppercase tracking-wider text-on-surface-variant mb-2">
          Systems Overview
        </p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="font-manrope font-semibold text-[1.75rem] tracking-tight text-primary">
            Performance Dashboard
          </h2>
          <a href="/sales" className="bg-primary text-on-primary px-8 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20 border border-primary/10 w-fit drop-shadow-xl group">
            <span className="material-symbols-outlined text-[20px] group-hover:rotate-12 transition-transform duration-300">payments</span>
            New Transaction Record
          </a>
        </div>
      </section>

      {/* KPI Metric Slates - Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <MetricCard 
          title="Total Sales"
          value="$124,500"
          trend="+12.5%"
          isPositive={true}
          progress={75}
        />
        <MetricCard 
          title="Active Users"
          value="8,294"
          trend="+4.2%"
          isPositive={true}
          progress={40}
        />
        <MetricCard 
          title="Conversion"
          value="3.82%"
          trend="-0.4%"
          isPositive={false}
          progress={15}
        />
        <MetricCard 
          title="SLA Health"
          value="99.9%"
          isPulsing={true}
          progress={100}
        />
      </div>

      {/* Asymmetric Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <RevenueChart />
        <ActivityStream />
      </div>

      {/* Secondary Section */}
      <section className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <ExecutiveInsights />
        <GlobalReach />
      </section>
    </main>
  )
}
