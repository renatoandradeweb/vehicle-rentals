import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListRentalsByUserUseCase } from "@modules/rentals/useCases/listRentalsByUser/listRentalsByUserUseCase";

class ListRentalsByUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        const listRentalsByUserUseCase = container.resolve(ListRentalsByUserUseCase);

        const rentals = await listRentalsByUserUseCase.execute({ user_id: id });

        return response.status(200).json(rentals);
    }
}

export { ListRentalsByUserController };