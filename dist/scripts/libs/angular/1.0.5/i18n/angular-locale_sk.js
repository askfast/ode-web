angular.module("ngLocale",[],["$provide",function(e){var t={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};e.value("$locale",{DATETIME_FORMATS:{MONTH:["januára","februára","marca","apríla","mája","júna","júla","augusta","septembra","októbra","novembra","decembra"],SHORTMONTH:["jan","feb","mar","apr","máj","jún","júl","aug","sep","okt","nov","dec"],DAY:["nedeľa","pondelok","utorok","streda","štvrtok","piatok","sobota"],SHORTDAY:["ne","po","ut","st","št","pi","so"],AMPMS:["dopoludnia","popoludní"],medium:"d.M.yyyy H:mm:ss","short":"d.M.yyyy H:mm",fullDate:"EEEE, d. MMMM y",longDate:"d. MMMM y",mediumDate:"d.M.yyyy",shortDate:"d.M.yyyy",mediumTime:"H:mm:ss",shortTime:"H:mm"},NUMBER_FORMATS:{DECIMAL_SEP:",",GROUP_SEP:" ",PATTERNS:[{minInt:1,minFrac:0,macFrac:0,posPre:"",posSuf:"",negPre:"-",negSuf:"",gSize:3,lgSize:3,maxFrac:3},{minInt:1,minFrac:2,macFrac:0,posPre:"",posSuf:" ¤",negPre:"-",negSuf:" ¤",gSize:3,lgSize:3,maxFrac:2}],CURRENCY_SYM:"Sk"},pluralCat:function(e){return e==1?t.ONE:e==2||e==3||e==4?t.FEW:t.OTHER},id:"sk"})}]);