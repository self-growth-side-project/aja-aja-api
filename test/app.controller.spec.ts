import { Test, TestingModule } from '@nestjs/testing';
import { AjaAjaController } from '../src/aja-aja.controller';

describe('AppController', () => {
  let appController: AjaAjaController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AjaAjaController],
    }).compile();

    appController = app.get<AjaAjaController>(AjaAjaController);
  });

  describe('root', () => {
    it('Server Health Check', () => {
      expect(appController.checkHealth().data).toBe('AJA-AJA API SERVER IS RUNNING...');
    });
  });
});
