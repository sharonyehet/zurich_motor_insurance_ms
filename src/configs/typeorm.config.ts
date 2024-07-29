import { DataSource, DataSourceOptions } from 'typeorm';

export const DATA_SOURCE_OPTIONS: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [`${__dirname}/../**/**.entity.{ts,js}`],
    migrations: [`${__dirname}/../**/databases/migrations/*.{ts,js}`],
};

const dataSource = new DataSource(DATA_SOURCE_OPTIONS);

export default dataSource;
