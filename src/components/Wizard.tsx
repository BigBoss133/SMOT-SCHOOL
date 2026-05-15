import { useState } from 'react';

const steps = [
  "Setup: Dati e Contesto",
  "Input Dati: PTOF, RAV, Contesto",
  "Generazione Iterativa",
  "Validazione (Conteggio Caratteri)",
  "Export PDF"
];

export function Wizard() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const checkSidecarHealth = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/health');
      const data = await response.json();
      alert(`Sidecar is running! Status: ${data.status}`);
    } catch (e) {
      alert('Error connecting to sidecar: ' + e);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h1>SMOT SCHOOL</h1>
      <h2>Step {currentStep + 1}: {steps[currentStep]}</h2>

      <div style={{ margin: '2rem 0', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <p>
          Contenuto mock per lo step <strong>{steps[currentStep]}</strong>.
          Qui andranno i form di input o la UI di generazione agentica.
        </p>
        <button onClick={checkSidecarHealth} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
          Test Sidecar Connection
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          style={{ padding: '0.5rem 1rem' }}
        >
          Indietro
        </button>
        <button
          onClick={nextStep}
          disabled={currentStep === steps.length - 1}
          style={{ padding: '0.5rem 1rem' }}
        >
          Avanti
        </button>
      </div>
    </div>
  );
}
