export class idGenerator {
    static generateId(seed: string): string {
        return seed.substring(0, 8);
    }
}