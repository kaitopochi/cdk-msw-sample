#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { CdkMswSampleStack } from '../lib/cdk-msw-sample-stack';

const app = new App();
new CdkMswSampleStack(app, 'CdkMswSampleStack');
