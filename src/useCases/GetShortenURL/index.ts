import { PostgresUrlsRepository } from "../../repositories/implementations/URLRepository";
import { GetShortenURLController } from "./GetShortenURLController";
import { GetShortenURLUseCase } from "./GetShortenURLUseCase";

const postgresUrlsRepository = new PostgresUrlsRepository();
const getShortenURLUseCase = new GetShortenURLUseCase(postgresUrlsRepository);
const getShortenURLController = new GetShortenURLController(getShortenURLUseCase);

export { getShortenURLUseCase, getShortenURLController}