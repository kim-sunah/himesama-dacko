"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateChannellistDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_channellist_dto_1 = require("./create-channellist.dto");
class UpdateChannellistDto extends (0, mapped_types_1.PartialType)(create_channellist_dto_1.CreateChannellistDto) {
}
exports.UpdateChannellistDto = UpdateChannellistDto;
//# sourceMappingURL=update-channellist.dto.js.map