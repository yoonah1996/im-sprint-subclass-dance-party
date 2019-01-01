require('mocha');
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const BlinkyDancerClass = require('../src/class/BlinkyDancerClass');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { HTMLElement } = (new JSDOM('')).window;

describe('es6 class blinkyDancer', function() {

  var blinkyDancer, clock;
  var timeBetweenSteps = 100;

  function isClass(v) {
    return typeof v === 'function' && /^\s*class\s+/.test(v.toString());
  }

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    blinkyDancer = new BlinkyDancerClass(10, 20, timeBetweenSteps);
  });

  it('class keyword를 사용해서 구현되어야 합니다', function() {
    expect(isClass(BlinkyDancerClass)).to.be.equal(true);
  });

  it('element 객체가 존재해야 합니다', function() {
    expect(blinkyDancer.$node).to.be.an.instanceof(HTMLElement);
  });

  describe('dance', function() {
    it('1초에 한번은 step 메소드가 불려야 합니다', function() {
      sinon.spy(blinkyDancer, 'step');
      clock.tick(timeBetweenSteps); // ? it seems an extra tick is necessary...
      expect(blinkyDancer.step.callCount).to.be.equal(0);

      clock.tick(timeBetweenSteps);
      expect(blinkyDancer.step.callCount).to.be.equal(1);

      clock.tick(timeBetweenSteps);
      expect(blinkyDancer.step.callCount).to.be.equal(2);
    });
  });
});
