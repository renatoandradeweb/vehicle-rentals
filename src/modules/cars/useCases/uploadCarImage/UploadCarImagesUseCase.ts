import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";

interface IRequest {
    car_id: string;
    image_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
    constructor(
        @inject("CarsImageRepository")
        private carsImageRepository: ICarsImagesRepository
    ) {}

    async execute({ car_id, image_name }: IRequest): Promise<CarImage[]> {
        image_name.map(async (image) => {
            await this.carsImageRepository.create(car_id, image);
        });

        return;
    }

}

export { UploadCarImagesUseCase };