import { NextFunction, Request, Response } from 'express';
import * as duenoService from '../services/dueno.service';
import { DuenoData, UpdateDuenoDTO,} from '../models/Dueno.model';


export const getAll = async (_req: Request, res: Response) => {
  try {
    const duenos = await duenoService.getAllDuenos();
    return res.status(200).json(duenos);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener los dueños' });
  }
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  try {
    const dueno = await duenoService.getDuenoById(id);
    if (!dueno) {
      return res.status(404).json({ mensaje: 'Dueño no encontrado' });
    }
    return res.status(200).json(dueno);
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: `Error al obtener el dueño ${id}` });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const duenoData: DuenoData = req.body;

    console.log('duenoData', duenoData);

    console.log('Datos recibidos para crear dueño:', duenoData);
    const newDueno = await duenoService.createDueno(duenoData);
    return res.status(201).json(newDueno);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al crear el dueño' });
  }}

  export const update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params as { id: string };
  
      const duenoData: UpdateDuenoDTO = req.body;
      const updatedDueno = await duenoService.updateDueno(
        id,
        duenoData   ,
      );
  
      if (!updatedDueno) {
        return res.status(404).json({ mensaje: 'Dueño no encontrado' });
      }
      return res.status(200).json(updatedDueno);
    } catch (error: any) {
      // Manejo específico para error de clave duplicada
      if (error.code === 11000) {
        return res
          .status(400)
          .json({ mensaje: 'El nombre del dueño ya existe' });
      }
  
      return res
        .status(500)
        .json({ mensaje: 'Error al actualizar el dueño' });
    }
  };
  
  export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const deletedDueno = await duenoService.removeDueno(id);
    if (!deletedDueno) {
      return res.status(404).json({ mensaje: 'Dueño no encontrado' });
    }
    return res
      .status(200)
      .json({ mensaje: `Dueño con ID ${id} eliminado exitosamente` });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al eliminar el dueño' });
  }
};