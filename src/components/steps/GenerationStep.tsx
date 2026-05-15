import React, { useState } from 'react';
import { AppData } from '../../types';

interface Props {
  appData: AppData;
  updateGeneratedText: (data: Partial<AppData['generatedText']>) => void;
}

export function GenerationStep({ appData, updateGeneratedText }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (capitolo: keyof AppData['generatedText']) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://127.0.0.1:8000/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Genera ${capitolo}`,
          context: JSON.stringify(appData) // Invia tutto il contesto
        })
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      updateGeneratedText({ [capitolo]: data.response });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateGeneratedText({ [e.target.name]: e.target.value });
  };

  return (
    <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h3>Generazione Iterativa</h3>
      <p>Genera e revisiona i vari capitoli della relazione.</p>

      {error && <div style={{ color: 'red' }}>Errore: {error}</div>}

      {['capitolo1', 'capitolo2', 'capitolo3', 'conclusioni'].map((cap) => (
        <div key={cap} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '4px' }}>
          <h4>{cap.toUpperCase()}</h4>
          <button onClick={() => handleGenerate(cap as keyof AppData['generatedText'])} disabled={loading}>
            {loading ? 'Generazione in corso...' : `Genera ${cap}`}
          </button>
          <textarea
            name={cap}
            value={appData.generatedText[cap as keyof AppData['generatedText']]}
            onChange={handleChange}
            rows={10}
            style={{ width: '100%', marginTop: '1rem' }}
          />
        </div>
      ))}
    </div>
  );
}
