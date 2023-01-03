import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { PostgresDataSource } from "@shared/infra/typeorm/index";
import { Repository } from 'typeorm';
import { UserTokens } from "../entities/UserTokens";

class UsersTokensRepository implements IUsersTokensRepository {
    private repository: Repository<UserTokens>;

    constructor() {
        this.repository = PostgresDataSource.getRepository(UserTokens);
    }
    
    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
        ): Promise<UserTokens> {
        const userToken = await this.repository.findOne({
            where: {
                user_id,
                refresh_token 
            }
        });

        console.log(userToken);

        return userToken;
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async create({
        expires_date,
        refresh_token,
        user_id,
    }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = this.repository.create({
            expires_date,
            refresh_token,
            user_id
        });

        await this.repository.save(userToken);

        return userToken;
    }
}

export { UsersTokensRepository };