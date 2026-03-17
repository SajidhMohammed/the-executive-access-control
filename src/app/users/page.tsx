export default function UserAccounts() {
  return (
    <main className="flex-grow px-6 md:px-12 py-8 max-w-7xl mx-auto w-full">
      {/* Editorial Header */}
      <div className="mb-12">
        <h1 className="font-manrope font-semibold text-[1.75rem] tracking-tight text-primary">User Accounts</h1>
        <p className="font-inter text-[0.875rem] text-on-surface-variant mt-2 max-w-xl">
          Manage your organization&apos;s members, adjust their permission tiers, and monitor account status from a centralized editorial command.
        </p>
      </div>

      {/* Metric Slate (Asymmetric Insight) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="md:col-span-2 bg-surface-container-lowest p-6 rounded-[0.75rem] shadow-sm border border-outline-variant/15 hover:shadow-lg transition-all">
          <p className="font-inter font-semibold text-[0.6875rem] uppercase tracking-wider text-on-surface-variant mb-1">Active Personnel</p>
          <div className="flex items-end gap-3">
            <span className="font-manrope text-[3.5rem] font-bold leading-none text-primary">1,284</span>
            <span className="bg-primary-fixed text-on-primary-fixed text-[0.75rem] font-bold px-2 py-1 rounded-full mb-2">+12%</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-[0.75rem] shadow-sm border border-outline-variant/15 hover:shadow-lg transition-all">
          <p className="font-inter font-semibold text-[0.6875rem] uppercase tracking-wider text-on-surface-variant mb-1">Pending Invitations</p>
          <span className="font-manrope text-[2rem] font-bold text-primary">42</span>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-[0.75rem] shadow-sm border border-outline-variant/15 hover:shadow-lg transition-all">
          <p className="font-inter font-semibold text-[0.6875rem] uppercase tracking-wider text-on-surface-variant mb-1">Total Roles</p>
          <span className="font-manrope text-[2rem] font-bold text-primary">8</span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 bg-surface-container rounded-[0.75rem] p-2 pr-6">
        <div className="relative w-full md:w-96">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input className="w-full bg-surface-container-lowest rounded-[0.5rem] py-3 pl-12 pr-4 text-sm border-none focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none" placeholder="Search by name, email or role..." type="text" />
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <button className="flex items-center gap-2 bg-surface-container-lowest text-on-surface px-4 py-2 rounded-full text-sm font-medium hover:bg-surface-container-high transition-colors whitespace-nowrap">
            <span className="material-symbols-outlined text-lg">filter_list</span>
            All Roles
          </button>
          <button className="flex items-center gap-2 bg-surface-container-lowest text-on-surface px-4 py-2 rounded-full text-sm font-medium hover:bg-surface-container-high transition-colors whitespace-nowrap">
            <span className="material-symbols-outlined text-lg">radio_button_checked</span>
            Active Only
          </button>
          <div className="h-6 w-px bg-outline-variant/30 hidden md:block mx-2"></div>
          <button className="bg-primary text-on-primary px-6 py-2 rounded-full text-sm font-semibold hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 whitespace-nowrap">
            <span className="material-symbols-outlined text-lg">person_add</span>
            Invite User
          </button>
        </div>
      </div>

      {/* User List */}
      <div className="bg-surface-container-low rounded-[0.75rem] overflow-hidden p-1 shadow-sm border border-outline-variant/15">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-surface-container-low">
              <tr>
                <th className="px-8 py-4 font-inter font-semibold text-[0.6875rem] uppercase tracking-wider text-on-surface-variant">Member</th>
                <th className="px-8 py-4 font-inter font-semibold text-[0.6875rem] uppercase tracking-wider text-on-surface-variant">Role</th>
                <th className="px-8 py-4 font-inter font-semibold text-[0.6875rem] uppercase tracking-wider text-on-surface-variant">Status</th>
                <th className="px-8 py-4 font-inter font-semibold text-[0.6875rem] uppercase tracking-wider text-on-surface-variant">Last Active</th>
                <th className="px-8 py-4 font-inter font-semibold text-[0.6875rem] uppercase tracking-wider text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-surface-container-lowest">
              {/* User Row 1 */}
              <tr className="hover:bg-surface-container-low transition-colors group">
                <td className="px-8 py-5 border-b border-outline-variant/10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <img alt="Alex Morgan" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdOZbpyr2dE6OhLnGQULXu49UP_Ac6LF4hHXU6rmNFsP7m3LPOl7f1993kXEtzG3_RcyEfR94XxNW4XwZOLSFiwBY5yHdIlKG9Ql00zWDe-H9ApcXom9eXuyDx-iiaW-P-lOmN57Xi6Ex49xk90oe0dJPWN7CI7k0oqoY1UFgSRp8gszizEs9i2C1WUCR8wT83YsA3G9WM_MHr0_WzcXP--mJfz9RrhghhH3_0uiXQBQK8P8zihYFJWlaxZshMod6wKfSave4hQBo" />
                    </div>
                    <div>
                      <p className="font-inter font-semibold text-sm text-primary">Alex Morgan</p>
                      <p className="font-inter text-xs text-on-surface-variant">alex.m@executive.co</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 border-b border-outline-variant/10">
                  <span className="bg-primary-container text-on-primary-container text-[0.75rem] font-semibold px-3 py-1 rounded-full">Admin</span>
                </td>
                <td className="px-8 py-5 border-b border-outline-variant/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary-fixed"></span>
                    <span className="text-sm font-medium text-primary">Active</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-sm text-on-surface-variant border-b border-outline-variant/10">2 mins ago</td>
                <td className="px-8 py-5 text-right border-b border-outline-variant/10">
                  <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container-highest">settings</button>
                  <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container-highest">more_vert</button>
                </td>
              </tr>

              {/* User Row 2 */}
              <tr className="bg-surface-container-low/30 hover:bg-surface-container-low transition-colors group">
                <td className="px-8 py-5 border-b border-outline-variant/10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <img alt="Sarah Chen" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAt2EUrn6szeckch9pXSs8vLpvg2Y03NXTk6AIQjfN7P-MwkFSJpiyJ5Y8nYNYBXR7O5jRXjDZqpzeIw-WLjZV_i68cJNAdSo5MyZ0CYgbBgdTPYjz3x-4jFsjrZNjZnh_215yFvl-kyEZdB0utjK0zZJ5-VU6bg7wiQK8h1-xbYNdqOgYCUNigoy5EeLy9CnZd-Ef_El5gKjBo24YAt5NEffOp6rBBThH6WQgDy7rGdor5cUffU3IdHZmxZnwUNP5aFGGaJbf9nhY" />
                    </div>
                    <div>
                      <p className="font-inter font-semibold text-sm text-primary">Sarah Chen</p>
                      <p className="font-inter text-xs text-on-surface-variant">s.chen@executive.co</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 border-b border-outline-variant/10">
                  <span className="bg-secondary-container text-on-secondary-container text-[0.75rem] font-semibold px-3 py-1 rounded-full">Editor</span>
                </td>
                <td className="px-8 py-5 border-b border-outline-variant/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary-fixed"></span>
                    <span className="text-sm font-medium text-primary">Active</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-sm text-on-surface-variant border-b border-outline-variant/10">1 hour ago</td>
                <td className="px-8 py-5 text-right border-b border-outline-variant/10">
                  <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container-highest">settings</button>
                  <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container-highest">more_vert</button>
                </td>
              </tr>

              {/* User Row 3 */}
              <tr className="hover:bg-surface-container-low transition-colors group">
                <td className="px-8 py-5 border-b border-outline-variant/10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <img alt="David Miller" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlAGf0okqdyQpTNpI7N83gxfSuJe1YOVWynwZp9wrOhDYahpD-DgEMZtNxpCGuBj3d9UFieFCwYUzS9UqVDcypwPMmdbuTho5XUpZz2Bv4ibozBFTf-oXPa0DiCXBgUCG2VUdLFDATsijlbEGxgJ0PxhytInfRq1yBXNKSsDtIw437flRd0Yg6IC-K1yLHpI5cKbQJHl2LFkCd65D1ks_x6IfBjxDk61AMwWDQeXAgCQ7_2EeihfQN1Mo8yd9O4oNNJxak0T1wTtY" />
                    </div>
                    <div>
                      <p className="font-inter font-semibold text-sm text-primary">David Miller</p>
                      <p className="font-inter text-xs text-on-surface-variant">d.miller@executive.co</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 border-b border-outline-variant/10">
                  <span className="bg-surface-container-highest text-on-surface-variant text-[0.75rem] font-semibold px-3 py-1 rounded-full">Viewer</span>
                </td>
                <td className="px-8 py-5 border-b border-outline-variant/10">
                  <div className="flex items-center gap-2 opacity-60">
                    <span className="w-2 h-2 rounded-full bg-on-surface-variant"></span>
                    <span className="text-sm font-medium text-on-surface-variant">Inactive</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-sm text-on-surface-variant border-b border-outline-variant/10">3 days ago</td>
                <td className="px-8 py-5 text-right border-b border-outline-variant/10">
                  <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container-highest">settings</button>
                  <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container-highest">more_vert</button>
                </td>
              </tr>

              {/* User Row 4 */}
              <tr className="bg-surface-container-low/30 hover:bg-surface-container-low transition-colors group">
                <td className="px-8 py-5 border-b border-outline-variant/10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <img alt="Elena Rodriguez" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBwVD0XXo5hJdBv_3zC1ysw7yZ5pua3HKCF09ddRcQ18zoRgUAgZxQ87bdQLC0wHPhg4coURwczMi7fgb_R7bUnxNv5d0fWeWKWbBBCUzXwbeB3yGZHF-8njc9uEtJMYXGQMsfZdLT5aq6LnTvoGvjXAhlmSbTYWAkS4H2YGUXonw5ke-g_OIUXG3gUNrckPUyDGOhxQOPZNtkmCfUCXbV38CQjr5jZe__3z07t7AxjdzHmS9N1UL1Hn1WyG9hs6U19e0trYqjEzA" />
                    </div>
                    <div>
                      <p className="font-inter font-semibold text-sm text-primary">Elena Rodriguez</p>
                      <p className="font-inter text-xs text-on-surface-variant">elena.r@executive.co</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 border-b border-outline-variant/10">
                  <span className="bg-primary-container text-on-primary-container text-[0.75rem] font-semibold px-3 py-1 rounded-full">Admin</span>
                </td>
                <td className="px-8 py-5 border-b border-outline-variant/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary-fixed"></span>
                    <span className="text-sm font-medium text-primary">Active</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-sm text-on-surface-variant border-b border-outline-variant/10">Online</td>
                <td className="px-8 py-5 text-right border-b border-outline-variant/10">
                  <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container-highest">settings</button>
                  <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container-highest">more_vert</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-between bg-surface-container-lowest p-4 rounded-full border border-outline-variant/15">
        <span className="text-xs font-inter text-on-surface-variant px-4 min-w-[150px]">Showing 1 to 10 of 1,284 members</span>
        <div className="flex items-center gap-2 overflow-x-auto scroller-hidden">
          <button className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full hover:bg-surface-container-low text-on-surface-variant transition-colors">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          
          <div className="flex items-center gap-1">
            <button className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-primary text-on-primary text-xs font-bold">1</button>
            <button className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full hover:bg-surface-container-low text-on-surface-variant text-xs font-medium transition-colors">2</button>
            <button className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full hover:bg-surface-container-low text-on-surface-variant text-xs font-medium transition-colors">3</button>
            <span className="px-2 text-on-surface-variant text-xs flex-shrink-0">...</span>
            <button className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full hover:bg-surface-container-low text-on-surface-variant text-xs font-medium transition-colors">129</button>
          </div>
          
          <button className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full hover:bg-surface-container-low text-on-surface-variant transition-colors">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </main>
  );
}
