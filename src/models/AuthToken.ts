import { createSchema, ExtractDoc, Type } from 'ts-mongoose'
import createModel from './createModel'

const schema = createSchema(
    {
        userID: Type.string({ require: true }),
        username: Type.string({ require: true }),
        accessToken: Type.string({ require: false }),
        expiredAccessToken: Type.date({ require: false }),
        refreshToken: Type.string({ require: false }),
        expiredRefreshToken: Type.date({ require: false }),
    },
    {
        timestamps: true,
    },
)

export const { model: AuthToken } = createModel('AuthToken', schema, { enableHardDelete: false })
export type AuthTokenDoc = ExtractDoc<typeof schema>

