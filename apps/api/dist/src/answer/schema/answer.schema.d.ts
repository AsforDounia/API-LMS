import { Document, Types } from 'mongoose';
export declare class Answer extends Document {
    selectedAnswers: string[];
    isCorrect: boolean;
    pointsEarned: number;
    attemptId: Types.ObjectId;
    questionId: Types.ObjectId;
}
export declare const AnswerSchema: import("mongoose").Schema<Answer, import("mongoose").Model<Answer, any, any, any, (Document<unknown, any, Answer, any, import("mongoose").DefaultSchemaOptions> & Answer & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, Answer, any, import("mongoose").DefaultSchemaOptions> & Answer & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}), any, Answer>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Answer, Document<unknown, {}, Answer, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Answer & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    _id?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Answer, Document<unknown, {}, Answer, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Answer & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    selectedAnswers?: import("mongoose").SchemaDefinitionProperty<string[], Answer, Document<unknown, {}, Answer, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Answer & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isCorrect?: import("mongoose").SchemaDefinitionProperty<boolean, Answer, Document<unknown, {}, Answer, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Answer & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    pointsEarned?: import("mongoose").SchemaDefinitionProperty<number, Answer, Document<unknown, {}, Answer, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Answer & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    attemptId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Answer, Document<unknown, {}, Answer, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Answer & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    questionId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Answer, Document<unknown, {}, Answer, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Answer & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Answer>;
