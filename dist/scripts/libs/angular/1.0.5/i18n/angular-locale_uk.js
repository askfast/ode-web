angular.module("ngLocale",[],["$provide",function(e){var t={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};e.value("$locale",{DATETIME_FORMATS:{MONTH:["січня","лютого","березня","квітня","травня","червня","липня","серпня","вересня","жовтня","листопада","грудня"],SHORTMONTH:["січ.","лют.","бер.","квіт.","трав.","черв.","лип.","серп.","вер.","жовт.","лист.","груд."],DAY:["Неділя","Понеділок","Вівторок","Середа","Четвер","Пʼятниця","Субота"],SHORTDAY:["Нд","Пн","Вт","Ср","Чт","Пт","Сб"],AMPMS:["дп","пп"],medium:"d MMM y HH:mm:ss","short":"dd.MM.yy HH:mm",fullDate:"EEEE, d MMMM y 'р'.",longDate:"d MMMM y 'р'.",mediumDate:"d MMM y",shortDate:"dd.MM.yy",mediumTime:"HH:mm:ss",shortTime:"HH:mm"},NUMBER_FORMATS:{DECIMAL_SEP:",",GROUP_SEP:" ",PATTERNS:[{minInt:1,minFrac:0,macFrac:0,posPre:"",posSuf:"",negPre:"-",negSuf:"",gSize:3,lgSize:3,maxFrac:3},{minInt:1,minFrac:2,macFrac:0,posPre:"",posSuf:" ¤",negPre:"-",negSuf:" ¤",gSize:3,lgSize:3,maxFrac:2}],CURRENCY_SYM:"₴"},pluralCat:function(e){return e%10==1&&e%100!=11?t.ONE:e%10>=2&&e%10<=4&&(e%100<12||e%100>14)&&e==Math.floor(e)?t.FEW:e%10==0||e%10>=5&&e%10<=9||e%100>=11&&e%100<=14&&e==Math.floor(e)?t.MANY:t.OTHER},id:"uk"})}]);