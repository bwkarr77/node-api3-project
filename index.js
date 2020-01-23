// code away!
require("dotenv").config();
const server = require("./server.jsx");
//hard coding the port number for deployment.
//const port = 7779;
/*
$ env => gives pairing environments
** none for port
$ export PORT = ####
** inserts PORT = #### into env
*/
const port = process.env.PORT || 7780;
server.listen(port, () => console.log(`\n**** LISTENING ON PORT ${port} ****`));
