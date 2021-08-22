import { Product, productDoc } from 'models/Product'
import { AuthToken } from 'models/AuthToken'
import { Account } from 'models/Account'
import imageService from './image'

const productService = {
    async add(input,accessToken): Promise<{ successful: boolean, message: productDoc, }> {
        const userAccount = await AuthToken.findOne({ accessToken }).exec()
        const product: productDoc = new Product()
        product.name = input.name
        product.amount = input.name
        product.profileImg = input.profileImg
        product.date = input.date
        product.unit = input.unit
        product.price = input.price
        product.detail = input.detail
        product.weight = input.weight
        product.owner = userAccount.userID
        await product.save()
        return { successful: true, message: product }
    },
    async getProductDetail(accessToken, host): Promise<{ successful: boolean, data, }> {
        const userAccount = await AuthToken.findOne({ accessToken }).exec()

        const account = await Account.findOne({ _id: userAccount.userID }).exec()

        let shop = await Product.findOne({ _id: account._id[0] }).exec()

        const imageData = await imageService.getImage(shop.profileImg)
        // console.log(imageData)

        const image = {
            id: imageData.data.id,
            name: imageData.data.name,
            fullPath: 'https' + '://' + host + '/api/getImage/' + imageData.data.name,
        }
        shop = {
            ...shop['_doc'],
            img: image ? image: "",
        }
        return { successful: true, data: shop }
    },
    async getProduct(accessToken, host): Promise<{successful: boolean, products, }> {

        const userAccount = await AuthToken.findOne({ accessToken }).exec()
        const shop = await Product.findOne({ ownerID: userAccount.userID }).exec()
        const productsDB = Product.find({ owner: shop.owner })
        const productLists = await productsDB.exec()
        const products = await Promise.all(productLists.map(async item => {
            const imageData = await imageService.getImage(item.profileImg)

            const image = {
                id: imageData.data.id,
                name: imageData.data.name,
                fullPath: 'https' + '://' + host + '/api/getImage/' + imageData.data.name,
            }

            return {
                ...item['_doc'],
                img: image ? image: "",
            }
        }))
        return {
            successful: true,
            products,
        }
    },

    async update(data, accessToken): Promise<{successful: boolean, data: productDoc, }> {
        const userAccount = await AuthToken.findOne({ accessToken }).exec()
        const account = await Account.findOne({ _id: userAccount.userID }).exec()
        const shopUpdate = await Product.findOneAndUpdate({
            _id: account._id[0],
        },
        data, { new: true },
        )
        return { successful: true, data: shopUpdate }
    },
    async delete(_id): Promise<{ successful: boolean, message: String, }> {
        await Product.findOneAndUpdate({ _id }, { deleted: true })
        return { successful: true, message: 'Delete Product Success' }
    },

}

export default productService