import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProfile } from './Radux/authSlice.js';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Header from './Utility/Navbar/Navbar.jsx';
import Footer from './Utility/Footer/Footer.jsx';
import Home from './Pages/Home/Home.jsx';
import Continent from './Pages/Continent/Continent.jsx';
import City from './Pages/City/City.jsx';
import Trips from './Pages/Trips/Trips.jsx';
import DetialTrip from './Pages/DetialTrip/DetialTrip.jsx';
import Hotel from './Pages/Hotel/Hotel.jsx';
import { Cars } from './Pages/Cars/Cars.jsx';
import { ThingsToDo } from './Pages/ThingsToDo/ThingsToDo.jsx';
import { AllThings } from './Pages/ThingsToDo/AllThings.jsx';
import { Flight } from './Pages/Flight/Flight.jsx';
import { Cruises } from './Pages/Cruises/Cruises.jsx';
import Res from './Pages/Res/Res.jsx';
import Login from './Pages/Auth/Login.jsx';
import i18n from './Lang/Lang.jsx';
import { BookTrip } from './Pages/BookTrip/BookTrip.jsx';
import UserManagement from './Pages/Admin/UserMang/EditGuide.jsx';
import Main from './Pages/Admin/Main.jsx';
import AdminDash from './Pages/Admin/AdminDash.jsx';
import HotelManagement from './Pages/Admin/HotelMang/EditHotels.jsx';
import RestaurantManagement from './Pages/Admin/RestuarntMang/Restaurant Management.jsx';
import ActivityManagement from './Pages/Admin/ActivityMang/ActivityManagement.jsx';
import CarManagement from './Pages/Admin/CarMang/CarManagement.jsx';
import CruiseManagement from './Pages/Admin/CruiseMang/CruiseManagement.jsx';
import TripManagement from './Pages/Admin/TripMang/TripManagement.jsx';
import FlightManagement from './Pages/Admin/FlightMang/FlightManagement.jsx';
import GuideDash from './Pages/TourGuide/GuideDash.jsx';
import GuideMain from './Pages/TourGuide/GuideMain.jsx';
import MyTrips from './Pages/TourGuide/TripMang/MyTrips.jsx';
import MyReservations from './Pages/TourGuide/Reservations/MyReservations.jsx';
import MyReviews from './Pages/TourGuide/Reviews/MyReviews.jsx';
import GalleryManager from './Pages/TourGuide/GalleryManagement/GalleryManager.jsx';
import MessagesManager from './Pages/TourGuide/MessagesManager/MessagesManager.jsx';
import Notifications from './Pages/TourGuide/Notifications/Notifications.jsx';
import ProfileSettings from './Pages/TourGuide/ProfileSettings.jsx';
import Dashboard from './Pages/User/Dashboard.jsx';
import MyReserv from './Pages/User/MyReservations.jsx';
import MyFavorites from './Pages/User/MyFavorites.jsx';
import UserProfileSettings from './Pages/User/ProfileSettings.jsx';
import UserReviews from './Pages/User/MyReviews.jsx';
import DeleteAccount from './Pages/User/DeleteAccount.jsx';
import UserDash from './Pages/User/ProjectsSection.jsx';
import TestImage from './Utility/ModernSlider/TestImage.jsx';
import DetialItem from './Pages/DetialTrip/DetialTrip.jsx';
import Restaurants from './Pages/Res/Res.jsx';
import RedirectByRole from './RedirectByRole.jsx';
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// حماية
import PrivateRoute from './PrivateRoute.jsx';
import RoleProtectedRoute from './RoleProtectedRoute.jsx';
import ForgotPassword from './Pages/Auth/ForgotPassword.jsx';
import ResetPassword from './Pages/Auth/ResetPassword.jsx';
import { ToastContainer } from 'react-toastify';
import { setCurrency } from './Radux/Slices/currencySlice.js';

// ... استيراد كل الصفحات والمكونات

const DefaultLayout = () => (
  <>
  <Header />
  <main className="pt-16! min-h-screen">
    <Outlet />
  </main>
  <Footer />
</>

);

const App = () => {
  const dispatch = useDispatch();

 useEffect(() => {
    const isDark =
      localStorage.theme === "dark" ||
      (!localStorage.theme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", isDark);
    const savedCurrency = localStorage.getItem("currency") || "USD";
  dispatch(setCurrency(savedCurrency));
  }, []);


  return (
    <><ToastContainer position="top-right" />
    <Router>
    <RedirectByRole />
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* 🔒 admin routes */}
        <Route path="/admin" element={
          <RoleProtectedRoute allowedRoles={['admin']}>
            <AdminDash />
          </RoleProtectedRoute>
        }>
          <Route index element={<Main />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="flights" element={<FlightManagement />} />
          <Route path="trips" element={<TripManagement />} />
          <Route path="hotel" element={<HotelManagement />} />
          <Route path="restaurants" element={<RestaurantManagement />} />
          <Route path="activities" element={<ActivityManagement />} />
          <Route path="cars" element={<CarManagement />} />
          <Route path="cruises" element={<CruiseManagement />} />
        </Route>

        {/* 🔒 guide routes */}
        <Route path="/guide" element={
          <RoleProtectedRoute allowedRoles={['guide']}>
            <GuideDash />
          </RoleProtectedRoute>
        }>
          <Route index element={<GuideMain />} />
          <Route path="profile" element={<ProfileSettings />} />
          <Route path="my-trips" element={<MyTrips />} />
          <Route path="reservations" element={<MyReservations />} />
          <Route path="reviews" element={<MyReviews />} />
          <Route path="gallery" element={<GalleryManager />} />
          <Route path="messages" element={<MessagesManager />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>

        {/* 🔒 user routes */}
        <Route path="/user" element={
          <RoleProtectedRoute allowedRoles={['user']}>
            <Dashboard />
          </RoleProtectedRoute>
        }>
          <Route index element={<UserProfileSettings />} />
          <Route path="reservations" element={<MyReserv />} />
          <Route path="favorites" element={<MyFavorites />} />
          <Route path="profile" element={<UserProfileSettings />} />
        </Route>

        {/* 🌍 public routes */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/destination/:continent" element={<Continent />} />
          <Route path="/city/:cityName" element={<City />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/TravelBook" element={<BookTrip />} />
          <Route path="/itemdetail/:id" element={<DetialItem />} />
          <Route path="/hotel/:cityName" element={<Hotel />} />
          <Route path="/car/:cityName" element={<Cars />} />
          <Route path="/thingstodo/:cityName" element={<ThingsToDo />} />
          <Route path="/allactivites/:cityName" element={<AllThings />} />
          <Route path="/flight/:cityName" element={<Flight />} />
          <Route path="/cruises/:cityName" element={<Cruises />} />
          <Route path="/restaurants/:cityName" element={<Restaurants />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
      </Routes>
    </Router>
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;
