import { Response, NextFunction, Router, Request, response } from 'express'
import checkAuth, { RequestCheckAuth } from 'api/rest/middlewares/checkAuth'
import accountService from 'services/account'
import UniversalError from 'errors/UniversalError'

const router: Router = Router()

router.post('/register', async(request, response: Response, next: NextFunction) => {
    try {
        const errors = new UniversalError()
        const { body } = request


        if (!body.email) {
            errors.addError('empty/email', ' email is empty')
        }
        else if (body.email && !await accountService.checkEmail(body.email)) {
            errors.addError('condition/email', 'The email was duplicated.')
        }
        if (!body.password) {
            errors.addError('empty/password', 'password is empty')
        }

        if (errors.amount > 0) {
            throw errors
        }


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

        if (!body.email) {
            errors.addError('empty/email', ' email is empty')
        }
        if (!body.phoneNumber) {
            errors.addError('empty/phoneNumber', 'Phone number is empty')
        }

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
