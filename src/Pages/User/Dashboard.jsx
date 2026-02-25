import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
// import dashboardStyles from '../TourGuide/Main.module.css';
import UserSidebar from './UserSidebar';
import Header from '../../Utility/Navbar/Navbar';
import Navbar from '../TourGuide/Navbar';
// import Sidebar from './GuideSidebar '; // Sidebar مخصص للـ Guide

const Dashboard = () => {
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarHidden(prev => !prev);
  };

  return (
    <div >
      {/* <UserSidebar isHidden={isSidebarHidden} toggleSidebar={toggleSidebar} /> */}
      <section
        id="content"

      >

        <Header/>
        <Navbar toggleSidebar={toggleSidebar} isSidebarHidden={isSidebarHidden} />
        <div className='relative top-30! p-4 md:p-8 lg:p-12 bg-gray-100 dark:bg-gray-900 min-h-screen w-full overflow-hidden'>
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
