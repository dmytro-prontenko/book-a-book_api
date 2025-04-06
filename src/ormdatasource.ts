import { DataSource } from 'typeorm';
import ormconfig from '@app/orm_config';

export default new DataSource(ormconfig);
