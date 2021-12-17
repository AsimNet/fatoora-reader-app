var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// node_modules/@kawkab-oss/node-tlv/lib/util.js
var require_util = __commonJS({
  "node_modules/@kawkab-oss/node-tlv/lib/util.js"(exports, module2) {
    var Buffer2 = require("buffer/").Buffer;
    function toBuffer(data) {
      if (Buffer2.isBuffer(data)) {
        return newBuffer(data);
      } else if (typeof data === "string") {
        data = strip(data);
        return newBuffer(data);
      } else if (typeof data === "number") {
        var h = data.toString(16);
        if ((h.length & 1) === 1) {
          h = "0" + h;
        }
        return newBuffer(h);
      } else {
        return newBuffer(0);
      }
    }
    function newBuffer(num2) {
      if (Buffer2.isBuffer(num2)) {
        return Buffer2.from(num2);
      } else if (typeof num2 === "string") {
        return Buffer2.from(num2, "hex");
      } else if (typeof num2 === "number") {
        return Buffer2.alloc(num2);
      } else {
        return Buffer2.alloc(num2);
      }
    }
    function toHexString(num2) {
      num2 = num2 || 0;
      if (Buffer2.isBuffer(num2)) {
        return num2.toString("hex").toUpperCase();
      } else if (typeof num2 === "string") {
        num2 = strip(num2);
        if (num2.length === 0 || num2 === "") {
          num2 = "";
        }
        return num2;
      } else {
        var h = num2.toString(16).toUpperCase();
        if ((h.length & 1) === 1) {
          h = "0" + h;
        }
        return h;
      }
    }
    function toAscii(hexstr) {
      hexstr = hexstr || "";
      var buf = toBuffer(hexstr);
      return buf.toString("ascii");
    }
    function toNumber(val) {
      val = val || "";
      var str;
      if (Buffer2.isBuffer(val)) {
        str = toHexString(val);
      } else if (typeof val === "string") {
        str = strip(val);
      } else if (typeof val === "number") {
        return val;
      } else {
        return 0;
      }
      return parseInt(str, 16);
    }
    function strip(str) {
      str = str || "";
      return str.replace(/\s+/g, "");
    }
    function u1(buffer, offset, encoding) {
      encoding = encoding || "hex";
      if (encoding === "hex") {
        return toHexString(buffer[offset]);
      } else if (encoding === "number") {
        return toNumber(toHexString(buffer.slice(offset, offset + 2)));
      }
    }
    function u2(buffer, offset, encoding) {
      encoding = encoding || "hex";
      if (encoding === "hex") {
        return toHexString(buffer.slice(offset, offset + 2));
      } else if (encoding === "number") {
        return toNumber(toHexString(buffer.slice(offset, offset + 2)));
      }
    }
    function un(buffer, offset, len, encoding) {
      encoding = encoding || "hex";
      len = len || buffer.length;
      if (encoding === "hex") {
        return toHexString(buffer.slice(offset, offset + len));
      } else if (encoding === "number") {
        return toNumber(toHexString(buffer.slice(offset, offset + len)));
      }
    }
    function bitOn(number, bit) {
      return (number & bit) === bit;
    }
    function getBitOn(number, bit) {
      return (number & bit) === bit ? "1" : "0";
    }
    module2.exports = {
      toBuffer,
      newBuffer,
      toHexString,
      toAscii,
      toNumber,
      strip,
      u1,
      u2,
      un,
      bitOn,
      getBitOn
    };
  }
});

// node_modules/@kawkab-oss/node-tlv/lib/decoder/Gpo.js
var require_Gpo = __commonJS({
  "node_modules/@kawkab-oss/node-tlv/lib/decoder/Gpo.js"(exports, module2) {
    var toBuffer = require_util().toBuffer;
    var toHexString = require_util().toHexString;
    function ApplicationInterchangeProfile(tlv) {
      var value = toBuffer(tlv.getValue());
      var code = value[0];
      var desc = [];
      if ((code & 128) === 128) {
        desc.push("RFU");
      }
      if ((code & 64) === 64) {
        desc.push("4000 Byte 1 b7: SDA supported (Offline Static Data Authenticate)");
      }
      if ((code & 32) === 32) {
        desc.push("2000 Byte 1 b6: DDA supported (Offline Dynamic Data Authenticate)");
      }
      if ((code & 16) === 16) {
        desc.push("1000 Byte 1 b5: Cardholder verification is supported");
      }
      if ((code & 8) === 8) {
        desc.push("0800 Byte 1 b4: Terminal risk management is to be performed");
      }
      if ((code & 4) === 4) {
        desc.push("0400 Byte 1 b3: Issuer authentication is supported");
      }
      if ((code & 2) === 2) {
        desc.push("0200 Byte 1 b2: RFU");
      }
      if ((code & 1) === 1) {
        desc.push("0100 Byte 1 b1: CDA supported");
      }
      code = value[1];
      if ((code & 128) === 128) {
        desc.push("0080 Byte 2 b8: Reserved for use by the EMV Contactless Specifications");
      }
      return desc;
    }
    function ApplicationFileLocator(tlv) {
      var buf = toBuffer(tlv.getValue());
      var len = buf.length;
      if (len % 4 !== 0) {
        return ["Invalid data length: length % 4: " + len % 4];
      }
      var cnt = len / 4;
      var offset = 0;
      var items = [];
      for (var i = 0; i < cnt; i++) {
        var chunk = buf.slice(offset, offset + 4);
        offset += 4;
        items.push(chunk);
      }
      var desc = [];
      var str;
      items.forEach(function(item) {
        str = toHexString(item);
        str += " SFI: " + toHexString(item[0] >> 3) + " ";
        if (item[1] === item[2]) {
          str += " record: " + toHexString(item[1]);
        } else {
          str += " record: " + toHexString(item[1]) + " - " + toHexString(item[2]);
        }
        desc.push(str);
      });
      tlv.afe = items;
      tlv.getCommand = function() {
        var cmds = [];
        tlv.afe.forEach(function(data) {
          var cmd;
          var p2;
          for (var i2 = data[1]; i2 <= data[2]; i2++) {
            p2 = data[0] | 4;
            cmd = "00B2";
            cmd += toHexString(i2);
            cmd += toHexString(p2);
            cmd += "00";
            cmds.push(cmd);
          }
        });
        return cmds;
      };
      return desc;
    }
    function ApplicationFileLocatorFunction(tlv) {
      var buf = tlv.getValue("buffer");
      var cnt = tlv.getLength() / 4;
      var offset = 0;
      var items = [];
      for (var i = 0; i < cnt; i++) {
        var chunk = buf.slice(offset, offset + 4);
        offset += 4;
        items.push(chunk);
      }
      tlv.afe = items;
      tlv.getCommand = function() {
        var cmds = [];
        tlv.afe.forEach(function(data) {
          var cmd;
          var p2;
          for (var i2 = data[1]; i2 <= data[2]; i2++) {
            p2 = data[0] | 4;
            cmd = "00B2";
            cmd += toHexString(i2);
            cmd += toHexString(p2);
            cmd += "00";
            cmds.push(cmd);
          }
        });
        return cmds;
      };
    }
    module2.exports = {
      ApplicationFileLocator,
      ApplicationFileLocatorFunction,
      ApplicationInterchangeProfile
    };
  }
});

// node_modules/@kawkab-oss/node-tlv/lib/decoder/json/CountryCode.json
var require_CountryCode = __commonJS({
  "node_modules/@kawkab-oss/node-tlv/lib/decoder/json/CountryCode.json"(exports, module2) {
    module2.exports = {
      "0004": {
        country: "AFGHANISTAN",
        A2: "AF",
        A3: "AFG",
        number: "0004"
      },
      "0008": {
        country: "ALBANIA",
        A2: "AL",
        A3: "ALB",
        number: "0008"
      },
      "0012": {
        country: "ALGERIA",
        A2: "DZ",
        A3: "DZA",
        number: "0012"
      },
      "0016": {
        country: "AMERICAN SAMOA",
        A2: "AS",
        A3: "ASM",
        number: "0016"
      },
      "0020": {
        country: "ANDORRA",
        A2: "AD",
        A3: "AND",
        number: "0020"
      },
      "0024": {
        country: "ANGOLA",
        A2: "AO",
        A3: "AGO",
        number: "0024"
      },
      "0660": {
        country: "ANGUILLA",
        A2: "AI",
        A3: "AIA",
        number: "0660"
      },
      "0010": {
        country: "ANTARCTICA",
        A2: "AQ",
        A3: "ATA",
        number: "0010"
      },
      "0028": {
        country: "ANTIGUA AND BARBUDA",
        A2: "AG",
        A3: "ATG",
        number: "0028"
      },
      "0032": {
        country: "ARGENTINA",
        A2: "AR",
        A3: "ARG",
        number: "0032"
      },
      "0051": {
        country: "ARMENIA",
        A2: "AM",
        A3: "ARM",
        number: "0051"
      },
      "0533": {
        country: "ARUBA",
        A2: "AW",
        A3: "ABW",
        number: "0533"
      },
      "0036": {
        country: "AUSTRALIA",
        A2: "AU",
        A3: "AUS",
        number: "0036"
      },
      "0040": {
        country: "AUSTRIA",
        A2: "AT",
        A3: "AUT",
        number: "0040"
      },
      "0031": {
        country: "AZERBAIJAN",
        A2: "AZ",
        A3: "AZE",
        number: "0031"
      },
      "0044": {
        country: "BAHAMAS",
        A2: "BS",
        A3: "BHS",
        number: "0044"
      },
      "0048": {
        country: "BAHRAIN",
        A2: "BH",
        A3: "BHR",
        number: "0048"
      },
      "0050": {
        country: "BANGLADESH",
        A2: "BD",
        A3: "BGD",
        number: "0050"
      },
      "0052": {
        country: "BARBADOS",
        A2: "BB",
        A3: "BRB",
        number: "0052"
      },
      "0112": {
        country: "BELARUS",
        A2: "BY",
        A3: "BLR",
        number: "0112"
      },
      "0056": {
        country: "BELGIUM",
        A2: "BE",
        A3: "BEL",
        number: "0056"
      },
      "0084": {
        country: "BELIZE",
        A2: "BZ",
        A3: "BLZ",
        number: "0084"
      },
      "0204": {
        country: "BENIN",
        A2: "BJ",
        A3: "BEN",
        number: "0204"
      },
      "0060": {
        country: "BERMUDA",
        A2: "BM",
        A3: "BMU",
        number: "0060"
      },
      "0064": {
        country: "BHUTAN",
        A2: "BT",
        A3: "BTN",
        number: "0064"
      },
      "0068": {
        country: "BOLIVIA",
        A2: "BO",
        A3: "BOL",
        number: "0068"
      },
      "0070": {
        country: "BOSNIA AND HERZEGOWINA",
        A2: "BA",
        A3: "BIH",
        number: "0070"
      },
      "0072": {
        country: "BOTSWANA",
        A2: "BW",
        A3: "BWA",
        number: "0072"
      },
      "0074": {
        country: "BOUVET ISLAND",
        A2: "BV",
        A3: "BVT",
        number: "0074"
      },
      "0076": {
        country: "BRAZIL",
        A2: "BR",
        A3: "BRA",
        number: "0076"
      },
      "0086": {
        country: "BRITISH INDIAN OCEAN TERRITORY",
        A2: "IO",
        A3: "IOT",
        number: "0086"
      },
      "0096": {
        country: "BRUNEI DARUSSALAM",
        A2: "BN",
        A3: "BRN",
        number: "0096"
      },
      "0100": {
        country: "BULGARIA",
        A2: "BG",
        A3: "BGR",
        number: "0100"
      },
      "0854": {
        country: "BURKINA FASO",
        A2: "BF",
        A3: "BFA",
        number: "0854"
      },
      "0108": {
        country: "BURUNDI",
        A2: "BI",
        A3: "BDI",
        number: "0108"
      },
      "0116": {
        country: "CAMBODIA",
        A2: "KH",
        A3: "KHM",
        number: "0116"
      },
      "0120": {
        country: "CAMEROON",
        A2: "CM",
        A3: "CMR",
        number: "0120"
      },
      "0124": {
        country: "CANADA",
        A2: "CA",
        A3: "CAN",
        number: "0124"
      },
      "0132": {
        country: "CAPE VERDE",
        A2: "CV",
        A3: "CPV",
        number: "0132"
      },
      "0136": {
        country: "CAYMAN ISLANDS",
        A2: "KY",
        A3: "CYM",
        number: "0136"
      },
      "0140": {
        country: "CENTRAL AFRICAN REPUBLIC",
        A2: "CF",
        A3: "CAF",
        number: "0140"
      },
      "0148": {
        country: "CHAD",
        A2: "TD",
        A3: "TCD",
        number: "0148"
      },
      "0152": {
        country: "CHILE",
        A2: "CL",
        A3: "CHL",
        number: "0152"
      },
      "0156": {
        country: "CHINA",
        A2: "CN",
        A3: "CHN",
        number: "0156"
      },
      "0162": {
        country: "CHRISTMAS ISLAND",
        A2: "CX",
        A3: "CXR",
        number: "0162"
      },
      "0166": {
        country: "COCOS (KEELING) ISLANDS",
        A2: "CC",
        A3: "CCK",
        number: "0166"
      },
      "0170": {
        country: "COLOMBIA",
        A2: "CO",
        A3: "COL",
        number: "0170"
      },
      "0174": {
        country: "COMOROS",
        A2: "KM",
        A3: "COM",
        number: "0174"
      },
      "0178": {
        country: "CONGO",
        A2: "CG",
        A3: "COG",
        number: "0178"
      },
      "0180": {
        country: "CONGO, THE DEMOCRATIC REPUBLIC OF THE",
        A2: "CD",
        A3: "COD",
        number: "0180"
      },
      "0184": {
        country: "COOK ISLANDS",
        A2: "CK",
        A3: "COK",
        number: "0184"
      },
      "0188": {
        country: "COSTA RICA",
        A2: "CR",
        A3: "CRI",
        number: "0188"
      },
      "0384": {
        country: "COTE D'IVOIRE",
        A2: "CI",
        A3: "CIV",
        number: "0384"
      },
      "0191": {
        country: "CROATIA (local name: Hrvatska)",
        A2: "HR",
        A3: "HRV",
        number: "0191"
      },
      "0192": {
        country: "CUBA",
        A2: "CU",
        A3: "CUB",
        number: "0192"
      },
      "0196": {
        country: "CYPRUS",
        A2: "CY",
        A3: "CYP",
        number: "0196"
      },
      "0203": {
        country: "CZECH REPUBLIC",
        A2: "CZ",
        A3: "CZE",
        number: "0203"
      },
      "0208": {
        country: "DENMARK",
        A2: "DK",
        A3: "DNK",
        number: "0208"
      },
      "0262": {
        country: "DJIBOUTI",
        A2: "DJ",
        A3: "DJI",
        number: "0262"
      },
      "0212": {
        country: "DOMINICA",
        A2: "DM",
        A3: "DMA",
        number: "0212"
      },
      "0214": {
        country: "DOMINICAN REPUBLIC",
        A2: "DO",
        A3: "DOM",
        number: "0214"
      },
      "0626": {
        country: "EAST TIMOR",
        A2: "TP",
        A3: "TMP",
        number: "0626"
      },
      "0218": {
        country: "ECUADOR",
        A2: "EC",
        A3: "ECU",
        number: "0218"
      },
      "0818": {
        country: "EGYPT",
        A2: "EG",
        A3: "EGY",
        number: "0818"
      },
      "0222": {
        country: "EL SALVADOR",
        A2: "SV",
        A3: "SLV",
        number: "0222"
      },
      "0226": {
        country: "EQUATORIAL GUINEA",
        A2: "GQ",
        A3: "GNQ",
        number: "0226"
      },
      "0232": {
        country: "ERITREA",
        A2: "ER",
        A3: "ERI",
        number: "0232"
      },
      "0233": {
        country: "ESTONIA",
        A2: "EE",
        A3: "EST",
        number: "0233"
      },
      "0231": {
        country: "ETHIOPIA",
        A2: "ET",
        A3: "ETH",
        number: "0231"
      },
      "0238": {
        country: "FALKLAND ISLANDS (MALVINAS)",
        A2: "FK",
        A3: "FLK",
        number: "0238"
      },
      "0234": {
        country: "FAROE ISLANDS",
        A2: "FO",
        A3: "FRO",
        number: "0234"
      },
      "0242": {
        country: "FIJI",
        A2: "FJ",
        A3: "FJI",
        number: "0242"
      },
      "0246": {
        country: "FINLAND",
        A2: "FI",
        A3: "FIN",
        number: "0246"
      },
      "0250": {
        country: "FRANCE",
        A2: "FR",
        A3: "FRA",
        number: "0250"
      },
      "0249": {
        country: "FRANCE, METROPOLITAN",
        A2: "FX",
        A3: "FXX",
        number: "0249"
      },
      "0254": {
        country: "FRENCH GUIANA",
        A2: "GF",
        A3: "GUF",
        number: "0254"
      },
      "0258": {
        country: "FRENCH POLYNESIA",
        A2: "PF",
        A3: "PYF",
        number: "0258"
      },
      "0260": {
        country: "FRENCH SOUTHERN TERRITORIES",
        A2: "TF",
        A3: "ATF",
        number: "0260"
      },
      "0266": {
        country: "GABON",
        A2: "GA",
        A3: "GAB",
        number: "0266"
      },
      "0270": {
        country: "GAMBIA",
        A2: "GM",
        A3: "GMB",
        number: "0270"
      },
      "0268": {
        country: "GEORGIA",
        A2: "GE",
        A3: "GEO",
        number: "0268"
      },
      "0276": {
        country: "GERMANY",
        A2: "DE",
        A3: "DEU",
        number: "0276"
      },
      "0288": {
        country: "GHANA",
        A2: "GH",
        A3: "GHA",
        number: "0288"
      },
      "0292": {
        country: "GIBRALTAR",
        A2: "GI",
        A3: "GIB",
        number: "0292"
      },
      "0300": {
        country: "GREECE",
        A2: "GR",
        A3: "GRC",
        number: "0300"
      },
      "0304": {
        country: "GREENLAND",
        A2: "GL",
        A3: "GRL",
        number: "0304"
      },
      "0308": {
        country: "GRENADA",
        A2: "GD",
        A3: "GRD",
        number: "0308"
      },
      "0312": {
        country: "GUADELOUPE",
        A2: "GP",
        A3: "GLP",
        number: "0312"
      },
      "0316": {
        country: "GUAM",
        A2: "GU",
        A3: "GUM",
        number: "0316"
      },
      "0320": {
        country: "GUATEMALA",
        A2: "GT",
        A3: "GTM",
        number: "0320"
      },
      "0324": {
        country: "GUINEA",
        A2: "GN",
        A3: "GIN",
        number: "0324"
      },
      "0624": {
        country: "GUINEA-BISSAU",
        A2: "GW",
        A3: "GNB",
        number: "0624"
      },
      "0328": {
        country: "GUYANA",
        A2: "GY",
        A3: "GUY",
        number: "0328"
      },
      "0332": {
        country: "HAITI",
        A2: "HT",
        A3: "HTI",
        number: "0332"
      },
      "0334": {
        country: "HEARD AND MC DONALD ISLANDS",
        A2: "HM",
        A3: "HMD",
        number: "0334"
      },
      "0336": {
        country: "HOLY SEE (VATICAN CITY STATE)",
        A2: "VA",
        A3: "VAT",
        number: "0336"
      },
      "0340": {
        country: "HONDURAS",
        A2: "HN",
        A3: "HND",
        number: "0340"
      },
      "0344": {
        country: "HONG KONG",
        A2: "HK",
        A3: "HKG",
        number: "0344"
      },
      "0348": {
        country: "HUNGARY",
        A2: "HU",
        A3: "HUN",
        number: "0348"
      },
      "0352": {
        country: "ICELAND",
        A2: "IS",
        A3: "ISL",
        number: "0352"
      },
      "0356": {
        country: "INDIA",
        A2: "IN",
        A3: "IND",
        number: "0356"
      },
      "0360": {
        country: "INDONESIA",
        A2: "ID",
        A3: "IDN",
        number: "0360"
      },
      "0364": {
        country: "IRAN (ISLAMIC REPUBLIC OF)",
        A2: "IR",
        A3: "IRN",
        number: "0364"
      },
      "0368": {
        country: "IRAQ",
        A2: "IQ",
        A3: "IRQ",
        number: "0368"
      },
      "0372": {
        country: "IRELAND",
        A2: "IE",
        A3: "IRL",
        number: "0372"
      },
      "0376": {
        country: "ISRAEL",
        A2: "IL",
        A3: "ISR",
        number: "0376"
      },
      "0380": {
        country: "ITALY",
        A2: "IT",
        A3: "ITA",
        number: "0380"
      },
      "0388": {
        country: "JAMAICA",
        A2: "JM",
        A3: "JAM",
        number: "0388"
      },
      "0392": {
        country: "JAPAN",
        A2: "JP",
        A3: "JPN",
        number: "0392"
      },
      "0400": {
        country: "JORDAN",
        A2: "JO",
        A3: "JOR",
        number: "0400"
      },
      "0398": {
        country: "KAZAKHSTAN",
        A2: "KZ",
        A3: "KAZ",
        number: "0398"
      },
      "0404": {
        country: "KENYA",
        A2: "KE",
        A3: "KEN",
        number: "0404"
      },
      "0296": {
        country: "KIRIBATI",
        A2: "KI",
        A3: "KIR",
        number: "0296"
      },
      "0408": {
        country: "KOREA, DEMOCRATIC PEOPLE'S REPUBLIC OF",
        A2: "KP",
        A3: "PRK",
        number: "0408"
      },
      "0410": {
        country: "KOREA, REPUBLIC OF",
        A2: "KR",
        A3: "KOR",
        number: "0410"
      },
      "0414": {
        country: "KUWAIT",
        A2: "KW",
        A3: "KWT",
        number: "0414"
      },
      "0417": {
        country: "KYRGYZSTAN",
        A2: "KG",
        A3: "KGZ",
        number: "0417"
      },
      "0418": {
        country: "LAO PEOPLE'S DEMOCRATIC REPUBLIC",
        A2: "LA",
        A3: "LAO",
        number: "0418"
      },
      "0428": {
        country: "LATVIA",
        A2: "LV",
        A3: "LVA",
        number: "0428"
      },
      "0422": {
        country: "LEBANON",
        A2: "LB",
        A3: "LBN",
        number: "0422"
      },
      "0426": {
        country: "LESOTHO",
        A2: "LS",
        A3: "LSO",
        number: "0426"
      },
      "0430": {
        country: "LIBERIA",
        A2: "LR",
        A3: "LBR",
        number: "0430"
      },
      "0434": {
        country: "LIBYAN ARAB JAMAHIRIYA",
        A2: "LY",
        A3: "LBY",
        number: "0434"
      },
      "0438": {
        country: "LIECHTENSTEIN",
        A2: "LI",
        A3: "LIE",
        number: "0438"
      },
      "0440": {
        country: "LITHUANIA",
        A2: "LT",
        A3: "LTU",
        number: "0440"
      },
      "0442": {
        country: "LUXEMBOURG",
        A2: "LU",
        A3: "LUX",
        number: "0442"
      },
      "0446": {
        country: "MACAU",
        A2: "MO",
        A3: "MAC",
        number: "0446"
      },
      "0807": {
        country: "MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF",
        A2: "MK",
        A3: "MKD",
        number: "0807"
      },
      "0450": {
        country: "MADAGASCAR",
        A2: "MG",
        A3: "MDG",
        number: "0450"
      },
      "0454": {
        country: "MALAWI",
        A2: "MW",
        A3: "MWI",
        number: "0454"
      },
      "0458": {
        country: "MALAYSIA",
        A2: "MY",
        A3: "MYS",
        number: "0458"
      },
      "0462": {
        country: "MALDIVES",
        A2: "MV",
        A3: "MDV",
        number: "0462"
      },
      "0466": {
        country: "MALI",
        A2: "ML",
        A3: "MLI",
        number: "0466"
      },
      "0470": {
        country: "MALTA",
        A2: "MT",
        A3: "MLT",
        number: "0470"
      },
      "0584": {
        country: "MARSHALL ISLANDS",
        A2: "MH",
        A3: "MHL",
        number: "0584"
      },
      "0474": {
        country: "MARTINIQUE",
        A2: "MQ",
        A3: "MTQ",
        number: "0474"
      },
      "0478": {
        country: "MAURITANIA",
        A2: "MR",
        A3: "MRT",
        number: "0478"
      },
      "0480": {
        country: "MAURITIUS",
        A2: "MU",
        A3: "MUS",
        number: "0480"
      },
      "0175": {
        country: "MAYOTTE",
        A2: "YT",
        A3: "MYT",
        number: "0175"
      },
      "0484": {
        country: "MEXICO",
        A2: "MX",
        A3: "MEX",
        number: "0484"
      },
      "0583": {
        country: "MICRONESIA, FEDERATED STATES OF",
        A2: "FM",
        A3: "FSM",
        number: "0583"
      },
      "0498": {
        country: "MOLDOVA, REPUBLIC OF",
        A2: "MD",
        A3: "MDA",
        number: "0498"
      },
      "0492": {
        country: "MONACO",
        A2: "MC",
        A3: "MCO",
        number: "0492"
      },
      "0496": {
        country: "MONGOLIA",
        A2: "MN",
        A3: "MNG",
        number: "0496"
      },
      "0500": {
        country: "MONTSERRAT",
        A2: "MS",
        A3: "MSR",
        number: "0500"
      },
      "0504": {
        country: "MOROCCO",
        A2: "MA",
        A3: "MAR",
        number: "0504"
      },
      "0508": {
        country: "MOZAMBIQUE",
        A2: "MZ",
        A3: "MOZ",
        number: "0508"
      },
      "0104": {
        country: "MYANMAR",
        A2: "MM",
        A3: "MMR",
        number: "0104"
      },
      "0516": {
        country: "NAMIBIA",
        A2: "NA",
        A3: "NAM",
        number: "0516"
      },
      "0520": {
        country: "NAURU",
        A2: "NR",
        A3: "NRU",
        number: "0520"
      },
      "0524": {
        country: "NEPAL",
        A2: "NP",
        A3: "NPL",
        number: "0524"
      },
      "0528": {
        country: "NETHERLANDS",
        A2: "NL",
        A3: "NLD",
        number: "0528"
      },
      "0530": {
        country: "NETHERLANDS ANTILLES",
        A2: "AN",
        A3: "ANT",
        number: "0530"
      },
      "0540": {
        country: "NEW CALEDONIA",
        A2: "NC",
        A3: "NCL",
        number: "0540"
      },
      "0554": {
        country: "NEW ZEALAND",
        A2: "NZ",
        A3: "NZL",
        number: "0554"
      },
      "0558": {
        country: "NICARAGUA",
        A2: "NI",
        A3: "NIC",
        number: "0558"
      },
      "0562": {
        country: "NIGER",
        A2: "NE",
        A3: "NER",
        number: "0562"
      },
      "0566": {
        country: "NIGERIA",
        A2: "NG",
        A3: "NGA",
        number: "0566"
      },
      "0570": {
        country: "NIUE",
        A2: "NU",
        A3: "NIU",
        number: "0570"
      },
      "0574": {
        country: "NORFOLK ISLAND",
        A2: "NF",
        A3: "NFK",
        number: "0574"
      },
      "0580": {
        country: "NORTHERN MARIANA ISLANDS",
        A2: "MP",
        A3: "MNP",
        number: "0580"
      },
      "0578": {
        country: "NORWAY",
        A2: "NO",
        A3: "NOR",
        number: "0578"
      },
      "0512": {
        country: "OMAN",
        A2: "OM",
        A3: "OMN",
        number: "0512"
      },
      "0586": {
        country: "PAKISTAN",
        A2: "PK",
        A3: "PAK",
        number: "0586"
      },
      "0585": {
        country: "PALAU",
        A2: "PW",
        A3: "PLW",
        number: "0585"
      },
      "0591": {
        country: "PANAMA",
        A2: "PA",
        A3: "PAN",
        number: "0591"
      },
      "0598": {
        country: "PAPUA NEW GUINEA",
        A2: "PG",
        A3: "PNG",
        number: "0598"
      },
      "0600": {
        country: "PARAGUAY",
        A2: "PY",
        A3: "PRY",
        number: "0600"
      },
      "0604": {
        country: "PERU",
        A2: "PE",
        A3: "PER",
        number: "0604"
      },
      "0608": {
        country: "PHILIPPINES",
        A2: "PH",
        A3: "PHL",
        number: "0608"
      },
      "0612": {
        country: "PITCAIRN",
        A2: "PN",
        A3: "PCN",
        number: "0612"
      },
      "0616": {
        country: "POLAND",
        A2: "PL",
        A3: "POL",
        number: "0616"
      },
      "0620": {
        country: "PORTUGAL",
        A2: "PT",
        A3: "PRT",
        number: "0620"
      },
      "0630": {
        country: "PUERTO RICO",
        A2: "PR",
        A3: "PRI",
        number: "0630"
      },
      "0634": {
        country: "QATAR",
        A2: "QA",
        A3: "QAT",
        number: "0634"
      },
      "0638": {
        country: "REUNION",
        A2: "RE",
        A3: "REU",
        number: "0638"
      },
      "0642": {
        country: "ROMANIA",
        A2: "RO",
        A3: "ROM",
        number: "0642"
      },
      "0643": {
        country: "RUSSIAN FEDERATION",
        A2: "RU",
        A3: "RUS",
        number: "0643"
      },
      "0646": {
        country: "RWANDA",
        A2: "RW",
        A3: "RWA",
        number: "0646"
      },
      "0659": {
        country: "SAINT KITTS AND NEVIS",
        A2: "KN",
        A3: "KNA",
        number: "0659"
      },
      "0662": {
        country: "SAINT LUCIA",
        A2: "LC",
        A3: "LCA",
        number: "0662"
      },
      "0670": {
        country: "SAINT VINCENT AND THE GRENADINES",
        A2: "VC",
        A3: "VCT",
        number: "0670"
      },
      "0882": {
        country: "SAMOA",
        A2: "WS",
        A3: "WSM",
        number: "0882"
      },
      "0674": {
        country: "SAN MARINO",
        A2: "SM",
        A3: "SMR",
        number: "0674"
      },
      "0678": {
        country: "SAO TOME AND PRINCIPE",
        A2: "ST",
        A3: "STP",
        number: "0678"
      },
      "0682": {
        country: "SAUDI ARABIA",
        A2: "SA",
        A3: "SAU",
        number: "0682"
      },
      "0686": {
        country: "SENEGAL",
        A2: "SN",
        A3: "SEN",
        number: "0686"
      },
      "0690": {
        country: "SEYCHELLES",
        A2: "SC",
        A3: "SYC",
        number: "0690"
      },
      "0694": {
        country: "SIERRA LEONE",
        A2: "SL",
        A3: "SLE",
        number: "0694"
      },
      "0702": {
        country: "SINGAPORE",
        A2: "SG",
        A3: "SGP",
        number: "0702"
      },
      "0703": {
        country: "SLOVAKIA (Slovak Republic)",
        A2: "SK",
        A3: "SVK",
        number: "0703"
      },
      "0705": {
        country: "SLOVENIA",
        A2: "SI",
        A3: "SVN",
        number: "0705"
      },
      "0090": {
        country: "SOLOMON ISLANDS",
        A2: "SB",
        A3: "SLB",
        number: "0090"
      },
      "0706": {
        country: "SOMALIA",
        A2: "SO",
        A3: "SOM",
        number: "0706"
      },
      "0710": {
        country: "SOUTH AFRICA",
        A2: "ZA",
        A3: "ZAF",
        number: "0710"
      },
      "0239": {
        country: "SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS",
        A2: "GS",
        A3: "SGS",
        number: "0239"
      },
      "0724": {
        country: "SPAIN",
        A2: "ES",
        A3: "ESP",
        number: "0724"
      },
      "0144": {
        country: "SRI LANKA",
        A2: "LK",
        A3: "LKA",
        number: "0144"
      },
      "0654": {
        country: "ST. HELENA",
        A2: "SH",
        A3: "SHN",
        number: "0654"
      },
      "0666": {
        country: "ST. PIERRE AND MIQUELON",
        A2: "PM",
        A3: "SPM",
        number: "0666"
      },
      "0736": {
        country: "SUDAN",
        A2: "SD",
        A3: "SDN",
        number: "0736"
      },
      "0740": {
        country: "SURINAME",
        A2: "SR",
        A3: "SUR",
        number: "0740"
      },
      "0744": {
        country: "SVALBARD AND JAN MAYEN ISLANDS",
        A2: "SJ",
        A3: "SJM",
        number: "0744"
      },
      "0748": {
        country: "SWAZILAND",
        A2: "SZ",
        A3: "SWZ",
        number: "0748"
      },
      "0752": {
        country: "SWEDEN",
        A2: "SE",
        A3: "SWE",
        number: "0752"
      },
      "0756": {
        country: "SWITZERLAND",
        A2: "CH",
        A3: "CHE",
        number: "0756"
      },
      "0760": {
        country: "SYRIAN ARAB REPUBLIC",
        A2: "SY",
        A3: "SYR",
        number: "0760"
      },
      "0158": {
        country: "TAIWAN, PROVINCE OF CHINA",
        A2: "TW",
        A3: "TWN",
        number: "0158"
      },
      "0762": {
        country: "TAJIKISTAN",
        A2: "TJ",
        A3: "TJK",
        number: "0762"
      },
      "0834": {
        country: "TANZANIA, UNITED REPUBLIC OF",
        A2: "TZ",
        A3: "TZA",
        number: "0834"
      },
      "0764": {
        country: "THAILAND",
        A2: "TH",
        A3: "THA",
        number: "0764"
      },
      "0768": {
        country: "TOGO",
        A2: "TG",
        A3: "TGO",
        number: "0768"
      },
      "0772": {
        country: "TOKELAU",
        A2: "TK",
        A3: "TKL",
        number: "0772"
      },
      "0776": {
        country: "TONGA",
        A2: "TO",
        A3: "TON",
        number: "0776"
      },
      "0780": {
        country: "TRINIDAD AND TOBAGO",
        A2: "TT",
        A3: "TTO",
        number: "0780"
      },
      "0788": {
        country: "TUNISIA",
        A2: "TN",
        A3: "TUN",
        number: "0788"
      },
      "0792": {
        country: "TURKEY",
        A2: "TR",
        A3: "TUR",
        number: "0792"
      },
      "0795": {
        country: "TURKMENISTAN",
        A2: "TM",
        A3: "TKM",
        number: "0795"
      },
      "0796": {
        country: "TURKS AND CAICOS ISLANDS",
        A2: "TC",
        A3: "TCA",
        number: "0796"
      },
      "0798": {
        country: "TUVALU",
        A2: "TV",
        A3: "TUV",
        number: "0798"
      },
      "0800": {
        country: "UGANDA",
        A2: "UG",
        A3: "UGA",
        number: "0800"
      },
      "0804": {
        country: "UKRAINE",
        A2: "UA",
        A3: "UKR",
        number: "0804"
      },
      "0784": {
        country: "UNITED ARAB EMIRATES",
        A2: "AE",
        A3: "ARE",
        number: "0784"
      },
      "0826": {
        country: "UNITED KINGDOM",
        A2: "GB",
        A3: "GBR",
        number: "0826"
      },
      "0840": {
        country: "UNITED STATES",
        A2: "US",
        A3: "USA",
        number: "0840"
      },
      "0581": {
        country: "UNITED STATES MINOR OUTLYING ISLANDS",
        A2: "UM",
        A3: "UMI",
        number: "0581"
      },
      "0858": {
        country: "URUGUAY",
        A2: "UY",
        A3: "URY",
        number: "0858"
      },
      "0860": {
        country: "UZBEKISTAN",
        A2: "UZ",
        A3: "UZB",
        number: "0860"
      },
      "0548": {
        country: "VANUATU",
        A2: "VU",
        A3: "VUT",
        number: "0548"
      },
      "0862": {
        country: "VENEZUELA",
        A2: "VE",
        A3: "VEN",
        number: "0862"
      },
      "0704": {
        country: "VIET NAM",
        A2: "VN",
        A3: "VNM",
        number: "0704"
      },
      "0092": {
        country: "VIRGIN ISLANDS (BRITISH)",
        A2: "VG",
        A3: "VGB",
        number: "0092"
      },
      "0850": {
        country: "VIRGIN ISLANDS (U.S.)",
        A2: "VI",
        A3: "VIR",
        number: "0850"
      },
      "0876": {
        country: "WALLIS AND FUTUNA ISLANDS",
        A2: "WF",
        A3: "WLF",
        number: "0876"
      },
      "0732": {
        country: "WESTERN SAHARA",
        A2: "EH",
        A3: "ESH",
        number: "0732"
      },
      "0887": {
        country: "YEMEN",
        A2: "YE",
        A3: "YEM",
        number: "0887"
      },
      "0891": {
        country: "YUGOSLAVIA",
        A2: "YU",
        A3: "YUG",
        number: "0891"
      },
      "0894": {
        country: "ZAMBIA",
        A2: "ZM",
        A3: "ZMB",
        number: "0894"
      },
      "0716": {
        country: "ZIMBABWE",
        A2: "ZW",
        A3: "ZWE",
        number: "0716"
      }
    };
  }
});

