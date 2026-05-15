import { useState } from 'react';
import { AppData } from '../../types';

interface Props {
  appData: AppData;
}

export function ExportStep({ appData }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://127.0.0.1:8000/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appData)
      });
      if (!response.ok) throw new Error('Network response was not ok');

      // Assumiamo che il backend ritorni un URL per scaricare il file o direttamente il blob
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'relazione.docx'; // O pdf
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem' }}>
      <h3>Export Documento</h3>
      <p>La tua relazione è pronta! Clicca il pulsante qui sotto per scaricarla.</p>

      {error && <div style={{ color: 'red' }}>Errore: {error}</div>}

      <button onClick={handleExport} disabled={loading} style={{ padding: '1rem', fontSize: '1.2rem' }}>
        {loading ? 'Esportazione in corso...' : 'Scarica Relazione'}
      </button>
    </div>
  );
}
