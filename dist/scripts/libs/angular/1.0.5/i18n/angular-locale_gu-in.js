angular.module("ngLocale",[],["$provide",function(e){var t={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};e.value("$locale",{NUMBER_FORMATS:{DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{minInt:1,minFrac:0,macFrac:0,posPre:"",posSuf:"",negPre:"-",negSuf:"",gSize:2,lgSize:3,maxFrac:3},{minInt:1,minFrac:2,macFrac:0,posPre:"¤ ",posSuf:"",negPre:"¤ -",negSuf:"",gSize:2,lgSize:3,maxFrac:2}],CURRENCY_SYM:"Rs"},pluralCat:function(e){return e==1?t.ONE:t.OTHER},DATETIME_FORMATS:{MONTH:["જાન્યુઆરી","ફેબ્રુઆરી","માર્ચ","એપ્રિલ","મે","જૂન","જુલાઈ","ઑગસ્ટ","સપ્ટેમ્બર","ઑક્ટ્બર","નવેમ્બર","ડિસેમ્બર"],SHORTMONTH:["જાન્યુ","ફેબ્રુ","માર્ચ","એપ્રિલ","મે","જૂન","જુલાઈ","ઑગસ્ટ","સપ્ટે","ઑક્ટો","નવે","ડિસે"],DAY:["રવિવાર","સોમવાર","મંગળવાર","બુધવાર","ગુરુવાર","શુક્રવાર","શનિવાર"],SHORTDAY:["રવિ","સોમ","મંગળ","બુધ","ગુરુ","શુક્ર","શનિ"],AMPMS:["પૂર્વ મધ્યાહ્ન","ઉત્તર મધ્યાહ્ન"],medium:"d MMM, y hh:mm:ss a","short":"d-MM-yy hh:mm a",fullDate:"EEEE, d MMMM, y",longDate:"d MMMM, y",mediumDate:"d MMM, y",shortDate:"d-MM-yy",mediumTime:"hh:mm:ss a",shortTime:"hh:mm a"},id:"gu-in"})}]);