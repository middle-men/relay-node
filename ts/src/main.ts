const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')

// For js-ipfs >= 0.38

// Create IPFS instance
const initIPFSInstance = async () => {
  return await IPFS.create({ repo: "./omniboardio" });
};

initIPFSInstance().then(async ipfs => {
  const orbitdb = await OrbitDB.createInstance(ipfs);

  // Create / Open a database
  const db = await orbitdb.kvstore("main");
  await db.load();

  // Listen for updates from peers
  db.events.on("replicated", _ => {
    console.log(db.iterator({ limit: -1 }).collect());
  });

  // Add an entry
  const hash = await db.put("hello", "world");
  console.log(hash);

  // Query
  console.log(db.get("hello"));
});


import fastify from 'fastify'

const server = fastify()

server.get('/ping', async (_req, _res) => {
  return 'pong\n'
})

server.listen(4242, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})


