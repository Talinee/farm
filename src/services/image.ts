import { Image, imageDoc } from 'models/Image'
import { AuthToken } from 'models/AuthToken'
import { Account } from 'models/Account'

const imageService = {
    async uploadImage(imageData, accessToken: string) {
        const user = await AuthToken.findOne({ accessToken })
        const checkReference = await Account.findOne({ _id: user.userID })
        const image: imageDoc = new Image()
        image.referenceId = checkReference._id
        image.name = imageData.filename
        image.imgPath = imageData.path
        // image.type = type
        image.mimetype = imageData.mimetype
        await image.save()
        return { successful: true, data: image }
    },
    async getImage(id): Promise<{ successful: boolean, data: imageDoc, }> {
        const image = await Image.findOne({ _id: id })
        console.log(image)

        return { successful: true, data: image }
    },
}
export default imageService
