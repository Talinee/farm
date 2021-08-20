import { MyEvent, MyEventDoc } from 'models/MyEvent'

const myEventService={
    async addMyevent(input): Promise<{ successful: boolean, message: String, }> {
        const { title, organizer, location, beginDate, expiredDate, detail, status }: { title: string, organizer: string, location: string, beginDate: Date, expiredDate: Date, detail: string, status: boolean, } = input || {}
        const myEvent: MyEventDoc = new MyEvent()
        myEvent.title = title
        myEvent.detail = detail
        myEvent.organizer = organizer
        myEvent.location = location
        myEvent.beginDate = beginDate
        myEvent.expiredDate = expiredDate
        myEvent.status = status
        await myEvent.save()
        return { successful: true, message: 'Add Event Success' }
    },
    // async sortEvent(status): Promise<{ successful: boolean, data: MyEventDoc, }> {
    //     const detail = await Event.findOne(status)

    //     return { successful: true, data: detail }
    // },
}
export default myEventService
