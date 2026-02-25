import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import dashboardStyles from './Main.module.css';
import Sidebar from './GuideSidebar '; // Sidebar مخصص للـ Guide

const GuideDash = () => {
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarHidden(prev => !prev);
  };

  return (
    <div className={dashboardStyles.container}>
      <Sidebar isHidden={isSidebarHidden} toggleSidebar={toggleSidebar} />
      <section
        id="content"
        className={`${dashboardStyles.content} ${isSidebarHidden ? dashboardStyles.hide : ''}`}
      >
        <Navbar toggleSidebar={toggleSidebar} isSidebarHidden={isSidebarHidden} />
        <div className="admin-sub-content">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default GuideDash;
