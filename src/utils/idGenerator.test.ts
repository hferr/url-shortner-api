import { idGenerator } from "./idGenerator";

var uuidBase62 = require('uuid-base62');

test ('generateId id lenght must be 8', () => {
    var seed = uuidBase62.v4();
    var id = idGenerator.generateId(seed);
    expect(id.length).toBe(8);
});