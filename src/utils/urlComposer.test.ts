import { urlComposer } from "./urlComposer";

test('compose - host not ended in / must compose url like host/id', () => {
    const host = "http://localhost.com"
    var id = "zXt234ty";
    var newUrl = urlComposer.compose(id, host);
    expect(newUrl).toBe(host + '/' + id);
});

test('compose - host ended in / must compose url like host/id', () => {
    const host = "http://localhost.com/"
    var id = "zXt234ty";
    var newUrl = urlComposer.compose(id, host);
    expect(newUrl).toBe(host + id);
});