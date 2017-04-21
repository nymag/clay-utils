'use strict';

const name = __filename.split('/').pop().split('.').shift(),
  fn = require('./' + name),
  expect = require('chai').expect;

describe('getComponentVersion', () => {
  it('gets version from instance uri', () => {
    expect(fn('/components/foo/instances/bar@published')).to.equal('published');
  });

  it('gets version from default uri', () => {
    expect(fn('/components/base@published')).to.equal('published');
  });

  it('returns null if no version', () => {
    expect(fn('/components/foo/instances/bar')).to.equal(null);
    expect(fn('/components/base')).to.equal(null);
  });
});
