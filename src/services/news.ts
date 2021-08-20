import { News, NewsDoc } from 'models/News'
import { Account, accountDoc } from 'models/Account'

const newsService={
    async add(input): Promise<{ successful: boolean, message: String, }> {
        const { title, detail, category, point }: { title: string, detail: string, category: string, point: number, } = input || {}
        const news: NewsDoc = new News()
        news.title = title
        news.detail = detail
        news.category = category
        news.point= point
        await news.save()
        return { successful: true, message: 'Add news Success' }
    },
    async update(data, id): Promise<{ successful: boolean, data: NewsDoc, }> {
        const newsUpdate = await News.findOneAndUpdate(id, data, { new: false })
        return { successful: true, data: newsUpdate }
    },
    async getNews(_id): Promise<{ successful: boolean, data: NewsDoc, }> {
        const detail = await News.findOne({ _id })

        return { successful: true, data: detail }
    },
    async getAll(): Promise<{ successful: boolean, data: NewsDoc[], }> {
        const newses = await News.find()

        return { successful: true, data: newses }
    },
    async delete(_id): Promise<{ successful: boolean, message: String, }> {
        const news = await News.findByIdAndDelete({ _id })
        return { successful: true, message: 'Success' }
    },
    async addPoint(id, point, accessToken): Promise<{ successful: boolean, data: accountDoc, }> {
        const news = await News.findById(id)
        const user = await Account.findOne({ accessToken })
        const addpoint = await Account.findOneAndUpdate({ accessToken }, { point: user.point+news.point }, { new: false })
        return { successful: true, data: addpoint }
    },
}
export default newsService
