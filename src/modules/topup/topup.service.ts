import { Injectable } from '@nestjs/common';
import { CreateTopupDto } from './dto/create-topup.dto';
import { UpdateTopupDto } from './dto/update-topup.dto';

@Injectable()
export class TopupService {
  create(createTopupDto: CreateTopupDto) {
    return 'This action adds a new topup';
  }

  findAll() {
    return `This action returns all topup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} topup`;
  }

  update(id: number, updateTopupDto: UpdateTopupDto) {
    return `This action updates a #${id} topup`;
  }

  remove(id: number) {
    return `This action removes a #${id} topup`;
  }
}
