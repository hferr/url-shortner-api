import { Request, Response } from "express";
import { GetShortenURLUseCase } from "./GetShortenURLUseCase";

export class GetShortenURLController {
    constructor(
        private getShortenURLUseCase: GetShortenURLUseCase
    ) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const id = request.params.id;
        try {
            var url = await this.getShortenURLUseCase.execute(id);
            if (url) {
                response.redirect(url);
            } else {
                return response.status(404).send();
            }
        } catch (err) {
            return response.status(400).json({
                message: err.message || 'An unexpected error occurred'
            })
        }
    }
}