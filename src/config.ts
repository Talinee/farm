/* eslint-disable @typescript-eslint/camelcase */
import merge from 'lodash.merge'
import fs from 'fs'

const environment = process.env.API_ENV || 'local'

const config = {
    environment,
    name: 'farm',
    api: {
        port: 80,
    },
    database: {
        username: '',
        password: '',
        host: 'mongodb.sme-connext',
        port: 27017,
        database: 'farm',
        collectionPrefix: 'farm',
    },
    auth: {
        expires: {
            accessToken: 100 * 10 * 15,
            refreshToken: 100 * 50 * 10,
        },
    },
    session: {
        expires: {
            sessionToken: 60,
        },
        key: {
            private: '0914a56d0f89c978b949202f1bcc9bc677ce7e0beb11a556c0d49e5eae4baaeb',
            public: 'ah',
        },
        jwt: {
            issuer: 'farm',
        },

    },

}

const runtimeConfig = {
    name: process.env['NAME'],
    api: {
        port: process.env['API_GRAPHQL_PORT'],
    },
    auth: {
        expires: {
            accessToken: process.env['AUTH_EXPIRES_ACCESS_TOKEN'],
            refreshToken: process.env['AUTH_EXPIRES_REFRESH_TOKEN'],
        },
        key: {
            private: process.env['AUTH_KEY_PRIVATE'],
            public: process.env['AUTH_KEY_PUBLIC'],
        },
        jwt: {
            issuer: process.env['AUTH_JWT_ISSUER'],
            algorithm: process.env['AUTH_JWT_ALGORITHM'],
        },
    },
    database: {
        username: process.env['DATABASE_USERNAME'],
        password: process.env['DATABASE_PASSWORD'],
        host: process.env['DATABASE_HOST'],
        port: process.env['DATABASE_PORT'],
        database: process.env['DATABASE_NAME'],
        collectionPrefix: process.env['DATABASE_PREFIX'],
    },
}

const environmentConfig = {
    local: {
        api: {
            port: 4000,
        },
        database: {
            // username: 'mongdUser',
            // password: 'XcV0trcvtS',
            // host: '159.65.134.212',
            host: 'localhost',
        },
    },
    development: {
    },
    production: {
    },
}


const mergeConfig = (baseConfig, replaceConfig): void => {
    Object.keys(baseConfig).map(key => {
        if (replaceConfig[key] !== undefined) {
            if (baseConfig[key] instanceof Object) {
                baseConfig[key] = merge(baseConfig[key], replaceConfig[key])
            }
            else {
                baseConfig[key] = replaceConfig[key]
            }
        }
    })
}

mergeConfig(config, environmentConfig[environment])
mergeConfig(config, runtimeConfig)

export default config
