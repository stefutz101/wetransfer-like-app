'use client';
import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInSide() {
  const [res, setRes] = useState(null);

  const fileSelected = (event) => {
    if (event.target.files && event.target.files[0]) {
      const name = event.target.files[0].name;
      console.log(name);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch('/api', {
        method: 'POST',
        body: data, // Your data to send
      });

      const result = await response.json();
      setRes(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <FileUploadIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Upload
            </Typography>
            {res && res.status == 'error' && (
              <Alert onClose={() => {}} severity='{res.status}'>
                {res.message}
              </Alert>
            )}
            {!res && (
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <Button
                    variant="contained"
                    component="label"
                    >
                        Upload File
                    <input
                        type="file"
                        margin="normal"
                        required
                        id="file"
                        label="File"
                        name="file"
                        hidden
                        onChange={fileSelected}
                    />
                  </Button>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                  />
                  <TextField 
                    margin="normal"
                    fullWidth
                    name="description"
                    label="Description"
                    type="description"
                    id="description"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Upload
                  </Button>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            )}
            {res && res.status=='success' && (
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField 
                    margin="normal"
                    fullWidth
                    name="url"
                    label="Url"
                    type="url"
                    id="url"
                    value={res.url}
                  />
                <Copyright sx={{ mt: 5 }} />
              </Box>
            )}
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
    </ThemeProvider>
  );
}