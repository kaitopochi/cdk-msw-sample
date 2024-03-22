import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { join } from 'path';

export class CdkMswSampleStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const lambdaFunction = new NodejsFunction(this, 'LambdaFunction', {
            runtime: Runtime.NODEJS_20_X,
            handler: 'handler',
            entry: join(__dirname, '../lambda/apiHandler.ts'),
            environment: {
                MSW_STATUS: 'enabled', // 本番環境では 'disabled' に設定
            },
        });

        new LambdaRestApi(this, 'Endpoint', {
            handler: lambdaFunction,
        });
    }
}
