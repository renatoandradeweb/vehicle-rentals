import { DataSource } from "typeorm";

const PostgresDataSource = new DataSource({
    type: "postgres",
    host: "172.19.0.2",
    port: 5432,
    username: "postgres",
    password: "docker",
    database: "veiculos_bd",
    migrations: ["./src/shared/infra/typeORM/migrations/*.ts"],
    entities: [
        "./src/modules/**/infra/typeorm/entities/*.ts"
    ],
    
})



export { PostgresDataSource }