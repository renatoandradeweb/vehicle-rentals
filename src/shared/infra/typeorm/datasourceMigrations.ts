import { DataSource } from "typeorm";

const PostgresDataSourceMigrations = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "docker",
    database: "veiculos_bd",
    migrations: ["./src/shared/infra/typeORM/migrations/*.ts"],
    entities: [
        "./src/modules/**/infra/typeorm/entities/*.ts"
    ],
    
})

export { PostgresDataSourceMigrations }