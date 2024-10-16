const ProductsModel = require('./../Model/Products.Model');

async function Read(req, res) {
  try {
    const Products = await ProductsModel.Read();
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.write(JSON.stringify(Products));
    res.end();
  } catch (error) {
    console.log(error);
    res.writeHead(500, { 'content-type': 'text/plain' });
    res.write('Internal Server Error...');
    res.end();
  }
}

async function GetById(req, res) {
  try {
    const id = req.url.split('/')[3];
    const Products = await ProductsModel.FindById(id);
    if (!Products) {
      res.writeHead(404, { 'content-type': 'text/plain' });
      res.write('Product Is Not Define...');
      res.end();
    } else {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.write(JSON.stringify(Products));
      res.end();
    }
  } catch (error) {
    onsole.log(error);
    res.writeHead(500, { 'content-type': 'text/plain' });
    res.write('Internal Server Error...');
    res.end();
  }
}

async function Create(req, res) {
  try {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      const Product = {...JSON.parse(body),  CreatedAt: new Date() };
      const Result = await ProductsModel.Create(Product);
      res.writeHead(201, { 'content-type': 'application/json' });
      res.write(JSON.stringify(Result));
      res.end();
    });
  } catch (error) {
    onsole.log(error);
    res.writeHead(500, { 'content-type': 'text/plain' });
    res.write('Internal Server Error...');
    res.end();
  }
}

async function Update(req, res) {
  try {
    let body = '';
    const id = req.url.split('/')[3];
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      const ParsedBody = { ...JSON.parse(body) };
      const Product = await ProductsModel.FindById(id);
      if (!Product) {
        res.writeHead(404, { 'content-type': 'text/plain' });
        res.write('Product Is Not Define...');
        res.end();
      } else {
        const Result = await ProductsModel.Update(id, ParsedBody);
        res.writeHead(200, { 'content-type': 'application/json' });
        res.write(JSON.stringify(Result));
        res.end();
      }
    });
  } catch (error) {
    onsole.log(error);
    res.writeHead(500, { 'content-type': 'text/plain' });
    res.write('Internal Server Error...');
    res.end();
  }
}

async function Remove(req, res) {
  try {
    const id = req.url.split('/')[3];
    const Products = await ProductsModel.FindById(id);
    if (!Products) {
      res.writeHead(404, { 'content-type': 'text/plain' });
      res.write('Product Is Not Define...');
      res.end();
    } else {
      const Result = await ProductsModel.Remove(id);
      res.writeHead(200, { 'content-type': 'application/json' });
      res.write(JSON.stringify(Result));
      res.end();
    }
  } catch (error) {
    onsole.log(error);
    res.writeHead(500, { 'content-type': 'text/plain' });
    res.write('Internal Server Error...');
    res.end();
  }
}

const ProductsController = {
  Read,
  GetById,
  Create,
  Update,
  Remove,
};

module.exports = ProductsController;
