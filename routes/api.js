'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get(`/api/convert`, function(req, res) {
    let responseMsg;
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const spellOutInitUnit = convertHandler.spellOutUnit(initUnit)
    const spellOutReturnUnit = convertHandler.spellOutUnit(returnUnit)
    const returnNum = convertHandler.convert(initNum, initUnit);
    const string = convertHandler.getString(initNum, spellOutInitUnit, returnNum, spellOutReturnUnit);
    // console.log('input', input);
    (initNum === 'invalid number' && initUnit === 'invalid unit') ? responseMsg = 'invalid number and unit' 
      : (initNum === 'invalid number') ? responseMsg = 'invalid number' 
      : (initUnit === 'invalid unit') ? responseMsg = 'invalid unit' 
      : responseMsg = {initNum, initUnit, returnNum, returnUnit, string}
    // console.log('res',responseMsg);
    res.json(responseMsg);
  })

};
