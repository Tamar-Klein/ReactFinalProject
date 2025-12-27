import { useSelector } from "react-redux";
import { Container, Grid, Box, Typography, Card, CardContent, CardActionArea, Avatar, Divider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import type { RootState } from "../../store";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme({
    direction: 'rtl',
    typography: { fontFamily: 'Rubik, Arial, sans-serif' },
    palette: {
        primary: { main: '#1e293b' },
        secondary: { main: '#2563eb' },
        background: { default: '#f8fafc' },
    },
});

const AdminView = () => {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container maxWidth="lg" sx={{ mt: 6, mb: 8 }} dir="rtl">

                {/* כותרת ראשית וברכה */}
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64, margin: '0 auto', mb: 2 }}>
                        <AdminPanelSettingsIcon fontSize="large" />
                    </Avatar>
                    <Typography variant="h3" fontWeight="bold" color="primary.main" gutterBottom>
                        לוח בקרה למנהל
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        שלום {user?.name}, ברוך הבא למערכת הניהול.
                    </Typography>
                </Box>

                <Grid container spacing={4} justifyContent="center">

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Card
                            elevation={2}
                            sx={{
                                height: '100%', borderRadius: 4,
                                transition: 'all 0.3s ease',
                                '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }
                            }}
                        >
                            <CardActionArea
                                onClick={() => navigate('/dashboard/tickets')}
                                sx={{ height: '100%', p: 2 }}
                            >
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                    <Box sx={{ p: 2.5, borderRadius: '50%', bgcolor: '#eefff6', color: '#2563eb', mb: 3 }}>
                                        <ConfirmationNumberIcon fontSize="large" />
                                    </Box>
                                    <Typography variant="h5" fontWeight="bold" gutterBottom>ניהול פניות</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: '40px' }}>
                                        צפייה בכל הקריאות, סינון, וניהול הטיפול השוטף.
                                    </Typography>
                                    <Divider sx={{ width: '40%', my: 2 }} />
                                    <Box sx={{ display: 'flex', alignItems: 'center', color: '#2563eb', fontWeight: 'bold' }}>
                                        <Typography variant="button">כניסה למודול</Typography>
                                        <ArrowBackIcon sx={{ ml: 1, fontSize: 18 }} />
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Card
                            elevation={2}
                            sx={{
                                height: '100%', borderRadius: 4,
                                transition: 'all 0.3s ease',
                                '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }
                            }}
                        >
                            <CardActionArea
                                onClick={() => navigate('/dashboard/users')}
                                sx={{ height: '100%', p: 2 }}
                            >
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                    <Box sx={{ p: 2.5, borderRadius: '50%', bgcolor: '#ecfdf5', color:  '#2563eb', mb: 3 }}>
                                        <PeopleIcon fontSize="large" />
                                    </Box>
                                    <Typography variant="h5" fontWeight="bold" gutterBottom>ניהול משתמשים</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: '40px' }}>
                                        הוספת משתמשים חדשים, ניהול הרשאות וצפייה בלקוחות.
                                    </Typography>
                                    <Divider sx={{ width: '40%', my: 2 }} />
                                    <Box sx={{ display: 'flex', alignItems: 'center', color:  '#2563eb', fontWeight: 'bold' }}>
                                        <Typography variant="button">כניסה למודול</Typography>
                                        <ArrowBackIcon sx={{ ml: 1, fontSize: 18 }} />
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>

                    {/* --- כרטיס 3: ניהול סטטוסים --- */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Card
                            elevation={2}
                            sx={{
                                height: '100%', borderRadius: 4,
                                transition: 'all 0.3s ease',
                                '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }
                            }}
                        >
                            <CardActionArea
                                onClick={() => navigate('/dashboard/createStatuses')}
                                sx={{ height: '100%', p: 2 }}
                            >
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                    <Box sx={{ p: 2.5, borderRadius: '50%', bgcolor: '#ecfdf5', color:  '#2563eb', mb: 3 }}>
                                        <CategoryIcon fontSize="large" />
                                    </Box>
                                    <Typography variant="h5" fontWeight="bold" gutterBottom>ניהול סטטוסים</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: '40px' }}>
                                        הגדרה ועריכה של שלבי הטיפול (סטטוסים) במערכת.
                                    </Typography>
                                    <Divider sx={{ width: '40%', my: 2 }} />
                                    <Box sx={{ display: 'flex', alignItems: 'center', color:  '#2563eb', fontWeight: 'bold' }}>
                                        <Typography variant="button">כניסה למודול</Typography>
                                        <ArrowBackIcon sx={{ ml: 1, fontSize: 18 }} />
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>

                </Grid>

            </Container>
        </ThemeProvider>
    );
}

export default AdminView;