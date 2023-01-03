import { Router } from 'express';
import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionReltal/DevolutionRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/listRentalsByUserController';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle);
rentalRoutes.post('/devolution/:id', ensureAuthenticated, devolutionRentalController.handle);
rentalRoutes.get('/user', ensureAuthenticated, listRentalsByUserController.handle);

export { rentalRoutes };