export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string; // ISO string
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventDto {
  title: string;
  description: string;
  category: string;
  date: string;
  latitude: number;
  longitude: number;
}

export interface UpdateEventDto extends Partial<CreateEventDto> { }
