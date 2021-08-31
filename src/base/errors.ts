export enum Errors {
  UnknownCommand,
  ValueOutOfBounds,
}

export class ParseError extends Error {
  code: Errors;

  constructor(code, message = 'General parse error') {
    super();
    this.name = 'ParseError';
    this.message = message;
    this.code = code;
  }
}

export class NBTIntNumberError extends ParseError {
  min: number;
  max: number;

  constructor(min, max) {
    super(
      Errors.ValueOutOfBounds,
      `The value is out of bounds. Minimum value is ${min}, maximum value is ${max}.`
    );
    this.min = min;
    this.max = max;
  }
}
