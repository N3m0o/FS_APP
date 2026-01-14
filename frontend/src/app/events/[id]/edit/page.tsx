'use client';
import { useEffect, useState } from 'react';
import EventForm from '@/components/EventForm';
import api from '@/services/api';
import { CreateEventDto, Event } from '@/types';
import { Container, CircularProgress, Box, Typography } from '@mui/material';
import { useRouter, useParams } from 'next/navigation';

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      api.get(`/events/${id}`)
        .then(res => setEvent(res.data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleUpdate = async (data: CreateEventDto) => {
    try {
      await api.patch(`/events/${id}`, data);
      router.push(`/events/${id}`);
    } catch (error) {
      console.error('Error updating event', error);
      alert('Failed to update event');
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;
  if (!event) return <Typography>Event not found</Typography>;

  return (
    <Container sx={{ py: 4 }}>
      <EventForm title="Edit Event" initialData={event} onSubmit={handleUpdate} />
    </Container>
  );
}
