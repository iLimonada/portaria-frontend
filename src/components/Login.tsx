import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { realizarLogin } from '../services/api';

interface LoginProps {
    onLoginSuccess: (token: string) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [carregando, setCarregando] = useState(false);

    const lidarLogin = async () => {
        if (!usuario || !senha) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        setCarregando(true);
        const tokenGerado = await realizarLogin(usuario, senha);
        setCarregando(false);

        if (tokenGerado) {
            onLoginSuccess(tokenGerado);
        } else {
            Alert.alert('Erro', 'Usuário ou senha inválidos. Tente novamente.');
        }
    };

    return (
    <View style={styles.containerLogin}>
      <StatusBar style="light" />
      <View style={styles.cardLogin}>
        <Text style={styles.titleLogin}>Portaria Inteligente 🔒</Text>
        <Text style={styles.subtitleLogin}>Controle de Acesso Restrito</Text>

        <Text style={styles.label}>Usuário</Text>
        <TextInput
          style={styles.inputLogin}
          placeholder="Ex: admin"
          value={usuario}
          onChangeText={setUsuario}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.inputLogin}
          placeholder="Digite sua senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity 
          style={[styles.botaoLogin, carregando && styles.botaoDesabilitado]} 
          onPress={lidarLogin}
          disabled={carregando}
        >
          <Text style={styles.textBotaoLogin}>
            {carregando ? 'Autenticando...' : 'Entrar no Sistema'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerLogin: {
    flex: 1,
    backgroundColor: '#1C1C1E', // Dark mode profissional focado em portaria/segurança
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  cardLogin: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  titleLogin: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1C1C1E',
    marginBottom: 6,
  },
  subtitleLogin: {
    fontSize: 14,
    textAlign: 'center',
    color: '#8E8E93',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 5,
  },
  inputLogin: {
    backgroundColor: '#F2F2F7',
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  botaoLogin: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  botaoDesabilitado: {
    backgroundColor: '#A2C8FF',
  },
  textBotaoLogin: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});