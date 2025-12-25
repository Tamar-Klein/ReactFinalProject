import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Chip, Avatar, Tooltip, Container, ThemeProvider, createTheme } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import FlagIcon from '@mui/icons-material/Flag';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const defaultTheme = createTheme({
    typography: {
        fontFamily: 'Rubik, sans-serif',
        h6: { fontWeight: 700 },
        button: { fontWeight: 500 }
    },
    palette: {
        primary: { main: '#1e293b' },
        secondary: { main: '#2563eb' },
    },
});

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const handleLogout = () => {
        dispatch({ type: 'auth/logout' });
        nav('/login');
    };

    const getRoleChip = (role: string | undefined) => {
        if (role === 'admin') return <Chip icon={<AdminPanelSettingsIcon style={{ color: 'white' }} />} label="מנהל מערכת" size="small" sx={{ ml: 1, bgcolor: '#dc2626', color: 'white', fontWeight: 'bold', fontFamily: 'Rubik' }} />;
        if (role === 'agent') return <Chip icon={<SupportAgentIcon style={{ color: 'white' }} />} label="נציג שירות" size="small" sx={{ ml: 1, bgcolor: '#2563eb', color: 'white', fontFamily: 'Rubik' }} />;
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <AppBar position="static" elevation={4} sx={{ background: 'linear-gradient(90deg, #1e293b 0%, #0f172a 100%)' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>

                        <Box sx={{ display: 'flex', alignItems: 'center', flexBasis: '20%' }}>
                            <ConfirmationNumberIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: '#2563eb' }} />
                            <Typography variant="h6" noWrap component={Link} to="/dashboard" sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, letterSpacing: '.1rem', color: 'inherit', textDecoration: 'none' }}>
                                HelpDesk
                            </Typography>
                        </Box>

                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 2 }}>
                            {isAuthenticated && (
                                <>
                                    {user?.role === "admin" && (
                                        <>
                                            <Button component={Link} to="/dashboard/users" startIcon={<PeopleIcon />} sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                                                משתמשים
                                            </Button>
                                            <Button component={Link} to="/dashboard/createStatuses" startIcon={<FlagIcon />} sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                                                סטטוסים
                                            </Button>
                                        </>
                                    )}

                                    <Button component={Link} to="/dashboard/tickets" startIcon={<DashboardIcon />} sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                                        טיקטים
                                    </Button>

                                    {user?.role === "customer" && (
                                        <Button
                                            component={Link}
                                            to="/dashboard/tickets/new"
                                            startIcon={<AddCircleIcon />}
                                            variant="contained"
                                            color="secondary"
                                            sx={{ borderRadius: 2, fontWeight: 'bold' }}
                                        >
                                            פנייה חדשה
                                        </Button>
                                    )}
                                </>
                            )}
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', flexBasis: '20%', justifyContent: 'flex-end' }}>
                            {isAuthenticated ? (
                                <>
                                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column', alignItems: 'flex-end', mr: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'white' }}>{user?.name}</Typography>
                                            {getRoleChip(user?.role)}
                                        </Box>
                                    </Box>

                                    <Tooltip title="פרופיל">
                                        <Avatar sx={{ bgcolor: 'secondary.main', ml: 2, fontFamily: 'Rubik' }}>
                                            {user?.name ? user.name.charAt(0).toUpperCase() : <AccountCircleIcon />}
                                        </Avatar>
                                    </Tooltip>

                                    <Tooltip title="התנתק">
                                        <IconButton onClick={handleLogout} sx={{ ml: 1, color: '#94a3b8', '&:hover': { color: '#ef4444' } }}>
                                            <LogoutIcon />
                                        </IconButton>
                                    </Tooltip>
                                </>
                            ) : (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Button component={Link} to="/login" variant="outlined" color="secondary">התחברות</Button>
                                </Box>
                            )}
                        </Box>

                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
}

export default Header;