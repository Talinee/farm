import { Customer, customerDoc } from 'models/Customer'
import { CustomerAuth } from 'models/CustomerAuth'
// import emailService from 'services/email'
import argon2 from 'argon2'
import UniversalError from 'errors/UniversalError'
import { generatePasswordHash,verifyPasswordHash } from 'helpers/passwordHash'


const customerService = {
    async add(input): Promise<{ successful: boolean, message: String, }> {
        const { username, name, lastName, birthDay, id, address, paymentType, paymentAddress }: { username: string, name: string, lastName: string, birthDay: string, id: string, address: string, paymentType: string, paymentAddress: string, } = input || {}
        const passwordHash = await generatePasswordHash(input.password)
        const account: customerDoc = new Customer()
        account.username = username
        account.passwordHash = passwordHash
        account.name = name
        account.lastName = lastName
        account.birthDay = birthDay
        account.id = id
        account.address = address
        account.paymentType = paymentType
        account.paymentAddress = paymentAddress
        await account.save()
        return { successful: true, message: 'Register Success' }
    },
    async checkUsername (input) {
        const checkUsername = await Customer.findOne({ email: input })
        if (checkUsername) {
            return false
        }
        return true
    },
    async update(data, accessToken): Promise<{ successful: boolean, data: customerDoc, }> {
        const accountUpdate = await Customer.findOneAndUpdate({ accessToken }, data, { new: true })
        return { successful: true, data: accountUpdate }
    },
    async get(accessToken: string): Promise<{ successful: boolean, data: customerDoc, }> {
        const account = await Customer.findOne({ accessToken }).exec()

        return { successful: true, data: account }
    },

    async changePassword(lastPassword, newPassword, accessToken) {
        const userAccount = await CustomerAuth.findOne({ accessToken }).exec()

        const user = await Customer.findOne({ _id: userAccount.userID })
        const errors = new UniversalError()
        if (user) {
            const verifyPassword = await verifyPasswordHash(user.passwordHash, lastPassword)

            if (verifyPassword) {
                const passwordUpdate = await generatePasswordHash(newPassword)
                await Customer.findOneAndUpdate({ _id: userAccount.userID }, { passwordHash: passwordUpdate })
                return { successful: true }
            }
            else {
                errors.addError('not match/last password', 'last password is incorrect ')
                throw errors
            }
        }
        else {
            errors.addError('not found/user', 'this user is not found')
            throw errors
        }
    },
}
export default customerService
