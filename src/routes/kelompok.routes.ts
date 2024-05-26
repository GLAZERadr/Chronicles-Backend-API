import express from 'express';

import * as kelompokController from '../controllers/kelompok/kelompok.controllers';
import { verifyJWTToken } from '../common/middlewares/auth.middlewares';

export const kelompokRouter = express.Router();

kelompokRouter.get('/get', verifyJWTToken, kelompokController.getAllKelompok);
kelompokRouter.get('/get/:id', verifyJWTToken, kelompokController.getKelompok);
kelompokRouter.get('/get/anggota/:id', verifyJWTToken, kelompokController.getAnggotaByKelompok);
kelompokRouter.post('post', verifyJWTToken, kelompokController.createKelompok);
kelompokRouter.delete('/delete', verifyJWTToken, kelompokController.deleteKelompok);