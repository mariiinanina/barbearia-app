import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import ListaScreen from './src/ListaScreen';
import FormScreen from './src/FormScreen';

export default function App() {
  // tela: 'lista' ou 'form'
  const [tela, setTela] = useState('lista');
  const [selecionado, setSelecionado] = useState(null);

  function abrirNovo() {
    setSelecionado(null);
    setTela('form');
  }

  function abrirEdicao(item) {
    setSelecionado(item);
    setTela('form');
  }

  function voltar() {
    setSelecionado(null);
    setTela('lista');
  }

  return (
    <>
      <StatusBar style="dark" />
      {tela === 'lista' ? (
        <ListaScreen onNovo={abrirNovo} onEditar={abrirEdicao} />
      ) : (
        <FormScreen agendamento={selecionado} onVoltar={voltar} />
      )}
    </>
  );
}
