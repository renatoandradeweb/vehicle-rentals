import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import auth from "@config/auth";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Validação do token JWT
  const authHeader = request.headers.authorization;
  const usersTokensRepository = new UsersRepository();

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }
  
  const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(
          token,
          auth.secret_refresh_token
        ) as IPayload;

        const user = await usersTokensRepository.findById(user_id);

        if (!user) {
            throw new AppError("User does not exists!", 401);
        }

        request.user = {
            id: user_id
        };

        next();
        
    } catch {
        throw new AppError("Token invalid!", 401);
    }
}