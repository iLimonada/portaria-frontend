import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, TextInput, FlatList, View, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Importações dos arquivos organizados (Adicionado o Login aqui)
import { Morador } from './src/types/morador';
import { buscarMoradores } from './src/services/api';
import { CardMorador } from './src/components/CardMorador';
import CadastroMorador from './src/components/CadastroMorador';
import Login from './src/components/Login'; // <--- IMPORTAÇÃO DA SUA NOVA TELA

export default function App() {
  // --- NOVO ESTADO: Guardião do Token JWT ---
  const [token, setToken] = useState<string | null>(null);

  const [pesquisaMorador, setPesquisaMorador] = useState<string>('');
  const [listaMoradores, setListaMoradores] = useState<Morador[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [atualizando, setAtualizando] = useState<boolean>(false);
  const [telaAtiva, setTelaAtiva] = useState<'lista' | 'cadastro'>('lista');

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

  // AJUSTE: O useEffect agora só dispara as buscas se o operador estiver logado (com token)
  useEffect(() => {
    if (token) {
      carregarDados();
    }
  }, [token, carregarDados]);

  const aoAtualizar = () => {
    setAtualizando(true); 
    carregarDados();      
  };

  const lidarComSucessoCadastro = () => {
    setTelaAtiva('lista'); 
    carregarDados();      
  };

  const moradoresFiltrados = Array.isArray(listaMoradores)
    ? listaMoradores.filter(item => item.Morador?.toLowerCase().includes(pesquisaMorador.toLowerCase()))
    : [];

  // --- CONTROLE DE FLUXO ALTERADO ---
  // Se o token for nulo, barra a visualização e renderiza o seu componente Login.tsx
  if (!token) {
    return <Login onLoginSuccess={(tokenGerado) => setToken(tokenGerado)} />;
  }

  // Se houver um token, o React Native renderiza todo o Dashboard abaixo normalmente
  return (
    <SafeAreaView style={styles.container}>
      
      {/* HEADER DO DASHBOARD COM BOTÃO DE LOGOUT */}
      <View style={styles.headerDashboard}>
        <Text style={styles.title}>Portaria Inteligente</Text>
        <TouchableOpacity style={styles.botaoSair} onPress={() => setToken(null)}>
          <Text style={styles.textSair}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.abasContainer}>
        <TouchableOpacity 
          style={[styles.abaBotao, telaAtiva === 'lista' && styles.abaBotaoAtiva]}
          onPress={() => setTelaAtiva('lista')}
        >
          <Text style={styles.abaTexto}>Lista de Moradores</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.abaBotao, telaAtiva === 'cadastro' && styles.abaBotaoAtiva]}
          onPress={() => setTelaAtiva('cadastro')}
        >
          <Text style={styles.abaTexto}>Cadastrar Morador</Text>
        </TouchableOpacity>
      </View>

      {telaAtiva === 'lista' ? (
        <>
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
        </>
      ) : (
        <CadastroMorador onCadastroSucesso={lidarComSucessoCadastro} />
      )}
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
  headerDashboard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  botaoSair: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F2F2F7',
    borderRadius: 6,
  },
  textSair: {
    color: '#FF3B30',
    fontWeight: 'bold',
    fontSize: 14,
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
  abasContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
  },
  abaBotao: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  abaBotaoAtiva: {
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  abaTexto: {
    fontSize: 15,
    color: '#666',
    fontWeight: '600',
  },
  abaTextoAtivo: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});