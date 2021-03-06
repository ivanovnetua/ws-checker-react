const fields = {
  'TYPE': 0x0       // hex for binary 0, it is a special case of fields that are always there
  , 'MARKET': 0x0       // hex for binary 0, it is a special case of fields that are always there
  , 'FROMSYMBOL': 0x0       // hex for binary 0, it is a special case of fields that are always there
  , 'TOSYMBOL': 0x0       // hex for binary 0, it is a special case of fields that are always there
  , 'FLAGS': 0x0       // hex for binary 0, it is a special case of fields that are always there
  , 'PRICE': 0x1       // hex for binary 1
  , 'BID': 0x2       // hex for binary 10
  , 'OFFER': 0x4       // hex for binary 100
  , 'LASTUPDATE': 0x8       // hex for binary 1000
  , 'AVG': 0x10      // hex for binary 10000
  , 'LASTVOLUME': 0x20      // hex for binary 100000
  , 'LASTVOLUMETO': 0x40      // hex for binary 1000000
  , 'LASTTRADEID': 0x80      // hex for binary 10000000
  , 'VOLUMEHOUR': 0x100     // hex for binary 100000000
  , 'VOLUMEHOURTO': 0x200     // hex for binary 1000000000
  , 'VOLUME24HOUR': 0x400     // hex for binary 10000000000
  , 'VOLUME24HOURTO': 0x800     // hex for binary 100000000000
  , 'OPENHOUR': 0x1000    // hex for binary 1000000000000
  , 'HIGHHOUR': 0x2000    // hex for binary 10000000000000
  , 'LOWHOUR': 0x4000    // hex for binary 100000000000000
  , 'OPEN24HOUR': 0x8000    // hex for binary 1000000000000000
  , 'HIGH24HOUR': 0x10000   // hex for binary 10000000000000000
  , 'LOW24HOUR': 0x20000   // hex for binary 100000000000000000
  , 'LASTMARKET': 0x40000   // hex for binary 1000000000000000000, this is a special case and will only appear on CCCAGG messages
};

const symbols = {
  'BTC': 'Ƀ'
  , 'LTC': 'Ł'
  , 'DAO': 'Ð'
  , 'USD': '$'
  , 'CNY': '¥'
  , 'EUR': '€'
  , 'GBP': '£'
  , 'JPY': '¥'
  , 'PLN': 'zł'
  , 'RUB': '₽'
  , 'ETH': 'Ξ'
  , 'GOLD': 'Gold g'
  , 'INR': '₹'
  , 'BRL': 'R$'
};

const getSymbol = function (symbol) {
  return symbols[symbol] || symbol;
};

const noExponents = function (value) {
  let data = String(value).split(/[eE]/);
  if (data.length == 1) return data[0];

  let z = '', sign = value < 0 ? '-' : '',
    str = data[0].replace('.', ''),
    mag = Number(data[1]) + 1;

  if (mag < 0) {
    z = sign + '0.';
    while (mag++) z += '0';
    return z + str.replace(/^\-/, '');
  }
  mag -= str.length;
  while (mag--) z += '0';
  return str + z;
};

