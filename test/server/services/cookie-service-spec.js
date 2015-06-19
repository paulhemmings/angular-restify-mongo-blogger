var cookieService = require('./../../../scripts/services/cookie-service');

describe("Cookie Service suite", function() {

  it("should read a cookie", function() {
    var req = {
        headers : {
            cookie : "token=cook;job=awesome;weekend=now;"
        }
    };
    expect(cookieService.readCookie(req, 'token')).toBe('cook');
    expect(cookieService.readCookie(req, 'unfound')).toBe(undefined);
  });

  it("should write a cookie", function() {
    var response = {
        writeHead : function(val, content) {
          expect(val).toBe(200);
          expect(content['Set-Cookie']).toBe('token=cook');
          expect(content['Content-Type']).toBe('text/plain');
        }
    };
    var name = "token";
    var content = "cook";
    expect(cookieService.writeCookie(response, name, content));
  });

});
