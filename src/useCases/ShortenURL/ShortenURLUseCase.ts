import { IURLRepository } from "../../repositories/IURLRepository";
import { URL } from "../../entity/URL"
import { urlValidator } from "../../utils/urlValidator";
import { idGenerator } from "../../utils/idGenerator";
import { urlComposer } from "../../utils/urlComposer";
import { expiryVerifier } from "../../utils/expiryVerifier";

import moment = require("moment");
import { environmentContext } from "../../utils/environmentContext";

var uuidBase62 = require('uuid-base62');

export class ShortenURLUseCase {
    constructor(
        private urlsRepository: IURLRepository
    ) { }

    async execute(originalUrl: string) {    
        // check if url is valid
        if (!urlValidator.isValid(originalUrl)) {
            throw Error("Error, invalid url format");
        }

        // check if we already have a not expired shortened URL for this URL
        var url = await this.urlsRepository.findByOriginalUrl(originalUrl);
        if (url) {
            if (expiryVerifier.isValid(url.creationDate)) {
                // compose the url to send as response
                return urlComposer.compose(url.id, environmentContext.getHostname());
            } else {
                await this.urlsRepository.delete(url.id);
            }
        }

        // creates the id that will serve as our shortened url. For randomness I've decided to use the first 8 characters of a base62([A-Z, a-z, 0-9]) 
        // generated uuid as seed, so that it is already in the desired format. This process ensures that for the majority of cases only one more iteration 
        // will be needed if it happens to generated an id that already exists in our database.
        var isUniqueId = false;
        do {
            var seed = uuidBase62.v4();
            var id = idGenerator.generateId(seed);
            var url = await this.urlsRepository.findById(id);
            if (!url) {
                isUniqueId = true;
            }
        } while (!isUniqueId)

        // add to database
        var url = await this.urlsRepository.add(new URL(id, originalUrl, moment().toDate()));

        // compose the new url to send as response
        return urlComposer.compose(id, environmentContext.getHostname());
    }
}