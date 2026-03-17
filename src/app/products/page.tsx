export default function ProductManagement() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      {/* Header & Primary Action */}
      <section className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="space-y-2">
          <h2 className="font-headline font-semibold text-[1.75rem] tracking-tight text-primary">Inventory Assets</h2>
          <p className="text-on-surface-variant body-md max-w-md">Curating and managing the global product catalog with architectural precision.</p>
        </div>
        <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/10">
          <span className="material-symbols-outlined">add</span>
          Add Product
        </button>
      </section>

      {/* Bento Filter Bar */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
        <div className="md:col-span-6 bg-surface-container-lowest rounded-full px-6 py-3 flex items-center gap-3 shadow-sm border border-outline-variant/10">
          <span className="material-symbols-outlined text-outline">search</span>
          <input className="bg-transparent border-none focus:ring-0 w-full text-body-md placeholder:text-outline-variant outline-none" placeholder="Search by name, SKU or category..." type="text" />
        </div>
        <div className="md:col-span-3 bg-surface-container-lowest rounded-full px-6 py-3 flex items-center justify-between shadow-sm cursor-pointer hover:bg-surface-container-high transition-colors border border-outline-variant/10">
          <span className="text-on-surface-variant body-md">Category: All</span>
          <span className="material-symbols-outlined text-outline">expand_more</span>
        </div>
        <div className="md:col-span-3 bg-surface-container-lowest rounded-full px-6 py-3 flex items-center justify-between shadow-sm cursor-pointer hover:bg-surface-container-high transition-colors border border-outline-variant/10">
          <span className="text-on-surface-variant body-md">Stock Status</span>
          <span className="material-symbols-outlined text-outline">filter_list</span>
        </div>
      </section>

      {/* Product Grid (High-End Asymmetric Layout) */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Product Card 1 */}
        <div className="group bg-surface-container-lowest rounded-[0.75rem] overflow-hidden flex flex-col transition-all hover:shadow-lg p-2 border border-outline-variant/10">
          <div className="relative h-64 w-full rounded-[0.5rem] overflow-hidden bg-surface-container-low">
            <img alt="Smart Watch" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsk2RQwnkzPx-2Oj8RM2QFEA-8e1db5TYbfS0pBWhFJXZKQTUlV-7f2i9O-6WQ8_t2BQG1sMStf3xteEzj6eYtM9edjvrk4nK_vVqpWLZ3w_AzmB7wsYHZLaXGjO_zzr3pjRd5mDSK7Ra0elVjh7wkSbpZv9f3izWpWk_gPZeUNv_sFJyHXs7FCSHxqOtBjPpQmws0aNdqIXPlLeCFhBMx0bc9288y4znPdZYdvf5AELS5T_tRD4-Qkpp35xu8DKaFng78jhnQ75g" />
            <div className="absolute top-4 right-6">
              <span className="bg-primary-fixed text-on-primary-fixed text-[0.6875rem] font-semibold uppercase tracking-wider px-3 py-1 rounded-full">In Stock</span>
            </div>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-headline font-semibold text-lg text-primary">Chronos Elite V2</h3>
              <p className="font-headline font-bold text-lg text-primary">$299.00</p>
            </div>
            <p className="text-on-surface-variant text-sm mb-6 line-clamp-2">A masterclass in wearable engineering. Titanium chassis with sapphire glass.</p>
            <div className="flex items-center justify-between border-t border-surface-container pt-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-fixed"></span>
                <span className="text-label-sm uppercase tracking-tighter text-on-surface-variant">142 Units</span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors">
                  <span className="material-symbols-outlined text-[20px]">edit</span>
                </button>
                <button className="p-2 rounded-full hover:bg-error-container hover:text-error text-on-surface-variant transition-colors">
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Card 2 (Low Stock) */}
        <div className="group bg-surface-container-lowest rounded-[0.75rem] overflow-hidden flex flex-col transition-all hover:shadow-lg p-2 border border-outline-variant/10">
          <div className="relative h-64 w-full rounded-[0.5rem] overflow-hidden bg-surface-container-low">
            <img alt="Headphones" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCX0Ken5G_hUvfDgRc36hc_gDFhXd5Usy1A8aOgqIb4Jd3NGmUiksbDwBaZBta0cuqM-G456Bcjl-stZWesuRd47tR5H4tpMFYSfXr2FDotWM0dLcPn1Znxqt5dWtYumoZAe2tHoWgrMmE3ayMoVACf5Izwf_T7bMboXirEe4R1SiXxADFtUAGfUfxptYp2-KWEV-kgasBfTJHSz2TEXw0P2ZOwBWgPwwhzKc7qQgBAuFzJOH8h3wxy9AEa9U255GK1a4xlHfE3UT0" />
            <div className="absolute top-4 right-6">
              <span className="bg-tertiary-fixed text-on-tertiary-fixed text-[0.6875rem] font-semibold uppercase tracking-wider px-3 py-1 rounded-full">Low Stock</span>
            </div>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-headline font-semibold text-lg text-primary">Acoustic Pure X</h3>
              <p className="font-headline font-bold text-lg text-primary">$450.00</p>
            </div>
            <p className="text-on-surface-variant text-sm mb-6 line-clamp-2">Noise-canceling studio monitors with custom-tuned 50mm drivers.</p>
            <div className="flex items-center justify-between border-t border-surface-container pt-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-tertiary-fixed"></span>
                <span className="text-label-sm uppercase tracking-tighter text-on-surface-variant">8 Units Left</span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors">
                  <span className="material-symbols-outlined text-[20px]">edit</span>
                </button>
                <button className="p-2 rounded-full hover:bg-error-container hover:text-error text-on-surface-variant transition-colors">
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Card 3 (Out of Stock) */}
        <div className="group bg-surface-container-lowest rounded-[0.75rem] overflow-hidden flex flex-col transition-all hover:shadow-lg p-2 border border-outline-variant/10">
          <div className="relative h-64 w-full rounded-[0.5rem] overflow-hidden bg-surface-container-low opacity-75 grayscale-[0.5]">
            <img alt="Camera" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9jtrYiqYj0gNkbL-tfE6uDDkagfp-X3br9gx6NBg0is1vc1IS7V1Ea0zfh2Gqvi88mFMi0FZPz2tvFvZadJeXTiRowYuhzG5Hxvy3j8qMTnrrwKUC4T02OvEBBLYE9_RiyLv3pea2_2qZR2Pb6az-nQQ8dEXysQApRivCzGQkwWEHX-fiJvhtswDAQ2KLezlOpoxhrpntixzirYTmw2iy47ioEsbIYsfwOu4xoLxAyadl9wDoBwfNhuJpOJtSTVEpOjFd_ntC1wY" />
            <div className="absolute top-4 right-6">
              <span className="bg-error-container text-on-error-container text-[0.6875rem] font-semibold uppercase tracking-wider px-3 py-1 rounded-full">Out of Stock</span>
            </div>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-headline font-semibold text-lg text-primary">Lumix Retro G</h3>
              <p className="font-headline font-bold text-lg text-primary">$1,200.00</p>
            </div>
            <p className="text-on-surface-variant text-sm mb-6 line-clamp-2">Mirrorless technology wrapped in a 1970s aesthetics body.</p>
            <div className="flex items-center justify-between border-t border-surface-container pt-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-error"></span>
                <span className="text-label-sm uppercase tracking-tighter text-on-surface-variant">Restock Pending</span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors">
                  <span className="material-symbols-outlined text-[20px]">edit</span>
                </button>
                <button className="p-2 rounded-full hover:bg-error-container hover:text-error text-on-surface-variant transition-colors">
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4 (Landscape-style Highlight) */}
        <div className="md:col-span-2 group bg-surface-container-lowest rounded-[0.75rem] overflow-hidden flex flex-col md:flex-row transition-all hover:shadow-lg p-2 border border-outline-variant/10">
          <div className="relative h-64 md:h-auto md:w-2/5 rounded-[0.5rem] overflow-hidden bg-surface-container-low">
            <img alt="Sneakers" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBk_2AfAjKIkBPGaLXajS1SjjZBd5kk9gf6RI_Wk4Y2MQRFvIUbI18AQot9WayAdEJekjoMzwphvtJnFYhwi5JTlI5Z2Owxs-JaYN_Gw5t9yHcelsj944MS4iHSKpdRBTmueqexiJPBgz-RJuszVQ7MepeWviIFivcG5f6e3N2BAQIhs5n62YJrA_bfcgzkqtNb0Oal1-4j3j7phbwrD1tFmczN_Z0AzTkY6wlUdYxHdwrhn4X2P0RJEA0Z79KLpN14XQaC9qfzj8" />
          </div>
          <div className="p-8 md:w-3/5 flex flex-col justify-center">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-label-sm text-on-tertiary-container bg-tertiary-fixed px-2 py-0.5 rounded-sm mb-2 inline-block uppercase tracking-widest font-bold">Featured Listing</span>
                <h3 className="font-headline font-semibold text-2xl text-primary">Velocita Running S-1</h3>
              </div>
              <p className="font-headline font-bold text-2xl text-primary">$185.00</p>
            </div>
            <p className="text-on-surface-variant text-sm mb-8">Proprietary carbon-fiber plate technology designed for record-breaking marathon attempts. Lightweight mesh upper with maximum breathability.</p>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-label-sm text-outline-variant uppercase">Stock</span>
                  <span className="text-primary font-bold">48 Units</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-label-sm text-outline-variant uppercase">Sold (MTD)</span>
                  <span className="text-primary font-bold">312</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 bg-surface-container-high text-primary px-4 py-2 rounded-full font-semibold hover:bg-surface-container-highest transition-colors">
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Card 5 (Metric Tile) */}
        <div className="bg-primary text-on-primary rounded-[0.75rem] p-8 flex flex-col justify-between shadow-xl shadow-primary/20">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary">insights</span>
            </div>
            <h3 className="font-headline font-semibold text-xl">Inventory Value</h3>
            <p className="text-on-primary-container text-sm">Total valuation of current catalog holdings based on unit cost and availability.</p>
          </div>
          <div className="mt-8">
            <p className="text-label-sm text-on-primary-container uppercase tracking-widest">Global Assets</p>
            <p className="text-[2.5rem] font-headline font-bold">$1.24M</p>
          </div>
        </div>
      </section>
    </main>
  );
}
