import { Request, Response } from "express";
import { ShortenURLUseCase } from "./ShortenURLUseCase";

export class ShortenURLController {
    constructor(
        private shortenURLUseCase: ShortenURLUseCase
    ) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const { url } = request.body;
        try {
            console.log(url);
            var newUrl = await this.shortenURLUseCase.execute(url);
            return response.status(201).json({
                newUrl: newUrl
            });
        } catch (err) {
            return response.status(400).json({
                message: err.message || 'An unexpected error occurred'
            })
        }
    }
}