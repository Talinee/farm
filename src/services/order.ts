import { AuthToken } from 'models/AuthToken'
import { Email } from 'models/Email'
import { Customer, customerDoc } from 'models/Customer'
import { CustomerAuth } from 'models/CustomerAuth'
import { gradenDoc } from 'models/Graden'
import { Product,productDoc } from 'models/Product'
import { Account } from 'models/Account'
import { Order, orderDoc, statusTYPE } from 'models/Order'
import imageService from './image'
import UniversalError from 'errors/UniversalError'


const orderService = {
    async addOrder(id,input,accessToken): Promise<{ successful: boolean, message: orderDoc, }> {
        const { amount }: { amount: number, } = input || {}
        const customer = await Customer.findOne({ accessToken }).exec()
        const product = await Product.findById(id)
        const order: orderDoc = new Order()
        order.order = product.name
        order.orderby = customer.username
        order.amount = amount
        order.unit = product.unit
        order.price = product.price
        order.address= customer.address
        await order.save()
        return { successful: true, message: order }
    },
    async get(accessToken, host): Promise<{ successful: boolean, data, }> {
        const userAccount = await AuthToken.findOne({ accessToken }).exec()

        const account = await Account.findOne({ _id: userAccount.userID }).exec()

        let shop = await Order.findOne({ _id: account._id[0] }).exec()

        const imageData = await imageService.getImage(Order.profileImg)
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
    async getDetail(accessToken, host): Promise<{successful: boolean, products, }> {

        const userAccount = await AuthToken.findOne({ accessToken }).exec()
        const shop = await Account.findOne({ owner: userAccount.userID }).exec()
        const orderDB = Product.find({ owner: shop._id })
        const productLists = await orderDB.exec()
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
    async update(data, accessToken): Promise<{successful: boolean, data: orderDoc, }> {
        const userAccount = await AuthToken.findOne({ accessToken }).exec()
        const account = await Account.findOne({ _id: userAccount.userID }).exec()
        const shopUpdate = await Order.findOneAndUpdate({
            _id: account._id[0],
        },
        data, { new: true },
        )
        return { successful: true, data: shopUpdate }
    },
}
export default orderService
