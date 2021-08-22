import { Response, Router, Request, NextFunction } from 'express'
import auth from 'services/auth'
import checkAuth, { RequestCheckAuth } from 'api/rest/middlewares/checkAuth'
import UniversalError from 'errors/UniversalError'

const router: Router = Router()

router.post('/login', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const errors = new UniversalError()
        const input = request.body
        if (!input.password) {
            errors.addError('empty/id', 'id is empty')
        }
        if (errors.amount > 0) {
            throw errors
        }
        const result = await auth.genTokenLogin(request)
        response.json(result)
    }
    catch (error) {
        next(error)
    }
})

router.post('/logout', checkAuth, async (request: RequestCheckAuth, response: Response, next: NextFunction) => {
    try {
        const result = await auth.revokeToken(request.headers.authorization)
        response.json(result)
    }
    catch (error) {
        next(error)
    }
})

router.post('/refreshToken', checkAuth, async(request: RequestCheckAuth, response: Response, next: NextFunction) => {
    try {
        const result = await auth.genAccessTokenfromRefreshToken(request.body.refreshToken)
        response.json(result.accessToken)
    }
    catch (error) {
        next(error)
    }
})
export default router
