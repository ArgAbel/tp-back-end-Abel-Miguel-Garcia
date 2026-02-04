import { Veterinario, VeterinarioData, VeterinarioResponseDTO, mapToVeterinarioResponseDTO } from '../models/Veterinario.model';

export const getAllVeterinarios = async (): Promise<VeterinarioResponseDTO[]> => {
  const veterinarios = await Veterinario.find();
  console.log('Veterinarios encontrados en DB:', veterinarios);
  return veterinarios.map(mapToVeterinarioResponseDTO);
};

export const getVeterinarioById = async (
  id: string,
): Promise<VeterinarioResponseDTO | null> => {
  const veterinario = await Veterinario.findById(id);
  return veterinario ? mapToVeterinarioResponseDTO(veterinario) : null;
};

export const createVeterinario = async (
  data: VeterinarioData,
): Promise<VeterinarioResponseDTO> => {
  const newVeterinario = new Veterinario(data);
  const savedVeterinario = await newVeterinario.save();
  return mapToVeterinarioResponseDTO(savedVeterinario);
};

export const updateVeterinario = async (
  id: string,
  data: Partial<VeterinarioData>,
): Promise<VeterinarioResponseDTO | null> => {
  const veterinario = await Veterinario.findByIdAndUpdate(id, data, {
    new: true,
  });

  return veterinario ? mapToVeterinarioResponseDTO(veterinario) : null;
};

export const removeVeterinario = async (
  id: string,
): Promise<VeterinarioResponseDTO | null> => {
  const veterinario = await Veterinario.findByIdAndDelete(id);
  return veterinario ? mapToVeterinarioResponseDTO(veterinario) : null;
};
