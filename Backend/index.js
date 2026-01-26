// ทำการimport 
const http = require('http');
const host = 'localhost';
const port = 8000;  

//กำหนดค่า้ริ่มต้นขแง server
const requirelistener = function (req, res) {
  res.writeHead(200);
  res.end('My First Server!');
}
//runserver
const server = http.createServer(requirelistener);
server.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});