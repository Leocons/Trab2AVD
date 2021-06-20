import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import { Container, Header, Content, Ficha, Data } from './styles';

interface PropsClientes {
	id: string;
	cliente: string;
	telefone: string;
	email: string;
}

export const Home: React.FC = () => {
	const [clientes, setClientes] = useState<PropsClientes[]>([]);
	const [id, setId] = useState('');
	const [cliente, setCliente] = useState('');
	const [telefone, setTelefone] = useState('');
	const [email, setEmail] = useState('');

	useEffect(() => {
		api.get('/clients').then((response) => setClientes(response.data));
	}, []);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const { target } = e;

		const cadastroCliente = {
			cliente: target.cliente.value,
			telefone: target.telefone.value,
			email: target.email.value,
		};

		if (id) {
			await api.put(`/clients/${id}`, cadastroCliente);
		} else {
			await api.post('/clients', cadastroCliente);
		}
		api.get('/clients').then((response) => setClientes(response.data));

		setCliente('');
		setTelefone('');
		setEmail('');
		target.reset();
	};

	const handleDelete = async (id: string) => {
		await api.delete(`/clients/${id}`);
		api.get('/clients').then((response) => setClientes(response.data));
	};

	const handleEdit = (id: string) => {
		async function loadData() {
			const dados = await api
				.get(`/clients/${id}`)
				.then((response) => response.data);
			console.log(dados);
			if (dados) {
				setId(dados.id);
				setCliente(dados.cliente);
				setTelefone(dados.telefone);
				setEmail(dados.email);
			} else {
				setClientes([]);
			}
		}
		loadData();
	};
	return (
		<Container>
			<Header>
				<h1>Cadastro de Clientes</h1>
			</Header>
			<Content>
				<Ficha onSubmit={handleSubmit}>
					<h2>Preencha os dados de cadastro abaixo</h2>
					<div>
						<label>Nome completo:</label>
						<input
							type='text'
							name='cliente'
							value={cliente}
							onChange={(e) => setCliente(e.target.value)}
							required
						/>
					</div>
					<div>
						<label>Telefone:</label>
						<input
							type='text'
							name='telefone'
              value={telefone}
							onChange={(e) => setTelefone(e.target.value)}
							required
						/>
					</div>
					<div>
						<label>Email:</label>
						<input
							type='email'
							name='email'
              value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<button type='submit'>Salvar</button>
				</Ficha>
			</Content>
			<Content>
				<h2>Cadastros Realizados</h2>
        {!clientes && (
          <span className='noData'>Não há cadastros!</span>
        )}
				{clientes.map((cliente, indice) => (
					<Data key={indice}>
						<div className='leftData' id={cliente.id}>
							<div>
								<label>Nome completo:</label>
								<span>{cliente.cliente}</span>
							</div>
							<div>
								<label>Telefone:</label>
								<span>{cliente.telefone}</span>
							</div>
							<div>
								<label>Email:</label>
								<span>{cliente.email}</span>
							</div>
						</div>
						<div className='rightData'>
							<button type='button' onClick={() => handleEdit(cliente.id)}>
								Alterar
							</button>
							<button type='button' onClick={() => handleDelete(cliente.id)}>
								Excluir
							</button>
						</div>
					</Data>
				))}
			</Content>
		</Container>
	);
};
