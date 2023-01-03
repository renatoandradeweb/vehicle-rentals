import { PostgresDataSource } from "@shared/infra/typeorm/index";
import { Repository } from 'typeorm';

import { User } from "../entities/User";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = PostgresDataSource.getRepository(User);
    }
   
    async create({ id, name, email, password, avatar, driver_license }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            id,
            name,
            email,
            password,
            avatar,
            driver_license,
        });

        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ where: { email: email } });
        return user;
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne({ where: { id: id } });
        return user;
    }

    async list(): Promise<User[]> {
        const users = await this.repository.find();
        return users;
    }
}

export { UsersRepository };