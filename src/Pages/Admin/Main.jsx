// Main.jsx
import React from 'react';
import mainStyles from './Main.module.css'; // تم ربطه بملف الـ CSS الموحد
import { useTranslation } from 'react-i18next';


const Main = () => {
    const {t} = useTranslation();
  return (
    <main className={`flex flex-col w-410!`}> {/* إضافة كلاس لتحديد الـ scope */}
      <div className={mainStyles['head-title']}>
        <div className={mainStyles.left}>
          <h1 className='dark:text-white!'>{t("dashboard")}</h1>
          <ul className={mainStyles.breadcrumb}>
            <li><a href="#">{t("dashboard")}</a></li>
            <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg></li>
            <li><a className={mainStyles.active} href="#">{t("home")}</a></li>
          </ul>
        </div>
      </div>

      <ul className={mainStyles['box-info']}>
        <li className='bg-gradient-to-r! from-gray-400! to-gray-600! border border-gray-300! dark:border-gray-700!'>
          <svg xmlns="http://www.w3.org/2000/svg" className='text-white!' width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-check-icon lucide-calendar-check"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/></svg>
          <span className={mainStyles.text}>
            <h3 className='dark:text-white!'>1020</h3>
            <p className='dark:text-white!'> {t("newOrder")}</p>
          </span>
        </li>
        <li className='bg-gradient-to-r! from-blue-400! to-blue-600! border border-gray-300! dark:border-gray-700!'>
          <svg xmlns="http://www.w3.org/2000/svg" className='text-white!' width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users-icon lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/></svg>
          <span className={mainStyles.text}>
            <h3 className='dark:text-white!'>2834</h3>
            <p className='dark:text-white!'>{t("visitors")}</p>
          </span>
        </li>
        <li className='bg-gradient-to-r! from-yellow-300! to-yellow-600! border border-gray-300! dark:border-gray-700!'>
          <svg xmlns="http://www.w3.org/2000/svg" className='text-white!' width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-dollar-sign-icon lucide-circle-dollar-sign"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>
          <span className={mainStyles.text}>
            <h3 className='dark:text-white!'>$2543.00</h3>
            <p className='dark:text-white!'>{t("totalSales")}</p>
          </span>
        </li>
      </ul>

      <div className={mainStyles['table-data']}>
        <div className={`${mainStyles.order} bg-transparent! dark:bg-gray-900/80! border border-gray-300! dark:border-gray-700!`}>
          <div className={mainStyles.head}>
            <h3 className=' dark:text-white!'>{t("recentOrders")}</h3>
            <i className="bx bx-search"></i>
            <i className="bx bx-filter"></i>
          </div>
          <table>
            <thead>
              <tr>
                <th className='dark:text-white!'>{t("user")}</th>
                <th className='dark:text-white!'>{t("dateOrder")}</th>
                <th className='dark:text-white!'>{t("status")}</th>
              </tr>
            </thead>
            <tbody >
              {[
                { name: 'Micheal John', date: '18-10-2021', status: 'completed' },
                { name: 'Ryan Doe', date: '01-06-2022', status: 'pending' },
                { name: 'Tarry White', date: '14-10-2021', status: 'process' },
                { name: 'Selma', date: '01-02-2023', status: 'pending' },
                { name: 'Andreas Doe', date: '31-10-2021', status: 'completed' }
              ].map((item, index) => (
                <tr key={index} className='dark:text-white! dark:hover:bg-gray-800! '>
                  <td><p className='dark:text-white! hover:bg-gray-800!'>{item.name}</p></td>
                  <td>{item.date}</td>
                  <td><span className={`${mainStyles.status} ${mainStyles[item.status]}`}>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={`${mainStyles.todo} bg-transparent! dark:bg-gray-900/80! border border-gray-300! dark:border-gray-700!`}>
          <div className={mainStyles.head}>
            <h3 className='dark:text-white!'>{t("todos")}</h3>
            <svg xmlns="http://www.w3.org/2000/svg" className='dark:text-white!' width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-plus-icon lucide-circle-plus"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" className='dark:text-white!' width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sliders-horizontal-icon lucide-sliders-horizontal"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/></svg>
          </div>
          <ul className={mainStyles['todo-list']}>
            <li className={`${mainStyles.completed} bg-transparent! dark:bg-gray-800/50!`}><p className='dark:text-white!'>{t("checkInventory")}</p>
            <svg xmlns="http://www.w3.org/2000/svg" className='dark:text-white!' width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-vertical-icon lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
            </li>
            <li className={`${mainStyles.completed} bg-transparent! dark:bg-gray-800/50!`}><p className='dark:text-white!'>{t("manageDelivery")}</p>
            <svg xmlns="http://www.w3.org/2000/svg" className='dark:text-white!' width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-vertical-icon lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
            </li>

            <li className={`${mainStyles['not-completed']} bg-transparent! dark:bg-gray-800/50!`}><p className='dark:text-white!'>{t("contactSelma")}</p>
            <svg xmlns="http://www.w3.org/2000/svg" className='dark:text-white!' width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-vertical-icon lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
            </li>
            <li className={`${mainStyles.completed} bg-transparent! dark:bg-gray-800/50!`}><p className='dark:text-white!'>{t("updateShopCatalogue")}</p>
            <svg xmlns="http://www.w3.org/2000/svg" className='dark:text-white!' width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-vertical-icon lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
            </li>
            <li className={`${mainStyles.completed} bg-transparent! dark:bg-gray-800/50!`}><p className='dark:text-white!'>{t("updateCatalogue")}</p>
            <svg xmlns="http://www.w3.org/2000/svg" className='dark:text-white!' width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-vertical-icon lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
            </li>
            {/* <li className={`${mainStyles['not-completed']} bg-transparent! dark:bg-gray-800/50!`}><p className='dark:text-white!'>{t("profitAnalytics")}</p>
            <svg xmlns="http://www.w3.org/2000/svg" className='dark:text-white!' width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-vertical-icon lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
            </li> */}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Main;
