import { inject, injectable } from "tsyringe";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import auth from "@config/auth";
import AppError from "@shared/errors/AppError";
import { verify, sign } from "jsonwebtoken";

interface IPayload {
    sub: string;
    email: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) { }

    async execute(token: string): Promise<string> {
        const { 
            secret_refresh_token,
            expires_in_refresh_token,
            expires_refresh_token_days
        } = auth;

        const { email, sub } = verify(token, secret_refresh_token) as IPayload;

        const user_id = sub;

        const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(
            user_id,
            token
        );

        if (!userToken) {
            throw new AppError("Refresh token does not exists!");
        }
        
        await this.usersTokensRepository.deleteById(userToken.id);

        const refresh_token = sign({ email }, secret_refresh_token, {
            subject: sub,
            expiresIn: expires_in_refresh_token,
        });

        const expires_date = this.dateProvider.addDays(expires_refresh_token_days);

        await this.usersTokensRepository.create({
            expires_date,
            refresh_token,
            user_id
        });

        return refresh_token;
    }
}

export { RefreshTokenUseCase };