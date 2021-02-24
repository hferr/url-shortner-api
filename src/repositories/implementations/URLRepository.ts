import { getManager, getRepository } from "typeorm"
import { URL } from "../../entity/URL";
import { IURLRepository } from "../IURLRepository";


export class PostgresUrlsRepository implements IURLRepository {
    async add(url: URL): Promise<URL> {
        return await getManager().save(url);
    }

    async delete(id: string): Promise<void> {
        await getManager().delete(URL, id);
    }

    async findById(id: string): Promise<URL> {
        return await getManager().findOne(URL, id);
    }

    async findByOriginalUrl(originalUrl: string): Promise<URL> {
        console.log("hits findByOriginalUrl")
        return await getManager().findOne(URL, { originalUrl: originalUrl});
    }
}