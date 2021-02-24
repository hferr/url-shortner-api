import e = require("express");

export class urlComposer {
    static compose(id:string, host:string): string {
        if (host.endsWith('/')) {
            return host + id;
        } else {
            return host + '/' + id;
        }
    }
}