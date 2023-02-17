import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const postgresConnect: any = {
      type: "postgres",
      host: process.env.POSTGRES_HOST ?? process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      // timezone: process.env.DB_TIMEZONE,
      entities: [__dirname + "/../**/*.entity.{js,ts}"],
      synchronize: true,
    };
    console.log("postgresConnect =>", postgresConnect);
    return postgresConnect;
  }
}
