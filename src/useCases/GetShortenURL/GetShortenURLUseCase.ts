import { IURLRepository } from "../../repositories/IURLRepository";
import { expiryVerifier } from "../../utils/expiryVerifier";

export class GetShortenURLUseCase {
    constructor(
        private urlsRepository: IURLRepository
    ) { }

    async execute(id: string) {
        var url = await this.urlsRepository.findById(id);
        // if it exists, check if it's still valid. Ideally we could have bot scanning the URL table from time to time to delete expired entries, however
        // this check would still be needed in cases where the entry is expired but the bot didn't get to it yet
        if (url) {
            if (expiryVerifier.isValid(url.creationDate)) {
                return url.originalUrl;
            } else {
                await this.urlsRepository.delete(id);
            }
        } else {
            return "";
        }
    }
}