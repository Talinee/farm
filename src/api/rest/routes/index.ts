import { Express } from 'express'
import auth from './auth'
import account from './account'

export default (app: Express) => {
    app.use('/api', [ auth, account ])
}
