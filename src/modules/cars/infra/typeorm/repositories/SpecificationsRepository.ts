import { PostgresDataSource } from "@shared/infra/typeorm/index";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { Repository, In } from "typeorm";


class SpecificationsRepository implements ISpecificationsRepository {
    
    private repository: Repository<Specification>;

    constructor() {
        this.repository = PostgresDataSource.getRepository(Specification);
    }

    async create({ description, name }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = this.repository.create({
            name,
            description,
        }); 
        await this.repository.save(specification);
        return specification;
    }

    async list(): Promise<Specification[]> {
        const specifications = await this.repository.find();
        return specifications;
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({ where: { name: name } });
        return specification;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = await this.repository.find({
            where: {
                id: In(ids),
            },
        });
        return specifications;
    }
    
}

export { SpecificationsRepository };