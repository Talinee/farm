import { Account, accountDoc } from 'models/Account'


const accountService = {
    async add(input): Promise<{ successful: boolean, message: String, }> {
        const { email, password }: { email: string, password: string, point: number, } = input || {}

        const account: accountDoc = new Account()
        account.email = email
        account.password = password
        account.point= 0
        await account.save()
        return { successful: true, message: 'Register Success' }
    },
    async checkEmail (input) {
        const checkEmail = await Account.findOne({ email: input })
        if (checkEmail) {
            return false
        }
        return true
    },
    async update(data, accessToken): Promise<{ successful: boolean, data: accountDoc, }> {
        const accountUpdate = await Account.findOneAndUpdate({ accessToken }, data, { new: false })
        return { successful: true, data: accountUpdate }
    },
    async get(accessToken: string): Promise<{ successful: boolean, data: accountDoc, }> {
        const account = await Account.findOne({ accessToken }).exec()

        return { successful: true, data: account }
    },
}
export default accountService
