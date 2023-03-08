declare global {
  interface Date {
    toJSONLocal(): string;
  }
}

Date.prototype.toJSONLocal = function () {
  const hoursDiff = this.getHours() - this.getTimezoneOffset() / 60;
  this.setHours(hoursDiff);

  const d = this.toISOString().replace("T", " ").replace("Z", "").split(".");
  return d[0];
};

function dateWithoutTimezone(dateString: string): Date {
  return new Date(dateString.replace("Z", ""));
}

export { dateWithoutTimezone }