// node_modules/@kawkab-oss/node-tlv/lib/decoder/Record.js
var require_Record = __commonJS({
  "node_modules/@kawkab-oss/node-tlv/lib/decoder/Record.js"(exports, module2) {
    var toBuffer = require_util().toBuffer;
    var toHexString = require_util().toHexString;
    var toAscii = require_util().toAscii;
    var bitOn = require_util().bitOn;
    function Track1Data(tlv) {
      var desc = [];
      var value = toAscii(tlv.getValue());
      var offset = 0;
      if (value[0] !== "B") {
        desc.push("Invalid format code (tract 1 data): " + value[0]);
        return desc;
      }
      desc.push("FC: " + value[0]);
      offset += 1;
      var idx = value.indexOf("^");
      desc.push("PAN: " + value.substring(offset, idx));
      offset = idx;
      desc.push("FS : (Field Separator): " + value[offset]);
      offset += 1;
      idx = value.indexOf("^", offset);
      desc.push("NM : (Name): " + value.substring(offset, idx));
      offset = idx;
      desc.push("FS : (Field Separator): " + value[offset]);
      offset += 1;
      desc.push("ED : (Expiration data YY/MM): " + value.substring(offset, offset + 2) + "/" + value.substring(offset + 2, offset + 4));
      offset += 4;
      desc.push("SC : (Service Code): " + value.substring(offset, offset + 3));
      offset += 3;
      desc.push("DD : (Discretionary data) : " + value.substring(offset));
      return desc;
    }
    function Track2Data(tlv) {
      var desc = [];
      var value = tlv.getValue();
      var offset = 0;
      var idx = value.indexOf("D");
      if (idx === -1) {
        desc.push("invalid Track 2 equivalent data");
        return desc;
      }
      desc.push("PAN: " + value.substring(offset, idx));
      offset = idx;
      offset += 1;
      desc.push("ED : (Expiration data YY/MM): " + value.substring(offset, offset + 2) + "/" + value.substring(offset + 2, offset + 4));
      offset += 4;
      desc.push("SC : (Service Code): " + value.substring(offset, offset + 3));
      offset += 3;
      idx = value.indexOf("F", offset);
      if (idx !== -1) {
        desc.push("DD : (Discretionary data) : " + value.substring(offset, idx));
      }
      return desc;
    }
    function Track1DiscretionaryData(tlv) {
      var desc = [];
      desc.push(toAscii(tlv.getValue()));
      return desc;
    }
    function CDOL1(tlv) {
      var dol = tlv.parseDolValue();
      var desc = [];
      desc.push("CDOL1: 8C CDOL1 Related Data length: " + toHexString(dol.getDolRelatedDataLength()) + " (" + dol.getDolRelatedDataLength() + ")");
      var dolList = dol.getList();
      dolList.forEach(function(tl) {
        desc.push(tl.getTag() + " " + tl.getL() + " (" + tl.getLength() + ") " + tl.getName());
      });
      return desc;
    }
    function CDOL2(tlv) {
      var dol = tlv.parseDolValue();
      var desc = [];
      desc.push("CDOL2: CDOL2 Related Data length: " + toHexString(dol.getDolRelatedDataLength()) + " (" + dol.getDolRelatedDataLength() + ")");
      var dolList = dol.getList();
      dolList.forEach(function(tl) {
        desc.push(tl.getTag() + " " + tl.getL() + " (" + tl.getLength() + ") " + tl.getName());
      });
      return desc;
    }
    function CVM(data) {
      var value = toBuffer(data);
      var desc = [];
      var code = value[0] & 63;
      desc.push("CVM: " + toHexString(value));
      if ((value[0] & 64) === 64) {
        desc.push("	Move to next rule if verification is unsuccessful");
      } else {
        desc.push("	Fail cardholder verification if this CVM is unsuccessful");
      }
      if (code === 0) {
        desc.push("	Fail CVM processing");
      } else if (code === 1) {
        desc.push("	Plaintext PIN verification performed by ICC");
      } else if (code === 2) {
        desc.push("	Enciphered PIN verified online");
      } else if (code === 3) {
        desc.push("	Plaintext PIN verification performed by ICC and signature(paper)");
      } else if (code === 4) {
        desc.push("	Enciphered PIN verification performed by ICC");
      } else if (code === 5) {
        desc.push("	Enciphered PIN verification performed by ICC and signature (paper)");
      } else if (code === 30) {
        desc.push("	Signature (paper)");
      } else if (code === 31) {
        desc.push("	No CVM required");
      }
      code = value[1];
      if (code === 0) {
        desc.push("	Always");
      } else if (code === 1) {
        desc.push("	If unattended cash");
      } else if (code === 2) {
        desc.push("	If not unattended cash and not manual cash and not purchase with cashback");
      } else if (code === 3) {
        desc.push("	If terminal supports the CVM");
      } else if (code === 4) {
        desc.push("	If manual cash");
      } else if (code === 5) {
        desc.push("	If purchase with cashback");
      } else if (code === 6) {
        desc.push("	If transaction is in the application currency 21 and is under X value (see section 10.5 for a discussion of X)");
      } else if (code === 7) {
        desc.push("	If transaction is in the application currency and is over X value");
      } else if (code === 8) {
        desc.push("	If transaction is in the application currency and is under Y value (see section 10.5 for a discussion of Y)");
      } else if (code === 9) {
        desc.push("	If transaction is in the application currency and is over Y value");
      }
      return desc;
    }
    function CVMList(tlv) {
      value = toBuffer(tlv.getValue());
      this.cvm = [];
      var len = value.length;
      this.amountX = value.slice(0, 4);
      this.amountY = value.slice(4, 8);
      var value = value.slice(8, len);
      var cnt = value.length / 2;
      var offset = 0;
      for (var i = 0; i < cnt; i++) {
        var item = value.slice(offset, offset + 2);
        offset += 2;
        this.cvm.push(item);
      }
      var desc = [];
      desc.push("amount x: " + toHexString(this.amountX));
      desc.push("amount y: " + toHexString(this.amountY));
      this.cvm.forEach(function(item2) {
        desc = desc.concat(CVM(item2));
      });
      return desc;
    }
    function IssuerCountryCode(tlv) {
      var value = tlv.getValue();
      var issuerCountryCode = require_CountryCode();
      var obj = issuerCountryCode[value];
      var desc = [];
      if (obj !== void 0) {
        desc.push("country info: name : " + obj["country"] + " (" + obj["A3"] + ")");
      } else {
        desc.push("unknown country code. plz update ISO3166.");
      }
      return desc;
    }
    function ServiceCode(tlv) {
      var value = tlv.getValue();
      var desc = [];
      var digit = parseInt(value[1]);
      var digit1InterchangeAndTech = {
        0: "0: Reserved for future use by ISO.",
        1: "1: Available for international interchange.",
        2: "2: Available for international interchange and with integrated circuit, which should be used for the financial transaction when feasible.",
        3: "3: Reserved for future use by ISO.",
        4: "4: Reserved for future use by ISO.",
        5: "5: Available for national interchange only, except under bilateral agreement.",
        6: "6: Available for national interchange only, except under bilateral agreement, and with integrated circuit, which should be used for the financial transaction when feasible.",
        7: "7: Not available for general interchange, except under bilateral agreement.",
        8: "8: Reserved for future use by ISO.",
        9: "9: Test."
      };
      desc.push(digit1InterchangeAndTech[digit]);
      digit = parseInt(value[2]);
      var digit2AuthorizingProcessing = {
        0: "0: Transactions are authorized following the normal rules.",
        1: "1: Reserved for future use by ISO.",
        2: "2: Transactions are authorized by issuer and should be online.",
        3: "3: Reserved for future use by ISO.",
        4: "4: Transactions are authorized by issuer and should be online, except under bilateral agreement.",
        5: "5: Reserved for future use by ISO.",
        6: "6: Reserved for future use by ISO.",
        7: "7: Reserved for future use by ISO.",
        8: "8: Reserved for future use by ISO.",
        9: "9: Reserved for future use by ISO."
      };
      desc.push(digit2AuthorizingProcessing[digit]);
      digit = parseInt(value[3]);
      var digit3RangeOfServices = {
        0: "0: No restrictions and PIN required.",
        1: "1: No restrictions.",
        2: "2: Goods and services only (no cash).",
        3: "3: ATM only and PIN required.",
        4: "4: Cash only.",
        5: "5: Goods and services only (no cash) and PIN required.",
        6: "6: No restrictions and require PIN when feasible.",
        7: "7: Goods and services only (no cash) and require PIN when feasible.",
        8: "8: Reserved for future use by ISO.",
        9: "9: Reserved for future use by ISO."
      };
      desc.push(digit3RangeOfServices[digit]);
      return desc;
    }
    function ApplicationUsageControl(tlv) {
      var buff = toBuffer(tlv.getValue());
      var code = buff[0];
      var desc = [];
      desc.push("byte1: " + toHexString(code));
      if ((code & 128) === 128) {
        desc.push("	b8 Valid for domestic cash transactions");
      }
      if ((code & 64) === 64) {
        desc.push("	b7 Valid for international cash transactions");
      }
      if ((code & 32) === 32) {
        desc.push("	b6 Valid for domestic goods");
      }
      if ((code & 16) === 16) {
        desc.push("	b5 Valid for international goods");
      }
      if ((code & 8) === 8) {
        desc.push("	b4 Valid for domestic services");
      }
      if ((code & 4) === 4) {
        desc.push("	b3 Valid for international services");
      }
      if ((code & 2) === 2) {
        desc.push("	b2 Valid at ATMs");
      }
      if ((code & 1) === 1) {
        desc.push("	b1 Valid at terminals other than ATMs");
      }
      code = buff[1];
      desc.push("byte2: " + toHexString(code));
      if ((code & 128) === 128) {
        desc.push("	b8 Domestic cash-back allowed");
      }
      if ((code & 64) === 64) {
        desc.push("	b7 International cash-back allowed");
      }
      return desc;
    }
    function IssuerActionCode(tlv) {
      var desc = [];
      var buf = tlv.getValue("buffer");
      var oneByte = buf[0];
      desc.push("Byte 1: " + toHexString(oneByte));
      if (bitOn(oneByte, 128))
        desc.push("	b8 Offline Data authentication was not performed");
      if (bitOn(oneByte, 64))
        desc.push("	b7 SDA failed");
      if (bitOn(oneByte, 32))
        desc.push("	b6 ICC Data missing");
      if (bitOn(oneByte, 16))
        desc.push("	b5 Card appears on terminal exception file");
      if (bitOn(oneByte, 8))
        desc.push("	b4 DDA failed");
      if (bitOn(oneByte, 4))
        desc.push("	b3 CDA failed");
      oneByte = buf[1];
      desc.push("Byte 2: " + toHexString(oneByte));
      if (bitOn(oneByte, 128))
        desc.push("	b8 Chip card and terminal have different application versions");
      if (bitOn(oneByte, 64))
        desc.push("	b7 Expired application");
      if (bitOn(oneByte, 32))
        desc.push("	b6 Application not yet effective");
      if (bitOn(oneByte, 16))
        desc.push("	b5 Requested service not allowed for card product");
      if (bitOn(oneByte, 8))
        desc.push("	b4 New card");
      oneByte = buf[2];
      desc.push("Byte 3: " + toHexString(oneByte));
      if (bitOn(oneByte, 128))
        desc.push("	b8 Cardholder verification was not successful");
      if (bitOn(oneByte, 64))
        desc.push("	b7 Unrecognized Cardholder Verification Method (CVM)");
      if (bitOn(oneByte, 32))
        desc.push("	b6 PIN Try Limit exceeded");
      if (bitOn(oneByte, 16))
        desc.push("	b5 PIN entry required but PIN pad not present/working");
      if (bitOn(oneByte, 8))
        desc.push("	b4 PIN entry required, PIN pad present but PIN not entered");
      if (bitOn(oneByte, 4))
        desc.push("	b3 Online PIN entered");
      oneByte = buf[3];
      desc.push("Byte 4: " + toHexString(oneByte));
      if (bitOn(oneByte, 128))
        desc.push("	b8 Transaction exceeds floor limit");
      if (bitOn(oneByte, 64))
        desc.push("	b7 Lower consecutive offline limit exceeded");
      if (bitOn(oneByte, 32))
        desc.push("	b6 Upper consecutive offline limit exceeded");
      if (bitOn(oneByte, 16))
        desc.push("	b5 Transaction selected randomly for online processing");
      if (bitOn(oneByte, 8))
        desc.push("	b4 Merchant forced transaction online");
      oneByte = buf[4];
      desc.push("Byte 5: " + toHexString(oneByte));
      if (bitOn(oneByte, 128))
        desc.push("	b8 Default TDOL used");
      if (bitOn(oneByte, 64))
        desc.push("	b7 Issuer Authentication was unsuccessful");
      if (bitOn(oneByte, 32))
        desc.push("	b6 Script processing failed before final GENERATE AC");
      if (bitOn(oneByte, 16))
        desc.push("	b5 Script processing failed after final GENERATE AC");
      return desc;
    }
    module2.exports = {
      Track1Data,
      Track2Data,
      Track1DiscretionaryData,
      CDOL1,
      CDOL2,
      CVMList,
      IssuerCountryCode,
      ServiceCode,
      ApplicationUsageControl,
      IssuerActionCode
    };
  }
});

