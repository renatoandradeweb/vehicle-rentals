import { container } from 'tsyringe';
import { IDateProvider } from './DateProvider/IDateProvider';
import { DayjsDateProvider } from './implementations/DayjsDateProvider';

container.registerSingleton<IDateProvider>(
    'DayjsDateProvider',
    DayjsDateProvider,
);

