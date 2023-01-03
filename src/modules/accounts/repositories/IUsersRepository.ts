import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";



interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
    list(): Promise<User[]>;
}

export { IUsersRepository };