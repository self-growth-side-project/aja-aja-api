import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { destroyNamespace, getNamespace } from 'cls-hooked';
import { NAMESPACE_AJA_AJA } from '../common/constant/namespace.code';
import { DataSource } from 'typeorm';

@Injectable()
export class ShutDownManager implements OnApplicationShutdown {
  constructor(private readonly dataSource: DataSource) {}

  async onApplicationShutdown(signal: string) {
    console.log(`Shutdown Gracefully with ${signal}`);

    if (getNamespace(NAMESPACE_AJA_AJA)) {
      destroyNamespace(NAMESPACE_AJA_AJA);
    }

    if (this.dataSource.isInitialized) {
      await this.dataSource.destroy();
    }
  }
}