// node_modules/@kawkab-oss/node-tlv/lib/Dictionary.js
var require_Dictionary = __commonJS({
  "node_modules/@kawkab-oss/node-tlv/lib/Dictionary.js"(exports, module2) {
    function Dictionary() {
    }
    var emvDictionary = {
      "42": "Issuer Identification Number (IIN)",
      "4F": "Application Identifier(AID)",
      "50": "Application Label",
      "57": "Track 2 Equivalent Data",
      "5A": "Application Primary Account Number (PAN)",
      "5F20": "Cardholder Name",
      "5F24": "Application Expiration Date",
      "5F25": "Application Effective Date",
      "5F28": "Issuer Country Code",
      "5F2A": "Transaction Currency Code",
      "5F2D": "Language Preference",
      "5F30": "Service Code",
      "5F34": "Application Primary Account Number (PAN) Sequence Number",
      "5F36": "Transaction Currency Exponent",
      "5F50": "Issuer URL",
      "5F53": "International Bank Account Number (IBAN)",
      "5F54": "Bank Identifier Code (BIC)",
      "5F55": "Issuer Country Code (alpha2 format)",
      "5F56": "Issuer Country Code (alpha3 format)",
      "61": "Application Template",
      "6F": "File Control Information (FCI) Template",
      "70": "READ RECORD Response Message Template",
      "71": "Issuer Script Template 1",
      "72": "Issuer Script Template 2",
      "73": "Directory Discretionary Template",
      "77": "Response Message Template Format 2",
      "80": "Response Message Template Format 1",
      "81": "Amount, Authorised (Binary)",
      "82": "Application Interchange Profile",
      "83": "Command Template",
      "84": "Dedicated File (DF) Name",
      "86": "Issuer Script Command",
      "87": "Application Priority Indicator",
      "88": "Short File Identifier (SFI)",
      "89": "Authorisation Code",
      "8A": "Authorisation Response Code",
      "8C": "Card Risk Management Data Object List 1 (CDOL1)",
      "8D": "Card Risk Management Data Object List 2 (CDOL2)",
      "8E": "Cardholder Verification Method (CVM) List",
      "8F": "Certification Authority Public Key Index",
      "90": "Issuer Public Key Certificate",
      "91": "Issuer Authentication Data",
      "92": "Issuer Public Key Remainder",
      "93": "Signed Static Application Data",
      "94": "Application File Locator (AFL) (contact)",
      "95": "Terminal Verification Results",
      "97": "Transaction Certificate Data Object List (TDOL)",
      "98": "Transaction Certificate (TC) Hash Value",
      "99": "Transaction Personal Identification Number (PIN) Data",
      "9A": "Transaction Date",
      "9B": "Transaction Status Information",
      "9C": "Transaction Type",
      "9D": "Directory Definition File (DDF) Name",
      "9F01": "Acquirer Identifier",
      "9F02": "Amount, Authorised (Numeric)",
      "9F03": "Amount, Other (Numeric)",
      "9F04": "Amount, Other (Binary)",
      "9F05": "Application Discretionary Data",
      "9F06": "Application Identifier (AID) - terminal",
      "9F07": "Application Usage Control",
      "9F08": "Application Version Number",
      "9F09": "Application Version Number",
      "9F0B": "Cardholder Name Extended",
      "9F0D": "Issuer Action Code - Default",
      "9F0E": "Issuer Action Code - Denial",
      "9F0F": "Issuer Action Code - Online",
      "9F10": "Issuer Application Data",
      "9F11": "Issuer Code Table Index",
      "9F12": "Application Preferred Name",
      "9F13": "Last Online Application Transaction Counter (ATC) Register",
      "9F14": "Lower Consecutive Offline Limit",
      "9F15": "Merchant Category Code",
      "9F16": "Merchant Identifier",
      "9F18": "Issuer Script Identifier",
      "9F1A": "Terminal Country Code",
      "9F1B": "Terminal Floor Limit",
      "9F1C": "Terminal Identification",
      "9F1D": "Terminal Risk Management Data",
      "9F1E": "Interface Device (IFD) Serial Number",
      "9F1F": "Track 1 Discretionary Data",
      "9F20": "Track 2 Discretionary Data",
      "9F21": "Transaction Time",
      "9F23": "Upper Consecutive Offline Limit",
      "9F26": "Application Cryptogram",
      "9F27": "Cryptogram Information Data",
      "9F2D": "ICC PIN Encipherment Public Key Certificate",
      "9F2E": "ICC PIN Encipherment Public Key Exponent",
      "9F2F": "ICC PIN Encipherment Public Key Remainder",
      "9F32": "Issuer Public Key Exponent",
      "9F33": "Terminal Capabilities",
      "9F34": "Cardholder Verification Method (CVM) Results",
      "9F35": "Terminal Type",
      "9F36": "Application Transaction Counter (ATC)",
      "9F37": "Unpredictable Number",
      "9F38": "Processing Options Data Object List (PDOL)",
      "9F39": "Point-of-Service (POS) Entry Mode",
      "9F3A": "Amount, Reference Currency",
      "9F3B": "Application Reference Currency",
      "9F3C": "Transaction Reference Currency Code",
      "9F3D": "Transaction Reference Currency Exponent",
      "9F40": "Additional Terminal Capabilities",
      "9F41": "Transaction Sequence Counter",
      "9F42": "Application Currency Code",
      "9F43": "Application Reference Currency Exponent",
      "9F44": "Application Currency Exponent",
      "9F45": "Data Authentication Code",
      "9F46": "ICC Public Key Certificate",
      "9F47": "ICC Public Key Exponent",
      "9F48": "ICC Public Key Remainder",
      "9F49": "Dynamic Data Authentication Data Object List (DDOL)",
      "9F4A": "Static Data Authentication Tag List",
      "9F4B": "Signed Dynamic Application Data",
      "9F4C": "ICC Dynamic Number",
      "9F4D": "Log Entry",
      "9F4E": "Merchant Name and Location",
      "9F4F": "Log Format",
      "9F7C": "Merchant Custom Data",
      "A5": "File Control Information (FCI) Proprietary Template",
      "BF0C": "File Control Information (FCI) Issuer Discretionary Data",
      "D9": "Application File Locator (AFL) (contactless)",
      "9F29": "Extended Selection",
      "9F2A": "Kernel Identifier",
      "5F57": "Account Type",
      "9F50": "Offline Accumulator Balance",
      "9F52": "Card Verification Result",
      "9F53": "Transaction Category Code",
      "9F5D": "Application Capabilities Information",
      "9F5E": "DS ID",
      "9F60": "CVC3 (Track1)",
      "9F61": "CVC3 (Track2)",
      "9F69": "UDOL",
      "9F6A": "Unpredictable Number (Numeric)",
      "9F6D": "Mag-stripe Application Version Number (Reader)",
      "9F6E": "Third Party Data",
      "9F70": "Protected Data Envelope 1",
      "9F71": "Protected Data Envelope 2",
      "9F72": "Protected Data Envelope 3",
      "9F73": "Protected Data Envelope 4",
      "9F74": "Protected Data Envelope 5",
      "9F75": "Unprotected Data Envelope 1",
      "9F76": "Unprotected Data Envelope 2",
      "9F77": "Unprotected Data Envelope 3",
      "9F78": "Unprotected Data Envelope 4",
      "9F79": "Unprotected Data Envelope 5",
      "DF41": "DS Management Control",
      "DF4B": "POS Cardholder Interaction Information",
      "DF60": "DS Input (Card)",
      "DF61": "DS Digest H",
      "DF62": "DS ODS Info",
      "DF63": "DS ODS Term",
      "DF8104": "Balance Read Before Gen AC",
      "DF8105": "Balance Read After Gen AC",
      "DF8106": "Data Needed",
      "DF8107": "CDOL1 Related Data",
      "DF8108": "DS AC Type",
      "DF8109": "DS Input (Term)",
      "DF810A": "DS ODS Info For Reader",
      "DF810B": "DS Summary Status",
      "DF810C": "Kernel ID",
      "DF810D": "DSVN Term",
      "DF810E": "Post-Gen AC Put Data Status",
      "DF810F": "Pre-Gen AC Put Data Status",
      "DF8110": "Proceed To First Write Flag",
      "DF8111": "PDOL Related Data",
      "DF8112": "Tags To Read",
      "DF8113": "DRDOL Related Data",
      "DF8114": "Reference Control Parameter",
      "DF8115": "Error Indication",
      "DF8116": "User Interface Request Data",
      "DF8117": "Card Data Input Capability",
      "DF8118": "CVM Capability \u2013 CVM Required",
      "DF8119": "CVM Capability \u2013 No CVM Required",
      "DF811A": "Default UDOL",
      "DF811B": "Kernel Configuration",
      "DF811C": "Max Lifetime of Torn Transaction Log Record",
      "DF811D": "Max Number of Torn Transaction Log Records",
      "DF811E": "Mag-stripe CVM Capability \u2013 CVM Required",
      "DF811F": "Security Capability",
      "DF8120": "Terminal Action Code \u2013 Default",
      "DF8121": "Terminal Action Code \u2013 Denial",
      "DF8122": "Terminal Action Code \u2013 Online",
      "DF8123": "Reader Contactless Floor Limit",
      "DF8124": "Reader Contactless Transaction Limit (No On-device CVM)",
      "DF8125": "Reader Contactless Transaction Limit (On-device CVM)",
      "DF8126": "Reader CVM Required Limit",
      "DF8127": "Time Out Value",
      "DF8128": "IDS Status",
      "DF8129": "Outcome Parameter Set",
      "DF812A": "DD Card (Track1)",
      "DF812B": "DD Card (Track2)",
      "DF812C": "Mag-stripe CVM Capability \u2013 No CVM Required",
      "DF812D": "Message Hold Time",
      "DF8130": "Hold Time Value",
      "DF8131": "Phone Message Table",
      "DF8132": "Minimum Relay Resistance Grace Period",
      "DF8133": "Maximum Relay Resistance Grace Period",
      "DF8134": "Terminal Expected Transmission Time For Relay Resistance CAPDU",
      "DF8135": "Terminal Expected Transmission Time For Relay Resistance RAPDU",
      "DF8136": "Relay Resistance Accuracy Threshold",
      "DF8137": "Relay Resistance Transmission Time Mismatch Threshold",
      "FF8101": "Torn Record",
      "FF8102": "Tags To Write Before Gen AC",
      "FF8103": "Tags To Write After Gen AC",
      "FF8104": "Data To Send",
      "FF8105": "Data Record",
      "FF8106": "Discretionary Data",
      "C6": "PIN Try Limit",
      "9F17": "PIN Try Counter",
      "9F6C": "Mag Stripe Application Version Number",
      "9F62": "Track 1 Bit Map for CVC3 (PCVC3TRACK1)",
      "9F63": "Track 1 Bit Map for UN and ATC (PUNATCTRACK1)",
      "56": "Track 1 Data",
      "9F64": "Track 1 Nr of ATC Digits (NATCTRACK1)",
      "9F65": "Track 2 Bit Map for CVC3 (PCVC3TRACK2)",
      "9F66": "Track 2 Bit Map for UN and ATC (PUNATCTRACK2)",
      "9F6B": "Track 2 Data",
      "9F67": "Track 2 Nr of ATC Digits (NATCTRACK2)",
      "9F5B": "DSDOL",
      "9F51": "DRDOL",
      "9F5F": "DS Slot Availability",
      "9F7F": "DS Unpredictable Number",
      "9F7D": "DS Summary 1",
      "9F6F": "DS Slot Management Control",
      "9F54": "DS ODS Card",
      "DF36": "PIN Decipherments Error Counter Limit",
      "DF3A": "AC Session Key Counter Limit (contact)",
      "DF32": "SMI Session Key Counter Limit (contact)",
      "DF34": "AC Session Key Counter Limit (contactless)",
      "DF33": "SMI Session Key Counter Limit (contactless)",
      "C9": "Accumulator 1 Currency Code",
      "D1": "Accumulator 1 Currency Conversion Table",
      "CA": "Accumulator 1 Lower Limit",
      "CB": "Accumulator 1 Upper Limit",
      "DF16": "Accumulator 2 Currency Code",
      "DF17": "Accumulator 2 Currency Conversion Table",
      "DF18": "Accumulator 2 Lower Limit",
      "DF19": "Accumulator 2 Upper Limit",
      "D3": "Additional check table",
      "9F7E": "Application life cycle data",
      "C7": "CDOL1 related data length",
      "DF1F": "Counter 2 Lower Limit",
      "DF21": "Counter 2 Upper Limit",
      "C8": "CRM Country Code",
      "D6": "Default ARPC Response Code",
      "DE": "Log Data Table",
      "DF24": "MTA Currency Code",
      "DF27": "Number of Days Offline Limit",
      "DF11": "Accumulator 1 Control (contact)",
      "DF12": "Accumulator 1 Control (contactless)",
      "DF28": "Accumulator 1 CVR Dependency Data (contact)",
      "DF29": "Accumulator 1 CVR Dependency Data (contactless)",
      "DF14": "Accumulator 2 Control (contact)",
      "DF15": "Accumulator 2 Control (contactless)",
      "DF2A": "Accumulator 2 CVR Dependency Data (contact)",
      "DF2B": "Accumulator 2 CVR Dependency Data (contactless)",
      "D5": "Application Control (contact)",
      "D7": "Application Control  (contactless) ",
      "D8": "Application Interchange Profile contactless",
      "C4": "Card Issuer Action Code \u2013 Default (contact)",
      "CD": "Card Issuer Action Code \u2013 Default (contactless) ",
      "C5": "Card Issuer Action Code - Online (contact)",
      "CE": "Card Issuer Action Code - Online (contactless)",
      "C3": "Card Issuer Action Code - Decline (contact)",
      "CF": "Card Issuer Action Code - Decline (contactless)",
      "DF1A": "Counter 1 control (Contact)",
      "DF1B": "Counter 1 control (contactless)",
      "DF2C": "Counter 1 CVR Dependency Data (Contact)",
      "DF2D": "Counter 1 CVR Dependency Data (contactless)",
      "DF1D": "Counter 2 control (Contact)",
      "DF1E": "Counter 2 control (contactless)",
      "DF2E": "Counter 2 CVR Dependency Data (Contact)",
      "DF2F": "Counter 2 CVR Dependency Data (contactless)",
      "DF30": "Interface Enabling Switch",
      "DF22": "MTA CVM (contact)",
      "DF23": "MTA CVM (contactless)",
      "DF25": "MTA NoCVM (contact)",
      "DF26": "MTA NoCVM (contactless)",
      "DF3F": "Read Record Filter (contact)",
      "DF40": "Read Record Filter (contactless)",
      "DF3E": "Interface Identifier (contactless)",
      "DF3C": "CVR Issuer Discretionary Data (contact)",
      "DF3D": "CVR Issuer Discretionary Data (contactless)",
      "DF3B": "Accumulator 1 Amount",
      "DF13": "Accumulator 2 Amount",
      "DF1C": "Counter 1 Number",
      "DF20": "Counter 2 Number",
      "DF38": "ICVC3 TRACK1 (contact)",
      "DC": "ICVC3 TRACK1 (contactless)",
      "DF39": "ICVC3 TRACK2 (contact)",
      "DD": "ICVC3 TRACK2 (contactless)",
      "9F5C": "DS Requested Operator ID",
      "C1": "Application Control"
    };
    Dictionary.setTlv = function(tag) {
    };
    var toNumber = require_util().toNumber;
    var gpoResp = require_Gpo();
    var record = require_Record();
    var func = [];
    function Map(tag) {
      tag = toNumber(tag);
      return func[tag];
    }
    Map.TAG_CARDHOLDER_NAME = 24352;
    Map.TAG_CDOL1 = 140;
    Map.TAG_CDOL2 = 141;
    Map.TAG_CVMLIST = 142;
    Map.TAG_ISSUER_COUNTRYT_CODE = 24360;
    Map.TAG_SERVICE_CODE = 24368;
    Map.TAG_AIP = 130;
    Map.TAG_AIP_CL = 216;
    func[Map.TAG_CARDHOLDER_NAME] = record.CardHolderName;
    func[Map.TAG_CDOL1] = record.CDOL1;
    func[Map.TAG_CDOL2] = record.CDOL2;
    func[Map.TAG_ISSUER_COUNTRYT_CODE] = record.IssuerCountryCode;
    func[Map.TAG_SERVICE_CODE] = record.ServiceCode;
    func[Map.TAG_AIP] = gpoResp.ApplicationInterchangeProfile;
    func[Map.TAG_AIP_CL] = gpoResp.ApplicationInterchangeProfile;
    Dictionary.getName = function(tag) {
      return emvDictionary[tag];
    };
    Dictionary.getInfo = function(tlv) {
      tlv.desc = Map(tlv.getTag());
      tlv.setName(Dictionary.getName());
    };
    module2.exports = Dictionary;
  }
});

// node_modules/@kawkab-oss/node-tlv/lib/decoder/Select.js
var require_Select = __commonJS({
  "node_modules/@kawkab-oss/node-tlv/lib/decoder/Select.js"(exports, module2) {
    var toHexString = require_util().toHexString;
    function Pdol(tlv) {
      var dol = tlv.parseDolValue();
      var desc = [];
      desc.push("PDOL: " + tlv.getTag() + " PDOL Related Data length: " + toHexString(dol.getDolRelatedDataLength()) + " (" + dol.getDolRelatedDataLength() + ")");
      var dolList = dol.getList();
      dolList.forEach(function(tl) {
        desc.push(tl.getTag() + " " + tl.getL() + " (" + tl.getLength() + ") " + tl.getName());
      });
      return desc;
    }
    module2.exports = {
      Pdol
    };
  }
});

// node_modules/@kawkab-oss/node-tlv/lib/decoder/json/TerminalType.json
var require_TerminalType = __commonJS({
  "node_modules/@kawkab-oss/node-tlv/lib/decoder/json/TerminalType.json"(exports, module2) {
    module2.exports = {
      "11": {
        operator: "Financial Institution",
        type: "Online only",
        environment: "attended"
      },
      "12": {
        operator: "Financial Institution",
        type: "Offline with online capabilities",
        environment: "attended"
      },
      "13": {
        operator: "Financial Institution",
        type: "Offline only",
        environment: "attended"
      },
      "14": {
        operator: "Financial Institution",
        type: "Online only",
        environment: "unattended"
      },
      "15": {
        operator: "Financial Institution",
        type: "Offline with online capabilities",
        environment: "unattended"
      },
      "16": {
        operator: "Financial Institution",
        type: "Offline only",
        environment: "unattended"
      },
      "21": {
        operator: "Merchant",
        type: "Online only",
        environment: "attended"
      },
      "22": {
        operator: "Merchant",
        type: "Offline with online capabilities",
        environment: "attended"
      },
      "23": {
        operator: "Merchant",
        type: "Offline only",
        environment: "attended"
      },
      "24": {
        operator: "Merchant",
        type: "Online only",
        environment: "unattended"
      },
      "25": {
        operator: "Merchant",
        type: "Offline with online capabilities",
        environment: "unattended"
      },
      "26": {
        operator: "Merchant",
        type: "Offline only",
        environment: "unattended"
      },
      "34": {
        operator: "Cardholder",
        type: "Online only",
        environment: "unattended"
      },
      "35": {
        operator: "Cardholder",
        type: "Offline with online capabilities",
        environment: "unattended"
      },
      "36": {
        operator: "Cardholder",
        type: "Offline only",
        environment: "unattended"
      }
    };
  }
});

