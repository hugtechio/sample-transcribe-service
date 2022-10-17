const aws = require('aws-sdk')
const s3 = new aws.S3({signatureVersion: 'v4'})

exports.handler = async (event, context) => {
    const Url = s3.getSignedUrl('getObject', {
        Bucket: event.Bucket,
        Key: event.Key,
    });
    const Hash = event.Key.split('/')[0]
    return { Url, Hash };
};
