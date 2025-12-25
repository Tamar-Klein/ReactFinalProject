import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { createStatus } from "../../features/ticketsSlice";
import type { AppDispatch, RootState } from "../../store";

import { Container, Box, Typography, TextField, Button, Paper, Avatar, InputAdornment, CssBaseline, CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import CategoryIcon from '@mui/icons-material/Category';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import LockIcon from '@mui/icons-material/Lock';

const defaultTheme = createTheme({
    typography: { fontFamily: 'Rubik, Arial, sans-serif' },
    palette: {
        primary: { main: '#1e293b' },
        secondary: { main: '#2563eb' },
    },
});

const CreateStatusesCo = () => {
    const role = useSelector((state: RootState) => state.auth.user?.role);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { handleSubmit, reset } = useForm();

    const [newStatusName, setNewStatusName] = useState("");
    const [inputError, setInputError] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // מצב טעינה

    const onSubmit = async () => {
        if (!newStatusName.trim()) {
            setInputError(true);
            return;
        }

        setIsLoading(true);
        try {
            await dispatch(createStatus(newStatusName)).unwrap();
            setNewStatusName("");
            setInputError(false);

            Swal.fire({ icon: 'success', title: 'סטטוס נוצר!', showConfirmButton: false, timer: 1500 });
            reset();
            navigate("/dashboard");
        } catch (err) {
            Swal.fire({ icon: 'error', title: 'שגיאה', text: 'יצירת הסטטוס נכשלה.', confirmButtonColor: '#1e293b' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => navigate("/dashboard");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewStatusName(e.target.value);
        if (e.target.value.trim()) setInputError(false);
    };

    if (role !== "admin") {
        return (
            <ThemeProvider theme={defaultTheme}>
                <Container maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>
                    <Avatar sx={{ m: 'auto', bgcolor: 'error.main', width: 60, height: 60, mb: 2 }}><LockIcon fontSize="large" /></Avatar>
                    <Typography variant="h5" color="error">אין גישה</Typography>
                    <Button variant="outlined" onClick={() => navigate('/dashboard')} sx={{ mt: 2 }}>חזור לראשי</Button>
                </Container>
            </ThemeProvider>
        );
    }

    return (<>
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Paper elevation={6} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 3, width: '100%' }}>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}><CategoryIcon fontSize="large" /></Avatar>

                        <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 1 }}>
                            ניהול סטטוסים
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                            הוספת אפשרויות סטטוס חדשות לטיקטים
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ width: '100%' }}>
                            <TextField
                                fullWidth id="nameStatus" label="שם הסטטוס החדש" placeholder="לדוגמה: בטיפול, סגור..."
                                value={newStatusName} onChange={handleInputChange}
                                error={inputError} helperText={inputError ? "שם הסטטוס אינו יכול להיות ריק" : ""}
                                dir="rtl" disabled={isLoading}
                                InputProps={{ startAdornment: (<InputAdornment position="start"><LabelImportantIcon color="action" /></InputAdornment>) }}
                                sx={{ mb: 3 }}
                            />

                            <Button
                                type="submit" fullWidth variant="contained" size="large"
                                disabled={isLoading} // חסימת כפתור
                                sx={{ py: 1.5, fontWeight: 'bold', borderRadius: 2, background: 'linear-gradient(45deg, #2563eb 30%, #1e293b 90%)', boxShadow: '0 3px 5px 2px rgba(37, 99, 235, .3)' }}
                            >
                                {isLoading ? <CircularProgress size={24} color="inherit" /> : <><AddCircleOutlineIcon sx={{ ml: 1 }} /> הוסף סטטוס</>}
                            </Button>

                            <Button fullWidth variant="text" color="error" onClick={handleCancel} startIcon={<CancelOutlinedIcon />} sx={{ mt: 1 }} disabled={isLoading}>
                                ביטול
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </ThemeProvider>
    </>
    );
}

export default CreateStatusesCo;