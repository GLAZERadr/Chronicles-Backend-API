import { DatabaseException } from "../../../common/exceptions/exceptions";
import { Kelompok } from "../../models/kelompok/kelompok";
export const createKelompok = async (newKelompok) => {
    try {
        return await Kelompok.create(newKelompok);
    }
    catch (error) {
        throw new DatabaseException(error.message);
    }
};
export const deleteKelompok = async (id) => {
    try {
        const result = await Kelompok.destroy({ where: { id: id } });
        if (result === 0) {
            return 'Kelompok not deleted';
        }
        return `Kelompok ${id} is deleted`;
    }
    catch (error) {
        throw new DatabaseException(error.message);
    }
};
export const existingKelompokByNama = async (nama_kelompok) => {
    try {
        const result = await Kelompok.findOne({ where: { nama_kelompok: nama_kelompok } });
        return !!result;
    }
    catch (error) {
        throw new DatabaseException(error.message);
    }
};
export const existingKelompokById = async (id) => {
    try {
        const result = await Kelompok.findByPk(id);
        return !!result;
    }
    catch (error) {
        throw new DatabaseException(error.message);
    }
};
export const getAllKelompok = async () => {
    try {
        const kelompoks = await Kelompok.findAll();
        return kelompoks || null;
    }
    catch (error) {
        throw new DatabaseException(error.message);
    }
};
export const getKelompokById = async (id) => {
    try {
        const kelompok = await Kelompok.findByPk(id);
        return kelompok || null;
    }
    catch (error) {
        throw new DatabaseException(error.message);
    }
};
export const getKelompokByClass = async (id_kelas) => {
    try {
        const kelompok = await Kelompok.findAll({ where: { id_kelas: id_kelas } });
        return kelompok || null;
    }
    catch (error) {
        throw new DatabaseException(error.message);
    }
};
export const createRandomAccounts = async (accounts) => {
    try {
        const createdAccounts = [];
        for (const account of accounts) {
            const kelompok = await Kelompok.create(account);
            createdAccounts.push(kelompok);
        }
        return createdAccounts;
    }
    catch (error) {
        throw new DatabaseException(error.message);
    }
};
export const getKelompokByUsernameAndPassword = async (username, password) => {
    try {
        const kelompok = await Kelompok.findOne({ where: { username: username, password: password } });
        return kelompok || null;
    }
    catch (error) {
        throw new DatabaseException(error.message);
    }
    ;
};
export const existigKelompokByUsername = async (username) => {
    try {
        const result = await Kelompok.findOne({ where: { username: username } });
        return !!result;
    }
    catch (error) {
        throw new DatabaseException(error.message);
    }
    ;
};
//update info kelompok
export const updateInfoKelompok = async (id, nama_kelompok, ketua, anggota1, anggota2, anggota3, anggota4) => {
    try {
        await Kelompok.update({ nama_kelompok: nama_kelompok, ketua: ketua, anggota1: anggota1, anggota2: anggota2, anggota3: anggota3, anggota4: anggota4 }, { where: { id: id } });
        return await Kelompok.findByPk(id);
    }
    catch (error) {
        throw new DatabaseException(error.message);
    }
};
//update status story restory kelompok
export const updateStatusKelompok = async (id, status) => {
    try {
        await Kelompok.update({ status: status }, { where: { id: id } });
        return await Kelompok.findByPk(id);
    }
    catch (error) {
        throw new DatabaseException(error.message);
    }
};
