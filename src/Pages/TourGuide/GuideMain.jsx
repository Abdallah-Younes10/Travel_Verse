import React from 'react';
import mainStyles from './Main.module.css';

const GuideMain = () => {
  return (
    <main className={mainStyles.contentMain}>
      <div className={mainStyles['head-title']}>
        <div className={mainStyles.left}>
          <h1>Guide Dashboard</h1>
          <ul className={mainStyles.breadcrumb}>
            <li><a href="#">Dashboard</a></li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </li>
            <li><a className={mainStyles.active} href="#">Home</a></li>
          </ul>
        </div>
      </div>

      <ul className={mainStyles['box-info']}>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 14V2" /><path d="M3 14h14l5 8H5Z" /><path d="M8 14v8" /><path d="m9 14 5 8" />
          </svg>
          <span className={mainStyles.text}>
            <h3>12</h3>
            <p>My Trips</p>
          </span>
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <path d="M16 2v4M8 2v4" /><path d="M3 10h18" />
          </svg>
          <span className={mainStyles.text}>
            <h3>34</h3>
            <p>Reservations</p>
          </span>
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16l-1-1c-1.5-1.5 0-4 2-4s3.5 2.5 2 4l-1 1" />
          </svg>
          <span className={mainStyles.text}>
            <h3>4.7</h3>
            <p>Rating</p>
          </span>
        </li>
      </ul>

      <div className={mainStyles['table-data']}>
        <div className={mainStyles.order}>
          <div className={mainStyles.head}>
            <h3>Upcoming Trips</h3>
            <i className="bx bx-calendar"></i>
          </div>
          <table>
            <thead>
              <tr>
                <th>Trip</th>
                <th>Date</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Cairo Tour", date: "2025-06-22", location: "Cairo" },
                { name: "Desert Safari", date: "2025-06-25", location: "Siwa" },
                { name: "Nile Cruise", date: "2025-07-01", location: "Luxor" },
              ].map((trip, index) => (
                <tr key={index}>
                  <td>{trip.name}</td>
                  <td>{trip.date}</td>
                  <td>{trip.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={mainStyles.todo}>
          <div className={mainStyles.head}>
            <h3>To-Do</h3>
            <i className="bx bx-list-check"></i>
          </div>
          <ul className={mainStyles['todo-list']}>
            <li className={mainStyles.completed}><p>Confirm next trip</p></li>
            <li className={mainStyles['not-completed']}><p>Upload new photos</p></li>
            <li className={mainStyles['not-completed']}><p>Respond to reviews</p></li>
            <li className={mainStyles.completed}><p>Update trip info</p></li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default GuideMain;
