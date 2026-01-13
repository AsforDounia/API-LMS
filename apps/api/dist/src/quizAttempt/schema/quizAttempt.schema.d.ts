import { Document, Types } from 'mongoose';
export declare class QuizAttempt extends Document {
    startedAt: Date;
    completedAt: Date;
    score: number;
    passed: boolean;
    attemptNumber: number;
    apprenantId: Types.ObjectId;
    quizId: Types.ObjectId;
}
export declare const QuizAttemptSchema: import("mongoose").Schema<QuizAttempt, import("mongoose").Model<QuizAttempt, any, any, any, (Document<unknown, any, QuizAttempt, any, import("mongoose").DefaultSchemaOptions> & QuizAttempt & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, QuizAttempt, any, import("mongoose").DefaultSchemaOptions> & QuizAttempt & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}), any, QuizAttempt>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, QuizAttempt, Document<unknown, {}, QuizAttempt, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<QuizAttempt & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    _id?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, QuizAttempt, Document<unknown, {}, QuizAttempt, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<QuizAttempt & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    quizId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, QuizAttempt, Document<unknown, {}, QuizAttempt, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<QuizAttempt & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    startedAt?: import("mongoose").SchemaDefinitionProperty<Date, QuizAttempt, Document<unknown, {}, QuizAttempt, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<QuizAttempt & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    completedAt?: import("mongoose").SchemaDefinitionProperty<Date, QuizAttempt, Document<unknown, {}, QuizAttempt, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<QuizAttempt & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    score?: import("mongoose").SchemaDefinitionProperty<number, QuizAttempt, Document<unknown, {}, QuizAttempt, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<QuizAttempt & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    passed?: import("mongoose").SchemaDefinitionProperty<boolean, QuizAttempt, Document<unknown, {}, QuizAttempt, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<QuizAttempt & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    attemptNumber?: import("mongoose").SchemaDefinitionProperty<number, QuizAttempt, Document<unknown, {}, QuizAttempt, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<QuizAttempt & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    apprenantId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, QuizAttempt, Document<unknown, {}, QuizAttempt, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<QuizAttempt & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, QuizAttempt>;
