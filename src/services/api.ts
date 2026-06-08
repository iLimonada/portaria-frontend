// src/services/api.ts
import axios from 'axios';
import { Morador } from '../types/morador';// Certifique-se de que esta variável esteja definida no seu arquivo .env

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL, // Altere para a URL do seu backend (IPV4) 
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const realizarLogin = async (username: string, password: string): Promise<string | null> => {
  try {
    const response = await api.post('/login', { username, password });
    const token = response.data.token;

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    return token;
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    return null;
  }
};

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

export type criarMoradorInput = {
  resident_name: string;
  block: string;
  apartment: string;
  relatives?: string;
  cleaner?: string;
};

export const criarMorador = async (novoMorador: criarMoradorInput): Promise<boolean> => {
  try {
    await api.post('/residents', novoMorador);
    return true;
  } catch (error) {
    console.error("Erro ao criar morador:", error);
    return false;
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