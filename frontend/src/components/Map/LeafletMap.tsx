'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Event } from '@/types';
import L from 'leaflet';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

// Fix Leaflet icons
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
  events: Event[];
}

export default function LeafletMap({ events }: MapProps) {
  // Center map on the first event or default location (e.g., New York)
  const center: [number, number] = events.length > 0
    ? [events[0].latitude, events[0].longitude]
    : [40.7128, -74.0060];

  return (
    <Box sx={{ height: '600px', width: '100%', borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
      <MapContainer center={center} zoom={4} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {events.map((event) => (
          <Marker key={event.id} position={[event.latitude, event.longitude]}>
            <Popup>
              <Box sx={{ p: 0.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>{event.title}</Typography>
                <Typography variant="caption">{event.category}</Typography>
                <Box sx={{ mt: 1 }}>
                  <Button size="small" component={Link} href={`/events/${event.id}`}>View</Button>
                </Box>
              </Box>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
}
