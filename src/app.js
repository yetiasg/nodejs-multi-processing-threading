const os = require('os');
const cluster = require('cluster');
const { fork } = require('child_process');

if(cluster.isMaster){
  const n_cpus = os.cpus().length;
  console.log(`Forking ${n_cpus} CPUs`);
  for(let i = 0; i < n_cpus; i++){
    cluster.fork();
  }
}else {
  const morgan = require('morgan');
  const cors = require('cors');
  const express = require('express');
  const app = express();
  app.use(morgan('dev'));
  app.use(cors({origin: '*'}))
  const port = process.env.PORT || 5505;
  const { spawn } = require('child_process');


  app.get('/isprime', (req, res, next) => {
    const childProces = fork('./src/isprime.js');
    childProces.send({"number": parseInt(req.query.number)});
    childProces.on("message", message => res.json({message}))
  })

  const pid = process.pid;
  app.listen(port, () => {
    console.log(`Server: process ${pid} is listening on port: ${port}`)
  })
}