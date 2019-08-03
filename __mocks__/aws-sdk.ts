class SNS {
    publish(_: any, callback: Function) {
        callback();

        return {
            promise: () => new Promise(resolve => {
                resolve();
            })
        };
    }
};

class APIGateway {
    getRestApis() {
        // Empty
    }
    getExport() {
        // Empty
    }
}

const AWS = {
    DynamoDB: class DynamoDB {
        // Empty
    }
};

export {
    SNS,
    APIGateway
};

export default AWS;
