import { Graden, gradenDoc } from 'models/Graden'
import { AuthToken } from 'models/AuthToken'
import { Account } from 'models/Account'
import imageService from './image'

const productService = {
    async add(input,accessToken): Promise<{ successful: boolean, message: gradenDoc, }> {
        const owner = await Account.findOne({ accessToken }).exec()
        const graden: gradenDoc = new Graden()
        graden.name = input.name
        graden.owner = owner.name
        graden.phone = input.phone
        graden.profileImg = input.profileImg
        graden.address = owner.address
        graden.location = input.location
        await graden.save()
        return { successful: true, message: graden }
    },
    async get(accessToken, host): Promise<{ successful: boolean, data, }> {
        const userAccount = await AuthToken.findOne({ accessToken }).exec()

        const account = await Account.findOne({ _id: userAccount.userID }).exec()

        let shop = await Graden.findOne({ _id: account._id[0] }).exec()

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
    async getAll(accessToken, host): Promise<{ successful: boolean, data, }>  {
        const userAccount = await AuthToken.findOne({ accessToken }).exec()

        const account = await Account.findOne({ _id: userAccount.userID }).exec()

        let shop = await Graden.findOne({ _id: account._id[0] }).exec()

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

    async update(data, accessToken): Promise<{successful: boolean, data: gradenDoc, }> {
        const userAccount = await AuthToken.findOne({ accessToken }).exec()
        const account = await Account.findOne({ _id: userAccount.userID }).exec()
        const shopUpdate = await Graden.findOneAndUpdate({
            _id: account._id[0],
        },
        data, { new: true },
        )
        return { successful: true, data: shopUpdate }
    },
}

export default productService