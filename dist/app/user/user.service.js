"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.resetPassword = exports.addUserByAdmin = exports.updateRefreshToken = exports.findUserByEmail = exports.isUserExistByEamil = exports.createUser = void 0;
const user_schema_1 = __importDefault(require("./user.schema"));
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_schema_1.default.create(Object.assign(Object.assign({}, data), { active: true }));
    return result;
});
exports.createUser = createUser;
const isUserExistByEamil = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_schema_1.default.findOne({ email: email });
    if (user) {
        return true;
    }
    else {
        return false;
    }
});
exports.isUserExistByEamil = isUserExistByEamil;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_schema_1.default.findOne({ email: email });
    return user;
});
exports.findUserByEmail = findUserByEmail;
const updateRefreshToken = (id, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_schema_1.default.findByIdAndUpdate(id, { refreshToken }, { new: true });
    return user;
});
exports.updateRefreshToken = updateRefreshToken;
const addUserByAdmin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    data.password = "12345";
    const user = user_schema_1.default.create(data);
    return user;
});
exports.addUserByAdmin = addUserByAdmin;
const resetPassword = (email, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield user_schema_1.default.findOne({ email: email });
    if (user) {
        user.password = newPassword;
        yield user.save();
    }
    return user;
});
exports.resetPassword = resetPassword;
// export const updateUser = async (id: string, data: IUser) => {
//     const result = await UserSchema.findOneAndUpdate({ _id: id }, data, {
//         new: true,
//     });
//     return result;
// };
// export const editUser = async (id: string, data: Partial<IUser>) => {
//     const result = await UserSchema.findOneAndUpdate({ _id: id }, data);
//     return result;
// };
// export const deleteUser = async (id: string) => {
//     const result = await UserSchema.deleteOne({ _id: id });
//     return result;
// };
// export const getUserById = async (id: string) => {
//     const result = await UserSchema.findById(id).lean();
//     return result;
// };
// export const getAllUser = async () => {
//     const result = await UserSchema.find({}).lean();
//     return result;
// };
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_schema_1.default.findOne({ email }).lean();
    return result;
});
exports.getUserByEmail = getUserByEmail;
