import React from 'react';
import { useForm } from 'react-hook-form';
import { postLogin, postRegister } from '../services/authenticationApi';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../features/authSlice";
import Swal from 'sweetalert2';
import { Container, Box, Avatar, Typography, TextField, Button, Paper, Grid, CssBaseline } from '@mui/material';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme({
    typography: { fontFamily: 'Rubik, Arial, sans-serif' },
    palette: {
        primary: { main: '#1e293b' },
        secondary: { main: '#2563eb' },
    },
});

export interface FormValuesRegister {
    name: string;
    email: string;
    password: string;
}

const Register: React.FC = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValuesRegister>();
    const dispatch = useDispatch();
    const nav = useNavigate();

    const onSubmit = async (data: FormValuesRegister) => {
        try {
            const response = await postRegister(data);
            if (response) {
                Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000 }).fire({ icon: 'success', title: 'ההרשמה בוצעה, מתחבר...' });

                const loginResponse = await postLogin({ email: data.email, password: data.password });
                if (loginResponse?.token) {
                    dispatch(setCredentials({ user: loginResponse.user, token: loginResponse.token }));
                    nav('/dashboard');
                }
                reset();
            }
        } catch (error: any) {
            if (error?.response?.status === 409) {
                Swal.fire({ icon: 'warning', title: 'משתמש קיים', text: 'האימייל כבר רשום במערכת.', confirmButtonColor: '#1e293b' });
            } else {
                Swal.fire({ icon: 'error', title: 'שגיאה', text: 'תקלה בהרשמה.', confirmButtonColor: '#1e293b' });
            }
        }
    };

    const navigateToLogin = () => nav('/login');

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Paper elevation={6} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 3, width: '100%' }}>

                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}>
                            <PersonAddOutlinedIcon fontSize="large" />
                        </Avatar>

                        <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 1 }}>
                            יצירת חשבון
                        </Typography>

                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            הצטרפו למערכת ה-HelpDesk
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, width: '100%' }}>
                            <TextField
                                margin="normal" required fullWidth id="name" label="שם מלא" autoFocus dir="rtl"
                                {...register("name", { required: "יש להזין שם" })}
                                error={!!errors.name} helperText={errors.name?.message}
                                sx={{ '& .MuiOutlinedInput-root': { '&:hover fieldset': { borderColor: 'primary.main' } } }}
                            />

                            <TextField
                                margin="normal" required fullWidth id="email" label="כתובת אימייל" autoComplete="email" dir="rtl"
                                {...register("email", { required: "יש להזין אימייל", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "אימייל לא תקין" } })}
                                error={!!errors.email} helperText={errors.email?.message}
                            />

                            <TextField
                                margin="normal" required fullWidth label="סיסמה" type="password" id="password" dir="rtl"
                                {...register("password", { required: "יש להזין סיסמה", pattern: { value: /^(?=.*[A-Za-z])(?=.*\d).{6,16}$/, message: "אותיות ומספרים (6-16 תווים)" } })}
                                error={!!errors.password} helperText={errors.password?.message}
                            />

                            <Button
                                type="submit" fullWidth variant="contained" size="large"
                                sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1.1rem', fontWeight: 'bold', borderRadius: 2, background: 'linear-gradient(45deg, #2563eb 30%, #1e293b 90%)', boxShadow: '0 3px 5px 2px rgba(37, 99, 235, .3)' }}
                            >
                                הרשמה
                            </Button>

                            <Grid container justifyContent="center">
                                <Grid size="grow">
                                    <Button onClick={navigateToLogin} variant="text" color="primary" sx={{ textDecoration: 'underline' }}>
                                        {"כבר רשום? התחבר כאן"}
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

export default Register;