const NotFound = (res) => {
  res.writeHead(404, { 'content-type': 'text/plain' });
  res.write('Url Is Not Define...');
  res.end();
};


const ErrorHandler = {
  NotFound,
};

module.exports = ErrorHandler;
