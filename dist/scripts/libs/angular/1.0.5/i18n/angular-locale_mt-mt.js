angular.module("ngLocale",[],["$provide",function(e){var t={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};e.value("$locale",{NUMBER_FORMATS:{DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{minInt:1,minFrac:0,macFrac:0,posPre:"",posSuf:"",negPre:"-",negSuf:"",gSize:3,lgSize:3,maxFrac:3},{minInt:1,minFrac:2,macFrac:0,posPre:"¤",posSuf:"",negPre:"¤-",negSuf:"",gSize:3,lgSize:3,maxFrac:2}],CURRENCY_SYM:"₤"},pluralCat:function(e){return e==1?t.ONE:e==0||e%100>=2&&e%100<=4&&e==Math.floor(e)?t.FEW:e%100>=11&&e%100<=19&&e==Math.floor(e)?t.MANY:t.OTHER},DATETIME_FORMATS:{MONTH:["Jannar","Frar","Marzu","April","Mejju","Ġunju","Lulju","Awwissu","Settembru","Ottubru","Novembru","Diċembru"],SHORTMONTH:["Jan","Fra","Mar","Apr","Mej","Ġun","Lul","Aww","Set","Ott","Nov","Diċ"],DAY:["Il-Ħadd","It-Tnejn","It-Tlieta","L-Erbgħa","Il-Ħamis","Il-Ġimgħa","Is-Sibt"],SHORTDAY:["Ħad","Tne","Tli","Erb","Ħam","Ġim","Sib"],AMPMS:["QN","WN"],medium:"dd MMM y HH:mm:ss","short":"dd/MM/yyyy HH:mm",fullDate:"EEEE, d 'ta'’ MMMM y",longDate:"d 'ta'’ MMMM y",mediumDate:"dd MMM y",shortDate:"dd/MM/yyyy",mediumTime:"HH:mm:ss",shortTime:"HH:mm"},id:"mt-mt"})}]);