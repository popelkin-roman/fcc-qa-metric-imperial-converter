const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite('parse number', function () {
        test('whole number', function() {
            assert.equal(200, convertHandler.getNum('200mi'), 'whole number');
        })
        test('decimal number', function() {
            assert.equal(20.5, convertHandler.getNum('20.5mi'), 'decimal number');
        })
        test('fractional number', function() {
            assert.equal(4, convertHandler.getNum('20/5mi'), 'fractional number');
        })
        test('fractional input with decimal number', function() {
            assert.equal(9, convertHandler.getNum('4.5/0.5mi'), 'fractional input with decimal number');
        })
        test('error for double fractions', function() {
            assert.equal('invalid number', convertHandler.getNum('3/2/2'), 'error with several slashes');
        })
        test('default number is 1', function() {
            assert.equal(1, convertHandler.getNum('l'), 'default number is 1');
        })
    });
    suite('parse unit', function () {
        const units = ['L', 'gal', 'mi', 'km', 'lbs', 'kg'];
        test('valid input', function() {
        for (let i = 0; i < units.length; i++) {
                assert.equal(units[i], convertHandler.getUnit(200 + units[i]), 'valid input');
            }
        })
        test('invalid input', function() {
            assert.equal('invalid unit', convertHandler.getUnit('200mis'), 'invalid input');
        })
        test('return unit', function () {
            assert.equal('L', convertHandler.getReturnUnit('gal'), 'gal to L unit');
            assert.equal('gal', convertHandler.getReturnUnit('L'), 'L to gal unit');
            assert.equal('km', convertHandler.getReturnUnit('mi'), 'mi to km unit');
            assert.equal('mi', convertHandler.getReturnUnit('km'), 'km to mi unit');
            assert.equal('kg', convertHandler.getReturnUnit('lbs'), 'lbs to kg unit');
            assert.equal('lbs', convertHandler.getReturnUnit('kg'), 'kg to lbs unit');
        });
        test('spelled-out unit', function () {
            assert.equal('gallons', convertHandler.spellOutUnit('gal'), 'gal to gallons');
            assert.equal('liters', convertHandler.spellOutUnit('L'), 'L to liters');
            assert.equal('miles', convertHandler.spellOutUnit('mi'), 'mi to miles');
            assert.equal('kilometers', convertHandler.spellOutUnit('km'), 'km to kilometers');
            assert.equal('pounds', convertHandler.spellOutUnit('lbs'), 'lbs to pounds');
            assert.equal('kilograms', convertHandler.spellOutUnit('kg'), 'kg to kilograms');
        });
    });
    suite('conversion', function () {
        test('gal to L conversion', function() {
            assert.equal(3.78541, convertHandler.convert(1, 'gal'), 'gal to L conversion');
        })
        test('L to gal conversion', function() {
            assert.equal(1, convertHandler.convert(3.78541, 'L'), 'L to gal conversion');
        })
        test('mi to km conversion', function() {
            assert.equal(1.60934, convertHandler.convert(1, 'mi'), 'mi to km conversion');
        })
        test('km to mi conversion', function() {
            assert.equal(1, convertHandler.convert(1.60934, 'km'), 'km to mi conversion');
        })
        test('lbs to kg conversion', function() {
            assert.equal(0.45359, convertHandler.convert(1, 'lbs'), 'lbs to kg conversion');
        })
        test('kg to lbs conversion', function() {
            assert.equal(1, convertHandler.convert(0.453592, 'kg'), 'kg to lbs conversion');
        })
    });
});