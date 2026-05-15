import React from 'react';
import { AppData } from '../../types';

interface Props {
  data: AppData['context'];
  updateData: (data: Partial<AppData['context']>) => void;
}

export function InputDataStep({ data, updateData }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateData({ [e.target.name]: e.target.value });
  };

  return (
    <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h3>Informazioni di Contesto (PTOF, RAV, etc.)</h3>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label>Note sul PTOF (Piano Triennale dell'Offerta Formativa)</label>
        <textarea rows={4} name="ptof" value={data.ptof} onChange={handleChange} placeholder="Inserisci i punti chiave del PTOF..." />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label>Note sul RAV (Rapporto di Autovalutazione)</label>
        <textarea rows={4} name="rav" value={data.rav} onChange={handleChange} placeholder="Inserisci le criticità/obiettivi del RAV..." />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label>Note sull'Osservazione in Classe</label>
        <textarea rows={4} name="osservazione" value={data.osservazione} onChange={handleChange} placeholder="Dinamiche relazionali, clima d'aula..." />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label>Metodologie Didattiche Osservate</label>
        <textarea rows={4} name="metodologie" value={data.metodologie} onChange={handleChange} placeholder="Cooperative learning, lezione frontale, etc." />
      </div>
    </div>
  );
}
