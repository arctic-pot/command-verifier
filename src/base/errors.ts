export enum Errors {
  UnknownCommand,
}

class ParseError extends Error {
  code: Errors;

  constructor(code) {
    super();
    this.name = 'ParseError';
    this.message = ''
    this.code = code;
  }
}
