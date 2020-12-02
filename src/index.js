const http = require("http"); //core module
const fs = require("fs"); //core module
const url = require ("url");
const querystring = require ("querystring");
//const myLog = require("./modules/my-log.js");//local module
const {info,error} = require("./modules/my-log.js");//local module PARCIAL
//const info = require("./modules/my-log.js"); //local module PARCIAL
//const error = require("./modules/my-log.js"); //local module PARCIAL
const constnts = require("./utils/consts.js"); //local module
const firebase = require("../libs/firebase.js"); //local module
const {countries} = require('countries-list');// Third Party module

let server = http.createServer(function (request, response) {
  var parsed = url.parse(request.url);
  console.log("parsed:", parsed);

  var pathname = parsed.pathname;

  var query = querystring.parse(parsed.query);
  console.log("query", query);
  if (pathname === "/") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("<html><xbody><p>HOME PAGE</p></body><html>");
    response.end();
  } else if (pathname === "/exit") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("<html><xbody><p>BYE PAGE</p></body><html>");
    response.end();
  }else if (pathname === "/country") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.write(JSON.stringify(countries[query.code]));
    response.end();
  }else if (pathname === "/info") {
    //var result = myLog.info(pathname);
    var result = info(pathname);
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(result);
    response.end();
  }else if (pathname === "/error") {
    var result = error(pathname);
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(result);
    response.end();
  }else {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.write("<html><xbody><p>PAGE NOT FOUND</p></body><html>");
    response.end();
  }
});
server.listen(4000);
console.log(" Servidor funcionando en puerto 4000");
/*
console.log("Hola!");
function suma(num1, num2) {
  return num1 + num2;
}

let result = suma(2, 6);
console.log("la suma es : ", result);
*/