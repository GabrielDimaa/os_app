declare global {
  interface String {
    /// Converte uma string-date "dd/MM/yyyy" para um objeto Date.
    convertToDate(): Date;
  }
}

String.prototype.convertToDate = function(): Date {
  let d = this.split("/");
  return new Date(d[2] + '/' + d[1] + '/' + d[0]);
}

export {}
