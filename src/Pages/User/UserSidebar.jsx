import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import styles from '../TourGuide/Main.module.css'; // إعادة استخدام نفس ملف الـ CSS
import { House } from 'lucide-react';
const UserSidebar = ({ isHidden }) => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('Dashboard');

  const handleLogout = () => {
    // localStorage.removeItem("token"); // مثال
    navigate('/login');
  };

  const links = [
    { to: "/", label: "Home", icon: <House /> },
    // { to: "/user", label: "Dashboard", icon: "📊" },
    { to: "/user/profile", label: "My Profile", icon: "👤" },
    { to: "/user/reservations", label: "My Reservations", icon: "📅" },
    { to: "/user/favorites", label: "Favorites", icon: "❤️" },
    // { to: "/user/reviews", label: "My Reviews", icon: "⭐" },
    // { to: '/user/delete', label: 'Delete Account' },
    // { to: "/user/messages", label: "Messages", icon: "💬" },
  ];

  return (
    <div className=" fixed top-16 h-screen w-60 dark:bg-gray-900/90 shadow-lg">
      <Link to="/user" className="flex items-center gap-2 p-4 border-b border-gray-200 dark:border-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin-icon lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
        <span className="text-lg font-semibold text-heading dark:text-white">User</span>
      </Link>

      <ul className="mt-8">
        {links.map((item, index) => (
          <li key={index} >
            <Link to={item.to} onClick={() => setActiveMenu(item.label)}>
              <span className="mx-2">{item.icon}</span>
              <span className="text-gray-700 dark:text-gray-300">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <ul className="absolute bottom-0 w-full">
        <li>
          <button onClick={handleLogout} className="w-full text-left p-4 flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-power-off-icon lucide-power-off"><path d="M18.36 6.64A9 9 0 0 1 20.77 15"/><path d="M6.16 6.16a9 9 0 1 0 12.68 12.68"/><path d="M12 2v4"/><path d="m2 2 20 20"/></svg>
            <span className="text-gray-700 dark:text-gray-300">Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserSidebar;
