import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appDataSoruce } from '@lib/providers/typeorm/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(appDataSoruce.options)],
})
export class TypeormModule {}
