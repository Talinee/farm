import jwt from 'jsonwebtoken'
import { Account } from 'models/Account'
import { AuthToken } from 'models/AuthToken'
import config from 'config'
import UniversalError from 'errors/UniversalError'

const shopAuth = {
    async genTokenLogin(request): Promise<{successful: boolean, accessToken, refreshToken, }> {
        const errors = new UniversalError()
        const user = request.body
        const userData = await Account.findOne({ username: user.username })
        const accessExpired = config.auth.expires.accessToken
        const refreshExpired = config.auth.expires.refreshToken
        if (userData) {
            const accessPayload = {
                name: user.name,
                userType: 'client',
                token: 'access_token',
            }
            const refreshPayload = {
                name: user.name,
                userType: 'client',
                token: 'refresh_token',
            }
            const accessToken = jwt.sign(accessPayload, config.session.key.private, { expiresIn: accessExpired })
            const refreshToken = jwt.sign(refreshPayload, config.session.key.private, { expiresIn: refreshExpired })

            const accessExpiredAt = new Date()
            accessExpiredAt.setHours(accessExpiredAt.getHours())
            accessExpiredAt.setSeconds(accessExpiredAt.getSeconds() + accessExpired)
            const refreshExpiredAt = new Date()
            refreshExpiredAt.setHours(refreshExpiredAt.getHours())
            refreshExpiredAt.setSeconds(refreshExpiredAt.getSeconds() + refreshExpired)

            const createAuthToken = new AuthToken()
            createAuthToken.userID = userData._id
            createAuthToken.username = userData.username
            createAuthToken.accessToken = accessToken
            createAuthToken.expiredAccessToken = accessExpiredAt
            createAuthToken.refreshToken = refreshToken
            createAuthToken.expiredRefreshToken = refreshExpiredAt
            await createAuthToken.save()

            return { successful: true, accessToken, refreshToken }
        }
        else {
            errors.addError('not found/username', 'username')
            throw errors
        }

    },
    async genAccessTokenfromRefreshToken(refreshToken): Promise<{successful: boolean, accessToken: string, }> {
        const userAuthToken = await AuthToken.findOne({ refreshToken: refreshToken })
        const errors = new UniversalError()

        const userData = await Account.findOne({ username: userAuthToken.username })

        if (userAuthToken) {
            const accessExpired = config.auth.expires.accessToken
            const accessPayload = {
                name: userData.username,
                userType: 'client',
                token: 'access_token',
            }
            const accessToken = jwt.sign(accessPayload, config.session.key.private, { expiresIn: accessExpired })
            const accessExpiredAt = new Date()
            accessExpiredAt.setHours(accessExpiredAt.getHours())
            accessExpiredAt.setSeconds(accessExpiredAt.getSeconds() + accessExpired)

            await AuthToken.findOneAndUpdate({ refreshToken }, { accessToken, expiredAccessToken: accessExpiredAt })
            return { successful: true, accessToken }
        }
        else {
            errors.addError('empty/invalid', 'refresh token')
            throw errors
        }
    },
    async revokeToken(accessToken) {
        const token = accessToken.replace('Bearer ', '')
        const result = await AuthToken.findOneAndUpdate({ accessToken: token }, { deleted: true }, { new: false })
        return result
    },
}

export default shopAuth
