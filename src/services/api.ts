// src/services/api.ts
import axios from 'axios';
import { Morador } from '../types/morador';

const api = axios.create({
  baseURL: 'http://192.168.0.32:8000', // Altere para a URL do seu backend
  timeout: 5000, // Tempo limite para requisições
  headers: {
    'Content-Type': 'application/json',
  },
});

export const buscarMoradores = async (): Promise<Morador[]> => {
  try {
    const response = await api.get('/residents');

    return response.data.map((res: any) => ({
      id: res.id,
      Morador: res.resident_name,
      Bloco: res.block,
      Apartamento: res.apartment,
      Parentes: res.relatives || '',
      Faxineira: res.cleaner || ''
    }));
  } catch (error) {
    console.error("Erro ao buscar os dados do servidor:", error);
    return [];
  }
};

export const deletarMorador = async (id: number): Promise<boolean> => {
  try {
    await api.delete(`/residents/${id}`);
    return true;
  } catch (error) {
    console.error("Erro ao deletar morador:", error);
    return false;
  }
};