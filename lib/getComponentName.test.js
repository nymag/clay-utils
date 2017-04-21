'use strict';

const name = getName(__filename),
  fn = require('./' + name);

describe('getComponentName', () => {
  it('gets name from default uri', function () {
    expect(fn('/components/base')).to.equal('base');
  });

  it('gets name from instance uri', function () {
    expect(fn('/components/base/instances/0')).to.equal('base');
  });

  it('gets name from versioned uri', function () {
    expect(fn('/components/base/instances/0@published')).to.equal('base');
  });

  it('gets name from uri with extension', function () {
    expect(fn('/components/base.html')).to.equal('base');
    expect(fn('/components/base.json')).to.equal('base');
  });

  it('gets name from full uri', function () {
    expect(fn('nymag.com/press/components/base/instances/foobarbaz@published')).to.equal('base');
  });
});
