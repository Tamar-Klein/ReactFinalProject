import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postLogin } from '../services/authenticationApi';
import { setCredentials } from '../features/authSlice';
import Swal from 'sweetalert2';
import { Container, Box, Avatar, Typography, TextField, Button, Paper, Grid, CssBaseline } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme({
    typography: { fontFamily: 'Rubik, Arial, sans-serif' },
    palette: {
        primary: { main: '#1e293b' },
        secondary: { main: '#2563eb' },
    },
});

export interface FormValues {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();
    const nav = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async (data: FormValues) => {
        try {
            const response = await postLogin(data);
            if (response) {
                dispatch(setCredentials({ user: response.user, token: response.token }));
                Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, timerProgressBar: true })
                    .fire({ icon: 'success', title: 'התחברת בהצלחה' });
                nav('/dashboard');
                reset();
            } else {
                Swal.fire({ icon: 'error', title: 'שגיאת התחברות', text: 'אימייל או סיסמה שגויים.', confirmButtonColor: '#2563eb' });
            }
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'שגיאה', text: 'אירעה תקלה בתקשורת עם השרת.', confirmButtonColor: '#2563eb' });
        }
    };

    const registerFromLogin = () => nav('/register');

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Paper elevation={6} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 3, width: '100%' }}>

                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}>
                            <LockOutlinedIcon fontSize="large" />
                        </Avatar>

                        <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 1 }}>
                            כניסה למערכת
                        </Typography>

                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            ברוכים הבאים ל-HelpDesk
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, width: '100%' }}>
                            <TextField
                                margin="normal" required fullWidth id="email" label="כתובת אימייל" autoComplete="email" autoFocus dir="rtl"
                                {...register("email", { required: "יש להזין אימייל", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "כתובת אימייל לא תקינה" } })}
                                error={!!errors.email} helperText={errors.email?.message}
                                sx={{ '& .MuiOutlinedInput-root': { '&:hover fieldset': { borderColor: 'secondary.main' } } }}
                            />

                            <TextField
                                margin="normal" required fullWidth label="סיסמה" type="password" id="password" autoComplete="current-password" dir="rtl"
                                {...register("password", { required: "יש להזין סיסמה", minLength: { value: 6, message: "מינימום 6 תווים" } })}
                                error={!!errors.password} helperText={errors.password?.message}
                            />

                            <Button
                                type="submit" fullWidth variant="contained" size="large"
                                sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1.1rem', fontWeight: 'bold', borderRadius: 2, background: 'linear-gradient(45deg, #2563eb 30%, #1e293b 90%)', boxShadow: '0 3px 5px 2px rgba(37, 99, 235, .3)' }}
                            >
                                התחבר
                            </Button>

                            <Grid container justifyContent="center">
                                <Grid size="grow">
                                    <Button onClick={registerFromLogin} variant="text" color="secondary" sx={{ textDecoration: 'underline' }}>
                                        {"אין לך חשבון? הירשם כאן"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Login;