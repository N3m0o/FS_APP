'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Container, Typography, TextField, MenuItem, Box, CircularProgress, Fab, InputAdornment } from '@mui/material';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import api from '@/services/api';
import { Event } from '@/types';
import EventCard from './EventCard';
import Link from 'next/link';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import MapIcon from '@mui/icons-material/Map';
import ListIcon from '@mui/icons-material/List';
import LeafletMap from './Map';

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [date, setDate] = useState<Dayjs | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (category !== 'All') params.category = category;
      if (date) params.date = date.toISOString();

      const response = await api.get('/events', { params });
      setEvents(response.data);
    } catch (error) {
      console.error('Failed to fetch events', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [category, date]); // Re-fetch when filters change

  // Unique categories for filter
  // In a real app, fetch categories from a separate endpoint
  const categories = ['All', 'Music', 'Tech', 'Art', 'Business', 'Sports'];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h2" component="h1" sx={{ fontWeight: 800, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Discover Events
        </Typography>
        <Fab color="primary" variant="extended" component={Link} href="/events/create" aria-label="create event">
          <AddIcon sx={{ mr: 1 }} />
          Create Event
        </Fab>
      </Box>

      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            sx={{ minWidth: 150 }}
            size="small"
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>

          <DatePicker
            label="Filter by Date"
            value={date}
            onChange={(newValue) => setDate(newValue)}
            slotProps={{ textField: { size: 'small' } }}
          />
        </Box>

        <Box>
          <Fab
            variant="extended"
            size="medium"
            color={viewMode === 'list' ? 'primary' : 'inherit'}
            onClick={() => setViewMode('list')}
            sx={{ mr: 1 }}
          >
            <ListIcon sx={{ mr: 1 }} /> List
          </Fab>
          <Fab
            variant="extended"
            size="medium"
            color={viewMode === 'map' ? 'primary' : 'inherit'}
            onClick={() => setViewMode('map')}
          >
            <MapIcon sx={{ mr: 1 }} /> Map
          </Fab>
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : viewMode === 'list' ? (
        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid
              key={event.id}
              size={{ xs: 12, sm: 6, md: 4 }}
            >
              <EventCard event={event} />
            </Grid>
          ))}

          {events.length === 0 && (
            <Grid size={12}>
              <Typography variant="h6" align="center" color="text.secondary">
                No events found. Try adjusting your filters.
              </Typography>
            </Grid>
          )}
        </Grid>

      ) : (
        <LeafletMap events={events} />
      )}
    </Container>
  );
}
