import { createSchema, ExtractDoc, Type } from 'ts-mongoose'
import createModel from './createModel'

export enum statusTYPE {
    APPROVE = 'APPROVE',
    PAYMENTED = 'PAYMENTED',
    SENDING = 'SENDING',
    COMPLEATE = 'COMPLEATE',
}
const schema = createSchema(
    {
        order: Type.string({ require: true }),
        amount: Type.number({ require: true }),
        unit: Type.string({ require: true }),
        price: Type.number({ require: true }),
        orderby: Type.string({ require: true }),
        address: Type.string({ require: true }),
        status: Type.string({ require: true, enum: Object.values(statusTYPE) }),
    },
    {
        timestamps: true,
    },
)

export const { model: Order } = createModel('Order', schema, { enableHardDelete: false })
export type orderDoc = ExtractDoc<typeof schema>
