export default function ActivityLogs() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12 pb-32 w-full">
      {/* Editorial Header Section */}
      <div className="mb-16">
        <span className="font-inter font-semibold text-[0.6875rem] uppercase tracking-wider text-on-surface-variant mb-2 block">System Audit Trail</span>
        <h2 className="font-manrope font-semibold text-[1.75rem] tracking-tight text-primary">Activity and History Logs</h2>
        <p className="font-inter text-[0.875rem] text-on-surface-variant mt-2 max-w-2xl">A curated stream of operational events, security escalations, and administrative modifications across the ecosystem.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
        {/* Main Log Feed */}
        <section className="space-y-6">
          {/* Grouping by Date: Today */}
          <div className="relative">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[0.6875rem] font-semibold uppercase tracking-widest text-on-surface-variant bg-surface-container-high px-3 py-1 rounded-full whitespace-nowrap">Today</span>
              <div className="h-[1px] flex-grow bg-surface-container-highest"></div>
            </div>

            <div className="space-y-4">
              {/* Log Entry 1: Security */}
              <div className="bg-surface-container-lowest p-6 rounded-[0.75rem] shadow-sm flex flex-col md:flex-row items-start gap-5 hover:bg-surface-container transition-colors duration-200 group border border-outline-variant/10">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-error-container text-on-error-container shrink-0">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
                </div>
                <div className="flex-grow w-full">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-inter font-semibold text-[1.125rem] text-primary">Failed Login Attempt</h3>
                    <span className="font-inter text-[0.6875rem] font-semibold uppercase tracking-wider text-on-surface-variant shrink-0 ml-2">14:22 PM</span>
                  </div>
                  <p className="font-inter text-[0.875rem] text-on-surface-variant mt-1">Multiple unauthorized access attempts detected from IP: 192.168.1.104. Automated block initiated.</p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 px-2 py-1 bg-surface-container-low rounded-md">
                      <img alt="System" className="w-4 h-4 rounded-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmMryIB6T9oXrbZpqtuPKNTatcneIq-_p4NyQtP6ge16Gz1FFOmy8APTpiIeWEHm6BYId7OibUDT8FTiWZhqx42uP90xN02tJUVfBP1Fb_pX8XXJgvSiK4GS-3h0ILNVEbstIpAJMrpIeX8OTjcUV-__UBNtaSb9b5yvI3C2qzfK3vgGjIV5RHMy3fwsjj1cEHxyu9YbSyi4FWpWn-lMxi9heYysFDHktDe9svFlRhhok8ljos2celsoIIemgCf25HMDJWIHuUpzU" />
                      <span className="text-[0.6875rem] font-medium text-on-surface">System Guard</span>
                    </div>
                    <span className="text-[0.6875rem] font-semibold text-on-tertiary-container bg-tertiary-fixed-dim/30 px-2 py-1 rounded-md">Security</span>
                  </div>
                </div>
              </div>

              {/* Log Entry 2: User Action */}
              <div className="bg-surface-container-lowest p-6 rounded-[0.75rem] shadow-sm flex flex-col md:flex-row items-start gap-5 hover:bg-surface-container transition-colors duration-200 group border border-outline-variant/10">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary-fixed text-primary shrink-0">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                </div>
                <div className="flex-grow w-full">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-inter font-semibold text-[1.125rem] text-primary">Inventory Update</h3>
                    <span className="font-inter text-[0.6875rem] font-semibold uppercase tracking-wider text-on-surface-variant shrink-0 ml-2">11:05 AM</span>
                  </div>
                  <p className="font-inter text-[0.875rem] text-on-surface-variant mt-1">Modified bulk pricing for the &quot;Q4 Executive Suite&quot; product line across 12 regional warehouses.</p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 px-2 py-1 bg-surface-container-low rounded-md">
                      <img alt="John Doe" className="w-4 h-4 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIOoJ5kurOgXj9whNA_mmYIP92SAMxIiIgZZL0SB9P2s242zo5uJdSeEGvh6HnJUeo4SgtJmw3_sdLm8FE12k6zlqK1KvaPlEtqfgDWyr1n-Y2mxwIAe-rG8XZdwBUke7DcLNOfwAphSzrhlU2rZwA2YmrRgv-1kmTVLbDc6F-rX3BVj9NSdRYtc5DWtJiWppPrXp44w6Py_rCKn4F4mnYo1PpDA-mlnnLP7UqhOCs9n7mSYQQVNHrCg6RxCX97uA_WHjIon5UxNs" />
                      <span className="text-[0.6875rem] font-medium text-on-surface">John Doe</span>
                    </div>
                    <span className="text-[0.6875rem] font-semibold text-primary/70 bg-secondary-fixed/50 px-2 py-1 rounded-md">Products</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grouping by Date: Yesterday */}
          <div className="relative mt-12">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[0.6875rem] font-semibold uppercase tracking-widest text-on-surface-variant bg-surface-container-high px-3 py-1 rounded-full whitespace-nowrap">Yesterday</span>
              <div className="h-[1px] flex-grow bg-surface-container-highest"></div>
            </div>

            <div className="space-y-4">
              {/* Log Entry 3: System Update */}
              <div className="bg-surface-container-lowest p-6 rounded-[0.75rem] shadow-sm flex flex-col md:flex-row items-start gap-5 hover:bg-surface-container transition-colors duration-200 group border border-outline-variant/10">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-secondary-container text-on-secondary-container shrink-0">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>cloud_done</span>
                </div>
                <div className="flex-grow w-full">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-inter font-semibold text-[1.125rem] text-primary">Cloud Sync Complete</h3>
                    <span className="font-inter text-[0.6875rem] font-semibold uppercase tracking-wider text-on-surface-variant shrink-0 ml-2">18:45 PM</span>
                  </div>
                  <p className="font-inter text-[0.875rem] text-on-surface-variant mt-1">Global database synchronization successfully finished. 4,200 records reconciled without conflicts.</p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 px-2 py-1 bg-surface-container-low rounded-md">
                      <span className="material-symbols-outlined text-[1rem]">settings_suggest</span>
                      <span className="text-[0.6875rem] font-medium text-on-surface">Cloud Engine</span>
                    </div>
                    <span className="text-[0.6875rem] font-semibold text-on-secondary-fixed-variant bg-secondary-fixed px-2 py-1 rounded-md">System</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sidebar Insights (Asymmetric Layout) */}
        <aside className="space-y-8">
          {/* Analytics Card */}
          <div className="bg-surface-container-low p-8 rounded-[0.75rem]">
            <h4 className="font-manrope font-semibold text-lg text-primary mb-6">Activity Volume</h4>
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <p className="font-inter text-[3.5rem] font-bold text-primary leading-none tracking-tighter">1,248</p>
                  <p className="font-inter font-semibold text-[0.6875rem] uppercase tracking-wider text-on-surface-variant mt-2">Logs this week</p>
                </div>
                <span className="text-error font-semibold flex items-center gap-1 mb-2">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                  12%
                </span>
              </div>

              <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden flex">
                <div className="bg-primary h-full w-[60%]"></div>
                <div className="bg-on-tertiary-container h-full w-[25%]"></div>
                <div className="bg-error h-full w-[15%]"></div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-[0.6875rem] font-medium text-on-surface-variant">Actions</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-on-tertiary-container"></div>
                  <span className="text-[0.6875rem] font-medium text-on-surface-variant">System</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-error"></div>
                  <span className="text-[0.6875rem] font-medium text-on-surface-variant">Security</span>
                </div>
              </div>
            </div>
          </div>

          {/* Active Filters / Actions */}
          <div className="bg-surface-container-lowest p-8 rounded-[0.75rem] shadow-[0px_16px_32px_rgba(25,28,30,0.06)] border border-outline-variant/10">
            <h4 className="font-manrope font-semibold text-lg text-primary mb-6">Refine Feed</h4>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 bg-surface-container-low rounded-xl text-primary font-medium hover:bg-surface-container-highest transition-all duration-200">
                <span className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-xl">filter_list</span>
                  Filter by Type
                </span>
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
              
              <button className="w-full flex items-center justify-between p-4 bg-surface-container-low rounded-xl text-primary font-medium hover:bg-surface-container-highest transition-all duration-200">
                <span className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-xl">calendar_today</span>
                  Date Range
                </span>
                <span className="material-symbols-outlined">chevron_right</span>
              </button>

              <button className="w-full mt-4 bg-primary text-on-primary py-4 rounded-xl font-semibold text-[0.875rem] tracking-wide hover:opacity-90 active:scale-95 transition-all">
                Export Log History
              </button>
            </div>
          </div>

          {/* System Health Pip */}
          <div className="flex items-center gap-4 px-6 py-4 bg-surface-container rounded-full">
            <div className="w-2 h-2 bg-primary-fixed-dim rounded-full animate-pulse"></div>
            <span className="text-[0.6875rem] font-semibold text-on-surface-variant uppercase tracking-widest">Real-time Stream: Active</span>
          </div>
        </aside>
      </div>
    </main>
  );
}
