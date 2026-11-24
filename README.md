# Barbearia Agenda - App (Frontend)

Aplicativo mobile em **React Native (Expo)** para gerenciar os agendamentos de uma barbearia.
Faz o **CRUD completo** (cadastrar, listar, editar e excluir) consumindo a API do repositório
**barbearia-api** (Node.js + Express + Mongoose).

## Telas
- **Lista**: mostra os agendamentos, com botões *Editar* e *Excluir* (com confirmação) e puxar para atualizar.
- **Formulário**: usado para cadastrar um novo agendamento ou editar um existente.

## Pré-requisitos
- [Node.js](https://nodejs.org) 18 ou superior
- App **Expo Go** no celular (Android/iOS) ou um emulador
- **Backend rodando** (veja o README do repositório `barbearia-api`)
- Celular e computador na **mesma rede Wi-Fi**

## Como rodar
```bash
git clone <URL-DESTE-REPOSITORIO>
cd barbearia-app
npm install
```

### 1) Configure o endereço da API
Abra `src/config.js` e coloque o endereço do seu backend:

```js
export const API_URL = 'http://192.168.0.15:3000';
```

| Onde está rodando o app  | Valor de `API_URL`                              |
|--------------------------|-------------------------------------------------|
| Celular físico (Expo Go) | `http://IP-DO-SEU-PC:3000` (veja com `ipconfig` no Windows ou `ifconfig` no Linux/Mac) |
| Emulador Android         | `http://10.0.2.2:3000`                          |
| Simulador iOS            | `http://localhost:3000`                         |

### 2) Inicie o app
```bash
npx expo start
```
Leia o QR Code com o Expo Go (Android) ou com a câmera (iOS).

## Estrutura
```
barbearia-app/
├── App.js                 # controla qual tela aparece
├── src/
│   ├── config.js          # URL da API
│   ├── api.js             # funções que chamam o backend (fetch)
│   ├── ListaScreen.js     # listar + excluir
│   └── FormScreen.js      # cadastrar + editar
└── package.json
```

## Tecnologias
React Native, Expo, fetch API.
