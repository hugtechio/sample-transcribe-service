const aws = require('aws-sdk')
const s3 = new aws.S3({signatureVersion: 'v4'})

exports.lambdaHandler = async (event, context) => {
    const Url = s3.getSignedUrl('putObject', {
        Bucket: event.Bucket,
        Key: `${event.Key}/media.mp3`,
        ContentType: 'audio/mpeg',
    });
    return { Url };
};