// node_modules/@kawkab-oss/node-tlv/lib/decoder/Gac.js
var require_Gac = __commonJS({
  "node_modules/@kawkab-oss/node-tlv/lib/decoder/Gac.js"(exports, module2) {
    var ut = require_util();
    var toHexString = ut.toHexString;
    var toBuffer = ut.toBuffer;
    var bitOn = ut.bitOn;
    var u1 = ut.u1;
    var u2 = ut.u2;
    var un = ut.un;
    function CryptogramInformationData(tlv) {
      var desc = [];
      var value = tlv.getValue("buffer");
      var code;
      code = value[0] & 192;
      if (code == 128) {
        desc.push("10XX XXXX ARQC (Authorization Request Cryptogram): Online authorisation requested");
      } else if (code == 64) {
        desc.push("01XX XXXX TC (Transaction Certificate): Transaction approved");
      } else if (code == 0) {
        desc.push("00XX XXXX AAC (Application Authentication Cryptogram): Transaction declined");
      }
      return desc;
    }
    function IssuerApplicationData(tlv) {
      var buf = tlv.getValue("buffer");
      var format = buf[0];
      switch (format) {
        case 15:
          return [" Issuer Application Data for a Common Core DefinitionsCompliant Application"];
        case 6:
        case 31:
          return IssuerApplicationDataVisa(tlv);
        default:
          return IssuerApplicationDataMaster(tlv);
      }
    }
    function IssuerApplicationDataMaster(tlv) {
      var desc = [];
      var buf = tlv.getValue("buffer");
      var len = buf.length;
      var offset = 0;
      desc.push("Key Derivation index: " + u1(buf, offset));
      offset += 1;
      desc.push("Cryptogram version number: " + u1(buf, offset));
      offset += 1;
      var cvr = un(buf, offset, 6);
      offset += 6;
      desc = desc.concat(CardVerificationResultsMaster(cvr));
      desc.push("DAC/ICC Dynamic Number: " + u2(buf, offset));
      offset += 2;
      var remainder = len - offset;
      switch (remainder) {
        case 8:
        case 16:
          desc.push("Plaintext/Encrypted Counters: " + un(buf, offset, remainder));
          offset += remainder;
          break;
        case 10:
        case 18:
          desc.push("Plaintext/Encrypted Counters: " + un(buf, offset, remainder));
          offset += remainder;
          desc.push("Last Online ATC");
          offset += 2;
          break;
      }
      return desc;
    }
    function IssuerApplicationDataVisa(tlv) {
      var desc = [];
      var buf = tlv.getValue("buffer");
      var offset = 0;
      desc.push("length of  Visa Discretionary Data: " + u1(buf, offset));
      offset += 1;
      if (buf[0] === 6) {
        desc.push("Derivation key index: " + u1(buf, offset));
        offset += 1;
        desc.push("Cryptogram version number: " + u1(buf, offset));
        offset += 1;
        var cvr = un(buf, offset, 4);
        offset += 4;
        var data = CardVerificationResultsVisa(cvr);
        desc = desc.concat(data);
        var discretionary_data = un(buf, offset);
        if (discretionary_data !== "") {
          desc.push("Issuer Discretionary Data:" + discretionary_data);
        }
      } else if (buf[0] === 31) {
        desc.push("Cryptogram version number: " + u1(buf, offset));
        offset += 1;
        desc.push("Derivation key index: " + u1(buf, offset));
        offset += 1;
        desc.push("Card Verifcation Result: " + un(buf, offset, 5));
        offset += 5;
        desc.push("Issuer Discretionary Data:" + un(buf, offset));
      }
      return desc;
    }
    function CardVerificationResultsMaster(buf) {
      var desc = [];
      buf = toBuffer(buf);
      desc.push("Card Verification Result: " + toHexString(buf));
      desc.push("byte1: " + toHexString(buf[0]));
      var code = buf[0] & 192;
      if (code == 0) {
        desc.push("	b8-7 00: AAC Returned In Second Generate AC");
      } else if (code == 64) {
        desc.push("	b8-7 01: TC Returned In Second Generate AC");
      } else if (code == 128) {
        desc.push("	b8-7 10: AC Not Requested In Second Generate AC");
      }
      code = buf[0] & 48;
      if (code == 0) {
        desc.push("	b6-5 00: AAC Returned In First Generate AC");
      } else if (code == 32) {
        desc.push("	b6-5 10: ARQC Returned In First Generate AC");
      } else if (code == 16) {
        desc.push("	b6-5 01: TC Returned In First Generate AC");
      }
      code = buf[0] & 15;
      if ((code & 8) == 8) {
        desc.push("b4 Date Check Failed");
      }
      if ((code & 4) == 4) {
        desc.push("b3 Offline PIN Verification Performed");
      }
      if ((code & 2) == 2) {
        desc.push("b2 Offline Encrypted PIN Verification Performed");
      }
      if ((code & 1) == 1) {
        desc.push("b1 Offline PIN Verification Successful");
      }
      code = buf[1];
      desc.push("byte2: " + toHexString(buf[1]));
      if ((code & 128) == 128) {
        desc.push("	b8 DDA Returned");
      }
      if ((code & 64) == 64) {
        desc.push("	b7 Combined DDA/AC Generation Returned In First Generate AC");
      }
      if ((code & 32) == 32) {
        desc.push("	b6 Combined DDA/AC Generation Returned In Second Generate AC");
      }
      if ((code & 16) == 16) {
        desc.push("	b5 Issuer Authentication Performed");
      }
      if ((code & 8) == 8) {
        desc.push("	b4 CIAC-Default Skipped On CAT3");
      }
      if ((code & 4) == 4) {
        desc.push("	b3 Offline Change PIN Result");
      }
      code = buf[2];
      desc.push("byte3: " + toHexString(code));
      desc.push("	b8-5 Low Order Nibble Of Script Counter: " + (code >>> 4));
      desc.push("	b4-1 Low Order Nibble Of PIN Try Counter: " + (code & 15));
      code = buf[3];
      desc.push("byte4: " + toHexString(code));
      if ((code & 128) == 128) {
        desc.push("	b8 Last Online Transaction Not Completed");
      }
      if ((code & 64) == 64) {
        desc.push("	b7 Unable To Go Online Indicated");
      }
      if ((code & 32) == 32) {
        desc.push("	b6 Offline PIN Verification Not Performed");
      }
      if ((code & 16) == 16) {
        desc.push("	b5 Offline PIN Verification Failed");
      }
      if ((code & 8) == 8) {
        desc.push("	b4 PTL Exceeded");
      }
      if ((code & 4) == 4) {
        desc.push("	b3 International Transaction");
      }
      if ((code & 2) == 2) {
        desc.push("	b2 Domestic Transaction");
      }
      if ((code & 1) == 1) {
        desc.push("	b1 Terminal Erroneously Considers Offline PIN OK");
      }
      code = buf[4];
      desc.push("byte5: " + toHexString(code));
      if ((code & 128) == 128) {
        desc.push("	b8 Lower Consecutive Counter 1 Limit Exceeded");
      }
      if ((code & 64) == 64) {
        desc.push("	b7 Upper Consecutive Counter 1 Limit Exceeded");
      }
      if ((code & 32) == 32) {
        desc.push("	b6 Lower Cumulative Accumulator 1 Limit Exceeded");
      }
      if ((code & 16) == 16) {
        desc.push("	b5 Upper Cumulative Accumulator 1 Limit Exceeded");
      }
      if ((code & 8) == 8) {
        desc.push("	b4 Go Online On Next Transaction Was Set");
      }
      if ((code & 4) == 4) {
        desc.push("	b3 Issuer Authentication Failed");
      }
      if ((code & 2) == 2) {
        desc.push("	b2 Script Received");
      }
      if ((code & 1) == 1) {
        desc.push("	b1 Script Failed");
      }
      code = buf[5];
      desc.push("byte6: " + toHexString(code));
      if ((code & 128) == 128) {
        desc.push("	b8 Lower Consecutive Counter 2 Limit Exceeded");
      }
      if ((code & 64) == 64) {
        desc.push("	b7 Upper Consecutive Counter 2 Limit Exceeded");
      }
      if ((code & 32) == 32) {
        desc.push("	b6 Lower Cumulative Accumulator 2 Limit Exceeded");
      }
      if ((code & 16) == 16) {
        desc.push("	b5 Upper Cumulative Accumulator 2 Limit Exceeded");
      }
      if ((code & 8) == 8) {
        desc.push("	b4 MTA Limit Exceeded");
      }
      if ((code & 4) == 4) {
        desc.push("	b3 Number Of Days Offline Limit Exceeded");
      }
      if ((code & 2) == 2) {
        desc.push("	b2 Match Found In Additional Check Table");
      }
      if ((code & 1) == 1) {
        desc.push("	b1 No Match Found In Additional Check Table");
      }
      return desc;
    }
    function CardVerificationResultsVisa(buf) {
      buf = toBuffer(buf);
      var desc = [];
      desc.push("Card Verification Result: " + toHexString(buf));
      if (buf[0] === 3) {
        desc.push("byte 1: CVR length: " + toHexString(buf[0]));
      } else {
        desc.push("byte 1: " + toHexString(buf[0]));
      }
      var oneByte = buf[1] & 48;
      desc.push("byte2: " + toHexString(buf[1]));
      if (oneByte == 0) {
        desc.push("	b8-7 00: AAC Returned In Second Generate AC");
      } else if (oneByte == 64) {
        desc.push("	b8-7 01: TC Returned In Second Generate AC");
      } else if (oneByte == 128) {
        desc.push("	b8-7 10: AC Not Requested In Second Generate AC");
      }
      oneByte = buf[1] & 48;
      if (oneByte == 0) {
        desc.push("	b6-5 00: AAC Returned In First Generate AC");
      } else if (oneByte == 32) {
        desc.push("	b6-5 10: ARQC Returned In First Generate AC");
      } else if (oneByte == 16) {
        desc.push("	b6-5 01: TC Returned In First Generate AC");
      }
      oneByte = buf[1] & 15;
      if (bitOn(oneByte, 8))
        desc.push("	b4 Issuer Authentication performed and failed");
      if (bitOn(oneByte, 4))
        desc.push("	b3 Offline PIN verification performed");
      if (bitOn(oneByte, 2))
        desc.push("	b2 Offline PIN verification failed");
      if (bitOn(oneByte, 1))
        desc.push("	b1 Unable to go online");
      oneByte = buf[2];
      desc.push("byte3: " + toHexString(buf[2]));
      if (bitOn(oneByte, 128))
        desc.push("	b8 Last online transaction not completed");
      if (bitOn(oneByte, 64))
        desc.push("	b7 PIN Try Limit exceeded");
      if (bitOn(oneByte, 32))
        desc.push("	b6 Exceeded velocity checking counters");
      if (bitOn(oneByte, 16))
        desc.push("	b5 New card");
      if (bitOn(oneByte, 8))
        desc.push("	b4 Issuer Authentication failure on last online transaction");
      if (bitOn(oneByte, 4))
        desc.push("	b3 Issuer Authentication not performed after online authorization");
      if (bitOn(oneByte, 2))
        desc.push("	b2 Application blocked by card because PIN Try Limit exceeded");
      if (bitOn(oneByte, 1))
        desc.push("	b1 Offline static data authentication failed on last transaction and transaction declined offline");
      oneByte = buf[3];
      desc.push("byte4: " + toHexString(buf[3]));
      desc.push("	b8-5 Number of Issuer Script commands: " + (buf[3] >> 4));
      if (bitOn(oneByte, 8))
        desc.push("	b4 Issuer Script processing failed");
      if (bitOn(oneByte, 4))
        desc.push("	b3 Offline dynamic data authentication failed on last transaction and transaction declined offline");
      if (bitOn(oneByte, 2))
        desc.push("	b2 Offline dynamic data authentication performed");
      if (bitOn(oneByte, 1))
        desc.push("	b1 PIN verification command not received for a PINExpecting card");
      if (buf[0] !== 3) {
        oneByte = buf[4];
        desc.push("byte3: " + toHexString(buf[4]));
        if (bitOn(oneByte, 2))
          desc.push("	b2 CDCVM Successfully Performed");
        if (bitOn(oneByte, 1))
          desc.push("	b1 Secure Messaging uses EMV Session keybased derivation");
      }
      return desc;
    }
    function TerminalType(tlv) {
      var terminalType = require_TerminalType();
      var key = tlv.getValue();
      var obj = terminalType[key];
      var desc = [];
      if (obj !== void 0) {
        var str;
        str = "environment: " + obj["environment"] + " ";
        str += "operator: " + obj["operator"] + " ";
        str += "transaction type: " + obj["type"];
        desc.push(str);
      } else {
        desc.push("unknown terminal type");
      }
      return desc;
    }
    module2.exports = {
      CryptogramInformationData,
      IssuerApplicationData,
      TerminalType
    };
  }
});

// node_modules/@kawkab-oss/node-tlv/lib/decoder/GetData.js
var require_GetData = __commonJS({
  "node_modules/@kawkab-oss/node-tlv/lib/decoder/GetData.js"(exports, module2) {
    var bitOn = require_util().bitOn;
    var toHexString = require_util().toHexString;
    function CardIssuerActionCode4Master(tlv) {
      var desc = [];
      var buf = tlv.getValue("buffer");
      var oneByte;
      oneByte = buf[0];
      desc.push("Byte 1: " + toHexString(oneByte));
      if (bitOn(oneByte, 128))
        desc.push("	b8 Last Online Transaction Not Completed");
      if (bitOn(oneByte, 64))
        desc.push("	b7 Unable To Go Online Indicated");
      if (bitOn(oneByte, 32))
        desc.push("	b6 Offline PIN Verification Not Performed");
      if (bitOn(oneByte, 16))
        desc.push("	b5 Offline PIN Verification Failed");
      if (bitOn(oneByte, 8))
        desc.push("	b4 PTL Exceeded");
      if (bitOn(oneByte, 4))
        desc.push("	b3 International Transaction");
      if (bitOn(oneByte, 2))
        desc.push("	b2 Domestic Transaction");
      if (bitOn(oneByte, 1))
        desc.push("	b1 Terminal Erroneously Considers Offline PIN OK");
      oneByte = buf[1];
      desc.push("Byte 2: " + toHexString(oneByte));
      if (bitOn(oneByte, 128))
        desc.push("	b8 Lower Consecutive Counter 1 Limit Exceeded");
      if (bitOn(oneByte, 64))
        desc.push("	b7 Upper Consecutive Counter 1 Limit Exceeded");
      if (bitOn(oneByte, 32))
        desc.push("	b6 Lower Cumulative Accumulator 1 Limit Exceeded");
      if (bitOn(oneByte, 16))
        desc.push("	b5 Upper Cumulative Accumulator 1 Limit Exceeded");
      if (bitOn(oneByte, 8))
        desc.push("	b4 Go Online On Next Transaction Was Set");
      if (bitOn(oneByte, 4))
        desc.push("	b3 Issuer Authentication Failed");
      if (bitOn(oneByte, 2))
        desc.push("	b2 Script Received");
      if (bitOn(oneByte, 1))
        desc.push("	b1 Script Failed");
      oneByte = buf[2];
      desc.push("Byte 3: " + toHexString(oneByte));
      if (bitOn(oneByte, 128))
        desc.push("	b8 Lower Consecutive Counter 2 Limit Exceeded");
      if (bitOn(oneByte, 64))
        desc.push("	b7 Upper Consecutive Counter 2 Limit Exceeded");
      if (bitOn(oneByte, 32))
        desc.push("	b6 Lower Cumulative Accumulator 2 Limit Exceeded");
      if (bitOn(oneByte, 16))
        desc.push("	b5 Upper Cumulative Accumulator 2 Limit Exceeded");
      if (bitOn(oneByte, 8))
        desc.push("	b4 MTA Limit Exceeded");
      if (bitOn(oneByte, 4))
        desc.push("	b3 Number Of Days Offline Limit Exceeded");
      if (bitOn(oneByte, 2))
        desc.push("	b2 Match Found In Additional Check Table");
      if (bitOn(oneByte, 1))
        desc.push("	b1 No Match Found In Additional Check Table");
      return desc;
    }
    function IssuerActionCode(tlv) {
      var desc = [];
      var buf = tlv.getValue("buffer");
      var oneByte;
      oneByte = buf[0];
      desc.push("Byte 1: " + toHexString(oneByte));
      if (bitOn(oneByte, 128))
        desc.push("	b8 Last Online Transaction Not Completed");
      if (bitOn(oneByte, 64))
        desc.push("	b7 Go Online On Next Transaction Was Set");
      if (bitOn(oneByte, 32))
        desc.push("	b6 Issuer Script Processing Failed");
      if (bitOn(oneByte, 16))
        desc.push("	b5 Issuer Authentication Failed");
      if (bitOn(oneByte, 8))
        desc.push("	b4 Issuer Authentication Data Not Received in Previous Online Transaction");
      if (bitOn(oneByte, 4))
        desc.push("	b3 PIN Try Limit Exceeded");
      if (bitOn(oneByte, 2))
        desc.push("	b2 Offline PIN Verification Not Performed");
      if (bitOn(oneByte, 1))
        desc.push("	b1 Offline PIN Verification Failed");
      oneByte = buf[1];
      desc.push("Byte 2: " + toHexString(oneByte));
      if (bitOn(oneByte, 128))
        desc.push("	b8 Unable To Go Online");
      if (bitOn(oneByte, 64))
        desc.push("	b7 Terminal Erroneously Considers Offline PIN OK");
      if (bitOn(oneByte, 32))
        desc.push("	b6 Script Received");
      if (bitOn(oneByte, 16))
        desc.push("	b5 Offline Data Authentication Failed on Previous Transaction");
      if (bitOn(oneByte, 8))
        desc.push("	b4 Match Found In Additional Check Table 1");
      if (bitOn(oneByte, 4))
        desc.push("	b3 No Match Found In Additional Check Table 1");
      if (bitOn(oneByte, 2))
        desc.push("	b2 Match Found In Additional Check Table 2");
      if (bitOn(oneByte, 1))
        desc.push("	b1 No Match Found In Additional Check Table 2");
      oneByte = buf[2];
      desc.push("Byte 3: " + toHexString(oneByte));
      if (bitOn(oneByte, 128))
        desc.push("	b8 Accumulator 1 Lower Limit Exceeded");
      if (bitOn(oneByte, 64))
        desc.push("	b7 Accumulator 2 Lower Limit Exceeded");
      if (bitOn(oneByte, 32))
        desc.push("	b6 Counter 1 Lower Limit Exceeded");
      if (bitOn(oneByte, 16))
        desc.push("	b5 Counter 2 Lower Limit Exceeded");
      if (bitOn(oneByte, 8))
        desc.push("	b4 Counter 3 Lower Limit Exceeded");
      if (bitOn(oneByte, 4))
        desc.push("	b3 Additional Accumulator Lower Limit Exceeded");
      if (bitOn(oneByte, 2))
        desc.push("	b2 Additional Counter Lower Limit Exceeded");
      if (bitOn(oneByte, 1))
        desc.push("	b1 Number of Days Offline Limit Exceeded");
      oneByte = buf[3];
      desc.push("Byte 4: " + toHexString(oneByte));
      if (bitOn(oneByte, 128))
        desc.push("	b8 Accumulator 1 Upper Limit Exceeded");
      if (bitOn(oneByte, 64))
        desc.push("	b7 Accumulator 2 Upper Limit Exceeded");
      if (bitOn(oneByte, 32))
        desc.push("	b6 Counter 1 Upper Limit Exceeded");
      if (bitOn(oneByte, 16))
        desc.push("	b5 Counter 2 Upper Limit Exceeded");
      if (bitOn(oneByte, 8))
        desc.push("	b4 Counter 3 Upper Limit Exceeded");
      if (bitOn(oneByte, 4))
        desc.push("	b3 Additional Accumulator Upper Limit Exceeded");
      if (bitOn(oneByte, 2))
        desc.push("	b2 Additional Counter Upper Limit Exceeded");
      if (bitOn(oneByte, 1))
        desc.push("	b1 MTA exceeded");
      oneByte = buf[4];
      desc.push("Byte 5: " + toHexString(oneByte));
      if (bitOn(oneByte, 128))
        desc.push("	b8 Cyclic Accumulator 1 Limit Exceeded");
      if (bitOn(oneByte, 64))
        desc.push("	b7 Cyclic Accumulator 2 Limit Exceeded");
      if (bitOn(oneByte, 32))
        desc.push("	b6 Additional Cyclic Accumulator Limit Exceeded");
      if (bitOn(oneByte, 16))
        desc.push("	b5 Check Failed");
      if (bitOn(oneByte, 8))
        desc.push("	b4 RFU");
      if (bitOn(oneByte, 4))
        desc.push("	b3 RFU");
      if (bitOn(oneByte, 2))
        desc.push("	b2 RFU");
      if (bitOn(oneByte, 1))
        desc.push("	b1 RFU");
      oneByte = buf[5];
      desc.push("Byte 6: " + toHexString(oneByte));
      if (bitOn(oneByte, 128))
        desc.push("	b8 RFU for Issuer");
      if (bitOn(oneByte, 64))
        desc.push("	b7 RFU for Issuer");
      if (bitOn(oneByte, 32))
        desc.push("	b6 RFU for Issuer");
      if (bitOn(oneByte, 16))
        desc.push("	b5 RFU for Issuer");
      if (bitOn(oneByte, 8))
        desc.push("	b4 RFU for Issuer");
      if (bitOn(oneByte, 4))
        desc.push("	b3 RFU for Issuer");
      if (bitOn(oneByte, 2))
        desc.push("	b2 RFU for Issuer");
      if (bitOn(oneByte, 1))
        desc.push("	b1 RFU for Issuer");
      return desc;
    }
    function ApplicationControl(tlv) {
      var desc = [];
      var buf = tlv.getValue("buffer");
      var oneByte;
      oneByte = buf[0];
      desc.push("byte1: " + toHexString(oneByte));
      if (bitOn(oneByte, 128))
        desc.push("	b8 Accept Online Transactions Without ARPC");
      if (bitOn(oneByte, 64))
        desc.push("	b7 Skip CIAC-Default On CAT3");
      if (bitOn(oneByte, 32))
        desc.push("	b6 RFU");
      if (bitOn(oneByte, 16)) {
        desc.push("	b5 Key For Offline Encrypted PIN Verification 1: Dedicated Key");
      } else {
        desc.push("	b5 Key For Offline Encrypted PIN Verification 0: DDA Key");
      }
      if (bitOn(oneByte, 8)) {
        desc.push("	b4 Offline Encrypted PIN Verification");
      } else {
        desc.push("	b4 Offline Encrypted PIN verification is not supported");
      }
      if (bitOn(oneByte, 4)) {
        desc.push("	b3 Offline Plaintext PIN Verification");
      } else {
        desc.push("	b3 Offline Plaintext PIN verification is not supported");
      }
      if (bitOn(oneByte, 2)) {
        desc.push("	b2 Session Key Derivation 1: EMV CSK");
      } else {
        desc.push("	b2 Session Key Derivation 0: MasterCard Proprietary SKD");
      }
      if (bitOn(oneByte, 1))
        desc.push("	b1 Encrypt Offline Counters");
      oneByte = buf[1];
      desc.push("byte2: " + toHexString(oneByte));
      if (bitOn(oneByte, 4))
        desc.push("	b3 Additional Check Table");
      if (bitOn(oneByte, 2))
        desc.push("	b2 Allow Retrieval Of Balance");
      if (bitOn(oneByte, 1))
        desc.push("	b1 Include Counters In AC");
      oneByte = buf[2];
      desc.push("byte3: " + toHexString(oneByte));
      if ((oneByte & 192) === 64) {
        desc.push("	Compute Cryptographic Checksum 01: Compute Cryptographic Checksum Supported");
      } else if ((oneByte & 192) === 128) {
        desc.push("	Compute Cryptographic Checksum 10: Compute Cryptographic Checksum Not Supported");
      } else {
        desc.push("	Compute Cryptographic Checksum 00 or 11: RFU");
      }
      if (bitOn(oneByte, 32))
        desc.push("	b6 Decline If CDA Not Requested And RRP Performed");
      if (bitOn(oneByte, 16))
        desc.push("	b5 Go Online If RRP Not Performed");
      if (bitOn(oneByte, 8))
        desc.push("	b4 Decline If Unable To Go Online And RRP Not Performed");
      if (bitOn(oneByte, 4))
        desc.push("	b3 Use M/Chip 4 CDOL1");
      if (bitOn(oneByte, 2))
        desc.push("	b2 Enable Alternate Interface After TC Generated");
      if (bitOn(oneByte, 1))
        desc.push("	b1 Enable Alternate Interface After Successful Verify");
      oneByte = buf[3];
      desc.push("byte4: " + toHexString(oneByte));
      if (bitOn(oneByte, 128))
        desc.push("	b8 Include Transaction In CRM If ARQC Is Requested");
      if (bitOn(oneByte, 64))
        desc.push("	b7 Use CIAC-online To Decide On ARQC Request");
      if (bitOn(oneByte, 32))
        desc.push("	b6 Generate Only TC Or AAC On TC Request");
      if (bitOn(oneByte, 16))
        desc.push("	b5 MTA Check");
      if (bitOn(oneByte, 8))
        desc.push("	b4 Maximum Number Of Days Offline Check");
      if (bitOn(oneByte, 4))
        desc.push("	b3 Include RRP Data in Counters");
      if (bitOn(oneByte, 2))
        desc.push("	b2 Plaintext Offline Change PIN");
      if (bitOn(oneByte, 1))
        desc.push("	b1 Encrypted Offline Change PIN");
      oneByte = buf[4];
      desc.push("byte5: " + toHexString(oneByte));
      if (bitOn(oneByte, 128))
        desc.push("	b8 AAC Logging");
      if (bitOn(oneByte, 64))
        desc.push("	b7 TC Logging");
      if (bitOn(oneByte, 32))
        desc.push("	b6 ARQC Pre-logging");
      if (bitOn(oneByte, 16))
        desc.push("	b5 Include Last Online ATC in IAD");
      if ((oneByte & 14) === 0) {
        desc.push("	b432 Issuer Host Backwards Compatibility 000: No Host Backwards Compatibility");
      } else if ((oneByte & 14) === 2) {
        desc.push("	b432 Issuer Host Backwards Compatibility 001: V2.1/V2.2 Host Backwards Compatibility");
      } else if ((oneByte & 14) === 4) {
        desc.push("	b432 Issuer Host Backwards Compatibility 010: V2.05 Host Backwards Compatibility");
      } else if ((oneByte & 14) === 6) {
        desc.push("	b432 Issuer Host Backwards Compatibility 011: V1.1/V1.3 Host Backwards Compatibility");
      }
      if (bitOn(oneByte, 1))
        desc.push("	b1 Partial Authorization");
      oneByte = buf[5];
      desc.push("byte6: " + toHexString(oneByte));
      if (bitOn(oneByte, 128))
        desc.push("	b8 Enable Alternate Interface After First Gen AC");
      if (bitOn(oneByte, 64))
        desc.push("	b7 Save Accumulators And Counters on ARQC Response");
      if (bitOn(oneByte, 32)) {
        desc.push("	b6 AC for MAS4C 0: AAC");
      } else {
        desc.push("	b6 AC for MAS4C 1: ARQC");
      }
      if (bitOn(oneByte, 1)) {
        desc.push("	b5 Key for MAS4C Processing Flow 1: AC Master Key (MAS4C)");
      } else {
        desc.push("	b5 Key for MAS4C Processing Flow 0: AC Master Key");
      }
      if (bitOn(oneByte, 8))
        desc.push("	b4 Torn Transaction Recovery");
      if (bitOn(oneByte, 4))
        desc.push("	b3 MAS4C Processing Flow");
      if (bitOn(oneByte, 2))
        desc.push("	b2 Reset Script Counter With Online Response");
      if (bitOn(oneByte, 1))
        desc.push("	b1 Allow Retrieval Of Transaction Log Records");
      return desc;
    }
    function ApplicationControl4Cpa(tlv) {
      var desc = [];
      var buf = tlv.getValue("buffer");
      var oneByte;
      oneByte = buf[0];
      desc.push("byte1: " + toHexString(oneByte));
      if (bitOn(oneByte, 128))
        desc.push("	B1b8 1 Issuer Authentication Required to be performed");
      if (bitOn(oneByte, 64))
        desc.push("	B1b7 1 Issuer Authentication Required to Pass when Performed");
      if (bitOn(oneByte, 32))
        desc.push("	B1b6 1 Issuer Authentication Requirements apply to Resetting of Non-Velocity-Checking Indicators and Counters)");
      if (bitOn(oneByte, 16))
        desc.push("	B1b5 1 Issuer Authentication Requirements apply to Resetting of Velocity-Checking Counters)");
      if (bitOn(oneByte, 8)) {
        desc.push("	B1b4 1 [Enciphered PIN] Use ICC PIN Encipherment Public/Private key pair");
      } else {
        desc.push("	B1b4 0 [Enciphered PIN] Use ICC Public/Private key pair");
      }
      if (bitOn(oneByte, 4))
        desc.push("	B1b3 1 Offline Enciphered PIN Verification Supported");
      if (bitOn(oneByte, 2))
        desc.push("	B1b2 1 Offline Plaintext PIN Verification Supported");
      if (bitOn(oneByte, 1))
        desc.push("	B1b1 1 Allow Retrieval of Values and Limits of Accumulators and Counters");
      oneByte = buf[1];
      desc.push("byte2: " + toHexString(oneByte));
      if (bitOn(oneByte, 128)) {
        desc.push("	B2b8  1  Use Default Update Counters if CSU is Generated by Issuer Proxy");
      } else {
        desc.push("	B2b8  0  Use Update Counters Received in CSU if CSU is Generated by Issuer Proxy");
      }
      if ((oneByte & 96) === 0) {
        desc.push("	B2b76 00 Do Not Update Offline Counters");
      } else if ((oneByte & 96) === 64) {
        desc.push("	B2b76 01 Set Offline Counters to Upper Offline Limits");
      } else if ((oneByte & 96) === 32) {
        desc.push("	B2b76 10 Reset Offline Counters to Zero");
      } else {
        desc.push("	B2b76 11 Add Transaction to Offline Counters");
      }
      if (bitOn(oneByte, 8)) {
        desc.push("	B2b4  1  Activate Profile Selection File");
      }
      if (bitOn(oneByte, 4)) {
        desc.push("	B2b3  1  Amounts Included in CDOL2");
      }
      if (bitOn(oneByte, 2)) {
        desc.push("	RFU");
      }
      if (bitOn(oneByte, 1)) {
        desc.push("	RFU");
      }
      oneByte = buf[2];
      desc.push("byte3: " + toHexString(oneByte));
      if (bitOn(oneByte, 128)) {
        desc.push("	B3b8 1 Log Declined Transactions");
      }
      if (bitOn(oneByte, 64)) {
        desc.push("	B3b7 1 Log Approved Transactions");
      }
      if (bitOn(oneByte, 32)) {
        desc.push("	B3b6 1 Log Offline Only");
      } else {
        desc.push("	B3b6 0 Log Both Offline and Online");
      }
      if (bitOn(oneByte, 16)) {
        desc.push("	B3b5 1 Log the ATC");
      }
      if (bitOn(oneByte, 8)) {
        desc.push("	B3b4 1 Log the CID");
      }
      if (bitOn(oneByte, 4)) {
        desc.push("	B3b3 1 Log the CVR");
      }
      if (bitOn(oneByte, 2)) {
        desc.push("	B3b2 1 Log the Profile ID");
      }
      if (bitOn(oneByte, 1)) {
        desc.push("	B3b1 1 RFU");
      }
      oneByte = buf[3];
      desc.push("byte4: " + toHexString(oneByte));
      if ((oneByte & 240) !== 0) {
        desc.push("Reserved for use by Payment Systems for optional extensions");
      }
      if ((oneByte & 15) !== 0) {
        desc.push("Reserved for use by Issuer");
      }
      return desc;
    }
    function LogFormat(tlv) {
      var dol = tlv.parseDolValue();
      var desc = [];
      desc.push("LogFormat: 9F4F DOL Related Data length: " + toHexString(dol.getDolRelatedDataLength()) + " (" + dol.getDolRelatedDataLength() + ")");
      var dolList = dol.getList();
      dolList.forEach(function(tl) {
        desc.push(tl.getTag() + " " + tl.getL() + " (" + tl.getLength() + ") " + tl.getName());
      });
      return desc;
    }
    module2.exports = {
      CardIssuerActionCode4Master,
      IssuerActionCode,
      ApplicationControl,
      LogFormat,
      ApplicationControl4Cpa
    };
  }
});

