import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    MenuItem,
    Avatar,
    Container,
    Box,
    IconButton,
    Menu,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import logo from "../../Assets/images/Black-unscreen.gif";
import DarkModeToggle from "../Buttons/DarkBtn/DarkBtn";
import LanguageMenu from "../../Component/Navbar/LanguageMenu";
import CurrencyMenu from "../../Component/Navbar/CurrencyMenu";
import UserAvatar from "../../Component/Navbar/UserAvatar";
import WatchlistDropdown from '../../Component/Navbar/WatchlistDropdown';
import { useTranslation } from "react-i18next";

// تعريف الصفحات والروابط
const pages = [
    { name: "trips", link: "/trips" },
    // { name: "travel_ideas", link: "/TravelBook" },
];

// تعريف القارات
const continents = [
    { name: "africa", link: "/destination/africa" },
    { name: "asia", link: "/destination/asia" },
    { name: "europe", link: "/destination/europe" },
    { name: "north_america", link: "/destination/north-america" },
    { name: "south_america", link: "/destination/south-america" },
    { name: "middle_east", link: "/destination/middleEast" },
    { name: "america_caribbean", link: "/destination/carbine" },
];

const Header = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElDestination, setAnchorElDestination] = useState(null); // قائمة Destination
    const [anchorElWatchlist, setAnchorElWatchlist] = useState(null);

    // فتح القائمة العامة
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    // إغلاق القائمة العامة
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    // فتح قائمة Destination
    const handleOpenDestinationMenu = (event) => {
        setAnchorElDestination(event.currentTarget);
    };

    // إغلاق قائمة Destination
    const handleCloseDestinationMenu = () => {
        setAnchorElDestination(null);
    };

    const handleOpenWatchlist = (e) => setAnchorElWatchlist(e.currentTarget);
    const handleCloseWatchlist = () => setAnchorElWatchlist(null);
        const { t } = useTranslation();
    return (
       <nav className="fixed top-0 z-50 w-full bg-blue-500/90 dark:bg-gray-900/90 backdrop-blur-md text-white">

            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Avatar
                        src={logo}
                        sx={{
                            display: { xs: "none", md: "flex" },
                            width: "100px",
                        }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        TRAVELVERSE
                    </Typography>

                    {/* قائمة الروابط للشاشات الصغيرة */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="open navigation menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: "block", md: "none" } }}
                        >
                            <MenuItem onClick={handleOpenDestinationMenu}>
                                <Typography textAlign="center">
                                    {t("destination")}
                                </Typography>
                            </MenuItem>
                            {pages.map((page) => (
                                <MenuItem
                                    key={page.name}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography textAlign="center">
                                        <Link
                                            to={page.link}
                                            style={{
                                                textDecoration: "none",
                                                color: "inherit",
                                            }}
                                        >
                                            {/* {page.name} */}
                                            {t(`${page.name}`)}
                                        </Link>
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        <Button
                            onClick={handleOpenDestinationMenu}
                            sx={{ my: 2, color: "white", display: "block" }}
                        >
                            {t("destination")}
                        </Button>
                        <Menu
                            id="menu-destination"
                            anchorEl={anchorElDestination}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElDestination)}
                            onClose={handleCloseDestinationMenu}
                        >
                            {continents.map((continent) => (
                                <MenuItem
                                    key={continent.name}
                                    onClick={handleCloseDestinationMenu}
                                    component={Link}
                                    to={continent.link}
                                >
                                    {t(`${continent.name}`)}
                                </MenuItem>
                            ))}
                        </Menu>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: "block" }}
                                component={Link}
                                to={page.link}
                            >
                                {t(`${page.name}`)}

                            </Button>
                        ))}
                    </Box>

                    <DarkModeToggle />
                    <LanguageMenu />
                    <IconButton color="inherit" onClick={handleOpenWatchlist} >
                        <span style={{ color: 'white' }}>❤</span>
                    </IconButton>
                    <WatchlistDropdown anchorEl={anchorElWatchlist} open={Boolean(anchorElWatchlist)} onClose={handleCloseWatchlist} />
                    <CurrencyMenu />
                    <UserAvatar />
                </Toolbar>
            </Container>
        </nav>
    );
};

export default Header;
