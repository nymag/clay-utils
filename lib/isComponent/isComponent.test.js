'use strict';

const name = __filename.split('/').pop().split('.').shift(),
  fn = require('./' + name),
  expect = require('chai').expect;

describe('isComponent', () => {
  it('returns true if component reference', () => {
    expect(fn('domain.com/components/foo')).to.equal(true);
  });

  it('returns true if component instance reference', () => {
    expect(fn('domain.com/components/foo/instances/bar')).to.equal(true);
  });

  it('returns undefined if the URI passed in is not a string', () => {
    expect(fn([0, 1, 2, 3])).to.equal(undefined);
  });

  it('returns false if non-component reference', () => {
    expect(fn('domain.com/users/foo')).to.equal(false);
    expect(fn('domain.com/pages/foo')).to.equal(false);
  });
});
