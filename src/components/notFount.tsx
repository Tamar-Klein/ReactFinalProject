import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, Paper, ThemeProvider, createTheme, CssBaseline } from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import SearchOffIcon from '@mui/icons-material/SearchOff';

const defaultTheme = createTheme({
    direction: 'rtl',
    typography: { fontFamily: 'Rubik, Arial, sans-serif' },
    palette: {
        primary: { main: '#1e293b' },
        secondary: { main: '#2563eb' },
        background: { default: '#f8fafc' },
    },
});

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Container maxWidth="md">
                <Box
                    sx={{
                        height: '80vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}
                >
                    <Paper
                        elevation={0}
                        sx={{
                            p: 6,
                            borderRadius: 4,
                            bgcolor: 'transparent',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Box
                            sx={{
                                position: 'relative',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                mb: 4
                            }}
                        >
                            <SearchOffIcon
                                sx={{
                                    fontSize: 120,
                                    color: '#e2e8f0',
                                    position: 'absolute'
                                }}
                            />
                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: '8rem',
                                    fontWeight: 900,
                                    color: 'primary.main',
                                    opacity: 0.8,
                                    zIndex: 1,
                                    letterSpacing: -5
                                }}
                            >
                                404
                            </Typography>
                        </Box>

                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: '#1e293b' }}>
                            אופס! הדף לא נמצא
                        </Typography>

                        <Typography variant="body1" sx={{ color: '#64748b', mb: 4, maxWidth: '400px' }}>
                            מצטערים, נראה שהדף שחיפשת הוסר, שונה או שמעולם לא היה קיים במערכת ה-HelpDesk שלנו.
                        </Typography>

                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<HomeIcon sx={{ ml: 1 }} />}
                            onClick={() => navigate('/dashboard')}
                            sx={{
                                py: 1.5,
                                px: 4,
                                borderRadius: 2,
                                fontWeight: 'bold',
                                textTransform: 'none',
                                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
                                '&:hover': {
                                    boxShadow: '0 6px 16px rgba(37, 99, 235, 0.3)',
                                }
                            }}
                        >
                            חזרה לדף הבית
                        </Button>
                    </Paper>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default NotFound;