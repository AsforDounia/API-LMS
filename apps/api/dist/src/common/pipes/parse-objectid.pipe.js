"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseObjectIdPipe = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
class ParseObjectIdPipe {
    transform(value) {
        if (!(0, mongoose_1.isValidObjectId)(value)) {
            throw new common_1.BadRequestException(`Invalid ObjectId: ${value}`);
        }
        return value;
    }
}
exports.ParseObjectIdPipe = ParseObjectIdPipe;
//# sourceMappingURL=parse-objectid.pipe.js.map