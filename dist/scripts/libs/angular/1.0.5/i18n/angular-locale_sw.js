angular.module("ngLocale",[],["$provide",function(e){var t={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};e.value("$locale",{DATETIME_FORMATS:{MONTH:["Januari","Februari","Machi","Aprili","Mei","Juni","Julai","Agosti","Septemba","Oktoba","Novemba","Desemba"],SHORTMONTH:["Jan","Feb","Mac","Apr","Mei","Jun","Jul","Ago","Sep","Okt","Nov","Des"],DAY:["Jumapili","Jumatatu","Jumanne","Jumatano","Alhamisi","Ijumaa","Jumamosi"],SHORTDAY:["J2","J3","J4","J5","Alh","Ij","J1"],AMPMS:["asubuhi","alasiri"],medium:"d MMM y h:mm:ss a","short":"dd/MM/yyyy h:mm a",fullDate:"EEEE, d MMMM y",longDate:"d MMMM y",mediumDate:"d MMM y",shortDate:"dd/MM/yyyy",mediumTime:"h:mm:ss a",shortTime:"h:mm a"},NUMBER_FORMATS:{DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{minInt:1,minFrac:0,macFrac:0,posPre:"",posSuf:"",negPre:"-",negSuf:"",gSize:3,lgSize:3,maxFrac:3},{minInt:1,minFrac:2,macFrac:0,posPre:"",posSuf:" ¤",negPre:"-",negSuf:" ¤",gSize:3,lgSize:3,maxFrac:2}],CURRENCY_SYM:"TZS"},pluralCat:function(e){return e==1?t.ONE:t.OTHER},id:"sw"})}]);