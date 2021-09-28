const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')

import fastify from 'fastify'

async function main () {
  const ipfsOptions = { repo : './ipfs', }
  const ipfs = await IPFS.create(ipfsOptions)

  const orbitdb = await OrbitDB.createInstance(ipfs)

  const db = await orbitdb.keyvalue('first-database')

  console.log(`db addr : ${db.address.toString()}`)
}

main()
const server = fastify()

server.get('/ping', async (_req, _res) => {
  return 'pong\n'
})

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})


