import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../Radux/authSlice";
import { Binoculars, CableCar, Car, ChartColumnBig, Hotel, House, Plane, Ship, Users, Utensils  } from "lucide-react";
import { useTranslation } from "react-i18next";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [active, setActive] = useState("");

  const links = [
    { to: "/", label: "home", icon: <House /> },
    { to: "/admin", label: "dashboard", icon: <ChartColumnBig /> },
    { to: "users", label: "users", icon: <Users /> },
    { to: "flights", label: "flights", icon: <Plane /> },
    { to: "trips", label: "trip", icon: <Binoculars /> },
    { to: "hotel", label: "hotel", icon: <Hotel /> },
    { to: "restaurants", label: "restaurants", icon: <Utensils /> },
    { to: "activities", label: "activitie", icon: <CableCar /> },
    // { to: "cars", label: "rental_cars", icon: <Car /> },
    // { to: "cruises", label: "cruises", icon: <Ship /> },
  ];

  useEffect(() => {
    const current = links.find(link =>
      location.pathname.endsWith(link.to)
    );
    if (current) setActive(current.label);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };
  const {t} = useTranslation()
  return (
    <aside className="h-screen top-17 z-50 fixed w-64 dark:bg-gray-900/80 bg-gray-200  text-slate-200 flex flex-col">

      {/* Logo */}
      <Link
        to="/admin"
        className="flex items-center justify-center p-2 text-xl font-bold dark:text-white text-blue-600 border-b border-slate-700"
      >
        <i className="bx bxs-smile text-2xl" />
        <span className="ml-2">{t("adminHub")}</span>
      </Link>

      {/* Menu */}
      <ul className="flex-1 px-3 py-4 space-y-1">
        {links.map(link => (
          <li key={link.label}>
            <Link
              to={link.to}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
                ${
                  active === link.label
                    ? "bg-indigo-600 text-white shadow-md"
                    : "hover:bg-slate-800 hover:text-white"
                }`}
            >
              <span className="text-lg">{link.icon}</span>
              <span className="text-sm font-medium">{t(link.label)}</span>
            </Link>
          </li>
        ))}
      </ul>


    </aside>
  );
}

export default Sidebar;
