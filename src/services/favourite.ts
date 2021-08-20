import { Favourite, FavouriteDoc } from 'models/Favourite'


const favouriteService={
    async add(input): Promise<{ successful: boolean, message: String, }> {
        const { user, objectID, type }: { user: string, objectID: string, type: string, } = input || {}
        const favourite: FavouriteDoc = new Favourite()
        favourite.user = user
        favourite.objectID = objectID
        favourite.type = type
        await favourite.save()
        return { successful: true, message: 'Add favourite Success' }
    },
    async getFavourite(accessToken): Promise<{ successful: boolean, data: FavouriteDoc, }> {
        const detail = await Favourite.findOne({ accessToken })

        return { successful: true, data: detail }
    },
    async getAll(): Promise<{ successful: boolean, data: FavouriteDoc[], }> {
        const newses = await Favourite.find()

        return { successful: true, data: newses }
    },
    async delete(id): Promise<{ successful: boolean, message: String, }> {
        const favourite = await Favourite.findByIdAndDelete({ id })
        return { successful: true, message: 'Success' }
    },
}
export default favouriteService
