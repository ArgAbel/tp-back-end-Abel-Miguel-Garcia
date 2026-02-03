
import { DuenoData, User, UpdateDuenoDTO, DuenoResponseDTO, mapToDuenoResponseDTO, IDueno } from '../models/Dueno.model';

export const getAllDuenos = async (): Promise<DuenoResponseDTO[]> => {
  const duenos = await User.find();
  return duenos.map(mapToDuenoResponseDTO);
};

export const getDuenoById = async (
  id: string,
): Promise<DuenoResponseDTO | null> => {
  const dueno = await User.findById(id);
  return dueno ? mapToDuenoResponseDTO(dueno) : null;
};

export const createDueno = async (
  data: DuenoData,
): Promise<DuenoResponseDTO> => {
  const newDueno = new User(data);
  const savedDueno = await newDueno.save();
  return mapToDuenoResponseDTO(savedDueno);
};

export const updateDueno = async (
  id: string,
  data: UpdateDuenoDTO,
): Promise<DuenoResponseDTO | null> => {
  const dueno = await User.findByIdAndUpdate(id, data, {
    new: true,
  });

  return dueno ? mapToDuenoResponseDTO(dueno) : null;
};

export const removeDueno = async (
  id: string,
): Promise<DuenoResponseDTO | null> => {
  const dueno = await User.findByIdAndDelete(id);
  return dueno ? mapToDuenoResponseDTO(dueno) : null;
};