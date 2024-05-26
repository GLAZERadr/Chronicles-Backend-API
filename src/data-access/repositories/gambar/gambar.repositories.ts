import { DatabaseException } from "../../../common/exceptions/exceptions";
import { Gambar, GambarOutput } from "../../models/gambar/gambar";

export const createGambar = async (newGambar: Gambar): Promise<GambarOutput> => {
    try {
        return await Gambar.create(newGambar);
    } catch (error: any) {
        throw new DatabaseException(error.message);
    }
};

export const deleteGambar = async (id: string): Promise<string> => {
    try {
        const result = await Gambar.destroy({ where: { id: id } });
        if (result === 0) {
            return 'Gambar not deleted';
        }
        return `Gambar ${id} is deleted`;
    } catch (error: any) {
        throw new DatabaseException(error.message); 
    }
}

export const updateGambar = async (id: string, url_gambar: string): Promise<GambarOutput | null> => {
    try {
        await Gambar.update({ url_gambar: url_gambar }, { where: { id: id } });
        return await Gambar.findByPk(id);
    } catch (error: any) {
        throw new DatabaseException(error.message); 
    }
};