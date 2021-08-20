import { Knowledge, KnowledgeDoc } from 'models/Knowledge'


const knowledgeService={
    async add(input): Promise<{ successful: boolean, message: String, }> {
        const { title, detail, category }: { title: string, detail: string, category: string, } = input || {}
        const knowledge: KnowledgeDoc = new Knowledge()
        knowledge.title = title
        knowledge.detail = detail
        knowledge.category = category
        await knowledge.save()
        return { successful: true, message: 'Add Knowledge Success' }
    },
    async update(data, id): Promise<{ successful: boolean, data: KnowledgeDoc, }> {
        const knowledgeUpdate = await Knowledge.findOneAndUpdate(id, data, { new: false })
        return { successful: true, data: knowledgeUpdate }
    },
    async getKnowledge(_id): Promise<{ successful: boolean, data: KnowledgeDoc, }> {
        const detail = await Knowledge.findOne({ _id })

        return { successful: true, data: detail }
    },
    async getAll(): Promise<{ successful: boolean, data: KnowledgeDoc[], }> {
        const newses = await Knowledge.find()

        return { successful: true, data: newses }
    },
    async delete(_id): Promise<{ successful: boolean, message: String, }> {
        const knowledge = await Knowledge.findByIdAndDelete({ _id })
        return { successful: true, message: 'Success' }
    },
}
export default knowledgeService
