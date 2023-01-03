import { PostgresDataSource } from "@shared/infra/typeorm/index";
import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { Repository } from "typeorm";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";


class CarsImageRepository implements ICarsImagesRepository {
        
        private repository: Repository<CarImage>;
        
        constructor() {
            this.repository = PostgresDataSource.getRepository(CarImage);
        }
    
        async create(car_id: string, image_name: string): Promise<CarImage> {
            const carImage = this.repository.create({
                car_id,
                image_name,
            });
    
            await this.repository.save(carImage);
    
            return carImage;
        }

}

export { CarsImageRepository };