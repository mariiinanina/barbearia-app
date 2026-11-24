import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { criarAgendamento, editarAgendamento } from './api';

// Se receber "agendamento", está em modo edição. Se não, é um cadastro novo.
export default function FormScreen({ agendamento, onVoltar }) {
  const editando = !!agendamento;

  const [cliente, setCliente] = useState(agendamento?.cliente || '');
  const [servico, setServico] = useState(agendamento?.servico || '');
  const [data, setData] = useState(agendamento?.data || '');
  const [horario, setHorario] = useState(agendamento?.horario || '');
  const [salvando, setSalvando] = useState(false);

  async function salvar() {
    if (!cliente.trim() || !servico.trim() || !data.trim() || !horario.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    const dados = { cliente, servico, data, horario };

    try {
      setSalvando(true);
      if (editando) {
        await editarAgendamento(agendamento._id, dados);
      } else {
        await criarAgendamento(dados);
      }
      onVoltar();
    } catch (erro) {
      Alert.alert('Erro', erro.message);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text style={estilos.titulo}>{editando ? 'Editar agendamento' : 'Novo agendamento'}</Text>

      <Text style={estilos.label}>Cliente</Text>
      <TextInput style={estilos.input} value={cliente} onChangeText={setCliente} placeholder="Nome do cliente" />

      <Text style={estilos.label}>Serviço</Text>
      <TextInput style={estilos.input} value={servico} onChangeText={setServico} placeholder="Ex: Corte, Barba" />

      <Text style={estilos.label}>Data</Text>
      <TextInput style={estilos.input} value={data} onChangeText={setData} placeholder="dd/mm/aaaa" />

      <Text style={estilos.label}>Horário</Text>
      <TextInput style={estilos.input} value={horario} onChangeText={setHorario} placeholder="hh:mm" />

      <TouchableOpacity style={estilos.salvar} onPress={salvar} disabled={salvando}>
        <Text style={estilos.botaoTexto}>{salvando ? 'Salvando...' : 'Salvar'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={estilos.cancelar} onPress={onVoltar}>
        <Text style={estilos.botaoTexto}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: { padding: 16, paddingTop: 50, backgroundColor: '#f2f2f2', flexGrow: 1 },
  titulo: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
  label: { fontSize: 15, fontWeight: 'bold', marginBottom: 4 },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  salvar: { backgroundColor: '#22a55b', padding: 12, borderRadius: 8, marginTop: 8 },
  cancelar: { backgroundColor: '#888', padding: 12, borderRadius: 8, marginTop: 8 },
  botaoTexto: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
});
