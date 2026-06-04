// src/components/CardMorador.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Morador } from '../types/morador';
import { deletarMorador } from '../services/api';
import { Ionicons } from '@expo/vector-icons';

interface CardMoradorProps {
  item: Morador;
  onDeletarSucesso: () => void;
}

export function CardMorador({ item, onDeletarSucesso }: CardMoradorProps) {
  
  const handleExcluir = () => {
    if (!item.id) {
      Alert.alert("Erro", "Não é possível deletar um morador sem ID.");
      return;
    }

    Alert.alert(
      "Confirmar Exclusão",
      `Tem certeza que deseja remover ${item.Morador}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Excluir", 
          style: "destructive", 
          onPress: async () => {
            const sucesso = await deletarMorador(item.id!);
            if (sucesso) {
              Alert.alert("Sucesso", "Morador removido com sucesso!");
              onDeletarSucesso(); // Recarrega a lista na tela principal
            } else {
              Alert.alert("Erro", "Não foi possível remover o morador.");
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Text style={styles.nome}>{item.Morador}</Text>
        <Text style={styles.detalhe}>Bloco: {item.Bloco} | AP: {item.Apartamento}</Text>
        {item.Parentes ? <Text style={styles.detalhe}>Parentes: {item.Parentes}</Text> : null}
        {item.Faxineira ? <Text style={styles.detalhe}>Faxineira: {item.Faxineira}</Text> : null}
      </View>

      <TouchableOpacity style={styles.botaoDeletar} onPress={handleExcluir}>
        <Ionicons name="trash-outline" size={24} color="#ff4444" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  infoContainer: {
    flex: 1,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  detalhe: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  botaoDeletar: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});