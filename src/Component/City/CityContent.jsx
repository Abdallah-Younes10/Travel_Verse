import React, { useState } from "react";
import {
    MDBNavbar,
    MDBContainer,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBIcon,
    MDBCollapse,
} from "mdb-react-ui-kit";
import MapIcon from "@mui/icons-material/Map";
import HotelIcon from "@mui/icons-material/Hotel";
import RowingIcon from "@mui/icons-material/Rowing";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import { Link } from "react-router-dom";
import style from "../../Style/City/City.module.css";
import { useTranslation } from "react-i18next";
export default function App({ countryName }) {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const { t } = useTranslation();
    return (
        <>
            <MDBNavbar
                sticky
                expand="lg"
                light
                style={{ backgroundColor: "rgb(207 208 208)" }}
                className="mb-5 "
            >
                <MDBContainer fluid style={{ width: "fit-content" }}>
                    <MDBNavbarToggler
                        type="button"
                        className="ms-auto shadow-none "
                        data-target="#navbarCityContent"
                        aria-controls="navbarCityContent"
                        aria-expanded={isNavOpen ? "true" : "false"}
                        aria-label="Toggle navigation"
                        onClick={() => setIsNavOpen(!isNavOpen)}
                    >
                        <MDBIcon icon="bars" fas />
                    </MDBNavbarToggler>
                    <MDBCollapse className="flex!" open={isNavOpen} navbar id="navbarCityContent">
                        <MDBNavbarNav
                            className="m-auto mb-2 mb-lg-0 d-flex flex-row gap-3 justify-content-center"
                            style={{ textAlign: "center" }}
                        >
                            <MDBNavbarItem className="active">
                                <MDBNavbarLink
                                    aria-current="page"
                                    tag={Link}
                                    to={`/city/${countryName}`}
                                    className={`${style.link} d-flex flex-column align-items-center`}
                                >
                                    <MapIcon />
                                    <span className="d-none d-lg-inline ms-lg-1">
                                        {countryName ? countryName : "Welcome"}
                                    </span>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink
                                    tag={Link}
                                    to={`/hotel/${countryName}`}
                                    className={`${style.link} d-flex flex-column align-items-center`}
                                >
                                    <HotelIcon />
                                    <span className="d-none d-lg-inline ms-lg-1">
                                        {t("hotels")}
                                    </span>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink
                                    tag={Link}
                                    to={`/thingstodo/${countryName}`}
                                    className={`${style.link} d-flex flex-column align-items-center`}
                                >
                                    <RowingIcon />
                                    <span className="d-none d-lg-inline ms-lg-1">
                                        {t("activitie")}
                                    </span>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink
                                    tag={Link}
                                    to={`/restaurants/${countryName}`}
                                    className={`${style.link} d-flex flex-column align-items-center`}
                                >
                                    <RestaurantIcon />
                                    <span className="d-none d-lg-inline ms-lg-1">
                                        {t("restaurant")}
                                    </span>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink
                                    tag={Link}
                                    to={`/flight/${countryName}`}
                                    className={`${style.link} d-flex flex-column align-items-center`}
                                >
                                    <ConnectingAirportsIcon />
                                    <span className="d-none d-lg-inline ms-lg-1">
                                        {t("flights")}
                                    </span>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </>
    );
}
