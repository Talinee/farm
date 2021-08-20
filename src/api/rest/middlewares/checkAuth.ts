import { Response, Request as ExpressRequest, NextFunction } from 'express'
import { AuthToken } from 'models/AuthToken'
import { Account } from 'models/Account'

export interface RequestCheckAuth extends ExpressRequest {
    accessToken: string
    accessTokenExpiresAt: Date
    shopID: string
}
export default async (request: RequestCheckAuth, response: Response, next: NextFunction) => {
    try {
        const token = request.headers.authorization.replace('Bearer ', '')
        const shopToken = await AuthToken.findOne({ accessToken: token })
        if (shopToken) {
            const shop = await Account.findOne({ _id: shopToken.userID })

            if (shop && shopToken.expiredAccessToken && shopToken.expiredAccessToken > new Date()) {
                next()
            }
            else {
                response.sendStatus(401)
            }
        }
        else {
            response.sendStatus(401)
        }
    }
    catch (err) {
        next(err)
    }
}
