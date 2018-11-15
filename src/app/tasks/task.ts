export class Task {
    id: number;
    nomeTask: string;
    todo: string;
    descrizione: string;
    dataScadenza = '10-10-2099';

    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
  }