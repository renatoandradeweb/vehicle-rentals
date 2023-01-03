import "reflect-metadata";
import { Request, Response, NextFunction } from "express";
import express from 'express';
import "express-async-errors";
import swaggerUI from 'swagger-ui-express';
import routes from '@shared/infra/http/routes';
import AppError from "@shared/errors/AppError";
import { PostgresDataSource } from '@shared/infra/typeorm/index';
import "@shared/container";
import swaggerFile from '../../../swagger.json';

PostgresDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!")
}).catch((err) => {
    console.error("Error during Data Source initialization", err)
})

const app = express();
app.use(express.json());

app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
    });
    }
    return response.status(500).json({
        status: "Error",
        message: `Internal server error ${err.message}`
    });
});
            
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));



export { app };

