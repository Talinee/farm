import { Response, NextFunction, Router, Request, response } from 'express'
import checkAuth, { RequestCheckAuth } from 'api/rest/middlewares/checkAuth'
import customerService from 'services/customer'
import orderService from 'services/order'
import UniversalError from 'errors/UniversalError'

const router: Router = Router()

router.post('/registerCustomer', async(request, response: Response, next: NextFunction) => {
    try {
        const errors = new UniversalError()
        const { body } = request

        const account = await customerService.add(request.body)
        response.json(account)

    }
    catch (errors) {
        next(errors)
    }
})

router.post('/editAccountCustomer', checkAuth, async(request: RequestCheckAuth, response: Response, next: NextFunction) => {
    try {
        const errors = new UniversalError()
        const { body } = request
        const accessToken = request.accessToken

        if (errors.amount > 0) {
            throw errors
        }
        const editAccount = await customerService.update(body, accessToken)
        response.json(editAccount)
    }
    catch (errors) {
        next(errors)
    }
})
router.get('/GetAccountCustomer', checkAuth, async(request: RequestCheckAuth, response: Response, next: NextFunction)=> {
    try {
        const account = await customerService.get(request.accessToken)
        response.json(account)
    }
    catch (errors) {
        next(errors)
    }
})
router.post('/order/:id', async(request: RequestCheckAuth, response: Response, next: NextFunction) => {
    try {
        const errors = new UniversalError()
        const { body } = request

        const account = await orderService.addOrder(request.params, request.body, request.accessToken)
        response.json(account)

    }
    catch (errors) {
        next(errors)
    }
})
export default router
