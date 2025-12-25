import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store";
import { Container, Grid, Box, Typography, Card, CardContent, CardActionArea, Avatar, Divider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const defaultTheme = createTheme({
    direction: 'rtl',
    typography: { fontFamily: 'Rubik, Arial, sans-serif' },
    palette: {
        primary: { main: '#1e293b' },
        secondary: { main: '#2563eb' },
        background: { default: '#f8fafc' },
    },
});

const AgentView = () => {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }} dir="rtl">

                <Box sx={{ mb: 8, textAlign: 'center' }}>
                    <Avatar sx={{ bgcolor: 'secondary.main', width: 70, height: 70, margin: '0 auto', mb: 2, boxShadow: '0 4px 10px rgba(37, 99, 235, 0.3)' }}>
                        <SupportAgentIcon fontSize="large" />
                    </Avatar>
                    <Typography variant="h3" fontWeight="bold" color="primary.main" gutterBottom>
                        עמדת נציג שירות
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
                        היי {user?.name || "נציג יקר"}, מוכן לטפל בפניות?
                        <br />
                        זהו מרכז השליטה שלך לניהול קריאות הלקוחות.
                    </Typography>
                </Box>

                <Grid container justifyContent="center">
                    <Grid size={{ xs: 12, md: 6, lg: 5 }}>
                        <Card
                            elevation={3}
                            sx={{
                                borderRadius: 4,
                                transition: 'all 0.3s ease',
                                border: '1px solid rgba(255, 255, 255, 0.6)',
                                background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
                                    borderColor: 'secondary.main'
                                }
                            }}
                        >
                            <CardActionArea
                                onClick={() => navigate('/dashboard/tickets')}
                                sx={{ p: 4, height: '100%' }}
                            >
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

                                    {/* אייקון בולט */}
                                    <Box sx={{
                                        p: 3,
                                        borderRadius: '50%',
                                        bgcolor: '#eff6ff',
                                        color: '#2563eb',
                                        mb: 3,
                                        boxShadow: 'inset 0 2px 4px 0 rgba(0,0,0,0.05)'
                                    }}>
                                        <ConfirmationNumberIcon sx={{ fontSize: 50 }} />
                                    </Box>

                                    <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#1e293b' }}>
                                        פניות ומשימות
                                    </Typography>

                                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
                                        כניסה למערכת הטיקטים. צפייה בפניות פתוחות, עדכון סטטוסים ומענה ללקוחות.
                                    </Typography>

                                    <Divider sx={{ width: '60%', mb: 3, borderColor: '#e2e8f0' }} />

                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        bgcolor: 'primary.main',
                                        color: 'white',
                                        py: 1.5,
                                        px: 4,
                                        borderRadius: 2,
                                        fontWeight: 'bold',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                                    }}>
                                        <Typography variant="button" sx={{ fontSize: '1.1rem', ml: 1 }}>התחל לעבוד</Typography>
                                        <ArrowBackIcon />
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

export default AgentView;