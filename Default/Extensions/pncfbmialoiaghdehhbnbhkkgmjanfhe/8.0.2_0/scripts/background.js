(() => {
  'use strict';
  var __webpack_exports__ = {};

  var SECONDS_A_MINUTE = 60;
  var SECONDS_A_HOUR = SECONDS_A_MINUTE * 60;
  var SECONDS_A_DAY = SECONDS_A_HOUR * 24;
  var SECONDS_A_WEEK = SECONDS_A_DAY * 7;
  var MILLISECONDS_A_SECOND = 1e3;
  var MILLISECONDS_A_MINUTE = SECONDS_A_MINUTE * MILLISECONDS_A_SECOND;
  var MILLISECONDS_A_HOUR = SECONDS_A_HOUR * MILLISECONDS_A_SECOND;
  var MILLISECONDS_A_DAY = SECONDS_A_DAY * MILLISECONDS_A_SECOND;
  var MILLISECONDS_A_WEEK = SECONDS_A_WEEK * MILLISECONDS_A_SECOND;

  var MS = 'millisecond';
  var S = 'second';
  var MIN = 'minute';
  var H = 'hour';
  var D = 'day';
  var W = 'week';
  var M = 'month';
  var Q = 'quarter';
  var Y = 'year';
  var DATE = 'date';
  var FORMAT_DEFAULT = 'YYYY-MM-DDTHH:mm:ssZ';
  var INVALID_DATE_STRING = 'Invalid Date';

  var REGEX_PARSE =
    /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/;
  var REGEX_FORMAT =
    /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;
  const en = {
    name: 'en',
    weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    months:
      'January_February_March_April_May_June_July_August_September_October_November_December'.split(
        '_',
      ),
  };
  var padStart = function padStart(string, length, pad) {
    var s = String(string);
    if (!s || s.length >= length) return string;
    return '' + Array(length + 1 - s.length).join(pad) + string;
  };

  var padZoneStr = function padZoneStr(instance) {
    var negMinutes = -instance.utcOffset();
    var minutes = Math.abs(negMinutes);
    var hourOffset = Math.floor(minutes / 60);
    var minuteOffset = minutes % 60;
    return (
      '' +
      (negMinutes <= 0 ? '+' : '-') +
      padStart(hourOffset, 2, '0') +
      ':' +
      padStart(minuteOffset, 2, '0')
    );
  };

  var monthDiff = function monthDiff(a, b) {
    if (a.date() < b.date()) return -monthDiff(b, a);
    var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month());
    var anchor = a.clone().add(wholeMonthDiff, M);
    var c = b - anchor < 0;
    var anchor2 = a.clone().add(wholeMonthDiff + (c ? -1 : 1), M);
    return +(-(wholeMonthDiff + (b - anchor) / (c ? anchor - anchor2 : anchor2 - anchor)) || 0);
  };

  var absFloor = function absFloor(n) {
    return n < 0 ? Math.ceil(n) || 0 : Math.floor(n);
  };

  var prettyUnit = function prettyUnit(u) {
    var special = {
      M: M,
      y: Y,
      w: W,
      d: D,
      D: DATE,
      h: H,
      m: MIN,
      s: S,
      ms: MS,
      Q: Q,
    };
    return (
      special[u] ||
      String(u || '')
        .toLowerCase()
        .replace(/s$/, '')
    );
  };

  var isUndefined = function isUndefined(s) {
    return s === undefined;
  };

  const utils = {
    s: padStart,
    z: padZoneStr,
    m: monthDiff,
    a: absFloor,
    p: prettyUnit,
    u: isUndefined,
  };
  var L = 'en';

  var Ls = {};

  Ls[L] = en;

  var isDayjs = function isDayjs(d) {
    return d instanceof Dayjs;
  };

  var parseLocale = function parseLocale(preset, object, isLocal) {
    var l;
    if (!preset) return L;

    if (typeof preset === 'string') {
      var presetLower = preset.toLowerCase();

      if (Ls[presetLower]) {
        l = presetLower;
      }

      if (object) {
        Ls[presetLower] = object;
        l = presetLower;
      }

      var presetSplit = preset.split('-');

      if (!l && presetSplit.length > 1) {
        return parseLocale(presetSplit[0]);
      }
    } else {
      var name = preset.name;
      Ls[name] = preset;
      l = name;
    }

    if (!isLocal && l) L = l;
    return l || (!isLocal && L);
  };

  var dayjs = function dayjs(date, c) {
    if (isDayjs(date)) {
      return date.clone();
    }

    var cfg = typeof c === 'object' ? c : {};
    cfg.date = date;
    cfg.args = arguments;

    return new Dayjs(cfg);
  };

  var wrapper = function wrapper(date, instance) {
    return dayjs(date, {
      locale: instance.$L,
      utc: instance.$u,
      x: instance.$x,
      $offset: instance.$offset,
    });
  };

  var Utils = utils;

  Utils.l = parseLocale;
  Utils.i = isDayjs;
  Utils.w = wrapper;

  var parseDate = function parseDate(cfg) {
    var date = cfg.date,
      utc = cfg.utc;
    if (date === null) return new Date(NaN);

    if (Utils.u(date)) return new Date();

    if (date instanceof Date) return new Date(date);

    if (typeof date === 'string' && !/Z$/i.test(date)) {
      var d = date.match(REGEX_PARSE);

      if (d) {
        var m = d[2] - 1 || 0;
        var ms = (d[7] || '0').substring(0, 3);

        if (utc) {
          return new Date(Date.UTC(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms));
        }

        return new Date(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms);
      }
    }

    return new Date(date);
  };

  var Dayjs = (function () {
    function Dayjs(cfg) {
      this.$L = parseLocale(cfg.locale, null, true);
      this.parse(cfg);
    }

    var _proto = Dayjs.prototype;

    _proto.parse = function parse(cfg) {
      this.$d = parseDate(cfg);
      this.$x = cfg.x || {};
      this.init();
    };

    _proto.init = function init() {
      var $d = this.$d;
      this.$y = $d.getFullYear();
      this.$M = $d.getMonth();
      this.$D = $d.getDate();
      this.$W = $d.getDay();
      this.$H = $d.getHours();
      this.$m = $d.getMinutes();
      this.$s = $d.getSeconds();
      this.$ms = $d.getMilliseconds();
    };

    _proto.$utils = function $utils() {
      return Utils;
    };

    _proto.isValid = function isValid() {
      return !(this.$d.toString() === INVALID_DATE_STRING);
    };

    _proto.isSame = function isSame(that, units) {
      var other = dayjs(that);
      return this.startOf(units) <= other && other <= this.endOf(units);
    };

    _proto.isAfter = function isAfter(that, units) {
      return dayjs(that) < this.startOf(units);
    };

    _proto.isBefore = function isBefore(that, units) {
      return this.endOf(units) < dayjs(that);
    };

    _proto.$g = function $g(input, get, set) {
      if (Utils.u(input)) return this[get];
      return this.set(set, input);
    };

    _proto.unix = function unix() {
      return Math.floor(this.valueOf() / 1000);
    };

    _proto.valueOf = function valueOf() {
      return this.$d.getTime();
    };

    _proto.startOf = function startOf(units, _startOf) {
      var _this = this;

      var isStartOf = !Utils.u(_startOf) ? _startOf : true;
      var unit = Utils.p(units);

      var instanceFactory = function instanceFactory(d, m) {
        var ins = Utils.w(_this.$u ? Date.UTC(_this.$y, m, d) : new Date(_this.$y, m, d), _this);
        return isStartOf ? ins : ins.endOf(D);
      };

      var instanceFactorySet = function instanceFactorySet(method, slice) {
        var argumentStart = [0, 0, 0, 0];
        var argumentEnd = [23, 59, 59, 999];
        return Utils.w(
          _this
            .toDate()
            [method].apply(
              _this.toDate('s'),
              (isStartOf ? argumentStart : argumentEnd).slice(slice),
            ),
          _this,
        );
      };

      var $W = this.$W,
        $M = this.$M,
        $D = this.$D;
      var utcPad = 'set' + (this.$u ? 'UTC' : '');

      switch (unit) {
        case Y:
          return isStartOf ? instanceFactory(1, 0) : instanceFactory(31, 11);

        case M:
          return isStartOf ? instanceFactory(1, $M) : instanceFactory(0, $M + 1);

        case W: {
          var weekStart = this.$locale().weekStart || 0;
          var gap = ($W < weekStart ? $W + 7 : $W) - weekStart;
          return instanceFactory(isStartOf ? $D - gap : $D + (6 - gap), $M);
        }

        case D:
        case DATE:
          return instanceFactorySet(utcPad + 'Hours', 0);

        case H:
          return instanceFactorySet(utcPad + 'Minutes', 1);

        case MIN:
          return instanceFactorySet(utcPad + 'Seconds', 2);

        case S:
          return instanceFactorySet(utcPad + 'Milliseconds', 3);

        default:
          return this.clone();
      }
    };

    _proto.endOf = function endOf(arg) {
      return this.startOf(arg, false);
    };

    _proto.$set = function $set(units, _int) {
      var _C$D$C$DATE$C$M$C$Y$C;

      var unit = Utils.p(units);
      var utcPad = 'set' + (this.$u ? 'UTC' : '');
      var name = ((_C$D$C$DATE$C$M$C$Y$C = {}),
      (_C$D$C$DATE$C$M$C$Y$C[D] = utcPad + 'Date'),
      (_C$D$C$DATE$C$M$C$Y$C[DATE] = utcPad + 'Date'),
      (_C$D$C$DATE$C$M$C$Y$C[M] = utcPad + 'Month'),
      (_C$D$C$DATE$C$M$C$Y$C[Y] = utcPad + 'FullYear'),
      (_C$D$C$DATE$C$M$C$Y$C[H] = utcPad + 'Hours'),
      (_C$D$C$DATE$C$M$C$Y$C[MIN] = utcPad + 'Minutes'),
      (_C$D$C$DATE$C$M$C$Y$C[S] = utcPad + 'Seconds'),
      (_C$D$C$DATE$C$M$C$Y$C[MS] = utcPad + 'Milliseconds'),
      _C$D$C$DATE$C$M$C$Y$C)[unit];
      var arg = unit === D ? this.$D + (_int - this.$W) : _int;

      if (unit === M || unit === Y) {
        var date = this.clone().set(DATE, 1);
        date.$d[name](arg);
        date.init();
        this.$d = date.set(DATE, Math.min(this.$D, date.daysInMonth())).$d;
      } else if (name) this.$d[name](arg);

      this.init();
      return this;
    };

    _proto.set = function set(string, _int2) {
      return this.clone().$set(string, _int2);
    };

    _proto.get = function get(unit) {
      return this[Utils.p(unit)]();
    };

    _proto.add = function add(number, units) {
      var _this2 = this,
        _C$MIN$C$H$C$S$unit;

      number = Number(number);

      var unit = Utils.p(units);

      var instanceFactorySet = function instanceFactorySet(n) {
        var d = dayjs(_this2);
        return Utils.w(d.date(d.date() + Math.round(n * number)), _this2);
      };

      if (unit === M) {
        return this.set(M, this.$M + number);
      }

      if (unit === Y) {
        return this.set(Y, this.$y + number);
      }

      if (unit === D) {
        return instanceFactorySet(1);
      }

      if (unit === W) {
        return instanceFactorySet(7);
      }

      var step =
        ((_C$MIN$C$H$C$S$unit = {}),
        (_C$MIN$C$H$C$S$unit[MIN] = MILLISECONDS_A_MINUTE),
        (_C$MIN$C$H$C$S$unit[H] = MILLISECONDS_A_HOUR),
        (_C$MIN$C$H$C$S$unit[S] = MILLISECONDS_A_SECOND),
        _C$MIN$C$H$C$S$unit)[unit] || 1;

      var nextTimeStamp = this.$d.getTime() + number * step;
      return Utils.w(nextTimeStamp, this);
    };

    _proto.subtract = function subtract(number, string) {
      return this.add(number * -1, string);
    };

    _proto.format = function format(formatStr) {
      var _this3 = this;

      var locale = this.$locale();
      if (!this.isValid()) return locale.invalidDate || INVALID_DATE_STRING;
      var str = formatStr || FORMAT_DEFAULT;
      var zoneStr = Utils.z(this);
      var $H = this.$H,
        $m = this.$m,
        $M = this.$M;
      var weekdays = locale.weekdays,
        months = locale.months,
        meridiem = locale.meridiem;

      var getShort = function getShort(arr, index, full, length) {
        return (arr && (arr[index] || arr(_this3, str))) || full[index].slice(0, length);
      };

      var get$H = function get$H(num) {
        return Utils.s($H % 12 || 12, num, '0');
      };

      var meridiemFunc =
        meridiem ||
        function (hour, minute, isLowercase) {
          var m = hour < 12 ? 'AM' : 'PM';
          return isLowercase ? m.toLowerCase() : m;
        };

      var matches = {
        YY: String(this.$y).slice(-2),
        YYYY: this.$y,
        M: $M + 1,
        MM: Utils.s($M + 1, 2, '0'),
        MMM: getShort(locale.monthsShort, $M, months, 3),
        MMMM: getShort(months, $M),
        D: this.$D,
        DD: Utils.s(this.$D, 2, '0'),
        d: String(this.$W),
        dd: getShort(locale.weekdaysMin, this.$W, weekdays, 2),
        ddd: getShort(locale.weekdaysShort, this.$W, weekdays, 3),
        dddd: weekdays[this.$W],
        H: String($H),
        HH: Utils.s($H, 2, '0'),
        h: get$H(1),
        hh: get$H(2),
        a: meridiemFunc($H, $m, true),
        A: meridiemFunc($H, $m, false),
        m: String($m),
        mm: Utils.s($m, 2, '0'),
        s: String(this.$s),
        ss: Utils.s(this.$s, 2, '0'),
        SSS: Utils.s(this.$ms, 3, '0'),
        Z: zoneStr,
      };
      return str.replace(REGEX_FORMAT, function (match, $1) {
        return $1 || matches[match] || zoneStr.replace(':', '');
      });
    };

    _proto.utcOffset = function utcOffset() {
      return -Math.round(this.$d.getTimezoneOffset() / 15) * 15;
    };

    _proto.diff = function diff(input, units, _float) {
      var _C$Y$C$M$C$Q$C$W$C$D$;

      var unit = Utils.p(units);
      var that = dayjs(input);
      var zoneDelta = (that.utcOffset() - this.utcOffset()) * MILLISECONDS_A_MINUTE;
      var diff = this - that;
      var result = Utils.m(this, that);
      result =
        ((_C$Y$C$M$C$Q$C$W$C$D$ = {}),
        (_C$Y$C$M$C$Q$C$W$C$D$[Y] = result / 12),
        (_C$Y$C$M$C$Q$C$W$C$D$[M] = result),
        (_C$Y$C$M$C$Q$C$W$C$D$[Q] = result / 3),
        (_C$Y$C$M$C$Q$C$W$C$D$[W] = (diff - zoneDelta) / MILLISECONDS_A_WEEK),
        (_C$Y$C$M$C$Q$C$W$C$D$[D] = (diff - zoneDelta) / MILLISECONDS_A_DAY),
        (_C$Y$C$M$C$Q$C$W$C$D$[H] = diff / MILLISECONDS_A_HOUR),
        (_C$Y$C$M$C$Q$C$W$C$D$[MIN] = diff / MILLISECONDS_A_MINUTE),
        (_C$Y$C$M$C$Q$C$W$C$D$[S] = diff / MILLISECONDS_A_SECOND),
        _C$Y$C$M$C$Q$C$W$C$D$)[unit] || diff;

      return _float ? result : Utils.a(result);
    };

    _proto.daysInMonth = function daysInMonth() {
      return this.endOf(M).$D;
    };

    _proto.$locale = function $locale() {
      return Ls[this.$L];
    };

    _proto.locale = function locale(preset, object) {
      if (!preset) return this.$L;
      var that = this.clone();
      var nextLocaleName = parseLocale(preset, object, true);
      if (nextLocaleName) that.$L = nextLocaleName;
      return that;
    };

    _proto.clone = function clone() {
      return Utils.w(this.$d, this);
    };

    _proto.toDate = function toDate() {
      return new Date(this.valueOf());
    };

    _proto.toJSON = function toJSON() {
      return this.isValid() ? this.toISOString() : null;
    };

    _proto.toISOString = function toISOString() {
      return this.$d.toISOString();
    };

    _proto.toString = function toString() {
      return this.$d.toUTCString();
    };

    return Dayjs;
  })();

  var proto = Dayjs.prototype;
  dayjs.prototype = proto;
  [
    ['$ms', MS],
    ['$s', S],
    ['$m', MIN],
    ['$H', H],
    ['$W', D],
    ['$M', M],
    ['$y', Y],
    ['$D', DATE],
  ].forEach(function (g) {
    proto[g[1]] = function (input) {
      return this.$g(input, g[0], g[1]);
    };
  });

  dayjs.extend = function (plugin, option) {
    if (!plugin.$i) {
      plugin(option, Dayjs, dayjs);
      plugin.$i = true;
    }

    return dayjs;
  };

  dayjs.locale = parseLocale;
  dayjs.isDayjs = isDayjs;

  dayjs.unix = function (timestamp) {
    return dayjs(timestamp * 1e3);
  };

  dayjs.en = Ls[L];
  dayjs.Ls = Ls;
  dayjs.p = {};
  const esm = dayjs;
  function promisify(f) {
    if (!f) {
      return void 0;
    }
    return (...a) =>
      new Promise((resolve, reject) => {
        f(...a, r => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else {
            resolve(r);
          }
        });
      });
  }
  var browser_browser;
  (browser2 => {
    browser2.alarms = chrome.alarms;
    browser2.i18n = chrome.i18n;
    browser2.permissions = chrome.permissions;
    browser2.scripting = chrome.scripting;
    browser2.storage = chrome.storage;
    browser2.runtime = chrome.runtime;
    browser2.tabs = chrome.tabs;
    let identity;
    (identity2 => {
      var _a, _b;
      identity2.getRedirectURL =
        (_a = chrome.identity) == null ? void 0 : _a.getRedirectURL.bind(chrome.identity);
      identity2.launchWebAuthFlow = promisify(
        (_b = chrome.identity) == null ? void 0 : _b.launchWebAuthFlow.bind(chrome.identity),
      );
    })((identity = browser2.identity || (browser2.identity = {})));
  })(browser_browser || (browser_browser = {}));

  function translate(messageName, ...substitutions) {
    return browser_browser.i18n.getMessage(messageName, substitutions);
  }
  function getWebsiteURL(path) {
    const locale = translate('websiteLocale');
    return `https://iorate.github.io/ublacklist${locale === 'en' ? '' : `/${locale}`}${
      path.startsWith('/') ? '' : '/'
    }${path}`;
  }

  var REGEX_VALID_OFFSET_FORMAT = /[+-]\d\d(?::?\d\d)?/g;
  var REGEX_OFFSET_HOURS_MINUTES_FORMAT = /([+-]|\d\d)/g;

  function offsetFromString(value) {
    if (value === void 0) {
      value = '';
    }

    var offset = value.match(REGEX_VALID_OFFSET_FORMAT);

    if (!offset) {
      return null;
    }

    var _ref = ('' + offset[0]).match(REGEX_OFFSET_HOURS_MINUTES_FORMAT) || ['-', 0, 0],
      indicator = _ref[0],
      hoursOffset = _ref[1],
      minutesOffset = _ref[2];

    var totalOffsetInMinutes = +hoursOffset * 60 + +minutesOffset;

    if (totalOffsetInMinutes === 0) {
      return 0;
    }

    return indicator === '+' ? totalOffsetInMinutes : -totalOffsetInMinutes;
  }

  const utc = function (option, Dayjs, dayjs) {
    var proto = Dayjs.prototype;

    dayjs.utc = function (date) {
      var cfg = {
        date: date,
        utc: true,
        args: arguments,
      };

      return new Dayjs(cfg);
    };

    proto.utc = function (keepLocalTime) {
      var ins = dayjs(this.toDate(), {
        locale: this.$L,
        utc: true,
      });

      if (keepLocalTime) {
        return ins.add(this.utcOffset(), MIN);
      }

      return ins;
    };

    proto.local = function () {
      return dayjs(this.toDate(), {
        locale: this.$L,
        utc: false,
      });
    };

    var oldParse = proto.parse;

    proto.parse = function (cfg) {
      if (cfg.utc) {
        this.$u = true;
      }

      if (!this.$utils().u(cfg.$offset)) {
        this.$offset = cfg.$offset;
      }

      oldParse.call(this, cfg);
    };

    var oldInit = proto.init;

    proto.init = function () {
      if (this.$u) {
        var $d = this.$d;
        this.$y = $d.getUTCFullYear();
        this.$M = $d.getUTCMonth();
        this.$D = $d.getUTCDate();
        this.$W = $d.getUTCDay();
        this.$H = $d.getUTCHours();
        this.$m = $d.getUTCMinutes();
        this.$s = $d.getUTCSeconds();
        this.$ms = $d.getUTCMilliseconds();
      } else {
        oldInit.call(this);
      }
    };

    var oldUtcOffset = proto.utcOffset;

    proto.utcOffset = function (input, keepLocalTime) {
      var _this$$utils = this.$utils(),
        u = _this$$utils.u;

      if (u(input)) {
        if (this.$u) {
          return 0;
        }

        if (!u(this.$offset)) {
          return this.$offset;
        }

        return oldUtcOffset.call(this);
      }

      if (typeof input === 'string') {
        input = offsetFromString(input);

        if (input === null) {
          return this;
        }
      }

      var offset = Math.abs(input) <= 16 ? input * 60 : input;
      var ins = this;

      if (keepLocalTime) {
        ins.$offset = offset;
        ins.$u = input === 0;
        return ins;
      }

      if (input !== 0) {
        var localTimezoneOffset = this.$u
          ? this.toDate().getTimezoneOffset()
          : -1 * this.utcOffset();
        ins = this.local().add(offset + localTimezoneOffset, MIN);
        ins.$offset = offset;
        ins.$x.$localOffset = localTimezoneOffset;
      } else {
        ins = this.utc();
      }

      return ins;
    };

    var oldFormat = proto.format;
    var UTC_FORMAT_DEFAULT = 'YYYY-MM-DDTHH:mm:ss[Z]';

    proto.format = function (formatStr) {
      var str = formatStr || (this.$u ? UTC_FORMAT_DEFAULT : '');
      return oldFormat.call(this, str);
    };

    proto.valueOf = function () {
      var addedOffset = !this.$utils().u(this.$offset)
        ? this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset())
        : 0;
      return this.$d.valueOf() - addedOffset * MILLISECONDS_A_MINUTE;
    };

    proto.isUTC = function () {
      return !!this.$u;
    };

    proto.toISOString = function () {
      return this.toDate().toISOString();
    };

    proto.toString = function () {
      return this.toDate().toUTCString();
    };

    var oldToDate = proto.toDate;

    proto.toDate = function (type) {
      if (type === 's' && this.$offset) {
        return dayjs(this.format('YYYY-MM-DD HH:mm:ss:SSS')).toDate();
      }

      return oldToDate.call(this);
    };

    var oldDiff = proto.diff;

    proto.diff = function (input, units, _float) {
      if (input && this.$u === input.$u) {
        return oldDiff.call(this, input, units, _float);
      }

      var localThis = this.local();
      var localInput = dayjs(input).local();
      return oldDiff.call(localThis, localInput, units, _float);
    };
  };
  var r = r => t => (typeof t)[0] == r,
    t = r => Array.isArray(r),
    e = r => Object.keys(r),
    a = r => r => 1,
    o = r => e => t(e) && e.every(t => r(t)),
    u = t => r('b'),
    y = r => t => r.includes(t),
    b = r => r => Number.isInteger(r),
    c = r => t => r.every(r => r(t)),
    n = r => t => t === r,
    p = r => r => 0,
    f = r => t => null === t || r(t),
    l = t => r('n'),
    s = t => a => r('o')(a) && a && e(t).every(r => t[r](a[r])),
    v = t => e => r('u')(e) || t(e),
    N = (t, a) => o => r('o')(o) && o && e(o).every(r => t(r) && a(o[r])),
    O = t => r('s'),
    h = r => e => t(e) && e.length == r.length && e.every((t, e) => r[e](t)),
    i = r => t => r.some(r => r(t)),
    j = r => r => 1,
    m = r => r,
    x = (r, t) => !!t(r),
    A = (r, t) => {
      try {
        var e = JSON.parse(r);
        if (t(e)) return e;
      } catch (r) {}
    };

  class utilities_AltURL {
    constructor(url) {
      const u = new URL(url);
      this.scheme = u.protocol.slice(0, -1);
      this.host = u.hostname;
      this.path = `${u.pathname}${u.search}`;
    }
    toString() {
      return `${this.scheme}://${this.host}${this.path}`;
    }
  }
  function makeAltURL(url) {
    try {
      return new utilities_AltURL(url);
    } catch {
      return null;
    }
  }
  class HTTPError extends Error {
    constructor(status, statusText) {
      super(`${status}${statusText ? ' ' : ''}${statusText}`);
      this.status = status;
      this.statusText = statusText;
      this.name = 'HTTPError';
    }
  }
  class UnexpectedResponse extends Error {
    constructor(response) {
      super(JSON.stringify(response));
      this.response = response;
      this.name = 'UnexpectedResponse';
    }
  }

  class utilities_MatchPattern {
    constructor(mp) {
      const parsed = parseMatchPattern(mp);
      if (!parsed) {
        throw new Error('Invalid match pattern');
      }
      const { scheme, host, path } = parsed;
      if (scheme === '*') {
        this.schemePattern = { type: 'any' };
      } else {
        this.schemePattern = { type: 'exact', exact: scheme };
      }
      if (host === '*') {
        this.hostPattern = { type: 'any' };
      } else if (host.startsWith('*.')) {
        this.hostPattern = { type: 'domain', domain: host.slice(2) };
      } else {
        this.hostPattern = { type: 'exact', exact: host };
      }
      if (path === '/*') {
        this.pathPattern = { type: 'any' };
      } else {
        const wildcardIndex = path.indexOf('*');
        if (wildcardIndex === path.length - 1) {
          this.pathPattern = { type: 'prefix', prefix: path.slice(0, -1) };
        } else if (wildcardIndex === -1) {
          this.pathPattern = { type: 'exact', exact: path };
        } else {
          this.pathPattern = {
            type: 'regExp',
            regExp: new RegExp(
              `^${path.replace(/[$^\\.+?()[\]{}|]/g, '\\$&').replace(/\*/g, '.*?')}$`,
            ),
          };
        }
      }
    }
    test(url) {
      if (this.hostPattern.type === 'domain') {
        if (
          url.host !== this.hostPattern.domain &&
          !url.host.endsWith(`.${this.hostPattern.domain}`)
        ) {
          return false;
        }
      } else if (this.hostPattern.type === 'exact') {
        if (url.host !== this.hostPattern.exact) {
          return false;
        }
      }
      if (this.schemePattern.type === 'any') {
        if (url.scheme !== 'http' && url.scheme !== 'https') {
          return false;
        }
      } else {
        if (url.scheme !== this.schemePattern.exact) {
          return false;
        }
      }
      if (this.pathPattern.type === 'prefix') {
        if (!url.path.startsWith(this.pathPattern.prefix)) {
          return false;
        }
      } else if (this.pathPattern.type === 'exact') {
        if (url.path !== this.pathPattern.exact) {
          return false;
        }
      } else if (this.pathPattern.type === 'regExp') {
        if (!this.pathPattern.regExp.test(url.path)) {
          return false;
        }
      }
      return true;
    }
  }
  class Mutex {
    constructor() {
      this.queue = [];
    }
    lock(func) {
      return new Promise((resolve, reject) => {
        this.queue.push(async () => {
          try {
            resolve(await Promise.resolve(func()));
          } catch (e) {
            reject(e);
          }
        });
        if (this.queue.length === 1) {
          void this.dequeue();
        }
      });
    }
    async dequeue() {
      if (!this.queue.length) {
        return;
      }
      await this.queue[0]();
      this.queue.shift();
      void this.dequeue();
    }
  }
  function isErrorResult(result) {
    return result.type === 'error';
  }
  function isSuccessResult(result) {
    return result.type === 'success';
  }
  function errorResult(message) {
    return {
      type: 'error',
      message,
    };
  }
  function successResult() {
    return {
      type: 'success',
      timestamp: esm().toISOString(),
    };
  }
  function stringKeys(record) {
    return Object.keys(record);
  }
  function utilities_stringEntries(record) {
    return Object.entries(record);
  }
  function numberKeys(record) {
    return Object.keys(record).map(Number);
  }
  function numberEntries(record) {
    return Object.entries(record).map(([key, value]) => [Number(key), value]);
  }
  function lines(s) {
    return s ? s.split('\n') : [];
  }
  function unlines(ss) {
    return ss.join('\n');
  }
  const utilities_r = String.raw.bind(String);

  function shouldUseAltFlow() {
    return os => {
      return false;
    };
  }
  const altFlowRedirectURL = getWebsiteURL('/callback');
  async function launchAltFlow(params) {
    const [{ id: openerTabId }] = await browser_browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (openerTabId == null) {
      throw new Error('failed to get the current tab');
    }
    const { id: authorizationTabId } = await browser_browser.tabs.create({
      openerTabId,
      url: params.url,
    });
    if (authorizationTabId == null) {
      throw new Error('failed to open the authorization tab');
    }
    return new Promise((resolve, reject) => {
      const [onUpdated, onRemoved] = [
        (tabId, _changeInfo, tab) => {
          var _a;
          if (
            tabId === authorizationTabId &&
            ((_a = tab.url) == null ? void 0 : _a.startsWith(altFlowRedirectURL))
          ) {
            resolve(tab.url);
            browser_browser.tabs.onUpdated.removeListener(onUpdated);
            browser_browser.tabs.onRemoved.removeListener(onRemoved);
            void browser_browser.tabs
              .update(openerTabId, { active: true })
              .then(() => browser_browser.tabs.remove(tabId));
          }
        },
        tabId => {
          if (tabId === authorizationTabId) {
            reject(new Error('the authorization tab was closed'));
            browser_browser.tabs.onUpdated.removeListener(onUpdated);
            browser_browser.tabs.onRemoved.removeListener(onRemoved);
            void browser_browser.tabs.update(openerTabId, { active: true });
          }
        },
      ];
      browser_browser.tabs.onUpdated.addListener(onUpdated);
      browser_browser.tabs.onRemoved.addListener(onRemoved);
    });
  }
  function authorize(url, params) {
    return async useAltFlow => {
      const authorizationURL = new URL(url);
      authorizationURL.search = new URLSearchParams({
        response_type: 'code',
        redirect_uri: useAltFlow ? altFlowRedirectURL : browser_browser.identity.getRedirectURL(),
        ...params,
      }).toString();
      const redirectURL = await (useAltFlow
        ? launchAltFlow({ url: authorizationURL.toString() })
        : browser_browser.identity.launchWebAuthFlow({
            url: authorizationURL.toString(),
            interactive: true,
          }));
      const redirectParams = {};
      for (const [key, value] of new URL(redirectURL).searchParams.entries()) {
        redirectParams[key] = value;
      }
      if (x(redirectParams, s({ code: O() }))) {
        return { authorizationCode: redirectParams.code };
      } else if (x(redirectParams, s({ error: O() }))) {
        throw new Error(redirectParams.error);
      } else {
        throw new UnexpectedResponse(redirectParams);
      }
    };
  }
  function getAccessToken(url, params) {
    return async (authorizationCode, useAltFlow) => {
      const response = await fetch(url, {
        method: 'POST',
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: authorizationCode,
          redirect_uri: useAltFlow ? altFlowRedirectURL : browser_browser.identity.getRedirectURL(),
          ...params,
        }),
      });
      if (response.ok) {
        const responseBody = await response.json();
        if (
          !x(
            responseBody,
            s({
              access_token: O(),
              expires_in: l(),
              refresh_token: O(),
            }),
          )
        ) {
          throw new UnexpectedResponse(responseBody);
        }
        return {
          accessToken: responseBody.access_token,
          expiresIn: responseBody.expires_in,
          refreshToken: responseBody.refresh_token,
        };
      } else {
        throw new HTTPError(response.status, response.statusText);
      }
    };
  }
  function refreshAccessToken(url, params) {
    return async refreshToken => {
      const response = await fetch(url, {
        method: 'POST',
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
          ...params,
        }),
      });
      if (response.ok) {
        const responseBody = await response.json();
        if (!x(responseBody, s({ access_token: O(), expires_in: l() }))) {
          throw new UnexpectedResponse(responseBody);
        }
        return { accessToken: responseBody.access_token, expiresIn: responseBody.expires_in };
      } else {
        throw new HTTPError(response.status, response.statusText);
      }
    };
  }

  esm.extend(utc);
  const APP_KEY = 'kgkleqa3m2hxwqu';
  const APP_SECRET = 'p5it3m3oxqqcaw8';
  function toISOStringSecond(time) {
    return time.utc().format('YYYY-MM-DDTHH:mm:ss[Z]');
  }
  const dropbox = {
    hostPermissions: [],
    messageNames: {
      sync: 'clouds_dropboxSync',
      syncDescription: 'clouds_dropboxSyncDescription',
      syncTurnedOn: 'clouds_dropboxSyncTurnedOn',
    },
    modifiedTimePrecision: 'second',
    shouldUseAltFlow: shouldUseAltFlow(),
    authorize: authorize('https://www.dropbox.com/oauth2/authorize', {
      client_id: APP_KEY,
      token_access_type: 'offline',
      force_reapprove: 'true',
    }),
    getAccessToken: getAccessToken('https://api.dropboxapi.com/oauth2/token', {
      client_id: APP_KEY,
      client_secret: APP_SECRET,
    }),
    refreshAccessToken: refreshAccessToken('https://api.dropboxapi.com/oauth2/token', {
      client_id: APP_KEY,
      client_secret: APP_SECRET,
    }),
    async createFile(accessToken, filename, content, modifiedTime) {
      const urlBuilder = new URL('https://content.dropboxapi.com/2/files/upload');
      urlBuilder.search = new URLSearchParams({
        authorization: `Bearer ${accessToken}`,
        arg: JSON.stringify({
          path: `/${filename}`,
          mode: 'add',
          autorename: false,
          client_modified: toISOStringSecond(modifiedTime),
          mute: true,
          strict_conflict: false,
        }),
      }).toString();
      const response = await fetch(urlBuilder.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain; charset=dropbox-cors-hack',
        },
        body: content,
      });
      if (response.ok) {
        return;
      } else {
        throw new HTTPError(response.status, response.statusText);
      }
    },
    async findFile(accessToken, filename) {
      const urlBuilder = new URL('https://api.dropboxapi.com/2/files/get_metadata');
      urlBuilder.search = new URLSearchParams({
        authorization: `Bearer ${accessToken}`,
      }).toString();
      const response = await fetch(urlBuilder.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain; charset=dropbox-cors-hack',
        },
        body: JSON.stringify({
          path: `/${filename}`,
          include_media_info: false,
          include_deleted: false,
          include_has_explicit_shared_members: false,
        }),
      });
      if (response.ok) {
        const responseBody = await response.json();
        if (!x(responseBody, s({ id: O(), client_modified: O() }))) {
          throw new UnexpectedResponse(responseBody);
        }
        return { id: responseBody.id, modifiedTime: esm(responseBody.client_modified) };
      } else if (response.status === 409) {
        const responseBody = await response.json();
        if (
          !x(
            responseBody,
            s({
              error: s({
                '.tag': n('path'),
                path: s({ '.tag': O() }),
              }),
            }),
          )
        ) {
          throw new UnexpectedResponse(responseBody);
        }
        if (responseBody.error.path['.tag'] === 'not_found') {
          return null;
        } else {
          throw new Error(responseBody.error['.tag']);
        }
      } else {
        throw new HTTPError(response.status, response.statusText);
      }
    },
    async readFile(accessToken, id) {
      const urlBuilder = new URL('https://content.dropboxapi.com/2/files/download');
      urlBuilder.search = new URLSearchParams({
        authorization: `Bearer ${accessToken}`,
        arg: JSON.stringify({
          path: id,
        }),
      }).toString();
      const response = await fetch(urlBuilder.toString(), {
        method: 'POST',
      });
      if (response.ok) {
        const responseBody = await response.text();
        return { content: responseBody };
      } else {
        throw new HTTPError(response.status, response.statusText);
      }
    },
    async writeFile(accessToken, id, content, modifiedTime) {
      const urlBuilder = new URL('https://content.dropboxapi.com/2/files/upload');
      urlBuilder.search = new URLSearchParams({
        authorization: `Bearer ${accessToken}`,
        arg: JSON.stringify({
          path: id,
          mode: 'overwrite',
          autorename: false,
          client_modified: toISOStringSecond(modifiedTime),
          mute: true,
          strict_conflict: false,
        }),
      }).toString();
      const response = await fetch(urlBuilder.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain; charset=dropbox-cors-hack',
        },
        body: content,
      });
      if (response.ok) {
        return;
      } else {
        throw new HTTPError(response.status, response.statusText);
      }
    },
  };

  const CLIENT_ID = '304167046827-45h8no7j0s38akv999nivvb7i17ckqeh.apps.googleusercontent.com';
  const CLIENT_SECRET = '1QcFpNjHoAf3_XczYwhYicTl';
  const MULTIPART_RELATED_BOUNDARY = '----------uBlacklistMultipartRelatedBoundaryJMPRhmg2VV4JBuua';
  const googleDrive = {
    hostPermissions: [],
    messageNames: {
      sync: 'clouds_googleDriveSync',
      syncDescription: 'clouds_googleDriveSyncDescription',
      syncTurnedOn: 'clouds_googleDriveSyncTurnedOn',
    },
    modifiedTimePrecision: 'millisecond',
    shouldUseAltFlow: shouldUseAltFlow(),
    authorize: authorize('https://accounts.google.com/o/oauth2/v2/auth', {
      client_id: CLIENT_ID,
      scope: 'https://www.googleapis.com/auth/drive.appdata',
      access_type: 'offline',
      prompt: 'consent select_account',
    }),
    getAccessToken: getAccessToken('https://oauth2.googleapis.com/token', {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
    refreshAccessToken: refreshAccessToken('https://oauth2.googleapis.com/token', {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
    async createFile(accessToken, filename, content, modifiedTime) {
      const requestURL = new URL('https://www.googleapis.com/upload/drive/v3/files');
      requestURL.search = new URLSearchParams({
        uploadType: 'multipart',
      }).toString();
      const response = await fetch(requestURL.toString(), {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': `multipart/related; boundary=${MULTIPART_RELATED_BOUNDARY}`,
        },
        body: `--${MULTIPART_RELATED_BOUNDARY}\r
Content-Type: application/json; charset=UTF-8\r
\r
${JSON.stringify({
  modifiedTime: modifiedTime.toISOString(),
  name: filename,
  parents: ['appDataFolder'],
})}\r
--${MULTIPART_RELATED_BOUNDARY}\r
Content-Type: text/plain; charset=UTF-8\r
\r
${content}\r
--${MULTIPART_RELATED_BOUNDARY}--`,
      });
      if (response.ok) {
        return;
      } else {
        throw new HTTPError(response.status, response.statusText);
      }
    },
    async findFile(accessToken, filename) {
      const requestURL = new URL('https://www.googleapis.com/drive/v3/files');
      requestURL.search = new URLSearchParams({
        access_token: accessToken,
        fields: 'files(id, modifiedTime)',
        q: `name = '${filename}'`,
        spaces: 'appDataFolder',
      }).toString();
      const response = await fetch(requestURL.toString());
      if (response.ok) {
        const responseBody = await response.json();
        if (
          !x(
            responseBody,
            s({
              files: o(
                s({
                  id: O(),
                  modifiedTime: O(),
                }),
              ),
            }),
          )
        ) {
          throw new UnexpectedResponse(responseBody);
        }
        if (!responseBody.files.length) {
          return null;
        }
        return {
          id: responseBody.files[0].id,
          modifiedTime: esm(responseBody.files[0].modifiedTime),
        };
      } else {
        throw new HTTPError(response.status, response.statusText);
      }
    },
    async readFile(accessToken, id) {
      const requestURL = new URL(`https://www.googleapis.com/drive/v3/files/${id}`);
      requestURL.search = new URLSearchParams({
        alt: 'media',
      }).toString();
      const response = await fetch(requestURL.toString(), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const responseBody = await response.text();
        return { content: responseBody };
      } else {
        throw new HTTPError(response.status, response.statusText);
      }
    },
    async writeFile(accessToken, id, content, modifiedTime) {
      const requestURL = new URL(`https://www.googleapis.com/upload/drive/v3/files/${id}`);
      requestURL.search = new URLSearchParams({
        access_token: accessToken,
        uploadType: 'multipart',
      }).toString();
      const response = await fetch(requestURL.toString(), {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': `multipart/related; boundary=${MULTIPART_RELATED_BOUNDARY}`,
        },
        body: `--${MULTIPART_RELATED_BOUNDARY}\r
Content-Type: application/json; charset=UTF-8\r
\r
${JSON.stringify({
  modifiedTime: modifiedTime.toISOString(),
})}\r
--${MULTIPART_RELATED_BOUNDARY}\r
Content-Type: text/plain; charset=UTF-8\r
\r
${content}\r
--${MULTIPART_RELATED_BOUNDARY}--`,
      });
      if (response.ok) {
        return;
      } else {
        throw new HTTPError(response.status, response.statusText);
      }
    },
  };

  const supportedClouds = {
    googleDrive: googleDrive,
    dropbox: dropbox,
  };

  function postMessage(type, ...args) {
    void (async () => {
      try {
        await browser_browser.runtime.sendMessage({ type, args });
      } catch (e) {
        if (
          e instanceof Error &&
          e.message === 'Could not establish connection. Receiving end does not exist.'
        ) {
          return;
        } else {
          throw e;
        }
      }
    })();
  }
  async function messages_sendMessage(type, ...args) {
    return await browser.runtime.sendMessage({ type, args });
  }
  function invokeListener(listener, args, sendResponse) {
    const response = listener(...args);
    if (response instanceof Promise) {
      void response.then(sendResponse);
      return true;
    } else {
      sendResponse(response);
    }
  }
  function addMessageListeners(listeners) {
    const listener = (message, _sender, sendResponse) => {
      const { type, args } = message;
      if (listeners[type]) {
        return invokeListener(listeners[type], args, sendResponse);
      }
    };
    browser_browser.runtime.onMessage.addListener(listener);
    return () => {
      browser_browser.runtime.onMessage.removeListener(listener);
    };
  }

  const defaultLocalStorageItems = {
    blacklist: '',
    compiledRules: false,
    skipBlockDialog: false,
    hideBlockLinks: false,
    hideControl: false,
    enablePathDepth: false,
    blockWholeSite: false,
    linkColor: 'default',
    blockColor: 'default',
    highlightColors: ['#ddeeff'],
    dialogTheme: 'default',
    syncCloudId: false,
    syncBlocklist: true,
    syncGeneral: false,
    syncAppearance: false,
    syncSubscriptions: false,
    syncResult: false,
    syncInterval: 15,
    subscriptions: {},
    updateInterval: 120,
  };
  function loadFromLocalStorage(keys) {
    const defaultItemsForKeys = {};
    for (const key of keys) {
      defaultItemsForKeys[key] = defaultLocalStorageItems[key];
    }
    return browser.storage.local.get(defaultItemsForKeys);
  }
  function loadAllFromLocalStorage() {
    return browser.storage.local.get(defaultLocalStorageItems);
  }
  function saveToLocalStorage(items, source) {
    return sendMessage('save-to-local-storage', items, source);
  }

  const timeZero = esm(0).toISOString();
  const defaultRawStorageItems = {
    ...defaultLocalStorageItems,
    timestamp: timeZero,
    generalLastModified: timeZero,
    sync: false,
    syncCloudToken: false,
    appearanceLastModified: timeZero,
    nextSubscriptionId: 0,
    subscriptionsLastModified: timeZero,
  };
  const mutex = new Mutex();
  function loadFromRawStorage(keys) {
    const defaultItemsForKeys = {};
    for (const key of keys) {
      defaultItemsForKeys[key] = defaultRawStorageItems[key];
    }
    return browser_browser.storage.local.get(defaultItemsForKeys);
  }
  function loadAllFromRawStorage() {
    return browser_browser.storage.local.get(defaultRawStorageItems);
  }
  function saveToRawStorage(items) {
    return mutex.lock(() => browser_browser.storage.local.set(items));
  }
  function modifyInRawStorage(keys, callback) {
    return mutex.lock(async () => {
      const oldItems = await loadFromRawStorage(keys);
      const newItems = callback(oldItems);
      await browser_browser.storage.local.set(newItems);
    });
  }
  function modifyAllInRawStorage(callback) {
    return mutex.lock(async () => {
      const oldItems = await loadAllFromRawStorage();
      const newItems = callback(oldItems);
      await browser_browser.storage.local.set(newItems);
    });
  }

  const RE_LINE = (() => {
    const spaceBeforeRuleOrComment = utilities_r`(?<spaceBeforeRuleOrComment>\s+)`;
    const color = utilities_r`(?<color>0|[1-9]\d*)`;
    const highlight = utilities_r`(?<highlight>@${color}?)`;
    const spaceAfterHighlight = utilities_r`(?<spaceAfterHighlight>\s+)`;
    const scheme = utilities_r`(?<scheme>\*|[Hh][Tt][Tt][Pp][Ss]?|[Ff][Tt][Pp])`;
    const label = utilities_r`(?:[0-9A-Za-z](?:[-0-9A-Za-z]*[0-9A-Za-z])?)`;
    const host = utilities_r`(?<host>(?:\*|${label})(?:\.${label})*)`;
    const path = utilities_r`(?<path>/(?:\*|[-0-9A-Za-z._~:/?[\]@!$&'()+,;=]|%[0-9A-Fa-f]{2})*)`;
    const matchPattern = utilities_r`(?<matchPattern>${scheme}://${host}${path})`;
    const prop = utilities_r`(?<prop>u(?:rl)?|t(?:itle)?)`;
    const backslashSequence = utilities_r`(?:\\.)`;
    const class_ = utilities_r`(?:\[(?:[^\]\\]|${backslashSequence})*])`;
    const firstChar = utilities_r`(?:[^*\\/[]|${backslashSequence}|${class_})`;
    const char = utilities_r`(?:[^\\/[]|${backslashSequence}|${class_})`;
    const pattern = utilities_r`(?<pattern>${firstChar}${char}*)`;
    const flags = utilities_r`(?<flags>iu?|ui?)`;
    const regularExpression = utilities_r`(?<regularExpression>${prop}?/${pattern}/${flags}?)`;
    const rule = utilities_r`(?<rule>(${highlight}${spaceAfterHighlight}?)?(?:${matchPattern}|${regularExpression}))`;
    const spaceAfterRule = utilities_r`(?<spaceAfterRule>\s+)`;
    const comment = utilities_r`(?<comment>#.*)`;
    const line = utilities_r`^${spaceBeforeRuleOrComment}?(?:${rule}${spaceAfterRule}?)?${comment}?$`;
    return new RegExp(line);
  })();
  function parseRule(input) {
    var _a;
    const groups = (_a = RE_LINE.exec(input)) == null ? void 0 : _a.groups;
    if (!(groups == null ? void 0 : groups.rule)) {
      return null;
    }
    const value = groups.highlight ? (groups.color ? Number(groups.color) + 1 : 1) : 0;
    return groups.matchPattern
      ? {
          type: 'mp',
          scheme: groups.scheme.toLowerCase(),
          host: groups.host.toLowerCase(),
          path: groups.path,
          value,
        }
      : {
          type: 're',
          prop: groups.prop === 't' || groups.prop === 'title' ? 'title' : 'url',
          pattern: groups.pattern,
          flags: groups.flags || '',
          value,
        };
  }
  function compileMatchPattern(mp, index, scheme, host, path, value) {
    const labels = host.split('.').reverse();
    let current = mp;
    for (const label of labels.slice(0, -1)) {
      if (!label || label === '*') {
        return;
      }
      const next = current[label];
      if (!next) {
        current = current[label] = {};
      } else if (Array.isArray(next)) {
        current = current[label] = { '': next };
      } else {
        current = next;
      }
    }
    {
      const label = labels[labels.length - 1];
      if (!label) {
        return;
      }
      const next = current[label];
      const ispv = scheme === '*' && path === '/*' && !value ? index : [index, scheme, path, value];
      if (!next) {
        current[label] = [ispv];
      } else if (Array.isArray(next)) {
        current[label] = [...next, ispv];
      } else {
        next[''] = [...(next[''] || []), ispv];
      }
    }
  }
  function compileRegularExpression(re, index, prop, pattern, flags, value) {
    try {
      new RegExp(pattern, flags);
    } catch {
      return;
    }
    const ipfv = [index, pattern, flags, value];
    re[prop].push(ipfv);
  }
  function compileRuleset(result, rules) {
    for (const rule of rules) {
      const parsed = parseRule(rule);
      if (!parsed) {
      } else if (parsed.type === 'mp') {
        compileMatchPattern(
          result.mp,
          result.length,
          parsed.scheme,
          parsed.host,
          parsed.path,
          parsed.value,
        );
      } else {
        compileRegularExpression(
          result.re,
          result.length,
          parsed.prop,
          parsed.pattern,
          parsed.flags,
          parsed.value,
        );
      }
      ++result.length;
    }
  }
  function execMatchPatternISPVArray(results, ispvs, scheme, path) {
    ispvs.forEach((ispv, i) => {
      if (ispv == null) {
        return;
      } else if (typeof ispv === 'number') {
        if (scheme === 'http' || scheme === 'https') {
          results.push([ispv, 0, () => (ispvs[i] = null)]);
        }
      } else {
        if (typeof ispv[2] === 'string') {
          ispv[2] = new RegExp(
            `^${ispv[2].replace(/[$^\\.+?()[\]{}|]/g, '\\$&').replace(/\*/g, '.*')}$`,
          );
        }
        if (
          (ispv[1] === '*' ? scheme === 'http' || scheme === 'https' : scheme === ispv[1]) &&
          ispv[2].test(path)
        ) {
          results.push([ispv[0], ispv[3], () => (ispvs[i] = null)]);
        }
      }
    });
  }
  function execMatchPattern(results, mp, scheme, host, path) {
    const labels = host.split('.').reverse();
    let current = mp;
    for (const label of labels.slice(0, -1)) {
      let next = current['*'];
      if (Array.isArray(next)) {
        execMatchPatternISPVArray(results, next, scheme, path);
      }
      next = current[label];
      if (!next || Array.isArray(next)) {
        return;
      } else {
        current = next;
      }
    }
    {
      const label = labels[labels.length - 1];
      let next = current['*'];
      if (Array.isArray(next)) {
        execMatchPatternISPVArray(results, next, scheme, path);
      }
      next = current[label];
      if (!next) {
        return;
      } else if (Array.isArray(next)) {
        execMatchPatternISPVArray(results, next, scheme, path);
      } else {
        current = next;
        next = current[''];
        if (Array.isArray(next)) {
          execMatchPatternISPVArray(results, next, scheme, path);
        }
        next = current['*'];
        if (Array.isArray(next)) {
          execMatchPatternISPVArray(results, next, scheme, path);
        }
      }
    }
  }
  function execRegularExpressionIPFVArray(results, ipfvs, prop) {
    ipfvs.forEach((ipfv, i) => {
      if (ipfv == null) {
        return;
      }
      if (typeof ipfv[1] === 'string') {
        ipfv[1] = new RegExp(ipfv[1], ipfv[2]);
      }
      if (ipfv[1].test(prop)) {
        results.push([ipfv[0], ipfv[3], () => (ipfvs[i] = null)]);
      }
    });
  }
  class Ruleset {
    static compile(rules) {
      const compiledRules = { length: 0, mp: {}, re: { url: [], title: [] } };
      compileRuleset(compiledRules, lines(rules));
      return JSON.stringify(compiledRules);
    }
    constructor(compiled) {
      this.compiled = JSON.parse(compiled);
    }
    add(rules) {
      compileRuleset(this.compiled, lines(rules));
    }
    exec(props) {
      const results = [];
      execMatchPattern(results, this.compiled.mp, props.url.scheme, props.url.host, props.url.path);
      execRegularExpressionIPFVArray(results, this.compiled.re.url, props.url.toString());
      if (props.title != null) {
        execRegularExpressionIPFVArray(results, this.compiled.re.title, props.title);
      }
      return results;
    }
    test(props) {
      return Math.max(-1, ...this.exec(props).map(([, value]) => value));
    }
  }

  const UPDATE_ALL_ALARM_NAME = 'update-all-subscriptions';
  const updating = new Set();
  async function tryLock(id, callback) {
    if (updating.has(id)) {
      return;
    }
    updating.add(id);
    try {
      await callback();
    } finally {
      updating.delete(id);
    }
  }
  function update(id) {
    return tryLock(id, async () => {
      var _a;
      const {
        subscriptions: { [id]: subscription },
      } = await loadFromRawStorage(['subscriptions']);
      if (!subscription || !((_a = subscription.enabled) != null ? _a : true)) {
        return;
      }
      postMessage('subscription-updating', id);
      try {
        const response = await fetch(subscription.url);
        if (response.ok) {
          subscription.blacklist = await response.text();
          subscription.compiledRules = Ruleset.compile(subscription.blacklist);
          subscription.updateResult = successResult();
        } else {
          subscription.updateResult = errorResult(
            new HTTPError(response.status, response.statusText).message,
          );
        }
      } catch (e) {
        subscription.updateResult = errorResult(e instanceof Error ? e.message : 'Unknown error');
      }
      await modifyInRawStorage(['subscriptions'], ({ subscriptions }) => {
        if (!subscriptions[id]) {
          return {};
        }
        return { subscriptions: { ...subscriptions, [id]: subscription } };
      });
      postMessage('subscription-updated', id, subscription);
    });
  }
  async function updateAll() {
    const { subscriptions, updateInterval } = await loadFromRawStorage([
      'subscriptions',
      'updateInterval',
    ]);
    if (!numberKeys(subscriptions).length) {
      await browser_browser.alarms.clear(UPDATE_ALL_ALARM_NAME);
      return;
    }
    browser_browser.alarms.create(UPDATE_ALL_ALARM_NAME, { periodInMinutes: updateInterval });
    await Promise.all(numberKeys(subscriptions).map(update));
  }

  const SYNC_DELAY = 5;
  const SYNC_BLOCKLIST_FILENAME = 'uBlacklist.txt';
  const SYNC_GENERAL_FILENAME = 'general.json';
  const SYNC_APPEARANCE_FILENAME = 'appearance.json';
  const SYNC_SUBSCRIPTIONS_FILENAME = 'subscriptions.json';
  const SYNC_ALARM_NAME = 'sync';
  const sync_mutex = new Mutex();
  let timeoutId = null;
  let dirtyFlags = null;
  const syncSections = [
    {
      beforeSync(items, dirtyFlags2) {
        return { shouldUpload: (items.syncBlocklist && dirtyFlags2.blocklist) || false };
      },
      beforeUpload(localItems) {
        return {
          filename: SYNC_BLOCKLIST_FILENAME,
          content: localItems.blacklist,
          modifiedTime: esm(localItems.timestamp),
        };
      },
      afterDownload(cloudItems, cloudContent, cloudModifiedTime) {
        cloudItems.blacklist = cloudContent;
        cloudItems.compiledRules = Ruleset.compile(cloudItems.blacklist);
        cloudItems.timestamp = cloudModifiedTime.toISOString();
      },
      afterDownloadAll(cloudItems, latestLocalItems) {
        if (
          cloudItems.timestamp != null &&
          esm(cloudItems.timestamp).isBefore(latestLocalItems.timestamp)
        ) {
          delete cloudItems.blacklist;
          delete cloudItems.compiledRules;
          delete cloudItems.timestamp;
        }
      },
      afterSync(cloudItems) {
        if (cloudItems.blacklist != null) {
          postMessage('blocklist-saved', cloudItems.blacklist, 'background');
        }
      },
    },
    {
      beforeSync(items, dirtyFlags2) {
        return { shouldUpload: (items.syncGeneral && dirtyFlags2.general) || false };
      },
      beforeUpload(localItems) {
        return {
          filename: SYNC_GENERAL_FILENAME,
          content: JSON.stringify({
            skipBlockDialog: localItems.skipBlockDialog,
            hideBlockLinks: localItems.hideBlockLinks,
            hideControl: localItems.hideControl,
            enablePathDepth: localItems.enablePathDepth,
            blockWholeSite: localItems.blockWholeSite,
          }),
          modifiedTime: esm(localItems.generalLastModified),
        };
      },
      afterDownload(cloudItems, cloudContent, cloudModifiedTime) {
        const items = A(
          cloudContent,
          s({
            skipBlockDialog: u(),
            hideBlockLinks: u(),
            hideControl: u(),
            enablePathDepth: u(),
            blockWholeSite: v(u()),
          }),
        );
        if (!items) {
          throw new Error(`File corrupted: ${SYNC_GENERAL_FILENAME}`);
        }
        cloudItems.skipBlockDialog = items.skipBlockDialog;
        cloudItems.hideBlockLinks = items.hideBlockLinks;
        cloudItems.hideControl = items.hideControl;
        cloudItems.enablePathDepth = items.enablePathDepth;
        if (items.blockWholeSite != null) {
          cloudItems.blockWholeSite = items.blockWholeSite;
        }
        cloudItems.generalLastModified = cloudModifiedTime.toISOString();
      },
      afterDownloadAll(cloudItems, latestLocalItems) {
        if (
          cloudItems.generalLastModified != null &&
          esm(cloudItems.generalLastModified).isBefore(latestLocalItems.generalLastModified)
        ) {
          delete cloudItems.skipBlockDialog;
          delete cloudItems.hideBlockLinks;
          delete cloudItems.hideControl;
          delete cloudItems.enablePathDepth;
          delete cloudItems.blockWholeSite;
          delete cloudItems.generalLastModified;
        }
      },
    },
    {
      beforeSync(items, dirtyFlags2) {
        return { shouldUpload: (items.syncAppearance && dirtyFlags2.appearance) || false };
      },
      beforeUpload(localItems) {
        return {
          filename: SYNC_APPEARANCE_FILENAME,
          content: JSON.stringify({
            linkColor: localItems.linkColor,
            blockColor: localItems.blockColor,
            highlightColors: localItems.highlightColors,
            dialogTheme: localItems.dialogTheme,
          }),
          modifiedTime: esm(localItems.appearanceLastModified),
        };
      },
      afterDownload(cloudItems, cloudContent, cloudModifiedTime) {
        const items = A(
          cloudContent,
          s({
            linkColor: O(),
            blockColor: O(),
            highlightColors: o(O()),
            dialogTheme: y(['light', 'dark', 'default']),
          }),
        );
        if (!items) {
          throw new Error(`File corrupted: ${SYNC_APPEARANCE_FILENAME}`);
        }
        cloudItems.linkColor = items.linkColor;
        cloudItems.blockColor = items.blockColor;
        cloudItems.highlightColors = items.highlightColors;
        cloudItems.dialogTheme = items.dialogTheme;
        cloudItems.appearanceLastModified = cloudModifiedTime.toISOString();
      },
      afterDownloadAll(cloudItems, latestLocalItems) {
        if (
          cloudItems.appearanceLastModified != null &&
          esm(cloudItems.appearanceLastModified).isBefore(latestLocalItems.appearanceLastModified)
        ) {
          delete cloudItems.linkColor;
          delete cloudItems.blockColor;
          delete cloudItems.highlightColors;
          delete cloudItems.dialogTheme;
          delete cloudItems.appearanceLastModified;
        }
      },
    },
    {
      beforeSync(items, dirtyFlags2) {
        return { shouldUpload: (items.syncSubscriptions && dirtyFlags2.subscriptions) || false };
      },
      beforeUpload(localItems) {
        return {
          filename: SYNC_SUBSCRIPTIONS_FILENAME,
          content: JSON.stringify(
            Object.values(localItems.subscriptions).map(s => {
              var _a;
              return {
                name: s.name,
                url: s.url,
                enabled: (_a = s.enabled) != null ? _a : true,
              };
            }),
          ),
          modifiedTime: esm(localItems.subscriptionsLastModified),
        };
      },
      afterDownload(cloudItems, cloudContent, cloudModifiedTime, localItems) {
        const items = A(cloudContent, o(s({ name: O(), url: O(), enabled: v(u()) })));
        if (!items) {
          throw new Error(`File corrupted: ${SYNC_SUBSCRIPTIONS_FILENAME}`);
        }
        cloudItems.subscriptions = {};
        cloudItems.nextSubscriptionId = localItems.nextSubscriptionId;
        for (const { name, url, enabled } of items) {
          cloudItems.subscriptions[cloudItems.nextSubscriptionId++] = {
            name,
            url,
            blacklist: '',
            updateResult: null,
            enabled: enabled != null ? enabled : true,
          };
        }
        cloudItems.subscriptionsLastModified = cloudModifiedTime.toISOString();
      },
      afterDownloadAll(cloudItems, latestLocalItems) {
        if (
          cloudItems.subscriptionsLastModified != null &&
          esm(cloudItems.subscriptionsLastModified).isBefore(
            latestLocalItems.subscriptionsLastModified,
          )
        ) {
          delete cloudItems.subscriptions;
          delete cloudItems.nextSubscriptionId;
          delete cloudItems.subscriptionsLastModified;
        }
      },
      afterSync(cloudItems) {
        if (cloudItems.subscriptions && numberKeys(cloudItems.subscriptions).length) {
          void updateAll();
        }
      },
    },
  ];
  async function doSync(dirtyFlags2, repeat) {
    return sync_mutex.lock(async () => {
      var _a;
      const localItems = await loadAllFromRawStorage();
      if (!localItems.syncCloudId) {
        if (repeat) {
          await browser_browser.alarms.clear(SYNC_ALARM_NAME);
        }
        return;
      }
      if (repeat) {
        browser_browser.alarms.create(SYNC_ALARM_NAME, {
          periodInMinutes: localItems.syncInterval,
        });
      }
      const cloudItems = {};
      const promises = [];
      for (const section of syncSections) {
        if (section.beforeSync(localItems, dirtyFlags2).shouldUpload) {
          promises.push(
            (async () => {
              const {
                filename,
                content: localContent,
                modifiedTime: localModifiedTime,
              } = section.beforeUpload(localItems);
              const cloudFile = await syncFile(filename, localContent, localModifiedTime);
              if (!cloudFile) {
                return;
              }
              section.afterDownload(
                cloudItems,
                cloudFile.content,
                cloudFile.modifiedTime,
                localItems,
              );
            })(),
          );
        }
      }
      if (!promises.length) {
        return;
      }
      postMessage('syncing');
      let result;
      try {
        await Promise.all(promises);
        await modifyAllInRawStorage(latestLocalItems => {
          for (const section of syncSections) {
            section.afterDownloadAll(cloudItems, latestLocalItems);
          }
          return cloudItems;
        });
        for (const section of syncSections) {
          (_a = section.afterSync) == null ? void 0 : _a.call(section, cloudItems);
        }
        result = successResult();
      } catch (e) {
        result = errorResult(e instanceof Error ? e.message : 'Unknown error');
      }
      await saveToRawStorage({ syncResult: result });
      postMessage('synced', result, Object.keys(cloudItems).length !== 0);
    });
  }
  function sync() {
    return doSync({ blocklist: true, general: true, appearance: true, subscriptions: true }, true);
  }
  function syncDelayed(dirtyFlagsUpdate) {
    dirtyFlags = {
      ...(dirtyFlags || {
        blocklist: false,
        general: false,
        appearance: false,
        subscriptions: false,
      }),
      ...dirtyFlagsUpdate,
    };
    if (timeoutId != null) {
      self.clearTimeout(timeoutId);
    }
    timeoutId = self.setTimeout(() => {
      if (dirtyFlags) {
        void doSync(dirtyFlags, false);
      }
      timeoutId = null;
      dirtyFlags = null;
    }, SYNC_DELAY * 1e3);
  }

  const clouds_mutex = new Mutex();
  async function connect(id, authorizationCode, useAltFlow) {
    const connected = await clouds_mutex.lock(async () => {
      const { syncCloudId: oldId } = await loadFromRawStorage(['syncCloudId']);
      if (oldId) {
        return oldId === id;
      }
      const cloud = supportedClouds[id];
      try {
        const token = await cloud.getAccessToken(authorizationCode, useAltFlow);
        await saveToRawStorage({
          syncCloudId: id,
          syncCloudToken: {
            accessToken: token.accessToken,
            expiresAt: esm().add(token.expiresIn, 'second').toISOString(),
            refreshToken: token.refreshToken,
          },
        });
        return true;
      } catch {
        return false;
      }
    });
    if (connected) {
      void sync();
    }
    return connected;
  }
  function disconnect() {
    return clouds_mutex.lock(async () => {
      const { syncCloudId: id } = await loadFromRawStorage(['syncCloudId']);
      if (!id) {
        return;
      }
      await saveToRawStorage({ syncCloudId: false, syncCloudToken: false });
    });
  }
  function syncFile(filename, content, modifiedTime) {
    return clouds_mutex.lock(async () => {
      const { syncCloudId, syncCloudToken } = await loadFromRawStorage([
        'syncCloudId',
        'syncCloudToken',
      ]);
      if (!syncCloudId) {
        throw new Error('Not connected');
      }
      const cloud = supportedClouds[syncCloudId];
      if (!syncCloudToken) {
        throw new Error(translate('unauthorizedError'));
      }
      let accessToken = syncCloudToken.accessToken;
      let expiresAt = esm(syncCloudToken.expiresAt);
      const refreshToken = syncCloudToken.refreshToken;
      const refresh = async () => {
        try {
          const newToken = await cloud.refreshAccessToken(refreshToken);
          accessToken = newToken.accessToken;
          expiresAt = esm().add(newToken.expiresIn, 'second');
          await saveToRawStorage({
            syncCloudToken: { accessToken, expiresAt: expiresAt.toISOString(), refreshToken },
          });
        } catch (e) {
          if (e instanceof HTTPError && e.status === 400) {
            await saveToRawStorage({ syncCloudToken: false });
            throw new Error(translate('unauthorizedError'));
          } else {
            throw e;
          }
        }
      };
      if (esm().isAfter(expiresAt)) {
        await refresh();
      }
      const refreshOnUnauthorized = async f => {
        try {
          return await f();
        } catch (e) {
          if (e instanceof HTTPError && e.status === 401) {
            await refresh();
            return await f();
          } else {
            throw e;
          }
        }
      };
      const cloudFile = await refreshOnUnauthorized(() => cloud.findFile(accessToken, filename));
      if (cloudFile) {
        if (modifiedTime.isBefore(cloudFile.modifiedTime, cloud.modifiedTimePrecision)) {
          const { content: cloudContent } = await refreshOnUnauthorized(() =>
            cloud.readFile(accessToken, cloudFile.id),
          );
          return {
            content: cloudContent,
            modifiedTime: cloudFile.modifiedTime,
          };
        } else if (modifiedTime.isSame(cloudFile.modifiedTime, cloud.modifiedTimePrecision)) {
          return null;
        } else {
          await refreshOnUnauthorized(() =>
            cloud.writeFile(accessToken, cloudFile.id, content, modifiedTime),
          );
          return null;
        }
      } else {
        await refreshOnUnauthorized(() =>
          cloud.createFile(accessToken, filename, content, modifiedTime),
        );
        return null;
      }
    });
  }

  const localStorageSections = [
    {
      beforeSave(items, dirtyFlagsUpdate, now) {
        if (items.blacklist != null) {
          items.compiledRules = Ruleset.compile(items.blacklist);
          items.timestamp = now.toISOString();
          dirtyFlagsUpdate.blocklist = true;
        }
      },
      afterSave(items, source) {
        if (items.blacklist != null) {
          postMessage('blocklist-saved', items.blacklist, source);
        }
      },
    },
    {
      beforeSave(items, dirtyFlagsUpdate, now) {
        if (
          items.skipBlockDialog != null ||
          items.hideBlockLinks != null ||
          items.hideControl != null ||
          items.enablePathDepth != null ||
          items.blockWholeSite != null
        ) {
          items.generalLastModified = now.toISOString();
          dirtyFlagsUpdate.general = true;
        }
      },
    },
    {
      beforeSave(items, dirtyFlagsUpdate, now) {
        if (
          items.linkColor != null ||
          items.blockColor != null ||
          items.highlightColors ||
          items.dialogTheme != null
        ) {
          items.appearanceLastModified = now.toISOString();
          dirtyFlagsUpdate.appearance = true;
        }
      },
    },
  ];
  async function save(items, source) {
    var _a;
    const dirtyFlagsUpdate = {};
    const now = esm();
    for (const section of localStorageSections) {
      section.beforeSave(items, dirtyFlagsUpdate, now);
    }
    await saveToRawStorage(items);
    for (const section of localStorageSections) {
      (_a = section.afterSave) == null ? void 0 : _a.call(section, items, source);
    }
    syncDelayed(dirtyFlagsUpdate);
  }
  async function compileRules() {
    return modifyInRawStorage(['blacklist'], ({ blacklist }) => ({
      compiledRules: Ruleset.compile(blacklist),
    }));
  }
  async function addSubscription(subscription) {
    let id;
    let first;
    await modifyInRawStorage(
      ['subscriptions', 'nextSubscriptionId'],
      ({ subscriptions, nextSubscriptionId }) => {
        id = nextSubscriptionId;
        first = numberKeys(subscriptions).length === 0;
        return {
          subscriptions: { ...subscriptions, [nextSubscriptionId]: subscription },
          nextSubscriptionId: nextSubscriptionId + 1,
          subscriptionsLastModified: esm().toISOString(),
        };
      },
    );
    syncDelayed({ subscriptions: true });
    if (first) {
      void updateAll();
    } else {
      void update(id);
    }
    return id;
  }
  async function removeSubscription(id) {
    await modifyInRawStorage(['subscriptions'], ({ subscriptions }) => {
      const newSubscriptions = { ...subscriptions };
      delete newSubscriptions[id];
      return { subscriptions: newSubscriptions, subscriptionsLastModified: esm().toISOString() };
    });
    syncDelayed({ subscriptions: true });
  }
  async function enableSubscription(id, enabled) {
    await modifyInRawStorage(['subscriptions'], ({ subscriptions }) => {
      const newSubscriptions = { ...subscriptions };
      if (subscriptions[id]) {
        newSubscriptions[id] = { ...subscriptions[id], enabled };
      }
      return { subscriptions: newSubscriptions, subscriptionsLastModified: esm().toISOString() };
    });
    syncDelayed({ subscriptions: true });
  }

  const search_engines_SEARCH_ENGINES = {
    google: {
      contentScripts: [
        {
          matches: [
            'https://www.google.com/search?*',
            'https://www.google.ad/search?*',
            'https://www.google.ae/search?*',
            'https://www.google.com.af/search?*',
            'https://www.google.com.ag/search?*',
            'https://www.google.com.ai/search?*',
            'https://www.google.al/search?*',
            'https://www.google.am/search?*',
            'https://www.google.co.ao/search?*',
            'https://www.google.com.ar/search?*',
            'https://www.google.as/search?*',
            'https://www.google.at/search?*',
            'https://www.google.com.au/search?*',
            'https://www.google.az/search?*',
            'https://www.google.ba/search?*',
            'https://www.google.com.bd/search?*',
            'https://www.google.be/search?*',
            'https://www.google.bf/search?*',
            'https://www.google.bg/search?*',
            'https://www.google.com.bh/search?*',
            'https://www.google.bi/search?*',
            'https://www.google.bj/search?*',
            'https://www.google.com.bn/search?*',
            'https://www.google.com.bo/search?*',
            'https://www.google.com.br/search?*',
            'https://www.google.bs/search?*',
            'https://www.google.bt/search?*',
            'https://www.google.co.bw/search?*',
            'https://www.google.by/search?*',
            'https://www.google.com.bz/search?*',
            'https://www.google.ca/search?*',
            'https://www.google.cd/search?*',
            'https://www.google.cf/search?*',
            'https://www.google.cg/search?*',
            'https://www.google.ch/search?*',
            'https://www.google.ci/search?*',
            'https://www.google.co.ck/search?*',
            'https://www.google.cl/search?*',
            'https://www.google.cm/search?*',
            'https://www.google.cn/search?*',
            'https://www.google.com.co/search?*',
            'https://www.google.co.cr/search?*',
            'https://www.google.com.cu/search?*',
            'https://www.google.cv/search?*',
            'https://www.google.com.cy/search?*',
            'https://www.google.cz/search?*',
            'https://www.google.de/search?*',
            'https://www.google.dj/search?*',
            'https://www.google.dk/search?*',
            'https://www.google.dm/search?*',
            'https://www.google.com.do/search?*',
            'https://www.google.dz/search?*',
            'https://www.google.com.ec/search?*',
            'https://www.google.ee/search?*',
            'https://www.google.com.eg/search?*',
            'https://www.google.es/search?*',
            'https://www.google.com.et/search?*',
            'https://www.google.fi/search?*',
            'https://www.google.com.fj/search?*',
            'https://www.google.fm/search?*',
            'https://www.google.fr/search?*',
            'https://www.google.ga/search?*',
            'https://www.google.ge/search?*',
            'https://www.google.gg/search?*',
            'https://www.google.com.gh/search?*',
            'https://www.google.com.gi/search?*',
            'https://www.google.gl/search?*',
            'https://www.google.gm/search?*',
            'https://www.google.gp/search?*',
            'https://www.google.gr/search?*',
            'https://www.google.com.gt/search?*',
            'https://www.google.gy/search?*',
            'https://www.google.com.hk/search?*',
            'https://www.google.hn/search?*',
            'https://www.google.hr/search?*',
            'https://www.google.ht/search?*',
            'https://www.google.hu/search?*',
            'https://www.google.co.id/search?*',
            'https://www.google.ie/search?*',
            'https://www.google.co.il/search?*',
            'https://www.google.im/search?*',
            'https://www.google.co.in/search?*',
            'https://www.google.iq/search?*',
            'https://www.google.is/search?*',
            'https://www.google.it/search?*',
            'https://www.google.je/search?*',
            'https://www.google.com.jm/search?*',
            'https://www.google.jo/search?*',
            'https://www.google.co.jp/search?*',
            'https://www.google.co.ke/search?*',
            'https://www.google.com.kh/search?*',
            'https://www.google.ki/search?*',
            'https://www.google.kg/search?*',
            'https://www.google.co.kr/search?*',
            'https://www.google.com.kw/search?*',
            'https://www.google.kz/search?*',
            'https://www.google.la/search?*',
            'https://www.google.com.lb/search?*',
            'https://www.google.li/search?*',
            'https://www.google.lk/search?*',
            'https://www.google.co.ls/search?*',
            'https://www.google.lt/search?*',
            'https://www.google.lu/search?*',
            'https://www.google.lv/search?*',
            'https://www.google.com.ly/search?*',
            'https://www.google.co.ma/search?*',
            'https://www.google.md/search?*',
            'https://www.google.me/search?*',
            'https://www.google.mg/search?*',
            'https://www.google.mk/search?*',
            'https://www.google.ml/search?*',
            'https://www.google.com.mm/search?*',
            'https://www.google.mn/search?*',
            'https://www.google.ms/search?*',
            'https://www.google.com.mt/search?*',
            'https://www.google.mu/search?*',
            'https://www.google.mv/search?*',
            'https://www.google.mw/search?*',
            'https://www.google.com.mx/search?*',
            'https://www.google.com.my/search?*',
            'https://www.google.co.mz/search?*',
            'https://www.google.com.na/search?*',
            'https://www.google.com.nf/search?*',
            'https://www.google.com.ng/search?*',
            'https://www.google.com.ni/search?*',
            'https://www.google.ne/search?*',
            'https://www.google.nl/search?*',
            'https://www.google.no/search?*',
            'https://www.google.com.np/search?*',
            'https://www.google.nr/search?*',
            'https://www.google.nu/search?*',
            'https://www.google.co.nz/search?*',
            'https://www.google.com.om/search?*',
            'https://www.google.com.pa/search?*',
            'https://www.google.com.pe/search?*',
            'https://www.google.com.pg/search?*',
            'https://www.google.com.ph/search?*',
            'https://www.google.com.pk/search?*',
            'https://www.google.pl/search?*',
            'https://www.google.pn/search?*',
            'https://www.google.com.pr/search?*',
            'https://www.google.ps/search?*',
            'https://www.google.pt/search?*',
            'https://www.google.com.py/search?*',
            'https://www.google.com.qa/search?*',
            'https://www.google.ro/search?*',
            'https://www.google.ru/search?*',
            'https://www.google.rw/search?*',
            'https://www.google.com.sa/search?*',
            'https://www.google.com.sb/search?*',
            'https://www.google.sc/search?*',
            'https://www.google.se/search?*',
            'https://www.google.com.sg/search?*',
            'https://www.google.sh/search?*',
            'https://www.google.si/search?*',
            'https://www.google.sk/search?*',
            'https://www.google.com.sl/search?*',
            'https://www.google.sn/search?*',
            'https://www.google.so/search?*',
            'https://www.google.sm/search?*',
            'https://www.google.sr/search?*',
            'https://www.google.st/search?*',
            'https://www.google.com.sv/search?*',
            'https://www.google.td/search?*',
            'https://www.google.tg/search?*',
            'https://www.google.co.th/search?*',
            'https://www.google.com.tj/search?*',
            'https://www.google.tk/search?*',
            'https://www.google.tl/search?*',
            'https://www.google.tm/search?*',
            'https://www.google.tn/search?*',
            'https://www.google.to/search?*',
            'https://www.google.com.tr/search?*',
            'https://www.google.tt/search?*',
            'https://www.google.com.tw/search?*',
            'https://www.google.co.tz/search?*',
            'https://www.google.com.ua/search?*',
            'https://www.google.co.ug/search?*',
            'https://www.google.co.uk/search?*',
            'https://www.google.com.uy/search?*',
            'https://www.google.co.uz/search?*',
            'https://www.google.com.vc/search?*',
            'https://www.google.co.ve/search?*',
            'https://www.google.vg/search?*',
            'https://www.google.co.vi/search?*',
            'https://www.google.com.vn/search?*',
            'https://www.google.vu/search?*',
            'https://www.google.ws/search?*',
            'https://www.google.rs/search?*',
            'https://www.google.co.za/search?*',
            'https://www.google.co.zm/search?*',
            'https://www.google.co.zw/search?*',
            'https://www.google.cat/search?*',
          ],
          runAt: 'document_start',
        },
      ],
      messageNames: {
        name: 'searchEngines_googleName',
      },
    },
    bing: {
      contentScripts: [
        {
          matches: [
            'https://www.bing.com/search?*',
            'https://www.bing.com/images/search?*',
            'https://www.bing.com/videos/search?*',
            'https://www.bing.com/news/search?*',
            'https://cn.bing.com/search?*',
            'https://cn.bing.com/images/search?*',
            'https://cn.bing.com/videos/search?*',
            'https://cn.bing.com/news/search?*',
            'https://www2.bing.com/search?*',
            'https://www2.bing.com/images/search?*',
            'https://www2.bing.com/videos/search?*',
            'https://www2.bing.com/news/search?*',
            'https://www4.bing.com/search?*',
            'https://www4.bing.com/images/search?*',
            'https://www4.bing.com/videos/search?*',
            'https://www4.bing.com/news/search?*',
          ],
          runAt: 'document_start',
        },
      ],
      messageNames: {
        name: 'searchEngines_bingName',
      },
    },
    brave: {
      contentScripts: [
        {
          matches: [
            'https://search.brave.com/search?*',
            'https://search.brave.com/images?*',
            'https://search.brave.com/news?*',
            'https://search.brave.com/videos?*',
          ],
          runAt: 'document_start',
        },
      ],
      messageNames: {
        name: 'searchEngines_braveName',
      },
    },
    duckduckgo: {
      contentScripts: [
        {
          matches: [
            '*://duckduckgo.com/',
            '*://duckduckgo.com/?*',
            '*://html.duckduckgo.com/html/',
            '*://html.duckduckgo.com/html/?*',
            '*://safe.duckduckgo.com/',
            '*://safe.duckduckgo.com/?*',
            '*://start.duckduckgo.com/',
            '*://start.duckduckgo.com/?*',
          ],
          runAt: 'document_start',
        },
      ],
      messageNames: {
        name: 'searchEngines_duckduckgoName',
      },
    },
    ecosia: {
      contentScripts: [
        {
          matches: ['https://www.ecosia.org/search?*'],
          runAt: 'document_start',
        },
      ],
      messageNames: {
        name: 'searchEngines_ecosiaName',
      },
    },
    qwant: {
      contentScripts: [
        {
          matches: ['https://www.qwant.com/?*'],
          runAt: 'document_idle',
        },
        {
          matches: ['https://lite.qwant.com/?*'],
          runAt: 'document_start',
        },
      ],
      messageNames: {
        name: 'searchEngines_qwantName',
        description: 'searchEngines_qwantDescription',
      },
    },
    startpage: {
      contentScripts: [
        {
          matches: [
            'https://*.startpage.com/do/*',
            'https://*.startpage.com/rvd/*',
            'https://*.startpage.com/sp/*',
          ],
          runAt: 'document_start',
        },
      ],
      messageNames: {
        name: 'searchEngines_startpageName',
      },
    },
    yahooJapan: {
      contentScripts: [
        {
          matches: ['https://search.yahoo.co.jp/search?*'],
          runAt: 'document_idle',
        },
      ],
      messageNames: {
        name: 'searchEngines_yahooJapanName',
      },
    },
    yandex: {
      contentScripts: [
        {
          matches: [
            'https://yandex.com/search/?*',
            'https://yandex.ru/search/?*',
            'https://yandex.ua/search/?*',
            'https://yandex.by/search/?*',
            'https://yandex.kz/search/?*',
            'https://yandex.uz/search/?*',
            'https://yandex.com.tr/search/?*',
            'https://yandex.fr/search/?*',
            'https://yandex.az/search/?*',
            'https://yandex.com.ge/search/?*',
            'https://yandex.com.am/search/?*',
            'https://yandex.co.il/search/?*',
            'https://yandex.lv/search/?*',
            'https://yandex.lt/search/?*',
            'https://yandex.ee/search/?*',
            'https://yandex.md/search/?*',
            'https://yandex.tm/search/?*',
            'https://yandex.tj/search/?*',
            'https://newssearch.yandex.com/news/search?*',
            'https://newssearch.yandex.ru/news/search?*',
            'https://newssearch.yandex.ua/news/search?*',
            'https://newssearch.yandex.by/news/search?*',
            'https://newssearch.yandex.kz/news/search?*',
            'https://newssearch.yandex.uz/news/search?*',
            'https://newssearch.yandex.com.tr/news/search?*',
            'https://newssearch.yandex.fr/news/search?*',
            'https://newssearch.yandex.az/news/search?*',
            'https://newssearch.yandex.com.ge/news/search?*',
            'https://newssearch.yandex.com.am/news/search?*',
            'https://newssearch.yandex.co.il/news/search?*',
            'https://newssearch.yandex.lv/news/search?*',
            'https://newssearch.yandex.lt/news/search?*',
            'https://newssearch.yandex.ee/news/search?*',
            'https://newssearch.yandex.md/news/search?*',
            'https://newssearch.yandex.tm/news/search?*',
            'https://newssearch.yandex.tj/news/search?*',
          ],
          runAt: 'document_idle',
        },
      ],
      messageNames: {
        name: 'searchEngines_yandexName',
      },
    },
  };

  async function injectContentScript(tabId, url) {
    const granted = await browser.permissions.contains({ origins: [url] });
    if (!granted) {
      return;
    }
    const altURL = new AltURL(url);
    const contentScript = stringEntries(SEARCH_ENGINES)
      .flatMap(([id, { contentScripts }]) => (id === 'google' ? [] : contentScripts))
      .find(({ matches }) => matches.some(match => new MatchPattern(match).test(altURL)));
    if (!contentScript) {
      return;
    }
    const [{ result: active }] = await browser.scripting.executeScript({
      target: { tabId },
      files: ['/scripts/active.js'],
    });
    if (!active) {
      await browser.scripting.executeScript({
        target: { tabId },
        files: ['/scripts/content-script.js'],
      });
    }
  }
  const search_engines_mutex = new Mutex();
  async function getRegisterableContentScripts() {
    return (
      await Promise.all(
        utilities_stringEntries(search_engines_SEARCH_ENGINES)
          .flatMap(([id, { contentScripts }]) =>
            id !== 'google'
              ? contentScripts.map((contentScript, index) => ({
                  id: id + String(index),
                  ...contentScript,
                }))
              : [],
          )
          .map(async ({ id, matches, runAt }) => {
            const grantedMatches = (
              await Promise.all(
                matches.map(async match =>
                  (await browser_browser.permissions.contains({ origins: [match] })) ? [match] : [],
                ),
              )
            ).flat();
            return grantedMatches.length ? [{ id, matches: grantedMatches, runAt }] : [];
          }),
      )
    ).flat();
  }
  async function registerContentScripts() {
    return search_engines_mutex.lock(async () => {
      await browser_browser.scripting.unregisterContentScripts();
      await browser_browser.scripting.registerContentScripts(
        (
          await getRegisterableContentScripts()
        ).map(contentScript => ({ ...contentScript, js: ['scripts/content-script.js'] })),
      );
    });
  }

  function main() {
    addMessageListeners({
      'connect-to-cloud': connect,
      'disconnect-from-cloud': disconnect,
      'save-to-local-storage': save,
      'add-subscription': addSubscription,
      'remove-subscription': removeSubscription,
      'enable-subscription': enableSubscription,
      'register-content-scripts': registerContentScripts,
      sync: sync,
      'update-subscription': update,
      'update-all-subscriptions': updateAll,
      'open-options-page': browser_browser.runtime.openOptionsPage.bind(browser_browser.runtime),
    });
    browser_browser.runtime.onInstalled.addListener(({ reason }) => {
      if (reason === 'install' || reason === 'update') {
        void compileRules();
        void sync();
        void updateAll();
        void registerContentScripts();
      }
    });
    browser_browser.runtime.onStartup.addListener(() => {
      void compileRules();
      void sync();
      void updateAll();
      void registerContentScripts();
    });
    browser_browser.alarms.onAlarm.addListener(alarm => {
      if (alarm.name === SYNC_ALARM_NAME) {
        void sync();
      } else if (alarm.name === UPDATE_ALL_ALARM_NAME) {
        void updateAll();
      }
    });
  }
  main();
})();
