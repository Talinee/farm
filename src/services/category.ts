import { Category, CategoryDoc } from 'models/Category'

const categoryService={
    async add(input): Promise<{ successful: boolean, message: String, }> {
        const { title }: { title: string, } = input || {}
        const category: CategoryDoc = new Category()
        category.title = title
        await category.save()
        return { successful: true, message: 'Add Category Success' }
    },
    async update(data, id): Promise<{ successful: boolean, data: CategoryDoc, }> {
        const categoryUpdate = await Category.findOneAndUpdate(data, id, { new: false })
        return { successful: true, data: categoryUpdate }
    },
    async getOneCategory(id): Promise<{ successful: boolean, data: CategoryDoc, }> {
        const detail = await Category.findOne({ id })
        console.log(detail)
        return { successful: true, data: detail }
    },
    async getAll(): Promise<{ successful: boolean, data: CategoryDoc[], }> {
        const categorys = await Category.find()

        return { successful: true, data: categorys }
    },
    async delete(id): Promise<{ successful: boolean, message: String, }> {
        console.log(id)
        const category = await Category.findByIdAndDelete({ _id: id })
        return { successful: true, message: 'Success' }
    },
}
export default categoryService
