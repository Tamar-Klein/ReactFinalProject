import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store";
import { Container, Grid, Box, Typography, Card, CardContent, CardActionArea, Avatar, Divider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PostAddIcon from '@mui/icons-material/PostAdd'; // אייקון הוספה
import ListAltIcon from '@mui/icons-material/ListAlt'; // אייקון רשימה
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

const defaultTheme = createTheme({
    direction: 'rtl',
    typography: { fontFamily: 'Rubik, Arial, sans-serif' },
    palette: {
        primary: { main: '#1e293b' },
        secondary: { main: '#2563eb' },
        background: { default: '#f8fafc' },
    },
});

const CustomerView = () => {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }} dir="rtl">

                <Box sx={{ mb: 8, textAlign: 'center' }}>
                    <Avatar sx={{ bgcolor: 'secondary.main', width: 64, height: 64, margin: '0 auto', mb: 2 }}>
                        <SentimentSatisfiedAltIcon fontSize="large" />
                    </Avatar>
                    <Typography variant="h3" fontWeight="bold" color="primary.main" gutterBottom>
                        שלום, {user?.name || "לקוח יקר"}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        איך נוכל לעזור לך היום?
                    </Typography>
                </Box>

                <Grid container spacing={4} justifyContent="center">

                    <Grid size={{ xs: 12, md: 5 }}>
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
                                sx={{ height: '100%', p: 3 }}
                            >
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

                                    <Box sx={{ p: 2.5, borderRadius: '50%', bgcolor: '#eff6ff', color: '#2563eb', mb: 3 }}>
                                        <ListAltIcon sx={{ fontSize: 40 }} />
                                    </Box>

                                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                                        הפניות שלי
                                    </Typography>

                                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                                        צפייה בסטטוס פניות קודמות, היסטוריית טיפול ותגובות הנציגים.
                                    </Typography>

                                    <Divider sx={{ width: '40%', my: 2 }} />

                                    <Box sx={{ display: 'flex', alignItems: 'center', color: '#2563eb', fontWeight: 'bold' }}>
                                        <Typography variant="button">לצפייה בפניות</Typography>
                                        <ArrowBackIcon sx={{ ml: 1, fontSize: 18 }} />
                                    </Box>

                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>

                    <Grid size={{ xs: 12, md: 5 }}>
                        <Card
                            elevation={2}
                            sx={{
                                height: '100%', borderRadius: 4,
                                transition: 'all 0.3s ease',
                                '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }
                            }}
                        >
                            <CardActionArea
                                onClick={() => navigate('/dashboard/tickets/new')}
                                sx={{ height: '100%', p: 3 }}
                            >
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

                                    <Box sx={{ p: 2.5, borderRadius: '50%', bgcolor: '#eff6ff', color: '#2563eb', mb: 3 }}>
                                        <PostAddIcon sx={{ fontSize: 40 }} />
                                    </Box>

                                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                                        פתיחת פנייה חדשה
                                    </Typography>

                                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                                        נתקלת בבעיה? יש לך שאלה? פתח קריאה חדשה ונטפל בה בהקדם.
                                    </Typography>

                                    <Divider sx={{ width: '40%', my: 2 }} />

                                    <Box sx={{ display: 'flex', alignItems: 'center', color: '#2563eb', fontWeight: 'bold' }}>
                                        <Typography variant="button">צור פנייה</Typography>
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

export default CustomerView;