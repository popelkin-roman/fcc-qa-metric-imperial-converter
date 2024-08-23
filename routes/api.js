'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get(`/api/convert`, function(req, res) {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const spellOutInitUnit = convertHandler.spellOutUnit(initUnit)
    const spellOutReturnUnit = convertHandler.spellOutUnit(returnUnit)
    const returnNum = convertHandler.convert(initNum, initUnit);
    const string = convertHandler.getString(initNum, spellOutInitUnit, returnNum, spellOutReturnUnit);
    console.log({initNum, initUnit, returnNum, returnUnit, string});
    res.json({initNum, initUnit, returnNum, returnUnit, string});
  })

};
