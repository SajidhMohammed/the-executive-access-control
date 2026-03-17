export default function DashboardOverview() {
  return (
    <main className="max-w-[1440px] mx-auto px-6 py-12">
      {/* Header Section */}
      <section className="mb-16">
        <p className="font-inter font-semibold text-[0.6875rem] uppercase tracking-wider text-on-surface-variant mb-2">Systems Overview</p>
        <h2 className="font-manrope font-semibold text-[1.75rem] tracking-tight text-primary">Performance Dashboard</h2>
      </section>

      {/* KPI Metric Slates - Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {/* Metric Slate 1 */}
        <div className="bg-surface-container-lowest editorial-shadow rounded-[0.75rem] p-8 flex flex-col items-start gap-4 hover:shadow-lg transition-shadow">
          <span className="font-inter font-semibold text-[0.6875rem] uppercase tracking-wider text-on-surface-variant">Total Sales</span>
          <div className="flex items-baseline gap-2">
            <span className="font-manrope font-bold text-4xl text-primary tracking-tight">$124,500</span>
            <span className="text-primary-fixed text-xs font-bold">+12.5%</span>
          </div>
          <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: '75%' }}></div>
          </div>
        </div>

        {/* Metric Slate 2 */}
        <div className="bg-surface-container-lowest editorial-shadow rounded-[0.75rem] p-8 flex flex-col items-start gap-4 hover:shadow-lg transition-shadow">
          <span className="font-inter font-semibold text-[0.6875rem] uppercase tracking-wider text-on-surface-variant">Active Users</span>
          <div className="flex items-baseline gap-2">
            <span className="font-manrope font-bold text-4xl text-primary tracking-tight">8,294</span>
            <span className="text-primary-fixed text-xs font-bold">+4.2%</span>
          </div>
          <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: '40%' }}></div>
          </div>
        </div>

        {/* Metric Slate 3 */}
        <div className="bg-surface-container-lowest editorial-shadow rounded-[0.75rem] p-8 flex flex-col items-start gap-4 hover:shadow-lg transition-shadow">
          <span className="font-inter font-semibold text-[0.6875rem] uppercase tracking-wider text-on-surface-variant">Conversion</span>
          <div className="flex items-baseline gap-2">
            <span className="font-manrope font-bold text-4xl text-primary tracking-tight">3.82%</span>
            <span className="text-error text-xs font-bold">-0.4%</span>
          </div>
          <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
            <div className="h-full bg-error" style={{ width: '15%' }}></div>
          </div>
        </div>

        {/* Metric Slate 4 */}
        <div className="bg-surface-container-lowest editorial-shadow rounded-[0.75rem] p-8 flex flex-col items-start gap-4 hover:shadow-lg transition-shadow">
          <span className="font-inter font-semibold text-[0.6875rem] uppercase tracking-wider text-on-surface-variant">SLA Health</span>
          <div className="flex items-baseline gap-2">
            <span className="font-manrope font-bold text-4xl text-primary tracking-tight">99.9%</span>
            <div className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse"></div>
          </div>
          <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>

      {/* Asymmetric Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Large Activity Visualization */}
        <div className="lg:col-span-2 bg-surface-container-low rounded-[0.75rem] p-10 overflow-hidden relative">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="font-inter font-medium text-[1.125rem] text-primary">Revenue Trends</h3>
              <p className="font-inter text-[0.875rem] text-on-surface-variant">Quarterly growth analysis</p>
            </div>
            <button className="bg-primary text-on-primary px-6 py-2 rounded-full font-inter text-xs font-semibold hover:scale-95 duration-150 transition-transform">EXPORT DATA</button>
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

        {/* Activity Stream */}
        <div className="bg-surface-container-lowest editorial-shadow rounded-[0.75rem] p-8">
          <h3 className="font-inter font-medium text-[1.125rem] text-primary mb-6">Recent Activity</h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-primary text-sm">inventory_2</span>
              </div>
              <div>
                <p className="font-inter text-[0.875rem] text-primary font-medium">New product added</p>
                <p className="font-inter text-[0.75rem] text-on-surface-variant">2 mins ago • SKU-9402</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-on-surface-variant text-sm">group</span>
              </div>
              <div>
                <p className="font-inter text-[0.875rem] text-primary font-medium">New user registered</p>
                <p className="font-inter text-[0.75rem] text-on-surface-variant">45 mins ago • Sarah J.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-on-tertiary-fixed text-sm">history_edu</span>
              </div>
              <div>
                <p className="font-inter text-[0.875rem] text-primary font-medium">Log report generated</p>
                <p className="font-inter text-[0.75rem] text-on-surface-variant">2 hours ago • Automated</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-error-container flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-error text-sm">warning</span>
              </div>
              <div>
                <p className="font-inter text-[0.875rem] text-primary font-medium">SLA Breach Warning</p>
                <p className="font-inter text-[0.75rem] text-on-surface-variant">5 hours ago • Node-04</p>
              </div>
            </div>
          </div>
          <button className="w-full mt-10 py-3 font-inter text-xs font-bold text-on-surface-variant uppercase tracking-widest border border-outline-variant/20 rounded-xl hover:bg-surface-container-low transition-colors">View All Activity</button>
        </div>
      </div>

      {/* Secondary Section */}
      <section className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-primary p-10 rounded-[0.75rem] text-on-primary relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="font-manrope text-2xl font-bold mb-2">Executive Insights</h4>
            <p className="text-on-primary-container font-body text-sm mb-6 max-w-sm">AI-driven summary suggests optimizing supply chain routes for the upcoming Q3 peak.</p>
            <button className="bg-white text-primary px-6 py-2 rounded-full font-bold text-xs uppercase tracking-wider hover:opacity-90">Review Insights</button>
          </div>
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-primary-container rounded-full opacity-50 blur-3xl"></div>
        </div>

        <div className="bg-surface-container p-10 rounded-[0.75rem]">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-manrope text-xl font-bold text-primary">Global Reach</h4>
            <span className="material-symbols-outlined text-on-surface-variant">public</span>
          </div>
          <div className="w-full h-32 rounded-xl bg-surface-container-highest flex items-center justify-center overflow-hidden">
            <img alt="World map" className="w-full h-full object-cover opacity-50 grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXRzuxBCgsTQQBYcYBmDAK88q2tnLd7HCWhJbfO7KRp6m51RDbLDvrLWt14qPxoSvwDK2AdJ0ZWApoNDl44k2ZsILC6kYhoNGgmtWVxU502QhOf-Ykojfw1mTc7F3uttIYRNz7uhq7hftcvwsww-gOD4Dt5WF5Ub_ULaSnlmF66gzXv2jZLkOMUhMGo_IuN6gq-j6Q_PULbfIbJOV2NjtGje_ZTq-VX_UR0jWrCv9TpL-XVPMuQrWGK1-0iWEozmCxeE9_q3wgriA" />
          </div>
        </div>
      </section>
    </main>
  );
}
