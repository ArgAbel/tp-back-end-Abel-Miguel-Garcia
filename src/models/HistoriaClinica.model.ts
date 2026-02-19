 import pool from '../config/database';
import { RowDataPacket } from 'mysql2';

export interface Hclinico {
  id: number;
  text: string;
  userid: string;
  mascotaid: string;
  phone: string;
}

export type HclinicoRow = Hclinico& RowDataPacket;

export const getAllHclinicos = async (): Promise<Hclinico[]> => {
  const [rows] = await pool.query<HclinicoRow[]>(`
    SELECT h.id, h.text, h.userid, h.mascotaid, h.phone
    FROM historiaclinica h
    `);
  return rows;
};

export const createHclinico = async (data: Hclinico): Promise<number> => {
  const { text, userid, mascotaid, phone } = data;

  const [result]: any = await pool.query(
    'INSERT INTO historiaclinica (text, userid, mascotaid, phone) VALUES (?, ?, ?, ?)',
    [text, userid, mascotaid, phone]
  );
  return result.insertId;
};

export const getHclinicoById = async (id: number): Promise<Hclinico | null> => {
  const [rows] = await pool.query<HclinicoRow[]>(
    'SELECT id, text, userid, mascotaid, phone FROM historiaclinica WHERE id = ?',
    [id]
  );
  return rows.length > 0 ? rows[0] : null;
}

export const updateHclinico = async (id: number, data: Partial<Hclinico>): Promise<void> => {
  const { text, userid, mascotaid, phone } = data;
  await pool.query(
    'UPDATE historiaclinica SET text = ?, userid = ?, mascotaid = ?, phone = ? WHERE id = ?',
    [text, userid, mascotaid, phone, id]
  );
};  

export const deleteHclinico = async (id: number): Promise<void> => {
  await pool.query('DELETE FROM historiaclinica WHERE id = ?', [id]);
};  