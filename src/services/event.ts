import { Event, EventDoc } from 'models/Event'
import { Account, accountDoc } from 'models/Account'

const eventService={
    async add(input): Promise<{ successful: boolean, message: String, }> {
        const { title, organizer, location, beginDate, expiredDate, detail, condition, point, aliveableAmount, amount, SubAmount }: { title: string, organizer: string, location: string, beginDate: Date, expiredDate: Date, detail: string, condition: string, point: number, aliveableAmount: number, amount: number, SubAmount: number, } = input || {}
        const event: EventDoc = new Event()
        event.title = title
        event.detail = detail
        event.organizer = organizer
        event.location = location
        event.beginDate = beginDate
        event.expiredDate = expiredDate
        event.condition = condition
        event.point= point
        event.aliveableAmount= aliveableAmount
        event.amount= amount
        event.SubAmount = SubAmount
        await event.save()
        return { successful: true, message: 'Add Event Success' }
    },
    async update(data, id): Promise<{ successful: boolean, data: EventDoc, }> {
        const eventUpdate = await Event.findOneAndUpdate(id, data, { new: false })
        return { successful: true, data: eventUpdate }
    },
    async getEvent(_id): Promise<{ successful: boolean, data: EventDoc, }> {
        const detail = await Event.findOne({ _id })

        return { successful: true, data: detail }
    },
    async getAll(): Promise<{ successful: boolean, data: EventDoc[], }> {
        const eventes = await Event.find()

        return { successful: true, data: eventes }
    },
    async delete(id): Promise<{ successful: boolean, message: String, }> {
        const event = await Event.findByIdAndDelete({ id })
        return { successful: true, message: 'Success' }
    },
    async addPoint(id, point, accessToken): Promise<{ successful: boolean, data: accountDoc, }> {
        const event = await Event.findById(id)
        const user = await Account.findOne({ accessToken })
        const seat = await Event.findByIdAndUpdate(id, { aliveableAmount: event.aliveableAmount-1 })
        const addpoint = await Account.findOneAndUpdate({ accessToken }, { point: user.point+event.point }, { new: false })
        return { successful: true, data: addpoint }
    },
    async unjoinEvent(id, point, accessToken): Promise<{ successful: boolean, data: accountDoc, }> {
        const event = await Event.findById(id)
        const user = await Account.findOne({ accessToken })
        const seat = await Event.findByIdAndUpdate(id, { aliveableAmount: event.aliveableAmount+1 })
        const addpoint = await Account.findOneAndUpdate({ accessToken }, { point: user.point-event.point }, { new: false })
        return { successful: true, data: addpoint }
    },
}
export default eventService
