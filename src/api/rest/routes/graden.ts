import { Response, NextFunction, Router, Request } from 'express'
import checkAuth, { RequestCheckAuth } from 'api/rest/middlewares/checkAuth'
import gradenService from 'services/graden'
import UniversalError from 'errors/UniversalError'
import upload from 'multer/storage'
import imageService from 'services/image'


const router: Router = Router()

router.post('/graden/:userID', checkAuth, async(request: RequestCheckAuth, response: Response, next: NextFunction) => {
    try {
        const accessToken = request.accessToken
        const errors = new UniversalError()

        const input = request.body
        console.log(input)

        const product = await gradenService.add(input, accessToken)
        response.json(product)
    }
    catch (errors) {
        next(errors)
    }
})
router.post('/updateGraden/:id', checkAuth, async(request: RequestCheckAuth, response: Response, next: NextFunction) => {
    try {
        const errors = new UniversalError()
        const input = request.body
        const id = request.params.id
        if (!input) {
            errors.addError('empty/data', 'data is empty')
        }
        if (errors.amount > 0) {
            throw errors
        }

        const product = await gradenService.update(input, id)
        response.json(product)
    }
    catch (errors) {
        next(errors)
    }
})
router.get('/getGraden', checkAuth, async(request: RequestCheckAuth, response: Response, next: NextFunction) => {
    try {
        const { query } = request
        const accessToken = request.accessToken

        const products = await gradenService.getAll(accessToken,request.get('host'))
        response.json(products)
    }
    catch (error) {
        next(error)
    }
})

router.get('/getGraden/:id', async(request: RequestCheckAuth, response: Response, next: NextFunction) => {
    try {
        const product = await gradenService.get(request.params.id, request.get('host'))
        response.json(product)
    }
    catch (error) {
        next(error)
    }
})

export default router
