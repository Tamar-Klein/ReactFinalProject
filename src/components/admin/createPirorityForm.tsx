import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { createPriority } from "../../features/ticketsSlice";
import type { AppDispatch, RootState } from "../../store";
import { Container, Box, Typography, TextField, Button, Paper, Avatar, InputAdornment, CssBaseline, CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FlagIcon from '@mui/icons-material/Flag'; // אייקון דגל לעדיפות
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import LockIcon from '@mui/icons-material/Lock';
const defaultTheme = createTheme({
    typography: { fontFamily: 'Rubik, Arial, sans-serif' },
    palette: {
        primary: { main: '#1e293b' },
        secondary: { main: '#2563eb' },
    },
});

const CreatePriorityForm = () => {
    const role = useSelector((state: RootState) => state.auth.user?.role);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { handleSubmit, reset } = useForm();

    const [newPriorityName, setNewPriorityName] = useState("");
    const [inputError, setInputError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async () => {
        if (!newPriorityName.trim()) {
            setInputError(true);
            return;
        }

        setIsLoading(true);
        try {

            await dispatch(createPriority(newPriorityName)).unwrap();

            setNewPriorityName("");
            setInputError(false);

            Swal.fire({ icon: 'success', title: 'עדיפות נוצרה בהצלחה!', showConfirmButton: false, timer: 1500 });
            reset();
            navigate("/dashboard");
        } catch (err) {
            Swal.fire({ icon: 'error', title: 'שגיאה', text: 'יצירת העדיפות נכשלה.', confirmButtonColor: '#1e293b' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => navigate("/dashboard");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPriorityName(e.target.value);
        if (e.target.value.trim()) setInputError(false);
    };

    if (role !== "admin") {
        return (
            <ThemeProvider theme={defaultTheme}>
                <Container maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>
                    <Avatar sx={{ m: 'auto', bgcolor: 'error.main', width: 60, height: 60, mb: 2 }}><LockIcon fontSize="large" /></Avatar>
                    <Typography variant="h5" color="error">אין גישה</Typography>
                    <Typography color="text.secondary">דף זה מיועד למנהלי מערכת בלבד.</Typography>
                    <Button variant="outlined" onClick={() => navigate('/dashboard')} sx={{ mt: 2 }}>חזור לראשי</Button>
                </Container>
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Paper elevation={6} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 3, width: '100%' }}>

                        {/* אייקון דגל כתום המסמל עדיפות */}
                        <Avatar sx={{ m: 1, bgcolor: '#f59e0b', width: 56, height: 56 }}>
                            <FlagIcon fontSize="large" />
                        </Avatar>

                        <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 1 }}>
                            ניהול עדיפויות
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                            הגדרת רמות דחיפות חדשות (SLA) למערכת
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ width: '100%' }}>
                            <TextField
                                fullWidth
                                id="namePriority"
                                label="שם העדיפות החדשה"
                                placeholder="לדוגמה: קריטית, דחופה מאוד..."
                                value={newPriorityName}
                                onChange={handleInputChange}
                                error={inputError}
                                helperText={inputError ? "שם העדיפות אינו יכול להיות ריק" : ""}
                                dir="rtl"
                                disabled={isLoading}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LowPriorityIcon color="action" />
                                        </InputAdornment>
                                    )
                                }}
                                sx={{ mb: 3 }}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                disabled={isLoading}
                                sx={{
                                    py: 1.5,
                                    fontWeight: 'bold',
                                    borderRadius: 2,
                                    background: 'linear-gradient(45deg, #f59e0b 30%, #fbbf24 90%)', // גרדיאנט כתום/זהוב
                                    boxShadow: '0 3px 5px 2px rgba(245, 158, 11, .3)',
                                    '&:hover': { background: 'linear-gradient(45deg, #d97706 30%, #f59e0b 90%)' }
                                }}
                            >
                                {isLoading ? <CircularProgress size={24} color="inherit" /> : <><AddCircleOutlineIcon sx={{ ml: 1 }} /> צור עדיפות</>}
                            </Button>

                            <Button
                                fullWidth
                                variant="text"
                                color="error"
                                onClick={handleCancel}
                                startIcon={<CancelOutlinedIcon />}
                                sx={{ mt: 1 }}
                                disabled={isLoading}
                            >
                                ביטול
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default CreatePriorityForm;