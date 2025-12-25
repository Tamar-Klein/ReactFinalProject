import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllUsers } from "../../features/usersSlice";
import type { AppDispatch, RootState } from "../../store";
import {
    Container, Box, Typography, TextField, Button, Paper,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Avatar, Chip, IconButton, InputAdornment, Tooltip, CircularProgress
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PersonIcon from '@mui/icons-material/Person';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const defaultTheme = createTheme({
    direction: 'rtl',
    typography: { fontFamily: 'Rubik, Arial, sans-serif' },
    palette: {
        primary: { main: '#1e293b' },
        secondary: { main: '#2563eb' },
    },
});

const Users = () => {
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector((state: RootState) => state.users.allUsers);
    const { loading, error } = useSelector((state: RootState) => state.users)
    const allUsers = users || [];

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    const filteredUsers = allUsers.filter((user: any) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getRoleChip = (role: string) => {
        switch (role) {
            case 'admin': return <Chip icon={<AdminPanelSettingsIcon style={{ color: 'white' }} />} label="מנהל" size="small" sx={{ bgcolor: '#dc2626', color: 'white', fontWeight: 'bold' }} />;
            case 'agent': return <Chip icon={<SupportAgentIcon style={{ color: 'white' }} />} label="נציג" size="small" sx={{ bgcolor: '#2563eb', color: 'white', fontWeight: 'bold' }} />;
            default: return <Chip icon={<PersonIcon />} label="לקוח" size="small" variant="outlined" />;
        }
    };

    const stringToColor = (string: string) => {
        let hash = 0;
        for (let i = 0; i < string.length; i++) hash = string.charCodeAt(i) + ((hash << 5) - hash);
        let color = '#';
        for (let i = 0; i < 3; i++) color += `00${((hash >> (i * 8)) & 0xff).toString(16)}`.slice(-2);
        return color;
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }} dir="rtl">

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, borderBottom: '1px solid #e2e8f0', pb: 2 }}>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1e293b' }}>ניהול משתמשים</Typography>
                        <Typography variant="body2" color="text.secondary">צפייה בכל המשתמשים הרשומים במערכת</Typography>
                    </Box>
                    <Button component={Link} to="create" variant="contained" startIcon={<PersonAddIcon sx={{ ml: 1 }} />} sx={{ bgcolor: 'primary.main', borderRadius: 2, px: 3, py: 1 }}>
                        הוסף משתמש
                    </Button>
                </Box>

                <Paper elevation={0} sx={{ p: 2, mb: 3, border: '1px solid #e2e8f0', borderRadius: 3 }}>
                    <TextField
                        fullWidth placeholder="חפש משתמש לפי שם או אימייל..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                        variant="standard"
                        InputProps={{
                            disableUnderline: true, // תוקן!
                            startAdornment: (<InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>),
                        }}
                    />
                </Paper>

                {loading ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
                        <CircularProgress />
                        <Typography sx={{ mt: 2 }} color="text.secondary">טוען משתמשים...</Typography>
                    </Box>
                ) : error ? (
                    <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#fef2f2' }}>
                        <ErrorOutlineIcon color="error" />
                        <Typography color="error">שגיאה בטעינת המשתמשים: {error}</Typography>
                    </Paper>
                ) : (
                    <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead sx={{ bgcolor: '#f1f5f9' }}>
                                <TableRow>
                                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>משתמש</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>אימייל</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>תפקיד</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>פעולות</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredUsers.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center" sx={{ py: 5 }}>
                                            <Typography color="text.secondary">לא נמצאו משתמשים תואמים.</Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredUsers.map((user: any) => (
                                        <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#f8fafc' } }}>
                                            <TableCell component="th" scope="row" align="right">
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    <Avatar sx={{ bgcolor: stringToColor(user.name), width: 40, height: 40, fontSize: 16 }}>
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </Avatar>
                                                    <Typography variant="subtitle2" fontWeight="bold" color="#1e293b">{user.name}</Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="right">{user.email}</TableCell>
                                            <TableCell align="center">{getRoleChip(user.role)}</TableCell>
                                            <TableCell align="center">
                                                <Tooltip title="עריכה"><IconButton size="small" color="primary"><EditIcon fontSize="small" /></IconButton></Tooltip>
                                                <Tooltip title="מחיקה"><IconButton size="small" color="error"><DeleteOutlineIcon fontSize="small" /></IconButton></Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Container>
        </ThemeProvider>
    );
}

export default Users;