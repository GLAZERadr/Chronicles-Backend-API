import { NextFunction, Response } from "express";

import * as gambarServices from '../../services/gambar/gambar.services';
import { CustomRequest } from "../../common/middlewares/auth.middlewares";
import { generateIdUser } from "../../common/helpers/generateid/generateid";

export const createGambar = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const newGambarId = generateIdUser.generateId('GBR_');

        const newGambarData = { ...req.body, id: newGambarId };

        const gambar = await gambarServices.createGambar(newGambarData);

        return res.status(201).send(gambar);
    } catch (error) {
        return next(error);
    }
};

export const deleteGambar = async (req: CustomRequest, res: Response, next: NextFunction ): Promise<Response | void> => {
    try {
        const { id } = req.params;

        let result = await gambarServices.deleteGambar(id);

        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
};

export const updateGambar = async (req: CustomRequest, res: Response, next: NextFunction ): Promise<Response | void> => {
    try {
        const { id } = req.params;
        const { url_gambar } = req.body;

        let result = await gambarServices.updateGambar(id, url_gambar);

        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
};

export const getStoryByGambar = async (req: CustomRequest, res: Response, next: NextFunction ): Promise<Response | void> => {
    try {
        const { id } = req.params;

        let result = await gambarServices.getStoryByGambar(id);
        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
};