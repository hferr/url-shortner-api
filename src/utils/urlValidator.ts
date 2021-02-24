export class urlValidator {
    // validating URL by checking the scheme name, spaces and doulbe quotes only
    static isValid(url: string): Boolean {
        const regex = new RegExp(/^(http|https):\/\/[^ "]+$/);
        return regex.test(url);
    }
}