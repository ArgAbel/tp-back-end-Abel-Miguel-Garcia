import { NextFunction, Request, Response } from 'express';
import * as veterinarioService from '../services/veterinario.service';
import { VeterinarioData, VeterinarioResponseDTO,} from '../models/Veterinario.model';

export const getAll = async (_req: Request, res: Response) => {
  try {
    const veterinarios = await veterinarioService.getAllVeterinarios();
    return res.status(200).json(veterinarios);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener los veterinarios' });
  }
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  try {
    const veterinario = await veterinarioService.getVeterinarioById(id);
    if (!veterinario) {
      return res.status(404).json({ mensaje: 'Veterinario no encontrado' });
    }
    return res.status(200).json(veterinario);
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: `Error al obtener el veterinario ${id}` });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const veterinarioData: VeterinarioData = req.body;
    const newVeterinario = await veterinarioService.createVeterinario(veterinarioData);
    return res.status(201).json(newVeterinario);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al crear el veterinario' });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };

    const veterinarioData = req.body as Partial<VeterinarioData>;
    const updatedVeterinario = await veterinarioService.updateVeterinario(
      id,
      veterinarioData,
    );

    if (!updatedVeterinario) {
      return res.status(404).json({ mensaje: 'Veterinario no encontrado' });
    }
    return res.status(200).json(updatedVeterinario);
  } catch (error: any) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ mensaje: 'El nombre del veterinario ya existe' });
    }

    return res
      .status(500)
      .json({ mensaje: 'Error al actualizar el veterinario' });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const deletedVeterinario = await veterinarioService.removeVeterinario(id);
    if (!deletedVeterinario) {
      return res.status(404).json({ mensaje: 'Veterinario no encontrado' });
    }
    return res
      .status(200)
      .json({ mensaje: `Veterinario con ID ${id} eliminado exitosamente` });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al eliminar el veterinario' });
  }
};
