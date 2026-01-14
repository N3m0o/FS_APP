'use client';
import dynamic from 'next/dynamic';
import { CircularProgress, Box } from '@mui/material';

const LeafletMap = dynamic(
  () => import('./LeafletMap'),
  {
    ssr: false,
    loading: () => <Box sx={{ height: 600, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress /></Box>
  }
);

export default LeafletMap;
