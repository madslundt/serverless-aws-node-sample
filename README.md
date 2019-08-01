# Setup
## Local environment

1. Install [Node.js](https://nodejs.org).

2. Install [Serverless framework](https://serverless.com/) as global:
```bash
npm install -g serverless
```

Verify that Serverless was installed correctly:
```bash
sls -v
```

3. Clone this repository

4. Install dependencies
```bash
npm install
```

## Setup AWS credentials

1. Setup IAM
  * Create a new IAM Policy in AWS using the `aws-setup/aws-policy.json` file. Note that the file contains placeholders for your `<account_no>`, `<region>`, `<service_name>`, and `<your_deployment_bucket>`.
  You can replace all those `Resource` ARNs with `*`, if you intentionally don't want to follow the Principle of Least Privilege, but want to avoid permission issues.
  (If you prefer minimal permissions, you may want to follow [Issue 1439: Narrowing the Serverless IAM Deployment Policy](https://github.com/serverless/serverless/issues/1439). )

  * Create a new IAM User for Programmatic Access only, assign the previously created policy to it, and get the Access Key ID and the Secret Access Key of the user.

  * Save the credentials to the `~/.aws/credentials` file:

  ```bash
  sls config credentials --provider aws --key YOUR_ACCESS_KEY --secret YOUR_SECRET_KEY
  ```

  _Administrator user is needed to run Serverless CLI on Windows._

  More about setting up AWS Credentials on the [AWS - Credentials page](https://serverless.com/framework/docs/providers/aws/guide/credentials/) of the Serverless Guide.

2. **Customize the name of your service** by changing the following line in the `serverless.yml` file:

```
service: serverless-aws-node-sample
```

3. **Customize the name of your domain** by changing the following lines in the `serverless.yml` file:

```
custom:
  customDomain:
    domainName: serverless-aws-node-sample.dk
    certificateName: serverless-aws-node-sample.dk
```

**NOTE:** You must have the certificate created in [AWS Certificate Manager](https://aws.amazon.com/certificate-manager/) before executing this command. According to AWS to use an ACM certificate with API Gateway, you must [request or import the certificate](https://serverless.com/blog/serverless-api-gateway-domain/) in the US East (N. Virginia) region.

If you want to publish your API to a custom domain, uncomment both the `serverless-domain-manager` in the `plugins` section and the `customDomains` entry from the `custom` section of the `serverless.yml` file.

## DynamoDB
Amazon DynamoDB is a fully managed NoSQL database and is able to scale. Read more about it [here](https://www.dynamodbguide.com/).

### Create table
1. Sign in to [AWS DynamoDB Console](https://console.aws.amazon.com/dynamodb)
2. Click **Tables** in the left menu
3. Click **Create table**
4. Enter **Table name** and **Primary key** *
5. Select **Use default settings**
6. Select either **Provisioned** or **On-demand** **
7. Click **Create**

* Primary keys can not be changed once set. The primary key uniquely identifies each item in the table, which means that there can not be any items with the same primary key.

** On-Demand is DynamoDB’s pay per request mode. For workloads that are not predictable or if you are just starting out, this ends up being a lot cheaper than the Provisioned Capacity mode.

## AWS Cognito
Amazon Cognito is a simple solution to user sign-up, sign-in, and access control
Cognito from Amazon makes it easy to add sign-up and sign-in functionality to applications.

### Create user pool
This guides you into how to set up a user pool for this application.
1. Sign in to [AWS Cognito Console](https://console.aws.amazon.com/cognito)
2. Click **Manage User Pools**
3. Click **Create a User Pool**
4. Enter a pool name and click **Review default**
5. Click **Choose username attributes...**
6. Select **Email address or phone numbers** and **Allow email addresses**
7. Click **Next step**
8. **Username attributes** is now changed to **email**. Click **Review**
9. Click **Create pool**
10. Store the **Pool Id** and **Pool Arn** somewhere where it is easy to find again.

Now that the user pool is created the app client must be added.
1. Click **App clients**
2. Click **Add an app client**
3. Enter **App client name** and the number of days in **Refresh token expiration**
4. Unselect **Generate client secret** and select **Enable sign-in API for server-based authentication** *
5. Click **Create app client**
6. Store the **App client id** somewhere where it is easy to find again.

Next is to create domain name
1. Click **Domain name**
2. Enter an available **Domain prefix**
3. Click **Save changes**


* Generate client secret doesn't work with the Javascript SDK.

### Create test user
For this to work AWS CLI is required on your computer.
Run the following command in your terminal to create the test user:
```
aws cognito-idp sign-up \
  --region COGNITO_REGION \
  --client-id COGNITO_APP_CLIENT_ID \
  --username USERNAME \
  --password PASSWORD
```

**COGNITO_REGION** and **COGNITO_APP_CLIENT_ID** are the ones that were created in [Create user pool](#create-user-pool).
**USERNAME** and **PASSWORD** are the credentials for the test user.

Verify the test user
```
aws cognito-idp admin-confirm-sign-up \
  --region COGNITO_REGION \
  --user-pool-id COGNITO_USER_POOL_ID \
  --username USERNAME
```
**COGNITO_REGION** and **USERNAME** are the same ones as before.
**COGNITO_USER_POOL_ID** is the one that was created in [Create user pool](#create-user-pool).

## AWS API Gateway
Amazon API Gateway is a fully managed service that is able to create, publish, maintain, monitor, and secure APIs.

### Setup API Gateway from Swagger
1. Sign in to [AWS API Gateway Console](https://console.aws.amazon.com/apigateway)
2. Click on **Create** or **Get started**
3. Select **REST** in *protocol*
4. Select **Import from Swagger or Open API 3** in *Create new API*
5. Go to */swagger.json*
6. Copy all content and paste it into AWS
7. Select your *Endpoint Type*
8. Click **Import**

## SNS
Amazon Simple Notification Service is a fully managed pub/sub messaging.
Each serverless function can subscribe to event(s) and/or publish to event(s)

### Enable SNS
<TODO>

## AWS CloudWatch
Amazon CloudWatch is a monitoring and management service to monitor applications, understand and respond to system-wide performance changes, optimize resource utilization, and get a unified view of operational health.

### Enable API Gateway CloudWatch logs
1. Sign in to [AWS IAM Console](https://console.aws.amazon.com/iam)
2. Click **Roles**
3. Click **Create role**
4. Click **AWS service** and select **API Gateway**
5. Click **Next: Permissions**
6. Click **Next: Review**
7. Enter a **Role name** and click **Create role**
8. Click on the role name just created
9. Store **Role ARN** somewhere where it is easy to find again

Now that IAM role is created logging has to be turned on for API Gateway
1. Sign in to [AWS API Gateway Console](https://console.aws.amazon.com/apigateway)
2. Click **Settings**
3. Find the **Role ARN** that you stored earlier and paste it into **CloudWatch log role ARN**
4. Click **Save**
5. Click **Stages** and select a stage you want logging enabled for
6. Click the **Logs** tab
7. Check **Enable CloudWatch Logs**
8. Select the **Log level** you want every request
9. Check **Log full requests/responses data** to include entire request and response body in the log
10. Check **Enable Detailed CloudWatch Metrics** to track latencies and errors in CloudWatch metrics

### Enable Lambda CloudWatch logs
Lambda CloudWatch logs are enabled by default.
To log any additional information to CloudWatch simply do it via `console.log`.

### View API Gateway CloudWatch logs
1. Sign in to [AWS CloudWatch Console](https://console.aws.amazon.com/cloudwatch)
2. Click **Logs**
3. Click **API-Gateway-Execution-Logs_X** where X being the API Gateway id

### View Lamda CloudWatch logs
1. Sign in to [AWS CloudWatch Console](https://console.aws.amazon.com/cloudwatch)
2. Click **Logs**
3. Click **/aws/lambda/X** where X being the function name

Serverless CLI can also be used to read logs from CloudWatch. Simply run the command
```bash
serverless logs -f <func-name>
```

Additionally, you can use the --tail flag to stream the logs automatically to your console.
```bash
serverless logs -f <func-name> --tail
```

## AWS X-Ray
AWS X-Ray is an Application Performance Management(APM) tool.

### Enable X-Ray for a function
1. Sign in to [AWS Lambda Console](https://console.aws.amazon.com/lambda)
2. Click on a function
3. Click on **Configuration**
4. In **Debugging and error handling**, select **Enable active tracing**

<TODO>

# Project structure

This project shows example Lambda function implementations with the following layers (see the `src/sample` folder):

- **Controller**: The controller is the endpoint that is called by AWS when it executes the Lambda. This is responsible for transforming any operation result to an HTTP response.
- **Handlers**: The handlers contain all business logic.
- **Helpers**: Alternative helper functions.
- **functions.yml**: Function configuration for AWS and documentation for Swagger. *Make all paths begin from root of the project*.
- **Swagger**: Swagger documentation for all controller functions. *Make sure to add them to `/swagger/documentation.yml`*.
- **index.ts**: Collect all functions for easier export.

All layers have unit tests with mocking the underlying layers.

It is important that all controllers are suffixed with `Controller.ts` and that all controller logic is handled inside the `errorHandling` function. `errorHandling` makes sure to handle all exceptions and return the correct status code. `controllers.test.ts` makes sure all controllers use the `errorHandling` function.

Additional terms:

- **Response**: The HTTP output for an endpoint call. It includes the HTTP status code, the response headers and the response body. The controller is responsible for building the response, using the `ResponseBuilder` helper class.
- **Result**: The outcome of the service call. It can be a success result or an error result.

A sample function (`src/sample/sample.ts`) has been added to easily copy to new functions.

## Swagger export

The `src/swagger` folder contains the `/swagger.json` endpoint which exports the documentation of the API in [Swagger](https://swagger.io/) format. Call the endpoint after deploying your API and paste the response JSON into the [Swagger Editor](https://editor.swagger.io) to display it in a friendly way.

You can also reference the `swagger.json` URL when you publish your documentation via [SwaggerHub](https://app.swaggerhub.com).

## Health check endpoints

The `/health/check` and the `/health/check/detailed` endpoints in the `src/health` folder are provided to run quick checks on your API after deployment.

# Scripts

| Script name   | Description                                                                                                         |
|---------------|---------------------------------------------------------------------------------------------------------------------|
| `analyze`     | Runs all code analysis tools, including linters and unit tests.                                                     |
| `deploy`      | Runs all analysis tools, creates the deployment package, installs it on AWS and run the unit tests.                 |
| `start`       | Runs the service locally, so you can call your API endpoints on http://localhost:3000.                              |

Additional useful `npm script`:

| Script name        | Description                                                                                                                     |
|--------------------|---------------------------------------------------------------------------------------------------------------------------------|
| `build`            | Runs all pre-deploy analysis and creates the deployment package, but does not install it onto AWS.                              |
| `clean`            | Removes all tool-generated files and folders (build output, coverage report etc.). Automatically runs as part of other scripts. |
| `deploy:init`      | Creates the domain in Route53. Required to manually execute once.                                                               |
| `lint`             | Runs the static code analyzers. Automatically runs before deployment.                                                           |
| `test`             | Runs the unit tests. Automatically runs before deployment.                                                                      |
| `test:watch`       | Runs the unit tests in watch mode.                                                                                              |
| `test:ci`          | Runs the unit tests in ci mode.                                                                                                 |

## Test the service locally

**To invoke the Lambda function locally, run:** _This command requires Administrator privileges on Windows!_

```
serverless invoke local --function getCity
```

**To run the service locally, run:** _This command requires Administrator privileges on Windows!_

```bash
npm start
```

This command will not terminate, but will keep running a webserver that you can use to locally test your service. Verify that the service runs perfectly by opening the `http://localhost:3000` URL in your browser. The console window will log your requests.

You can modify your code after running this command, Serverless will automatically recognize the changes and recompile your code.

## Deploy to AWS

**To create a custom domain for your service in AWS, run this command once:** _This command requires Administrator privileges on Windows!_

```bash
npm run deploy:init
```

According to AWS, after this command it may take up to 40 minutes to initialize the domain with a CloudFront distribution. In practice it usually takes about 10 minutes.

**To deploy the service to AWS, run:** _This command requires Administrator privileges on Windows!_

```bash
serverless deploy
```

or you can use the NPM script alias, which is recommended, because it runs the analysers (linter + tests) before deployment:

```bash
npm run deploy
```

Verify that the deployment is completed successfully by opening the URL displayed in your console window in your browser. To see all resources created in AWS navigate to CloudFormation in the AWS Console and look for the stack named with the name of your service you specified in Step 6.

**To download the Swagger description** of your service, open the following URL in your browser:

```
https://<your_custom_domain_name>/api/swagger.json
```

Note that this endpoint always downloads the Swagger documentation from the live, published API, even if the code is running locally!

If you don't want to deploy your code, just want to peek into the deployment package, you can run:

```bash
npm run build
```

This command is not only an alias to `serverless package`, but also runs all analyzers that the deploy process also runs.

## Run linter

**To check your codebase with TSLint, run:**

```bash
npm run lint
```

The linter automatically checks your code before deployment, so you don't need to run it manually.

## Run unit tests

**To check your code with unit tests, run:**

```
npm test
```

The unit tests are automatically running before deployment, so you don't need to run them manually.

## View the documentation

To view the generated Swagger documentation, deploy your API or start it locally, and then call the `/swagger.json` endpoint.
