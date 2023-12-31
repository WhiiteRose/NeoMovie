import { useDispatch, useSelector } from "react-redux"
import MenuIcon from "@mui/icons-material/Menu"
import DarkmodeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import {AppBar, Box, IconButton, Toolbar, Button, Stack, useScrollTrigger} from "@mui/material"
import { cloneElement } from "react"
import { Link } from "react-router-dom"
import menuConfigs from "../../configs/menu.config.js"
import {themeModes} from "../../configs/theme.config.js"
import {setAuthModalOpen} from "../../redux/features/authModalSlice.js"
import {setThemeMode} from "../../redux/features/themeModeSlice.js"
import Logo from "./Logo.jsx"
import UserMenu from "./UserMenu.jsx";
import { useState } from "react"
import Sidebar from "./Sidebar.jsx"

const ScrollAppBar = ({children, window}) => {
    const {themeMode} = useSelector((state) => state.themeMode)

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 50,
        target: window ? window() : undefined,
    })
    
    return cloneElement(children, {
        sx: { color: trigger ? "text.primary" : themeMode === themeModes.dark ? "primary.contrastText" : "text.primary" ,
        backgroundColor: trigger ? "background.paper" : themeMode === themeModes.dark ? "transparent" : "background.paper" },
    });
};

const Topbar = () => {
    const {user} = useSelector((state) => state.user);
    const {appState} = useSelector((state) => state.appState);
    const {themeMode} = useSelector((state) => state.themeMode);

    const [sidebarOpen, setSidebarOpen] = useState(false)

    const dispatch = useDispatch()

    const onSwitchTheme = () => {
        const theme = themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
        dispatch(setThemeMode(theme));
    };

    const toggleSidebar = () => { setSidebarOpen(!sidebarOpen) };

    return (
        <>
        {user ? (
        <>
        <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar}/>
            <ScrollAppBar>
                <AppBar elevation={0} sx={{zIndex: 999}}>
                    <Toolbar sx={{ alignItems: "center", justifyContent: "space-between"}}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <IconButton
                                color="inherit"
                                sx={{mr: 2, display: {md: "none"}}}
                                onClick={toggleSidebar}
                            >
                                <MenuIcon />
                            </IconButton>

                            <Box sx={{ display: { xs: "inline-block", md: "none" } }}>
                                <Logo />
                            </Box>
                        </Stack>
                        <Box flexGrow={1} alignItems="center" display={{xs: "none", md: "flex"}}>
                            <Box sx={{marginRight: "30px"}}>
                                <Logo />
                            </Box>
                            {menuConfigs.main.map((item, index) => (
                                <Button
                                    key={index}
                                    sx={{
                                        color: appState.includes(item.state) ? "primary.contrastText" : "inherit",
                                        mr: 2,
                                    }}
                                    component={Link}
                                    to={item.path}
                                    variant={appState.includes(item.state) ? "contained" : "text"}
                                >
                                    {item.display}
                                </Button>
                            ))}
                            
                            <IconButton
                                sx={{color: "inherit"}}
                                onClick={onSwitchTheme}
                            >
                              {themeMode === themeModes.dark && <DarkmodeOutlinedIcon/>}
                              {themeMode === themeModes.light && <WbSunnyOutlinedIcon/>}
                            </IconButton>
                        </Box>
                        <Stack spacing={3} direction="row" alignItems="center">
                            {!user && <Button
                                variant="contained"
                                onClick={() => dispatch(setAuthModalOpen(true))}
                            >
                                sign in
                            </Button>}
                        </Stack>
                        {user && <UserMenu/>}
                    </Toolbar>
                </AppBar>
            </ScrollAppBar>
            </> ) : (
                <>
                <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar}/>
                <ScrollAppBar>
                    <AppBar elevation={0} sx={{zIndex: 999}}>
                        <Toolbar sx={{ alignItems: "center", justifyContent: "space-between"}}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <IconButton
                                    color="inherit"
                                    sx={{mr: 2, display: {md: "none"}}}
                                    onClick={toggleSidebar}
                                >
                                    <MenuIcon />
                                </IconButton>
    
                                <Box sx={{ display: { xs: "inline-block", md: "none" } }}>
                                    <Logo />
                                </Box>
                            </Stack>
                            <Box flexGrow={1} alignItems="center" display={{xs: "none", md: "flex"}}>
                                <Box sx={{marginRight: "30px"}}>
                                    <Logo />
                                </Box>
                                <IconButton
                                    sx={{color: "inherit"}}
                                    onClick={onSwitchTheme}
                                >
                                  {themeMode === themeModes.dark && <DarkmodeOutlinedIcon/>}
                                  {themeMode === themeModes.light && <WbSunnyOutlinedIcon/>}
                                </IconButton>
                            </Box>
                            <Stack spacing={3} direction="row" alignItems="center">
                                {!user && <Button
                                    variant="contained"
                                    onClick={() => dispatch(setAuthModalOpen(true))}
                                >
                                    sign in
                                </Button>}
                            </Stack>
                        </Toolbar>
                    </AppBar>
                </ScrollAppBar>
                </>
            )}
        </>
    )
  
}

export default Topbar;