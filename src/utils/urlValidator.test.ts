import { urlValidator } from "./urlValidator";

test ('isValid - malformed url without domain returns false', () => {
    expect(urlValidator.isValid("invalid_url")).toBe(false);
});

test ('isValid - well formed url with http is valid', () => {
    expect(urlValidator.isValid("http://www.google.com")).toBe(true);
});

test ('isValid - well formed url with https is valid', () => {
    expect(urlValidator.isValid("https://www.google.com")).toBe(true);
});

test ('isValid - malfored url with spaces returns false', () => {
    expect(urlValidator.isValid("https://www.go ogle.com")).toBe(false);
});

test ('isValid - malfored url with double quotes returns false', () => {
    expect(urlValidator.isValid("https://www.go\"ogle.com")).toBe(false);
});