// Navbar.jsx
import React from 'react';

import { Link } from 'react-router-dom';
import { House } from 'lucide-react';
import { useTranslation } from 'react-i18next';
const Navbar = ({ toggleSidebar, isSidebarHidden }) => {

    const links = [
    { to: "/", label: "home", icon: <House /> },
    { to: "/user/profile", label: "profile1", icon: "👤" },
    { to: "/user/reservations", label: "reservations", icon: "📅" },
    // { to: "/user/favorites", label: "favorites", icon: "❤️" },
  ];

    const { t } = useTranslation();
  return (
     <header className="fixed! top-16 z-50 w-full! bg-gray-300 h-15 dark:bg-gray-800/90 backdrop-blur-md text-white shadow-md">
      <nav className="flex justify-center items-center h-full gap-3">
        <ul className="mb-0 flex items-center gap-4 h-full">
                {links.map((item, index) => (
                  <li key={index} >
                    <Link to={item.to} className='flex items-center gap-2 hover:scale-110 ' >
                      <span className="">{item.icon}</span>
                      <span className="text-gray-700 dark:text-gray-300">{t(item.label)}</span>
                    </Link>
                  </li>
                ))}
              </ul>

      </nav>
    </header>
  );
};

export default Navbar;
