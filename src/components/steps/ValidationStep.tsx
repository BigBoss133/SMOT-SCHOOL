import { AppData } from '../../types';

interface Props {
  appData: AppData;
}

export function ValidationStep({ appData }: Props) {
  const getCharCount = (text: string) => text.length;

  const totalCount =
    getCharCount(appData.generatedText.capitolo1) +
    getCharCount(appData.generatedText.capitolo2) +
    getCharCount(appData.generatedText.capitolo3) +
    getCharCount(appData.generatedText.conclusioni);

  const isValid = totalCount >= 15000 && totalCount <= 20000;

  return (
    <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h3>Validazione</h3>
      <p>Controlla che la lunghezza totale sia conforme alle linee guida (15.000 - 20.000 caratteri).</p>

      <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
        <h4>Conteggio Caratteri Totale: {totalCount}</h4>
        <div style={{ color: isValid ? 'green' : 'red', fontWeight: 'bold' }}>
          {isValid ? 'Lunghezza OK!' : 'Lunghezza non conforme. Rivedi i testi nei passaggi precedenti.'}
        </div>
      </div>

      <div>
        <h4>Dettaglio per Capitolo:</h4>
        <ul>
          <li>Capitolo 1: {getCharCount(appData.generatedText.capitolo1)} caratteri</li>
          <li>Capitolo 2: {getCharCount(appData.generatedText.capitolo2)} caratteri</li>
          <li>Capitolo 3: {getCharCount(appData.generatedText.capitolo3)} caratteri</li>
          <li>Conclusioni: {getCharCount(appData.generatedText.conclusioni)} caratteri</li>
        </ul>
      </div>
    </div>
  );
}
