import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createNewUser } from "../../features/usersSlice";
import type { AppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { Container, Box, Typography, TextField, Button, Paper, Grid, Avatar, InputAdornment, CssBaseline, MenuItem, CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const defaultTheme = createTheme({
    typography: { fontFamily: 'Rubik, Arial, sans-serif' },
    palette: {
        primary: { main: '#1e293b' },
        secondary: { main: '#2563eb' },
    },
});

interface FormValues {
    name: string;
    email: string;
    password: string;
    role: string;
}

const CreateUserForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
        defaultValues: { role: 'customer' }
    });
    const navigate = useNavigate();

    const onSubmit = async (data: FormValues) => {
        try {
            await dispatch(createNewUser(data)).unwrap();
            Swal.fire({ icon: 'success', title: 'המשתמש נוצר בהצלחה!', showConfirmButton: false, timer: 1500 });
            reset();
            navigate("/dashboard/users");
        } catch (err) {
            Swal.fire({ icon: 'error', title: 'שגיאה', text: 'לא ניתן היה ליצור את המשתמש.', confirmButtonColor: '#1e293b' });
        }
    };

    const handleCancel = () => navigate("/dashboard/users");

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Paper elevation={6} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 3, width: '100%' }}>

                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 60, height: 60 }}>
                            <PersonAddAlt1Icon fontSize="large" />
                        </Avatar>

                        <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 1 }}>
                            יצירת משתמש חדש
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                            הזן את פרטי המשתמש ליצירת חשבון במערכת
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ width: '100%' }}>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        fullWidth id="name" label="שם מלא" dir="rtl"
                                        InputProps={{ startAdornment: (<InputAdornment position="start"><PersonOutlineIcon color="action" /></InputAdornment>) }}
                                        {...register("name", { required: "שם הוא שדה חובה" })}
                                        error={!!errors.name} helperText={errors.name?.message}
                                        disabled={isSubmitting} // חסימה בעת שליחה
                                    />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        fullWidth id="email" label="כתובת אימייל" type="email" dir="rtl"
                                        InputProps={{ startAdornment: (<InputAdornment position="start"><EmailOutlinedIcon color="action" /></InputAdornment>) }}
                                        {...register("email", { required: "אימייל חובה", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "אימייל לא תקין" } })}
                                        error={!!errors.email} helperText={errors.email?.message}
                                        disabled={isSubmitting}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth id="password" label="סיסמה" type="password" dir="rtl"
                                        InputProps={{ startAdornment: (<InputAdornment position="start"><LockOutlinedIcon color="action" /></InputAdornment>) }}
                                        {...register("password", { required: "סיסמה חובה", minLength: { value: 6, message: "מינימום 6 תווים" } })}
                                        error={!!errors.password} helperText={errors.password?.message}
                                        disabled={isSubmitting}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        select fullWidth id="role" label="תפקיד" defaultValue="customer" dir="rtl"
                                        InputProps={{ startAdornment: (<InputAdornment position="start"><BadgeOutlinedIcon color="action" /></InputAdornment>) }}
                                        inputProps={register("role", { required: "יש לבחור תפקיד" })}
                                        error={!!errors.role}
                                        disabled={isSubmitting}
                                    >
                                        <MenuItem value="customer">לקוח</MenuItem>
                                        <MenuItem value="agent">נציג</MenuItem>
                                        <MenuItem value="admin">מנהל</MenuItem>
                                    </TextField>
                                </Grid>
                            </Grid>

                            {/* כפתור עם מצב טעינה */}
                            <Button
                                type="submit" fullWidth variant="contained" size="large"
                                disabled={isSubmitting}
                                sx={{ mt: 4, mb: 2, py: 1.5, fontWeight: 'bold', borderRadius: 2, background: 'linear-gradient(45deg, #2563eb 30%, #1e293b 90%)', boxShadow: '0 3px 5px 2px rgba(37, 99, 235, .3)' }}
                            >
                                {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "צור משתמש"}
                            </Button>

                            <Grid container spacing={2}>
                                <Grid size={{ xs: 6 }}>
                                    <Button fullWidth variant="outlined" onClick={() => reset()} startIcon={<RestartAltIcon />} disabled={isSubmitting}>
                                        איפוס
                                    </Button>
                                </Grid>
                                <Grid size={{ xs: 6 }}>
                                    <Button fullWidth variant="text" color="error" onClick={handleCancel} startIcon={<CancelOutlinedIcon />} disabled={isSubmitting}>
                                        ביטול
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

export default CreateUserForm;