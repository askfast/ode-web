angular.module("ngLocale",[],["$provide",function(e){var t={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};e.value("$locale",{NUMBER_FORMATS:{DECIMAL_SEP:",",GROUP_SEP:" ",PATTERNS:[{minInt:1,minFrac:0,macFrac:0,posPre:"",posSuf:"",negPre:"-",negSuf:"",gSize:3,lgSize:3,maxFrac:3},{minInt:1,minFrac:2,macFrac:0,posPre:"",posSuf:" ¤",negPre:"-",negSuf:" ¤",gSize:3,lgSize:3,maxFrac:2}],CURRENCY_SYM:"Kč"},pluralCat:function(e){return e==1?t.ONE:e==2||e==3||e==4?t.FEW:t.OTHER},DATETIME_FORMATS:{MONTH:["ledna","února","března","dubna","května","června","července","srpna","září","října","listopadu","prosince"],SHORTMONTH:["1","2","3","4","5","6","7","8","9","10","11","12"],DAY:["neděle","pondělí","úterý","středa","čtvrtek","pátek","sobota"],SHORTDAY:["ne","po","út","st","čt","pá","so"],AMPMS:["dop.","odp."],medium:"d.M.yyyy H:mm:ss","short":"d.M.yy H:mm",fullDate:"EEEE, d. MMMM y",longDate:"d. MMMM y",mediumDate:"d.M.yyyy",shortDate:"d.M.yy",mediumTime:"H:mm:ss",shortTime:"H:mm"},id:"cs-cz"})}]);