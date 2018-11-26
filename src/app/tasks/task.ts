export class Task {
    id: number;
    nomeTask: string;
    todo: string;
    inserito = false;
    fatto : boolean;
    scaduto = false;
    descrizione: string;
    dataScadenza = new Date();

    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
  }