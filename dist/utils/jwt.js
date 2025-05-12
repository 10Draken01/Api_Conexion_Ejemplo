"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "ew459oprt8gjmv2390tjun12p9bfvo8923rtvcnbh295ig8vn7h34509gtuyn3509gtvnby25409gtb345bp9g34p59btvop9345wbtvbc9o84523ytv23894obbfop89c245ybc92g3459bvt203459bt903458bv459p24bvy5934bytvgw3495vyb3509-";
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, JWT_SECRET, { expiresIn: '1h' });
};
exports.generateToken = generateToken;