// node_modules/@kawkab-oss/node-tlv/lib/decoder/Template.js
var require_Template = __commonJS({
  "node_modules/@kawkab-oss/node-tlv/lib/decoder/Template.js"(exports, module2) {
    var bitOn = require_util().bitOn;
    var getBitOn = require_util().getBitOn;
    var u2 = require_util().u2;
    var toHexString = require_util().toHexString;
    function AccumulatorProfileControl(tlv) {
      var desc = [];
      var oneByte;
      var buf = tlv.getValue("buffer");
      oneByte = buf[0];
      desc.push("Byte 1: " + toHexString(oneByte));
      if (bitOn(oneByte, 128)) {
        desc.push("	b8 Allow Accumulation");
      } else {
        desc.push("	b8 Do Not Allow Accumulation");
      }
      if (bitOn(oneByte, 64))
        desc.push("	b7 Reset Accumulator with online response");
      if (bitOn(oneByte, 32))
        desc.push("	b6 Send Accumulator in IAD");
      if (bitOn(oneByte, 16)) {
        desc.push("	b5 Send Accumulator x Balance");
      } else {
        desc.push("	b5 Send Accumulator x value");
      }
      if (bitOn(oneByte, 8))
        desc.push("	b4 RFU");
      if (bitOn(oneByte, 4))
        desc.push("	b3 RFU");
      if (bitOn(oneByte, 2))
        desc.push("	b2 RFU");
      if (bitOn(oneByte, 1))
        desc.push("	b1 RFU");
      oneByte = buf[1];
      desc.push("Byte 2: " + toHexString(oneByte));
      if (bitOn(oneByte, 128))
        desc.push("	b8 RFU");
      if (bitOn(oneByte, 64))
        desc.push("	b7 RFU");
      if (bitOn(oneByte, 32))
        desc.push("	b6 RFU");
      if (bitOn(oneByte, 16)) {
        desc.push("	b5 Use Limit Set 1");
      } else {
        desc.push("	b5 Use Limit Set 0");
      }
      if ((oneByte & 15) === 15) {
        desc.push("	b4321 Currency Conversion Not Allowed");
      } else {
        desc.push("	b4321 Currency Conversion Table ID: " + toHexString(oneByte & 15));
      }
      return desc;
    }
    function AccumulatorControl(tlv) {
      var desc = [];
      var oneByte;
      var buf = tlv.getValue("buffer");
      desc.push("byte 1-2: Accumulator Currency Code: " + tlv.getValue().substring(0, 4));
      oneByte = buf[2];
      desc.push("byte 3: Accumulator Parameters: " + toHexString(oneByte));
      if (bitOn(oneByte, 128))
        desc.push("	b8 Include ARQC Transaction in CRM Test");
      if (bitOn(oneByte, 64))
        desc.push("	b7 Include Offline Approvals");
      return desc;
    }
    function CounterProfileControl(tlv) {
      var desc = [];
      var oneByte;
      var buf = tlv.getValue("buffer");
      oneByte = buf[0];
      desc.push("Template: BF36 byte1: " + toHexString(oneByte));
      if (bitOn(oneByte, 128))
        desc.push("	b8 RFU");
      if (bitOn(oneByte, 64))
        desc.push("	b7 RFU");
      if (bitOn(oneByte, 32))
        desc.push("	b6 RFU");
      if (bitOn(oneByte, 16)) {
        desc.push("	b5 Use Limit Set 1");
      } else {
        desc.push("	b5 Use Limit Set 0");
      }
      if (bitOn(oneByte, 8)) {
        desc.push("	b4 Allow Counting");
      } else {
        desc.push("	b4 Do Not Allow Counting");
      }
      if (bitOn(oneByte, 4))
        desc.push("	b3 Reset Counter with online response");
      if (bitOn(oneByte, 2))
        desc.push("	b2 Send Counter in IAD");
      if (bitOn(oneByte, 1))
        desc.push("	b1 RFU");
      return desc;
    }
    function CounterControl(tlv) {
      var desc = [];
      var oneByte;
      var buf = tlv.getValue("buffer");
      oneByte = buf[0];
      desc.push("byte1: " + toHexString(oneByte));
      if (bitOn(oneByte, 128))
        desc.push("	b8 Include ARQC Transaction in CRM Test");
      if (bitOn(oneByte, 64))
        desc.push("	b7 Include Offline Declines");
      if (bitOn(oneByte, 32))
        desc.push("	b6 Include Offline Approval");
      if (bitOn(oneByte, 16)) {
        desc.push("	b5 include always");
      } else {
        desc.push("	b5 include only if Not Accumulated");
      }
      if (bitOn(oneByte, 8)) {
        desc.push("	b4 include only if International");
      } else {
        desc.push("	b4 include always");
      }
      if (bitOn(oneByte, 4))
        desc.push("	b1 RFU");
      if (bitOn(oneByte, 2))
        desc.push("	b1 RFU");
      if (bitOn(oneByte, 1))
        desc.push("	b1 RFU");
      return desc;
    }
    function IssuerOptionsProfileControl(tlv) {
      var desc = [];
      var oneByte;
      var buf = tlv.getValue("buffer");
      oneByte = buf[0];
      desc.push("byte1: " + toHexString(oneByte));
      if (bitOn(oneByte, 128)) {
        desc.push("	b8 Log Transactions");
      } else {
        desc.push("	b8 Do Not Log Transactions");
      }
      if (bitOn(oneByte, 64))
        desc.push("	b7 Activate Additional Check Table 1 Check");
      if (bitOn(oneByte, 32))
        desc.push("	b6 Activate Additional Check Table 2 Check");
      if (bitOn(oneByte, 16))
        desc.push("	b5 Activate Maximum Number of Days Offline Check");
      if (bitOn(oneByte, 8))
        desc.push("	b4 Reset Maximum Number of Days offline with online response");
      if (bitOn(oneByte, 4))
        desc.push("	b3 Allow Override of CIAC-Default for Transactions at Terminal Type 26");
      if (bitOn(oneByte, 2))
        desc.push("	b2 Encipher Counters portion of IAD");
      if (bitOn(oneByte, 1))
        desc.push("	b1 RFU");
      oneByte = buf[1];
      desc.push("byte2: 1st GAC Length: " + toHexString(oneByte) + "(" + oneByte + ")");
      oneByte = buf[2];
      desc.push("byte3: 2nd GAC Length: " + toHexString(oneByte) + "(" + oneByte + ")");
      oneByte = buf[3];
      desc.push("byte4: Profile CCI: " + toHexString(oneByte));
      oneByte = buf[4];
      desc.push("byte5: Profile DKI: " + toHexString(oneByte));
      oneByte = buf[5];
      desc.push("byte6: RFU: " + toHexString(oneByte));
      oneByte = buf[6];
      desc.push("byte7: RFU for Issuer: " + toHexString(oneByte));
      return desc;
    }
    function MtaProfileCotnrol(tlv) {
      var desc = [];
      var oneByte;
      var buf = tlv.getValue("buffer");
      desc.push("byte 1-2: Currency Code for Maximum Transaction Amount: " + tlv.getValue().substring(0, 4));
      oneByte = buf[2];
      desc.push("byte 3: MTA parameters: " + toHexString(oneByte));
      const limit_entry_id = (oneByte & 240) >> 4;
      desc.push("	b8765: Limits Entry ID: " + limit_entry_id);
      const currency_conversion_table_id = oneByte & 15;
      if (currency_conversion_table_id === 15) {
        desc.push("	b4321: Currency Conversion Not Allowed");
      } else {
        desc.push("	b4321: Currency Conversion Table ID: " + currency_conversion_table_id);
      }
      oneByte = buf[3];
      desc.push("byte 4: RFU: " + toHexString(oneByte));
      return desc;
    }
    function Ciacs(tlv) {
      var desc = [];
      var oneByte;
      var buf = tlv.getValue("buffer");
      for (var i = 0; i < 3; i++) {
        var index = 6 * i;
        if (i === 0) {
          desc.push("CIAC - Decline");
        } else if (i === 1) {
          desc.push("CIAC - Default");
        } else if (i === 2) {
          desc.push("CIAC - Online");
        }
        var index_decline = 0;
        var index_default = 6;
        var index_online = 12;
        oneByte = buf[index];
        dec = toHexString(buf[index_decline]);
        def = toHexString(buf[index_default]);
        onl = toHexString(buf[index_online]);
        desc.push(`byte 1: decline default online: ${dec} ${def} ${onl}`);
        tmp = getBitOn(buf[index_decline], 128) + " " + getBitOn(buf[index_default], 128) + " " + getBitOn(buf[index_online], 128);
        desc.push(tmp + " b8 Last Online Transaction Not Completed");
        tmp = getBitOn(buf[index_decline], 64) + " " + getBitOn(buf[index_default], 64) + " " + getBitOn(buf[index_online], 64);
        desc.push(tmp + " b7 Go Online On Next Transaction Was Set");
        tmp = getBitOn(buf[index_decline], 32) + " " + getBitOn(buf[index_default], 32) + " " + getBitOn(buf[index_online], 32);
        desc.push(tmp + " b6 Issuer Script Processing Failed");
        tmp = getBitOn(buf[index_decline], 16) + " " + getBitOn(buf[index_default], 16) + " " + getBitOn(buf[index_online], 16);
        desc.push(tmp + " b5 Issuer Authentication Failed");
        tmp = getBitOn(buf[index_decline], 8) + " " + getBitOn(buf[index_default], 8) + " " + getBitOn(buf[index_online], 8);
        desc.push(tmp + " b4 Issuer Authentication Data Not Received in Previous Online Transaction");
        tmp = getBitOn(buf[index_decline], 4) + " " + getBitOn(buf[index_default], 4) + " " + getBitOn(buf[index_online], 4);
        desc.push(tmp + " b3 PIN Try Limit Exceeded");
        tmp = getBitOn(buf[index_decline], 2) + " " + getBitOn(buf[index_default], 2) + " " + getBitOn(buf[index_online], 2);
        desc.push(tmp + " b2 Offline PIN Verification Not Performed");
        tmp = getBitOn(buf[index_decline], 1) + " " + getBitOn(buf[index_default], 1) + " " + getBitOn(buf[index_online], 1);
        desc.push(tmp + " b1 Offline PIN Verification Failed");
        oneByte = buf[index + 1];
        desc.push("byte 2: " + toHexString(oneByte));
        if (bitOn(oneByte, 128))
          desc.push("	b8 Unable To Go Online");
        if (bitOn(oneByte, 64))
          desc.push("	b7 Terminal Erroneously Considers Offline PIN OK");
        if (bitOn(oneByte, 32))
          desc.push("	b6 Script Received");
        if (bitOn(oneByte, 16))
          desc.push("	b5 Offline Data Authentication Failed on Previous Transaction");
        if (bitOn(oneByte, 8))
          desc.push("	b4 Match Found In Additional Check Table 1");
        if (bitOn(oneByte, 4))
          desc.push("	b3 No Match Found In Additional Check Table 1");
        if (bitOn(oneByte, 2))
          desc.push("	b2 Match Found In Additional Check Table 2");
        if (bitOn(oneByte, 1))
          desc.push("	b1 No Match Found In Additional Check Table 2");
        oneByte = buf[index + 2];
        desc.push("byte 3: " + toHexString(oneByte));
        if (bitOn(oneByte, 128))
          desc.push("	b8 Accumulator 1 Lower Limit Exceeded");
        if (bitOn(oneByte, 64))
          desc.push("	b7 Accumulator 2 Lower Limit Exceeded");
        if (bitOn(oneByte, 32))
          desc.push("	b6 Counter 1 Lower Limit Exceeded");
        if (bitOn(oneByte, 16))
          desc.push("	b5 Counter 2 Lower Limit Exceeded");
        if (bitOn(oneByte, 8))
          desc.push("	b4 Counter 3 Lower Limit Exceeded");
        if (bitOn(oneByte, 4))
          desc.push("	b3 Additional Accumulator Lower Limit Excee");
        if (bitOn(oneByte, 2))
          desc.push("	b2 Additional Counter Lower Limit Exceeded");
        if (bitOn(oneByte, 1))
          desc.push("	b1 Number of Days Offline Limit Exceeded");
        oneByte = buf[index + 3];
        desc.push("byte 4: " + toHexString(oneByte));
        if (bitOn(oneByte, 128))
          desc.push("	b8 Accumulator 1 Upper Limit Exceeded");
        if (bitOn(oneByte, 64))
          desc.push("	b7 Accumulator 2 Upper Limit Exceeded");
        if (bitOn(oneByte, 32))
          desc.push("	b6 Counter 1 Upper Limit Exceeded");
        if (bitOn(oneByte, 16))
          desc.push("	b5 Counter 2 Upper Limit Exceeded");
        if (bitOn(oneByte, 8))
          desc.push("	b4 Counter 3 Upper Limit Exceeded");
        if (bitOn(oneByte, 4))
          desc.push("	b3 Additional Accumulator Upper Limit Exceeded");
        if (bitOn(oneByte, 2))
          desc.push("	b2 Additional Counter Upper Limit Exceeded");
        if (bitOn(oneByte, 1))
          desc.push("	b1 MTA exceeded");
        oneByte = buf[index + 4];
        desc.push("byte 5: " + toHexString(oneByte));
        if (bitOn(oneByte, 128))
          desc.push("	b8 Cyclic Accumulator 1 Limit Exceeded");
        if (bitOn(oneByte, 64))
          desc.push("	b7 Cyclic Accumulator 2 Limit Exceeded");
        if (bitOn(oneByte, 32))
          desc.push("	b6 Additional Cyclic Accumulator Limit Exceeded");
        if (bitOn(oneByte, 16))
          desc.push("	b5 Check Failed");
        if (bitOn(oneByte, 8))
          desc.push("	b4 RFU");
        if (bitOn(oneByte, 4))
          desc.push("	b3 RFU");
        if (bitOn(oneByte, 2))
          desc.push("	b2 RFU");
        if (bitOn(oneByte, 1))
          desc.push("	b1 RFU");
        oneByte = buf[index + 5];
        desc.push("byte 6: " + toHexString(oneByte));
        if (bitOn(oneByte, 128))
          desc.push("	b8 Reserved for use by issuer");
        if (bitOn(oneByte, 64))
          desc.push("	b7 Reserved for use by issuer");
        if (bitOn(oneByte, 32))
          desc.push("	b6 Reserved for use by issuer");
        if (bitOn(oneByte, 16))
          desc.push("	b5 Reserved for use by issuer");
        if (bitOn(oneByte, 8))
          desc.push("	b4 Reserved for use by issuer");
        if (bitOn(oneByte, 4))
          desc.push("	b3 Reserved for use by issuer");
        if (bitOn(oneByte, 2))
          desc.push("	b2 Reserved for use by issuer");
        if (bitOn(oneByte, 1))
          desc.push("	b1 Reserved for use by issuer");
      }
      return desc;
    }
    module2.exports = {
      AccumulatorProfileControl,
      AccumulatorControl,
      CounterProfileControl,
      CounterControl,
      IssuerOptionsProfileControl,
      MtaProfileCotnrol,
      Ciacs
    };
  }
});

