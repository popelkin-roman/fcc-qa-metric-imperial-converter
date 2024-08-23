function ConvertHandler() {

  this.getNum = function(input) {
    let result;
    if (input.includes('/')) {
      let parts = input.split('/');
      if (parts.length > 2) throw new Error('extra /');
      result = parseFloat(parts[0]) / parseFloat(parts[1]);
    } else {
      result = parseFloat(input)
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    let startIndex = 0;
    for (let i = input.length - 1; i >= 0; i--) {
      if (! /[a-zA-Z]/.test(input[i]) ) {
        startIndex = ++i;
        break;
      }
    }
    result = input.substr(startIndex);
    
    return result;
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
        result = 'error'
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
    result = result.toFixed(5);
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = initNum + ' ' + initUnit + ' converts to ' + returnNum + ' ' + returnUnit;
    return result;
  };
  
}

module.exports = ConvertHandler;
