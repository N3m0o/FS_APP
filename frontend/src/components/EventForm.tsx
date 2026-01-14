'use client';
import * as React from 'react';
import { useState } from 'react';
import { Box, TextField, Button, MenuItem, Typography, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { CreateEventDto, Event } from '@/types';
import { useRouter } from 'next/navigation';

interface EventFormProps {
  initialData?: Event;
  onSubmit: (data: CreateEventDto) => Promise<void>;
  title: string;
}

export default function EventForm({ initialData, onSubmit, title }: EventFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateEventDto>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || '',
    date: initialData?.date || dayjs().toISOString(),
    latitude: initialData?.latitude || 0,
    longitude: initialData?.longitude || 0,
  });
  const [dateValue, setDateValue] = useState<Dayjs | null>(initialData ? dayjs(initialData.date) : dayjs());
  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'latitude' || name === 'longitude' ? parseFloat(value) : value
    }));
  };

  const validate = () => {
    const newErrors: any = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!dateValue) newErrors.date = 'Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const submitData = {
      ...formData,
      date: dateValue ? dateValue.toISOString() : new Date().toISOString()
    };
    await onSubmit(submitData);
  };

  const categories = ['Music', 'Tech', 'Art', 'Business', 'Sports', 'Other'];

  return (
    <Paper sx={{ p: 4, maxWidth: 800, mx: 'auto', borderRadius: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>{title}</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Event Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
              variant="outlined"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              select
              fullWidth
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              error={!!errors.category}
              helperText={errors.category}
            >
              {categories.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <DatePicker
              label="Date"
              value={dateValue}
              onChange={(newValue) => setDateValue(newValue)}
              slotProps={{ textField: { fullWidth: true, error: !!errors.date, helperText: errors.date } }}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              type="number"
              label="Latitude"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              inputProps={{ step: "0.0001" }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              type="number"
              label="Longitude"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              inputProps={{ step: "0.0001" }}
            />
          </Grid>
          <Grid size={{ xs: 12 }} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" variant="contained" size="large">Save Event</Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
