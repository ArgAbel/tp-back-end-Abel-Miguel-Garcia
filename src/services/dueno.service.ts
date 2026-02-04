
import * as veterinarioService from './veterinario.service';

export const getAllDuenos = async () => veterinarioService.getAllVeterinarios();
export const getDuenoById = async (id: string) => veterinarioService.getVeterinarioById(id);
export const createDueno = async (data: any) => veterinarioService.createVeterinario(data);
export const updateDueno = async (id: string, data: any) => veterinarioService.updateVeterinario(id, data);
export const removeDueno = async (id: string) => veterinarioService.removeVeterinario(id);