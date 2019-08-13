import AWS, { captureAWS } from "@infrastructure/aws";
import dynamoose from "dynamoose";

dynamoose.AWS = captureAWS;

dynamoose.setDefaults({
    create: false,
    serverSideEncryption: true
});

const dynamoDB = new AWS.DynamoDB({
    region: process.env.region,
    endpoint: process.env.DYNAMODB_ENDPOINT,
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY
});

dynamoose.setDDB(dynamoDB);

export {
    dynamoose
};
