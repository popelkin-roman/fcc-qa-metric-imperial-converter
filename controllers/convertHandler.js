function ConvertHandler() {

  this.getNum = function(input) {
    let result;
    if (input.includes('/')) {
      let parts = input.split('/');
      result = parseFloat(parts[0]) / parseFloat(parts[1]);
      if (parts.length > 2) result = 'invalid number';
    } else {
      result = parseFloat(input)
      if ( isNaN(result) ) result = 'invalid number'
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    const units = ['L', 'gal', 'mi', 'km', 'lbs', 'kg'];
    let startIndex = 0;
    for (let i = input.length - 1; i >= 0; i--) {
      if (! /[a-zA-Z]/.test(input[i]) ) {
        startIndex = ++i;
        break;
      }
    }
    let parsedText = input.substr(startIndex);
    result = units.find( el => el.toLowerCase() === parsedText.toLowerCase())
    return result || 'invalid unit';
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch (initUnit) {
      case 'gal':
        result = 'L';
        break;
      case 'L':
        result = 'gal';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
      default:
        result = 'invalid unit'
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch (unit) {
      case 'gal':
        result = 'gallons';
        break;
      case 'L':
        result = 'liters';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      default:
        result = 'invalid unit'
    }
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
    }
    return result?.toFixed(5);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = initNum + ' ' + initUnit + ' converts to ' + returnNum + ' ' + returnUnit;
    return result;
  };
  
}

module.exports = ConvertHandler;
