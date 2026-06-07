import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { criarMorador, criarMoradorInput } from '../services/api';

export default function CadastroMorador({ onCadastroSucesso }: { onCadastroSucesso: () => void }) {
    const [nome, setNome] = useState('');
    const [bloco, setBloco] = useState('');
    const [apartamento, setApartamento] = useState('');
    const [parentes, setParentes] = useState('');
    const [faxineira, setFaxineira] = useState('');
    const [carregando, setCarregando] = useState(false);

    const lidarCadastro = async () => {
        if (!nome || !bloco || !apartamento) {
            Alert.alert('Erro', 'Por favor, preencha os campos obrigatórios.');
            return;
        }
        setCarregando(true);

        const dadosMorador: criarMoradorInput = {
            resident_name: nome,
            block: bloco,
            apartment: apartamento,
            relatives: parentes,
            cleaner: faxineira
        };

        const cadastroRealizado = await criarMorador(dadosMorador);

        setCarregando(false);

        if (cadastroRealizado) {
            Alert.alert('Sucesso', 'Morador cadastrado com sucesso!');
            setNome('');
            setBloco('');
            setApartamento('');
            setParentes('');
            setFaxineira('');
            onCadastroSucesso();

            if (onCadastroSucesso) onCadastroSucesso();
        } else {
            Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o morador. Tente novamente ou verifique a conexão.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.titulo}>Cadastro de Morador</Text>

            <Text style={styles.label}>Nome do Morador *</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite o nome do morador"
                value={nome}
                onChangeText={setNome}
            />

            <View style={styles.row}>
                <View style={styles.flex1}>
                    <Text style={styles.label}>Bloco *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o bloco"
                        value={bloco}
                        onChangeText={setBloco}
                    />
                </View>
                <View style={[styles.flex1, { marginLeft: 10 }]}>
                    <Text style={styles.label}>Apartamento *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o apartamento"
                        value={apartamento}
                        onChangeText={setApartamento}
                    />
                </View>
            </View>

                <Text style={styles.label}>Parentes / Dependentes (Opcional)</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Ex: Maria (Esposa), Pedro (Filho)" 
                        value={parentes} 
                        onChangeText={setParentes} 
                    />

                    <Text style={styles.label}>Nome da Faxineira (Opcional)</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Ex: Solange Souza" 
                        value={faxineira} 
                        onChangeText={setFaxineira} 
                    />

                    <TouchableOpacity 
                        style={[styles.botao, carregando && styles.botaoDesabilitado]} 
                        onPress={lidarCadastro}
                        disabled={carregando}
                    >
                        <Text style={styles.textBotao}>{carregando ? "Cadastrando..." : "Salvar Morador"}</Text>
                    </TouchableOpacity>
            </ScrollView>
        );
    }

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flex1: {
    flex: 1,
  },
  botao: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
    minHeight: 50,
    justifyContent: 'center'
  },
  botaoDesabilitado: {
    backgroundColor: '#aaa',
  },
  textBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});