import * as cdk from 'aws-cdk-lib';
import { AttributeType } from 'aws-cdk-lib/aws-dynamodb';
import { table } from 'console';
import { Construct } from 'constructs';

export class DbStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const tableName = new cdk.CfnParameter(this, 'TableName', {
      type: "String",
      default: "purchase",
      noEcho: false
    })

    const db = new cdk.aws_dynamodb.Table(this, 'db-sample-transcription-service', {
      tableName: tableName.valueAsString,
      partitionKey: {
        type: AttributeType.STRING,
        name: 'purchase_id'
      }
    })
  }
}
