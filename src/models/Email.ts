import { createSchema, Type, ExtractDoc, ExtractProps } from 'ts-mongoose'
import createModel from './createModel'

export enum SendEmailType {
    VERIFY_ACCOUNT = 'VERIFY_ACCOUNT',
    FORGOT_PASSWORD = 'FORGOT_PASSWORD',
    BRIEFCASE = 'BRIEFCASE'
}

const schema = createSchema(
    {
        userId: Type.string({ require: true }),
        email: Type.string({ require: true }),
        title: Type.string({ require: true }),
        message: Type.string({ require: true }),
        token: Type.string({ require: false }),
        tokenExpiresAt: Type.date({ require: false }),
        isUsed: Type.boolean({ default: false }),
    },
    {
        timestamps: true,
    },
)

export const { model: Email } = createModel('Email', schema, { enableHardDelete: false })
export const EmailSchema = schema
export type EmailDoc = ExtractDoc<typeof schema>
export type EmailProps = ExtractProps<typeof schema>
