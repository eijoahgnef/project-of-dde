import oss from "ali-oss"
import config from './ossConfig'

export const client: any = new oss({
    accessKeyId: config.ossBase.accessKeyId,
    accessKeySecret: config.ossBase.accessKeySecret,
    region: config.ossBase.region,
    bucket: config.ossBase.bucket
})