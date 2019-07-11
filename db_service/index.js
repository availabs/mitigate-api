'use strict'

const path = require('path')
const pg_js = require('pg')
//const Pool = pg_native.Pool
const Pool = pg_js.Pool

// const envFilePath = 'hazmit_localhost.env'
const envFilePath = 'hazmit_postgres.env'

const envFile = require('node-env-file')
envFile(path.join(__dirname, envFilePath))


const config = {
  host     : process.env.POSTGRES_NETLOC,
  port     : process.env.POSTGRES_PORT || undefined,
  user     : process.env.POSTGRES_USER,
  password : process.env.POSTGRES_PASSWORD || undefined,
  database : process.env.POSTGRES_DB,
  max      : 40
}

const pool = new Pool(config)

 //code based on example found here: https://github.com/brianc/node-postgres/wiki/Example
const query = (text, values, cb) => pool.query(text, values, cb)
const end = () => pool.end();

const promise = (text, values=[]) => {
	return new Promise((resolve, reject) => {
		pool.query(text, values, (error, result) => {
			if (error) {
			console.log("<db_service> ERROR:",error)
				reject(error);
			}
			else {
				resolve(result.rows);
			}
		})
	})
}

// Used in the database initialization scripts.
// Keeps them from hanging at the end.

module.exports = {
  query,
  end,
  promise
}
