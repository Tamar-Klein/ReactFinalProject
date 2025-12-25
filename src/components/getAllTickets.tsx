import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../store";
import { fetchAllStatuses, fetchAllTickets } from "../features/ticketsSlice";
import type { Ticket } from "../models/tickets";
import type { Status } from "../models/status";
import { Container, Box, Typography, TextField, Grid, Card, CardContent, MenuItem, InputAdornment, CircularProgress, Stack, Paper } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'; // חץ עדין יותר
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const defaultTheme = createTheme({
    direction: 'rtl',
    typography: { fontFamily: 'Rubik, Arial, sans-serif' },
    palette: {
        primary: { main: '#1e293b' },
        secondary: { main: '#2563eb' },
        background: { default: '#f8fafc' },
    },
});

const getPriorityStyles = (priority: number | string) => {
    const p = Number(priority);
    if (p >= 3) return { color: '#be123c', label: 'גבוהה' };
    if (p === 2) return { color: '#d97706', label: 'בינונית' };
    return { color: '#059669', label: 'נמוכה' };
};

const getStatusColor = (statusId: number) => {
    switch (statusId) {
        case 1: return '#64748b';
        case 2: return '#2563eb';
        case 3: return '#059669';
        default: return '#94a3b8';
    }
};

const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit', year: '2-digit' });
};

const GetTickets = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { list: tickets, loading, statuses } = useSelector((state: RootState) => state.tickets);
    const currentUser = useSelector((state: RootState) => state.auth.user);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState<string>("all");
    const [sortOrder, setSortOrder] = useState<string>("desc");

    useEffect(() => {
        dispatch(fetchAllTickets());
        dispatch(fetchAllStatuses());
    }, [dispatch]);

    const filteredTickets = tickets.filter((ticket: Ticket) => {
        if (!currentUser) return false;
        let hasPermission = (currentUser.role === "admin") ||
            (currentUser.role === "agent" && ticket.assigned_to === currentUser.id) ||
            (currentUser.role === "customer" && ticket.created_by === currentUser.id);

        if (!hasPermission) return false;
        const matchesStatus = selectedStatus === "all" || ticket.status_id === Number(selectedStatus);
        const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const sortedTickets = [...filteredTickets].sort((a, b) => {
        const pA = Number(a.priority_id || 0);
        const pB = Number(b.priority_id || 0);
        return sortOrder === "desc" ? pB - pA : pA - pB;
    });

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container maxWidth="lg" sx={{ mt: 3, mb: 6 }} dir="rtl">

                <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#1e293b' }}>
                    ניהול פניות
                </Typography>

                <Box sx={{ bgcolor: 'white', p: 2, borderRadius: 3, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', mb: 4 }}>
                    <Grid container spacing={2} alignItems="center">

                        <Grid >
                            <TextField
                                fullWidth placeholder="חיפוש פניה" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                                InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>) }}
                                variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                            />
                        </Grid>
                        <Grid>
                            <TextField select fullWidth value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} label="סטטוס"
                                InputProps={{ startAdornment: (<InputAdornment position="start"><FilterListIcon color="action" /></InputAdornment>) }}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                            >
                                <MenuItem value="all">הכל</MenuItem>
                                {statuses.map((s: Status) => (<MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>))}
                            </TextField>
                        </Grid>
                        <Grid >
                            <TextField select fullWidth value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} label="עדיפות"
                                InputProps={{ startAdornment: (<InputAdornment position="start"><SortIcon color="action" /></InputAdornment>) }}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                            >
                                <MenuItem value="desc">גבוה לנמוך</MenuItem>
                                <MenuItem value="asc">נמוך לגבוה</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                </Box>


                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress size={30} /></Box>
                ) : (
                    <Stack spacing={1.5}>
                        {sortedTickets.map((ticket: Ticket) => {
                            const priority = getPriorityStyles(ticket.priority_id || 0);
                            const statusColor = getStatusColor(ticket.status_id || 0);

                            return (
                                <Card
                                    key={ticket.id}
                                    elevation={0}
                                    onClick={() => navigate(`/dashboard/tickets/${ticket.id}`)}
                                    sx={{
                                        borderRadius: 2,
                                        border: '1px solid #e2e8f0',
                                        bgcolor: 'white',
                                        transition: '0.2s',
                                        cursor: 'pointer',
                                        '&:hover': { borderColor: '#cbd5e1', bgcolor: '#f8fafc' }
                                    }}
                                >
                                    <CardContent sx={{ p: '16px !important' }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, flexGrow: 1 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#0f172a' }}>
                                                        {ticket.subject}
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ color: priority.color, fontWeight: 700, fontSize: '0.75rem' }}>
                                                        • {priority.label}
                                                    </Typography>
                                                </Box>

                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    <Typography variant="caption" color="text.secondary">
                                                        #{ticket.id}
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                        <CalendarMonthIcon sx={{ fontSize: 14 }} /> {formatDate(ticket.created_at)}
                                                    </Typography>
                                                    {ticket.assigned_to_name && (
                                                        <Typography variant="caption" sx={{ color: '#64748b' }}>
                                                            מטופל ע"י: <b>{ticket.assigned_to_name}</b>
                                                        </Typography>
                                                    )}
                                                </Box>
                                            </Box>

                                            <Stack direction="row" alignItems="center" spacing={3}>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        fontWeight: 700,
                                                        color: statusColor,
                                                        textTransform: 'uppercase',
                                                        letterSpacing: 0.5
                                                    }}
                                                >
                                                    {ticket.status_name}
                                                </Typography>
                                                <ArrowBackIosNewIcon sx={{ fontSize: 14, color: '#cbd5e1' }} />
                                            </Stack>

                                        </Box>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </Stack>
                )}

                {!loading && sortedTickets.length === 0 && (
                    <Paper variant="outlined" sx={{ p: 6, textAlign: 'center', borderRadius: 3, borderStyle: 'dashed' }}>
                        <Typography color="text.secondary">לא נמצאו פניות העונות על החיפוש</Typography>
                    </Paper>
                )}
            </Container>
        </ThemeProvider>
    );
}

export default GetTickets;