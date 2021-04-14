const http = require("http");
const setup = require("proxy");
const basicAuthParser = require("basic-auth-parser");
 
const server = setup(http.createServer());

server.authenticate = (req, fn) => {
    const auth = req.headers["proxy-authorization"];

    if (!auth) {
        return fn(null, false);
    }

    const { scheme, username, password } = basicAuthParser(auth);

    if (scheme !== "Basic" || username !== process.env.PROXY_USERNAME || password !== process.env.PROXY_PASSWORD) {
        return fn(null, false);
    } else {
        return fn(null, true);
    }
}

server.listen(3128, function () {
  var port = server.address().port;
  console.log("HTTP(s) proxy server listening on port %d", port);
});