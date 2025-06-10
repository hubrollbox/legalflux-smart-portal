import React from 'react';

interface Modelo {
  nome: string;
  url: string;
}

interface ModelosJuridicosProps {
  modelos: Modelo[];
}

const ModelosJuridicos: React.FC<ModelosJuridicosProps> = ({ modelos }) => (
  <div className="bg-gray-50 border rounded p-4 mt-4">
    <h4 className="font-semibold mb-2 text-primary-800">Modelos Jurídicos</h4>
    <ul className="text-sm text-gray-700 space-y-1">
      {modelos.map((modelo, idx) => (
        <li key={idx}>
          <a href={modelo.url} download className="text-primary-700 hover:underline">{modelo.nome}</a>
        </li>
      ))}
    </ul>
  </div>
);

export default ModelosJuridicos;
