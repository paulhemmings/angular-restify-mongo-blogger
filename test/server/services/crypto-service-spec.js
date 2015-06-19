var cryptoService = require('./../../../scripts/services/crypto-service');

describe("Crypto Service suite", function() {

  it("should encrypt a text", function() {
    expect(cryptoService.encrypt("paul")).toBe('148fc19c');
  });

  it("should decrypt a text", function() {
    expect(cryptoService.decrypt("148fc19c")).toBe('paul');
  });

});
