import React, { useEffect, useRef, useState } from 'react';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const toggleRef = useRef(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target)
      ) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <>
      {/* Toggle Button (optional) */}
      <button
        ref={toggleRef}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-200 dark:bg-gray-700 rounded-md lg:hidden"
      >
        ☰
      </button>

      <div
        ref={sidebarRef}
        id="sidebar"
        className={`fixed left-0 top-0 w-64 h-full bg-white dark:bg-gray-800 dark:border-gray-700 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="p-6 text-gray-800 dark:text-white">
          <div className="flex items-center mb-6">
            <img src="icons/man-logo.png" width={150} alt="Logo" />
          </div>

          {/* Navigation */}
          <nav className="space-y-2 mt-10">
            {[
              { icon: 'icons/SquaresFour.png', label: 'Home' },
              { icon: 'icons/Receipt.png', label: 'Orders' },
              { icon: 'icons/pin.png', label: 'Products' },
              { icon: 'icons/menu.png', label: 'Customers' },
              { icon: 'icons/Storefront1.png', label: 'Online Store' },
            ].map(({ icon, label }) => (
              <a
                key={label}
                href="#"
                className="flex items-center space-x-3 px-4 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300 font-semibold"
              >
                <img src={icon} alt={label} />
                <span>{label}</span>
              </a>
            ))}
          </nav>

          {/* Trial Card & Settings */}
          
        </div>
      </div>
    </>
  );
};

export default Sidebar;
