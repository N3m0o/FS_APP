'use client';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Container, Typography, Box, CircularProgress, Button, Chip, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import api from '@/services/api';
import { Event } from '@/types';
import EventCard from '@/components/EventCard';
import dayjs from 'dayjs';
import Link from 'next/link';

export default function EventDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [similarEvents, setSimilarEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const [eventRes, similarRes] = await Promise.all([
            api.get(`/events/${id}`),
            api.get(`/events/${id}/similar`)
          ]);
          setEvent(eventRes.data);
          setSimilarEvents(similarRes.data);
        } catch (error) {
          console.error('Error fetching details', error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      await api.delete(`/events/${id}`);
      router.push('/');
    } catch (error) {
      console.error('Error deleting event', error);
      alert('Failed to delete event');
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;
  if (!event) return <Typography>Event not found</Typography>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBackIcon />} component={Link} href="/" sx={{ mb: 2 }}>
        Back to Events
      </Button>

      <Paper sx={{ p: 4, borderRadius: 4, mb: 4, background: 'linear-gradient(to bottom right, #1e293b, #0f172a)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Chip label={event.category} color="primary" sx={{ mb: 2 }} />
          <Box>
            <IconButton component={Link} href={`/events/${id}/edit`} color="primary">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => setDeleteOpen(true)} color="error">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>

        <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
          {event.title}
        </Typography>

        <Box sx={{ display: 'flex', gap: 3, mb: 4, color: 'text.secondary' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarTodayIcon />
            <Typography variant="h6">{dayjs(event.date).format('MMMM D, YYYY')}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOnIcon />
            <Typography variant="h6">{event.latitude}, {event.longitude}</Typography>
          </Box>
        </Box>

        <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
          {event.description}
        </Typography>
      </Paper>

      {similarEvents.length > 0 && (
        <Box>
          <Typography variant="h4" sx={{ mb: 3 }}>You Might Also Like</Typography>
          <Grid container spacing={3}>
            {similarEvents.map(se => (
              <Grid key={se.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <EventCard event={se} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete "{event.title}"? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
