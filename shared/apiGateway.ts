import { APIGateway } from "aws-sdk";

const defaultRegion: string = process.env.REGION_NAME || process.env.AWS_REGION || "";
const apiGateway: APIGateway = new APIGateway({ region: defaultRegion });

export default apiGateway;
