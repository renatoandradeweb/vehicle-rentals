import "reflect-metadata";
import { PostgresDataSource } from "../index";
import { v4 as uuidV4 } from "uuid";
import { hash } from "bcryptjs";

console.log("executou");

async function create() {
    const id = uuidV4();
    const password = await hash("admin", 8);
  

    await PostgresDataSource.initialize().then(() => {
        console.log("Data Source has been initialized!")
    }).catch((err) => {
        console.error("Error during Data Source initialization", err)
    });
    

    await PostgresDataSource.query(
        `INSERT INTO USERS(id, name, email, password, "isAdmin", driver_license, created_at)
        values('${id}', 'admin', 'admin@renatoandrade.com', '${password}', true, 'XXXXXX', 'now()')`
    );

    PostgresDataSource.destroy();
}



create().then(() => console.log("User admin created!")); 

