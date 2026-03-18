import { AddProductDialog } from "@/components/products/AddProductDialog"

export default function ProductManagement() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      {/* Header & Primary Action */}
      <section className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="space-y-2">
          <h2 className="font-headline font-semibold text-[1.75rem] tracking-tight text-primary">Inventory Assets</h2>
          <p className="text-on-surface-variant body-md max-w-md">Curating and managing the global product catalog with architectural precision.</p>
        </div>
        <AddProductDialog />
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
        <div className="group bg-surface-container-lowest rounded-[0.75rem] overflow-hidden flex flex-col transition-all hover:shadow-lg p-6 border border-outline-variant/10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="bg-primary-fixed text-on-primary-fixed text-[0.625rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm mb-2 inline-block">In Stock</span>
              <h3 className="font-headline font-semibold text-lg text-primary leading-tight">Chronos Elite V2</h3>
            </div>
            <p className="font-headline font-bold text-lg text-primary">$299.00</p>
          </div>
          <p className="text-on-surface-variant text-sm mb-6 line-clamp-2">A masterclass in wearable engineering. Titanium chassis with sapphire glass.</p>
          <div className="flex items-center justify-between border-t border-surface-container pt-4 mt-auto">
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

        {/* Product Card 2 (Low Stock) */}
        <div className="group bg-surface-container-lowest rounded-[0.75rem] overflow-hidden flex flex-col transition-all hover:shadow-lg p-6 border border-outline-variant/10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="bg-tertiary-fixed text-on-tertiary-fixed text-[0.625rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm mb-2 inline-block">Low Stock</span>
              <h3 className="font-headline font-semibold text-lg text-primary leading-tight">Acoustic Pure X</h3>
            </div>
            <p className="font-headline font-bold text-lg text-primary">$450.00</p>
          </div>
          <p className="text-on-surface-variant text-sm mb-6 line-clamp-2">Noise-canceling studio monitors with custom-tuned 50mm drivers.</p>
          <div className="flex items-center justify-between border-t border-surface-container pt-4 mt-auto">
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

        {/* Product Card 3 (Out of Stock) */}
        <div className="group bg-surface-container-lowest rounded-[0.75rem] overflow-hidden flex flex-col transition-all hover:shadow-lg p-6 border border-outline-variant/10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="bg-error-container text-on-error-container text-[0.625rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm mb-2 inline-block">Out of Stock</span>
              <h3 className="font-headline font-semibold text-lg text-primary leading-tight">Lumix Retro G</h3>
            </div>
            <p className="font-headline font-bold text-lg text-primary">$1,200.00</p>
          </div>
          <p className="text-on-surface-variant text-sm mb-6 line-clamp-2">Mirrorless technology wrapped in a 1970s aesthetics body.</p>
          <div className="flex items-center justify-between border-t border-surface-container pt-4 mt-auto">
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

        {/* Card 4 (Featured) */}
        <div className="group bg-surface-container-lowest rounded-[0.75rem] overflow-hidden flex flex-col transition-all hover:shadow-lg p-6 border border-outline-variant/10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-label-sm text-on-tertiary-container bg-tertiary-fixed px-2 py-0.5 rounded-sm mb-2 inline-block uppercase tracking-widest font-bold text-[0.625rem]">Featured Listing</span>
              <h3 className="font-headline font-semibold text-lg text-primary leading-tight">Velocita Running S-1</h3>
            </div>
            <p className="font-headline font-bold text-lg text-primary">$185.00</p>
          </div>
          <p className="text-on-surface-variant text-sm mb-6 line-clamp-2">Proprietary carbon-fiber plate technology designed for record-breaking marathon attempts.</p>
          <div className="flex items-center justify-between border-t border-surface-container pt-4 mt-auto">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] text-outline-variant uppercase font-bold">Stock</span>
                <span className="text-primary font-bold text-sm">48 Units</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-outline-variant uppercase font-bold">Sold (MTD)</span>
                <span className="text-primary font-bold text-sm">312</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors">
                <span className="material-symbols-outlined text-[20px]">edit</span>
              </button>
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
