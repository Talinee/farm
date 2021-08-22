import { createSchema, ExtractDoc, Type } from 'ts-mongoose'
import createModel from './createModel'


const schema = createSchema(
    {
        name: Type.string({ require: true }),
        owner: Type.string({ require: true }),
        phone: Type.string({ require: true }),
        address: Type.string({ require: true }),
        detail: Type.string({ require: true }),
        location: Type.object({ require: true }),
        profileImg: Type.string({ require: false }),
    },
)

export const { model: Graden } = createModel('Graden', schema, { enableHardDelete: false })
export type gradenDoc = ExtractDoc<typeof schema>
