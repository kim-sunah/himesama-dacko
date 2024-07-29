"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNlpDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_nlp_dto_1 = require("./create-nlp.dto");
class UpdateNlpDto extends (0, mapped_types_1.PartialType)(create_nlp_dto_1.CreateNlpDto) {
}
exports.UpdateNlpDto = UpdateNlpDto;
//# sourceMappingURL=update-nlp.dto.js.map