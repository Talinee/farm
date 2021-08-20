import { createSchema, ExtractDoc, Type } from 'ts-mongoose'
import createModel from './createModel'

const schema = createSchema(
    {
        referenceId: Type.string({ require: true }),
        name: Type.string({ require: true }),
        imgPath: Type.string({ require: true }),
        mimetype: Type.string({ require: true }),
    },
    {
        timestamps: true,
    },
)

export const { model: Image } = createModel('Image', schema, { enableHardDelete: false })
export type imageDoc = ExtractDoc<typeof schema>