// node_modules/@kawkab-oss/node-tlv/lib/decoder/Terminal.js
var require_Terminal = __commonJS({
  "node_modules/@kawkab-oss/node-tlv/lib/decoder/Terminal.js"(exports, module2) {
    var bitOn = require_util().bitOn;
    var toHexString = require_util().toHexString;
    function TerminalVerificationResult(tlv) {
      var desc = [];
      var oneByte;
      var buf = tlv.getValue("buffer");
      oneByte = buf[0];
      desc.push("byte1: " + toHexString(oneByte));
      if (bitOn(oneByte, 128))
        desc.push("	b8 Offline Data Authentication Was Not Performed");
      if (bitOn(oneByte, 64))
        desc.push("	b7 SDA Failed");
      if (bitOn(oneByte, 32))
        desc.push("	b6 ICC Data Missing");
      if (bitOn(oneByte, 16))
        desc.push("	b5 Card Appears On Terminal Exception File");
      if (bitOn(oneByte, 8))
        desc.push("	b4 DDA Failed");
      if (bitOn(oneByte, 4))
        desc.push("	b3 CDA Failed");
      oneByte = buf[1];
      desc.push("byte2: " + toHexString(oneByte));
      if (bitOn(oneByte, 128))
        desc.push("	b8 ICC And Terminal Have Different Application Versions");
      if (bitOn(oneByte, 64))
        desc.push("	b7 Expired Application");
      if (bitOn(oneByte, 32))
        desc.push("	b6 Application Not Yet Effective");
      if (bitOn(oneByte, 16))
        desc.push("	b5 Requested Service Not Allowed For Card Product");
      if (bitOn(oneByte, 8))
        desc.push("	b4 New Card");
      oneByte = buf[2];
      desc.push("byte3: " + toHexString(oneByte));
      if (bitOn(oneByte, 128))
        desc.push("	b8 Cardholder Verification Was Not Successful");
      if (bitOn(oneByte, 64))
        desc.push("	b7 Unrecognised CVM");
      if (bitOn(oneByte, 32))
        desc.push("	b6 PIN Try Limit Exceeded");
      if (bitOn(oneByte, 16))
        desc.push("	b5 PIN Entry Required And PIN Pad Not Present Or Not Working");
      if (bitOn(oneByte, 8))
        desc.push("	b4 PIN Entry Required, PIN Pad Present, But PIN Was Not Entered");
      if (bitOn(oneByte, 4))
        desc.push("	b3 Online PIN Entered");
      oneByte = buf[3];
      desc.push("byte4: " + toHexString(oneByte));
      if (bitOn(oneByte, 128))
        desc.push("	b8 Transaction Exceeded Floor Limit");
      if (bitOn(oneByte, 64))
        desc.push("	b7 Lower Consecutive Offline Limit Exceeded");
      if (bitOn(oneByte, 32))
        desc.push("	b6 Upper Consecutive Offline Limit Exceeded");
      if (bitOn(oneByte, 16))
        desc.push("	b5 Transaction Selected Randomly For Online Processing");
      if (bitOn(oneByte, 8))
        desc.push("	b4 Merchant Forced Transaction Online");
      oneByte = buf[4];
      desc.push("byte5: " + toHexString(oneByte));
      if (bitOn(oneByte, 128))
        desc.push("	b8 Default TDOL Used");
      if (bitOn(oneByte, 64))
        desc.push("	b7 Issuer Authentication Failed");
      if (bitOn(oneByte, 32))
        desc.push("	b6 Script Processing Failed Before Final Generate AC");
      if (bitOn(oneByte, 16))
        desc.push("	b5 Script Processing Failed After Final Generate AC");
      if (bitOn(oneByte, 8))
        desc.push("	b4 Relay Resistance Threshold Exceeded");
      if (bitOn(oneByte, 4))
        desc.push("	b3 Relay Resistance Time Limits Exceeded");
      if ((oneByte & 3) === 0) {
      } else if ((oneByte & 3) === 1) {
        desc.push("b2-1 01: RRP Not Performed");
      } else if ((oneByte & 3) === 2) {
        desc.push("b2-1 10: RRP Performed");
      }
      return desc;
    }
    module2.exports = {
      TerminalVerificationResult
    };
  }
});

