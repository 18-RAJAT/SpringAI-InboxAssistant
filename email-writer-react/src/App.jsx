import React, { useState, useEffect } from 'react';
import { 
    Container, Typography, Box, TextField, FormControl, InputLabel, 
    MenuItem, Select, Button, CircularProgress, Paper, Card, 
    CardContent, Dialog, DialogTitle, DialogContent, DialogActions,
    Grid, Divider, List, ListItem, ListItemText
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { saveAs } from 'file-saver';

// Custom Theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#532190', // Deep blue-gray
            light: '#3F248F',
            dark: '#9E34B1'
        },
        secondary: {
            main: '#52379F', // Bright blue
            light: '#823BA0',
            dark: '#842B94'
        },
        background: {
            default: '#3498DB', // Light gray-blue
            paper: '#FFFFFF'
        },
        text: {
            primary: '#283590',
            secondary: '#000'
        }
    },
    typography: {
        fontFamily: 'Verdana',
        h4: {
            fontWeight: 700,
            letterSpacing: '-0.5px'
        },
        body1: {
            lineHeight: 1.6
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 8,
                    padding: '12px 24px',
                    fontWeight: 600
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-5px)'
                    }
                }
            }
        }
    }
});

function App() {
    const [activeTab, setActiveTab] = useState('generator');
    const [emailContent, setEmailContent] = useState('');
    const [instructions, setInstructions] = useState('');
    const [tone, setTone] = useState('');
    const [generatedReply, setGeneratedReply] = useState('');
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);
    const [openHistoryModal, setOpenHistoryModal] = useState(false);
    const [stats, setStats] = useState({
        totalRepliesGenerated: 0,
        mostUsedTone: 'N/A',
        averageReplyLength: 0
    });

    const [promptHistory, setPromptHistory] = useState([
        { prompt: "Client project update", tone: "Professional", timestamp: new Date().toLocaleString() },
        { prompt: "Team collaboration", tone: "Friendly", timestamp: new Date().toLocaleString() },
        { prompt: "Sales pitch follow-up", tone: "Casual", timestamp: new Date().toLocaleString() }
    ]);

    async function handleSubmit() {
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:9191/api/email/generate", {
                emailContent,
                instructions,
                tone
            });
            
            const newReply = response.data;
            setGeneratedReply(newReply);
            
            const newHistoryEntry = {
                originalEmail: emailContent,
                generatedReply: newReply,
                tone: tone || 'Unspecified',
                timestamp: new Date().toLocaleString()
            };
            
            setHistory(prevHistory => [newHistoryEntry, ...prevHistory].slice(0, 3));
            
            setStats(prev => ({
                totalRepliesGenerated: prev.totalRepliesGenerated + 1,
                mostUsedTone: tone || prev.mostUsedTone,
                averageReplyLength: Math.round((prev.averageReplyLength * prev.totalRepliesGenerated + newReply.length) / (prev.totalRepliesGenerated + 1))
            }));

            toast.success("Reply Generated Successfully");
        } catch (err) {
            toast.error("Generation Failed");
        } finally {
            setLoading(false);
        }
    }

    const handleDownload = () => {
        const blob = new Blob([generatedReply], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, "email_reply.txt");
        toast.success("Downloaded");
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedReply);
        toast.success("Copied to Clipboard");
    };

    const renderGenerator = () => (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Email Details
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={6}
                            variant="outlined"
                            label="Original Email"
                            value={emailContent}
                            onChange={(e) => setEmailContent(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            variant="outlined"
                            label="Instructions"
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Tone</InputLabel>
                            <Select
                                value={tone}
                                label="Tone"
                                onChange={(e) => setTone(e.target.value)}
                            >
                                <MenuItem value="Professional">Professional</MenuItem>
                                <MenuItem value="Casual">Casual</MenuItem>
                                <MenuItem value="Friendly">Friendly</MenuItem>
                                <MenuItem value="Playful">Playful</MenuItem>
                            </Select>
                        </FormControl>
                        <Button 
                            fullWidth 
                            variant="contained" 
                            color="primary" 
                            onClick={handleSubmit}
                            disabled={!emailContent || loading}
                        >
                            {loading ? <CircularProgress size={24} /> : "Generate Reply"}
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                {generatedReply && (
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Generated Reply
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={10}
                                variant="outlined"
                                value={generatedReply}
                                InputProps={{ readOnly: true }}
                                sx={{ mb: 2 }}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button 
                                    variant="contained" 
                                    color="secondary" 
                                    onClick={handleDownload}
                                >
                                    Download
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    color="primary" 
                                    onClick={handleCopy}
                                >
                                    Copy To clipboard
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                )}
            </Grid>
        </Grid>
    );

    const renderDashboard = () => (
        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Replies Generated</Typography>
                        <Typography variant="h4">{stats.totalRepliesGenerated}</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Most Used Tone</Typography>
                        <Typography variant="h4">{stats.mostUsedTone}</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Avg. Reply Length</Typography>
                        <Typography variant="h4">{stats.averageReplyLength} chars</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );

    const renderHistory = () => (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>Recent Replies</Typography>
                        {history.length === 0 ? (
                            <Typography>No recent replies</Typography>
                        ) : (
                            history.map((entry, index) => (
                                <Card key={index} sx={{ mb: 2, p: 2 }}>
                                    <Typography variant="subtitle2">Tone: {entry.tone}</Typography>
                                    <Typography variant="body2">{entry.generatedReply}</Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {entry.timestamp}
                                    </Typography>
                                </Card>
                            ))
                        )}
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Prompt History</Typography>
                        <List>
                            {promptHistory.map((prompt, index) => (
                                <ListItem key={index} divider>
                                    <ListItemText 
                                        primary={prompt.prompt} 
                                        secondary={`${prompt.tone} • ${prompt.timestamp}`} 
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg" sx={{ py: 4, backgroundColor: theme.palette.background.default }}>
                <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                    <Typography 
                        variant="h4" 
                        align="center" 
                        gutterBottom 
                        sx={{ 
                            color: theme.palette.primary.main, 
                            mb: 4 
                        }}
                    >
                        Email Reply Generator
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                        <Button 
                            variant={activeTab === 'generator' ? 'contained' : 'outlined'} 
                            color="primary" 
                            onClick={() => setActiveTab('generator')}
                            sx={{ mr: 2 }}
                        >
                            Generator
                        </Button>
                        <Button 
                            variant={activeTab === 'dashboard' ? 'contained' : 'outlined'} 
                            color="primary" 
                            onClick={() => setActiveTab('dashboard')}
                            sx={{ mr: 2 }}
                        >
                            Dashboard
                        </Button>
                        <Button 
                            variant={activeTab === 'history' ? 'contained' : 'outlined'} 
                            color="primary" 
                            onClick={() => setActiveTab('history')}
                        >
                            History
                        </Button>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {activeTab === 'generator' && renderGenerator()}
                    {activeTab === 'dashboard' && renderDashboard()}
                    {activeTab === 'history' && renderHistory()}
                </Paper>

                <ToastContainer 
                    position="bottom-right" 
                    autoClose={3000} 
                    hideProgressBar 
                    theme="colored" 
                />
            </Container>
        </ThemeProvider>
    );
}

export default App;