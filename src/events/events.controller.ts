import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) { }

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll(
    @Query('category') category?: string,
    @Query('date') date?: string,
    @Query('limit') limit?: string,
    @Query('skip') skip?: string
  ) {
    const where: any = {};
    if (category) {
      where.category = category;
    }
    if (date) {
      // Basic strict date matching, can be enhanced for ranges
      const startOfDay = new Date(date);
      const endOfDay = new Date(date);
      endOfDay.setDate(endOfDay.getDate() + 1);

      where.date = {
        gte: startOfDay,
        lt: endOfDay,
      };
    }

    return this.eventsService.findAll({
      where,
      take: limit ? Number(limit) : undefined,
      skip: skip ? Number(skip) : undefined,
      orderBy: { date: 'asc' },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }

  @Get(':id/similar')
  findSimilar(@Param('id') id: string) {
    return this.eventsService.findSimilar(id);
  }
}
