import React from 'react';
import { MdContacts, MdCategory, MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { FaPalette, FaHandsHelping } from "react-icons/fa";
import { GiPartyPopper, GiResize, GiCutDiamond } from "react-icons/gi";
import InventoryIcon from '@mui/icons-material/Inventory';
import { FaPercentage } from "react-icons/fa";

function Slidebar1() {
    const navLinkClass = ({ isActive }) =>
        `flex items-center space-x-3 px-4 py-2 text-sm rounded-lg font-semibold ${isActive
            ? 'bg-gray-100 dark:bg-gray-700 dark:text-white'
            : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300'
        }`;

    return (
        <div
            id="sidebar"
            className="fixed left-0 top-0 lg:w-64 w-64 h-full bg-white dark:bg-gray-800 dark:border-gray-700 transform -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out z-50"
        >
            <div className="p-6">
                <div className="flex items-center mb-6">
                    <img src="icons/man-logo.png" width={150} alt="Logo" />
                </div>
                <nav className="space-y-2 mt-10">
                    <NavLink to="/" className={navLinkClass}>
                        <img src="icons/menu.png" alt="" />
                        <span>Customers</span>
                    </NavLink>
                    <NavLink to="/orders" className={navLinkClass}>
                        <img src="icons/Receipt.png" alt="" />
                        <span>Orders</span>
                    </NavLink>
                    <NavLink to="/products" className={navLinkClass}>
                        <img src="icons/pin.png" alt="" />
                        <span>Products</span>
                    </NavLink>
                    <NavLink to="/contacts" className={navLinkClass}>
                        <MdContacts className="w-5 h-5" />
                        <span>Contacts</span>
                    </NavLink>
                    <NavLink to="/categorys" className={navLinkClass}>
                        <MdCategory className="w-5 h-5" />
                        <span>Category</span>
                    </NavLink>
                    <NavLink to="/subcategorys" className={navLinkClass}>
                        <MdOutlineSubdirectoryArrowRight className="w-5 h-5" />
                        <span>Sub-Category</span>
                    </NavLink>
                    <NavLink to="/theme" className={navLinkClass}>
                        <FaPalette className="w-5 h-5" />
                        <span>Theme</span>
                    </NavLink>
                    <NavLink to="/festival" className={navLinkClass}>
                        <GiPartyPopper className="w-5 h-5" />
                        <span>Festival</span>
                    </NavLink>
                    <NavLink to="/gemstone" className={navLinkClass}>
                        <GiCutDiamond className="w-5 h-5" />
                        <span>Gem-Stone</span>
                    </NavLink>
                    <NavLink to="/purpose" className={navLinkClass}>
                        <FaHandsHelping className="w-5 h-5" />
                        <span>Purpose</span>
                    </NavLink>
                    <NavLink to="/material" className={navLinkClass}>
                        <InventoryIcon className="w-5 h-5" />
                        <span>Metals</span>
                    </NavLink>
                    <NavLink to="/sizes" className={navLinkClass}>
                        <GiResize className="w-5 h-5" />
                        <span>Sizes</span>
                    </NavLink>
                    <NavLink to="/offer" className={navLinkClass}>
                        <FaPercentage className="w-5 h-5" />
                        <span>Offer</span>
                    </NavLink>
                </nav>
            </div>
        </div>
    );
}

export default Slidebar1;
