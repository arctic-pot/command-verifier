import { expect } from 'chai';
import { parse, NBT } from './parser';

describe('NBT parser', () => {
  describe('#types', () => {
    it('Bound is reasonable', () => {
      expect(NBT.TagByte.MAX_VALUE).to.be.equal(NBT.TagByte.MIN_VALUE * -1 - 1);
      expect(NBT.TagInt.MAX_VALUE).to.be.equal(NBT.TagInt.MIN_VALUE * -1 - 1);
    });

    it('Bound is correct', () => {
      new NBT.TagInt(-2147483648);
      new NBT.TagInt(2147483647);
      new NBT.TagByte(-256);
      new NBT.TagByte(255);
    });

    it('Convert type is safe', () => {
      expect(new NBT.TagByte('255').value).to.be.deep.equal(255);
      expect(new NBT.TagInt('2147483647').value).to.be.deep.equal(2147483647);
    });
  });
  describe('#parse', () => {
    it('Can parse a simple compound with common types', () => {
      parse('{byte:1b,int:1,float:1f,double:1d,long:1L}');
    });

    it('Can parse a complex compound with weird spaces', () => {
      parse('{  sampleData :  1b }');
    });

    it.skip('Can get value of a data', () => {
      expect(parse('{ sampleData   : "  space "  }').sampleData.value).to.be.deep.equal('  space ');
      expect(parse('{   sampleData :    3b  }').sampleData.value).to.be.deep.equal(3);
      expect(parse('{   sampleData :  3     }').sampleData.value).to.be.deep.equal(3);
      expect(parse('{ sampleData : { d: 1b} }').sampleData.d.value).to.be.deep.equal(1);
    });
  });
});
