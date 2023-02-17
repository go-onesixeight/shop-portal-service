import { Test, TestingModule } from '@nestjs/testing';
import { TopupService } from './topup.service';

describe('TopupService', () => {
  let service: TopupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopupService],
    }).compile();

    service = module.get<TopupService>(TopupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
