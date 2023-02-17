import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TopupService } from './topup.service';
import { CreateTopupDto } from './dto/create-topup.dto';
import { UpdateTopupDto } from './dto/update-topup.dto';

@Controller('topup')
export class TopupController {
  constructor(private readonly topupService: TopupService) {}

  @Post()
  create(@Body() createTopupDto: CreateTopupDto) {
    return this.topupService.create(createTopupDto);
  }

  @Get()
  findAll() {
    return this.topupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTopupDto: UpdateTopupDto) {
    return this.topupService.update(+id, updateTopupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topupService.remove(+id);
  }
}
