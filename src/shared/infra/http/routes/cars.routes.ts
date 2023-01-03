import { Router } from "express";
import multer from 'multer';
import uploadConfig from '@config/upload';
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvaliableCarsController } from "@modules/cars/useCases/listAvaliableCars/ListAvaliableCarsController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImage/UploadCarImagesController";

const carsRoutes = Router();

const uploadFlies = multer(uploadConfig.upload('./tmp/cars'));

const createCarController = new CreateCarController();

const createCarSpecificationController = new CreateCarSpecificationController();

const listAvaliableCarsController = new ListAvaliableCarsController();

const uploadCarImagesController = new UploadCarImagesController();

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);

carsRoutes.post("/specifications/:id", ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle);

carsRoutes.post("/images/:id", ensureAuthenticated, ensureAdmin, uploadFlies.array("images"), uploadCarImagesController.handle);

carsRoutes.get("/avaliable", listAvaliableCarsController.handle);

export { carsRoutes };