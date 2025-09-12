// Sidebar.jsx
import { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Sidebar = ({ active }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const [activeSubItem, setActiveSubItem] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
    setActiveSubItem(null);
  };

  const menus = [
    { name: "Dashboard", key: "", subMenu: [] },
    { name: "Products", key: "products", subMenu: ["Add Product"] },
    { name: "Users", key: "users", subMenu: [] },
    { name: "Order", key: "carts", subMenu: [] },
    { name: "Comments", key: "comments", subMenu: [] },
    { name: "Wishlist", key: "Wish", subMenu: [] },
  ];

  return (
    <div
      className={`fixed top-16 left-0 transform duration-700 transition
      ${active ? "translate-x-0" : "-translate-x-full"}
      
      w-64 min-h-screen bg-gray-900 text-white p-4 z-50`}
    >
      <ul className="space-y-2">
        {menus.map((menu) => (
          <li key={menu.key}>
            <Link
            to={`${menu.key}`}
              onClick={() => toggleMenu(menu.key)}
              className={`w-full flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer ${
                openMenu === menu.key ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
            >
              <span>{menu.name}</span>
              {openMenu === menu.key ? <FaChevronDown size={18} /> : <FaChevronRight size={18} />}
            </Link>

            {openMenu === menu.key && (
              <ul className="ml-6 mt-2 space-y-1">
                {menu.subMenu.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={`/dashboard/${menu.key}/${item.replace(/\s+/g, "-").toLowerCase()}`}
                      onClick={() => setActiveSubItem(item)}
                      className={`w-full text-left px-3 py-1 cursor-pointer rounded-md text-sm ${
                        activeSubItem === item ? "bg-gray-600" : "hover:bg-gray-700"
                      }`}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
