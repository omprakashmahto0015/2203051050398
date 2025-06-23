import React, { useState } from 'react';
import {
  TextField, Button, Box, Typography, Grid, Paper
} from '@mui/material';
import { Log } from '../utils/logger'; 

const UrlShortenerForm = () => {
  const [urls, setUrls] = useState([{ original: '', validity: '', shortcode: '' }]);
  const [shortened, setShortened] = useState([]);

  // TODO: Replace this with your actual token from /auth
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMjAzMDUxMDUwMzk4QHBhcnVsdW5pdmVyc2l0eS5hYy5pbiIsImV4cCI6MTc1MDY3MDAzOSwiaWF0IjoxNzUwNjY5MTM5LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYjRkNTI2MzYtM2UyMy00NTljLWE0NjItNjlkMjJmZGI4MzdkIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoib21wcmFrYXNoIGt1bWFyIG1haHRvIiwic3ViIjoiMGRjZmNiMTktNzc3MC00MmEwLTkxZTItMzYwOTE2ODBkMjRmIn0sImVtYWlsIjoiMjIwMzA1MTA1MDM5OEBwYXJ1bHVuaXZlcnNpdHkuYWMuaW4iLCJuYW1lIjoib21wcmFrYXNoIGt1bWFyIG1haHRvIiwicm9sbE5vIjoiMjIwMzA1MTA1MDM5OCIsImFjY2Vzc0NvZGUiOiJUUnpnV00iLCJjbGllbnRJRCI6IjBkY2ZjYjE5LTc3NzAtNDJhMC05MWUyLTM2MDkxNjgwZDI0ZiIsImNsaWVudFNlY3JldCI6Ikh0S21LQXp5a3VEeGpBY3oifQ._NWuhc1N2n69lnBopb0UMnMls2ta4-3vTnM1ghuWjZA";

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  }

  const handleSubmit = async () => {
  const results = await Promise.all(urls.map(async (entry) => {
    const shortcode = entry.shortcode || Math.random().toString(36).substring(2, 8);
    const validity = parseInt(entry.validity) || 30;
    const expiry = Date.now() + validity * 60000;

    await Log("frontend", "info", "urlshortener", "Short URL created", token);

    return {
      ...entry,
      shortcode,
      expiry: new Date(expiry).toLocaleString(),
      shortened: `http://localhost:3000/${shortcode}`
    };
  }));

  setShortened(results);
};


  const addInput = () => {
    if (urls.length < 5) {
      setUrls([...urls, { original: '', validity: '', shortcode: '' }]);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4">URL Shortener</Typography>
      {urls.map((url, i) => (
        <Grid container spacing={2} key={i} sx={{ mt: 1 }}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Original URL"
              value={url.original}
              onChange={(e) => handleChange(i, 'original', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Validity (mins)"
              type="number"
              value={url.validity}
              onChange={(e) => handleChange(i, 'validity', e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Custom Shortcode"
              value={url.shortcode}
              onChange={(e) => handleChange(i, 'shortcode', e.target.value)}
            />
          </Grid>
        </Grid>
      ))}
      <Box mt={2}>
        <Button variant="contained" onClick={handleSubmit}>Shorten URLs</Button>
        <Button variant="outlined" sx={{ ml: 2 }} onClick={addInput}>Add Another</Button>
      </Box>

      <Box mt={4}>
        <Typography variant="h6">Shortened URLs</Typography>
        {shortened.map((item, index) => (
          <Paper key={index} sx={{ p: 2, mt: 1 }}>
            <Typography>Original: {item.original}</Typography>
            <Typography>Short: {item.shortened}</Typography>
            <Typography>Expiry: {item.expiry}</Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default UrlShortenerForm;
