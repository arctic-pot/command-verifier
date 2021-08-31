import { NBTIntNumberError } from '../../base/errors';
import NBTTypes = NBT.NBTTypes;

export namespace NBT {
  export class TagString {
    public value: string;

    public constructor(value: string) {
      this.value = value;
    }
  }

  abstract class IntNumber {
    public static readonly MAX_VALUE: number;
    public static readonly MIN_VALUE: number;
    public value: number;
    protected constructor(value: string | number, min: number, max: number) {
      this.value = typeof value === 'number' ? value : parseInt(value);
      if (this.value > max || this.value < min) {
        throw new NBTIntNumberError(min, max);
      }
    }
  }

  abstract class FloatNumber {
    public value: string;
  }

  export class TagByte extends IntNumber {
    public static readonly MAX_VALUE = 255;
    public static readonly MIN_VALUE = -256;
    public value: number;

    public constructor(value: string | number) {
      super(value, TagByte.MIN_VALUE, TagByte.MAX_VALUE);
    }
  }

  export class TagInt extends IntNumber {
    public static readonly MAX_VALUE = 2147483647;
    public static readonly MIN_VALUE = -2147483648;
    public value: number;

    public constructor(value: string | number) {
      super(value, TagInt.MIN_VALUE, TagInt.MAX_VALUE);
    }
  }

  export class TagCompound {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [k: string]: any;
    public constructor() {}

    public setItem(key: string, value: NBTTypes) {
      this[key] = value;
    }
  }

  export type NBTTypes = TagCompound | TagByte | TagInt | TagString;
}

/**
 *
 * @param str The NBT to parse.
 * @param strict In strict mode,
 */
export function parse(str: string, strict = true) {
  const root = new NBT.TagCompound();
  // The param str is not the str before
  function parse(str): NBTTypes {
    // Tag_Compound
    if (/{\u0020*.+?:.+?\u0020*(,\u0020*.+?:.+?\u0020*)*}/.test(str)) {
      str
        .slice(1, str.length - 1)
        .split(/,/g)
        .forEach((item) => {
          const [_key, _value] = item.split(/:/g);
          const [key, value] = [_key.trim(), _value.trim()];
          root.setItem(key, parse(value));
        });
    }

    // Tag_Byte
    if (/^[0-9]+[Bb]$/.test(str)) {
      return new NBT.TagByte(str);
    }

    // Tag_Int
    if (/^[0-9]+$/.test(str)) {
      // TODO: In some cases, Minecraft will convert 3 to 3b automatically.
      return new NBT.TagInt(str);
    }

    return new NBT.TagString(str.replace(/(^['"])|(['"]$)/g, ''));
  }
  parse(str);
  return root;
}
