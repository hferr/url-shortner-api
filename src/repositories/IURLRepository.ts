import { URL } from "../entity/URL";

export interface IURLRepository {
    add(url: URL): Promise<URL>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<URL>;
    findByOriginalUrl(originalUrl: string): Promise<URL>;
}