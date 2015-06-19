'use strict';

/*
 * Service to read and write cookies
 * http://stackoverflow.com/questions/3393854/get-and-set-a-single-cookie-with-node-js-http-server
 */

function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;

    if (rc) {
      rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
      });
    }

    return list;
}

exports.name = 'CookieService';

exports.readCookie = function(request, name) {
    return parseCookies(request)[name];
};

exports.writeCookie = function(response, name, content) {
    response.writeHead(200, {
      'Set-Cookie': name + '=' + content,
      'Content-Type': 'text/plain'
    });
};
