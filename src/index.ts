import database from 'database'
import restAPI from 'api/rest'
import { EventEmitter } from 'events'

EventEmitter.defaultMaxListeners = 25

const run = async() => {
    await database()
    restAPI()
}

run()
