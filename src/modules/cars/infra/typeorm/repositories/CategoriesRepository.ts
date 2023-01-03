import { PostgresDataSource } from "@shared/infra/typeorm/index";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "@modules/cars/repositories/ICategoriesRepository";
import { Repository } from "typeorm";

class CategoriesRepository implements ICategoriesRepository {
  
  private repository: Repository<Category>;

  constructor() {
    this.repository = PostgresDataSource.getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    });
    await this.repository.save(category);
  }
  
    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({ where: { name: name } });
        return category;
    }
    
}
export { CategoriesRepository };