import jwtDecode from 'jwt-decode';
import getNestedObject from '../getNestedObject';

describe('getNestedObject', () => {
  const obj = { a: { b: { c: 2 } } };
  it('should return object if its exists', () => {
    expect(getNestedObject(obj, 'a.b.c')).toEqual(2);
  });
  it('should return undefined when nested Object does not exists', () => {
    expect(getNestedObject(obj, 'a.e.c')).toEqual(undefined);
  });

  it('verify tokens', () => {
    const expiredToken = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJpc1ZlcmlmaWVkIjp0cnVlLCJleHAiOjE2MzQ4NzcwNjM2NTMsInVzZXJuYW1lIjoiYWRtaW4ifQ.o__2eBqCe6egZc3qt_wlmXkAIc_nQsD_v5UCGN1IAYk"
    const activeToken = "eyJhbGciOiJIUzI1NiJ9.eyJleHBpcmVzSW4iOjE2MzQ4ODMxNDY2NDMsInJvbGUiOiJBRE1JTiIsImlzVmVyaWZpZWQiOnRydWUsInVzZXJuYW1lIjoiYWRtaW4ifQ.I8Df-Ahh--rKnqqmNQd115O2GDzlhZDo-pk4Z5CPRis"

    const expTokenDecode = jwtDecode(expiredToken);
    const activeTokenDecode = jwtDecode(activeToken);
    
    const { exp: expiredTokenExpiry } = expTokenDecode;
    const { exp: activeTokenExpiry } = activeTokenDecode;
    const currentTime = Date.now().valueOf();

    expect(currentTime > expiredTokenExpiry).toEqual(true)
    expect(currentTime > activeTokenExpiry).toEqual(false)

  })
});
