import { Router } from 'express';
import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';
import { authenticateRoutes } from './authenticate.routes';
import { carsRoutes } from './cars.routes';
import { rentalRoutes } from './rental.routes';

const routes = Router();

routes.use( '/categories' , categoriesRoutes);
routes.use( '/specifications' , specificationsRoutes);
routes.use( '/users' , usersRoutes);
routes.use('/rentals', rentalRoutes);
routes.use( '/cars' , carsRoutes);
routes.use(authenticateRoutes);

export default routes;