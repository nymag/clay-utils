'use strict';

const _ = require('lodash'),
  filename = __filename.split('/').pop().split('.').shift(),
  expect = require('chai').expect,
  sinon = require('sinon'),
  nymagfs = require('nymag-fs'),
  lib = require('./' + filename);


describe(_.startCase(filename), function () {
  let req, sandbox;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();

    // require shouldn't be called dynamically, but here we go
    req = sandbox.stub();
    req.resolve = sandbox.stub();
    lib.setRequire(req);
  });

  afterEach(function () {
    sandbox.restore();
    lib.setRequire(require);
  });

  describe('requireUtils', function () {
    const fn = lib[this.title],
    fakeArr = ['filea', 'fileb', 'filec'];

    it('requires each file in the array returned by getFolders', function () {
      sandbox.stub(nymagfs, 'getFolders').returns(fakeArr);
      req.returns('value')
      fn();

      expect(req.callCount).to.equal(fakeArr.length);
      expect(lib['filea']).to.equal('value');
    });
  });
});
