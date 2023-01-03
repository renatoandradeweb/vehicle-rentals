import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";

interface IFiles {
    filename: string;
}

class UploadCarImagesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const images = request.files as IFiles[];

        const uploadCarImageUseCase = container.resolve(UploadCarImagesUseCase);

        const filesName = images.map((file) => file.filename);

        await uploadCarImageUseCase.execute({
            car_id: id,
            image_name: filesName,
        });
        return response.status(201).send();
    }
}

export { UploadCarImagesController };