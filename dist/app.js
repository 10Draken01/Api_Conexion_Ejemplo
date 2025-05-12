"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const db_1 = require("./config/db");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/users', user_routes_1.default);
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
(0, db_1.connectDB)().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
});
