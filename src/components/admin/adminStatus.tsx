import { Outlet, useNavigate } from "react-router-dom";
import { Container, Box, Typography, Button, Paper, Avatar, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import CategoryIcon from '@mui/icons-material/Category';
import FlagIcon from '@mui/icons-material/Flag';
const defaultTheme = createTheme({
    direction: 'rtl',
    typography: { fontFamily: 'Rubik, Arial, sans-serif' },
    palette: {
        primary: { main: '#1e293b' },
        secondary: { main: '#2563eb' },
        background: { default: '#f8fafc' },
    },
});
const AdminStatus = () => {
    const navigate = useNavigate();
    const addStatus = () => {
        navigate("newstatus");
    }
    const addPriority = () => {
        navigate("newPriority");
    }


    return (
        <ThemeProvider theme={defaultTheme}>
            <Container maxWidth="md" sx={{ mt: 6, mb: 8 }} dir="rtl">

                {/* כותרת הדף */}
                <Box sx={{ textAlign: 'center', mb: 5 }}>
                    <Avatar sx={{ m: 'auto', bgcolor: 'primary.main', width: 64, height: 64, mb: 2, boxShadow: 3 }}>
                        <SettingsSuggestIcon fontSize="large" />
                    </Avatar>
                    <Typography variant="h4" fontWeight="bold" color="primary.main">
                        הגדרות מערכת
                    </Typography>
                    <Typography color="text.secondary">
                        בחר איזו הגדרה ברצונך להוסיף
                    </Typography>
                </Box>

                {/* אזור הכפתורים - מעוצב כסרגל כלים */}
                <Paper elevation={2} sx={{
                    p: 2,
                    mb: 4,
                    borderRadius: 3,
                    bgcolor: 'white',
                    border: '1px solid #e2e8f0'
                }}>
                    <Grid container spacing={2}>
                        {/* כפתור הוסף סטטוס */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Button
                                fullWidth
                                variant="outlined"
                                size="large"
                                onClick={() => addStatus()}
                                startIcon={<CategoryIcon />}
                                sx={{
                                    py: 2,
                                    borderWidth: 2,
                                    borderRadius: 2,
                                    fontWeight: 'bold',
                                    fontSize: '1.1rem',
                                    borderColor: '#e2e8f0',
                                    color: '#64748b',
                                    '&:hover': {
                                        borderColor: 'secondary.main',
                                        color: 'secondary.main',
                                        bgcolor: '#eff6ff'
                                    }
                                }}
                            >
                                הוסף סטטוס
                            </Button>
                        </Grid>

                        {/* כפתור הוסף עדיפות */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Button
                                fullWidth
                                variant="outlined"
                                size="large"
                                onClick={() => addPriority()}
                                startIcon={<FlagIcon />}
                                sx={{
                                    py: 2,
                                    borderWidth: 2,
                                    borderRadius: 2,
                                    fontWeight: 'bold',
                                    fontSize: '1.1rem',
                                    borderColor: '#e2e8f0',
                                    color: '#64748b',
                                    '&:hover': {
                                        borderColor: '#f59e0b', // כתום
                                        color: '#f59e0b',
                                        bgcolor: '#fffbeb'
                                    }
                                }}
                            >
                                הוסף עדיפות
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>

                {/* אזור התוכן המשתנה (Outlet) */}
                <Box sx={{ minHeight: '400px', animation: 'fadeIn 0.5s ease-in-out' }}>
                    <Outlet />
                </Box>

            </Container>
        </ThemeProvider>
    );
}

export default AdminStatus;