 import pool from '../config/database';
import { RowDataPacket } from 'mysql2';

export interface Mascota {
  id: number;
  name: string;
  race: string;
  birthdate: Date;
  propietario_id: number;
}

export type MascotaRow = Mascota& RowDataPacket;

export const getAllMascotas = async (): Promise<Mascota[]> => {
  const [rows] = await pool.query<MascotaRow[]>(`
    SELECT m.id, m.name, m.race, m.birthdate, m.propietario_id
    FROM mascotas m
    `);
  return rows;
};

export const createMascota = async (data: Mascota): Promise<void> => {
  const { name, race, birthdate, propietario_id } = data;

  await pool.query(
    'INSERT INTO mascotas (name, race, birthdate, propietario_id) VALUES (?, ?, ?, ?)',
    [name, race, birthdate, propietario_id]
  );
};

export const getMascotaById = async (id: number): Promise<Mascota | null> => {
  const [rows] = await pool.query<MascotaRow[]>(
    'SELECT id, name, race, birthdate, propietario_id FROM mascotas WHERE id = ?',
    [id]
  );
  return rows.length > 0 ? rows[0] : null;
}

export const updateMascota = async (id: number, data: Partial<Mascota>): Promise<void> => {
  const { name, race, birthdate, propietario_id } = data;
  await pool.query(
    'UPDATE mascotas SET name = ?, race = ?, birthdate = ?, propietario_id = ? WHERE id = ?',
    [name, race, birthdate, propietario_id, id]
  );
};  

export const deleteMascota = async (id: number): Promise<void> => {
  await pool.query('DELETE FROM mascotas WHERE id = ?', [id]);
};  