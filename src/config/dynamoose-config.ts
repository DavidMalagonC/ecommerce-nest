import * as dynamoose from 'dynamoose';
import { ConfigService } from '@nestjs/config';
import { DynamoDB } from '@aws-sdk/client-dynamodb';

export const initializeDynamoose = (configService: ConfigService) => {
  const client = new DynamoDB({
    region: configService.get<string>('AWS_REGION'),
    credentials: {
      accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
    },
  });

  dynamoose.aws.ddb.set(client);
};