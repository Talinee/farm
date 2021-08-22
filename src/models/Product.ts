import { createSchema, ExtractDoc, Type } from 'ts-mongoose'
import createModel from './createModel'


const schema = createSchema(
    {
        name: Type.string({ require: true }),
        amount: Type.number({ require: true }),
        weight: Type.number({ require: true }),
        date: Type.string({ require: true }),
        unit: Type.string({ require: true }),
        price: Type.number({ require: true }),
        detail: Type.string({ require: true }),
        profileImg: Type.string({ require: false }),
        owner: Type.string({ require: false }),
    },
)

export const { model: Product } = createModel('Product', schema, { enableHardDelete: false })
export type productDoc = ExtractDoc<typeof schema>
