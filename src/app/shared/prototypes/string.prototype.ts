declare global {
  interface String {
    /// Converte uma string-date "dd/MM/yyyy" para um objeto Date.
    convertToDate(): Date;
    handleLineBreak(): string;
  }
}

String.prototype.convertToDate = function(): Date {
  let d = this.split("/");
  return new Date(d[2] + '/' + d[1] + '/' + d[0]);
}

String.prototype.handleLineBreak = function(): string {
  return this.replaceAll("\r\n", "\n").replaceAll("\n", "\r\n");
}

export {}
