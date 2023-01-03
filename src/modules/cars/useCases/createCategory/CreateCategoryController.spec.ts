import { app } from "@shared/infra/http/app";
import { PostgresDataSourceMigrations } from "@shared/infra/typeorm/datasourceMigrations";
import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";
import request from "supertest";

PostgresDataSourceMigrations.initialize().then(() => {
    console.log("Data Source has been initialized!")
}).catch((err) => {
    console.error("Error during Data Source initialization", err)
})


describe("Create Category Controller", () => {
    beforeAll(async () => {
        const id = uuidV4();
        const connection = PostgresDataSourceMigrations.createEntityManager();
        
        const password = await hash("admin", 8);

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", driver_license, created_at)
            values('${id}', 'admin', 'admin@admin.com.br', '${password}', true, 'XXXXXX', 'now()')`
        );
        
    });

    it("should be able to create a new category", async () => {

        const responseToken = await request(app).post("/sessions").send({
            email: "admin@admin.com.br",
            password: "admin",
        });

        const { token } = responseToken.body;

        const response = await request(app).post("/categories").send({
            name: "Category Supertest",
            description: "Category Supertest",
        }).set({
            Authorization: `Bearer ${token}`,
        });
        
        expect(response.status).toBe(201);
    });
});