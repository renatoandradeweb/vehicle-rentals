import { container } from 'tsyringe';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';

import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';

import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { CarsImageRepository } from '@modules/cars/infra/typeorm/repositories/CarsImageRepository';

import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/RentalsRepository';

import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';

import "@shared/container/providers";

container.registerSingleton<ICategoriesRepository>(
    'CategoriesRepository',
    CategoriesRepository,
);

container.registerSingleton<ISpecificationsRepository>(
    'SpecificationsRepository',
    SpecificationsRepository,
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<ICarsRepository>(
    'CarsRepository',
    CarsRepository,
);

container.registerSingleton<ICarsImagesRepository>(
    'CarsImageRepository',
    CarsImageRepository,
);

container.registerSingleton<IRentalsRepository>(
    'RentalsRepository',
    RentalsRepository,
);

container.registerSingleton<IUsersTokensRepository>(
    'UsersTokensRepository',
    UsersTokensRepository,
);