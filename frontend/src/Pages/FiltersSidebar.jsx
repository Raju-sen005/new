import React, { useEffect, useState, useRef } from "react";
import debounce from "lodash.debounce";

const FiltersSidebar = ({ url, isFilterOpen, isScrolled, onFiltersChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedMetals, setSelectedMetals] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [selectedPurposes, setSelectedPurposes] = useState([]);
  const [selectedFestivals, setSelectedFestivals] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 2000000]);

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [metalOptions, setMetalOptions] = useState([]);
  const [themeOptions, setThemeOptions] = useState([]);
  const [purposeOptions, setPurposeOptions] = useState([]);
  const [festivalOptions, setFestivalOptions] = useState([]);

  const [openSections, setOpenSections] = useState({});
  const prevFilterRef = useRef(null);

  // Debounced filter change function
  const triggerFilterChange = useRef(
    debounce((filters) => {
      onFiltersChange(filters);
    }, 200)
  ).current;

  useEffect(() => {
    const currentFilters = {
      selectedCategories,
      selectedSubCategories,
      selectedSizes,
      selectedMetals,
      selectedThemes,
      selectedPurposes,
      selectedFestivals,
      priceRange,
    };

    // Avoid triggering filter change if nothing changed
    if (
      JSON.stringify(prevFilterRef.current) !== JSON.stringify(currentFilters)
    ) {
      prevFilterRef.current = currentFilters;
      triggerFilterChange(currentFilters);
    }
  }, [
    selectedCategories,
    selectedSubCategories,
    selectedSizes,
    selectedMetals,
    selectedThemes,
    selectedPurposes,
    selectedFestivals,
    priceRange,
    triggerFilterChange,
  ]);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const [catRes, subCatRes, metalRes, themeRes, purposeRes, festivalRes] =
          await Promise.all([
            fetch(`${url}/category`),
            fetch(`${url}/subcategory`),
            fetch(`${url}/material`),
            fetch(`${url}/theme`),
            fetch(`${url}/purpose`),
            fetch(`${url}/festival`),
          ]);

        const categoriesData = await catRes.json();
        const subCategoriesData = await subCatRes.json();
        const metalsData = await metalRes.json();
        const themesData = await themeRes.json();
        const purposesData = await purposeRes.json();
        const festivalsData = await festivalRes.json();

        setCategoryOptions(categoriesData.map((item) => item.category));
        setSubCategoryOptions(subCategoriesData.map((item) => item.name));
        setMetalOptions(metalsData.map((item) => item.name));
        setThemeOptions(themesData.map((item) => item.theme));
        setPurposeOptions(purposesData.map((item) => item.name));
        setFestivalOptions(festivalsData.map((item) => item.name));
      } catch (err) {
        console.error("Error fetching filter data:", err);
      }
    };

    fetchFilterOptions();
  }, [url]);

  const toggleSection = (label) => {
    setOpenSections((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const renderCheckboxGroup = (
    label,
    options,
    selectedValues,
    setSelectedValues
  ) => (
    <div className="faq-item border-b border-gray-300 py-4">
      <div
        className="faq-question font-semibold flex justify-between items-center text-[#5B3E38] text-[16px] cursor-pointer"
        onClick={() => toggleSection(label)}
      >
        {label}
        <span className="toggle-icon">{openSections[label] ? "-" : "+"}</span>
      </div>
      {openSections[label] && (
        <div className="faq-answer mt-2 text-gray-600">
          {options.map((option, index) => (
            <label key={index} className="block text-sm text-gray-700">
              <input
                type="checkbox"
                value={option}
                checked={
                  Array.isArray(selectedValues)
                    ? selectedValues.includes(option)
                    : false
                }
                onChange={() => {
                  setSelectedValues((prev) =>
                    Array.isArray(prev)
                      ? prev.includes(option)
                        ? prev.filter((o) => o !== option)
                        : [...prev, option]
                      : [option]
                  );
                }}
                className="mr-2 accent-[#AA8265]"
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div
      className={`lg:w-1/4 md:w-1/3 p-4 w-auto absolute md:top-[240px] left-10 bg-white shadow-lg transition-transform ${
        isFilterOpen ? "block" : "hidden xl:block"
      }`}
      style={{ zIndex: isScrolled ? "-1" : "50" }}
    >
      <div className="max-w-xl mx-auto bg-white p-2 rounded-lg shadow-md">
        {renderCheckboxGroup(
          "CATEGORIES",
          categoryOptions,
          selectedCategories,
          setSelectedCategories
        )}
        {renderCheckboxGroup(
          "SUB-CATEGORIES",
          subCategoryOptions,
          selectedSubCategories,
          setSelectedSubCategories
        )}
        {renderCheckboxGroup(
          "THEMES",
          themeOptions,
          selectedThemes,
          setSelectedThemes
        )}
        {renderCheckboxGroup(
          "METALS",
          metalOptions,
          setSelectedMetals,
          setSelectedMetals
        )}
        {renderCheckboxGroup(
          "PURPOSES",
          purposeOptions,
          selectedPurposes,
          setSelectedPurposes
        )}
        {renderCheckboxGroup(
          "FESTIVALS",
          festivalOptions,
          selectedFestivals,
          setSelectedFestivals
        )}

        <div className="faq-item border-b border-gray-300 py-4">
          <div
            className="faq-question font-semibold cursor-pointer flex justify-between items-center text-[#5B3E38] text-[16px]"
            onClick={() => toggleSection("PRICE")}
          >
            PRICE
            <span className="toggle-icon">
              {openSections["PRICE"] ? "-" : "+"}
            </span>
          </div>
          <div
            className={`faq-answer mt-2 text-gray-600 ${
              openSections["PRICE"] ? "block" : "hidden"
            }`}
          >
            <span className="text-[14px] text-[#AA8265]">
              {priceRange[0].toLocaleString()} IDR -{" "}
              {priceRange[1].toLocaleString()} IDR
            </span>
            <input
              type="range"
              min={0}
              max={2000000}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="mt-4 w-full"
              style={{ accentColor: "#AA8265" }}
            />
            <div className="flex justify-between">
              <span className="text-[14px] text-[#AA8265]">0 IDR</span>
              <span className="text-[14px] text-[#AA8265]">2,000,000 IDR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersSidebar;
