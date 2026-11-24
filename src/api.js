import { API_URL } from './config';

async function requisicao(caminho, opcoes = {}) {
  const resposta = await fetch(`${API_URL}${caminho}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opcoes,
  });
  const dados = await resposta.json();
  if (!resposta.ok) {
    throw new Error(dados.erro || 'Erro na requisição');
  }
  return dados;
}

export const listarAgendamentos = () => requisicao('/agendamentos');

export const criarAgendamento = (agendamento) =>
  requisicao('/agendamentos', { method: 'POST', body: JSON.stringify(agendamento) });

export const editarAgendamento = (id, agendamento) =>
  requisicao(`/agendamentos/${id}`, { method: 'PUT', body: JSON.stringify(agendamento) });

export const excluirAgendamento = (id) =>
  requisicao(`/agendamentos/${id}`, { method: 'DELETE' });
