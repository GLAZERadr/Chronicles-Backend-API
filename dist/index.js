"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_middlewares_1 = require("./common/middlewares/error.middlewares");
const guru_routes_1 = __importDefault(require("./routes/guru.routes"));
const session_routes_1 = __importDefault(require("./routes/session.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const kelas_routes_1 = require("./routes/kelas.routes");
const kelompok_routes_1 = require("./routes/kelompok.routes");
const pertandingan_routes_1 = require("./routes/pertandingan.routes");
const tugas_routes_1 = require("./routes/tugas.routes");
const story_routes_1 = require("./routes/story.routes");
const restory_routes_1 = require("./routes/restory.routes");
const app = (0, express_1.default)();
const port = 8080;
app.use(express_1.default.json());
app.use(error_middlewares_1.errorMiddleware);
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
//handle logger
app.use((req, res, next) => {
    console.log(req.method, req.hostname, req.path);
    next();
});
app.use('/chronicles-v1/api/guru', guru_routes_1.default);
app.use('/chronicles-v1/api/kelas', kelas_routes_1.kelasRouter);
app.use('/chronicles-v1/api/kelompok', kelompok_routes_1.kelompokRouter);
app.use('/chronicles-v1/api/pertandingan', pertandingan_routes_1.pertandinganRouter);
app.use('/chronicles-v1/api/tugas', tugas_routes_1.tugasRouter);
app.use('/chronicles-v1/api/session', session_routes_1.default);
app.use('/chronicles-v1/api/story', story_routes_1.storyRouter);
app.use('/chronicles-v1/api/restory', restory_routes_1.restoryRouter);
app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message });
});
app.use('/', (req, res, next) => {
    res.status(200).json({ message: 'Hello Chronicles😎' });
});
app.get('/cookies', function (req, res) {
    console.log('Cookies: ', req);
    console.log('Signed Cookies: ', req.signedCookies);
});
app.listen(port, () => {
    console.log(`Server is listening in ${port}`);
});
exports.default = app;
