const aws = require('aws-sdk')
const s3 = new aws.S3()

exports.handler = async (event, context) => {
    console.log(event)
    const getObjectInput = {
        Bucket: event.Bucket,
        Key: event.Key
      }
      console.log(getObjectInput)
      const src = await s3.getObject(getObjectInput).promise()
      const html = src.Body?.toString().replace(
        'https://localhost/presignedUrl',
        event.PreSignUrl
      );
      console.log(html)
      const putObjectInput = {
        Bucket: event.Bucket,
        Key: event.Key,
        ContentType: 'text/html;charset=UTF-8',
        Body: html
      }
      console.log(putObjectInput)
      await s3.putObject(putObjectInput).promise()
      return '';
};
