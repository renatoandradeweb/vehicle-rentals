import { inject, injectable } from 'tsyringe';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

interface IRequest {
    user_id: string;
}

@injectable()
class ListRentalsByUserUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
    ) { }

    async execute({ user_id }: IRequest): Promise<Rental[]> {
        const rentals = await this.rentalsRepository.findByUser(user_id);

        return rentals;
    }
}
 
export { ListRentalsByUserUseCase };