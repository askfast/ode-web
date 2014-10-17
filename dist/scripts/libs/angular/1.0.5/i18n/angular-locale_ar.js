angular.module("ngLocale",[],["$provide",function(e){var t={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};e.value("$locale",{DATETIME_FORMATS:{MONTH:["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"],SHORTMONTH:["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"],DAY:["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],SHORTDAY:["أحد","إثنين","ثلاثاء","أربعاء","خميس","جمعة","سبت"],AMPMS:["ص","م"],medium:"dd‏/MM‏/yyyy h:mm:ss a","short":"d‏/M‏/yyyy h:mm a",fullDate:"EEEE، d MMMM، y",longDate:"d MMMM، y",mediumDate:"dd‏/MM‏/yyyy",shortDate:"d‏/M‏/yyyy",mediumTime:"h:mm:ss a",shortTime:"h:mm a"},NUMBER_FORMATS:{DECIMAL_SEP:",",GROUP_SEP:".",PATTERNS:[{minInt:1,minFrac:0,macFrac:0,posPre:"",posSuf:"",negPre:"",negSuf:"-",gSize:3,lgSize:3,maxFrac:3},{minInt:1,minFrac:2,macFrac:0,posPre:"¤ ",posSuf:"",negPre:"¤ ",negSuf:"-",gSize:3,lgSize:3,maxFrac:2}],CURRENCY_SYM:"£"},pluralCat:function(e){return e==0?t.ZERO:e==1?t.ONE:e==2?t.TWO:e%100>=3&&e%100<=10&&e==Math.floor(e)?t.FEW:e%100>=11&&e%100<=99&&e==Math.floor(e)?t.MANY:t.OTHER},id:"ar"})}]);