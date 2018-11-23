export class Task {
    id: number;
    nomeTask: string;
    todo: string;
    inserito = false;
    fatto = false;
    scaduto = false;
    descrizione: string;
    dataScadenza = Date;

    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
  }