const filterNumberFunctionPolyfill = function (value, decimals) {
  let decimalsDenominator = Math.pow(10, decimals);
  let numberWithCorrectDecimals = Math.round(value * decimalsDenominator) / decimalsDenominator;
  let parts = numberWithCorrectDecimals.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

const convertValueToDisplay = function (symbol, value, type, fullNumbers) {
  let prefix = '';
  let valueSign = 1;
  value = parseFloat(value);
  let valueAbs = Math.abs(value);
  let decimalsOnBigNumbers = 2;
  let decimalsOnNormalNumbers = 2;
  let decimalsOnSmallNumbers = 4;
  if (fullNumbers === true) {
    decimalsOnBigNumbers = 2;
    decimalsOnNormalNumbers = 0;
    decimalsOnSmallNumbers = 4;
  }
  if (symbol != '') {
    prefix = symbol + ' ';
  }
  if (value < 0) {
    valueSign = -1;
  }

  if (value == 0) {
    return prefix + '0';
  }

  if (value < 0.00001000 && value >= 0.00000100 && decimalsOnSmallNumbers > 3) {
    decimalsOnSmallNumbers = 3;
  }
  if (value < 0.00000100 && value >= 0.00000010 && decimalsOnSmallNumbers > 2) {
    decimalsOnSmallNumbers = 2;
  }
  if (value < 0.00000010 && value >= 0.00000001 && decimalsOnSmallNumbers > 1) {
    decimalsOnSmallNumbers = 1;
  }

  if (type == "short") {
    if (valueAbs > 10000000000) {
      valueAbs = valueAbs / 1000000000;
      return prefix + filterNumberFunctionPolyfill(valueSign * valueAbs, decimalsOnBigNumbers) + ' B';
    }
    if (valueAbs > 10000000) {
      valueAbs = valueAbs / 1000000;
      return prefix + filterNumberFunctionPolyfill(valueSign * valueAbs, decimalsOnBigNumbers) + ' M';
    }
    if (valueAbs > 10000) {
      valueAbs = valueAbs / 1000;
      return prefix + filterNumberFunctionPolyfill(valueSign * valueAbs, decimalsOnBigNumbers) + ' K';
    }
    if (valueAbs >= 1) {
      return prefix + filterNumberFunctionPolyfill(valueSign * valueAbs, decimalsOnNormalNumbers);
    }
    return prefix + (valueSign * valueAbs).toPrecision(decimalsOnSmallNumbers);
  } else {
    if (valueAbs >= 1) {
      return prefix + filterNumberFunctionPolyfill(valueSign * valueAbs, decimalsOnNormalNumbers);
    }

    return prefix + noExponents((valueSign * valueAbs).toPrecision(decimalsOnSmallNumbers));
  }
};

export function streamMode(value) {
  let msgStreamer = {
    'CURRENTAGG': 5
  }
  return msgStreamer[value]
};

export function msgUnpack(value) {
  let valuesArray = value.split("~");
  let valuesArrayLenght = valuesArray.length;
  let mask = valuesArray[valuesArrayLenght - 1];
  let maskInt = parseInt(mask, 16);
  let unpackedCurrent = {};
  let currentField = 0;
  for (let property in fields) {
    if (fields[property] === 0) {
      unpackedCurrent[property] = valuesArray[currentField];
      currentField++;
    }
    else if (maskInt & fields[property]) {

      if (property === 'LASTMARKET') {
        unpackedCurrent[property] = valuesArray[currentField];
      } else {
        unpackedCurrent[property] = parseFloat(valuesArray[currentField]);
      }
      currentField++;
    }
  }

  return unpackedCurrent;
};

export function dataUnpack(data) {
  let from = data['FROMSYMBOL'];
  let to = data['TOSYMBOL'];
  let fsym = getSymbol(from);
  let tsym = getSymbol(to);
  let pair = from + to;
  let pairName = `${from}-${to}`
  let currentPrice = {};

  if (!currentPrice.hasOwnProperty(pair)) {
    currentPrice[pair] = {};
  }

  for (let key in data) {
    currentPrice[pair][key] = data[key];
  }

  if (currentPrice[pair]['LASTTRADEID']) {
    currentPrice[pair]['LASTTRADEID'] = parseInt(currentPrice[pair]['LASTTRADEID']).toFixed(0);
  }

  return displayData(currentPrice[pair], from, tsym, fsym, pairName);
}

let displayData = function (current, from, tsym, fsym, pair) {
  let priceDirection = current.FLAGS;

  let displayedObj = {
    pairName: pair
  };

  for (let key in current) {
    if (key == 'LASTVOLUMETO' || key == 'VOLUME24HOURTO' || key == 'LASTVOLUME' || key == 'VOLUME24HOUR' || key == 'OPEN24HOUR' || key == 'OPENHOUR' || key == 'HIGH24HOUR' || key == 'HIGHHOUR' || key == 'LOWHOUR' || key == 'LOW24HOUR') {
      displayedObj[key] = convertValueToDisplay(tsym, current[key])
    } else {
      displayedObj[key] = current[key];
    }
  }

  if (priceDirection & 1) {
    displayedObj['PRICE_STATUS'] = "UP";
  }
  else if (priceDirection & 2) {
    displayedObj['PRICE_STATUS'] = "DOWN";
  }

  return displayedObj;
}