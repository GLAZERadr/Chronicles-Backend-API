"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNilaiAndKomentar = exports.gradingStory = exports.getGuruByTugas = exports.deleteTugas = exports.createTugas = void 0;
const tugasServices = __importStar(require("../../services/tugas/tugas.services"));
const storyServices = __importStar(require("../../services/story/story.services"));
const generateid_1 = require("../../common/helpers/generateid/generateid");
const penilaian_llm_1 = require("../../api/penilaian-llm/penilaian-llm");
const createTugas = async (req, res, next) => {
    try {
        const newTugasId = generateid_1.generateIdUser.generateId('TGS_');
        const newTugasData = { ...req.body, id: newTugasId };
        let tugas = await tugasServices.createTugas(newTugasData);
        return res.status(201).send(tugas);
    }
    catch (error) {
        return next(error);
    }
};
exports.createTugas = createTugas;
const deleteTugas = async (req, res, next) => {
    try {
        const { id } = req.params;
        let result = await tugasServices.deleteTugas(id);
        return res.status(200).send(result);
    }
    catch (error) {
        return next(error);
    }
};
exports.deleteTugas = deleteTugas;
const getGuruByTugas = async (req, res, next) => {
    try {
        const { id } = req.params;
        let result = await tugasServices.getGuruByTugas(id);
        return res.status(200).send(result);
    }
    catch (error) {
        return next(error);
    }
};
exports.getGuruByTugas = getGuruByTugas;
const gradingStory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { id_story } = req.params;
        const getStory = await storyServices.getStoryById(id_story);
        if (!getStory) {
            return res.status(400).json({ message: "Gagal mengenerate penilaian" });
        }
        const { orientation, complication, resolution, reorientation } = getStory;
        const story_text = orientation + ',' + complication + ',' + resolution + ',' + reorientation;
        const grade = await (0, penilaian_llm_1.sendRequestGradingLlmApi)(story_text);
        const { message, result, final_grade } = grade;
        if (message != "Processed text" && result === null && final_grade === 0) {
            return res.status(400).send({ message: "Gagal mengenerate penilaian" });
        }
        ;
        const nilai_kelompok = parseFloat(final_grade);
        const nilai_komentar = await tugasServices.updateNilaiAndKomentar(id, nilai_kelompok, result);
        return res.status(200).send(nilai_komentar);
    }
    catch (error) {
        return next(error);
    }
};
exports.gradingStory = gradingStory;
const updateNilaiAndKomentar = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nilai_kelompok, komentar } = req.body;
        let result = await tugasServices.updateNilaiAndKomentar(id, nilai_kelompok, komentar);
        return res.status(200).send(result);
    }
    catch (error) {
        return next(error);
    }
};
exports.updateNilaiAndKomentar = updateNilaiAndKomentar;
