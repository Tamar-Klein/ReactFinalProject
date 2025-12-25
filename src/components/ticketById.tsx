import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import type { AppDispatch, RootState } from "../store";
import { fetchAllStatuses, fetchTicketById, getComments, postComments, removeTicket, updateTicketAsync } from "../features/ticketsSlice";
import type { TicketComment } from "../models/comments";
import type { Status } from "../models/status";
import {
    Grid, Box, Typography, TextField, Button, Paper,
    Avatar, Divider, FormControl, InputLabel,
    Select, MenuItem, Stack, CircularProgress, IconButton, Chip
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import SendIcon from '@mui/icons-material/Send';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PersonIcon from '@mui/icons-material/Person';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SubjectIcon from '@mui/icons-material/Subject';

const defaultTheme = createTheme({
    direction: 'rtl',
    typography: { fontFamily: 'Rubik, Arial, sans-serif' },
    palette: {
        primary: { main: '#1e293b' },
        secondary: { main: '#2563eb' },
        background: { default: '#f1f5f9' },
    },
});

export interface AddComment {
    content: string;
}

const TicketById: React.FC = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const ticket = useSelector((state: RootState) => state.tickets.selectedTicket);
    const comments = useSelector((state: RootState) => state.tickets.currentComments);
    const currentUser = useSelector((state: RootState) => state.auth.user);
    const role = currentUser?.role;
    const statuses = useSelector((state: RootState) => state.tickets.statuses);
    const allUsers = useSelector((state: RootState) => state.users.allUsers || []);

    const { register, handleSubmit, reset, formState: { } } = useForm<AddComment>();
    const commentsEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (id) {
            dispatch(fetchTicketById(Number(id)));
            dispatch(getComments(Number(id)));
        }
        dispatch(fetchAllStatuses());
    }, [dispatch, id, role]);

    useEffect(() => {
        scrollToBottom();
    }, [comments]);

    const scrollToBottom = () => {
        commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const onSubmit = async (data: AddComment) => {
        if (id && data.content.trim()) {
            try {
                await dispatch(postComments({ id: Number(id), comment: data.content })).unwrap();
                reset();
            } catch (err) {
                console.log(err);
                Swal.fire({ icon: 'error', title: 'שגיאה', text: 'שליחת התגובה נכשלה' });
            }
        }
    };

    const handleUpdateTicket = async (fields: { status_id?: number, priority_id?: number, assigned_to?: number }) => {
        try {
            await dispatch(updateTicketAsync({ id: Number(id), data: fields })).unwrap();
            const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 2000 });
            Toast.fire({ icon: 'success', title: 'עודכן בהצלחה' });
        } catch (err) {
            Swal.fire({ icon: 'error', title: 'שגיאה', text: 'עדכון הפרטים נכשל' });
        }
    };

    const deleteT = async () => {
        Swal.fire({
            title: 'למחוק את הפנייה?',
            text: "פעולה זו היא בלתי הפיכה",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonText: 'ביטול',
            confirmButtonText: 'מחק'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await dispatch(removeTicket(Number(id))).unwrap();
                    navigate("/dashboard/tickets");
                } catch (err) {
                    Swal.fire({ icon: 'error', title: 'שגיאה', text: 'המחיקה נכשלה' });
                }
            }
        });
    }

    const formatDate = (dateString?: string) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleString('he-IL', {
            day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
        });
    };

    if (!ticket) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ bgcolor: '#f1f5f9', minHeight: 'calc(100vh - 64px)', p: 3 }} dir="rtl">

                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate('/dashboard/tickets')}
                        sx={{ color: '#64748b', fontWeight: 'bold' }}
                    >
                        חזרה לרשימה
                    </Button>
                </Box>

                <Grid container spacing={3} sx={{ height: { md: '80vh', xs: 'auto' } }}>

                    <Grid size={{ xs: 12, md: 9 }} sx={{ height: '100%' }}>
                        <Paper elevation={0} sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: 4,
                            overflow: 'hidden',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}>

                            <Box sx={{
                                p: 3,
                                background: 'linear-gradient(to left, #1e293b, #334155)',
                                color: 'white',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 48, height: 48 }}>
                                        <SubjectIcon />
                                    </Avatar>
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold">
                                            {ticket.subject}
                                        </Typography>
                                        <Typography variant="caption" sx={{ opacity: 0.8 }}>
                                            נוצר ב: {formatDate(ticket.created_at)}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Chip
                                    label={ticket.status_name}
                                    sx={{ bgcolor: 'white', color: '#1e293b', fontWeight: 'bold' }}
                                />
                            </Box>

                            <Box sx={{ p: 2, bgcolor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                    תיאור המקרה:
                                </Typography>
                                <Typography variant="body1" sx={{ mt: 0.5 }}>
                                    {ticket.description}
                                </Typography>
                            </Box>

                            <Box sx={{
                                flexGrow: 1,
                                p: 3,
                                overflowY: 'auto',
                                bgcolor: 'white',
                                backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
                                backgroundSize: '24px 24px'
                            }}>
                                {comments.length === 0 && (
                                    <Box sx={{ textAlign: 'center', mt: 4, color: '#94a3b8' }}>
                                        <Typography>אין הודעות נוספות.</Typography>
                                    </Box>
                                )}

                                {comments.map((comment: TicketComment, index: number) => {
                                    const isMe = comment.author_id === currentUser?.id;
                                    return (
                                        <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-start' : 'flex-end', mb: 3 }}>
                                            <Box sx={{ display: 'flex', flexDirection: isMe ? 'row' : 'row-reverse', gap: 1.5, maxWidth: '75%' }}>
                                                <Avatar sx={{ width: 36, height: 36, bgcolor: isMe ? 'secondary.main' : '#64748b' }}>
                                                    {comment.author_name ? comment.author_name.charAt(0) : <PersonIcon />}
                                                </Avatar>

                                                <Box>
                                                    <Box sx={{
                                                        p: 2,
                                                        borderRadius: 3,
                                                        bgcolor: isMe ? '#eff6ff' : '#f1f5f9',
                                                        border: isMe ? '1px solid #dbeafe' : '1px solid #e2e8f0',
                                                        borderTopLeftRadius: isMe ? 0 : 3,
                                                        borderTopRightRadius: isMe ? 3 : 0,
                                                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                                                    }}>
                                                        <Typography variant="body1" sx={{ color: '#1e293b', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                                                            {comment.content}
                                                        </Typography>
                                                    </Box>
                                                    <Typography variant="caption" sx={{ mt: 0.5, display: 'block', textAlign: isMe ? 'left' : 'right', color: '#94a3b8' }}>
                                                        {comment.author_name} • {formatDate(comment.created_at)}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    );
                                })}
                                <div ref={commentsEndRef} />
                            </Box>

                            <Divider />
                            {ticket.status_name !== "סגור" ? (
                                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2, bgcolor: 'white', display: 'flex', alignItems: 'flex-end', gap: 2 }}>
                                    <TextField
                                        fullWidth
                                        placeholder="הקלד תגובה כאן..."
                                        multiline
                                        maxRows={3}
                                        {...register("content")}
                                        sx={{
                                            '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: '#f8fafc' }
                                        }}
                                    />
                                    <IconButton
                                        type="submit"
                                        color="primary"
                                        sx={{
                                            width: 50, height: 50,
                                            bgcolor: 'primary.main',
                                            color: 'white',
                                            borderRadius: 3,
                                            '&:hover': { bgcolor: 'primary.dark' }
                                        }}
                                    >
                                        <SendIcon />
                                    </IconButton>
                                </Box>
                            ) : (
                                <Box sx={{ p: 2, bgcolor: '#fef2f2', textAlign: 'center', borderTop: '1px solid #fca5a5' }}>
                                    <Typography color="error" fontWeight="bold">🔒 הטיקט סגור לתגובות</Typography>
                                </Box>
                            )}
                        </Paper>
                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>
                        <Paper elevation={0} sx={{
                            p: 3,
                            borderRadius: 4,
                            height: 'fit-content',
                            border: '1px solid #e2e8f0',
                            bgcolor: 'white'
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, color: 'primary.main' }}>
                                <SupportAgentIcon sx={{ mr: 1 }} />
                                <Typography variant="h6" fontWeight="bold">פרטי טיקט</Typography>
                            </Box>

                            <Stack spacing={3}>
                                <Box>
                                    <Typography variant="caption" color="text.secondary">מספר פנייה</Typography>
                                    <Typography variant="subtitle1" fontWeight="bold">#{ticket.id}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption" color="text.secondary">שם הלקוח</Typography>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        {ticket.created_by_name || `לקוח ${ticket.created_by}`}
                                    </Typography>
                                </Box>

                                <Divider />

                                {(role === "agent" || role === "admin") && (
                                    <FormControl fullWidth size="small">
                                        <InputLabel>סטטוס</InputLabel>
                                        <Select
                                            value={ticket.status_id ?? ""}
                                            label="סטטוס"
                                            onChange={(e) => handleUpdateTicket({ status_id: Number(e.target.value) })}
                                        >
                                            {statuses.map((s: Status) => (
                                                <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}

                                {role === "admin" && (
                                    <>
                                        <FormControl fullWidth size="small">
                                            <InputLabel>הקצאה לנציג</InputLabel>
                                            <Select
                                                value={ticket.assigned_to ?? ""}
                                                label="הקצאה לנציג"
                                                onChange={(e) => handleUpdateTicket({ assigned_to: Number(e.target.value) })}
                                            >
                                                <MenuItem value=""><em>-- ללא --</em></MenuItem>
                                                {allUsers.filter((u: any) => u.role === "agent").map((agent: any) => (
                                                    <MenuItem key={agent.id} value={agent.id}>{agent.name}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>

                                        <FormControl fullWidth size="small">
                                            <InputLabel>דחיפות</InputLabel>
                                            <Select
                                                value={ticket.priority_id ?? ""}
                                                label="דחיפות"
                                                onChange={(e) => handleUpdateTicket({ priority_id: Number(e.target.value) })}
                                            >
                                                <MenuItem value={1}>נמוכה</MenuItem>
                                                <MenuItem value={2}>בינונית</MenuItem>
                                                <MenuItem value={3}>גבוהה</MenuItem>
                                                <MenuItem value={4}>דחופה</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <Button
                                            variant="outlined"
                                            color="error"
                                            startIcon={<DeleteOutlineIcon />}
                                            onClick={deleteT}
                                            sx={{ mt: 2, borderRadius: 2 }}
                                        >
                                            מחק פנייה
                                        </Button>
                                    </>
                                )}
                            </Stack>
                        </Paper>
                    </Grid>

                </Grid>
            </Box>
        </ThemeProvider>
    );
};

export default TicketById;