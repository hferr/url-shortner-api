import moment = require("moment");

export class expiryVerifier {
    static isValid(creationDate: Date): Boolean {
        return moment(creationDate) < moment().add("1", 'month');
    }
}