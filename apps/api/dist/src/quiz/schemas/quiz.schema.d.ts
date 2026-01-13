import { Document, Types } from 'mongoose';
export declare class Quiz extends Document {
    moduleId: Types.ObjectId;
    title: string;
    passingScore: number;
    isRequired: boolean;
}
export declare const QuizSchema: import("mongoose").Schema<Quiz, import("mongoose").Model<Quiz, any, any, any, (Document<unknown, any, Quiz, any, import("mongoose").DefaultSchemaOptions> & Quiz & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, Quiz, any, import("mongoose").DefaultSchemaOptions> & Quiz & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}), any, Quiz>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Quiz, Document<unknown, {}, Quiz, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Quiz & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    _id?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Quiz, Document<unknown, {}, Quiz, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Quiz & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isRequired?: import("mongoose").SchemaDefinitionProperty<boolean, Quiz, Document<unknown, {}, Quiz, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Quiz & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    moduleId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Quiz, Document<unknown, {}, Quiz, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Quiz & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string, Quiz, Document<unknown, {}, Quiz, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Quiz & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    passingScore?: import("mongoose").SchemaDefinitionProperty<number, Quiz, Document<unknown, {}, Quiz, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Quiz & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Quiz>;
