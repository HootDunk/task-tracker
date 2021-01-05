(()=>{"use strict";function t(t,e){if(e.length<t)throw new TypeError(t+" argument"+(t>1?"s":"")+" required, but only "+e.length+" present")}function e(e){t(1,arguments);var n=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===n?new Date(e.getTime()):"number"==typeof e||"[object Number]"===n?new Date(e):("string"!=typeof e&&"[object String]"!==n||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function n(n){t(1,arguments);var r=e(n);return!isNaN(r)}var r={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function a(t){return function(e){var n=e||{},r=n.width?String(n.width):t.defaultWidth;return t.formats[r]||t.formats[t.defaultWidth]}}var o,i={date:a({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:a({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:a({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},s={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function d(t){return function(e,n){var r,a=n||{};if("formatting"===(a.context?String(a.context):"standalone")&&t.formattingValues){var o=t.defaultFormattingWidth||t.defaultWidth,i=a.width?String(a.width):o;r=t.formattingValues[i]||t.formattingValues[o]}else{var s=t.defaultWidth,d=a.width?String(a.width):t.defaultWidth;r=t.values[d]||t.values[s]}return r[t.argumentCallback?t.argumentCallback(e):e]}}function u(t){return function(e,n){var r=String(e),a=n||{},o=a.width,i=o&&t.matchPatterns[o]||t.matchPatterns[t.defaultMatchWidth],s=r.match(i);if(!s)return null;var d,u=s[0],c=o&&t.parsePatterns[o]||t.parsePatterns[t.defaultParseWidth];return d="[object Array]"===Object.prototype.toString.call(c)?function(t,e){for(var n=0;n<t.length;n++)if(t[n].test(u))return n}(c):function(t,e){for(var n in t)if(t.hasOwnProperty(n)&&t[n].test(u))return n}(c),d=t.valueCallback?t.valueCallback(d):d,{value:d=a.valueCallback?a.valueCallback(d):d,rest:r.slice(u.length)}}}const c={code:"en-US",formatDistance:function(t,e,n){var a;return n=n||{},a="string"==typeof r[t]?r[t]:1===e?r[t].one:r[t].other.replace("{{count}}",e),n.addSuffix?n.comparison>0?"in "+a:a+" ago":a},formatLong:i,formatRelative:function(t,e,n,r){return s[t]},localize:{ordinalNumber:function(t,e){var n=Number(t),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:d({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:d({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(t){return Number(t)-1}}),month:d({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:d({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:d({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(o={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(t){return parseInt(t,10)}},function(t,e){var n=String(t),r=e||{},a=n.match(o.matchPattern);if(!a)return null;var i=a[0],s=n.match(o.parsePattern);if(!s)return null;var d=o.valueCallback?o.valueCallback(s[0]):s[0];return{value:d=r.valueCallback?r.valueCallback(d):d,rest:n.slice(i.length)}}),era:u({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:u({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(t){return t+1}}),month:u({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:u({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:u({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};function l(t){if(null===t||!0===t||!1===t)return NaN;var e=Number(t);return isNaN(e)?e:e<0?Math.ceil(e):Math.floor(e)}function m(n,r){t(2,arguments);var a=e(n).getTime(),o=l(r);return new Date(a+o)}function f(e,n){t(2,arguments);var r=l(n);return m(e,-r)}function h(t,e){for(var n=t<0?"-":"",r=Math.abs(t).toString();r.length<e;)r="0"+r;return n+r}const g=function(t,e){var n=t.getUTCFullYear(),r=n>0?n:1-n;return h("yy"===e?r%100:r,e.length)},v=function(t,e){var n=t.getUTCMonth();return"M"===e?String(n+1):h(n+1,2)},p=function(t,e){return h(t.getUTCDate(),e.length)},w=function(t,e){return h(t.getUTCHours()%12||12,e.length)},y=function(t,e){return h(t.getUTCHours(),e.length)},b=function(t,e){return h(t.getUTCMinutes(),e.length)},T=function(t,e){return h(t.getUTCSeconds(),e.length)},k=function(t,e){var n=e.length,r=t.getUTCMilliseconds();return h(Math.floor(r*Math.pow(10,n-3)),e.length)};var C=864e5;function M(n){t(1,arguments);var r=1,a=e(n),o=a.getUTCDay(),i=(o<r?7:0)+o-r;return a.setUTCDate(a.getUTCDate()-i),a.setUTCHours(0,0,0,0),a}function D(n){t(1,arguments);var r=e(n),a=r.getUTCFullYear(),o=new Date(0);o.setUTCFullYear(a+1,0,4),o.setUTCHours(0,0,0,0);var i=M(o),s=new Date(0);s.setUTCFullYear(a,0,4),s.setUTCHours(0,0,0,0);var d=M(s);return r.getTime()>=i.getTime()?a+1:r.getTime()>=d.getTime()?a:a-1}function x(e){t(1,arguments);var n=D(e),r=new Date(0);r.setUTCFullYear(n,0,4),r.setUTCHours(0,0,0,0);var a=M(r);return a}var E=6048e5;function L(n,r){t(1,arguments);var a=r||{},o=a.locale,i=o&&o.options&&o.options.weekStartsOn,s=null==i?0:l(i),d=null==a.weekStartsOn?s:l(a.weekStartsOn);if(!(d>=0&&d<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var u=e(n),c=u.getUTCDay(),m=(c<d?7:0)+c-d;return u.setUTCDate(u.getUTCDate()-m),u.setUTCHours(0,0,0,0),u}function P(n,r){t(1,arguments);var a=e(n,r),o=a.getUTCFullYear(),i=r||{},s=i.locale,d=s&&s.options&&s.options.firstWeekContainsDate,u=null==d?1:l(d),c=null==i.firstWeekContainsDate?u:l(i.firstWeekContainsDate);if(!(c>=1&&c<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var m=new Date(0);m.setUTCFullYear(o+1,0,c),m.setUTCHours(0,0,0,0);var f=L(m,r),h=new Date(0);h.setUTCFullYear(o,0,c),h.setUTCHours(0,0,0,0);var g=L(h,r);return a.getTime()>=f.getTime()?o+1:a.getTime()>=g.getTime()?o:o-1}function j(e,n){t(1,arguments);var r=n||{},a=r.locale,o=a&&a.options&&a.options.firstWeekContainsDate,i=null==o?1:l(o),s=null==r.firstWeekContainsDate?i:l(r.firstWeekContainsDate),d=P(e,n),u=new Date(0);u.setUTCFullYear(d,0,s),u.setUTCHours(0,0,0,0);var c=L(u,n);return c}var S=6048e5;function U(t,e){var n=t>0?"-":"+",r=Math.abs(t),a=Math.floor(r/60),o=r%60;if(0===o)return n+String(a);var i=e||"";return n+String(a)+i+h(o,2)}function B(t,e){return t%60==0?(t>0?"-":"+")+h(Math.abs(t)/60,2):N(t,e)}function N(t,e){var n=e||"",r=t>0?"-":"+",a=Math.abs(t);return r+h(Math.floor(a/60),2)+n+h(a%60,2)}const W={G:function(t,e,n){var r=t.getUTCFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(r,{width:"abbreviated"});case"GGGGG":return n.era(r,{width:"narrow"});case"GGGG":default:return n.era(r,{width:"wide"})}},y:function(t,e,n){if("yo"===e){var r=t.getUTCFullYear(),a=r>0?r:1-r;return n.ordinalNumber(a,{unit:"year"})}return g(t,e)},Y:function(t,e,n,r){var a=P(t,r),o=a>0?a:1-a;return"YY"===e?h(o%100,2):"Yo"===e?n.ordinalNumber(o,{unit:"year"}):h(o,e.length)},R:function(t,e){return h(D(t),e.length)},u:function(t,e){return h(t.getUTCFullYear(),e.length)},Q:function(t,e,n){var r=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"Q":return String(r);case"QQ":return h(r,2);case"Qo":return n.ordinalNumber(r,{unit:"quarter"});case"QQQ":return n.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(r,{width:"narrow",context:"formatting"});case"QQQQ":default:return n.quarter(r,{width:"wide",context:"formatting"})}},q:function(t,e,n){var r=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"q":return String(r);case"qq":return h(r,2);case"qo":return n.ordinalNumber(r,{unit:"quarter"});case"qqq":return n.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(r,{width:"narrow",context:"standalone"});case"qqqq":default:return n.quarter(r,{width:"wide",context:"standalone"})}},M:function(t,e,n){var r=t.getUTCMonth();switch(e){case"M":case"MM":return v(t,e);case"Mo":return n.ordinalNumber(r+1,{unit:"month"});case"MMM":return n.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(r,{width:"narrow",context:"formatting"});case"MMMM":default:return n.month(r,{width:"wide",context:"formatting"})}},L:function(t,e,n){var r=t.getUTCMonth();switch(e){case"L":return String(r+1);case"LL":return h(r+1,2);case"Lo":return n.ordinalNumber(r+1,{unit:"month"});case"LLL":return n.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(r,{width:"narrow",context:"standalone"});case"LLLL":default:return n.month(r,{width:"wide",context:"standalone"})}},w:function(n,r,a,o){var i=function(n,r){t(1,arguments);var a=e(n),o=L(a,r).getTime()-j(a,r).getTime();return Math.round(o/S)+1}(n,o);return"wo"===r?a.ordinalNumber(i,{unit:"week"}):h(i,r.length)},I:function(n,r,a){var o=function(n){t(1,arguments);var r=e(n),a=M(r).getTime()-x(r).getTime();return Math.round(a/E)+1}(n);return"Io"===r?a.ordinalNumber(o,{unit:"week"}):h(o,r.length)},d:function(t,e,n){return"do"===e?n.ordinalNumber(t.getUTCDate(),{unit:"date"}):p(t,e)},D:function(n,r,a){var o=function(n){t(1,arguments);var r=e(n),a=r.getTime();r.setUTCMonth(0,1),r.setUTCHours(0,0,0,0);var o=r.getTime(),i=a-o;return Math.floor(i/C)+1}(n);return"Do"===r?a.ordinalNumber(o,{unit:"dayOfYear"}):h(o,r.length)},E:function(t,e,n){var r=t.getUTCDay();switch(e){case"E":case"EE":case"EEE":return n.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(r,{width:"short",context:"formatting"});case"EEEE":default:return n.day(r,{width:"wide",context:"formatting"})}},e:function(t,e,n,r){var a=t.getUTCDay(),o=(a-r.weekStartsOn+8)%7||7;switch(e){case"e":return String(o);case"ee":return h(o,2);case"eo":return n.ordinalNumber(o,{unit:"day"});case"eee":return n.day(a,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(a,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(a,{width:"short",context:"formatting"});case"eeee":default:return n.day(a,{width:"wide",context:"formatting"})}},c:function(t,e,n,r){var a=t.getUTCDay(),o=(a-r.weekStartsOn+8)%7||7;switch(e){case"c":return String(o);case"cc":return h(o,e.length);case"co":return n.ordinalNumber(o,{unit:"day"});case"ccc":return n.day(a,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(a,{width:"narrow",context:"standalone"});case"cccccc":return n.day(a,{width:"short",context:"standalone"});case"cccc":default:return n.day(a,{width:"wide",context:"standalone"})}},i:function(t,e,n){var r=t.getUTCDay(),a=0===r?7:r;switch(e){case"i":return String(a);case"ii":return h(a,e.length);case"io":return n.ordinalNumber(a,{unit:"day"});case"iii":return n.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(r,{width:"short",context:"formatting"});case"iiii":default:return n.day(r,{width:"wide",context:"formatting"})}},a:function(t,e,n){var r=t.getUTCHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":case"aaa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaaaa":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"aaaa":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(t,e,n){var r,a=t.getUTCHours();switch(r=12===a?"noon":0===a?"midnight":a/12>=1?"pm":"am",e){case"b":case"bb":case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"bbbb":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(t,e,n){var r,a=t.getUTCHours();switch(r=a>=17?"evening":a>=12?"afternoon":a>=4?"morning":"night",e){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"BBBB":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(t,e,n){if("ho"===e){var r=t.getUTCHours()%12;return 0===r&&(r=12),n.ordinalNumber(r,{unit:"hour"})}return w(t,e)},H:function(t,e,n){return"Ho"===e?n.ordinalNumber(t.getUTCHours(),{unit:"hour"}):y(t,e)},K:function(t,e,n){var r=t.getUTCHours()%12;return"Ko"===e?n.ordinalNumber(r,{unit:"hour"}):h(r,e.length)},k:function(t,e,n){var r=t.getUTCHours();return 0===r&&(r=24),"ko"===e?n.ordinalNumber(r,{unit:"hour"}):h(r,e.length)},m:function(t,e,n){return"mo"===e?n.ordinalNumber(t.getUTCMinutes(),{unit:"minute"}):b(t,e)},s:function(t,e,n){return"so"===e?n.ordinalNumber(t.getUTCSeconds(),{unit:"second"}):T(t,e)},S:function(t,e){return k(t,e)},X:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();if(0===a)return"Z";switch(e){case"X":return B(a);case"XXXX":case"XX":return N(a);case"XXXXX":case"XXX":default:return N(a,":")}},x:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();switch(e){case"x":return B(a);case"xxxx":case"xx":return N(a);case"xxxxx":case"xxx":default:return N(a,":")}},O:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+U(a,":");case"OOOO":default:return"GMT"+N(a,":")}},z:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+U(a,":");case"zzzz":default:return"GMT"+N(a,":")}},t:function(t,e,n,r){var a=r._originalDate||t;return h(Math.floor(a.getTime()/1e3),e.length)},T:function(t,e,n,r){return h((r._originalDate||t).getTime(),e.length)}};function A(t,e){switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});case"PPPP":default:return e.date({width:"full"})}}function O(t,e){switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});case"pppp":default:return e.time({width:"full"})}}const Y={p:O,P:function(t,e){var n,r=t.match(/(P+)(p+)?/),a=r[1],o=r[2];if(!o)return A(t,e);switch(a){case"P":n=e.dateTime({width:"short"});break;case"PP":n=e.dateTime({width:"medium"});break;case"PPP":n=e.dateTime({width:"long"});break;case"PPPP":default:n=e.dateTime({width:"full"})}return n.replace("{{date}}",A(a,e)).replace("{{time}}",O(o,e))}};var q=6e4;function H(t){return t.getTime()%q}function $(t){var e=new Date(t.getTime()),n=Math.ceil(e.getTimezoneOffset());e.setSeconds(0,0);var r=n>0?(q+H(e))%q:H(e);return n*q+r}var I=["D","DD"],z=["YY","YYYY"];function F(t){return-1!==I.indexOf(t)}function X(t){return-1!==z.indexOf(t)}function Q(t,e,n){if("YYYY"===t)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("YY"===t)throw new RangeError("Use `yy` instead of `YY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("D"===t)throw new RangeError("Use `d` instead of `D` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("DD"===t)throw new RangeError("Use `dd` instead of `DD` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"))}var G=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,R=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,J=/^'([^]*?)'?$/,V=/''/g,_=/[a-zA-Z]/;function K(t){return t.match(J)[1].replace(V,"'")}function Z(n,r){t(2,arguments);var a=e(n),o=e(r),i=a.getTime()-o.getTime();return i<0?-1:i>0?1:i}function tt(n){t(1,arguments);var r=e(n);return r.setHours(0,0,0,0),r}var et=864e5;function nt(e,n){t(2,arguments);var r=tt(e),a=tt(n),o=r.getTime()-$(r),i=a.getTime()-$(a);return Math.round((o-i)/et)}function rt(n,r){t(2,arguments);var a=e(n),o=e(r),i=a.getTime()-o.getTime();return i>0?-1:i<0?1:i}const at=(()=>{const r=document.querySelector(".modal-guts"),a=document.querySelector("#modal"),o=document.querySelector("#modal-overlay");return{projectHTML:t=>{let e=t?"<h1>Edit Project</h1>":"<h1>New Project</h1>",n=t?`data-id="${t.id}" id="modal-form"`:'id="modal-form"',a=t?`value="${t.name}"`:"",o=t?`${t.description}`:"",i=t?'<button type="button">Delete</button><button type="submit">Submit</button>':'<button type="submit">Submit</button>';r.innerHTML=`\n      ${e}\n      <form ${n}>\n        <div class="form-row">\n          <label for="project-title">Title:</label>\n        </div>\n        <div class="form-row">\n          <input type="text" id="project-title" name="project-title" ${a} required />\n        </div>\n        <div class="form-row">\n          <label for="project-description">Description</label>\n        </div>\n        <div class="form-row">\n          <textarea id="project-description" name="project-description" required>${o}</textarea>\n        </div>\n        <div class="form-row bottom">\n          ${i}\n        </div>\n      </form>\n    `},toggle:()=>{a.classList.toggle("closed"),o.classList.toggle("closed")},taskHTML:a=>{let o=a?`<input type="text" id="title" name="title" value="${a.title}">`:'<input type="text" id="title" name="title">',i=a?`<input type="date" id="date" name="date" value="${function(r,a,o){t(2,arguments);var i=String(a),s=o||{},d=s.locale||c,u=d.options&&d.options.firstWeekContainsDate,m=null==u?1:l(u),h=null==s.firstWeekContainsDate?m:l(s.firstWeekContainsDate);if(!(h>=1&&h<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var g=d.options&&d.options.weekStartsOn,v=null==g?0:l(g),p=null==s.weekStartsOn?v:l(s.weekStartsOn);if(!(p>=0&&p<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!d.localize)throw new RangeError("locale must contain localize property");if(!d.formatLong)throw new RangeError("locale must contain formatLong property");var w=e(r);if(!n(w))throw new RangeError("Invalid time value");var y=$(w),b=f(w,y),T={firstWeekContainsDate:h,weekStartsOn:p,locale:d,_originalDate:w};return i.match(R).map((function(t){var e=t[0];return"p"===e||"P"===e?(0,Y[e])(t,d.formatLong,T):t})).join("").match(G).map((function(t){if("''"===t)return"'";var e=t[0];if("'"===e)return K(t);var n=W[e];if(n)return!s.useAdditionalWeekYearTokens&&X(t)&&Q(t,a,r),!s.useAdditionalDayOfYearTokens&&F(t)&&Q(t,a,r),n(b,t,d.localize,T);if(e.match(_))throw new RangeError("Format string contains an unescaped latin alphabet character `"+e+"`");return t})).join("")}(a.dueDate,"yyyy-MM-dd")}">`:'<input type="date" id="date" name="date">',s=a?`\n    <div class="radio-toolbar">\n      <input type="radio" id="radio1" name="radios" value="#F5D346" ${"#F5D346"==a.priority?"checked":""}>\n      <label for="radio1">Low</label>\n      <input type="radio" id="radio2" name="radios" value="#D98121" ${"#D98121"==a.priority?"checked":""}>\n      <label for="radio2">Medium</label>\n      <input type="radio" id="radio3" name="radios" value="#D3151C" ${"#D3151C"==a.priority?"checked":""}>\n      <label for="radio3">High</label>\n    </div>\n    `:'\n    <div class="radio-toolbar">\n      <input type="radio" id="radio1" name="radios" value="#F5D346" checked>\n      <label for="radio1">Low</label>\n      <input type="radio" id="radio2" name="radios" value="#D98121">\n      <label for="radio2">Medium</label>\n      <input type="radio" id="radio3" name="radios" value="#D3151C">\n      <label for="radio3">High</label>\n    </div>\n    ',d=a?`<textarea id="description" name="description">${a.description}</textarea>`:'<textarea id="description" name="description"></textarea>';r.innerHTML=`\n    <h1>${a?"Edit Task":"New Task"}</h1>\n    <form data-id="${a?a.id:""}" id="modal-form">\n      <div class="form-row">\n        <label for="title">Title:</label>\n        ${o}\n        <label for="due-date">Due Date:</label>\n        ${i}\n      </div>\n      <div class="form-row">\n        <label>Difficulty</label>\n      </div>\n      <div class="form-row">\n      ${s}\n      </div>\n        <div class="form-row">\n          <label for="description">Description</label>\n        </div>\n        <div class="form-row">\n          ${d}\n        </div>\n        <div class="form-row bottom">\n          ${a?'<button id="delete-button" type="button">Delete</button><button type="submit">Submit</button>':'<button type="submit">Submit</button>'}\n        </div>\n    </form>\n    `}}})(),ot=(()=>{const t=document.getElementById("dynamic-projects");return{renderProjects:e=>{e.forEach((e=>{t.innerHTML+=`<h2 data-id='${e.id}' class="project project-name">${e.name}</h2>`}))},clearProjects:()=>{t.innerHTML=""},setBackground:t=>{Array.from(document.getElementsByClassName("project")).forEach((e=>{e.getAttribute("data-id")==t?e.style.backgroundColor="#444a4d":e.style.backgroundColor="transparent"}))},updateProjectNames:(t,e)=>{const n=document.getElementsByClassName("project-name");for(let r=0;r<n.length;r++)if(n[r].getAttribute("data-id")==t)return void(n[r].innerText=e.name)}}})(),it=(()=>{const t=document.getElementById("task-grouping");return{clear:()=>{t.innerHTML=""},render:e=>{(e=(t=>{const e=t.filter((t=>1==t.complete)),n=t.filter((t=>0==t.complete));return e.sort(rt),n.sort(Z),n.concat(e)})(e)).length?e.forEach((e=>{var n;t.innerHTML+=`\n    <div data-id="${(n=e).id}" class="task-item">\n      <div class="task accordian ${1==n.complete?"completed":""}">\n  \n        <div style="background-color:${n.priority}; "id="priority-style"></div>\n        <input type="checkbox" class="todo-completed" ${1==n.complete?"checked":""}>\n        <h2 class="title">${n.title}</h2>\n        <h2 class="date">${(t=>{const e=new Date;let n;const r=Z(t,e);if(-1==r){let r=nt(e,t);n=1==r?"1 day past":0==r?"Today":`${r} days past`}else if(1==r){let r=nt(t,e);n=1==r?"In 1 day":`In ${r} days`}return n})(n.dueDate)}</h2>\n  \n      </div>\n      <div class="task-full inactive">\n        <div class="description-top">\n          <h3>Description:</h3>\n          <h3>${n.dueDate.toDateString()}</h3>\n          <i data-id="${n.id}" class="fas fa-ellipsis-v task-edit"></i>\n        </div>\n        <p>${n.description}</p>\n      </div>\n    </div>\n    `})):console.log("no tasks yet")},renderAll:t=>{let e=[];t.forEach((t=>{t.todoList.forEach((t=>{e.push(t)}))})),it.render(e)}}})(),st=t=>{const e=document.getElementById("active-title"),n=document.getElementById("active-description");e.innerHTML=t.name,n.innerHTML=t.description};var dt,ut=new Uint8Array(16);function ct(){if(!dt&&!(dt="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return dt(ut)}const lt=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i,mt=function(t){return"string"==typeof t&&lt.test(t)};for(var ft=[],ht=0;ht<256;++ht)ft.push((ht+256).toString(16).substr(1));const gt=function(t,e,n){var r=(t=t||{}).random||(t.rng||ct)();if(r[6]=15&r[6]|64,r[8]=63&r[8]|128,e){n=n||0;for(var a=0;a<16;++a)e[n+a]=r[a];return e}return function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=(ft[t[e+0]]+ft[t[e+1]]+ft[t[e+2]]+ft[t[e+3]]+"-"+ft[t[e+4]]+ft[t[e+5]]+"-"+ft[t[e+6]]+ft[t[e+7]]+"-"+ft[t[e+8]]+ft[t[e+9]]+"-"+ft[t[e+10]]+ft[t[e+11]]+ft[t[e+12]]+ft[t[e+13]]+ft[t[e+14]]+ft[t[e+15]]).toLowerCase();if(!mt(n))throw TypeError("Stringified UUID is invalid");return n}(r)};function vt(t,e){this.id=gt(),this.name=t,this.description=e,this.active=!1,this.todoList=[]}vt.prototype.addTodo=function(t){this.todoList.push(t)},vt.prototype.toggleActive=function(){this.active=!this.active},vt.prototype.deleteTodoItem=function(t){const e=this.todoList.findIndex((e=>e.id==t));this.todoList.splice(e,1)},vt.prototype.getTodoItem=function(t){return this.todoList.find((e=>e.id==t))};const pt=t=>{let e;return e=10==t.length?new Date(t.substring(0,4),Number(t.substring(5,7))-1,t.substring(8,10)):new Date(t),e};function wt(t,e,n,r){this.id=gt(),this.title=t,this.description=e,this.priority=n,this.complete=!1,this.dueDate=pt(r)}const yt=(()=>{if(localStorage.length){const t=[];return JSON.parse(localStorage.getItem("user")).forEach((e=>{const n=Object.assign(new vt,e);n.active=!1,t.push(n)})),t.forEach((t=>{t.todoList.forEach((t=>{"string"==typeof t.dueDate&&(t.dueDate=pt(t.dueDate))}))})),t}return[]})(),bt=(()=>{const t=t=>t.find((t=>1==t.active));return{addNewProject:(t,e,n)=>{const r=new vt(t,e);n.push(r)},setToActive:(t,e)=>{e.forEach((e=>e.id==t?e.active=!0:e.active=!1))},editProject:(t,e)=>{const n=e.findIndex((e=>e.id==t.id));e[n].name=t.name,e[n].description=t.description},getActiveProj:t,getActiveIndex:t=>t.findIndex((t=>1==t.active)),addNewTask:(t,e,n,r,a)=>{const o=new wt(t,e,n,r);a.forEach((t=>{1==t.active&&t.addTodo(o)}))},save:t=>{localStorage.setItem("user",JSON.stringify(t))},getTask:(e,n)=>{const r=t(n);if(r)return r.todoList.find((t=>t.id==e));for(let t=0;t<n.length;t++)for(let r=0;r<n[t].todoList.length;r++)if(n[t].todoList[r].id==e)return n[t].todoList[r]},allToInactive:t=>{t.forEach((t=>t.active=!1))},editTask:(e,n,r)=>{const a=t(r);if(a){const t=a.todoList.findIndex((t=>t.id==e));a.todoList[t].title=n.title,a.todoList[t].dueDate=pt(n.dueDate),a.todoList[t].priority=n.priority,a.todoList[t].description=n.description}else for(let t=0;t<r.length;t++)for(let a=0;a<r[t].todoList.length;a++)r[t].todoList[a].id==e&&(r[t].todoList[a].title=n.title,r[t].todoList[a].dueDate=pt(n.dueDate),r[t].todoList[a].priority=n.priority,r[t].todoList[a].description=n.description)},toggleTask:(e,n)=>{const r=t(n);if(r){const t=r.todoList.findIndex((t=>t.id==e));r.todoList[t].complete=!r.todoList[t].complete}else for(let t=0;t<n.length;t++)for(let r=0;r<n[t].todoList.length;r++)n[t].todoList[r].id==e&&(n[t].todoList[r].complete=!n[t].todoList[r].complete)},deleteTask:(e,n)=>{const r=t(n);if(r){const t=r.todoList.findIndex((t=>t.id==e));r.todoList.splice(t,1)}else for(let t=0;t<n.length;t++)for(let r=0;r<n[t].todoList.length;r++)n[t].todoList[r].id==e&&n[t].todoList.splice(r,1)}}})(),Tt=(()=>{const t=document.querySelector("#close-button"),e=document.getElementById("new-project"),n=document.getElementById("new-task"),r=document.getElementById("edit-project");return{modalClose:()=>{t.addEventListener("click",(function(){at.toggle()}))},newProject:()=>{e.addEventListener("click",(()=>{at.projectHTML(void 0),(()=>{const t=document.getElementById("modal-form");t.addEventListener("submit",(e=>{e.preventDefault(),bt.addNewProject(t["project-title"].value,t["project-description"].value,yt),ot.clearProjects(),ot.renderProjects(yt),kt.projectNames(),bt.save(yt),at.toggle()}))})(),at.toggle()}))},newTask:()=>{n.addEventListener("click",(()=>{at.taskHTML(),(()=>{const t=document.getElementById("modal-form");t.addEventListener("submit",(e=>{e.preventDefault();const n={title:t.title.value,dueDate:t.date.value,priority:t.radios.value,description:t.description.value};bt.addNewTask(n.title,n.description,n.priority,n.dueDate,yt);const r=bt.getActiveProj(yt);it.clear(),r?it.render(r.todoList):it.renderAll(yt),kt.editTaskBtns(),kt.expandedTodo(),kt.todoCheckBoxes(),bt.save(yt),at.toggle()}))})(),at.toggle()}))},allBtn:t=>{document.getElementById("all-projects").addEventListener("click",(e=>{bt.allToInactive(t),it.clear(),it.renderAll(t),st({name:"All",description:"Viewing all projects"}),ot.setBackground(e.target.dataset.id),kt.editTaskBtns(),kt.expandedTodo(),kt.todoCheckBoxes()}))},editProject:()=>{r.addEventListener("click",(()=>{const t=bt.getActiveProj(yt);at.projectHTML(t),(()=>{const t=document.getElementById("modal-form");t.addEventListener("submit",(e=>{e.preventDefault();let n={id:e.target.dataset.id,name:t["project-title"].value,description:t["project-description"].value};bt.editProject(n,yt);const r=bt.getActiveProj(yt);st(r),ot.updateProjectNames(n.id,r),bt.save(yt),at.toggle()}))})(),at.toggle()}))},editTaskSubmit:()=>{const t=document.getElementById("modal-form");t.addEventListener("submit",(e=>{e.preventDefault();const n={id:e.target.dataset.id,title:t.title.value,dueDate:t.date.value,priority:t.radios.value,description:t.description.value};bt.editTask(n.id,n,yt);const r=bt.getActiveProj(yt);it.clear(),r?it.render(r.todoList):it.renderAll(yt),kt.editTaskBtns(),kt.expandedTodo(),kt.todoCheckBoxes(),bt.save(yt),at.toggle()}))},deleteTaskBtn:()=>{document.getElementById("delete-button").addEventListener("click",(t=>{const e=t.target.parentElement.parentElement.dataset.id;bt.deleteTask(e,yt);const n=bt.getActiveProj(yt);it.clear(),n?it.render(n.todoList):it.renderAll(yt),kt.editTaskBtns(),kt.expandedTodo(),kt.todoCheckBoxes(),bt.save(yt),at.toggle()}))}}})(),kt={todoCheckBoxes:()=>{Array.from(document.getElementsByClassName("todo-completed")).forEach((t=>{t.addEventListener("click",(t=>{t.target.parentElement.classList.toggle("completed");const e=t.target.parentElement.parentElement.dataset.id;bt.toggleTask(e,yt),bt.save(yt)}))}))},expandedTodo:()=>{Array.from(document.getElementsByClassName("accordian")).forEach((t=>{t.addEventListener("click",(e=>{"todo-completed"!=e.target.className&&t.nextElementSibling.classList.toggle("inactive")}))}))},editTaskBtns:()=>{Array.from(document.getElementsByClassName("task-edit")).forEach((t=>{t.addEventListener("click",(()=>{let e=bt.getTask(t.getAttribute("data-id"),yt);at.taskHTML(e),Tt.deleteTaskBtn(),Tt.editTaskSubmit(),at.toggle()}))}))},projectNames:()=>{Array.from(document.getElementsByClassName("project-name")).forEach((t=>{t.addEventListener("click",(t=>{const e=t.target.dataset.id;bt.setToActive(e,yt);const n=bt.getActiveProj(yt);st(n),it.clear(),it.render(n.todoList),ot.setBackground(e),kt.editTaskBtns(),kt.expandedTodo(),kt.todoCheckBoxes()}))}))}};Tt.modalClose(),Tt.newProject(),Tt.newTask(),Tt.editProject(),localStorage.length?(Tt.allBtn(yt),console.log("index.js:24 allProjects = ",yt),ot.renderProjects(yt),kt.projectNames(),it.clear(),it.renderAll(yt),kt.editTaskBtns(),kt.expandedTodo(),kt.todoCheckBoxes()):console.log("no data found")})();