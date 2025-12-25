import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { createNewTicket, getPriorities } from "../features/ticketsSlice";
import type { AppDispatch, RootState } from "../store";
import { Container, Box, Typography, TextField, Button, Paper, Avatar, InputAdornment, CssBaseline, CircularProgress, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PostAddIcon from '@mui/icons-material/PostAdd';
import SubjectIcon from '@mui/icons-material/Subject';
import DescriptionIcon from '@mui/icons-material/Description';
import LowPriorityIcon from '@mui/icons-material/LowPriority';

const defaultTheme = createTheme({
    direction: 'rtl',
    typography: { fontFamily: 'Rubik, Arial, sans-serif' },
    palette: {
        primary: { main: '#1e293b' },
        secondary: { main: '#2563eb' },
    },
});

export interface AddTicketValues {
    subject: string;
    description: string;
    priority_id: number;
}

const NewTicketForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const priorities = useSelector((state: RootState) => state.tickets.priroties || []);

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<AddTicketValues>({
        defaultValues: {
            priority_id: 1
        }
    });

    useEffect(() => {
        dispatch(getPriorities());
    }, [dispatch]);

    const onSubmit = async (data: AddTicketValues) => {
        const payload = {
            ...data,
            priority_id: Number(data.priority_id)
        };

        try {
            const resultAction = await dispatch(createNewTicket(payload));
            if (createNewTicket.fulfilled.match(resultAction)) {
                Swal.fire({ icon: 'success', title: 'הפנייה נפתחה!', showConfirmButton: false, timer: 2000 });
                navigate("/dashboard/tickets");
                reset();
            } else {
                Swal.fire({ icon: 'error', title: 'שגיאה', text: "נכשל ביצירת הפנייה" });
            }
        } catch (err) {
            Swal.fire({ icon: 'error', title: 'שגיאה', text: 'תקלה בשליחת הטופס' });
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }} dir="rtl">
                    <Paper elevation={6} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 3, width: '100%' }}>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 60, height: 60 }}>
                            <PostAddIcon fontSize="large" />
                        </Avatar>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>פתיחת קריאה חדשה</Typography>

                        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ width: '100%' }}>
                            <TextField
                                margin="normal" required fullWidth label="נושא הפנייה"
                                InputProps={{ startAdornment: (<InputAdornment position="start"><SubjectIcon color="action" /></InputAdornment>) }}
                                {...register("subject", { required: "יש להזין נושא" })}
                                error={!!errors.subject} helperText={errors.subject?.message}
                            />

                            <TextField
                                margin="normal" required fullWidth multiline rows={4} label="תיאור מפורט"
                                InputProps={{ startAdornment: (<InputAdornment position="start" sx={{ mt: 1.5 }}><DescriptionIcon color="action" /></InputAdornment>) }}
                                {...register("description", { required: "יש להזין תיאור" })}
                                error={!!errors.description} helperText={errors.description?.message}
                            />

                            <TextField
                                select
                                margin="normal"
                                fullWidth
                                label="רמת דחיפות"
                                defaultValue={1}
                                InputProps={{ startAdornment: (<InputAdornment position="start"><LowPriorityIcon color="action" /></InputAdornment>) }}
                                {...register("priority_id", { required: "יש לבחור עדיפות" })}
                                error={!!errors.priority_id}
                            >
                                {priorities.length > 0 ? (
                                    priorities.map((p: any) => (
                                        p && p.id ? (
                                            <MenuItem key={p.id} value={p.id}>
                                                {p.name}
                                            </MenuItem>
                                        ) : null
                                    ))
                                ) : (
                                    <MenuItem disabled>טוען עדיפויות...</MenuItem>
                                )}
                            </TextField>

                            <Button
                                type="submit" fullWidth variant="contained" size="large" disabled={isSubmitting}
                                sx={{ mt: 4, mb: 2, py: 1.5, fontWeight: 'bold', borderRadius: 2 }}
                            >
                                {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "שלח פנייה"}
                            </Button>

                            <Button fullWidth variant="text" color="error" onClick={() => navigate("/dashboard")}>
                                ביטול
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Container >
        </ThemeProvider >
    );
}

export default NewTicketForm;