import { Response, NextFunction, Router, Request, response } from 'express'
import checkAuth, { RequestCheckAuth } from 'api/rest/middlewares/checkAuth'
import orderService from 'services/order'
import UniversalError from 'errors/UniversalError'

const router: Router = Router()

router.post('/addReward', async(request: RequestCheckAuth, response: Response, next: NextFunction) => {

    try {
        const errors = new UniversalError()
        const accessToken = request.accessToken
        const { body } = request
        const { query } = request

        const reward = await orderService.addOrder(query, request.body, accessToken)
        response.json(reward)

    }
    catch (errors) {
        next(errors)
    }

})
router.get('/getDetail/:id', async(request: RequestCheckAuth, response: Response, next: NextFunction) => {
    try {
        const detail = await orderService.get(request.params.id, request.get('host'))
        response.json(detail)
    }
    catch (err) {
        next(err)
    }
})
router.get('/gerOrder', async(request: RequestCheckAuth, response: Response, next: NextFunction) => {
    try {
        const { query } = request
        const accessToken = request.accessToken
        const reward = await orderService.getDetail(accessToken, query)
        response.json(reward)
    }
    catch (err) {
        next(err)
    }
})
router.post('/editOrder/:id', async(request, response: Response, next: NextFunction) => {
    try {
        const errors = new UniversalError()
        const { body } = request

        if (errors.amount > 0) {
            throw errors
        }
        const editReward = await orderService.update(body, request.params.id)
        response.json(editReward)
    }
    catch (errors) {
        next(errors)
    }
})
export default router
