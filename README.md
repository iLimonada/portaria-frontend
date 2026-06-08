# Portaria Inteligente - Mobile App 🚗📱

Aplicativo mobile nativo para gerenciamento e controle de acesso de moradores em condomínios. Desenvolvido em React Native com Expo, o app consome de forma assíncrona uma API RESTful para realizar operações em tempo real.

---

## 🚀 Funcionalidades

- **Busca em Tempo Real:** Filtragem instantânea de moradores por nome diretamente na barra de pesquisa.
- **Pull-to-Refresh:** Atualização dinâmica da lista arrastando a tela para baixo, sincronizando os dados com o servidor local.
- **Exclusão de Registros (CRUD):** Botão de lixeira integrado em cada card com alerta de confirmação nativo, removendo o morador do banco de dados imediatamente.

---

## 🛠️ Tecnologias Utilizadas

- **React Native & Expo Go:** Desenvolvimento da interface nativa cross-platform.
- **TypeScript:** Tipagem estática para maior segurança e previsibilidade do código.
- **Axios:** Gerenciamento de requisições HTTP assíncronas.
- **Expo Vector Icons:** Componentização de ícones na interface.

---

## 🔧 Como Executar Localmente

### 1. Pré-requisitos

Certifique-se de ter o **Node.js** instalado na sua máquina e o aplicativo **Expo Go** no seu celular.

### 2. Instalação

Clone o repositório, entre na pasta do projeto e instale as dependências:

```bash
cd AppPortaria
npm install
```

### 3. Configuração das Variáveis de Ambiente (.env)

Por questões de segurança, as chaves e IPs não são enviados ao repositório. Crie um arquivo chamado `.env` na raiz do projeto e configure a URL base apontando para o IP do seu backend:

```env
EXPO_PUBLIC_API_URL=http://SEU_IP_LOCAL:8000
```

### 4. Inicialização

Inicie o servidor do Expo limpando o cache para carregar a variável de ambiente:

```bash
npx expo start --clear
```

## 🔗 Repositório do Backend
O ecossistema deste projeto depende da API desenvolvida em Python. Acesse a documentação e os arquivos do servidor em: 
[https://github.com/iLimonada/portaria-backend](https://github.com/iLimonada/portaria-backend)
