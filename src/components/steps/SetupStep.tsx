import React from 'react';
import { AppData } from '../../types';

interface Props {
  data: AppData['setup'];
  updateData: (data: Partial<AppData['setup']>) => void;
}

export function SetupStep({ data, updateData }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ [e.target.name]: e.target.value });
  };

  return (
    <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h3>Dati Anagrafici e Contesto</h3>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label>Nome e Cognome Tirocinante</label>
        <input name="nomeTirocinante" value={data.nomeTirocinante} onChange={handleChange} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label>Università / Percorso (es. 60 CFU)</label>
        <input name="universita" value={data.universita} onChange={handleChange} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label>Scuola Accogliente</label>
        <input name="scuola" value={data.scuola} onChange={handleChange} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label>Tutor Accogliente</label>
        <input name="tutor" value={data.tutor} onChange={handleChange} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label>Classe di Riferimento (es. 3A)</label>
        <input name="classe" value={data.classe} onChange={handleChange} />
      </div>
    </div>
  );
}
