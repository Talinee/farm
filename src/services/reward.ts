import { Reward, RewardDoc } from 'models/Reward'
import { Code, CodeDoc } from 'models/Code'
import { Account, accountDoc } from 'models/Account'
import CodeGenerator from 'node-code-generator'

const rewardService={
    async add(input): Promise<{ successful: boolean, message: String, }> {
        const { name, beginDate, expiredDate, detail, condition, point, amount }: { name: string, beginDate: Date, expiredDate: Date, detail: string, condition: string, point: number, amount: number, } = input || {}
        const reward: RewardDoc = new Reward()
        reward.name = name
        reward.beginDate = beginDate
        reward.expiredDate = expiredDate
        reward.detail = detail
        reward.condition = condition
        reward.point = point
        reward.amount = amount
        await reward.save()

        const generator = new CodeGenerator()
        const pattern = '*+#+*+#+*+#+'
        const howMany = reward.amount
        const codes = generator.generateCodes(pattern, howMany)
        const result = []
        let data
        codes.forEach(async element => {
            data = {
                code: element,
            }
            result.push(data)
            const promoCode: CodeDoc = new Code()
            promoCode.code = element
            promoCode.rewardID = reward._id
            promoCode.status = true
            promoCode.user= null
            await promoCode.save()
        })
        return { successful: true, message: 'Add reward Success' }
    },
    async getDetail(_id): Promise<{ successful: boolean, data: RewardDoc, }> {
        const detail = await Reward.findOne({ _id })

        return { successful: true, data: detail }
    },
    async getAll(): Promise<{ successful: boolean, data: RewardDoc[], }> {
        const rewards = await Reward.find()

        return { successful: true, data: rewards }
    },
    async update(data, id): Promise<{ successful: boolean, data: RewardDoc, }> {
        const rewardUpdate = await Reward.findByIdAndUpdate(id, data, { new: false })
        return { successful: true, data: rewardUpdate }
    },
    async transPoint(id, point, accessToken): Promise<{ successful: boolean, data: accountDoc, }> {
        const reward = await Reward.findById(id)
        const user = await Account.findOne({ accessToken })
        if (user.point>=reward.point) {
            const trans = await Account.findOneAndUpdate({ accessToken }, { point: user.point-reward.point }, { new: false })
            return { successful: true, data: user }
        }
        else {
            return { successful: false, data: user }
        }
    },
    async statusPoint(code, accessToken): Promise<{ successful: boolean, message: String, }> {
        const codes = await Code.findOneAndUpdate({ code }, { status: false }, { new: false })
        return { successful: true, message: 'ใช้ถูกโค้ดแล้ว' }
    },
    async delete(_id): Promise<{ successful: boolean, message: String, }> {
        const reward = await Reward.findByIdAndDelete({ _id })
        return { successful: true, message: 'Success' }
    },
}
export default rewardService
