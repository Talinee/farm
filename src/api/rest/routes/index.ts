import { Express } from 'express'
import reward from './reward'
import news from './news'
import auth from './auth'
import account from './account'
import knowledge from './knowledge'
import event from './event'
import favourite from './favorite'
import category from './category'
import myEvent from './myEvent'

export default (app: Express) => {
    app.use('/api', [ reward, news, auth, account, knowledge, event, favourite, category, myEvent ])
}