// node_modules/@kawkab-oss/node-tlv/lib/decoder/json/CurrencyCode.json
var require_CurrencyCode = __commonJS({
  "node_modules/@kawkab-oss/node-tlv/lib/decoder/json/CurrencyCode.json"(exports, module2) {
    module2.exports = {
      list: [
        {
          code: "AFN",
          country: "AFGHANISTAN",
          currency: "Afghani",
          number: "0971"
        },
        {
          code: "EUR",
          country: "\xC5LAND ISLANDS",
          currency: "Euro",
          number: "0978"
        },
        {
          code: "ALL",
          country: "ALBANIA",
          currency: "Lek",
          number: "0008"
        },
        {
          code: "DZD",
          country: "ALGERIA",
          currency: "Algerian Dinar",
          number: "0012"
        },
        {
          code: "USD",
          country: "AMERICAN SAMOA",
          currency: "US Dollar",
          number: "0840"
        },
        {
          code: "EUR",
          country: "ANDORRA",
          currency: "Euro",
          number: "0978"
        },
        {
          code: "AOA",
          country: "ANGOLA",
          currency: "Kwanza",
          number: "0973"
        },
        {
          code: "XCD",
          country: "ANGUILLA",
          currency: "East Caribbean Dollar",
          number: "0951"
        },
        {
          code: "XCD",
          country: "ANTIGUA AND BARBUDA",
          currency: "East Caribbean Dollar",
          number: "0951"
        },
        {
          code: "ARS",
          country: "ARGENTINA",
          currency: "Argentine Peso",
          number: "0032"
        },
        {
          code: "AMD",
          country: "ARMENIA",
          currency: "Armenian Dram",
          number: "0051"
        },
        {
          code: "AWG",
          country: "ARUBA",
          currency: "Aruban Florin",
          number: "0533"
        },
        {
          code: "AUD",
          country: "AUSTRALIA",
          currency: "Australian Dollar",
          number: "0036"
        },
        {
          code: "EUR",
          country: "AUSTRIA",
          currency: "Euro",
          number: "0978"
        },
        {
          code: "AZN",
          country: "AZERBAIJAN",
          currency: "Azerbaijanian Manat",
          number: "0944"
        },
        {
          code: "BSD",
          country: "BAHAMAS (THE)",
          currency: "Bahamian Dollar",
          number: "0044"
        },
        {
          code: "BHD",
          country: "BAHRAIN",
          currency: "Bahraini Dinar",
          number: "0048"
        },
        {
          code: "BDT",
          country: "BANGLADESH",
          currency: "Taka",
          number: "0050"
        },
        {
          code: "BBD",
          country: "BARBADOS",
          currency: "Barbados Dollar",
          number: "0052"
        },
        {
          code: "BYN",
          country: "BELARUS",
          currency: "Belarusian Ruble",
          number: "0933"
        },
        {
          code: "EUR",
          country: "BELGIUM",
          currency: "Euro",
          number: "0978"
        },
        {
          code: "BZD",
          country: "BELIZE",
          currency: "Belize Dollar",
          number: "0084"
        },
        {
          code: "XOF",
          country: "BENIN",
          currency: "CFA Franc BCEAO",
          number: "0952"
        },
        {
          code: "BMD",
          country: "BERMUDA",
          currency: "Bermudian Dollar",
          number: "0060"
        },
        {
          code: "INR",
          country: "BHUTAN",
          currency: "Indian Rupee",
          number: "0356"
        },
        {
          code: "BTN",
          country: "BHUTAN",
          currency: "Ngultrum",
          number: "0064"
        },
        {
          code: "BOB",
          country: "BOLIVIA (PLURINATIONAL STATE OF)",
          currency: "Boliviano",
          number: "0068"
        },
        {
          code: "BOV",
          country: "BOLIVIA (PLURINATIONAL STATE OF)",
          currency: "Mvdol",
          number: "0984"
        },
        {
          code: "USD",
          country: "BONAIRE, SINT EUSTATIUS AND SABA",
          currency: "US Dollar",
          number: "0840"
        },
        {
          code: "BAM",
          country: "BOSNIA AND HERZEGOVINA",
          currency: "Convertible Mark",
          number: "0977"
        },
        {
          code: "BWP",
          country: "BOTSWANA",
          currency: "Pula",
          number: "0072"
        },
        {
          code: "NOK",
          country: "BOUVET ISLAND",
          currency: "Norwegian Krone",
          number: "0578"
        },
        {
          code: "BRL",
          country: "BRAZIL",
          currency: "Brazilian Real",
          number: "0986"
        },
        {
          code: "USD",
          country: "BRITISH INDIAN OCEAN TERRITORY (THE)",
          currency: "US Dollar",
          number: "0840"
        },
        {
          code: "BND",
          country: "BRUNEI DARUSSALAM",
          currency: "Brunei Dollar",
          number: "0096"
        },
        {
          code: "BGN",
          country: "BULGARIA",
          currency: "Bulgarian Lev",
          number: "0975"
        },
        {
          code: "XOF",
          country: "BURKINA FASO",
          currency: "CFA Franc BCEAO",
          number: "0952"
        },
        {
          code: "BIF",
          country: "BURUNDI",
          currency: "Burundi Franc",
          number: "0108"
        },
        {
          code: "CVE",
          country: "CABO VERDE",
          currency: "Cabo Verde Escudo",
          number: "0132"
        },
        {
          code: "KHR",
          country: "CAMBODIA",
          currency: "Riel",
          number: "0116"
        },
        {
          code: "XAF",
          country: "CAMEROON",
          currency: "CFA Franc BEAC",
          number: "0950"
        },
        {
          code: "CAD",
          country: "CANADA",
          currency: "Canadian Dollar",
          number: "0124"
        },
        {
          code: "KYD",
          country: "CAYMAN ISLANDS (THE)",
          currency: "Cayman Islands Dollar",
          number: "0136"
        },
        {
          code: "XAF",
          country: "CENTRAL AFRICAN REPUBLIC (THE)",
          currency: "CFA Franc BEAC",
          number: "0950"
        },
        {
          code: "XAF",
          country: "CHAD",
          currency: "CFA Franc BEAC",
          number: "0950"
        },
        {
          code: "CLP",
          country: "CHILE",
          currency: "Chilean Peso",
          number: "0152"
        },
        {
          code: "CLF",
          country: "CHILE",
          currency: "Unidad de Fomento",
          number: "0990"
        },
        {
          code: "CNY",
          country: "CHINA",
          currency: "Yuan Renminbi",
          number: "0156"
        },
        {
          code: "AUD",
          country: "CHRISTMAS ISLAND",
          currency: "Australian Dollar",
          number: "0036"
        },
        {
          code: "AUD",
          country: "COCOS (KEELING) ISLANDS (THE)",
          currency: "Australian Dollar",
          number: "0036"
        },
        {
          code: "COP",
          country: "COLOMBIA",
          currency: "Colombian Peso",
          number: "0170"
        },
        {
          code: "COU",
          country: "COLOMBIA",
          currency: "Unidad de Valor Real",
          number: "0970"
        },
        {
          code: "KMF",
          country: "COMOROS (THE)",
          currency: "Comoro Franc",
          number: "0174"
        },
        {
          code: "CDF",
          country: "CONGO (THE DEMOCRATIC REPUBLIC OF THE)",
          currency: "Congolese Franc",
          number: "0976"
        },
        {
          code: "XAF",
          country: "CONGO (THE)",
          currency: "CFA Franc BEAC",
          number: "0950"
        },
        {
          code: "NZD",
          country: "COOK ISLANDS (THE)",
          currency: "New Zealand Dollar",
          number: "0554"
        },
        {
          code: "CRC",
          country: "COSTA RICA",
          currency: "Costa Rican Colon",
          number: "0188"
        },
        {
          code: "XOF",
          country: "C\xD4TE D'IVOIRE",
          currency: "CFA Franc BCEAO",
          number: "0952"
        },
        {
          code: "HRK",
          country: "CROATIA",
          currency: "Kuna",
          number: "0191"
        },
        {
          code: "CUP",
          country: "CUBA",
          currency: "Cuban Peso",
          number: "0192"
        },
        {
          code: "CUC",
          country: "CUBA",
          currency: "Peso Convertible",
          number: "0931"
        },
        {
          code: "ANG",
          country: "CURA\xC7AO",
          currency: "Netherlands Antillean Guilder",
          number: "0532"
        },
        {
          code: "EUR",
          country: "CYPRUS",
          currency: "Euro",
          number: "0978"
        },
        {
          code: "CZK",
          country: "CZECH REPUBLIC (THE)",
          currency: "Czech Koruna",
          number: "0203"
        },
        {
          code: "DKK",
          country: "DENMARK",
          currency: "Danish Krone",
          number: "0208"
        },
        {
          code: "DJF",
          country: "DJIBOUTI",
          currency: "Djibouti Franc",
          number: "0262"
        },
        {
          code: "XCD",
          country: "DOMINICA",
          currency: "East Caribbean Dollar",
          number: "0951"
        },
        {
          code: "DOP",
          country: "DOMINICAN REPUBLIC (THE)",
          currency: "Dominican Peso",
          number: "0214"
        },
        {
          code: "USD",
          country: "ECUADOR",
          currency: "US Dollar",
          number: "0840"
        },
        {
          code: "EGP",
          country: "EGYPT",
          currency: "Egyptian Pound",
          number: "0818"
        },
        {
          code: "SVC",
          country: "EL SALVADOR",
          currency: "El Salvador Colon",
          number: "0222"
        },
        {
          code: "USD",
          country: "EL SALVADOR",
          currency: "US Dollar",
          number: "0840"
        },
        {
          code: "XAF",
          country: "EQUATORIAL GUINEA",
          currency: "CFA Franc BEAC",
          number: "0950"
        },
        {
          code: "ERN",
          country: "ERITREA",
          currency: "Nakfa",
          number: "0232"
        },
        {
          code: "EUR",
          country: "ESTONIA",
          currency: "Euro",
          number: "0978"
        },
        {
          code: "ETB",
          country: "ETHIOPIA",
          currency: "Ethiopian Birr",
          number: "0230"
        },
        {
          code: "EUR",
          country: "EUROPEAN UNION",
          currency: "Euro",
          number: "0978"
        },
        {
          code: "FKP",
          country: "FALKLAND ISLANDS (THE) [MALVINAS]",
          currency: "Falkland Islands Pound",
          number: "0238"
        },
        {
          code: "DKK",
          country: "FAROE ISLANDS (THE)",
          currency: "Danish Krone",
          number: "0208"
        },
        {
          code: "FJD",
          country: "FIJI",
          currency: "Fiji Dollar",
          number: "0242"
        },
        {
          code: "EUR",
          country: "FINLAND",
          currency: "Euro",
          number: "0978"
        },
        {
          code: "EUR",
          country: "FRANCE",
          currency: "Euro",
          number: "0978"
        },
        {
          code: "EUR",
          country: "FRENCH GUIANA",
          currency: "Euro",
          number: "0978"
        },
        {
          code: "XPF",
          country: "FRENCH POLYNESIA",
          currency: "CFP Franc",
          number: "0953"
        },
        {
          code: "EUR",
          country: "FRENCH SOUTHERN TERRITORIES (THE)",
          currency: "Euro",
          number: "0978"
        },
        {
          code: "XAF",
          country: "GABON",
          currency: "CFA Franc BEAC",
          number: "0950"
        },
        {
          code: "GMD",
          country: "GAMBIA (THE)",
          currency: "Dalasi",
          number: "0270"
        },
        {
          code: "GEL",
          country: "GEORGIA",
          currency: "Lari",
          number: "0981"
        },
        {
          code: "EUR",
          country: "GERMANY",
          currency: "Euro",
          number: "0978"
        },
        {
          code: "GHS",
          country: "GHANA",
          currency: "Ghana Cedi",
          number: "0936"
        },
        {
          code: "GIP",
          country: "GIBRALTAR",
          currency: "Gibraltar Pound",
          number: "0292"
        },
        {
          code: "EUR",
          country: "GREECE",
          currency: "Euro",
          number: "0978"
        },
        {
          code: "DKK",
          country: "GREENLAND",
          currency: "Danish Krone",
          number: "0208"
        },
        {
          code: "XCD",
          country: "GRENADA",
          currency: "East Caribbean Dollar",
          number: "0951"
        },
        {
          code: "EUR",
          country: "GUADELOUPE",
          currency: "Euro",
          number: "0978"
        },
        {
          code: "USD",
          country: "GUAM",
          currency: "US Dollar",
          number: "0840"
        },
        {
          code: "GTQ",
          country: "GUATEMALA",
          currency: "Quetzal",
          number: "0320"
        },
        {
          code: "GBP",
          country: "GUERNSEY",
          currency: "Pound Sterling",
          number: "0826"
        },
        {
          code: "GNF",
          country: "GUINEA",
          currency: "Guinea Franc",
          number: "0324"
        },
        {
          code: "XOF",
          country: "GUINEA-BISSAU",
          currency: "CFA Franc BCEAO",
          number: "0952"
        },
        {
          code: "GYD",
          country: "GUYANA",
          currency: "Guyana Dollar",
          number: "0328"
        },
        {
          code: "HTG",
          country: "HAITI",
          currency: "Gourde",
          number: "0332"
        },
        {
          code: "USD",
          country: "HAITI",
          currency: "US Dollar",
          number: "0840"
        },
        {
          code: "AUD",
          country: "HEARD ISLAND AND McDONALD ISLANDS",
          currency: "Australian Dollar",
          number: "0036"
        },
        {
          code: "EUR",
          country: "HOLY SEE (THE)",
          currency: "Euro",
          number: "0978"
        },
        {
          code: "HNL",
          country: "HONDURAS",
          currency: "Lempira",
          number: "0340"
        },
        {
          code: "HKD",
          country: "HONG KONG",
          currency: "Hong Kong Dollar",
          number: "0344"
        },
        {
          code: "HUF",
          country: "HUNGARY",
          currency: "Forint",
          number: "0348"
        },
        {
          code: "ISK",
          country: "ICELAND",
          currency: "Iceland Krona",
          number: "0352"
        },
        {
          code: "INR",
          country: "INDIA",
          currency: "Indian Rupee",
          number: "0356"
        },
        {
          code: "IDR",
          country: "INDONESIA",
          currency: "Rupiah",
          number: "0360"
        },
        {
          code: "XDR",
          country: "INTERNATIONAL MONETARY FUND (IMF)\xA0",
          currency: "SDR (Special Drawing Right)",
          number: "0960"
        },
        {
          code: "IRR",
          country: "IRAN (ISLAMIC REPUBLIC OF)",
          currency: "Iranian Rial",
          number: "0364"
        },
        {
          code: "IQD",
          country: "IRAQ",
          currency: "Iraqi Dinar",
          number: "0368"
        },
        {
          code: "EUR",
          country: "IRELAND",
          currency: "Euro",
          number: "0978"
        },
        {
          code: "GBP",
          country: "ISLE OF MAN",
          currency: "Pound Sterling",
          number: "0826"
        },
        {
          code: "ILS",
          country: "ISRAEL",
          currency: "New Israeli Sheqel",
          number: "0376"
        },
        {
          code: "EUR",
          country: "ITALY",
          currency: "Euro",
          number: "0978"
        },
        {
          code: "JMD",
          country: "JAMAICA",
          currency: "Jamaican Dollar",
          number: "0388"
        },
        {
          code: "JPY",
          country: "JAPAN",
          currency: "Yen",
          number: "0392"
        },
        {
          code: "GBP",
          country: "JERSEY",
          currency: "Pound Sterling",
          number: "0826"
        },
        {
          code: "JOD",
          country: "JORDAN",
          currency: "Jordanian Dinar",
          number: "0400"
        },
        {
          code: "KZT",
          country: "KAZAKHSTAN",
          currency: "Tenge",
          number: "0398"
        },
        {
          code: "KES",
          country: "KENYA",
          currency: "Kenyan Shilling",
          number: "0404"
        },
        {
          code: "AUD",
          country: "KIRIBATI",
          currency: "Australian Dollar",
          number: "0036"
        },
        {
          code: "KPW",
          country: "KOREA (THE DEMOCRATIC PEOPLE\u2019S REPUBLIC OF)",
          currency: "North Korean Won",
          number: "0408"
        },
        {
          code: "KRW",
          country: "KOREA (THE REPUBLIC OF)",
          currency: "Won",
          number: "0410"
        },
        {
          code: "KWD",
          country: "KUWAIT",
          currency: "Kuwaiti Dinar",
          number: "0414"
        },
        {
          code: "KGS",
          country: "KYRGYZSTAN",
          currency: "Som",
          number: "0417"
        },
        {
          code: "LAK",
          country: "LAO PEOPLE\u2019S DEMOCRATIC REPUBLIC (THE)",
          currency: "Kip",
          number: "0418"
        },
        {
          code: "EUR",
          country: "LATVIA",
          currency: "Euro",
          number: "0978"
        },
        {
          code: "LBP",
          country: "LEBANON",
          currency: "Lebanese Pound",
          number: "0422"
        },
        {
          code: "LSL",
          country: "LESOTHO",
          currency: "Loti",
          number: "0426"
        },
        {
          code: "ZAR",
          country: "LESOTHO",
          currency: "Rand",
          number: "0710"
        },
        {
          code: "LRD",
          country: "LIBERIA",
          currency: "Liberian Dollar",
          number: "0430"
        },
        {
          code: "LYD",
          country: "LIBYA",
          currency: "Libyan Dinar",
          number: "0434"
        },
        {
          code: "CHF",
          country: "LIECHTENSTEIN",
          currency: "Swiss Franc",
          number: "0756"
        },
        {
          code: "EUR",
          country: "LITHUANIA",
          currency: "Euro",
          number: "0978"
        },
        {
          code: "EUR",
          country: "LUXEMBOURG",
          currency: "Euro",
          number: "0978"
        },
        {
          code: "MOP",
          country: "MACAO",
          currency: "Pataca",
          number: "0446"
        },
        {
          code: "MKD",
          country: "MACEDONIA (THE FORMER YUGOSLAV REPUBLIC OF)",
          currency: "Denar",
          number: "0807"
        },
        {
          code: "MGA",
          country: "MADAGASCAR",
          currency: "Malagasy Ariary",
          number: "0969"
        },
        {
          code: "MWK",
          country: "MALAWI",
          currency: "Malawi Kwacha",
          number: "0454"
        },
        {
          code: "MYR",
          country: "MALAYSIA",
          currency: "Malaysian Ringgit",
          number: "0458"
        },
        {
          code: "MVR",
          country: "MALDIVES",
          currency: "Rufiyaa",
          number: "0462"
        },
        {
          code: "XOF",
          country: "MALI",
          currency: "CFA Franc BCEAO",
          number: "0952"
        },
        {
          code: "EUR",
          country: "MALTA",
          currency: "Euro",
          number: "0978"
        },
        {
          code: "USD",
          country: "MARSHALL ISLANDS (THE)",
          currency: "US Dollar",
          number: "0840"
        },
        {
          code: "EUR",
          country: "MARTINIQUE",
          currency: "Euro",
          number: "0978"
        },
        {
          code: "MRO",
          country: "MAURITANIA",
          currency: "Ouguiya",
          number: "0478"
        },
        {
          code: "MUR",
          country: "MAURITIUS",
          currency: "Mauritius Rupee",
          number: "0480"
        },
        {
          code: "EUR",
          country: "MAYOTTE",
          currency: "Euro",
          number: "0978"
        },
        {
          code: "XUA",
          country: "MEMBER COUNTRIES OF THE AFRICAN DEVELOPMENT BANK GROUP",
          currency: "ADB Unit of Account",
          number: "0965"
        },
        {
          code: "MXN",
          country: "MEXICO",
          currency: "Mexican Peso",
          number: "0484"
        },
        {
          code: "MXV",
          country: "MEXICO",
          currency: "Mexican Unidad de Inversion (UDI)",
          number: "0979"
        },
        {
          code: "USD",
          country: "MICRONESIA (FEDERATED STATES OF)",
          currency: "US Dollar",
          number: "0840"
        },
        {
          code: "MDL",
          country: "MOLDOVA (THE REPUBLIC OF)",
          currency: "Moldovan Leu",
          number: "0498"
        },
        {
          code: "EUR",
          country: "MONACO",
          currency: "Euro",
          number: "0978"
        },
        {
          code: "MNT",
          country: "MONGOLIA",
          currency: "Tugrik",
          number: "0496"
        },
        {
          code: "EUR",
          country: "MONTENEGRO",
          currency: "Euro",
          number: "0978"
        },
        {
          code: "XCD",
          country: "MONTSERRAT",
          currency: "East Caribbean Dollar",
          number: "0951"
        },
        {
          code: "MAD",
          country: "MOROCCO",
          currency: "Moroccan Dirham",
          number: "0504"
        },
        {
          code: "MZN",
          country: "MOZAMBIQUE",
          currency: "Mozambique Metical",
          number: "0943"
        },
        {
          code: "MMK",
          country: "MYANMAR",
          currency: "Kyat",
          number: "0104"
        },
        {
          code: "NAD",
          country: "NAMIBIA",
          currency: "Namibia Dollar",
          number: "0516"
        },
        {
          code: "ZAR",
          country: "NAMIBIA",
          currency: "Rand",
          number: "0710"
        },
        {
          code: "AUD",
          country: "NAURU",
          currency: "Australian Dollar",
          number: "0036"
        },
        {
          code: "NPR",
          country: "NEPAL",
          currency: "Nepalese Rupee",
          number: "0524"
        },
        {
          code: "EUR",
          country: "NETHERLANDS (THE)",
          currency: "Euro",
          number: "0978"
        },
        {
          code: "XPF",
          country: "NEW CALEDONIA",
          currency: "CFP Franc",
          number: "0953"
        },
        {
          code: "NZD",
          country: "NEW ZEALAND",
          currency: "New Zealand Dollar",
          number: "0554"
        },
        {
          code: "NIO",
          country: "NICARAGUA",
          currency: "Cordoba Oro",
          number: "0558"
        },
        {
          code: "XOF",
          country: "NIGER (THE)",
          currency: "CFA Franc BCEAO",
          number: "0952"
        },
        {
          code: "NGN",
          country: "NIGERIA",
          currency: "Naira",
          number: "0566"
        },
        {
          code: "NZD",
          country: "NIUE",
          currency: "New Zealand Dollar",
          number: "0554"
        },
        {
          code: "AUD",
          country: "NORFOLK ISLAND",
          currency: "Australian Dollar",
          number: "0036"
        },
        {
          code: "USD",
          country: "NORTHERN MARIANA ISLANDS (THE)",
          currency: "US Dollar",
          number: "0840"
        },
        {
          code: "NOK",
          country: "NORWAY",
          currency: "Norwegian Krone",
          number: "0578"
        },
        {
          code: "OMR",
          country: "OMAN",
          currency: "Rial Omani",
          number: "0512"
        },
        {
          code: "PKR",
          country: "PAKISTAN",
          currency: "Pakistan Rupee",
          number: "0586"
        },
        {
          code: "USD",
          country: "PALAU",
          currency: "US Dollar",
          number: "0840"
        },
        {
          code: "PAB",
          country: "PANAMA",
          currency: "Balboa",
          number: "0590"
        },
        {
          code: "USD",
          country: "PANAMA",
          currency: "US Dollar",
          number: "0840"
        },
        {
          code: "PGK",
          country: "PAPUA NEW GUINEA",
          currency: "Kina",
          number: "0598"
        },
        {
          code: "PYG",
          country: "PARAGUAY",
          currency: "Guarani",
          number: "0600"
        },
        {
          code: "PEN",
          country: "PERU",
          currency: "Sol",
          number: "0604"
        },
        {
          code: "PHP",
          country: "PHILIPPINES (THE)",
          currency: "Philippine Peso",
          number: "0608"
        },
        {
          code: "NZD",
          country: "PITCAIRN",
          currency: "New Zealand Dollar",
          number: "0554"
        },
        {
          code: "PLN",
          country: "POLAND",
          currency: "Zloty",
          number: "0985"
        },
        {
          code: "EUR",
          country: "PORTUGAL",
          currency: "Euro",
          number: "0978"
        },
        {
          code: "USD",
          country: "PUERTO RICO",
          currency: "US Dollar",
          number: "0840"
        },
        {
          code: "QAR",
          country: "QATAR",
          currency: "Qatari Rial",
          number: "0634"
        },
        {
          code: "EUR",
          country: "R\xC9UNION",
          currency: "Euro",
          number: "0978"
        },
        {
          code: "RON",
          country: "ROMANIA",
          currency: "Romanian Leu",
          number: "0946"
        },
        {
          code: "RUB",
          country: "RUSSIAN FEDERATION (THE)",
          currency: "Russian Ruble",
          number: "0643"
        },
        {
          code: "RWF",
          country: "RWANDA",
          currency: "Rwanda Franc",
          number: "0646"
        },
        {
          code: "EUR",
          country: "SAINT BARTH\xC9LEMY",
          currency: "Euro",
          number: "0978"
        },
        {
          code: "SHP",
          country: "SAINT HELENA, ASCENSION AND TRISTAN DA CUNHA",
          currency: "Saint Helena Pound",
          number: "0654"
        },
        {
          code: "XCD",
          country: "SAINT KITTS AND NEVIS",
          currency: "East Caribbean Dollar",
          number: "0951"
        },
        {
          code: "XCD",
          country: "SAINT LUCIA",
          currency: "East Caribbean Dollar",
          number: "0951"
        },
        {
          code: "EUR",
          country: "SAINT MARTIN (FRENCH PART)",
          currency: "Euro",
          number: "0978"
        },
        {
          code: "EUR",
          country: "SAINT PIERRE AND MIQUELON",
          currency: "Euro",
          number: "0978"
        },
        {
          code: "XCD",
          country: "SAINT VINCENT AND THE GRENADINES",
          currency: "East Caribbean Dollar",
          number: "0951"
        },
        {
          code: "WST",
          country: "SAMOA",
          currency: "Tala",
          number: "0882"
        },
        {
          code: "EUR",
          country: "SAN MARINO",
          currency: "Euro",
          number: "0978"
        },
        {
          code: "STD",
          country: "SAO TOME AND PRINCIPE",
          currency: "Dobra",
          number: "0678"
        },
        {
          code: "SAR",
          country: "SAUDI ARABIA",
          currency: "Saudi Riyal",
          number: "0682"
        },
        {
          code: "XOF",
          country: "SENEGAL",
          currency: "CFA Franc BCEAO",
          number: "0952"
        },
        {
          code: "RSD",
          country: "SERBIA",
          currency: "Serbian Dinar",
          number: "0941"
        },
        {
          code: "SCR",
          country: "SEYCHELLES",
          currency: "Seychelles Rupee",
          number: "0690"
        },
        {
          code: "SLL",
          country: "SIERRA LEONE",
          currency: "Leone",
          number: "0694"
        },
        {
          code: "SGD",
          country: "SINGAPORE",
          currency: "Singapore Dollar",
          number: "0702"
        },
        {
          code: "ANG",
          country: "SINT MAARTEN (DUTCH PART)",
          currency: "Netherlands Antillean Guilder",
          number: "0532"
        },
        {
          code: "XSU",
          country: 'SISTEMA UNITARIO DE COMPENSACION REGIONAL DE PAGOS "SUCRE"',
          currency: "Sucre",
          number: "0994"
        },
        {
          code: "EUR",
          country: "SLOVAKIA",
          currency: "Euro",
          number: "0978"
        },
        {
          code: "EUR",
          country: "SLOVENIA",
          currency: "Euro",
          number: "0978"
        },
        {
          code: "SBD",
          country: "SOLOMON ISLANDS",
          currency: "Solomon Islands Dollar",
          number: "0090"
        },
        {
          code: "SOS",
          country: "SOMALIA",
          currency: "Somali Shilling",
          number: "0706"
        },
        {
          code: "ZAR",
          country: "SOUTH AFRICA",
          currency: "Rand",
          number: "0710"
        },
        {
          code: "SSP",
          country: "SOUTH SUDAN",
          currency: "South Sudanese Pound",
          number: "0728"
        },
        {
          code: "EUR",
          country: "SPAIN",
          currency: "Euro",
          number: "0978"
        },
        {
          code: "LKR",
          country: "SRI LANKA",
          currency: "Sri Lanka Rupee",
          number: "0144"
        },
        {
          code: "SDG",
          country: "SUDAN (THE)",
          currency: "Sudanese Pound",
          number: "0938"
        },
        {
          code: "SRD",
          country: "SURINAME",
          currency: "Surinam Dollar",
          number: "0968"
        },
        {
          code: "NOK",
          country: "SVALBARD AND JAN MAYEN",
          currency: "Norwegian Krone",
          number: "0578"
        },
        {
          code: "SZL",
          country: "SWAZILAND",
          currency: "Lilangeni",
          number: "0748"
        },
        {
          code: "SEK",
          country: "SWEDEN",
          currency: "Swedish Krona",
          number: "0752"
        },
        {
          code: "CHF",
          country: "SWITZERLAND",
          currency: "Swiss Franc",
          number: "0756"
        },
        {
          code: "CHE",
          country: "SWITZERLAND",
          currency: "WIR Euro",
          number: "0947"
        },
        {
          code: "CHW",
          country: "SWITZERLAND",
          currency: "WIR Franc",
          number: "0948"
        },
        {
          code: "SYP",
          country: "SYRIAN ARAB REPUBLIC",
          currency: "Syrian Pound",
          number: "0760"
        },
        {
          code: "TWD",
          country: "TAIWAN (PROVINCE OF CHINA)",
          currency: "New Taiwan Dollar",
          number: "0901"
        },
        {
          code: "TJS",
          country: "TAJIKISTAN",
          currency: "Somoni",
          number: "0972"
        },
        {
          code: "TZS",
          country: "TANZANIA, UNITED REPUBLIC OF",
          currency: "Tanzanian Shilling",
          number: "0834"
        },
        {
          code: "THB",
          country: "THAILAND",
          currency: "Baht",
          number: "0764"
        },
        {
          code: "USD",
          country: "TIMOR-LESTE",
          currency: "US Dollar",
          number: "0840"
        },
        {
          code: "XOF",
          country: "TOGO",
          currency: "CFA Franc BCEAO",
          number: "0952"
        },
        {
          code: "NZD",
          country: "TOKELAU",
          currency: "New Zealand Dollar",
          number: "0554"
        },
        {
          code: "TOP",
          country: "TONGA",
          currency: "Pa\u2019anga",
          number: "0776"
        },
        {
          code: "TTD",
          country: "TRINIDAD AND TOBAGO",
          currency: "Trinidad and Tobago Dollar",
          number: "0780"
        },
        {
          code: "TND",
          country: "TUNISIA",
          currency: "Tunisian Dinar",
          number: "0788"
        },
        {
          code: "TRY",
          country: "TURKEY",
          currency: "Turkish Lira",
          number: "0949"
        },
        {
          code: "TMT",
          country: "TURKMENISTAN",
          currency: "Turkmenistan New Manat",
          number: "0934"
        },
        {
          code: "USD",
          country: "TURKS AND CAICOS ISLANDS (THE)",
          currency: "US Dollar",
          number: "0840"
        },
        {
          code: "AUD",
          country: "TUVALU",
          currency: "Australian Dollar",
          number: "0036"
        },
        {
          code: "UGX",
          country: "UGANDA",
          currency: "Uganda Shilling",
          number: "0800"
        },
        {
          code: "UAH",
          country: "UKRAINE",
          currency: "Hryvnia",
          number: "0980"
        },
        {
          code: "AED",
          country: "UNITED ARAB EMIRATES (THE)",
          currency: "UAE Dirham",
          number: "0784"
        },
        {
          code: "GBP",
          country: "UNITED KINGDOM OF GREAT BRITAIN AND NORTHERN IRELAND (THE)",
          currency: "Pound Sterling",
          number: "0826"
        },
        {
          code: "USD",
          country: "UNITED STATES MINOR OUTLYING ISLANDS (THE)",
          currency: "US Dollar",
          number: "0840"
        },
        {
          code: "USD",
          country: "UNITED STATES OF AMERICA (THE)",
          currency: "US Dollar",
          number: "0840"
        },
        {
          code: "USN",
          country: "UNITED STATES OF AMERICA (THE)",
          currency: "US Dollar (Next day)",
          number: "0997"
        },
        {
          code: "UYU",
          country: "URUGUAY",
          currency: "Peso Uruguayo",
          number: "0858"
        },
        {
          code: "UYI",
          country: "URUGUAY",
          currency: "Uruguay Peso en Unidades Indexadas (URUIURUI)",
          number: "0940"
        },
        {
          code: "UZS",
          country: "UZBEKISTAN",
          currency: "Uzbekistan Sum",
          number: "0860"
        },
        {
          code: "VUV",
          country: "VANUATU",
          currency: "Vatu",
          number: "0548"
        },
        {
          code: "VEF",
          country: "VENEZUELA (BOLIVARIAN REPUBLIC OF)",
          currency: "Bol\xEDvar",
          number: "0937"
        },
        {
          code: "VND",
          country: "VIET NAM",
          currency: "Dong",
          number: "0704"
        },
        {
          code: "USD",
          country: "VIRGIN ISLANDS (BRITISH)",
          currency: "US Dollar",
          number: "0840"
        },
        {
          code: "USD",
          country: "VIRGIN ISLANDS (U.S.)",
          currency: "US Dollar",
          number: "0840"
        },
        {
          code: "XPF",
          country: "WALLIS AND FUTUNA",
          currency: "CFP Franc",
          number: "0953"
        },
        {
          code: "MAD",
          country: "WESTERN SAHARA",
          currency: "Moroccan Dirham",
          number: "0504"
        },
        {
          code: "YER",
          country: "YEMEN",
          currency: "Yemeni Rial",
          number: "0886"
        },
        {
          code: "ZMW",
          country: "ZAMBIA",
          currency: "Zambian Kwacha",
          number: "0967"
        },
        {
          code: "ZWL",
          country: "ZIMBABWE",
          currency: "Zimbabwe Dollar",
          number: "0932"
        },
        {
          code: "XBA",
          country: "ZZ01_Bond Markets Unit European_EURCO",
          currency: "Bond Markets Unit European Composite Unit (EURCO)",
          number: "0955"
        },
        {
          code: "XBB",
          country: "ZZ02_Bond Markets Unit European_EMU-6",
          currency: "Bond Markets Unit European Monetary Unit (E.M.U.-6)",
          number: "0956"
        },
        {
          code: "XBC",
          country: "ZZ03_Bond Markets Unit European_EUA-9",
          currency: "Bond Markets Unit European Unit of Account 9 (E.U.A.-9)",
          number: "0957"
        },
        {
          code: "XBD",
          country: "ZZ04_Bond Markets Unit European_EUA-17",
          currency: "Bond Markets Unit European Unit of Account 17 (E.U.A.-17)",
          number: "0958"
        },
        {
          code: "XTS",
          country: "ZZ06_Testing_Code",
          currency: "Codes specifically reserved for testing purposes",
          number: "0963"
        },
        {
          code: "XXX",
          country: "ZZ07_No_Currency",
          currency: "The codes assigned for transactions where no currency is involved",
          number: "0999"
        },
        {
          code: "XAU",
          country: "ZZ08_Gold",
          currency: "Gold",
          number: "0959"
        },
        {
          code: "XPD",
          country: "ZZ09_Palladium",
          currency: "Palladium",
          number: "0964"
        },
        {
          code: "XPT",
          country: "ZZ10_Platinum",
          currency: "Platinum",
          number: "0962"
        },
        {
          code: "XAG",
          country: "ZZ11_Silver",
          currency: "Silver",
          number: "0961"
        }
      ]
    };
  }
});

// node_modules/@kawkab-oss/node-tlv/lib/Decoder.js
var require_Decoder = __commonJS({
  "node_modules/@kawkab-oss/node-tlv/lib/Decoder.js"(exports, module2) {
    var toNumber = require_util().toNumber;
    var toAscii = require_util().toAscii;
    var Pdol = require_Select().Pdol;
    var Gpo = require_Gpo();
    var Record = require_Record();
    var GAC = require_Gac();
    var GetData = require_GetData();
    var Template = require_Template();
    var Terminal = require_Terminal();
    var emv = {
      "84": {
        name: "Dedicated File (DF) Name",
        decoder: isPse
      },
      "A5": {
        name: "File Control Information (FCI) Proprietary Template"
      },
      "50": {
        name: "Application Label",
        decoder: ascii
      },
      "5F2D": {
        name: "Language Preference",
        decoder: ascii
      },
      "9F12": {
        name: "Application Preferred Name",
        decoder: ascii
      },
      "9F38": {
        name: "Processing Options Data Object List (PDOL)",
        decoder: Pdol
      },
      "82": {
        name: "Application Interchange Profile",
        decoder: Gpo.ApplicationInterchangeProfile
      },
      "94": {
        name: "Application File Locator (AFL) (contact)",
        decoder: Gpo.ApplicationFileLocator,
        func: Gpo.ApplicationFileLocatorFunction
      },
      "56": {
        name: "Track 1 Data",
        decoder: Record.Track1Data
      },
      "57": {
        name: "Track 2 Equivalent Data",
        decoder: Record.Track2Data
      },
      "5F20": {
        name: "Card holder name",
        decoder: ascii
      },
      "5F25": {
        name: "Application Effective Date",
        decoder: getDateFormat
      },
      "5F24": {
        name: "Application Expiration Date",
        decoder: getDateFormat
      },
      "5F28": {
        name: "Issuer Country Code",
        decoder: getCountryCode
      },
      "5F30": {
        name: "Service Code",
        decoder: Record.ServiceCode
      },
      "8C": {
        name: "CDOL1 (Card Risk Management Data Object List 1)",
        decoder: Record.CDOL1
      },
      "8D": {
        name: "CDOL2 (Card Risk Management Data Object List 2)",
        decoder: Record.CDOL2
      },
      "8E": {
        name: "CVM List (Cardholder Verification Method List)",
        decoder: Record.CVMList
      },
      "9F07": {
        name: "Application Usage Control",
        decoder: Record.ApplicationUsageControl
      },
      "9F0D": {
        name: "Issuer Action Code - Default",
        decoder: Record.IssuerActionCode
      },
      "9F0E": {
        name: "Issuer Action Code - Denial",
        decoder: Record.IssuerActionCode
      },
      "9F0F": {
        name: "Issuer Action Code - Online",
        decoder: Record.IssuerActionCode
      },
      "9F1F": {
        name: "Track 1 Discretionary Data",
        decoder: Record.Track1DiscretionaryData
      },
      "9F6B": {
        name: "Track 2 Data",
        decoder: Record.Track2Data
      },
      "9F10": {
        name: "IAD (Issuer Application Data)",
        decoder: GAC.IssuerApplicationData
      },
      "9F27": {
        name: "CID (Cryptogram Information Data)",
        decoder: GAC.CryptogramInformationData
      },
      "9F36": {
        name: "ATC (Application Transaction Count",
        decoder: number
      },
      "5F2A": {
        name: "Transaction Currency Code",
        decoder: getCurrencyCode
      },
      "9F1A": {
        name: "Terminal Country Code",
        decoder: getCountryCode
      },
      "9F35": {
        name: "Terminal Type",
        decoder: GAC.TerminalType
      },
      "9F42": {
        name: "Application Currency Code",
        decoder: getCurrencyCode
      },
      "9F4F": {
        name: "Log Format",
        decoder: GetData.LogFormat
      },
      "C3": {
        name: "Card Issuer Action Code - Decline (contact)",
        decoder: GetData.IssuerActionCode
      },
      "C4": {
        name: "Card Issuer Action Code \u2013 Default (contact)",
        decoder: GetData.IssuerActionCode
      },
      "C5": {
        name: "Card Issuer Action Code - Online (contact)",
        decoder: GetData.IssuerActionCode
      },
      "CD": {
        name: "Card Issuer Action Code \u2013 Default (contactless)",
        decoder: GetData.IssuerActionCode
      },
      "CE": {
        name: "Card Issuer Action Code - Online (contactless)",
        decoder: GetData.IssuerActionCode
      },
      "CF": {
        name: "Card Issuer Action Code - Decline (contactless)",
        decoder: GetData.IssuerActionCode
      },
      "C8": {
        name: "CRM Country Code",
        decoder: getCountryCode
      },
      "D5": {
        name: "Application Control (Contact)",
        decoder: GetData.ApplicationControl
      },
      "D7": {
        name: "Application Control (Contactless)",
        decoder: GetData.ApplicationControl
      },
      "95": {
        name: "Terminal Verification Results",
        decoder: Terminal.TerminalVerificationResult
      },
      "C1": {
        name: "Application Control",
        decoder: GetData.ApplicationControl4Cpa
      },
      "BF30": {
        name: "Accumulator Value(DF0X) / Limit(DF1X)"
      },
      "BF31": {
        name: "Accumulator Profile Control",
        decoder: Template.AccumulatorProfileControl
      },
      "BF32": {
        name: "Accumulator x Control",
        decoder: Template.AccumulatorControl
      },
      "BF34": {
        name: "Card Issuer Action Codes",
        decoder: Template.Ciacs
      },
      "BF36": {
        name: "Counter Profile Control",
        decoder: Template.CounterProfileControl
      },
      "BF37": {
        name: "Counter x Control",
        decoder: Template.CounterControl
      },
      "BF3B": {
        name: "Issuer Options Profile Control",
        decoder: Template.IssuerOptionsProfileControl
      },
      "BF3D": {
        name: "MTA Profile Control",
        decoder: Template.MtaProfileCotnrol
      }
    };
    function setDecoder(tlv) {
      var tag = tlv.getTag();
      if (tag[0] === "D" && tag[1] === "F") {
        var parent = tlv.parent;
        if (parent !== void 0) {
          tlv.name = parent.name;
          tlv.desc = parent.desc;
          return;
        }
      }
      if (emv[tag] !== void 0) {
        tlv.name = emv[tag].name;
        tlv.desc = emv[tag].decoder;
        if (emv[tag].func) {
          emv[tag].func(tlv);
        }
      }
    }
    function ascii(tlv) {
      return [toAscii(tlv.getValue())];
    }
    function number(tlv) {
      return ["DEC: " + toNumber(tlv.getValue())];
    }
    function getCountryCode(tlv) {
      var value = tlv.getValue();
      var countryCode = require_CountryCode();
      var obj = countryCode[value];
      var desc = [];
      if (obj !== void 0) {
        desc.push("country info: name : " + obj["country"] + " (" + obj["A3"] + ")");
      } else {
        desc.push("unknown country code. plz update ISO3166.");
      }
      return desc;
    }
    function getDateFormat(tlv) {
      var desc = [];
      var value = tlv.getValue();
      var year = "20" + value.slice(0, 2);
      var month = value.slice(2, 4);
      var date = value.slice(4);
      desc.push("YYYY-MM-DD: " + year + "-" + month + "-" + date);
      return desc;
    }
    function isPse(tlv) {
      var value = tlv.getValue();
      if (value === "315041592E5359532E4444463031" || value === "325041592E5359532E4444463031") {
        return ascii(tlv);
      }
      return [];
    }
    function getCurrencyCode(tlv) {
      var value = tlv.getValue();
      var currencyCode = require_CurrencyCode();
      var list = currencyCode["list"];
      var desc = [];
      if (list !== void 0) {
        var array = [];
        list.forEach(function(item) {
          if (item["number"] === value) {
            array.push(item);
          }
        });
        var obj = array[0];
        if (obj)
          desc.push("Code: [" + obj["code"] + "] : " + obj["currency"]);
        else
          desc.push("unknown country code " + value + ". plz update ISO3166.");
      } else {
        desc.push("no country codes? plz load.");
      }
      return desc;
    }
    module2.exports = {
      setDecoder
    };
  }
});

