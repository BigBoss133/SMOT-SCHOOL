export interface AppData {
  setup: {
    nomeTirocinante: string;
    universita: string;
    scuola: string;
    tutor: string;
    classe: string;
  };
  context: {
    ptof: string;
    rav: string;
    pdm: string;
    osservazione: string;
    metodologie: string;
  };
  generatedText: {
    capitolo1: string;
    capitolo2: string;
    capitolo3: string;
    conclusioni: string;
  };
}

export const initialAppData: AppData = {
  setup: {
    nomeTirocinante: '',
    universita: '',
    scuola: '',
    tutor: '',
    classe: '',
  },
  context: {
    ptof: '',
    rav: '',
    pdm: '',
    osservazione: '',
    metodologie: '',
  },
  generatedText: {
    capitolo1: '',
    capitolo2: '',
    capitolo3: '',
    conclusioni: '',
  }
};
