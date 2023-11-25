/* eslint-disable no-console */
/** External Imports */
import mongoose from 'mongoose'
import dotenv from 'dotenv'

/** Internal Imports */
import app from './app'

/** dotenv config init */
dotenv.config()

const { PORT, DB_URI } = process.env

async function main(): Promise<void> {
  await mongoose.connect(DB_URI as string)

  app.listen(PORT, () => {
    console.log(
      '\x1b[34m%s\x1b[0m',
      `Server is up and running on http://localhost:${PORT}`,
    )
  })
}

main().catch(err => {
  console.error(err)
})
