angular.module("ngLocale",[],["$provide",function(e){var t={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};e.value("$locale",{DATETIME_FORMATS:{MONTH:["जनवरी","फरवरी","मार्च","अप्रैल","मई","जून","जुलाई","अगस्त","सितम्बर","अक्तूबर","नवम्बर","दिसम्बर"],SHORTMONTH:["जनवरी","फरवरी","मार्च","अप्रैल","मई","जून","जुलाई","अगस्त","सितम्बर","अक्तूबर","नवम्बर","दिसम्बर"],DAY:["रविवार","सोमवार","मंगलवार","बुधवार","बृहस्पतिवार","शुक्रवार","शनिवार"],SHORTDAY:["रवि.","सोम.","मंगल.","बुध.","बृह.","शुक्र.","शनि."],AMPMS:["पूर्वाह्न","अपराह्न"],medium:"dd-MM-yyyy h:mm:ss a","short":"d-M-yy h:mm a",fullDate:"EEEE, d MMMM y",longDate:"d MMMM y",mediumDate:"dd-MM-yyyy",shortDate:"d-M-yy",mediumTime:"h:mm:ss a",shortTime:"h:mm a"},NUMBER_FORMATS:{DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{minInt:1,minFrac:0,macFrac:0,posPre:"",posSuf:"",negPre:"-",negSuf:"",gSize:2,lgSize:3,maxFrac:3},{minInt:1,minFrac:2,macFrac:0,posPre:"¤ ",posSuf:"",negPre:"¤ -",negSuf:"",gSize:2,lgSize:3,maxFrac:2}],CURRENCY_SYM:"Rs"},pluralCat:function(e){return e==0||e==1?t.ONE:t.OTHER},id:"hi"})}]);