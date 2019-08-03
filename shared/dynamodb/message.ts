import { dynamoose } from "@infrastructure/dynamoDb";

export interface IMessage {
    messageId: string;
    userId: string;
    message: string;
    notified: boolean;
    createdDate: Date;
    updatedDate?: Date;
    notifyDate?: Date;
}

export interface IGetMessageRequest {
    messageId: string;
}

const schema = new dynamoose.Schema({
    messageId: {
        type: String,
        hashKey: true,
        required: true
    },
    userId: {
        type: String,
        index: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    notified: {
        type: Boolean,
        required: true
    },
    createdDate: {
        type: Date,
        default: new Date(),
        required: true
    },
    updatedDate: {
        type: Date,
        default: new Date(),
        required: false
    },
    notifiedDate: {
        type: Date,
        required: false
    }
}, {
    useNativeBooleans: true,
    timestamps: {
        createdAt: "createdDate",
        updatedAt: "updatedDate"
    }
});

const Message = dynamoose.model<IMessage, IGetMessageRequest>("Message", schema);

export {
    schema,
    Message
};
