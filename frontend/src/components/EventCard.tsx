'use client';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions, Chip, Stack } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Link from 'next/link';
import { Event } from '@/types';
import dayjs from 'dayjs';

interface EventCardProps {
  event: Event;
  onDelete?: (id: string) => void;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="div"
        sx={{
          height: 140,
          background: `linear-gradient(135deg, ${stringToColor(event.category)}AA, ${stringToColor(event.title)}AA)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography variant="h3" sx={{ color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
          {event.category.charAt(0).toUpperCase()}
        </Typography>
      </CardMedia>
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          <Chip label={event.category} size="small" color="primary" variant="outlined" />
        </Stack>
        <Typography gutterBottom variant="h5" component="div">
          {event.title}
        </Typography>
        <Stack direction="row" alignItems="center" gap={0.5} color="text.secondary" sx={{ mb: 0.5 }}>
          <CalendarTodayIcon fontSize="small" />
          <Typography variant="body2">
            {dayjs(event.date).format('MMMM D, YYYY')}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" gap={0.5} color="text.secondary">
          <LocationOnIcon fontSize="small" />
          <Typography variant="body2">
            {event.latitude.toFixed(2)}, {event.longitude.toFixed(2)}
          </Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {event.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} href={`/events/${event.id}`}>View Details</Button>
      </CardActions>
    </Card>
  );
}

// Helper to generate consistent colors from strings
function stringToColor(string: string) {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}
