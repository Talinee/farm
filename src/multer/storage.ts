import multer from 'multer' //add multer to manage multipart form
import multerS3 from 'multer-s3'
import AWS from 'aws-sdk'
import mkdirp from 'mkdirp'
import getVideoDurationInSeconds from 'get-video-duration'
// import fs from 'fs'
import config from 'config'
import { Router, Request as ExpressRequest, Response as ExpressResponse, NextFunction } from 'express'

const spacesEndpoint = new AWS.Endpoint(config.dospaces.endpoint)
const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: config.dospaces.key,
    secretAccessKey: config.dospaces.secret,
    region: 'sgp1',
})

// Change bucket property to your Space name
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: config.dospaces.bucket, //'your-space-here'
        // acl: 'public-read',
        key: function (request, file, cb) {
            console.log(file)
            cb(null, file.originalname)
        },
    }),
})

export default upload
