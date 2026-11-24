import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { excluirAgendamento, listarAgendamentos } from './api';

export default function ListaScreen({ onNovo, onEditar }) {
  const [agendamentos, setAgendamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const carregar = useCallback(async () => {
    try {
      setCarregando(true);
      const dados = await listarAgendamentos();
      setAgendamentos(dados);
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível carregar os agendamentos.\n' + erro.message);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  function confirmarExclusao(item) {
    Alert.alert('Excluir', `Excluir o agendamento de ${item.cliente}?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await excluirAgendamento(item._id);
            carregar();
          } catch (erro) {
            Alert.alert('Erro', erro.message);
          }
        },
      },
    ]);
  }

  function renderItem({ item }) {
    return (
      <View style={estilos.card}>
        <Text style={estilos.cliente}>{item.cliente}</Text>
        <Text style={estilos.texto}>Serviço: {item.servico}</Text>
        <Text style={estilos.texto}>
          {item.data} às {item.horario}
        </Text>
        <View style={estilos.botoes}>
          <TouchableOpacity style={[estilos.botao, estilos.editar]} onPress={() => onEditar(item)}>
            <Text style={estilos.botaoTexto}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[estilos.botao, estilos.excluir]}
            onPress={() => confirmarExclusao(item)}
          >
            <Text style={estilos.botaoTexto}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Barbearia Agenda</Text>

      <TouchableOpacity style={estilos.novo} onPress={onNovo}>
        <Text style={estilos.novoTexto}>+ Novo agendamento</Text>
      </TouchableOpacity>

      {carregando ? (
        <ActivityIndicator size="large" color="#e8832a" style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          data={agendamentos}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          refreshing={carregando}
          onRefresh={carregar}
          ListEmptyComponent={<Text style={estilos.vazio}>Nenhum agendamento cadastrado.</Text>}
        />
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 50, backgroundColor: '#f2f2f2' },
  titulo: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 },
  novo: { backgroundColor: '#e8832a', padding: 12, borderRadius: 8, marginBottom: 12 },
  novoTexto: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
  card: { backgroundColor: '#fff', padding: 14, borderRadius: 8, marginBottom: 10 },
  cliente: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  texto: { fontSize: 15, color: '#333' },
  botoes: { flexDirection: 'row', marginTop: 10, gap: 8 },
  botao: { flex: 1, padding: 8, borderRadius: 6 },
  editar: { backgroundColor: '#3b82f6' },
  excluir: { backgroundColor: '#ef4444' },
  botaoTexto: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  vazio: { textAlign: 'center', marginTop: 30, color: '#777' },
});
