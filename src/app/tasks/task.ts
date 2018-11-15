export class Task {
    id: number;
    nomeTask: string;
    todo: string;
    inserito: boolean;
    fatto: boolean;
    scaduto: boolean;
    descrizione: string;
    dataScadenza = Date;

    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
  }