var authService = require('./../../services/authentication-service');

describe("An example server side test suite", function() {

	beforeEach(function() {
	});

	it("should validate a token", function() {
    var req = {},
        cookieService = {
          readContent : function(req, name) {
            return "cookie-token"
          }
        },
        cryptoService = {
          decrypt : function(value) {
            return "{ 'name': 'paul'}"
          }
        };

		expect(authenticateResponse.authenticateRequest(req, cookieService, cryptoService)).toBe('paul');

	});

	it("should handle an asyncronous test", function(done) {
		request("http://www.google.com", function(error, response, body){
			done();
		});
	});

});
