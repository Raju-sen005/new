import React, { useState, useRef, useEffect } from 'react';

function MultiSelectDropdown({ options, selected = [], onChange, placeholder }) {
  const safeSelected = Array.isArray(selected) ? selected : [];
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const allLabels = options.map((opt) => opt.name || opt.material);

  function toggleOption(option) {
    if (safeSelected.includes(option)) {
      onChange(safeSelected.filter((o) => o !== option));
    } else {
      onChange([...safeSelected, option]);
    }
  }

  function removeOption(option, e) {
    e.stopPropagation();
    onChange(safeSelected.filter((o) => o !== option));
  }

  function toggleSelectAll() {
    if (safeSelected.length === allLabels.length) {
      onChange([]);
    } else {
      onChange(allLabels);
    }
  }

  const displayText =
    safeSelected.length > 0 ? (
      <div className="flex flex-wrap gap-1">
        {safeSelected.map((opt) => (
          <div
            key={opt}
            className="flex items-center bg-blue-200 text-blue-800 rounded px-2 py-1 text-sm"
          >
            {opt}
            <button
              onClick={(e) => removeOption(opt, e)}
              className="ml-1 font-bold hover:text-blue-900"
              type="button"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    ) : (
      <span className="italic text-gray-400">{placeholder}</span>
    );

  const allSelected = safeSelected.length === allLabels.length && allLabels.length > 0;

  return (
    <div className="relative" ref={ref}>
      <div
        className={`w-full min-h-[40px] mb-2 border rounded px-3 py-2 cursor-pointer flex items-center ${
          safeSelected.length === 0 ? 'text-gray-400' : 'text-gray-700'
        }`}
        onClick={() => setOpen((prev) => !prev)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setOpen((prev) => !prev);
          }
        }}
      >
        {displayText}
      </div>

      {open && (
        <div className="absolute z-10 bg-white border rounded shadow w-full max-h-40 overflow-auto">
          <div
            className={`px-3 py-2 cursor-pointer hover:bg-blue-100 ${
              allSelected ? 'bg-blue-200 font-semibold' : ''
            }`}
            onClick={toggleSelectAll}
          >
            {allSelected ? 'Deselect All' : 'Select All'}
          </div>
          {options.map((opt) => {
            const label = opt.name || opt.material;
            const isSelected = safeSelected.includes(label);
            return (
              <div
                key={opt.id}
                className={`px-3 py-2 cursor-pointer hover:bg-blue-100 ${
                  isSelected ? 'bg-blue-200 font-semibold' : ''
                }`}
                onClick={() => toggleOption(label)}
              >
                {label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MultiSelectDropdown;
