'use strict';

const _ = require('lodash'),
  glob = require('glob'),
  filename = __filename.split('/').pop().split('.').shift(),
  expect = require('chai').expect,
  sinon = require('sinon'),
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
      sandbox.stub(glob, 'sync').returns(fakeArr);
      fn();

      expect(req.callCount).to.equal(fakeArr.length);
    });
  });
});
