import { Response, NextFunction, Router, Request, response } from 'express'
import checkAuth, { RequestCheckAuth } from 'api/rest/middlewares/checkAuth'
import accountService from 'services/account'
import UniversalError from 'errors/UniversalError'

const router: Router = Router()

router.post('/register', async(request, response: Response, next: NextFunction) => {
    try {
        const errors = new UniversalError()
        const { body } = request

        const account = await accountService.add(request.body)
        response.json(account)

    }
    catch (errors) {
        next(errors)
    }
})

router.post('/editAccount', checkAuth, async(request: RequestCheckAuth, response: Response, next: NextFunction) => {
    try {
        const errors = new UniversalError()
        const { body } = request
        const accessToken = request.accessToken

        if (errors.amount > 0) {
            throw errors
        }
        const editAccount = await accountService.update(body, accessToken)
        response.json(editAccount)
    }
    catch (errors) {
        next(errors)
    }
})
router.get('/GetAccount', checkAuth, async(request: RequestCheckAuth, response: Response, next: NextFunction)=> {
    try {
        const account = await accountService.get(request.accessToken)
        response.json(account)
    }
    catch (errors) {
        next(errors)
    }
})
export default router
