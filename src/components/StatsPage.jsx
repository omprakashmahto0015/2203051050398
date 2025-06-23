import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const dummyStats = [
  {
    url: 'http://localhost:3000/abc123',
    created: '2025-06-23 10:00',
    expiry: '2025-06-23 10:30',
    clicks: 12,
    clickDetails: [
      { timestamp: '10:01', source: 'Chrome', location: 'India' },
      { timestamp: '10:10', source: 'Firefox', location: 'India' },
    ],
  },
];

const StatsPage = () => {
  return (
    <Box p={3}>
      <Typography variant="h4">URL Statistics</Typography>
      {dummyStats.map((stat, index) => (
        <Paper key={index} sx={{ p: 2, mt: 2 }}>
          <Typography>Short URL: {stat.url}</Typography>
          <Typography>Created: {stat.created}</Typography>
          <Typography>Expires: {stat.expiry}</Typography>
          <Typography>Clicks: {stat.clicks}</Typography>
          <Typography mt={1}>Click Details:</Typography>
          {stat.clickDetails.map((click, i) => (
            <Typography key={i}>
              - {click.timestamp}, {click.source}, {click.location}
            </Typography>
          ))}
        </Paper>
      ))}
    </Box>
  );
};

export default StatsPage;
