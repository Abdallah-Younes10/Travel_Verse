import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import sidebarStyles from './Main.module.css';

const GuideSidebar = ({ isHidden }) => {
  const navigate = useNavigate();

  const sidebarLinks = [
    { to: "/guide", label: "Dashboard", icon: "🏠" },
    { to: "/guide/profile", label: "My Profile", icon: "👤" },
    { to: "/guide/my-trips", label: "My Trips", icon: "🗺️" },
    { to: "/guide/reservations", label: "Reservations", icon: "📆" },
    { to: "/guide/reviews", label: "My Reviews", icon: "⭐" },
    { to: "/guide/gallery", label: "My Gallery", icon: "🖼️" },
    { to: "/guide/messages", label: "My Messages", icon: "💬" },
    { to: "/guide/notifications", label: "My Notifications", icon: "🔔" },
  ];

  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');

  const handleMenuItemClick = (label) => setActiveMenuItem(label);

  const handleLogout = () => {
    // إذا كان هناك جلسة تخزين أو بيانات:
    // localStorage.clear();
    navigate('/login');
  };

  return (
    <div className={`${sidebarStyles.sidebar} ${isHidden ? sidebarStyles.hide : ''}`}>
      <Link to="/" className={sidebarStyles.brand}>
        <i className="bx bxs-map bx-lg"></i>
        <span className={sidebarStyles.text} style={{ margin: "0 2em" }}>TourGuide</span>
      </Link>

      <ul className={`${sidebarStyles['side-menu']} ${sidebarStyles.top}`}>
        {sidebarLinks.map((link, index) => (
          <li key={index} className={activeMenuItem === link.label ? sidebarStyles.active : ''}>
            <Link to={link.to} onClick={() => handleMenuItemClick(link.label)}>
              <span className="mx-2">{link.icon}</span>
              <span className={sidebarStyles.text}>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <ul className={`${sidebarStyles['side-menu']} ${sidebarStyles.bottom}`}>
        <li>
          <button onClick={handleLogout} className={sidebarStyles.logout}>
            <i className="bx bx-power-off bx-sm bx-burst-hover"></i>
            <span className={sidebarStyles.text}>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default GuideSidebar;