// node_modules/@kawkab-oss/node-tlv/lib/TLV.js
var require_TLV = __commonJS({
  "node_modules/@kawkab-oss/node-tlv/lib/TLV.js"(exports, module2) {
    var Dictionary = require_Dictionary();
    var Buffer2 = require("buffer/").Buffer;
    var setDecoder = require_Decoder().setDecoder;
    var ut = require_util();
    var toHexString = ut.toHexString;
    var toBuffer = ut.toBuffer;
    var toNumber = ut.toNumber;
    var toAscii = ut.toAscii;
    var newBuffer = ut.newBuffer;
    var un = ut.un;
    var strip = ut.strip;
    TLV.EMV = 0;
    TLV.DGI = 1;
    TLV.DOL = DOL;
    TLV.TL = TL;
    function TLV(tag, value, encoding) {
      if (!(this instanceof TLV)) {
        return new TLV(tag, value, encoding);
      }
      this.encodingMode = encoding || TLV.EMV;
      if (this.encodingMode !== TLV.EMV && this.encodingMode !== TLV.DGI) {
        throw new Error("Not supported encoding mode");
      }
      this.tag = TLV.adjustTag(tag, this.encodingMode);
      this.value = TLV.adjustValue(value);
      this.length = this.value.length / 2;
      if (Buffer2.isBuffer(value)) {
        this.bValue = newBuffer(value);
      } else {
        this.bValue = newBuffer(this.value);
      }
      this.bTag = newBuffer(this.tag);
      this.bLength = TLV.getBufferLength(this.length, this.encodingMode);
      this.size = this.bTag.length + this.bLength.length + this.bValue.length;
      var offset = 0;
      var child;
      this.info = {};
      this.child = [];
      if (this.encodingMode === TLV.DGI) {
        if (this.bValue[0] === 112 || this.tag == "9102") {
          this.info.encoding = "constructed";
          this.isConstructed = true;
          while (offset < this.length) {
            child = TLV.parse(this.bValue.slice(offset));
            offset += child.size;
            this.child.push(child);
          }
        } else {
          this.info.encoding = "primitive";
          this.isConstructed = false;
        }
      } else {
        this.name = Dictionary.getName(this.tag);
        this.info = {};
        var CLASS_UNIVERSAL = 0;
        var CLASS_APPLICATION = 64;
        var CLASS_CONTEXT_SPECIFIC = 128;
        var CLASS_PRIVATE = 192;
        var ENCODING_PRIMITIVE = 0;
        var ENCODING_CONSTRUCTED = 32;
        var tlv_class = this.bTag[0] & CLASS_PRIVATE;
        var tlv_encoding = this.bTag[0] & ENCODING_CONSTRUCTED;
        switch (tlv_class) {
          case CLASS_UNIVERSAL:
            this.info.clazz = "universal";
            break;
          case CLASS_APPLICATION:
            this.info.clazz = "application";
            break;
          case CLASS_CONTEXT_SPECIFIC:
            this.info.clazz = "context specific";
            break;
          case CLASS_PRIVATE:
            this.info.clazz = "private";
            break;
        }
        if (tlv_encoding === ENCODING_PRIMITIVE) {
          this.info.encoding = "primitive";
          this.isConstructed = false;
        } else {
          this.info.encoding = "constructed";
          this.isConstructed = true;
        }
        setDecoder(this);
        if (this.isConstructed) {
          while (offset < this.length) {
            child = TLV.parse(this.bValue.slice(offset));
            child.parent = this;
            setDecoder(child);
            offset += child.size;
            this.child.push(child);
          }
        }
      }
    }
    TLV.prototype.getTag = function(encoding) {
      if (encoding === "number") {
        return toNumber(this.tag);
      } else if (encoding === "buffer") {
        return toBuffer(this.tag);
      } else {
        return this.tag;
      }
    };
    TLV.prototype.getLength = function(encoding) {
      if (encoding === "hex") {
        return toHexString(this.bLength);
      } else if (encoding === "buffer") {
        return TLV.getBufferLength(this.length, this.encodingMode);
      } else {
        return this.length;
      }
    };
    TLV.prototype.getSize = function() {
      return this.size;
    };
    TLV.prototype.getValue = function(encoding) {
      if (encoding === "buffer") {
        return toBuffer(this.value);
      } else if (encoding === "ascii") {
        return toAscii(this.value);
      } else {
        return this.value;
      }
    };
    TLV.prototype.getName = function() {
      return this.name || "";
    };
    TLV.prototype.getEncoding = function() {
      return this.encodingMode;
    };
    TLV.prototype.getL = function(flag) {
      if (flag) {
        return toHexString(this.length);
      } else {
        return toHexString(this.bLength);
      }
    };
    TLV.prototype.getTL = function() {
      return this.tag + toHexString(this.bLength);
    };
    TLV.prototype.getLV = function(flag) {
      if (flag) {
        return toHexString(this.length) + this.value;
      } else {
        return toHexString(this.bLength) + this.value;
      }
    };
    TLV.prototype.getTV = function() {
      return this.tag + this.value;
    };
    TLV.prototype.getTLV = function() {
      return this.tag + toHexString(this.bLength) + this.value;
    };
    TLV.prototype.print = function(indent) {
      if (this.length === 0) {
        return;
      }
      var tab = "	";
      indent = indent || 0;
      var prefix = "";
      for (var i = 0; i < indent; i++) {
        prefix += tab;
      }
      var tld = this.tag + " " + toHexString(this.bLength) + " (" + this.length + ")";
      if (this.name !== void 0) {
        tld = tld + " [" + this.name + "]";
      }
      console.log(prefix + tld);
      if (this.child.length !== 0) {
        this.child.forEach(function(child) {
          child.print(indent + 1);
        });
      } else {
        console.log(prefix + tab + this.value);
        if (this.desc) {
          var arr = this.desc(this);
          if (arr.length !== 0) {
            console.log(prefix + tab + arr.join("\n" + prefix + tab));
          }
        }
      }
    };
    TLV.prototype.print2 = function(indent) {
      if (this.length === 0) {
        return;
      }
      var tab = "	";
      indent = indent || 0;
      var prefix = "";
      for (var i = 0; i < indent; i++) {
        prefix += tab;
      }
      var tld = "'" + this.tag + "', ";
      var tag_name = "";
      if (this.name !== void 0) {
        tag_name = " // " + this.name;
      }
      if (this.child.length !== 0) {
        this.child.forEach(function(child) {
          child.print2(indent + 1);
        });
      } else {
        console.log("TLV(" + tld + "'" + this.value + "'), " + tag_name);
        if (this.desc) {
          var arr = this.desc(this);
        }
      }
    };
    TLV.prototype.getChild = function() {
      return this.child;
    };
    TLV.prototype.find = function(tag) {
      var upperTAG = TLV.adjustTag(tag);
      var child;
      var tlv;
      for (var i = 0; i < this.child.length; i++) {
        child = this.child[i];
        if (child.tag === upperTAG) {
          return this.child[i];
        }
        if (child.isConstructed) {
          tlv = this.child[i].find(tag);
          if (tlv !== void 0) {
            return tlv;
          }
        }
      }
    };
    TLV.prototype.findAll = function(tag) {
      var upperTAG = TLV.adjustTag(tag);
      var child;
      var results = [];
      var tlv;
      for (var i = 0; i < this.child.length; i++) {
        child = this.child[i];
        if (child.tag === upperTAG) {
          results.push(child);
        }
        if (child.isConstructed) {
          tlv = child.findAll(tag);
          if (tlv.length !== 0) {
            results = results.concat(tlv);
          }
        }
      }
      return results;
    };
    TLV.prototype.toString = function() {
      return this.getTLV();
    };
    TLV.prototype.getTlvByTag = function(tag) {
      var upperTAG;
      var all = false;
      if (tag === "*" || tag === "" || tag === void 0) {
        all = true;
      } else {
        upperTAG = TLV.adjustTag(tag);
      }
      var ret = [];
      var child;
      for (var i = 0; i < this.child.length; i++) {
        child = this.child[i];
        if (all === true || child.tag === upperTAG) {
          ret.push(child);
        }
        if (child.isConstructed) {
          ret = ret.concat(child.getTlvByTag(tag));
        }
      }
      return ret;
    };
    TLV.prototype.parseDolValue = function() {
      return DOL.parse(this.getValue());
    };
    TLV.parseList = function(data, encoding) {
      encoding = encoding || TLV.EMV;
      var tlv = new TLV(32, data, encoding);
      return tlv.getChild();
    };
    TLV.parse = function(data, encoding) {
      encoding = encoding || TLV.EMV;
      var buf = toBuffer(data);
      var tag;
      var lenTag;
      var length;
      var len;
      var value;
      if (encoding === TLV.DGI) {
        if (buf.length < 3) {
          throw Error("Invalid data");
        }
        var pos;
        tag = toHexString(buf.slice(0, 2));
        if (buf[2] === 255) {
          length = buf[3] << 8 | buf[4];
          pos = 5;
        } else {
          length = buf[2];
          pos = 3;
        }
        value = buf.slice(pos, pos + length);
        return new TLV(tag, value, encoding);
      } else {
        lenTag = 1;
        if ((buf[0] & 31) === 31) {
          var idx = 1;
          do {
            lenTag++;
            if (idx > 4) {
              throw Error("Invalid tag length");
            }
          } while ((buf[idx++] & 128) === 128);
        }
        tag = toHexString(buf.slice(0, lenTag));
        var lenOffset = lenTag;
        if ((buf[lenOffset] & 128) === 128) {
          len = (buf[lenOffset] & 127) + 1;
        } else {
          len = 1;
        }
        if (len === 1) {
          length = buf[lenOffset];
        } else if (len === 2) {
          length = buf[lenOffset + 1];
        } else if (len === 3) {
          length = buf[lenOffset + 1] << 8 | buf[lenOffset + 2];
        } else if (len === 4) {
          length = buf[lenOffset + 1] << 16 | buf[lenOffset + 2] << 8 | buf[lenOffset + 3];
        } else if (len === 5) {
          length = buf[lenOffset + 1] << 24 | buf[lenOffset + 2] << 16 | buf[lenOffset + 3] << 8 | buf[lenOffset + 4];
        } else {
          throw Error("Invalid length");
        }
        value = buf.slice(lenTag + len, lenTag + len + length);
        return new TLV(tag, value, encoding);
      }
    };
    TLV.T = function(tag) {
      var tlv = new TLV(tag, "");
      return tlv.getTag();
    };
    TLV.log = function(data, encoding) {
      TLV.parse(data, encoding).print();
    };
    TLV.L = function(value, flag) {
      var tlv = new TLV("", value);
      return tlv.getL(flag);
    };
    TLV.LV = function(value, flag) {
      var tlv = new TLV("", value);
      return tlv.getLV(flag);
    };
    TLV.V = function(value) {
      var tlv = new TLV("", value);
      return tlv.getValue();
    };
    TLV.TLV = function(tag, value, encoding) {
      var tlv = new TLV(tag, value, encoding);
      return tlv.getTLV();
    };
    TLV.getBufferTag = function(buf, encoding) {
      if (buf === void 0 || buf.length === 0) {
        throw Error("Invalid data");
      }
      if (encoding === TLV.DGI) {
        if (buf.length < 2) {
          throw new Error("Invalid Tag length TLV.DGI");
        }
        return buf.slice(0, 2);
      } else {
        var lenTag = 1;
        if ((buf[0] & 31) === 31) {
          var idx = 1;
          do {
            lenTag++;
          } while ((buf[idx] & 128) === 128);
          if (idx > 4) {
            throw Error("Invalid tag length TLV.EMV");
          }
        }
        return buf.slice(0, lenTag);
      }
    };
    TLV.getBufferLength = function(len, encoding) {
      var bLen;
      if (encoding === TLV.DGI) {
        if (len > 254) {
          bLen = newBuffer(3);
          bLen[0] = 255;
          bLen[1] = len >>> 8;
          bLen[2] = len;
        } else {
          bLen = newBuffer(1);
          bLen[0] = len;
        }
      } else {
        if (len < 128) {
          bLen = newBuffer(1);
          bLen[0] = len;
        } else if (len < 256) {
          bLen = newBuffer(2);
          bLen[0] = 129;
          bLen[1] = len;
        } else if (len < 65536) {
          bLen = newBuffer(3);
          bLen[0] = 130;
          bLen[1] = len >>> 8;
          bLen[2] = len;
        } else if (len < 16777216) {
          bLen = newBuffer(4);
          bLen[0] = 131;
          bLen[1] = len >>> 16;
          bLen[2] = len >>> 8;
          bLen[3] = len;
        } else {
          bLen = newBuffer(5);
          bLen[0] = 132;
          bLen[1] = len >>> 24;
          bLen[2] = len >>> 16;
          bLen[3] = len >>> 8;
          bLen[4] = len;
        }
      }
      return bLen;
    };
    TLV.adjustTag = function(tag, encoding) {
      tag = tag || "";
      var ret;
      if (typeof tag === "number") {
        ret = toHexString(tag);
      } else if (typeof tag === "string") {
        tag = strip(tag);
        if (tag.length === 0 || tag === "") {
          ret = "";
        } else {
          var num2 = toNumber(tag);
          ret = toHexString(num2);
        }
      } else if (Buffer2.isBuffer(tag)) {
        if (tag.length > 3) {
          throw new Error("Invalid tag length: " + tag.length);
        }
        ret = toNumber(tag);
        ret = toHexString(ret);
      } else {
        throw new Error("Invalid tag type");
      }
      if (encoding === TLV.DGI && ret.length !== 4) {
        ret += "00";
      }
      return ret;
    };
    TLV.adjustValue = function(value) {
      value = value || "";
      if (Buffer2.isBuffer(value)) {
        return toHexString(value);
      } else if (typeof value === "string") {
        value = strip(value);
        if ((value.length & 1) === 1) {
          throw Error("Invalid value length");
        }
        return value;
      } else if (value instanceof TLV) {
        return value.toString();
      } else {
        throw Error("Invalid value type: " + typeof value);
      }
    };
    TLV.adjustLength = function(length) {
      var ret;
      length = length || 0;
      if (typeof length === "number") {
        ret = length;
      } else if (typeof length === "string") {
        length = strip(length);
        ret = toNumber(length);
      } else {
        throw new Error("Invalid tag type");
      }
      return ret;
    };
    TLV.getName = function(tag) {
      return Dictionary.getName(toHexString(tag)) || "";
    };
    function TL(tag, length) {
      if (!(this instanceof TL)) {
        return new TL(tag, length);
      }
      this.tag = TLV.adjustTag(tag);
      this.length = TLV.adjustLength(length);
      this.bTag = newBuffer(this.tag);
      this.bLength = TLV.getBufferLength(this.length);
      this.size = this.bTag.length + this.bLength.length;
      this.name = Dictionary.getName(this.tag);
    }
    TL.prototype.getTag = function(type) {
      if (type === "number") {
        return toNumber(this.tag);
      } else {
        return this.tag;
      }
    };
    TL.prototype.getLength = function() {
      return this.length;
    };
    TL.prototype.getSize = function() {
      return this.size;
    };
    TL.prototype.getName = function() {
      return this.name;
    };
    TL.prototype.setValue = function(value) {
      this.value = toHexString(value);
    };
    TL.prototype.getTL = function() {
      return this.tag + toHexString(this.bLength);
    };
    TL.prototype.getL = function(flag) {
      if (flag) {
        return toHexString(this.length);
      } else {
        return toHexString(this.bLength);
      }
    };
    TL.prototype.toString = function() {
      return this.getTL();
    };
    TL.prototype.toTLV = function(value) {
      return new TLV(this.tag, value);
    };
    TL.prototype.print = function(indent) {
      if (this.length === 0) {
        return;
      }
      var tab = "	";
      indent = indent || 0;
      var prefix = "";
      for (var i = 0; i < indent; i++) {
        prefix += tab;
      }
      var tld = this.tag + " " + toHexString(this.bLength) + " (" + this.length + ")";
      if (this.name !== void 0) {
        tld = tld + " [" + this.name + "]";
      }
      console.log(prefix + tld);
    };
    function DOL(dolData) {
      var buf = toBuffer(dolData);
      var offset = 0;
      var tag;
      var lenTag;
      var length;
      var len;
      this.list = [];
      do {
        lenTag = 1;
        if ((buf[offset] & 31) === 31) {
          var idx = offset + 1;
          do {
            lenTag++;
          } while ((buf[idx] & 128) === 128);
        }
        tag = toHexString(buf.slice(offset, offset + lenTag));
        offset += lenTag;
        var lenOffset = offset;
        len = 1;
        if ((buf[lenOffset] & 128) === 128) {
          len = (buf[lenOffset] & 127) + 1;
        }
        if (len === 1) {
          length = buf[lenOffset];
          offset += 1;
        } else if (len === 2) {
          length = buf[lenOffset + 1];
          offset += 2;
        } else if (len === 3) {
          length = buf[lenOffset + 1] << 8 | buf[lenOffset + 2];
          offset += 3;
        } else if (len === 4) {
          length = buf[lenOffset + 1] << 16 | buf[lenOffset + 2] << 8 | buf[lenOffset + 3];
          offset += 4;
        } else if (len === 5) {
          length = buf[lenOffset + 1] << 24 | buf[lenOffset + 2] << 16 | buf[lenOffset + 3] << 8 | buf[lenOffset + 4];
          offset += 5;
        } else {
          console.log("error:" + this.tag);
          return;
        }
        this.list.push(new TL(tag, length));
      } while (offset < buf.length);
    }
    DOL.prototype.print = function() {
      this.list.forEach(function(item) {
        item.print();
      });
    };
    DOL.prototype.setValue = function(values) {
      values = toBuffer(values);
      var offset = 0;
      var tlvlist = [];
      this.list.forEach(function(item) {
        var tag = item.getTag();
        var length = item.getLength();
        var value = un(values, offset, length);
        offset += length;
        item.setValue(value);
        tlvlist.push(new TLV(tag, value));
      });
      return tlvlist;
    };
    DOL.prototype.getList = function() {
      return this.list;
    };
    DOL.prototype.find = function(tag) {
      tag = TLV.adjustTag(tag);
      this.list.forEach(function(item) {
        if (tag === item.tag) {
          return item;
        }
      });
    };
    DOL.prototype.count = function() {
      return this.list.length;
    };
    DOL.prototype.getDolRelatedDataLength = function() {
      var len = 0;
      this.list.forEach(function(item) {
        len += item.length;
      });
      return len;
    };
    DOL.parse = function(dolData) {
      return new DOL(dolData);
    };
    module2.exports = TLV;
  }
});

// node_modules/@kawkab-oss/fatoora-parser/www/index.js
var require_www = __commonJS({
  "node_modules/@kawkab-oss/fatoora-parser/www/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toJson = void 0;
    var TLV = require_TLV();
    var Buffer2 = require("buffer/").Buffer;
    var fatooraAsJson = {
      VATAmount: { tag: 4, value: 0 },
      VATNumber: { tag: 1, value: 0 },
      invoiceAmount: { tag: 3, value: 0 },
      sellerName: { tag: 0, value: "" },
      timestamp: { tag: 2, value: "" }
    };
    function toJson2(base64String) {
      try {
        const listOfHex = TLV.parseList(Buffer2.from(base64String, "base64").toString("hex"));
        Object.keys(fatooraAsJson).forEach((k) => {
          const tagIndex = fatooraAsJson[k].tag;
          const tagType = typeof fatooraAsJson[k].value;
          const value = Buffer2.from(listOfHex[tagIndex].getValue(), "hex").toString("utf-8");
          fatooraAsJson[k].value = parseValue(tagType, value);
        });
      } catch (e) {
        throw new Error("Fatoora-parser: " + e.message + ". CHECK your base64 string");
      }
      return fatooraAsJson;
    }
    exports.toJson = toJson2;
    function parseValue(type, value) {
      switch (type) {
        case "number":
          return +value;
        default:
          return value;
      }
    }
  }
});

// netlify/functions/fatoora/fatoora.ts
__export(exports, {
  handler: () => handler
});
var import_fatoora_parser = __toModule(require_www());
var handler = async (event, context) => {
  const body = JSON.parse(event.body);
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
  };
  let response = {
    statusCode: 200,
    headers,
    body: JSON.stringify("fatoora")
  };
  try {
    console.log(body.base64);
    const fatoora = (0, import_fatoora_parser.toJson)(body.base64);
    response = {
      headers,
      statusCode: 200,
      body: JSON.stringify(fatoora)
    };
  } catch (e) {
    response = {
      statusCode: 400,
      headers,
      body: e.message
    };
  }
  return response;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=fatoora.js.map
