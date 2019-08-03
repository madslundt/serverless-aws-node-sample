import AWS, { captureAWS } from "@infrastructure/aws";
import dynamoose from "dynamoose";

dynamoose.AWS = captureAWS;

dynamoose.setDefaults({
    create: false,
    serverSideEncryption: true
});

const dynamoDB = new AWS.DynamoDB();

dynamoose.setDDB(dynamoDB);

export {
    dynamoose
};
