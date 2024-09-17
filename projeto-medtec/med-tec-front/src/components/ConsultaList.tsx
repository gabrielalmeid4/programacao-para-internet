import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Styles.css';
import api from '../services/api';

interface Consulta {
  cod_consul: number;
  motivo: string;
  dt_prev_consulta: string;
  dt_consul?: string;
  valor: number;
  status: boolean;
}

const ConsultaList: React.FC = () => {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [nomeBusca, setNomeBusca] = useState('');

  useEffect(() => {
    const fetchConsultas = async () => {
      try {
        const response = await api.get('/consultas');
        setConsultas(response.data);
      } catch (error) {
        setErro('Erro ao buscar consultas');
        console.error(error);
      }
    };

    fetchConsultas();
  }, []);

  const handleBusca = async () => {
    try {
      if (nomeBusca) {
        const consultasBusca = consultas.filter(consulta => consulta.cod_consul === parseInt(nomeBusca) || consulta.motivo.includes((nomeBusca)));
        setConsultas(consultasBusca);
      } else {
        const response = await api.get('/consultas');
        setConsultas(response.data);
      }
    } catch (error) {
      setErro('Erro ao buscar consultas');
      console.error(error);
    }
  };


  return (
    <div className="container">
      <h1>Lista de Consultas</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por nome"
          value={nomeBusca}
          onChange={(e) => setNomeBusca(e.target.value)}
        />
        <button onClick={handleBusca}>Buscar</button>
      </div>
      {erro ? (
        <p className="error">{erro}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Motivo</th>
              <th>Data Prevista</th>
              <th>Data Realizada</th>
              <th>Valor</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {consultas
              .sort((a, b) => a.cod_consul - b.cod_consul)
              .map(consulta => (
                <tr key={consulta.cod_consul}>
                  <td>{consulta.cod_consul}</td>
                  <td>{consulta.motivo}</td>
                  <td>{new Date(consulta.dt_prev_consulta).toLocaleDateString()}</td>
                  <td>{consulta.dt_consul ? new Date(consulta.dt_consul).toLocaleDateString() : 'Pendente'}</td>
                  <td>R${consulta.valor.toFixed(2)}</td>
                  <td>{consulta.status ? 'Concluída' : 'Pendente'}</td>
                  <td>
                    <Link to={`/edit-consulta/${consulta.cod_consul}`}>Editar</Link> |{' '}
                    <Link to={`/delete-consulta/${consulta.cod_consul}`}>Deletar</Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      <div className="add-consulta">
        <Link to="/add-consulta" className="button">
          Adicionar Consulta
        </Link>
      </div>
    </div>
  );
};

export default ConsultaList;
