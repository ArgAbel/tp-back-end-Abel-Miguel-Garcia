
import { DuenoData, UpdateDuenoDTO, DuenoResponseDTO, mapToDuenoResponseDTO } from '../models/Dueno.model';
import { Dueno } from '../models/Dueno.model';

export const getAllDuenos = async (): Promise<DuenoResponseDTO[]> => {
  const duenos = await Dueno.find();
  return duenos.map(mapToDuenoResponseDTO);
};

export const getDuenoById = async (
  id: string,
): Promise<DuenoResponseDTO | null> => {
  const dueno = await Dueno.findById(id);
  return dueno ? mapToDuenoResponseDTO(dueno) : null;
};

export const createDueno = async (
  data: DuenoData,
): Promise<DuenoResponseDTO> => {
  const newDueno = new Dueno(data);
  const savedDueno = await newDueno.save();
  return mapToDuenoResponseDTO(savedDueno);
};

export const updateDueno = async (
  id: string,
  data: UpdateDuenoDTO,
): Promise<DuenoResponseDTO | null> => {
  const dueno = await Dueno.findByIdAndUpdate(id, data, {
    new: true,
  });

  return dueno ? mapToDuenoResponseDTO(dueno) : null;
};

export const removeDueno = async (
  id: string,
): Promise<DuenoResponseDTO | null> => {
  const dueno = await Dueno.findByIdAndDelete(id);
  return dueno ? mapToDuenoResponseDTO(dueno) : null;
};