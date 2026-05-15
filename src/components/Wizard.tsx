import { useState } from 'react';
import { initialAppData, AppData } from '../types';
import { SetupStep } from './steps/SetupStep';
import { InputDataStep } from './steps/InputDataStep';
import { GenerationStep } from './steps/GenerationStep';
import { ValidationStep } from './steps/ValidationStep';
import { ExportStep } from './steps/ExportStep';

const steps = [
  "Setup: Dati e Contesto",
  "Input Dati: PTOF, RAV, Contesto",
  "Generazione Iterativa",
  "Validazione (Conteggio Caratteri)",
  "Export Documento"
];

export function Wizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [appData, setAppData] = useState<AppData>(initialAppData);

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

  const updateSetupData = (data: Partial<AppData['setup']>) => {
    setAppData(prev => ({ ...prev, setup: { ...prev.setup, ...data } }));
  };

  const updateContextData = (data: Partial<AppData['context']>) => {
    setAppData(prev => ({ ...prev, context: { ...prev.context, ...data } }));
  };

  const updateGeneratedText = (data: Partial<AppData['generatedText']>) => {
    setAppData(prev => ({ ...prev, generatedText: { ...prev.generatedText, ...data } }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <SetupStep data={appData.setup} updateData={updateSetupData} />;
      case 1:
        return <InputDataStep data={appData.context} updateData={updateContextData} />;
      case 2:
        return <GenerationStep appData={appData} updateGeneratedText={updateGeneratedText} />;
      case 3:
        return <ValidationStep appData={appData} />;
      case 4:
        return <ExportStep appData={appData} />;
      default:
        return null;
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
        {renderStep()}
        {currentStep === 0 && (
          <button onClick={checkSidecarHealth} style={{ marginTop: '2rem', padding: '0.5rem 1rem' }}>
            Test Sidecar Connection
          </button>
        )}
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
