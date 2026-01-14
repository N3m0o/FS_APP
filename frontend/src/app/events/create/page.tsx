'use client';
import EventForm from '@/components/EventForm';
import api from '@/services/api';
import { CreateEventDto } from '@/types';
import { Container } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function CreateEventPage() {
  const router = useRouter();

  const handleCreate = async (data: CreateEventDto) => {
    try {
      await api.post('/events', data);
      router.push('/');
    } catch (error) {
      console.error('Error creating event', error);
      alert('Failed to create event');
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <EventForm title="Create New Event" onSubmit={handleCreate} />
    </Container>
  );
}
