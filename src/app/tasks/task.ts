export class Task {
    id: number;
    nomeTask: string;
    todo: string;
    inserito = false;
    fatto = false;
    scaduto = false;
    descrizione: string;
    dataScadenza = new Date();

    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
  }