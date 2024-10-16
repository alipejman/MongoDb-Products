const http = require('http');
const PORT = 8080;
const ErrorHandler = require('./Controller/Error.Handler');
const ProductsController = require('./Controller/Products.Controller');
const Server = http.createServer((req, res) => {
  const ApiUrl = '/api/products';
  try {
    if (req.url == ApiUrl && req.method == 'GET') {
      ProductsController.Read(req, res);
    } else if (
      req.url.match(/\/api\/products\/[0-9]+/) &&
      req.method == 'GET'
    ) {
      ProductsController.GetById(req, res);
    } else if (req.url == ApiUrl && req.method == 'POST') {
      ProductsController.Create(req, res);
    } else if (
      req.url.match(/\/api\/products\/[0-9]+/) &&
      req.method == 'PUT'
    ) {
      ProductsController.Update(req, res);
    } else if (
      req.url.match(/\/api\/products\/[0-9]+/) &&
      req.method == 'DELETE'
    ) {
      ProductsController.Remove(req, res);
    } else {
      ErrorHandler.NotFound(res);
    }
  } catch (error) {
    onsole.log(error);
    res.writeHead(500, { 'content-type': 'text/plain' });
    res.write('Internal Server Error...');
    res.end();
  }
});

function logWithSystemTime(message) {
  const now = new Date();
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };
  const timestamp = now.toLocaleString(options);
  console.log(`[${timestamp}] ----- ${message}`);
}

Server.listen(PORT, () => {
  logWithSystemTime(
    `Server Is Running On Port ${PORT} : http://localhost:8080`
  );
});
