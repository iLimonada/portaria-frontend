import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, TextInput, FlatList, View, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Importações dos nossos novos arquivos organizados
import { Morador } from './src/types/morador';
import { buscarMoradores } from './src/services/api';
import { CardMorador } from './src/components/CardMorador';

export default function App() {
  const [pesquisaMorador, setPesquisaMorador] = useState<string>('');
  const [listaMoradores, setListaMoradores] = useState<Morador[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [atualizando, setAtualizando] = useState<boolean>(false); 

  const carregarDados = useCallback(async () => {
    try {
      const dados = await buscarMoradores();
      setListaMoradores(dados);
    } catch (erro) {
      console.error("Erro ao carregar moradores:", erro);
      setListaMoradores([]);
    } finally {
      setCarregando(false);  
      setAtualizando(false); 
    }
  }, []);

  
  useEffect(() => {
    carregarDados();
  }, [carregarDados]);


  const aoAtualizar = () => {
    setAtualizando(true); 
    carregarDados();      
  };

  const moradoresFiltrados = Array.isArray(listaMoradores)
    ? listaMoradores.filter(item => item.Morador?.toLowerCase().includes(pesquisaMorador.toLowerCase()))
    : [];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Portaria Inteligente</Text>

      <TextInput 
        style={styles.inputPesquisa}
        placeholder="Digite o nome do morador"
        value={pesquisaMorador}
        onChangeText={setPesquisaMorador}
      />

      <FlatList 
        data={moradoresFiltrados}
        keyExtractor={(item, index) => item.Apartamento + item.Bloco + index}
        renderItem={({ item }) => <CardMorador item={item} onDeletarSucesso={carregarDados} />}
        
        
        refreshControl={
          <RefreshControl 
            refreshing={atualizando} 
            onRefresh={aoAtualizar}  
            colors={['#007AFF']}     
            tintColor="#007AFF"      
          />
        }

        ListEmptyComponent={
          carregando ? (
            <View style={{ marginTop: 30 }}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={{ textAlign: 'center', color: '#999', marginTop: 10 }}>
                Carregando dados da portaria...
              </Text>
            </View>
          ) : (
            <Text style={{ textAlign: 'center', color: '#ff4444', marginTop: 20 }}>
              Nenhum morador encontrado com esse nome.
            </Text>
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputPesquisa: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    borderColor: '#DDD',
    borderWidth: 1,
    marginBottom: 16,
  },
});