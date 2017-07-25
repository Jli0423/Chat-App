const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', ()=>{
  it('should reject non-string value', () =>{
    var int = 1;
    expect(isRealString(int)).toBe(false);
  });

  it('should reject spaces', () =>{
    var space = "             ";
    expect(isRealString(space)).toBe(false);
  });

  it('should allow strings', () =>{
    var string = "asdfasdkjlf";
    expect(isRealString(string)).toBe(true);
  });
});
