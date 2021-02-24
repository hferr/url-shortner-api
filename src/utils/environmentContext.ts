export class environmentContext {
    static isProd(): boolean {
        return process.env.NODE_ENV === "production";
    }

    static getHostname(): string {
        if (this.isProd()) {
            return process.env.APP_URL;
        } else {
            const port = process.env.PORT || "8081";
            return "http://localhost:" + port;
        }
    }
}