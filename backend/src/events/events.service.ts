import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createEventDto: CreateEventDto) {
    return this.prisma.event.create({
      data: {
        ...createEventDto,
        date: new Date(createEventDto.date), // Ensure date is Date object
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.EventWhereUniqueInput;
    where?: Prisma.EventWhereInput;
    orderBy?: Prisma.EventOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.event.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    await this.findOne(id); // Check existence

    // Handle date conversion if present
    const data: any = { ...updateEventDto };
    if (updateEventDto.date) {
      data.date = new Date(updateEventDto.date);
    }

    return this.prisma.event.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id); // Check existence
    return this.prisma.event.delete({
      where: { id },
    });
  }

  async findSimilar(id: string) {
    const event = await this.findOne(id);

    // Basic recommendation: Same category, excluding self, limited to 3
    return this.prisma.event.findMany({
      where: {
        category: event.category,
        id: { not: id },
      },
      take: 3,
      orderBy: {
        date: 'asc', // Upcoming similar events
      },
    });
  }
}
