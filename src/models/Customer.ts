import { createSchema, ExtractDoc, Type } from 'ts-mongoose'
import createModel from './createModel'


const schema = createSchema(
    {
        name: Type.string({ require: true }),
        lastName: Type.string({ require: true }),
        lineID: Type.string({ require: true }),
        birthDay: Type.string({ require: true }),
        id: Type.string({ require: true }),
        address: Type.string({ require: true }),
        paymentType: Type.string({ require: true }),
        paymentAddress: Type.string({ require: true }),
        username: Type.string({ require: true }),
        passwordHash: Type.string({ require: true }),
    },
)

export const { model: Customer } = createModel('Customer', schema, { enableHardDelete: false })
export type customerDoc = ExtractDoc<typeof schema>
