import moment = require("moment");
import { expiryVerifier } from "./expiryVerifier";

test ('isValid - date not expired must return true', () => {
    var date = moment();
    expect(expiryVerifier.isValid(date.toDate())).toBe(true);
});

test ('isValid - date expired must return false', () => {
    var date = moment();
    date.add(2, 'months');
    expect(expiryVerifier.isValid(date.toDate())).toBe(false);
});