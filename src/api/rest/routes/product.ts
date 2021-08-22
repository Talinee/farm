import { Response, NextFunction, Router, Request } from 'express'
import checkAuth, { RequestCheckAuth } from 'api/rest/middlewares/checkAuth'
import productService from 'services/product'
import UniversalError from 'errors/UniversalError'
import upload from 'multer/storage'
import imageService from 'services/image'


const router: Router = Router()

router.post('/product/:userID', checkAuth, async(request: RequestCheckAuth, response: Response, next: NextFunction) => {
    try {
        const accessToken = request.accessToken
        const errors = new UniversalError()

        const input = request.body
        console.log(input)

        if (!input.name) {
            errors.addError('empty/name', 'name is empty')
        }
        if (!input.amount) {
            errors.addError('empty/amount', 'amount is empty')
        }
        if (!input.weight) {
            errors.addError('empty/weight', 'weight is empty')
        }
        if (!input.date) {
            errors.addError('empty/date', 'date is empty')
        }
        if (!input.unit) {
            errors.addError('empty/unit', 'unit is empty')
        }
        if (!input.price) {
            errors.addError('empty/price', 'price is empty')
        }
        if (!input.detail) {
            errors.addError('empty/description', 'description is empty')
        }
        if (!input.profileImg) {
            errors.addError('empty/profileImg', 'profileImg is empty')
        }
        if (errors.amount > 0) {
            throw errors
        }

        const product = await productService.add(input, accessToken)
        response.json(product)
    }
    catch (errors) {
        next(errors)
    }
})
router.post('/updateProduct/:id', checkAuth, async(request: RequestCheckAuth, response: Response, next: NextFunction) => {
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

        const product = await productService.update(input, id)
        response.json(product)
    }
    catch (errors) {
        next(errors)
    }
})
router.get('/getProducts', checkAuth, async(request: RequestCheckAuth, response: Response, next: NextFunction) => {
    try {
        const { query } = request
        const accessToken = request.accessToken

        const products = await productService.getProduct(accessToken, query)
        response.json(products)
    }
    catch (error) {
        next(error)
    }
})

router.get('/getProduct/:id', async(request: RequestCheckAuth, response: Response, next: NextFunction) => {
    try {
        const product = await productService.getProductDetail(request.params.id, request.get('host'))
        response.json(product)
    }
    catch (error) {
        next(error)
    }
})

router.post('/deleteProduct/:id', checkAuth, async(request, response: Response, next: NextFunction) => {
    try {
        const product = await productService.delete(request.params.id)
        response.json(product)
    }
    catch (errors) {
        next(errors)
    }
})

export default router