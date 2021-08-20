import { createSchema, ExtractDoc, Type } from 'ts-mongoose'
import createModel from './createModel'


const schema = createSchema(
    {
        email: Type.string({ require: true }),
        password: Type.string({ require: true }),
        point: Type.number({ require: true }),
    },
)

export const { model: Account } = createModel('Account', schema, { enableHardDelete: false })
export type accountDoc = ExtractDoc<typeof schema>
