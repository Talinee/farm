import forgotPassword from 'services/templates/forgotPassword'
import { Email } from 'models/Email'
import mail from 'mail'
import config from 'config'

const thisService = {

    async sendEmail (input): Promise<boolean> {

        const {
            userId,
            email,
            token,
        }: {
        userId: string
        email: string
        token: string
    } = input || {}

        const expiresIn = config.email.expires.token

        const emailTokenExpiresAt = new Date()
        emailTokenExpiresAt.setSeconds(emailTokenExpiresAt.getSeconds() + expiresIn)

        const logoPath = 'https://avacer.avalue.co.th/_nuxt/img/logo.3b8fcef.png'
        const urlNewPassword = `https://avacer.avalue.co.th/admin/newPassword?token=${token}`
        const html = forgotPassword(logoPath, email, urlNewPassword)
        const subject = 'ลืมรหัสผ่าน'

        await mail.sendMail({
            from: config.smtp.email,
            to: email,
            subject,
            html,
        })


        const emailInDB = new Email()
        emailInDB.userId = userId
        emailInDB.email = email
        emailInDB.title = 'ลืมรหัสผ่าน'
        emailInDB.message = 'เปลี่ยนรหัสผ่าน'
        emailInDB.token = token
        emailInDB.tokenExpiresAt = emailTokenExpiresAt
        emailInDB.isUsed = false
        await emailInDB.save()

        return true
    },
}

export default thisService
