import { PostgresUrlsRepository } from "../../repositories/implementations/URLRepository";
import { ShortenURLController } from "./ShortenURLController";
import { ShortenURLUseCase } from "./ShortenURLUseCase";


const postgresUrlsRepository = new PostgresUrlsRepository();

const shortenURLUseCase = new ShortenURLUseCase(postgresUrlsRepository);
const shortenURLController = new ShortenURLController(shortenURLUseCase);

export { shortenURLUseCase, shortenURLController }