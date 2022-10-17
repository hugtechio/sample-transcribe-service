import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Bucket, HttpMethods } from 'aws-cdk-lib/aws-s3';
import { PolicyStatement, Effect, AnyPrincipal } from 'aws-cdk-lib/aws-iam';

export class BucketsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const uploadBucketName = new cdk.CfnParameter(this, 'UploadBucketName', {
      type: 'String',
      default: 'upload.sample-transcription-service',
      // noEcho: true,
    });

    const websiteBucketName = new cdk.CfnParameter(this, 'WebsiteBucketName', {
      type: 'String',
      default: 'website.sample-transcription-service',
      // noEcho: true,
    });

    const uploadBucket = new Bucket(this, 'uploadbucket', {
      bucketName: uploadBucketName.valueAsString,
      eventBridgeEnabled: true,
      cors: [
        {
          allowedMethods: [HttpMethods.PUT],
          allowedOrigins: ['*'],
          allowedHeaders: ['*'],
          exposedHeaders: [],
          maxAge: 3000
        }
      ]
    })
    const bucketPolicyUploadBucket = new PolicyStatement({
      sid: `${uploadBucket.bucketName}-bucket-policy`,
      effect: Effect.ALLOW,
      actions: [
        "s3:PutObject",
        "s3:GetObject",
      ],
      principals: [new AnyPrincipal()],
      resources: [uploadBucket.bucketArn + "/*"],
    });
    uploadBucket.addToResourcePolicy(bucketPolicyUploadBucket);

    const uploadWebsiteBucket = new Bucket(this, 'webuploaderbucket', {
      bucketName: websiteBucketName.valueAsString, 
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'error.html'
    })
    const bucketPolicyWebsiteBucket = new PolicyStatement({
      sid: `${uploadWebsiteBucket.bucketName}-bucket-policy`,
      effect: Effect.ALLOW,
      actions: [
        "s3:GetObject",
      ],
      principals: [new AnyPrincipal()],
      resources: [uploadWebsiteBucket.bucketArn + "/*"],
    });
    uploadWebsiteBucket.addToResourcePolicy(bucketPolicyWebsiteBucket);
  }
}
