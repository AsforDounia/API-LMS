"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const question_schema_1 = require("./schema/question.schema");
const quiz_schema_1 = require("../quiz/schemas/quiz.schema");
const common_2 = require("@nestjs/common");
let QuestionService = class QuestionService {
    questionModel;
    quizModel;
    constructor(questionModel, quizModel) {
        this.questionModel = questionModel;
        this.quizModel = quizModel;
    }
    async createQuestion(createQuestionDto) {
        const quizExists = await this.quizModel.exists({
            _id: createQuestionDto.quizId,
        });
        if (!quizExists) {
            throw new common_2.BadRequestException('Quiz does not exist');
        }
        const question = new this.questionModel(createQuestionDto);
        return question.save();
    }
    async getQuestionsByQuiz(quizId) {
        return this.questionModel.find({ quizId }).exec();
    }
    async getQuestionById(id) {
        return this.questionModel.findById(id).exec();
    }
    async updateQuestion(id, updateDto) {
        return this.questionModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    }
    async deleteQuestion(id) {
        return this.questionModel.findByIdAndDelete(id).exec();
    }
};
exports.QuestionService = QuestionService;
exports.QuestionService = QuestionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(question_schema_1.Question.name)),
    __param(1, (0, mongoose_1.InjectModel)(quiz_schema_1.Quiz.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], QuestionService);
//# sourceMappingURL=question.service.js.map