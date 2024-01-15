'use client';
import React, { useEffect, useState } from 'react';
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
import DownloadIcon from '@mui/icons-material/Download';
import Typography from '@mui/material/Typography';
import { useSearchParams } from 'next/navigation';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Elsie } from 'next/font/google';

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
    // Construct the URL with query parameters
    const searchParams = useSearchParams();
 
    const id = searchParams.get('id');

  const handleDownload = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/download`, {
        method: 'POST',
        body: JSON.stringify({ 
          download: id,
        }), // Your data to send
      });

        const blob = await response.blob();
        const contentType = blob.type;
        let extension = contentType.split('/').pop();

        // Mapping for common MIME types to file extensions
        switch (extension) {
            case 'jpeg':
                extension = 'jpg';
                break;
            case 'plain':
                extension = 'txt';
                break;
            case 'vnd.openxmlformats-officedocument.wordprocessingml.document':
                extension = 'docx';
                break;
            case 'vnd.ms-excel':
                extension = 'xls';
                break;
            case 'vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                extension = 'xlsx';
                break;
            case 'vnd.ms-powerpoint':
                extension = 'ppt';
                break;
            case 'vnd.openxmlformats-officedocument.presentationml.presentation':
                extension = 'pptx';
                break;
            case 'x-rar-compressed':
                extension = 'rar';
                break;
            case 'x-7z-compressed':
                extension = '7z';
                break;
            case 'x-tar':
                extension = 'tar';
                break;
            case 'x-zip-compressed':
            case 'zip':
                extension = 'zip';
                break;
            // Add more cases as needed
            default:
                // Keep the original extension if it's not one of the special cases
                break;
        }

        // Determine the file extension based on the MIME type of the blob
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${id}.${extension}`;
        link.click();
        window.URL.revokeObjectURL(url);
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
              <DownloadIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Download
            </Typography>
            {res && res.status == 'error' && (
              <Alert onClose={() => {}} severity='{res.status}'>
                {res.message}
              </Alert>
            )}

            <Box component="form" noValidate onSubmit={handleDownload} sx={{ mt: 1 }}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Download
                </Button>
            <Copyright sx={{ mt: 5 }} />
            </Box>
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