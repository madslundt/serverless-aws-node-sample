import AWS from "aws-sdk";
import AWSXRay from "aws-xray-sdk";

const captureAWS = AWSXRay.captureAWS(AWS);

export {
    captureAWS
};

export default AWS;
