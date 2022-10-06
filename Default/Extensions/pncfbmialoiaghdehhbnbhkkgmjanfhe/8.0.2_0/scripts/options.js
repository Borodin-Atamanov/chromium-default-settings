(() => {
  'use strict';
  var __webpack_require__ = {};
  (() => {
    __webpack_require__.nc = undefined;
  })();
  var __webpack_exports__ = {};

  var n,
    l,
    u,
    i,
    t,
    o,
    preact_module_r,
    f = {},
    preact_module_e = [],
    c = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  function s(n, l) {
    for (var u in l) n[u] = l[u];
    return n;
  }
  function a(n) {
    var l = n.parentNode;
    l && l.removeChild(n);
  }
  function h(l, u, i) {
    var t,
      o,
      r,
      f = {};
    for (r in u) 'key' == r ? (t = u[r]) : 'ref' == r ? (o = u[r]) : (f[r] = u[r]);
    if (
      (arguments.length > 2 && (f.children = arguments.length > 3 ? n.call(arguments, 2) : i),
      'function' == typeof l && null != l.defaultProps)
    )
      for (r in l.defaultProps) void 0 === f[r] && (f[r] = l.defaultProps[r]);
    return v(l, f, t, o, null);
  }
  function v(n, i, t, o, r) {
    var f = {
      type: n,
      props: i,
      key: t,
      ref: o,
      __k: null,
      __: null,
      __b: 0,
      __e: null,
      __d: void 0,
      __c: null,
      __h: null,
      constructor: void 0,
      __v: null == r ? ++u : r,
    };
    return null == r && null != l.vnode && l.vnode(f), f;
  }
  function y() {
    return { current: null };
  }
  function p(n) {
    return n.children;
  }
  function d(n, l) {
    (this.props = n), (this.context = l);
  }
  function _(n, l) {
    if (null == l) return n.__ ? _(n.__, n.__.__k.indexOf(n) + 1) : null;
    for (var u; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) return u.__e;
    return 'function' == typeof n.type ? _(n) : null;
  }
  function k(n) {
    var l, u;
    if (null != (n = n.__) && null != n.__c) {
      for (n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++)
        if (null != (u = n.__k[l]) && null != u.__e) {
          n.__e = n.__c.base = u.__e;
          break;
        }
      return k(n);
    }
  }
  function b(n) {
    ((!n.__d && (n.__d = !0) && t.push(n) && !g.__r++) || o !== l.debounceRendering) &&
      ((o = l.debounceRendering) || setTimeout)(g);
  }
  function g() {
    for (var n; (g.__r = t.length); )
      (n = t.sort(function (n, l) {
        return n.__v.__b - l.__v.__b;
      })),
        (t = []),
        n.some(function (n) {
          var l, u, i, t, o, r;
          n.__d &&
            ((o = (t = (l = n).__v).__e),
            (r = l.__P) &&
              ((u = []),
              ((i = s({}, t)).__v = t.__v + 1),
              j(
                r,
                t,
                i,
                l.__n,
                void 0 !== r.ownerSVGElement,
                null != t.__h ? [o] : null,
                u,
                null == o ? _(t) : o,
                t.__h,
              ),
              z(u, t),
              t.__e != o && k(t)));
        });
  }
  function w(n, l, u, i, t, o, r, c, s, a) {
    var h,
      y,
      d,
      k,
      b,
      g,
      w,
      x = (i && i.__k) || preact_module_e,
      C = x.length;
    for (u.__k = [], h = 0; h < l.length; h++)
      if (
        null !=
        (k = u.__k[h] =
          null == (k = l[h]) || 'boolean' == typeof k
            ? null
            : 'string' == typeof k || 'number' == typeof k || 'bigint' == typeof k
            ? v(null, k, null, null, k)
            : Array.isArray(k)
            ? v(p, { children: k }, null, null, null)
            : k.__b > 0
            ? v(k.type, k.props, k.key, null, k.__v)
            : k)
      ) {
        if (
          ((k.__ = u),
          (k.__b = u.__b + 1),
          null === (d = x[h]) || (d && k.key == d.key && k.type === d.type))
        )
          x[h] = void 0;
        else
          for (y = 0; y < C; y++) {
            if ((d = x[y]) && k.key == d.key && k.type === d.type) {
              x[y] = void 0;
              break;
            }
            d = null;
          }
        j(n, k, (d = d || f), t, o, r, c, s, a),
          (b = k.__e),
          (y = k.ref) &&
            d.ref != y &&
            (w || (w = []), d.ref && w.push(d.ref, null, k), w.push(y, k.__c || b, k)),
          null != b
            ? (null == g && (g = b),
              'function' == typeof k.type && k.__k === d.__k
                ? (k.__d = s = m(k, s, n))
                : (s = A(n, k, d, x, b, s)),
              'function' == typeof u.type && (u.__d = s))
            : s && d.__e == s && s.parentNode != n && (s = _(d));
      }
    for (u.__e = g, h = C; h--; )
      null != x[h] &&
        ('function' == typeof u.type &&
          null != x[h].__e &&
          x[h].__e == u.__d &&
          (u.__d = _(i, h + 1)),
        N(x[h], x[h]));
    if (w) for (h = 0; h < w.length; h++) M(w[h], w[++h], w[++h]);
  }
  function m(n, l, u) {
    for (var i, t = n.__k, o = 0; t && o < t.length; o++)
      (i = t[o]) &&
        ((i.__ = n), (l = 'function' == typeof i.type ? m(i, l, u) : A(u, i, i, t, i.__e, l)));
    return l;
  }
  function x(n, l) {
    return (
      (l = l || []),
      null == n ||
        'boolean' == typeof n ||
        (Array.isArray(n)
          ? n.some(function (n) {
              x(n, l);
            })
          : l.push(n)),
      l
    );
  }
  function A(n, l, u, i, t, o) {
    var r, f, e;
    if (void 0 !== l.__d) (r = l.__d), (l.__d = void 0);
    else if (null == u || t != o || null == t.parentNode)
      n: if (null == o || o.parentNode !== n) n.appendChild(t), (r = null);
      else {
        for (f = o, e = 0; (f = f.nextSibling) && e < i.length; e += 2) if (f == t) break n;
        n.insertBefore(t, o), (r = o);
      }
    return void 0 !== r ? r : t.nextSibling;
  }
  function C(n, l, u, i, t) {
    var o;
    for (o in u) 'children' === o || 'key' === o || o in l || H(n, o, null, u[o], i);
    for (o in l)
      (t && 'function' != typeof l[o]) ||
        'children' === o ||
        'key' === o ||
        'value' === o ||
        'checked' === o ||
        u[o] === l[o] ||
        H(n, o, l[o], u[o], i);
  }
  function $(n, l, u) {
    '-' === l[0]
      ? n.setProperty(l, u)
      : (n[l] = null == u ? '' : 'number' != typeof u || c.test(l) ? u : u + 'px');
  }
  function H(n, l, u, i, t) {
    var o;
    n: if ('style' === l)
      if ('string' == typeof u) n.style.cssText = u;
      else {
        if (('string' == typeof i && (n.style.cssText = i = ''), i))
          for (l in i) (u && l in u) || $(n.style, l, '');
        if (u) for (l in u) (i && u[l] === i[l]) || $(n.style, l, u[l]);
      }
    else if ('o' === l[0] && 'n' === l[1])
      (o = l !== (l = l.replace(/Capture$/, ''))),
        (l = l.toLowerCase() in n ? l.toLowerCase().slice(2) : l.slice(2)),
        n.l || (n.l = {}),
        (n.l[l + o] = u),
        u ? i || n.addEventListener(l, o ? T : I, o) : n.removeEventListener(l, o ? T : I, o);
    else if ('dangerouslySetInnerHTML' !== l) {
      if (t) l = l.replace(/xlink(H|:h)/, 'h').replace(/sName$/, 's');
      else if (
        'href' !== l &&
        'list' !== l &&
        'form' !== l &&
        'tabIndex' !== l &&
        'download' !== l &&
        l in n
      )
        try {
          n[l] = null == u ? '' : u;
          break n;
        } catch (n) {}
      'function' == typeof u ||
        (null != u && (!1 !== u || ('a' === l[0] && 'r' === l[1]))
          ? n.setAttribute(l, u)
          : n.removeAttribute(l));
    }
  }
  function I(n) {
    this.l[n.type + !1](l.event ? l.event(n) : n);
  }
  function T(n) {
    this.l[n.type + !0](l.event ? l.event(n) : n);
  }
  function j(n, u, i, t, o, r, f, e, c) {
    var a,
      h,
      v,
      y,
      _,
      k,
      b,
      g,
      m,
      x,
      A,
      C,
      $,
      H = u.type;
    if (void 0 !== u.constructor) return null;
    null != i.__h && ((c = i.__h), (e = u.__e = i.__e), (u.__h = null), (r = [e])),
      (a = l.__b) && a(u);
    try {
      n: if ('function' == typeof H) {
        if (
          ((g = u.props),
          (m = (a = H.contextType) && t[a.__c]),
          (x = a ? (m ? m.props.value : a.__) : t),
          i.__c
            ? (b = (h = u.__c = i.__c).__ = h.__E)
            : ('prototype' in H && H.prototype.render
                ? (u.__c = h = new H(g, x))
                : ((u.__c = h = new d(g, x)), (h.constructor = H), (h.render = O)),
              m && m.sub(h),
              (h.props = g),
              h.state || (h.state = {}),
              (h.context = x),
              (h.__n = t),
              (v = h.__d = !0),
              (h.__h = [])),
          null == h.__s && (h.__s = h.state),
          null != H.getDerivedStateFromProps &&
            (h.__s == h.state && (h.__s = s({}, h.__s)),
            s(h.__s, H.getDerivedStateFromProps(g, h.__s))),
          (y = h.props),
          (_ = h.state),
          v)
        )
          null == H.getDerivedStateFromProps &&
            null != h.componentWillMount &&
            h.componentWillMount(),
            null != h.componentDidMount && h.__h.push(h.componentDidMount);
        else {
          if (
            (null == H.getDerivedStateFromProps &&
              g !== y &&
              null != h.componentWillReceiveProps &&
              h.componentWillReceiveProps(g, x),
            (!h.__e &&
              null != h.shouldComponentUpdate &&
              !1 === h.shouldComponentUpdate(g, h.__s, x)) ||
              u.__v === i.__v)
          ) {
            (h.props = g),
              (h.state = h.__s),
              u.__v !== i.__v && (h.__d = !1),
              (h.__v = u),
              (u.__e = i.__e),
              (u.__k = i.__k),
              u.__k.forEach(function (n) {
                n && (n.__ = u);
              }),
              h.__h.length && f.push(h);
            break n;
          }
          null != h.componentWillUpdate && h.componentWillUpdate(g, h.__s, x),
            null != h.componentDidUpdate &&
              h.__h.push(function () {
                h.componentDidUpdate(y, _, k);
              });
        }
        if (
          ((h.context = x),
          (h.props = g),
          (h.__v = u),
          (h.__P = n),
          (A = l.__r),
          (C = 0),
          'prototype' in H && H.prototype.render)
        )
          (h.state = h.__s), (h.__d = !1), A && A(u), (a = h.render(h.props, h.state, h.context));
        else
          do {
            (h.__d = !1), A && A(u), (a = h.render(h.props, h.state, h.context)), (h.state = h.__s);
          } while (h.__d && ++C < 25);
        (h.state = h.__s),
          null != h.getChildContext && (t = s(s({}, t), h.getChildContext())),
          v || null == h.getSnapshotBeforeUpdate || (k = h.getSnapshotBeforeUpdate(y, _)),
          ($ = null != a && a.type === p && null == a.key ? a.props.children : a),
          w(n, Array.isArray($) ? $ : [$], u, i, t, o, r, f, e, c),
          (h.base = u.__e),
          (u.__h = null),
          h.__h.length && f.push(h),
          b && (h.__E = h.__ = null),
          (h.__e = !1);
      } else
        null == r && u.__v === i.__v
          ? ((u.__k = i.__k), (u.__e = i.__e))
          : (u.__e = L(i.__e, u, i, t, o, r, f, c));
      (a = l.diffed) && a(u);
    } catch (n) {
      (u.__v = null),
        (c || null != r) && ((u.__e = e), (u.__h = !!c), (r[r.indexOf(e)] = null)),
        l.__e(n, u, i);
    }
  }
  function z(n, u) {
    l.__c && l.__c(u, n),
      n.some(function (u) {
        try {
          (n = u.__h),
            (u.__h = []),
            n.some(function (n) {
              n.call(u);
            });
        } catch (n) {
          l.__e(n, u.__v);
        }
      });
  }
  function L(l, u, i, t, o, r, e, c) {
    var s,
      h,
      v,
      y = i.props,
      p = u.props,
      d = u.type,
      k = 0;
    if (('svg' === d && (o = !0), null != r))
      for (; k < r.length; k++)
        if (
          (s = r[k]) &&
          'setAttribute' in s == !!d &&
          (d ? s.localName === d : 3 === s.nodeType)
        ) {
          (l = s), (r[k] = null);
          break;
        }
    if (null == l) {
      if (null === d) return document.createTextNode(p);
      (l = o
        ? document.createElementNS('http://www.w3.org/2000/svg', d)
        : document.createElement(d, p.is && p)),
        (r = null),
        (c = !1);
    }
    if (null === d) y === p || (c && l.data === p) || (l.data = p);
    else {
      if (
        ((r = r && n.call(l.childNodes)),
        (h = (y = i.props || f).dangerouslySetInnerHTML),
        (v = p.dangerouslySetInnerHTML),
        !c)
      ) {
        if (null != r)
          for (y = {}, k = 0; k < l.attributes.length; k++)
            y[l.attributes[k].name] = l.attributes[k].value;
        (v || h) &&
          ((v && ((h && v.__html == h.__html) || v.__html === l.innerHTML)) ||
            (l.innerHTML = (v && v.__html) || ''));
      }
      if ((C(l, p, y, o, c), v)) u.__k = [];
      else if (
        ((k = u.props.children),
        w(
          l,
          Array.isArray(k) ? k : [k],
          u,
          i,
          t,
          o && 'foreignObject' !== d,
          r,
          e,
          r ? r[0] : i.__k && _(i, 0),
          c,
        ),
        null != r)
      )
        for (k = r.length; k--; ) null != r[k] && a(r[k]);
      c ||
        ('value' in p &&
          void 0 !== (k = p.value) &&
          (k !== l.value || ('progress' === d && !k) || ('option' === d && k !== y.value)) &&
          H(l, 'value', k, y.value, !1),
        'checked' in p &&
          void 0 !== (k = p.checked) &&
          k !== l.checked &&
          H(l, 'checked', k, y.checked, !1));
    }
    return l;
  }
  function M(n, u, i) {
    try {
      'function' == typeof n ? n(u) : (n.current = u);
    } catch (n) {
      l.__e(n, i);
    }
  }
  function N(n, u, i) {
    var t, o;
    if (
      (l.unmount && l.unmount(n),
      (t = n.ref) && ((t.current && t.current !== n.__e) || M(t, null, u)),
      null != (t = n.__c))
    ) {
      if (t.componentWillUnmount)
        try {
          t.componentWillUnmount();
        } catch (n) {
          l.__e(n, u);
        }
      t.base = t.__P = null;
    }
    if ((t = n.__k)) for (o = 0; o < t.length; o++) t[o] && N(t[o], u, 'function' != typeof n.type);
    i || null == n.__e || a(n.__e), (n.__e = n.__d = void 0);
  }
  function O(n, l, u) {
    return this.constructor(n, u);
  }
  function P(u, i, t) {
    var o, r, e;
    l.__ && l.__(u, i),
      (r = (o = 'function' == typeof t) ? null : (t && t.__k) || i.__k),
      (e = []),
      j(
        i,
        (u = ((!o && t) || i).__k = h(p, null, [u])),
        r || f,
        f,
        void 0 !== i.ownerSVGElement,
        !o && t ? [t] : r ? null : i.firstChild ? n.call(i.childNodes) : null,
        e,
        !o && t ? t : r ? r.__e : i.firstChild,
        o,
      ),
      z(e, u);
  }
  function S(n, l) {
    P(n, l, S);
  }
  function q(l, u, i) {
    var t,
      o,
      r,
      f = s({}, l.props);
    for (r in u) 'key' == r ? (t = u[r]) : 'ref' == r ? (o = u[r]) : (f[r] = u[r]);
    return (
      arguments.length > 2 && (f.children = arguments.length > 3 ? n.call(arguments, 2) : i),
      v(l.type, f, t || l.key, o || l.ref, null)
    );
  }
  function B(n, l) {
    var u = {
      __c: (l = '__cC' + preact_module_r++),
      __: n,
      Consumer: function (n, l) {
        return n.children(l);
      },
      Provider: function (n) {
        var u, i;
        return (
          this.getChildContext ||
            ((u = []),
            ((i = {})[l] = this),
            (this.getChildContext = function () {
              return i;
            }),
            (this.shouldComponentUpdate = function (n) {
              this.props.value !== n.value && u.some(b);
            }),
            (this.sub = function (n) {
              u.push(n);
              var l = n.componentWillUnmount;
              n.componentWillUnmount = function () {
                u.splice(u.indexOf(n), 1), l && l.call(n);
              };
            })),
          n.children
        );
      },
    };
    return (u.Provider.__ = u.Consumer.contextType = u);
  }
  (n = preact_module_e.slice),
    (l = {
      __e: function (n, l, u, i) {
        for (var t, o, r; (l = l.__); )
          if ((t = l.__c) && !t.__)
            try {
              if (
                ((o = t.constructor) &&
                  null != o.getDerivedStateFromError &&
                  (t.setState(o.getDerivedStateFromError(n)), (r = t.__d)),
                null != t.componentDidCatch && (t.componentDidCatch(n, i || {}), (r = t.__d)),
                r)
              )
                return (t.__E = t);
            } catch (l) {
              n = l;
            }
        throw n;
      },
    }),
    (u = 0),
    (i = function (n) {
      return null != n && void 0 === n.constructor;
    }),
    (d.prototype.setState = function (n, l) {
      var u;
      (u = null != this.__s && this.__s !== this.state ? this.__s : (this.__s = s({}, this.state))),
        'function' == typeof n && (n = n(s({}, u), this.props)),
        n && s(u, n),
        null != n && this.__v && (l && this.__h.push(l), b(this));
    }),
    (d.prototype.forceUpdate = function (n) {
      this.__v && ((this.__e = !0), n && this.__h.push(n), b(this));
    }),
    (d.prototype.render = p),
    (t = []),
    (g.__r = 0),
    (preact_module_r = 0);
  var hooks_module_t,
    hooks_module_r,
    hooks_module_u,
    hooks_module_i,
    hooks_module_o = 0,
    hooks_module_c = [],
    hooks_module_f = [],
    hooks_module_e = l.__b,
    hooks_module_a = l.__r,
    hooks_module_v = l.diffed,
    hooks_module_l = l.__c,
    hooks_module_m = l.unmount;
  function hooks_module_d(t, u) {
    l.__h && l.__h(hooks_module_r, t, hooks_module_o || u), (hooks_module_o = 0);
    var i = hooks_module_r.__H || (hooks_module_r.__H = { __: [], __h: [] });
    return t >= i.__.length && i.__.push({ __V: hooks_module_f }), i.__[t];
  }
  function hooks_module_p(n) {
    return (hooks_module_o = 1), hooks_module_y(hooks_module_z, n);
  }
  function hooks_module_y(n, u, i) {
    var o = hooks_module_d(hooks_module_t++, 2);
    if (
      ((o.t = n),
      !o.__c &&
        ((o.__ = [
          i ? i(u) : hooks_module_z(void 0, u),
          function (n) {
            var t = o.__N ? o.__N[0] : o.__[0],
              r = o.t(t, n);
            t !== r && ((o.__N = [r, o.__[1]]), o.__c.setState({}));
          },
        ]),
        (o.__c = hooks_module_r),
        !o.__c.u))
    ) {
      o.__c.__H.u = !0;
      var c = o.__c.shouldComponentUpdate;
      o.__c.shouldComponentUpdate = function (n, t, r) {
        if (!o.__c.__H) return !0;
        var u = o.__c.__H.__.filter(function (n) {
          return n.__c;
        });
        return u.every(function (n) {
          return !n.__N;
        })
          ? !c || c(n, t, r)
          : !u.every(function (n) {
              if (!n.__N) return !0;
              var t = n.__[0];
              return (n.__ = n.__N), (n.__N = void 0), t === n.__[0];
            }) &&
              (!c || c(n, t, r));
      };
    }
    return o.__N || o.__;
  }
  function hooks_module_(u, i) {
    var o = hooks_module_d(hooks_module_t++, 3);
    !l.__s && hooks_module_w(o.__H, i) && ((o.__ = u), (o.i = i), hooks_module_r.__H.__h.push(o));
  }
  function hooks_module_h(u, i) {
    var o = hooks_module_d(hooks_module_t++, 4);
    !l.__s && hooks_module_w(o.__H, i) && ((o.__ = u), (o.i = i), hooks_module_r.__h.push(o));
  }
  function hooks_module_s(n) {
    return (
      (hooks_module_o = 5),
      F(function () {
        return { current: n };
      }, [])
    );
  }
  function hooks_module_A(n, t, r) {
    (hooks_module_o = 6),
      hooks_module_h(
        function () {
          return 'function' == typeof n
            ? (n(t()),
              function () {
                return n(null);
              })
            : n
            ? ((n.current = t()),
              function () {
                return (n.current = null);
              })
            : void 0;
        },
        null == r ? r : r.concat(n),
      );
  }
  function F(n, r) {
    var u = hooks_module_d(hooks_module_t++, 7);
    return hooks_module_w(u.__H, r) ? ((u.__V = n()), (u.i = r), (u.__h = n), u.__V) : u.__;
  }
  function hooks_module_T(n, t) {
    return (
      (hooks_module_o = 8),
      F(function () {
        return n;
      }, t)
    );
  }
  function hooks_module_q(n) {
    var u = hooks_module_r.context[n.__c],
      i = hooks_module_d(hooks_module_t++, 9);
    return (
      (i.c = n), u ? (null == i.__ && ((i.__ = !0), u.sub(hooks_module_r)), u.props.value) : n.__
    );
  }
  function hooks_module_x(t, r) {
    l.useDebugValue && l.useDebugValue(r ? r(t) : t);
  }
  function V(n) {
    var u = hooks_module_d(hooks_module_t++, 10),
      i = hooks_module_p();
    return (
      (u.__ = n),
      hooks_module_r.componentDidCatch ||
        (hooks_module_r.componentDidCatch = function (n) {
          u.__ && u.__(n), i[1](n);
        }),
      [
        i[0],
        function () {
          i[1](void 0);
        },
      ]
    );
  }
  function hooks_module_b() {
    for (var t; (t = hooks_module_c.shift()); )
      if (t.__P && t.__H)
        try {
          t.__H.__h.forEach(hooks_module_j), t.__H.__h.forEach(hooks_module_k), (t.__H.__h = []);
        } catch (r) {
          (t.__H.__h = []), l.__e(r, t.__v);
        }
  }
  (l.__b = function (n) {
    (hooks_module_r = null), hooks_module_e && hooks_module_e(n);
  }),
    (l.__r = function (n) {
      hooks_module_a && hooks_module_a(n), (hooks_module_t = 0);
      var i = (hooks_module_r = n.__c).__H;
      i &&
        (hooks_module_u === hooks_module_r
          ? ((i.__h = []),
            (hooks_module_r.__h = []),
            i.__.forEach(function (n) {
              n.__N && (n.__ = n.__N), (n.__V = hooks_module_f), (n.__N = n.i = void 0);
            }))
          : (i.__h.forEach(hooks_module_j), i.__h.forEach(hooks_module_k), (i.__h = []))),
        (hooks_module_u = hooks_module_r);
    }),
    (l.diffed = function (t) {
      hooks_module_v && hooks_module_v(t);
      var o = t.__c;
      o &&
        o.__H &&
        (o.__H.__h.length &&
          ((1 !== hooks_module_c.push(o) && hooks_module_i === l.requestAnimationFrame) ||
            (
              (hooks_module_i = l.requestAnimationFrame) ||
              function (n) {
                var t,
                  r = function () {
                    clearTimeout(u), hooks_module_g && cancelAnimationFrame(t), setTimeout(n);
                  },
                  u = setTimeout(r, 100);
                hooks_module_g && (t = requestAnimationFrame(r));
              }
            )(hooks_module_b)),
        o.__H.__.forEach(function (n) {
          n.i && (n.__H = n.i),
            n.__V !== hooks_module_f && (n.__ = n.__V),
            (n.i = void 0),
            (n.__V = hooks_module_f);
        })),
        (hooks_module_u = hooks_module_r = null);
    }),
    (l.__c = function (t, r) {
      r.some(function (t) {
        try {
          t.__h.forEach(hooks_module_j),
            (t.__h = t.__h.filter(function (n) {
              return !n.__ || hooks_module_k(n);
            }));
        } catch (u) {
          r.some(function (n) {
            n.__h && (n.__h = []);
          }),
            (r = []),
            l.__e(u, t.__v);
        }
      }),
        hooks_module_l && hooks_module_l(t, r);
    }),
    (l.unmount = function (t) {
      hooks_module_m && hooks_module_m(t);
      var r,
        u = t.__c;
      u &&
        u.__H &&
        (u.__H.__.forEach(function (n) {
          try {
            hooks_module_j(n);
          } catch (n) {
            r = n;
          }
        }),
        r && l.__e(r, u.__v));
    });
  var hooks_module_g = 'function' == typeof requestAnimationFrame;
  function hooks_module_j(n) {
    var t = hooks_module_r,
      u = n.__c;
    'function' == typeof u && ((n.__c = void 0), u()), (hooks_module_r = t);
  }
  function hooks_module_k(n) {
    var t = hooks_module_r;
    (n.__c = n.__()), (hooks_module_r = t);
  }
  function hooks_module_w(n, t) {
    return (
      !n ||
      n.length !== t.length ||
      t.some(function (t, r) {
        return t !== n[r];
      })
    );
  }
  function hooks_module_z(n, t) {
    return 'function' == typeof t ? t(n) : t;
  }
  function compat_module_S(n, t) {
    for (var e in t) n[e] = t[e];
    return n;
  }
  function compat_module_g(n, t) {
    for (var e in n) if ('__source' !== e && !(e in t)) return !0;
    for (var r in t) if ('__source' !== r && n[r] !== t[r]) return !0;
    return !1;
  }
  function compat_module_C(n) {
    this.props = n;
  }
  function E(n, t) {
    function e(n) {
      var e = this.props.ref,
        r = e == n.ref;
      return (
        !r && e && (e.call ? e(null) : (e.current = null)),
        t ? !t(this.props, n) || !r : compat_module_g(this.props, n)
      );
    }
    function r(t) {
      return (this.shouldComponentUpdate = e), h(n, t);
    }
    return (
      (r.displayName = 'Memo(' + (n.displayName || n.name) + ')'),
      (r.prototype.isReactComponent = !0),
      (r.__f = !0),
      r
    );
  }
  ((compat_module_C.prototype = new d()).isPureReactComponent = !0),
    (compat_module_C.prototype.shouldComponentUpdate = function (n, t) {
      return compat_module_g(this.props, n) || compat_module_g(this.state, t);
    });
  var compat_module_w = l.__b;
  l.__b = function (n) {
    n.type && n.type.__f && n.ref && ((n.props.ref = n.ref), (n.ref = null)),
      compat_module_w && compat_module_w(n);
  };
  var compat_module_x =
    ('undefined' != typeof Symbol && Symbol.for && Symbol.for('react.forward_ref')) || 3911;
  function R(n) {
    function t(t) {
      var e = compat_module_S({}, t);
      return delete e.ref, n(e, t.ref || null);
    }
    return (
      (t.$$typeof = compat_module_x),
      (t.render = t),
      (t.prototype.isReactComponent = t.__f = !0),
      (t.displayName = 'ForwardRef(' + (n.displayName || n.name) + ')'),
      t
    );
  }
  var compat_module_N = function (n, t) {
      return null == n ? null : x(x(n).map(t));
    },
    compat_module_k = {
      map: compat_module_N,
      forEach: compat_module_N,
      count: function (n) {
        return n ? x(n).length : 0;
      },
      only: function (n) {
        var t = x(n);
        if (1 !== t.length) throw 'Children.only';
        return t[0];
      },
      toArray: x,
    },
    compat_module_A = l.__e;
  l.__e = function (n, t, e, r) {
    if (n.then)
      for (var u, o = t; (o = o.__); )
        if ((u = o.__c) && u.__c)
          return null == t.__e && ((t.__e = e.__e), (t.__k = e.__k)), u.__c(n, t);
    compat_module_A(n, t, e, r);
  };
  var compat_module_O = l.unmount;
  function compat_module_T() {
    (this.__u = 0), (this.t = null), (this.__b = null);
  }
  function compat_module_L(n) {
    var t = n.__.__c;
    return t && t.__a && t.__a(n);
  }
  function U(n) {
    var t, e, r;
    function u(u) {
      if (
        (t ||
          (t = n()).then(
            function (n) {
              e = n.default || n;
            },
            function (n) {
              r = n;
            },
          ),
        r)
      )
        throw r;
      if (!e) throw t;
      return h(e, u);
    }
    return (u.displayName = 'Lazy'), (u.__f = !0), u;
  }
  function D() {
    (this.u = null), (this.o = null);
  }
  (l.unmount = function (n) {
    var t = n.__c;
    t && t.__R && t.__R(),
      t && !0 === n.__h && (n.type = null),
      compat_module_O && compat_module_O(n);
  }),
    ((compat_module_T.prototype = new d()).__c = function (n, t) {
      var e = t.__c,
        r = this;
      null == r.t && (r.t = []), r.t.push(e);
      var u = compat_module_L(r.__v),
        o = !1,
        i = function () {
          o || ((o = !0), (e.__R = null), u ? u(l) : l());
        };
      e.__R = i;
      var l = function () {
          if (!--r.__u) {
            if (r.state.__a) {
              var n = r.state.__a;
              r.__v.__k[0] = (function n(t, e, r) {
                return (
                  t &&
                    ((t.__v = null),
                    (t.__k =
                      t.__k &&
                      t.__k.map(function (t) {
                        return n(t, e, r);
                      })),
                    t.__c &&
                      t.__c.__P === e &&
                      (t.__e && r.insertBefore(t.__e, t.__d), (t.__c.__e = !0), (t.__c.__P = r))),
                  t
                );
              })(n, n.__c.__P, n.__c.__O);
            }
            var t;
            for (r.setState({ __a: (r.__b = null) }); (t = r.t.pop()); ) t.forceUpdate();
          }
        },
        f = !0 === t.__h;
      r.__u++ || f || r.setState({ __a: (r.__b = r.__v.__k[0]) }), n.then(i, i);
    }),
    (compat_module_T.prototype.componentWillUnmount = function () {
      this.t = [];
    }),
    (compat_module_T.prototype.render = function (n, t) {
      if (this.__b) {
        if (this.__v.__k) {
          var e = document.createElement('div'),
            r = this.__v.__k[0].__c;
          this.__v.__k[0] = (function n(t, e, r) {
            return (
              t &&
                (t.__c &&
                  t.__c.__H &&
                  (t.__c.__H.__.forEach(function (n) {
                    'function' == typeof n.__c && n.__c();
                  }),
                  (t.__c.__H = null)),
                null != (t = compat_module_S({}, t)).__c &&
                  (t.__c.__P === r && (t.__c.__P = e), (t.__c = null)),
                (t.__k =
                  t.__k &&
                  t.__k.map(function (t) {
                    return n(t, e, r);
                  }))),
              t
            );
          })(this.__b, e, (r.__O = r.__P));
        }
        this.__b = null;
      }
      var u = t.__a && h(p, null, n.fallback);
      return u && (u.__h = null), [h(p, null, t.__a ? null : n.children), u];
    });
  var compat_module_F = function (n, t, e) {
    if (
      (++e[1] === e[0] && n.o.delete(t),
      n.props.revealOrder && ('t' !== n.props.revealOrder[0] || !n.o.size))
    )
      for (e = n.u; e; ) {
        for (; e.length > 3; ) e.pop()();
        if (e[1] < e[0]) break;
        n.u = e = e[2];
      }
  };
  function compat_module_I(n) {
    return (
      (this.getChildContext = function () {
        return n.context;
      }),
      n.children
    );
  }
  function compat_module_M(n) {
    var t = this,
      e = n.i;
    (t.componentWillUnmount = function () {
      P(null, t.l), (t.l = null), (t.i = null);
    }),
      t.i && t.i !== e && t.componentWillUnmount(),
      n.__v
        ? (t.l ||
            ((t.i = e),
            (t.l = {
              nodeType: 1,
              parentNode: e,
              childNodes: [],
              appendChild: function (n) {
                this.childNodes.push(n), t.i.appendChild(n);
              },
              insertBefore: function (n, e) {
                this.childNodes.push(n), t.i.appendChild(n);
              },
              removeChild: function (n) {
                this.childNodes.splice(this.childNodes.indexOf(n) >>> 1, 1), t.i.removeChild(n);
              },
            })),
          P(h(compat_module_I, { context: t.context }, n.__v), t.l))
        : t.l && t.componentWillUnmount();
  }
  function compat_module_V(n, t) {
    var e = h(compat_module_M, { __v: n, i: t });
    return (e.containerInfo = t), e;
  }
  ((D.prototype = new d()).__a = function (n) {
    var t = this,
      e = compat_module_L(t.__v),
      r = t.o.get(n);
    return (
      r[0]++,
      function (u) {
        var o = function () {
          t.props.revealOrder ? (r.push(u), compat_module_F(t, n, r)) : u();
        };
        e ? e(o) : o();
      }
    );
  }),
    (D.prototype.render = function (n) {
      (this.u = null), (this.o = new Map());
      var t = x(n.children);
      n.revealOrder && 'b' === n.revealOrder[0] && t.reverse();
      for (var e = t.length; e--; ) this.o.set(t[e], (this.u = [1, 0, this.u]));
      return n.children;
    }),
    (D.prototype.componentDidUpdate = D.prototype.componentDidMount =
      function () {
        var n = this;
        this.o.forEach(function (t, e) {
          compat_module_F(n, e, t);
        });
      });
  var W = ('undefined' != typeof Symbol && Symbol.for && Symbol.for('react.element')) || 60103,
    compat_module_P =
      /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,
    compat_module_$ = 'undefined' != typeof document,
    compat_module_j = function (n) {
      return (
        'undefined' != typeof Symbol && 'symbol' == typeof Symbol() ? /fil|che|rad/i : /fil|che|ra/i
      ).test(n);
    };
  function compat_module_z(n, t, e) {
    return (
      null == t.__k && (t.textContent = ''),
      P(n, t),
      'function' == typeof e && e(),
      n ? n.__c : null
    );
  }
  function compat_module_B(n, t, e) {
    return S(n, t), 'function' == typeof e && e(), n ? n.__c : null;
  }
  (d.prototype.isReactComponent = {}),
    ['componentWillMount', 'componentWillReceiveProps', 'componentWillUpdate'].forEach(function (
      n,
    ) {
      Object.defineProperty(d.prototype, n, {
        configurable: !0,
        get: function () {
          return this['UNSAFE_' + n];
        },
        set: function (t) {
          Object.defineProperty(this, n, { configurable: !0, writable: !0, value: t });
        },
      });
    });
  var compat_module_H = l.event;
  function Z() {}
  function Y() {
    return this.cancelBubble;
  }
  function compat_module_q() {
    return this.defaultPrevented;
  }
  l.event = function (n) {
    return (
      compat_module_H && (n = compat_module_H(n)),
      (n.persist = Z),
      (n.isPropagationStopped = Y),
      (n.isDefaultPrevented = compat_module_q),
      (n.nativeEvent = n)
    );
  };
  var G,
    J = {
      configurable: !0,
      get: function () {
        return this.class;
      },
    },
    K = l.vnode;
  l.vnode = function (n) {
    var t = n.type,
      e = n.props,
      r = e;
    if ('string' == typeof t) {
      var u = -1 === t.indexOf('-');
      for (var o in ((r = {}), e)) {
        var i = e[o];
        (compat_module_$ && 'children' === o && 'noscript' === t) ||
          ('value' === o && 'defaultValue' in e && null == i) ||
          ('defaultValue' === o && 'value' in e && null == e.value
            ? (o = 'value')
            : 'download' === o && !0 === i
            ? (i = '')
            : /ondoubleclick/i.test(o)
            ? (o = 'ondblclick')
            : /^onchange(textarea|input)/i.test(o + t) && !compat_module_j(e.type)
            ? (o = 'oninput')
            : /^onfocus$/i.test(o)
            ? (o = 'onfocusin')
            : /^onblur$/i.test(o)
            ? (o = 'onfocusout')
            : /^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(o)
            ? (o = o.toLowerCase())
            : u && compat_module_P.test(o)
            ? (o = o.replace(/[A-Z0-9]/g, '-$&').toLowerCase())
            : null === i && (i = void 0),
          /^oninput$/i.test(o) && ((o = o.toLowerCase()), r[o] && (o = 'oninputCapture')),
          (r[o] = i));
      }
      'select' == t &&
        r.multiple &&
        Array.isArray(r.value) &&
        (r.value = x(e.children).forEach(function (n) {
          n.props.selected = -1 != r.value.indexOf(n.props.value);
        })),
        'select' == t &&
          null != r.defaultValue &&
          (r.value = x(e.children).forEach(function (n) {
            n.props.selected = r.multiple
              ? -1 != r.defaultValue.indexOf(n.props.value)
              : r.defaultValue == n.props.value;
          })),
        (n.props = r),
        e.class != e.className &&
          ((J.enumerable = 'className' in e),
          null != e.className && (r.class = e.className),
          Object.defineProperty(r, 'className', J));
    }
    (n.$$typeof = W), K && K(n);
  };
  var Q = l.__r;
  l.__r = function (n) {
    Q && Q(n), (G = n.__c);
  };
  var X = {
      ReactCurrentDispatcher: {
        current: {
          readContext: function (n) {
            return G.__n[n.__c].props.value;
          },
        },
      },
    },
    nn = '17.0.2';
  function tn(n) {
    return h.bind(null, n);
  }
  function en(n) {
    return !!n && n.$$typeof === W;
  }
  function rn(n) {
    return en(n) ? q.apply(null, arguments) : n;
  }
  function un(n) {
    return !!n.__k && (P(null, n), !0);
  }
  function on(n) {
    return (n && (n.base || (1 === n.nodeType && n))) || null;
  }
  var ln = function (n, t) {
      return n(t);
    },
    fn = function (n, t) {
      return n(t);
    },
    cn = p;
  function an(n) {
    n();
  }
  function sn(n) {
    return n;
  }
  function hn() {
    return [!1, an];
  }
  var vn = hooks_module_h;
  function dn(t, u) {
    var o = hooks_module_p(u),
      i = o[0],
      l = o[1],
      f = u();
    return (
      hooks_module_h(
        function () {
          f !== i &&
            l(function () {
              return f;
            });
        },
        [t, f, u],
      ),
      hooks_module_(
        function () {
          return t(function () {
            l(function () {
              return u();
            });
          });
        },
        [t, u],
      ),
      i
    );
  }
  const compat_module = {
    useState: hooks_module_p,
    useReducer: hooks_module_y,
    useEffect: hooks_module_,
    useLayoutEffect: hooks_module_h,
    useInsertionEffect: hooks_module_h,
    useTransition: hn,
    useDeferredValue: sn,
    useSyncExternalStore: dn,
    startTransition: an,
    useRef: hooks_module_s,
    useImperativeHandle: hooks_module_A,
    useMemo: F,
    useCallback: hooks_module_T,
    useContext: hooks_module_q,
    useDebugValue: hooks_module_x,
    version: '17.0.2',
    Children: compat_module_k,
    render: compat_module_z,
    hydrate: compat_module_B,
    unmountComponentAtNode: un,
    createPortal: compat_module_V,
    createElement: h,
    createContext: B,
    createFactory: tn,
    cloneElement: rn,
    createRef: y,
    Fragment: p,
    isValidElement: en,
    findDOMNode: on,
    Component: d,
    PureComponent: compat_module_C,
    memo: E,
    forwardRef: R,
    flushSync: fn,
    unstable_batchedUpdates: ln,
    StrictMode: p,
    Suspense: compat_module_T,
    SuspenseList: D,
    lazy: U,
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: X,
  };
  let goober_modern_e = { data: '' },
    goober_modern_t = t =>
      'object' == typeof window
        ? (
            (t ? t.querySelector('#_goober') : window._goober) ||
            Object.assign((t || document.head).appendChild(document.createElement('style')), {
              innerHTML: ' ',
              id: '_goober',
            })
          ).firstChild
        : t || goober_modern_e,
    goober_modern_r = e => {
      let r = goober_modern_t(e),
        l = r.data;
      return (r.data = ''), l;
    },
    goober_modern_l = /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,
    goober_modern_a = /\/\*[^]*?\*\/|  +/g,
    goober_modern_n = /\n+/g,
    goober_modern_o = (e, t) => {
      let r = '',
        l = '',
        a = '';
      for (let n in e) {
        let c = e[n];
        '@' == n[0]
          ? 'i' == n[1]
            ? (r = n + ' ' + c + ';')
            : (l +=
                'f' == n[1]
                  ? goober_modern_o(c, n)
                  : n + '{' + goober_modern_o(c, 'k' == n[1] ? '' : t) + '}')
          : 'object' == typeof c
          ? (l += goober_modern_o(
              c,
              t
                ? t.replace(/([^,])+/g, e =>
                    n.replace(/(^:.*)|([^,])+/g, t =>
                      /&/.test(t) ? t.replace(/&/g, e) : e ? e + ' ' + t : t,
                    ),
                  )
                : n,
            ))
          : null != c &&
            ((n = /^--/.test(n) ? n : n.replace(/[A-Z]/g, '-$&').toLowerCase()),
            (a += goober_modern_o.p ? goober_modern_o.p(n, c) : n + ':' + c + ';'));
      }
      return r + (t && a ? t + '{' + a + '}' : a) + l;
    },
    goober_modern_c = {},
    goober_modern_s = e => {
      if ('object' == typeof e) {
        let t = '';
        for (let r in e) t += r + goober_modern_s(e[r]);
        return t;
      }
      return e;
    },
    goober_modern_i = (e, t, r, i, p) => {
      let u = goober_modern_s(e),
        d =
          goober_modern_c[u] ||
          (goober_modern_c[u] = (e => {
            let t = 0,
              r = 11;
            for (; t < e.length; ) r = (101 * r + e.charCodeAt(t++)) >>> 0;
            return 'go' + r;
          })(u));
      if (!goober_modern_c[d]) {
        let t =
          u !== e
            ? e
            : (e => {
                let t,
                  r,
                  o = [{}];
                for (; (t = goober_modern_l.exec(e.replace(goober_modern_a, ''))); )
                  t[4]
                    ? o.shift()
                    : t[3]
                    ? ((r = t[3].replace(goober_modern_n, ' ').trim()),
                      o.unshift((o[0][r] = o[0][r] || {})))
                    : (o[0][t[1]] = t[2].replace(goober_modern_n, ' ').trim());
                return o[0];
              })(e);
        goober_modern_c[d] = goober_modern_o(p ? { ['@keyframes ' + d]: t } : t, r ? '' : '.' + d);
      }
      return (
        ((e, t, r) => {
          -1 == t.data.indexOf(e) && (t.data = r ? e + t.data : t.data + e);
        })(goober_modern_c[d], t, i),
        d
      );
    },
    goober_modern_p = (e, t, r) =>
      e.reduce((e, l, a) => {
        let n = t[a];
        if (n && n.call) {
          let e = n(r),
            t = (e && e.props && e.props.className) || (/^go/.test(e) && e);
          n = t
            ? '.' + t
            : e && 'object' == typeof e
            ? e.props
              ? ''
              : goober_modern_o(e, '')
            : !1 === e
            ? ''
            : e;
        }
        return e + l + (null == n ? '' : n);
      }, '');
  function goober_modern_u(e) {
    let r = this || {},
      l = e.call ? e(r.p) : e;
    return goober_modern_i(
      l.unshift
        ? l.raw
          ? goober_modern_p(l, [].slice.call(arguments, 1), r.p)
          : l.reduce((e, t) => Object.assign(e, t && t.call ? t(r.p) : t), {})
        : l,
      goober_modern_t(r.target),
      r.g,
      r.o,
      r.k,
    );
  }
  let goober_modern_d,
    goober_modern_f,
    goober_modern_g,
    goober_modern_b = goober_modern_u.bind({ g: 1 }),
    goober_modern_h = goober_modern_u.bind({ k: 1 });
  function goober_modern_m(e, t, r, l) {
    (goober_modern_o.p = t), (goober_modern_d = e), (goober_modern_f = r), (goober_modern_g = l);
  }
  function goober_modern_j(e, t) {
    let r = this || {};
    return function () {
      let l = arguments;
      function a(n, o) {
        let c = Object.assign({}, n),
          s = c.className || a.className;
        (r.p = Object.assign({ theme: goober_modern_f && goober_modern_f() }, c)),
          (r.o = / *go\d+/.test(s)),
          (c.className = goober_modern_u.apply(r, l) + (s ? ' ' + s : '')),
          t && (c.ref = o);
        let i = e;
        return (
          e[0] && ((i = c.as || e), delete c.as),
          goober_modern_g && i[0] && goober_modern_g(c),
          goober_modern_d(i, c)
        );
      }
      return t ? t(a) : a;
    };
  }

  const StylesContext = compat_module.createContext({
    css: goober_modern_u,
    glob: goober_modern_b,
  });
  const StylesProvider = ({ children, target }) => {
    return React.createElement(
      StylesContext.Provider,
      {
        value: {
          css: Goober.css.bind({ target }),
          glob: Goober.css.bind({ g: 1, target }),
        },
      },
      children,
    );
  };
  function useCSS() {
    const { css } = hooks_module_q(StylesContext);
    return css;
  }
  function useGlob() {
    const { glob } = hooks_module_q(StylesContext);
    return glob;
  }

  const darkTheme = {
    name: 'dark',
    background: 'rgb(32, 33, 36)',
    button: {
      primary: {
        background: 'rgb(138, 180, 248)',
        backgroundActive: 'rgba(138, 180, 248, 0.8)',
        backgroundDisabled: 'rgb(60, 64, 67)',
        backgroundHovered: 'rgba(138, 180, 248, 0.9)',
        text: 'rgb(32, 33, 36)',
        textDisabled: 'rgb(128, 134, 139)',
      },
      secondary: {
        background: 'transparent',
        backgroundActive: 'rgba(138, 180, 248, 0.16)',
        backgroundDisabled: 'transparent',
        backgroundHovered: 'rgba(138, 180, 248, 0.08)',
        border: 'rgb(95, 99, 104)',
        text: 'rgb(138, 180, 248)',
        textDisabled: 'rgb(128, 134, 139)',
      },
    },
    checkBox: {
      border: 'rgb(154, 160, 166)',
      box: 'rgb(138, 180, 248)',
      checkMark: 'rgb(32, 33, 36)',
    },
    colorPicker: {
      border: 'rgb(95, 99, 104)',
      popoverBackground: 'rgb(41, 42, 45)',
    },
    dialog: {
      background: 'rgb(41, 42, 45)',
    },
    editor: {
      border: 'rgb(95, 99, 104)',
      background: 'rgb(29, 31, 33)',
      text: 'rgb(197, 200, 198)',
      lineNumber: 'rgb(55, 59, 65)',
      activeLineNumber: 'rgb(240, 198, 116)',
      selectionBackground: 'rgb(55, 59, 65)',
      annotation: 'rgb(129, 162, 190)',
      regexp: 'rgb(181, 189, 104)',
      comment: 'rgb(112, 120, 128)',
    },
    focus: {
      shadow: 'rgba(138, 180, 248, 0.5)',
      circle: 'rgba(138, 180, 248, 0.4)',
    },
    iconButton: 'rgb(154, 160, 166)',
    input: {
      border: 'rgb(95, 99, 104)',
    },
    link: {
      text: 'rgb(138, 180, 248)',
    },
    menu: {
      itemBackgroundFocused: 'rgba(95, 99, 104, 0.6)',
      itemBackgroundHovered: 'rgba(95, 99, 104, 0.3)',
      itemListBackground: 'rgb(41, 42, 45)',
    },
    radioButton: {
      unchecked: 'rgb(154, 160, 166)',
      checked: 'rgb(138, 180, 248)',
    },
    section: {
      background: 'rgb(41, 42, 45)',
      shadow1: 'rgba(0, 0, 0, 0.3)',
      shadow2: 'rgba(0, 0, 0, 0.15)',
    },
    select: {
      arrow: 'rgb(154, 160, 166)',
      border: 'rgb(95, 99, 104)',
      optionBackground: 'rgb(41, 42, 45)',
    },
    separator: 'rgba(255, 255, 255, 0.1)',
    switch: {
      bar: 'rgb(154, 160, 166)',
      barChecked: 'rgba(138, 180, 248, 0.5)',
      knob: 'rgb(218, 220, 224)',
      knobChecked: 'rgb(138, 180, 248)',
    },
    text: {
      primary: 'rgb(232, 234, 237)',
      secondary: 'rgb(154, 160, 166)',
    },
    textArea: {
      border: 'rgb(95, 99, 104)',
    },
  };
  const lightTheme = {
    name: 'light',
    background: 'rgb(248, 249, 250)',
    button: {
      primary: {
        background: 'rgb(26, 115, 232)',
        backgroundActive: 'rgba(26, 115, 232, 0.8)',
        backgroundDisabled: 'rgb(241, 243, 244)',
        backgroundHovered: 'rgba(26, 115, 232, 0.9)',
        text: 'white',
        textDisabled: 'rgb(128, 134, 139)',
      },
      secondary: {
        background: 'transparent',
        backgroundActive: 'rgba(66, 133, 244, 0.08)',
        backgroundDisabled: 'transparent',
        backgroundHovered: 'rgba(66, 133, 244, 0.04)',
        border: 'rgb(218, 220, 224)',
        text: 'rgb(26, 115, 232)',
        textDisabled: 'rgb(128, 134, 139)',
      },
    },
    checkBox: {
      border: 'rgb(95, 99, 104)',
      box: 'rgb(26, 115, 232)',
      checkMark: 'white',
    },
    colorPicker: {
      border: 'rgb(218, 220, 224)',
      popoverBackground: 'white',
    },
    dialog: {
      background: 'white',
    },
    editor: {
      border: 'rgb(218, 220, 224)',
      background: 'rgb(255, 255, 255)',
      text: 'rgb(0, 0, 0)',
      lineNumber: 'rgb(210, 210, 210)',
      activeLineNumber: 'rgb(106, 106, 0)',
      selectionBackground: 'rgb(210, 210, 210)',
      annotation: 'rgb(0, 0, 106)',
      regexp: 'rgb(0, 106, 0)',
      comment: 'rgb(106, 106, 106)',
    },
    focus: {
      shadow: 'rgba(26, 115, 232, 0.4)',
      circle: 'rgba(26, 115, 232, 0.2)',
    },
    iconButton: 'rgb(95, 99, 104)',
    input: {
      border: 'rgb(218, 220, 224)',
    },
    link: {
      text: 'rgb(51, 103, 214)',
    },
    menu: {
      itemBackgroundFocused: 'rgba(189, 193, 198, 0.3)',
      itemBackgroundHovered: 'rgba(189, 193, 198, 0.15)',
      itemListBackground: 'white',
    },
    radioButton: {
      unchecked: 'rgb(95, 99, 104)',
      checked: 'rgb(26, 115, 232)',
    },
    section: {
      background: 'white',
      shadow1: 'rgba(60, 64, 67, 0.3)',
      shadow2: 'rgba(60, 64, 67, 0.15)',
    },
    select: {
      arrow: 'rgb(95, 99, 104)',
      border: 'rgb(218, 220, 224)',
      optionBackground: 'white',
    },
    separator: 'rgba(0, 0, 0, 0.06)',
    switch: {
      bar: 'rgb(189, 193, 198)',
      barChecked: 'rgba(26, 115, 232, 0.5)',
      knob: 'white',
      knobBorder: 'rgb(218, 220, 224)',
      knobChecked: 'rgb(26, 115, 232)',
    },
    text: {
      primary: 'rgb(32, 33, 36)',
      secondary: 'rgb(95, 99, 104)',
    },
    textArea: {
      border: 'rgb(218, 220, 224)',
    },
  };
  const ThemeContext = compat_module.createContext({ theme: lightTheme });
  const ThemeProvider = ({ children, theme }) => {
    return compat_module.createElement(
      ThemeContext.Provider,
      {
        value: { theme },
      },
      children,
    );
  };
  function useTheme() {
    const { theme } = hooks_module_q(ThemeContext);
    return theme;
  }
  const AutoThemeProvider = ({ children }) => {
    const preferDark = hooks_module_s(window.matchMedia('(prefers-color-scheme: dark)'));
    const [dark, setDark] = hooks_module_p(preferDark.current.matches);
    hooks_module_(() => {
      preferDark.current.addEventListener('change', e => {
        setDark(e.matches);
      });
    }, []);
    return compat_module.createElement(
      ThemeProvider,
      {
        theme: dark ? darkTheme : lightTheme,
      },
      children,
    );
  };

  function utilities_useClassName(props, deps) {
    const css = useCSS();
    const theme = useTheme();
    const className = F(() => css(props(theme)), deps ? [css, theme, ...deps] : void 0);
    return className;
  }
  function usePrevious(value, defaultValue) {
    const previousRef = hooks_module_s(defaultValue);
    const previous = previousRef.current;
    previousRef.current = value;
    return previous;
  }

  const fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif';
  const Baseline = ({ children, fontSize = '13px' }) => {
    const rootClassName = utilities_useClassName(
      theme => ({
        colorScheme: theme.name,
      }),
      [],
    );
    const bodyClassName = utilities_useClassName(
      theme => ({
        background: theme.background,
        color: theme.text.primary,
        margin: 0,
        fontFamily,
        fontSize,
        lineHeight: 1.5,
      }),
      [fontSize],
    );
    hooks_module_h(() => {
      document.documentElement.classList.add(rootClassName);
      document.body.classList.add(bodyClassName);
      return () => {
        document.documentElement.classList.remove(rootClassName);
        document.body.classList.remove(bodyClassName);
      };
    }, [rootClassName, bodyClassName]);
    const glob = useGlob();
    hooks_module_h(() => {
      glob({
        '*, *::before, *::after': {
          boxSizing: 'border-box',
        },
      });
    }, [glob]);
    return compat_module.createElement(compat_module.Fragment, null, children);
  };
  const ScopedBaseline = ({ children, fontSize = '13px' }) => {
    const className = useClassName(
      theme => ({
        color: theme.text.primary,
        colorScheme: theme.name,
        fontFamily,
        fontSize,
        lineHeight: 1.5,
        '& *, & *::before, & *::after': {
          boxSizing: 'border-box',
        },
      }),
      [fontSize],
    );
    return React.createElement(
      'div',
      {
        className,
      },
      children,
    );
  };

  function applyClassName(props, className) {
    return {
      ...props,
      className: `${className}${props.className ? ` ${props.className}` : ''}`,
    };
  }
  function useInnerRef(ref) {
    const innerRef = hooks_module_s(null);
    hooks_module_h(() => {
      if (ref && typeof ref === 'object' && innerRef.current != null) {
        ref.current = innerRef.current;
      }
    }, [ref]);
    return innerRef;
  }
  const FocusCircle = ({ depth = 0 }) => {
    const className = utilities_useClassName(
      theme => ({
        borderRadius: '50%',
        height: '40px',
        left: `calc(50% - 20px)`,
        pointerEvents: 'none',
        position: 'absolute',
        top: `calc(50% - 20px)`,
        width: '40px',
        [`:focus + ${'* > '.repeat(depth)}&`]: {
          background: theme.focus.circle,
        },
        [`:focus:not(:focus-visible) + ${'* > '.repeat(depth)}&`]: {
          background: 'transparent',
        },
        [`:focus:not(:-moz-focusring) + ${'* > '.repeat(depth)}&`]: {
          background: 'transparent',
        },
      }),
      [depth],
    );
    return compat_module.createElement('div', {
      className,
    });
  };

  const Container = compat_module.forwardRef(function Container2(
    { width = '640px', ...props },
    ref,
  ) {
    const wrapperClassName = utilities_useClassName(
      () => ({
        bottom: 0,
        left: 0,
        overflow: 'auto',
        position: 'fixed',
        right: 0,
        top: 0,
      }),
      [],
    );
    const containerClassName = utilities_useClassName(
      () => ({
        margin: '0 auto',
        maxWidth: '100%',
        padding: '2em 0',
        width,
      }),
      [width],
    );
    return compat_module.createElement(
      'div',
      {
        className: wrapperClassName,
      },
      compat_module.createElement('div', {
        ...applyClassName(props, containerClassName),
        ref,
      }),
    );
  });

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

  const icon_namespaceObject =
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4Ij48Y2lyY2xlIGN4PSI2NCIgY3k9IjY0IiByPSI2NCIgZmlsbD0iI2ZmZiIvPjxjaXJjbGUgY3g9IjY0IiBjeT0iNjQiIHI9IjQ4IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMTYiLz48cGF0aCBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMTYiIGQ9Ik05NiAzMkwzMiA5NiIvPjwvc3ZnPg==';
  const Icon = compat_module.forwardRef(function Icon2({ iconSize = '24px', url, ...props }, ref) {
    const className = utilities_useClassName(
      () => ({
        background: `url("${url}") center / ${iconSize} no-repeat`,
        display: 'block',
        height: iconSize,
        width: iconSize,
      }),
      [iconSize, url],
    );
    return compat_module.createElement('span', {
      ...applyClassName(props, className),
      ref,
    });
  });
  const TemplateIcon = compat_module.forwardRef(function TemplateIcon2(
    { color = 'black', iconSize = '24px', url, ...props },
    ref,
  ) {
    const className = utilities_useClassName(
      () => ({
        backgroundColor: color,
        display: 'block',
        height: iconSize,
        mask: `url("${url}") center / ${iconSize} no-repeat`,
        WebkitMask: `url("${url}") center / ${iconSize} no-repeat`,
        width: iconSize,
      }),
      [color, iconSize, url],
    );
    return compat_module.createElement('span', {
      ...applyClassName(props, className),
      ref,
    });
  });

  const Indent = compat_module.forwardRef(function Indent2({ depth = 1, ...props }, ref) {
    const className = utilities_useClassName(
      () => ({
        width: `${2.375 * depth}em`,
      }),
      [depth],
    );
    return compat_module.createElement('div', {
      ...applyClassName(props, className),
      ref,
    });
  });

  const FOCUS_START_CLASS = 'js-focus-start';
  const FOCUS_END_CLASS = 'js-focus-end';
  const FOCUS_DEFAULT_CLASS = 'js-focus-default';
  const MENU_ITEM_CLASS = 'js-menu-item';
  const DISABLED_OPACITY = 0.38;
  const INPUT_Z_INDEX = 1;
  const COLOR_PICKER_Z_INDEX = 2;
  const MENU_Z_INDEX = 2;
  const DIALOG_Z_INDEX = 1e5;

  const LabelContext = compat_module.createContext(null);
  function useLabelContext() {
    const value = hooks_module_q(LabelContext);
    if (!value) {
      throw new Error('useLabelContext: no matching provider');
    }
    return value;
  }
  const LabelWrapper = compat_module.forwardRef(function LabelWrapper2(
    { disabled = false, fullWidth = false, ...props },
    ref,
  ) {
    const className = utilities_useClassName(
      () => ({
        marginBottom: fullWidth ? '0.5em' : 0,
        opacity: disabled ? DISABLED_OPACITY : 1,
      }),
      [disabled, fullWidth],
    );
    return compat_module.createElement(
      LabelContext.Provider,
      {
        value: { disabled },
      },
      compat_module.createElement('div', {
        ...applyClassName(props, className),
        ref,
      }),
    );
  });
  const Label = compat_module.forwardRef(function Label2(props, ref) {
    const { disabled } = useLabelContext();
    const className = utilities_useClassName(
      theme => ({
        color: theme.text.primary,
        cursor: disabled ? 'default' : 'auto',
      }),
      [disabled],
    );
    return compat_module.createElement(
      'div',
      null,
      compat_module.createElement('span', {
        ...applyClassName(props, className),
        ref,
      }),
    );
  });
  const ControlLabel = compat_module.forwardRef(function ControlLabel2(
    { children, for: for_, ...props },
    ref,
  ) {
    const { disabled } = useLabelContext();
    const className = utilities_useClassName(
      theme => ({
        color: theme.text.primary,
        cursor: disabled ? 'default' : 'pointer',
      }),
      [disabled],
    );
    return compat_module.createElement(
      'div',
      null,
      compat_module.createElement(
        'label',
        {
          ...applyClassName(props, className),
          htmlFor: for_,
          ref,
        },
        children,
      ),
    );
  });
  const SubLabel = compat_module.forwardRef(function SubLabel2(props, ref) {
    const { disabled } = useLabelContext();
    const className = utilities_useClassName(
      theme => ({
        color: theme.text.secondary,
        cursor: disabled ? 'default' : 'auto',
      }),
      [disabled],
    );
    return compat_module.createElement(
      'div',
      null,
      compat_module.createElement('span', {
        ...applyClassName(props, className),
        ref,
      }),
    );
  });

  const Link = compat_module.forwardRef(function Link2({ disabled = false, ...props }, ref) {
    const className = utilities_useClassName(
      theme => ({
        color: theme.link.text,
        outline: 'none',
        textDecoration: 'none',
        '&:focus': {
          boxShadow: `0 0 0 2px ${theme.focus.shadow}`,
        },
        '&:focus:not(:focus-visible)': {
          boxShadow: 'none',
        },
        '&:focus:not(:-moz-focusring)': {
          boxShadow: 'none',
        },
      }),
      [],
    );
    return compat_module.createElement('a', {
      ...applyClassName(props, className),
      ...(disabled ? {} : { href: props.href }),
      ref,
      rel: 'noopener noreferrer',
      target: '_blank',
    });
  });
  function expandLinks(text, disabled = false) {
    const children = [];
    const split = text.split(/\[([^\]]*)]\(([^)]*)\)/g);
    for (let i = 0; i < split.length; ++i) {
      if (i % 3 === 0) {
        children.push(split[i]);
      } else if (i % 3 === 1) {
        children.push(
          compat_module.createElement(
            Link,
            {
              disabled,
              href: split[i + 1],
            },
            split[i],
          ),
        );
        ++i;
      }
    }
    return compat_module.createElement(compat_module.Fragment, null, children);
  }

  const Row = compat_module.forwardRef(function Row2(
    { multiline = false, right = false, ...props },
    ref,
  ) {
    const className = utilities_useClassName(
      () => ({
        alignItems: 'center',
        display: 'flex',
        flexWrap: multiline ? 'wrap' : 'nowrap',
        justifyContent: right ? 'flex-end' : 'flex-start',
        '&:not(:first-child)': {
          marginTop: '1em',
        },
      }),
      [multiline, right],
    );
    return compat_module.createElement('div', {
      ...applyClassName(props, className),
      ref,
    });
  });
  const RowItem = compat_module.forwardRef(function RowItem2({ expanded = false, ...props }, ref) {
    const className = utilities_useClassName(
      () => ({
        flexGrow: expanded ? 1 : 0,
        flexShrink: expanded ? 1 : 0,
        minWidth: 0,
        '&:not(:first-child)': {
          marginLeft: '0.625em',
        },
      }),
      [expanded],
    );
    return compat_module.createElement('div', {
      ...applyClassName(props, className),
      ref,
    });
  });

  const Section = compat_module.forwardRef(function Section2(props, ref) {
    const className = utilities_useClassName(
      () => ({
        '&:not(:first-child)': {
          marginTop: '2em',
        },
      }),
      [],
    );
    return compat_module.createElement('section', {
      ...applyClassName(props, className),
      ref,
    });
  });
  const SectionHeader = compat_module.forwardRef(function SectionHeader2(
    { maxWidth = '640px', ...props },
    ref,
  ) {
    const className = utilities_useClassName(
      () => ({
        marginBottom: '1em',
        [`@media screen and (max-width: ${maxWidth})`]: {
          padding: '0 1.25em',
        },
      }),
      [maxWidth],
    );
    return compat_module.createElement('div', {
      ...applyClassName(props, className),
      ref,
    });
  });
  const SectionTitle = compat_module.forwardRef(function SectionTitle2(
    { children, ...props },
    ref,
  ) {
    const className = utilities_useClassName(
      () => ({
        fontSize: '1.125em',
        fontWeight: 'normal',
        margin: 0,
      }),
      [],
    );
    return compat_module.createElement(
      'h1',
      {
        ...applyClassName(props, className),
        ref,
      },
      children,
    );
  });
  const SectionBody = compat_module.forwardRef(function SectionBody2(props, ref) {
    const className = utilities_useClassName(
      theme => ({
        background: theme.section.background,
        borderRadius: '4px',
        boxShadow: `0 1px 2px 0 ${theme.section.shadow1}, 0 1px 3px 1px ${theme.section.shadow2}`,
      }),
      [],
    );
    return compat_module.createElement('div', {
      ...applyClassName(props, className),
      ref,
    });
  });
  const SectionItem = compat_module.forwardRef(function SectionItem2(props, ref) {
    const className = utilities_useClassName(
      theme => ({
        padding: '0.75em 1.25em',
        '&:not(:first-child)': {
          borderTop: `solid 1px ${theme.separator}`,
        },
      }),
      [],
    );
    return compat_module.createElement('div', {
      ...applyClassName(props, className),
      ref,
    });
  });

  const AboutSection = () => {
    const version = F(() => browser_browser.runtime.getManifest().version, []);
    const thirdPartyNoticesURL = F(
      () => browser_browser.runtime.getURL('third-party-notices.txt'),
      [],
    );
    const nameClassName = utilities_useClassName(
      () => ({
        fontSize: '1.5em',
      }),
      [],
    );
    return compat_module.createElement(
      Section,
      {
        'aria-labelledby': 'aboutSectionTitle',
        id: 'about',
      },
      compat_module.createElement(
        SectionHeader,
        null,
        compat_module.createElement(
          SectionTitle,
          {
            id: 'aboutSectionTitle',
          },
          translate('options_aboutTitle'),
        ),
      ),
      compat_module.createElement(
        SectionBody,
        null,
        compat_module.createElement(
          SectionItem,
          null,
          compat_module.createElement(
            Row,
            null,
            compat_module.createElement(
              RowItem,
              null,
              compat_module.createElement(
                Indent,
                {
                  depth: 1.5,
                },
                compat_module.createElement(Icon, {
                  iconSize: '36px',
                  url: icon_namespaceObject,
                }),
              ),
            ),
            compat_module.createElement(
              RowItem,
              {
                expanded: true,
              },
              compat_module.createElement(
                LabelWrapper,
                null,
                compat_module.createElement(
                  Label,
                  {
                    className: nameClassName,
                  },
                  translate('extensionName'),
                ),
                compat_module.createElement(
                  SubLabel,
                  null,
                  `${translate('options_aboutVersion')}: ${version}`,
                ),
                compat_module.createElement(
                  SubLabel,
                  null,
                  compat_module.createElement(
                    Link,
                    {
                      href: getWebsiteURL('/docs'),
                    },
                    translate('options_aboutDocumentation'),
                  ),
                  ' / ',
                  compat_module.createElement(
                    Link,
                    {
                      href: 'https://github.com/iorate/ublacklist/releases',
                    },
                    translate('options_aboutReleaseNotes'),
                  ),
                  ' / ',
                  compat_module.createElement(
                    Link,
                    {
                      href: getWebsiteURL('/privacy-policy'),
                    },
                    translate('options_aboutPrivacyPolicy'),
                  ),
                  ' / ',
                  compat_module.createElement(
                    Link,
                    {
                      href: thirdPartyNoticesURL,
                    },
                    translate('options_aboutThirdPartyNotices'),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  };

  const delete_namespaceObject =
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJtZGktZGVsZXRlIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGQ9Ik0xOSw0SDE1LjVMMTQuNSwzSDkuNUw4LjUsNEg1VjZIMTlNNiwxOUEyLDIgMCAwLDAgOCwyMUgxNkEyLDIgMCAwLDAgMTgsMTlWN0g2VjE5WiIgLz48L3N2Zz4=';
  const plus_namespaceObject =
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJtZGktcGx1cyIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTksMTNIMTNWMTlIMTFWMTNINVYxMUgxMVY1SDEzVjExSDE5VjEzWiIgLz48L3N2Zz4=';
  var colord_r = { grad: 0.9, turn: 360, rad: 360 / (2 * Math.PI) },
    colord_t = function (r) {
      return 'string' == typeof r ? r.length > 0 : 'number' == typeof r;
    },
    colord_n = function (r, t, n) {
      return (
        void 0 === t && (t = 0), void 0 === n && (n = Math.pow(10, t)), Math.round(n * r) / n + 0
      );
    },
    colord_e = function (r, t, n) {
      return void 0 === t && (t = 0), void 0 === n && (n = 1), r > n ? n : r > t ? r : t;
    },
    colord_u = function (r) {
      return (r = isFinite(r) ? r % 360 : 0) > 0 ? r : r + 360;
    },
    colord_a = function (r) {
      return {
        r: colord_e(r.r, 0, 255),
        g: colord_e(r.g, 0, 255),
        b: colord_e(r.b, 0, 255),
        a: colord_e(r.a),
      };
    },
    colord_o = function (r) {
      return { r: colord_n(r.r), g: colord_n(r.g), b: colord_n(r.b), a: colord_n(r.a, 3) };
    },
    colord_i = /^#([0-9a-f]{3,8})$/i,
    colord_s = function (r) {
      var t = r.toString(16);
      return t.length < 2 ? '0' + t : t;
    },
    colord_h = function (r) {
      var t = r.r,
        n = r.g,
        e = r.b,
        u = r.a,
        a = Math.max(t, n, e),
        o = a - Math.min(t, n, e),
        i = o ? (a === t ? (n - e) / o : a === n ? 2 + (e - t) / o : 4 + (t - n) / o) : 0;
      return { h: 60 * (i < 0 ? i + 6 : i), s: a ? (o / a) * 100 : 0, v: (a / 255) * 100, a: u };
    },
    colord_b = function (r) {
      var t = r.h,
        n = r.s,
        e = r.v,
        u = r.a;
      (t = (t / 360) * 6), (n /= 100), (e /= 100);
      var a = Math.floor(t),
        o = e * (1 - n),
        i = e * (1 - (t - a) * n),
        s = e * (1 - (1 - t + a) * n),
        h = a % 6;
      return {
        r: 255 * [e, i, o, o, s, e][h],
        g: 255 * [s, e, e, i, o, o][h],
        b: 255 * [o, o, s, e, e, i][h],
        a: u,
      };
    },
    colord_g = function (r) {
      return {
        h: colord_u(r.h),
        s: colord_e(r.s, 0, 100),
        l: colord_e(r.l, 0, 100),
        a: colord_e(r.a),
      };
    },
    colord_d = function (r) {
      return { h: colord_n(r.h), s: colord_n(r.s), l: colord_n(r.l), a: colord_n(r.a, 3) };
    },
    colord_f = function (r) {
      return colord_b(
        ((n = (t = r).s),
        {
          h: t.h,
          s: (n *= ((e = t.l) < 50 ? e : 100 - e) / 100) > 0 ? ((2 * n) / (e + n)) * 100 : 0,
          v: e + n,
          a: t.a,
        }),
      );
      var t, n, e;
    },
    colord_c = function (r) {
      return {
        h: (t = colord_h(r)).h,
        s:
          (u = ((200 - (n = t.s)) * (e = t.v)) / 100) > 0 && u < 200
            ? ((n * e) / 100 / (u <= 100 ? u : 200 - u)) * 100
            : 0,
        l: u / 2,
        a: t.a,
      };
      var t, n, e, u;
    },
    colord_l =
      /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,
    colord_p =
      /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,
    colord_v =
      /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,
    colord_m =
      /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,
    colord_y = {
      string: [
        [
          function (r) {
            var t = colord_i.exec(r);
            return t
              ? (r = t[1]).length <= 4
                ? {
                    r: parseInt(r[0] + r[0], 16),
                    g: parseInt(r[1] + r[1], 16),
                    b: parseInt(r[2] + r[2], 16),
                    a: 4 === r.length ? colord_n(parseInt(r[3] + r[3], 16) / 255, 2) : 1,
                  }
                : 6 === r.length || 8 === r.length
                ? {
                    r: parseInt(r.substr(0, 2), 16),
                    g: parseInt(r.substr(2, 2), 16),
                    b: parseInt(r.substr(4, 2), 16),
                    a: 8 === r.length ? colord_n(parseInt(r.substr(6, 2), 16) / 255, 2) : 1,
                  }
                : null
              : null;
          },
          'hex',
        ],
        [
          function (r) {
            var t = colord_v.exec(r) || colord_m.exec(r);
            return t
              ? t[2] !== t[4] || t[4] !== t[6]
                ? null
                : colord_a({
                    r: Number(t[1]) / (t[2] ? 100 / 255 : 1),
                    g: Number(t[3]) / (t[4] ? 100 / 255 : 1),
                    b: Number(t[5]) / (t[6] ? 100 / 255 : 1),
                    a: void 0 === t[7] ? 1 : Number(t[7]) / (t[8] ? 100 : 1),
                  })
              : null;
          },
          'rgb',
        ],
        [
          function (t) {
            var n = colord_l.exec(t) || colord_p.exec(t);
            if (!n) return null;
            var e,
              u,
              a = colord_g({
                h:
                  ((e = n[1]),
                  (u = n[2]),
                  void 0 === u && (u = 'deg'),
                  Number(e) * (colord_r[u] || 1)),
                s: Number(n[3]),
                l: Number(n[4]),
                a: void 0 === n[5] ? 1 : Number(n[5]) / (n[6] ? 100 : 1),
              });
            return colord_f(a);
          },
          'hsl',
        ],
      ],
      object: [
        [
          function (r) {
            var n = r.r,
              e = r.g,
              u = r.b,
              o = r.a,
              i = void 0 === o ? 1 : o;
            return colord_t(n) && colord_t(e) && colord_t(u)
              ? colord_a({ r: Number(n), g: Number(e), b: Number(u), a: Number(i) })
              : null;
          },
          'rgb',
        ],
        [
          function (r) {
            var n = r.h,
              e = r.s,
              u = r.l,
              a = r.a,
              o = void 0 === a ? 1 : a;
            if (!colord_t(n) || !colord_t(e) || !colord_t(u)) return null;
            var i = colord_g({ h: Number(n), s: Number(e), l: Number(u), a: Number(o) });
            return colord_f(i);
          },
          'hsl',
        ],
        [
          function (r) {
            var n = r.h,
              a = r.s,
              o = r.v,
              i = r.a,
              s = void 0 === i ? 1 : i;
            if (!colord_t(n) || !colord_t(a) || !colord_t(o)) return null;
            var h = (function (r) {
              return {
                h: colord_u(r.h),
                s: colord_e(r.s, 0, 100),
                v: colord_e(r.v, 0, 100),
                a: colord_e(r.a),
              };
            })({ h: Number(n), s: Number(a), v: Number(o), a: Number(s) });
            return colord_b(h);
          },
          'hsv',
        ],
      ],
    },
    colord_N = function (r, t) {
      for (var n = 0; n < t.length; n++) {
        var e = t[n][0](r);
        if (e) return [e, t[n][1]];
      }
      return [null, void 0];
    },
    colord_x = function (r) {
      return 'string' == typeof r
        ? colord_N(r.trim(), colord_y.string)
        : 'object' == typeof r && null !== r
        ? colord_N(r, colord_y.object)
        : [null, void 0];
    },
    colord_I = function (r) {
      return colord_x(r)[1];
    },
    colord_M = function (r, t) {
      var n = colord_c(r);
      return { h: n.h, s: colord_e(n.s + 100 * t, 0, 100), l: n.l, a: n.a };
    },
    colord_H = function (r) {
      return (299 * r.r + 587 * r.g + 114 * r.b) / 1e3 / 255;
    },
    colord_$ = function (r, t) {
      var n = colord_c(r);
      return { h: n.h, s: n.s, l: colord_e(n.l + 100 * t, 0, 100), a: n.a };
    },
    colord_j = (function () {
      function r(r) {
        (this.parsed = colord_x(r)[0]), (this.rgba = this.parsed || { r: 0, g: 0, b: 0, a: 1 });
      }
      return (
        (r.prototype.isValid = function () {
          return null !== this.parsed;
        }),
        (r.prototype.brightness = function () {
          return colord_n(colord_H(this.rgba), 2);
        }),
        (r.prototype.isDark = function () {
          return colord_H(this.rgba) < 0.5;
        }),
        (r.prototype.isLight = function () {
          return colord_H(this.rgba) >= 0.5;
        }),
        (r.prototype.toHex = function () {
          return (
            (r = colord_o(this.rgba)),
            (t = r.r),
            (e = r.g),
            (u = r.b),
            (i = (a = r.a) < 1 ? colord_s(colord_n(255 * a)) : ''),
            '#' + colord_s(t) + colord_s(e) + colord_s(u) + i
          );
          var r, t, e, u, a, i;
        }),
        (r.prototype.toRgb = function () {
          return colord_o(this.rgba);
        }),
        (r.prototype.toRgbString = function () {
          return (
            (r = colord_o(this.rgba)),
            (t = r.r),
            (n = r.g),
            (e = r.b),
            (u = r.a) < 1
              ? 'rgba(' + t + ', ' + n + ', ' + e + ', ' + u + ')'
              : 'rgb(' + t + ', ' + n + ', ' + e + ')'
          );
          var r, t, n, e, u;
        }),
        (r.prototype.toHsl = function () {
          return colord_d(colord_c(this.rgba));
        }),
        (r.prototype.toHslString = function () {
          return (
            (r = colord_d(colord_c(this.rgba))),
            (t = r.h),
            (n = r.s),
            (e = r.l),
            (u = r.a) < 1
              ? 'hsla(' + t + ', ' + n + '%, ' + e + '%, ' + u + ')'
              : 'hsl(' + t + ', ' + n + '%, ' + e + '%)'
          );
          var r, t, n, e, u;
        }),
        (r.prototype.toHsv = function () {
          return (
            (r = colord_h(this.rgba)),
            { h: colord_n(r.h), s: colord_n(r.s), v: colord_n(r.v), a: colord_n(r.a, 3) }
          );
          var r;
        }),
        (r.prototype.invert = function () {
          return colord_w({ r: 255 - (r = this.rgba).r, g: 255 - r.g, b: 255 - r.b, a: r.a });
          var r;
        }),
        (r.prototype.saturate = function (r) {
          return void 0 === r && (r = 0.1), colord_w(colord_M(this.rgba, r));
        }),
        (r.prototype.desaturate = function (r) {
          return void 0 === r && (r = 0.1), colord_w(colord_M(this.rgba, -r));
        }),
        (r.prototype.grayscale = function () {
          return colord_w(colord_M(this.rgba, -1));
        }),
        (r.prototype.lighten = function (r) {
          return void 0 === r && (r = 0.1), colord_w(colord_$(this.rgba, r));
        }),
        (r.prototype.darken = function (r) {
          return void 0 === r && (r = 0.1), colord_w(colord_$(this.rgba, -r));
        }),
        (r.prototype.rotate = function (r) {
          return void 0 === r && (r = 15), this.hue(this.hue() + r);
        }),
        (r.prototype.alpha = function (r) {
          return 'number' == typeof r
            ? colord_w({ r: (t = this.rgba).r, g: t.g, b: t.b, a: r })
            : colord_n(this.rgba.a, 3);
          var t;
        }),
        (r.prototype.hue = function (r) {
          var t = colord_c(this.rgba);
          return 'number' == typeof r ? colord_w({ h: r, s: t.s, l: t.l, a: t.a }) : colord_n(t.h);
        }),
        (r.prototype.isEqual = function (r) {
          return this.toHex() === colord_w(r).toHex();
        }),
        r
      );
    })(),
    colord_w = function (r) {
      return r instanceof colord_j ? r : new colord_j(r);
    },
    colord_S = null && [],
    colord_k = function (r) {
      r.forEach(function (r) {
        colord_S.indexOf(r) < 0 && (r(colord_j, colord_y), colord_S.push(r));
      });
    },
    colord_E = function () {
      return new colord_j({
        r: 255 * Math.random(),
        g: 255 * Math.random(),
        b: 255 * Math.random(),
      });
    };

  function index_module_u() {
    return (index_module_u =
      Object.assign ||
      function (e) {
        for (var r = 1; r < arguments.length; r++) {
          var t = arguments[r];
          for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        }
        return e;
      }).apply(this, arguments);
  }
  function index_module_c(e, r) {
    if (null == e) return {};
    var t,
      n,
      o = {},
      a = Object.keys(e);
    for (n = 0; n < a.length; n++) r.indexOf((t = a[n])) >= 0 || (o[t] = e[t]);
    return o;
  }
  function index_module_i(e) {
    var t = hooks_module_s(e),
      n = hooks_module_s(function (e) {
        t.current && t.current(e);
      });
    return (t.current = e), n.current;
  }
  var index_module_s = function (e, r, t) {
      return void 0 === r && (r = 0), void 0 === t && (t = 1), e > t ? t : e < r ? r : e;
    },
    index_module_f = function (e) {
      return 'touches' in e;
    },
    index_module_v = function (e) {
      return (e && e.ownerDocument.defaultView) || self;
    },
    index_module_d = function (e, r, t) {
      var n = e.getBoundingClientRect(),
        o = index_module_f(r)
          ? (function (e, r) {
              for (var t = 0; t < e.length; t++) if (e[t].identifier === r) return e[t];
              return e[0];
            })(r.touches, t)
          : r;
      return {
        left: index_module_s((o.pageX - (n.left + index_module_v(e).pageXOffset)) / n.width),
        top: index_module_s((o.pageY - (n.top + index_module_v(e).pageYOffset)) / n.height),
      };
    },
    index_module_h = function (e) {
      !index_module_f(e) && e.preventDefault();
    },
    index_module_m = compat_module.memo(function (o) {
      var a = o.onMove,
        l = o.onKey,
        s = index_module_c(o, ['onMove', 'onKey']),
        m = hooks_module_s(null),
        g = index_module_i(a),
        p = index_module_i(l),
        b = hooks_module_s(null),
        _ = hooks_module_s(!1),
        x = F(
          function () {
            var e = function (e) {
                index_module_h(e),
                  (index_module_f(e) ? e.touches.length > 0 : e.buttons > 0) && m.current
                    ? g(index_module_d(m.current, e, b.current))
                    : t(!1);
              },
              r = function () {
                return t(!1);
              };
            function t(t) {
              var n = _.current,
                o = index_module_v(m.current),
                a = t ? o.addEventListener : o.removeEventListener;
              a(n ? 'touchmove' : 'mousemove', e), a(n ? 'touchend' : 'mouseup', r);
            }
            return [
              function (e) {
                var r = e.nativeEvent,
                  n = m.current;
                if (
                  n &&
                  (index_module_h(r),
                  !(function (e, r) {
                    return r && !index_module_f(e);
                  })(r, _.current) && n)
                ) {
                  if (index_module_f(r)) {
                    _.current = !0;
                    var o = r.changedTouches || [];
                    o.length && (b.current = o[0].identifier);
                  }
                  n.focus(), g(index_module_d(n, r, b.current)), t(!0);
                }
              },
              function (e) {
                var r = e.which || e.keyCode;
                r < 37 ||
                  r > 40 ||
                  (e.preventDefault(),
                  p({
                    left: 39 === r ? 0.05 : 37 === r ? -0.05 : 0,
                    top: 40 === r ? 0.05 : 38 === r ? -0.05 : 0,
                  }));
              },
              t,
            ];
          },
          [p, g],
        ),
        C = x[0],
        E = x[1],
        H = x[2];
      return (
        hooks_module_(
          function () {
            return H;
          },
          [H],
        ),
        compat_module.createElement(
          'div',
          index_module_u({}, s, {
            onTouchStart: C,
            onMouseDown: C,
            className: 'react-colorful__interactive',
            ref: m,
            onKeyDown: E,
            tabIndex: 0,
            role: 'slider',
          }),
        )
      );
    }),
    index_module_g = function (e) {
      return e.filter(Boolean).join(' ');
    },
    index_module_p = function (r) {
      var t = r.color,
        n = r.left,
        o = r.top,
        a = void 0 === o ? 0.5 : o,
        l = index_module_g(['react-colorful__pointer', r.className]);
      return compat_module.createElement(
        'div',
        { className: l, style: { top: 100 * a + '%', left: 100 * n + '%' } },
        compat_module.createElement('div', {
          className: 'react-colorful__pointer-fill',
          style: { backgroundColor: t },
        }),
      );
    },
    index_module_b = function (e, r, t) {
      return void 0 === r && (r = 0), void 0 === t && (t = Math.pow(10, r)), Math.round(t * e) / t;
    },
    index_module_ = { grad: 0.9, turn: 360, rad: 360 / (2 * Math.PI) },
    index_module_x = function (e) {
      return index_module_L(index_module_C(e));
    },
    index_module_C = function (e) {
      return (
        '#' === e[0] && (e = e.substring(1)),
        e.length < 6
          ? {
              r: parseInt(e[0] + e[0], 16),
              g: parseInt(e[1] + e[1], 16),
              b: parseInt(e[2] + e[2], 16),
              a: 4 === e.length ? index_module_b(parseInt(e[3] + e[3], 16) / 255, 2) : 1,
            }
          : {
              r: parseInt(e.substring(0, 2), 16),
              g: parseInt(e.substring(2, 4), 16),
              b: parseInt(e.substring(4, 6), 16),
              a: 8 === e.length ? index_module_b(parseInt(e.substring(6, 8), 16) / 255, 2) : 1,
            }
      );
    },
    index_module_E = function (e, r) {
      return void 0 === r && (r = 'deg'), Number(e) * (index_module_[r] || 1);
    },
    index_module_H = function (e) {
      var r =
        /hsla?\(?\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[,\s]+(-?\d*\.?\d+)%?[,\s]+(-?\d*\.?\d+)%?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(
          e,
        );
      return r
        ? index_module_N({
            h: index_module_E(r[1], r[2]),
            s: Number(r[3]),
            l: Number(r[4]),
            a: void 0 === r[5] ? 1 : Number(r[5]) / (r[6] ? 100 : 1),
          })
        : { h: 0, s: 0, v: 0, a: 1 };
    },
    index_module_M = index_module_H,
    index_module_N = function (e) {
      var r = e.s,
        t = e.l;
      return {
        h: e.h,
        s: (r *= (t < 50 ? t : 100 - t) / 100) > 0 ? ((2 * r) / (t + r)) * 100 : 0,
        v: t + r,
        a: e.a,
      };
    },
    index_module_w = function (e) {
      return index_module_K(index_module_I(e));
    },
    index_module_y = function (e) {
      var r = e.s,
        t = e.v,
        n = e.a,
        o = ((200 - r) * t) / 100;
      return {
        h: index_module_b(e.h),
        s: index_module_b(o > 0 && o < 200 ? ((r * t) / 100 / (o <= 100 ? o : 200 - o)) * 100 : 0),
        l: index_module_b(o / 2),
        a: index_module_b(n, 2),
      };
    },
    index_module_q = function (e) {
      var r = index_module_y(e);
      return 'hsl(' + r.h + ', ' + r.s + '%, ' + r.l + '%)';
    },
    index_module_k = function (e) {
      var r = index_module_y(e);
      return 'hsla(' + r.h + ', ' + r.s + '%, ' + r.l + '%, ' + r.a + ')';
    },
    index_module_I = function (e) {
      var r = e.h,
        t = e.s,
        n = e.v,
        o = e.a;
      (r = (r / 360) * 6), (t /= 100), (n /= 100);
      var a = Math.floor(r),
        l = n * (1 - t),
        u = n * (1 - (r - a) * t),
        c = n * (1 - (1 - r + a) * t),
        i = a % 6;
      return {
        r: index_module_b(255 * [n, u, l, l, c, n][i]),
        g: index_module_b(255 * [c, n, n, u, l, l][i]),
        b: index_module_b(255 * [l, l, c, n, n, u][i]),
        a: index_module_b(o, 2),
      };
    },
    index_module_O = function (e) {
      var r =
        /hsva?\(?\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[,\s]+(-?\d*\.?\d+)%?[,\s]+(-?\d*\.?\d+)%?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(
          e,
        );
      return r
        ? index_module_A({
            h: index_module_E(r[1], r[2]),
            s: Number(r[3]),
            v: Number(r[4]),
            a: void 0 === r[5] ? 1 : Number(r[5]) / (r[6] ? 100 : 1),
          })
        : { h: 0, s: 0, v: 0, a: 1 };
    },
    index_module_j = index_module_O,
    index_module_z = function (e) {
      var r =
        /rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(
          e,
        );
      return r
        ? index_module_L({
            r: Number(r[1]) / (r[2] ? 100 / 255 : 1),
            g: Number(r[3]) / (r[4] ? 100 / 255 : 1),
            b: Number(r[5]) / (r[6] ? 100 / 255 : 1),
            a: void 0 === r[7] ? 1 : Number(r[7]) / (r[8] ? 100 : 1),
          })
        : { h: 0, s: 0, v: 0, a: 1 };
    },
    index_module_B = index_module_z,
    index_module_D = function (e) {
      var r = e.toString(16);
      return r.length < 2 ? '0' + r : r;
    },
    index_module_K = function (e) {
      var r = e.r,
        t = e.g,
        n = e.b,
        o = e.a,
        a = o < 1 ? index_module_D(index_module_b(255 * o)) : '';
      return '#' + index_module_D(r) + index_module_D(t) + index_module_D(n) + a;
    },
    index_module_L = function (e) {
      var r = e.r,
        t = e.g,
        n = e.b,
        o = e.a,
        a = Math.max(r, t, n),
        l = a - Math.min(r, t, n),
        u = l ? (a === r ? (t - n) / l : a === t ? 2 + (n - r) / l : 4 + (r - t) / l) : 0;
      return {
        h: index_module_b(60 * (u < 0 ? u + 6 : u)),
        s: index_module_b(a ? (l / a) * 100 : 0),
        v: index_module_b((a / 255) * 100),
        a: o,
      };
    },
    index_module_A = function (e) {
      return {
        h: index_module_b(e.h),
        s: index_module_b(e.s),
        v: index_module_b(e.v),
        a: index_module_b(e.a, 2),
      };
    },
    index_module_S = compat_module.memo(function (r) {
      var t = r.hue,
        n = r.onChange,
        o = index_module_g(['react-colorful__hue', r.className]);
      return compat_module.createElement(
        'div',
        { className: o },
        compat_module.createElement(
          index_module_m,
          {
            onMove: function (e) {
              n({ h: 360 * e.left });
            },
            onKey: function (e) {
              n({ h: index_module_s(t + 360 * e.left, 0, 360) });
            },
            'aria-label': 'Hue',
            'aria-valuenow': index_module_b(t),
            'aria-valuemax': '360',
            'aria-valuemin': '0',
          },
          compat_module.createElement(index_module_p, {
            className: 'react-colorful__hue-pointer',
            left: t / 360,
            color: index_module_q({ h: t, s: 100, v: 100, a: 1 }),
          }),
        ),
      );
    }),
    index_module_T = compat_module.memo(function (r) {
      var t = r.hsva,
        n = r.onChange,
        o = { backgroundColor: index_module_q({ h: t.h, s: 100, v: 100, a: 1 }) };
      return compat_module.createElement(
        'div',
        { className: 'react-colorful__saturation', style: o },
        compat_module.createElement(
          index_module_m,
          {
            onMove: function (e) {
              n({ s: 100 * e.left, v: 100 - 100 * e.top });
            },
            onKey: function (e) {
              n({
                s: index_module_s(t.s + 100 * e.left, 0, 100),
                v: index_module_s(t.v - 100 * e.top, 0, 100),
              });
            },
            'aria-label': 'Color',
            'aria-valuetext':
              'Saturation ' + index_module_b(t.s) + '%, Brightness ' + index_module_b(t.v) + '%',
          },
          compat_module.createElement(index_module_p, {
            className: 'react-colorful__saturation-pointer',
            top: 1 - t.v / 100,
            left: t.s / 100,
            color: index_module_q(t),
          }),
        ),
      );
    }),
    index_module_F = function (e, r) {
      if (e === r) return !0;
      for (var t in e) if (e[t] !== r[t]) return !1;
      return !0;
    },
    index_module_P = function (e, r) {
      return e.replace(/\s/g, '') === r.replace(/\s/g, '');
    },
    index_module_X = function (e, r) {
      return (
        e.toLowerCase() === r.toLowerCase() || index_module_F(index_module_C(e), index_module_C(r))
      );
    };
  function index_module_Y(e, t, l) {
    var u = index_module_i(l),
      c = hooks_module_p(function () {
        return e.toHsva(t);
      }),
      s = c[0],
      f = c[1],
      v = hooks_module_s({ color: t, hsva: s });
    hooks_module_(
      function () {
        if (!e.equal(t, v.current.color)) {
          var r = e.toHsva(t);
          (v.current = { hsva: r, color: t }), f(r);
        }
      },
      [t, e],
    ),
      hooks_module_(
        function () {
          var r;
          index_module_F(s, v.current.hsva) ||
            e.equal((r = e.fromHsva(s)), v.current.color) ||
            ((v.current = { hsva: s, color: r }), u(r));
        },
        [s, e, u],
      );
    var d = hooks_module_T(function (e) {
      f(function (r) {
        return Object.assign({}, r, e);
      });
    }, []);
    return [s, d];
  }
  var index_module_R,
    index_module_V = 'undefined' != typeof window ? hooks_module_h : hooks_module_,
    index_module_$ = function () {
      return index_module_R || (true ? __webpack_require__.nc : 0);
    },
    index_module_G = function (e) {
      index_module_R = e;
    },
    index_module_J = new Map(),
    index_module_Q = function (e) {
      index_module_V(function () {
        var r = e.current ? e.current.ownerDocument : document;
        if (void 0 !== r && !index_module_J.has(r)) {
          var t = r.createElement('style');
          (t.innerHTML =
            '.react-colorful{position:relative;display:flex;flex-direction:column;width:200px;height:200px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.react-colorful__saturation{position:relative;flex-grow:1;border-color:transparent;border-bottom:12px solid #000;border-radius:8px 8px 0 0;background-image:linear-gradient(0deg,#000,transparent),linear-gradient(90deg,#fff,hsla(0,0%,100%,0))}.react-colorful__alpha-gradient,.react-colorful__pointer-fill{content:"";position:absolute;left:0;top:0;right:0;bottom:0;pointer-events:none;border-radius:inherit}.react-colorful__alpha-gradient,.react-colorful__saturation{box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}.react-colorful__alpha,.react-colorful__hue{position:relative;height:24px}.react-colorful__hue{background:linear-gradient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)}.react-colorful__last-control{border-radius:0 0 8px 8px}.react-colorful__interactive{position:absolute;left:0;top:0;right:0;bottom:0;border-radius:inherit;outline:none;touch-action:none}.react-colorful__pointer{position:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;transform:translate(-50%,-50%);background-color:#fff;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}.react-colorful__interactive:focus .react-colorful__pointer{transform:translate(-50%,-50%) scale(1.1)}.react-colorful__alpha,.react-colorful__alpha-pointer{background-color:#fff;background-image:url(\'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>\')}.react-colorful__saturation-pointer{z-index:3}.react-colorful__hue-pointer{z-index:2}'),
            index_module_J.set(r, t);
          var n = index_module_$();
          n && t.setAttribute('nonce', n), r.head.appendChild(t);
        }
      }, []);
    },
    index_module_U = function (t) {
      var n = t.className,
        o = t.colorModel,
        a = t.color,
        l = void 0 === a ? o.defaultColor : a,
        i = t.onChange,
        s = index_module_c(t, ['className', 'colorModel', 'color', 'onChange']),
        f = r(null);
      index_module_Q(f);
      var v = index_module_Y(o, l, i),
        d = v[0],
        h = v[1],
        m = index_module_g(['react-colorful', n]);
      return e.createElement(
        'div',
        index_module_u({}, s, { ref: f, className: m }),
        e.createElement(index_module_T, { hsva: d, onChange: h }),
        e.createElement(index_module_S, {
          hue: d.h,
          onChange: h,
          className: 'react-colorful__last-control',
        }),
      );
    },
    index_module_W = {
      defaultColor: '000',
      toHsva: index_module_x,
      fromHsva: function (e) {
        return index_module_w({ h: e.h, s: e.s, v: e.v, a: 1 });
      },
      equal: index_module_X,
    },
    index_module_Z = function (r) {
      return e.createElement(index_module_U, index_module_u({}, r, { colorModel: index_module_W }));
    },
    ee = function (r) {
      var t = r.className,
        n = r.hsva,
        o = r.onChange,
        a = {
          backgroundImage:
            'linear-gradient(90deg, ' +
            index_module_k(Object.assign({}, n, { a: 0 })) +
            ', ' +
            index_module_k(Object.assign({}, n, { a: 1 })) +
            ')',
        },
        l = index_module_g(['react-colorful__alpha', t]),
        u = index_module_b(100 * n.a);
      return compat_module.createElement(
        'div',
        { className: l },
        compat_module.createElement('div', {
          className: 'react-colorful__alpha-gradient',
          style: a,
        }),
        compat_module.createElement(
          index_module_m,
          {
            onMove: function (e) {
              o({ a: e.left });
            },
            onKey: function (e) {
              o({ a: index_module_s(n.a + e.left) });
            },
            'aria-label': 'Alpha',
            'aria-valuetext': u + '%',
            'aria-valuenow': u,
            'aria-valuemin': '0',
            'aria-valuemax': '100',
          },
          compat_module.createElement(index_module_p, {
            className: 'react-colorful__alpha-pointer',
            left: n.a,
            color: index_module_k(n),
          }),
        ),
      );
    },
    re = function (t) {
      var n = t.className,
        o = t.colorModel,
        a = t.color,
        l = void 0 === a ? o.defaultColor : a,
        i = t.onChange,
        s = index_module_c(t, ['className', 'colorModel', 'color', 'onChange']),
        f = hooks_module_s(null);
      index_module_Q(f);
      var v = index_module_Y(o, l, i),
        d = v[0],
        h = v[1],
        m = index_module_g(['react-colorful', n]);
      return compat_module.createElement(
        'div',
        index_module_u({}, s, { ref: f, className: m }),
        compat_module.createElement(index_module_T, { hsva: d, onChange: h }),
        compat_module.createElement(index_module_S, { hue: d.h, onChange: h }),
        compat_module.createElement(ee, {
          hsva: d,
          onChange: h,
          className: 'react-colorful__last-control',
        }),
      );
    },
    te = {
      defaultColor: '0001',
      toHsva: index_module_x,
      fromHsva: index_module_w,
      equal: index_module_X,
    },
    ne = function (r) {
      return e.createElement(re, index_module_u({}, r, { colorModel: te }));
    },
    oe = {
      defaultColor: { h: 0, s: 0, l: 0, a: 1 },
      toHsva: index_module_N,
      fromHsva: index_module_y,
      equal: index_module_F,
    },
    ae = function (r) {
      return e.createElement(re, index_module_u({}, r, { colorModel: oe }));
    },
    le = {
      defaultColor: 'hsla(0, 0%, 0%, 1)',
      toHsva: index_module_H,
      fromHsva: index_module_k,
      equal: index_module_P,
    },
    ue = function (r) {
      return e.createElement(re, index_module_u({}, r, { colorModel: le }));
    },
    ce = {
      defaultColor: { h: 0, s: 0, l: 0 },
      toHsva: function (e) {
        return index_module_N({ h: e.h, s: e.s, l: e.l, a: 1 });
      },
      fromHsva: function (e) {
        return { h: (r = index_module_y(e)).h, s: r.s, l: r.l };
        var r;
      },
      equal: index_module_F,
    },
    ie = function (r) {
      return e.createElement(index_module_U, index_module_u({}, r, { colorModel: ce }));
    },
    se = {
      defaultColor: 'hsl(0, 0%, 0%)',
      toHsva: index_module_M,
      fromHsva: index_module_q,
      equal: index_module_P,
    },
    fe = function (r) {
      return e.createElement(index_module_U, index_module_u({}, r, { colorModel: se }));
    },
    ve = {
      defaultColor: { h: 0, s: 0, v: 0, a: 1 },
      toHsva: function (e) {
        return e;
      },
      fromHsva: index_module_A,
      equal: index_module_F,
    },
    de = function (r) {
      return e.createElement(re, index_module_u({}, r, { colorModel: ve }));
    },
    he = {
      defaultColor: 'hsva(0, 0%, 0%, 1)',
      toHsva: index_module_O,
      fromHsva: function (e) {
        var r = index_module_A(e);
        return 'hsva(' + r.h + ', ' + r.s + '%, ' + r.v + '%, ' + r.a + ')';
      },
      equal: index_module_P,
    },
    me = function (r) {
      return e.createElement(re, index_module_u({}, r, { colorModel: he }));
    },
    ge = {
      defaultColor: { h: 0, s: 0, v: 0 },
      toHsva: function (e) {
        return { h: e.h, s: e.s, v: e.v, a: 1 };
      },
      fromHsva: function (e) {
        var r = index_module_A(e);
        return { h: r.h, s: r.s, v: r.v };
      },
      equal: index_module_F,
    },
    pe = function (r) {
      return e.createElement(index_module_U, index_module_u({}, r, { colorModel: ge }));
    },
    be = {
      defaultColor: 'hsv(0, 0%, 0%)',
      toHsva: index_module_j,
      fromHsva: function (e) {
        var r = index_module_A(e);
        return 'hsv(' + r.h + ', ' + r.s + '%, ' + r.v + '%)';
      },
      equal: index_module_P,
    },
    _e = function (r) {
      return e.createElement(index_module_U, index_module_u({}, r, { colorModel: be }));
    },
    xe = {
      defaultColor: { r: 0, g: 0, b: 0, a: 1 },
      toHsva: index_module_L,
      fromHsva: index_module_I,
      equal: index_module_F,
    },
    Ce = function (r) {
      return compat_module.createElement(re, index_module_u({}, r, { colorModel: xe }));
    },
    Ee = {
      defaultColor: 'rgba(0, 0, 0, 1)',
      toHsva: index_module_z,
      fromHsva: function (e) {
        var r = index_module_I(e);
        return 'rgba(' + r.r + ', ' + r.g + ', ' + r.b + ', ' + r.a + ')';
      },
      equal: index_module_P,
    },
    He = function (r) {
      return e.createElement(re, index_module_u({}, r, { colorModel: Ee }));
    },
    Me = {
      defaultColor: { r: 0, g: 0, b: 0 },
      toHsva: function (e) {
        return index_module_L({ r: e.r, g: e.g, b: e.b, a: 1 });
      },
      fromHsva: function (e) {
        return { r: (r = index_module_I(e)).r, g: r.g, b: r.b };
        var r;
      },
      equal: index_module_F,
    },
    Ne = function (r) {
      return e.createElement(index_module_U, index_module_u({}, r, { colorModel: Me }));
    },
    we = {
      defaultColor: 'rgb(0, 0, 0)',
      toHsva: index_module_B,
      fromHsva: function (e) {
        var r = index_module_I(e);
        return 'rgb(' + r.r + ', ' + r.g + ', ' + r.b + ')';
      },
      equal: index_module_P,
    },
    ye = function (r) {
      return e.createElement(index_module_U, index_module_u({}, r, { colorModel: we }));
    },
    qe = /^#?([0-9A-F]{3,8})$/i,
    ke = function (r) {
      var t = r.color,
        l = void 0 === t ? '' : t,
        s = r.onChange,
        f = r.onBlur,
        v = r.escape,
        d = r.validate,
        h = r.format,
        m = r.process,
        g = index_module_c(r, [
          'color',
          'onChange',
          'onBlur',
          'escape',
          'validate',
          'format',
          'process',
        ]),
        p = hooks_module_p(function () {
          return v(l);
        }),
        b = p[0],
        _ = p[1],
        x = index_module_i(s),
        C = index_module_i(f),
        E = hooks_module_T(
          function (e) {
            var r = v(e.target.value);
            _(r), d(r) && x(m ? m(r) : r);
          },
          [v, m, d, x],
        ),
        H = hooks_module_T(
          function (e) {
            d(e.target.value) || _(v(l)), C(e);
          },
          [l, v, d, C],
        );
      return (
        hooks_module_(
          function () {
            _(v(l));
          },
          [l, v],
        ),
        compat_module.createElement(
          'input',
          index_module_u({}, g, {
            value: h ? h(b) : b,
            spellCheck: 'false',
            onChange: E,
            onBlur: H,
          }),
        )
      );
    },
    Ie = function (e) {
      return '#' + e;
    },
    Oe = function (r) {
      var t = r.prefixed,
        n = r.alpha,
        o = index_module_c(r, ['prefixed', 'alpha']),
        l = hooks_module_T(
          function (e) {
            return e.replace(/([^0-9A-F]+)/gi, '').substring(0, n ? 8 : 6);
          },
          [n],
        ),
        i = hooks_module_T(
          function (e) {
            return (function (e, r) {
              var t = qe.exec(e),
                n = t ? t[1].length : 0;
              return 3 === n || 6 === n || (!!r && 4 === n) || (!!r && 8 === n);
            })(e, n);
          },
          [n],
        );
      return compat_module.createElement(
        ke,
        index_module_u({}, o, { escape: l, format: t ? Ie : void 0, process: Ie, validate: i }),
      );
    };
  const ColorPicker = compat_module.forwardRef(function ColorPicker2(
    { disabled = false, value, onChange, ...props },
    ref,
  ) {
    const [open, setOpen] = hooks_module_p(false);
    const swatchRef = useInnerRef(ref);
    const popoverRef = hooks_module_s(null);
    hooks_module_h(() => {
      var _a;
      if (open) {
        (_a = popoverRef.current) == null ? void 0 : _a.focus();
      }
    }, [open]);
    const pickerClassName = utilities_useClassName(
      () => ({
        height: '36px',
        outline: 'none',
        position: 'relative',
        width: '36px',
      }),
      [],
    );
    const swatchClassName = utilities_useClassName(
      theme => ({
        border: `solid 2px ${theme.colorPicker.border}`,
        borderRadius: '25%',
        cursor: disabled ? 'default' : 'pointer',
        height: '36px',
        opacity: disabled ? DISABLED_OPACITY : 1,
        outline: 'none',
        padding: 0,
        width: '36px',
        '&:focus': {
          boxShadow: `0 0 0 2px ${theme.focus.shadow}`,
        },
        '&:focus:not(:focus-visible)': {
          boxShadow: 'none',
        },
        '&:focus:not(:-moz-focusring)': {
          boxShadow: 'none',
        },
      }),
      [disabled],
    );
    const popoverClassName = utilities_useClassName(
      theme => ({
        backgroundColor: theme.colorPicker.popoverBackground,
        borderRadius: '8px',
        boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 2px 0px, rgba(0, 0, 0, 0.15) 0px 3px 6px 2px',
        display: open ? 'block' : 'none',
        outline: 'none',
        padding: '0.75em',
        position: 'absolute',
        top: '100%',
        right: 0,
        zIndex: COLOR_PICKER_Z_INDEX,
      }),
      [open],
    );
    const inputClassName = utilities_useClassName(
      theme => ({
        background: 'transparent',
        border: `solid 1px ${theme.input.border}`,
        borderRadius: '4px',
        color: theme.text.primary,
        display: 'block',
        font: 'inherit',
        height: '2.5em',
        lineHeight: '1.5',
        margin: '0.75em auto 0',
        padding: '0.5em 0.625em',
        textAlign: 'center',
        width: '8em',
        '&:focus': {
          boxShadow: `0 0 0 2px ${theme.focus.shadow}`,
          outline: 'none',
        },
      }),
      [],
    );
    return compat_module.createElement(
      'div',
      {
        className: pickerClassName,
        tabIndex: -1,
        onBlurCapture: e => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setOpen(false);
          }
        },
      },
      compat_module.createElement('button', {
        ...applyClassName(props, swatchClassName),
        'aria-expanded': open,
        'aria-haspopup': 'dialog',
        ref: swatchRef,
        style: { backgroundColor: value },
        type: 'button',
        onClick: () => setOpen(!open),
      }),
      compat_module.createElement(
        'div',
        {
          className: popoverClassName,
          ref: popoverRef,
          role: 'dialog',
          tabIndex: -1,
          onKeyDown: e => {
            var _a;
            if (e.key === 'Escape') {
              e.preventDefault();
              setOpen(false);
              (_a = swatchRef.current) == null ? void 0 : _a.focus();
            }
          },
        },
        compat_module.createElement(Ce, {
          color: colord_w(value).toRgb(),
          onChange: value2 => onChange(colord_w(value2).toHex()),
        }),
        compat_module.createElement(Oe, {
          alpha: true,
          className: inputClassName,
          color: colord_w(value).toHex(),
          prefixed: true,
          onChange,
        }),
      ),
    );
  });

  const IconButton = compat_module.forwardRef(function IconButton2({ iconURL, ...props }, ref) {
    const theme = useTheme();
    const wrapperClassName = utilities_useClassName(
      () => ({
        position: 'relative',
      }),
      [],
    );
    const buttonClassName = utilities_useClassName(
      () => ({
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        display: 'block',
        height: '36px',
        padding: '6px',
        width: '36px',
        '&:disabled': {
          cursor: 'default',
          opacity: DISABLED_OPACITY,
        },
        '&:focus': {
          outline: 'none',
        },
      }),
      [],
    );
    return compat_module.createElement(
      'div',
      {
        className: wrapperClassName,
      },
      compat_module.createElement(
        'button',
        {
          ...applyClassName(props, buttonClassName),
          ref,
        },
        compat_module.createElement(TemplateIcon, {
          color: theme.iconButton,
          iconSize: '24px',
          url: iconURL,
        }),
      ),
      compat_module.createElement(FocusCircle, null),
    );
  });

  const List = compat_module.forwardRef(function List2(props, ref) {
    const className = utilities_useClassName(
      () => ({
        listStyleType: 'none',
        margin: 0,
        padding: 0,
      }),
      [],
    );
    return compat_module.createElement('ul', {
      ...applyClassName(props, className),
      ref,
    });
  });
  const ListItem = compat_module.forwardRef(function ListItem2(props, ref) {
    const className = utilities_useClassName(
      theme => ({
        padding: '0.75em 0',
        '&:not(:first-child)': {
          borderTop: `solid 1px ${theme.separator}`,
        },
      }),
      [],
    );
    return compat_module.createElement('li', {
      ...applyClassName(props, className),
      ref,
    });
  });

  const RadioButton = compat_module.forwardRef(function RadioButton2(props, ref) {
    const wrapperClassName = utilities_useClassName(
      () => ({
        height: '16px',
        position: 'relative',
        width: '16px',
      }),
      [],
    );
    const inputClassName = utilities_useClassName(
      () => ({
        cursor: 'pointer',
        height: '100%',
        margin: 0,
        opacity: 0,
        position: 'absolute',
        width: '100%',
        zIndex: INPUT_Z_INDEX,
        '&:disabled': {
          cursor: 'default',
        },
      }),
      [],
    );
    const imageClassName = utilities_useClassName(
      () => ({
        ':disabled + &': {
          opacity: DISABLED_OPACITY,
        },
      }),
      [],
    );
    const circleClassName = utilities_useClassName(
      theme => ({
        border: `solid 2px ${theme.radioButton.unchecked}`,
        borderRadius: '50%',
        height: '16px',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '16px',
        ':checked + * > &': {
          borderColor: theme.radioButton.checked,
        },
      }),
      [],
    );
    const dotClassName = utilities_useClassName(
      theme => ({
        borderRadius: '50%',
        height: '8px',
        left: '4px',
        position: 'absolute',
        top: '4px',
        width: '8px',
        ':checked + * > &': {
          backgroundColor: theme.radioButton.checked,
        },
      }),
      [],
    );
    return compat_module.createElement(
      'div',
      {
        className: wrapperClassName,
      },
      compat_module.createElement('input', {
        ...applyClassName(props, inputClassName),
        ref,
        type: 'radio',
      }),
      compat_module.createElement(
        'div',
        {
          className: imageClassName,
        },
        compat_module.createElement('div', {
          className: circleClassName,
        }),
        compat_module.createElement('div', {
          className: dotClassName,
        }),
        compat_module.createElement(FocusCircle, {
          depth: 1,
        }),
      ),
    );
  });

  function postMessage(type, ...args) {
    void (async () => {
      try {
        await browser.runtime.sendMessage({ type, args });
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
  async function sendMessage(type, ...args) {
    return await browser_browser.runtime.sendMessage({ type, args });
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
    return browser_browser.storage.local.get(defaultLocalStorageItems);
  }
  function saveToLocalStorage(items, source) {
    return sendMessage('save-to-local-storage', items, source);
  }

  const OptionsContext = compat_module.createContext(null);
  const OptionsContextProvider = props => {
    const [value, setValue] = hooks_module_p(null);
    hooks_module_(() => {
      void (async () => {
        const [initialItems, platformInfo] = await Promise.all([
          loadAllFromLocalStorage(),
          browser_browser.runtime.getPlatformInfo(),
        ]);
        const searchParams = new URL(window.location.href).searchParams;
        const query = {
          addSubscriptionName: searchParams.get('addSubscriptionName'),
          addSubscriptionURL: searchParams.get('addSubscriptionURL'),
        };
        setValue({ initialItems, platformInfo, query });
      })();
    }, []);
    return (
      value &&
      compat_module.createElement(
        OptionsContext.Provider,
        {
          value,
        },
        props.children,
      )
    );
  };
  function useOptionsContext() {
    const value = hooks_module_q(OptionsContext);
    if (!value) {
      throw new Error('useOptionsContext: no matching provider');
    }
    return value;
  }

  const SetColorItem = ({ initialColor, itemKey, label }) => {
    const {
      initialItems: { [itemKey]: initialItem },
    } = useOptionsContext();
    const [specifyColor, setSpecifyColor] = hooks_module_p(initialItem !== 'default');
    const [color, setColor] = hooks_module_p(
      initialItem === 'default' ? initialColor : initialItem,
    );
    return compat_module.createElement(
      SectionItem,
      null,
      compat_module.createElement(
        Row,
        null,
        compat_module.createElement(
          RowItem,
          {
            expanded: true,
          },
          compat_module.createElement(
            LabelWrapper,
            null,
            compat_module.createElement(Label, null, label),
          ),
        ),
      ),
      compat_module.createElement(
        Row,
        null,
        compat_module.createElement(
          RowItem,
          null,
          compat_module.createElement(
            Indent,
            null,
            compat_module.createElement(RadioButton, {
              checked: !specifyColor,
              id: `${itemKey}UseDefault`,
              name: itemKey,
              onChange: e => {
                if (e.currentTarget.checked) {
                  setSpecifyColor(false);
                  void saveToLocalStorage({ [itemKey]: 'default' }, 'options');
                }
              },
            }),
          ),
        ),
        compat_module.createElement(
          RowItem,
          {
            expanded: true,
          },
          compat_module.createElement(
            LabelWrapper,
            null,
            compat_module.createElement(
              ControlLabel,
              {
                for: `${itemKey}UseDefault`,
              },
              translate('options_colorUseDefault'),
            ),
          ),
        ),
      ),
      compat_module.createElement(
        Row,
        null,
        compat_module.createElement(
          RowItem,
          null,
          compat_module.createElement(
            Indent,
            null,
            compat_module.createElement(RadioButton, {
              checked: specifyColor,
              id: `${itemKey}Specify`,
              name: itemKey,
              onChange: e => {
                if (e.currentTarget.checked) {
                  setSpecifyColor(true);
                  void saveToLocalStorage({ [itemKey]: color }, 'options');
                }
              },
            }),
          ),
        ),
        compat_module.createElement(
          RowItem,
          {
            expanded: true,
          },
          compat_module.createElement(
            LabelWrapper,
            null,
            compat_module.createElement(
              ControlLabel,
              {
                for: `${itemKey}Specify`,
              },
              translate('options_colorSpecify'),
            ),
          ),
        ),
        compat_module.createElement(
          RowItem,
          null,
          compat_module.createElement(ColorPicker, {
            'aria-label': label,
            value: color,
            onChange: value => {
              setSpecifyColor(true);
              setColor(value);
              void saveToLocalStorage({ [itemKey]: value }, 'options');
            },
          }),
        ),
      ),
    );
  };
  const SetHighlightColors = () => {
    const {
      initialItems: { highlightColors: initialHighlightColors },
    } = useOptionsContext();
    const [colorsAndKeys, setColorsAndKeys] = hooks_module_p(
      initialHighlightColors.map((color, index) => [color, index]),
    );
    const nextKey = hooks_module_s(initialHighlightColors.length);
    const spacerClass = utilities_useClassName(
      () => ({
        height: '36px',
        width: '36px',
      }),
      [],
    );
    return compat_module.createElement(
      SectionItem,
      null,
      compat_module.createElement(
        Row,
        null,
        compat_module.createElement(
          RowItem,
          {
            expanded: true,
          },
          compat_module.createElement(
            LabelWrapper,
            null,
            compat_module.createElement(Label, null, translate('options_highlightColors')),
            compat_module.createElement(SubLabel, null, translate('options_highlightDescription')),
            compat_module.createElement(
              SubLabel,
              null,
              translate('options_blacklistExample', '@1*://*.example.com/*'),
            ),
          ),
        ),
        compat_module.createElement(
          RowItem,
          null,
          compat_module.createElement(IconButton, {
            'aria-label': translate('options_highlightColorAdd'),
            iconURL: plus_namespaceObject,
            onClick: () => {
              colorsAndKeys.push(['#ddeeff', nextKey.current++]);
              setColorsAndKeys([...colorsAndKeys]);
              void saveToLocalStorage(
                { highlightColors: colorsAndKeys.map(([color]) => color) },
                'options',
              );
            },
          }),
        ),
      ),
      compat_module.createElement(
        Row,
        null,
        compat_module.createElement(RowItem, null, compat_module.createElement(Indent, null)),
        compat_module.createElement(
          RowItem,
          {
            expanded: true,
          },
          compat_module.createElement(
            List,
            null,
            colorsAndKeys.map(([color, key], index) =>
              compat_module.createElement(
                ListItem,
                {
                  key,
                },
                compat_module.createElement(
                  Row,
                  null,
                  compat_module.createElement(
                    RowItem,
                    {
                      expanded: true,
                    },
                    compat_module.createElement(
                      LabelWrapper,
                      null,
                      compat_module.createElement(
                        Label,
                        {
                          id: `highlightColor${index}`,
                        },
                        translate('options_highlightColorNth', String(index + 1)),
                      ),
                    ),
                  ),
                  compat_module.createElement(
                    RowItem,
                    null,
                    compat_module.createElement(ColorPicker, {
                      'aria-labelledby': `highlightColor${index}`,
                      value: color,
                      onChange: value => {
                        colorsAndKeys[index] = [value, colorsAndKeys[index][1]];
                        setColorsAndKeys([...colorsAndKeys]);
                        void saveToLocalStorage(
                          { highlightColors: colorsAndKeys.map(([color2]) => color2) },
                          'options',
                        );
                      },
                    }),
                  ),
                  compat_module.createElement(
                    RowItem,
                    null,
                    index === colorsAndKeys.length - 1
                      ? compat_module.createElement(IconButton, {
                          'aria-label': translate('options_highlightColorAdd'),
                          iconURL: delete_namespaceObject,
                          onClick: () => {
                            colorsAndKeys.pop();
                            setColorsAndKeys([...colorsAndKeys]);
                            void saveToLocalStorage(
                              { highlightColors: colorsAndKeys.map(([color2]) => color2) },
                              'options',
                            );
                          },
                        })
                      : compat_module.createElement('div', {
                          className: spacerClass,
                        }),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  };
  const SetDialogTheme = () => {
    const {
      initialItems: { dialogTheme: initialDialogTheme },
    } = useOptionsContext();
    const [dialogTheme, setDialogTheme] = hooks_module_p(initialDialogTheme);
    return compat_module.createElement(
      SectionItem,
      null,
      compat_module.createElement(
        Row,
        null,
        compat_module.createElement(
          RowItem,
          {
            expanded: true,
          },
          compat_module.createElement(
            LabelWrapper,
            null,
            compat_module.createElement(Label, null, translate('options_dialogTheme')),
          ),
        ),
      ),
      compat_module.createElement(
        Row,
        null,
        compat_module.createElement(
          RowItem,
          null,
          compat_module.createElement(
            Indent,
            null,
            compat_module.createElement(RadioButton, {
              checked: dialogTheme === 'default',
              id: 'dialogThemeDefault',
              name: 'dialogTheme',
              onChange: e => {
                if (e.currentTarget.checked) {
                  setDialogTheme('default');
                  void saveToLocalStorage({ dialogTheme: 'default' }, 'options');
                }
              },
            }),
          ),
        ),
        compat_module.createElement(
          RowItem,
          {
            expanded: true,
          },
          compat_module.createElement(
            LabelWrapper,
            null,
            compat_module.createElement(
              ControlLabel,
              {
                for: 'dialogThemeDefault',
              },
              translate('options_dialogThemeDefault'),
            ),
          ),
        ),
      ),
      compat_module.createElement(
        Row,
        null,
        compat_module.createElement(
          RowItem,
          null,
          compat_module.createElement(
            Indent,
            null,
            compat_module.createElement(RadioButton, {
              checked: dialogTheme === 'light',
              id: 'dialogThemeLight',
              name: 'dialogTheme',
              onChange: e => {
                if (e.currentTarget.checked) {
                  setDialogTheme('light');
                  void saveToLocalStorage({ dialogTheme: 'light' }, 'options');
                }
              },
            }),
          ),
        ),
        compat_module.createElement(
          RowItem,
          {
            expanded: true,
          },
          compat_module.createElement(
            LabelWrapper,
            null,
            compat_module.createElement(
              ControlLabel,
              {
                for: 'dialogThemeLight',
              },
              translate('options_dialogThemeLight'),
            ),
          ),
        ),
      ),
      compat_module.createElement(
        Row,
        null,
        compat_module.createElement(
          RowItem,
          null,
          compat_module.createElement(
            Indent,
            null,
            compat_module.createElement(RadioButton, {
              checked: dialogTheme === 'dark',
              id: 'dialogThemeDark',
              name: 'dialogTheme',
              onChange: e => {
                if (e.currentTarget.checked) {
                  setDialogTheme('dark');
                  void saveToLocalStorage({ dialogTheme: 'dark' }, 'options');
                }
              },
            }),
          ),
        ),
        compat_module.createElement(
          RowItem,
          {
            expanded: true,
          },
          compat_module.createElement(
            LabelWrapper,
            null,
            compat_module.createElement(
              ControlLabel,
              {
                for: 'dialogThemeDark',
              },
              translate('options_dialogThemeDark'),
            ),
          ),
        ),
      ),
    );
  };
  const AppearanceSection = () =>
    compat_module.createElement(
      Section,
      {
        'aria-labelledby': 'appearanceSectionTitle',
        id: 'appearance',
      },
      compat_module.createElement(
        SectionHeader,
        null,
        compat_module.createElement(
          SectionTitle,
          {
            id: 'appearanceSectionTitle',
          },
          translate('options_appearanceTitle'),
        ),
      ),
      compat_module.createElement(
        SectionBody,
        null,
        compat_module.createElement(SetColorItem, {
          initialColor: '#1a0dab',
          itemKey: 'linkColor',
          label: translate('options_linkColor'),
        }),
        compat_module.createElement(SetColorItem, {
          initialColor: '#ffe0e0',
          itemKey: 'blockColor',
          label: translate('options_blockColor'),
        }),
        compat_module.createElement(SetHighlightColors, null),
        compat_module.createElement(SetDialogTheme, null),
      ),
    );

  const SEARCH_ENGINES = {
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

  const Button = compat_module.forwardRef(function Button2({ primary = false, ...props }, ref) {
    const className = utilities_useClassName(
      theme => {
        const buttonTheme = primary ? theme.button.primary : theme.button.secondary;
        return {
          background: buttonTheme.background,
          border: primary ? 'none' : `solid 1px ${theme.button.secondary.border}`,
          borderRadius: '4px',
          color: buttonTheme.text,
          cursor: 'pointer',
          font: 'inherit',
          height: '2.5em',
          outline: 'none',
          padding: primary ? '0.5em 1em' : 'calc(0.5em - 1px) 1em',
          '&:active': {
            background: buttonTheme.backgroundActive,
          },
          '&:disabled': {
            background: buttonTheme.backgroundDisabled,
            color: buttonTheme.textDisabled,
            cursor: 'default',
          },
          '&:focus': {
            boxShadow: `0 0 0 2px ${theme.focus.shadow}`,
          },
          '&:focus:not(:focus-visible)': {
            boxShadow: 'none',
          },
          '&:focus:not(:-moz-focusring)': {
            boxShadow: 'none',
          },
          '&:hover:not(:active):not(:disabled)': {
            background: buttonTheme.backgroundHovered,
          },
        };
      },
      [primary],
    );
    return compat_module.createElement('button', {
      ...applyClassName(props, className),
      ref,
      type: 'button',
    });
  });
  const LinkButton = compat_module.forwardRef(function LinkButton2(props, ref) {
    const className = utilities_useClassName(
      theme => ({
        background: 'transparent',
        border: 'none',
        color: theme.link.text,
        cursor: 'pointer',
        display: 'inline',
        font: 'inherit',
        outline: 'none',
        padding: 0,
        '&:disabled': {
          cursor: 'default',
        },
        '&:focus': {
          boxShadow: `0 0 0 2px ${theme.focus.shadow}`,
        },
        '&:focus:not(:focus-visible)': {
          boxShadow: 'none',
        },
        '&:focus:not(:-moz-focusring)': {
          boxShadow: 'none',
        },
      }),
      [],
    );
    return compat_module.createElement('button', {
      ...applyClassName(props, className),
      ref,
    });
  });

  const CheckBox = compat_module.forwardRef(function CheckBox2(
    { indeterminate = false, ...props },
    ref,
  ) {
    const innerRef = useInnerRef(ref);
    hooks_module_h(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = indeterminate;
      }
    });
    const wrapperClassName = utilities_useClassName(
      () => ({
        height: '16px',
        position: 'relative',
        width: '16px',
      }),
      [],
    );
    const inputClassName = utilities_useClassName(
      () => ({
        cursor: 'pointer',
        height: '100%',
        margin: 0,
        opacity: 0,
        position: 'absolute',
        width: '100%',
        zIndex: INPUT_Z_INDEX,
        '&:disabled': {
          cursor: 'default',
        },
      }),
      [],
    );
    const imageClassName = utilities_useClassName(
      () => ({
        ':disabled + &': {
          opacity: DISABLED_OPACITY,
        },
      }),
      [],
    );
    const boxClassNmae = utilities_useClassName(
      theme => ({
        border: `solid 2px ${theme.checkBox.border}`,
        borderRadius: '2px',
        height: '16px',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '16px',
        ':checked + * > &, :indeterminate + * > &': {
          background: theme.checkBox.box,
          border: 'none',
        },
      }),
      [],
    );
    const checkMarkClassName = utilities_useClassName(
      theme => ({
        borderColor: 'transparent',
        borderStyle: 'solid',
        borderWidth: '0 0 3px 3px',
        height: '8px',
        left: 0,
        position: 'absolute',
        top: '3px',
        transform: 'rotate(-45deg) scale(0.75)',
        width: '16px',
        ':checked:not(:indeterminate) + * > &': {
          borderColor: theme.checkBox.checkMark,
        },
      }),
      [],
    );
    const indeterminateClassName = utilities_useClassName(
      theme => ({
        height: '2px',
        left: '3px',
        position: 'absolute',
        top: '7px',
        width: '10px',
        ':indeterminate + * > &': {
          backgroundColor: theme.checkBox.checkMark,
        },
      }),
      [],
    );
    return compat_module.createElement(
      'div',
      {
        className: wrapperClassName,
      },
      compat_module.createElement('input', {
        ...applyClassName(props, inputClassName),
        ref: innerRef,
        type: 'checkbox',
      }),
      compat_module.createElement(
        'div',
        {
          className: imageClassName,
        },
        compat_module.createElement('div', {
          className: boxClassNmae,
        }),
        compat_module.createElement('div', {
          className: checkMarkClassName,
        }),
        compat_module.createElement('div', {
          className: indeterminateClassName,
        }),
        compat_module.createElement(FocusCircle, {
          depth: 1,
        }),
      ),
    );
  });

  function getFocusedElement(dialog) {
    return dialog.getRootNode().activeElement;
  }
  function focusDefaultOrStart(dialog) {
    const defaultOrStart =
      dialog.querySelector(`.${FOCUS_DEFAULT_CLASS}`) ||
      dialog.querySelector(`.${FOCUS_START_CLASS}`);
    if (defaultOrStart instanceof HTMLElement || defaultOrStart instanceof SVGElement) {
      defaultOrStart.focus();
      if (getFocusedElement(dialog) !== defaultOrStart) {
        dialog.focus();
      }
    } else {
      dialog.focus();
    }
  }
  function handleKeyDown(e, dialog, close) {
    var _a, _b;
    if (e.nativeEvent.isComposing) {
      return;
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    } else if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (
          e.target === dialog ||
          (e.target instanceof HTMLElement && e.target.matches(`.${FOCUS_START_CLASS}`))
        ) {
          e.preventDefault();
          (_a = dialog.querySelector(`.${FOCUS_END_CLASS}`)) == null ? void 0 : _a.focus();
        }
      } else {
        if (e.target instanceof HTMLElement && e.target.matches(`.${FOCUS_END_CLASS}`)) {
          e.preventDefault();
          (_b = dialog.querySelector(`.${FOCUS_START_CLASS}`)) == null ? void 0 : _b.focus();
        }
      }
    }
  }
  const Dialog = compat_module.forwardRef(function Dialog2(
    { close, open, width = '480px', ...props },
    ref,
  ) {
    const prevFocus = hooks_module_s(null);
    const innerRef = useInnerRef(ref);
    const rootClassName = F(
      () =>
        goober_modern_u.bind({ target: document.head })({
          overflow: 'hidden !important',
        }),
      [],
    );
    hooks_module_h(() => {
      if (open) {
        document.documentElement.classList.add(rootClassName);
        prevFocus.current = document.activeElement;
        if (innerRef.current) {
          focusDefaultOrStart(innerRef.current);
        }
      } else {
        if (prevFocus.current instanceof HTMLElement || prevFocus.current instanceof SVGElement) {
          prevFocus.current.focus();
        }
        document.documentElement.classList.remove(rootClassName);
      }
    }, [open]);
    hooks_module_h(() => {
      if (open && innerRef.current) {
        if (!innerRef.current.contains(getFocusedElement(innerRef.current))) {
          innerRef.current.focus();
        }
      }
    });
    const wrapperClassName = utilities_useClassName(
      () => ({
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.6)',
        display: open ? 'flex' : 'none',
        justifyContent: 'center',
        height: '100%',
        left: 0,
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: DIALOG_Z_INDEX,
      }),
      [open],
    );
    const dialogClassName = utilities_useClassName(
      theme => ({
        background: theme.dialog.background,
        borderRadius: '8px',
        boxShadow: '0 0 16px rgba(0, 0, 0, 0.12), 0 16px 16px rgba(0, 0, 0, 0.24)',
        maxHeight: '100%',
        maxWidth: '100%',
        outline: 'none',
        overflowY: 'auto',
        padding: '1.5em',
        position: 'relative',
        width,
      }),
      [width],
    );
    return compat_module.createElement(
      'div',
      {
        className: wrapperClassName,
        tabIndex: -1,
        onPointerDown: e => {
          if (e.target === e.currentTarget) {
            close();
          }
        },
      },
      compat_module.createElement('div', {
        ...applyClassName(props, dialogClassName),
        'aria-modal': open,
        ref: innerRef,
        role: 'dialog',
        tabIndex: -1,
        onKeyDown: e => {
          e.stopPropagation();
          if (innerRef.current) {
            handleKeyDown(e, innerRef.current, close);
          }
        },
        onKeyPress: e => e.stopPropagation(),
        onKeyUp: e => e.stopPropagation(),
      }),
    );
  });
  const DialogHeader = compat_module.forwardRef(function DialogHeader2(props, ref) {
    const className = utilities_useClassName(
      () => ({
        marginBottom: '1em',
      }),
      [],
    );
    return compat_module.createElement('div', {
      ...applyClassName(props, className),
      ref,
    });
  });
  const DialogTitle = compat_module.forwardRef(function DialogTitle2({ children, ...props }, ref) {
    const className = utilities_useClassName(
      () => ({
        fontSize: '1.125em',
        fontWeight: 'normal',
        margin: 0,
      }),
      [],
    );
    return compat_module.createElement(
      'h1',
      {
        ...applyClassName(props, className),
        ref,
      },
      children,
    );
  });
  const DialogBody = compat_module.forwardRef(function DialogBody2(props, ref) {
    return compat_module.createElement('div', {
      ...props,
      ref,
    });
  });
  const DialogFooter = compat_module.forwardRef(function DialogFooter2(props, ref) {
    const className = utilities_useClassName(
      () => ({
        marginTop: '2em',
      }),
      [],
    );
    return compat_module.createElement('div', {
      ...applyClassName(props, className),
      ref,
    });
  });
  const EmbeddedDialog = compat_module.forwardRef(function EmbeddedDialog2(
    { close, width, ...props },
    ref,
  ) {
    const innerRef = useInnerRef(ref);
    hooks_module_h(() => {
      if (innerRef.current) {
        focusDefaultOrStart(innerRef.current);
      }
    }, []);
    const className = utilities_useClassName(
      theme => ({
        background: theme.dialog.background,
        outline: 'none',
        padding: '1.5em',
        maxWidth: '100%',
        width,
      }),
      [width],
    );
    return compat_module.createElement('div', {
      ...applyClassName(props, className),
      ref: innerRef,
      tabIndex: -1,
      onKeyDown: e => {
        if (innerRef.current) {
          handleKeyDown(e, innerRef.current, close);
        }
      },
    });
  });

  const Portal = ({ children, id }) => {
    let root = document.getElementById(id);
    if (!root) {
      root = document.body.appendChild(document.createElement('div'));
      root.id = id;
    }
    return compat_module.createPortal(
      compat_module.createElement(compat_module.Fragment, null, children),
      root,
    );
  };

  const Text = compat_module.forwardRef(function Text2({ primary = false, ...props }, ref) {
    const className = utilities_useClassName(
      theme => ({
        color: primary ? theme.text.primary : theme.text.secondary,
      }),
      [primary],
    );
    return compat_module.createElement('span', {
      ...applyClassName(props, className),
      ref,
    });
  });

  const TextArea = compat_module.forwardRef(function TextArea2(
    { breakAll = false, ...props },
    ref,
  ) {
    const defaultValue = hooks_module_s(null);
    if (defaultValue.current == null && props.value != null) {
      defaultValue.current = props.value;
    }
    if (defaultValue.current != null) {
      props.defaultValue = defaultValue.current;
    }
    const className = utilities_useClassName(
      theme => ({
        background: 'transparent',
        border: `solid 1px ${theme.textArea.border}`,
        borderRadius: '4px',
        color: theme.text.primary,
        display: 'block',
        font: 'inherit',
        height: props.rows != null ? `calc(1.5em * ${props.rows} + 1em + 2px)` : 'auto',
        lineHeight: '1.5',
        padding: '0.5em 0.625em',
        resize: 'none',
        width: '100%',
        wordBreak: breakAll ? 'break-all' : 'normal',
        '&:disabled': {
          opacity: DISABLED_OPACITY,
        },
        '&:focus': {
          boxShadow: `0 0 0 2px ${theme.focus.shadow}`,
          outline: 'none',
        },
        '&:read-only': {
          color: theme.text.secondary,
        },
      }),
      [breakAll, props.rows],
    );
    return compat_module.createElement('textarea', {
      ...applyClassName(props, className),
      ref,
    });
  });

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
  var constant_S = 'second';
  var MIN = 'minute';
  var constant_H = 'hour';
  var constant_D = 'day';
  var constant_W = 'week';
  var constant_M = 'month';
  var constant_Q = 'quarter';
  var constant_Y = 'year';
  var DATE = 'date';
  var FORMAT_DEFAULT = 'YYYY-MM-DDTHH:mm:ssZ';
  var INVALID_DATE_STRING = 'Invalid Date';

  var REGEX_PARSE =
    /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/;
  var REGEX_FORMAT =
    /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;
  const locale_en = {
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
    var anchor = a.clone().add(wholeMonthDiff, constant_M);
    var c = b - anchor < 0;
    var anchor2 = a.clone().add(wholeMonthDiff + (c ? -1 : 1), constant_M);
    return +(-(wholeMonthDiff + (b - anchor) / (c ? anchor - anchor2 : anchor2 - anchor)) || 0);
  };

  var absFloor = function absFloor(n) {
    return n < 0 ? Math.ceil(n) || 0 : Math.floor(n);
  };

  var prettyUnit = function prettyUnit(u) {
    var special = {
      M: constant_M,
      y: constant_Y,
      w: constant_W,
      d: constant_D,
      D: DATE,
      h: constant_H,
      m: MIN,
      s: constant_S,
      ms: MS,
      Q: constant_Q,
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
  var esm_L = 'en';

  var Ls = {};

  Ls[esm_L] = locale_en;

  var isDayjs = function isDayjs(d) {
    return d instanceof Dayjs;
  };

  var parseLocale = function parseLocale(preset, object, isLocal) {
    var l;
    if (!preset) return esm_L;

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

    if (!isLocal && l) esm_L = l;
    return l || (!isLocal && esm_L);
  };

  var esm_dayjs = function dayjs(date, c) {
    if (isDayjs(date)) {
      return date.clone();
    }

    var cfg = typeof c === 'object' ? c : {};
    cfg.date = date;
    cfg.args = arguments;

    return new Dayjs(cfg);
  };

  var wrapper = function wrapper(date, instance) {
    return esm_dayjs(date, {
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
      var other = esm_dayjs(that);
      return this.startOf(units) <= other && other <= this.endOf(units);
    };

    _proto.isAfter = function isAfter(that, units) {
      return esm_dayjs(that) < this.startOf(units);
    };

    _proto.isBefore = function isBefore(that, units) {
      return this.endOf(units) < esm_dayjs(that);
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
        return isStartOf ? ins : ins.endOf(constant_D);
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
        case constant_Y:
          return isStartOf ? instanceFactory(1, 0) : instanceFactory(31, 11);

        case constant_M:
          return isStartOf ? instanceFactory(1, $M) : instanceFactory(0, $M + 1);

        case constant_W: {
          var weekStart = this.$locale().weekStart || 0;
          var gap = ($W < weekStart ? $W + 7 : $W) - weekStart;
          return instanceFactory(isStartOf ? $D - gap : $D + (6 - gap), $M);
        }

        case constant_D:
        case DATE:
          return instanceFactorySet(utcPad + 'Hours', 0);

        case constant_H:
          return instanceFactorySet(utcPad + 'Minutes', 1);

        case MIN:
          return instanceFactorySet(utcPad + 'Seconds', 2);

        case constant_S:
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
      (_C$D$C$DATE$C$M$C$Y$C[constant_D] = utcPad + 'Date'),
      (_C$D$C$DATE$C$M$C$Y$C[DATE] = utcPad + 'Date'),
      (_C$D$C$DATE$C$M$C$Y$C[constant_M] = utcPad + 'Month'),
      (_C$D$C$DATE$C$M$C$Y$C[constant_Y] = utcPad + 'FullYear'),
      (_C$D$C$DATE$C$M$C$Y$C[constant_H] = utcPad + 'Hours'),
      (_C$D$C$DATE$C$M$C$Y$C[MIN] = utcPad + 'Minutes'),
      (_C$D$C$DATE$C$M$C$Y$C[constant_S] = utcPad + 'Seconds'),
      (_C$D$C$DATE$C$M$C$Y$C[MS] = utcPad + 'Milliseconds'),
      _C$D$C$DATE$C$M$C$Y$C)[unit];
      var arg = unit === constant_D ? this.$D + (_int - this.$W) : _int;

      if (unit === constant_M || unit === constant_Y) {
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
        var d = esm_dayjs(_this2);
        return Utils.w(d.date(d.date() + Math.round(n * number)), _this2);
      };

      if (unit === constant_M) {
        return this.set(constant_M, this.$M + number);
      }

      if (unit === constant_Y) {
        return this.set(constant_Y, this.$y + number);
      }

      if (unit === constant_D) {
        return instanceFactorySet(1);
      }

      if (unit === constant_W) {
        return instanceFactorySet(7);
      }

      var step =
        ((_C$MIN$C$H$C$S$unit = {}),
        (_C$MIN$C$H$C$S$unit[MIN] = MILLISECONDS_A_MINUTE),
        (_C$MIN$C$H$C$S$unit[constant_H] = MILLISECONDS_A_HOUR),
        (_C$MIN$C$H$C$S$unit[constant_S] = MILLISECONDS_A_SECOND),
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
      var that = esm_dayjs(input);
      var zoneDelta = (that.utcOffset() - this.utcOffset()) * MILLISECONDS_A_MINUTE;
      var diff = this - that;
      var result = Utils.m(this, that);
      result =
        ((_C$Y$C$M$C$Q$C$W$C$D$ = {}),
        (_C$Y$C$M$C$Q$C$W$C$D$[constant_Y] = result / 12),
        (_C$Y$C$M$C$Q$C$W$C$D$[constant_M] = result),
        (_C$Y$C$M$C$Q$C$W$C$D$[constant_Q] = result / 3),
        (_C$Y$C$M$C$Q$C$W$C$D$[constant_W] = (diff - zoneDelta) / MILLISECONDS_A_WEEK),
        (_C$Y$C$M$C$Q$C$W$C$D$[constant_D] = (diff - zoneDelta) / MILLISECONDS_A_DAY),
        (_C$Y$C$M$C$Q$C$W$C$D$[constant_H] = diff / MILLISECONDS_A_HOUR),
        (_C$Y$C$M$C$Q$C$W$C$D$[MIN] = diff / MILLISECONDS_A_MINUTE),
        (_C$Y$C$M$C$Q$C$W$C$D$[constant_S] = diff / MILLISECONDS_A_SECOND),
        _C$Y$C$M$C$Q$C$W$C$D$)[unit] || diff;

      return _float ? result : Utils.a(result);
    };

    _proto.daysInMonth = function daysInMonth() {
      return this.endOf(constant_M).$D;
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
  esm_dayjs.prototype = proto;
  [
    ['$ms', MS],
    ['$s', constant_S],
    ['$m', MIN],
    ['$H', constant_H],
    ['$W', constant_D],
    ['$M', constant_M],
    ['$y', constant_Y],
    ['$D', DATE],
  ].forEach(function (g) {
    proto[g[1]] = function (input) {
      return this.$g(input, g[0], g[1]);
    };
  });

  esm_dayjs.extend = function (plugin, option) {
    if (!plugin.$i) {
      plugin(option, Dayjs, esm_dayjs);
      plugin.$i = true;
    }

    return esm_dayjs;
  };

  esm_dayjs.locale = parseLocale;
  esm_dayjs.isDayjs = isDayjs;

  esm_dayjs.unix = function (timestamp) {
    return esm_dayjs(timestamp * 1e3);
  };

  esm_dayjs.en = Ls[esm_L];
  esm_dayjs.Ls = Ls;
  esm_dayjs.p = {};
  const esm = esm_dayjs;
  function parseMatchPattern(input) {
    input = input.trim();
    const m = /^(\*|https?|ftp):\/\/(\*|(?:\*\.)?[^/*]+)(\/.*)$/.exec(input);
    return m && { scheme: m[1], host: m[2], path: m[3] };
  }

  class AltURL {
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
      return new AltURL(url);
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

  class MatchPattern {
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
      timestamp: dayjs().toISOString(),
    };
  }
  function stringKeys(record) {
    return Object.keys(record);
  }
  function stringEntries(record) {
    return Object.entries(record);
  }
  function numberKeys(record) {
    return Object.keys(record).map(Number);
  }
  function numberEntries(record) {
    return Object.entries(record).map(([key, value]) => [Number(key), value]);
  }
  function utilities_lines(s) {
    return s ? s.split('\n') : [];
  }
  function unlines(ss) {
    return ss.join('\n');
  }
  const utilities_r = String.raw.bind(String);

  const DefaultBufferLength = 1024;
  let nextPropID = 0;
  class Range {
    constructor(from, to) {
      this.from = from;
      this.to = to;
    }
  }
  class dist_NodeProp {
    constructor(config = {}) {
      this.id = nextPropID++;
      this.perNode = !!config.perNode;
      this.deserialize =
        config.deserialize ||
        (() => {
          throw new Error("This node type doesn't define a deserialize function");
        });
    }
    add(match) {
      if (this.perNode) throw new RangeError("Can't add per-node props to node types");
      if (typeof match != 'function') match = NodeType.match(match);
      return type => {
        let result = match(type);
        return result === undefined ? null : [this, result];
      };
    }
  }
  dist_NodeProp.closedBy = new dist_NodeProp({ deserialize: str => str.split(' ') });
  dist_NodeProp.openedBy = new dist_NodeProp({ deserialize: str => str.split(' ') });
  dist_NodeProp.group = new dist_NodeProp({ deserialize: str => str.split(' ') });
  dist_NodeProp.contextHash = new dist_NodeProp({ perNode: true });
  dist_NodeProp.lookAhead = new dist_NodeProp({ perNode: true });
  dist_NodeProp.mounted = new dist_NodeProp({ perNode: true });
  class MountedTree {
    constructor(tree, overlay, parser) {
      this.tree = tree;
      this.overlay = overlay;
      this.parser = parser;
    }
  }
  const noProps = Object.create(null);
  class NodeType {
    constructor(name, props, id, flags = 0) {
      this.name = name;
      this.props = props;
      this.id = id;
      this.flags = flags;
    }
    static define(spec) {
      let props = spec.props && spec.props.length ? Object.create(null) : noProps;
      let flags =
        (spec.top ? 1 : 0) |
        (spec.skipped ? 2 : 0) |
        (spec.error ? 4 : 0) |
        (spec.name == null ? 8 : 0);
      let type = new NodeType(spec.name || '', props, spec.id, flags);
      if (spec.props)
        for (let src of spec.props) {
          if (!Array.isArray(src)) src = src(type);
          if (src) {
            if (src[0].perNode) throw new RangeError("Can't store a per-node prop on a node type");
            props[src[0].id] = src[1];
          }
        }
      return type;
    }
    prop(prop) {
      return this.props[prop.id];
    }
    get isTop() {
      return (this.flags & 1) > 0;
    }
    get isSkipped() {
      return (this.flags & 2) > 0;
    }
    get isError() {
      return (this.flags & 4) > 0;
    }
    get isAnonymous() {
      return (this.flags & 8) > 0;
    }
    is(name) {
      if (typeof name == 'string') {
        if (this.name == name) return true;
        let group = this.prop(dist_NodeProp.group);
        return group ? group.indexOf(name) > -1 : false;
      }
      return this.id == name;
    }
    static match(map) {
      let direct = Object.create(null);
      for (let prop in map) for (let name of prop.split(' ')) direct[name] = map[prop];
      return node => {
        for (
          let groups = node.prop(dist_NodeProp.group), i = -1;
          i < (groups ? groups.length : 0);
          i++
        ) {
          let found = direct[i < 0 ? node.name : groups[i]];
          if (found) return found;
        }
      };
    }
  }
  NodeType.none = new NodeType('', Object.create(null), 0, 8);
  class NodeSet {
    constructor(types) {
      this.types = types;
      for (let i = 0; i < types.length; i++)
        if (types[i].id != i)
          throw new RangeError(
            'Node type ids should correspond to array positions when creating a node set',
          );
    }
    extend(...props) {
      let newTypes = [];
      for (let type of this.types) {
        let newProps = null;
        for (let source of props) {
          let add = source(type);
          if (add) {
            if (!newProps) newProps = Object.assign({}, type.props);
            newProps[add[0].id] = add[1];
          }
        }
        newTypes.push(newProps ? new NodeType(type.name, newProps, type.id, type.flags) : type);
      }
      return new NodeSet(newTypes);
    }
  }
  const CachedNode = new WeakMap(),
    CachedInnerNode = new WeakMap();
  var IterMode;
  (function (IterMode) {
    IterMode[(IterMode['ExcludeBuffers'] = 1)] = 'ExcludeBuffers';
    IterMode[(IterMode['IncludeAnonymous'] = 2)] = 'IncludeAnonymous';
    IterMode[(IterMode['IgnoreMounts'] = 4)] = 'IgnoreMounts';
    IterMode[(IterMode['IgnoreOverlays'] = 8)] = 'IgnoreOverlays';
  })(IterMode || (IterMode = {}));
  class Tree {
    constructor(type, children, positions, length, props) {
      this.type = type;
      this.children = children;
      this.positions = positions;
      this.length = length;
      this.props = null;
      if (props && props.length) {
        this.props = Object.create(null);
        for (let [prop, value] of props)
          this.props[typeof prop == 'number' ? prop : prop.id] = value;
      }
    }
    toString() {
      let mounted = this.prop(dist_NodeProp.mounted);
      if (mounted && !mounted.overlay) return mounted.tree.toString();
      let children = '';
      for (let ch of this.children) {
        let str = ch.toString();
        if (str) {
          if (children) children += ',';
          children += str;
        }
      }
      return !this.type.name
        ? children
        : (/\W/.test(this.type.name) && !this.type.isError
            ? JSON.stringify(this.type.name)
            : this.type.name) + (children.length ? '(' + children + ')' : '');
    }
    cursor(mode = 0) {
      return new TreeCursor(this.topNode, mode);
    }
    cursorAt(pos, side = 0, mode = 0) {
      let scope = CachedNode.get(this) || this.topNode;
      let cursor = new TreeCursor(scope);
      cursor.moveTo(pos, side);
      CachedNode.set(this, cursor._tree);
      return cursor;
    }
    get topNode() {
      return new TreeNode(this, 0, 0, null);
    }
    resolve(pos, side = 0) {
      let node = resolveNode(CachedNode.get(this) || this.topNode, pos, side, false);
      CachedNode.set(this, node);
      return node;
    }
    resolveInner(pos, side = 0) {
      let node = resolveNode(CachedInnerNode.get(this) || this.topNode, pos, side, true);
      CachedInnerNode.set(this, node);
      return node;
    }
    iterate(spec) {
      let { enter, leave, from = 0, to = this.length } = spec;
      for (let c = this.cursor((spec.mode || 0) | IterMode.IncludeAnonymous); ; ) {
        let entered = false;
        if (c.from <= to && c.to >= from && (c.type.isAnonymous || enter(c) !== false)) {
          if (c.firstChild()) continue;
          entered = true;
        }
        for (;;) {
          if (entered && leave && !c.type.isAnonymous) leave(c);
          if (c.nextSibling()) break;
          if (!c.parent()) return;
          entered = true;
        }
      }
    }
    prop(prop) {
      return !prop.perNode ? this.type.prop(prop) : this.props ? this.props[prop.id] : undefined;
    }
    get propValues() {
      let result = [];
      if (this.props) for (let id in this.props) result.push([+id, this.props[id]]);
      return result;
    }
    balance(config = {}) {
      return this.children.length <= 8
        ? this
        : balanceRange(
            NodeType.none,
            this.children,
            this.positions,
            0,
            this.children.length,
            0,
            this.length,
            (children, positions, length) =>
              new Tree(this.type, children, positions, length, this.propValues),
            config.makeTree ||
              ((children, positions, length) =>
                new Tree(NodeType.none, children, positions, length)),
          );
    }
    static build(data) {
      return buildTree(data);
    }
  }
  Tree.empty = new Tree(NodeType.none, [], [], 0);
  class FlatBufferCursor {
    constructor(buffer, index) {
      this.buffer = buffer;
      this.index = index;
    }
    get id() {
      return this.buffer[this.index - 4];
    }
    get start() {
      return this.buffer[this.index - 3];
    }
    get end() {
      return this.buffer[this.index - 2];
    }
    get size() {
      return this.buffer[this.index - 1];
    }
    get pos() {
      return this.index;
    }
    next() {
      this.index -= 4;
    }
    fork() {
      return new FlatBufferCursor(this.buffer, this.index);
    }
  }
  class TreeBuffer {
    constructor(buffer, length, set) {
      this.buffer = buffer;
      this.length = length;
      this.set = set;
    }
    get type() {
      return NodeType.none;
    }
    toString() {
      let result = [];
      for (let index = 0; index < this.buffer.length; ) {
        result.push(this.childString(index));
        index = this.buffer[index + 3];
      }
      return result.join(',');
    }
    childString(index) {
      let id = this.buffer[index],
        endIndex = this.buffer[index + 3];
      let type = this.set.types[id],
        result = type.name;
      if (/\W/.test(result) && !type.isError) result = JSON.stringify(result);
      index += 4;
      if (endIndex == index) return result;
      let children = [];
      while (index < endIndex) {
        children.push(this.childString(index));
        index = this.buffer[index + 3];
      }
      return result + '(' + children.join(',') + ')';
    }
    findChild(startIndex, endIndex, dir, pos, side) {
      let { buffer } = this,
        pick = -1;
      for (let i = startIndex; i != endIndex; i = buffer[i + 3]) {
        if (checkSide(side, pos, buffer[i + 1], buffer[i + 2])) {
          pick = i;
          if (dir > 0) break;
        }
      }
      return pick;
    }
    slice(startI, endI, from, to) {
      let b = this.buffer;
      let copy = new Uint16Array(endI - startI);
      for (let i = startI, j = 0; i < endI; ) {
        copy[j++] = b[i++];
        copy[j++] = b[i++] - from;
        copy[j++] = b[i++] - from;
        copy[j++] = b[i++] - startI;
      }
      return new TreeBuffer(copy, to - from, this.set);
    }
  }
  function checkSide(side, pos, from, to) {
    switch (side) {
      case -2:
        return from < pos;
      case -1:
        return to >= pos && from < pos;
      case 0:
        return from < pos && to > pos;
      case 1:
        return from <= pos && to > pos;
      case 2:
        return to > pos;
      case 4:
        return true;
    }
  }
  function enterUnfinishedNodesBefore(node, pos) {
    let scan = node.childBefore(pos);
    while (scan) {
      let last = scan.lastChild;
      if (!last || last.to != scan.to) break;
      if (last.type.isError && last.from == last.to) {
        node = scan;
        scan = last.prevSibling;
      } else {
        scan = last;
      }
    }
    return node;
  }
  function resolveNode(node, pos, side, overlays) {
    var _a;
    while (
      node.from == node.to ||
      (side < 1 ? node.from >= pos : node.from > pos) ||
      (side > -1 ? node.to <= pos : node.to < pos)
    ) {
      let parent = !overlays && node instanceof TreeNode && node.index < 0 ? null : node.parent;
      if (!parent) return node;
      node = parent;
    }
    let mode = overlays ? 0 : IterMode.IgnoreOverlays;
    if (overlays)
      for (let scan = node, parent = scan.parent; parent; scan = parent, parent = scan.parent) {
        if (
          scan instanceof TreeNode &&
          scan.index < 0 &&
          ((_a = parent.enter(pos, side, mode)) === null || _a === void 0 ? void 0 : _a.from) !=
            scan.from
        )
          node = parent;
      }
    for (;;) {
      let inner = node.enter(pos, side, mode);
      if (!inner) return node;
      node = inner;
    }
  }
  class TreeNode {
    constructor(_tree, from, index, _parent) {
      this._tree = _tree;
      this.from = from;
      this.index = index;
      this._parent = _parent;
    }
    get type() {
      return this._tree.type;
    }
    get name() {
      return this._tree.type.name;
    }
    get to() {
      return this.from + this._tree.length;
    }
    nextChild(i, dir, pos, side, mode = 0) {
      for (let parent = this; ; ) {
        for (
          let { children, positions } = parent._tree, e = dir > 0 ? children.length : -1;
          i != e;
          i += dir
        ) {
          let next = children[i],
            start = positions[i] + parent.from;
          if (!checkSide(side, pos, start, start + next.length)) continue;
          if (next instanceof TreeBuffer) {
            if (mode & IterMode.ExcludeBuffers) continue;
            let index = next.findChild(0, next.buffer.length, dir, pos - start, side);
            if (index > -1)
              return new BufferNode(new BufferContext(parent, next, i, start), null, index);
          } else if (mode & IterMode.IncludeAnonymous || !next.type.isAnonymous || hasChild(next)) {
            let mounted;
            if (
              !(mode & IterMode.IgnoreMounts) &&
              next.props &&
              (mounted = next.prop(dist_NodeProp.mounted)) &&
              !mounted.overlay
            )
              return new TreeNode(mounted.tree, start, i, parent);
            let inner = new TreeNode(next, start, i, parent);
            return mode & IterMode.IncludeAnonymous || !inner.type.isAnonymous
              ? inner
              : inner.nextChild(dir < 0 ? next.children.length - 1 : 0, dir, pos, side);
          }
        }
        if (mode & IterMode.IncludeAnonymous || !parent.type.isAnonymous) return null;
        if (parent.index >= 0) i = parent.index + dir;
        else i = dir < 0 ? -1 : parent._parent._tree.children.length;
        parent = parent._parent;
        if (!parent) return null;
      }
    }
    get firstChild() {
      return this.nextChild(0, 1, 0, 4);
    }
    get lastChild() {
      return this.nextChild(this._tree.children.length - 1, -1, 0, 4);
    }
    childAfter(pos) {
      return this.nextChild(0, 1, pos, 2);
    }
    childBefore(pos) {
      return this.nextChild(this._tree.children.length - 1, -1, pos, -2);
    }
    enter(pos, side, mode = 0) {
      let mounted;
      if (
        !(mode & IterMode.IgnoreOverlays) &&
        (mounted = this._tree.prop(dist_NodeProp.mounted)) &&
        mounted.overlay
      ) {
        let rPos = pos - this.from;
        for (let { from, to } of mounted.overlay) {
          if ((side > 0 ? from <= rPos : from < rPos) && (side < 0 ? to >= rPos : to > rPos))
            return new TreeNode(mounted.tree, mounted.overlay[0].from + this.from, -1, this);
        }
      }
      return this.nextChild(0, 1, pos, side, mode);
    }
    nextSignificantParent() {
      let val = this;
      while (val.type.isAnonymous && val._parent) val = val._parent;
      return val;
    }
    get parent() {
      return this._parent ? this._parent.nextSignificantParent() : null;
    }
    get nextSibling() {
      return this._parent && this.index >= 0
        ? this._parent.nextChild(this.index + 1, 1, 0, 4)
        : null;
    }
    get prevSibling() {
      return this._parent && this.index >= 0
        ? this._parent.nextChild(this.index - 1, -1, 0, 4)
        : null;
    }
    cursor(mode = 0) {
      return new TreeCursor(this, mode);
    }
    get tree() {
      return this._tree;
    }
    toTree() {
      return this._tree;
    }
    resolve(pos, side = 0) {
      return resolveNode(this, pos, side, false);
    }
    resolveInner(pos, side = 0) {
      return resolveNode(this, pos, side, true);
    }
    enterUnfinishedNodesBefore(pos) {
      return enterUnfinishedNodesBefore(this, pos);
    }
    getChild(type, before = null, after = null) {
      let r = getChildren(this, type, before, after);
      return r.length ? r[0] : null;
    }
    getChildren(type, before = null, after = null) {
      return getChildren(this, type, before, after);
    }
    toString() {
      return this._tree.toString();
    }
    get node() {
      return this;
    }
    matchContext(context) {
      return matchNodeContext(this, context);
    }
  }
  function getChildren(node, type, before, after) {
    let cur = node.cursor(),
      result = [];
    if (!cur.firstChild()) return result;
    if (before != null) while (!cur.type.is(before)) if (!cur.nextSibling()) return result;
    for (;;) {
      if (after != null && cur.type.is(after)) return result;
      if (cur.type.is(type)) result.push(cur.node);
      if (!cur.nextSibling()) return after == null ? result : [];
    }
  }
  function matchNodeContext(node, context, i = context.length - 1) {
    for (let p = node.parent; i >= 0; p = p.parent) {
      if (!p) return false;
      if (!p.type.isAnonymous) {
        if (context[i] && context[i] != p.name) return false;
        i--;
      }
    }
    return true;
  }
  class BufferContext {
    constructor(parent, buffer, index, start) {
      this.parent = parent;
      this.buffer = buffer;
      this.index = index;
      this.start = start;
    }
  }
  class BufferNode {
    constructor(context, _parent, index) {
      this.context = context;
      this._parent = _parent;
      this.index = index;
      this.type = context.buffer.set.types[context.buffer.buffer[index]];
    }
    get name() {
      return this.type.name;
    }
    get from() {
      return this.context.start + this.context.buffer.buffer[this.index + 1];
    }
    get to() {
      return this.context.start + this.context.buffer.buffer[this.index + 2];
    }
    child(dir, pos, side) {
      let { buffer } = this.context;
      let index = buffer.findChild(
        this.index + 4,
        buffer.buffer[this.index + 3],
        dir,
        pos - this.context.start,
        side,
      );
      return index < 0 ? null : new BufferNode(this.context, this, index);
    }
    get firstChild() {
      return this.child(1, 0, 4);
    }
    get lastChild() {
      return this.child(-1, 0, 4);
    }
    childAfter(pos) {
      return this.child(1, pos, 2);
    }
    childBefore(pos) {
      return this.child(-1, pos, -2);
    }
    enter(pos, side, mode = 0) {
      if (mode & IterMode.ExcludeBuffers) return null;
      let { buffer } = this.context;
      let index = buffer.findChild(
        this.index + 4,
        buffer.buffer[this.index + 3],
        side > 0 ? 1 : -1,
        pos - this.context.start,
        side,
      );
      return index < 0 ? null : new BufferNode(this.context, this, index);
    }
    get parent() {
      return this._parent || this.context.parent.nextSignificantParent();
    }
    externalSibling(dir) {
      return this._parent
        ? null
        : this.context.parent.nextChild(this.context.index + dir, dir, 0, 4);
    }
    get nextSibling() {
      let { buffer } = this.context;
      let after = buffer.buffer[this.index + 3];
      if (after < (this._parent ? buffer.buffer[this._parent.index + 3] : buffer.buffer.length))
        return new BufferNode(this.context, this._parent, after);
      return this.externalSibling(1);
    }
    get prevSibling() {
      let { buffer } = this.context;
      let parentStart = this._parent ? this._parent.index + 4 : 0;
      if (this.index == parentStart) return this.externalSibling(-1);
      return new BufferNode(
        this.context,
        this._parent,
        buffer.findChild(parentStart, this.index, -1, 0, 4),
      );
    }
    cursor(mode = 0) {
      return new TreeCursor(this, mode);
    }
    get tree() {
      return null;
    }
    toTree() {
      let children = [],
        positions = [];
      let { buffer } = this.context;
      let startI = this.index + 4,
        endI = buffer.buffer[this.index + 3];
      if (endI > startI) {
        let from = buffer.buffer[this.index + 1],
          to = buffer.buffer[this.index + 2];
        children.push(buffer.slice(startI, endI, from, to));
        positions.push(0);
      }
      return new Tree(this.type, children, positions, this.to - this.from);
    }
    resolve(pos, side = 0) {
      return resolveNode(this, pos, side, false);
    }
    resolveInner(pos, side = 0) {
      return resolveNode(this, pos, side, true);
    }
    enterUnfinishedNodesBefore(pos) {
      return enterUnfinishedNodesBefore(this, pos);
    }
    toString() {
      return this.context.buffer.childString(this.index);
    }
    getChild(type, before = null, after = null) {
      let r = getChildren(this, type, before, after);
      return r.length ? r[0] : null;
    }
    getChildren(type, before = null, after = null) {
      return getChildren(this, type, before, after);
    }
    get node() {
      return this;
    }
    matchContext(context) {
      return matchNodeContext(this, context);
    }
  }
  class TreeCursor {
    constructor(node, mode = 0) {
      this.mode = mode;
      this.buffer = null;
      this.stack = [];
      this.index = 0;
      this.bufferNode = null;
      if (node instanceof TreeNode) {
        this.yieldNode(node);
      } else {
        this._tree = node.context.parent;
        this.buffer = node.context;
        for (let n = node._parent; n; n = n._parent) this.stack.unshift(n.index);
        this.bufferNode = node;
        this.yieldBuf(node.index);
      }
    }
    get name() {
      return this.type.name;
    }
    yieldNode(node) {
      if (!node) return false;
      this._tree = node;
      this.type = node.type;
      this.from = node.from;
      this.to = node.to;
      return true;
    }
    yieldBuf(index, type) {
      this.index = index;
      let { start, buffer } = this.buffer;
      this.type = type || buffer.set.types[buffer.buffer[index]];
      this.from = start + buffer.buffer[index + 1];
      this.to = start + buffer.buffer[index + 2];
      return true;
    }
    yield(node) {
      if (!node) return false;
      if (node instanceof TreeNode) {
        this.buffer = null;
        return this.yieldNode(node);
      }
      this.buffer = node.context;
      return this.yieldBuf(node.index, node.type);
    }
    toString() {
      return this.buffer ? this.buffer.buffer.childString(this.index) : this._tree.toString();
    }
    enterChild(dir, pos, side) {
      if (!this.buffer)
        return this.yield(
          this._tree.nextChild(
            dir < 0 ? this._tree._tree.children.length - 1 : 0,
            dir,
            pos,
            side,
            this.mode,
          ),
        );
      let { buffer } = this.buffer;
      let index = buffer.findChild(
        this.index + 4,
        buffer.buffer[this.index + 3],
        dir,
        pos - this.buffer.start,
        side,
      );
      if (index < 0) return false;
      this.stack.push(this.index);
      return this.yieldBuf(index);
    }
    firstChild() {
      return this.enterChild(1, 0, 4);
    }
    lastChild() {
      return this.enterChild(-1, 0, 4);
    }
    childAfter(pos) {
      return this.enterChild(1, pos, 2);
    }
    childBefore(pos) {
      return this.enterChild(-1, pos, -2);
    }
    enter(pos, side, mode = this.mode) {
      if (!this.buffer) return this.yield(this._tree.enter(pos, side, mode));
      return mode & IterMode.ExcludeBuffers ? false : this.enterChild(1, pos, side);
    }
    parent() {
      if (!this.buffer)
        return this.yieldNode(
          this.mode & IterMode.IncludeAnonymous ? this._tree._parent : this._tree.parent,
        );
      if (this.stack.length) return this.yieldBuf(this.stack.pop());
      let parent =
        this.mode & IterMode.IncludeAnonymous
          ? this.buffer.parent
          : this.buffer.parent.nextSignificantParent();
      this.buffer = null;
      return this.yieldNode(parent);
    }
    sibling(dir) {
      if (!this.buffer)
        return !this._tree._parent
          ? false
          : this.yield(
              this._tree.index < 0
                ? null
                : this._tree._parent.nextChild(this._tree.index + dir, dir, 0, 4, this.mode),
            );
      let { buffer } = this.buffer,
        d = this.stack.length - 1;
      if (dir < 0) {
        let parentStart = d < 0 ? 0 : this.stack[d] + 4;
        if (this.index != parentStart)
          return this.yieldBuf(buffer.findChild(parentStart, this.index, -1, 0, 4));
      } else {
        let after = buffer.buffer[this.index + 3];
        if (after < (d < 0 ? buffer.buffer.length : buffer.buffer[this.stack[d] + 3]))
          return this.yieldBuf(after);
      }
      return d < 0
        ? this.yield(this.buffer.parent.nextChild(this.buffer.index + dir, dir, 0, 4, this.mode))
        : false;
    }
    nextSibling() {
      return this.sibling(1);
    }
    prevSibling() {
      return this.sibling(-1);
    }
    atLastNode(dir) {
      let index,
        parent,
        { buffer } = this;
      if (buffer) {
        if (dir > 0) {
          if (this.index < buffer.buffer.buffer.length) return false;
        } else {
          for (let i = 0; i < this.index; i++)
            if (buffer.buffer.buffer[i + 3] < this.index) return false;
        }
        ({ index, parent } = buffer);
      } else {
        ({ index, _parent: parent } = this._tree);
      }
      for (; parent; { index, _parent: parent } = parent) {
        if (index > -1)
          for (
            let i = index + dir, e = dir < 0 ? -1 : parent._tree.children.length;
            i != e;
            i += dir
          ) {
            let child = parent._tree.children[i];
            if (
              this.mode & IterMode.IncludeAnonymous ||
              child instanceof TreeBuffer ||
              !child.type.isAnonymous ||
              hasChild(child)
            )
              return false;
          }
      }
      return true;
    }
    move(dir, enter) {
      if (enter && this.enterChild(dir, 0, 4)) return true;
      for (;;) {
        if (this.sibling(dir)) return true;
        if (this.atLastNode(dir) || !this.parent()) return false;
      }
    }
    next(enter = true) {
      return this.move(1, enter);
    }
    prev(enter = true) {
      return this.move(-1, enter);
    }
    moveTo(pos, side = 0) {
      while (
        this.from == this.to ||
        (side < 1 ? this.from >= pos : this.from > pos) ||
        (side > -1 ? this.to <= pos : this.to < pos)
      )
        if (!this.parent()) break;
      while (this.enterChild(1, pos, side)) {}
      return this;
    }
    get node() {
      if (!this.buffer) return this._tree;
      let cache = this.bufferNode,
        result = null,
        depth = 0;
      if (cache && cache.context == this.buffer) {
        scan: for (let index = this.index, d = this.stack.length; d >= 0; ) {
          for (let c = cache; c; c = c._parent)
            if (c.index == index) {
              if (index == this.index) return c;
              result = c;
              depth = d + 1;
              break scan;
            }
          index = this.stack[--d];
        }
      }
      for (let i = depth; i < this.stack.length; i++)
        result = new BufferNode(this.buffer, result, this.stack[i]);
      return (this.bufferNode = new BufferNode(this.buffer, result, this.index));
    }
    get tree() {
      return this.buffer ? null : this._tree._tree;
    }
    iterate(enter, leave) {
      for (let depth = 0; ; ) {
        let mustLeave = false;
        if (this.type.isAnonymous || enter(this) !== false) {
          if (this.firstChild()) {
            depth++;
            continue;
          }
          if (!this.type.isAnonymous) mustLeave = true;
        }
        for (;;) {
          if (mustLeave && leave) leave(this);
          mustLeave = this.type.isAnonymous;
          if (this.nextSibling()) break;
          if (!depth) return;
          this.parent();
          depth--;
          mustLeave = true;
        }
      }
    }
    matchContext(context) {
      if (!this.buffer) return matchNodeContext(this.node, context);
      let { buffer } = this.buffer,
        { types } = buffer.set;
      for (let i = context.length - 1, d = this.stack.length - 1; i >= 0; d--) {
        if (d < 0) return matchNodeContext(this.node, context, i);
        let type = types[buffer.buffer[this.stack[d]]];
        if (!type.isAnonymous) {
          if (context[i] && context[i] != type.name) return false;
          i--;
        }
      }
      return true;
    }
  }
  function hasChild(tree) {
    return tree.children.some(
      ch => ch instanceof TreeBuffer || !ch.type.isAnonymous || hasChild(ch),
    );
  }
  function buildTree(data) {
    var _a;
    let {
      buffer,
      nodeSet,
      maxBufferLength = DefaultBufferLength,
      reused = [],
      minRepeatType = nodeSet.types.length,
    } = data;
    let cursor = Array.isArray(buffer) ? new FlatBufferCursor(buffer, buffer.length) : buffer;
    let types = nodeSet.types;
    let contextHash = 0,
      lookAhead = 0;
    function takeNode(parentStart, minPos, children, positions, inRepeat) {
      let { id, start, end, size } = cursor;
      let lookAheadAtStart = lookAhead;
      while (size < 0) {
        cursor.next();
        if (size == -1) {
          let node = reused[id];
          children.push(node);
          positions.push(start - parentStart);
          return;
        } else if (size == -3) {
          contextHash = id;
          return;
        } else if (size == -4) {
          lookAhead = id;
          return;
        } else {
          throw new RangeError(`Unrecognized record size: ${size}`);
        }
      }
      let type = types[id],
        node,
        buffer;
      let startPos = start - parentStart;
      if (
        end - start <= maxBufferLength &&
        (buffer = findBufferSize(cursor.pos - minPos, inRepeat))
      ) {
        let data = new Uint16Array(buffer.size - buffer.skip);
        let endPos = cursor.pos - buffer.size,
          index = data.length;
        while (cursor.pos > endPos) index = copyToBuffer(buffer.start, data, index);
        node = new TreeBuffer(data, end - buffer.start, nodeSet);
        startPos = buffer.start - parentStart;
      } else {
        let endPos = cursor.pos - size;
        cursor.next();
        let localChildren = [],
          localPositions = [];
        let localInRepeat = id >= minRepeatType ? id : -1;
        let lastGroup = 0,
          lastEnd = end;
        while (cursor.pos > endPos) {
          if (localInRepeat >= 0 && cursor.id == localInRepeat && cursor.size >= 0) {
            if (cursor.end <= lastEnd - maxBufferLength) {
              makeRepeatLeaf(
                localChildren,
                localPositions,
                start,
                lastGroup,
                cursor.end,
                lastEnd,
                localInRepeat,
                lookAheadAtStart,
              );
              lastGroup = localChildren.length;
              lastEnd = cursor.end;
            }
            cursor.next();
          } else {
            takeNode(start, endPos, localChildren, localPositions, localInRepeat);
          }
        }
        if (localInRepeat >= 0 && lastGroup > 0 && lastGroup < localChildren.length)
          makeRepeatLeaf(
            localChildren,
            localPositions,
            start,
            lastGroup,
            start,
            lastEnd,
            localInRepeat,
            lookAheadAtStart,
          );
        localChildren.reverse();
        localPositions.reverse();
        if (localInRepeat > -1 && lastGroup > 0) {
          let make = makeBalanced(type);
          node = balanceRange(
            type,
            localChildren,
            localPositions,
            0,
            localChildren.length,
            0,
            end - start,
            make,
            make,
          );
        } else {
          node = makeTree(type, localChildren, localPositions, end - start, lookAheadAtStart - end);
        }
      }
      children.push(node);
      positions.push(startPos);
    }
    function makeBalanced(type) {
      return (children, positions, length) => {
        let lookAhead = 0,
          lastI = children.length - 1,
          last,
          lookAheadProp;
        if (lastI >= 0 && (last = children[lastI]) instanceof Tree) {
          if (!lastI && last.type == type && last.length == length) return last;
          if ((lookAheadProp = last.prop(dist_NodeProp.lookAhead)))
            lookAhead = positions[lastI] + last.length + lookAheadProp;
        }
        return makeTree(type, children, positions, length, lookAhead);
      };
    }
    function makeRepeatLeaf(children, positions, base, i, from, to, type, lookAhead) {
      let localChildren = [],
        localPositions = [];
      while (children.length > i) {
        localChildren.push(children.pop());
        localPositions.push(positions.pop() + base - from);
      }
      children.push(
        makeTree(nodeSet.types[type], localChildren, localPositions, to - from, lookAhead - to),
      );
      positions.push(from - base);
    }
    function makeTree(type, children, positions, length, lookAhead = 0, props) {
      if (contextHash) {
        let pair = [dist_NodeProp.contextHash, contextHash];
        props = props ? [pair].concat(props) : [pair];
      }
      if (lookAhead > 25) {
        let pair = [dist_NodeProp.lookAhead, lookAhead];
        props = props ? [pair].concat(props) : [pair];
      }
      return new Tree(type, children, positions, length, props);
    }
    function findBufferSize(maxSize, inRepeat) {
      let fork = cursor.fork();
      let size = 0,
        start = 0,
        skip = 0,
        minStart = fork.end - maxBufferLength;
      let result = { size: 0, start: 0, skip: 0 };
      scan: for (let minPos = fork.pos - maxSize; fork.pos > minPos; ) {
        let nodeSize = fork.size;
        if (fork.id == inRepeat && nodeSize >= 0) {
          result.size = size;
          result.start = start;
          result.skip = skip;
          skip += 4;
          size += 4;
          fork.next();
          continue;
        }
        let startPos = fork.pos - nodeSize;
        if (nodeSize < 0 || startPos < minPos || fork.start < minStart) break;
        let localSkipped = fork.id >= minRepeatType ? 4 : 0;
        let nodeStart = fork.start;
        fork.next();
        while (fork.pos > startPos) {
          if (fork.size < 0) {
            if (fork.size == -3) localSkipped += 4;
            else break scan;
          } else if (fork.id >= minRepeatType) {
            localSkipped += 4;
          }
          fork.next();
        }
        start = nodeStart;
        size += nodeSize;
        skip += localSkipped;
      }
      if (inRepeat < 0 || size == maxSize) {
        result.size = size;
        result.start = start;
        result.skip = skip;
      }
      return result.size > 4 ? result : undefined;
    }
    function copyToBuffer(bufferStart, buffer, index) {
      let { id, start, end, size } = cursor;
      cursor.next();
      if (size >= 0 && id < minRepeatType) {
        let startIndex = index;
        if (size > 4) {
          let endPos = cursor.pos - (size - 4);
          while (cursor.pos > endPos) index = copyToBuffer(bufferStart, buffer, index);
        }
        buffer[--index] = startIndex;
        buffer[--index] = end - bufferStart;
        buffer[--index] = start - bufferStart;
        buffer[--index] = id;
      } else if (size == -3) {
        contextHash = id;
      } else if (size == -4) {
        lookAhead = id;
      }
      return index;
    }
    let children = [],
      positions = [];
    while (cursor.pos > 0)
      takeNode(data.start || 0, data.bufferStart || 0, children, positions, -1);
    let length =
      (_a = data.length) !== null && _a !== void 0
        ? _a
        : children.length
        ? positions[0] + children[0].length
        : 0;
    return new Tree(types[data.topID], children.reverse(), positions.reverse(), length);
  }
  const nodeSizeCache = new WeakMap();
  function nodeSize(balanceType, node) {
    if (!balanceType.isAnonymous || node instanceof TreeBuffer || node.type != balanceType)
      return 1;
    let size = nodeSizeCache.get(node);
    if (size == null) {
      size = 1;
      for (let child of node.children) {
        if (child.type != balanceType || !(child instanceof Tree)) {
          size = 1;
          break;
        }
        size += nodeSize(balanceType, child);
      }
      nodeSizeCache.set(node, size);
    }
    return size;
  }
  function balanceRange(balanceType, children, positions, from, to, start, length, mkTop, mkTree) {
    let total = 0;
    for (let i = from; i < to; i++) total += nodeSize(balanceType, children[i]);
    let maxChild = Math.ceil((total * 1.5) / 8);
    let localChildren = [],
      localPositions = [];
    function divide(children, positions, from, to, offset) {
      for (let i = from; i < to; ) {
        let groupFrom = i,
          groupStart = positions[i],
          groupSize = nodeSize(balanceType, children[i]);
        i++;
        for (; i < to; i++) {
          let nextSize = nodeSize(balanceType, children[i]);
          if (groupSize + nextSize >= maxChild) break;
          groupSize += nextSize;
        }
        if (i == groupFrom + 1) {
          if (groupSize > maxChild) {
            let only = children[groupFrom];
            divide(
              only.children,
              only.positions,
              0,
              only.children.length,
              positions[groupFrom] + offset,
            );
            continue;
          }
          localChildren.push(children[groupFrom]);
        } else {
          let length = positions[i - 1] + children[i - 1].length - groupStart;
          localChildren.push(
            balanceRange(
              balanceType,
              children,
              positions,
              groupFrom,
              i,
              groupStart,
              length,
              null,
              mkTree,
            ),
          );
        }
        localPositions.push(groupStart + offset - start);
      }
    }
    divide(children, positions, from, to, 0);
    return (mkTop || mkTree)(localChildren, localPositions, length);
  }
  class NodeWeakMap {
    constructor() {
      this.map = new WeakMap();
    }
    setBuffer(buffer, index, value) {
      let inner = this.map.get(buffer);
      if (!inner) this.map.set(buffer, (inner = new Map()));
      inner.set(index, value);
    }
    getBuffer(buffer, index) {
      let inner = this.map.get(buffer);
      return inner && inner.get(index);
    }
    set(node, value) {
      if (node instanceof BufferNode) this.setBuffer(node.context.buffer, node.index, value);
      else if (node instanceof TreeNode) this.map.set(node.tree, value);
    }
    get(node) {
      return node instanceof BufferNode
        ? this.getBuffer(node.context.buffer, node.index)
        : node instanceof TreeNode
        ? this.map.get(node.tree)
        : undefined;
    }
    cursorSet(cursor, value) {
      if (cursor.buffer) this.setBuffer(cursor.buffer.buffer, cursor.index, value);
      else this.map.set(cursor.tree, value);
    }
    cursorGet(cursor) {
      return cursor.buffer
        ? this.getBuffer(cursor.buffer.buffer, cursor.index)
        : this.map.get(cursor.tree);
    }
  }

  class TreeFragment {
    constructor(from, to, tree, offset, openStart = false, openEnd = false) {
      this.from = from;
      this.to = to;
      this.tree = tree;
      this.offset = offset;
      this.open = (openStart ? 1 : 0) | (openEnd ? 2 : 0);
    }
    get openStart() {
      return (this.open & 1) > 0;
    }
    get openEnd() {
      return (this.open & 2) > 0;
    }
    static addTree(tree, fragments = [], partial = false) {
      let result = [new TreeFragment(0, tree.length, tree, 0, false, partial)];
      for (let f of fragments) if (f.to > tree.length) result.push(f);
      return result;
    }
    static applyChanges(fragments, changes, minGap = 128) {
      if (!changes.length) return fragments;
      let result = [];
      let fI = 1,
        nextF = fragments.length ? fragments[0] : null;
      for (let cI = 0, pos = 0, off = 0; ; cI++) {
        let nextC = cI < changes.length ? changes[cI] : null;
        let nextPos = nextC ? nextC.fromA : 1e9;
        if (nextPos - pos >= minGap)
          while (nextF && nextF.from < nextPos) {
            let cut = nextF;
            if (pos >= cut.from || nextPos <= cut.to || off) {
              let fFrom = Math.max(cut.from, pos) - off,
                fTo = Math.min(cut.to, nextPos) - off;
              cut =
                fFrom >= fTo
                  ? null
                  : new TreeFragment(fFrom, fTo, cut.tree, cut.offset + off, cI > 0, !!nextC);
            }
            if (cut) result.push(cut);
            if (nextF.to > nextPos) break;
            nextF = fI < fragments.length ? fragments[fI++] : null;
          }
        if (!nextC) break;
        pos = nextC.toA;
        off = nextC.toA - nextC.toB;
      }
      return result;
    }
  }
  class Parser {
    startParse(input, fragments, ranges) {
      if (typeof input == 'string') input = new StringInput(input);
      ranges = !ranges
        ? [new Range(0, input.length)]
        : ranges.length
        ? ranges.map(r => new Range(r.from, r.to))
        : [new Range(0, 0)];
      return this.createParse(input, fragments || [], ranges);
    }
    parse(input, fragments, ranges) {
      let parse = this.startParse(input, fragments, ranges);
      for (;;) {
        let done = parse.advance();
        if (done) return done;
      }
    }
  }
  class StringInput {
    constructor(string) {
      this.string = string;
    }
    get length() {
      return this.string.length;
    }
    chunk(from) {
      return this.string.slice(from);
    }
    get lineChunks() {
      return false;
    }
    read(from, to) {
      return this.string.slice(from, to);
    }
  }

  function parseMixed(nest) {
    return (parse, input, fragments, ranges) =>
      new MixedParse(parse, nest, input, fragments, ranges);
  }
  class InnerParse {
    constructor(parser, parse, overlay, target, ranges) {
      this.parser = parser;
      this.parse = parse;
      this.overlay = overlay;
      this.target = target;
      this.ranges = ranges;
    }
  }
  class ActiveOverlay {
    constructor(parser, predicate, mounts, index, start, target, prev) {
      this.parser = parser;
      this.predicate = predicate;
      this.mounts = mounts;
      this.index = index;
      this.start = start;
      this.target = target;
      this.prev = prev;
      this.depth = 0;
      this.ranges = [];
    }
  }
  const stoppedInner = new dist_NodeProp({ perNode: true });
  class MixedParse {
    constructor(base, nest, input, fragments, ranges) {
      this.nest = nest;
      this.input = input;
      this.fragments = fragments;
      this.ranges = ranges;
      this.inner = [];
      this.innerDone = 0;
      this.baseTree = null;
      this.stoppedAt = null;
      this.baseParse = base;
    }
    advance() {
      if (this.baseParse) {
        let done = this.baseParse.advance();
        if (!done) return null;
        this.baseParse = null;
        this.baseTree = done;
        this.startInner();
        if (this.stoppedAt != null)
          for (let inner of this.inner) inner.parse.stopAt(this.stoppedAt);
      }
      if (this.innerDone == this.inner.length) {
        let result = this.baseTree;
        if (this.stoppedAt != null)
          result = new Tree(
            result.type,
            result.children,
            result.positions,
            result.length,
            result.propValues.concat([[stoppedInner, this.stoppedAt]]),
          );
        return result;
      }
      let inner = this.inner[this.innerDone],
        done = inner.parse.advance();
      if (done) {
        this.innerDone++;
        let props = Object.assign(Object.create(null), inner.target.props);
        props[dist_NodeProp.mounted.id] = new MountedTree(done, inner.overlay, inner.parser);
        inner.target.props = props;
      }
      return null;
    }
    get parsedPos() {
      if (this.baseParse) return 0;
      let pos = this.input.length;
      for (let i = this.innerDone; i < this.inner.length; i++) {
        if (this.inner[i].ranges[0].from < pos) pos = Math.min(pos, this.inner[i].parse.parsedPos);
      }
      return pos;
    }
    stopAt(pos) {
      this.stoppedAt = pos;
      if (this.baseParse) this.baseParse.stopAt(pos);
      else for (let i = this.innerDone; i < this.inner.length; i++) this.inner[i].parse.stopAt(pos);
    }
    startInner() {
      let fragmentCursor = new FragmentCursor(this.fragments);
      let overlay = null;
      let covered = null;
      let cursor = new TreeCursor(
        new TreeNode(this.baseTree, this.ranges[0].from, 0, null),
        IterMode.IncludeAnonymous | IterMode.IgnoreMounts,
      );
      scan: for (let nest, isCovered; this.stoppedAt == null || cursor.from < this.stoppedAt; ) {
        let enter = true,
          range;
        if (fragmentCursor.hasNode(cursor)) {
          if (overlay) {
            let match = overlay.mounts.find(
              m => m.frag.from <= cursor.from && m.frag.to >= cursor.to && m.mount.overlay,
            );
            if (match)
              for (let r of match.mount.overlay) {
                let from = r.from + match.pos,
                  to = r.to + match.pos;
                if (
                  from >= cursor.from &&
                  to <= cursor.to &&
                  !overlay.ranges.some(r => r.from < to && r.to > from)
                )
                  overlay.ranges.push({ from, to });
              }
          }
          enter = false;
        } else if (covered && (isCovered = checkCover(covered.ranges, cursor.from, cursor.to))) {
          enter = isCovered != 2;
        } else if (
          !cursor.type.isAnonymous &&
          cursor.from < cursor.to &&
          (nest = this.nest(cursor, this.input))
        ) {
          if (!cursor.tree) materialize(cursor);
          let oldMounts = fragmentCursor.findMounts(cursor.from, nest.parser);
          if (typeof nest.overlay == 'function') {
            overlay = new ActiveOverlay(
              nest.parser,
              nest.overlay,
              oldMounts,
              this.inner.length,
              cursor.from,
              cursor.tree,
              overlay,
            );
          } else {
            let ranges = punchRanges(
              this.ranges,
              nest.overlay || [new Range(cursor.from, cursor.to)],
            );
            if (ranges.length)
              this.inner.push(
                new InnerParse(
                  nest.parser,
                  nest.parser.startParse(this.input, enterFragments(oldMounts, ranges), ranges),
                  nest.overlay
                    ? nest.overlay.map(r => new Range(r.from - cursor.from, r.to - cursor.from))
                    : null,
                  cursor.tree,
                  ranges,
                ),
              );
            if (!nest.overlay) enter = false;
            else if (ranges.length) covered = { ranges, depth: 0, prev: covered };
          }
        } else if (overlay && (range = overlay.predicate(cursor))) {
          if (range === true) range = new Range(cursor.from, cursor.to);
          if (range.from < range.to) overlay.ranges.push(range);
        }
        if (enter && cursor.firstChild()) {
          if (overlay) overlay.depth++;
          if (covered) covered.depth++;
        } else {
          for (;;) {
            if (cursor.nextSibling()) break;
            if (!cursor.parent()) break scan;
            if (overlay && !--overlay.depth) {
              let ranges = punchRanges(this.ranges, overlay.ranges);
              if (ranges.length)
                this.inner.splice(
                  overlay.index,
                  0,
                  new InnerParse(
                    overlay.parser,
                    overlay.parser.startParse(
                      this.input,
                      enterFragments(overlay.mounts, ranges),
                      ranges,
                    ),
                    overlay.ranges.map(
                      r => new Range(r.from - overlay.start, r.to - overlay.start),
                    ),
                    overlay.target,
                    ranges,
                  ),
                );
              overlay = overlay.prev;
            }
            if (covered && !--covered.depth) covered = covered.prev;
          }
        }
      }
    }
  }
  function checkCover(covered, from, to) {
    for (let range of covered) {
      if (range.from >= to) break;
      if (range.to > from) return range.from <= from && range.to >= to ? 2 : 1;
    }
    return 0;
  }
  function sliceBuf(buf, startI, endI, nodes, positions, off) {
    if (startI < endI) {
      let from = buf.buffer[startI + 1],
        to = buf.buffer[endI - 2];
      nodes.push(buf.slice(startI, endI, from, to));
      positions.push(from - off);
    }
  }
  function materialize(cursor) {
    let { node } = cursor,
      depth = 0;
    do {
      cursor.parent();
      depth++;
    } while (!cursor.tree);
    let i = 0,
      base = cursor.tree,
      off = 0;
    for (; ; i++) {
      off = base.positions[i] + cursor.from;
      if (off <= node.from && off + base.children[i].length >= node.to) break;
    }
    let buf = base.children[i],
      b = buf.buffer;
    function split(startI, endI, type, innerOffset, length) {
      let i = startI;
      while (b[i + 2] + off <= node.from) i = b[i + 3];
      let children = [],
        positions = [];
      sliceBuf(buf, startI, i, children, positions, innerOffset);
      let from = b[i + 1],
        to = b[i + 2];
      let isTarget = from + off == node.from && to + off == node.to && b[i] == node.type.id;
      children.push(
        isTarget ? node.toTree() : split(i + 4, b[i + 3], buf.set.types[b[i]], from, to - from),
      );
      positions.push(from - innerOffset);
      sliceBuf(buf, b[i + 3], endI, children, positions, innerOffset);
      return new Tree(type, children, positions, length);
    }
    base.children[i] = split(0, b.length, NodeType.none, 0, buf.length);
    for (let d = 0; d <= depth; d++) cursor.childAfter(node.from);
  }
  class StructureCursor {
    constructor(root, offset) {
      this.offset = offset;
      this.done = false;
      this.cursor = root.cursor(IterMode.IncludeAnonymous | IterMode.IgnoreMounts);
    }
    moveTo(pos) {
      let { cursor } = this,
        p = pos - this.offset;
      while (!this.done && cursor.from < p) {
        if (
          cursor.to >= pos &&
          cursor.enter(p, 1, IterMode.IgnoreOverlays | IterMode.ExcludeBuffers)
        );
        else if (!cursor.next(false)) this.done = true;
      }
    }
    hasNode(cursor) {
      this.moveTo(cursor.from);
      if (!this.done && this.cursor.from + this.offset == cursor.from && this.cursor.tree) {
        for (let tree = this.cursor.tree; ; ) {
          if (tree == cursor.tree) return true;
          if (tree.children.length && tree.positions[0] == 0 && tree.children[0] instanceof Tree)
            tree = tree.children[0];
          else break;
        }
      }
      return false;
    }
  }
  class FragmentCursor {
    constructor(fragments) {
      var _a;
      this.fragments = fragments;
      this.curTo = 0;
      this.fragI = 0;
      if (fragments.length) {
        let first = (this.curFrag = fragments[0]);
        this.curTo = (_a = first.tree.prop(stoppedInner)) !== null && _a !== void 0 ? _a : first.to;
        this.inner = new StructureCursor(first.tree, -first.offset);
      } else {
        this.curFrag = this.inner = null;
      }
    }
    hasNode(node) {
      while (this.curFrag && node.from >= this.curTo) this.nextFrag();
      return (
        this.curFrag &&
        this.curFrag.from <= node.from &&
        this.curTo >= node.to &&
        this.inner.hasNode(node)
      );
    }
    nextFrag() {
      var _a;
      this.fragI++;
      if (this.fragI == this.fragments.length) {
        this.curFrag = this.inner = null;
      } else {
        let frag = (this.curFrag = this.fragments[this.fragI]);
        this.curTo = (_a = frag.tree.prop(stoppedInner)) !== null && _a !== void 0 ? _a : frag.to;
        this.inner = new StructureCursor(frag.tree, -frag.offset);
      }
    }
    findMounts(pos, parser) {
      var _a;
      let result = [];
      if (this.inner) {
        this.inner.cursor.moveTo(pos, 1);
        for (let pos = this.inner.cursor.node; pos; pos = pos.parent) {
          let mount =
            (_a = pos.tree) === null || _a === void 0 ? void 0 : _a.prop(dist_NodeProp.mounted);
          if (mount && mount.parser == parser) {
            for (let i = this.fragI; i < this.fragments.length; i++) {
              let frag = this.fragments[i];
              if (frag.from >= pos.to) break;
              if (frag.tree == this.curFrag.tree)
                result.push({
                  frag,
                  pos: pos.from - frag.offset,
                  mount,
                });
            }
          }
        }
      }
      return result;
    }
  }
  function punchRanges(outer, ranges) {
    let copy = null,
      current = ranges;
    for (let i = 1, j = 0; i < outer.length; i++) {
      let gapFrom = outer[i - 1].to,
        gapTo = outer[i].from;
      for (; j < current.length; j++) {
        let r = current[j];
        if (r.from >= gapTo) break;
        if (r.to <= gapFrom) continue;
        if (!copy) current = copy = ranges.slice();
        if (r.from < gapFrom) {
          copy[j] = new Range(r.from, gapFrom);
          if (r.to > gapTo) copy.splice(j + 1, 0, new Range(gapTo, r.to));
        } else if (r.to > gapTo) {
          copy[j--] = new Range(gapTo, r.to);
        } else {
          copy.splice(j--, 1);
        }
      }
    }
    return current;
  }
  function findCoverChanges(a, b, from, to) {
    let iA = 0,
      iB = 0,
      inA = false,
      inB = false,
      pos = -1e9;
    let result = [];
    for (;;) {
      let nextA = iA == a.length ? 1e9 : inA ? a[iA].to : a[iA].from;
      let nextB = iB == b.length ? 1e9 : inB ? b[iB].to : b[iB].from;
      if (inA != inB) {
        let start = Math.max(pos, from),
          end = Math.min(nextA, nextB, to);
        if (start < end) result.push(new Range(start, end));
      }
      pos = Math.min(nextA, nextB);
      if (pos == 1e9) break;
      if (nextA == pos) {
        if (!inA) inA = true;
        else {
          inA = false;
          iA++;
        }
      }
      if (nextB == pos) {
        if (!inB) inB = true;
        else {
          inB = false;
          iB++;
        }
      }
    }
    return result;
  }
  function enterFragments(mounts, ranges) {
    let result = [];
    for (let { pos, mount, frag } of mounts) {
      let startPos = pos + (mount.overlay ? mount.overlay[0].from : 0),
        endPos = startPos + mount.tree.length;
      let from = Math.max(frag.from, startPos),
        to = Math.min(frag.to, endPos);
      if (mount.overlay) {
        let overlay = mount.overlay.map(r => new Range(r.from + pos, r.to + pos));
        let changes = findCoverChanges(ranges, overlay, from, to);
        for (let i = 0, pos = from; ; i++) {
          let last = i == changes.length,
            end = last ? to : changes[i].from;
          if (end > pos)
            result.push(
              new TreeFragment(pos, end, mount.tree, -startPos, frag.from >= pos, frag.to <= end),
            );
          if (last) break;
          pos = changes[i].to;
        }
      } else {
        result.push(
          new TreeFragment(
            from,
            to,
            mount.tree,
            -startPos,
            frag.from >= startPos,
            frag.to <= endPos,
          ),
        );
      }
    }
    return result;
  }

  class dist_Text {
    constructor() {}
    lineAt(pos) {
      if (pos < 0 || pos > this.length)
        throw new RangeError(`Invalid position ${pos} in document of length ${this.length}`);
      return this.lineInner(pos, false, 1, 0);
    }
    line(n) {
      if (n < 1 || n > this.lines)
        throw new RangeError(`Invalid line number ${n} in ${this.lines}-line document`);
      return this.lineInner(n, true, 1, 0);
    }
    replace(from, to, text) {
      let parts = [];
      this.decompose(0, from, parts, 2);
      if (text.length) text.decompose(0, text.length, parts, 1 | 2);
      this.decompose(to, this.length, parts, 1);
      return TextNode.from(parts, this.length - (to - from) + text.length);
    }
    append(other) {
      return this.replace(this.length, this.length, other);
    }
    slice(from, to = this.length) {
      let parts = [];
      this.decompose(from, to, parts, 0);
      return TextNode.from(parts, to - from);
    }
    eq(other) {
      if (other == this) return true;
      if (other.length != this.length || other.lines != this.lines) return false;
      let start = this.scanIdentical(other, 1),
        end = this.length - this.scanIdentical(other, -1);
      let a = new RawTextCursor(this),
        b = new RawTextCursor(other);
      for (let skip = start, pos = start; ; ) {
        a.next(skip);
        b.next(skip);
        skip = 0;
        if (a.lineBreak != b.lineBreak || a.done != b.done || a.value != b.value) return false;
        pos += a.value.length;
        if (a.done || pos >= end) return true;
      }
    }
    iter(dir = 1) {
      return new RawTextCursor(this, dir);
    }
    iterRange(from, to = this.length) {
      return new PartialTextCursor(this, from, to);
    }
    iterLines(from, to) {
      let inner;
      if (from == null) {
        inner = this.iter();
      } else {
        if (to == null) to = this.lines + 1;
        let start = this.line(from).from;
        inner = this.iterRange(
          start,
          Math.max(start, to == this.lines + 1 ? this.length : to <= 1 ? 0 : this.line(to - 1).to),
        );
      }
      return new LineCursor(inner);
    }
    toString() {
      return this.sliceString(0);
    }
    toJSON() {
      let lines = [];
      this.flatten(lines);
      return lines;
    }
    static of(text) {
      if (text.length == 0) throw new RangeError('A document must have at least one line');
      if (text.length == 1 && !text[0]) return dist_Text.empty;
      return text.length <= 32 ? new TextLeaf(text) : TextNode.from(TextLeaf.split(text, []));
    }
  }
  class TextLeaf extends dist_Text {
    constructor(text, length = textLength(text)) {
      super();
      this.text = text;
      this.length = length;
    }
    get lines() {
      return this.text.length;
    }
    get children() {
      return null;
    }
    lineInner(target, isLine, line, offset) {
      for (let i = 0; ; i++) {
        let string = this.text[i],
          end = offset + string.length;
        if ((isLine ? line : end) >= target) return new Line(offset, end, line, string);
        offset = end + 1;
        line++;
      }
    }
    decompose(from, to, target, open) {
      let text =
        from <= 0 && to >= this.length
          ? this
          : new TextLeaf(
              sliceText(this.text, from, to),
              Math.min(to, this.length) - Math.max(0, from),
            );
      if (open & 1) {
        let prev = target.pop();
        let joined = appendText(text.text, prev.text.slice(), 0, text.length);
        if (joined.length <= 32) {
          target.push(new TextLeaf(joined, prev.length + text.length));
        } else {
          let mid = joined.length >> 1;
          target.push(new TextLeaf(joined.slice(0, mid)), new TextLeaf(joined.slice(mid)));
        }
      } else {
        target.push(text);
      }
    }
    replace(from, to, text) {
      if (!(text instanceof TextLeaf)) return super.replace(from, to, text);
      let lines = appendText(this.text, appendText(text.text, sliceText(this.text, 0, from)), to);
      let newLen = this.length + text.length - (to - from);
      if (lines.length <= 32) return new TextLeaf(lines, newLen);
      return TextNode.from(TextLeaf.split(lines, []), newLen);
    }
    sliceString(from, to = this.length, lineSep = '\n') {
      let result = '';
      for (let pos = 0, i = 0; pos <= to && i < this.text.length; i++) {
        let line = this.text[i],
          end = pos + line.length;
        if (pos > from && i) result += lineSep;
        if (from < end && to > pos) result += line.slice(Math.max(0, from - pos), to - pos);
        pos = end + 1;
      }
      return result;
    }
    flatten(target) {
      for (let line of this.text) target.push(line);
    }
    scanIdentical() {
      return 0;
    }
    static split(text, target) {
      let part = [],
        len = -1;
      for (let line of text) {
        part.push(line);
        len += line.length + 1;
        if (part.length == 32) {
          target.push(new TextLeaf(part, len));
          part = [];
          len = -1;
        }
      }
      if (len > -1) target.push(new TextLeaf(part, len));
      return target;
    }
  }
  class TextNode extends dist_Text {
    constructor(children, length) {
      super();
      this.children = children;
      this.length = length;
      this.lines = 0;
      for (let child of children) this.lines += child.lines;
    }
    lineInner(target, isLine, line, offset) {
      for (let i = 0; ; i++) {
        let child = this.children[i],
          end = offset + child.length,
          endLine = line + child.lines - 1;
        if ((isLine ? endLine : end) >= target)
          return child.lineInner(target, isLine, line, offset);
        offset = end + 1;
        line = endLine + 1;
      }
    }
    decompose(from, to, target, open) {
      for (let i = 0, pos = 0; pos <= to && i < this.children.length; i++) {
        let child = this.children[i],
          end = pos + child.length;
        if (from <= end && to >= pos) {
          let childOpen = open & ((pos <= from ? 1 : 0) | (end >= to ? 2 : 0));
          if (pos >= from && end <= to && !childOpen) target.push(child);
          else child.decompose(from - pos, to - pos, target, childOpen);
        }
        pos = end + 1;
      }
    }
    replace(from, to, text) {
      if (text.lines < this.lines)
        for (let i = 0, pos = 0; i < this.children.length; i++) {
          let child = this.children[i],
            end = pos + child.length;
          if (from >= pos && to <= end) {
            let updated = child.replace(from - pos, to - pos, text);
            let totalLines = this.lines - child.lines + updated.lines;
            if (updated.lines < totalLines >> (5 - 1) && updated.lines > totalLines >> (5 + 1)) {
              let copy = this.children.slice();
              copy[i] = updated;
              return new TextNode(copy, this.length - (to - from) + text.length);
            }
            return super.replace(pos, end, updated);
          }
          pos = end + 1;
        }
      return super.replace(from, to, text);
    }
    sliceString(from, to = this.length, lineSep = '\n') {
      let result = '';
      for (let i = 0, pos = 0; i < this.children.length && pos <= to; i++) {
        let child = this.children[i],
          end = pos + child.length;
        if (pos > from && i) result += lineSep;
        if (from < end && to > pos) result += child.sliceString(from - pos, to - pos, lineSep);
        pos = end + 1;
      }
      return result;
    }
    flatten(target) {
      for (let child of this.children) child.flatten(target);
    }
    scanIdentical(other, dir) {
      if (!(other instanceof TextNode)) return 0;
      let length = 0;
      let [iA, iB, eA, eB] =
        dir > 0
          ? [0, 0, this.children.length, other.children.length]
          : [this.children.length - 1, other.children.length - 1, -1, -1];
      for (; ; iA += dir, iB += dir) {
        if (iA == eA || iB == eB) return length;
        let chA = this.children[iA],
          chB = other.children[iB];
        if (chA != chB) return length + chA.scanIdentical(chB, dir);
        length += chA.length + 1;
      }
    }
    static from(children, length = children.reduce((l, ch) => l + ch.length + 1, -1)) {
      let lines = 0;
      for (let ch of children) lines += ch.lines;
      if (lines < 32) {
        let flat = [];
        for (let ch of children) ch.flatten(flat);
        return new TextLeaf(flat, length);
      }
      let chunk = Math.max(32, lines >> 5),
        maxChunk = chunk << 1,
        minChunk = chunk >> 1;
      let chunked = [],
        currentLines = 0,
        currentLen = -1,
        currentChunk = [];
      function add(child) {
        let last;
        if (child.lines > maxChunk && child instanceof TextNode) {
          for (let node of child.children) add(node);
        } else if (child.lines > minChunk && (currentLines > minChunk || !currentLines)) {
          flush();
          chunked.push(child);
        } else if (
          child instanceof TextLeaf &&
          currentLines &&
          (last = currentChunk[currentChunk.length - 1]) instanceof TextLeaf &&
          child.lines + last.lines <= 32
        ) {
          currentLines += child.lines;
          currentLen += child.length + 1;
          currentChunk[currentChunk.length - 1] = new TextLeaf(
            last.text.concat(child.text),
            last.length + 1 + child.length,
          );
        } else {
          if (currentLines + child.lines > chunk) flush();
          currentLines += child.lines;
          currentLen += child.length + 1;
          currentChunk.push(child);
        }
      }
      function flush() {
        if (currentLines == 0) return;
        chunked.push(
          currentChunk.length == 1 ? currentChunk[0] : TextNode.from(currentChunk, currentLen),
        );
        currentLen = -1;
        currentLines = currentChunk.length = 0;
      }
      for (let child of children) add(child);
      flush();
      return chunked.length == 1 ? chunked[0] : new TextNode(chunked, length);
    }
  }
  dist_Text.empty = new TextLeaf([''], 0);
  function textLength(text) {
    let length = -1;
    for (let line of text) length += line.length + 1;
    return length;
  }
  function appendText(text, target, from = 0, to = 1e9) {
    for (let pos = 0, i = 0, first = true; i < text.length && pos <= to; i++) {
      let line = text[i],
        end = pos + line.length;
      if (end >= from) {
        if (end > to) line = line.slice(0, to - pos);
        if (pos < from) line = line.slice(from - pos);
        if (first) {
          target[target.length - 1] += line;
          first = false;
        } else target.push(line);
      }
      pos = end + 1;
    }
    return target;
  }
  function sliceText(text, from, to) {
    return appendText(text, [''], from, to);
  }
  class RawTextCursor {
    constructor(text, dir = 1) {
      this.dir = dir;
      this.done = false;
      this.lineBreak = false;
      this.value = '';
      this.nodes = [text];
      this.offsets = [
        dir > 0 ? 1 : (text instanceof TextLeaf ? text.text.length : text.children.length) << 1,
      ];
    }
    nextInner(skip, dir) {
      this.done = this.lineBreak = false;
      for (;;) {
        let last = this.nodes.length - 1;
        let top = this.nodes[last],
          offsetValue = this.offsets[last],
          offset = offsetValue >> 1;
        let size = top instanceof TextLeaf ? top.text.length : top.children.length;
        if (offset == (dir > 0 ? size : 0)) {
          if (last == 0) {
            this.done = true;
            this.value = '';
            return this;
          }
          if (dir > 0) this.offsets[last - 1]++;
          this.nodes.pop();
          this.offsets.pop();
        } else if ((offsetValue & 1) == (dir > 0 ? 0 : 1)) {
          this.offsets[last] += dir;
          if (skip == 0) {
            this.lineBreak = true;
            this.value = '\n';
            return this;
          }
          skip--;
        } else if (top instanceof TextLeaf) {
          let next = top.text[offset + (dir < 0 ? -1 : 0)];
          this.offsets[last] += dir;
          if (next.length > Math.max(0, skip)) {
            this.value =
              skip == 0 ? next : dir > 0 ? next.slice(skip) : next.slice(0, next.length - skip);
            return this;
          }
          skip -= next.length;
        } else {
          let next = top.children[offset + (dir < 0 ? -1 : 0)];
          if (skip > next.length) {
            skip -= next.length;
            this.offsets[last] += dir;
          } else {
            if (dir < 0) this.offsets[last]--;
            this.nodes.push(next);
            this.offsets.push(
              dir > 0
                ? 1
                : (next instanceof TextLeaf ? next.text.length : next.children.length) << 1,
            );
          }
        }
      }
    }
    next(skip = 0) {
      if (skip < 0) {
        this.nextInner(-skip, -this.dir);
        skip = this.value.length;
      }
      return this.nextInner(skip, this.dir);
    }
  }
  class PartialTextCursor {
    constructor(text, start, end) {
      this.value = '';
      this.done = false;
      this.cursor = new RawTextCursor(text, start > end ? -1 : 1);
      this.pos = start > end ? text.length : 0;
      this.from = Math.min(start, end);
      this.to = Math.max(start, end);
    }
    nextInner(skip, dir) {
      if (dir < 0 ? this.pos <= this.from : this.pos >= this.to) {
        this.value = '';
        this.done = true;
        return this;
      }
      skip += Math.max(0, dir < 0 ? this.pos - this.to : this.from - this.pos);
      let limit = dir < 0 ? this.pos - this.from : this.to - this.pos;
      if (skip > limit) skip = limit;
      limit -= skip;
      let { value } = this.cursor.next(skip);
      this.pos += (value.length + skip) * dir;
      this.value =
        value.length <= limit
          ? value
          : dir < 0
          ? value.slice(value.length - limit)
          : value.slice(0, limit);
      this.done = !this.value;
      return this;
    }
    next(skip = 0) {
      if (skip < 0) skip = Math.max(skip, this.from - this.pos);
      else if (skip > 0) skip = Math.min(skip, this.to - this.pos);
      return this.nextInner(skip, this.cursor.dir);
    }
    get lineBreak() {
      return this.cursor.lineBreak && this.value != '';
    }
  }
  class LineCursor {
    constructor(inner) {
      this.inner = inner;
      this.afterBreak = true;
      this.value = '';
      this.done = false;
    }
    next(skip = 0) {
      let { done, lineBreak, value } = this.inner.next(skip);
      if (done) {
        this.done = true;
        this.value = '';
      } else if (lineBreak) {
        if (this.afterBreak) {
          this.value = '';
        } else {
          this.afterBreak = true;
          this.next();
        }
      } else {
        this.value = value;
        this.afterBreak = false;
      }
      return this;
    }
    get lineBreak() {
      return false;
    }
  }
  if (typeof Symbol != 'undefined') {
    dist_Text.prototype[Symbol.iterator] = function () {
      return this.iter();
    };
    RawTextCursor.prototype[Symbol.iterator] =
      PartialTextCursor.prototype[Symbol.iterator] =
      LineCursor.prototype[Symbol.iterator] =
        function () {
          return this;
        };
  }
  class Line {
    constructor(from, to, number, text) {
      this.from = from;
      this.to = to;
      this.number = number;
      this.text = text;
    }
    get length() {
      return this.to - this.from;
    }
  }

  let extend =
    'lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,3b,f,,w,1j,,,,4,8,4,,3,7,a,2,t,,1m,,,,2,4,8,,9,,a,2,q,,2,2,1l,,4,2,4,2,2,3,3,,u,2,3,,b,2,1l,,4,5,,2,4,,k,2,m,6,,,1m,,,2,,4,8,,7,3,a,2,u,,1n,,,,c,,9,,14,,3,,1l,3,5,3,,4,7,2,b,2,t,,1m,,2,,2,,3,,5,2,7,2,b,2,s,2,1l,2,,,2,4,8,,9,,a,2,t,,20,,4,,2,3,,,8,,29,,2,7,c,8,2q,,2,9,b,6,22,2,r,,,,,,1j,e,,5,,2,5,b,,10,9,,2u,4,,6,,2,2,2,p,2,4,3,g,4,d,,2,2,6,,f,,jj,3,qa,3,t,3,t,2,u,2,1s,2,,7,8,,2,b,9,,19,3,3b,2,y,,3a,3,4,2,9,,6,3,63,2,2,,1m,,,7,,,,,2,8,6,a,2,,1c,h,1r,4,1c,7,,,5,,14,9,c,2,w,4,2,2,,3,1k,,,2,3,,,3,1m,8,2,2,48,3,,d,,7,4,,6,,3,2,5i,1m,,5,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,p,2,5,,47,2,q,i,d,,12,8,p,b,1a,3,1c,,2,4,2,2,13,,1v,6,2,2,2,2,c,,8,,1b,,1f,,,3,2,2,5,2,,,16,2,8,,6m,,2,,4,,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,ar,2,49,b,4w,,1i,f,1k,3,1d,4,2,2,1x,3,10,5,,8,1q,,c,2,1g,9,a,4,2,,2n,3,2,,,2,6,,4g,,3,8,l,2,1l,2,,,,,m,,e,7,3,5,5f,8,2,3,,,n,,29,,2,6,,,2,,,2,,2,6j,,2,4,6,2,,2,r,2,2d,8,2,,,2,2y,,,,2,6,,,2t,3,2,4,,5,77,9,,2,6t,,a,2,,,4,,40,4,2,2,4,,w,a,14,6,2,4,8,,9,6,2,3,1a,d,,2,ba,7,,6,,,2a,m,2,7,,2,,2,3e,6,3,,,2,,7,,,20,2,3,,,,9n,2,f0b,5,1n,7,t4,,1r,4,29,,f5k,2,43q,,,3,4,5,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,79,7,c5,4,15s,7,31,7,240,5,gx7k,2o,3k,6o'
      .split(',')
      .map(s => (s ? parseInt(s, 36) : 1));
  for (let i = 1; i < extend.length; i++) extend[i] += extend[i - 1];
  function isExtendingChar(code) {
    for (let i = 1; i < extend.length; i += 2) if (extend[i] > code) return extend[i - 1] <= code;
    return false;
  }
  function isRegionalIndicator(code) {
    return code >= 0x1f1e6 && code <= 0x1f1ff;
  }
  const ZWJ = 0x200d;
  function findClusterBreak(str, pos, forward = true, includeExtending = true) {
    return (forward ? nextClusterBreak : prevClusterBreak)(str, pos, includeExtending);
  }
  function nextClusterBreak(str, pos, includeExtending) {
    if (pos == str.length) return pos;
    if (pos && surrogateLow(str.charCodeAt(pos)) && surrogateHigh(str.charCodeAt(pos - 1))) pos--;
    let prev = codePointAt(str, pos);
    pos += codePointSize(prev);
    while (pos < str.length) {
      let next = codePointAt(str, pos);
      if (prev == ZWJ || next == ZWJ || (includeExtending && isExtendingChar(next))) {
        pos += codePointSize(next);
        prev = next;
      } else if (isRegionalIndicator(next)) {
        let countBefore = 0,
          i = pos - 2;
        while (i >= 0 && isRegionalIndicator(codePointAt(str, i))) {
          countBefore++;
          i -= 2;
        }
        if (countBefore % 2 == 0) break;
        else pos += 2;
      } else {
        break;
      }
    }
    return pos;
  }
  function prevClusterBreak(str, pos, includeExtending) {
    while (pos > 0) {
      let found = nextClusterBreak(str, pos - 2, includeExtending);
      if (found < pos) return found;
      pos--;
    }
    return 0;
  }
  function surrogateLow(ch) {
    return ch >= 0xdc00 && ch < 0xe000;
  }
  function surrogateHigh(ch) {
    return ch >= 0xd800 && ch < 0xdc00;
  }
  function codePointAt(str, pos) {
    let code0 = str.charCodeAt(pos);
    if (!surrogateHigh(code0) || pos + 1 == str.length) return code0;
    let code1 = str.charCodeAt(pos + 1);
    if (!surrogateLow(code1)) return code0;
    return ((code0 - 0xd800) << 10) + (code1 - 0xdc00) + 0x10000;
  }
  function fromCodePoint(code) {
    if (code <= 0xffff) return String.fromCharCode(code);
    code -= 0x10000;
    return String.fromCharCode((code >> 10) + 0xd800, (code & 1023) + 0xdc00);
  }
  function codePointSize(code) {
    return code < 0x10000 ? 1 : 2;
  }

  const DefaultSplit = /\r\n?|\n/;
  var dist_MapMode = (function (MapMode) {
    MapMode[(MapMode['Simple'] = 0)] = 'Simple';
    MapMode[(MapMode['TrackDel'] = 1)] = 'TrackDel';
    MapMode[(MapMode['TrackBefore'] = 2)] = 'TrackBefore';
    MapMode[(MapMode['TrackAfter'] = 3)] = 'TrackAfter';
    return MapMode;
  })(dist_MapMode || (dist_MapMode = {}));
  class ChangeDesc {
    constructor(sections) {
      this.sections = sections;
    }
    get length() {
      let result = 0;
      for (let i = 0; i < this.sections.length; i += 2) result += this.sections[i];
      return result;
    }
    get newLength() {
      let result = 0;
      for (let i = 0; i < this.sections.length; i += 2) {
        let ins = this.sections[i + 1];
        result += ins < 0 ? this.sections[i] : ins;
      }
      return result;
    }
    get empty() {
      return this.sections.length == 0 || (this.sections.length == 2 && this.sections[1] < 0);
    }
    iterGaps(f) {
      for (let i = 0, posA = 0, posB = 0; i < this.sections.length; ) {
        let len = this.sections[i++],
          ins = this.sections[i++];
        if (ins < 0) {
          f(posA, posB, len);
          posB += len;
        } else {
          posB += ins;
        }
        posA += len;
      }
    }
    iterChangedRanges(f, individual = false) {
      iterChanges(this, f, individual);
    }
    get invertedDesc() {
      let sections = [];
      for (let i = 0; i < this.sections.length; ) {
        let len = this.sections[i++],
          ins = this.sections[i++];
        if (ins < 0) sections.push(len, ins);
        else sections.push(ins, len);
      }
      return new ChangeDesc(sections);
    }
    composeDesc(other) {
      return this.empty ? other : other.empty ? this : composeSets(this, other);
    }
    mapDesc(other, before = false) {
      return other.empty ? this : mapSet(this, other, before);
    }
    mapPos(pos, assoc = -1, mode = dist_MapMode.Simple) {
      let posA = 0,
        posB = 0;
      for (let i = 0; i < this.sections.length; ) {
        let len = this.sections[i++],
          ins = this.sections[i++],
          endA = posA + len;
        if (ins < 0) {
          if (endA > pos) return posB + (pos - posA);
          posB += len;
        } else {
          if (
            mode != dist_MapMode.Simple &&
            endA >= pos &&
            ((mode == dist_MapMode.TrackDel && posA < pos && endA > pos) ||
              (mode == dist_MapMode.TrackBefore && posA < pos) ||
              (mode == dist_MapMode.TrackAfter && endA > pos))
          )
            return null;
          if (endA > pos || (endA == pos && assoc < 0 && !len))
            return pos == posA || assoc < 0 ? posB : posB + ins;
          posB += ins;
        }
        posA = endA;
      }
      if (pos > posA)
        throw new RangeError(`Position ${pos} is out of range for changeset of length ${posA}`);
      return posB;
    }
    touchesRange(from, to = from) {
      for (let i = 0, pos = 0; i < this.sections.length && pos <= to; ) {
        let len = this.sections[i++],
          ins = this.sections[i++],
          end = pos + len;
        if (ins >= 0 && pos <= to && end >= from) return pos < from && end > to ? 'cover' : true;
        pos = end;
      }
      return false;
    }
    toString() {
      let result = '';
      for (let i = 0; i < this.sections.length; ) {
        let len = this.sections[i++],
          ins = this.sections[i++];
        result += (result ? ' ' : '') + len + (ins >= 0 ? ':' + ins : '');
      }
      return result;
    }
    toJSON() {
      return this.sections;
    }
    static fromJSON(json) {
      if (!Array.isArray(json) || json.length % 2 || json.some(a => typeof a != 'number'))
        throw new RangeError('Invalid JSON representation of ChangeDesc');
      return new ChangeDesc(json);
    }
    static create(sections) {
      return new ChangeDesc(sections);
    }
  }
  class ChangeSet extends ChangeDesc {
    constructor(sections, inserted) {
      super(sections);
      this.inserted = inserted;
    }
    apply(doc) {
      if (this.length != doc.length)
        throw new RangeError('Applying change set to a document with the wrong length');
      iterChanges(
        this,
        (fromA, toA, fromB, _toB, text) => (doc = doc.replace(fromB, fromB + (toA - fromA), text)),
        false,
      );
      return doc;
    }
    mapDesc(other, before = false) {
      return mapSet(this, other, before, true);
    }
    invert(doc) {
      let sections = this.sections.slice(),
        inserted = [];
      for (let i = 0, pos = 0; i < sections.length; i += 2) {
        let len = sections[i],
          ins = sections[i + 1];
        if (ins >= 0) {
          sections[i] = ins;
          sections[i + 1] = len;
          let index = i >> 1;
          while (inserted.length < index) inserted.push(dist_Text.empty);
          inserted.push(len ? doc.slice(pos, pos + len) : dist_Text.empty);
        }
        pos += len;
      }
      return new ChangeSet(sections, inserted);
    }
    compose(other) {
      return this.empty ? other : other.empty ? this : composeSets(this, other, true);
    }
    map(other, before = false) {
      return other.empty ? this : mapSet(this, other, before, true);
    }
    iterChanges(f, individual = false) {
      iterChanges(this, f, individual);
    }
    get desc() {
      return ChangeDesc.create(this.sections);
    }
    filter(ranges) {
      let resultSections = [],
        resultInserted = [],
        filteredSections = [];
      let iter = new SectionIter(this);
      done: for (let i = 0, pos = 0; ; ) {
        let next = i == ranges.length ? 1e9 : ranges[i++];
        while (pos < next || (pos == next && iter.len == 0)) {
          if (iter.done) break done;
          let len = Math.min(iter.len, next - pos);
          addSection(filteredSections, len, -1);
          let ins = iter.ins == -1 ? -1 : iter.off == 0 ? iter.ins : 0;
          addSection(resultSections, len, ins);
          if (ins > 0) addInsert(resultInserted, resultSections, iter.text);
          iter.forward(len);
          pos += len;
        }
        let end = ranges[i++];
        while (pos < end) {
          if (iter.done) break done;
          let len = Math.min(iter.len, end - pos);
          addSection(resultSections, len, -1);
          addSection(filteredSections, len, iter.ins == -1 ? -1 : iter.off == 0 ? iter.ins : 0);
          iter.forward(len);
          pos += len;
        }
      }
      return {
        changes: new ChangeSet(resultSections, resultInserted),
        filtered: ChangeDesc.create(filteredSections),
      };
    }
    toJSON() {
      let parts = [];
      for (let i = 0; i < this.sections.length; i += 2) {
        let len = this.sections[i],
          ins = this.sections[i + 1];
        if (ins < 0) parts.push(len);
        else if (ins == 0) parts.push([len]);
        else parts.push([len].concat(this.inserted[i >> 1].toJSON()));
      }
      return parts;
    }
    static of(changes, length, lineSep) {
      let sections = [],
        inserted = [],
        pos = 0;
      let total = null;
      function flush(force = false) {
        if (!force && !sections.length) return;
        if (pos < length) addSection(sections, length - pos, -1);
        let set = new ChangeSet(sections, inserted);
        total = total ? total.compose(set.map(total)) : set;
        sections = [];
        inserted = [];
        pos = 0;
      }
      function process(spec) {
        if (Array.isArray(spec)) {
          for (let sub of spec) process(sub);
        } else if (spec instanceof ChangeSet) {
          if (spec.length != length)
            throw new RangeError(
              `Mismatched change set length (got ${spec.length}, expected ${length})`,
            );
          flush();
          total = total ? total.compose(spec.map(total)) : spec;
        } else {
          let { from, to = from, insert } = spec;
          if (from > to || from < 0 || to > length)
            throw new RangeError(
              `Invalid change range ${from} to ${to} (in doc of length ${length})`,
            );
          let insText = !insert
            ? dist_Text.empty
            : typeof insert == 'string'
            ? dist_Text.of(insert.split(lineSep || DefaultSplit))
            : insert;
          let insLen = insText.length;
          if (from == to && insLen == 0) return;
          if (from < pos) flush();
          if (from > pos) addSection(sections, from - pos, -1);
          addSection(sections, to - from, insLen);
          addInsert(inserted, sections, insText);
          pos = to;
        }
      }
      process(changes);
      flush(!total);
      return total;
    }
    static empty(length) {
      return new ChangeSet(length ? [length, -1] : [], []);
    }
    static fromJSON(json) {
      if (!Array.isArray(json)) throw new RangeError('Invalid JSON representation of ChangeSet');
      let sections = [],
        inserted = [];
      for (let i = 0; i < json.length; i++) {
        let part = json[i];
        if (typeof part == 'number') {
          sections.push(part, -1);
        } else if (
          !Array.isArray(part) ||
          typeof part[0] != 'number' ||
          part.some((e, i) => i && typeof e != 'string')
        ) {
          throw new RangeError('Invalid JSON representation of ChangeSet');
        } else if (part.length == 1) {
          sections.push(part[0], 0);
        } else {
          while (inserted.length < i) inserted.push(dist_Text.empty);
          inserted[i] = dist_Text.of(part.slice(1));
          sections.push(part[0], inserted[i].length);
        }
      }
      return new ChangeSet(sections, inserted);
    }
    static createSet(sections, inserted) {
      return new ChangeSet(sections, inserted);
    }
  }
  function addSection(sections, len, ins, forceJoin = false) {
    if (len == 0 && ins <= 0) return;
    let last = sections.length - 2;
    if (last >= 0 && ins <= 0 && ins == sections[last + 1]) sections[last] += len;
    else if (len == 0 && sections[last] == 0) sections[last + 1] += ins;
    else if (forceJoin) {
      sections[last] += len;
      sections[last + 1] += ins;
    } else sections.push(len, ins);
  }
  function addInsert(values, sections, value) {
    if (value.length == 0) return;
    let index = (sections.length - 2) >> 1;
    if (index < values.length) {
      values[values.length - 1] = values[values.length - 1].append(value);
    } else {
      while (values.length < index) values.push(dist_Text.empty);
      values.push(value);
    }
  }
  function iterChanges(desc, f, individual) {
    let inserted = desc.inserted;
    for (let posA = 0, posB = 0, i = 0; i < desc.sections.length; ) {
      let len = desc.sections[i++],
        ins = desc.sections[i++];
      if (ins < 0) {
        posA += len;
        posB += len;
      } else {
        let endA = posA,
          endB = posB,
          text = dist_Text.empty;
        for (;;) {
          endA += len;
          endB += ins;
          if (ins && inserted) text = text.append(inserted[(i - 2) >> 1]);
          if (individual || i == desc.sections.length || desc.sections[i + 1] < 0) break;
          len = desc.sections[i++];
          ins = desc.sections[i++];
        }
        f(posA, endA, posB, endB, text);
        posA = endA;
        posB = endB;
      }
    }
  }
  function mapSet(setA, setB, before, mkSet = false) {
    let sections = [],
      insert = mkSet ? [] : null;
    let a = new SectionIter(setA),
      b = new SectionIter(setB);
    for (let inserted = -1; ; ) {
      if (a.ins == -1 && b.ins == -1) {
        let len = Math.min(a.len, b.len);
        addSection(sections, len, -1);
        a.forward(len);
        b.forward(len);
      } else if (
        b.ins >= 0 &&
        (a.ins < 0 ||
          inserted == a.i ||
          (a.off == 0 && (b.len < a.len || (b.len == a.len && !before))))
      ) {
        let len = b.len;
        addSection(sections, b.ins, -1);
        while (len) {
          let piece = Math.min(a.len, len);
          if (a.ins >= 0 && inserted < a.i && a.len <= piece) {
            addSection(sections, 0, a.ins);
            if (insert) addInsert(insert, sections, a.text);
            inserted = a.i;
          }
          a.forward(piece);
          len -= piece;
        }
        b.next();
      } else if (a.ins >= 0) {
        let len = 0,
          left = a.len;
        while (left) {
          if (b.ins == -1) {
            let piece = Math.min(left, b.len);
            len += piece;
            left -= piece;
            b.forward(piece);
          } else if (b.ins == 0 && b.len < left) {
            left -= b.len;
            b.next();
          } else {
            break;
          }
        }
        addSection(sections, len, inserted < a.i ? a.ins : 0);
        if (insert && inserted < a.i) addInsert(insert, sections, a.text);
        inserted = a.i;
        a.forward(a.len - left);
      } else if (a.done && b.done) {
        return insert ? ChangeSet.createSet(sections, insert) : ChangeDesc.create(sections);
      } else {
        throw new Error('Mismatched change set lengths');
      }
    }
  }
  function composeSets(setA, setB, mkSet = false) {
    let sections = [];
    let insert = mkSet ? [] : null;
    let a = new SectionIter(setA),
      b = new SectionIter(setB);
    for (let open = false; ; ) {
      if (a.done && b.done) {
        return insert ? ChangeSet.createSet(sections, insert) : ChangeDesc.create(sections);
      } else if (a.ins == 0) {
        addSection(sections, a.len, 0, open);
        a.next();
      } else if (b.len == 0 && !b.done) {
        addSection(sections, 0, b.ins, open);
        if (insert) addInsert(insert, sections, b.text);
        b.next();
      } else if (a.done || b.done) {
        throw new Error('Mismatched change set lengths');
      } else {
        let len = Math.min(a.len2, b.len),
          sectionLen = sections.length;
        if (a.ins == -1) {
          let insB = b.ins == -1 ? -1 : b.off ? 0 : b.ins;
          addSection(sections, len, insB, open);
          if (insert && insB) addInsert(insert, sections, b.text);
        } else if (b.ins == -1) {
          addSection(sections, a.off ? 0 : a.len, len, open);
          if (insert) addInsert(insert, sections, a.textBit(len));
        } else {
          addSection(sections, a.off ? 0 : a.len, b.off ? 0 : b.ins, open);
          if (insert && !b.off) addInsert(insert, sections, b.text);
        }
        open =
          (a.ins > len || (b.ins >= 0 && b.len > len)) && (open || sections.length > sectionLen);
        a.forward2(len);
        b.forward(len);
      }
    }
  }
  class SectionIter {
    constructor(set) {
      this.set = set;
      this.i = 0;
      this.next();
    }
    next() {
      let { sections } = this.set;
      if (this.i < sections.length) {
        this.len = sections[this.i++];
        this.ins = sections[this.i++];
      } else {
        this.len = 0;
        this.ins = -2;
      }
      this.off = 0;
    }
    get done() {
      return this.ins == -2;
    }
    get len2() {
      return this.ins < 0 ? this.len : this.ins;
    }
    get text() {
      let { inserted } = this.set,
        index = (this.i - 2) >> 1;
      return index >= inserted.length ? dist_Text.empty : inserted[index];
    }
    textBit(len) {
      let { inserted } = this.set,
        index = (this.i - 2) >> 1;
      return index >= inserted.length && !len
        ? dist_Text.empty
        : inserted[index].slice(this.off, len == null ? undefined : this.off + len);
    }
    forward(len) {
      if (len == this.len) this.next();
      else {
        this.len -= len;
        this.off += len;
      }
    }
    forward2(len) {
      if (this.ins == -1) this.forward(len);
      else if (len == this.ins) this.next();
      else {
        this.ins -= len;
        this.off += len;
      }
    }
  }

  class SelectionRange {
    constructor(from, to, flags) {
      this.from = from;
      this.to = to;
      this.flags = flags;
    }
    get anchor() {
      return this.flags & 16 ? this.to : this.from;
    }
    get head() {
      return this.flags & 16 ? this.from : this.to;
    }
    get empty() {
      return this.from == this.to;
    }
    get assoc() {
      return this.flags & 4 ? -1 : this.flags & 8 ? 1 : 0;
    }
    get bidiLevel() {
      let level = this.flags & 3;
      return level == 3 ? null : level;
    }
    get goalColumn() {
      let value = this.flags >> 5;
      return value == 33554431 ? undefined : value;
    }
    map(change, assoc = -1) {
      let from, to;
      if (this.empty) {
        from = to = change.mapPos(this.from, assoc);
      } else {
        from = change.mapPos(this.from, 1);
        to = change.mapPos(this.to, -1);
      }
      return from == this.from && to == this.to ? this : new SelectionRange(from, to, this.flags);
    }
    extend(from, to = from) {
      if (from <= this.anchor && to >= this.anchor) return dist_EditorSelection.range(from, to);
      let head = Math.abs(from - this.anchor) > Math.abs(to - this.anchor) ? from : to;
      return dist_EditorSelection.range(this.anchor, head);
    }
    eq(other) {
      return this.anchor == other.anchor && this.head == other.head;
    }
    toJSON() {
      return { anchor: this.anchor, head: this.head };
    }
    static fromJSON(json) {
      if (!json || typeof json.anchor != 'number' || typeof json.head != 'number')
        throw new RangeError('Invalid JSON representation for SelectionRange');
      return dist_EditorSelection.range(json.anchor, json.head);
    }
    static create(from, to, flags) {
      return new SelectionRange(from, to, flags);
    }
  }
  class dist_EditorSelection {
    constructor(ranges, mainIndex) {
      this.ranges = ranges;
      this.mainIndex = mainIndex;
    }
    map(change, assoc = -1) {
      if (change.empty) return this;
      return dist_EditorSelection.create(
        this.ranges.map(r => r.map(change, assoc)),
        this.mainIndex,
      );
    }
    eq(other) {
      if (this.ranges.length != other.ranges.length || this.mainIndex != other.mainIndex)
        return false;
      for (let i = 0; i < this.ranges.length; i++)
        if (!this.ranges[i].eq(other.ranges[i])) return false;
      return true;
    }
    get main() {
      return this.ranges[this.mainIndex];
    }
    asSingle() {
      return this.ranges.length == 1 ? this : new dist_EditorSelection([this.main], 0);
    }
    addRange(range, main = true) {
      return dist_EditorSelection.create(
        [range].concat(this.ranges),
        main ? 0 : this.mainIndex + 1,
      );
    }
    replaceRange(range, which = this.mainIndex) {
      let ranges = this.ranges.slice();
      ranges[which] = range;
      return dist_EditorSelection.create(ranges, this.mainIndex);
    }
    toJSON() {
      return { ranges: this.ranges.map(r => r.toJSON()), main: this.mainIndex };
    }
    static fromJSON(json) {
      if (
        !json ||
        !Array.isArray(json.ranges) ||
        typeof json.main != 'number' ||
        json.main >= json.ranges.length
      )
        throw new RangeError('Invalid JSON representation for EditorSelection');
      return new dist_EditorSelection(
        json.ranges.map(r => SelectionRange.fromJSON(r)),
        json.main,
      );
    }
    static single(anchor, head = anchor) {
      return new dist_EditorSelection([dist_EditorSelection.range(anchor, head)], 0);
    }
    static create(ranges, mainIndex = 0) {
      if (ranges.length == 0) throw new RangeError('A selection needs at least one range');
      for (let pos = 0, i = 0; i < ranges.length; i++) {
        let range = ranges[i];
        if (range.empty ? range.from <= pos : range.from < pos)
          return dist_EditorSelection.normalized(ranges.slice(), mainIndex);
        pos = range.to;
      }
      return new dist_EditorSelection(ranges, mainIndex);
    }
    static cursor(pos, assoc = 0, bidiLevel, goalColumn) {
      return SelectionRange.create(
        pos,
        pos,
        (assoc == 0 ? 0 : assoc < 0 ? 4 : 8) |
          (bidiLevel == null ? 3 : Math.min(2, bidiLevel)) |
          ((goalColumn !== null && goalColumn !== void 0 ? goalColumn : 33554431) << 5),
      );
    }
    static range(anchor, head, goalColumn) {
      let goal = (goalColumn !== null && goalColumn !== void 0 ? goalColumn : 33554431) << 5;
      return head < anchor
        ? SelectionRange.create(head, anchor, 16 | goal | 8)
        : SelectionRange.create(anchor, head, goal | (head > anchor ? 4 : 0));
    }
    static normalized(ranges, mainIndex = 0) {
      let main = ranges[mainIndex];
      ranges.sort((a, b) => a.from - b.from);
      mainIndex = ranges.indexOf(main);
      for (let i = 1; i < ranges.length; i++) {
        let range = ranges[i],
          prev = ranges[i - 1];
        if (range.empty ? range.from <= prev.to : range.from < prev.to) {
          let from = prev.from,
            to = Math.max(range.to, prev.to);
          if (i <= mainIndex) mainIndex--;
          ranges.splice(
            --i,
            2,
            range.anchor > range.head
              ? dist_EditorSelection.range(to, from)
              : dist_EditorSelection.range(from, to),
          );
        }
      }
      return new dist_EditorSelection(ranges, mainIndex);
    }
  }
  function checkSelection(selection, docLength) {
    for (let range of selection.ranges)
      if (range.to > docLength) throw new RangeError('Selection points outside of document');
  }

  let nextID = 0;
  class Facet {
    constructor(combine, compareInput, compare, isStatic, enables) {
      this.combine = combine;
      this.compareInput = compareInput;
      this.compare = compare;
      this.isStatic = isStatic;
      this.id = nextID++;
      this.default = combine([]);
      this.extensions = typeof enables == 'function' ? enables(this) : enables;
    }
    static define(config = {}) {
      return new Facet(
        config.combine || (a => a),
        config.compareInput || ((a, b) => a === b),
        config.compare || (!config.combine ? sameArray : (a, b) => a === b),
        !!config.static,
        config.enables,
      );
    }
    of(value) {
      return new FacetProvider([], this, 0, value);
    }
    compute(deps, get) {
      if (this.isStatic) throw new Error("Can't compute a static facet");
      return new FacetProvider(deps, this, 1, get);
    }
    computeN(deps, get) {
      if (this.isStatic) throw new Error("Can't compute a static facet");
      return new FacetProvider(deps, this, 2, get);
    }
    from(field, get) {
      if (!get) get = x => x;
      return this.compute([field], state => get(state.field(field)));
    }
  }
  function sameArray(a, b) {
    return a == b || (a.length == b.length && a.every((e, i) => e === b[i]));
  }
  class FacetProvider {
    constructor(dependencies, facet, type, value) {
      this.dependencies = dependencies;
      this.facet = facet;
      this.type = type;
      this.value = value;
      this.id = nextID++;
    }
    dynamicSlot(addresses) {
      var _a;
      let getter = this.value;
      let compare = this.facet.compareInput;
      let id = this.id,
        idx = addresses[id] >> 1,
        multi = this.type == 2;
      let depDoc = false,
        depSel = false,
        depAddrs = [];
      for (let dep of this.dependencies) {
        if (dep == 'doc') depDoc = true;
        else if (dep == 'selection') depSel = true;
        else if ((((_a = addresses[dep.id]) !== null && _a !== void 0 ? _a : 1) & 1) == 0)
          depAddrs.push(addresses[dep.id]);
      }
      return {
        create(state) {
          state.values[idx] = getter(state);
          return 1;
        },
        update(state, tr) {
          if (
            (depDoc && tr.docChanged) ||
            (depSel && (tr.docChanged || tr.selection)) ||
            ensureAll(state, depAddrs)
          ) {
            let newVal = getter(state);
            if (
              multi
                ? !compareArray(newVal, state.values[idx], compare)
                : !compare(newVal, state.values[idx])
            ) {
              state.values[idx] = newVal;
              return 1;
            }
          }
          return 0;
        },
        reconfigure: (state, oldState) => {
          let newVal = getter(state);
          let oldAddr = oldState.config.address[id];
          if (oldAddr != null) {
            let oldVal = getAddr(oldState, oldAddr);
            if (
              this.dependencies.every(dep => {
                return dep instanceof Facet
                  ? oldState.facet(dep) === state.facet(dep)
                  : dep instanceof dist_StateField
                  ? oldState.field(dep, false) == state.field(dep, false)
                  : true;
              }) ||
              (multi ? compareArray(newVal, oldVal, compare) : compare(newVal, oldVal))
            ) {
              state.values[idx] = oldVal;
              return 0;
            }
          }
          state.values[idx] = newVal;
          return 1;
        },
      };
    }
  }
  function compareArray(a, b, compare) {
    if (a.length != b.length) return false;
    for (let i = 0; i < a.length; i++) if (!compare(a[i], b[i])) return false;
    return true;
  }
  function ensureAll(state, addrs) {
    let changed = false;
    for (let addr of addrs) if (ensureAddr(state, addr) & 1) changed = true;
    return changed;
  }
  function dynamicFacetSlot(addresses, facet, providers) {
    let providerAddrs = providers.map(p => addresses[p.id]);
    let providerTypes = providers.map(p => p.type);
    let dynamic = providerAddrs.filter(p => !(p & 1));
    let idx = addresses[facet.id] >> 1;
    function get(state) {
      let values = [];
      for (let i = 0; i < providerAddrs.length; i++) {
        let value = getAddr(state, providerAddrs[i]);
        if (providerTypes[i] == 2) for (let val of value) values.push(val);
        else values.push(value);
      }
      return facet.combine(values);
    }
    return {
      create(state) {
        for (let addr of providerAddrs) ensureAddr(state, addr);
        state.values[idx] = get(state);
        return 1;
      },
      update(state, tr) {
        if (!ensureAll(state, dynamic)) return 0;
        let value = get(state);
        if (facet.compare(value, state.values[idx])) return 0;
        state.values[idx] = value;
        return 1;
      },
      reconfigure(state, oldState) {
        let depChanged = ensureAll(state, providerAddrs);
        let oldProviders = oldState.config.facets[facet.id],
          oldValue = oldState.facet(facet);
        if (oldProviders && !depChanged && sameArray(providers, oldProviders)) {
          state.values[idx] = oldValue;
          return 0;
        }
        let value = get(state);
        if (facet.compare(value, oldValue)) {
          state.values[idx] = oldValue;
          return 0;
        }
        state.values[idx] = value;
        return 1;
      },
    };
  }
  const initField = Facet.define({ static: true });
  class dist_StateField {
    constructor(id, createF, updateF, compareF, spec) {
      this.id = id;
      this.createF = createF;
      this.updateF = updateF;
      this.compareF = compareF;
      this.spec = spec;
      this.provides = undefined;
    }
    static define(config) {
      let field = new dist_StateField(
        nextID++,
        config.create,
        config.update,
        config.compare || ((a, b) => a === b),
        config,
      );
      if (config.provide) field.provides = config.provide(field);
      return field;
    }
    create(state) {
      let init = state.facet(initField).find(i => i.field == this);
      return ((init === null || init === void 0 ? void 0 : init.create) || this.createF)(state);
    }
    slot(addresses) {
      let idx = addresses[this.id] >> 1;
      return {
        create: state => {
          state.values[idx] = this.create(state);
          return 1;
        },
        update: (state, tr) => {
          let oldVal = state.values[idx];
          let value = this.updateF(oldVal, tr);
          if (this.compareF(oldVal, value)) return 0;
          state.values[idx] = value;
          return 1;
        },
        reconfigure: (state, oldState) => {
          if (oldState.config.address[this.id] != null) {
            state.values[idx] = oldState.field(this);
            return 0;
          }
          state.values[idx] = this.create(state);
          return 1;
        },
      };
    }
    init(create) {
      return [this, initField.of({ field: this, create })];
    }
    get extension() {
      return this;
    }
  }
  const Prec_ = { lowest: 4, low: 3, default: 2, high: 1, highest: 0 };
  function prec(value) {
    return ext => new PrecExtension(ext, value);
  }
  const dist_Prec = {
    highest: prec(Prec_.highest),
    high: prec(Prec_.high),
    default: prec(Prec_.default),
    low: prec(Prec_.low),
    lowest: prec(Prec_.lowest),
  };
  class PrecExtension {
    constructor(inner, prec) {
      this.inner = inner;
      this.prec = prec;
    }
  }
  class Compartment {
    of(ext) {
      return new CompartmentInstance(this, ext);
    }
    reconfigure(content) {
      return Compartment.reconfigure.of({ compartment: this, extension: content });
    }
    get(state) {
      return state.config.compartments.get(this);
    }
  }
  class CompartmentInstance {
    constructor(compartment, inner) {
      this.compartment = compartment;
      this.inner = inner;
    }
  }
  class Configuration {
    constructor(base, compartments, dynamicSlots, address, staticValues, facets) {
      this.base = base;
      this.compartments = compartments;
      this.dynamicSlots = dynamicSlots;
      this.address = address;
      this.staticValues = staticValues;
      this.facets = facets;
      this.statusTemplate = [];
      while (this.statusTemplate.length < dynamicSlots.length) this.statusTemplate.push(0);
    }
    staticFacet(facet) {
      let addr = this.address[facet.id];
      return addr == null ? facet.default : this.staticValues[addr >> 1];
    }
    static resolve(base, compartments, oldState) {
      let fields = [];
      let facets = Object.create(null);
      let newCompartments = new Map();
      for (let ext of flatten(base, compartments, newCompartments)) {
        if (ext instanceof dist_StateField) fields.push(ext);
        else (facets[ext.facet.id] || (facets[ext.facet.id] = [])).push(ext);
      }
      let address = Object.create(null);
      let staticValues = [];
      let dynamicSlots = [];
      for (let field of fields) {
        address[field.id] = dynamicSlots.length << 1;
        dynamicSlots.push(a => field.slot(a));
      }
      let oldFacets = oldState === null || oldState === void 0 ? void 0 : oldState.config.facets;
      for (let id in facets) {
        let providers = facets[id],
          facet = providers[0].facet;
        let oldProviders = (oldFacets && oldFacets[id]) || [];
        if (providers.every(p => p.type == 0)) {
          address[facet.id] = (staticValues.length << 1) | 1;
          if (sameArray(oldProviders, providers)) {
            staticValues.push(oldState.facet(facet));
          } else {
            let value = facet.combine(providers.map(p => p.value));
            staticValues.push(
              oldState && facet.compare(value, oldState.facet(facet))
                ? oldState.facet(facet)
                : value,
            );
          }
        } else {
          for (let p of providers) {
            if (p.type == 0) {
              address[p.id] = (staticValues.length << 1) | 1;
              staticValues.push(p.value);
            } else {
              address[p.id] = dynamicSlots.length << 1;
              dynamicSlots.push(a => p.dynamicSlot(a));
            }
          }
          address[facet.id] = dynamicSlots.length << 1;
          dynamicSlots.push(a => dynamicFacetSlot(a, facet, providers));
        }
      }
      let dynamic = dynamicSlots.map(f => f(address));
      return new Configuration(base, newCompartments, dynamic, address, staticValues, facets);
    }
  }
  function flatten(extension, compartments, newCompartments) {
    let result = [[], [], [], [], []];
    let seen = new Map();
    function inner(ext, prec) {
      let known = seen.get(ext);
      if (known != null) {
        if (known <= prec) return;
        let found = result[known].indexOf(ext);
        if (found > -1) result[known].splice(found, 1);
        if (ext instanceof CompartmentInstance) newCompartments.delete(ext.compartment);
      }
      seen.set(ext, prec);
      if (Array.isArray(ext)) {
        for (let e of ext) inner(e, prec);
      } else if (ext instanceof CompartmentInstance) {
        if (newCompartments.has(ext.compartment))
          throw new RangeError(`Duplicate use of compartment in extensions`);
        let content = compartments.get(ext.compartment) || ext.inner;
        newCompartments.set(ext.compartment, content);
        inner(content, prec);
      } else if (ext instanceof PrecExtension) {
        inner(ext.inner, ext.prec);
      } else if (ext instanceof dist_StateField) {
        result[prec].push(ext);
        if (ext.provides) inner(ext.provides, prec);
      } else if (ext instanceof FacetProvider) {
        result[prec].push(ext);
        if (ext.facet.extensions) inner(ext.facet.extensions, Prec_.default);
      } else {
        let content = ext.extension;
        if (!content)
          throw new Error(
            `Unrecognized extension value in extension set (${ext}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`,
          );
        inner(content, prec);
      }
    }
    inner(extension, Prec_.default);
    return result.reduce((a, b) => a.concat(b));
  }
  function ensureAddr(state, addr) {
    if (addr & 1) return 2;
    let idx = addr >> 1;
    let status = state.status[idx];
    if (status == 4) throw new Error('Cyclic dependency between fields and/or facets');
    if (status & 2) return status;
    state.status[idx] = 4;
    let changed = state.computeSlot(state, state.config.dynamicSlots[idx]);
    return (state.status[idx] = 2 | changed);
  }
  function getAddr(state, addr) {
    return addr & 1 ? state.config.staticValues[addr >> 1] : state.values[addr >> 1];
  }

  const languageData = Facet.define();
  const allowMultipleSelections = Facet.define({
    combine: values => values.some(v => v),
    static: true,
  });
  const lineSeparator = Facet.define({
    combine: values => (values.length ? values[0] : undefined),
    static: true,
  });
  const changeFilter = Facet.define();
  const transactionFilter = Facet.define();
  const transactionExtender = Facet.define();
  const readOnly = Facet.define({
    combine: values => (values.length ? values[0] : false),
  });

  class Annotation {
    constructor(type, value) {
      this.type = type;
      this.value = value;
    }
    static define() {
      return new AnnotationType();
    }
  }
  class AnnotationType {
    of(value) {
      return new Annotation(this, value);
    }
  }
  class StateEffectType {
    constructor(map) {
      this.map = map;
    }
    of(value) {
      return new dist_StateEffect(this, value);
    }
  }
  class dist_StateEffect {
    constructor(type, value) {
      this.type = type;
      this.value = value;
    }
    map(mapping) {
      let mapped = this.type.map(this.value, mapping);
      return mapped === undefined
        ? undefined
        : mapped == this.value
        ? this
        : new dist_StateEffect(this.type, mapped);
    }
    is(type) {
      return this.type == type;
    }
    static define(spec = {}) {
      return new StateEffectType(spec.map || (v => v));
    }
    static mapEffects(effects, mapping) {
      if (!effects.length) return effects;
      let result = [];
      for (let effect of effects) {
        let mapped = effect.map(mapping);
        if (mapped) result.push(mapped);
      }
      return result;
    }
  }
  dist_StateEffect.reconfigure = dist_StateEffect.define();
  dist_StateEffect.appendConfig = dist_StateEffect.define();
  class Transaction {
    constructor(startState, changes, selection, effects, annotations, scrollIntoView) {
      this.startState = startState;
      this.changes = changes;
      this.selection = selection;
      this.effects = effects;
      this.annotations = annotations;
      this.scrollIntoView = scrollIntoView;
      this._doc = null;
      this._state = null;
      if (selection) checkSelection(selection, changes.newLength);
      if (!annotations.some(a => a.type == Transaction.time))
        this.annotations = annotations.concat(Transaction.time.of(Date.now()));
    }
    static create(startState, changes, selection, effects, annotations, scrollIntoView) {
      return new Transaction(startState, changes, selection, effects, annotations, scrollIntoView);
    }
    get newDoc() {
      return this._doc || (this._doc = this.changes.apply(this.startState.doc));
    }
    get newSelection() {
      return this.selection || this.startState.selection.map(this.changes);
    }
    get state() {
      if (!this._state) this.startState.applyTransaction(this);
      return this._state;
    }
    annotation(type) {
      for (let ann of this.annotations) if (ann.type == type) return ann.value;
      return undefined;
    }
    get docChanged() {
      return !this.changes.empty;
    }
    get reconfigured() {
      return this.startState.config != this.state.config;
    }
    isUserEvent(event) {
      let e = this.annotation(Transaction.userEvent);
      return !!(
        e &&
        (e == event ||
          (e.length > event.length && e.slice(0, event.length) == event && e[event.length] == '.'))
      );
    }
  }
  Transaction.time = Annotation.define();
  Transaction.userEvent = Annotation.define();
  Transaction.addToHistory = Annotation.define();
  Transaction.remote = Annotation.define();
  function joinRanges(a, b) {
    let result = [];
    for (let iA = 0, iB = 0; ; ) {
      let from, to;
      if (iA < a.length && (iB == b.length || b[iB] >= a[iA])) {
        from = a[iA++];
        to = a[iA++];
      } else if (iB < b.length) {
        from = b[iB++];
        to = b[iB++];
      } else return result;
      if (!result.length || result[result.length - 1] < from) result.push(from, to);
      else if (result[result.length - 1] < to) result[result.length - 1] = to;
    }
  }
  function mergeTransaction(a, b, sequential) {
    var _a;
    let mapForA, mapForB, changes;
    if (sequential) {
      mapForA = b.changes;
      mapForB = ChangeSet.empty(b.changes.length);
      changes = a.changes.compose(b.changes);
    } else {
      mapForA = b.changes.map(a.changes);
      mapForB = a.changes.mapDesc(b.changes, true);
      changes = a.changes.compose(mapForA);
    }
    return {
      changes,
      selection: b.selection
        ? b.selection.map(mapForB)
        : (_a = a.selection) === null || _a === void 0
        ? void 0
        : _a.map(mapForA),
      effects: dist_StateEffect
        .mapEffects(a.effects, mapForA)
        .concat(dist_StateEffect.mapEffects(b.effects, mapForB)),
      annotations: a.annotations.length ? a.annotations.concat(b.annotations) : b.annotations,
      scrollIntoView: a.scrollIntoView || b.scrollIntoView,
    };
  }
  function resolveTransactionInner(state, spec, docSize) {
    let sel = spec.selection,
      annotations = asArray(spec.annotations);
    if (spec.userEvent) annotations = annotations.concat(Transaction.userEvent.of(spec.userEvent));
    return {
      changes:
        spec.changes instanceof ChangeSet
          ? spec.changes
          : ChangeSet.of(spec.changes || [], docSize, state.facet(lineSeparator)),
      selection:
        sel &&
        (sel instanceof dist_EditorSelection
          ? sel
          : dist_EditorSelection.single(sel.anchor, sel.head)),
      effects: asArray(spec.effects),
      annotations,
      scrollIntoView: !!spec.scrollIntoView,
    };
  }
  function resolveTransaction(state, specs, filter) {
    let s = resolveTransactionInner(state, specs.length ? specs[0] : {}, state.doc.length);
    if (specs.length && specs[0].filter === false) filter = false;
    for (let i = 1; i < specs.length; i++) {
      if (specs[i].filter === false) filter = false;
      let seq = !!specs[i].sequential;
      s = mergeTransaction(
        s,
        resolveTransactionInner(state, specs[i], seq ? s.changes.newLength : state.doc.length),
        seq,
      );
    }
    let tr = Transaction.create(
      state,
      s.changes,
      s.selection,
      s.effects,
      s.annotations,
      s.scrollIntoView,
    );
    return extendTransaction(filter ? filterTransaction(tr) : tr);
  }
  function filterTransaction(tr) {
    let state = tr.startState;
    let result = true;
    for (let filter of state.facet(changeFilter)) {
      let value = filter(tr);
      if (value === false) {
        result = false;
        break;
      }
      if (Array.isArray(value)) result = result === true ? value : joinRanges(result, value);
    }
    if (result !== true) {
      let changes, back;
      if (result === false) {
        back = tr.changes.invertedDesc;
        changes = ChangeSet.empty(state.doc.length);
      } else {
        let filtered = tr.changes.filter(result);
        changes = filtered.changes;
        back = filtered.filtered.mapDesc(filtered.changes).invertedDesc;
      }
      tr = Transaction.create(
        state,
        changes,
        tr.selection && tr.selection.map(back),
        dist_StateEffect.mapEffects(tr.effects, back),
        tr.annotations,
        tr.scrollIntoView,
      );
    }
    let filters = state.facet(transactionFilter);
    for (let i = filters.length - 1; i >= 0; i--) {
      let filtered = filters[i](tr);
      if (filtered instanceof Transaction) tr = filtered;
      else if (
        Array.isArray(filtered) &&
        filtered.length == 1 &&
        filtered[0] instanceof Transaction
      )
        tr = filtered[0];
      else tr = resolveTransaction(state, asArray(filtered), false);
    }
    return tr;
  }
  function extendTransaction(tr) {
    let state = tr.startState,
      extenders = state.facet(transactionExtender),
      spec = tr;
    for (let i = extenders.length - 1; i >= 0; i--) {
      let extension = extenders[i](tr);
      if (extension && Object.keys(extension).length)
        spec = mergeTransaction(
          tr,
          resolveTransactionInner(state, extension, tr.changes.newLength),
          true,
        );
    }
    return spec == tr
      ? tr
      : Transaction.create(
          state,
          tr.changes,
          tr.selection,
          spec.effects,
          spec.annotations,
          spec.scrollIntoView,
        );
  }
  const none = [];
  function asArray(value) {
    return value == null ? none : Array.isArray(value) ? value : [value];
  }

  var dist_CharCategory = (function (CharCategory) {
    CharCategory[(CharCategory['Word'] = 0)] = 'Word';
    CharCategory[(CharCategory['Space'] = 1)] = 'Space';
    CharCategory[(CharCategory['Other'] = 2)] = 'Other';
    return CharCategory;
  })(dist_CharCategory || (dist_CharCategory = {}));
  const nonASCIISingleCaseWordChar =
    /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
  let wordChar;
  try {
    wordChar = new RegExp('[\\p{Alphabetic}\\p{Number}_]', 'u');
  } catch (_) {}
  function hasWordChar(str) {
    if (wordChar) return wordChar.test(str);
    for (let i = 0; i < str.length; i++) {
      let ch = str[i];
      if (
        /\w/.test(ch) ||
        (ch > '\x80' &&
          (ch.toUpperCase() != ch.toLowerCase() || nonASCIISingleCaseWordChar.test(ch)))
      )
        return true;
    }
    return false;
  }
  function makeCategorizer(wordChars) {
    return char => {
      if (!/\S/.test(char)) return dist_CharCategory.Space;
      if (hasWordChar(char)) return dist_CharCategory.Word;
      for (let i = 0; i < wordChars.length; i++)
        if (char.indexOf(wordChars[i]) > -1) return dist_CharCategory.Word;
      return dist_CharCategory.Other;
    };
  }

  class dist_EditorState {
    constructor(config, doc, selection, values, computeSlot, tr) {
      this.config = config;
      this.doc = doc;
      this.selection = selection;
      this.values = values;
      this.status = config.statusTemplate.slice();
      this.computeSlot = computeSlot;
      if (tr) tr._state = this;
      for (let i = 0; i < this.config.dynamicSlots.length; i++) ensureAddr(this, i << 1);
      this.computeSlot = null;
    }
    field(field, require = true) {
      let addr = this.config.address[field.id];
      if (addr == null) {
        if (require) throw new RangeError('Field is not present in this state');
        return undefined;
      }
      ensureAddr(this, addr);
      return getAddr(this, addr);
    }
    update(...specs) {
      return resolveTransaction(this, specs, true);
    }
    applyTransaction(tr) {
      let conf = this.config,
        { base, compartments } = conf;
      for (let effect of tr.effects) {
        if (effect.is(Compartment.reconfigure)) {
          if (conf) {
            compartments = new Map();
            conf.compartments.forEach((val, key) => compartments.set(key, val));
            conf = null;
          }
          compartments.set(effect.value.compartment, effect.value.extension);
        } else if (effect.is(dist_StateEffect.reconfigure)) {
          conf = null;
          base = effect.value;
        } else if (effect.is(dist_StateEffect.appendConfig)) {
          conf = null;
          base = asArray(base).concat(effect.value);
        }
      }
      let startValues;
      if (!conf) {
        conf = Configuration.resolve(base, compartments, this);
        let intermediateState = new dist_EditorState(
          conf,
          this.doc,
          this.selection,
          conf.dynamicSlots.map(() => null),
          (state, slot) => slot.reconfigure(state, this),
          null,
        );
        startValues = intermediateState.values;
      } else {
        startValues = tr.startState.values.slice();
      }
      new dist_EditorState(
        conf,
        tr.newDoc,
        tr.newSelection,
        startValues,
        (state, slot) => slot.update(state, tr),
        tr,
      );
    }
    replaceSelection(text) {
      if (typeof text == 'string') text = this.toText(text);
      return this.changeByRange(range => ({
        changes: { from: range.from, to: range.to, insert: text },
        range: dist_EditorSelection.cursor(range.from + text.length),
      }));
    }
    changeByRange(f) {
      let sel = this.selection;
      let result1 = f(sel.ranges[0]);
      let changes = this.changes(result1.changes),
        ranges = [result1.range];
      let effects = asArray(result1.effects);
      for (let i = 1; i < sel.ranges.length; i++) {
        let result = f(sel.ranges[i]);
        let newChanges = this.changes(result.changes),
          newMapped = newChanges.map(changes);
        for (let j = 0; j < i; j++) ranges[j] = ranges[j].map(newMapped);
        let mapBy = changes.mapDesc(newChanges, true);
        ranges.push(result.range.map(mapBy));
        changes = changes.compose(newMapped);
        effects = dist_StateEffect
          .mapEffects(effects, newMapped)
          .concat(dist_StateEffect.mapEffects(asArray(result.effects), mapBy));
      }
      return {
        changes,
        selection: dist_EditorSelection.create(ranges, sel.mainIndex),
        effects,
      };
    }
    changes(spec = []) {
      if (spec instanceof ChangeSet) return spec;
      return ChangeSet.of(spec, this.doc.length, this.facet(dist_EditorState.lineSeparator));
    }
    toText(string) {
      return dist_Text.of(string.split(this.facet(dist_EditorState.lineSeparator) || DefaultSplit));
    }
    sliceDoc(from = 0, to = this.doc.length) {
      return this.doc.sliceString(from, to, this.lineBreak);
    }
    facet(facet) {
      let addr = this.config.address[facet.id];
      if (addr == null) return facet.default;
      ensureAddr(this, addr);
      return getAddr(this, addr);
    }
    toJSON(fields) {
      let result = {
        doc: this.sliceDoc(),
        selection: this.selection.toJSON(),
      };
      if (fields)
        for (let prop in fields) {
          let value = fields[prop];
          if (value instanceof dist_StateField && this.config.address[value.id] != null)
            result[prop] = value.spec.toJSON(this.field(fields[prop]), this);
        }
      return result;
    }
    static fromJSON(json, config = {}, fields) {
      if (!json || typeof json.doc != 'string')
        throw new RangeError('Invalid JSON representation for EditorState');
      let fieldInit = [];
      if (fields)
        for (let prop in fields) {
          if (Object.prototype.hasOwnProperty.call(json, prop)) {
            let field = fields[prop],
              value = json[prop];
            fieldInit.push(field.init(state => field.spec.fromJSON(value, state)));
          }
        }
      return dist_EditorState.create({
        doc: json.doc,
        selection: dist_EditorSelection.fromJSON(json.selection),
        extensions: config.extensions ? fieldInit.concat([config.extensions]) : fieldInit,
      });
    }
    static create(config = {}) {
      let configuration = Configuration.resolve(config.extensions || [], new Map());
      let doc =
        config.doc instanceof dist_Text
          ? config.doc
          : dist_Text.of(
              (config.doc || '').split(
                configuration.staticFacet(dist_EditorState.lineSeparator) || DefaultSplit,
              ),
            );
      let selection = !config.selection
        ? dist_EditorSelection.single(0)
        : config.selection instanceof dist_EditorSelection
        ? config.selection
        : dist_EditorSelection.single(config.selection.anchor, config.selection.head);
      checkSelection(selection, doc.length);
      if (!configuration.staticFacet(allowMultipleSelections)) selection = selection.asSingle();
      return new dist_EditorState(
        configuration,
        doc,
        selection,
        configuration.dynamicSlots.map(() => null),
        (state, slot) => slot.create(state),
        null,
      );
    }
    get tabSize() {
      return this.facet(dist_EditorState.tabSize);
    }
    get lineBreak() {
      return this.facet(dist_EditorState.lineSeparator) || '\n';
    }
    get readOnly() {
      return this.facet(readOnly);
    }
    phrase(phrase, ...insert) {
      for (let map of this.facet(dist_EditorState.phrases))
        if (Object.prototype.hasOwnProperty.call(map, phrase)) {
          phrase = map[phrase];
          break;
        }
      if (insert.length)
        phrase = phrase.replace(/\$(\$|\d*)/g, (m, i) => {
          if (i == '$') return '$';
          let n = +(i || 1);
          return !n || n > insert.length ? m : insert[n - 1];
        });
      return phrase;
    }
    languageDataAt(name, pos, side = -1) {
      let values = [];
      for (let provider of this.facet(languageData)) {
        for (let result of provider(this, pos, side)) {
          if (Object.prototype.hasOwnProperty.call(result, name)) values.push(result[name]);
        }
      }
      return values;
    }
    charCategorizer(at) {
      return makeCategorizer(this.languageDataAt('wordChars', at).join(''));
    }
    wordAt(pos) {
      let { text, from, length } = this.doc.lineAt(pos);
      let cat = this.charCategorizer(pos);
      let start = pos - from,
        end = pos - from;
      while (start > 0) {
        let prev = findClusterBreak(text, start, false);
        if (cat(text.slice(prev, start)) != dist_CharCategory.Word) break;
        start = prev;
      }
      while (end < length) {
        let next = findClusterBreak(text, end);
        if (cat(text.slice(end, next)) != dist_CharCategory.Word) break;
        end = next;
      }
      return start == end ? null : dist_EditorSelection.range(start + from, end + from);
    }
  }
  dist_EditorState.allowMultipleSelections = allowMultipleSelections;
  dist_EditorState.tabSize = Facet.define({
    combine: values => (values.length ? values[0] : 4),
  });
  dist_EditorState.lineSeparator = lineSeparator;
  dist_EditorState.readOnly = readOnly;
  dist_EditorState.phrases = Facet.define({
    compare(a, b) {
      let kA = Object.keys(a),
        kB = Object.keys(b);
      return kA.length == kB.length && kA.every(k => a[k] == b[k]);
    },
  });
  dist_EditorState.languageData = languageData;
  dist_EditorState.changeFilter = changeFilter;
  dist_EditorState.transactionFilter = transactionFilter;
  dist_EditorState.transactionExtender = transactionExtender;
  Compartment.reconfigure = dist_StateEffect.define();

  function combineConfig(configs, defaults, combine = {}) {
    let result = {};
    for (let config of configs)
      for (let key of Object.keys(config)) {
        let value = config[key],
          current = result[key];
        if (current === undefined) result[key] = value;
        else if (current === value || value === undefined);
        else if (Object.hasOwnProperty.call(combine, key))
          result[key] = combine[key](current, value);
        else throw new Error('Config merge conflict for field ' + key);
      }
    for (let key in defaults) if (result[key] === undefined) result[key] = defaults[key];
    return result;
  }

  class RangeValue {
    eq(other) {
      return this == other;
    }
    range(from, to = from) {
      return dist_Range.create(from, to, this);
    }
  }
  RangeValue.prototype.startSide = RangeValue.prototype.endSide = 0;
  RangeValue.prototype.point = false;
  RangeValue.prototype.mapMode = dist_MapMode.TrackDel;
  class dist_Range {
    constructor(from, to, value) {
      this.from = from;
      this.to = to;
      this.value = value;
    }
    static create(from, to, value) {
      return new dist_Range(from, to, value);
    }
  }
  function cmpRange(a, b) {
    return a.from - b.from || a.value.startSide - b.value.startSide;
  }
  class Chunk {
    constructor(from, to, value, maxPoint) {
      this.from = from;
      this.to = to;
      this.value = value;
      this.maxPoint = maxPoint;
    }
    get length() {
      return this.to[this.to.length - 1];
    }
    findIndex(pos, side, end, startAt = 0) {
      let arr = end ? this.to : this.from;
      for (let lo = startAt, hi = arr.length; ; ) {
        if (lo == hi) return lo;
        let mid = (lo + hi) >> 1;
        let diff =
          arr[mid] - pos || (end ? this.value[mid].endSide : this.value[mid].startSide) - side;
        if (mid == lo) return diff >= 0 ? lo : hi;
        if (diff >= 0) hi = mid;
        else lo = mid + 1;
      }
    }
    between(offset, from, to, f) {
      for (
        let i = this.findIndex(from, -1000000000, true),
          e = this.findIndex(to, 1000000000, false, i);
        i < e;
        i++
      )
        if (f(this.from[i] + offset, this.to[i] + offset, this.value[i]) === false) return false;
    }
    map(offset, changes) {
      let value = [],
        from = [],
        to = [],
        newPos = -1,
        maxPoint = -1;
      for (let i = 0; i < this.value.length; i++) {
        let val = this.value[i],
          curFrom = this.from[i] + offset,
          curTo = this.to[i] + offset,
          newFrom,
          newTo;
        if (curFrom == curTo) {
          let mapped = changes.mapPos(curFrom, val.startSide, val.mapMode);
          if (mapped == null) continue;
          newFrom = newTo = mapped;
          if (val.startSide != val.endSide) {
            newTo = changes.mapPos(curFrom, val.endSide);
            if (newTo < newFrom) continue;
          }
        } else {
          newFrom = changes.mapPos(curFrom, val.startSide);
          newTo = changes.mapPos(curTo, val.endSide);
          if (newFrom > newTo || (newFrom == newTo && val.startSide > 0 && val.endSide <= 0))
            continue;
        }
        if ((newTo - newFrom || val.endSide - val.startSide) < 0) continue;
        if (newPos < 0) newPos = newFrom;
        if (val.point) maxPoint = Math.max(maxPoint, newTo - newFrom);
        value.push(val);
        from.push(newFrom - newPos);
        to.push(newTo - newPos);
      }
      return { mapped: value.length ? new Chunk(from, to, value, maxPoint) : null, pos: newPos };
    }
  }
  class dist_RangeSet {
    constructor(chunkPos, chunk, nextLayer, maxPoint) {
      this.chunkPos = chunkPos;
      this.chunk = chunk;
      this.nextLayer = nextLayer;
      this.maxPoint = maxPoint;
    }
    static create(chunkPos, chunk, nextLayer, maxPoint) {
      return new dist_RangeSet(chunkPos, chunk, nextLayer, maxPoint);
    }
    get length() {
      let last = this.chunk.length - 1;
      return last < 0 ? 0 : Math.max(this.chunkEnd(last), this.nextLayer.length);
    }
    get size() {
      if (this.isEmpty) return 0;
      let size = this.nextLayer.size;
      for (let chunk of this.chunk) size += chunk.value.length;
      return size;
    }
    chunkEnd(index) {
      return this.chunkPos[index] + this.chunk[index].length;
    }
    update(updateSpec) {
      let { add = [], sort = false, filterFrom = 0, filterTo = this.length } = updateSpec;
      let filter = updateSpec.filter;
      if (add.length == 0 && !filter) return this;
      if (sort) add = add.slice().sort(cmpRange);
      if (this.isEmpty) return add.length ? dist_RangeSet.of(add) : this;
      let cur = new LayerCursor(this, null, -1).goto(0),
        i = 0,
        spill = [];
      let builder = new dist_RangeSetBuilder();
      while (cur.value || i < add.length) {
        if (
          i < add.length &&
          (cur.from - add[i].from || cur.startSide - add[i].value.startSide) >= 0
        ) {
          let range = add[i++];
          if (!builder.addInner(range.from, range.to, range.value)) spill.push(range);
        } else if (
          cur.rangeIndex == 1 &&
          cur.chunkIndex < this.chunk.length &&
          (i == add.length || this.chunkEnd(cur.chunkIndex) < add[i].from) &&
          (!filter ||
            filterFrom > this.chunkEnd(cur.chunkIndex) ||
            filterTo < this.chunkPos[cur.chunkIndex]) &&
          builder.addChunk(this.chunkPos[cur.chunkIndex], this.chunk[cur.chunkIndex])
        ) {
          cur.nextChunk();
        } else {
          if (
            !filter ||
            filterFrom > cur.to ||
            filterTo < cur.from ||
            filter(cur.from, cur.to, cur.value)
          ) {
            if (!builder.addInner(cur.from, cur.to, cur.value))
              spill.push(dist_Range.create(cur.from, cur.to, cur.value));
          }
          cur.next();
        }
      }
      return builder.finishInner(
        this.nextLayer.isEmpty && !spill.length
          ? dist_RangeSet.empty
          : this.nextLayer.update({ add: spill, filter, filterFrom, filterTo }),
      );
    }
    map(changes) {
      if (changes.empty || this.isEmpty) return this;
      let chunks = [],
        chunkPos = [],
        maxPoint = -1;
      for (let i = 0; i < this.chunk.length; i++) {
        let start = this.chunkPos[i],
          chunk = this.chunk[i];
        let touch = changes.touchesRange(start, start + chunk.length);
        if (touch === false) {
          maxPoint = Math.max(maxPoint, chunk.maxPoint);
          chunks.push(chunk);
          chunkPos.push(changes.mapPos(start));
        } else if (touch === true) {
          let { mapped, pos } = chunk.map(start, changes);
          if (mapped) {
            maxPoint = Math.max(maxPoint, mapped.maxPoint);
            chunks.push(mapped);
            chunkPos.push(pos);
          }
        }
      }
      let next = this.nextLayer.map(changes);
      return chunks.length == 0
        ? next
        : new dist_RangeSet(chunkPos, chunks, next || dist_RangeSet.empty, maxPoint);
    }
    between(from, to, f) {
      if (this.isEmpty) return;
      for (let i = 0; i < this.chunk.length; i++) {
        let start = this.chunkPos[i],
          chunk = this.chunk[i];
        if (
          to >= start &&
          from <= start + chunk.length &&
          chunk.between(start, from - start, to - start, f) === false
        )
          return;
      }
      this.nextLayer.between(from, to, f);
    }
    iter(from = 0) {
      return HeapCursor.from([this]).goto(from);
    }
    get isEmpty() {
      return this.nextLayer == this;
    }
    static iter(sets, from = 0) {
      return HeapCursor.from(sets).goto(from);
    }
    static compare(oldSets, newSets, textDiff, comparator, minPointSize = -1) {
      let a = oldSets.filter(
        set => set.maxPoint > 0 || (!set.isEmpty && set.maxPoint >= minPointSize),
      );
      let b = newSets.filter(
        set => set.maxPoint > 0 || (!set.isEmpty && set.maxPoint >= minPointSize),
      );
      let sharedChunks = findSharedChunks(a, b, textDiff);
      let sideA = new SpanCursor(a, sharedChunks, minPointSize);
      let sideB = new SpanCursor(b, sharedChunks, minPointSize);
      textDiff.iterGaps((fromA, fromB, length) =>
        compare(sideA, fromA, sideB, fromB, length, comparator),
      );
      if (textDiff.empty && textDiff.length == 0) compare(sideA, 0, sideB, 0, 0, comparator);
    }
    static eq(oldSets, newSets, from = 0, to) {
      if (to == null) to = 1000000000;
      let a = oldSets.filter(set => !set.isEmpty && newSets.indexOf(set) < 0);
      let b = newSets.filter(set => !set.isEmpty && oldSets.indexOf(set) < 0);
      if (a.length != b.length) return false;
      if (!a.length) return true;
      let sharedChunks = findSharedChunks(a, b);
      let sideA = new SpanCursor(a, sharedChunks, 0).goto(from),
        sideB = new SpanCursor(b, sharedChunks, 0).goto(from);
      for (;;) {
        if (
          sideA.to != sideB.to ||
          !sameValues(sideA.active, sideB.active) ||
          (sideA.point && (!sideB.point || !sideA.point.eq(sideB.point)))
        )
          return false;
        if (sideA.to > to) return true;
        sideA.next();
        sideB.next();
      }
    }
    static spans(sets, from, to, iterator, minPointSize = -1) {
      let cursor = new SpanCursor(sets, null, minPointSize).goto(from),
        pos = from;
      let open = cursor.openStart;
      for (;;) {
        let curTo = Math.min(cursor.to, to);
        if (cursor.point) {
          iterator.point(
            pos,
            curTo,
            cursor.point,
            cursor.activeForPoint(cursor.to),
            open,
            cursor.pointRank,
          );
          open = cursor.openEnd(curTo) + (cursor.to > curTo ? 1 : 0);
        } else if (curTo > pos) {
          iterator.span(pos, curTo, cursor.active, open);
          open = cursor.openEnd(curTo);
        }
        if (cursor.to > to) break;
        pos = cursor.to;
        cursor.next();
      }
      return open;
    }
    static of(ranges, sort = false) {
      let build = new dist_RangeSetBuilder();
      for (let range of ranges instanceof dist_Range ? [ranges] : sort ? lazySort(ranges) : ranges)
        build.add(range.from, range.to, range.value);
      return build.finish();
    }
  }
  dist_RangeSet.empty = new dist_RangeSet([], [], null, -1);
  function lazySort(ranges) {
    if (ranges.length > 1)
      for (let prev = ranges[0], i = 1; i < ranges.length; i++) {
        let cur = ranges[i];
        if (cmpRange(prev, cur) > 0) return ranges.slice().sort(cmpRange);
        prev = cur;
      }
    return ranges;
  }
  dist_RangeSet.empty.nextLayer = dist_RangeSet.empty;
  class dist_RangeSetBuilder {
    constructor() {
      this.chunks = [];
      this.chunkPos = [];
      this.chunkStart = -1;
      this.last = null;
      this.lastFrom = -1000000000;
      this.lastTo = -1000000000;
      this.from = [];
      this.to = [];
      this.value = [];
      this.maxPoint = -1;
      this.setMaxPoint = -1;
      this.nextLayer = null;
    }
    finishChunk(newArrays) {
      this.chunks.push(new Chunk(this.from, this.to, this.value, this.maxPoint));
      this.chunkPos.push(this.chunkStart);
      this.chunkStart = -1;
      this.setMaxPoint = Math.max(this.setMaxPoint, this.maxPoint);
      this.maxPoint = -1;
      if (newArrays) {
        this.from = [];
        this.to = [];
        this.value = [];
      }
    }
    add(from, to, value) {
      if (!this.addInner(from, to, value))
        (this.nextLayer || (this.nextLayer = new dist_RangeSetBuilder())).add(from, to, value);
    }
    addInner(from, to, value) {
      let diff = from - this.lastTo || value.startSide - this.last.endSide;
      if (diff <= 0 && (from - this.lastFrom || value.startSide - this.last.startSide) < 0)
        throw new Error('Ranges must be added sorted by `from` position and `startSide`');
      if (diff < 0) return false;
      if (this.from.length == 250) this.finishChunk(true);
      if (this.chunkStart < 0) this.chunkStart = from;
      this.from.push(from - this.chunkStart);
      this.to.push(to - this.chunkStart);
      this.last = value;
      this.lastFrom = from;
      this.lastTo = to;
      this.value.push(value);
      if (value.point) this.maxPoint = Math.max(this.maxPoint, to - from);
      return true;
    }
    addChunk(from, chunk) {
      if ((from - this.lastTo || chunk.value[0].startSide - this.last.endSide) < 0) return false;
      if (this.from.length) this.finishChunk(true);
      this.setMaxPoint = Math.max(this.setMaxPoint, chunk.maxPoint);
      this.chunks.push(chunk);
      this.chunkPos.push(from);
      let last = chunk.value.length - 1;
      this.last = chunk.value[last];
      this.lastFrom = chunk.from[last] + from;
      this.lastTo = chunk.to[last] + from;
      return true;
    }
    finish() {
      return this.finishInner(dist_RangeSet.empty);
    }
    finishInner(next) {
      if (this.from.length) this.finishChunk(false);
      if (this.chunks.length == 0) return next;
      let result = dist_RangeSet.create(
        this.chunkPos,
        this.chunks,
        this.nextLayer ? this.nextLayer.finishInner(next) : next,
        this.setMaxPoint,
      );
      this.from = null;
      return result;
    }
  }
  function findSharedChunks(a, b, textDiff) {
    let inA = new Map();
    for (let set of a)
      for (let i = 0; i < set.chunk.length; i++)
        if (set.chunk[i].maxPoint <= 0) inA.set(set.chunk[i], set.chunkPos[i]);
    let shared = new Set();
    for (let set of b)
      for (let i = 0; i < set.chunk.length; i++) {
        let known = inA.get(set.chunk[i]);
        if (
          known != null &&
          (textDiff ? textDiff.mapPos(known) : known) == set.chunkPos[i] &&
          !(textDiff === null || textDiff === void 0
            ? void 0
            : textDiff.touchesRange(known, known + set.chunk[i].length))
        )
          shared.add(set.chunk[i]);
      }
    return shared;
  }
  class LayerCursor {
    constructor(layer, skip, minPoint, rank = 0) {
      this.layer = layer;
      this.skip = skip;
      this.minPoint = minPoint;
      this.rank = rank;
    }
    get startSide() {
      return this.value ? this.value.startSide : 0;
    }
    get endSide() {
      return this.value ? this.value.endSide : 0;
    }
    goto(pos, side = -1000000000) {
      this.chunkIndex = this.rangeIndex = 0;
      this.gotoInner(pos, side, false);
      return this;
    }
    gotoInner(pos, side, forward) {
      while (this.chunkIndex < this.layer.chunk.length) {
        let next = this.layer.chunk[this.chunkIndex];
        if (
          !(
            (this.skip && this.skip.has(next)) ||
            this.layer.chunkEnd(this.chunkIndex) < pos ||
            next.maxPoint < this.minPoint
          )
        )
          break;
        this.chunkIndex++;
        forward = false;
      }
      if (this.chunkIndex < this.layer.chunk.length) {
        let rangeIndex = this.layer.chunk[this.chunkIndex].findIndex(
          pos - this.layer.chunkPos[this.chunkIndex],
          side,
          true,
        );
        if (!forward || this.rangeIndex < rangeIndex) this.setRangeIndex(rangeIndex);
      }
      this.next();
    }
    forward(pos, side) {
      if ((this.to - pos || this.endSide - side) < 0) this.gotoInner(pos, side, true);
    }
    next() {
      for (;;) {
        if (this.chunkIndex == this.layer.chunk.length) {
          this.from = this.to = 1000000000;
          this.value = null;
          break;
        } else {
          let chunkPos = this.layer.chunkPos[this.chunkIndex],
            chunk = this.layer.chunk[this.chunkIndex];
          let from = chunkPos + chunk.from[this.rangeIndex];
          this.from = from;
          this.to = chunkPos + chunk.to[this.rangeIndex];
          this.value = chunk.value[this.rangeIndex];
          this.setRangeIndex(this.rangeIndex + 1);
          if (this.minPoint < 0 || (this.value.point && this.to - this.from >= this.minPoint))
            break;
        }
      }
    }
    setRangeIndex(index) {
      if (index == this.layer.chunk[this.chunkIndex].value.length) {
        this.chunkIndex++;
        if (this.skip) {
          while (
            this.chunkIndex < this.layer.chunk.length &&
            this.skip.has(this.layer.chunk[this.chunkIndex])
          )
            this.chunkIndex++;
        }
        this.rangeIndex = 0;
      } else {
        this.rangeIndex = index;
      }
    }
    nextChunk() {
      this.chunkIndex++;
      this.rangeIndex = 0;
      this.next();
    }
    compare(other) {
      return (
        this.from - other.from ||
        this.startSide - other.startSide ||
        this.rank - other.rank ||
        this.to - other.to ||
        this.endSide - other.endSide
      );
    }
  }
  class HeapCursor {
    constructor(heap) {
      this.heap = heap;
    }
    static from(sets, skip = null, minPoint = -1) {
      let heap = [];
      for (let i = 0; i < sets.length; i++) {
        for (let cur = sets[i]; !cur.isEmpty; cur = cur.nextLayer) {
          if (cur.maxPoint >= minPoint) heap.push(new LayerCursor(cur, skip, minPoint, i));
        }
      }
      return heap.length == 1 ? heap[0] : new HeapCursor(heap);
    }
    get startSide() {
      return this.value ? this.value.startSide : 0;
    }
    goto(pos, side = -1000000000) {
      for (let cur of this.heap) cur.goto(pos, side);
      for (let i = this.heap.length >> 1; i >= 0; i--) heapBubble(this.heap, i);
      this.next();
      return this;
    }
    forward(pos, side) {
      for (let cur of this.heap) cur.forward(pos, side);
      for (let i = this.heap.length >> 1; i >= 0; i--) heapBubble(this.heap, i);
      if ((this.to - pos || this.value.endSide - side) < 0) this.next();
    }
    next() {
      if (this.heap.length == 0) {
        this.from = this.to = 1000000000;
        this.value = null;
        this.rank = -1;
      } else {
        let top = this.heap[0];
        this.from = top.from;
        this.to = top.to;
        this.value = top.value;
        this.rank = top.rank;
        if (top.value) top.next();
        heapBubble(this.heap, 0);
      }
    }
  }
  function heapBubble(heap, index) {
    for (let cur = heap[index]; ; ) {
      let childIndex = (index << 1) + 1;
      if (childIndex >= heap.length) break;
      let child = heap[childIndex];
      if (childIndex + 1 < heap.length && child.compare(heap[childIndex + 1]) >= 0) {
        child = heap[childIndex + 1];
        childIndex++;
      }
      if (cur.compare(child) < 0) break;
      heap[childIndex] = cur;
      heap[index] = child;
      index = childIndex;
    }
  }
  class SpanCursor {
    constructor(sets, skip, minPoint) {
      this.minPoint = minPoint;
      this.active = [];
      this.activeTo = [];
      this.activeRank = [];
      this.minActive = -1;
      this.point = null;
      this.pointFrom = 0;
      this.pointRank = 0;
      this.to = -1000000000;
      this.endSide = 0;
      this.openStart = -1;
      this.cursor = HeapCursor.from(sets, skip, minPoint);
    }
    goto(pos, side = -1000000000) {
      this.cursor.goto(pos, side);
      this.active.length = this.activeTo.length = this.activeRank.length = 0;
      this.minActive = -1;
      this.to = pos;
      this.endSide = side;
      this.openStart = -1;
      this.next();
      return this;
    }
    forward(pos, side) {
      while (
        this.minActive > -1 &&
        (this.activeTo[this.minActive] - pos || this.active[this.minActive].endSide - side) < 0
      )
        this.removeActive(this.minActive);
      this.cursor.forward(pos, side);
    }
    removeActive(index) {
      remove(this.active, index);
      remove(this.activeTo, index);
      remove(this.activeRank, index);
      this.minActive = findMinIndex(this.active, this.activeTo);
    }
    addActive(trackOpen) {
      let i = 0,
        { value, to, rank } = this.cursor;
      while (i < this.activeRank.length && this.activeRank[i] <= rank) i++;
      insert(this.active, i, value);
      insert(this.activeTo, i, to);
      insert(this.activeRank, i, rank);
      if (trackOpen) insert(trackOpen, i, this.cursor.from);
      this.minActive = findMinIndex(this.active, this.activeTo);
    }
    next() {
      let from = this.to,
        wasPoint = this.point;
      this.point = null;
      let trackOpen = this.openStart < 0 ? [] : null,
        trackExtra = 0;
      for (;;) {
        let a = this.minActive;
        if (
          a > -1 &&
          (this.activeTo[a] - this.cursor.from || this.active[a].endSide - this.cursor.startSide) <
            0
        ) {
          if (this.activeTo[a] > from) {
            this.to = this.activeTo[a];
            this.endSide = this.active[a].endSide;
            break;
          }
          this.removeActive(a);
          if (trackOpen) remove(trackOpen, a);
        } else if (!this.cursor.value) {
          this.to = this.endSide = 1000000000;
          break;
        } else if (this.cursor.from > from) {
          this.to = this.cursor.from;
          this.endSide = this.cursor.startSide;
          break;
        } else {
          let nextVal = this.cursor.value;
          if (!nextVal.point) {
            this.addActive(trackOpen);
            if (this.cursor.from < from && this.cursor.to > from) trackExtra++;
            this.cursor.next();
          } else if (wasPoint && this.cursor.to == this.to && this.cursor.from < this.cursor.to) {
            this.cursor.next();
          } else {
            this.point = nextVal;
            this.pointFrom = this.cursor.from;
            this.pointRank = this.cursor.rank;
            this.to = this.cursor.to;
            this.endSide = nextVal.endSide;
            if (this.cursor.from < from) trackExtra = 1;
            this.cursor.next();
            this.forward(this.to, this.endSide);
            break;
          }
        }
      }
      if (trackOpen) {
        let openStart = 0;
        while (openStart < trackOpen.length && trackOpen[openStart] < from) openStart++;
        this.openStart = openStart + trackExtra;
      }
    }
    activeForPoint(to) {
      if (!this.active.length) return this.active;
      let active = [];
      for (let i = this.active.length - 1; i >= 0; i--) {
        if (this.activeRank[i] < this.pointRank) break;
        if (
          this.activeTo[i] > to ||
          (this.activeTo[i] == to && this.active[i].endSide >= this.point.endSide)
        )
          active.push(this.active[i]);
      }
      return active.reverse();
    }
    openEnd(to) {
      let open = 0;
      for (let i = this.activeTo.length - 1; i >= 0 && this.activeTo[i] > to; i--) open++;
      return open;
    }
  }
  function compare(a, startA, b, startB, length, comparator) {
    a.goto(startA);
    b.goto(startB);
    let endB = startB + length;
    let pos = startB,
      dPos = startB - startA;
    for (;;) {
      let diff = a.to + dPos - b.to || a.endSide - b.endSide;
      let end = diff < 0 ? a.to + dPos : b.to,
        clipEnd = Math.min(end, endB);
      if (a.point || b.point) {
        if (
          !(
            a.point &&
            b.point &&
            (a.point == b.point || a.point.eq(b.point)) &&
            sameValues(a.activeForPoint(a.to + dPos), b.activeForPoint(b.to))
          )
        )
          comparator.comparePoint(pos, clipEnd, a.point, b.point);
      } else {
        if (clipEnd > pos && !sameValues(a.active, b.active))
          comparator.compareRange(pos, clipEnd, a.active, b.active);
      }
      if (end > endB) break;
      pos = end;
      if (diff <= 0) a.next();
      if (diff >= 0) b.next();
    }
  }
  function sameValues(a, b) {
    if (a.length != b.length) return false;
    for (let i = 0; i < a.length; i++) if (a[i] != b[i] && !a[i].eq(b[i])) return false;
    return true;
  }
  function remove(array, index) {
    for (let i = index, e = array.length - 1; i < e; i++) array[i] = array[i + 1];
    array.pop();
  }
  function insert(array, index, value) {
    for (let i = array.length - 1; i >= index; i--) array[i + 1] = array[i];
    array[index] = value;
  }
  function findMinIndex(value, array) {
    let found = -1,
      foundPos = 1000000000;
    for (let i = 0; i < array.length; i++)
      if ((array[i] - foundPos || value[i].endSide - value[found].endSide) < 0) {
        found = i;
        foundPos = array[i];
      }
    return found;
  }

  function dist_countColumn(string, tabSize, to = string.length) {
    let n = 0;
    for (let i = 0; i < to; ) {
      if (string.charCodeAt(i) == 9) {
        n += tabSize - (n % tabSize);
        i++;
      } else {
        n++;
        i = findClusterBreak(string, i);
      }
    }
    return n;
  }
  function dist_findColumn(string, col, tabSize, strict) {
    for (let i = 0, n = 0; ; ) {
      if (n >= col) return i;
      if (i == string.length) break;
      n += string.charCodeAt(i) == 9 ? tabSize - (n % tabSize) : 1;
      i = findClusterBreak(string, i);
    }
    return strict === true ? -1 : string.length;
  }

  const style_mod_C = '\u037c';
  const COUNT = typeof Symbol == 'undefined' ? '__' + style_mod_C : Symbol.for(style_mod_C);
  const SET =
    typeof Symbol == 'undefined'
      ? '__styleSet' + Math.floor(Math.random() * 1e8)
      : Symbol('styleSet');
  const style_mod_top =
    typeof globalThis != 'undefined' ? globalThis : typeof window != 'undefined' ? window : {};

  class StyleModule {
    constructor(spec, options) {
      this.rules = [];
      let { finish } = options || {};

      function splitSelector(selector) {
        return /^@/.test(selector) ? [selector] : selector.split(/,\s*/);
      }

      function render(selectors, spec, target, isKeyframes) {
        let local = [],
          isAt = /^@(\w+)\b/.exec(selectors[0]),
          keyframes = isAt && isAt[1] == 'keyframes';
        if (isAt && spec == null) return target.push(selectors[0] + ';');
        for (let prop in spec) {
          let value = spec[prop];
          if (/&/.test(prop)) {
            render(
              prop
                .split(/,\s*/)
                .map(part => selectors.map(sel => part.replace(/&/, sel)))
                .reduce((a, b) => a.concat(b)),
              value,
              target,
            );
          } else if (value && typeof value == 'object') {
            if (!isAt)
              throw new RangeError(
                'The value of a property (' + prop + ') should be a primitive value.',
              );
            render(splitSelector(prop), value, local, keyframes);
          } else if (value != null) {
            local.push(
              prop.replace(/_.*/, '').replace(/[A-Z]/g, l => '-' + l.toLowerCase()) +
                ': ' +
                value +
                ';',
            );
          }
        }
        if (local.length || keyframes) {
          target.push(
            (finish && !isAt && !isKeyframes ? selectors.map(finish) : selectors).join(', ') +
              ' {' +
              local.join(' ') +
              '}',
          );
        }
      }

      for (let prop in spec) render(splitSelector(prop), spec[prop], this.rules);
    }

    getRules() {
      return this.rules.join('\n');
    }

    static newName() {
      let id = style_mod_top[COUNT] || 1;
      style_mod_top[COUNT] = id + 1;
      return style_mod_C + id.toString(36);
    }

    static mount(root, modules) {
      (root[SET] || new StyleSet(root)).mount(Array.isArray(modules) ? modules : [modules]);
    }
  }

  let adoptedSet = null;

  class StyleSet {
    constructor(root) {
      if (!root.head && root.adoptedStyleSheets && typeof CSSStyleSheet != 'undefined') {
        if (adoptedSet) {
          root.adoptedStyleSheets = [adoptedSet.sheet].concat(root.adoptedStyleSheets);
          return (root[SET] = adoptedSet);
        }
        this.sheet = new CSSStyleSheet();
        root.adoptedStyleSheets = [this.sheet].concat(root.adoptedStyleSheets);
        adoptedSet = this;
      } else {
        this.styleTag = (root.ownerDocument || root).createElement('style');
        let target = root.head || root;
        target.insertBefore(this.styleTag, target.firstChild);
      }
      this.modules = [];
      root[SET] = this;
    }

    mount(modules) {
      let sheet = this.sheet;
      let pos = 0,
        j = 0;
      for (let i = 0; i < modules.length; i++) {
        let mod = modules[i],
          index = this.modules.indexOf(mod);
        if (index < j && index > -1) {
          this.modules.splice(index, 1);
          j--;
          index = -1;
        }
        if (index == -1) {
          this.modules.splice(j++, 0, mod);
          if (sheet)
            for (let k = 0; k < mod.rules.length; k++) sheet.insertRule(mod.rules[k], pos++);
        } else {
          while (j < index) pos += this.modules[j++].rules.length;
          pos += mod.rules.length;
          j++;
        }
      }

      if (!sheet) {
        let text = '';
        for (let i = 0; i < this.modules.length; i++) text += this.modules[i].getRules() + '\n';
        this.styleTag.textContent = text;
      }
    }
  }

  var base = {
    8: 'Backspace',
    9: 'Tab',
    10: 'Enter',
    12: 'NumLock',
    13: 'Enter',
    16: 'Shift',
    17: 'Control',
    18: 'Alt',
    20: 'CapsLock',
    27: 'Escape',
    32: ' ',
    33: 'PageUp',
    34: 'PageDown',
    35: 'End',
    36: 'Home',
    37: 'ArrowLeft',
    38: 'ArrowUp',
    39: 'ArrowRight',
    40: 'ArrowDown',
    44: 'PrintScreen',
    45: 'Insert',
    46: 'Delete',
    59: ';',
    61: '=',
    91: 'Meta',
    92: 'Meta',
    106: '*',
    107: '+',
    108: ',',
    109: '-',
    110: '.',
    111: '/',
    144: 'NumLock',
    145: 'ScrollLock',
    160: 'Shift',
    161: 'Shift',
    162: 'Control',
    163: 'Control',
    164: 'Alt',
    165: 'Alt',
    173: '-',
    186: ';',
    187: '=',
    188: ',',
    189: '-',
    190: '.',
    191: '/',
    192: '`',
    219: '[',
    220: '\\',
    221: ']',
    222: "'",
    229: 'q',
  };

  var shift = {
    48: ')',
    49: '!',
    50: '@',
    51: '#',
    52: '$',
    53: '%',
    54: '^',
    55: '&',
    56: '*',
    57: '(',
    59: ':',
    61: '+',
    173: '_',
    186: ':',
    187: '+',
    188: '<',
    189: '_',
    190: '>',
    191: '?',
    192: '~',
    219: '{',
    220: '|',
    221: '}',
    222: '"',
    229: 'Q',
  };

  var index_es_chrome =
    typeof navigator != 'undefined' && /Chrome\/(\d+)/.exec(navigator.userAgent);
  var safari = typeof navigator != 'undefined' && /Apple Computer/.test(navigator.vendor);
  var gecko = typeof navigator != 'undefined' && /Gecko\/\d+/.test(navigator.userAgent);
  var mac = typeof navigator != 'undefined' && /Mac/.test(navigator.platform);
  var index_es_ie =
    typeof navigator != 'undefined' &&
    /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
  var brokenModifierNames =
    (index_es_chrome && (mac || +index_es_chrome[1] < 57)) || (gecko && mac);

  for (var index_es_i = 0; index_es_i < 10; index_es_i++)
    base[48 + index_es_i] = base[96 + index_es_i] = String(index_es_i);

  for (var index_es_i = 1; index_es_i <= 24; index_es_i++)
    base[index_es_i + 111] = 'F' + index_es_i;

  for (var index_es_i = 65; index_es_i <= 90; index_es_i++) {
    base[index_es_i] = String.fromCharCode(index_es_i + 32);
    shift[index_es_i] = String.fromCharCode(index_es_i);
  }

  for (var code in base) if (!shift.hasOwnProperty(code)) shift[code] = base[code];

  function keyName(event) {
    var ignoreKey =
      (brokenModifierNames && (event.ctrlKey || event.altKey || event.metaKey)) ||
      ((safari || index_es_ie) && event.shiftKey && event.key && event.key.length == 1);
    var name =
      (!ignoreKey && event.key) ||
      (event.shiftKey ? shift : base)[event.keyCode] ||
      event.key ||
      'Unidentified';
    if (name == 'Esc') name = 'Escape';
    if (name == 'Del') name = 'Delete';
    if (name == 'Left') name = 'ArrowLeft';
    if (name == 'Up') name = 'ArrowUp';
    if (name == 'Right') name = 'ArrowRight';
    if (name == 'Down') name = 'ArrowDown';
    return name;
  }

  function getSelection(root) {
    let target;
    if (root.nodeType == 11) {
      target = root.getSelection ? root : root.ownerDocument;
    } else {
      target = root;
    }
    return target.getSelection();
  }
  function contains(dom, node) {
    return node ? dom == node || dom.contains(node.nodeType != 1 ? node.parentNode : node) : false;
  }
  function deepActiveElement() {
    let elt = document.activeElement;
    while (elt && elt.shadowRoot) elt = elt.shadowRoot.activeElement;
    return elt;
  }
  function hasSelection(dom, selection) {
    if (!selection.anchorNode) return false;
    try {
      return contains(dom, selection.anchorNode);
    } catch (_) {
      return false;
    }
  }
  function clientRectsFor(dom) {
    if (dom.nodeType == 3) return textRange(dom, 0, dom.nodeValue.length).getClientRects();
    else if (dom.nodeType == 1) return dom.getClientRects();
    else return [];
  }
  function isEquivalentPosition(node, off, targetNode, targetOff) {
    return targetNode
      ? scanFor(node, off, targetNode, targetOff, -1) ||
          scanFor(node, off, targetNode, targetOff, 1)
      : false;
  }
  function domIndex(node) {
    for (var index = 0; ; index++) {
      node = node.previousSibling;
      if (!node) return index;
    }
  }
  function scanFor(node, off, targetNode, targetOff, dir) {
    for (;;) {
      if (node == targetNode && off == targetOff) return true;
      if (off == (dir < 0 ? 0 : maxOffset(node))) {
        if (node.nodeName == 'DIV') return false;
        let parent = node.parentNode;
        if (!parent || parent.nodeType != 1) return false;
        off = domIndex(node) + (dir < 0 ? 0 : 1);
        node = parent;
      } else if (node.nodeType == 1) {
        node = node.childNodes[off + (dir < 0 ? -1 : 0)];
        if (node.nodeType == 1 && node.contentEditable == 'false') return false;
        off = dir < 0 ? maxOffset(node) : 0;
      } else {
        return false;
      }
    }
  }
  function maxOffset(node) {
    return node.nodeType == 3 ? node.nodeValue.length : node.childNodes.length;
  }
  const Rect0 = { left: 0, right: 0, top: 0, bottom: 0 };
  function flattenRect(rect, left) {
    let x = left ? rect.left : rect.right;
    return { left: x, right: x, top: rect.top, bottom: rect.bottom };
  }
  function windowRect(win) {
    return { left: 0, right: win.innerWidth, top: 0, bottom: win.innerHeight };
  }
  function scrollRectIntoView(dom, rect, side, x, y, xMargin, yMargin, ltr) {
    let doc = dom.ownerDocument,
      win = doc.defaultView;
    for (let cur = dom; cur; ) {
      if (cur.nodeType == 1) {
        let bounding,
          top = cur == doc.body;
        if (top) {
          bounding = windowRect(win);
        } else {
          if (cur.scrollHeight <= cur.clientHeight && cur.scrollWidth <= cur.clientWidth) {
            cur = cur.parentNode;
            continue;
          }
          let rect = cur.getBoundingClientRect();
          bounding = {
            left: rect.left,
            right: rect.left + cur.clientWidth,
            top: rect.top,
            bottom: rect.top + cur.clientHeight,
          };
        }
        let moveX = 0,
          moveY = 0;
        if (y == 'nearest') {
          if (rect.top < bounding.top) {
            moveY = -(bounding.top - rect.top + yMargin);
            if (side > 0 && rect.bottom > bounding.bottom + moveY)
              moveY = rect.bottom - bounding.bottom + moveY + yMargin;
          } else if (rect.bottom > bounding.bottom) {
            moveY = rect.bottom - bounding.bottom + yMargin;
            if (side < 0 && rect.top - moveY < bounding.top)
              moveY = -(bounding.top + moveY - rect.top + yMargin);
          }
        } else {
          let rectHeight = rect.bottom - rect.top,
            boundingHeight = bounding.bottom - bounding.top;
          let targetTop =
            y == 'center' && rectHeight <= boundingHeight
              ? rect.top + rectHeight / 2 - boundingHeight / 2
              : y == 'start' || (y == 'center' && side < 0)
              ? rect.top - yMargin
              : rect.bottom - boundingHeight + yMargin;
          moveY = targetTop - bounding.top;
        }
        if (x == 'nearest') {
          if (rect.left < bounding.left) {
            moveX = -(bounding.left - rect.left + xMargin);
            if (side > 0 && rect.right > bounding.right + moveX)
              moveX = rect.right - bounding.right + moveX + xMargin;
          } else if (rect.right > bounding.right) {
            moveX = rect.right - bounding.right + xMargin;
            if (side < 0 && rect.left < bounding.left + moveX)
              moveX = -(bounding.left + moveX - rect.left + xMargin);
          }
        } else {
          let targetLeft =
            x == 'center'
              ? rect.left + (rect.right - rect.left) / 2 - (bounding.right - bounding.left) / 2
              : (x == 'start') == ltr
              ? rect.left - xMargin
              : rect.right - (bounding.right - bounding.left) + xMargin;
          moveX = targetLeft - bounding.left;
        }
        if (moveX || moveY) {
          if (top) {
            win.scrollBy(moveX, moveY);
          } else {
            if (moveY) {
              let start = cur.scrollTop;
              cur.scrollTop += moveY;
              moveY = cur.scrollTop - start;
            }
            if (moveX) {
              let start = cur.scrollLeft;
              cur.scrollLeft += moveX;
              moveX = cur.scrollLeft - start;
            }
            rect = {
              left: rect.left - moveX,
              top: rect.top - moveY,
              right: rect.right - moveX,
              bottom: rect.bottom - moveY,
            };
          }
        }
        if (top) break;
        cur = cur.assignedSlot || cur.parentNode;
        x = y = 'nearest';
      } else if (cur.nodeType == 11) {
        cur = cur.host;
      } else {
        break;
      }
    }
  }
  class DOMSelectionState {
    constructor() {
      this.anchorNode = null;
      this.anchorOffset = 0;
      this.focusNode = null;
      this.focusOffset = 0;
    }
    eq(domSel) {
      return (
        this.anchorNode == domSel.anchorNode &&
        this.anchorOffset == domSel.anchorOffset &&
        this.focusNode == domSel.focusNode &&
        this.focusOffset == domSel.focusOffset
      );
    }
    setRange(range) {
      this.set(range.anchorNode, range.anchorOffset, range.focusNode, range.focusOffset);
    }
    set(anchorNode, anchorOffset, focusNode, focusOffset) {
      this.anchorNode = anchorNode;
      this.anchorOffset = anchorOffset;
      this.focusNode = focusNode;
      this.focusOffset = focusOffset;
    }
  }
  let preventScrollSupported = null;
  function focusPreventScroll(dom) {
    if (dom.setActive) return dom.setActive();
    if (preventScrollSupported) return dom.focus(preventScrollSupported);
    let stack = [];
    for (let cur = dom; cur; cur = cur.parentNode) {
      stack.push(cur, cur.scrollTop, cur.scrollLeft);
      if (cur == cur.ownerDocument) break;
    }
    dom.focus(
      preventScrollSupported == null
        ? {
            get preventScroll() {
              preventScrollSupported = { preventScroll: true };
              return true;
            },
          }
        : undefined,
    );
    if (!preventScrollSupported) {
      preventScrollSupported = false;
      for (let i = 0; i < stack.length; ) {
        let elt = stack[i++],
          top = stack[i++],
          left = stack[i++];
        if (elt.scrollTop != top) elt.scrollTop = top;
        if (elt.scrollLeft != left) elt.scrollLeft = left;
      }
    }
  }
  let scratchRange;
  function textRange(node, from, to = from) {
    let range = scratchRange || (scratchRange = document.createRange());
    range.setEnd(node, to);
    range.setStart(node, from);
    return range;
  }
  function dispatchKey(elt, name, code) {
    let options = { key: name, code: name, keyCode: code, which: code, cancelable: true };
    let down = new KeyboardEvent('keydown', options);
    down.synthetic = true;
    elt.dispatchEvent(down);
    let up = new KeyboardEvent('keyup', options);
    up.synthetic = true;
    elt.dispatchEvent(up);
    return down.defaultPrevented || up.defaultPrevented;
  }
  function getRoot(node) {
    while (node) {
      if (node && (node.nodeType == 9 || (node.nodeType == 11 && node.host))) return node;
      node = node.assignedSlot || node.parentNode;
    }
    return null;
  }
  function clearAttributes(node) {
    while (node.attributes.length) node.removeAttributeNode(node.attributes[0]);
  }
  function atElementStart(doc, selection) {
    let node = selection.focusNode,
      offset = selection.focusOffset;
    if (!node || selection.anchorNode != node || selection.anchorOffset != offset) return false;
    for (;;) {
      if (offset) {
        if (node.nodeType != 1) return false;
        let prev = node.childNodes[offset - 1];
        if (prev.contentEditable == 'false') offset--;
        else {
          node = prev;
          offset = maxOffset(node);
        }
      } else if (node == doc) {
        return true;
      } else {
        offset = domIndex(node);
        node = node.parentNode;
      }
    }
  }

  class DOMPos {
    constructor(node, offset, precise = true) {
      this.node = node;
      this.offset = offset;
      this.precise = precise;
    }
    static before(dom, precise) {
      return new DOMPos(dom.parentNode, domIndex(dom), precise);
    }
    static after(dom, precise) {
      return new DOMPos(dom.parentNode, domIndex(dom) + 1, precise);
    }
  }
  const noChildren = [];
  class ContentView {
    constructor() {
      this.parent = null;
      this.dom = null;
      this.dirty = 2;
    }
    get editorView() {
      if (!this.parent) throw new Error('Accessing view in orphan content view');
      return this.parent.editorView;
    }
    get overrideDOMText() {
      return null;
    }
    get posAtStart() {
      return this.parent ? this.parent.posBefore(this) : 0;
    }
    get posAtEnd() {
      return this.posAtStart + this.length;
    }
    posBefore(view) {
      let pos = this.posAtStart;
      for (let child of this.children) {
        if (child == view) return pos;
        pos += child.length + child.breakAfter;
      }
      throw new RangeError('Invalid child in posBefore');
    }
    posAfter(view) {
      return this.posBefore(view) + view.length;
    }
    coordsAt(_pos, _side) {
      return null;
    }
    sync(track) {
      if (this.dirty & 2) {
        let parent = this.dom;
        let prev = null,
          next;
        for (let child of this.children) {
          if (child.dirty) {
            if (!child.dom && (next = prev ? prev.nextSibling : parent.firstChild)) {
              let contentView = ContentView.get(next);
              if (
                !contentView ||
                (!contentView.parent && contentView.constructor == child.constructor)
              )
                child.reuseDOM(next);
            }
            child.sync(track);
            child.dirty = 0;
          }
          next = prev ? prev.nextSibling : parent.firstChild;
          if (track && !track.written && track.node == parent && next != child.dom)
            track.written = true;
          if (child.dom.parentNode == parent) {
            while (next && next != child.dom) next = rm$1(next);
          } else {
            parent.insertBefore(child.dom, next);
          }
          prev = child.dom;
        }
        next = prev ? prev.nextSibling : parent.firstChild;
        if (next && track && track.node == parent) track.written = true;
        while (next) next = rm$1(next);
      } else if (this.dirty & 1) {
        for (let child of this.children)
          if (child.dirty) {
            child.sync(track);
            child.dirty = 0;
          }
      }
    }
    reuseDOM(_dom) {}
    localPosFromDOM(node, offset) {
      let after;
      if (node == this.dom) {
        after = this.dom.childNodes[offset];
      } else {
        let bias = maxOffset(node) == 0 ? 0 : offset == 0 ? -1 : 1;
        for (;;) {
          let parent = node.parentNode;
          if (parent == this.dom) break;
          if (bias == 0 && parent.firstChild != parent.lastChild) {
            if (node == parent.firstChild) bias = -1;
            else bias = 1;
          }
          node = parent;
        }
        if (bias < 0) after = node;
        else after = node.nextSibling;
      }
      if (after == this.dom.firstChild) return 0;
      while (after && !ContentView.get(after)) after = after.nextSibling;
      if (!after) return this.length;
      for (let i = 0, pos = 0; ; i++) {
        let child = this.children[i];
        if (child.dom == after) return pos;
        pos += child.length + child.breakAfter;
      }
    }
    domBoundsAround(from, to, offset = 0) {
      let fromI = -1,
        fromStart = -1,
        toI = -1,
        toEnd = -1;
      for (let i = 0, pos = offset, prevEnd = offset; i < this.children.length; i++) {
        let child = this.children[i],
          end = pos + child.length;
        if (pos < from && end > to) return child.domBoundsAround(from, to, pos);
        if (end >= from && fromI == -1) {
          fromI = i;
          fromStart = pos;
        }
        if (pos > to && child.dom.parentNode == this.dom) {
          toI = i;
          toEnd = prevEnd;
          break;
        }
        prevEnd = end;
        pos = end + child.breakAfter;
      }
      return {
        from: fromStart,
        to: toEnd < 0 ? offset + this.length : toEnd,
        startDOM: (fromI ? this.children[fromI - 1].dom.nextSibling : null) || this.dom.firstChild,
        endDOM: toI < this.children.length && toI >= 0 ? this.children[toI].dom : null,
      };
    }
    markDirty(andParent = false) {
      this.dirty |= 2;
      this.markParentsDirty(andParent);
    }
    markParentsDirty(childList) {
      for (let parent = this.parent; parent; parent = parent.parent) {
        if (childList) parent.dirty |= 2;
        if (parent.dirty & 1) return;
        parent.dirty |= 1;
        childList = false;
      }
    }
    setParent(parent) {
      if (this.parent != parent) {
        this.parent = parent;
        if (this.dirty) this.markParentsDirty(true);
      }
    }
    setDOM(dom) {
      if (this.dom) this.dom.cmView = null;
      this.dom = dom;
      dom.cmView = this;
    }
    get rootView() {
      for (let v = this; ; ) {
        let parent = v.parent;
        if (!parent) return v;
        v = parent;
      }
    }
    replaceChildren(from, to, children = noChildren) {
      this.markDirty();
      for (let i = from; i < to; i++) {
        let child = this.children[i];
        if (child.parent == this) child.destroy();
      }
      this.children.splice(from, to - from, ...children);
      for (let i = 0; i < children.length; i++) children[i].setParent(this);
    }
    ignoreMutation(_rec) {
      return false;
    }
    ignoreEvent(_event) {
      return false;
    }
    childCursor(pos = this.length) {
      return new ChildCursor(this.children, pos, this.children.length);
    }
    childPos(pos, bias = 1) {
      return this.childCursor().findPos(pos, bias);
    }
    toString() {
      let name = this.constructor.name.replace('View', '');
      return (
        name +
        (this.children.length
          ? '(' + this.children.join() + ')'
          : this.length
          ? '[' + (name == 'Text' ? this.text : this.length) + ']'
          : '') +
        (this.breakAfter ? '#' : '')
      );
    }
    static get(node) {
      return node.cmView;
    }
    get isEditable() {
      return true;
    }
    merge(from, to, source, hasStart, openStart, openEnd) {
      return false;
    }
    become(other) {
      return false;
    }
    getSide() {
      return 0;
    }
    destroy() {
      this.parent = null;
    }
  }
  ContentView.prototype.breakAfter = 0;
  function rm$1(dom) {
    let next = dom.nextSibling;
    dom.parentNode.removeChild(dom);
    return next;
  }
  class ChildCursor {
    constructor(children, pos, i) {
      this.children = children;
      this.pos = pos;
      this.i = i;
      this.off = 0;
    }
    findPos(pos, bias = 1) {
      for (;;) {
        if (
          pos > this.pos ||
          (pos == this.pos && (bias > 0 || this.i == 0 || this.children[this.i - 1].breakAfter))
        ) {
          this.off = pos - this.pos;
          return this;
        }
        let next = this.children[--this.i];
        this.pos -= next.length + next.breakAfter;
      }
    }
  }
  function replaceRange(
    parent,
    fromI,
    fromOff,
    toI,
    toOff,
    insert,
    breakAtStart,
    openStart,
    openEnd,
  ) {
    let { children } = parent;
    let before = children.length ? children[fromI] : null;
    let last = insert.length ? insert[insert.length - 1] : null;
    let breakAtEnd = last ? last.breakAfter : breakAtStart;
    if (
      fromI == toI &&
      before &&
      !breakAtStart &&
      !breakAtEnd &&
      insert.length < 2 &&
      before.merge(fromOff, toOff, insert.length ? last : null, fromOff == 0, openStart, openEnd)
    )
      return;
    if (toI < children.length) {
      let after = children[toI];
      if (after && toOff < after.length) {
        if (fromI == toI) {
          after = after.split(toOff);
          toOff = 0;
        }
        if (!breakAtEnd && last && after.merge(0, toOff, last, true, 0, openEnd)) {
          insert[insert.length - 1] = after;
        } else {
          if (toOff) after.merge(0, toOff, null, false, 0, openEnd);
          insert.push(after);
        }
      } else if (after === null || after === void 0 ? void 0 : after.breakAfter) {
        if (last) last.breakAfter = 1;
        else breakAtStart = 1;
      }
      toI++;
    }
    if (before) {
      before.breakAfter = breakAtStart;
      if (fromOff > 0) {
        if (
          !breakAtStart &&
          insert.length &&
          before.merge(fromOff, before.length, insert[0], false, openStart, 0)
        ) {
          before.breakAfter = insert.shift().breakAfter;
        } else if (
          fromOff < before.length ||
          (before.children.length && before.children[before.children.length - 1].length == 0)
        ) {
          before.merge(fromOff, before.length, null, false, openStart, 0);
        }
        fromI++;
      }
    }
    while (fromI < toI && insert.length) {
      if (children[toI - 1].become(insert[insert.length - 1])) {
        toI--;
        insert.pop();
        openEnd = insert.length ? 0 : openStart;
      } else if (children[fromI].become(insert[0])) {
        fromI++;
        insert.shift();
        openStart = insert.length ? 0 : openEnd;
      } else {
        break;
      }
    }
    if (
      !insert.length &&
      fromI &&
      toI < children.length &&
      !children[fromI - 1].breakAfter &&
      children[toI].merge(0, 0, children[fromI - 1], false, openStart, openEnd)
    )
      fromI--;
    if (fromI < toI || insert.length) parent.replaceChildren(fromI, toI, insert);
  }
  function mergeChildrenInto(parent, from, to, insert, openStart, openEnd) {
    let cur = parent.childCursor();
    let { i: toI, off: toOff } = cur.findPos(to, 1);
    let { i: fromI, off: fromOff } = cur.findPos(from, -1);
    let dLen = from - to;
    for (let view of insert) dLen += view.length;
    parent.length += dLen;
    replaceRange(parent, fromI, fromOff, toI, toOff, insert, 0, openStart, openEnd);
  }

  let nav =
    typeof navigator != 'undefined' ? navigator : { userAgent: '', vendor: '', platform: '' };
  let doc = typeof document != 'undefined' ? document : { documentElement: { style: {} } };
  const ie_edge = /Edge\/(\d+)/.exec(nav.userAgent);
  const ie_upto10 = /MSIE \d/.test(nav.userAgent);
  const ie_11up = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(nav.userAgent);
  const dist_ie = !!(ie_upto10 || ie_11up || ie_edge);
  const dist_gecko = !dist_ie && /gecko\/(\d+)/i.test(nav.userAgent);
  const dist_chrome = !dist_ie && /Chrome\/(\d+)/.exec(nav.userAgent);
  const webkit = 'webkitFontSmoothing' in doc.documentElement.style;
  const dist_safari = !dist_ie && /Apple Computer/.test(nav.vendor);
  const ios = dist_safari && (/Mobile\/\w+/.test(nav.userAgent) || nav.maxTouchPoints > 2);
  var dist_browser = {
    mac: ios || /Mac/.test(nav.platform),
    windows: /Win/.test(nav.platform),
    linux: /Linux|X11/.test(nav.platform),
    ie: dist_ie,
    ie_version: ie_upto10
      ? doc.documentMode || 6
      : ie_11up
      ? +ie_11up[1]
      : ie_edge
      ? +ie_edge[1]
      : 0,
    gecko: dist_gecko,
    gecko_version: dist_gecko ? +(/Firefox\/(\d+)/.exec(nav.userAgent) || [0, 0])[1] : 0,
    chrome: !!dist_chrome,
    chrome_version: dist_chrome ? +dist_chrome[1] : 0,
    ios,
    android: /Android\b/.test(nav.userAgent),
    webkit,
    safari: dist_safari,
    webkit_version: webkit ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0,
    tabSize: doc.documentElement.style.tabSize != null ? 'tab-size' : '-moz-tab-size',
  };

  const MaxJoinLen = 256;
  class TextView extends ContentView {
    constructor(text) {
      super();
      this.text = text;
    }
    get length() {
      return this.text.length;
    }
    createDOM(textDOM) {
      this.setDOM(textDOM || document.createTextNode(this.text));
    }
    sync(track) {
      if (!this.dom) this.createDOM();
      if (this.dom.nodeValue != this.text) {
        if (track && track.node == this.dom) track.written = true;
        this.dom.nodeValue = this.text;
      }
    }
    reuseDOM(dom) {
      if (dom.nodeType == 3) this.createDOM(dom);
    }
    merge(from, to, source) {
      if (
        source &&
        (!(source instanceof TextView) || this.length - (to - from) + source.length > MaxJoinLen)
      )
        return false;
      this.text = this.text.slice(0, from) + (source ? source.text : '') + this.text.slice(to);
      this.markDirty();
      return true;
    }
    split(from) {
      let result = new TextView(this.text.slice(from));
      this.text = this.text.slice(0, from);
      this.markDirty();
      return result;
    }
    localPosFromDOM(node, offset) {
      return node == this.dom ? offset : offset ? this.text.length : 0;
    }
    domAtPos(pos) {
      return new DOMPos(this.dom, pos);
    }
    domBoundsAround(_from, _to, offset) {
      return {
        from: offset,
        to: offset + this.length,
        startDOM: this.dom,
        endDOM: this.dom.nextSibling,
      };
    }
    coordsAt(pos, side) {
      return textCoords(this.dom, pos, side);
    }
  }
  class MarkView extends ContentView {
    constructor(mark, children = [], length = 0) {
      super();
      this.mark = mark;
      this.children = children;
      this.length = length;
      for (let ch of children) ch.setParent(this);
    }
    setAttrs(dom) {
      clearAttributes(dom);
      if (this.mark.class) dom.className = this.mark.class;
      if (this.mark.attrs)
        for (let name in this.mark.attrs) dom.setAttribute(name, this.mark.attrs[name]);
      return dom;
    }
    reuseDOM(node) {
      if (node.nodeName == this.mark.tagName.toUpperCase()) {
        this.setDOM(node);
        this.dirty |= 4 | 2;
      }
    }
    sync(track) {
      if (!this.dom) this.setDOM(this.setAttrs(document.createElement(this.mark.tagName)));
      else if (this.dirty & 4) this.setAttrs(this.dom);
      super.sync(track);
    }
    merge(from, to, source, _hasStart, openStart, openEnd) {
      if (
        source &&
        (!(source instanceof MarkView && source.mark.eq(this.mark)) ||
          (from && openStart <= 0) ||
          (to < this.length && openEnd <= 0))
      )
        return false;
      mergeChildrenInto(this, from, to, source ? source.children : [], openStart - 1, openEnd - 1);
      this.markDirty();
      return true;
    }
    split(from) {
      let result = [],
        off = 0,
        detachFrom = -1,
        i = 0;
      for (let elt of this.children) {
        let end = off + elt.length;
        if (end > from) result.push(off < from ? elt.split(from - off) : elt);
        if (detachFrom < 0 && off >= from) detachFrom = i;
        off = end;
        i++;
      }
      let length = this.length - from;
      this.length = from;
      if (detachFrom > -1) {
        this.children.length = detachFrom;
        this.markDirty();
      }
      return new MarkView(this.mark, result, length);
    }
    domAtPos(pos) {
      return inlineDOMAtPos(this.dom, this.children, pos);
    }
    coordsAt(pos, side) {
      return coordsInChildren(this, pos, side);
    }
  }
  function textCoords(text, pos, side) {
    let length = text.nodeValue.length;
    if (pos > length) pos = length;
    let from = pos,
      to = pos,
      flatten = 0;
    if ((pos == 0 && side < 0) || (pos == length && side >= 0)) {
      if (!(dist_browser.chrome || dist_browser.gecko)) {
        if (pos) {
          from--;
          flatten = 1;
        } else if (to < length) {
          to++;
          flatten = -1;
        }
      }
    } else {
      if (side < 0) from--;
      else if (to < length) to++;
    }
    let rects = textRange(text, from, to).getClientRects();
    if (!rects.length) return Rect0;
    let rect = rects[(flatten ? flatten < 0 : side >= 0) ? 0 : rects.length - 1];
    if (dist_browser.safari && !flatten && rect.width == 0)
      rect = Array.prototype.find.call(rects, r => r.width) || rect;
    return flatten ? flattenRect(rect, flatten < 0) : rect || null;
  }
  class WidgetView extends ContentView {
    constructor(widget, length, side) {
      super();
      this.widget = widget;
      this.length = length;
      this.side = side;
      this.prevWidget = null;
    }
    static create(widget, length, side) {
      return new (widget.customView || WidgetView)(widget, length, side);
    }
    split(from) {
      let result = WidgetView.create(this.widget, this.length - from, this.side);
      this.length -= from;
      return result;
    }
    sync() {
      if (!this.dom || !this.widget.updateDOM(this.dom)) {
        if (this.dom && this.prevWidget) this.prevWidget.destroy(this.dom);
        this.prevWidget = null;
        this.setDOM(this.widget.toDOM(this.editorView));
        this.dom.contentEditable = 'false';
      }
    }
    getSide() {
      return this.side;
    }
    merge(from, to, source, hasStart, openStart, openEnd) {
      if (
        source &&
        (!(source instanceof WidgetView) ||
          !this.widget.compare(source.widget) ||
          (from > 0 && openStart <= 0) ||
          (to < this.length && openEnd <= 0))
      )
        return false;
      this.length = from + (source ? source.length : 0) + (this.length - to);
      return true;
    }
    become(other) {
      if (other.length == this.length && other instanceof WidgetView && other.side == this.side) {
        if (this.widget.constructor == other.widget.constructor) {
          if (!this.widget.eq(other.widget)) this.markDirty(true);
          if (this.dom && !this.prevWidget) this.prevWidget = this.widget;
          this.widget = other.widget;
          return true;
        }
      }
      return false;
    }
    ignoreMutation() {
      return true;
    }
    ignoreEvent(event) {
      return this.widget.ignoreEvent(event);
    }
    get overrideDOMText() {
      if (this.length == 0) return dist_Text.empty;
      let top = this;
      while (top.parent) top = top.parent;
      let view = top.editorView,
        text = view && view.state.doc,
        start = this.posAtStart;
      return text ? text.slice(start, start + this.length) : dist_Text.empty;
    }
    domAtPos(pos) {
      return pos == 0 ? DOMPos.before(this.dom) : DOMPos.after(this.dom, pos == this.length);
    }
    domBoundsAround() {
      return null;
    }
    coordsAt(pos, side) {
      let rects = this.dom.getClientRects(),
        rect = null;
      if (!rects.length) return Rect0;
      for (let i = pos > 0 ? rects.length - 1 : 0; ; i += pos > 0 ? -1 : 1) {
        rect = rects[i];
        if (pos > 0 ? i == 0 : i == rects.length - 1 || rect.top < rect.bottom) break;
      }
      return (pos == 0 && side > 0) || (pos == this.length && side <= 0)
        ? rect
        : flattenRect(rect, pos == 0);
    }
    get isEditable() {
      return false;
    }
    destroy() {
      super.destroy();
      if (this.dom) this.widget.destroy(this.dom);
    }
  }
  class CompositionView extends WidgetView {
    domAtPos(pos) {
      let { topView, text } = this.widget;
      if (!topView) return new DOMPos(text, Math.min(pos, text.nodeValue.length));
      return scanCompositionTree(
        pos,
        0,
        topView,
        text,
        (v, p) => v.domAtPos(p),
        p => new DOMPos(text, Math.min(p, text.nodeValue.length)),
      );
    }
    sync() {
      this.setDOM(this.widget.toDOM());
    }
    localPosFromDOM(node, offset) {
      let { topView, text } = this.widget;
      if (!topView) return Math.min(offset, this.length);
      return posFromDOMInCompositionTree(node, offset, topView, text);
    }
    ignoreMutation() {
      return false;
    }
    get overrideDOMText() {
      return null;
    }
    coordsAt(pos, side) {
      let { topView, text } = this.widget;
      if (!topView) return textCoords(text, pos, side);
      return scanCompositionTree(
        pos,
        side,
        topView,
        text,
        (v, pos, side) => v.coordsAt(pos, side),
        (pos, side) => textCoords(text, pos, side),
      );
    }
    destroy() {
      var _a;
      super.destroy();
      (_a = this.widget.topView) === null || _a === void 0 ? void 0 : _a.destroy();
    }
    get isEditable() {
      return true;
    }
  }
  function scanCompositionTree(pos, side, view, text, enterView, fromText) {
    if (view instanceof MarkView) {
      for (let child of view.children) {
        let hasComp = contains(child.dom, text);
        let len = hasComp ? text.nodeValue.length : child.length;
        if (pos < len || (pos == len && child.getSide() <= 0))
          return hasComp
            ? scanCompositionTree(pos, side, child, text, enterView, fromText)
            : enterView(child, pos, side);
        pos -= len;
      }
      return enterView(view, view.length, -1);
    } else if (view.dom == text) {
      return fromText(pos, side);
    } else {
      return enterView(view, pos, side);
    }
  }
  function posFromDOMInCompositionTree(node, offset, view, text) {
    if (view instanceof MarkView) {
      for (let child of view.children) {
        let pos = 0,
          hasComp = contains(child.dom, text);
        if (contains(child.dom, node))
          return (
            pos +
            (hasComp
              ? posFromDOMInCompositionTree(node, offset, child, text)
              : child.localPosFromDOM(node, offset))
          );
        pos += hasComp ? text.nodeValue.length : child.length;
      }
    } else if (view.dom == text) {
      return Math.min(offset, text.nodeValue.length);
    }
    return view.localPosFromDOM(node, offset);
  }
  class WidgetBufferView extends ContentView {
    constructor(side) {
      super();
      this.side = side;
    }
    get length() {
      return 0;
    }
    merge() {
      return false;
    }
    become(other) {
      return other instanceof WidgetBufferView && other.side == this.side;
    }
    split() {
      return new WidgetBufferView(this.side);
    }
    sync() {
      if (!this.dom) {
        let dom = document.createElement('img');
        dom.className = 'cm-widgetBuffer';
        dom.setAttribute('aria-hidden', 'true');
        this.setDOM(dom);
      }
    }
    getSide() {
      return this.side;
    }
    domAtPos(pos) {
      return DOMPos.before(this.dom);
    }
    localPosFromDOM() {
      return 0;
    }
    domBoundsAround() {
      return null;
    }
    coordsAt(pos) {
      let imgRect = this.dom.getBoundingClientRect();
      let siblingRect = inlineSiblingRect(this, this.side > 0 ? -1 : 1);
      return siblingRect && siblingRect.top < imgRect.bottom && siblingRect.bottom > imgRect.top
        ? {
            left: imgRect.left,
            right: imgRect.right,
            top: siblingRect.top,
            bottom: siblingRect.bottom,
          }
        : imgRect;
    }
    get overrideDOMText() {
      return dist_Text.empty;
    }
  }
  TextView.prototype.children =
    WidgetView.prototype.children =
    WidgetBufferView.prototype.children =
      noChildren;
  function inlineSiblingRect(view, side) {
    let parent = view.parent,
      index = parent ? parent.children.indexOf(view) : -1;
    while (parent && index >= 0) {
      if (side < 0 ? index > 0 : index < parent.children.length) {
        let next = parent.children[index + side];
        if (next instanceof TextView) {
          let nextRect = next.coordsAt(side < 0 ? next.length : 0, side);
          if (nextRect) return nextRect;
        }
        index += side;
      } else if (parent instanceof MarkView && parent.parent) {
        index = parent.parent.children.indexOf(parent) + (side < 0 ? 0 : 1);
        parent = parent.parent;
      } else {
        let last = parent.dom.lastChild;
        if (last && last.nodeName == 'BR') return last.getClientRects()[0];
        break;
      }
    }
    return undefined;
  }
  function inlineDOMAtPos(dom, children, pos) {
    let i = 0;
    for (let off = 0; i < children.length; i++) {
      let child = children[i],
        end = off + child.length;
      if (end == off && child.getSide() <= 0) continue;
      if (pos > off && pos < end && child.dom.parentNode == dom) return child.domAtPos(pos - off);
      if (pos <= off) break;
      off = end;
    }
    for (; i > 0; i--) {
      let before = children[i - 1].dom;
      if (before.parentNode == dom) return DOMPos.after(before);
    }
    return new DOMPos(dom, 0);
  }
  function joinInlineInto(parent, view, open) {
    let last,
      { children } = parent;
    if (
      open > 0 &&
      view instanceof MarkView &&
      children.length &&
      (last = children[children.length - 1]) instanceof MarkView &&
      last.mark.eq(view.mark)
    ) {
      joinInlineInto(last, view.children[0], open - 1);
    } else {
      children.push(view);
      view.setParent(parent);
    }
    parent.length += view.length;
  }
  function coordsInChildren(view, pos, side) {
    for (let off = 0, i = 0; i < view.children.length; i++) {
      let child = view.children[i],
        end = off + child.length,
        next;
      if (
        (side <= 0 || end == view.length || child.getSide() > 0 ? end >= pos : end > pos) &&
        (pos < end ||
          i + 1 == view.children.length ||
          (next = view.children[i + 1]).length ||
          next.getSide() > 0)
      ) {
        let flatten = 0;
        if (end == off) {
          if (child.getSide() <= 0) continue;
          flatten = side = -child.getSide();
        }
        let rect = child.coordsAt(Math.max(0, pos - off), side);
        return flatten && rect ? flattenRect(rect, side < 0) : rect;
      }
      off = end;
    }
    let last = view.dom.lastChild;
    if (!last) return view.dom.getBoundingClientRect();
    let rects = clientRectsFor(last);
    return rects[rects.length - 1] || null;
  }

  function combineAttrs(source, target) {
    for (let name in source) {
      if (name == 'class' && target.class) target.class += ' ' + source.class;
      else if (name == 'style' && target.style) target.style += ';' + source.style;
      else target[name] = source[name];
    }
    return target;
  }
  function attrsEq(a, b) {
    if (a == b) return true;
    if (!a || !b) return false;
    let keysA = Object.keys(a),
      keysB = Object.keys(b);
    if (keysA.length != keysB.length) return false;
    for (let key of keysA) {
      if (keysB.indexOf(key) == -1 || a[key] !== b[key]) return false;
    }
    return true;
  }
  function updateAttrs(dom, prev, attrs) {
    let changed = null;
    if (prev)
      for (let name in prev) if (!(attrs && name in attrs)) dom.removeAttribute((changed = name));
    if (attrs)
      for (let name in attrs)
        if (!(prev && prev[name] == attrs[name])) dom.setAttribute((changed = name), attrs[name]);
    return !!changed;
  }

  class WidgetType {
    eq(widget) {
      return false;
    }
    updateDOM(dom) {
      return false;
    }
    compare(other) {
      return this == other || (this.constructor == other.constructor && this.eq(other));
    }
    get estimatedHeight() {
      return -1;
    }
    ignoreEvent(event) {
      return true;
    }
    get customView() {
      return null;
    }
    destroy(dom) {}
  }
  var BlockType = (function (BlockType) {
    BlockType[(BlockType['Text'] = 0)] = 'Text';
    BlockType[(BlockType['WidgetBefore'] = 1)] = 'WidgetBefore';
    BlockType[(BlockType['WidgetAfter'] = 2)] = 'WidgetAfter';
    BlockType[(BlockType['WidgetRange'] = 3)] = 'WidgetRange';
    return BlockType;
  })(BlockType || (BlockType = {}));
  class Decoration extends RangeValue {
    constructor(startSide, endSide, widget, spec) {
      super();
      this.startSide = startSide;
      this.endSide = endSide;
      this.widget = widget;
      this.spec = spec;
    }
    get heightRelevant() {
      return false;
    }
    static mark(spec) {
      return new MarkDecoration(spec);
    }
    static widget(spec) {
      let side = spec.side || 0,
        block = !!spec.block;
      side += block ? (side > 0 ? 300000000 : -400000000) : side > 0 ? 100000000 : -100000000;
      return new PointDecoration(spec, side, side, block, spec.widget || null, false);
    }
    static replace(spec) {
      let block = !!spec.block,
        startSide,
        endSide;
      if (spec.isBlockGap) {
        startSide = -500000000;
        endSide = 400000000;
      } else {
        let { start, end } = getInclusive(spec, block);
        startSide = (start ? (block ? -300000000 : -1) : 500000000) - 1;
        endSide = (end ? (block ? 200000000 : 1) : -600000000) + 1;
      }
      return new PointDecoration(spec, startSide, endSide, block, spec.widget || null, true);
    }
    static line(spec) {
      return new LineDecoration(spec);
    }
    static set(of, sort = false) {
      return dist_RangeSet.of(of, sort);
    }
    hasHeight() {
      return this.widget ? this.widget.estimatedHeight > -1 : false;
    }
  }
  Decoration.none = dist_RangeSet.empty;
  class MarkDecoration extends Decoration {
    constructor(spec) {
      let { start, end } = getInclusive(spec);
      super(start ? -1 : 500000000, end ? 1 : -600000000, null, spec);
      this.tagName = spec.tagName || 'span';
      this.class = spec.class || '';
      this.attrs = spec.attributes || null;
    }
    eq(other) {
      return (
        this == other ||
        (other instanceof MarkDecoration &&
          this.tagName == other.tagName &&
          this.class == other.class &&
          attrsEq(this.attrs, other.attrs))
      );
    }
    range(from, to = from) {
      if (from >= to) throw new RangeError('Mark decorations may not be empty');
      return super.range(from, to);
    }
  }
  MarkDecoration.prototype.point = false;
  class LineDecoration extends Decoration {
    constructor(spec) {
      super(-200000000, -200000000, null, spec);
    }
    eq(other) {
      return (
        other instanceof LineDecoration && attrsEq(this.spec.attributes, other.spec.attributes)
      );
    }
    range(from, to = from) {
      if (to != from) throw new RangeError('Line decoration ranges must be zero-length');
      return super.range(from, to);
    }
  }
  LineDecoration.prototype.mapMode = dist_MapMode.TrackBefore;
  LineDecoration.prototype.point = true;
  class PointDecoration extends Decoration {
    constructor(spec, startSide, endSide, block, widget, isReplace) {
      super(startSide, endSide, widget, spec);
      this.block = block;
      this.isReplace = isReplace;
      this.mapMode = !block
        ? dist_MapMode.TrackDel
        : startSide <= 0
        ? dist_MapMode.TrackBefore
        : dist_MapMode.TrackAfter;
    }
    get type() {
      return this.startSide < this.endSide
        ? BlockType.WidgetRange
        : this.startSide <= 0
        ? BlockType.WidgetBefore
        : BlockType.WidgetAfter;
    }
    get heightRelevant() {
      return this.block || (!!this.widget && this.widget.estimatedHeight >= 5);
    }
    eq(other) {
      return (
        other instanceof PointDecoration &&
        widgetsEq(this.widget, other.widget) &&
        this.block == other.block &&
        this.startSide == other.startSide &&
        this.endSide == other.endSide
      );
    }
    range(from, to = from) {
      if (this.isReplace && (from > to || (from == to && this.startSide > 0 && this.endSide <= 0)))
        throw new RangeError('Invalid range for replacement decoration');
      if (!this.isReplace && to != from)
        throw new RangeError('Widget decorations can only have zero-length ranges');
      return super.range(from, to);
    }
  }
  PointDecoration.prototype.point = true;
  function getInclusive(spec, block = false) {
    let { inclusiveStart: start, inclusiveEnd: end } = spec;
    if (start == null) start = spec.inclusive;
    if (end == null) end = spec.inclusive;
    return {
      start: start !== null && start !== void 0 ? start : block,
      end: end !== null && end !== void 0 ? end : block,
    };
  }
  function widgetsEq(a, b) {
    return a == b || !!(a && b && a.compare(b));
  }
  function addRange(from, to, ranges, margin = 0) {
    let last = ranges.length - 1;
    if (last >= 0 && ranges[last] + margin >= from) ranges[last] = Math.max(ranges[last], to);
    else ranges.push(from, to);
  }

  class LineView extends ContentView {
    constructor() {
      super(...arguments);
      this.children = [];
      this.length = 0;
      this.prevAttrs = undefined;
      this.attrs = null;
      this.breakAfter = 0;
    }
    merge(from, to, source, hasStart, openStart, openEnd) {
      if (source) {
        if (!(source instanceof LineView)) return false;
        if (!this.dom) source.transferDOM(this);
      }
      if (hasStart) this.setDeco(source ? source.attrs : null);
      mergeChildrenInto(this, from, to, source ? source.children : [], openStart, openEnd);
      return true;
    }
    split(at) {
      let end = new LineView();
      end.breakAfter = this.breakAfter;
      if (this.length == 0) return end;
      let { i, off } = this.childPos(at);
      if (off) {
        end.append(this.children[i].split(off), 0);
        this.children[i].merge(off, this.children[i].length, null, false, 0, 0);
        i++;
      }
      for (let j = i; j < this.children.length; j++) end.append(this.children[j], 0);
      while (i > 0 && this.children[i - 1].length == 0) this.children[--i].destroy();
      this.children.length = i;
      this.markDirty();
      this.length = at;
      return end;
    }
    transferDOM(other) {
      if (!this.dom) return;
      this.markDirty();
      other.setDOM(this.dom);
      other.prevAttrs = this.prevAttrs === undefined ? this.attrs : this.prevAttrs;
      this.prevAttrs = undefined;
      this.dom = null;
    }
    setDeco(attrs) {
      if (!attrsEq(this.attrs, attrs)) {
        if (this.dom) {
          this.prevAttrs = this.attrs;
          this.markDirty();
        }
        this.attrs = attrs;
      }
    }
    append(child, openStart) {
      joinInlineInto(this, child, openStart);
    }
    addLineDeco(deco) {
      let attrs = deco.spec.attributes,
        cls = deco.spec.class;
      if (attrs) this.attrs = combineAttrs(attrs, this.attrs || {});
      if (cls) this.attrs = combineAttrs({ class: cls }, this.attrs || {});
    }
    domAtPos(pos) {
      return inlineDOMAtPos(this.dom, this.children, pos);
    }
    reuseDOM(node) {
      if (node.nodeName == 'DIV') {
        this.setDOM(node);
        this.dirty |= 4 | 2;
      }
    }
    sync(track) {
      var _a;
      if (!this.dom) {
        this.setDOM(document.createElement('div'));
        this.dom.className = 'cm-line';
        this.prevAttrs = this.attrs ? null : undefined;
      } else if (this.dirty & 4) {
        clearAttributes(this.dom);
        this.dom.className = 'cm-line';
        this.prevAttrs = this.attrs ? null : undefined;
      }
      if (this.prevAttrs !== undefined) {
        updateAttrs(this.dom, this.prevAttrs, this.attrs);
        this.dom.classList.add('cm-line');
        this.prevAttrs = undefined;
      }
      super.sync(track);
      let last = this.dom.lastChild;
      while (last && ContentView.get(last) instanceof MarkView) last = last.lastChild;
      if (
        !last ||
        !this.length ||
        (last.nodeName != 'BR' &&
          ((_a = ContentView.get(last)) === null || _a === void 0 ? void 0 : _a.isEditable) ==
            false &&
          (!dist_browser.ios || !this.children.some(ch => ch instanceof TextView)))
      ) {
        let hack = document.createElement('BR');
        hack.cmIgnore = true;
        this.dom.appendChild(hack);
      }
    }
    measureTextSize() {
      if (this.children.length == 0 || this.length > 20) return null;
      let totalWidth = 0;
      for (let child of this.children) {
        if (!(child instanceof TextView) || /[^ -~]/.test(child.text)) return null;
        let rects = clientRectsFor(child.dom);
        if (rects.length != 1) return null;
        totalWidth += rects[0].width;
      }
      return !totalWidth
        ? null
        : {
            lineHeight: this.dom.getBoundingClientRect().height,
            charWidth: totalWidth / this.length,
          };
    }
    coordsAt(pos, side) {
      return coordsInChildren(this, pos, side);
    }
    become(_other) {
      return false;
    }
    get type() {
      return BlockType.Text;
    }
    static find(docView, pos) {
      for (let i = 0, off = 0; i < docView.children.length; i++) {
        let block = docView.children[i],
          end = off + block.length;
        if (end >= pos) {
          if (block instanceof LineView) return block;
          if (end > pos) break;
        }
        off = end + block.breakAfter;
      }
      return null;
    }
  }
  class BlockWidgetView extends ContentView {
    constructor(widget, length, type) {
      super();
      this.widget = widget;
      this.length = length;
      this.type = type;
      this.breakAfter = 0;
      this.prevWidget = null;
    }
    merge(from, to, source, _takeDeco, openStart, openEnd) {
      if (
        source &&
        (!(source instanceof BlockWidgetView) ||
          !this.widget.compare(source.widget) ||
          (from > 0 && openStart <= 0) ||
          (to < this.length && openEnd <= 0))
      )
        return false;
      this.length = from + (source ? source.length : 0) + (this.length - to);
      return true;
    }
    domAtPos(pos) {
      return pos == 0 ? DOMPos.before(this.dom) : DOMPos.after(this.dom, pos == this.length);
    }
    split(at) {
      let len = this.length - at;
      this.length = at;
      let end = new BlockWidgetView(this.widget, len, this.type);
      end.breakAfter = this.breakAfter;
      return end;
    }
    get children() {
      return noChildren;
    }
    sync() {
      if (!this.dom || !this.widget.updateDOM(this.dom)) {
        if (this.dom && this.prevWidget) this.prevWidget.destroy(this.dom);
        this.prevWidget = null;
        this.setDOM(this.widget.toDOM(this.editorView));
        this.dom.contentEditable = 'false';
      }
    }
    get overrideDOMText() {
      return this.parent
        ? this.parent.view.state.doc.slice(this.posAtStart, this.posAtEnd)
        : dist_Text.empty;
    }
    domBoundsAround() {
      return null;
    }
    become(other) {
      if (
        other instanceof BlockWidgetView &&
        other.type == this.type &&
        other.widget.constructor == this.widget.constructor
      ) {
        if (!other.widget.eq(this.widget)) this.markDirty(true);
        if (this.dom && !this.prevWidget) this.prevWidget = this.widget;
        this.widget = other.widget;
        this.length = other.length;
        this.breakAfter = other.breakAfter;
        return true;
      }
      return false;
    }
    ignoreMutation() {
      return true;
    }
    ignoreEvent(event) {
      return this.widget.ignoreEvent(event);
    }
    destroy() {
      super.destroy();
      if (this.dom) this.widget.destroy(this.dom);
    }
  }

  class ContentBuilder {
    constructor(doc, pos, end, disallowBlockEffectsFor) {
      this.doc = doc;
      this.pos = pos;
      this.end = end;
      this.disallowBlockEffectsFor = disallowBlockEffectsFor;
      this.content = [];
      this.curLine = null;
      this.breakAtStart = 0;
      this.pendingBuffer = 0;
      this.atCursorPos = true;
      this.openStart = -1;
      this.openEnd = -1;
      this.text = '';
      this.textOff = 0;
      this.cursor = doc.iter();
      this.skip = pos;
    }
    posCovered() {
      if (this.content.length == 0)
        return !this.breakAtStart && this.doc.lineAt(this.pos).from != this.pos;
      let last = this.content[this.content.length - 1];
      return (
        !last.breakAfter &&
        !(last instanceof BlockWidgetView && last.type == BlockType.WidgetBefore)
      );
    }
    getLine() {
      if (!this.curLine) {
        this.content.push((this.curLine = new LineView()));
        this.atCursorPos = true;
      }
      return this.curLine;
    }
    flushBuffer(active) {
      if (this.pendingBuffer) {
        this.curLine.append(wrapMarks(new WidgetBufferView(-1), active), active.length);
        this.pendingBuffer = 0;
      }
    }
    addBlockWidget(view) {
      this.flushBuffer([]);
      this.curLine = null;
      this.content.push(view);
    }
    finish(openEnd) {
      if (!openEnd) this.flushBuffer([]);
      else this.pendingBuffer = 0;
      if (!this.posCovered()) this.getLine();
    }
    buildText(length, active, openStart) {
      while (length > 0) {
        if (this.textOff == this.text.length) {
          let { value, lineBreak, done } = this.cursor.next(this.skip);
          this.skip = 0;
          if (done) throw new Error('Ran out of text content when drawing inline views');
          if (lineBreak) {
            if (!this.posCovered()) this.getLine();
            if (this.content.length) this.content[this.content.length - 1].breakAfter = 1;
            else this.breakAtStart = 1;
            this.flushBuffer([]);
            this.curLine = null;
            length--;
            continue;
          } else {
            this.text = value;
            this.textOff = 0;
          }
        }
        let take = Math.min(this.text.length - this.textOff, length, 512);
        this.flushBuffer(active.slice(0, openStart));
        this.getLine().append(
          wrapMarks(new TextView(this.text.slice(this.textOff, this.textOff + take)), active),
          openStart,
        );
        this.atCursorPos = true;
        this.textOff += take;
        length -= take;
        openStart = 0;
      }
    }
    span(from, to, active, openStart) {
      this.buildText(to - from, active, openStart);
      this.pos = to;
      if (this.openStart < 0) this.openStart = openStart;
    }
    point(from, to, deco, active, openStart, index) {
      if (this.disallowBlockEffectsFor[index] && deco instanceof PointDecoration) {
        if (deco.block) throw new RangeError('Block decorations may not be specified via plugins');
        if (to > this.doc.lineAt(this.pos).to)
          throw new RangeError(
            'Decorations that replace line breaks may not be specified via plugins',
          );
      }
      let len = to - from;
      if (deco instanceof PointDecoration) {
        if (deco.block) {
          let { type } = deco;
          if (type == BlockType.WidgetAfter && !this.posCovered()) this.getLine();
          this.addBlockWidget(new BlockWidgetView(deco.widget || new NullWidget('div'), len, type));
        } else {
          let view = WidgetView.create(deco.widget || new NullWidget('span'), len, deco.startSide);
          let cursorBefore =
            this.atCursorPos &&
            !view.isEditable &&
            openStart <= active.length &&
            (from < to || deco.startSide > 0);
          let cursorAfter = !view.isEditable && (from < to || deco.startSide <= 0);
          let line = this.getLine();
          if (this.pendingBuffer == 2 && !cursorBefore) this.pendingBuffer = 0;
          this.flushBuffer(active);
          if (cursorBefore) {
            line.append(wrapMarks(new WidgetBufferView(1), active), openStart);
            openStart = active.length + Math.max(0, openStart - active.length);
          }
          line.append(wrapMarks(view, active), openStart);
          this.atCursorPos = cursorAfter;
          this.pendingBuffer = !cursorAfter ? 0 : from < to ? 1 : 2;
        }
      } else if (this.doc.lineAt(this.pos).from == this.pos) {
        this.getLine().addLineDeco(deco);
      }
      if (len) {
        if (this.textOff + len <= this.text.length) {
          this.textOff += len;
        } else {
          this.skip += len - (this.text.length - this.textOff);
          this.text = '';
          this.textOff = 0;
        }
        this.pos = to;
      }
      if (this.openStart < 0) this.openStart = openStart;
    }
    static build(text, from, to, decorations, dynamicDecorationMap) {
      let builder = new ContentBuilder(text, from, to, dynamicDecorationMap);
      builder.openEnd = dist_RangeSet.spans(decorations, from, to, builder);
      if (builder.openStart < 0) builder.openStart = builder.openEnd;
      builder.finish(builder.openEnd);
      return builder;
    }
  }
  function wrapMarks(view, active) {
    for (let mark of active) view = new MarkView(mark, [view], view.length);
    return view;
  }
  class NullWidget extends WidgetType {
    constructor(tag) {
      super();
      this.tag = tag;
    }
    eq(other) {
      return other.tag == this.tag;
    }
    toDOM() {
      return document.createElement(this.tag);
    }
    updateDOM(elt) {
      return elt.nodeName.toLowerCase() == this.tag;
    }
  }

  const clickAddsSelectionRange = Facet.define();
  const dragMovesSelection$1 = Facet.define();
  const mouseSelectionStyle = Facet.define();
  const exceptionSink = Facet.define();
  const updateListener = Facet.define();
  const inputHandler = Facet.define();
  const perLineTextDirection = Facet.define({
    combine: values => values.some(x => x),
  });
  class ScrollTarget {
    constructor(range, y = 'nearest', x = 'nearest', yMargin = 5, xMargin = 5) {
      this.range = range;
      this.y = y;
      this.x = x;
      this.yMargin = yMargin;
      this.xMargin = xMargin;
    }
    map(changes) {
      return changes.empty
        ? this
        : new ScrollTarget(this.range.map(changes), this.y, this.x, this.yMargin, this.xMargin);
    }
  }
  const scrollIntoView = dist_StateEffect.define({ map: (t, ch) => t.map(ch) });
  function logException(state, exception, context) {
    let handler = state.facet(exceptionSink);
    if (handler.length) handler[0](exception);
    else if (window.onerror)
      window.onerror(String(exception), context, undefined, undefined, exception);
    else if (context) console.error(context + ':', exception);
    else console.error(exception);
  }
  const editable = Facet.define({ combine: values => (values.length ? values[0] : true) });
  let nextPluginID = 0;
  const viewPlugin = Facet.define();
  class dist_ViewPlugin {
    constructor(id, create, domEventHandlers, buildExtensions) {
      this.id = id;
      this.create = create;
      this.domEventHandlers = domEventHandlers;
      this.extension = buildExtensions(this);
    }
    static define(create, spec) {
      const { eventHandlers, provide, decorations: deco } = spec || {};
      return new dist_ViewPlugin(nextPluginID++, create, eventHandlers, plugin => {
        let ext = [viewPlugin.of(plugin)];
        if (deco)
          ext.push(
            decorations.of(view => {
              let pluginInst = view.plugin(plugin);
              return pluginInst ? deco(pluginInst) : Decoration.none;
            }),
          );
        if (provide) ext.push(provide(plugin));
        return ext;
      });
    }
    static fromClass(cls, spec) {
      return dist_ViewPlugin.define(view => new cls(view), spec);
    }
  }
  class PluginInstance {
    constructor(spec) {
      this.spec = spec;
      this.mustUpdate = null;
      this.value = null;
    }
    update(view) {
      if (!this.value) {
        if (this.spec) {
          try {
            this.value = this.spec.create(view);
          } catch (e) {
            logException(view.state, e, 'CodeMirror plugin crashed');
            this.deactivate();
          }
        }
      } else if (this.mustUpdate) {
        let update = this.mustUpdate;
        this.mustUpdate = null;
        if (this.value.update) {
          try {
            this.value.update(update);
          } catch (e) {
            logException(update.state, e, 'CodeMirror plugin crashed');
            if (this.value.destroy)
              try {
                this.value.destroy();
              } catch (_) {}
            this.deactivate();
          }
        }
      }
      return this;
    }
    destroy(view) {
      var _a;
      if ((_a = this.value) === null || _a === void 0 ? void 0 : _a.destroy) {
        try {
          this.value.destroy();
        } catch (e) {
          logException(view.state, e, 'CodeMirror plugin crashed');
        }
      }
    }
    deactivate() {
      this.spec = this.value = null;
    }
  }
  const editorAttributes = Facet.define();
  const contentAttributes = Facet.define();
  const decorations = Facet.define();
  const atomicRanges = Facet.define();
  const scrollMargins = Facet.define();
  const styleModule = Facet.define();
  class ChangedRange {
    constructor(fromA, toA, fromB, toB) {
      this.fromA = fromA;
      this.toA = toA;
      this.fromB = fromB;
      this.toB = toB;
    }
    join(other) {
      return new ChangedRange(
        Math.min(this.fromA, other.fromA),
        Math.max(this.toA, other.toA),
        Math.min(this.fromB, other.fromB),
        Math.max(this.toB, other.toB),
      );
    }
    addToSet(set) {
      let i = set.length,
        me = this;
      for (; i > 0; i--) {
        let range = set[i - 1];
        if (range.fromA > me.toA) continue;
        if (range.toA < me.fromA) break;
        me = me.join(range);
        set.splice(i - 1, 1);
      }
      set.splice(i, 0, me);
      return set;
    }
    static extendWithRanges(diff, ranges) {
      if (ranges.length == 0) return diff;
      let result = [];
      for (let dI = 0, rI = 0, posA = 0, posB = 0; ; dI++) {
        let next = dI == diff.length ? null : diff[dI],
          off = posA - posB;
        let end = next ? next.fromB : 1e9;
        while (rI < ranges.length && ranges[rI] < end) {
          let from = ranges[rI],
            to = ranges[rI + 1];
          let fromB = Math.max(posB, from),
            toB = Math.min(end, to);
          if (fromB <= toB) new ChangedRange(fromB + off, toB + off, fromB, toB).addToSet(result);
          if (to > end) break;
          else rI += 2;
        }
        if (!next) return result;
        new ChangedRange(next.fromA, next.toA, next.fromB, next.toB).addToSet(result);
        posA = next.toA;
        posB = next.toB;
      }
    }
  }
  class ViewUpdate {
    constructor(view, state, transactions) {
      this.view = view;
      this.state = state;
      this.transactions = transactions;
      this.flags = 0;
      this.startState = view.state;
      this.changes = ChangeSet.empty(this.startState.doc.length);
      for (let tr of transactions) this.changes = this.changes.compose(tr.changes);
      let changedRanges = [];
      this.changes.iterChangedRanges((fromA, toA, fromB, toB) =>
        changedRanges.push(new ChangedRange(fromA, toA, fromB, toB)),
      );
      this.changedRanges = changedRanges;
      let focus = view.hasFocus;
      if (focus != view.inputState.notifiedFocused) {
        view.inputState.notifiedFocused = focus;
        this.flags |= 1;
      }
    }
    static create(view, state, transactions) {
      return new ViewUpdate(view, state, transactions);
    }
    get viewportChanged() {
      return (this.flags & 4) > 0;
    }
    get heightChanged() {
      return (this.flags & 2) > 0;
    }
    get geometryChanged() {
      return this.docChanged || (this.flags & (8 | 2)) > 0;
    }
    get focusChanged() {
      return (this.flags & 1) > 0;
    }
    get docChanged() {
      return !this.changes.empty;
    }
    get selectionSet() {
      return this.transactions.some(tr => tr.selection);
    }
    get empty() {
      return this.flags == 0 && this.transactions.length == 0;
    }
  }

  var Direction = (function (Direction) {
    Direction[(Direction['LTR'] = 0)] = 'LTR';
    Direction[(Direction['RTL'] = 1)] = 'RTL';
    return Direction;
  })(Direction || (Direction = {}));
  const LTR = Direction.LTR,
    RTL = Direction.RTL;
  function dec(str) {
    let result = [];
    for (let i = 0; i < str.length; i++) result.push(1 << +str[i]);
    return result;
  }
  const LowTypes = dec(
    '88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008',
  );
  const ArabicTypes = dec(
    '4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333',
  );
  const Brackets = Object.create(null),
    BracketStack = [];
  for (let p of ['()', '[]', '{}']) {
    let l = p.charCodeAt(0),
      r = p.charCodeAt(1);
    Brackets[l] = r;
    Brackets[r] = -l;
  }
  function charType(ch) {
    return ch <= 0xf7
      ? LowTypes[ch]
      : 0x590 <= ch && ch <= 0x5f4
      ? 2
      : 0x600 <= ch && ch <= 0x6f9
      ? ArabicTypes[ch - 0x600]
      : 0x6ee <= ch && ch <= 0x8ac
      ? 4
      : 0x2000 <= ch && ch <= 0x200b
      ? 256
      : ch == 0x200c
      ? 256
      : 1;
  }
  const BidiRE = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
  class BidiSpan {
    constructor(from, to, level) {
      this.from = from;
      this.to = to;
      this.level = level;
    }
    get dir() {
      return this.level % 2 ? RTL : LTR;
    }
    side(end, dir) {
      return (this.dir == dir) == end ? this.to : this.from;
    }
    static find(order, index, level, assoc) {
      let maybe = -1;
      for (let i = 0; i < order.length; i++) {
        let span = order[i];
        if (span.from <= index && span.to >= index) {
          if (span.level == level) return i;
          if (
            maybe < 0 ||
            (assoc != 0
              ? assoc < 0
                ? span.from < index
                : span.to > index
              : order[maybe].level > span.level)
          )
            maybe = i;
        }
      }
      if (maybe < 0) throw new RangeError('Index out of range');
      return maybe;
    }
  }
  const types = [];
  function computeOrder(line, direction) {
    let len = line.length,
      outerType = direction == LTR ? 1 : 2,
      oppositeType = direction == LTR ? 2 : 1;
    if (!line || (outerType == 1 && !BidiRE.test(line))) return trivialOrder(len);
    for (let i = 0, prev = outerType, prevStrong = outerType; i < len; i++) {
      let type = charType(line.charCodeAt(i));
      if (type == 512) type = prev;
      else if (type == 8 && prevStrong == 4) type = 16;
      types[i] = type == 4 ? 2 : type;
      if (type & 7) prevStrong = type;
      prev = type;
    }
    for (let i = 0, prev = outerType, prevStrong = outerType; i < len; i++) {
      let type = types[i];
      if (type == 128) {
        if (i < len - 1 && prev == types[i + 1] && prev & 24) type = types[i] = prev;
        else types[i] = 256;
      } else if (type == 64) {
        let end = i + 1;
        while (end < len && types[end] == 64) end++;
        let replace =
          (i && prev == 8) || (end < len && types[end] == 8) ? (prevStrong == 1 ? 1 : 8) : 256;
        for (let j = i; j < end; j++) types[j] = replace;
        i = end - 1;
      } else if (type == 8 && prevStrong == 1) {
        types[i] = 1;
      }
      prev = type;
      if (type & 7) prevStrong = type;
    }
    for (let i = 0, sI = 0, context = 0, ch, br, type; i < len; i++) {
      if ((br = Brackets[(ch = line.charCodeAt(i))])) {
        if (br < 0) {
          for (let sJ = sI - 3; sJ >= 0; sJ -= 3) {
            if (BracketStack[sJ + 1] == -br) {
              let flags = BracketStack[sJ + 2];
              let type =
                flags & 2 ? outerType : !(flags & 4) ? 0 : flags & 1 ? oppositeType : outerType;
              if (type) types[i] = types[BracketStack[sJ]] = type;
              sI = sJ;
              break;
            }
          }
        } else if (BracketStack.length == 189) {
          break;
        } else {
          BracketStack[sI++] = i;
          BracketStack[sI++] = ch;
          BracketStack[sI++] = context;
        }
      } else if ((type = types[i]) == 2 || type == 1) {
        let embed = type == outerType;
        context = embed ? 0 : 1;
        for (let sJ = sI - 3; sJ >= 0; sJ -= 3) {
          let cur = BracketStack[sJ + 2];
          if (cur & 2) break;
          if (embed) {
            BracketStack[sJ + 2] |= 2;
          } else {
            if (cur & 4) break;
            BracketStack[sJ + 2] |= 4;
          }
        }
      }
    }
    for (let i = 0; i < len; i++) {
      if (types[i] == 256) {
        let end = i + 1;
        while (end < len && types[end] == 256) end++;
        let beforeL = (i ? types[i - 1] : outerType) == 1;
        let afterL = (end < len ? types[end] : outerType) == 1;
        let replace = beforeL == afterL ? (beforeL ? 1 : 2) : outerType;
        for (let j = i; j < end; j++) types[j] = replace;
        i = end - 1;
      }
    }
    let order = [];
    if (outerType == 1) {
      for (let i = 0; i < len; ) {
        let start = i,
          rtl = types[i++] != 1;
        while (i < len && rtl == (types[i] != 1)) i++;
        if (rtl) {
          for (let j = i; j > start; ) {
            let end = j,
              l = types[--j] != 2;
            while (j > start && l == (types[j - 1] != 2)) j--;
            order.push(new BidiSpan(j, end, l ? 2 : 1));
          }
        } else {
          order.push(new BidiSpan(start, i, 0));
        }
      }
    } else {
      for (let i = 0; i < len; ) {
        let start = i,
          rtl = types[i++] == 2;
        while (i < len && rtl == (types[i] == 2)) i++;
        order.push(new BidiSpan(start, i, rtl ? 1 : 2));
      }
    }
    return order;
  }
  function trivialOrder(length) {
    return [new BidiSpan(0, length, 0)];
  }
  let movedOver = '';
  function moveVisually(line, order, dir, start, forward) {
    var _a;
    let startIndex = start.head - line.from,
      spanI = -1;
    if (startIndex == 0) {
      if (!forward || !line.length) return null;
      if (order[0].level != dir) {
        startIndex = order[0].side(false, dir);
        spanI = 0;
      }
    } else if (startIndex == line.length) {
      if (forward) return null;
      let last = order[order.length - 1];
      if (last.level != dir) {
        startIndex = last.side(true, dir);
        spanI = order.length - 1;
      }
    }
    if (spanI < 0)
      spanI = BidiSpan.find(
        order,
        startIndex,
        (_a = start.bidiLevel) !== null && _a !== void 0 ? _a : -1,
        start.assoc,
      );
    let span = order[spanI];
    if (startIndex == span.side(forward, dir)) {
      span = order[(spanI += forward ? 1 : -1)];
      startIndex = span.side(!forward, dir);
    }
    let indexForward = forward == (span.dir == dir);
    let nextIndex = findClusterBreak(line.text, startIndex, indexForward);
    movedOver = line.text.slice(Math.min(startIndex, nextIndex), Math.max(startIndex, nextIndex));
    if (nextIndex != span.side(forward, dir))
      return dist_EditorSelection.cursor(nextIndex + line.from, indexForward ? -1 : 1, span.level);
    let nextSpan =
      spanI == (forward ? order.length - 1 : 0) ? null : order[spanI + (forward ? 1 : -1)];
    if (!nextSpan && span.level != dir)
      return dist_EditorSelection.cursor(forward ? line.to : line.from, forward ? -1 : 1, dir);
    if (nextSpan && nextSpan.level < span.level)
      return dist_EditorSelection.cursor(
        nextSpan.side(!forward, dir) + line.from,
        forward ? 1 : -1,
        nextSpan.level,
      );
    return dist_EditorSelection.cursor(nextIndex + line.from, forward ? -1 : 1, span.level);
  }

  const LineBreakPlaceholder = '\uffff';
  class DOMReader {
    constructor(points, state) {
      this.points = points;
      this.text = '';
      this.lineSeparator = state.facet(dist_EditorState.lineSeparator);
    }
    append(text) {
      this.text += text;
    }
    lineBreak() {
      this.text += LineBreakPlaceholder;
    }
    readRange(start, end) {
      if (!start) return this;
      let parent = start.parentNode;
      for (let cur = start; ; ) {
        this.findPointBefore(parent, cur);
        this.readNode(cur);
        let next = cur.nextSibling;
        if (next == end) break;
        let view = ContentView.get(cur),
          nextView = ContentView.get(next);
        if (
          view && nextView
            ? view.breakAfter
            : (view ? view.breakAfter : isBlockElement(cur)) ||
              (isBlockElement(next) && (cur.nodeName != 'BR' || cur.cmIgnore))
        )
          this.lineBreak();
        cur = next;
      }
      this.findPointBefore(parent, end);
      return this;
    }
    readTextNode(node) {
      let text = node.nodeValue;
      for (let point of this.points)
        if (point.node == node) point.pos = this.text.length + Math.min(point.offset, text.length);
      for (let off = 0, re = this.lineSeparator ? null : /\r\n?|\n/g; ; ) {
        let nextBreak = -1,
          breakSize = 1,
          m;
        if (this.lineSeparator) {
          nextBreak = text.indexOf(this.lineSeparator, off);
          breakSize = this.lineSeparator.length;
        } else if ((m = re.exec(text))) {
          nextBreak = m.index;
          breakSize = m[0].length;
        }
        this.append(text.slice(off, nextBreak < 0 ? text.length : nextBreak));
        if (nextBreak < 0) break;
        this.lineBreak();
        if (breakSize > 1)
          for (let point of this.points)
            if (point.node == node && point.pos > this.text.length) point.pos -= breakSize - 1;
        off = nextBreak + breakSize;
      }
    }
    readNode(node) {
      if (node.cmIgnore) return;
      let view = ContentView.get(node);
      let fromView = view && view.overrideDOMText;
      if (fromView != null) {
        this.findPointInside(node, fromView.length);
        for (let i = fromView.iter(); !i.next().done; ) {
          if (i.lineBreak) this.lineBreak();
          else this.append(i.value);
        }
      } else if (node.nodeType == 3) {
        this.readTextNode(node);
      } else if (node.nodeName == 'BR') {
        if (node.nextSibling) this.lineBreak();
      } else if (node.nodeType == 1) {
        this.readRange(node.firstChild, null);
      }
    }
    findPointBefore(node, next) {
      for (let point of this.points)
        if (point.node == node && node.childNodes[point.offset] == next)
          point.pos = this.text.length;
    }
    findPointInside(node, maxLen) {
      for (let point of this.points)
        if (node.nodeType == 3 ? point.node == node : node.contains(point.node))
          point.pos = this.text.length + Math.min(maxLen, point.offset);
    }
  }
  function isBlockElement(node) {
    return (
      node.nodeType == 1 &&
      /^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(node.nodeName)
    );
  }
  class DOMPoint {
    constructor(node, offset) {
      this.node = node;
      this.offset = offset;
      this.pos = -1;
    }
  }

  class DocView extends ContentView {
    constructor(view) {
      super();
      this.view = view;
      this.compositionDeco = Decoration.none;
      this.decorations = [];
      this.dynamicDecorationMap = [];
      this.minWidth = 0;
      this.minWidthFrom = 0;
      this.minWidthTo = 0;
      this.impreciseAnchor = null;
      this.impreciseHead = null;
      this.forceSelection = false;
      this.lastUpdate = Date.now();
      this.setDOM(view.contentDOM);
      this.children = [new LineView()];
      this.children[0].setParent(this);
      this.updateDeco();
      this.updateInner([new ChangedRange(0, 0, 0, view.state.doc.length)], 0);
    }
    get editorView() {
      return this.view;
    }
    get length() {
      return this.view.state.doc.length;
    }
    update(update) {
      let changedRanges = update.changedRanges;
      if (this.minWidth > 0 && changedRanges.length) {
        if (
          !changedRanges.every(
            ({ fromA, toA }) => toA < this.minWidthFrom || fromA > this.minWidthTo,
          )
        ) {
          this.minWidth = this.minWidthFrom = this.minWidthTo = 0;
        } else {
          this.minWidthFrom = update.changes.mapPos(this.minWidthFrom, 1);
          this.minWidthTo = update.changes.mapPos(this.minWidthTo, 1);
        }
      }
      if (this.view.inputState.composing < 0) this.compositionDeco = Decoration.none;
      else if (update.transactions.length || this.dirty)
        this.compositionDeco = computeCompositionDeco(this.view, update.changes);
      if (
        (dist_browser.ie || dist_browser.chrome) &&
        !this.compositionDeco.size &&
        update &&
        update.state.doc.lines != update.startState.doc.lines
      )
        this.forceSelection = true;
      let prevDeco = this.decorations,
        deco = this.updateDeco();
      let decoDiff = findChangedDeco(prevDeco, deco, update.changes);
      changedRanges = ChangedRange.extendWithRanges(changedRanges, decoDiff);
      if (this.dirty == 0 && changedRanges.length == 0) {
        return false;
      } else {
        this.updateInner(changedRanges, update.startState.doc.length);
        if (update.transactions.length) this.lastUpdate = Date.now();
        return true;
      }
    }
    updateInner(changes, oldLength) {
      this.view.viewState.mustMeasureContent = true;
      this.updateChildren(changes, oldLength);
      let { observer } = this.view;
      observer.ignore(() => {
        this.dom.style.height = this.view.viewState.contentHeight + 'px';
        this.dom.style.flexBasis = this.minWidth ? this.minWidth + 'px' : '';
        let track =
          dist_browser.chrome || dist_browser.ios
            ? { node: observer.selectionRange.focusNode, written: false }
            : undefined;
        this.sync(track);
        this.dirty = 0;
        if (track && (track.written || observer.selectionRange.focusNode != track.node))
          this.forceSelection = true;
        this.dom.style.height = '';
      });
      let gaps = [];
      if (this.view.viewport.from || this.view.viewport.to < this.view.state.doc.length)
        for (let child of this.children)
          if (child instanceof BlockWidgetView && child.widget instanceof BlockGapWidget)
            gaps.push(child.dom);
      observer.updateGaps(gaps);
    }
    updateChildren(changes, oldLength) {
      let cursor = this.childCursor(oldLength);
      for (let i = changes.length - 1; ; i--) {
        let next = i >= 0 ? changes[i] : null;
        if (!next) break;
        let { fromA, toA, fromB, toB } = next;
        let { content, breakAtStart, openStart, openEnd } = ContentBuilder.build(
          this.view.state.doc,
          fromB,
          toB,
          this.decorations,
          this.dynamicDecorationMap,
        );
        let { i: toI, off: toOff } = cursor.findPos(toA, 1);
        let { i: fromI, off: fromOff } = cursor.findPos(fromA, -1);
        replaceRange(this, fromI, fromOff, toI, toOff, content, breakAtStart, openStart, openEnd);
      }
    }
    updateSelection(mustRead = false, fromPointer = false) {
      if (mustRead || !this.view.observer.selectionRange.focusNode)
        this.view.observer.readSelectionRange();
      if (
        !(fromPointer || this.mayControlSelection()) ||
        (dist_browser.ios && this.view.inputState.rapidCompositionStart)
      )
        return;
      let force = this.forceSelection;
      this.forceSelection = false;
      let main = this.view.state.selection.main;
      let anchor = this.domAtPos(main.anchor);
      let head = main.empty ? anchor : this.domAtPos(main.head);
      if (dist_browser.gecko && main.empty && betweenUneditable(anchor)) {
        let dummy = document.createTextNode('');
        this.view.observer.ignore(() =>
          anchor.node.insertBefore(dummy, anchor.node.childNodes[anchor.offset] || null),
        );
        anchor = head = new DOMPos(dummy, 0);
        force = true;
      }
      let domSel = this.view.observer.selectionRange;
      if (
        force ||
        !domSel.focusNode ||
        !isEquivalentPosition(anchor.node, anchor.offset, domSel.anchorNode, domSel.anchorOffset) ||
        !isEquivalentPosition(head.node, head.offset, domSel.focusNode, domSel.focusOffset)
      ) {
        this.view.observer.ignore(() => {
          if (
            dist_browser.android &&
            dist_browser.chrome &&
            this.dom.contains(domSel.focusNode) &&
            inUneditable(domSel.focusNode, this.dom)
          ) {
            this.dom.blur();
            this.dom.focus({ preventScroll: true });
          }
          let rawSel = getSelection(this.view.root);
          if (!rawSel);
          else if (main.empty) {
            if (dist_browser.gecko) {
              let nextTo = nextToUneditable(anchor.node, anchor.offset);
              if (nextTo && nextTo != (1 | 2)) {
                let text = nearbyTextNode(anchor.node, anchor.offset, nextTo == 1 ? 1 : -1);
                if (text) anchor = new DOMPos(text, nextTo == 1 ? 0 : text.nodeValue.length);
              }
            }
            rawSel.collapse(anchor.node, anchor.offset);
            if (main.bidiLevel != null && domSel.cursorBidiLevel != null)
              domSel.cursorBidiLevel = main.bidiLevel;
          } else if (rawSel.extend) {
            rawSel.collapse(anchor.node, anchor.offset);
            rawSel.extend(head.node, head.offset);
          } else {
            let range = document.createRange();
            if (main.anchor > main.head) [anchor, head] = [head, anchor];
            range.setEnd(head.node, head.offset);
            range.setStart(anchor.node, anchor.offset);
            rawSel.removeAllRanges();
            rawSel.addRange(range);
          }
        });
        this.view.observer.setSelectionRange(anchor, head);
      }
      this.impreciseAnchor = anchor.precise
        ? null
        : new DOMPos(domSel.anchorNode, domSel.anchorOffset);
      this.impreciseHead = head.precise ? null : new DOMPos(domSel.focusNode, domSel.focusOffset);
    }
    enforceCursorAssoc() {
      if (this.compositionDeco.size) return;
      let cursor = this.view.state.selection.main;
      let sel = getSelection(this.view.root);
      if (!sel || !cursor.empty || !cursor.assoc || !sel.modify) return;
      let line = LineView.find(this, cursor.head);
      if (!line) return;
      let lineStart = line.posAtStart;
      if (cursor.head == lineStart || cursor.head == lineStart + line.length) return;
      let before = this.coordsAt(cursor.head, -1),
        after = this.coordsAt(cursor.head, 1);
      if (!before || !after || before.bottom > after.top) return;
      let dom = this.domAtPos(cursor.head + cursor.assoc);
      sel.collapse(dom.node, dom.offset);
      sel.modify('move', cursor.assoc < 0 ? 'forward' : 'backward', 'lineboundary');
    }
    mayControlSelection() {
      let active = this.view.root.activeElement;
      return (
        active == this.dom ||
        (hasSelection(this.dom, this.view.observer.selectionRange) &&
          !(active && this.dom.contains(active)))
      );
    }
    nearest(dom) {
      for (let cur = dom; cur; ) {
        let domView = ContentView.get(cur);
        if (domView && domView.rootView == this) return domView;
        cur = cur.parentNode;
      }
      return null;
    }
    posFromDOM(node, offset) {
      let view = this.nearest(node);
      if (!view)
        throw new RangeError('Trying to find position for a DOM position outside of the document');
      return view.localPosFromDOM(node, offset) + view.posAtStart;
    }
    domAtPos(pos) {
      let { i, off } = this.childCursor().findPos(pos, -1);
      for (; i < this.children.length - 1; ) {
        let child = this.children[i];
        if (off < child.length || child instanceof LineView) break;
        i++;
        off = 0;
      }
      return this.children[i].domAtPos(off);
    }
    coordsAt(pos, side) {
      for (let off = this.length, i = this.children.length - 1; ; i--) {
        let child = this.children[i],
          start = off - child.breakAfter - child.length;
        if (
          pos > start ||
          (pos == start &&
            child.type != BlockType.WidgetBefore &&
            child.type != BlockType.WidgetAfter &&
            (!i ||
              side == 2 ||
              this.children[i - 1].breakAfter ||
              (this.children[i - 1].type == BlockType.WidgetBefore && side > -2)))
        )
          return child.coordsAt(pos - start, side);
        off = start;
      }
    }
    measureVisibleLineHeights(viewport) {
      let result = [],
        { from, to } = viewport;
      let contentWidth = this.view.contentDOM.clientWidth;
      let isWider = contentWidth > Math.max(this.view.scrollDOM.clientWidth, this.minWidth) + 1;
      let widest = -1,
        ltr = this.view.textDirection == Direction.LTR;
      for (let pos = 0, i = 0; i < this.children.length; i++) {
        let child = this.children[i],
          end = pos + child.length;
        if (end > to) break;
        if (pos >= from) {
          let childRect = child.dom.getBoundingClientRect();
          result.push(childRect.height);
          if (isWider) {
            let last = child.dom.lastChild;
            let rects = last ? clientRectsFor(last) : [];
            if (rects.length) {
              let rect = rects[rects.length - 1];
              let width = ltr ? rect.right - childRect.left : childRect.right - rect.left;
              if (width > widest) {
                widest = width;
                this.minWidth = contentWidth;
                this.minWidthFrom = pos;
                this.minWidthTo = end;
              }
            }
          }
        }
        pos = end + child.breakAfter;
      }
      return result;
    }
    textDirectionAt(pos) {
      let { i } = this.childPos(pos, 1);
      return getComputedStyle(this.children[i].dom).direction == 'rtl'
        ? Direction.RTL
        : Direction.LTR;
    }
    measureTextSize() {
      for (let child of this.children) {
        if (child instanceof LineView) {
          let measure = child.measureTextSize();
          if (measure) return measure;
        }
      }
      let dummy = document.createElement('div'),
        lineHeight,
        charWidth;
      dummy.className = 'cm-line';
      dummy.style.width = '99999px';
      dummy.textContent = 'abc def ghi jkl mno pqr stu';
      this.view.observer.ignore(() => {
        this.dom.appendChild(dummy);
        let rect = clientRectsFor(dummy.firstChild)[0];
        lineHeight = dummy.getBoundingClientRect().height;
        charWidth = rect ? rect.width / 27 : 7;
        dummy.remove();
      });
      return { lineHeight, charWidth };
    }
    childCursor(pos = this.length) {
      let i = this.children.length;
      if (i) pos -= this.children[--i].length;
      return new ChildCursor(this.children, pos, i);
    }
    computeBlockGapDeco() {
      let deco = [],
        vs = this.view.viewState;
      for (let pos = 0, i = 0; ; i++) {
        let next = i == vs.viewports.length ? null : vs.viewports[i];
        let end = next ? next.from - 1 : this.length;
        if (end > pos) {
          let height = vs.lineBlockAt(end).bottom - vs.lineBlockAt(pos).top;
          deco.push(
            Decoration.replace({
              widget: new BlockGapWidget(height),
              block: true,
              inclusive: true,
              isBlockGap: true,
            }).range(pos, end),
          );
        }
        if (!next) break;
        pos = next.to + 1;
      }
      return Decoration.set(deco);
    }
    updateDeco() {
      let allDeco = this.view.state.facet(decorations).map((d, i) => {
        let dynamic = (this.dynamicDecorationMap[i] = typeof d == 'function');
        return dynamic ? d(this.view) : d;
      });
      for (let i = allDeco.length; i < allDeco.length + 3; i++)
        this.dynamicDecorationMap[i] = false;
      return (this.decorations = [
        ...allDeco,
        this.compositionDeco,
        this.computeBlockGapDeco(),
        this.view.viewState.lineGapDeco,
      ]);
    }
    scrollIntoView(target) {
      let { range } = target;
      let rect = this.coordsAt(
          range.head,
          range.empty ? range.assoc : range.head > range.anchor ? -1 : 1,
        ),
        other;
      if (!rect) return;
      if (!range.empty && (other = this.coordsAt(range.anchor, range.anchor > range.head ? -1 : 1)))
        rect = {
          left: Math.min(rect.left, other.left),
          top: Math.min(rect.top, other.top),
          right: Math.max(rect.right, other.right),
          bottom: Math.max(rect.bottom, other.bottom),
        };
      let mLeft = 0,
        mRight = 0,
        mTop = 0,
        mBottom = 0;
      for (let margins of this.view.state.facet(scrollMargins).map(f => f(this.view)))
        if (margins) {
          let { left, right, top, bottom } = margins;
          if (left != null) mLeft = Math.max(mLeft, left);
          if (right != null) mRight = Math.max(mRight, right);
          if (top != null) mTop = Math.max(mTop, top);
          if (bottom != null) mBottom = Math.max(mBottom, bottom);
        }
      let targetRect = {
        left: rect.left - mLeft,
        top: rect.top - mTop,
        right: rect.right + mRight,
        bottom: rect.bottom + mBottom,
      };
      scrollRectIntoView(
        this.view.scrollDOM,
        targetRect,
        range.head < range.anchor ? -1 : 1,
        target.x,
        target.y,
        target.xMargin,
        target.yMargin,
        this.view.textDirection == Direction.LTR,
      );
    }
  }
  function betweenUneditable(pos) {
    return (
      pos.node.nodeType == 1 &&
      pos.node.firstChild &&
      (pos.offset == 0 || pos.node.childNodes[pos.offset - 1].contentEditable == 'false') &&
      (pos.offset == pos.node.childNodes.length ||
        pos.node.childNodes[pos.offset].contentEditable == 'false')
    );
  }
  class BlockGapWidget extends WidgetType {
    constructor(height) {
      super();
      this.height = height;
    }
    toDOM() {
      let elt = document.createElement('div');
      this.updateDOM(elt);
      return elt;
    }
    eq(other) {
      return other.height == this.height;
    }
    updateDOM(elt) {
      elt.style.height = this.height + 'px';
      return true;
    }
    get estimatedHeight() {
      return this.height;
    }
  }
  function compositionSurroundingNode(view) {
    let sel = view.observer.selectionRange;
    let textNode = sel.focusNode && nearbyTextNode(sel.focusNode, sel.focusOffset, 0);
    if (!textNode) return null;
    let cView = view.docView.nearest(textNode);
    if (!cView) return null;
    if (cView instanceof LineView) {
      let topNode = textNode;
      while (topNode.parentNode != cView.dom) topNode = topNode.parentNode;
      let prev = topNode.previousSibling;
      while (prev && !ContentView.get(prev)) prev = prev.previousSibling;
      let pos = prev ? ContentView.get(prev).posAtEnd : cView.posAtStart;
      return { from: pos, to: pos, node: topNode, text: textNode };
    } else {
      for (;;) {
        let { parent } = cView;
        if (!parent) return null;
        if (parent instanceof LineView) break;
        cView = parent;
      }
      let from = cView.posAtStart;
      return { from, to: from + cView.length, node: cView.dom, text: textNode };
    }
  }
  function computeCompositionDeco(view, changes) {
    let surrounding = compositionSurroundingNode(view);
    if (!surrounding) return Decoration.none;
    let { from, to, node, text: textNode } = surrounding;
    let newFrom = changes.mapPos(from, 1),
      newTo = Math.max(newFrom, changes.mapPos(to, -1));
    let { state } = view,
      text =
        node.nodeType == 3
          ? node.nodeValue
          : new DOMReader([], state).readRange(node.firstChild, null).text;
    if (newTo - newFrom < text.length) {
      if (
        state.doc.sliceString(
          newFrom,
          Math.min(state.doc.length, newFrom + text.length),
          LineBreakPlaceholder,
        ) == text
      )
        newTo = newFrom + text.length;
      else if (
        state.doc.sliceString(Math.max(0, newTo - text.length), newTo, LineBreakPlaceholder) == text
      )
        newFrom = newTo - text.length;
      else return Decoration.none;
    } else if (state.doc.sliceString(newFrom, newTo, LineBreakPlaceholder) != text) {
      return Decoration.none;
    }
    let topView = ContentView.get(node);
    if (topView instanceof CompositionView) topView = topView.widget.topView;
    else if (topView) topView.parent = null;
    return Decoration.set(
      Decoration.replace({
        widget: new CompositionWidget(node, textNode, topView),
        inclusive: true,
      }).range(newFrom, newTo),
    );
  }
  class CompositionWidget extends WidgetType {
    constructor(top, text, topView) {
      super();
      this.top = top;
      this.text = text;
      this.topView = topView;
    }
    eq(other) {
      return this.top == other.top && this.text == other.text;
    }
    toDOM() {
      return this.top;
    }
    ignoreEvent() {
      return false;
    }
    get customView() {
      return CompositionView;
    }
  }
  function nearbyTextNode(node, offset, side) {
    for (;;) {
      if (node.nodeType == 3) return node;
      if (node.nodeType == 1 && offset > 0 && side <= 0) {
        node = node.childNodes[offset - 1];
        offset = maxOffset(node);
      } else if (node.nodeType == 1 && offset < node.childNodes.length && side >= 0) {
        node = node.childNodes[offset];
        offset = 0;
      } else {
        return null;
      }
    }
  }
  function nextToUneditable(node, offset) {
    if (node.nodeType != 1) return 0;
    return (
      (offset && node.childNodes[offset - 1].contentEditable == 'false' ? 1 : 0) |
      (offset < node.childNodes.length && node.childNodes[offset].contentEditable == 'false'
        ? 2
        : 0)
    );
  }
  class DecorationComparator$1 {
    constructor() {
      this.changes = [];
    }
    compareRange(from, to) {
      addRange(from, to, this.changes);
    }
    comparePoint(from, to) {
      addRange(from, to, this.changes);
    }
  }
  function findChangedDeco(a, b, diff) {
    let comp = new DecorationComparator$1();
    dist_RangeSet.compare(a, b, diff, comp);
    return comp.changes;
  }
  function inUneditable(node, inside) {
    for (let cur = node; cur && cur != inside; cur = cur.assignedSlot || cur.parentNode) {
      if (cur.nodeType == 1 && cur.contentEditable == 'false') {
        return true;
      }
    }
    return false;
  }

  function groupAt(state, pos, bias = 1) {
    let categorize = state.charCategorizer(pos);
    let line = state.doc.lineAt(pos),
      linePos = pos - line.from;
    if (line.length == 0) return dist_EditorSelection.cursor(pos);
    if (linePos == 0) bias = 1;
    else if (linePos == line.length) bias = -1;
    let from = linePos,
      to = linePos;
    if (bias < 0) from = findClusterBreak(line.text, linePos, false);
    else to = findClusterBreak(line.text, linePos);
    let cat = categorize(line.text.slice(from, to));
    while (from > 0) {
      let prev = findClusterBreak(line.text, from, false);
      if (categorize(line.text.slice(prev, from)) != cat) break;
      from = prev;
    }
    while (to < line.length) {
      let next = findClusterBreak(line.text, to);
      if (categorize(line.text.slice(to, next)) != cat) break;
      to = next;
    }
    return dist_EditorSelection.range(from + line.from, to + line.from);
  }
  function getdx(x, rect) {
    return rect.left > x ? rect.left - x : Math.max(0, x - rect.right);
  }
  function getdy(y, rect) {
    return rect.top > y ? rect.top - y : Math.max(0, y - rect.bottom);
  }
  function yOverlap(a, b) {
    return a.top < b.bottom - 1 && a.bottom > b.top + 1;
  }
  function upTop(rect, top) {
    return top < rect.top ? { top, left: rect.left, right: rect.right, bottom: rect.bottom } : rect;
  }
  function upBot(rect, bottom) {
    return bottom > rect.bottom
      ? { top: rect.top, left: rect.left, right: rect.right, bottom }
      : rect;
  }
  function domPosAtCoords(parent, x, y) {
    let closest,
      closestRect,
      closestX,
      closestY,
      closestOverlap = false;
    let above, below, aboveRect, belowRect;
    for (let child = parent.firstChild; child; child = child.nextSibling) {
      let rects = clientRectsFor(child);
      for (let i = 0; i < rects.length; i++) {
        let rect = rects[i];
        if (closestRect && yOverlap(closestRect, rect))
          rect = upTop(upBot(rect, closestRect.bottom), closestRect.top);
        let dx = getdx(x, rect),
          dy = getdy(y, rect);
        if (dx == 0 && dy == 0)
          return child.nodeType == 3 ? domPosInText(child, x, y) : domPosAtCoords(child, x, y);
        if (!closest || closestY > dy || (closestY == dy && closestX > dx)) {
          closest = child;
          closestRect = rect;
          closestX = dx;
          closestY = dy;
          closestOverlap = !dx || (dx > 0 ? i < rects.length - 1 : i > 0);
        }
        if (dx == 0) {
          if (y > rect.bottom && (!aboveRect || aboveRect.bottom < rect.bottom)) {
            above = child;
            aboveRect = rect;
          } else if (y < rect.top && (!belowRect || belowRect.top > rect.top)) {
            below = child;
            belowRect = rect;
          }
        } else if (aboveRect && yOverlap(aboveRect, rect)) {
          aboveRect = upBot(aboveRect, rect.bottom);
        } else if (belowRect && yOverlap(belowRect, rect)) {
          belowRect = upTop(belowRect, rect.top);
        }
      }
    }
    if (aboveRect && aboveRect.bottom >= y) {
      closest = above;
      closestRect = aboveRect;
    } else if (belowRect && belowRect.top <= y) {
      closest = below;
      closestRect = belowRect;
    }
    if (!closest) return { node: parent, offset: 0 };
    let clipX = Math.max(closestRect.left, Math.min(closestRect.right, x));
    if (closest.nodeType == 3) return domPosInText(closest, clipX, y);
    if (closestOverlap && closest.contentEditable != 'false')
      return domPosAtCoords(closest, clipX, y);
    let offset =
      Array.prototype.indexOf.call(parent.childNodes, closest) +
      (x >= (closestRect.left + closestRect.right) / 2 ? 1 : 0);
    return { node: parent, offset };
  }
  function domPosInText(node, x, y) {
    let len = node.nodeValue.length;
    let closestOffset = -1,
      closestDY = 1e9,
      generalSide = 0;
    for (let i = 0; i < len; i++) {
      let rects = textRange(node, i, i + 1).getClientRects();
      for (let j = 0; j < rects.length; j++) {
        let rect = rects[j];
        if (rect.top == rect.bottom) continue;
        if (!generalSide) generalSide = x - rect.left;
        let dy = (rect.top > y ? rect.top - y : y - rect.bottom) - 1;
        if (rect.left - 1 <= x && rect.right + 1 >= x && dy < closestDY) {
          let right = x >= (rect.left + rect.right) / 2,
            after = right;
          if (dist_browser.chrome || dist_browser.gecko) {
            let rectBefore = textRange(node, i).getBoundingClientRect();
            if (rectBefore.left == rect.right) after = !right;
          }
          if (dy <= 0) return { node, offset: i + (after ? 1 : 0) };
          closestOffset = i + (after ? 1 : 0);
          closestDY = dy;
        }
      }
    }
    return {
      node,
      offset: closestOffset > -1 ? closestOffset : generalSide > 0 ? node.nodeValue.length : 0,
    };
  }
  function posAtCoords(view, { x, y }, precise, bias = -1) {
    var _a;
    let content = view.contentDOM.getBoundingClientRect(),
      docTop = content.top + view.viewState.paddingTop;
    let block,
      { docHeight } = view.viewState;
    let yOffset = y - docTop;
    if (yOffset < 0) return 0;
    if (yOffset > docHeight) return view.state.doc.length;
    for (let halfLine = view.defaultLineHeight / 2, bounced = false; ; ) {
      block = view.elementAtHeight(yOffset);
      if (block.type == BlockType.Text) break;
      for (;;) {
        yOffset = bias > 0 ? block.bottom + halfLine : block.top - halfLine;
        if (yOffset >= 0 && yOffset <= docHeight) break;
        if (bounced) return precise ? null : 0;
        bounced = true;
        bias = -bias;
      }
    }
    y = docTop + yOffset;
    let lineStart = block.from;
    if (lineStart < view.viewport.from)
      return view.viewport.from == 0
        ? 0
        : precise
        ? null
        : posAtCoordsImprecise(view, content, block, x, y);
    if (lineStart > view.viewport.to)
      return view.viewport.to == view.state.doc.length
        ? view.state.doc.length
        : precise
        ? null
        : posAtCoordsImprecise(view, content, block, x, y);
    let doc = view.dom.ownerDocument;
    let root = view.root.elementFromPoint ? view.root : doc;
    let element = root.elementFromPoint(x, y);
    if (element && !view.contentDOM.contains(element)) element = null;
    if (!element) {
      x = Math.max(content.left + 1, Math.min(content.right - 1, x));
      element = root.elementFromPoint(x, y);
      if (element && !view.contentDOM.contains(element)) element = null;
    }
    let node,
      offset = -1;
    if (
      element &&
      ((_a = view.docView.nearest(element)) === null || _a === void 0 ? void 0 : _a.isEditable) !=
        false
    ) {
      if (doc.caretPositionFromPoint) {
        let pos = doc.caretPositionFromPoint(x, y);
        if (pos) ({ offsetNode: node, offset } = pos);
      } else if (doc.caretRangeFromPoint) {
        let range = doc.caretRangeFromPoint(x, y);
        if (range) {
          ({ startContainer: node, startOffset: offset } = range);
          if (
            !view.contentDOM.contains(node) ||
            (dist_browser.safari && isSuspiciousSafariCaretResult(node, offset, x)) ||
            (dist_browser.chrome && isSuspiciousChromeCaretResult(node, offset, x))
          )
            node = undefined;
        }
      }
    }
    if (!node || !view.docView.dom.contains(node)) {
      let line = LineView.find(view.docView, lineStart);
      if (!line) return yOffset > block.top + block.height / 2 ? block.to : block.from;
      ({ node, offset } = domPosAtCoords(line.dom, x, y));
    }
    return view.docView.posFromDOM(node, offset);
  }
  function posAtCoordsImprecise(view, contentRect, block, x, y) {
    let into = Math.round((x - contentRect.left) * view.defaultCharacterWidth);
    if (view.lineWrapping && block.height > view.defaultLineHeight * 1.5) {
      let line = Math.floor((y - block.top) / view.defaultLineHeight);
      into += line * view.viewState.heightOracle.lineLength;
    }
    let content = view.state.sliceDoc(block.from, block.to);
    return block.from + dist_findColumn(content, into, view.state.tabSize);
  }
  function isSuspiciousSafariCaretResult(node, offset, x) {
    let len;
    if (node.nodeType != 3 || offset != (len = node.nodeValue.length)) return false;
    for (let next = node.nextSibling; next; next = next.nextSibling)
      if (next.nodeType != 1 || next.nodeName != 'BR') return false;
    return textRange(node, len - 1, len).getBoundingClientRect().left > x;
  }
  function isSuspiciousChromeCaretResult(node, offset, x) {
    if (offset != 0) return false;
    for (let cur = node; ; ) {
      let parent = cur.parentNode;
      if (!parent || parent.nodeType != 1 || parent.firstChild != cur) return false;
      if (parent.classList.contains('cm-line')) break;
      cur = parent;
    }
    let rect =
      node.nodeType == 1
        ? node.getBoundingClientRect()
        : textRange(node, 0, Math.max(node.nodeValue.length, 1)).getBoundingClientRect();
    return x - rect.left > 5;
  }
  function moveToLineBoundary(view, start, forward, includeWrap) {
    let line = view.state.doc.lineAt(start.head);
    let coords =
      !includeWrap || !view.lineWrapping
        ? null
        : view.coordsAtPos(start.assoc < 0 && start.head > line.from ? start.head - 1 : start.head);
    if (coords) {
      let editorRect = view.dom.getBoundingClientRect();
      let direction = view.textDirectionAt(line.from);
      let pos = view.posAtCoords({
        x: forward == (direction == Direction.LTR) ? editorRect.right - 1 : editorRect.left + 1,
        y: (coords.top + coords.bottom) / 2,
      });
      if (pos != null) return dist_EditorSelection.cursor(pos, forward ? -1 : 1);
    }
    let lineView = LineView.find(view.docView, start.head);
    let end = lineView
      ? forward
        ? lineView.posAtEnd
        : lineView.posAtStart
      : forward
      ? line.to
      : line.from;
    return dist_EditorSelection.cursor(end, forward ? -1 : 1);
  }
  function moveByChar(view, start, forward, by) {
    let line = view.state.doc.lineAt(start.head),
      spans = view.bidiSpans(line);
    let direction = view.textDirectionAt(line.from);
    for (let cur = start, check = null; ; ) {
      let next = moveVisually(line, spans, direction, cur, forward),
        char = movedOver;
      if (!next) {
        if (line.number == (forward ? view.state.doc.lines : 1)) return cur;
        char = '\n';
        line = view.state.doc.line(line.number + (forward ? 1 : -1));
        spans = view.bidiSpans(line);
        next = dist_EditorSelection.cursor(forward ? line.from : line.to);
      }
      if (!check) {
        if (!by) return next;
        check = by(char);
      } else if (!check(char)) {
        return cur;
      }
      cur = next;
    }
  }
  function byGroup(view, pos, start) {
    let categorize = view.state.charCategorizer(pos);
    let cat = categorize(start);
    return next => {
      let nextCat = categorize(next);
      if (cat == dist_CharCategory.Space) cat = nextCat;
      return cat == nextCat;
    };
  }
  function moveVertically(view, start, forward, distance) {
    let startPos = start.head,
      dir = forward ? 1 : -1;
    if (startPos == (forward ? view.state.doc.length : 0))
      return dist_EditorSelection.cursor(startPos, start.assoc);
    let goal = start.goalColumn,
      startY;
    let rect = view.contentDOM.getBoundingClientRect();
    let startCoords = view.coordsAtPos(startPos),
      docTop = view.documentTop;
    if (startCoords) {
      if (goal == null) goal = startCoords.left - rect.left;
      startY = dir < 0 ? startCoords.top : startCoords.bottom;
    } else {
      let line = view.viewState.lineBlockAt(startPos);
      if (goal == null)
        goal = Math.min(
          rect.right - rect.left,
          view.defaultCharacterWidth * (startPos - line.from),
        );
      startY = (dir < 0 ? line.top : line.bottom) + docTop;
    }
    let resolvedGoal = rect.left + goal;
    let dist = distance !== null && distance !== void 0 ? distance : view.defaultLineHeight >> 1;
    for (let extra = 0; ; extra += 10) {
      let curY = startY + (dist + extra) * dir;
      let pos = posAtCoords(view, { x: resolvedGoal, y: curY }, false, dir);
      if (curY < rect.top || curY > rect.bottom || (dir < 0 ? pos < startPos : pos > startPos))
        return dist_EditorSelection.cursor(pos, start.assoc, undefined, goal);
    }
  }
  function skipAtoms(view, oldPos, pos) {
    let atoms = view.state.facet(atomicRanges).map(f => f(view));
    for (;;) {
      let moved = false;
      for (let set of atoms) {
        set.between(pos.from - 1, pos.from + 1, (from, to, value) => {
          if (pos.from > from && pos.from < to) {
            pos =
              oldPos.from > pos.from
                ? dist_EditorSelection.cursor(from, 1)
                : dist_EditorSelection.cursor(to, -1);
            moved = true;
          }
        });
      }
      if (!moved) return pos;
    }
  }

  class InputState {
    constructor(view) {
      this.lastKeyCode = 0;
      this.lastKeyTime = 0;
      this.lastTouchTime = 0;
      this.lastFocusTime = 0;
      this.lastScrollTop = 0;
      this.lastScrollLeft = 0;
      this.chromeScrollHack = -1;
      this.pendingIOSKey = undefined;
      this.lastSelectionOrigin = null;
      this.lastSelectionTime = 0;
      this.lastEscPress = 0;
      this.lastContextMenu = 0;
      this.scrollHandlers = [];
      this.registeredEvents = [];
      this.customHandlers = [];
      this.composing = -1;
      this.compositionFirstChange = null;
      this.compositionEndedAt = 0;
      this.rapidCompositionStart = false;
      this.mouseSelection = null;
      for (let type in handlers) {
        let handler = handlers[type];
        view.contentDOM.addEventListener(
          type,
          event => {
            if (!eventBelongsToEditor(view, event) || this.ignoreDuringComposition(event)) return;
            if (type == 'keydown' && this.keydown(view, event)) return;
            if (this.mustFlushObserver(event)) view.observer.forceFlush();
            if (this.runCustomHandlers(type, view, event)) event.preventDefault();
            else handler(view, event);
          },
          handlerOptions[type],
        );
        this.registeredEvents.push(type);
      }
      if (dist_browser.chrome && dist_browser.chrome_version == 102) {
        view.scrollDOM.addEventListener(
          'wheel',
          () => {
            if (this.chromeScrollHack < 0) view.contentDOM.style.pointerEvents = 'none';
            else window.clearTimeout(this.chromeScrollHack);
            this.chromeScrollHack = setTimeout(() => {
              this.chromeScrollHack = -1;
              view.contentDOM.style.pointerEvents = '';
            }, 100);
          },
          { passive: true },
        );
      }
      this.notifiedFocused = view.hasFocus;
      if (dist_browser.safari) view.contentDOM.addEventListener('input', () => null);
    }
    setSelectionOrigin(origin) {
      this.lastSelectionOrigin = origin;
      this.lastSelectionTime = Date.now();
    }
    ensureHandlers(view, plugins) {
      var _a;
      let handlers;
      this.customHandlers = [];
      for (let plugin of plugins)
        if (
          (handlers =
            (_a = plugin.update(view).spec) === null || _a === void 0
              ? void 0
              : _a.domEventHandlers)
        ) {
          this.customHandlers.push({ plugin: plugin.value, handlers });
          for (let type in handlers)
            if (this.registeredEvents.indexOf(type) < 0 && type != 'scroll') {
              this.registeredEvents.push(type);
              view.contentDOM.addEventListener(type, event => {
                if (!eventBelongsToEditor(view, event)) return;
                if (this.runCustomHandlers(type, view, event)) event.preventDefault();
              });
            }
        }
    }
    runCustomHandlers(type, view, event) {
      for (let set of this.customHandlers) {
        let handler = set.handlers[type];
        if (handler) {
          try {
            if (handler.call(set.plugin, event, view) || event.defaultPrevented) return true;
          } catch (e) {
            logException(view.state, e);
          }
        }
      }
      return false;
    }
    runScrollHandlers(view, event) {
      this.lastScrollTop = view.scrollDOM.scrollTop;
      this.lastScrollLeft = view.scrollDOM.scrollLeft;
      for (let set of this.customHandlers) {
        let handler = set.handlers.scroll;
        if (handler) {
          try {
            handler.call(set.plugin, event, view);
          } catch (e) {
            logException(view.state, e);
          }
        }
      }
    }
    keydown(view, event) {
      this.lastKeyCode = event.keyCode;
      this.lastKeyTime = Date.now();
      if (event.keyCode == 9 && Date.now() < this.lastEscPress + 2000) return true;
      if (
        dist_browser.android &&
        dist_browser.chrome &&
        !event.synthetic &&
        (event.keyCode == 13 || event.keyCode == 8)
      ) {
        view.observer.delayAndroidKey(event.key, event.keyCode);
        return true;
      }
      let pending;
      if (
        dist_browser.ios &&
        (pending = PendingKeys.find(key => key.keyCode == event.keyCode)) &&
        !(event.ctrlKey || event.altKey || event.metaKey) &&
        !event.synthetic
      ) {
        this.pendingIOSKey = pending;
        setTimeout(() => this.flushIOSKey(view), 250);
        return true;
      }
      return false;
    }
    flushIOSKey(view) {
      let key = this.pendingIOSKey;
      if (!key) return false;
      this.pendingIOSKey = undefined;
      return dispatchKey(view.contentDOM, key.key, key.keyCode);
    }
    ignoreDuringComposition(event) {
      if (!/^key/.test(event.type)) return false;
      if (this.composing > 0) return true;
      if (dist_browser.safari && !dist_browser.ios && Date.now() - this.compositionEndedAt < 100) {
        this.compositionEndedAt = 0;
        return true;
      }
      return false;
    }
    mustFlushObserver(event) {
      return (
        (event.type == 'keydown' && event.keyCode != 229) ||
        (event.type == 'compositionend' && !dist_browser.ios)
      );
    }
    startMouseSelection(mouseSelection) {
      if (this.mouseSelection) this.mouseSelection.destroy();
      this.mouseSelection = mouseSelection;
    }
    update(update) {
      if (this.mouseSelection) this.mouseSelection.update(update);
      if (update.transactions.length) this.lastKeyCode = this.lastSelectionTime = 0;
    }
    destroy() {
      if (this.mouseSelection) this.mouseSelection.destroy();
    }
  }
  const PendingKeys = [
    { key: 'Backspace', keyCode: 8, inputType: 'deleteContentBackward' },
    { key: 'Enter', keyCode: 13, inputType: 'insertParagraph' },
    { key: 'Delete', keyCode: 46, inputType: 'deleteContentForward' },
  ];
  const modifierCodes = [16, 17, 18, 20, 91, 92, 224, 225];
  class MouseSelection {
    constructor(view, startEvent, style, mustSelect) {
      this.view = view;
      this.style = style;
      this.mustSelect = mustSelect;
      this.lastEvent = startEvent;
      let doc = view.contentDOM.ownerDocument;
      doc.addEventListener('mousemove', (this.move = this.move.bind(this)));
      doc.addEventListener('mouseup', (this.up = this.up.bind(this)));
      this.extend = startEvent.shiftKey;
      this.multiple =
        view.state.facet(dist_EditorState.allowMultipleSelections) &&
        addsSelectionRange(view, startEvent);
      this.dragMove = dragMovesSelection(view, startEvent);
      this.dragging =
        isInPrimarySelection(view, startEvent) && getClickType(startEvent) == 1 ? null : false;
      if (this.dragging === false) {
        startEvent.preventDefault();
        this.select(startEvent);
      }
    }
    move(event) {
      if (event.buttons == 0) return this.destroy();
      if (this.dragging !== false) return;
      this.select((this.lastEvent = event));
    }
    up(event) {
      if (this.dragging == null) this.select(this.lastEvent);
      if (!this.dragging) event.preventDefault();
      this.destroy();
    }
    destroy() {
      let doc = this.view.contentDOM.ownerDocument;
      doc.removeEventListener('mousemove', this.move);
      doc.removeEventListener('mouseup', this.up);
      this.view.inputState.mouseSelection = null;
    }
    select(event) {
      let selection = this.style.get(event, this.extend, this.multiple);
      if (
        this.mustSelect ||
        !selection.eq(this.view.state.selection) ||
        selection.main.assoc != this.view.state.selection.main.assoc
      )
        this.view.dispatch({
          selection,
          userEvent: 'select.pointer',
          scrollIntoView: true,
        });
      this.mustSelect = false;
    }
    update(update) {
      if (update.docChanged && this.dragging) this.dragging = this.dragging.map(update.changes);
      if (this.style.update(update)) setTimeout(() => this.select(this.lastEvent), 20);
    }
  }
  function addsSelectionRange(view, event) {
    let facet = view.state.facet(clickAddsSelectionRange);
    return facet.length ? facet[0](event) : dist_browser.mac ? event.metaKey : event.ctrlKey;
  }
  function dragMovesSelection(view, event) {
    let facet = view.state.facet(dragMovesSelection$1);
    return facet.length ? facet[0](event) : dist_browser.mac ? !event.altKey : !event.ctrlKey;
  }
  function isInPrimarySelection(view, event) {
    let { main } = view.state.selection;
    if (main.empty) return false;
    let sel = getSelection(view.root);
    if (!sel || sel.rangeCount == 0) return true;
    let rects = sel.getRangeAt(0).getClientRects();
    for (let i = 0; i < rects.length; i++) {
      let rect = rects[i];
      if (
        rect.left <= event.clientX &&
        rect.right >= event.clientX &&
        rect.top <= event.clientY &&
        rect.bottom >= event.clientY
      )
        return true;
    }
    return false;
  }
  function eventBelongsToEditor(view, event) {
    if (!event.bubbles) return true;
    if (event.defaultPrevented) return false;
    for (let node = event.target, cView; node != view.contentDOM; node = node.parentNode)
      if (
        !node ||
        node.nodeType == 11 ||
        ((cView = ContentView.get(node)) && cView.ignoreEvent(event))
      )
        return false;
    return true;
  }
  const handlers = Object.create(null);
  const handlerOptions = Object.create(null);
  const brokenClipboardAPI =
    (dist_browser.ie && dist_browser.ie_version < 15) ||
    (dist_browser.ios && dist_browser.webkit_version < 604);
  function capturePaste(view) {
    let parent = view.dom.parentNode;
    if (!parent) return;
    let target = parent.appendChild(document.createElement('textarea'));
    target.style.cssText = 'position: fixed; left: -10000px; top: 10px';
    target.focus();
    setTimeout(() => {
      view.focus();
      target.remove();
      doPaste(view, target.value);
    }, 50);
  }
  function doPaste(view, input) {
    let { state } = view,
      changes,
      i = 1,
      text = state.toText(input);
    let byLine = text.lines == state.selection.ranges.length;
    let linewise =
      lastLinewiseCopy != null &&
      state.selection.ranges.every(r => r.empty) &&
      lastLinewiseCopy == text.toString();
    if (linewise) {
      let lastLine = -1;
      changes = state.changeByRange(range => {
        let line = state.doc.lineAt(range.from);
        if (line.from == lastLine) return { range };
        lastLine = line.from;
        let insert = state.toText((byLine ? text.line(i++).text : input) + state.lineBreak);
        return {
          changes: { from: line.from, insert },
          range: dist_EditorSelection.cursor(range.from + insert.length),
        };
      });
    } else if (byLine) {
      changes = state.changeByRange(range => {
        let line = text.line(i++);
        return {
          changes: { from: range.from, to: range.to, insert: line.text },
          range: dist_EditorSelection.cursor(range.from + line.length),
        };
      });
    } else {
      changes = state.replaceSelection(text);
    }
    view.dispatch(changes, {
      userEvent: 'input.paste',
      scrollIntoView: true,
    });
  }
  handlers.keydown = (view, event) => {
    view.inputState.setSelectionOrigin('select');
    if (event.keyCode == 27) view.inputState.lastEscPress = Date.now();
    else if (modifierCodes.indexOf(event.keyCode) < 0) view.inputState.lastEscPress = 0;
  };
  handlers.touchstart = (view, e) => {
    view.inputState.lastTouchTime = Date.now();
    view.inputState.setSelectionOrigin('select.pointer');
  };
  handlers.touchmove = view => {
    view.inputState.setSelectionOrigin('select.pointer');
  };
  handlerOptions.touchstart = handlerOptions.touchmove = { passive: true };
  handlers.mousedown = (view, event) => {
    view.observer.flush();
    if (view.inputState.lastTouchTime > Date.now() - 2000 && getClickType(event) == 1) return;
    let style = null;
    for (let makeStyle of view.state.facet(mouseSelectionStyle)) {
      style = makeStyle(view, event);
      if (style) break;
    }
    if (!style && event.button == 0) style = basicMouseSelection(view, event);
    if (style) {
      let mustFocus = view.root.activeElement != view.contentDOM;
      if (mustFocus) view.observer.ignore(() => focusPreventScroll(view.contentDOM));
      view.inputState.startMouseSelection(new MouseSelection(view, event, style, mustFocus));
    }
  };
  function rangeForClick(view, pos, bias, type) {
    if (type == 1) {
      return dist_EditorSelection.cursor(pos, bias);
    } else if (type == 2) {
      return groupAt(view.state, pos, bias);
    } else {
      let visual = LineView.find(view.docView, pos),
        line = view.state.doc.lineAt(visual ? visual.posAtEnd : pos);
      let from = visual ? visual.posAtStart : line.from,
        to = visual ? visual.posAtEnd : line.to;
      if (to < view.state.doc.length && to == line.to) to++;
      return dist_EditorSelection.range(from, to);
    }
  }
  let insideY = (y, rect) => y >= rect.top && y <= rect.bottom;
  let inside = (x, y, rect) => insideY(y, rect) && x >= rect.left && x <= rect.right;
  function findPositionSide(view, pos, x, y) {
    let line = LineView.find(view.docView, pos);
    if (!line) return 1;
    let off = pos - line.posAtStart;
    if (off == 0) return 1;
    if (off == line.length) return -1;
    let before = line.coordsAt(off, -1);
    if (before && inside(x, y, before)) return -1;
    let after = line.coordsAt(off, 1);
    if (after && inside(x, y, after)) return 1;
    return before && insideY(y, before) ? -1 : 1;
  }
  function queryPos(view, event) {
    let pos = view.posAtCoords({ x: event.clientX, y: event.clientY }, false);
    return { pos, bias: findPositionSide(view, pos, event.clientX, event.clientY) };
  }
  const BadMouseDetail = dist_browser.ie && dist_browser.ie_version <= 11;
  let lastMouseDown = null,
    lastMouseDownCount = 0,
    lastMouseDownTime = 0;
  function getClickType(event) {
    if (!BadMouseDetail) return event.detail;
    let last = lastMouseDown,
      lastTime = lastMouseDownTime;
    lastMouseDown = event;
    lastMouseDownTime = Date.now();
    return (lastMouseDownCount =
      !last ||
      (lastTime > Date.now() - 400 &&
        Math.abs(last.clientX - event.clientX) < 2 &&
        Math.abs(last.clientY - event.clientY) < 2)
        ? (lastMouseDownCount + 1) % 3
        : 1);
  }
  function basicMouseSelection(view, event) {
    let start = queryPos(view, event),
      type = getClickType(event);
    let startSel = view.state.selection;
    let last = start,
      lastEvent = event;
    return {
      update(update) {
        if (update.docChanged) {
          if (start) start.pos = update.changes.mapPos(start.pos);
          startSel = startSel.map(update.changes);
          lastEvent = null;
        }
      },
      get(event, extend, multiple) {
        let cur;
        if (lastEvent && event.clientX == lastEvent.clientX && event.clientY == lastEvent.clientY)
          cur = last;
        else {
          cur = last = queryPos(view, event);
          lastEvent = event;
        }
        if (!cur || !start) return startSel;
        let range = rangeForClick(view, cur.pos, cur.bias, type);
        if (start.pos != cur.pos && !extend) {
          let startRange = rangeForClick(view, start.pos, start.bias, type);
          let from = Math.min(startRange.from, range.from),
            to = Math.max(startRange.to, range.to);
          range =
            from < range.from
              ? dist_EditorSelection.range(from, to)
              : dist_EditorSelection.range(to, from);
        }
        if (extend) return startSel.replaceRange(startSel.main.extend(range.from, range.to));
        else if (multiple && startSel.ranges.length > 1 && startSel.ranges.some(r => r.eq(range)))
          return removeRange(startSel, range);
        else if (multiple) return startSel.addRange(range);
        else return dist_EditorSelection.create([range]);
      },
    };
  }
  function removeRange(sel, range) {
    for (let i = 0; ; i++) {
      if (sel.ranges[i].eq(range))
        return dist_EditorSelection.create(
          sel.ranges.slice(0, i).concat(sel.ranges.slice(i + 1)),
          sel.mainIndex == i ? 0 : sel.mainIndex - (sel.mainIndex > i ? 1 : 0),
        );
    }
  }
  handlers.dragstart = (view, event) => {
    let {
      selection: { main },
    } = view.state;
    let { mouseSelection } = view.inputState;
    if (mouseSelection) mouseSelection.dragging = main;
    if (event.dataTransfer) {
      event.dataTransfer.setData('Text', view.state.sliceDoc(main.from, main.to));
      event.dataTransfer.effectAllowed = 'copyMove';
    }
  };
  function dropText(view, event, text, direct) {
    if (!text) return;
    let dropPos = view.posAtCoords({ x: event.clientX, y: event.clientY }, false);
    event.preventDefault();
    let { mouseSelection } = view.inputState;
    let del =
      direct && mouseSelection && mouseSelection.dragging && mouseSelection.dragMove
        ? { from: mouseSelection.dragging.from, to: mouseSelection.dragging.to }
        : null;
    let ins = { from: dropPos, insert: text };
    let changes = view.state.changes(del ? [del, ins] : ins);
    view.focus();
    view.dispatch({
      changes,
      selection: { anchor: changes.mapPos(dropPos, -1), head: changes.mapPos(dropPos, 1) },
      userEvent: del ? 'move.drop' : 'input.drop',
    });
  }
  handlers.drop = (view, event) => {
    if (!event.dataTransfer) return;
    if (view.state.readOnly) return event.preventDefault();
    let files = event.dataTransfer.files;
    if (files && files.length) {
      event.preventDefault();
      let text = Array(files.length),
        read = 0;
      let finishFile = () => {
        if (++read == files.length)
          dropText(view, event, text.filter(s => s != null).join(view.state.lineBreak), false);
      };
      for (let i = 0; i < files.length; i++) {
        let reader = new FileReader();
        reader.onerror = finishFile;
        reader.onload = () => {
          if (!/[\x00-\x08\x0e-\x1f]{2}/.test(reader.result)) text[i] = reader.result;
          finishFile();
        };
        reader.readAsText(files[i]);
      }
    } else {
      dropText(view, event, event.dataTransfer.getData('Text'), true);
    }
  };
  handlers.paste = (view, event) => {
    if (view.state.readOnly) return event.preventDefault();
    view.observer.flush();
    let data = brokenClipboardAPI ? null : event.clipboardData;
    if (data) {
      doPaste(view, data.getData('text/plain'));
      event.preventDefault();
    } else {
      capturePaste(view);
    }
  };
  function captureCopy(view, text) {
    let parent = view.dom.parentNode;
    if (!parent) return;
    let target = parent.appendChild(document.createElement('textarea'));
    target.style.cssText = 'position: fixed; left: -10000px; top: 10px';
    target.value = text;
    target.focus();
    target.selectionEnd = text.length;
    target.selectionStart = 0;
    setTimeout(() => {
      target.remove();
      view.focus();
    }, 50);
  }
  function copiedRange(state) {
    let content = [],
      ranges = [],
      linewise = false;
    for (let range of state.selection.ranges)
      if (!range.empty) {
        content.push(state.sliceDoc(range.from, range.to));
        ranges.push(range);
      }
    if (!content.length) {
      let upto = -1;
      for (let { from } of state.selection.ranges) {
        let line = state.doc.lineAt(from);
        if (line.number > upto) {
          content.push(line.text);
          ranges.push({ from: line.from, to: Math.min(state.doc.length, line.to + 1) });
        }
        upto = line.number;
      }
      linewise = true;
    }
    return { text: content.join(state.lineBreak), ranges, linewise };
  }
  let lastLinewiseCopy = null;
  handlers.copy = handlers.cut = (view, event) => {
    let { text, ranges, linewise } = copiedRange(view.state);
    if (!text && !linewise) return;
    lastLinewiseCopy = linewise ? text : null;
    let data = brokenClipboardAPI ? null : event.clipboardData;
    if (data) {
      event.preventDefault();
      data.clearData();
      data.setData('text/plain', text);
    } else {
      captureCopy(view, text);
    }
    if (event.type == 'cut' && !view.state.readOnly)
      view.dispatch({
        changes: ranges,
        scrollIntoView: true,
        userEvent: 'delete.cut',
      });
  };
  function updateForFocusChange(view) {
    setTimeout(() => {
      if (view.hasFocus != view.inputState.notifiedFocused) view.update([]);
    }, 10);
  }
  handlers.focus = view => {
    view.inputState.lastFocusTime = Date.now();
    if (
      !view.scrollDOM.scrollTop &&
      (view.inputState.lastScrollTop || view.inputState.lastScrollLeft)
    ) {
      view.scrollDOM.scrollTop = view.inputState.lastScrollTop;
      view.scrollDOM.scrollLeft = view.inputState.lastScrollLeft;
    }
    updateForFocusChange(view);
  };
  handlers.blur = view => {
    view.observer.clearSelectionRange();
    updateForFocusChange(view);
  };
  function forceClearComposition(view, rapid) {
    if (view.docView.compositionDeco.size) {
      view.inputState.rapidCompositionStart = rapid;
      try {
        view.update([]);
      } finally {
        view.inputState.rapidCompositionStart = false;
      }
    }
  }
  handlers.compositionstart = handlers.compositionupdate = view => {
    if (view.inputState.compositionFirstChange == null)
      view.inputState.compositionFirstChange = true;
    if (view.inputState.composing < 0) {
      view.inputState.composing = 0;
      if (view.docView.compositionDeco.size) {
        view.observer.flush();
        forceClearComposition(view, true);
      }
    }
  };
  handlers.compositionend = view => {
    view.inputState.composing = -1;
    view.inputState.compositionEndedAt = Date.now();
    view.inputState.compositionFirstChange = null;
    setTimeout(() => {
      if (view.inputState.composing < 0) forceClearComposition(view, false);
    }, 50);
  };
  handlers.contextmenu = view => {
    view.inputState.lastContextMenu = Date.now();
  };
  handlers.beforeinput = (view, event) => {
    var _a;
    let pending;
    if (
      dist_browser.chrome &&
      dist_browser.android &&
      (pending = PendingKeys.find(key => key.inputType == event.inputType))
    ) {
      view.observer.delayAndroidKey(pending.key, pending.keyCode);
      if (pending.key == 'Backspace' || pending.key == 'Delete') {
        let startViewHeight =
          ((_a = window.visualViewport) === null || _a === void 0 ? void 0 : _a.height) || 0;
        setTimeout(() => {
          var _a;
          if (
            (((_a = window.visualViewport) === null || _a === void 0 ? void 0 : _a.height) || 0) >
              startViewHeight + 10 &&
            view.hasFocus
          ) {
            view.contentDOM.blur();
            view.focus();
          }
        }, 100);
      }
    }
  };

  const wrappingWhiteSpace = ['pre-wrap', 'normal', 'pre-line', 'break-spaces'];
  class HeightOracle {
    constructor() {
      this.doc = dist_Text.empty;
      this.lineWrapping = false;
      this.heightSamples = {};
      this.lineHeight = 14;
      this.charWidth = 7;
      this.lineLength = 30;
      this.heightChanged = false;
    }
    heightForGap(from, to) {
      let lines = this.doc.lineAt(to).number - this.doc.lineAt(from).number + 1;
      if (this.lineWrapping)
        lines += Math.ceil((to - from - lines * this.lineLength * 0.5) / this.lineLength);
      return this.lineHeight * lines;
    }
    heightForLine(length) {
      if (!this.lineWrapping) return this.lineHeight;
      let lines = 1 + Math.max(0, Math.ceil((length - this.lineLength) / (this.lineLength - 5)));
      return lines * this.lineHeight;
    }
    setDoc(doc) {
      this.doc = doc;
      return this;
    }
    mustRefreshForWrapping(whiteSpace) {
      return wrappingWhiteSpace.indexOf(whiteSpace) > -1 != this.lineWrapping;
    }
    mustRefreshForHeights(lineHeights) {
      let newHeight = false;
      for (let i = 0; i < lineHeights.length; i++) {
        let h = lineHeights[i];
        if (h < 0) {
          i++;
        } else if (!this.heightSamples[Math.floor(h * 10)]) {
          newHeight = true;
          this.heightSamples[Math.floor(h * 10)] = true;
        }
      }
      return newHeight;
    }
    refresh(whiteSpace, lineHeight, charWidth, lineLength, knownHeights) {
      let lineWrapping = wrappingWhiteSpace.indexOf(whiteSpace) > -1;
      let changed =
        Math.round(lineHeight) != Math.round(this.lineHeight) || this.lineWrapping != lineWrapping;
      this.lineWrapping = lineWrapping;
      this.lineHeight = lineHeight;
      this.charWidth = charWidth;
      this.lineLength = lineLength;
      if (changed) {
        this.heightSamples = {};
        for (let i = 0; i < knownHeights.length; i++) {
          let h = knownHeights[i];
          if (h < 0) i++;
          else this.heightSamples[Math.floor(h * 10)] = true;
        }
      }
      return changed;
    }
  }
  class MeasuredHeights {
    constructor(from, heights) {
      this.from = from;
      this.heights = heights;
      this.index = 0;
    }
    get more() {
      return this.index < this.heights.length;
    }
  }
  class BlockInfo {
    constructor(from, length, top, height, type) {
      this.from = from;
      this.length = length;
      this.top = top;
      this.height = height;
      this.type = type;
    }
    get to() {
      return this.from + this.length;
    }
    get bottom() {
      return this.top + this.height;
    }
    join(other) {
      let detail = (Array.isArray(this.type) ? this.type : [this]).concat(
        Array.isArray(other.type) ? other.type : [other],
      );
      return new BlockInfo(
        this.from,
        this.length + other.length,
        this.top,
        this.height + other.height,
        detail,
      );
    }
  }
  var QueryType = (function (QueryType) {
    QueryType[(QueryType['ByPos'] = 0)] = 'ByPos';
    QueryType[(QueryType['ByHeight'] = 1)] = 'ByHeight';
    QueryType[(QueryType['ByPosNoHeight'] = 2)] = 'ByPosNoHeight';
    return QueryType;
  })(QueryType || (QueryType = {}));
  const Epsilon = 1e-3;
  class HeightMap {
    constructor(length, height, flags = 2) {
      this.length = length;
      this.height = height;
      this.flags = flags;
    }
    get outdated() {
      return (this.flags & 2) > 0;
    }
    set outdated(value) {
      this.flags = (value ? 2 : 0) | (this.flags & ~2);
    }
    setHeight(oracle, height) {
      if (this.height != height) {
        if (Math.abs(this.height - height) > Epsilon) oracle.heightChanged = true;
        this.height = height;
      }
    }
    replace(_from, _to, nodes) {
      return HeightMap.of(nodes);
    }
    decomposeLeft(_to, result) {
      result.push(this);
    }
    decomposeRight(_from, result) {
      result.push(this);
    }
    applyChanges(decorations, oldDoc, oracle, changes) {
      let me = this;
      for (let i = changes.length - 1; i >= 0; i--) {
        let { fromA, toA, fromB, toB } = changes[i];
        let start = me.lineAt(fromA, QueryType.ByPosNoHeight, oldDoc, 0, 0);
        let end = start.to >= toA ? start : me.lineAt(toA, QueryType.ByPosNoHeight, oldDoc, 0, 0);
        toB += end.to - toA;
        toA = end.to;
        while (i > 0 && start.from <= changes[i - 1].toA) {
          fromA = changes[i - 1].fromA;
          fromB = changes[i - 1].fromB;
          i--;
          if (fromA < start.from) start = me.lineAt(fromA, QueryType.ByPosNoHeight, oldDoc, 0, 0);
        }
        fromB += start.from - fromA;
        fromA = start.from;
        let nodes = NodeBuilder.build(oracle, decorations, fromB, toB);
        me = me.replace(fromA, toA, nodes);
      }
      return me.updateHeight(oracle, 0);
    }
    static empty() {
      return new HeightMapText(0, 0);
    }
    static of(nodes) {
      if (nodes.length == 1) return nodes[0];
      let i = 0,
        j = nodes.length,
        before = 0,
        after = 0;
      for (;;) {
        if (i == j) {
          if (before > after * 2) {
            let split = nodes[i - 1];
            if (split.break) nodes.splice(--i, 1, split.left, null, split.right);
            else nodes.splice(--i, 1, split.left, split.right);
            j += 1 + split.break;
            before -= split.size;
          } else if (after > before * 2) {
            let split = nodes[j];
            if (split.break) nodes.splice(j, 1, split.left, null, split.right);
            else nodes.splice(j, 1, split.left, split.right);
            j += 2 + split.break;
            after -= split.size;
          } else {
            break;
          }
        } else if (before < after) {
          let next = nodes[i++];
          if (next) before += next.size;
        } else {
          let next = nodes[--j];
          if (next) after += next.size;
        }
      }
      let brk = 0;
      if (nodes[i - 1] == null) {
        brk = 1;
        i--;
      } else if (nodes[i] == null) {
        brk = 1;
        j++;
      }
      return new HeightMapBranch(
        HeightMap.of(nodes.slice(0, i)),
        brk,
        HeightMap.of(nodes.slice(j)),
      );
    }
  }
  HeightMap.prototype.size = 1;
  class HeightMapBlock extends HeightMap {
    constructor(length, height, type) {
      super(length, height);
      this.type = type;
    }
    blockAt(_height, _doc, top, offset) {
      return new BlockInfo(offset, this.length, top, this.height, this.type);
    }
    lineAt(_value, _type, doc, top, offset) {
      return this.blockAt(0, doc, top, offset);
    }
    forEachLine(from, to, doc, top, offset, f) {
      if (from <= offset + this.length && to >= offset) f(this.blockAt(0, doc, top, offset));
    }
    updateHeight(oracle, offset = 0, _force = false, measured) {
      if (measured && measured.from <= offset && measured.more)
        this.setHeight(oracle, measured.heights[measured.index++]);
      this.outdated = false;
      return this;
    }
    toString() {
      return `block(${this.length})`;
    }
  }
  class HeightMapText extends HeightMapBlock {
    constructor(length, height) {
      super(length, height, BlockType.Text);
      this.collapsed = 0;
      this.widgetHeight = 0;
    }
    replace(_from, _to, nodes) {
      let node = nodes[0];
      if (
        nodes.length == 1 &&
        (node instanceof HeightMapText || (node instanceof HeightMapGap && node.flags & 4)) &&
        Math.abs(this.length - node.length) < 10
      ) {
        if (node instanceof HeightMapGap) node = new HeightMapText(node.length, this.height);
        else node.height = this.height;
        if (!this.outdated) node.outdated = false;
        return node;
      } else {
        return HeightMap.of(nodes);
      }
    }
    updateHeight(oracle, offset = 0, force = false, measured) {
      if (measured && measured.from <= offset && measured.more)
        this.setHeight(oracle, measured.heights[measured.index++]);
      else if (force || this.outdated)
        this.setHeight(
          oracle,
          Math.max(this.widgetHeight, oracle.heightForLine(this.length - this.collapsed)),
        );
      this.outdated = false;
      return this;
    }
    toString() {
      return `line(${this.length}${this.collapsed ? -this.collapsed : ''}${
        this.widgetHeight ? ':' + this.widgetHeight : ''
      })`;
    }
  }
  class HeightMapGap extends HeightMap {
    constructor(length) {
      super(length, 0);
    }
    lines(doc, offset) {
      let firstLine = doc.lineAt(offset).number,
        lastLine = doc.lineAt(offset + this.length).number;
      return { firstLine, lastLine, lineHeight: this.height / (lastLine - firstLine + 1) };
    }
    blockAt(height, doc, top, offset) {
      let { firstLine, lastLine, lineHeight } = this.lines(doc, offset);
      let line = Math.max(
        0,
        Math.min(lastLine - firstLine, Math.floor((height - top) / lineHeight)),
      );
      let { from, length } = doc.line(firstLine + line);
      return new BlockInfo(from, length, top + lineHeight * line, lineHeight, BlockType.Text);
    }
    lineAt(value, type, doc, top, offset) {
      if (type == QueryType.ByHeight) return this.blockAt(value, doc, top, offset);
      if (type == QueryType.ByPosNoHeight) {
        let { from, to } = doc.lineAt(value);
        return new BlockInfo(from, to - from, 0, 0, BlockType.Text);
      }
      let { firstLine, lineHeight } = this.lines(doc, offset);
      let { from, length, number } = doc.lineAt(value);
      return new BlockInfo(
        from,
        length,
        top + lineHeight * (number - firstLine),
        lineHeight,
        BlockType.Text,
      );
    }
    forEachLine(from, to, doc, top, offset, f) {
      let { firstLine, lineHeight } = this.lines(doc, offset);
      for (
        let pos = Math.max(from, offset), end = Math.min(offset + this.length, to);
        pos <= end;

      ) {
        let line = doc.lineAt(pos);
        if (pos == from) top += lineHeight * (line.number - firstLine);
        f(new BlockInfo(line.from, line.length, top, lineHeight, BlockType.Text));
        top += lineHeight;
        pos = line.to + 1;
      }
    }
    replace(from, to, nodes) {
      let after = this.length - to;
      if (after > 0) {
        let last = nodes[nodes.length - 1];
        if (last instanceof HeightMapGap)
          nodes[nodes.length - 1] = new HeightMapGap(last.length + after);
        else nodes.push(null, new HeightMapGap(after - 1));
      }
      if (from > 0) {
        let first = nodes[0];
        if (first instanceof HeightMapGap) nodes[0] = new HeightMapGap(from + first.length);
        else nodes.unshift(new HeightMapGap(from - 1), null);
      }
      return HeightMap.of(nodes);
    }
    decomposeLeft(to, result) {
      result.push(new HeightMapGap(to - 1), null);
    }
    decomposeRight(from, result) {
      result.push(null, new HeightMapGap(this.length - from - 1));
    }
    updateHeight(oracle, offset = 0, force = false, measured) {
      let end = offset + this.length;
      if (measured && measured.from <= offset + this.length && measured.more) {
        let nodes = [],
          pos = Math.max(offset, measured.from),
          singleHeight = -1;
        let wasChanged = oracle.heightChanged;
        if (measured.from > offset)
          nodes.push(new HeightMapGap(measured.from - offset - 1).updateHeight(oracle, offset));
        while (pos <= end && measured.more) {
          let len = oracle.doc.lineAt(pos).length;
          if (nodes.length) nodes.push(null);
          let height = measured.heights[measured.index++];
          if (singleHeight == -1) singleHeight = height;
          else if (Math.abs(height - singleHeight) >= Epsilon) singleHeight = -2;
          let line = new HeightMapText(len, height);
          line.outdated = false;
          nodes.push(line);
          pos += len + 1;
        }
        if (pos <= end) nodes.push(null, new HeightMapGap(end - pos).updateHeight(oracle, pos));
        let result = HeightMap.of(nodes);
        oracle.heightChanged =
          wasChanged ||
          singleHeight < 0 ||
          Math.abs(result.height - this.height) >= Epsilon ||
          Math.abs(singleHeight - this.lines(oracle.doc, offset).lineHeight) >= Epsilon;
        return result;
      } else if (force || this.outdated) {
        this.setHeight(oracle, oracle.heightForGap(offset, offset + this.length));
        this.outdated = false;
      }
      return this;
    }
    toString() {
      return `gap(${this.length})`;
    }
  }
  class HeightMapBranch extends HeightMap {
    constructor(left, brk, right) {
      super(
        left.length + brk + right.length,
        left.height + right.height,
        brk | (left.outdated || right.outdated ? 2 : 0),
      );
      this.left = left;
      this.right = right;
      this.size = left.size + right.size;
    }
    get break() {
      return this.flags & 1;
    }
    blockAt(height, doc, top, offset) {
      let mid = top + this.left.height;
      return height < mid
        ? this.left.blockAt(height, doc, top, offset)
        : this.right.blockAt(height, doc, mid, offset + this.left.length + this.break);
    }
    lineAt(value, type, doc, top, offset) {
      let rightTop = top + this.left.height,
        rightOffset = offset + this.left.length + this.break;
      let left = type == QueryType.ByHeight ? value < rightTop : value < rightOffset;
      let base = left
        ? this.left.lineAt(value, type, doc, top, offset)
        : this.right.lineAt(value, type, doc, rightTop, rightOffset);
      if (this.break || (left ? base.to < rightOffset : base.from > rightOffset)) return base;
      let subQuery = type == QueryType.ByPosNoHeight ? QueryType.ByPosNoHeight : QueryType.ByPos;
      if (left)
        return base.join(this.right.lineAt(rightOffset, subQuery, doc, rightTop, rightOffset));
      else return this.left.lineAt(rightOffset, subQuery, doc, top, offset).join(base);
    }
    forEachLine(from, to, doc, top, offset, f) {
      let rightTop = top + this.left.height,
        rightOffset = offset + this.left.length + this.break;
      if (this.break) {
        if (from < rightOffset) this.left.forEachLine(from, to, doc, top, offset, f);
        if (to >= rightOffset) this.right.forEachLine(from, to, doc, rightTop, rightOffset, f);
      } else {
        let mid = this.lineAt(rightOffset, QueryType.ByPos, doc, top, offset);
        if (from < mid.from) this.left.forEachLine(from, mid.from - 1, doc, top, offset, f);
        if (mid.to >= from && mid.from <= to) f(mid);
        if (to > mid.to) this.right.forEachLine(mid.to + 1, to, doc, rightTop, rightOffset, f);
      }
    }
    replace(from, to, nodes) {
      let rightStart = this.left.length + this.break;
      if (to < rightStart) return this.balanced(this.left.replace(from, to, nodes), this.right);
      if (from > this.left.length)
        return this.balanced(
          this.left,
          this.right.replace(from - rightStart, to - rightStart, nodes),
        );
      let result = [];
      if (from > 0) this.decomposeLeft(from, result);
      let left = result.length;
      for (let node of nodes) result.push(node);
      if (from > 0) mergeGaps(result, left - 1);
      if (to < this.length) {
        let right = result.length;
        this.decomposeRight(to, result);
        mergeGaps(result, right);
      }
      return HeightMap.of(result);
    }
    decomposeLeft(to, result) {
      let left = this.left.length;
      if (to <= left) return this.left.decomposeLeft(to, result);
      result.push(this.left);
      if (this.break) {
        left++;
        if (to >= left) result.push(null);
      }
      if (to > left) this.right.decomposeLeft(to - left, result);
    }
    decomposeRight(from, result) {
      let left = this.left.length,
        right = left + this.break;
      if (from >= right) return this.right.decomposeRight(from - right, result);
      if (from < left) this.left.decomposeRight(from, result);
      if (this.break && from < right) result.push(null);
      result.push(this.right);
    }
    balanced(left, right) {
      if (left.size > 2 * right.size || right.size > 2 * left.size)
        return HeightMap.of(this.break ? [left, null, right] : [left, right]);
      this.left = left;
      this.right = right;
      this.height = left.height + right.height;
      this.outdated = left.outdated || right.outdated;
      this.size = left.size + right.size;
      this.length = left.length + this.break + right.length;
      return this;
    }
    updateHeight(oracle, offset = 0, force = false, measured) {
      let { left, right } = this,
        rightStart = offset + left.length + this.break,
        rebalance = null;
      if (measured && measured.from <= offset + left.length && measured.more)
        rebalance = left = left.updateHeight(oracle, offset, force, measured);
      else left.updateHeight(oracle, offset, force);
      if (measured && measured.from <= rightStart + right.length && measured.more)
        rebalance = right = right.updateHeight(oracle, rightStart, force, measured);
      else right.updateHeight(oracle, rightStart, force);
      if (rebalance) return this.balanced(left, right);
      this.height = this.left.height + this.right.height;
      this.outdated = false;
      return this;
    }
    toString() {
      return this.left + (this.break ? ' ' : '-') + this.right;
    }
  }
  function mergeGaps(nodes, around) {
    let before, after;
    if (
      nodes[around] == null &&
      (before = nodes[around - 1]) instanceof HeightMapGap &&
      (after = nodes[around + 1]) instanceof HeightMapGap
    )
      nodes.splice(around - 1, 3, new HeightMapGap(before.length + 1 + after.length));
  }
  const relevantWidgetHeight = 5;
  class NodeBuilder {
    constructor(pos, oracle) {
      this.pos = pos;
      this.oracle = oracle;
      this.nodes = [];
      this.lineStart = -1;
      this.lineEnd = -1;
      this.covering = null;
      this.writtenTo = pos;
    }
    get isCovered() {
      return this.covering && this.nodes[this.nodes.length - 1] == this.covering;
    }
    span(_from, to) {
      if (this.lineStart > -1) {
        let end = Math.min(to, this.lineEnd),
          last = this.nodes[this.nodes.length - 1];
        if (last instanceof HeightMapText) last.length += end - this.pos;
        else if (end > this.pos || !this.isCovered)
          this.nodes.push(new HeightMapText(end - this.pos, -1));
        this.writtenTo = end;
        if (to > end) {
          this.nodes.push(null);
          this.writtenTo++;
          this.lineStart = -1;
        }
      }
      this.pos = to;
    }
    point(from, to, deco) {
      if (from < to || deco.heightRelevant) {
        let height = deco.widget ? deco.widget.estimatedHeight : 0;
        if (height < 0) height = this.oracle.lineHeight;
        let len = to - from;
        if (deco.block) {
          this.addBlock(new HeightMapBlock(len, height, deco.type));
        } else if (len || height >= relevantWidgetHeight) {
          this.addLineDeco(height, len);
        }
      } else if (to > from) {
        this.span(from, to);
      }
      if (this.lineEnd > -1 && this.lineEnd < this.pos)
        this.lineEnd = this.oracle.doc.lineAt(this.pos).to;
    }
    enterLine() {
      if (this.lineStart > -1) return;
      let { from, to } = this.oracle.doc.lineAt(this.pos);
      this.lineStart = from;
      this.lineEnd = to;
      if (this.writtenTo < from) {
        if (this.writtenTo < from - 1 || this.nodes[this.nodes.length - 1] == null)
          this.nodes.push(this.blankContent(this.writtenTo, from - 1));
        this.nodes.push(null);
      }
      if (this.pos > from) this.nodes.push(new HeightMapText(this.pos - from, -1));
      this.writtenTo = this.pos;
    }
    blankContent(from, to) {
      let gap = new HeightMapGap(to - from);
      if (this.oracle.doc.lineAt(from).to == to) gap.flags |= 4;
      return gap;
    }
    ensureLine() {
      this.enterLine();
      let last = this.nodes.length ? this.nodes[this.nodes.length - 1] : null;
      if (last instanceof HeightMapText) return last;
      let line = new HeightMapText(0, -1);
      this.nodes.push(line);
      return line;
    }
    addBlock(block) {
      this.enterLine();
      if (block.type == BlockType.WidgetAfter && !this.isCovered) this.ensureLine();
      this.nodes.push(block);
      this.writtenTo = this.pos = this.pos + block.length;
      if (block.type != BlockType.WidgetBefore) this.covering = block;
    }
    addLineDeco(height, length) {
      let line = this.ensureLine();
      line.length += length;
      line.collapsed += length;
      line.widgetHeight = Math.max(line.widgetHeight, height);
      this.writtenTo = this.pos = this.pos + length;
    }
    finish(from) {
      let last = this.nodes.length == 0 ? null : this.nodes[this.nodes.length - 1];
      if (this.lineStart > -1 && !(last instanceof HeightMapText) && !this.isCovered)
        this.nodes.push(new HeightMapText(0, -1));
      else if (this.writtenTo < this.pos || last == null)
        this.nodes.push(this.blankContent(this.writtenTo, this.pos));
      let pos = from;
      for (let node of this.nodes) {
        if (node instanceof HeightMapText) node.updateHeight(this.oracle, pos);
        pos += node ? node.length : 1;
      }
      return this.nodes;
    }
    static build(oracle, decorations, from, to) {
      let builder = new NodeBuilder(from, oracle);
      dist_RangeSet.spans(decorations, from, to, builder, 0);
      return builder.finish(from);
    }
  }
  function heightRelevantDecoChanges(a, b, diff) {
    let comp = new DecorationComparator();
    dist_RangeSet.compare(a, b, diff, comp, 0);
    return comp.changes;
  }
  class DecorationComparator {
    constructor() {
      this.changes = [];
    }
    compareRange() {}
    comparePoint(from, to, a, b) {
      if (from < to || (a && a.heightRelevant) || (b && b.heightRelevant))
        addRange(from, to, this.changes, 5);
    }
  }

  function visiblePixelRange(dom, paddingTop) {
    let rect = dom.getBoundingClientRect();
    let left = Math.max(0, rect.left),
      right = Math.min(innerWidth, rect.right);
    let top = Math.max(0, rect.top),
      bottom = Math.min(innerHeight, rect.bottom);
    let body = dom.ownerDocument.body;
    for (let parent = dom.parentNode; parent && parent != body; ) {
      if (parent.nodeType == 1) {
        let elt = parent;
        let style = window.getComputedStyle(elt);
        if (
          (elt.scrollHeight > elt.clientHeight || elt.scrollWidth > elt.clientWidth) &&
          style.overflow != 'visible'
        ) {
          let parentRect = elt.getBoundingClientRect();
          left = Math.max(left, parentRect.left);
          right = Math.min(right, parentRect.right);
          top = Math.max(top, parentRect.top);
          bottom =
            parent == dom.parentNode ? parentRect.bottom : Math.min(bottom, parentRect.bottom);
        }
        parent =
          style.position == 'absolute' || style.position == 'fixed'
            ? elt.offsetParent
            : elt.parentNode;
      } else if (parent.nodeType == 11) {
        parent = parent.host;
      } else {
        break;
      }
    }
    return {
      left: left - rect.left,
      right: Math.max(left, right) - rect.left,
      top: top - (rect.top + paddingTop),
      bottom: Math.max(top, bottom) - (rect.top + paddingTop),
    };
  }
  function fullPixelRange(dom, paddingTop) {
    let rect = dom.getBoundingClientRect();
    return {
      left: 0,
      right: rect.right - rect.left,
      top: paddingTop,
      bottom: rect.bottom - (rect.top + paddingTop),
    };
  }
  class LineGap {
    constructor(from, to, size) {
      this.from = from;
      this.to = to;
      this.size = size;
    }
    static same(a, b) {
      if (a.length != b.length) return false;
      for (let i = 0; i < a.length; i++) {
        let gA = a[i],
          gB = b[i];
        if (gA.from != gB.from || gA.to != gB.to || gA.size != gB.size) return false;
      }
      return true;
    }
    draw(wrapping) {
      return Decoration.replace({ widget: new LineGapWidget(this.size, wrapping) }).range(
        this.from,
        this.to,
      );
    }
  }
  class LineGapWidget extends WidgetType {
    constructor(size, vertical) {
      super();
      this.size = size;
      this.vertical = vertical;
    }
    eq(other) {
      return other.size == this.size && other.vertical == this.vertical;
    }
    toDOM() {
      let elt = document.createElement('div');
      if (this.vertical) {
        elt.style.height = this.size + 'px';
      } else {
        elt.style.width = this.size + 'px';
        elt.style.height = '2px';
        elt.style.display = 'inline-block';
      }
      return elt;
    }
    get estimatedHeight() {
      return this.vertical ? this.size : -1;
    }
  }
  class ViewState {
    constructor(state) {
      this.state = state;
      this.pixelViewport = { left: 0, right: window.innerWidth, top: 0, bottom: 0 };
      this.inView = true;
      this.paddingTop = 0;
      this.paddingBottom = 0;
      this.contentDOMWidth = 0;
      this.contentDOMHeight = 0;
      this.editorHeight = 0;
      this.editorWidth = 0;
      this.heightOracle = new HeightOracle();
      this.scaler = IdScaler;
      this.scrollTarget = null;
      this.printing = false;
      this.mustMeasureContent = true;
      this.defaultTextDirection = Direction.RTL;
      this.visibleRanges = [];
      this.mustEnforceCursorAssoc = false;
      this.stateDeco = state.facet(decorations).filter(d => typeof d != 'function');
      this.heightMap = HeightMap.empty().applyChanges(
        this.stateDeco,
        dist_Text.empty,
        this.heightOracle.setDoc(state.doc),
        [new ChangedRange(0, 0, 0, state.doc.length)],
      );
      this.viewport = this.getViewport(0, null);
      this.updateViewportLines();
      this.updateForViewport();
      this.lineGaps = this.ensureLineGaps([]);
      this.lineGapDeco = Decoration.set(this.lineGaps.map(gap => gap.draw(false)));
      this.computeVisibleRanges();
    }
    updateForViewport() {
      let viewports = [this.viewport],
        { main } = this.state.selection;
      for (let i = 0; i <= 1; i++) {
        let pos = i ? main.head : main.anchor;
        if (!viewports.some(({ from, to }) => pos >= from && pos <= to)) {
          let { from, to } = this.lineBlockAt(pos);
          viewports.push(new Viewport(from, to));
        }
      }
      this.viewports = viewports.sort((a, b) => a.from - b.from);
      this.scaler =
        this.heightMap.height <= 7000000
          ? IdScaler
          : new BigScaler(this.heightOracle.doc, this.heightMap, this.viewports);
    }
    updateViewportLines() {
      this.viewportLines = [];
      this.heightMap.forEachLine(
        this.viewport.from,
        this.viewport.to,
        this.state.doc,
        0,
        0,
        block => {
          this.viewportLines.push(this.scaler.scale == 1 ? block : scaleBlock(block, this.scaler));
        },
      );
    }
    update(update, scrollTarget = null) {
      this.state = update.state;
      let prevDeco = this.stateDeco;
      this.stateDeco = this.state.facet(decorations).filter(d => typeof d != 'function');
      let contentChanges = update.changedRanges;
      let heightChanges = ChangedRange.extendWithRanges(
        contentChanges,
        heightRelevantDecoChanges(
          prevDeco,
          this.stateDeco,
          update ? update.changes : ChangeSet.empty(this.state.doc.length),
        ),
      );
      let prevHeight = this.heightMap.height;
      this.heightMap = this.heightMap.applyChanges(
        this.stateDeco,
        update.startState.doc,
        this.heightOracle.setDoc(this.state.doc),
        heightChanges,
      );
      if (this.heightMap.height != prevHeight) update.flags |= 2;
      let viewport = heightChanges.length
        ? this.mapViewport(this.viewport, update.changes)
        : this.viewport;
      if (
        (scrollTarget &&
          (scrollTarget.range.head < viewport.from || scrollTarget.range.head > viewport.to)) ||
        !this.viewportIsAppropriate(viewport)
      )
        viewport = this.getViewport(0, scrollTarget);
      let updateLines =
        !update.changes.empty ||
        update.flags & 2 ||
        viewport.from != this.viewport.from ||
        viewport.to != this.viewport.to;
      this.viewport = viewport;
      this.updateForViewport();
      if (updateLines) this.updateViewportLines();
      if (this.lineGaps.length || this.viewport.to - this.viewport.from > 4000)
        this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps, update.changes)));
      update.flags |= this.computeVisibleRanges();
      if (scrollTarget) this.scrollTarget = scrollTarget;
      if (
        !this.mustEnforceCursorAssoc &&
        update.selectionSet &&
        update.view.lineWrapping &&
        update.state.selection.main.empty &&
        update.state.selection.main.assoc
      )
        this.mustEnforceCursorAssoc = true;
    }
    measure(view) {
      let dom = view.contentDOM,
        style = window.getComputedStyle(dom);
      let oracle = this.heightOracle;
      let whiteSpace = style.whiteSpace;
      this.defaultTextDirection = style.direction == 'rtl' ? Direction.RTL : Direction.LTR;
      let refresh = this.heightOracle.mustRefreshForWrapping(whiteSpace);
      let measureContent =
        refresh || this.mustMeasureContent || this.contentDOMHeight != dom.clientHeight;
      this.contentDOMHeight = dom.clientHeight;
      this.mustMeasureContent = false;
      let result = 0,
        bias = 0;
      let paddingTop = parseInt(style.paddingTop) || 0,
        paddingBottom = parseInt(style.paddingBottom) || 0;
      if (this.paddingTop != paddingTop || this.paddingBottom != paddingBottom) {
        this.paddingTop = paddingTop;
        this.paddingBottom = paddingBottom;
        result |= 8 | 2;
      }
      if (this.editorWidth != view.scrollDOM.clientWidth) {
        if (oracle.lineWrapping) measureContent = true;
        this.editorWidth = view.scrollDOM.clientWidth;
        result |= 8;
      }
      let pixelViewport = (this.printing ? fullPixelRange : visiblePixelRange)(
        dom,
        this.paddingTop,
      );
      let dTop = pixelViewport.top - this.pixelViewport.top,
        dBottom = pixelViewport.bottom - this.pixelViewport.bottom;
      this.pixelViewport = pixelViewport;
      let inView =
        this.pixelViewport.bottom > this.pixelViewport.top &&
        this.pixelViewport.right > this.pixelViewport.left;
      if (inView != this.inView) {
        this.inView = inView;
        if (inView) measureContent = true;
      }
      if (!this.inView) return 0;
      let contentWidth = dom.clientWidth;
      if (
        this.contentDOMWidth != contentWidth ||
        this.editorHeight != view.scrollDOM.clientHeight
      ) {
        this.contentDOMWidth = contentWidth;
        this.editorHeight = view.scrollDOM.clientHeight;
        result |= 8;
      }
      if (measureContent) {
        let lineHeights = view.docView.measureVisibleLineHeights(this.viewport);
        if (oracle.mustRefreshForHeights(lineHeights)) refresh = true;
        if (
          refresh ||
          (oracle.lineWrapping && Math.abs(contentWidth - this.contentDOMWidth) > oracle.charWidth)
        ) {
          let { lineHeight, charWidth } = view.docView.measureTextSize();
          refresh = oracle.refresh(
            whiteSpace,
            lineHeight,
            charWidth,
            contentWidth / charWidth,
            lineHeights,
          );
          if (refresh) {
            view.docView.minWidth = 0;
            result |= 8;
          }
        }
        if (dTop > 0 && dBottom > 0) bias = Math.max(dTop, dBottom);
        else if (dTop < 0 && dBottom < 0) bias = Math.min(dTop, dBottom);
        oracle.heightChanged = false;
        for (let vp of this.viewports) {
          let heights =
            vp.from == this.viewport.from
              ? lineHeights
              : view.docView.measureVisibleLineHeights(vp);
          this.heightMap = this.heightMap.updateHeight(
            oracle,
            0,
            refresh,
            new MeasuredHeights(vp.from, heights),
          );
        }
        if (oracle.heightChanged) result |= 2;
      }
      let viewportChange =
        !this.viewportIsAppropriate(this.viewport, bias) ||
        (this.scrollTarget &&
          (this.scrollTarget.range.head < this.viewport.from ||
            this.scrollTarget.range.head > this.viewport.to));
      if (viewportChange) this.viewport = this.getViewport(bias, this.scrollTarget);
      this.updateForViewport();
      if (result & 2 || viewportChange) this.updateViewportLines();
      if (this.lineGaps.length || this.viewport.to - this.viewport.from > 4000)
        this.updateLineGaps(this.ensureLineGaps(refresh ? [] : this.lineGaps));
      result |= this.computeVisibleRanges();
      if (this.mustEnforceCursorAssoc) {
        this.mustEnforceCursorAssoc = false;
        view.docView.enforceCursorAssoc();
      }
      return result;
    }
    get visibleTop() {
      return this.scaler.fromDOM(this.pixelViewport.top);
    }
    get visibleBottom() {
      return this.scaler.fromDOM(this.pixelViewport.bottom);
    }
    getViewport(bias, scrollTarget) {
      let marginTop = 0.5 - Math.max(-0.5, Math.min(0.5, bias / 1000 / 2));
      let map = this.heightMap,
        doc = this.state.doc,
        { visibleTop, visibleBottom } = this;
      let viewport = new Viewport(
        map.lineAt(visibleTop - marginTop * 1000, QueryType.ByHeight, doc, 0, 0).from,
        map.lineAt(visibleBottom + (1 - marginTop) * 1000, QueryType.ByHeight, doc, 0, 0).to,
      );
      if (scrollTarget) {
        let { head } = scrollTarget.range;
        if (head < viewport.from || head > viewport.to) {
          let viewHeight = Math.min(
            this.editorHeight,
            this.pixelViewport.bottom - this.pixelViewport.top,
          );
          let block = map.lineAt(head, QueryType.ByPos, doc, 0, 0),
            topPos;
          if (scrollTarget.y == 'center') topPos = (block.top + block.bottom) / 2 - viewHeight / 2;
          else if (
            scrollTarget.y == 'start' ||
            (scrollTarget.y == 'nearest' && head < viewport.from)
          )
            topPos = block.top;
          else topPos = block.bottom - viewHeight;
          viewport = new Viewport(
            map.lineAt(topPos - 1000 / 2, QueryType.ByHeight, doc, 0, 0).from,
            map.lineAt(topPos + viewHeight + 1000 / 2, QueryType.ByHeight, doc, 0, 0).to,
          );
        }
      }
      return viewport;
    }
    mapViewport(viewport, changes) {
      let from = changes.mapPos(viewport.from, -1),
        to = changes.mapPos(viewport.to, 1);
      return new Viewport(
        this.heightMap.lineAt(from, QueryType.ByPos, this.state.doc, 0, 0).from,
        this.heightMap.lineAt(to, QueryType.ByPos, this.state.doc, 0, 0).to,
      );
    }
    viewportIsAppropriate({ from, to }, bias = 0) {
      if (!this.inView) return true;
      let { top } = this.heightMap.lineAt(from, QueryType.ByPos, this.state.doc, 0, 0);
      let { bottom } = this.heightMap.lineAt(to, QueryType.ByPos, this.state.doc, 0, 0);
      let { visibleTop, visibleBottom } = this;
      return (
        (from == 0 || top <= visibleTop - Math.max(10, Math.min(-bias, 250))) &&
        (to == this.state.doc.length ||
          bottom >= visibleBottom + Math.max(10, Math.min(bias, 250))) &&
        top > visibleTop - 2 * 1000 &&
        bottom < visibleBottom + 2 * 1000
      );
    }
    mapLineGaps(gaps, changes) {
      if (!gaps.length || changes.empty) return gaps;
      let mapped = [];
      for (let gap of gaps)
        if (!changes.touchesRange(gap.from, gap.to))
          mapped.push(new LineGap(changes.mapPos(gap.from), changes.mapPos(gap.to), gap.size));
      return mapped;
    }
    ensureLineGaps(current) {
      let gaps = [];
      if (this.defaultTextDirection != Direction.LTR) return gaps;
      for (let line of this.viewportLines) {
        if (line.length < 4000) continue;
        let structure = lineStructure(line.from, line.to, this.stateDeco);
        if (structure.total < 4000) continue;
        let viewFrom, viewTo;
        if (this.heightOracle.lineWrapping) {
          let marginHeight = (2000 / this.heightOracle.lineLength) * this.heightOracle.lineHeight;
          viewFrom = findPosition(
            structure,
            (this.visibleTop - line.top - marginHeight) / line.height,
          );
          viewTo = findPosition(
            structure,
            (this.visibleBottom - line.top + marginHeight) / line.height,
          );
        } else {
          let totalWidth = structure.total * this.heightOracle.charWidth;
          let marginWidth = 2000 * this.heightOracle.charWidth;
          viewFrom = findPosition(structure, (this.pixelViewport.left - marginWidth) / totalWidth);
          viewTo = findPosition(structure, (this.pixelViewport.right + marginWidth) / totalWidth);
        }
        let outside = [];
        if (viewFrom > line.from) outside.push({ from: line.from, to: viewFrom });
        if (viewTo < line.to) outside.push({ from: viewTo, to: line.to });
        let sel = this.state.selection.main;
        if (sel.from >= line.from && sel.from <= line.to)
          cutRange(outside, sel.from - 10, sel.from + 10);
        if (!sel.empty && sel.to >= line.from && sel.to <= line.to)
          cutRange(outside, sel.to - 10, sel.to + 10);
        for (let { from, to } of outside)
          if (to - from > 1000) {
            gaps.push(
              find(
                current,
                gap =>
                  gap.from >= line.from &&
                  gap.to <= line.to &&
                  Math.abs(gap.from - from) < 1000 &&
                  Math.abs(gap.to - to) < 1000,
              ) || new LineGap(from, to, this.gapSize(line, from, to, structure)),
            );
          }
      }
      return gaps;
    }
    gapSize(line, from, to, structure) {
      let fraction = findFraction(structure, to) - findFraction(structure, from);
      if (this.heightOracle.lineWrapping) {
        return line.height * fraction;
      } else {
        return structure.total * this.heightOracle.charWidth * fraction;
      }
    }
    updateLineGaps(gaps) {
      if (!LineGap.same(gaps, this.lineGaps)) {
        this.lineGaps = gaps;
        this.lineGapDeco = Decoration.set(
          gaps.map(gap => gap.draw(this.heightOracle.lineWrapping)),
        );
      }
    }
    computeVisibleRanges() {
      let deco = this.stateDeco;
      if (this.lineGaps.length) deco = deco.concat(this.lineGapDeco);
      let ranges = [];
      dist_RangeSet.spans(
        deco,
        this.viewport.from,
        this.viewport.to,
        {
          span(from, to) {
            ranges.push({ from, to });
          },
          point() {},
        },
        20,
      );
      let changed =
        ranges.length != this.visibleRanges.length ||
        this.visibleRanges.some((r, i) => r.from != ranges[i].from || r.to != ranges[i].to);
      this.visibleRanges = ranges;
      return changed ? 4 : 0;
    }
    lineBlockAt(pos) {
      return (
        (pos >= this.viewport.from &&
          pos <= this.viewport.to &&
          this.viewportLines.find(b => b.from <= pos && b.to >= pos)) ||
        scaleBlock(this.heightMap.lineAt(pos, QueryType.ByPos, this.state.doc, 0, 0), this.scaler)
      );
    }
    lineBlockAtHeight(height) {
      return scaleBlock(
        this.heightMap.lineAt(
          this.scaler.fromDOM(height),
          QueryType.ByHeight,
          this.state.doc,
          0,
          0,
        ),
        this.scaler,
      );
    }
    elementAtHeight(height) {
      return scaleBlock(
        this.heightMap.blockAt(this.scaler.fromDOM(height), this.state.doc, 0, 0),
        this.scaler,
      );
    }
    get docHeight() {
      return this.scaler.toDOM(this.heightMap.height);
    }
    get contentHeight() {
      return this.docHeight + this.paddingTop + this.paddingBottom;
    }
  }
  class Viewport {
    constructor(from, to) {
      this.from = from;
      this.to = to;
    }
  }
  function lineStructure(from, to, stateDeco) {
    let ranges = [],
      pos = from,
      total = 0;
    dist_RangeSet.spans(
      stateDeco,
      from,
      to,
      {
        span() {},
        point(from, to) {
          if (from > pos) {
            ranges.push({ from: pos, to: from });
            total += from - pos;
          }
          pos = to;
        },
      },
      20,
    );
    if (pos < to) {
      ranges.push({ from: pos, to });
      total += to - pos;
    }
    return { total, ranges };
  }
  function findPosition({ total, ranges }, ratio) {
    if (ratio <= 0) return ranges[0].from;
    if (ratio >= 1) return ranges[ranges.length - 1].to;
    let dist = Math.floor(total * ratio);
    for (let i = 0; ; i++) {
      let { from, to } = ranges[i],
        size = to - from;
      if (dist <= size) return from + dist;
      dist -= size;
    }
  }
  function findFraction(structure, pos) {
    let counted = 0;
    for (let { from, to } of structure.ranges) {
      if (pos <= to) {
        counted += pos - from;
        break;
      }
      counted += to - from;
    }
    return counted / structure.total;
  }
  function cutRange(ranges, from, to) {
    for (let i = 0; i < ranges.length; i++) {
      let r = ranges[i];
      if (r.from < to && r.to > from) {
        let pieces = [];
        if (r.from < from) pieces.push({ from: r.from, to: from });
        if (r.to > to) pieces.push({ from: to, to: r.to });
        ranges.splice(i, 1, ...pieces);
        i += pieces.length - 1;
      }
    }
  }
  function find(array, f) {
    for (let val of array) if (f(val)) return val;
    return undefined;
  }
  const IdScaler = {
    toDOM(n) {
      return n;
    },
    fromDOM(n) {
      return n;
    },
    scale: 1,
  };
  class BigScaler {
    constructor(doc, heightMap, viewports) {
      let vpHeight = 0,
        base = 0,
        domBase = 0;
      this.viewports = viewports.map(({ from, to }) => {
        let top = heightMap.lineAt(from, QueryType.ByPos, doc, 0, 0).top;
        let bottom = heightMap.lineAt(to, QueryType.ByPos, doc, 0, 0).bottom;
        vpHeight += bottom - top;
        return { from, to, top, bottom, domTop: 0, domBottom: 0 };
      });
      this.scale = (7000000 - vpHeight) / (heightMap.height - vpHeight);
      for (let obj of this.viewports) {
        obj.domTop = domBase + (obj.top - base) * this.scale;
        domBase = obj.domBottom = obj.domTop + (obj.bottom - obj.top);
        base = obj.bottom;
      }
    }
    toDOM(n) {
      for (let i = 0, base = 0, domBase = 0; ; i++) {
        let vp = i < this.viewports.length ? this.viewports[i] : null;
        if (!vp || n < vp.top) return domBase + (n - base) * this.scale;
        if (n <= vp.bottom) return vp.domTop + (n - vp.top);
        base = vp.bottom;
        domBase = vp.domBottom;
      }
    }
    fromDOM(n) {
      for (let i = 0, base = 0, domBase = 0; ; i++) {
        let vp = i < this.viewports.length ? this.viewports[i] : null;
        if (!vp || n < vp.domTop) return base + (n - domBase) / this.scale;
        if (n <= vp.domBottom) return vp.top + (n - vp.domTop);
        base = vp.bottom;
        domBase = vp.domBottom;
      }
    }
  }
  function scaleBlock(block, scaler) {
    if (scaler.scale == 1) return block;
    let bTop = scaler.toDOM(block.top),
      bBottom = scaler.toDOM(block.bottom);
    return new BlockInfo(
      block.from,
      block.length,
      bTop,
      bBottom - bTop,
      Array.isArray(block.type) ? block.type.map(b => scaleBlock(b, scaler)) : block.type,
    );
  }

  const theme = Facet.define({ combine: strs => strs.join(' ') });
  const dist_darkTheme = Facet.define({ combine: values => values.indexOf(true) > -1 });
  const baseThemeID = StyleModule.newName(),
    baseLightID = StyleModule.newName(),
    baseDarkID = StyleModule.newName();
  const lightDarkIDs = { '&light': '.' + baseLightID, '&dark': '.' + baseDarkID };
  function buildTheme(main, spec, scopes) {
    return new StyleModule(spec, {
      finish(sel) {
        return /&/.test(sel)
          ? sel.replace(/&\w*/, m => {
              if (m == '&') return main;
              if (!scopes || !scopes[m]) throw new RangeError(`Unsupported selector: ${m}`);
              return scopes[m];
            })
          : main + ' ' + sel;
      },
    });
  }
  const baseTheme$1 = buildTheme(
    '.' + baseThemeID,
    {
      '&.cm-editor': {
        position: 'relative !important',
        boxSizing: 'border-box',
        '&.cm-focused': {
          outline: '1px dotted #212121',
        },
        display: 'flex !important',
        flexDirection: 'column',
      },
      '.cm-scroller': {
        display: 'flex !important',
        alignItems: 'flex-start !important',
        fontFamily: 'monospace',
        lineHeight: 1.4,
        height: '100%',
        overflowX: 'auto',
        position: 'relative',
        zIndex: 0,
      },
      '.cm-content': {
        margin: 0,
        flexGrow: 2,
        flexShrink: 0,
        minHeight: '100%',
        display: 'block',
        whiteSpace: 'pre',
        wordWrap: 'normal',
        boxSizing: 'border-box',
        padding: '4px 0',
        outline: 'none',
        '&[contenteditable=true]': {
          WebkitUserModify: 'read-write-plaintext-only',
        },
      },
      '.cm-lineWrapping': {
        whiteSpace_fallback: 'pre-wrap',
        whiteSpace: 'break-spaces',
        wordBreak: 'break-word',
        overflowWrap: 'anywhere',
        flexShrink: 1,
      },
      '&light .cm-content': { caretColor: 'black' },
      '&dark .cm-content': { caretColor: 'white' },
      '.cm-line': {
        display: 'block',
        padding: '0 2px 0 4px',
      },
      '.cm-selectionLayer': {
        zIndex: -1,
        contain: 'size style',
      },
      '.cm-selectionBackground': {
        position: 'absolute',
      },
      '&light .cm-selectionBackground': {
        background: '#d9d9d9',
      },
      '&dark .cm-selectionBackground': {
        background: '#222',
      },
      '&light.cm-focused .cm-selectionBackground': {
        background: '#d7d4f0',
      },
      '&dark.cm-focused .cm-selectionBackground': {
        background: '#233',
      },
      '.cm-cursorLayer': {
        zIndex: 100,
        contain: 'size style',
        pointerEvents: 'none',
      },
      '&.cm-focused .cm-cursorLayer': {
        animation: 'steps(1) cm-blink 1.2s infinite',
      },
      '@keyframes cm-blink': { '0%': {}, '50%': { opacity: 0 }, '100%': {} },
      '@keyframes cm-blink2': { '0%': {}, '50%': { opacity: 0 }, '100%': {} },
      '.cm-cursor, .cm-dropCursor': {
        position: 'absolute',
        borderLeft: '1.2px solid black',
        marginLeft: '-0.6px',
        pointerEvents: 'none',
      },
      '.cm-cursor': {
        display: 'none',
      },
      '&dark .cm-cursor': {
        borderLeftColor: '#444',
      },
      '&.cm-focused .cm-cursor': {
        display: 'block',
      },
      '&light .cm-activeLine': { backgroundColor: '#f3f9ff' },
      '&dark .cm-activeLine': { backgroundColor: '#223039' },
      '&light .cm-specialChar': { color: 'red' },
      '&dark .cm-specialChar': { color: '#f78' },
      '.cm-gutters': {
        flexShrink: 0,
        display: 'flex',
        height: '100%',
        boxSizing: 'border-box',
        left: 0,
        zIndex: 200,
      },
      '&light .cm-gutters': {
        backgroundColor: '#f5f5f5',
        color: '#6c6c6c',
        borderRight: '1px solid #ddd',
      },
      '&dark .cm-gutters': {
        backgroundColor: '#333338',
        color: '#ccc',
      },
      '.cm-gutter': {
        display: 'flex !important',
        flexDirection: 'column',
        flexShrink: 0,
        boxSizing: 'border-box',
        minHeight: '100%',
        overflow: 'hidden',
      },
      '.cm-gutterElement': {
        boxSizing: 'border-box',
      },
      '.cm-lineNumbers .cm-gutterElement': {
        padding: '0 3px 0 5px',
        minWidth: '20px',
        textAlign: 'right',
        whiteSpace: 'nowrap',
      },
      '&light .cm-activeLineGutter': {
        backgroundColor: '#e2f2ff',
      },
      '&dark .cm-activeLineGutter': {
        backgroundColor: '#222227',
      },
      '.cm-panels': {
        boxSizing: 'border-box',
        position: 'sticky',
        left: 0,
        right: 0,
      },
      '&light .cm-panels': {
        backgroundColor: '#f5f5f5',
        color: 'black',
      },
      '&light .cm-panels-top': {
        borderBottom: '1px solid #ddd',
      },
      '&light .cm-panels-bottom': {
        borderTop: '1px solid #ddd',
      },
      '&dark .cm-panels': {
        backgroundColor: '#333338',
        color: 'white',
      },
      '.cm-tab': {
        display: 'inline-block',
        overflow: 'hidden',
        verticalAlign: 'bottom',
      },
      '.cm-widgetBuffer': {
        verticalAlign: 'text-top',
        height: '1em',
        width: 0,
        display: 'inline',
      },
      '.cm-placeholder': {
        color: '#888',
        display: 'inline-block',
        verticalAlign: 'top',
      },
      '.cm-button': {
        verticalAlign: 'middle',
        color: 'inherit',
        fontSize: '70%',
        padding: '.2em 1em',
        borderRadius: '1px',
      },
      '&light .cm-button': {
        backgroundImage: 'linear-gradient(#eff1f5, #d9d9df)',
        border: '1px solid #888',
        '&:active': {
          backgroundImage: 'linear-gradient(#b4b4b4, #d0d3d6)',
        },
      },
      '&dark .cm-button': {
        backgroundImage: 'linear-gradient(#393939, #111)',
        border: '1px solid #888',
        '&:active': {
          backgroundImage: 'linear-gradient(#111, #333)',
        },
      },
      '.cm-textfield': {
        verticalAlign: 'middle',
        color: 'inherit',
        fontSize: '70%',
        border: '1px solid silver',
        padding: '.2em .5em',
      },
      '&light .cm-textfield': {
        backgroundColor: 'white',
      },
      '&dark .cm-textfield': {
        border: '1px solid #555',
        backgroundColor: 'inherit',
      },
    },
    lightDarkIDs,
  );

  const observeOptions = {
    childList: true,
    characterData: true,
    subtree: true,
    attributes: true,
    characterDataOldValue: true,
  };
  const useCharData = dist_browser.ie && dist_browser.ie_version <= 11;
  class DOMObserver {
    constructor(view, onChange, onScrollChanged) {
      this.view = view;
      this.onChange = onChange;
      this.onScrollChanged = onScrollChanged;
      this.active = false;
      this.selectionRange = new DOMSelectionState();
      this.selectionChanged = false;
      this.delayedFlush = -1;
      this.resizeTimeout = -1;
      this.queue = [];
      this.delayedAndroidKey = null;
      this.scrollTargets = [];
      this.intersection = null;
      this.resize = null;
      this.intersecting = false;
      this.gapIntersection = null;
      this.gaps = [];
      this.parentCheck = -1;
      this.dom = view.contentDOM;
      this.observer = new MutationObserver(mutations => {
        for (let mut of mutations) this.queue.push(mut);
        if (
          ((dist_browser.ie && dist_browser.ie_version <= 11) ||
            (dist_browser.ios && view.composing)) &&
          mutations.some(
            m =>
              (m.type == 'childList' && m.removedNodes.length) ||
              (m.type == 'characterData' && m.oldValue.length > m.target.nodeValue.length),
          )
        )
          this.flushSoon();
        else this.flush();
      });
      if (useCharData)
        this.onCharData = event => {
          this.queue.push({
            target: event.target,
            type: 'characterData',
            oldValue: event.prevValue,
          });
          this.flushSoon();
        };
      this.onSelectionChange = this.onSelectionChange.bind(this);
      this.onResize = this.onResize.bind(this);
      this.onPrint = this.onPrint.bind(this);
      this.onScroll = this.onScroll.bind(this);
      if (typeof ResizeObserver == 'function') {
        this.resize = new ResizeObserver(() => {
          if (this.view.docView.lastUpdate < Date.now() - 75) this.onResize();
        });
        this.resize.observe(view.scrollDOM);
      }
      this.win = view.dom.ownerDocument.defaultView;
      this.addWindowListeners(this.win);
      this.start();
      if (typeof IntersectionObserver == 'function') {
        this.intersection = new IntersectionObserver(entries => {
          if (this.parentCheck < 0)
            this.parentCheck = setTimeout(this.listenForScroll.bind(this), 1000);
          if (
            entries.length > 0 &&
            entries[entries.length - 1].intersectionRatio > 0 != this.intersecting
          ) {
            this.intersecting = !this.intersecting;
            if (this.intersecting != this.view.inView)
              this.onScrollChanged(document.createEvent('Event'));
          }
        }, {});
        this.intersection.observe(this.dom);
        this.gapIntersection = new IntersectionObserver(entries => {
          if (entries.length > 0 && entries[entries.length - 1].intersectionRatio > 0)
            this.onScrollChanged(document.createEvent('Event'));
        }, {});
      }
      this.listenForScroll();
      this.readSelectionRange();
    }
    onScroll(e) {
      if (this.intersecting) this.flush(false);
      this.onScrollChanged(e);
    }
    onResize() {
      if (this.resizeTimeout < 0)
        this.resizeTimeout = setTimeout(() => {
          this.resizeTimeout = -1;
          this.view.requestMeasure();
        }, 50);
    }
    onPrint() {
      this.view.viewState.printing = true;
      this.view.measure();
      setTimeout(() => {
        this.view.viewState.printing = false;
        this.view.requestMeasure();
      }, 500);
    }
    updateGaps(gaps) {
      if (
        this.gapIntersection &&
        (gaps.length != this.gaps.length || this.gaps.some((g, i) => g != gaps[i]))
      ) {
        this.gapIntersection.disconnect();
        for (let gap of gaps) this.gapIntersection.observe(gap);
        this.gaps = gaps;
      }
    }
    onSelectionChange(event) {
      if (!this.readSelectionRange() || this.delayedAndroidKey) return;
      let { view } = this,
        sel = this.selectionRange;
      if (
        view.state.facet(editable)
          ? view.root.activeElement != this.dom
          : !hasSelection(view.dom, sel)
      )
        return;
      let context = sel.anchorNode && view.docView.nearest(sel.anchorNode);
      if (context && context.ignoreEvent(event)) return;
      if (
        ((dist_browser.ie && dist_browser.ie_version <= 11) ||
          (dist_browser.android && dist_browser.chrome)) &&
        !view.state.selection.main.empty &&
        sel.focusNode &&
        isEquivalentPosition(sel.focusNode, sel.focusOffset, sel.anchorNode, sel.anchorOffset)
      )
        this.flushSoon();
      else this.flush(false);
    }
    readSelectionRange() {
      let { view } = this;
      let range =
        (dist_browser.safari &&
          view.root.nodeType == 11 &&
          deepActiveElement() == this.dom &&
          safariSelectionRangeHack(this.view)) ||
        getSelection(view.root);
      if (!range || this.selectionRange.eq(range)) return false;
      let local = hasSelection(this.dom, range);
      if (
        local &&
        !this.selectionChanged &&
        view.inputState.lastFocusTime > Date.now() - 200 &&
        view.inputState.lastTouchTime < Date.now() - 300 &&
        atElementStart(this.dom, range)
      ) {
        this.view.inputState.lastFocusTime = 0;
        view.docView.updateSelection();
        return false;
      }
      this.selectionRange.setRange(range);
      if (local) this.selectionChanged = true;
      return true;
    }
    setSelectionRange(anchor, head) {
      this.selectionRange.set(anchor.node, anchor.offset, head.node, head.offset);
      this.selectionChanged = false;
    }
    clearSelectionRange() {
      this.selectionRange.set(null, 0, null, 0);
    }
    listenForScroll() {
      this.parentCheck = -1;
      let i = 0,
        changed = null;
      for (let dom = this.dom; dom; ) {
        if (dom.nodeType == 1) {
          if (!changed && i < this.scrollTargets.length && this.scrollTargets[i] == dom) i++;
          else if (!changed) changed = this.scrollTargets.slice(0, i);
          if (changed) changed.push(dom);
          dom = dom.assignedSlot || dom.parentNode;
        } else if (dom.nodeType == 11) {
          dom = dom.host;
        } else {
          break;
        }
      }
      if (i < this.scrollTargets.length && !changed) changed = this.scrollTargets.slice(0, i);
      if (changed) {
        for (let dom of this.scrollTargets) dom.removeEventListener('scroll', this.onScroll);
        for (let dom of (this.scrollTargets = changed))
          dom.addEventListener('scroll', this.onScroll);
      }
    }
    ignore(f) {
      if (!this.active) return f();
      try {
        this.stop();
        return f();
      } finally {
        this.start();
        this.clear();
      }
    }
    start() {
      if (this.active) return;
      this.observer.observe(this.dom, observeOptions);
      if (useCharData) this.dom.addEventListener('DOMCharacterDataModified', this.onCharData);
      this.active = true;
    }
    stop() {
      if (!this.active) return;
      this.active = false;
      this.observer.disconnect();
      if (useCharData) this.dom.removeEventListener('DOMCharacterDataModified', this.onCharData);
    }
    clear() {
      this.processRecords();
      this.queue.length = 0;
      this.selectionChanged = false;
    }
    delayAndroidKey(key, keyCode) {
      if (!this.delayedAndroidKey)
        requestAnimationFrame(() => {
          let key = this.delayedAndroidKey;
          this.delayedAndroidKey = null;
          this.delayedFlush = -1;
          if (!this.flush()) dispatchKey(this.dom, key.key, key.keyCode);
        });
      if (!this.delayedAndroidKey || key == 'Enter') this.delayedAndroidKey = { key, keyCode };
    }
    flushSoon() {
      if (this.delayedFlush < 0)
        this.delayedFlush = window.setTimeout(() => {
          this.delayedFlush = -1;
          this.flush();
        }, 20);
    }
    forceFlush() {
      if (this.delayedFlush >= 0) {
        window.clearTimeout(this.delayedFlush);
        this.delayedFlush = -1;
      }
      this.flush();
    }
    processRecords() {
      let records = this.queue;
      for (let mut of this.observer.takeRecords()) records.push(mut);
      if (records.length) this.queue = [];
      let from = -1,
        to = -1,
        typeOver = false;
      for (let record of records) {
        let range = this.readMutation(record);
        if (!range) continue;
        if (range.typeOver) typeOver = true;
        if (from == -1) {
          ({ from, to } = range);
        } else {
          from = Math.min(range.from, from);
          to = Math.max(range.to, to);
        }
      }
      return { from, to, typeOver };
    }
    flush(readSelection = true) {
      if (this.delayedFlush >= 0 || this.delayedAndroidKey) return;
      if (readSelection) this.readSelectionRange();
      let { from, to, typeOver } = this.processRecords();
      let newSel = this.selectionChanged && hasSelection(this.dom, this.selectionRange);
      if (from < 0 && !newSel) return;
      this.view.inputState.lastFocusTime = 0;
      this.selectionChanged = false;
      let startState = this.view.state;
      let handled = this.onChange(from, to, typeOver);
      if (this.view.state == startState) this.view.update([]);
      return handled;
    }
    readMutation(rec) {
      let cView = this.view.docView.nearest(rec.target);
      if (!cView || cView.ignoreMutation(rec)) return null;
      cView.markDirty(rec.type == 'attributes');
      if (rec.type == 'attributes') cView.dirty |= 4;
      if (rec.type == 'childList') {
        let childBefore = findChild(cView, rec.previousSibling || rec.target.previousSibling, -1);
        let childAfter = findChild(cView, rec.nextSibling || rec.target.nextSibling, 1);
        return {
          from: childBefore ? cView.posAfter(childBefore) : cView.posAtStart,
          to: childAfter ? cView.posBefore(childAfter) : cView.posAtEnd,
          typeOver: false,
        };
      } else if (rec.type == 'characterData') {
        return {
          from: cView.posAtStart,
          to: cView.posAtEnd,
          typeOver: rec.target.nodeValue == rec.oldValue,
        };
      } else {
        return null;
      }
    }
    setWindow(win) {
      if (win != this.win) {
        this.removeWindowListeners(this.win);
        this.win = win;
        this.addWindowListeners(this.win);
      }
    }
    addWindowListeners(win) {
      win.addEventListener('resize', this.onResize);
      win.addEventListener('beforeprint', this.onPrint);
      win.addEventListener('scroll', this.onScroll);
      win.document.addEventListener('selectionchange', this.onSelectionChange);
    }
    removeWindowListeners(win) {
      win.removeEventListener('scroll', this.onScroll);
      win.removeEventListener('resize', this.onResize);
      win.removeEventListener('beforeprint', this.onPrint);
      win.document.removeEventListener('selectionchange', this.onSelectionChange);
    }
    destroy() {
      var _a, _b, _c;
      this.stop();
      (_a = this.intersection) === null || _a === void 0 ? void 0 : _a.disconnect();
      (_b = this.gapIntersection) === null || _b === void 0 ? void 0 : _b.disconnect();
      (_c = this.resize) === null || _c === void 0 ? void 0 : _c.disconnect();
      for (let dom of this.scrollTargets) dom.removeEventListener('scroll', this.onScroll);
      this.removeWindowListeners(this.win);
      clearTimeout(this.parentCheck);
      clearTimeout(this.resizeTimeout);
    }
  }
  function findChild(cView, dom, dir) {
    while (dom) {
      let curView = ContentView.get(dom);
      if (curView && curView.parent == cView) return curView;
      let parent = dom.parentNode;
      dom = parent != cView.dom ? parent : dir > 0 ? dom.nextSibling : dom.previousSibling;
    }
    return null;
  }
  function safariSelectionRangeHack(view) {
    let found = null;
    function read(event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      found = event.getTargetRanges()[0];
    }
    view.contentDOM.addEventListener('beforeinput', read, true);
    document.execCommand('indent');
    view.contentDOM.removeEventListener('beforeinput', read, true);
    if (!found) return null;
    let anchorNode = found.startContainer,
      anchorOffset = found.startOffset;
    let focusNode = found.endContainer,
      focusOffset = found.endOffset;
    let curAnchor = view.docView.domAtPos(view.state.selection.main.anchor);
    if (isEquivalentPosition(curAnchor.node, curAnchor.offset, focusNode, focusOffset))
      [anchorNode, anchorOffset, focusNode, focusOffset] = [
        focusNode,
        focusOffset,
        anchorNode,
        anchorOffset,
      ];
    return { anchorNode, anchorOffset, focusNode, focusOffset };
  }

  function applyDOMChange(view, start, end, typeOver) {
    let change, newSel;
    let sel = view.state.selection.main;
    if (start > -1) {
      let bounds = view.docView.domBoundsAround(start, end, 0);
      if (!bounds || view.state.readOnly) return false;
      let { from, to } = bounds;
      let selPoints =
        view.docView.impreciseHead || view.docView.impreciseAnchor ? [] : selectionPoints(view);
      let reader = new DOMReader(selPoints, view.state);
      reader.readRange(bounds.startDOM, bounds.endDOM);
      let preferredPos = sel.from,
        preferredSide = null;
      if (
        (view.inputState.lastKeyCode === 8 && view.inputState.lastKeyTime > Date.now() - 100) ||
        (dist_browser.android && reader.text.length < to - from)
      ) {
        preferredPos = sel.to;
        preferredSide = 'end';
      }
      let diff = findDiff(
        view.state.doc.sliceString(from, to, LineBreakPlaceholder),
        reader.text,
        preferredPos - from,
        preferredSide,
      );
      if (diff) {
        if (
          dist_browser.chrome &&
          view.inputState.lastKeyCode == 13 &&
          diff.toB == diff.from + 2 &&
          reader.text.slice(diff.from, diff.toB) == LineBreakPlaceholder + LineBreakPlaceholder
        )
          diff.toB--;
        change = {
          from: from + diff.from,
          to: from + diff.toA,
          insert: dist_Text.of(reader.text.slice(diff.from, diff.toB).split(LineBreakPlaceholder)),
        };
      }
      newSel = selectionFromPoints(selPoints, from);
    } else if (view.hasFocus || !view.state.facet(editable)) {
      let domSel = view.observer.selectionRange;
      let { impreciseHead: iHead, impreciseAnchor: iAnchor } = view.docView;
      let head =
        (iHead && iHead.node == domSel.focusNode && iHead.offset == domSel.focusOffset) ||
        !contains(view.contentDOM, domSel.focusNode)
          ? view.state.selection.main.head
          : view.docView.posFromDOM(domSel.focusNode, domSel.focusOffset);
      let anchor =
        (iAnchor && iAnchor.node == domSel.anchorNode && iAnchor.offset == domSel.anchorOffset) ||
        !contains(view.contentDOM, domSel.anchorNode)
          ? view.state.selection.main.anchor
          : view.docView.posFromDOM(domSel.anchorNode, domSel.anchorOffset);
      if (head != sel.head || anchor != sel.anchor)
        newSel = dist_EditorSelection.single(anchor, head);
    }
    if (!change && !newSel) return false;
    if (!change && typeOver && !sel.empty && newSel && newSel.main.empty)
      change = { from: sel.from, to: sel.to, insert: view.state.doc.slice(sel.from, sel.to) };
    else if (
      change &&
      change.from >= sel.from &&
      change.to <= sel.to &&
      (change.from != sel.from || change.to != sel.to) &&
      sel.to - sel.from - (change.to - change.from) <= 4
    )
      change = {
        from: sel.from,
        to: sel.to,
        insert: view.state.doc
          .slice(sel.from, change.from)
          .append(change.insert)
          .append(view.state.doc.slice(change.to, sel.to)),
      };
    else if (
      (dist_browser.mac || dist_browser.android) &&
      change &&
      change.from == change.to &&
      change.from == sel.head - 1 &&
      change.insert.toString() == '.'
    )
      change = { from: sel.from, to: sel.to, insert: dist_Text.of([' ']) };
    if (change) {
      let startState = view.state;
      if (dist_browser.ios && view.inputState.flushIOSKey(view)) return true;
      if (
        dist_browser.android &&
        ((change.from == sel.from &&
          change.to == sel.to &&
          change.insert.length == 1 &&
          change.insert.lines == 2 &&
          dispatchKey(view.contentDOM, 'Enter', 13)) ||
          (change.from == sel.from - 1 &&
            change.to == sel.to &&
            change.insert.length == 0 &&
            dispatchKey(view.contentDOM, 'Backspace', 8)) ||
          (change.from == sel.from &&
            change.to == sel.to + 1 &&
            change.insert.length == 0 &&
            dispatchKey(view.contentDOM, 'Delete', 46)))
      )
        return true;
      let text = change.insert.toString();
      if (view.state.facet(inputHandler).some(h => h(view, change.from, change.to, text)))
        return true;
      if (view.inputState.composing >= 0) view.inputState.composing++;
      let tr;
      if (
        change.from >= sel.from &&
        change.to <= sel.to &&
        change.to - change.from >= (sel.to - sel.from) / 3 &&
        (!newSel ||
          (newSel.main.empty && newSel.main.from == change.from + change.insert.length)) &&
        view.inputState.composing < 0
      ) {
        let before = sel.from < change.from ? startState.sliceDoc(sel.from, change.from) : '';
        let after = sel.to > change.to ? startState.sliceDoc(change.to, sel.to) : '';
        tr = startState.replaceSelection(
          view.state.toText(
            before + change.insert.sliceString(0, undefined, view.state.lineBreak) + after,
          ),
        );
      } else {
        let changes = startState.changes(change);
        let mainSel =
          newSel &&
          !startState.selection.main.eq(newSel.main) &&
          newSel.main.to <= changes.newLength
            ? newSel.main
            : undefined;
        if (
          startState.selection.ranges.length > 1 &&
          view.inputState.composing >= 0 &&
          change.to <= sel.to &&
          change.to >= sel.to - 10
        ) {
          let replaced = view.state.sliceDoc(change.from, change.to);
          let compositionRange =
            compositionSurroundingNode(view) || view.state.doc.lineAt(sel.head);
          let offset = sel.to - change.to,
            size = sel.to - sel.from;
          tr = startState.changeByRange(range => {
            if (range.from == sel.from && range.to == sel.to)
              return { changes, range: mainSel || range.map(changes) };
            let to = range.to - offset,
              from = to - replaced.length;
            if (
              range.to - range.from != size ||
              view.state.sliceDoc(from, to) != replaced ||
              (compositionRange &&
                range.to >= compositionRange.from &&
                range.from <= compositionRange.to)
            )
              return { range };
            let rangeChanges = startState.changes({ from, to, insert: change.insert }),
              selOff = range.to - sel.to;
            return {
              changes: rangeChanges,
              range: !mainSel
                ? range.map(rangeChanges)
                : dist_EditorSelection.range(
                    Math.max(0, mainSel.anchor + selOff),
                    Math.max(0, mainSel.head + selOff),
                  ),
            };
          });
        } else {
          tr = {
            changes,
            selection: mainSel && startState.selection.replaceRange(mainSel),
          };
        }
      }
      let userEvent = 'input.type';
      if (view.composing) {
        userEvent += '.compose';
        if (view.inputState.compositionFirstChange) {
          userEvent += '.start';
          view.inputState.compositionFirstChange = false;
        }
      }
      view.dispatch(tr, { scrollIntoView: true, userEvent });
      return true;
    } else if (newSel && !newSel.main.eq(sel)) {
      let scrollIntoView = false,
        userEvent = 'select';
      if (view.inputState.lastSelectionTime > Date.now() - 50) {
        if (view.inputState.lastSelectionOrigin == 'select') scrollIntoView = true;
        userEvent = view.inputState.lastSelectionOrigin;
      }
      view.dispatch({ selection: newSel, scrollIntoView, userEvent });
      return true;
    } else {
      return false;
    }
  }
  function findDiff(a, b, preferredPos, preferredSide) {
    let minLen = Math.min(a.length, b.length);
    let from = 0;
    while (from < minLen && a.charCodeAt(from) == b.charCodeAt(from)) from++;
    if (from == minLen && a.length == b.length) return null;
    let toA = a.length,
      toB = b.length;
    while (toA > 0 && toB > 0 && a.charCodeAt(toA - 1) == b.charCodeAt(toB - 1)) {
      toA--;
      toB--;
    }
    if (preferredSide == 'end') {
      let adjust = Math.max(0, from - Math.min(toA, toB));
      preferredPos -= toA + adjust - from;
    }
    if (toA < from && a.length < b.length) {
      let move = preferredPos <= from && preferredPos >= toA ? from - preferredPos : 0;
      from -= move;
      toB = from + (toB - toA);
      toA = from;
    } else if (toB < from) {
      let move = preferredPos <= from && preferredPos >= toB ? from - preferredPos : 0;
      from -= move;
      toA = from + (toA - toB);
      toB = from;
    }
    return { from, toA, toB };
  }
  function selectionPoints(view) {
    let result = [];
    if (view.root.activeElement != view.contentDOM) return result;
    let { anchorNode, anchorOffset, focusNode, focusOffset } = view.observer.selectionRange;
    if (anchorNode) {
      result.push(new DOMPoint(anchorNode, anchorOffset));
      if (focusNode != anchorNode || focusOffset != anchorOffset)
        result.push(new DOMPoint(focusNode, focusOffset));
    }
    return result;
  }
  function selectionFromPoints(points, base) {
    if (points.length == 0) return null;
    let anchor = points[0].pos,
      head = points.length == 2 ? points[1].pos : anchor;
    return anchor > -1 && head > -1
      ? dist_EditorSelection.single(anchor + base, head + base)
      : null;
  }

  class EditorView {
    constructor(config = {}) {
      this.plugins = [];
      this.pluginMap = new Map();
      this.editorAttrs = {};
      this.contentAttrs = {};
      this.bidiCache = [];
      this.destroyed = false;
      this.updateState = 2;
      this.measureScheduled = -1;
      this.measureRequests = [];
      this.contentDOM = document.createElement('div');
      this.scrollDOM = document.createElement('div');
      this.scrollDOM.tabIndex = -1;
      this.scrollDOM.className = 'cm-scroller';
      this.scrollDOM.appendChild(this.contentDOM);
      this.announceDOM = document.createElement('div');
      this.announceDOM.style.cssText = 'position: absolute; top: -10000px';
      this.announceDOM.setAttribute('aria-live', 'polite');
      this.dom = document.createElement('div');
      this.dom.appendChild(this.announceDOM);
      this.dom.appendChild(this.scrollDOM);
      this._dispatch = config.dispatch || (tr => this.update([tr]));
      this.dispatch = this.dispatch.bind(this);
      this._root = config.root || getRoot(config.parent) || document;
      this.viewState = new ViewState(config.state || dist_EditorState.create(config));
      this.plugins = this.state.facet(viewPlugin).map(spec => new PluginInstance(spec));
      for (let plugin of this.plugins) plugin.update(this);
      this.observer = new DOMObserver(
        this,
        (from, to, typeOver) => {
          return applyDOMChange(this, from, to, typeOver);
        },
        event => {
          this.inputState.runScrollHandlers(this, event);
          if (this.observer.intersecting) this.measure();
        },
      );
      this.inputState = new InputState(this);
      this.inputState.ensureHandlers(this, this.plugins);
      this.docView = new DocView(this);
      this.mountStyles();
      this.updateAttrs();
      this.updateState = 0;
      this.requestMeasure();
      if (config.parent) config.parent.appendChild(this.dom);
    }
    get state() {
      return this.viewState.state;
    }
    get viewport() {
      return this.viewState.viewport;
    }
    get visibleRanges() {
      return this.viewState.visibleRanges;
    }
    get inView() {
      return this.viewState.inView;
    }
    get composing() {
      return this.inputState.composing > 0;
    }
    get compositionStarted() {
      return this.inputState.composing >= 0;
    }
    get root() {
      return this._root;
    }
    dispatch(...input) {
      this._dispatch(
        input.length == 1 && input[0] instanceof Transaction
          ? input[0]
          : this.state.update(...input),
      );
    }
    update(transactions) {
      if (this.updateState != 0)
        throw new Error(
          'Calls to EditorView.update are not allowed while an update is in progress',
        );
      let redrawn = false,
        attrsChanged = false,
        update;
      let state = this.state;
      for (let tr of transactions) {
        if (tr.startState != state)
          throw new RangeError(
            "Trying to update state with a transaction that doesn't start from the previous state.",
          );
        state = tr.state;
      }
      if (this.destroyed) {
        this.viewState.state = state;
        return;
      }
      this.observer.clear();
      if (state.facet(dist_EditorState.phrases) != this.state.facet(dist_EditorState.phrases))
        return this.setState(state);
      update = ViewUpdate.create(this, state, transactions);
      let scrollTarget = this.viewState.scrollTarget;
      try {
        this.updateState = 2;
        for (let tr of transactions) {
          if (scrollTarget) scrollTarget = scrollTarget.map(tr.changes);
          if (tr.scrollIntoView) {
            let { main } = tr.state.selection;
            scrollTarget = new ScrollTarget(
              main.empty
                ? main
                : dist_EditorSelection.cursor(main.head, main.head > main.anchor ? -1 : 1),
            );
          }
          for (let e of tr.effects) if (e.is(scrollIntoView)) scrollTarget = e.value;
        }
        this.viewState.update(update, scrollTarget);
        this.bidiCache = CachedOrder.update(this.bidiCache, update.changes);
        if (!update.empty) {
          this.updatePlugins(update);
          this.inputState.update(update);
        }
        redrawn = this.docView.update(update);
        if (this.state.facet(styleModule) != this.styleModules) this.mountStyles();
        attrsChanged = this.updateAttrs();
        this.showAnnouncements(transactions);
        this.docView.updateSelection(
          redrawn,
          transactions.some(tr => tr.isUserEvent('select.pointer')),
        );
      } finally {
        this.updateState = 0;
      }
      if (update.startState.facet(theme) != update.state.facet(theme))
        this.viewState.mustMeasureContent = true;
      if (
        redrawn ||
        attrsChanged ||
        scrollTarget ||
        this.viewState.mustEnforceCursorAssoc ||
        this.viewState.mustMeasureContent
      )
        this.requestMeasure();
      if (!update.empty) for (let listener of this.state.facet(updateListener)) listener(update);
    }
    setState(newState) {
      if (this.updateState != 0)
        throw new Error(
          'Calls to EditorView.setState are not allowed while an update is in progress',
        );
      if (this.destroyed) {
        this.viewState.state = newState;
        return;
      }
      this.updateState = 2;
      let hadFocus = this.hasFocus;
      try {
        for (let plugin of this.plugins) plugin.destroy(this);
        this.viewState = new ViewState(newState);
        this.plugins = newState.facet(viewPlugin).map(spec => new PluginInstance(spec));
        this.pluginMap.clear();
        for (let plugin of this.plugins) plugin.update(this);
        this.docView = new DocView(this);
        this.inputState.ensureHandlers(this, this.plugins);
        this.mountStyles();
        this.updateAttrs();
        this.bidiCache = [];
      } finally {
        this.updateState = 0;
      }
      if (hadFocus) this.focus();
      this.requestMeasure();
    }
    updatePlugins(update) {
      let prevSpecs = update.startState.facet(viewPlugin),
        specs = update.state.facet(viewPlugin);
      if (prevSpecs != specs) {
        let newPlugins = [];
        for (let spec of specs) {
          let found = prevSpecs.indexOf(spec);
          if (found < 0) {
            newPlugins.push(new PluginInstance(spec));
          } else {
            let plugin = this.plugins[found];
            plugin.mustUpdate = update;
            newPlugins.push(plugin);
          }
        }
        for (let plugin of this.plugins) if (plugin.mustUpdate != update) plugin.destroy(this);
        this.plugins = newPlugins;
        this.pluginMap.clear();
        this.inputState.ensureHandlers(this, this.plugins);
      } else {
        for (let p of this.plugins) p.mustUpdate = update;
      }
      for (let i = 0; i < this.plugins.length; i++) this.plugins[i].update(this);
    }
    measure(flush = true) {
      if (this.destroyed) return;
      if (this.measureScheduled > -1) cancelAnimationFrame(this.measureScheduled);
      this.measureScheduled = 0;
      if (flush) this.observer.forceFlush();
      let updated = null;
      let { scrollHeight, scrollTop, clientHeight } = this.scrollDOM;
      let refHeight = scrollTop > scrollHeight - clientHeight - 4 ? scrollHeight : scrollTop;
      try {
        for (let i = 0; ; i++) {
          this.updateState = 1;
          let oldViewport = this.viewport;
          let refBlock = this.viewState.lineBlockAtHeight(refHeight);
          let changed = this.viewState.measure(this);
          if (!changed && !this.measureRequests.length && this.viewState.scrollTarget == null)
            break;
          if (i > 5) {
            console.warn(
              this.measureRequests.length
                ? 'Measure loop restarted more than 5 times'
                : 'Viewport failed to stabilize',
            );
            break;
          }
          let measuring = [];
          if (!(changed & 4)) [this.measureRequests, measuring] = [measuring, this.measureRequests];
          let measured = measuring.map(m => {
            try {
              return m.read(this);
            } catch (e) {
              logException(this.state, e);
              return BadMeasure;
            }
          });
          let update = ViewUpdate.create(this, this.state, []),
            redrawn = false,
            scrolled = false;
          update.flags |= changed;
          if (!updated) updated = update;
          else updated.flags |= changed;
          this.updateState = 2;
          if (!update.empty) {
            this.updatePlugins(update);
            this.inputState.update(update);
            this.updateAttrs();
            redrawn = this.docView.update(update);
          }
          for (let i = 0; i < measuring.length; i++)
            if (measured[i] != BadMeasure) {
              try {
                let m = measuring[i];
                if (m.write) m.write(measured[i], this);
              } catch (e) {
                logException(this.state, e);
              }
            }
          if (this.viewState.scrollTarget) {
            this.docView.scrollIntoView(this.viewState.scrollTarget);
            this.viewState.scrollTarget = null;
            scrolled = true;
          } else {
            let diff = this.viewState.lineBlockAt(refBlock.from).top - refBlock.top;
            if (diff > 1 || diff < -1) {
              this.scrollDOM.scrollTop += diff;
              scrolled = true;
            }
          }
          if (redrawn) this.docView.updateSelection(true);
          if (
            this.viewport.from == oldViewport.from &&
            this.viewport.to == oldViewport.to &&
            !scrolled &&
            this.measureRequests.length == 0
          )
            break;
        }
      } finally {
        this.updateState = 0;
        this.measureScheduled = -1;
      }
      if (updated && !updated.empty)
        for (let listener of this.state.facet(updateListener)) listener(updated);
    }
    get themeClasses() {
      return (
        baseThemeID +
        ' ' +
        (this.state.facet(dist_darkTheme) ? baseDarkID : baseLightID) +
        ' ' +
        this.state.facet(theme)
      );
    }
    updateAttrs() {
      let editorAttrs = attrsFromFacet(this, editorAttributes, {
        class: 'cm-editor' + (this.hasFocus ? ' cm-focused ' : ' ') + this.themeClasses,
      });
      let contentAttrs = {
        spellcheck: 'false',
        autocorrect: 'off',
        autocapitalize: 'off',
        translate: 'no',
        contenteditable: !this.state.facet(editable) ? 'false' : 'true',
        class: 'cm-content',
        style: `${dist_browser.tabSize}: ${this.state.tabSize}`,
        role: 'textbox',
        'aria-multiline': 'true',
      };
      if (this.state.readOnly) contentAttrs['aria-readonly'] = 'true';
      attrsFromFacet(this, contentAttributes, contentAttrs);
      let changed = this.observer.ignore(() => {
        let changedContent = updateAttrs(this.contentDOM, this.contentAttrs, contentAttrs);
        let changedEditor = updateAttrs(this.dom, this.editorAttrs, editorAttrs);
        return changedContent || changedEditor;
      });
      this.editorAttrs = editorAttrs;
      this.contentAttrs = contentAttrs;
      return changed;
    }
    showAnnouncements(trs) {
      let first = true;
      for (let tr of trs)
        for (let effect of tr.effects)
          if (effect.is(EditorView.announce)) {
            if (first) this.announceDOM.textContent = '';
            first = false;
            let div = this.announceDOM.appendChild(document.createElement('div'));
            div.textContent = effect.value;
          }
    }
    mountStyles() {
      this.styleModules = this.state.facet(styleModule);
      StyleModule.mount(this.root, this.styleModules.concat(baseTheme$1).reverse());
    }
    readMeasured() {
      if (this.updateState == 2)
        throw new Error("Reading the editor layout isn't allowed during an update");
      if (this.updateState == 0 && this.measureScheduled > -1) this.measure(false);
    }
    requestMeasure(request) {
      if (this.measureScheduled < 0)
        this.measureScheduled = requestAnimationFrame(() => this.measure());
      if (request) {
        if (request.key != null)
          for (let i = 0; i < this.measureRequests.length; i++) {
            if (this.measureRequests[i].key === request.key) {
              this.measureRequests[i] = request;
              return;
            }
          }
        this.measureRequests.push(request);
      }
    }
    plugin(plugin) {
      let known = this.pluginMap.get(plugin);
      if (known === undefined || (known && known.spec != plugin))
        this.pluginMap.set(plugin, (known = this.plugins.find(p => p.spec == plugin) || null));
      return known && known.update(this).value;
    }
    get documentTop() {
      return this.contentDOM.getBoundingClientRect().top + this.viewState.paddingTop;
    }
    get documentPadding() {
      return { top: this.viewState.paddingTop, bottom: this.viewState.paddingBottom };
    }
    elementAtHeight(height) {
      this.readMeasured();
      return this.viewState.elementAtHeight(height);
    }
    lineBlockAtHeight(height) {
      this.readMeasured();
      return this.viewState.lineBlockAtHeight(height);
    }
    get viewportLineBlocks() {
      return this.viewState.viewportLines;
    }
    lineBlockAt(pos) {
      return this.viewState.lineBlockAt(pos);
    }
    get contentHeight() {
      return this.viewState.contentHeight;
    }
    moveByChar(start, forward, by) {
      return skipAtoms(this, start, moveByChar(this, start, forward, by));
    }
    moveByGroup(start, forward) {
      return skipAtoms(
        this,
        start,
        moveByChar(this, start, forward, initial => byGroup(this, start.head, initial)),
      );
    }
    moveToLineBoundary(start, forward, includeWrap = true) {
      return moveToLineBoundary(this, start, forward, includeWrap);
    }
    moveVertically(start, forward, distance) {
      return skipAtoms(this, start, moveVertically(this, start, forward, distance));
    }
    domAtPos(pos) {
      return this.docView.domAtPos(pos);
    }
    posAtDOM(node, offset = 0) {
      return this.docView.posFromDOM(node, offset);
    }
    posAtCoords(coords, precise = true) {
      this.readMeasured();
      return posAtCoords(this, coords, precise);
    }
    coordsAtPos(pos, side = 1) {
      this.readMeasured();
      let rect = this.docView.coordsAt(pos, side);
      if (!rect || rect.left == rect.right) return rect;
      let line = this.state.doc.lineAt(pos),
        order = this.bidiSpans(line);
      let span = order[BidiSpan.find(order, pos - line.from, -1, side)];
      return flattenRect(rect, (span.dir == Direction.LTR) == side > 0);
    }
    get defaultCharacterWidth() {
      return this.viewState.heightOracle.charWidth;
    }
    get defaultLineHeight() {
      return this.viewState.heightOracle.lineHeight;
    }
    get textDirection() {
      return this.viewState.defaultTextDirection;
    }
    textDirectionAt(pos) {
      let perLine = this.state.facet(perLineTextDirection);
      if (!perLine || pos < this.viewport.from || pos > this.viewport.to) return this.textDirection;
      this.readMeasured();
      return this.docView.textDirectionAt(pos);
    }
    get lineWrapping() {
      return this.viewState.heightOracle.lineWrapping;
    }
    bidiSpans(line) {
      if (line.length > MaxBidiLine) return trivialOrder(line.length);
      let dir = this.textDirectionAt(line.from);
      for (let entry of this.bidiCache)
        if (entry.from == line.from && entry.dir == dir) return entry.order;
      let order = computeOrder(line.text, dir);
      this.bidiCache.push(new CachedOrder(line.from, line.to, dir, order));
      return order;
    }
    get hasFocus() {
      var _a;
      return (
        (document.hasFocus() ||
          (dist_browser.safari &&
            ((_a = this.inputState) === null || _a === void 0 ? void 0 : _a.lastContextMenu) >
              Date.now() - 3e4)) &&
        this.root.activeElement == this.contentDOM
      );
    }
    focus() {
      this.observer.ignore(() => {
        focusPreventScroll(this.contentDOM);
        this.docView.updateSelection();
      });
    }
    setRoot(root) {
      if (this._root != root) {
        this._root = root;
        this.observer.setWindow((root.nodeType == 9 ? root : root.ownerDocument).defaultView);
        this.mountStyles();
      }
    }
    destroy() {
      for (let plugin of this.plugins) plugin.destroy(this);
      this.plugins = [];
      this.inputState.destroy();
      this.dom.remove();
      this.observer.destroy();
      if (this.measureScheduled > -1) cancelAnimationFrame(this.measureScheduled);
      this.destroyed = true;
    }
    static scrollIntoView(pos, options = {}) {
      return scrollIntoView.of(
        new ScrollTarget(
          typeof pos == 'number' ? dist_EditorSelection.cursor(pos) : pos,
          options.y,
          options.x,
          options.yMargin,
          options.xMargin,
        ),
      );
    }
    static domEventHandlers(handlers) {
      return dist_ViewPlugin.define(() => ({}), { eventHandlers: handlers });
    }
    static theme(spec, options) {
      let prefix = StyleModule.newName();
      let result = [theme.of(prefix), styleModule.of(buildTheme(`.${prefix}`, spec))];
      if (options && options.dark) result.push(dist_darkTheme.of(true));
      return result;
    }
    static baseTheme(spec) {
      return dist_Prec.lowest(styleModule.of(buildTheme('.' + baseThemeID, spec, lightDarkIDs)));
    }
    static findFromDOM(dom) {
      var _a;
      let content = dom.querySelector('.cm-content');
      let cView = (content && ContentView.get(content)) || ContentView.get(dom);
      return (
        ((_a = cView === null || cView === void 0 ? void 0 : cView.rootView) === null ||
        _a === void 0
          ? void 0
          : _a.view) || null
      );
    }
  }
  EditorView.styleModule = styleModule;
  EditorView.inputHandler = inputHandler;
  EditorView.perLineTextDirection = perLineTextDirection;
  EditorView.exceptionSink = exceptionSink;
  EditorView.updateListener = updateListener;
  EditorView.editable = editable;
  EditorView.mouseSelectionStyle = mouseSelectionStyle;
  EditorView.dragMovesSelection = dragMovesSelection$1;
  EditorView.clickAddsSelectionRange = clickAddsSelectionRange;
  EditorView.decorations = decorations;
  EditorView.atomicRanges = atomicRanges;
  EditorView.scrollMargins = scrollMargins;
  EditorView.darkTheme = dist_darkTheme;
  EditorView.contentAttributes = contentAttributes;
  EditorView.editorAttributes = editorAttributes;
  EditorView.lineWrapping = EditorView.contentAttributes.of({ class: 'cm-lineWrapping' });
  EditorView.announce = dist_StateEffect.define();
  const MaxBidiLine = 4096;
  const BadMeasure = {};
  class CachedOrder {
    constructor(from, to, dir, order) {
      this.from = from;
      this.to = to;
      this.dir = dir;
      this.order = order;
    }
    static update(cache, changes) {
      if (changes.empty) return cache;
      let result = [],
        lastDir = cache.length ? cache[cache.length - 1].dir : Direction.LTR;
      for (let i = Math.max(0, cache.length - 10); i < cache.length; i++) {
        let entry = cache[i];
        if (entry.dir == lastDir && !changes.touchesRange(entry.from, entry.to))
          result.push(
            new CachedOrder(
              changes.mapPos(entry.from, 1),
              changes.mapPos(entry.to, -1),
              entry.dir,
              entry.order,
            ),
          );
      }
      return result;
    }
  }
  function attrsFromFacet(view, facet, base) {
    for (let sources = view.state.facet(facet), i = sources.length - 1; i >= 0; i--) {
      let source = sources[i],
        value = typeof source == 'function' ? source(view) : source;
      if (value) combineAttrs(value, base);
    }
    return base;
  }

  const currentPlatform = dist_browser.mac
    ? 'mac'
    : dist_browser.windows
    ? 'win'
    : dist_browser.linux
    ? 'linux'
    : 'key';
  function normalizeKeyName(name, platform) {
    const parts = name.split(/-(?!$)/);
    let result = parts[parts.length - 1];
    if (result == 'Space') result = ' ';
    let alt, ctrl, shift, meta;
    for (let i = 0; i < parts.length - 1; ++i) {
      const mod = parts[i];
      if (/^(cmd|meta|m)$/i.test(mod)) meta = true;
      else if (/^a(lt)?$/i.test(mod)) alt = true;
      else if (/^(c|ctrl|control)$/i.test(mod)) ctrl = true;
      else if (/^s(hift)?$/i.test(mod)) shift = true;
      else if (/^mod$/i.test(mod)) {
        if (platform == 'mac') meta = true;
        else ctrl = true;
      } else throw new Error('Unrecognized modifier name: ' + mod);
    }
    if (alt) result = 'Alt-' + result;
    if (ctrl) result = 'Ctrl-' + result;
    if (meta) result = 'Meta-' + result;
    if (shift) result = 'Shift-' + result;
    return result;
  }
  function modifiers(name, event, shift) {
    if (event.altKey) name = 'Alt-' + name;
    if (event.ctrlKey) name = 'Ctrl-' + name;
    if (event.metaKey) name = 'Meta-' + name;
    if (shift !== false && event.shiftKey) name = 'Shift-' + name;
    return name;
  }
  const handleKeyEvents = dist_Prec['default'](
    EditorView.domEventHandlers({
      keydown(event, view) {
        return runHandlers(getKeymap(view.state), event, view, 'editor');
      },
    }),
  );
  const keymap = Facet.define({ enables: handleKeyEvents });
  const Keymaps = new WeakMap();
  function getKeymap(state) {
    let bindings = state.facet(keymap);
    let map = Keymaps.get(bindings);
    if (!map)
      Keymaps.set(bindings, (map = buildKeymap(bindings.reduce((a, b) => a.concat(b), []))));
    return map;
  }
  function runScopeHandlers(view, event, scope) {
    return runHandlers(getKeymap(view.state), event, view, scope);
  }
  let storedPrefix = null;
  const PrefixTimeout = 4000;
  function buildKeymap(bindings, platform = currentPlatform) {
    let bound = Object.create(null);
    let isPrefix = Object.create(null);
    let checkPrefix = (name, is) => {
      let current = isPrefix[name];
      if (current == null) isPrefix[name] = is;
      else if (current != is)
        throw new Error(
          'Key binding ' + name + ' is used both as a regular binding and as a multi-stroke prefix',
        );
    };
    let add = (scope, key, command, preventDefault) => {
      let scopeObj = bound[scope] || (bound[scope] = Object.create(null));
      let parts = key.split(/ (?!$)/).map(k => normalizeKeyName(k, platform));
      for (let i = 1; i < parts.length; i++) {
        let prefix = parts.slice(0, i).join(' ');
        checkPrefix(prefix, true);
        if (!scopeObj[prefix])
          scopeObj[prefix] = {
            preventDefault: true,
            commands: [
              view => {
                let ourObj = (storedPrefix = { view, prefix, scope });
                setTimeout(() => {
                  if (storedPrefix == ourObj) storedPrefix = null;
                }, PrefixTimeout);
                return true;
              },
            ],
          };
      }
      let full = parts.join(' ');
      checkPrefix(full, false);
      let binding = scopeObj[full] || (scopeObj[full] = { preventDefault: false, commands: [] });
      binding.commands.push(command);
      if (preventDefault) binding.preventDefault = true;
    };
    for (let b of bindings) {
      let name = b[platform] || b.key;
      if (!name) continue;
      for (let scope of b.scope ? b.scope.split(' ') : ['editor']) {
        add(scope, name, b.run, b.preventDefault);
        if (b.shift) add(scope, 'Shift-' + name, b.shift, b.preventDefault);
      }
    }
    return bound;
  }
  function runHandlers(map, event, view, scope) {
    let name = keyName(event);
    let charCode = codePointAt(name, 0),
      isChar = codePointSize(charCode) == name.length && name != ' ';
    let prefix = '',
      fallthrough = false;
    if (storedPrefix && storedPrefix.view == view && storedPrefix.scope == scope) {
      prefix = storedPrefix.prefix + ' ';
      if ((fallthrough = modifierCodes.indexOf(event.keyCode) < 0)) storedPrefix = null;
    }
    let runFor = binding => {
      if (binding) {
        for (let cmd of binding.commands) if (cmd(view)) return true;
        if (binding.preventDefault) fallthrough = true;
      }
      return false;
    };
    let scopeObj = map[scope],
      baseName;
    if (scopeObj) {
      if (runFor(scopeObj[prefix + modifiers(name, event, !isChar)])) return true;
      if (
        isChar &&
        (event.shiftKey || event.altKey || event.metaKey || charCode > 127) &&
        (baseName = base[event.keyCode]) &&
        baseName != name
      ) {
        if (runFor(scopeObj[prefix + modifiers(baseName, event, true)])) return true;
        else if (
          event.shiftKey &&
          shift[event.keyCode] != baseName &&
          runFor(scopeObj[prefix + modifiers(shift[event.keyCode], event, false)])
        )
          return true;
      } else if (isChar && event.shiftKey) {
        if (runFor(scopeObj[prefix + modifiers(name, event, true)])) return true;
      }
    }
    return fallthrough;
  }

  const CanHidePrimary = !dist_browser.ios;
  const selectionConfig = Facet.define({
    combine(configs) {
      return combineConfig(
        configs,
        {
          cursorBlinkRate: 1200,
          drawRangeCursor: true,
        },
        {
          cursorBlinkRate: (a, b) => Math.min(a, b),
          drawRangeCursor: (a, b) => a || b,
        },
      );
    },
  });
  function drawSelection(config = {}) {
    return [selectionConfig.of(config), drawSelectionPlugin, hideNativeSelection];
  }
  class Piece {
    constructor(left, top, width, height, className) {
      this.left = left;
      this.top = top;
      this.width = width;
      this.height = height;
      this.className = className;
    }
    draw() {
      let elt = document.createElement('div');
      elt.className = this.className;
      this.adjust(elt);
      return elt;
    }
    adjust(elt) {
      elt.style.left = this.left + 'px';
      elt.style.top = this.top + 'px';
      if (this.width >= 0) elt.style.width = this.width + 'px';
      elt.style.height = this.height + 'px';
    }
    eq(p) {
      return (
        this.left == p.left &&
        this.top == p.top &&
        this.width == p.width &&
        this.height == p.height &&
        this.className == p.className
      );
    }
  }
  const drawSelectionPlugin =
    null &&
    dist_ViewPlugin.fromClass(
      class {
        constructor(view) {
          this.view = view;
          this.rangePieces = [];
          this.cursors = [];
          this.measureReq = { read: this.readPos.bind(this), write: this.drawSel.bind(this) };
          this.selectionLayer = view.scrollDOM.appendChild(document.createElement('div'));
          this.selectionLayer.className = 'cm-selectionLayer';
          this.selectionLayer.setAttribute('aria-hidden', 'true');
          this.cursorLayer = view.scrollDOM.appendChild(document.createElement('div'));
          this.cursorLayer.className = 'cm-cursorLayer';
          this.cursorLayer.setAttribute('aria-hidden', 'true');
          view.requestMeasure(this.measureReq);
          this.setBlinkRate();
        }
        setBlinkRate() {
          this.cursorLayer.style.animationDuration =
            this.view.state.facet(selectionConfig).cursorBlinkRate + 'ms';
        }
        update(update) {
          let confChanged =
            update.startState.facet(selectionConfig) != update.state.facet(selectionConfig);
          if (
            confChanged ||
            update.selectionSet ||
            update.geometryChanged ||
            update.viewportChanged
          )
            this.view.requestMeasure(this.measureReq);
          if (update.transactions.some(tr => tr.scrollIntoView))
            this.cursorLayer.style.animationName =
              this.cursorLayer.style.animationName == 'cm-blink' ? 'cm-blink2' : 'cm-blink';
          if (confChanged) this.setBlinkRate();
        }
        readPos() {
          let { state } = this.view,
            conf = state.facet(selectionConfig);
          let rangePieces = state.selection.ranges
            .map(r => (r.empty ? [] : measureRange(this.view, r)))
            .reduce((a, b) => a.concat(b));
          let cursors = [];
          for (let r of state.selection.ranges) {
            let prim = r == state.selection.main;
            if (r.empty ? !prim || CanHidePrimary : conf.drawRangeCursor) {
              let piece = measureCursor(this.view, r, prim);
              if (piece) cursors.push(piece);
            }
          }
          return { rangePieces, cursors };
        }
        drawSel({ rangePieces, cursors }) {
          if (
            rangePieces.length != this.rangePieces.length ||
            rangePieces.some((p, i) => !p.eq(this.rangePieces[i]))
          ) {
            this.selectionLayer.textContent = '';
            for (let p of rangePieces) this.selectionLayer.appendChild(p.draw());
            this.rangePieces = rangePieces;
          }
          if (
            cursors.length != this.cursors.length ||
            cursors.some((c, i) => !c.eq(this.cursors[i]))
          ) {
            let oldCursors = this.cursorLayer.children;
            if (oldCursors.length !== cursors.length) {
              this.cursorLayer.textContent = '';
              for (const c of cursors) this.cursorLayer.appendChild(c.draw());
            } else {
              cursors.forEach((c, idx) => c.adjust(oldCursors[idx]));
            }
            this.cursors = cursors;
          }
        }
        destroy() {
          this.selectionLayer.remove();
          this.cursorLayer.remove();
        }
      },
    );
  const themeSpec = {
    '.cm-line': {
      '& ::selection': { backgroundColor: 'transparent !important' },
      '&::selection': { backgroundColor: 'transparent !important' },
    },
  };
  if (CanHidePrimary) themeSpec['.cm-line'].caretColor = 'transparent !important';
  const hideNativeSelection = null && Prec.highest(EditorView.theme(themeSpec));
  function getBase(view) {
    let rect = view.scrollDOM.getBoundingClientRect();
    let left =
      view.textDirection == Direction.LTR ? rect.left : rect.right - view.scrollDOM.clientWidth;
    return { left: left - view.scrollDOM.scrollLeft, top: rect.top - view.scrollDOM.scrollTop };
  }
  function wrappedLine(view, pos, inside) {
    let range = EditorSelection.cursor(pos);
    return {
      from: Math.max(inside.from, view.moveToLineBoundary(range, false, true).from),
      to: Math.min(inside.to, view.moveToLineBoundary(range, true, true).from),
      type: BlockType.Text,
    };
  }
  function blockAt(view, pos) {
    let line = view.lineBlockAt(pos);
    if (Array.isArray(line.type))
      for (let l of line.type) {
        if (l.to > pos || (l.to == pos && (l.to == line.to || l.type == BlockType.Text))) return l;
      }
    return line;
  }
  function measureRange(view, range) {
    if (range.to <= view.viewport.from || range.from >= view.viewport.to) return [];
    let from = Math.max(range.from, view.viewport.from),
      to = Math.min(range.to, view.viewport.to);
    let ltr = view.textDirection == Direction.LTR;
    let content = view.contentDOM,
      contentRect = content.getBoundingClientRect(),
      base = getBase(view);
    let lineStyle = window.getComputedStyle(content.firstChild);
    let leftSide =
      contentRect.left +
      parseInt(lineStyle.paddingLeft) +
      Math.min(0, parseInt(lineStyle.textIndent));
    let rightSide = contentRect.right - parseInt(lineStyle.paddingRight);
    let startBlock = blockAt(view, from),
      endBlock = blockAt(view, to);
    let visualStart = startBlock.type == BlockType.Text ? startBlock : null;
    let visualEnd = endBlock.type == BlockType.Text ? endBlock : null;
    if (view.lineWrapping) {
      if (visualStart) visualStart = wrappedLine(view, from, visualStart);
      if (visualEnd) visualEnd = wrappedLine(view, to, visualEnd);
    }
    if (visualStart && visualEnd && visualStart.from == visualEnd.from) {
      return pieces(drawForLine(range.from, range.to, visualStart));
    } else {
      let top = visualStart
        ? drawForLine(range.from, null, visualStart)
        : drawForWidget(startBlock, false);
      let bottom = visualEnd
        ? drawForLine(null, range.to, visualEnd)
        : drawForWidget(endBlock, true);
      let between = [];
      if ((visualStart || startBlock).to < (visualEnd || endBlock).from - 1)
        between.push(piece(leftSide, top.bottom, rightSide, bottom.top));
      else if (
        top.bottom < bottom.top &&
        view.elementAtHeight((top.bottom + bottom.top) / 2).type == BlockType.Text
      )
        top.bottom = bottom.top = (top.bottom + bottom.top) / 2;
      return pieces(top).concat(between).concat(pieces(bottom));
    }
    function piece(left, top, right, bottom) {
      return new Piece(
        left - base.left,
        top - base.top - 0.01,
        right - left,
        bottom - top + 0.01,
        'cm-selectionBackground',
      );
    }
    function pieces({ top, bottom, horizontal }) {
      let pieces = [];
      for (let i = 0; i < horizontal.length; i += 2)
        pieces.push(piece(horizontal[i], top, horizontal[i + 1], bottom));
      return pieces;
    }
    function drawForLine(from, to, line) {
      let top = 1e9,
        bottom = -1e9,
        horizontal = [];
      function addSpan(from, fromOpen, to, toOpen, dir) {
        let fromCoords = view.coordsAtPos(from, from == line.to ? -2 : 2);
        let toCoords = view.coordsAtPos(to, to == line.from ? 2 : -2);
        top = Math.min(fromCoords.top, toCoords.top, top);
        bottom = Math.max(fromCoords.bottom, toCoords.bottom, bottom);
        if (dir == Direction.LTR)
          horizontal.push(
            ltr && fromOpen ? leftSide : fromCoords.left,
            ltr && toOpen ? rightSide : toCoords.right,
          );
        else
          horizontal.push(
            !ltr && toOpen ? leftSide : toCoords.left,
            !ltr && fromOpen ? rightSide : fromCoords.right,
          );
      }
      let start = from !== null && from !== void 0 ? from : line.from,
        end = to !== null && to !== void 0 ? to : line.to;
      for (let r of view.visibleRanges)
        if (r.to > start && r.from < end) {
          for (let pos = Math.max(r.from, start), endPos = Math.min(r.to, end); ; ) {
            let docLine = view.state.doc.lineAt(pos);
            for (let span of view.bidiSpans(docLine)) {
              let spanFrom = span.from + docLine.from,
                spanTo = span.to + docLine.from;
              if (spanFrom >= endPos) break;
              if (spanTo > pos)
                addSpan(
                  Math.max(spanFrom, pos),
                  from == null && spanFrom <= start,
                  Math.min(spanTo, endPos),
                  to == null && spanTo >= end,
                  span.dir,
                );
            }
            pos = docLine.to + 1;
            if (pos >= endPos) break;
          }
        }
      if (horizontal.length == 0) addSpan(start, from == null, end, to == null, view.textDirection);
      return { top, bottom, horizontal };
    }
    function drawForWidget(block, top) {
      let y = contentRect.top + (top ? block.top : block.bottom);
      return { top: y, bottom: y, horizontal: [] };
    }
  }
  function measureCursor(view, cursor, primary) {
    let pos = view.coordsAtPos(cursor.head, cursor.assoc || 1);
    if (!pos) return null;
    let base = getBase(view);
    return new Piece(
      pos.left - base.left,
      pos.top - base.top,
      -1,
      pos.bottom - pos.top,
      primary ? 'cm-cursor cm-cursor-primary' : 'cm-cursor cm-cursor-secondary',
    );
  }

  const setDropCursorPos = dist_StateEffect.define({
    map(pos, mapping) {
      return pos == null ? null : mapping.mapPos(pos);
    },
  });
  const dropCursorPos = dist_StateField.define({
    create() {
      return null;
    },
    update(pos, tr) {
      if (pos != null) pos = tr.changes.mapPos(pos);
      return tr.effects.reduce((pos, e) => (e.is(setDropCursorPos) ? e.value : pos), pos);
    },
  });
  const drawDropCursor = dist_ViewPlugin.fromClass(
    class {
      constructor(view) {
        this.view = view;
        this.cursor = null;
        this.measureReq = { read: this.readPos.bind(this), write: this.drawCursor.bind(this) };
      }
      update(update) {
        var _a;
        let cursorPos = update.state.field(dropCursorPos);
        if (cursorPos == null) {
          if (this.cursor != null) {
            (_a = this.cursor) === null || _a === void 0 ? void 0 : _a.remove();
            this.cursor = null;
          }
        } else {
          if (!this.cursor) {
            this.cursor = this.view.scrollDOM.appendChild(document.createElement('div'));
            this.cursor.className = 'cm-dropCursor';
          }
          if (
            update.startState.field(dropCursorPos) != cursorPos ||
            update.docChanged ||
            update.geometryChanged
          )
            this.view.requestMeasure(this.measureReq);
        }
      }
      readPos() {
        let pos = this.view.state.field(dropCursorPos);
        let rect = pos != null && this.view.coordsAtPos(pos);
        if (!rect) return null;
        let outer = this.view.scrollDOM.getBoundingClientRect();
        return {
          left: rect.left - outer.left + this.view.scrollDOM.scrollLeft,
          top: rect.top - outer.top + this.view.scrollDOM.scrollTop,
          height: rect.bottom - rect.top,
        };
      }
      drawCursor(pos) {
        if (this.cursor) {
          if (pos) {
            this.cursor.style.left = pos.left + 'px';
            this.cursor.style.top = pos.top + 'px';
            this.cursor.style.height = pos.height + 'px';
          } else {
            this.cursor.style.left = '-100000px';
          }
        }
      }
      destroy() {
        if (this.cursor) this.cursor.remove();
      }
      setDropPos(pos) {
        if (this.view.state.field(dropCursorPos) != pos)
          this.view.dispatch({ effects: setDropCursorPos.of(pos) });
      }
    },
    {
      eventHandlers: {
        dragover(event) {
          this.setDropPos(this.view.posAtCoords({ x: event.clientX, y: event.clientY }));
        },
        dragleave(event) {
          if (
            event.target == this.view.contentDOM ||
            !this.view.contentDOM.contains(event.relatedTarget)
          )
            this.setDropPos(null);
        },
        dragend() {
          this.setDropPos(null);
        },
        drop() {
          this.setDropPos(null);
        },
      },
    },
  );
  function dropCursor() {
    return [dropCursorPos, drawDropCursor];
  }

  function iterMatches(doc, re, from, to, f) {
    re.lastIndex = 0;
    for (
      let cursor = doc.iterRange(from, to), pos = from, m;
      !cursor.next().done;
      pos += cursor.value.length
    ) {
      if (!cursor.lineBreak) while ((m = re.exec(cursor.value))) f(pos + m.index, m);
    }
  }
  function matchRanges(view, maxLength) {
    let visible = view.visibleRanges;
    if (
      visible.length == 1 &&
      visible[0].from == view.viewport.from &&
      visible[0].to == view.viewport.to
    )
      return visible;
    let result = [];
    for (let { from, to } of visible) {
      from = Math.max(view.state.doc.lineAt(from).from, from - maxLength);
      to = Math.min(view.state.doc.lineAt(to).to, to + maxLength);
      if (result.length && result[result.length - 1].to >= from) result[result.length - 1].to = to;
      else result.push({ from, to });
    }
    return result;
  }
  class MatchDecorator {
    constructor(config) {
      const { regexp, decoration, decorate, boundary, maxLength = 1000 } = config;
      if (!regexp.global)
        throw new RangeError(
          "The regular expression given to MatchDecorator should have its 'g' flag set",
        );
      this.regexp = regexp;
      if (decorate) {
        this.addMatch = (match, view, from, add) =>
          decorate(add, from, from + match[0].length, match, view);
      } else if (decoration) {
        let getDeco = typeof decoration == 'function' ? decoration : () => decoration;
        this.addMatch = (match, view, from, add) =>
          add(from, from + match[0].length, getDeco(match, view, from));
      } else {
        throw new RangeError(
          "Either 'decorate' or 'decoration' should be provided to MatchDecorator",
        );
      }
      this.boundary = boundary;
      this.maxLength = maxLength;
    }
    createDeco(view) {
      let build = new dist_RangeSetBuilder(),
        add = build.add.bind(build);
      for (let { from, to } of matchRanges(view, this.maxLength))
        iterMatches(view.state.doc, this.regexp, from, to, (from, m) =>
          this.addMatch(m, view, from, add),
        );
      return build.finish();
    }
    updateDeco(update, deco) {
      let changeFrom = 1e9,
        changeTo = -1;
      if (update.docChanged)
        update.changes.iterChanges((_f, _t, from, to) => {
          if (to > update.view.viewport.from && from < update.view.viewport.to) {
            changeFrom = Math.min(from, changeFrom);
            changeTo = Math.max(to, changeTo);
          }
        });
      if (update.viewportChanged || changeTo - changeFrom > 1000)
        return this.createDeco(update.view);
      if (changeTo > -1)
        return this.updateRange(update.view, deco.map(update.changes), changeFrom, changeTo);
      return deco;
    }
    updateRange(view, deco, updateFrom, updateTo) {
      for (let r of view.visibleRanges) {
        let from = Math.max(r.from, updateFrom),
          to = Math.min(r.to, updateTo);
        if (to > from) {
          let fromLine = view.state.doc.lineAt(from),
            toLine = fromLine.to < to ? view.state.doc.lineAt(to) : fromLine;
          let start = Math.max(r.from, fromLine.from),
            end = Math.min(r.to, toLine.to);
          if (this.boundary) {
            for (; from > fromLine.from; from--)
              if (this.boundary.test(fromLine.text[from - 1 - fromLine.from])) {
                start = from;
                break;
              }
            for (; to < toLine.to; to++)
              if (this.boundary.test(toLine.text[to - toLine.from])) {
                end = to;
                break;
              }
          }
          let ranges = [],
            m;
          let add = (from, to, deco) => ranges.push(deco.range(from, to));
          if (fromLine == toLine) {
            this.regexp.lastIndex = start - fromLine.from;
            while ((m = this.regexp.exec(fromLine.text)) && m.index < end - fromLine.from)
              this.addMatch(m, view, m.index + fromLine.from, add);
          } else {
            iterMatches(view.state.doc, this.regexp, start, end, (from, m) =>
              this.addMatch(m, view, from, add),
            );
          }
          deco = deco.update({
            filterFrom: start,
            filterTo: end,
            filter: (from, to) => from < start || to > end,
            add: ranges,
          });
        }
      }
      return deco;
    }
  }

  const UnicodeRegexpSupport = /x/.unicode != null ? 'gu' : 'g';
  const Specials = new RegExp(
    '[\u0000-\u0008\u000a-\u001f\u007f-\u009f\u00ad\u061c\u200b\u200e\u200f\u2028\u2029\u202d\u202e\u2066\u2067\u2069\ufeff\ufff9-\ufffc]',
    UnicodeRegexpSupport,
  );
  const Names = {
    0: 'null',
    7: 'bell',
    8: 'backspace',
    10: 'newline',
    11: 'vertical tab',
    13: 'carriage return',
    27: 'escape',
    8203: 'zero width space',
    8204: 'zero width non-joiner',
    8205: 'zero width joiner',
    8206: 'left-to-right mark',
    8207: 'right-to-left mark',
    8232: 'line separator',
    8237: 'left-to-right override',
    8238: 'right-to-left override',
    8294: 'left-to-right isolate',
    8295: 'right-to-left isolate',
    8297: 'pop directional isolate',
    8233: 'paragraph separator',
    65279: 'zero width no-break space',
    65532: 'object replacement',
  };
  let _supportsTabSize = null;
  function supportsTabSize() {
    var _a;
    if (_supportsTabSize == null && typeof document != 'undefined' && document.body) {
      let styles = document.body.style;
      _supportsTabSize =
        ((_a = styles.tabSize) !== null && _a !== void 0 ? _a : styles.MozTabSize) != null;
    }
    return _supportsTabSize || false;
  }
  const specialCharConfig = Facet.define({
    combine(configs) {
      let config = combineConfig(configs, {
        render: null,
        specialChars: Specials,
        addSpecialChars: null,
      });
      if ((config.replaceTabs = !supportsTabSize()))
        config.specialChars = new RegExp('\t|' + config.specialChars.source, UnicodeRegexpSupport);
      if (config.addSpecialChars)
        config.specialChars = new RegExp(
          config.specialChars.source + '|' + config.addSpecialChars.source,
          UnicodeRegexpSupport,
        );
      return config;
    },
  });
  function highlightSpecialChars(config = {}) {
    return [specialCharConfig.of(config), specialCharPlugin()];
  }
  let _plugin = null;
  function specialCharPlugin() {
    return (
      _plugin ||
      (_plugin = dist_ViewPlugin.fromClass(
        class {
          constructor(view) {
            this.view = view;
            this.decorations = Decoration.none;
            this.decorationCache = Object.create(null);
            this.decorator = this.makeDecorator(view.state.facet(specialCharConfig));
            this.decorations = this.decorator.createDeco(view);
          }
          makeDecorator(conf) {
            return new MatchDecorator({
              regexp: conf.specialChars,
              decoration: (m, view, pos) => {
                let { doc } = view.state;
                let code = codePointAt(m[0], 0);
                if (code == 9) {
                  let line = doc.lineAt(pos);
                  let size = view.state.tabSize,
                    col = dist_countColumn(line.text, size, pos - line.from);
                  return Decoration.replace({
                    widget: new TabWidget((size - (col % size)) * this.view.defaultCharacterWidth),
                  });
                }
                return (
                  this.decorationCache[code] ||
                  (this.decorationCache[code] = Decoration.replace({
                    widget: new SpecialCharWidget(conf, code),
                  }))
                );
              },
              boundary: conf.replaceTabs ? undefined : /[^]/,
            });
          }
          update(update) {
            let conf = update.state.facet(specialCharConfig);
            if (update.startState.facet(specialCharConfig) != conf) {
              this.decorator = this.makeDecorator(conf);
              this.decorations = this.decorator.createDeco(update.view);
            } else {
              this.decorations = this.decorator.updateDeco(update, this.decorations);
            }
          }
        },
        {
          decorations: v => v.decorations,
        },
      ))
    );
  }
  const DefaultPlaceholder = '\u2022';
  function placeholder$1(code) {
    if (code >= 32) return DefaultPlaceholder;
    if (code == 10) return '\u2424';
    return String.fromCharCode(9216 + code);
  }
  class SpecialCharWidget extends WidgetType {
    constructor(options, code) {
      super();
      this.options = options;
      this.code = code;
    }
    eq(other) {
      return other.code == this.code;
    }
    toDOM(view) {
      let ph = placeholder$1(this.code);
      let desc =
        view.state.phrase('Control character') +
        ' ' +
        (Names[this.code] || '0x' + this.code.toString(16));
      let custom = this.options.render && this.options.render(this.code, desc, ph);
      if (custom) return custom;
      let span = document.createElement('span');
      span.textContent = ph;
      span.title = desc;
      span.setAttribute('aria-label', desc);
      span.className = 'cm-specialChar';
      return span;
    }
    ignoreEvent() {
      return false;
    }
  }
  class TabWidget extends WidgetType {
    constructor(width) {
      super();
      this.width = width;
    }
    eq(other) {
      return other.width == this.width;
    }
    toDOM() {
      let span = document.createElement('span');
      span.textContent = '\t';
      span.className = 'cm-tab';
      span.style.width = this.width + 'px';
      return span;
    }
    ignoreEvent() {
      return false;
    }
  }

  const dist_plugin =
    null &&
    dist_ViewPlugin.fromClass(
      class {
        constructor() {
          this.height = 1000;
          this.attrs = { style: 'padding-bottom: 1000px' };
        }
        update(update) {
          let height = update.view.viewState.editorHeight - update.view.defaultLineHeight;
          if (height != this.height) {
            this.height = height;
            this.attrs = { style: `padding-bottom: ${height}px` };
          }
        }
      },
    );
  function scrollPastEnd() {
    return [
      dist_plugin,
      contentAttributes.of(view => {
        var _a;
        return (
          ((_a = view.plugin(dist_plugin)) === null || _a === void 0 ? void 0 : _a.attrs) || null
        );
      }),
    ];
  }

  function highlightActiveLine() {
    return activeLineHighlighter;
  }
  const lineDeco = Decoration.line({ class: 'cm-activeLine' });
  const activeLineHighlighter = dist_ViewPlugin.fromClass(
    class {
      constructor(view) {
        this.decorations = this.getDeco(view);
      }
      update(update) {
        if (update.docChanged || update.selectionSet) this.decorations = this.getDeco(update.view);
      }
      getDeco(view) {
        let lastLineStart = -1,
          deco = [];
        for (let r of view.state.selection.ranges) {
          if (!r.empty) return Decoration.none;
          let line = view.lineBlockAt(r.head);
          if (line.from > lastLineStart) {
            deco.push(lineDeco.range(line.from));
            lastLineStart = line.from;
          }
        }
        return Decoration.set(deco);
      }
    },
    {
      decorations: v => v.decorations,
    },
  );

  class Placeholder extends (null && WidgetType) {
    constructor(content) {
      super();
      this.content = content;
    }
    toDOM() {
      let wrap = document.createElement('span');
      wrap.className = 'cm-placeholder';
      wrap.style.pointerEvents = 'none';
      wrap.appendChild(
        typeof this.content == 'string' ? document.createTextNode(this.content) : this.content,
      );
      if (typeof this.content == 'string')
        wrap.setAttribute('aria-label', 'placeholder ' + this.content);
      else wrap.setAttribute('aria-hidden', 'true');
      return wrap;
    }
    ignoreEvent() {
      return false;
    }
  }
  function placeholder(content) {
    return dist_ViewPlugin.fromClass(
      class {
        constructor(view) {
          this.view = view;
          this.placeholder = Decoration.set([
            Decoration.widget({ widget: new Placeholder(content), side: 1 }).range(0),
          ]);
        }
        get decorations() {
          return this.view.state.doc.length ? Decoration.none : this.placeholder;
        }
      },
      { decorations: v => v.decorations },
    );
  }

  const MaxOff = 2000;
  function rectangleFor(state, a, b) {
    let startLine = Math.min(a.line, b.line),
      endLine = Math.max(a.line, b.line);
    let ranges = [];
    if (a.off > MaxOff || b.off > MaxOff || a.col < 0 || b.col < 0) {
      let startOff = Math.min(a.off, b.off),
        endOff = Math.max(a.off, b.off);
      for (let i = startLine; i <= endLine; i++) {
        let line = state.doc.line(i);
        if (line.length <= endOff)
          ranges.push(EditorSelection.range(line.from + startOff, line.to + endOff));
      }
    } else {
      let startCol = Math.min(a.col, b.col),
        endCol = Math.max(a.col, b.col);
      for (let i = startLine; i <= endLine; i++) {
        let line = state.doc.line(i);
        let start = findColumn(line.text, startCol, state.tabSize, true);
        if (start > -1) {
          let end = findColumn(line.text, endCol, state.tabSize);
          ranges.push(EditorSelection.range(line.from + start, line.from + end));
        }
      }
    }
    return ranges;
  }
  function absoluteColumn(view, x) {
    let ref = view.coordsAtPos(view.viewport.from);
    return ref ? Math.round(Math.abs((ref.left - x) / view.defaultCharacterWidth)) : -1;
  }
  function getPos(view, event) {
    let offset = view.posAtCoords({ x: event.clientX, y: event.clientY }, false);
    let line = view.state.doc.lineAt(offset),
      off = offset - line.from;
    let col =
      off > MaxOff
        ? -1
        : off == line.length
        ? absoluteColumn(view, event.clientX)
        : countColumn(line.text, view.state.tabSize, offset - line.from);
    return { line: line.number, col, off };
  }
  function rectangleSelectionStyle(view, event) {
    let start = getPos(view, event),
      startSel = view.state.selection;
    if (!start) return null;
    return {
      update(update) {
        if (update.docChanged) {
          let newStart = update.changes.mapPos(update.startState.doc.line(start.line).from);
          let newLine = update.state.doc.lineAt(newStart);
          start = {
            line: newLine.number,
            col: start.col,
            off: Math.min(start.off, newLine.length),
          };
          startSel = startSel.map(update.changes);
        }
      },
      get(event, _extend, multiple) {
        let cur = getPos(view, event);
        if (!cur) return startSel;
        let ranges = rectangleFor(view.state, start, cur);
        if (!ranges.length) return startSel;
        if (multiple) return EditorSelection.create(ranges.concat(startSel.ranges));
        else return EditorSelection.create(ranges);
      },
    };
  }
  function rectangularSelection(options) {
    let filter =
      (options === null || options === void 0 ? void 0 : options.eventFilter) ||
      (e => e.altKey && e.button == 0);
    return EditorView.mouseSelectionStyle.of((view, event) =>
      filter(event) ? rectangleSelectionStyle(view, event) : null,
    );
  }
  const keys = {
    Alt: [18, e => e.altKey],
    Control: [17, e => e.ctrlKey],
    Shift: [16, e => e.shiftKey],
    Meta: [91, e => e.metaKey],
  };
  const showCrosshair = { style: 'cursor: crosshair' };
  function crosshairCursor(options = {}) {
    let [code, getter] = keys[options.key || 'Alt'];
    let plugin = dist_ViewPlugin.fromClass(
      class {
        constructor(view) {
          this.view = view;
          this.isDown = false;
        }
        set(isDown) {
          if (this.isDown != isDown) {
            this.isDown = isDown;
            this.view.update([]);
          }
        }
      },
      {
        eventHandlers: {
          keydown(e) {
            this.set(e.keyCode == code || getter(e));
          },
          keyup(e) {
            if (e.keyCode == code || !getter(e)) this.set(false);
          },
        },
      },
    );
    return [
      plugin,
      EditorView.contentAttributes.of(view => {
        var _a;
        return ((_a = view.plugin(plugin)) === null || _a === void 0 ? void 0 : _a.isDown)
          ? showCrosshair
          : null;
      }),
    ];
  }

  const Outside = '-10000px';
  class TooltipViewManager {
    constructor(view, facet, createTooltipView) {
      this.facet = facet;
      this.createTooltipView = createTooltipView;
      this.input = view.state.facet(facet);
      this.tooltips = this.input.filter(t => t);
      this.tooltipViews = this.tooltips.map(createTooltipView);
    }
    update(update) {
      let input = update.state.facet(this.facet);
      let tooltips = input.filter(x => x);
      if (input === this.input) {
        for (let t of this.tooltipViews) if (t.update) t.update(update);
        return false;
      }
      let tooltipViews = [];
      for (let i = 0; i < tooltips.length; i++) {
        let tip = tooltips[i],
          known = -1;
        if (!tip) continue;
        for (let i = 0; i < this.tooltips.length; i++) {
          let other = this.tooltips[i];
          if (other && other.create == tip.create) known = i;
        }
        if (known < 0) {
          tooltipViews[i] = this.createTooltipView(tip);
        } else {
          let tooltipView = (tooltipViews[i] = this.tooltipViews[known]);
          if (tooltipView.update) tooltipView.update(update);
        }
      }
      for (let t of this.tooltipViews) if (tooltipViews.indexOf(t) < 0) t.dom.remove();
      this.input = input;
      this.tooltips = tooltips;
      this.tooltipViews = tooltipViews;
      return true;
    }
  }
  function tooltips(config = {}) {
    return tooltipConfig.of(config);
  }
  function windowSpace() {
    return { top: 0, left: 0, bottom: innerHeight, right: innerWidth };
  }
  const tooltipConfig = Facet.define({
    combine: values => {
      var _a, _b, _c;
      return {
        position: dist_browser.ios
          ? 'absolute'
          : ((_a = values.find(conf => conf.position)) === null || _a === void 0
              ? void 0
              : _a.position) || 'fixed',
        parent:
          ((_b = values.find(conf => conf.parent)) === null || _b === void 0
            ? void 0
            : _b.parent) || null,
        tooltipSpace:
          ((_c = values.find(conf => conf.tooltipSpace)) === null || _c === void 0
            ? void 0
            : _c.tooltipSpace) || windowSpace,
      };
    },
  });
  const tooltipPlugin = dist_ViewPlugin.fromClass(
    class {
      constructor(view) {
        var _a;
        this.view = view;
        this.inView = true;
        this.lastTransaction = 0;
        this.measureTimeout = -1;
        let config = view.state.facet(tooltipConfig);
        this.position = config.position;
        this.parent = config.parent;
        this.classes = view.themeClasses;
        this.createContainer();
        this.measureReq = {
          read: this.readMeasure.bind(this),
          write: this.writeMeasure.bind(this),
          key: this,
        };
        this.manager = new TooltipViewManager(view, showTooltip, t => this.createTooltip(t));
        this.intersectionObserver =
          typeof IntersectionObserver == 'function'
            ? new IntersectionObserver(
                entries => {
                  if (
                    Date.now() > this.lastTransaction - 50 &&
                    entries.length > 0 &&
                    entries[entries.length - 1].intersectionRatio < 1
                  )
                    this.measureSoon();
                },
                { threshold: [1] },
              )
            : null;
        this.observeIntersection();
        (_a = view.dom.ownerDocument.defaultView) === null || _a === void 0
          ? void 0
          : _a.addEventListener('resize', (this.measureSoon = this.measureSoon.bind(this)));
        this.maybeMeasure();
      }
      createContainer() {
        if (this.parent) {
          this.container = document.createElement('div');
          this.container.style.position = 'relative';
          this.container.className = this.view.themeClasses;
          this.parent.appendChild(this.container);
        } else {
          this.container = this.view.dom;
        }
      }
      observeIntersection() {
        if (this.intersectionObserver) {
          this.intersectionObserver.disconnect();
          for (let tooltip of this.manager.tooltipViews)
            this.intersectionObserver.observe(tooltip.dom);
        }
      }
      measureSoon() {
        if (this.measureTimeout < 0)
          this.measureTimeout = setTimeout(() => {
            this.measureTimeout = -1;
            this.maybeMeasure();
          }, 50);
      }
      update(update) {
        if (update.transactions.length) this.lastTransaction = Date.now();
        let updated = this.manager.update(update);
        if (updated) this.observeIntersection();
        let shouldMeasure = updated || update.geometryChanged;
        let newConfig = update.state.facet(tooltipConfig);
        if (newConfig.position != this.position) {
          this.position = newConfig.position;
          for (let t of this.manager.tooltipViews) t.dom.style.position = this.position;
          shouldMeasure = true;
        }
        if (newConfig.parent != this.parent) {
          if (this.parent) this.container.remove();
          this.parent = newConfig.parent;
          this.createContainer();
          for (let t of this.manager.tooltipViews) this.container.appendChild(t.dom);
          shouldMeasure = true;
        } else if (this.parent && this.view.themeClasses != this.classes) {
          this.classes = this.container.className = this.view.themeClasses;
        }
        if (shouldMeasure) this.maybeMeasure();
      }
      createTooltip(tooltip) {
        let tooltipView = tooltip.create(this.view);
        tooltipView.dom.classList.add('cm-tooltip');
        if (tooltip.arrow && !tooltipView.dom.querySelector('.cm-tooltip > .cm-tooltip-arrow')) {
          let arrow = document.createElement('div');
          arrow.className = 'cm-tooltip-arrow';
          tooltipView.dom.appendChild(arrow);
        }
        tooltipView.dom.style.position = this.position;
        tooltipView.dom.style.top = Outside;
        this.container.appendChild(tooltipView.dom);
        if (tooltipView.mount) tooltipView.mount(this.view);
        return tooltipView;
      }
      destroy() {
        var _a, _b;
        (_a = this.view.dom.ownerDocument.defaultView) === null || _a === void 0
          ? void 0
          : _a.removeEventListener('resize', this.measureSoon);
        for (let { dom } of this.manager.tooltipViews) dom.remove();
        (_b = this.intersectionObserver) === null || _b === void 0 ? void 0 : _b.disconnect();
        clearTimeout(this.measureTimeout);
      }
      readMeasure() {
        let editor = this.view.dom.getBoundingClientRect();
        return {
          editor,
          parent: this.parent ? this.container.getBoundingClientRect() : editor,
          pos: this.manager.tooltips.map((t, i) => {
            let tv = this.manager.tooltipViews[i];
            return tv.getCoords ? tv.getCoords(t.pos) : this.view.coordsAtPos(t.pos);
          }),
          size: this.manager.tooltipViews.map(({ dom }) => dom.getBoundingClientRect()),
          space: this.view.state.facet(tooltipConfig).tooltipSpace(this.view),
        };
      }
      writeMeasure(measured) {
        let { editor, space } = measured;
        let others = [];
        for (let i = 0; i < this.manager.tooltips.length; i++) {
          let tooltip = this.manager.tooltips[i],
            tView = this.manager.tooltipViews[i],
            { dom } = tView;
          let pos = measured.pos[i],
            size = measured.size[i];
          if (
            !pos ||
            pos.bottom <= Math.max(editor.top, space.top) ||
            pos.top >= Math.min(editor.bottom, space.bottom) ||
            pos.right < Math.max(editor.left, space.left) - 0.1 ||
            pos.left > Math.min(editor.right, space.right) + 0.1
          ) {
            dom.style.top = Outside;
            continue;
          }
          let arrow = tooltip.arrow ? tView.dom.querySelector('.cm-tooltip-arrow') : null;
          let arrowHeight = arrow ? 7 : 0;
          let width = size.right - size.left,
            height = size.bottom - size.top;
          let offset = tView.offset || noOffset,
            ltr = this.view.textDirection == Direction.LTR;
          let left =
            size.width > space.right - space.left
              ? ltr
                ? space.left
                : space.right - size.width
              : ltr
              ? Math.min(pos.left - (arrow ? 14 : 0) + offset.x, space.right - width)
              : Math.max(space.left, pos.left - width + (arrow ? 14 : 0) - offset.x);
          let above = !!tooltip.above;
          if (
            !tooltip.strictSide &&
            (above
              ? pos.top - (size.bottom - size.top) - offset.y < space.top
              : pos.bottom + (size.bottom - size.top) + offset.y > space.bottom) &&
            above == space.bottom - pos.bottom > pos.top - space.top
          )
            above = !above;
          let top = above
            ? pos.top - height - arrowHeight - offset.y
            : pos.bottom + arrowHeight + offset.y;
          let right = left + width;
          if (tView.overlap !== true)
            for (let r of others)
              if (r.left < right && r.right > left && r.top < top + height && r.bottom > top)
                top = above ? r.top - height - 2 - arrowHeight : r.bottom + arrowHeight + 2;
          if (this.position == 'absolute') {
            dom.style.top = top - measured.parent.top + 'px';
            dom.style.left = left - measured.parent.left + 'px';
          } else {
            dom.style.top = top + 'px';
            dom.style.left = left + 'px';
          }
          if (arrow)
            arrow.style.left = `${pos.left + (ltr ? offset.x : -offset.x) - (left + 14 - 7)}px`;
          if (tView.overlap !== true) others.push({ left, top, right, bottom: top + height });
          dom.classList.toggle('cm-tooltip-above', above);
          dom.classList.toggle('cm-tooltip-below', !above);
          if (tView.positioned) tView.positioned();
        }
      }
      maybeMeasure() {
        if (this.manager.tooltips.length) {
          if (this.view.inView) this.view.requestMeasure(this.measureReq);
          if (this.inView != this.view.inView) {
            this.inView = this.view.inView;
            if (!this.inView) for (let tv of this.manager.tooltipViews) tv.dom.style.top = Outside;
          }
        }
      }
    },
    {
      eventHandlers: {
        scroll() {
          this.maybeMeasure();
        },
      },
    },
  );
  const baseTheme = EditorView.baseTheme({
    '.cm-tooltip': {
      zIndex: 100,
    },
    '&light .cm-tooltip': {
      border: '1px solid #bbb',
      backgroundColor: '#f5f5f5',
    },
    '&light .cm-tooltip-section:not(:first-child)': {
      borderTop: '1px solid #bbb',
    },
    '&dark .cm-tooltip': {
      backgroundColor: '#333338',
      color: 'white',
    },
    '.cm-tooltip-arrow': {
      height: `${7}px`,
      width: `${7 * 2}px`,
      position: 'absolute',
      zIndex: -1,
      overflow: 'hidden',
      '&:before, &:after': {
        content: "''",
        position: 'absolute',
        width: 0,
        height: 0,
        borderLeft: `${7}px solid transparent`,
        borderRight: `${7}px solid transparent`,
      },
      '.cm-tooltip-above &': {
        bottom: `-${7}px`,
        '&:before': {
          borderTop: `${7}px solid #bbb`,
        },
        '&:after': {
          borderTop: `${7}px solid #f5f5f5`,
          bottom: '1px',
        },
      },
      '.cm-tooltip-below &': {
        top: `-${7}px`,
        '&:before': {
          borderBottom: `${7}px solid #bbb`,
        },
        '&:after': {
          borderBottom: `${7}px solid #f5f5f5`,
          top: '1px',
        },
      },
    },
    '&dark .cm-tooltip .cm-tooltip-arrow': {
      '&:before': {
        borderTopColor: '#333338',
        borderBottomColor: '#333338',
      },
      '&:after': {
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
      },
    },
  });
  const noOffset = { x: 0, y: 0 };
  const showTooltip = Facet.define({
    enables: [tooltipPlugin, baseTheme],
  });
  const showHoverTooltip = Facet.define();
  class HoverTooltipHost {
    constructor(view) {
      this.view = view;
      this.mounted = false;
      this.dom = document.createElement('div');
      this.dom.classList.add('cm-tooltip-hover');
      this.manager = new TooltipViewManager(view, showHoverTooltip, t => this.createHostedView(t));
    }
    static create(view) {
      return new HoverTooltipHost(view);
    }
    createHostedView(tooltip) {
      let hostedView = tooltip.create(this.view);
      hostedView.dom.classList.add('cm-tooltip-section');
      this.dom.appendChild(hostedView.dom);
      if (this.mounted && hostedView.mount) hostedView.mount(this.view);
      return hostedView;
    }
    mount(view) {
      for (let hostedView of this.manager.tooltipViews) {
        if (hostedView.mount) hostedView.mount(view);
      }
      this.mounted = true;
    }
    positioned() {
      for (let hostedView of this.manager.tooltipViews) {
        if (hostedView.positioned) hostedView.positioned();
      }
    }
    update(update) {
      this.manager.update(update);
    }
  }
  const showHoverTooltipHost = showTooltip.compute([showHoverTooltip], state => {
    let tooltips = state.facet(showHoverTooltip).filter(t => t);
    if (tooltips.length === 0) return null;
    return {
      pos: Math.min(...tooltips.map(t => t.pos)),
      end: Math.max(...tooltips.filter(t => t.end != null).map(t => t.end)),
      create: HoverTooltipHost.create,
      above: tooltips[0].above,
      arrow: tooltips.some(t => t.arrow),
    };
  });
  class HoverPlugin {
    constructor(view, source, field, setHover, hoverTime) {
      this.view = view;
      this.source = source;
      this.field = field;
      this.setHover = setHover;
      this.hoverTime = hoverTime;
      this.hoverTimeout = -1;
      this.restartTimeout = -1;
      this.pending = null;
      this.lastMove = { x: 0, y: 0, target: view.dom, time: 0 };
      this.checkHover = this.checkHover.bind(this);
      view.dom.addEventListener('mouseleave', (this.mouseleave = this.mouseleave.bind(this)));
      view.dom.addEventListener('mousemove', (this.mousemove = this.mousemove.bind(this)));
    }
    update() {
      if (this.pending) {
        this.pending = null;
        clearTimeout(this.restartTimeout);
        this.restartTimeout = setTimeout(() => this.startHover(), 20);
      }
    }
    get active() {
      return this.view.state.field(this.field);
    }
    checkHover() {
      this.hoverTimeout = -1;
      if (this.active) return;
      let hovered = Date.now() - this.lastMove.time;
      if (hovered < this.hoverTime)
        this.hoverTimeout = setTimeout(this.checkHover, this.hoverTime - hovered);
      else this.startHover();
    }
    startHover() {
      clearTimeout(this.restartTimeout);
      let { lastMove } = this;
      let pos = this.view.contentDOM.contains(lastMove.target)
        ? this.view.posAtCoords(lastMove)
        : null;
      if (pos == null) return;
      let posCoords = this.view.coordsAtPos(pos);
      if (
        posCoords == null ||
        lastMove.y < posCoords.top ||
        lastMove.y > posCoords.bottom ||
        lastMove.x < posCoords.left - this.view.defaultCharacterWidth ||
        lastMove.x > posCoords.right + this.view.defaultCharacterWidth
      )
        return;
      let bidi = this.view
        .bidiSpans(this.view.state.doc.lineAt(pos))
        .find(s => s.from <= pos && s.to >= pos);
      let rtl = bidi && bidi.dir == Direction.RTL ? -1 : 1;
      let open = this.source(this.view, pos, lastMove.x < posCoords.left ? -rtl : rtl);
      if (open === null || open === void 0 ? void 0 : open.then) {
        let pending = (this.pending = { pos });
        open.then(
          result => {
            if (this.pending == pending) {
              this.pending = null;
              if (result) this.view.dispatch({ effects: this.setHover.of(result) });
            }
          },
          e => logException(this.view.state, e, 'hover tooltip'),
        );
      } else if (open) {
        this.view.dispatch({ effects: this.setHover.of(open) });
      }
    }
    mousemove(event) {
      var _a;
      this.lastMove = {
        x: event.clientX,
        y: event.clientY,
        target: event.target,
        time: Date.now(),
      };
      if (this.hoverTimeout < 0) this.hoverTimeout = setTimeout(this.checkHover, this.hoverTime);
      let tooltip = this.active;
      if ((tooltip && !isInTooltip(this.lastMove.target)) || this.pending) {
        let { pos } = tooltip || this.pending,
          end =
            (_a = tooltip === null || tooltip === void 0 ? void 0 : tooltip.end) !== null &&
            _a !== void 0
              ? _a
              : pos;
        if (
          pos == end
            ? this.view.posAtCoords(this.lastMove) != pos
            : !isOverRange(this.view, pos, end, event.clientX, event.clientY, 6)
        ) {
          this.view.dispatch({ effects: this.setHover.of(null) });
          this.pending = null;
        }
      }
    }
    mouseleave() {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = -1;
      if (this.active) this.view.dispatch({ effects: this.setHover.of(null) });
    }
    destroy() {
      clearTimeout(this.hoverTimeout);
      this.view.dom.removeEventListener('mouseleave', this.mouseleave);
      this.view.dom.removeEventListener('mousemove', this.mousemove);
    }
  }
  function isInTooltip(elt) {
    for (let cur = elt; cur; cur = cur.parentNode)
      if (cur.nodeType == 1 && cur.classList.contains('cm-tooltip')) return true;
    return false;
  }
  function isOverRange(view, from, to, x, y, margin) {
    let range = document.createRange();
    let fromDOM = view.domAtPos(from),
      toDOM = view.domAtPos(to);
    range.setEnd(toDOM.node, toDOM.offset);
    range.setStart(fromDOM.node, fromDOM.offset);
    let rects = range.getClientRects();
    range.detach();
    for (let i = 0; i < rects.length; i++) {
      let rect = rects[i];
      let dist = Math.max(rect.top - y, y - rect.bottom, rect.left - x, x - rect.right);
      if (dist <= margin) return true;
    }
    return false;
  }
  function hoverTooltip(source, options = {}) {
    let setHover = StateEffect.define();
    let hoverState = StateField.define({
      create() {
        return null;
      },
      update(value, tr) {
        if (
          value &&
          ((options.hideOnChange && (tr.docChanged || tr.selection)) ||
            (options.hideOn && options.hideOn(tr, value)))
        )
          return null;
        if (value && tr.docChanged) {
          let newPos = tr.changes.mapPos(value.pos, -1, MapMode.TrackDel);
          if (newPos == null) return null;
          let copy = Object.assign(Object.create(null), value);
          copy.pos = newPos;
          if (value.end != null) copy.end = tr.changes.mapPos(value.end);
          value = copy;
        }
        for (let effect of tr.effects) {
          if (effect.is(setHover)) value = effect.value;
          if (effect.is(closeHoverTooltipEffect)) value = null;
        }
        return value;
      },
      provide: f => showHoverTooltip.from(f),
    });
    return [
      hoverState,
      dist_ViewPlugin.define(
        view => new HoverPlugin(view, source, hoverState, setHover, options.hoverTime || 300),
      ),
      showHoverTooltipHost,
    ];
  }
  function getTooltip(view, tooltip) {
    let plugin = view.plugin(tooltipPlugin);
    if (!plugin) return null;
    let found = plugin.manager.tooltips.indexOf(tooltip);
    return found < 0 ? null : plugin.manager.tooltipViews[found];
  }
  function hasHoverTooltips(state) {
    return state.facet(showHoverTooltip).some(x => x);
  }
  const closeHoverTooltipEffect = null && StateEffect.define();
  const closeHoverTooltips = null && closeHoverTooltipEffect.of(null);
  function repositionTooltips(view) {
    var _a;
    (_a = view.plugin(tooltipPlugin)) === null || _a === void 0 ? void 0 : _a.maybeMeasure();
  }

  const panelConfig = Facet.define({
    combine(configs) {
      let topContainer, bottomContainer;
      for (let c of configs) {
        topContainer = topContainer || c.topContainer;
        bottomContainer = bottomContainer || c.bottomContainer;
      }
      return { topContainer, bottomContainer };
    },
  });
  function panels(config) {
    return config ? [panelConfig.of(config)] : [];
  }
  function getPanel(view, panel) {
    let plugin = view.plugin(panelPlugin);
    let index = plugin ? plugin.specs.indexOf(panel) : -1;
    return index > -1 ? plugin.panels[index] : null;
  }
  const panelPlugin = dist_ViewPlugin.fromClass(
    class {
      constructor(view) {
        this.input = view.state.facet(showPanel);
        this.specs = this.input.filter(s => s);
        this.panels = this.specs.map(spec => spec(view));
        let conf = view.state.facet(panelConfig);
        this.top = new PanelGroup(view, true, conf.topContainer);
        this.bottom = new PanelGroup(view, false, conf.bottomContainer);
        this.top.sync(this.panels.filter(p => p.top));
        this.bottom.sync(this.panels.filter(p => !p.top));
        for (let p of this.panels) {
          p.dom.classList.add('cm-panel');
          if (p.mount) p.mount();
        }
      }
      update(update) {
        let conf = update.state.facet(panelConfig);
        if (this.top.container != conf.topContainer) {
          this.top.sync([]);
          this.top = new PanelGroup(update.view, true, conf.topContainer);
        }
        if (this.bottom.container != conf.bottomContainer) {
          this.bottom.sync([]);
          this.bottom = new PanelGroup(update.view, false, conf.bottomContainer);
        }
        this.top.syncClasses();
        this.bottom.syncClasses();
        let input = update.state.facet(showPanel);
        if (input != this.input) {
          let specs = input.filter(x => x);
          let panels = [],
            top = [],
            bottom = [],
            mount = [];
          for (let spec of specs) {
            let known = this.specs.indexOf(spec),
              panel;
            if (known < 0) {
              panel = spec(update.view);
              mount.push(panel);
            } else {
              panel = this.panels[known];
              if (panel.update) panel.update(update);
            }
            panels.push(panel);
            (panel.top ? top : bottom).push(panel);
          }
          this.specs = specs;
          this.panels = panels;
          this.top.sync(top);
          this.bottom.sync(bottom);
          for (let p of mount) {
            p.dom.classList.add('cm-panel');
            if (p.mount) p.mount();
          }
        } else {
          for (let p of this.panels) if (p.update) p.update(update);
        }
      }
      destroy() {
        this.top.sync([]);
        this.bottom.sync([]);
      }
    },
    {
      provide: plugin =>
        EditorView.scrollMargins.of(view => {
          let value = view.plugin(plugin);
          return value && { top: value.top.scrollMargin(), bottom: value.bottom.scrollMargin() };
        }),
    },
  );
  class PanelGroup {
    constructor(view, top, container) {
      this.view = view;
      this.top = top;
      this.container = container;
      this.dom = undefined;
      this.classes = '';
      this.panels = [];
      this.syncClasses();
    }
    sync(panels) {
      for (let p of this.panels) if (p.destroy && panels.indexOf(p) < 0) p.destroy();
      this.panels = panels;
      this.syncDOM();
    }
    syncDOM() {
      if (this.panels.length == 0) {
        if (this.dom) {
          this.dom.remove();
          this.dom = undefined;
        }
        return;
      }
      if (!this.dom) {
        this.dom = document.createElement('div');
        this.dom.className = this.top ? 'cm-panels cm-panels-top' : 'cm-panels cm-panels-bottom';
        this.dom.style[this.top ? 'top' : 'bottom'] = '0';
        let parent = this.container || this.view.dom;
        parent.insertBefore(this.dom, this.top ? parent.firstChild : null);
      }
      let curDOM = this.dom.firstChild;
      for (let panel of this.panels) {
        if (panel.dom.parentNode == this.dom) {
          while (curDOM != panel.dom) curDOM = rm(curDOM);
          curDOM = curDOM.nextSibling;
        } else {
          this.dom.insertBefore(panel.dom, curDOM);
        }
      }
      while (curDOM) curDOM = rm(curDOM);
    }
    scrollMargin() {
      return !this.dom || this.container
        ? 0
        : Math.max(
            0,
            this.top
              ? this.dom.getBoundingClientRect().bottom -
                  Math.max(0, this.view.scrollDOM.getBoundingClientRect().top)
              : Math.min(innerHeight, this.view.scrollDOM.getBoundingClientRect().bottom) -
                  this.dom.getBoundingClientRect().top,
          );
    }
    syncClasses() {
      if (!this.container || this.classes == this.view.themeClasses) return;
      for (let cls of this.classes.split(' ')) if (cls) this.container.classList.remove(cls);
      for (let cls of (this.classes = this.view.themeClasses).split(' '))
        if (cls) this.container.classList.add(cls);
    }
  }
  function rm(node) {
    let next = node.nextSibling;
    node.remove();
    return next;
  }
  const showPanel = Facet.define({
    enables: panelPlugin,
  });

  class dist_GutterMarker extends RangeValue {
    compare(other) {
      return this == other || (this.constructor == other.constructor && this.eq(other));
    }
    eq(other) {
      return false;
    }
    destroy(dom) {}
  }
  dist_GutterMarker.prototype.elementClass = '';
  dist_GutterMarker.prototype.toDOM = undefined;
  dist_GutterMarker.prototype.mapMode = dist_MapMode.TrackBefore;
  dist_GutterMarker.prototype.startSide = dist_GutterMarker.prototype.endSide = -1;
  dist_GutterMarker.prototype.point = true;
  const gutterLineClass = Facet.define();
  const defaults = {
    class: '',
    renderEmptyElements: false,
    elementStyle: '',
    markers: () => dist_RangeSet.empty,
    lineMarker: () => null,
    lineMarkerChange: null,
    initialSpacer: null,
    updateSpacer: null,
    domEventHandlers: {},
  };
  const activeGutters = Facet.define();
  function dist_gutter(config) {
    return [gutters(), activeGutters.of(Object.assign(Object.assign({}, defaults), config))];
  }
  const unfixGutters = Facet.define({
    combine: values => values.some(x => x),
  });
  function gutters(config) {
    let result = [gutterView];
    if (config && config.fixed === false) result.push(unfixGutters.of(true));
    return result;
  }
  const gutterView = dist_ViewPlugin.fromClass(
    class {
      constructor(view) {
        this.view = view;
        this.prevViewport = view.viewport;
        this.dom = document.createElement('div');
        this.dom.className = 'cm-gutters';
        this.dom.setAttribute('aria-hidden', 'true');
        this.dom.style.minHeight = this.view.contentHeight + 'px';
        this.gutters = view.state
          .facet(activeGutters)
          .map(conf => new SingleGutterView(view, conf));
        for (let gutter of this.gutters) this.dom.appendChild(gutter.dom);
        this.fixed = !view.state.facet(unfixGutters);
        if (this.fixed) {
          this.dom.style.position = 'sticky';
        }
        this.syncGutters(false);
        view.scrollDOM.insertBefore(this.dom, view.contentDOM);
      }
      update(update) {
        if (this.updateGutters(update)) {
          let vpA = this.prevViewport,
            vpB = update.view.viewport;
          let vpOverlap = Math.min(vpA.to, vpB.to) - Math.max(vpA.from, vpB.from);
          this.syncGutters(vpOverlap < (vpB.to - vpB.from) * 0.8);
        }
        if (update.geometryChanged) this.dom.style.minHeight = this.view.contentHeight + 'px';
        if (this.view.state.facet(unfixGutters) != !this.fixed) {
          this.fixed = !this.fixed;
          this.dom.style.position = this.fixed ? 'sticky' : '';
        }
        this.prevViewport = update.view.viewport;
      }
      syncGutters(detach) {
        let after = this.dom.nextSibling;
        if (detach) this.dom.remove();
        let lineClasses = dist_RangeSet.iter(
          this.view.state.facet(gutterLineClass),
          this.view.viewport.from,
        );
        let classSet = [];
        let contexts = this.gutters.map(
          gutter => new UpdateContext(gutter, this.view.viewport, -this.view.documentPadding.top),
        );
        for (let line of this.view.viewportLineBlocks) {
          let text;
          if (Array.isArray(line.type)) {
            for (let b of line.type)
              if (b.type == BlockType.Text) {
                text = b;
                break;
              }
          } else {
            text = line.type == BlockType.Text ? line : undefined;
          }
          if (!text) continue;
          if (classSet.length) classSet = [];
          advanceCursor(lineClasses, classSet, line.from);
          for (let cx of contexts) cx.line(this.view, text, classSet);
        }
        for (let cx of contexts) cx.finish();
        if (detach) this.view.scrollDOM.insertBefore(this.dom, after);
      }
      updateGutters(update) {
        let prev = update.startState.facet(activeGutters),
          cur = update.state.facet(activeGutters);
        let change =
          update.docChanged ||
          update.heightChanged ||
          update.viewportChanged ||
          !dist_RangeSet.eq(
            update.startState.facet(gutterLineClass),
            update.state.facet(gutterLineClass),
            update.view.viewport.from,
            update.view.viewport.to,
          );
        if (prev == cur) {
          for (let gutter of this.gutters) if (gutter.update(update)) change = true;
        } else {
          change = true;
          let gutters = [];
          for (let conf of cur) {
            let known = prev.indexOf(conf);
            if (known < 0) {
              gutters.push(new SingleGutterView(this.view, conf));
            } else {
              this.gutters[known].update(update);
              gutters.push(this.gutters[known]);
            }
          }
          for (let g of this.gutters) {
            g.dom.remove();
            if (gutters.indexOf(g) < 0) g.destroy();
          }
          for (let g of gutters) this.dom.appendChild(g.dom);
          this.gutters = gutters;
        }
        return change;
      }
      destroy() {
        for (let view of this.gutters) view.destroy();
        this.dom.remove();
      }
    },
    {
      provide: plugin =>
        EditorView.scrollMargins.of(view => {
          let value = view.plugin(plugin);
          if (!value || value.gutters.length == 0 || !value.fixed) return null;
          return view.textDirection == Direction.LTR
            ? { left: value.dom.offsetWidth }
            : { right: value.dom.offsetWidth };
        }),
    },
  );
  function dist_asArray(val) {
    return Array.isArray(val) ? val : [val];
  }
  function advanceCursor(cursor, collect, pos) {
    while (cursor.value && cursor.from <= pos) {
      if (cursor.from == pos) collect.push(cursor.value);
      cursor.next();
    }
  }
  class UpdateContext {
    constructor(gutter, viewport, height) {
      this.gutter = gutter;
      this.height = height;
      this.localMarkers = [];
      this.i = 0;
      this.cursor = dist_RangeSet.iter(gutter.markers, viewport.from);
    }
    line(view, line, extraMarkers) {
      if (this.localMarkers.length) this.localMarkers = [];
      advanceCursor(this.cursor, this.localMarkers, line.from);
      let localMarkers = extraMarkers.length
        ? this.localMarkers.concat(extraMarkers)
        : this.localMarkers;
      let forLine = this.gutter.config.lineMarker(view, line, localMarkers);
      if (forLine) localMarkers.unshift(forLine);
      let gutter = this.gutter;
      if (localMarkers.length == 0 && !gutter.config.renderEmptyElements) return;
      let above = line.top - this.height;
      if (this.i == gutter.elements.length) {
        let newElt = new GutterElement(view, line.height, above, localMarkers);
        gutter.elements.push(newElt);
        gutter.dom.appendChild(newElt.dom);
      } else {
        gutter.elements[this.i].update(view, line.height, above, localMarkers);
      }
      this.height = line.bottom;
      this.i++;
    }
    finish() {
      let gutter = this.gutter;
      while (gutter.elements.length > this.i) {
        let last = gutter.elements.pop();
        gutter.dom.removeChild(last.dom);
        last.destroy();
      }
    }
  }
  class SingleGutterView {
    constructor(view, config) {
      this.view = view;
      this.config = config;
      this.elements = [];
      this.spacer = null;
      this.dom = document.createElement('div');
      this.dom.className = 'cm-gutter' + (this.config.class ? ' ' + this.config.class : '');
      for (let prop in config.domEventHandlers) {
        this.dom.addEventListener(prop, event => {
          let line = view.lineBlockAtHeight(event.clientY - view.documentTop);
          if (config.domEventHandlers[prop](view, line, event)) event.preventDefault();
        });
      }
      this.markers = dist_asArray(config.markers(view));
      if (config.initialSpacer) {
        this.spacer = new GutterElement(view, 0, 0, [config.initialSpacer(view)]);
        this.dom.appendChild(this.spacer.dom);
        this.spacer.dom.style.cssText += 'visibility: hidden; pointer-events: none';
      }
    }
    update(update) {
      let prevMarkers = this.markers;
      this.markers = dist_asArray(this.config.markers(update.view));
      if (this.spacer && this.config.updateSpacer) {
        let updated = this.config.updateSpacer(this.spacer.markers[0], update);
        if (updated != this.spacer.markers[0]) this.spacer.update(update.view, 0, 0, [updated]);
      }
      let vp = update.view.viewport;
      return (
        !dist_RangeSet.eq(this.markers, prevMarkers, vp.from, vp.to) ||
        (this.config.lineMarkerChange ? this.config.lineMarkerChange(update) : false)
      );
    }
    destroy() {
      for (let elt of this.elements) elt.destroy();
    }
  }
  class GutterElement {
    constructor(view, height, above, markers) {
      this.height = -1;
      this.above = 0;
      this.markers = [];
      this.dom = document.createElement('div');
      this.dom.className = 'cm-gutterElement';
      this.update(view, height, above, markers);
    }
    update(view, height, above, markers) {
      if (this.height != height) this.dom.style.height = (this.height = height) + 'px';
      if (this.above != above) this.dom.style.marginTop = (this.above = above) ? above + 'px' : '';
      if (!sameMarkers(this.markers, markers)) this.setMarkers(view, markers);
    }
    setMarkers(view, markers) {
      let cls = 'cm-gutterElement',
        domPos = this.dom.firstChild;
      for (let iNew = 0, iOld = 0; ; ) {
        let skipTo = iOld,
          marker = iNew < markers.length ? markers[iNew++] : null,
          matched = false;
        if (marker) {
          let c = marker.elementClass;
          if (c) cls += ' ' + c;
          for (let i = iOld; i < this.markers.length; i++)
            if (this.markers[i].compare(marker)) {
              skipTo = i;
              matched = true;
              break;
            }
        } else {
          skipTo = this.markers.length;
        }
        while (iOld < skipTo) {
          let next = this.markers[iOld++];
          if (next.toDOM) {
            next.destroy(domPos);
            let after = domPos.nextSibling;
            domPos.remove();
            domPos = after;
          }
        }
        if (!marker) break;
        if (marker.toDOM) {
          if (matched) domPos = domPos.nextSibling;
          else this.dom.insertBefore(marker.toDOM(view), domPos);
        }
        if (matched) iOld++;
      }
      this.dom.className = cls;
      this.markers = markers;
    }
    destroy() {
      this.setMarkers(null, []);
    }
  }
  function sameMarkers(a, b) {
    if (a.length != b.length) return false;
    for (let i = 0; i < a.length; i++) if (!a[i].compare(b[i])) return false;
    return true;
  }
  const lineNumberMarkers = Facet.define();
  const lineNumberConfig = Facet.define({
    combine(values) {
      return combineConfig(
        values,
        { formatNumber: String, domEventHandlers: {} },
        {
          domEventHandlers(a, b) {
            let result = Object.assign({}, a);
            for (let event in b) {
              let exists = result[event],
                add = b[event];
              result[event] = exists
                ? (view, line, event) => exists(view, line, event) || add(view, line, event)
                : add;
            }
            return result;
          },
        },
      );
    },
  });
  class NumberMarker extends dist_GutterMarker {
    constructor(number) {
      super();
      this.number = number;
    }
    eq(other) {
      return this.number == other.number;
    }
    toDOM() {
      return document.createTextNode(this.number);
    }
  }
  function formatNumber(view, number) {
    return view.state.facet(lineNumberConfig).formatNumber(number, view.state);
  }
  const lineNumberGutter = activeGutters.compute([lineNumberConfig], state => ({
    class: 'cm-lineNumbers',
    renderEmptyElements: false,
    markers(view) {
      return view.state.facet(lineNumberMarkers);
    },
    lineMarker(view, line, others) {
      if (others.some(m => m.toDOM)) return null;
      return new NumberMarker(formatNumber(view, view.state.doc.lineAt(line.from).number));
    },
    lineMarkerChange: update =>
      update.startState.facet(lineNumberConfig) != update.state.facet(lineNumberConfig),
    initialSpacer(view) {
      return new NumberMarker(formatNumber(view, maxLineNumber(view.state.doc.lines)));
    },
    updateSpacer(spacer, update) {
      let max = formatNumber(update.view, maxLineNumber(update.view.state.doc.lines));
      return max == spacer.number ? spacer : new NumberMarker(max);
    },
    domEventHandlers: state.facet(lineNumberConfig).domEventHandlers,
  }));
  function lineNumbers(config = {}) {
    return [lineNumberConfig.of(config), gutters(), lineNumberGutter];
  }
  function maxLineNumber(lines) {
    let last = 9;
    while (last < lines) last = last * 10 + 9;
    return last;
  }
  const activeLineGutterMarker = new (class extends dist_GutterMarker {
    constructor() {
      super(...arguments);
      this.elementClass = 'cm-activeLineGutter';
    }
  })();
  const activeLineGutterHighlighter = gutterLineClass.compute(['selection'], state => {
    let marks = [],
      last = -1;
    for (let range of state.selection.ranges)
      if (range.empty) {
        let linePos = state.doc.lineAt(range.head).from;
        if (linePos > last) {
          last = linePos;
          marks.push(activeLineGutterMarker.range(linePos));
        }
      }
    return dist_RangeSet.of(marks);
  });
  function highlightActiveLineGutter() {
    return activeLineGutterHighlighter;
  }

  const __test = {
    HeightMap,
    HeightOracle,
    MeasuredHeights,
    QueryType,
    ChangedRange,
    computeOrder,
    moveVisually,
  };

  let nextTagID = 0;
  class Tag {
    constructor(set, base, modified) {
      this.set = set;
      this.base = base;
      this.modified = modified;
      this.id = nextTagID++;
    }
    static define(parent) {
      if (parent === null || parent === void 0 ? void 0 : parent.base)
        throw new Error('Can not derive from a modified tag');
      let tag = new Tag([], null, []);
      tag.set.push(tag);
      if (parent) for (let t of parent.set) tag.set.push(t);
      return tag;
    }
    static defineModifier() {
      let mod = new Modifier();
      return tag => {
        if (tag.modified.indexOf(mod) > -1) return tag;
        return Modifier.get(
          tag.base || tag,
          tag.modified.concat(mod).sort((a, b) => a.id - b.id),
        );
      };
    }
  }
  let nextModifierID = 0;
  class Modifier {
    constructor() {
      this.instances = [];
      this.id = nextModifierID++;
    }
    static get(base, mods) {
      if (!mods.length) return base;
      let exists = mods[0].instances.find(t => t.base == base && dist_sameArray(mods, t.modified));
      if (exists) return exists;
      let set = [],
        tag = new Tag(set, base, mods);
      for (let m of mods) m.instances.push(tag);
      let configs = permute(mods);
      for (let parent of base.set)
        for (let config of configs) set.push(Modifier.get(parent, config));
      return tag;
    }
  }
  function dist_sameArray(a, b) {
    return a.length == b.length && a.every((x, i) => x == b[i]);
  }
  function permute(array) {
    let result = [array];
    for (let i = 0; i < array.length; i++) {
      for (let a of permute(array.slice(0, i).concat(array.slice(i + 1)))) result.push(a);
    }
    return result;
  }
  function styleTags(spec) {
    let byName = Object.create(null);
    for (let prop in spec) {
      let tags = spec[prop];
      if (!Array.isArray(tags)) tags = [tags];
      for (let part of prop.split(' '))
        if (part) {
          let pieces = [],
            mode = 2,
            rest = part;
          for (let pos = 0; ; ) {
            if (rest == '...' && pos > 0 && pos + 3 == part.length) {
              mode = 1;
              break;
            }
            let m = /^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(rest);
            if (!m) throw new RangeError('Invalid path: ' + part);
            pieces.push(m[0] == '*' ? '' : m[0][0] == '"' ? JSON.parse(m[0]) : m[0]);
            pos += m[0].length;
            if (pos == part.length) break;
            let next = part[pos++];
            if (pos == part.length && next == '!') {
              mode = 0;
              break;
            }
            if (next != '/') throw new RangeError('Invalid path: ' + part);
            rest = part.slice(pos);
          }
          let last = pieces.length - 1,
            inner = pieces[last];
          if (!inner) throw new RangeError('Invalid path: ' + part);
          let rule = new Rule(tags, mode, last > 0 ? pieces.slice(0, last) : null);
          byName[inner] = rule.sort(byName[inner]);
        }
    }
    return ruleNodeProp.add(byName);
  }
  const ruleNodeProp = new dist_NodeProp();
  class Rule {
    constructor(tags, mode, context, next) {
      this.tags = tags;
      this.mode = mode;
      this.context = context;
      this.next = next;
    }
    sort(other) {
      if (!other || other.depth < this.depth) {
        this.next = other;
        return this;
      }
      other.next = this.sort(other.next);
      return other;
    }
    get depth() {
      return this.context ? this.context.length : 0;
    }
  }
  function tagHighlighter(tags, options) {
    let map = Object.create(null);
    for (let style of tags) {
      if (!Array.isArray(style.tag)) map[style.tag.id] = style.class;
      else for (let tag of style.tag) map[tag.id] = style.class;
    }
    let { scope, all = null } = options || {};
    return {
      style: tags => {
        let cls = all;
        for (let tag of tags) {
          for (let sub of tag.set) {
            let tagClass = map[sub.id];
            if (tagClass) {
              cls = cls ? cls + ' ' + tagClass : tagClass;
              break;
            }
          }
        }
        return cls;
      },
      scope: scope,
    };
  }
  function highlightTags(highlighters, tags) {
    let result = null;
    for (let highlighter of highlighters) {
      let value = highlighter.style(tags);
      if (value) result = result ? result + ' ' + value : value;
    }
    return result;
  }
  function highlightTree(tree, highlighter, putStyle, from = 0, to = tree.length) {
    let builder = new HighlightBuilder(
      from,
      Array.isArray(highlighter) ? highlighter : [highlighter],
      putStyle,
    );
    builder.highlightRange(tree.cursor(), from, to, '', builder.highlighters);
    builder.flush(to);
  }
  class HighlightBuilder {
    constructor(at, highlighters, span) {
      this.at = at;
      this.highlighters = highlighters;
      this.span = span;
      this.class = '';
    }
    startSpan(at, cls) {
      if (cls != this.class) {
        this.flush(at);
        if (at > this.at) this.at = at;
        this.class = cls;
      }
    }
    flush(to) {
      if (to > this.at && this.class) this.span(this.at, to, this.class);
    }
    highlightRange(cursor, from, to, inheritedClass, highlighters) {
      let { type, from: start, to: end } = cursor;
      if (start >= to || end <= from) return;
      if (type.isTop) highlighters = this.highlighters.filter(h => !h.scope || h.scope(type));
      let cls = inheritedClass;
      let rule = type.prop(ruleNodeProp),
        opaque = false;
      while (rule) {
        if (!rule.context || cursor.matchContext(rule.context)) {
          let tagCls = highlightTags(highlighters, rule.tags);
          if (tagCls) {
            if (cls) cls += ' ';
            cls += tagCls;
            if (rule.mode == 1) inheritedClass += (inheritedClass ? ' ' : '') + tagCls;
            else if (rule.mode == 0) opaque = true;
          }
          break;
        }
        rule = rule.next;
      }
      this.startSpan(cursor.from, cls);
      if (opaque) return;
      let mounted = cursor.tree && cursor.tree.prop(dist_NodeProp.mounted);
      if (mounted && mounted.overlay) {
        let inner = cursor.node.enter(mounted.overlay[0].from + start, 1);
        let innerHighlighters = this.highlighters.filter(
          h => !h.scope || h.scope(mounted.tree.type),
        );
        let hasChild = cursor.firstChild();
        for (let i = 0, pos = start; ; i++) {
          let next = i < mounted.overlay.length ? mounted.overlay[i] : null;
          let nextPos = next ? next.from + start : end;
          let rangeFrom = Math.max(from, pos),
            rangeTo = Math.min(to, nextPos);
          if (rangeFrom < rangeTo && hasChild) {
            while (cursor.from < rangeTo) {
              this.highlightRange(cursor, rangeFrom, rangeTo, inheritedClass, highlighters);
              this.startSpan(Math.min(to, cursor.to), cls);
              if (cursor.to >= nextPos || !cursor.nextSibling()) break;
            }
          }
          if (!next || nextPos > to) break;
          pos = next.to + start;
          if (pos > from) {
            this.highlightRange(
              inner.cursor(),
              Math.max(from, next.from + start),
              Math.min(to, pos),
              inheritedClass,
              innerHighlighters,
            );
            this.startSpan(pos, cls);
          }
        }
        if (hasChild) cursor.parent();
      } else if (cursor.firstChild()) {
        do {
          if (cursor.to <= from) continue;
          if (cursor.from >= to) break;
          this.highlightRange(cursor, from, to, inheritedClass, highlighters);
          this.startSpan(Math.min(to, cursor.to), cls);
        } while (cursor.nextSibling());
        cursor.parent();
      }
    }
  }
  const dist_t = Tag.define;
  const comment = dist_t(),
    dist_name = dist_t(),
    typeName = dist_t(dist_name),
    propertyName = dist_t(dist_name),
    literal = dist_t(),
    string = dist_t(literal),
    number = dist_t(literal),
    content = dist_t(),
    heading = dist_t(content),
    keyword = dist_t(),
    operator = dist_t(),
    punctuation = dist_t(),
    bracket = dist_t(punctuation),
    meta = dist_t();
  const tags = {
    comment,
    lineComment: dist_t(comment),
    blockComment: dist_t(comment),
    docComment: dist_t(comment),
    name: dist_name,
    variableName: dist_t(dist_name),
    typeName: typeName,
    tagName: dist_t(typeName),
    propertyName: propertyName,
    attributeName: dist_t(propertyName),
    className: dist_t(dist_name),
    labelName: dist_t(dist_name),
    namespace: dist_t(dist_name),
    macroName: dist_t(dist_name),
    literal,
    string,
    docString: dist_t(string),
    character: dist_t(string),
    attributeValue: dist_t(string),
    number,
    integer: dist_t(number),
    float: dist_t(number),
    bool: dist_t(literal),
    regexp: dist_t(literal),
    escape: dist_t(literal),
    color: dist_t(literal),
    url: dist_t(literal),
    keyword,
    self: dist_t(keyword),
    null: dist_t(keyword),
    atom: dist_t(keyword),
    unit: dist_t(keyword),
    modifier: dist_t(keyword),
    operatorKeyword: dist_t(keyword),
    controlKeyword: dist_t(keyword),
    definitionKeyword: dist_t(keyword),
    moduleKeyword: dist_t(keyword),
    operator,
    derefOperator: dist_t(operator),
    arithmeticOperator: dist_t(operator),
    logicOperator: dist_t(operator),
    bitwiseOperator: dist_t(operator),
    compareOperator: dist_t(operator),
    updateOperator: dist_t(operator),
    definitionOperator: dist_t(operator),
    typeOperator: dist_t(operator),
    controlOperator: dist_t(operator),
    punctuation,
    separator: dist_t(punctuation),
    bracket,
    angleBracket: dist_t(bracket),
    squareBracket: dist_t(bracket),
    paren: dist_t(bracket),
    brace: dist_t(bracket),
    content,
    heading,
    heading1: dist_t(heading),
    heading2: dist_t(heading),
    heading3: dist_t(heading),
    heading4: dist_t(heading),
    heading5: dist_t(heading),
    heading6: dist_t(heading),
    contentSeparator: dist_t(content),
    list: dist_t(content),
    quote: dist_t(content),
    emphasis: dist_t(content),
    strong: dist_t(content),
    link: dist_t(content),
    monospace: dist_t(content),
    strikethrough: dist_t(content),
    inserted: dist_t(),
    deleted: dist_t(),
    changed: dist_t(),
    invalid: dist_t(),
    meta,
    documentMeta: dist_t(meta),
    annotation: dist_t(meta),
    processingInstruction: dist_t(meta),
    definition: Tag.defineModifier(),
    constant: Tag.defineModifier(),
    function: Tag.defineModifier(),
    standard: Tag.defineModifier(),
    local: Tag.defineModifier(),
    special: Tag.defineModifier(),
  };
  const classHighlighter = tagHighlighter([
    { tag: tags.link, class: 'tok-link' },
    { tag: tags.heading, class: 'tok-heading' },
    { tag: tags.emphasis, class: 'tok-emphasis' },
    { tag: tags.strong, class: 'tok-strong' },
    { tag: tags.keyword, class: 'tok-keyword' },
    { tag: tags.atom, class: 'tok-atom' },
    { tag: tags.bool, class: 'tok-bool' },
    { tag: tags.url, class: 'tok-url' },
    { tag: tags.labelName, class: 'tok-labelName' },
    { tag: tags.inserted, class: 'tok-inserted' },
    { tag: tags.deleted, class: 'tok-deleted' },
    { tag: tags.literal, class: 'tok-literal' },
    { tag: tags.string, class: 'tok-string' },
    { tag: tags.number, class: 'tok-number' },
    { tag: [tags.regexp, tags.escape, tags.special(tags.string)], class: 'tok-string2' },
    { tag: tags.variableName, class: 'tok-variableName' },
    { tag: tags.local(tags.variableName), class: 'tok-variableName tok-local' },
    { tag: tags.definition(tags.variableName), class: 'tok-variableName tok-definition' },
    { tag: tags.special(tags.variableName), class: 'tok-variableName2' },
    { tag: tags.definition(tags.propertyName), class: 'tok-propertyName tok-definition' },
    { tag: tags.typeName, class: 'tok-typeName' },
    { tag: tags.namespace, class: 'tok-namespace' },
    { tag: tags.className, class: 'tok-className' },
    { tag: tags.macroName, class: 'tok-macroName' },
    { tag: tags.propertyName, class: 'tok-propertyName' },
    { tag: tags.operator, class: 'tok-operator' },
    { tag: tags.comment, class: 'tok-comment' },
    { tag: tags.meta, class: 'tok-meta' },
    { tag: tags.invalid, class: 'tok-invalid' },
    { tag: tags.punctuation, class: 'tok-punctuation' },
  ]);

  var _a;
  const languageDataProp = new dist_NodeProp();
  function defineLanguageFacet(baseData) {
    return Facet.define({
      combine: baseData ? values => values.concat(baseData) : undefined,
    });
  }
  class Language {
    constructor(data, parser, extraExtensions = []) {
      this.data = data;
      if (!dist_EditorState.prototype.hasOwnProperty('tree'))
        Object.defineProperty(dist_EditorState.prototype, 'tree', {
          get() {
            return dist_syntaxTree(this);
          },
        });
      this.parser = parser;
      this.extension = [
        language.of(this),
        dist_EditorState.languageData.of((state, pos, side) =>
          state.facet(languageDataFacetAt(state, pos, side)),
        ),
      ].concat(extraExtensions);
    }
    isActiveAt(state, pos, side = -1) {
      return languageDataFacetAt(state, pos, side) == this.data;
    }
    findRegions(state) {
      let lang = state.facet(language);
      if ((lang === null || lang === void 0 ? void 0 : lang.data) == this.data)
        return [{ from: 0, to: state.doc.length }];
      if (!lang || !lang.allowsNesting) return [];
      let result = [];
      let explore = (tree, from) => {
        if (tree.prop(languageDataProp) == this.data) {
          result.push({ from, to: from + tree.length });
          return;
        }
        let mount = tree.prop(dist_NodeProp.mounted);
        if (mount) {
          if (mount.tree.prop(languageDataProp) == this.data) {
            if (mount.overlay)
              for (let r of mount.overlay) result.push({ from: r.from + from, to: r.to + from });
            else result.push({ from: from, to: from + tree.length });
            return;
          } else if (mount.overlay) {
            let size = result.length;
            explore(mount.tree, mount.overlay[0].from + from);
            if (result.length > size) return;
          }
        }
        for (let i = 0; i < tree.children.length; i++) {
          let ch = tree.children[i];
          if (ch instanceof Tree) explore(ch, tree.positions[i] + from);
        }
      };
      explore(dist_syntaxTree(state), 0);
      return result;
    }
    get allowsNesting() {
      return true;
    }
  }
  Language.setState = dist_StateEffect.define();
  function languageDataFacetAt(state, pos, side) {
    let topLang = state.facet(language);
    if (!topLang) return null;
    let facet = topLang.data;
    if (topLang.allowsNesting) {
      for (
        let node = dist_syntaxTree(state).topNode;
        node;
        node = node.enter(pos, side, IterMode.ExcludeBuffers)
      )
        facet = node.type.prop(languageDataProp) || facet;
    }
    return facet;
  }
  class LRLanguage extends (null && Language) {
    constructor(data, parser) {
      super(data, parser);
      this.parser = parser;
    }
    static define(spec) {
      let data = defineLanguageFacet(spec.languageData);
      return new LRLanguage(
        data,
        spec.parser.configure({
          props: [languageDataProp.add(type => (type.isTop ? data : undefined))],
        }),
      );
    }
    configure(options) {
      return new LRLanguage(this.data, this.parser.configure(options));
    }
    get allowsNesting() {
      return this.parser.hasWrappers();
    }
  }
  function dist_syntaxTree(state) {
    let field = state.field(Language.state, false);
    return field ? field.tree : Tree.empty;
  }
  function ensureSyntaxTree(state, upto, timeout = 50) {
    var _a;
    let parse =
      (_a = state.field(Language.state, false)) === null || _a === void 0 ? void 0 : _a.context;
    return !parse ? null : parse.isDone(upto) || parse.work(timeout, upto) ? parse.tree : null;
  }
  function syntaxTreeAvailable(state, upto = state.doc.length) {
    var _a;
    return (
      ((_a = state.field(Language.state, false)) === null || _a === void 0
        ? void 0
        : _a.context.isDone(upto)) || false
    );
  }
  function forceParsing(view, upto = view.viewport.to, timeout = 100) {
    let success = ensureSyntaxTree(view.state, upto, timeout);
    if (success != dist_syntaxTree(view.state)) view.dispatch({});
    return !!success;
  }
  function syntaxParserRunning(view) {
    var _a;
    return (
      ((_a = view.plugin(parseWorker)) === null || _a === void 0 ? void 0 : _a.isWorking()) || false
    );
  }
  class DocInput {
    constructor(doc, length = doc.length) {
      this.doc = doc;
      this.length = length;
      this.cursorPos = 0;
      this.string = '';
      this.cursor = doc.iter();
    }
    syncTo(pos) {
      this.string = this.cursor.next(pos - this.cursorPos).value;
      this.cursorPos = pos + this.string.length;
      return this.cursorPos - this.string.length;
    }
    chunk(pos) {
      this.syncTo(pos);
      return this.string;
    }
    get lineChunks() {
      return true;
    }
    read(from, to) {
      let stringStart = this.cursorPos - this.string.length;
      if (from < stringStart || to >= this.cursorPos) return this.doc.sliceString(from, to);
      else return this.string.slice(from - stringStart, to - stringStart);
    }
  }
  let currentContext = null;
  class ParseContext {
    constructor(parser, state, fragments = [], tree, treeLen, viewport, skipped, scheduleOn) {
      this.parser = parser;
      this.state = state;
      this.fragments = fragments;
      this.tree = tree;
      this.treeLen = treeLen;
      this.viewport = viewport;
      this.skipped = skipped;
      this.scheduleOn = scheduleOn;
      this.parse = null;
      this.tempSkipped = [];
    }
    static create(parser, state, viewport) {
      return new ParseContext(parser, state, [], Tree.empty, 0, viewport, [], null);
    }
    startParse() {
      return this.parser.startParse(new DocInput(this.state.doc), this.fragments);
    }
    work(until, upto) {
      if (upto != null && upto >= this.state.doc.length) upto = undefined;
      if (
        this.tree != Tree.empty &&
        this.isDone(upto !== null && upto !== void 0 ? upto : this.state.doc.length)
      ) {
        this.takeTree();
        return true;
      }
      return this.withContext(() => {
        var _a;
        if (typeof until == 'number') {
          let endTime = Date.now() + until;
          until = () => Date.now() > endTime;
        }
        if (!this.parse) this.parse = this.startParse();
        if (
          upto != null &&
          (this.parse.stoppedAt == null || this.parse.stoppedAt > upto) &&
          upto < this.state.doc.length
        )
          this.parse.stopAt(upto);
        for (;;) {
          let done = this.parse.advance();
          if (done) {
            this.fragments = this.withoutTempSkipped(
              TreeFragment.addTree(done, this.fragments, this.parse.stoppedAt != null),
            );
            this.treeLen =
              (_a = this.parse.stoppedAt) !== null && _a !== void 0 ? _a : this.state.doc.length;
            this.tree = done;
            this.parse = null;
            if (this.treeLen < (upto !== null && upto !== void 0 ? upto : this.state.doc.length))
              this.parse = this.startParse();
            else return true;
          }
          if (until()) return false;
        }
      });
    }
    takeTree() {
      let pos, tree;
      if (this.parse && (pos = this.parse.parsedPos) >= this.treeLen) {
        if (this.parse.stoppedAt == null || this.parse.stoppedAt > pos) this.parse.stopAt(pos);
        this.withContext(() => {
          while (!(tree = this.parse.advance())) {}
        });
        this.treeLen = pos;
        this.tree = tree;
        this.fragments = this.withoutTempSkipped(
          TreeFragment.addTree(this.tree, this.fragments, true),
        );
        this.parse = null;
      }
    }
    withContext(f) {
      let prev = currentContext;
      currentContext = this;
      try {
        return f();
      } finally {
        currentContext = prev;
      }
    }
    withoutTempSkipped(fragments) {
      for (let r; (r = this.tempSkipped.pop()); ) fragments = cutFragments(fragments, r.from, r.to);
      return fragments;
    }
    changes(changes, newState) {
      let { fragments, tree, treeLen, viewport, skipped } = this;
      this.takeTree();
      if (!changes.empty) {
        let ranges = [];
        changes.iterChangedRanges((fromA, toA, fromB, toB) =>
          ranges.push({ fromA, toA, fromB, toB }),
        );
        fragments = TreeFragment.applyChanges(fragments, ranges);
        tree = Tree.empty;
        treeLen = 0;
        viewport = { from: changes.mapPos(viewport.from, -1), to: changes.mapPos(viewport.to, 1) };
        if (this.skipped.length) {
          skipped = [];
          for (let r of this.skipped) {
            let from = changes.mapPos(r.from, 1),
              to = changes.mapPos(r.to, -1);
            if (from < to) skipped.push({ from, to });
          }
        }
      }
      return new ParseContext(
        this.parser,
        newState,
        fragments,
        tree,
        treeLen,
        viewport,
        skipped,
        this.scheduleOn,
      );
    }
    updateViewport(viewport) {
      if (this.viewport.from == viewport.from && this.viewport.to == viewport.to) return false;
      this.viewport = viewport;
      let startLen = this.skipped.length;
      for (let i = 0; i < this.skipped.length; i++) {
        let { from, to } = this.skipped[i];
        if (from < viewport.to && to > viewport.from) {
          this.fragments = cutFragments(this.fragments, from, to);
          this.skipped.splice(i--, 1);
        }
      }
      if (this.skipped.length >= startLen) return false;
      this.reset();
      return true;
    }
    reset() {
      if (this.parse) {
        this.takeTree();
        this.parse = null;
      }
    }
    skipUntilInView(from, to) {
      this.skipped.push({ from, to });
    }
    static getSkippingParser(until) {
      return new (class extends Parser {
        createParse(input, fragments, ranges) {
          let from = ranges[0].from,
            to = ranges[ranges.length - 1].to;
          let parser = {
            parsedPos: from,
            advance() {
              let cx = currentContext;
              if (cx) {
                for (let r of ranges) cx.tempSkipped.push(r);
                if (until)
                  cx.scheduleOn = cx.scheduleOn ? Promise.all([cx.scheduleOn, until]) : until;
              }
              this.parsedPos = to;
              return new Tree(NodeType.none, [], [], to - from);
            },
            stoppedAt: null,
            stopAt() {},
          };
          return parser;
        }
      })();
    }
    isDone(upto) {
      upto = Math.min(upto, this.state.doc.length);
      let frags = this.fragments;
      return this.treeLen >= upto && frags.length && frags[0].from == 0 && frags[0].to >= upto;
    }
    static get() {
      return currentContext;
    }
  }
  function cutFragments(fragments, from, to) {
    return TreeFragment.applyChanges(fragments, [{ fromA: from, toA: to, fromB: from, toB: to }]);
  }
  class LanguageState {
    constructor(context) {
      this.context = context;
      this.tree = context.tree;
    }
    apply(tr) {
      if (!tr.docChanged && this.tree == this.context.tree) return this;
      let newCx = this.context.changes(tr.changes, tr.state);
      let upto =
        this.context.treeLen == tr.startState.doc.length
          ? undefined
          : Math.max(tr.changes.mapPos(this.context.treeLen), newCx.viewport.to);
      if (!newCx.work(20, upto)) newCx.takeTree();
      return new LanguageState(newCx);
    }
    static init(state) {
      let vpTo = Math.min(3000, state.doc.length);
      let parseState = ParseContext.create(state.facet(language).parser, state, {
        from: 0,
        to: vpTo,
      });
      if (!parseState.work(20, vpTo)) parseState.takeTree();
      return new LanguageState(parseState);
    }
  }
  Language.state = dist_StateField.define({
    create: LanguageState.init,
    update(value, tr) {
      for (let e of tr.effects) if (e.is(Language.setState)) return e.value;
      if (tr.startState.facet(language) != tr.state.facet(language))
        return LanguageState.init(tr.state);
      return value.apply(tr);
    },
  });
  let requestIdle = callback => {
    let timeout = setTimeout(() => callback(), 500);
    return () => clearTimeout(timeout);
  };
  if (typeof requestIdleCallback != 'undefined')
    requestIdle = callback => {
      let idle = -1,
        timeout = setTimeout(() => {
          idle = requestIdleCallback(callback, { timeout: 500 - 100 });
        }, 100);
      return () => (idle < 0 ? clearTimeout(timeout) : cancelIdleCallback(idle));
    };
  const isInputPending =
    typeof navigator != 'undefined' &&
    ((_a = navigator.scheduling) === null || _a === void 0 ? void 0 : _a.isInputPending)
      ? () => navigator.scheduling.isInputPending()
      : null;
  const parseWorker = dist_ViewPlugin.fromClass(
    class ParseWorker {
      constructor(view) {
        this.view = view;
        this.working = null;
        this.workScheduled = 0;
        this.chunkEnd = -1;
        this.chunkBudget = -1;
        this.work = this.work.bind(this);
        this.scheduleWork();
      }
      update(update) {
        let cx = this.view.state.field(Language.state).context;
        if (cx.updateViewport(update.view.viewport) || this.view.viewport.to > cx.treeLen)
          this.scheduleWork();
        if (update.docChanged) {
          if (this.view.hasFocus) this.chunkBudget += 50;
          this.scheduleWork();
        }
        this.checkAsyncSchedule(cx);
      }
      scheduleWork() {
        if (this.working) return;
        let { state } = this.view,
          field = state.field(Language.state);
        if (field.tree != field.context.tree || !field.context.isDone(state.doc.length))
          this.working = requestIdle(this.work);
      }
      work(deadline) {
        this.working = null;
        let now = Date.now();
        if (this.chunkEnd < now && (this.chunkEnd < 0 || this.view.hasFocus)) {
          this.chunkEnd = now + 30000;
          this.chunkBudget = 3000;
        }
        if (this.chunkBudget <= 0) return;
        let {
            state,
            viewport: { to: vpTo },
          } = this.view,
          field = state.field(Language.state);
        if (field.tree == field.context.tree && field.context.isDone(vpTo + 100000)) return;
        let endTime =
          Date.now() +
          Math.min(
            this.chunkBudget,
            100,
            deadline && !isInputPending ? Math.max(25, deadline.timeRemaining() - 5) : 1e9,
          );
        let viewportFirst = field.context.treeLen < vpTo && state.doc.length > vpTo + 1000;
        let done = field.context.work(() => {
          return (isInputPending && isInputPending()) || Date.now() > endTime;
        }, vpTo + (viewportFirst ? 0 : 100000));
        this.chunkBudget -= Date.now() - now;
        if (done || this.chunkBudget <= 0) {
          field.context.takeTree();
          this.view.dispatch({ effects: Language.setState.of(new LanguageState(field.context)) });
        }
        if (this.chunkBudget > 0 && !(done && !viewportFirst)) this.scheduleWork();
        this.checkAsyncSchedule(field.context);
      }
      checkAsyncSchedule(cx) {
        if (cx.scheduleOn) {
          this.workScheduled++;
          cx.scheduleOn
            .then(() => this.scheduleWork())
            .catch(err => logException(this.view.state, err))
            .then(() => this.workScheduled--);
          cx.scheduleOn = null;
        }
      }
      destroy() {
        if (this.working) this.working();
      }
      isWorking() {
        return !!(this.working || this.workScheduled > 0);
      }
    },
    {
      eventHandlers: {
        focus() {
          this.scheduleWork();
        },
      },
    },
  );
  const language = Facet.define({
    combine(languages) {
      return languages.length ? languages[0] : null;
    },
    enables: [Language.state, parseWorker],
  });
  class LanguageSupport {
    constructor(language, support = []) {
      this.language = language;
      this.support = support;
      this.extension = [language, support];
    }
  }
  class LanguageDescription {
    constructor(name, alias, extensions, filename, loadFunc, support = undefined) {
      this.name = name;
      this.alias = alias;
      this.extensions = extensions;
      this.filename = filename;
      this.loadFunc = loadFunc;
      this.support = support;
      this.loading = null;
    }
    load() {
      return (
        this.loading ||
        (this.loading = this.loadFunc().then(
          support => (this.support = support),
          err => {
            this.loading = null;
            throw err;
          },
        ))
      );
    }
    static of(spec) {
      let { load, support } = spec;
      if (!load) {
        if (!support)
          throw new RangeError("Must pass either 'load' or 'support' to LanguageDescription.of");
        load = () => Promise.resolve(support);
      }
      return new LanguageDescription(
        spec.name,
        (spec.alias || []).concat(spec.name).map(s => s.toLowerCase()),
        spec.extensions || [],
        spec.filename,
        load,
        support,
      );
    }
    static matchFilename(descs, filename) {
      for (let d of descs) if (d.filename && d.filename.test(filename)) return d;
      let ext = /\.([^.]+)$/.exec(filename);
      if (ext) for (let d of descs) if (d.extensions.indexOf(ext[1]) > -1) return d;
      return null;
    }
    static matchLanguageName(descs, name, fuzzy = true) {
      name = name.toLowerCase();
      for (let d of descs) if (d.alias.some(a => a == name)) return d;
      if (fuzzy)
        for (let d of descs)
          for (let a of d.alias) {
            let found = name.indexOf(a);
            if (
              found > -1 &&
              (a.length > 2 || (!/\w/.test(name[found - 1]) && !/\w/.test(name[found + a.length])))
            )
              return d;
          }
      return null;
    }
  }

  const indentService = Facet.define();
  const indentUnit = Facet.define({
    combine: values => {
      if (!values.length) return '  ';
      if (!/^(?: +|\t+)$/.test(values[0]))
        throw new Error('Invalid indent unit: ' + JSON.stringify(values[0]));
      return values[0];
    },
  });
  function getIndentUnit(state) {
    let unit = state.facet(indentUnit);
    return unit.charCodeAt(0) == 9 ? state.tabSize * unit.length : unit.length;
  }
  function dist_indentString(state, cols) {
    let result = '',
      ts = state.tabSize;
    if (state.facet(indentUnit).charCodeAt(0) == 9)
      while (cols >= ts) {
        result += '\t';
        cols -= ts;
      }
    for (let i = 0; i < cols; i++) result += ' ';
    return result;
  }
  function dist_getIndentation(context, pos) {
    if (context instanceof dist_EditorState) context = new dist_IndentContext(context);
    for (let service of context.state.facet(indentService)) {
      let result = service(context, pos);
      if (result != null) return result;
    }
    let tree = dist_syntaxTree(context.state);
    return tree ? syntaxIndentation(context, tree, pos) : null;
  }
  function indentRange(state, from, to) {
    let updated = Object.create(null);
    let context = new dist_IndentContext(state, {
      overrideIndentation: start => {
        var _a;
        return (_a = updated[start]) !== null && _a !== void 0 ? _a : -1;
      },
    });
    let changes = [];
    for (let pos = from; pos <= to; ) {
      let line = state.doc.lineAt(pos);
      pos = line.to + 1;
      let indent = dist_getIndentation(context, line.from);
      if (indent == null) continue;
      if (!/\S/.test(line.text)) indent = 0;
      let cur = /^\s*/.exec(line.text)[0];
      let norm = dist_indentString(state, indent);
      if (cur != norm) {
        updated[line.from] = indent;
        changes.push({ from: line.from, to: line.from + cur.length, insert: norm });
      }
    }
    return state.changes(changes);
  }
  class dist_IndentContext {
    constructor(state, options = {}) {
      this.state = state;
      this.options = options;
      this.unit = getIndentUnit(state);
    }
    lineAt(pos, bias = 1) {
      let line = this.state.doc.lineAt(pos);
      let { simulateBreak, simulateDoubleBreak } = this.options;
      if (simulateBreak != null && simulateBreak >= line.from && simulateBreak <= line.to) {
        if (simulateDoubleBreak && simulateBreak == pos) return { text: '', from: pos };
        else if (bias < 0 ? simulateBreak < pos : simulateBreak <= pos)
          return { text: line.text.slice(simulateBreak - line.from), from: simulateBreak };
        else return { text: line.text.slice(0, simulateBreak - line.from), from: line.from };
      }
      return line;
    }
    textAfterPos(pos, bias = 1) {
      if (this.options.simulateDoubleBreak && pos == this.options.simulateBreak) return '';
      let { text, from } = this.lineAt(pos, bias);
      return text.slice(pos - from, Math.min(text.length, pos + 100 - from));
    }
    column(pos, bias = 1) {
      let { text, from } = this.lineAt(pos, bias);
      let result = this.countColumn(text, pos - from);
      let override = this.options.overrideIndentation ? this.options.overrideIndentation(from) : -1;
      if (override > -1) result += override - this.countColumn(text, text.search(/\S|$/));
      return result;
    }
    countColumn(line, pos = line.length) {
      return dist_countColumn(line, this.state.tabSize, pos);
    }
    lineIndent(pos, bias = 1) {
      let { text, from } = this.lineAt(pos, bias);
      let override = this.options.overrideIndentation;
      if (override) {
        let overriden = override(from);
        if (overriden > -1) return overriden;
      }
      return this.countColumn(text, text.search(/\S|$/));
    }
    get simulatedBreak() {
      return this.options.simulateBreak || null;
    }
  }
  const indentNodeProp = new dist_NodeProp();
  function syntaxIndentation(cx, ast, pos) {
    return indentFrom(ast.resolveInner(pos).enterUnfinishedNodesBefore(pos), pos, cx);
  }
  function ignoreClosed(cx) {
    return cx.pos == cx.options.simulateBreak && cx.options.simulateDoubleBreak;
  }
  function indentStrategy(tree) {
    let strategy = tree.type.prop(indentNodeProp);
    if (strategy) return strategy;
    let first = tree.firstChild,
      close;
    if (first && (close = first.type.prop(dist_NodeProp.closedBy))) {
      let last = tree.lastChild,
        closed = last && close.indexOf(last.name) > -1;
      return cx =>
        delimitedStrategy(
          cx,
          true,
          1,
          undefined,
          closed && !ignoreClosed(cx) ? last.from : undefined,
        );
    }
    return tree.parent == null ? topIndent : null;
  }
  function indentFrom(node, pos, base) {
    for (; node; node = node.parent) {
      let strategy = indentStrategy(node);
      if (strategy) return strategy(TreeIndentContext.create(base, pos, node));
    }
    return null;
  }
  function topIndent() {
    return 0;
  }
  class TreeIndentContext extends dist_IndentContext {
    constructor(base, pos, node) {
      super(base.state, base.options);
      this.base = base;
      this.pos = pos;
      this.node = node;
    }
    static create(base, pos, node) {
      return new TreeIndentContext(base, pos, node);
    }
    get textAfter() {
      return this.textAfterPos(this.pos);
    }
    get baseIndent() {
      let line = this.state.doc.lineAt(this.node.from);
      for (;;) {
        let atBreak = this.node.resolve(line.from);
        while (atBreak.parent && atBreak.parent.from == atBreak.from) atBreak = atBreak.parent;
        if (isParent(atBreak, this.node)) break;
        line = this.state.doc.lineAt(atBreak.from);
      }
      return this.lineIndent(line.from);
    }
    continue() {
      let parent = this.node.parent;
      return parent ? indentFrom(parent, this.pos, this.base) : 0;
    }
  }
  function isParent(parent, of) {
    for (let cur = of; cur; cur = cur.parent) if (parent == cur) return true;
    return false;
  }
  function bracketedAligned(context) {
    let tree = context.node;
    let openToken = tree.childAfter(tree.from),
      last = tree.lastChild;
    if (!openToken) return null;
    let sim = context.options.simulateBreak;
    let openLine = context.state.doc.lineAt(openToken.from);
    let lineEnd = sim == null || sim <= openLine.from ? openLine.to : Math.min(openLine.to, sim);
    for (let pos = openToken.to; ; ) {
      let next = tree.childAfter(pos);
      if (!next || next == last) return null;
      if (!next.type.isSkipped) return next.from < lineEnd ? openToken : null;
      pos = next.to;
    }
  }
  function delimitedIndent({ closing, align = true, units = 1 }) {
    return context => delimitedStrategy(context, align, units, closing);
  }
  function delimitedStrategy(context, align, units, closing, closedAt) {
    let after = context.textAfter,
      space = after.match(/^\s*/)[0].length;
    let closed =
      (closing && after.slice(space, space + closing.length) == closing) ||
      closedAt == context.pos + space;
    let aligned = align ? bracketedAligned(context) : null;
    if (aligned) return closed ? context.column(aligned.from) : context.column(aligned.to);
    return context.baseIndent + (closed ? 0 : context.unit * units);
  }
  const flatIndent = context => context.baseIndent;
  function continuedIndent({ except, units = 1 } = {}) {
    return context => {
      let matchExcept = except && except.test(context.textAfter);
      return context.baseIndent + (matchExcept ? 0 : units * context.unit);
    };
  }
  const DontIndentBeyond = 200;
  function indentOnInput() {
    return EditorState.transactionFilter.of(tr => {
      if (!tr.docChanged || (!tr.isUserEvent('input.type') && !tr.isUserEvent('input.complete')))
        return tr;
      let rules = tr.startState.languageDataAt('indentOnInput', tr.startState.selection.main.head);
      if (!rules.length) return tr;
      let doc = tr.newDoc,
        { head } = tr.newSelection.main,
        line = doc.lineAt(head);
      if (head > line.from + DontIndentBeyond) return tr;
      let lineStart = doc.sliceString(line.from, head);
      if (!rules.some(r => r.test(lineStart))) return tr;
      let { state } = tr,
        last = -1,
        changes = [];
      for (let { head } of state.selection.ranges) {
        let line = state.doc.lineAt(head);
        if (line.from == last) continue;
        last = line.from;
        let indent = dist_getIndentation(state, line.from);
        if (indent == null) continue;
        let cur = /^\s*/.exec(line.text)[0];
        let norm = dist_indentString(state, indent);
        if (cur != norm)
          changes.push({ from: line.from, to: line.from + cur.length, insert: norm });
      }
      return changes.length ? [tr, { changes, sequential: true }] : tr;
    });
  }

  const foldService = Facet.define();
  const foldNodeProp = new dist_NodeProp();
  function foldInside(node) {
    let first = node.firstChild,
      last = node.lastChild;
    return first && first.to < last.from
      ? { from: first.to, to: last.type.isError ? node.to : last.from }
      : null;
  }
  function syntaxFolding(state, start, end) {
    let tree = dist_syntaxTree(state);
    if (tree.length < end) return null;
    let inner = tree.resolveInner(end);
    let found = null;
    for (let cur = inner; cur; cur = cur.parent) {
      if (cur.to <= end || cur.from > end) continue;
      if (found && cur.from < start) break;
      let prop = cur.type.prop(foldNodeProp);
      if (
        prop &&
        (cur.to < tree.length - 50 || tree.length == state.doc.length || !isUnfinished(cur))
      ) {
        let value = prop(cur, state);
        if (value && value.from <= end && value.from >= start && value.to > end) found = value;
      }
    }
    return found;
  }
  function isUnfinished(node) {
    let ch = node.lastChild;
    return ch && ch.to == node.to && ch.type.isError;
  }
  function foldable(state, lineStart, lineEnd) {
    for (let service of state.facet(foldService)) {
      let result = service(state, lineStart, lineEnd);
      if (result) return result;
    }
    return syntaxFolding(state, lineStart, lineEnd);
  }
  function mapRange(range, mapping) {
    let from = mapping.mapPos(range.from, 1),
      to = mapping.mapPos(range.to, -1);
    return from >= to ? undefined : { from, to };
  }
  const foldEffect = dist_StateEffect.define({ map: mapRange });
  const unfoldEffect = dist_StateEffect.define({ map: mapRange });
  function selectedLines(view) {
    let lines = [];
    for (let { head } of view.state.selection.ranges) {
      if (lines.some(l => l.from <= head && l.to >= head)) continue;
      lines.push(view.lineBlockAt(head));
    }
    return lines;
  }
  const foldState = dist_StateField.define({
    create() {
      return Decoration.none;
    },
    update(folded, tr) {
      folded = folded.map(tr.changes);
      for (let e of tr.effects) {
        if (e.is(foldEffect) && !foldExists(folded, e.value.from, e.value.to))
          folded = folded.update({ add: [foldWidget.range(e.value.from, e.value.to)] });
        else if (e.is(unfoldEffect))
          folded = folded.update({
            filter: (from, to) => e.value.from != from || e.value.to != to,
            filterFrom: e.value.from,
            filterTo: e.value.to,
          });
      }
      if (tr.selection) {
        let onSelection = false,
          { head } = tr.selection.main;
        folded.between(head, head, (a, b) => {
          if (a < head && b > head) onSelection = true;
        });
        if (onSelection)
          folded = folded.update({
            filterFrom: head,
            filterTo: head,
            filter: (a, b) => b <= head || a >= head,
          });
      }
      return folded;
    },
    provide: f => EditorView.decorations.from(f),
    toJSON(folded, state) {
      let ranges = [];
      folded.between(0, state.doc.length, (from, to) => {
        ranges.push(from, to);
      });
      return ranges;
    },
    fromJSON(value) {
      if (!Array.isArray(value) || value.length % 2)
        throw new RangeError('Invalid JSON for fold state');
      let ranges = [];
      for (let i = 0; i < value.length; ) {
        let from = value[i++],
          to = value[i++];
        if (typeof from != 'number' || typeof to != 'number')
          throw new RangeError('Invalid JSON for fold state');
        ranges.push(foldWidget.range(from, to));
      }
      return Decoration.set(ranges, true);
    },
  });
  function foldedRanges(state) {
    return state.field(foldState, false) || RangeSet.empty;
  }
  function findFold(state, from, to) {
    var _a;
    let found = null;
    (_a = state.field(foldState, false)) === null || _a === void 0
      ? void 0
      : _a.between(from, to, (from, to) => {
          if (!found || found.from > from) found = { from, to };
        });
    return found;
  }
  function foldExists(folded, from, to) {
    let found = false;
    folded.between(from, from, (a, b) => {
      if (a == from && b == to) found = true;
    });
    return found;
  }
  function maybeEnable(state, other) {
    return state.field(foldState, false)
      ? other
      : other.concat(dist_StateEffect.appendConfig.of(codeFolding()));
  }
  const foldCode = view => {
    for (let line of selectedLines(view)) {
      let range = foldable(view.state, line.from, line.to);
      if (range) {
        view.dispatch({
          effects: maybeEnable(view.state, [foldEffect.of(range), announceFold(view, range)]),
        });
        return true;
      }
    }
    return false;
  };
  const unfoldCode = view => {
    if (!view.state.field(foldState, false)) return false;
    let effects = [];
    for (let line of selectedLines(view)) {
      let folded = findFold(view.state, line.from, line.to);
      if (folded) effects.push(unfoldEffect.of(folded), announceFold(view, folded, false));
    }
    if (effects.length) view.dispatch({ effects });
    return effects.length > 0;
  };
  function announceFold(view, range, fold = true) {
    let lineFrom = view.state.doc.lineAt(range.from).number,
      lineTo = view.state.doc.lineAt(range.to).number;
    return EditorView.announce.of(
      `${view.state.phrase(
        fold ? 'Folded lines' : 'Unfolded lines',
      )} ${lineFrom} ${view.state.phrase('to')} ${lineTo}.`,
    );
  }
  const foldAll = view => {
    let { state } = view,
      effects = [];
    for (let pos = 0; pos < state.doc.length; ) {
      let line = view.lineBlockAt(pos),
        range = foldable(state, line.from, line.to);
      if (range) effects.push(foldEffect.of(range));
      pos = (range ? view.lineBlockAt(range.to) : line).to + 1;
    }
    if (effects.length) view.dispatch({ effects: maybeEnable(view.state, effects) });
    return !!effects.length;
  };
  const unfoldAll = view => {
    let field = view.state.field(foldState, false);
    if (!field || !field.size) return false;
    let effects = [];
    field.between(0, view.state.doc.length, (from, to) => {
      effects.push(unfoldEffect.of({ from, to }));
    });
    view.dispatch({ effects });
    return true;
  };
  const foldKeymap = [
    { key: 'Ctrl-Shift-[', mac: 'Cmd-Alt-[', run: foldCode },
    { key: 'Ctrl-Shift-]', mac: 'Cmd-Alt-]', run: unfoldCode },
    { key: 'Ctrl-Alt-[', run: foldAll },
    { key: 'Ctrl-Alt-]', run: unfoldAll },
  ];
  const defaultConfig = {
    placeholderDOM: null,
    placeholderText: '…',
  };
  const foldConfig = Facet.define({
    combine(values) {
      return combineConfig(values, defaultConfig);
    },
  });
  function codeFolding(config) {
    let result = [foldState, dist_baseTheme$1];
    if (config) result.push(foldConfig.of(config));
    return result;
  }
  const foldWidget = Decoration.replace({
    widget: new (class extends WidgetType {
      toDOM(view) {
        let { state } = view,
          conf = state.facet(foldConfig);
        let onclick = event => {
          let line = view.lineBlockAt(view.posAtDOM(event.target));
          let folded = findFold(view.state, line.from, line.to);
          if (folded) view.dispatch({ effects: unfoldEffect.of(folded) });
          event.preventDefault();
        };
        if (conf.placeholderDOM) return conf.placeholderDOM(view, onclick);
        let element = document.createElement('span');
        element.textContent = conf.placeholderText;
        element.setAttribute('aria-label', state.phrase('folded code'));
        element.title = state.phrase('unfold');
        element.className = 'cm-foldPlaceholder';
        element.onclick = onclick;
        return element;
      }
    })(),
  });
  const foldGutterDefaults = {
    openText: '⌄',
    closedText: '›',
    markerDOM: null,
    domEventHandlers: {},
    foldingChanged: () => false,
  };
  class FoldMarker extends (null && GutterMarker) {
    constructor(config, open) {
      super();
      this.config = config;
      this.open = open;
    }
    eq(other) {
      return this.config == other.config && this.open == other.open;
    }
    toDOM(view) {
      if (this.config.markerDOM) return this.config.markerDOM(this.open);
      let span = document.createElement('span');
      span.textContent = this.open ? this.config.openText : this.config.closedText;
      span.title = view.state.phrase(this.open ? 'Fold line' : 'Unfold line');
      return span;
    }
  }
  function foldGutter(config = {}) {
    let fullConfig = Object.assign(Object.assign({}, foldGutterDefaults), config);
    let canFold = new FoldMarker(fullConfig, true),
      canUnfold = new FoldMarker(fullConfig, false);
    let markers = ViewPlugin.fromClass(
      class {
        constructor(view) {
          this.from = view.viewport.from;
          this.markers = this.buildMarkers(view);
        }
        update(update) {
          if (
            update.docChanged ||
            update.viewportChanged ||
            update.startState.facet(language) != update.state.facet(language) ||
            update.startState.field(foldState, false) != update.state.field(foldState, false) ||
            dist_syntaxTree(update.startState) != dist_syntaxTree(update.state) ||
            fullConfig.foldingChanged(update)
          )
            this.markers = this.buildMarkers(update.view);
        }
        buildMarkers(view) {
          let builder = new RangeSetBuilder();
          for (let line of view.viewportLineBlocks) {
            let mark = findFold(view.state, line.from, line.to)
              ? canUnfold
              : foldable(view.state, line.from, line.to)
              ? canFold
              : null;
            if (mark) builder.add(line.from, line.from, mark);
          }
          return builder.finish();
        }
      },
    );
    let { domEventHandlers } = fullConfig;
    return [
      markers,
      gutter({
        class: 'cm-foldGutter',
        markers(view) {
          var _a;
          return (
            ((_a = view.plugin(markers)) === null || _a === void 0 ? void 0 : _a.markers) ||
            RangeSet.empty
          );
        },
        initialSpacer() {
          return new FoldMarker(fullConfig, false);
        },
        domEventHandlers: Object.assign(Object.assign({}, domEventHandlers), {
          click: (view, line, event) => {
            if (domEventHandlers.click && domEventHandlers.click(view, line, event)) return true;
            let folded = findFold(view.state, line.from, line.to);
            if (folded) {
              view.dispatch({ effects: unfoldEffect.of(folded) });
              return true;
            }
            let range = foldable(view.state, line.from, line.to);
            if (range) {
              view.dispatch({ effects: foldEffect.of(range) });
              return true;
            }
            return false;
          },
        }),
      }),
      codeFolding(),
    ];
  }
  const dist_baseTheme$1 = EditorView.baseTheme({
    '.cm-foldPlaceholder': {
      backgroundColor: '#eee',
      border: '1px solid #ddd',
      color: '#888',
      borderRadius: '.2em',
      margin: '0 1px',
      padding: '0 1px',
      cursor: 'pointer',
    },
    '.cm-foldGutter span': {
      padding: '0 1px',
      cursor: 'pointer',
    },
  });

  class HighlightStyle {
    constructor(spec, options) {
      let modSpec;
      function def(spec) {
        let cls = StyleModule.newName();
        (modSpec || (modSpec = Object.create(null)))['.' + cls] = spec;
        return cls;
      }
      const all =
        typeof options.all == 'string' ? options.all : options.all ? def(options.all) : undefined;
      const scopeOpt = options.scope;
      this.scope =
        scopeOpt instanceof Language
          ? type => type.prop(languageDataProp) == scopeOpt.data
          : scopeOpt
          ? type => type == scopeOpt
          : undefined;
      this.style = tagHighlighter(
        spec.map(style => ({
          tag: style.tag,
          class: style.class || def(Object.assign({}, style, { tag: null })),
        })),
        {
          all,
        },
      ).style;
      this.module = modSpec ? new StyleModule(modSpec) : null;
      this.themeType = options.themeType;
    }
    static define(specs, options) {
      return new HighlightStyle(specs, options || {});
    }
  }
  const highlighterFacet = Facet.define();
  const fallbackHighlighter = Facet.define({
    combine(values) {
      return values.length ? [values[0]] : null;
    },
  });
  function getHighlighters(state) {
    let main = state.facet(highlighterFacet);
    return main.length ? main : state.facet(fallbackHighlighter);
  }
  function syntaxHighlighting(highlighter, options) {
    let ext = [treeHighlighter],
      themeType;
    if (highlighter instanceof HighlightStyle) {
      if (highlighter.module) ext.push(EditorView.styleModule.of(highlighter.module));
      themeType = highlighter.themeType;
    }
    if (options === null || options === void 0 ? void 0 : options.fallback)
      ext.push(fallbackHighlighter.of(highlighter));
    else if (themeType)
      ext.push(
        highlighterFacet.computeN([EditorView.darkTheme], state => {
          return state.facet(EditorView.darkTheme) == (themeType == 'dark') ? [highlighter] : [];
        }),
      );
    else ext.push(highlighterFacet.of(highlighter));
    return ext;
  }
  function highlightingFor(state, tags, scope) {
    let highlighters = getHighlighters(state);
    let result = null;
    if (highlighters)
      for (let highlighter of highlighters) {
        if (!highlighter.scope || (scope && highlighter.scope(scope))) {
          let cls = highlighter.style(tags);
          if (cls) result = result ? result + ' ' + cls : cls;
        }
      }
    return result;
  }
  class TreeHighlighter {
    constructor(view) {
      this.markCache = Object.create(null);
      this.tree = dist_syntaxTree(view.state);
      this.decorations = this.buildDeco(view, getHighlighters(view.state));
    }
    update(update) {
      let tree = dist_syntaxTree(update.state),
        highlighters = getHighlighters(update.state);
      let styleChange = highlighters != getHighlighters(update.startState);
      if (tree.length < update.view.viewport.to && !styleChange && tree.type == this.tree.type) {
        this.decorations = this.decorations.map(update.changes);
      } else if (tree != this.tree || update.viewportChanged || styleChange) {
        this.tree = tree;
        this.decorations = this.buildDeco(update.view, highlighters);
      }
    }
    buildDeco(view, highlighters) {
      if (!highlighters || !this.tree.length) return Decoration.none;
      let builder = new dist_RangeSetBuilder();
      for (let { from, to } of view.visibleRanges) {
        highlightTree(
          this.tree,
          highlighters,
          (from, to, style) => {
            builder.add(
              from,
              to,
              this.markCache[style] || (this.markCache[style] = Decoration.mark({ class: style })),
            );
          },
          from,
          to,
        );
      }
      return builder.finish();
    }
  }
  const treeHighlighter = dist_Prec.high(
    dist_ViewPlugin.fromClass(TreeHighlighter, {
      decorations: v => v.decorations,
    }),
  );
  const defaultHighlightStyle = HighlightStyle.define([
    { tag: tags.meta, color: '#7a757a' },
    { tag: tags.link, textDecoration: 'underline' },
    { tag: tags.heading, textDecoration: 'underline', fontWeight: 'bold' },
    { tag: tags.emphasis, fontStyle: 'italic' },
    { tag: tags.strong, fontWeight: 'bold' },
    { tag: tags.strikethrough, textDecoration: 'line-through' },
    { tag: tags.keyword, color: '#708' },
    { tag: [tags.atom, tags.bool, tags.url, tags.contentSeparator, tags.labelName], color: '#219' },
    { tag: [tags.literal, tags.inserted], color: '#164' },
    { tag: [tags.string, tags.deleted], color: '#a11' },
    { tag: [tags.regexp, tags.escape, tags.special(tags.string)], color: '#e40' },
    { tag: tags.definition(tags.variableName), color: '#00f' },
    { tag: tags.local(tags.variableName), color: '#30a' },
    { tag: [tags.typeName, tags.namespace], color: '#085' },
    { tag: tags.className, color: '#167' },
    { tag: [tags.special(tags.variableName), tags.macroName], color: '#256' },
    { tag: tags.definition(tags.propertyName), color: '#00c' },
    { tag: tags.comment, color: '#940' },
    { tag: tags.invalid, color: '#f00' },
  ]);

  const dist_baseTheme = EditorView.baseTheme({
    '&.cm-focused .cm-matchingBracket': { backgroundColor: '#328c8252' },
    '&.cm-focused .cm-nonmatchingBracket': { backgroundColor: '#bb555544' },
  });
  const DefaultScanDist = 10000,
    DefaultBrackets = '()[]{}';
  const bracketMatchingConfig = Facet.define({
    combine(configs) {
      return combineConfig(configs, {
        afterCursor: true,
        brackets: DefaultBrackets,
        maxScanDistance: DefaultScanDist,
        renderMatch: defaultRenderMatch,
      });
    },
  });
  const matchingMark = Decoration.mark({ class: 'cm-matchingBracket' }),
    nonmatchingMark = Decoration.mark({ class: 'cm-nonmatchingBracket' });
  function defaultRenderMatch(match) {
    let decorations = [];
    let mark = match.matched ? matchingMark : nonmatchingMark;
    decorations.push(mark.range(match.start.from, match.start.to));
    if (match.end) decorations.push(mark.range(match.end.from, match.end.to));
    return decorations;
  }
  const bracketMatchingState = dist_StateField.define({
    create() {
      return Decoration.none;
    },
    update(deco, tr) {
      if (!tr.docChanged && !tr.selection) return deco;
      let decorations = [];
      let config = tr.state.facet(bracketMatchingConfig);
      for (let range of tr.state.selection.ranges) {
        if (!range.empty) continue;
        let match =
          dist_matchBrackets(tr.state, range.head, -1, config) ||
          (range.head > 0 && dist_matchBrackets(tr.state, range.head - 1, 1, config)) ||
          (config.afterCursor &&
            (dist_matchBrackets(tr.state, range.head, 1, config) ||
              (range.head < tr.state.doc.length &&
                dist_matchBrackets(tr.state, range.head + 1, -1, config))));
        if (match) decorations = decorations.concat(config.renderMatch(match, tr.state));
      }
      return Decoration.set(decorations, true);
    },
    provide: f => EditorView.decorations.from(f),
  });
  const bracketMatchingUnique = [bracketMatchingState, dist_baseTheme];
  function bracketMatching(config = {}) {
    return [bracketMatchingConfig.of(config), bracketMatchingUnique];
  }
  function matchingNodes(node, dir, brackets) {
    let byProp = node.prop(dir < 0 ? dist_NodeProp.openedBy : dist_NodeProp.closedBy);
    if (byProp) return byProp;
    if (node.name.length == 1) {
      let index = brackets.indexOf(node.name);
      if (index > -1 && index % 2 == (dir < 0 ? 1 : 0)) return [brackets[index + dir]];
    }
    return null;
  }
  function dist_matchBrackets(state, pos, dir, config = {}) {
    let maxScanDistance = config.maxScanDistance || DefaultScanDist,
      brackets = config.brackets || DefaultBrackets;
    let tree = dist_syntaxTree(state),
      node = tree.resolveInner(pos, dir);
    for (let cur = node; cur; cur = cur.parent) {
      let matches = matchingNodes(cur.type, dir, brackets);
      if (matches && cur.from < cur.to)
        return matchMarkedBrackets(state, pos, dir, cur, matches, brackets);
    }
    return matchPlainBrackets(state, pos, dir, tree, node.type, maxScanDistance, brackets);
  }
  function matchMarkedBrackets(_state, _pos, dir, token, matching, brackets) {
    let parent = token.parent,
      firstToken = { from: token.from, to: token.to };
    let depth = 0,
      cursor = parent === null || parent === void 0 ? void 0 : parent.cursor();
    if (cursor && (dir < 0 ? cursor.childBefore(token.from) : cursor.childAfter(token.to)))
      do {
        if (dir < 0 ? cursor.to <= token.from : cursor.from >= token.to) {
          if (depth == 0 && matching.indexOf(cursor.type.name) > -1 && cursor.from < cursor.to) {
            return { start: firstToken, end: { from: cursor.from, to: cursor.to }, matched: true };
          } else if (matchingNodes(cursor.type, dir, brackets)) {
            depth++;
          } else if (matchingNodes(cursor.type, -dir, brackets)) {
            if (depth == 0)
              return {
                start: firstToken,
                end: cursor.from == cursor.to ? undefined : { from: cursor.from, to: cursor.to },
                matched: false,
              };
            depth--;
          }
        }
      } while (dir < 0 ? cursor.prevSibling() : cursor.nextSibling());
    return { start: firstToken, matched: false };
  }
  function matchPlainBrackets(state, pos, dir, tree, tokenType, maxScanDistance, brackets) {
    let startCh = dir < 0 ? state.sliceDoc(pos - 1, pos) : state.sliceDoc(pos, pos + 1);
    let bracket = brackets.indexOf(startCh);
    if (bracket < 0 || (bracket % 2 == 0) != dir > 0) return null;
    let startToken = { from: dir < 0 ? pos - 1 : pos, to: dir > 0 ? pos + 1 : pos };
    let iter = state.doc.iterRange(pos, dir > 0 ? state.doc.length : 0),
      depth = 0;
    for (let distance = 0; !iter.next().done && distance <= maxScanDistance; ) {
      let text = iter.value;
      if (dir < 0) distance += text.length;
      let basePos = pos + distance * dir;
      for (
        let pos = dir > 0 ? 0 : text.length - 1, end = dir > 0 ? text.length : -1;
        pos != end;
        pos += dir
      ) {
        let found = brackets.indexOf(text[pos]);
        if (found < 0 || tree.resolveInner(basePos + pos, 1).type != tokenType) continue;
        if ((found % 2 == 0) == dir > 0) {
          depth++;
        } else if (depth == 1) {
          return {
            start: startToken,
            end: { from: basePos + pos, to: basePos + pos + 1 },
            matched: found >> 1 == bracket >> 1,
          };
        } else {
          depth--;
        }
      }
      if (dir > 0) distance += text.length;
    }
    return iter.done ? { start: startToken, matched: false } : null;
  }

  function countCol(string, end, tabSize, startIndex = 0, startValue = 0) {
    if (end == null) {
      end = string.search(/[^\s\u00a0]/);
      if (end == -1) end = string.length;
    }
    let n = startValue;
    for (let i = startIndex; i < end; i++) {
      if (string.charCodeAt(i) == 9) n += tabSize - (n % tabSize);
      else n++;
    }
    return n;
  }
  class StringStream {
    constructor(string, tabSize, indentUnit) {
      this.string = string;
      this.tabSize = tabSize;
      this.indentUnit = indentUnit;
      this.pos = 0;
      this.start = 0;
      this.lastColumnPos = 0;
      this.lastColumnValue = 0;
    }
    eol() {
      return this.pos >= this.string.length;
    }
    sol() {
      return this.pos == 0;
    }
    peek() {
      return this.string.charAt(this.pos) || undefined;
    }
    next() {
      if (this.pos < this.string.length) return this.string.charAt(this.pos++);
    }
    eat(match) {
      let ch = this.string.charAt(this.pos);
      let ok;
      if (typeof match == 'string') ok = ch == match;
      else ok = ch && (match instanceof RegExp ? match.test(ch) : match(ch));
      if (ok) {
        ++this.pos;
        return ch;
      }
    }
    eatWhile(match) {
      let start = this.pos;
      while (this.eat(match)) {}
      return this.pos > start;
    }
    eatSpace() {
      let start = this.pos;
      while (/[\s\u00a0]/.test(this.string.charAt(this.pos))) ++this.pos;
      return this.pos > start;
    }
    skipToEnd() {
      this.pos = this.string.length;
    }
    skipTo(ch) {
      let found = this.string.indexOf(ch, this.pos);
      if (found > -1) {
        this.pos = found;
        return true;
      }
    }
    backUp(n) {
      this.pos -= n;
    }
    column() {
      if (this.lastColumnPos < this.start) {
        this.lastColumnValue = countCol(
          this.string,
          this.start,
          this.tabSize,
          this.lastColumnPos,
          this.lastColumnValue,
        );
        this.lastColumnPos = this.start;
      }
      return this.lastColumnValue;
    }
    indentation() {
      return countCol(this.string, null, this.tabSize);
    }
    match(pattern, consume, caseInsensitive) {
      if (typeof pattern == 'string') {
        let cased = str => (caseInsensitive ? str.toLowerCase() : str);
        let substr = this.string.substr(this.pos, pattern.length);
        if (cased(substr) == cased(pattern)) {
          if (consume !== false) this.pos += pattern.length;
          return true;
        } else return null;
      } else {
        let match = this.string.slice(this.pos).match(pattern);
        if (match && match.index > 0) return null;
        if (match && consume !== false) this.pos += match[0].length;
        return match;
      }
    }
    current() {
      return this.string.slice(this.start, this.pos);
    }
  }

  function fullParser(spec) {
    return {
      token: spec.token,
      blankLine: spec.blankLine || (() => {}),
      startState: spec.startState || (() => true),
      copyState: spec.copyState || defaultCopyState,
      indent: spec.indent || (() => null),
      languageData: spec.languageData || {},
      tokenTable: spec.tokenTable || noTokens,
    };
  }
  function defaultCopyState(state) {
    if (typeof state != 'object') return state;
    let newState = {};
    for (let prop in state) {
      let val = state[prop];
      newState[prop] = val instanceof Array ? val.slice() : val;
    }
    return newState;
  }
  class StreamLanguage extends Language {
    constructor(parser) {
      let data = defineLanguageFacet(parser.languageData);
      let p = fullParser(parser),
        self;
      let impl = new (class extends Parser {
        createParse(input, fragments, ranges) {
          return new Parse(self, input, fragments, ranges);
        }
      })();
      super(data, impl, [indentService.of((cx, pos) => this.getIndent(cx, pos))]);
      this.topNode = docID(data);
      self = this;
      this.streamParser = p;
      this.stateAfter = new dist_NodeProp({ perNode: true });
      this.tokenTable = parser.tokenTable ? new TokenTable(p.tokenTable) : defaultTokenTable;
    }
    static define(spec) {
      return new StreamLanguage(spec);
    }
    getIndent(cx, pos) {
      let tree = dist_syntaxTree(cx.state),
        at = tree.resolve(pos);
      while (at && at.type != this.topNode) at = at.parent;
      if (!at) return null;
      let start = findState(this, tree, 0, at.from, pos),
        statePos,
        state;
      if (start) {
        state = start.state;
        statePos = start.pos + 1;
      } else {
        state = this.streamParser.startState(cx.unit);
        statePos = 0;
      }
      if (pos - statePos > 10000) return null;
      while (statePos < pos) {
        let line = cx.state.doc.lineAt(statePos),
          end = Math.min(pos, line.to);
        if (line.length) {
          let stream = new StringStream(line.text, cx.state.tabSize, cx.unit);
          while (stream.pos < end - line.from) readToken(this.streamParser.token, stream, state);
        } else {
          this.streamParser.blankLine(state, cx.unit);
        }
        if (end == pos) break;
        statePos = line.to + 1;
      }
      let { text } = cx.lineAt(pos);
      return this.streamParser.indent(state, /^\s*(.*)/.exec(text)[1], cx);
    }
    get allowsNesting() {
      return false;
    }
  }
  function findState(lang, tree, off, startPos, before) {
    let state = off >= startPos && off + tree.length <= before && tree.prop(lang.stateAfter);
    if (state) return { state: lang.streamParser.copyState(state), pos: off + tree.length };
    for (let i = tree.children.length - 1; i >= 0; i--) {
      let child = tree.children[i],
        pos = off + tree.positions[i];
      let found =
        child instanceof Tree && pos < before && findState(lang, child, pos, startPos, before);
      if (found) return found;
    }
    return null;
  }
  function cutTree(lang, tree, from, to, inside) {
    if (inside && from <= 0 && to >= tree.length) return tree;
    if (!inside && tree.type == lang.topNode) inside = true;
    for (let i = tree.children.length - 1; i >= 0; i--) {
      let pos = tree.positions[i],
        child = tree.children[i],
        inner;
      if (pos < to && child instanceof Tree) {
        if (!(inner = cutTree(lang, child, from - pos, to - pos, inside))) break;
        return !inside
          ? inner
          : new Tree(
              tree.type,
              tree.children.slice(0, i).concat(inner),
              tree.positions.slice(0, i + 1),
              pos + inner.length,
            );
      }
    }
    return null;
  }
  function findStartInFragments(lang, fragments, startPos, editorState) {
    for (let f of fragments) {
      let from = f.from + (f.openStart ? 25 : 0),
        to = f.to - (f.openEnd ? 25 : 0);
      let found =
          from <= startPos && to > startPos && findState(lang, f.tree, 0 - f.offset, startPos, to),
        tree;
      if (found && (tree = cutTree(lang, f.tree, startPos + f.offset, found.pos + f.offset, false)))
        return { state: found.state, tree };
    }
    return {
      state: lang.streamParser.startState(editorState ? getIndentUnit(editorState) : 4),
      tree: Tree.empty,
    };
  }
  class Parse {
    constructor(lang, input, fragments, ranges) {
      this.lang = lang;
      this.input = input;
      this.fragments = fragments;
      this.ranges = ranges;
      this.stoppedAt = null;
      this.chunks = [];
      this.chunkPos = [];
      this.chunk = [];
      this.chunkReused = undefined;
      this.rangeIndex = 0;
      this.to = ranges[ranges.length - 1].to;
      let context = ParseContext.get(),
        from = ranges[0].from;
      let { state, tree } = findStartInFragments(
        lang,
        fragments,
        from,
        context === null || context === void 0 ? void 0 : context.state,
      );
      this.state = state;
      this.parsedPos = this.chunkStart = from + tree.length;
      for (let i = 0; i < tree.children.length; i++) {
        this.chunks.push(tree.children[i]);
        this.chunkPos.push(tree.positions[i]);
      }
      if (context && this.parsedPos < context.viewport.from - 100000) {
        this.state = this.lang.streamParser.startState(getIndentUnit(context.state));
        context.skipUntilInView(this.parsedPos, context.viewport.from);
        this.parsedPos = context.viewport.from;
      }
      this.moveRangeIndex();
    }
    advance() {
      let context = ParseContext.get();
      let parseEnd = this.stoppedAt == null ? this.to : Math.min(this.to, this.stoppedAt);
      let end = Math.min(parseEnd, this.chunkStart + 2048);
      if (context) end = Math.min(end, context.viewport.to);
      while (this.parsedPos < end) this.parseLine(context);
      if (this.chunkStart < this.parsedPos) this.finishChunk();
      if (this.parsedPos >= parseEnd) return this.finish();
      if (context && this.parsedPos >= context.viewport.to) {
        context.skipUntilInView(this.parsedPos, parseEnd);
        return this.finish();
      }
      return null;
    }
    stopAt(pos) {
      this.stoppedAt = pos;
    }
    lineAfter(pos) {
      let chunk = this.input.chunk(pos);
      if (!this.input.lineChunks) {
        let eol = chunk.indexOf('\n');
        if (eol > -1) chunk = chunk.slice(0, eol);
      } else if (chunk == '\n') {
        chunk = '';
      }
      return pos + chunk.length <= this.to ? chunk : chunk.slice(0, this.to - pos);
    }
    nextLine() {
      let from = this.parsedPos,
        line = this.lineAfter(from),
        end = from + line.length;
      for (let index = this.rangeIndex; ; ) {
        let rangeEnd = this.ranges[index].to;
        if (rangeEnd >= end) break;
        line = line.slice(0, rangeEnd - (end - line.length));
        index++;
        if (index == this.ranges.length) break;
        let rangeStart = this.ranges[index].from;
        let after = this.lineAfter(rangeStart);
        line += after;
        end = rangeStart + after.length;
      }
      return { line, end };
    }
    skipGapsTo(pos, offset, side) {
      for (;;) {
        let end = this.ranges[this.rangeIndex].to,
          offPos = pos + offset;
        if (side > 0 ? end > offPos : end >= offPos) break;
        let start = this.ranges[++this.rangeIndex].from;
        offset += start - end;
      }
      return offset;
    }
    moveRangeIndex() {
      while (this.ranges[this.rangeIndex].to < this.parsedPos) this.rangeIndex++;
    }
    emitToken(id, from, to, size, offset) {
      if (this.ranges.length > 1) {
        offset = this.skipGapsTo(from, offset, 1);
        from += offset;
        let len0 = this.chunk.length;
        offset = this.skipGapsTo(to, offset, -1);
        to += offset;
        size += this.chunk.length - len0;
      }
      this.chunk.push(id, from, to, size);
      return offset;
    }
    parseLine(context) {
      let { line, end } = this.nextLine(),
        offset = 0,
        { streamParser } = this.lang;
      let stream = new StringStream(
        line,
        context ? context.state.tabSize : 4,
        context ? getIndentUnit(context.state) : 2,
      );
      if (stream.eol()) {
        streamParser.blankLine(this.state, stream.indentUnit);
      } else {
        while (!stream.eol()) {
          let token = readToken(streamParser.token, stream, this.state);
          if (token)
            offset = this.emitToken(
              this.lang.tokenTable.resolve(token),
              this.parsedPos + stream.start,
              this.parsedPos + stream.pos,
              4,
              offset,
            );
          if (stream.start > 10000) break;
        }
      }
      this.parsedPos = end;
      this.moveRangeIndex();
      if (this.parsedPos < this.to) this.parsedPos++;
    }
    finishChunk() {
      let tree = Tree.build({
        buffer: this.chunk,
        start: this.chunkStart,
        length: this.parsedPos - this.chunkStart,
        nodeSet,
        topID: 0,
        maxBufferLength: 2048,
        reused: this.chunkReused,
      });
      tree = new Tree(tree.type, tree.children, tree.positions, tree.length, [
        [this.lang.stateAfter, this.lang.streamParser.copyState(this.state)],
      ]);
      this.chunks.push(tree);
      this.chunkPos.push(this.chunkStart - this.ranges[0].from);
      this.chunk = [];
      this.chunkReused = undefined;
      this.chunkStart = this.parsedPos;
    }
    finish() {
      return new Tree(
        this.lang.topNode,
        this.chunks,
        this.chunkPos,
        this.parsedPos - this.ranges[0].from,
      ).balance();
    }
  }
  function readToken(token, stream, state) {
    stream.start = stream.pos;
    for (let i = 0; i < 10; i++) {
      let result = token(stream, state);
      if (stream.pos > stream.start) return result;
    }
    throw new Error('Stream parser failed to advance stream.');
  }
  const noTokens = Object.create(null);
  const typeArray = [NodeType.none];
  const nodeSet = new NodeSet(typeArray);
  const warned = [];
  const defaultTable = Object.create(null);
  for (let [legacyName, name] of [
    ['variable', 'variableName'],
    ['variable-2', 'variableName.special'],
    ['string-2', 'string.special'],
    ['def', 'variableName.definition'],
    ['tag', 'tagName'],
    ['attribute', 'attributeName'],
    ['type', 'typeName'],
    ['builtin', 'variableName.standard'],
    ['qualifier', 'modifier'],
    ['error', 'invalid'],
    ['header', 'heading'],
    ['property', 'propertyName'],
  ])
    defaultTable[legacyName] = createTokenType(noTokens, name);
  class TokenTable {
    constructor(extra) {
      this.extra = extra;
      this.table = Object.assign(Object.create(null), defaultTable);
    }
    resolve(tag) {
      return !tag ? 0 : this.table[tag] || (this.table[tag] = createTokenType(this.extra, tag));
    }
  }
  const defaultTokenTable = new TokenTable(noTokens);
  function warnForPart(part, msg) {
    if (warned.indexOf(part) > -1) return;
    warned.push(part);
    console.warn(msg);
  }
  function createTokenType(extra, tagStr) {
    let tag = null;
    for (let part of tagStr.split('.')) {
      let value = extra[part] || tags[part];
      if (!value) {
        warnForPart(part, `Unknown highlighting tag ${part}`);
      } else if (typeof value == 'function') {
        if (!tag) warnForPart(part, `Modifier ${part} used at start of tag`);
        else tag = value(tag);
      } else {
        if (tag) warnForPart(part, `Tag ${part} used as modifier`);
        else tag = value;
      }
    }
    if (!tag) return 0;
    let name = tagStr.replace(/ /g, '_'),
      type = NodeType.define({
        id: typeArray.length,
        name,
        props: [styleTags({ [name]: tag })],
      });
    typeArray.push(type);
    return type.id;
  }
  function docID(data) {
    let type = NodeType.define({
      id: typeArray.length,
      name: 'Document',
      props: [languageDataProp.add(() => data)],
    });
    typeArray.push(type);
    return type;
  }

  const toggleComment = target => {
    let config = getConfig(target.state);
    return config.line
      ? toggleLineComment(target)
      : config.block
      ? toggleBlockCommentByLine(target)
      : false;
  };
  function command(f, option) {
    return ({ state, dispatch }) => {
      if (state.readOnly) return false;
      let tr = f(option, state);
      if (!tr) return false;
      dispatch(state.update(tr));
      return true;
    };
  }
  const toggleLineComment = null && command(changeLineComment, 0);
  const lineComment = null && command(changeLineComment, 1);
  const lineUncomment = null && command(changeLineComment, 2);
  const toggleBlockComment = null && command(changeBlockComment, 0);
  const blockComment = null && command(changeBlockComment, 1);
  const blockUncomment = null && command(changeBlockComment, 2);
  const toggleBlockCommentByLine =
    null && command((o, s) => changeBlockComment(o, s, selectedLineRanges(s)), 0);
  function getConfig(state, pos = state.selection.main.head) {
    let data = state.languageDataAt('commentTokens', pos);
    return data.length ? data[0] : {};
  }
  const SearchMargin = 50;
  function findBlockComment(state, { open, close }, from, to) {
    let textBefore = state.sliceDoc(from - SearchMargin, from);
    let textAfter = state.sliceDoc(to, to + SearchMargin);
    let spaceBefore = /\s*$/.exec(textBefore)[0].length,
      spaceAfter = /^\s*/.exec(textAfter)[0].length;
    let beforeOff = textBefore.length - spaceBefore;
    if (
      textBefore.slice(beforeOff - open.length, beforeOff) == open &&
      textAfter.slice(spaceAfter, spaceAfter + close.length) == close
    ) {
      return {
        open: { pos: from - spaceBefore, margin: spaceBefore && 1 },
        close: { pos: to + spaceAfter, margin: spaceAfter && 1 },
      };
    }
    let startText, endText;
    if (to - from <= 2 * SearchMargin) {
      startText = endText = state.sliceDoc(from, to);
    } else {
      startText = state.sliceDoc(from, from + SearchMargin);
      endText = state.sliceDoc(to - SearchMargin, to);
    }
    let startSpace = /^\s*/.exec(startText)[0].length,
      endSpace = /\s*$/.exec(endText)[0].length;
    let endOff = endText.length - endSpace - close.length;
    if (
      startText.slice(startSpace, startSpace + open.length) == open &&
      endText.slice(endOff, endOff + close.length) == close
    ) {
      return {
        open: {
          pos: from + startSpace + open.length,
          margin: /\s/.test(startText.charAt(startSpace + open.length)) ? 1 : 0,
        },
        close: {
          pos: to - endSpace - close.length,
          margin: /\s/.test(endText.charAt(endOff - 1)) ? 1 : 0,
        },
      };
    }
    return null;
  }
  function selectedLineRanges(state) {
    let ranges = [];
    for (let r of state.selection.ranges) {
      let fromLine = state.doc.lineAt(r.from);
      let toLine = r.to <= fromLine.to ? fromLine : state.doc.lineAt(r.to);
      let last = ranges.length - 1;
      if (last >= 0 && ranges[last].to > fromLine.from) ranges[last].to = toLine.to;
      else ranges.push({ from: fromLine.from, to: toLine.to });
    }
    return ranges;
  }
  function changeBlockComment(option, state, ranges = state.selection.ranges) {
    let tokens = ranges.map(r => getConfig(state, r.from).block);
    if (!tokens.every(c => c)) return null;
    let comments = ranges.map((r, i) => findBlockComment(state, tokens[i], r.from, r.to));
    if (option != 2 && !comments.every(c => c)) {
      return {
        changes: state.changes(
          ranges.map((range, i) => {
            if (comments[i]) return [];
            return [
              { from: range.from, insert: tokens[i].open + ' ' },
              { from: range.to, insert: ' ' + tokens[i].close },
            ];
          }),
        ),
      };
    } else if (option != 1 && comments.some(c => c)) {
      let changes = [];
      for (let i = 0, comment; i < comments.length; i++)
        if ((comment = comments[i])) {
          let token = tokens[i],
            { open, close } = comment;
          changes.push(
            { from: open.pos - token.open.length, to: open.pos + open.margin },
            { from: close.pos - close.margin, to: close.pos + token.close.length },
          );
        }
      return { changes };
    }
    return null;
  }
  function changeLineComment(option, state, ranges = state.selection.ranges) {
    let lines = [];
    let prevLine = -1;
    for (let { from, to } of ranges) {
      let startI = lines.length,
        minIndent = 1e9;
      for (let pos = from; pos <= to; ) {
        let line = state.doc.lineAt(pos);
        if (line.from > prevLine && (from == to || to > line.from)) {
          prevLine = line.from;
          let token = getConfig(state, pos).line;
          if (!token) continue;
          let indent = /^\s*/.exec(line.text)[0].length;
          let empty = indent == line.length;
          let comment = line.text.slice(indent, indent + token.length) == token ? indent : -1;
          if (indent < line.text.length && indent < minIndent) minIndent = indent;
          lines.push({ line, comment, token, indent, empty, single: false });
        }
        pos = line.to + 1;
      }
      if (minIndent < 1e9)
        for (let i = startI; i < lines.length; i++)
          if (lines[i].indent < lines[i].line.text.length) lines[i].indent = minIndent;
      if (lines.length == startI + 1) lines[startI].single = true;
    }
    if (option != 2 && lines.some(l => l.comment < 0 && (!l.empty || l.single))) {
      let changes = [];
      for (let { line, token, indent, empty, single } of lines)
        if (single || !empty) changes.push({ from: line.from + indent, insert: token + ' ' });
      let changeSet = state.changes(changes);
      return { changes: changeSet, selection: state.selection.map(changeSet, 1) };
    } else if (option != 1 && lines.some(l => l.comment >= 0)) {
      let changes = [];
      for (let { line, comment, token } of lines)
        if (comment >= 0) {
          let from = line.from + comment,
            to = from + token.length;
          if (line.text[to - line.from] == ' ') to++;
          changes.push({ from, to });
        }
      return { changes };
    }
    return null;
  }

  const fromHistory = Annotation.define();
  const isolateHistory = Annotation.define();
  const invertedEffects = Facet.define();
  const historyConfig = Facet.define({
    combine(configs) {
      return combineConfig(
        configs,
        {
          minDepth: 100,
          newGroupDelay: 500,
        },
        { minDepth: Math.max, newGroupDelay: Math.min },
      );
    },
  });
  function changeEnd(changes) {
    let end = 0;
    changes.iterChangedRanges((_, to) => (end = to));
    return end;
  }
  const historyField_ = dist_StateField.define({
    create() {
      return HistoryState.empty;
    },
    update(state, tr) {
      let config = tr.state.facet(historyConfig);
      let fromHist = tr.annotation(fromHistory);
      if (fromHist) {
        let selection = tr.docChanged
          ? dist_EditorSelection.single(changeEnd(tr.changes))
          : undefined;
        let item = HistEvent.fromTransaction(tr, selection),
          from = fromHist.side;
        let other = from == 0 ? state.undone : state.done;
        if (item) other = updateBranch(other, other.length, config.minDepth, item);
        else other = addSelection(other, tr.startState.selection);
        return new HistoryState(
          from == 0 ? fromHist.rest : other,
          from == 0 ? other : fromHist.rest,
        );
      }
      let isolate = tr.annotation(isolateHistory);
      if (isolate == 'full' || isolate == 'before') state = state.isolate();
      if (tr.annotation(Transaction.addToHistory) === false)
        return !tr.changes.empty ? state.addMapping(tr.changes.desc) : state;
      let event = HistEvent.fromTransaction(tr);
      let time = tr.annotation(Transaction.time),
        userEvent = tr.annotation(Transaction.userEvent);
      if (event)
        state = state.addChanges(event, time, userEvent, config.newGroupDelay, config.minDepth);
      else if (tr.selection)
        state = state.addSelection(tr.startState.selection, time, userEvent, config.newGroupDelay);
      if (isolate == 'full' || isolate == 'after') state = state.isolate();
      return state;
    },
    toJSON(value) {
      return { done: value.done.map(e => e.toJSON()), undone: value.undone.map(e => e.toJSON()) };
    },
    fromJSON(json) {
      return new HistoryState(
        json.done.map(HistEvent.fromJSON),
        json.undone.map(HistEvent.fromJSON),
      );
    },
  });
  function dist_history(config = {}) {
    return [
      historyField_,
      historyConfig.of(config),
      EditorView.domEventHandlers({
        beforeinput(e, view) {
          let command =
            e.inputType == 'historyUndo' ? undo : e.inputType == 'historyRedo' ? redo : null;
          if (!command) return false;
          e.preventDefault();
          return command(view);
        },
      }),
    ];
  }
  const historyField = null && historyField_;
  function cmd(side, selection) {
    return function ({ state, dispatch }) {
      if (!selection && state.readOnly) return false;
      let historyState = state.field(historyField_, false);
      if (!historyState) return false;
      let tr = historyState.pop(side, state, selection);
      if (!tr) return false;
      dispatch(tr);
      return true;
    };
  }
  const undo = cmd(0, false);
  const redo = cmd(1, false);
  const undoSelection = cmd(0, true);
  const redoSelection = cmd(1, true);
  function depth(side) {
    return function (state) {
      let histState = state.field(historyField_, false);
      if (!histState) return 0;
      let branch = side == 0 ? histState.done : histState.undone;
      return branch.length - (branch.length && !branch[0].changes ? 1 : 0);
    };
  }
  const undoDepth = null && depth(0);
  const redoDepth = null && depth(1);
  class HistEvent {
    constructor(changes, effects, mapped, startSelection, selectionsAfter) {
      this.changes = changes;
      this.effects = effects;
      this.mapped = mapped;
      this.startSelection = startSelection;
      this.selectionsAfter = selectionsAfter;
    }
    setSelAfter(after) {
      return new HistEvent(this.changes, this.effects, this.mapped, this.startSelection, after);
    }
    toJSON() {
      var _a, _b, _c;
      return {
        changes: (_a = this.changes) === null || _a === void 0 ? void 0 : _a.toJSON(),
        mapped: (_b = this.mapped) === null || _b === void 0 ? void 0 : _b.toJSON(),
        startSelection: (_c = this.startSelection) === null || _c === void 0 ? void 0 : _c.toJSON(),
        selectionsAfter: this.selectionsAfter.map(s => s.toJSON()),
      };
    }
    static fromJSON(json) {
      return new HistEvent(
        json.changes && ChangeSet.fromJSON(json.changes),
        [],
        json.mapped && ChangeDesc.fromJSON(json.mapped),
        json.startSelection && dist_EditorSelection.fromJSON(json.startSelection),
        json.selectionsAfter.map(dist_EditorSelection.fromJSON),
      );
    }
    static fromTransaction(tr, selection) {
      let effects = dist_none;
      for (let invert of tr.startState.facet(invertedEffects)) {
        let result = invert(tr);
        if (result.length) effects = effects.concat(result);
      }
      if (!effects.length && tr.changes.empty) return null;
      return new HistEvent(
        tr.changes.invert(tr.startState.doc),
        effects,
        undefined,
        selection || tr.startState.selection,
        dist_none,
      );
    }
    static selection(selections) {
      return new HistEvent(undefined, dist_none, undefined, undefined, selections);
    }
  }
  function updateBranch(branch, to, maxLen, newEvent) {
    let start = to + 1 > maxLen + 20 ? to - maxLen - 1 : 0;
    let newBranch = branch.slice(start, to);
    newBranch.push(newEvent);
    return newBranch;
  }
  function isAdjacent(a, b) {
    let ranges = [],
      isAdjacent = false;
    a.iterChangedRanges((f, t) => ranges.push(f, t));
    b.iterChangedRanges((_f, _t, f, t) => {
      for (let i = 0; i < ranges.length; ) {
        let from = ranges[i++],
          to = ranges[i++];
        if (t >= from && f <= to) isAdjacent = true;
      }
    });
    return isAdjacent;
  }
  function eqSelectionShape(a, b) {
    return (
      a.ranges.length == b.ranges.length &&
      a.ranges.filter((r, i) => r.empty != b.ranges[i].empty).length === 0
    );
  }
  function conc(a, b) {
    return !a.length ? b : !b.length ? a : a.concat(b);
  }
  const dist_none = [];
  const MaxSelectionsPerEvent = 200;
  function addSelection(branch, selection) {
    if (!branch.length) {
      return [HistEvent.selection([selection])];
    } else {
      let lastEvent = branch[branch.length - 1];
      let sels = lastEvent.selectionsAfter.slice(
        Math.max(0, lastEvent.selectionsAfter.length - MaxSelectionsPerEvent),
      );
      if (sels.length && sels[sels.length - 1].eq(selection)) return branch;
      sels.push(selection);
      return updateBranch(branch, branch.length - 1, 1e9, lastEvent.setSelAfter(sels));
    }
  }
  function popSelection(branch) {
    let last = branch[branch.length - 1];
    let newBranch = branch.slice();
    newBranch[branch.length - 1] = last.setSelAfter(
      last.selectionsAfter.slice(0, last.selectionsAfter.length - 1),
    );
    return newBranch;
  }
  function addMappingToBranch(branch, mapping) {
    if (!branch.length) return branch;
    let length = branch.length,
      selections = dist_none;
    while (length) {
      let event = mapEvent(branch[length - 1], mapping, selections);
      if ((event.changes && !event.changes.empty) || event.effects.length) {
        let result = branch.slice(0, length);
        result[length - 1] = event;
        return result;
      } else {
        mapping = event.mapped;
        length--;
        selections = event.selectionsAfter;
      }
    }
    return selections.length ? [HistEvent.selection(selections)] : dist_none;
  }
  function mapEvent(event, mapping, extraSelections) {
    let selections = conc(
      event.selectionsAfter.length ? event.selectionsAfter.map(s => s.map(mapping)) : dist_none,
      extraSelections,
    );
    if (!event.changes) return HistEvent.selection(selections);
    let mappedChanges = event.changes.map(mapping),
      before = mapping.mapDesc(event.changes, true);
    let fullMapping = event.mapped ? event.mapped.composeDesc(before) : before;
    return new HistEvent(
      mappedChanges,
      dist_StateEffect.mapEffects(event.effects, mapping),
      fullMapping,
      event.startSelection.map(before),
      selections,
    );
  }
  const joinableUserEvent = /^(input\.type|delete)($|\.)/;
  class HistoryState {
    constructor(done, undone, prevTime = 0, prevUserEvent = undefined) {
      this.done = done;
      this.undone = undone;
      this.prevTime = prevTime;
      this.prevUserEvent = prevUserEvent;
    }
    isolate() {
      return this.prevTime ? new HistoryState(this.done, this.undone) : this;
    }
    addChanges(event, time, userEvent, newGroupDelay, maxLen) {
      let done = this.done,
        lastEvent = done[done.length - 1];
      if (
        lastEvent &&
        lastEvent.changes &&
        !lastEvent.changes.empty &&
        event.changes &&
        (!userEvent || joinableUserEvent.test(userEvent)) &&
        ((!lastEvent.selectionsAfter.length &&
          time - this.prevTime < newGroupDelay &&
          isAdjacent(lastEvent.changes, event.changes)) ||
          userEvent == 'input.type.compose')
      ) {
        done = updateBranch(
          done,
          done.length - 1,
          maxLen,
          new HistEvent(
            event.changes.compose(lastEvent.changes),
            conc(event.effects, lastEvent.effects),
            lastEvent.mapped,
            lastEvent.startSelection,
            dist_none,
          ),
        );
      } else {
        done = updateBranch(done, done.length, maxLen, event);
      }
      return new HistoryState(done, dist_none, time, userEvent);
    }
    addSelection(selection, time, userEvent, newGroupDelay) {
      let last = this.done.length ? this.done[this.done.length - 1].selectionsAfter : dist_none;
      if (
        last.length > 0 &&
        time - this.prevTime < newGroupDelay &&
        userEvent == this.prevUserEvent &&
        userEvent &&
        /^select($|\.)/.test(userEvent) &&
        eqSelectionShape(last[last.length - 1], selection)
      )
        return this;
      return new HistoryState(addSelection(this.done, selection), this.undone, time, userEvent);
    }
    addMapping(mapping) {
      return new HistoryState(
        addMappingToBranch(this.done, mapping),
        addMappingToBranch(this.undone, mapping),
        this.prevTime,
        this.prevUserEvent,
      );
    }
    pop(side, state, selection) {
      let branch = side == 0 ? this.done : this.undone;
      if (branch.length == 0) return null;
      let event = branch[branch.length - 1];
      if (selection && event.selectionsAfter.length) {
        return state.update({
          selection: event.selectionsAfter[event.selectionsAfter.length - 1],
          annotations: fromHistory.of({ side, rest: popSelection(branch) }),
          userEvent: side == 0 ? 'select.undo' : 'select.redo',
          scrollIntoView: true,
        });
      } else if (!event.changes) {
        return null;
      } else {
        let rest = branch.length == 1 ? dist_none : branch.slice(0, branch.length - 1);
        if (event.mapped) rest = addMappingToBranch(rest, event.mapped);
        return state.update({
          changes: event.changes,
          selection: event.startSelection,
          effects: event.effects,
          annotations: fromHistory.of({ side, rest }),
          filter: false,
          userEvent: side == 0 ? 'undo' : 'redo',
          scrollIntoView: true,
        });
      }
    }
  }
  HistoryState.empty = new HistoryState(dist_none, dist_none);
  const historyKeymap = [
    { key: 'Mod-z', run: undo, preventDefault: true },
    { key: 'Mod-y', mac: 'Mod-Shift-z', run: redo, preventDefault: true },
    { linux: 'Ctrl-Shift-z', run: redo, preventDefault: true },
    { key: 'Mod-u', run: undoSelection, preventDefault: true },
    { key: 'Alt-u', mac: 'Mod-Shift-u', run: redoSelection, preventDefault: true },
  ];

  function updateSel(sel, by) {
    return dist_EditorSelection.create(sel.ranges.map(by), sel.mainIndex);
  }
  function setSel(state, selection) {
    return state.update({ selection, scrollIntoView: true, userEvent: 'select' });
  }
  function moveSel({ state, dispatch }, how) {
    let selection = updateSel(state.selection, how);
    if (selection.eq(state.selection)) return false;
    dispatch(setSel(state, selection));
    return true;
  }
  function rangeEnd(range, forward) {
    return dist_EditorSelection.cursor(forward ? range.to : range.from);
  }
  function cursorByChar(view, forward) {
    return moveSel(view, range =>
      range.empty ? view.moveByChar(range, forward) : rangeEnd(range, forward),
    );
  }
  function ltrAtCursor(view) {
    return view.textDirectionAt(view.state.selection.main.head) == Direction.LTR;
  }
  const cursorCharLeft = view => cursorByChar(view, !ltrAtCursor(view));
  const cursorCharRight = view => cursorByChar(view, ltrAtCursor(view));
  const cursorCharForward = view => cursorByChar(view, true);
  const cursorCharBackward = view => cursorByChar(view, false);
  function cursorByGroup(view, forward) {
    return moveSel(view, range =>
      range.empty ? view.moveByGroup(range, forward) : rangeEnd(range, forward),
    );
  }
  const cursorGroupLeft = view => cursorByGroup(view, !ltrAtCursor(view));
  const cursorGroupRight = view => cursorByGroup(view, ltrAtCursor(view));
  const cursorGroupForward = view => cursorByGroup(view, true);
  const cursorGroupBackward = view => cursorByGroup(view, false);
  function moveBySubword(view, range, forward) {
    let categorize = view.state.charCategorizer(range.from);
    return view.moveByChar(range, forward, start => {
      let cat = CharCategory.Space,
        pos = range.from;
      let done = false,
        sawUpper = false,
        sawLower = false;
      let step = next => {
        if (done) return false;
        pos += forward ? next.length : -next.length;
        let nextCat = categorize(next),
          ahead;
        if (cat == CharCategory.Space) cat = nextCat;
        if (cat != nextCat) return false;
        if (cat == CharCategory.Word) {
          if (next.toLowerCase() == next) {
            if (!forward && sawUpper) return false;
            sawLower = true;
          } else if (sawLower) {
            if (forward) return false;
            done = true;
          } else {
            if (
              sawUpper &&
              forward &&
              categorize((ahead = view.state.sliceDoc(pos, pos + 1))) == CharCategory.Word &&
              ahead.toLowerCase() == ahead
            )
              return false;
            sawUpper = true;
          }
        }
        return true;
      };
      step(start);
      return step;
    });
  }
  function cursorBySubword(view, forward) {
    return moveSel(view, range =>
      range.empty ? moveBySubword(view, range, forward) : rangeEnd(range, forward),
    );
  }
  const cursorSubwordForward = view => cursorBySubword(view, true);
  const cursorSubwordBackward = view => cursorBySubword(view, false);
  function interestingNode(state, node, bracketProp) {
    if (node.type.prop(bracketProp)) return true;
    let len = node.to - node.from;
    return (
      (len && (len > 2 || /[^\s,.;:]/.test(state.sliceDoc(node.from, node.to)))) || node.firstChild
    );
  }
  function moveBySyntax(state, start, forward) {
    let pos = syntaxTree(state).resolveInner(start.head);
    let bracketProp = forward ? NodeProp.closedBy : NodeProp.openedBy;
    for (let at = start.head; ; ) {
      let next = forward ? pos.childAfter(at) : pos.childBefore(at);
      if (!next) break;
      if (interestingNode(state, next, bracketProp)) pos = next;
      else at = forward ? next.to : next.from;
    }
    let bracket = pos.type.prop(bracketProp),
      match,
      newPos;
    if (
      bracket &&
      (match = forward ? matchBrackets(state, pos.from, 1) : matchBrackets(state, pos.to, -1)) &&
      match.matched
    )
      newPos = forward ? match.end.to : match.end.from;
    else newPos = forward ? pos.to : pos.from;
    return EditorSelection.cursor(newPos, forward ? -1 : 1);
  }
  const cursorSyntaxLeft = view =>
    moveSel(view, range => moveBySyntax(view.state, range, !ltrAtCursor(view)));
  const cursorSyntaxRight = view =>
    moveSel(view, range => moveBySyntax(view.state, range, ltrAtCursor(view)));
  function cursorByLine(view, forward) {
    return moveSel(view, range => {
      if (!range.empty) return rangeEnd(range, forward);
      let moved = view.moveVertically(range, forward);
      return moved.head != range.head ? moved : view.moveToLineBoundary(range, forward);
    });
  }
  const cursorLineUp = view => cursorByLine(view, false);
  const cursorLineDown = view => cursorByLine(view, true);
  function pageHeight(view) {
    return Math.max(view.defaultLineHeight, Math.min(view.dom.clientHeight, innerHeight) - 5);
  }
  function cursorByPage(view, forward) {
    let { state } = view,
      selection = updateSel(state.selection, range => {
        return range.empty
          ? view.moveVertically(range, forward, pageHeight(view))
          : rangeEnd(range, forward);
      });
    if (selection.eq(state.selection)) return false;
    let startPos = view.coordsAtPos(state.selection.main.head);
    let scrollRect = view.scrollDOM.getBoundingClientRect();
    let effect;
    if (
      startPos &&
      startPos.top > scrollRect.top &&
      startPos.bottom < scrollRect.bottom &&
      startPos.top - scrollRect.top <=
        view.scrollDOM.scrollHeight - view.scrollDOM.scrollTop - view.scrollDOM.clientHeight
    )
      effect = EditorView.scrollIntoView(selection.main.head, {
        y: 'start',
        yMargin: startPos.top - scrollRect.top,
      });
    view.dispatch(setSel(state, selection), { effects: effect });
    return true;
  }
  const cursorPageUp = view => cursorByPage(view, false);
  const cursorPageDown = view => cursorByPage(view, true);
  function moveByLineBoundary(view, start, forward) {
    let line = view.lineBlockAt(start.head),
      moved = view.moveToLineBoundary(start, forward);
    if (moved.head == start.head && moved.head != (forward ? line.to : line.from))
      moved = view.moveToLineBoundary(start, forward, false);
    if (!forward && moved.head == line.from && line.length) {
      let space = /^\s*/.exec(view.state.sliceDoc(line.from, Math.min(line.from + 100, line.to)))[0]
        .length;
      if (space && start.head != line.from + space)
        moved = dist_EditorSelection.cursor(line.from + space);
    }
    return moved;
  }
  const cursorLineBoundaryForward = view =>
    moveSel(view, range => moveByLineBoundary(view, range, true));
  const cursorLineBoundaryBackward = view =>
    moveSel(view, range => moveByLineBoundary(view, range, false));
  const cursorLineStart = view =>
    moveSel(view, range => dist_EditorSelection.cursor(view.lineBlockAt(range.head).from, 1));
  const cursorLineEnd = view =>
    moveSel(view, range => dist_EditorSelection.cursor(view.lineBlockAt(range.head).to, -1));
  function toMatchingBracket(state, dispatch, extend) {
    let found = false,
      selection = updateSel(state.selection, range => {
        let matching =
          matchBrackets(state, range.head, -1) ||
          matchBrackets(state, range.head, 1) ||
          (range.head > 0 && matchBrackets(state, range.head - 1, 1)) ||
          (range.head < state.doc.length && matchBrackets(state, range.head + 1, -1));
        if (!matching || !matching.end) return range;
        found = true;
        let head = matching.start.from == range.head ? matching.end.to : matching.end.from;
        return extend ? EditorSelection.range(range.anchor, head) : EditorSelection.cursor(head);
      });
    if (!found) return false;
    dispatch(setSel(state, selection));
    return true;
  }
  const cursorMatchingBracket = ({ state, dispatch }) => toMatchingBracket(state, dispatch, false);
  const selectMatchingBracket = ({ state, dispatch }) => toMatchingBracket(state, dispatch, true);
  function extendSel(view, how) {
    let selection = updateSel(view.state.selection, range => {
      let head = how(range);
      return dist_EditorSelection.range(range.anchor, head.head, head.goalColumn);
    });
    if (selection.eq(view.state.selection)) return false;
    view.dispatch(setSel(view.state, selection));
    return true;
  }
  function selectByChar(view, forward) {
    return extendSel(view, range => view.moveByChar(range, forward));
  }
  const selectCharLeft = view => selectByChar(view, !ltrAtCursor(view));
  const selectCharRight = view => selectByChar(view, ltrAtCursor(view));
  const selectCharForward = view => selectByChar(view, true);
  const selectCharBackward = view => selectByChar(view, false);
  function selectByGroup(view, forward) {
    return extendSel(view, range => view.moveByGroup(range, forward));
  }
  const selectGroupLeft = view => selectByGroup(view, !ltrAtCursor(view));
  const selectGroupRight = view => selectByGroup(view, ltrAtCursor(view));
  const selectGroupForward = view => selectByGroup(view, true);
  const selectGroupBackward = view => selectByGroup(view, false);
  function selectBySubword(view, forward) {
    return extendSel(view, range => moveBySubword(view, range, forward));
  }
  const selectSubwordForward = view => selectBySubword(view, true);
  const selectSubwordBackward = view => selectBySubword(view, false);
  const selectSyntaxLeft = view =>
    extendSel(view, range => moveBySyntax(view.state, range, !ltrAtCursor(view)));
  const selectSyntaxRight = view =>
    extendSel(view, range => moveBySyntax(view.state, range, ltrAtCursor(view)));
  function selectByLine(view, forward) {
    return extendSel(view, range => view.moveVertically(range, forward));
  }
  const selectLineUp = view => selectByLine(view, false);
  const selectLineDown = view => selectByLine(view, true);
  function selectByPage(view, forward) {
    return extendSel(view, range => view.moveVertically(range, forward, pageHeight(view)));
  }
  const selectPageUp = view => selectByPage(view, false);
  const selectPageDown = view => selectByPage(view, true);
  const selectLineBoundaryForward = view =>
    extendSel(view, range => moveByLineBoundary(view, range, true));
  const selectLineBoundaryBackward = view =>
    extendSel(view, range => moveByLineBoundary(view, range, false));
  const selectLineStart = view =>
    extendSel(view, range => dist_EditorSelection.cursor(view.lineBlockAt(range.head).from));
  const selectLineEnd = view =>
    extendSel(view, range => dist_EditorSelection.cursor(view.lineBlockAt(range.head).to));
  const cursorDocStart = ({ state, dispatch }) => {
    dispatch(setSel(state, { anchor: 0 }));
    return true;
  };
  const cursorDocEnd = ({ state, dispatch }) => {
    dispatch(setSel(state, { anchor: state.doc.length }));
    return true;
  };
  const selectDocStart = ({ state, dispatch }) => {
    dispatch(setSel(state, { anchor: state.selection.main.anchor, head: 0 }));
    return true;
  };
  const selectDocEnd = ({ state, dispatch }) => {
    dispatch(setSel(state, { anchor: state.selection.main.anchor, head: state.doc.length }));
    return true;
  };
  const selectAll = ({ state, dispatch }) => {
    dispatch(
      state.update({ selection: { anchor: 0, head: state.doc.length }, userEvent: 'select' }),
    );
    return true;
  };
  const selectLine = ({ state, dispatch }) => {
    let ranges = selectedLineBlocks(state).map(({ from, to }) =>
      EditorSelection.range(from, Math.min(to + 1, state.doc.length)),
    );
    dispatch(state.update({ selection: EditorSelection.create(ranges), userEvent: 'select' }));
    return true;
  };
  const selectParentSyntax = ({ state, dispatch }) => {
    let selection = updateSel(state.selection, range => {
      var _a;
      let context = syntaxTree(state).resolveInner(range.head, 1);
      while (
        !(
          (context.from < range.from && context.to >= range.to) ||
          (context.to > range.to && context.from <= range.from) ||
          !((_a = context.parent) === null || _a === void 0 ? void 0 : _a.parent)
        )
      )
        context = context.parent;
      return EditorSelection.range(context.to, context.from);
    });
    dispatch(setSel(state, selection));
    return true;
  };
  const simplifySelection = ({ state, dispatch }) => {
    let cur = state.selection,
      selection = null;
    if (cur.ranges.length > 1) selection = EditorSelection.create([cur.main]);
    else if (!cur.main.empty)
      selection = EditorSelection.create([EditorSelection.cursor(cur.main.head)]);
    if (!selection) return false;
    dispatch(setSel(state, selection));
    return true;
  };
  function deleteBy({ state, dispatch }, by) {
    if (state.readOnly) return false;
    let event = 'delete.selection';
    let changes = state.changeByRange(range => {
      let { from, to } = range;
      if (from == to) {
        let towards = by(from);
        if (towards < from) event = 'delete.backward';
        else if (towards > from) event = 'delete.forward';
        from = Math.min(from, towards);
        to = Math.max(to, towards);
      }
      return from == to
        ? { range }
        : { changes: { from, to }, range: dist_EditorSelection.cursor(from) };
    });
    if (changes.changes.empty) return false;
    dispatch(
      state.update(changes, {
        scrollIntoView: true,
        userEvent: event,
        effects:
          event == 'delete.selection'
            ? EditorView.announce.of(state.phrase('Selection deleted'))
            : undefined,
      }),
    );
    return true;
  }
  function skipAtomic(target, pos, forward) {
    if (target instanceof EditorView)
      for (let ranges of target.state.facet(EditorView.atomicRanges).map(f => f(target)))
        ranges.between(pos, pos, (from, to) => {
          if (from < pos && to > pos) pos = forward ? to : from;
        });
    return pos;
  }
  const deleteByChar = (target, forward) =>
    deleteBy(target, pos => {
      let { state } = target,
        line = state.doc.lineAt(pos),
        before,
        targetPos;
      if (
        !forward &&
        pos > line.from &&
        pos < line.from + 200 &&
        !/[^ \t]/.test((before = line.text.slice(0, pos - line.from)))
      ) {
        if (before[before.length - 1] == '\t') return pos - 1;
        let col = dist_countColumn(before, state.tabSize),
          drop = col % getIndentUnit(state) || getIndentUnit(state);
        for (let i = 0; i < drop && before[before.length - 1 - i] == ' '; i++) pos--;
        targetPos = pos;
      } else {
        targetPos = findClusterBreak(line.text, pos - line.from, forward, forward) + line.from;
        if (targetPos == pos && line.number != (forward ? state.doc.lines : 1))
          targetPos += forward ? 1 : -1;
      }
      return skipAtomic(target, targetPos, forward);
    });
  const deleteCharBackward = view => deleteByChar(view, false);
  const deleteCharForward = view => deleteByChar(view, true);
  const deleteByGroup = (target, forward) =>
    deleteBy(target, start => {
      let pos = start,
        { state } = target,
        line = state.doc.lineAt(pos);
      let categorize = state.charCategorizer(pos);
      for (let cat = null; ; ) {
        if (pos == (forward ? line.to : line.from)) {
          if (pos == start && line.number != (forward ? state.doc.lines : 1))
            pos += forward ? 1 : -1;
          break;
        }
        let next = findClusterBreak(line.text, pos - line.from, forward) + line.from;
        let nextChar = line.text.slice(
          Math.min(pos, next) - line.from,
          Math.max(pos, next) - line.from,
        );
        let nextCat = categorize(nextChar);
        if (cat != null && nextCat != cat) break;
        if (nextChar != ' ' || pos != start) cat = nextCat;
        pos = next;
      }
      return skipAtomic(target, pos, forward);
    });
  const deleteGroupBackward = target => deleteByGroup(target, false);
  const deleteGroupForward = target => deleteByGroup(target, true);
  const deleteToLineEnd = view =>
    deleteBy(view, pos => {
      let lineEnd = view.lineBlockAt(pos).to;
      return skipAtomic(
        view,
        pos < lineEnd ? lineEnd : Math.min(view.state.doc.length, pos + 1),
        true,
      );
    });
  const deleteToLineStart = view =>
    deleteBy(view, pos => {
      let lineStart = view.lineBlockAt(pos).from;
      return skipAtomic(view, pos > lineStart ? lineStart : Math.max(0, pos - 1), false);
    });
  const deleteTrailingWhitespace = ({ state, dispatch }) => {
    if (state.readOnly) return false;
    let changes = [];
    for (let pos = 0, prev = '', iter = state.doc.iter(); ; ) {
      iter.next();
      if (iter.lineBreak || iter.done) {
        let trailing = prev.search(/\s+$/);
        if (trailing > -1) changes.push({ from: pos - (prev.length - trailing), to: pos });
        if (iter.done) break;
        prev = '';
      } else {
        prev = iter.value;
      }
      pos += iter.value.length;
    }
    if (!changes.length) return false;
    dispatch(state.update({ changes, userEvent: 'delete' }));
    return true;
  };
  const splitLine = ({ state, dispatch }) => {
    if (state.readOnly) return false;
    let changes = state.changeByRange(range => {
      return {
        changes: { from: range.from, to: range.to, insert: dist_Text.of(['', '']) },
        range: dist_EditorSelection.cursor(range.from),
      };
    });
    dispatch(state.update(changes, { scrollIntoView: true, userEvent: 'input' }));
    return true;
  };
  const transposeChars = ({ state, dispatch }) => {
    if (state.readOnly) return false;
    let changes = state.changeByRange(range => {
      if (!range.empty || range.from == 0 || range.from == state.doc.length) return { range };
      let pos = range.from,
        line = state.doc.lineAt(pos);
      let from =
        pos == line.from
          ? pos - 1
          : findClusterBreak(line.text, pos - line.from, false) + line.from;
      let to =
        pos == line.to ? pos + 1 : findClusterBreak(line.text, pos - line.from, true) + line.from;
      return {
        changes: { from, to, insert: state.doc.slice(pos, to).append(state.doc.slice(from, pos)) },
        range: dist_EditorSelection.cursor(to),
      };
    });
    if (changes.changes.empty) return false;
    dispatch(state.update(changes, { scrollIntoView: true, userEvent: 'move.character' }));
    return true;
  };
  function selectedLineBlocks(state) {
    let blocks = [],
      upto = -1;
    for (let range of state.selection.ranges) {
      let startLine = state.doc.lineAt(range.from),
        endLine = state.doc.lineAt(range.to);
      if (!range.empty && range.to == endLine.from) endLine = state.doc.lineAt(range.to - 1);
      if (upto >= startLine.number) {
        let prev = blocks[blocks.length - 1];
        prev.to = endLine.to;
        prev.ranges.push(range);
      } else {
        blocks.push({ from: startLine.from, to: endLine.to, ranges: [range] });
      }
      upto = endLine.number + 1;
    }
    return blocks;
  }
  function moveLine(state, dispatch, forward) {
    if (state.readOnly) return false;
    let changes = [],
      ranges = [];
    for (let block of selectedLineBlocks(state)) {
      if (forward ? block.to == state.doc.length : block.from == 0) continue;
      let nextLine = state.doc.lineAt(forward ? block.to + 1 : block.from - 1);
      let size = nextLine.length + 1;
      if (forward) {
        changes.push(
          { from: block.to, to: nextLine.to },
          { from: block.from, insert: nextLine.text + state.lineBreak },
        );
        for (let r of block.ranges)
          ranges.push(
            EditorSelection.range(
              Math.min(state.doc.length, r.anchor + size),
              Math.min(state.doc.length, r.head + size),
            ),
          );
      } else {
        changes.push(
          { from: nextLine.from, to: block.from },
          { from: block.to, insert: state.lineBreak + nextLine.text },
        );
        for (let r of block.ranges)
          ranges.push(EditorSelection.range(r.anchor - size, r.head - size));
      }
    }
    if (!changes.length) return false;
    dispatch(
      state.update({
        changes,
        scrollIntoView: true,
        selection: EditorSelection.create(ranges, state.selection.mainIndex),
        userEvent: 'move.line',
      }),
    );
    return true;
  }
  const moveLineUp = ({ state, dispatch }) => moveLine(state, dispatch, false);
  const moveLineDown = ({ state, dispatch }) => moveLine(state, dispatch, true);
  function copyLine(state, dispatch, forward) {
    if (state.readOnly) return false;
    let changes = [];
    for (let block of selectedLineBlocks(state)) {
      if (forward)
        changes.push({
          from: block.from,
          insert: state.doc.slice(block.from, block.to) + state.lineBreak,
        });
      else
        changes.push({
          from: block.to,
          insert: state.lineBreak + state.doc.slice(block.from, block.to),
        });
    }
    dispatch(state.update({ changes, scrollIntoView: true, userEvent: 'input.copyline' }));
    return true;
  }
  const copyLineUp = ({ state, dispatch }) => copyLine(state, dispatch, false);
  const copyLineDown = ({ state, dispatch }) => copyLine(state, dispatch, true);
  const deleteLine = view => {
    if (view.state.readOnly) return false;
    let { state } = view,
      changes = state.changes(
        selectedLineBlocks(state).map(({ from, to }) => {
          if (from > 0) from--;
          else if (to < state.doc.length) to++;
          return { from, to };
        }),
      );
    let selection = updateSel(state.selection, range => view.moveVertically(range, true)).map(
      changes,
    );
    view.dispatch({ changes, selection, scrollIntoView: true, userEvent: 'delete.line' });
    return true;
  };
  const insertNewline = ({ state, dispatch }) => {
    dispatch(
      state.update(state.replaceSelection(state.lineBreak), {
        scrollIntoView: true,
        userEvent: 'input',
      }),
    );
    return true;
  };
  function isBetweenBrackets(state, pos) {
    if (/\(\)|\[\]|\{\}/.test(state.sliceDoc(pos - 1, pos + 1))) return { from: pos, to: pos };
    let context = dist_syntaxTree(state).resolveInner(pos);
    let before = context.childBefore(pos),
      after = context.childAfter(pos),
      closedBy;
    if (
      before &&
      after &&
      before.to <= pos &&
      after.from >= pos &&
      (closedBy = before.type.prop(dist_NodeProp.closedBy)) &&
      closedBy.indexOf(after.name) > -1 &&
      state.doc.lineAt(before.to).from == state.doc.lineAt(after.from).from
    )
      return { from: before.to, to: after.from };
    return null;
  }
  const insertNewlineAndIndent = newlineAndIndent(false);
  const insertBlankLine = null && newlineAndIndent(true);
  function newlineAndIndent(atEof) {
    return ({ state, dispatch }) => {
      if (state.readOnly) return false;
      let changes = state.changeByRange(range => {
        let { from, to } = range,
          line = state.doc.lineAt(from);
        let explode = !atEof && from == to && isBetweenBrackets(state, from);
        if (atEof) from = to = (to <= line.to ? line : state.doc.lineAt(to)).to;
        let cx = new dist_IndentContext(state, {
          simulateBreak: from,
          simulateDoubleBreak: !!explode,
        });
        let indent = dist_getIndentation(cx, from);
        if (indent == null) indent = /^\s*/.exec(state.doc.lineAt(from).text)[0].length;
        while (to < line.to && /\s/.test(line.text[to - line.from])) to++;
        if (explode) ({ from, to } = explode);
        else if (from > line.from && from < line.from + 100 && !/\S/.test(line.text.slice(0, from)))
          from = line.from;
        let insert = ['', dist_indentString(state, indent)];
        if (explode) insert.push(dist_indentString(state, cx.lineIndent(line.from, -1)));
        return {
          changes: { from, to, insert: dist_Text.of(insert) },
          range: dist_EditorSelection.cursor(from + 1 + insert[1].length),
        };
      });
      dispatch(state.update(changes, { scrollIntoView: true, userEvent: 'input' }));
      return true;
    };
  }
  function changeBySelectedLine(state, f) {
    let atLine = -1;
    return state.changeByRange(range => {
      let changes = [];
      for (let pos = range.from; pos <= range.to; ) {
        let line = state.doc.lineAt(pos);
        if (line.number > atLine && (range.empty || range.to > line.from)) {
          f(line, changes, range);
          atLine = line.number;
        }
        pos = line.to + 1;
      }
      let changeSet = state.changes(changes);
      return {
        changes,
        range: dist_EditorSelection.range(
          changeSet.mapPos(range.anchor, 1),
          changeSet.mapPos(range.head, 1),
        ),
      };
    });
  }
  const indentSelection = ({ state, dispatch }) => {
    if (state.readOnly) return false;
    let updated = Object.create(null);
    let context = new IndentContext(state, {
      overrideIndentation: start => {
        let found = updated[start];
        return found == null ? -1 : found;
      },
    });
    let changes = changeBySelectedLine(state, (line, changes, range) => {
      let indent = getIndentation(context, line.from);
      if (indent == null) return;
      if (!/\S/.test(line.text)) indent = 0;
      let cur = /^\s*/.exec(line.text)[0];
      let norm = indentString(state, indent);
      if (cur != norm || range.from < line.from + cur.length) {
        updated[line.from] = indent;
        changes.push({ from: line.from, to: line.from + cur.length, insert: norm });
      }
    });
    if (!changes.changes.empty) dispatch(state.update(changes, { userEvent: 'indent' }));
    return true;
  };
  const indentMore = ({ state, dispatch }) => {
    if (state.readOnly) return false;
    dispatch(
      state.update(
        changeBySelectedLine(state, (line, changes) => {
          changes.push({ from: line.from, insert: state.facet(indentUnit) });
        }),
        { userEvent: 'input.indent' },
      ),
    );
    return true;
  };
  const indentLess = ({ state, dispatch }) => {
    if (state.readOnly) return false;
    dispatch(
      state.update(
        changeBySelectedLine(state, (line, changes) => {
          let space = /^\s*/.exec(line.text)[0];
          if (!space) return;
          let col = dist_countColumn(space, state.tabSize),
            keep = 0;
          let insert = dist_indentString(state, Math.max(0, col - getIndentUnit(state)));
          while (
            keep < space.length &&
            keep < insert.length &&
            space.charCodeAt(keep) == insert.charCodeAt(keep)
          )
            keep++;
          changes.push({
            from: line.from + keep,
            to: line.from + space.length,
            insert: insert.slice(keep),
          });
        }),
        { userEvent: 'delete.dedent' },
      ),
    );
    return true;
  };
  const insertTab = ({ state, dispatch }) => {
    if (state.selection.ranges.some(r => !r.empty)) return indentMore({ state, dispatch });
    dispatch(
      state.update(state.replaceSelection('\t'), { scrollIntoView: true, userEvent: 'input' }),
    );
    return true;
  };
  const emacsStyleKeymap = [
    { key: 'Ctrl-b', run: cursorCharLeft, shift: selectCharLeft, preventDefault: true },
    { key: 'Ctrl-f', run: cursorCharRight, shift: selectCharRight },
    { key: 'Ctrl-p', run: cursorLineUp, shift: selectLineUp },
    { key: 'Ctrl-n', run: cursorLineDown, shift: selectLineDown },
    { key: 'Ctrl-a', run: cursorLineStart, shift: selectLineStart },
    { key: 'Ctrl-e', run: cursorLineEnd, shift: selectLineEnd },
    { key: 'Ctrl-d', run: deleteCharForward },
    { key: 'Ctrl-h', run: deleteCharBackward },
    { key: 'Ctrl-k', run: deleteToLineEnd },
    { key: 'Ctrl-Alt-h', run: deleteGroupBackward },
    { key: 'Ctrl-o', run: splitLine },
    { key: 'Ctrl-t', run: transposeChars },
    { key: 'Ctrl-v', run: cursorPageDown },
  ];
  const standardKeymap = [
    { key: 'ArrowLeft', run: cursorCharLeft, shift: selectCharLeft, preventDefault: true },
    { key: 'Mod-ArrowLeft', mac: 'Alt-ArrowLeft', run: cursorGroupLeft, shift: selectGroupLeft },
    { mac: 'Cmd-ArrowLeft', run: cursorLineBoundaryBackward, shift: selectLineBoundaryBackward },
    { key: 'ArrowRight', run: cursorCharRight, shift: selectCharRight, preventDefault: true },
    {
      key: 'Mod-ArrowRight',
      mac: 'Alt-ArrowRight',
      run: cursorGroupRight,
      shift: selectGroupRight,
    },
    { mac: 'Cmd-ArrowRight', run: cursorLineBoundaryForward, shift: selectLineBoundaryForward },
    { key: 'ArrowUp', run: cursorLineUp, shift: selectLineUp, preventDefault: true },
    { mac: 'Cmd-ArrowUp', run: cursorDocStart, shift: selectDocStart },
    { mac: 'Ctrl-ArrowUp', run: cursorPageUp, shift: selectPageUp },
    { key: 'ArrowDown', run: cursorLineDown, shift: selectLineDown, preventDefault: true },
    { mac: 'Cmd-ArrowDown', run: cursorDocEnd, shift: selectDocEnd },
    { mac: 'Ctrl-ArrowDown', run: cursorPageDown, shift: selectPageDown },
    { key: 'PageUp', run: cursorPageUp, shift: selectPageUp },
    { key: 'PageDown', run: cursorPageDown, shift: selectPageDown },
    {
      key: 'Home',
      run: cursorLineBoundaryBackward,
      shift: selectLineBoundaryBackward,
      preventDefault: true,
    },
    { key: 'Mod-Home', run: cursorDocStart, shift: selectDocStart },
    {
      key: 'End',
      run: cursorLineBoundaryForward,
      shift: selectLineBoundaryForward,
      preventDefault: true,
    },
    { key: 'Mod-End', run: cursorDocEnd, shift: selectDocEnd },
    { key: 'Enter', run: insertNewlineAndIndent },
    { key: 'Mod-a', run: selectAll },
    { key: 'Backspace', run: deleteCharBackward, shift: deleteCharBackward },
    { key: 'Delete', run: deleteCharForward },
    { key: 'Mod-Backspace', mac: 'Alt-Backspace', run: deleteGroupBackward },
    { key: 'Mod-Delete', mac: 'Alt-Delete', run: deleteGroupForward },
    { mac: 'Mod-Backspace', run: deleteToLineStart },
    { mac: 'Mod-Delete', run: deleteToLineEnd },
  ].concat(emacsStyleKeymap.map(b => ({ mac: b.key, run: b.run, shift: b.shift })));
  const defaultKeymap =
    null &&
    [
      {
        key: 'Alt-ArrowLeft',
        mac: 'Ctrl-ArrowLeft',
        run: cursorSyntaxLeft,
        shift: selectSyntaxLeft,
      },
      {
        key: 'Alt-ArrowRight',
        mac: 'Ctrl-ArrowRight',
        run: cursorSyntaxRight,
        shift: selectSyntaxRight,
      },
      { key: 'Alt-ArrowUp', run: moveLineUp },
      { key: 'Shift-Alt-ArrowUp', run: copyLineUp },
      { key: 'Alt-ArrowDown', run: moveLineDown },
      { key: 'Shift-Alt-ArrowDown', run: copyLineDown },
      { key: 'Escape', run: simplifySelection },
      { key: 'Mod-Enter', run: insertBlankLine },
      { key: 'Alt-l', mac: 'Ctrl-l', run: selectLine },
      { key: 'Mod-i', run: selectParentSyntax, preventDefault: true },
      { key: 'Mod-[', run: indentLess },
      { key: 'Mod-]', run: indentMore },
      { key: 'Mod-Alt-\\', run: indentSelection },
      { key: 'Shift-Mod-k', run: deleteLine },
      { key: 'Shift-Mod-\\', run: cursorMatchingBracket },
      { key: 'Mod-/', run: toggleComment },
      { key: 'Alt-A', run: toggleBlockComment },
    ].concat(standardKeymap);
  const indentWithTab = { key: 'Tab', run: indentMore, shift: indentLess };

  const Editor = ({
    focusStart = false,
    focusEnd = false,
    height = '200px',
    language: lang,
    readOnly = false,
    resizable = false,
    value = '',
    onChange,
  }) => {
    const view = hooks_module_s(null);
    const resizeObserver = hooks_module_s(null);
    const highlightStyleCompartment = hooks_module_s(new Compartment());
    const languageCompartment = hooks_module_s(new Compartment());
    const readOnlyCompartment = hooks_module_s(new Compartment());
    const themeCompartment = hooks_module_s(new Compartment());
    const updateListenerCompartment = hooks_module_s(new Compartment());
    const parentCallback = hooks_module_T(parent => {
      var _a, _b;
      if (parent) {
        view.current = new EditorView({
          state: dist_EditorState.create({
            doc: value,
            extensions: [
              keymap.of([...standardKeymap, ...historyKeymap]),
              dist_history(),
              lineNumbers(),
              highlightActiveLineGutter(),
              highlightSpecialChars(),
              highlightStyleCompartment.current.of([]),
              languageCompartment.current.of([]),
              readOnlyCompartment.current.of([]),
              themeCompartment.current.of([]),
              updateListenerCompartment.current.of([]),
            ],
          }),
          parent,
        });
        resizeObserver.current = new ResizeObserver(() => {
          var _a2;
          (_a2 = view.current) == null ? void 0 : _a2.requestMeasure();
        });
        resizeObserver.current.observe(view.current.dom);
      } else {
        (_a = resizeObserver.current) == null ? void 0 : _a.disconnect();
        (_b = view.current) == null ? void 0 : _b.destroy();
      }
    }, []);
    hooks_module_h(() => {
      var _a;
      (_a = view.current) == null
        ? void 0
        : _a.contentDOM.classList.toggle(FOCUS_START_CLASS, focusStart);
    }, [focusStart]);
    hooks_module_h(() => {
      var _a;
      (_a = view.current) == null
        ? void 0
        : _a.contentDOM.classList.toggle(FOCUS_END_CLASS, focusEnd);
    }, [focusEnd]);
    const theme = useTheme();
    hooks_module_h(() => {
      var _a;
      (_a = view.current) == null
        ? void 0
        : _a.dispatch({
            effects: highlightStyleCompartment.current.reconfigure(
              syntaxHighlighting(
                HighlightStyle.define([
                  {
                    tag: tags.annotation,
                    color: theme.editor.annotation,
                  },
                  {
                    tag: tags.regexp,
                    color: theme.editor.regexp,
                  },
                  {
                    tag: tags.comment,
                    color: theme.editor.comment,
                  },
                  {
                    tag: tags.invalid,
                    color: theme.editor.comment,
                  },
                ]),
              ),
            ),
          });
    }, [theme]);
    hooks_module_h(() => {
      var _a;
      (_a = view.current) == null
        ? void 0
        : _a.dispatch({
            effects: languageCompartment.current.reconfigure(lang ? language.of(lang) : []),
          });
    }, [lang]);
    hooks_module_h(() => {
      var _a;
      (_a = view.current) == null
        ? void 0
        : _a.dispatch({
            effects: readOnlyCompartment.current.reconfigure(
              dist_EditorState.readOnly.of(readOnly),
            ),
          });
    }, [readOnly]);
    hooks_module_h(() => {
      var _a;
      (_a = view.current) == null
        ? void 0
        : _a.dispatch({
            effects: themeCompartment.current.reconfigure(
              EditorView.theme(
                {
                  '&': {
                    backgroundColor: theme.editor.background,
                    border: `1px solid ${theme.editor.border}`,
                    color: theme.editor.text,
                    height,
                    overflow: 'hidden',
                    resize: resizable ? 'vertical' : 'none',
                  },
                  '&.cm-editor.cm-focused': {
                    boxShadow: `0 0 0 2px ${theme.focus.shadow}`,
                    outline: 'none',
                  },
                  '.cm-scroller': {
                    fontFamily:
                      'ui-monospace,SFMono-Regular,"SF Mono",Menlo,Consolas,"Liberation Mono",monospace',
                    overflow: 'auto',
                  },
                  '.cm-gutters': {
                    backgroundColor: theme.editor.background,
                    border: 'none',
                    color: theme.editor.lineNumber,
                  },
                  '.cm-activeLineGutter': {
                    backgroundColor: 'transparent',
                  },
                  '&.cm-focused .cm-activeLineGutter': {
                    color: theme.editor.activeLineNumber,
                  },
                  '.cm-lineNumbers .cm-gutterElement': {
                    padding: '0 8px',
                  },
                  '.cm-content ::selection': {
                    backgroundColor: theme.editor.selectionBackground,
                  },
                },
                { dark: theme.name === 'dark' },
              ),
            ),
          });
    }, [height, resizable, theme]);
    hooks_module_h(() => {
      var _a;
      (_a = view.current) == null
        ? void 0
        : _a.dispatch({
            effects: updateListenerCompartment.current.reconfigure(
              onChange
                ? EditorView.updateListener.of(viewUpdate => {
                    if (
                      viewUpdate.docChanged &&
                      viewUpdate.transactions.some(
                        transaction => transaction.annotation(Transaction.userEvent) != null,
                      )
                    ) {
                      onChange(viewUpdate.state.doc.toString());
                    }
                  })
                : [],
            ),
          });
    }, [onChange]);
    hooks_module_(() => {
      if (view.current) {
        const currentValue = view.current.state.doc.toString();
        if (value !== currentValue) {
          view.current.dispatch(
            view.current.state.update({
              changes: {
                from: 0,
                to: currentValue.length,
                insert: value,
              },
            }),
          );
        }
      }
    }, [value]);
    return compat_module.createElement('div', {
      ref: parentCallback,
    });
  };

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

  const rulesetLanguage = StreamLanguage.define({
    token(stream, state) {
      var _a;
      if (stream.sol()) {
        const groups = (_a = RE_LINE.exec(stream.string)) == null ? void 0 : _a.groups;
        if (!groups) {
          stream.skipToEnd();
          return 'invalid';
        }
        state.tokens = [];
        if (groups.spaceBeforeRuleOrComment) {
          state.tokens.push([groups.spaceBeforeRuleOrComment.length, null]);
        }
        if (groups.highlight) {
          state.tokens.push([groups.highlight.length, 'annotation']);
        }
        if (groups.spaceAfterHighlight) {
          state.tokens.push([groups.spaceAfterHighlight.length, null]);
        }
        if (groups.matchPattern) {
          state.tokens.push([groups.matchPattern.length, null]);
        }
        if (groups.regularExpression) {
          state.tokens.push([groups.regularExpression.length, 'regexp']);
        }
        if (groups.spaceAfterRule) {
          state.tokens.push([groups.spaceAfterRule.length, null]);
        }
        if (groups.comment) {
          state.tokens.push([groups.comment.length, 'lineComment']);
        }
      }
      const token = state.tokens.shift();
      if (!token) {
        stream.skipToEnd();
        return 'invalid';
      }
      stream.pos += token[0];
      return token[1];
    },
    startState() {
      return { tokens: [] };
    },
    copyState(state) {
      return { tokens: [...state.tokens] };
    },
  });
  const RulesetEditor = props =>
    compat_module.createElement(Editor, {
      language: rulesetLanguage,
      ...props,
    });

  const menu_down_namespaceObject =
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJtZGktbWVudS1kb3duIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGQ9Ik03LDEwTDEyLDE1TDE3LDEwSDdaIiAvPjwvc3ZnPg==';
  const SelectContext = compat_module.createContext(null);
  function useSelectContext() {
    const value = hooks_module_q(SelectContext);
    if (!value) {
      throw new Error('useSelectContext: no matching provider');
    }
    return value;
  }
  const Select = compat_module.forwardRef(function Select2({ native = false, ...props }, ref) {
    const theme = useTheme();
    const wrapperClassName = utilities_useClassName(
      () => ({
        position: 'relative',
      }),
      [],
    );
    const selectClassName = utilities_useClassName(
      theme2 => ({
        appearance: 'none',
        WebkitAppearance: 'none',
        background: 'transparent',
        border: `solid 1px ${theme2.select.border}`,
        borderRadius: '4px',
        color: theme2.text.primary,
        cursor: 'pointer',
        display: 'block',
        font: 'inherit',
        lineHeight: '1.5',
        padding: `0.5em calc(0.625em + 24px) 0.5em 0.625em`,
        width: '15em',
        '&:disabled': {
          cursor: 'default',
          opacity: DISABLED_OPACITY,
        },
        '&:focus': {
          boxShadow: `0 0 0 2px ${theme2.focus.shadow}`,
          outline: 'none',
        },
      }),
      [],
    );
    const arrowClassName = utilities_useClassName(
      () => ({
        pointerEvents: 'none',
        position: 'absolute',
        right: '1px',
        top: 'calc((100% - 24px) / 2)',
      }),
      [],
    );
    return compat_module.createElement(
      SelectContext.Provider,
      {
        value: { native },
      },
      compat_module.createElement(
        'div',
        {
          className: wrapperClassName,
        },
        compat_module.createElement('select', {
          ...applyClassName(props, selectClassName),
          ref,
        }),
        compat_module.createElement(
          'div',
          {
            className: arrowClassName,
          },
          compat_module.createElement(TemplateIcon, {
            color: theme.select.arrow,
            iconSize: '24px',
            url: menu_down_namespaceObject,
          }),
        ),
      ),
    );
  });
  const SelectOption = compat_module.forwardRef(function SelectOption2(props, ref) {
    const { native } = useSelectContext();
    const className = utilities_useClassName(
      theme => ({
        background: native ? 'transparent' : theme.select.optionBackground,
        color: native ? 'initial' : 'inherit',
      }),
      [native],
    );
    return compat_module.createElement('option', {
      ...applyClassName(props, className),
      ref,
    });
  });

  const select_Select = props => {
    const {
      platformInfo: { os },
    } = useOptionsContext();
    return compat_module.createElement(Select, {
      ...props,
      native: os !== 'win',
    });
  };

  const Switch = compat_module.forwardRef(function Switch2(props, ref) {
    const wrapperClassName = utilities_useClassName(
      () => ({
        height: '16px',
        position: 'relative',
        width: '34px',
      }),
      [],
    );
    const inputClassName = utilities_useClassName(
      () => ({
        cursor: 'pointer',
        height: '100%',
        margin: 0,
        opacity: 0,
        position: 'absolute',
        width: '100%',
        zIndex: INPUT_Z_INDEX,
        '&:disabled': {
          cursor: 'default',
        },
      }),
      [],
    );
    const backgroundClassName = utilities_useClassName(
      () => ({
        ':disabled + &': {
          opacity: DISABLED_OPACITY,
        },
      }),
      [],
    );
    const barClassName = utilities_useClassName(
      theme => ({
        background: theme.switch.bar,
        borderRadius: '8px',
        height: '12px',
        left: '3px',
        position: 'absolute',
        top: '2px',
        transition: 'background-color linear 80ms',
        width: '28px',
        ':checked + * > &': {
          background: theme.switch.barChecked,
        },
      }),
      [],
    );
    const knobMoverClassName = utilities_useClassName(
      () => ({
        left: 0,
        position: 'absolute',
        top: 0,
        transition: 'left linear 80ms',
        ':checked + * > &': {
          left: '18px',
        },
      }),
      [],
    );
    const knobClassName = utilities_useClassName(
      theme => ({
        background: theme.switch.knob,
        border: theme.switch.knobBorder != null ? `solid 1px ${theme.switch.knobBorder}` : 'none',
        borderRadius: '50%',
        height: '16px',
        transition: 'background linear 80ms, border linear 80ms',
        width: '16px',
        ':checked + * > * > &': {
          background: theme.switch.knobChecked,
          border: 'none',
        },
      }),
      [],
    );
    return compat_module.createElement(
      'div',
      {
        className: wrapperClassName,
      },
      compat_module.createElement('input', {
        ...applyClassName(props, inputClassName),
        ref,
        type: 'checkbox',
      }),
      compat_module.createElement(
        'div',
        {
          className: backgroundClassName,
        },
        compat_module.createElement('div', {
          className: barClassName,
        }),
        compat_module.createElement(
          'div',
          {
            className: knobMoverClassName,
          },
          compat_module.createElement('div', {
            className: knobClassName,
          }),
          compat_module.createElement(FocusCircle, {
            depth: 2,
          }),
        ),
      ),
    );
  });

  const SetBooleanItem = ({ disabled = false, itemKey, label, subLabels = [] }) => {
    const {
      initialItems: { [itemKey]: initialItem },
    } = useOptionsContext();
    const [item, setItem] = hooks_module_p(initialItem);
    const css = useCSS();
    const rowClass = F(
      () =>
        css({
          '&&': {
            minHeight: '2.5em',
          },
        }),
      [css],
    );
    return compat_module.createElement(
      Row,
      {
        className: rowClass,
      },
      compat_module.createElement(
        RowItem,
        {
          expanded: true,
        },
        compat_module.createElement(
          LabelWrapper,
          null,
          compat_module.createElement(
            ControlLabel,
            {
              for: itemKey,
            },
            label,
          ),
          subLabels.map(subLabel =>
            compat_module.createElement(
              SubLabel,
              {
                key: subLabel,
              },
              subLabel,
            ),
          ),
        ),
      ),
      compat_module.createElement(
        RowItem,
        null,
        compat_module.createElement(Switch, {
          checked: item,
          disabled,
          id: itemKey,
          onChange: e => {
            const value = e.currentTarget.checked;
            void saveToLocalStorage({ [itemKey]: value }, 'options');
            setItem(value);
          },
        }),
      ),
    );
  };

  const ImportBlacklistDialog = ({ close, open, setBlacklist, setBlacklistDirty }) => {
    const [state, setState] = hooks_module_p({
      source: 'file',
      pb: '',
      append: false,
    });
    const prevOpen = usePrevious(open);
    if (open && !prevOpen) {
      state.source = 'file';
      state.pb = '';
      state.append = false;
    }
    const replaceOrAppend = newBlacklist => {
      if (state.append) {
        setBlacklist(
          oldBlacklist =>
            `${oldBlacklist}${oldBlacklist && newBlacklist ? '\n' : ''}${newBlacklist}`,
        );
      } else {
        setBlacklist(() => newBlacklist);
      }
      setBlacklistDirty(true);
    };
    return compat_module.createElement(
      Dialog,
      {
        'aria-labelledby': 'importBlacklistDialogTitle',
        close,
        open,
      },
      compat_module.createElement(
        DialogHeader,
        null,
        compat_module.createElement(
          DialogTitle,
          {
            id: 'importBlacklistDialogTitle',
          },
          translate('options_importBlacklistDialog_title'),
        ),
      ),
      compat_module.createElement(
        DialogBody,
        null,
        compat_module.createElement(
          Row,
          null,
          compat_module.createElement(
            RowItem,
            null,
            compat_module.createElement(
              select_Select,
              {
                className: FOCUS_START_CLASS,
                value: state.source,
                onChange: e => setState(s => ({ ...s, source: e.currentTarget.value })),
              },
              compat_module.createElement(
                SelectOption,
                {
                  value: 'file',
                },
                translate('options_importBlacklistDialog_fromFile'),
              ),
              compat_module.createElement(
                SelectOption,
                {
                  value: 'pb',
                },
                translate('options_importBlacklistDialog_fromPB'),
              ),
            ),
          ),
        ),
        state.source === 'pb' &&
          compat_module.createElement(
            Row,
            null,
            compat_module.createElement(
              RowItem,
              {
                expanded: true,
              },
              compat_module.createElement(
                LabelWrapper,
                {
                  fullWidth: true,
                },
                compat_module.createElement(
                  SubLabel,
                  null,
                  translate('options_importBlacklistDialog_helper'),
                ),
                compat_module.createElement(
                  SubLabel,
                  null,
                  translate('options_blacklistExample', 'example.com'),
                ),
              ),
              compat_module.createElement(TextArea, {
                'aria-label': translate('options_importBlacklistDialog_pbLabel'),
                rows: 5,
                spellCheck: 'false',
                value: state.pb,
                wrap: 'off',
                onChange: e => setState(s => ({ ...s, pb: e.currentTarget.value })),
              }),
            ),
          ),
        compat_module.createElement(
          Row,
          null,
          compat_module.createElement(
            RowItem,
            null,
            compat_module.createElement(
              Indent,
              null,
              compat_module.createElement(CheckBox, {
                checked: state.append,
                id: 'append',
                onChange: e => setState(s => ({ ...s, append: e.currentTarget.checked })),
              }),
            ),
          ),
          compat_module.createElement(
            RowItem,
            {
              expanded: true,
            },
            compat_module.createElement(
              LabelWrapper,
              null,
              compat_module.createElement(
                ControlLabel,
                {
                  for: 'append',
                },
                translate('options_importBlacklistDialog_append'),
              ),
            ),
          ),
        ),
      ),
      compat_module.createElement(
        DialogFooter,
        null,
        compat_module.createElement(
          Row,
          {
            right: true,
          },
          compat_module.createElement(
            RowItem,
            null,
            compat_module.createElement(
              Button,
              {
                className: state.source === 'pb' && !state.pb ? FOCUS_END_CLASS : '',
                onClick: close,
              },
              translate('cancelButton'),
            ),
          ),
          compat_module.createElement(
            RowItem,
            null,
            state.source === 'file'
              ? compat_module.createElement(
                  Button,
                  {
                    className: FOCUS_END_CLASS,
                    primary: true,
                    onClick: () => {
                      const fileInput = document.createElement('input');
                      fileInput.accept = 'text/plain';
                      fileInput.type = 'file';
                      fileInput.addEventListener('input', () => {
                        var _a;
                        const file = (_a = fileInput.files) == null ? void 0 : _a[0];
                        if (!file) {
                          return;
                        }
                        const fileReader = new FileReader();
                        fileReader.addEventListener('load', () => {
                          replaceOrAppend(fileReader.result);
                        });
                        fileReader.readAsText(file);
                        close();
                      });
                      fileInput.click();
                    },
                  },
                  translate('options_importBlacklistDialog_selectFile'),
                )
              : compat_module.createElement(
                  Button,
                  {
                    className: state.pb ? FOCUS_END_CLASS : '',
                    disabled: !state.pb,
                    primary: true,
                    onClick: () => {
                      let newBlacklist = '';
                      for (const domain of utilities_lines(state.pb)) {
                        if (/^([A-Za-z0-9-]+\.)*[A-Za-z0-9-]+$/.test(domain)) {
                          newBlacklist = `${newBlacklist}${
                            newBlacklist ? '\n' : ''
                          }*://*.${domain}/*`;
                        }
                      }
                      replaceOrAppend(newBlacklist);
                      close();
                    },
                  },
                  translate('options_importBlacklistDialog_importButton'),
                ),
          ),
        ),
      ),
    );
  };
  const RegisterSearchEnginesDialog = ({ close, open }) => {
    const ids = F(() => stringKeys(SEARCH_ENGINES).filter(id => id !== 'google'), []);
    const matches = F(
      () =>
        Object.fromEntries(
          ids.map(id => [
            id,
            SEARCH_ENGINES[id].contentScripts.flatMap(contentScript => contentScript.matches),
          ]),
        ),
      [ids],
    );
    const defaultStates = F(() => Object.fromEntries(ids.map(id => [id, 'none'])), [ids]);
    const [states, setStates] = hooks_module_p(defaultStates);
    const prevOpen = usePrevious(open);
    hooks_module_(() => {
      if (open && !prevOpen) {
        void (async () => {
          const regitrationEntries = await Promise.all(
            ids.map(async id => {
              const permissions = await Promise.all(
                matches[id].map(match =>
                  browser_browser.permissions.contains({ origins: [match] }),
                ),
              );
              const [allowed, denied] = permissions.reduce(
                ([a, d], p) => [a || p, d || !p],
                [false, false],
              );
              return [id, allowed ? (!denied ? 'full' : 'partial') : 'none'];
            }),
          );
          setStates(Object.fromEntries(regitrationEntries));
        })();
      }
    }, [open, prevOpen, ids, matches]);
    return compat_module.createElement(
      Dialog,
      {
        'aria-labelledby': 'registerSearchEnginesDialogTitle',
        close,
        open,
      },
      compat_module.createElement(
        DialogHeader,
        null,
        compat_module.createElement(
          DialogTitle,
          {
            id: 'registerSearchEnginesDialogTitle',
          },
          translate('options_otherSearchEngines'),
        ),
      ),
      compat_module.createElement(
        DialogBody,
        null,
        ids.map((id, index) =>
          compat_module.createElement(
            Row,
            {
              key: id,
            },
            compat_module.createElement(
              RowItem,
              null,
              compat_module.createElement(
                Indent,
                null,
                compat_module.createElement(CheckBox, {
                  checked: states[id] === 'full',
                  className: index === 0 ? FOCUS_START_CLASS : '',
                  id,
                  indeterminate: states[id] === 'partial',
                  onChange: e => {
                    setStates(states2 => ({
                      ...states2,
                      [id]: e.currentTarget.checked ? 'full' : 'none',
                    }));
                  },
                }),
              ),
            ),
            compat_module.createElement(
              RowItem,
              {
                expanded: true,
              },
              compat_module.createElement(
                LabelWrapper,
                null,
                compat_module.createElement(
                  ControlLabel,
                  {
                    for: id,
                  },
                  translate(SEARCH_ENGINES[id].messageNames.name),
                ),
                SEARCH_ENGINES[id].messageNames.description &&
                  compat_module.createElement(
                    SubLabel,
                    null,
                    translate(SEARCH_ENGINES[id].messageNames.description),
                  ),
              ),
            ),
          ),
        ),
      ),
      compat_module.createElement(
        DialogFooter,
        null,
        compat_module.createElement(
          Row,
          {
            right: true,
          },
          compat_module.createElement(
            RowItem,
            null,
            compat_module.createElement(
              Button,
              {
                onClick: close,
              },
              translate('cancelButton'),
            ),
          ),
          compat_module.createElement(
            RowItem,
            null,
            compat_module.createElement(
              Button,
              {
                className: FOCUS_END_CLASS,
                primary: true,
                onClick: async () => {
                  const originsToRequest = ids.flatMap(id =>
                    states[id] === 'full' ? matches[id] : [],
                  );
                  if (originsToRequest.length) {
                    const granted = await browser_browser.permissions.request({
                      origins: originsToRequest,
                    });
                    if (!granted) {
                      return;
                    }
                  }
                  const originsToRemove = ids.flatMap(id =>
                    states[id] === 'none' ? matches[id] : [],
                  );
                  if (originsToRemove.length) {
                    await browser_browser.permissions.remove({ origins: originsToRemove });
                  }
                  await sendMessage('register-content-scripts');
                  close();
                },
              },
              translate('options_registerSearchEngine'),
            ),
          ),
        ),
      ),
    );
  };
  const SetBlacklist = () => {
    const {
      initialItems: { blacklist: initialBlacklist },
    } = useOptionsContext();
    const [blacklist, setBlacklist] = hooks_module_p(initialBlacklist);
    const [blacklistDirty, setBlacklistDirty] = hooks_module_p(false);
    const [latestBlacklist, setLatestBlacklist] = hooks_module_p(null);
    const [importBlacklistDialogOpen, setImportBlacklistDialogOpen] = hooks_module_p(false);
    hooks_module_(
      () =>
        addMessageListeners({
          'blocklist-saved': (latestBlacklist2, source) => {
            if (source !== 'options') {
              setLatestBlacklist(latestBlacklist2);
            }
          },
        }),
      [],
    );
    return compat_module.createElement(
      SectionItem,
      null,
      compat_module.createElement(
        Row,
        null,
        compat_module.createElement(
          RowItem,
          {
            expanded: true,
          },
          compat_module.createElement(
            LabelWrapper,
            {
              fullWidth: true,
            },
            compat_module.createElement(Label, null, translate('options_blacklistLabel')),
            compat_module.createElement(
              SubLabel,
              null,
              expandLinks(translate('options_blacklistHelper')),
            ),
            compat_module.createElement(SubLabel, null, translate('options_blockByTitle')),
            compat_module.createElement(
              SubLabel,
              null,
              translate('options_blacklistExample', '*://*.example.com/*'),
            ),
            compat_module.createElement(
              SubLabel,
              null,
              translate('options_blacklistExample', '/example\\.(net|org)/'),
            ),
            compat_module.createElement(
              SubLabel,
              null,
              translate('options_blacklistExample', 'title/Example Domain/'),
            ),
          ),
          compat_module.createElement(RulesetEditor, {
            height: '300px',
            resizable: true,
            value: blacklist,
            onChange: value => {
              setBlacklist(value);
              setBlacklistDirty(true);
            },
          }),
        ),
      ),
      compat_module.createElement(
        Row,
        {
          multiline: true,
          right: true,
        },
        latestBlacklist != null &&
          compat_module.createElement(
            RowItem,
            {
              expanded: true,
            },
            compat_module.createElement(
              Text,
              null,
              translate('options_blacklistUpdated'),
              ' ',
              compat_module.createElement(
                LinkButton,
                {
                  onClick: () => {
                    setBlacklist(latestBlacklist);
                    setBlacklistDirty(false);
                    setLatestBlacklist(null);
                  },
                },
                translate('options_reloadBlacklistButton'),
              ),
            ),
          ),
        compat_module.createElement(
          RowItem,
          null,
          compat_module.createElement(
            Row,
            null,
            compat_module.createElement(
              RowItem,
              null,
              compat_module.createElement(
                Button,
                {
                  onClick: () => {
                    setImportBlacklistDialogOpen(true);
                  },
                },
                translate('options_importBlacklistButton'),
              ),
            ),
            compat_module.createElement(
              RowItem,
              null,
              compat_module.createElement(
                Button,
                {
                  onClick: () => {
                    const a = document.createElement('a');
                    a.href = `data:text/plain;charset=UTF-8,${encodeURIComponent(blacklist)}`;
                    a.download = 'uBlacklist.txt';
                    a.click();
                  },
                },
                translate('options_exportBlacklistButton'),
              ),
            ),
            compat_module.createElement(
              RowItem,
              null,
              compat_module.createElement(
                Button,
                {
                  disabled: !blacklistDirty,
                  primary: true,
                  onClick: () => {
                    void saveToLocalStorage({ blacklist }, 'options');
                    setBlacklistDirty(false);
                    setLatestBlacklist(null);
                  },
                },
                translate('options_saveBlacklistButton'),
              ),
            ),
          ),
        ),
      ),
      compat_module.createElement(
        Portal,
        {
          id: 'importBlacklistDialogPortal',
        },
        compat_module.createElement(ImportBlacklistDialog, {
          close: () => setImportBlacklistDialogOpen(false),
          open: importBlacklistDialogOpen,
          setBlacklist,
          setBlacklistDirty,
        }),
      ),
    );
  };
  const RegisterSearchEngines = () => {
    const [dialogOpen, setDialogOpen] = hooks_module_p(false);
    return compat_module.createElement(
      SectionItem,
      null,
      compat_module.createElement(
        Row,
        null,
        compat_module.createElement(
          RowItem,
          {
            expanded: true,
          },
          compat_module.createElement(
            LabelWrapper,
            null,
            compat_module.createElement(Label, null, translate('options_otherSearchEngines')),
            compat_module.createElement(
              SubLabel,
              null,
              translate('options_otherSearchEnginesDescription'),
            ),
          ),
        ),
        compat_module.createElement(
          RowItem,
          null,
          compat_module.createElement(
            Button,
            {
              onClick: () => setDialogOpen(true),
            },
            translate('options_registerSearchEngine'),
          ),
        ),
      ),
      compat_module.createElement(
        Portal,
        {
          id: 'registerSearchEnginesDialogPortal',
        },
        compat_module.createElement(RegisterSearchEnginesDialog, {
          close: () => setDialogOpen(false),
          open: dialogOpen,
        }),
      ),
    );
  };
  const GeneralSection = () =>
    compat_module.createElement(
      Section,
      {
        'aria-labelledby': 'generalSectionTitle',
        id: 'general',
      },
      compat_module.createElement(
        SectionHeader,
        null,
        compat_module.createElement(
          SectionTitle,
          {
            id: 'generalSectionTitle',
          },
          translate('options_generalTitle'),
        ),
      ),
      compat_module.createElement(
        SectionBody,
        null,
        compat_module.createElement(SetBlacklist, null),
        compat_module.createElement(RegisterSearchEngines, null),
        compat_module.createElement(
          SectionItem,
          null,
          compat_module.createElement(SetBooleanItem, {
            itemKey: 'blockWholeSite',
            label: translate('options_blockWholeSiteLabel'),
            subLabels: [translate('options_blockWholeSiteDescription')],
          }),
        ),
        compat_module.createElement(
          SectionItem,
          null,
          compat_module.createElement(SetBooleanItem, {
            itemKey: 'skipBlockDialog',
            label: translate('options_skipBlockDialogLabel'),
          }),
        ),
        compat_module.createElement(
          SectionItem,
          null,
          compat_module.createElement(SetBooleanItem, {
            itemKey: 'hideBlockLinks',
            label: translate('options_hideBlockLinksLabel'),
          }),
        ),
        compat_module.createElement(
          SectionItem,
          null,
          compat_module.createElement(SetBooleanItem, {
            itemKey: 'hideControl',
            label: translate('options_hideControlLabel'),
          }),
        ),
      ),
    );

  const Input = compat_module.forwardRef(function Input2(props, ref) {
    const className = utilities_useClassName(
      theme => ({
        background: 'transparent',
        border: `solid 1px ${theme.input.border}`,
        borderRadius: '4px',
        color: theme.text.primary,
        display: 'block',
        font: 'inherit',
        lineHeight: '1.5',
        padding: '0.5em 0.625em',
        width: '100%',
        '&:disabled': {
          opacity: DISABLED_OPACITY,
        },
        '&:focus': {
          boxShadow: `0 0 0 2px ${theme.focus.shadow}`,
          outline: 'none',
        },
      }),
      [],
    );
    return compat_module.createElement('input', {
      ...applyClassName(props, className),
      ref,
    });
  });

  const dots_vertical_namespaceObject =
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJtZGktZG90cy12ZXJ0aWNhbCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIsMTZBMiwyIDAgMCwxIDE0LDE4QTIsMiAwIDAsMSAxMiwyMEEyLDIgMCAwLDEgMTAsMThBMiwyIDAgMCwxIDEyLDE2TTEyLDEwQTIsMiAwIDAsMSAxNCwxMkEyLDIgMCAwLDEgMTIsMTRBMiwyIDAgMCwxIDEwLDEyQTIsMiAwIDAsMSAxMiwxME0xMiw0QTIsMiAwIDAsMSAxNCw2QTIsMiAwIDAsMSAxMiw4QTIsMiAwIDAsMSAxMCw2QTIsMiAwIDAsMSAxMiw0WiIgLz48L3N2Zz4=';
  function moveFocus(body, key) {
    const items = [...body.querySelectorAll(`.${MENU_ITEM_CLASS}:not(:disabled)`)];
    if (!items.length) {
      return;
    }
    const currentIndex = items.indexOf(document.activeElement);
    let nextIndex;
    if (key === 'ArrowUp') {
      nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
    } else if (key === 'ArrowDown') {
      nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
    } else if (key === 'Home') {
      nextIndex = 0;
    } else {
      nextIndex = items.length - 1;
    }
    const nextItem = items[nextIndex];
    nextItem.focus();
  }
  const Menu = compat_module.forwardRef(function Menu2(
    { children, disabled = false, ...props },
    ref,
  ) {
    const [open, setOpen] = hooks_module_p(false);
    const buttonRef = useInnerRef(ref);
    const bodyRef = hooks_module_s(null);
    hooks_module_h(() => {
      var _a;
      if (open) {
        (_a = bodyRef.current) == null ? void 0 : _a.focus();
      }
    }, [open]);
    const menuClassName = utilities_useClassName(
      () => ({
        outline: 'none',
        position: 'relative',
      }),
      [],
    );
    const bodyClassName = utilities_useClassName(
      theme => ({
        background: theme.menu.itemListBackground,
        boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 2px 0px, rgba(0, 0, 0, 0.15) 0px 3px 6px 2px',
        display: open ? 'block' : 'none',
        minWidth: '10em',
        outline: 'none',
        padding: '0.75em 0',
        position: 'absolute',
        top: '100%',
        right: 0,
        zIndex: MENU_Z_INDEX,
      }),
      [open],
    );
    return compat_module.createElement(
      'div',
      {
        className: menuClassName,
        tabIndex: -1,
        onBlurCapture: e => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setOpen(false);
          }
        },
      },
      compat_module.createElement(IconButton, {
        ...props,
        'aria-expanded': open,
        'aria-haspopup': 'menu',
        disabled,
        iconURL: dots_vertical_namespaceObject,
        ref: buttonRef,
        onClick: () => setOpen(!open),
      }),
      compat_module.createElement(
        'div',
        {
          className: bodyClassName,
          ref: bodyRef,
          role: 'menu',
          tabIndex: -1,
          onClick: e => {
            var _a;
            if (e.target instanceof HTMLElement && e.target.matches(`.${MENU_ITEM_CLASS}`)) {
              setOpen(false);
              (_a = buttonRef.current) == null ? void 0 : _a.focus();
            }
          },
          onKeyDown: e => {
            var _a;
            if (e.key === 'Escape') {
              e.preventDefault();
              setOpen(false);
              (_a = buttonRef.current) == null ? void 0 : _a.focus();
            } else if (
              e.key === 'ArrowUp' ||
              e.key === 'ArrowDown' ||
              e.key === 'Home' ||
              e.key === 'End'
            ) {
              e.preventDefault();
              moveFocus(e.currentTarget, e.key);
            }
          },
        },
        children,
      ),
    );
  });
  const MenuItem = compat_module.forwardRef(function MenuItem2(props, ref) {
    const className = utilities_useClassName(
      theme => ({
        background: 'transparent',
        border: 'none',
        color: theme.text.primary,
        cursor: 'pointer',
        display: 'block',
        font: 'inherit',
        height: '2.5em',
        padding: '0 2em',
        textAlign: 'start',
        width: '100%',
        '&:disabled': {
          cursor: 'default',
          opacity: 0.65,
        },
        '&:focus': {
          background: theme.menu.itemBackgroundFocused,
          outline: 'none',
        },
        '&:hover:not(:disabled):not(:focus)': {
          background: theme.menu.itemBackgroundHovered,
        },
      }),
      [],
    );
    return compat_module.createElement('button', {
      ...applyClassName(props, `${MENU_ITEM_CLASS} ${className}`),
      ref,
      role: 'menuitem',
    });
  });

  const Table = compat_module.forwardRef(function Table2(props, ref) {
    const className = utilities_useClassName(
      () => ({
        borderSpacing: 0,
        tableLayout: 'fixed',
        width: '100%',
      }),
      [],
    );
    return compat_module.createElement('table', {
      ...applyClassName(props, className),
      ref,
    });
  });
  const TableHeader = compat_module.forwardRef(function TableHeader2(props, ref) {
    return compat_module.createElement('thead', {
      ...props,
      ref,
    });
  });
  const TableHeaderRow = compat_module.forwardRef(function TableHeaderRow2(props, ref) {
    return compat_module.createElement('tr', {
      ...props,
      ref,
    });
  });
  const TableHeaderCell = compat_module.forwardRef(function TableHeaderCell2(
    { breakAll, width = 'auto', ...props },
    ref,
  ) {
    const className = utilities_useClassName(
      theme => ({
        color: theme.text.secondary,
        fontWeight: 'normal',
        padding: '0.75em 0',
        textAlign: 'start',
        verticalAlign: 'middle',
        width,
        wordBreak: breakAll ? 'break-all' : 'normal',
        '&:not(:first-child)': {
          paddingLeft: '0.75em',
        },
      }),
      [breakAll, width],
    );
    return compat_module.createElement('th', {
      ...applyClassName(props, className),
      ref,
    });
  });
  const TableBody = compat_module.forwardRef(function TableBody2(props, ref) {
    return compat_module.createElement('tbody', {
      ...props,
      ref,
    });
  });
  const TableRow = compat_module.forwardRef(function TableRow2(props, ref) {
    return compat_module.createElement('tr', {
      ...props,
      ref,
    });
  });
  const TableCell = compat_module.forwardRef(function TableCell2({ breakAll, ...props }, ref) {
    const className = utilities_useClassName(
      theme => ({
        borderTop: `solid 1px ${theme.separator}`,
        padding: '0.75em 0',
        verticalAlign: 'middle',
        wordBreak: breakAll ? 'break-all' : 'normal',
        '&:not(:first-child)': {
          paddingLeft: '0.75em',
        },
      }),
      [breakAll],
    );
    return compat_module.createElement('td', {
      ...applyClassName(props, className),
      ref,
    });
  });

  const relativeTime = function (o, c, d) {
    o = o || {};
    var proto = c.prototype;
    var relObj = {
      future: 'in %s',
      past: '%s ago',
      s: 'a few seconds',
      m: 'a minute',
      mm: '%d minutes',
      h: 'an hour',
      hh: '%d hours',
      d: 'a day',
      dd: '%d days',
      M: 'a month',
      MM: '%d months',
      y: 'a year',
      yy: '%d years',
    };
    d.en.relativeTime = relObj;

    proto.fromToBase = function (input, withoutSuffix, instance, isFrom, postFormat) {
      var loc = instance.$locale().relativeTime || relObj;
      var T = o.thresholds || [
        {
          l: 's',
          r: 44,
          d: constant_S,
        },
        {
          l: 'm',
          r: 89,
        },
        {
          l: 'mm',
          r: 44,
          d: MIN,
        },
        {
          l: 'h',
          r: 89,
        },
        {
          l: 'hh',
          r: 21,
          d: constant_H,
        },
        {
          l: 'd',
          r: 35,
        },
        {
          l: 'dd',
          r: 25,
          d: constant_D,
        },
        {
          l: 'M',
          r: 45,
        },
        {
          l: 'MM',
          r: 10,
          d: constant_M,
        },
        {
          l: 'y',
          r: 17,
        },
        {
          l: 'yy',
          d: constant_Y,
        },
      ];
      var Tl = T.length;
      var result;
      var out;
      var isFuture;

      for (var i = 0; i < Tl; i += 1) {
        var t = T[i];

        if (t.d) {
          result = isFrom ? d(input).diff(instance, t.d, true) : instance.diff(input, t.d, true);
        }

        var abs = (o.rounding || Math.round)(Math.abs(result));
        isFuture = result > 0;

        if (abs <= t.r || !t.r) {
          if (abs <= 1 && i > 0) t = T[i - 1];

          var format = loc[t.l];

          if (postFormat) {
            abs = postFormat('' + abs);
          }

          if (typeof format === 'string') {
            out = format.replace('%d', abs);
          } else {
            out = format(abs, withoutSuffix, t.l, isFuture);
          }

          break;
        }
      }

      if (withoutSuffix) return out;
      var pastOrFuture = isFuture ? loc.future : loc.past;

      if (typeof pastOrFuture === 'function') {
        return pastOrFuture(out);
      }

      return pastOrFuture.replace('%s', out);
    };

    function fromTo(input, withoutSuffix, instance, isFrom) {
      return proto.fromToBase(input, withoutSuffix, instance, isFrom);
    }

    proto.to = function (input, withoutSuffix) {
      return fromTo(input, withoutSuffix, this, true);
    };

    proto.from = function (input, withoutSuffix) {
      return fromTo(input, withoutSuffix, this);
    };

    var makeNow = function makeNow(thisDay) {
      return thisDay.$u ? d.utc() : d();
    };

    proto.toNow = function (withoutSuffix) {
      return this.to(makeNow(this), withoutSuffix);
    };

    proto.fromNow = function (withoutSuffix) {
      return this.from(makeNow(this), withoutSuffix);
    };
  };
  var texts = {
    s: 'ein paar Sekunden',
    m: ['eine Minute', 'einer Minute'],
    mm: '%d Minuten',
    h: ['eine Stunde', 'einer Stunde'],
    hh: '%d Stunden',
    d: ['ein Tag', 'einem Tag'],
    dd: ['%d Tage', '%d Tagen'],
    M: ['ein Monat', 'einem Monat'],
    MM: ['%d Monate', '%d Monaten'],
    y: ['ein Jahr', 'einem Jahr'],
    yy: ['%d Jahre', '%d Jahren'],
  };

  function relativeTimeFormatter(number, withoutSuffix, key) {
    var l = texts[key];

    if (Array.isArray(l)) {
      l = l[withoutSuffix ? 0 : 1];
    }

    return l.replace('%d', number);
  }

  var locale = {
    name: 'de',
    weekdays: 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
    weekdaysShort: 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
    weekdaysMin: 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
    months:
      'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split(
        '_',
      ),
    monthsShort: 'Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sept._Okt._Nov._Dez.'.split('_'),
    ordinal: function ordinal(n) {
      return n + '.';
    },
    weekStart: 1,
    yearStart: 4,
    formats: {
      LTS: 'HH:mm:ss',
      LT: 'HH:mm',
      L: 'DD.MM.YYYY',
      LL: 'D. MMMM YYYY',
      LLL: 'D. MMMM YYYY HH:mm',
      LLLL: 'dddd, D. MMMM YYYY HH:mm',
    },
    relativeTime: {
      future: 'in %s',
      past: 'vor %s',
      s: relativeTimeFormatter,
      m: relativeTimeFormatter,
      mm: relativeTimeFormatter,
      h: relativeTimeFormatter,
      hh: relativeTimeFormatter,
      d: relativeTimeFormatter,
      dd: relativeTimeFormatter,
      M: relativeTimeFormatter,
      MM: relativeTimeFormatter,
      y: relativeTimeFormatter,
      yy: relativeTimeFormatter,
    },
  };
  esm.locale(locale, null, true);
  const locale_de = null && locale;
  var ja_locale = {
    name: 'ja',
    weekdays: '日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日'.split('_'),
    weekdaysShort: '日_月_火_水_木_金_土'.split('_'),
    weekdaysMin: '日_月_火_水_木_金_土'.split('_'),
    months: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
    monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
    ordinal: function ordinal(n) {
      return n + '\u65E5';
    },
    formats: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'YYYY/MM/DD',
      LL: 'YYYY年M月D日',
      LLL: 'YYYY年M月D日 HH:mm',
      LLLL: 'YYYY年M月D日 dddd HH:mm',
      l: 'YYYY/MM/DD',
      ll: 'YYYY年M月D日',
      lll: 'YYYY年M月D日 HH:mm',
      llll: 'YYYY年M月D日(ddd) HH:mm',
    },
    meridiem: function meridiem(hour) {
      return hour < 12 ? '午前' : '午後';
    },
    relativeTime: {
      future: '%s後',
      past: '%s前',
      s: '数秒',
      m: '1分',
      mm: '%d分',
      h: '1時間',
      hh: '%d時間',
      d: '1日',
      dd: '%d日',
      M: '1ヶ月',
      MM: '%dヶ月',
      y: '1年',
      yy: '%d年',
    },
  };
  esm.locale(ja_locale, null, true);
  const ja = null && ja_locale;
  var ko_locale = {
    name: 'ko',
    weekdays: '일요일_월요일_화요일_수요일_목요일_금요일_토요일'.split('_'),
    weekdaysShort: '일_월_화_수_목_금_토'.split('_'),
    weekdaysMin: '일_월_화_수_목_금_토'.split('_'),
    months: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
    monthsShort: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
    ordinal: function ordinal(n) {
      return n;
    },
    formats: {
      LT: 'A h:mm',
      LTS: 'A h:mm:ss',
      L: 'YYYY.MM.DD.',
      LL: 'YYYY년 MMMM D일',
      LLL: 'YYYY년 MMMM D일 A h:mm',
      LLLL: 'YYYY년 MMMM D일 dddd A h:mm',
      l: 'YYYY.MM.DD.',
      ll: 'YYYY년 MMMM D일',
      lll: 'YYYY년 MMMM D일 A h:mm',
      llll: 'YYYY년 MMMM D일 dddd A h:mm',
    },
    meridiem: function meridiem(hour) {
      return hour < 12 ? '오전' : '오후';
    },
    relativeTime: {
      future: '%s 후',
      past: '%s 전',
      s: '몇 초',
      m: '1분',
      mm: '%d분',
      h: '한 시간',
      hh: '%d시간',
      d: '하루',
      dd: '%d일',
      M: '한 달',
      MM: '%d달',
      y: '일 년',
      yy: '%d년',
    },
  };
  esm.locale(ko_locale, null, true);
  const ko = null && ko_locale;
  var monthFormat =
    'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split('_');
  var monthStandalone =
    'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_');
  var monthShortFormat = 'янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.'.split('_');
  var monthShortStandalone = 'янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.'.split(
    '_',
  );
  var MONTHS_IN_FORMAT = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/;

  function plural(word, num) {
    var forms = word.split('_');
    return num % 10 === 1 && num % 100 !== 11
      ? forms[0]
      : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)
      ? forms[1]
      : forms[2];
  }

  function relativeTimeWithPlural(number, withoutSuffix, key) {
    var format = {
      mm: withoutSuffix ? 'минута_минуты_минут' : 'минуту_минуты_минут',
      hh: 'час_часа_часов',
      dd: 'день_дня_дней',
      MM: 'месяц_месяца_месяцев',
      yy: 'год_года_лет',
    };

    if (key === 'm') {
      return withoutSuffix ? 'минута' : 'минуту';
    }

    return number + ' ' + plural(format[key], +number);
  }

  var months = function months(dayjsInstance, format) {
    if (MONTHS_IN_FORMAT.test(format)) {
      return monthFormat[dayjsInstance.month()];
    }

    return monthStandalone[dayjsInstance.month()];
  };

  months.s = monthStandalone;
  months.f = monthFormat;

  var monthsShort = function monthsShort(dayjsInstance, format) {
    if (MONTHS_IN_FORMAT.test(format)) {
      return monthShortFormat[dayjsInstance.month()];
    }

    return monthShortStandalone[dayjsInstance.month()];
  };

  monthsShort.s = monthShortStandalone;
  monthsShort.f = monthShortFormat;
  var ru_locale = {
    name: 'ru',
    weekdays: 'воскресенье_понедельник_вторник_среда_четверг_пятница_суббота'.split('_'),
    weekdaysShort: 'вск_пнд_втр_срд_чтв_птн_сбт'.split('_'),
    weekdaysMin: 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
    months: months,
    monthsShort: monthsShort,
    weekStart: 1,
    yearStart: 4,
    formats: {
      LT: 'H:mm',
      LTS: 'H:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D MMMM YYYY г.',
      LLL: 'D MMMM YYYY г., H:mm',
      LLLL: 'dddd, D MMMM YYYY г., H:mm',
    },
    relativeTime: {
      future: 'через %s',
      past: '%s назад',
      s: 'несколько секунд',
      m: relativeTimeWithPlural,
      mm: relativeTimeWithPlural,
      h: 'час',
      hh: relativeTimeWithPlural,
      d: 'день',
      dd: relativeTimeWithPlural,
      M: 'месяц',
      MM: relativeTimeWithPlural,
      y: 'год',
      yy: relativeTimeWithPlural,
    },
    ordinal: function ordinal(n) {
      return n;
    },
    meridiem: function meridiem(hour) {
      if (hour < 4) {
        return 'ночи';
      } else if (hour < 12) {
        return 'утра';
      } else if (hour < 17) {
        return 'дня';
      }

      return 'вечера';
    },
  };
  esm.locale(ru_locale, null, true);
  const ru = null && ru_locale;
  var tr_locale = {
    name: 'tr',
    weekdays: 'Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi'.split('_'),
    weekdaysShort: 'Paz_Pts_Sal_Çar_Per_Cum_Cts'.split('_'),
    weekdaysMin: 'Pz_Pt_Sa_Ça_Pe_Cu_Ct'.split('_'),
    months: 'Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık'.split('_'),
    monthsShort: 'Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara'.split('_'),
    weekStart: 1,
    formats: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd, D MMMM YYYY HH:mm',
    },
    relativeTime: {
      future: '%s sonra',
      past: '%s önce',
      s: 'birkaç saniye',
      m: 'bir dakika',
      mm: '%d dakika',
      h: 'bir saat',
      hh: '%d saat',
      d: 'bir gün',
      dd: '%d gün',
      M: 'bir ay',
      MM: '%d ay',
      y: 'bir yıl',
      yy: '%d yıl',
    },
    ordinal: function ordinal(n) {
      return n + '.';
    },
  };
  esm.locale(tr_locale, null, true);
  const tr = null && tr_locale;
  var uk_monthFormat =
    'січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня'.split(
      '_',
    );
  var uk_monthStandalone =
    'січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень'.split(
      '_',
    );
  var uk_MONTHS_IN_FORMAT = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/;

  function uk_plural(word, num) {
    var forms = word.split('_');
    return num % 10 === 1 && num % 100 !== 11
      ? forms[0]
      : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)
      ? forms[1]
      : forms[2];
  }

  function uk_relativeTimeWithPlural(number, withoutSuffix, key) {
    var format = {
      ss: withoutSuffix ? 'секунда_секунди_секунд' : 'секунду_секунди_секунд',
      mm: withoutSuffix ? 'хвилина_хвилини_хвилин' : 'хвилину_хвилини_хвилин',
      hh: withoutSuffix ? 'година_години_годин' : 'годину_години_годин',
      dd: 'день_дні_днів',
      MM: 'місяць_місяці_місяців',
      yy: 'рік_роки_років',
    };

    if (key === 'm') {
      return withoutSuffix ? 'хвилина' : 'хвилину';
    } else if (key === 'h') {
      return withoutSuffix ? 'година' : 'годину';
    }

    return number + ' ' + uk_plural(format[key], +number);
  }

  var uk_months = function months(dayjsInstance, format) {
    if (uk_MONTHS_IN_FORMAT.test(format)) {
      return uk_monthFormat[dayjsInstance.month()];
    }

    return uk_monthStandalone[dayjsInstance.month()];
  };

  uk_months.s = uk_monthStandalone;
  uk_months.f = uk_monthFormat;
  var uk_locale = {
    name: 'uk',
    weekdays: 'неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота'.split('_'),
    weekdaysShort: 'ндл_пнд_втр_срд_чтв_птн_сбт'.split('_'),
    weekdaysMin: 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
    months: uk_months,
    monthsShort: 'січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд'.split('_'),
    weekStart: 1,
    relativeTime: {
      future: 'за %s',
      past: '%s тому',
      s: 'декілька секунд',
      m: uk_relativeTimeWithPlural,
      mm: uk_relativeTimeWithPlural,
      h: uk_relativeTimeWithPlural,
      hh: uk_relativeTimeWithPlural,
      d: 'день',
      dd: uk_relativeTimeWithPlural,
      M: 'місяць',
      MM: uk_relativeTimeWithPlural,
      y: 'рік',
      yy: uk_relativeTimeWithPlural,
    },
    ordinal: function ordinal(n) {
      return n;
    },
    formats: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D MMMM YYYY р.',
      LLL: 'D MMMM YYYY р., HH:mm',
      LLLL: 'dddd, D MMMM YYYY р., HH:mm',
    },
  };
  esm.locale(uk_locale, null, true);
  const uk = null && uk_locale;
  var es_locale = {
    name: 'es',
    monthsShort: 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_'),
    weekdays: 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
    weekdaysShort: 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
    weekdaysMin: 'do_lu_ma_mi_ju_vi_sá'.split('_'),
    months:
      'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split(
        '_',
      ),
    weekStart: 1,
    formats: {
      LT: 'H:mm',
      LTS: 'H:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D [de] MMMM [de] YYYY',
      LLL: 'D [de] MMMM [de] YYYY H:mm',
      LLLL: 'dddd, D [de] MMMM [de] YYYY H:mm',
    },
    relativeTime: {
      future: 'en %s',
      past: 'hace %s',
      s: 'unos segundos',
      m: 'un minuto',
      mm: '%d minutos',
      h: 'una hora',
      hh: '%d horas',
      d: 'un día',
      dd: '%d días',
      M: 'un mes',
      MM: '%d meses',
      y: 'un año',
      yy: '%d años',
    },
    ordinal: function ordinal(n) {
      return n + '\xBA';
    },
  };
  esm.locale(es_locale, null, true);
  const es = null && es_locale;
  var zh_cn_locale = {
    name: 'zh-cn',
    weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
    weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
    weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
    months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
    monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
    ordinal: function ordinal(number, period) {
      switch (period) {
        case 'W':
          return number + '\u5468';

        default:
          return number + '\u65E5';
      }
    },
    weekStart: 1,
    yearStart: 4,
    formats: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'YYYY/MM/DD',
      LL: 'YYYY年M月D日',
      LLL: 'YYYY年M月D日Ah点mm分',
      LLLL: 'YYYY年M月D日ddddAh点mm分',
      l: 'YYYY/M/D',
      ll: 'YYYY年M月D日',
      lll: 'YYYY年M月D日 HH:mm',
      llll: 'YYYY年M月D日dddd HH:mm',
    },
    relativeTime: {
      future: '%s内',
      past: '%s前',
      s: '几秒',
      m: '1 分钟',
      mm: '%d 分钟',
      h: '1 小时',
      hh: '%d 小时',
      d: '1 天',
      dd: '%d 天',
      M: '1 个月',
      MM: '%d 个月',
      y: '1 年',
      yy: '%d 年',
    },
    meridiem: function meridiem(hour, minute) {
      var hm = hour * 100 + minute;

      if (hm < 600) {
        return '凌晨';
      } else if (hm < 900) {
        return '早上';
      } else if (hm < 1100) {
        return '上午';
      } else if (hm < 1300) {
        return '中午';
      } else if (hm < 1800) {
        return '下午';
      }

      return '晚上';
    },
  };
  esm.locale(zh_cn_locale, null, true);
  const zh_cn = null && zh_cn_locale;
  var zh_tw_locale = {
    name: 'zh-tw',
    weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
    weekdaysShort: '週日_週一_週二_週三_週四_週五_週六'.split('_'),
    weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
    months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
    monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
    ordinal: function ordinal(number, period) {
      switch (period) {
        case 'W':
          return number + '\u9031';

        default:
          return number + '\u65E5';
      }
    },
    formats: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'YYYY/MM/DD',
      LL: 'YYYY年M月D日',
      LLL: 'YYYY年M月D日 HH:mm',
      LLLL: 'YYYY年M月D日dddd HH:mm',
      l: 'YYYY/M/D',
      ll: 'YYYY年M月D日',
      lll: 'YYYY年M月D日 HH:mm',
      llll: 'YYYY年M月D日dddd HH:mm',
    },
    relativeTime: {
      future: '%s內',
      past: '%s前',
      s: '幾秒',
      m: '1 分鐘',
      mm: '%d 分鐘',
      h: '1 小時',
      hh: '%d 小時',
      d: '1 天',
      dd: '%d 天',
      M: '1 個月',
      MM: '%d 個月',
      y: '1 年',
      yy: '%d 年',
    },
  };
  esm.locale(zh_tw_locale, null, true);
  const zh_tw = null && zh_tw_locale;
  esm.extend(relativeTime);
  const FromNow = ({ time }) => {
    const [, setState] = hooks_module_p(0);
    hooks_module_(() => {
      const intervalId = setInterval(() => {
        setState(state => state + 1);
      }, 5e3);
      return () => clearInterval(intervalId);
    }, []);
    return compat_module.createElement(
      'time',
      {
        dateTime: time.toISOString(),
      },
      time.locale(translate('lang')).fromNow(),
    );
  };

  const SetIntervalItem = ({ disabled = false, itemKey, label, valueOptions }) => {
    const {
      initialItems: { [itemKey]: initialItem },
    } = useOptionsContext();
    const [item, setItem] = hooks_module_p(initialItem);
    valueOptions = [...new Set([...valueOptions, initialItem])].sort((a, b) => a - b);
    const rowClass = utilities_useClassName(
      () => ({
        '&&': {
          minHeight: '2.5em',
        },
      }),
      [],
    );
    return compat_module.createElement(
      Row,
      {
        className: rowClass,
      },
      compat_module.createElement(
        RowItem,
        {
          expanded: true,
        },
        compat_module.createElement(
          LabelWrapper,
          null,
          compat_module.createElement(
            ControlLabel,
            {
              for: itemKey,
            },
            label,
          ),
        ),
      ),
      compat_module.createElement(
        RowItem,
        null,
        compat_module.createElement(
          select_Select,
          {
            disabled,
            id: itemKey,
            value: item,
            onChange: e => {
              const value = Number(e.currentTarget.value);
              void saveToLocalStorage({ [itemKey]: value }, 'options');
              setItem(value);
            },
          },
          valueOptions.map(value =>
            compat_module.createElement(
              SelectOption,
              {
                key: value,
                value,
              },
              esm.duration({ minutes: value }).locale(translate('lang')).humanize(false),
            ),
          ),
        ),
      ),
    );
  };

  const PERMISSION_PASSLIST = ['*://*.githubusercontent.com/*', '*://cdn.statically.io/*'];
  async function requestPermission(urls) {
    const origins = [];
    const passlist = PERMISSION_PASSLIST.map(pass => new MatchPattern(pass));
    for (const url of urls) {
      const u = new AltURL(url);
      if (passlist.some(pass => pass.test(u))) {
        continue;
      }
      origins.push(`${u.scheme}://${u.host}/*`);
    }
    return origins.length ? browser_browser.permissions.request({ origins }) : true;
  }
  const AddSubscriptionDialog = ({ close, open, initialName, initialURL, setSubscriptions }) => {
    const [state, setState] = hooks_module_p(() => ({
      name: initialName,
      nameValid: initialName !== '',
      url: initialURL,
      urlValid: (() => {
        if (!initialURL || !/^https?:/.test(initialURL)) {
          return false;
        }
        try {
          new URL(initialURL);
        } catch {
          return false;
        }
        return true;
      })(),
    }));
    const prevOpen = usePrevious(open);
    if (open && prevOpen === false) {
      state.name = '';
      state.nameValid = false;
      state.url = '';
      state.urlValid = false;
    }
    const ok = state.nameValid && state.urlValid;
    return compat_module.createElement(
      Dialog,
      {
        'aria-labelledby': 'addSubscriptionDialogTitle',
        close,
        open,
      },
      compat_module.createElement(
        DialogHeader,
        null,
        compat_module.createElement(
          DialogTitle,
          {
            id: 'addSubscriptionDialogTitle',
          },
          translate('options_addSubscriptionDialog_title'),
        ),
      ),
      compat_module.createElement(
        DialogBody,
        null,
        compat_module.createElement(
          Row,
          null,
          compat_module.createElement(
            RowItem,
            {
              expanded: true,
            },
            compat_module.createElement(
              LabelWrapper,
              {
                fullWidth: true,
              },
              compat_module.createElement(
                ControlLabel,
                {
                  for: 'subscriptionName',
                },
                translate('options_addSubscriptionDialog_nameLabel'),
              ),
            ),
            open &&
              compat_module.createElement(Input, {
                className: FOCUS_START_CLASS,
                id: 'subscriptionName',
                required: true,
                value: state.name,
                onChange: e =>
                  setState(s => ({
                    ...s,
                    name: e.currentTarget.value,
                    nameValid: e.currentTarget.validity.valid,
                  })),
              }),
          ),
        ),
        compat_module.createElement(
          Row,
          null,
          compat_module.createElement(
            RowItem,
            {
              expanded: true,
            },
            compat_module.createElement(
              LabelWrapper,
              {
                fullWidth: true,
              },
              compat_module.createElement(
                ControlLabel,
                {
                  for: 'subscriptionURL',
                },
                translate('options_addSubscriptionDialog_urlLabel'),
              ),
            ),
            open &&
              compat_module.createElement(Input, {
                id: 'subscriptionURL',
                pattern: 'https?:.*',
                required: true,
                type: 'url',
                value: state.url,
                onChange: e =>
                  setState(s => ({
                    ...s,
                    url: e.currentTarget.value,
                    urlValid: e.currentTarget.validity.valid,
                  })),
              }),
          ),
        ),
      ),
      compat_module.createElement(
        DialogFooter,
        null,
        compat_module.createElement(
          Row,
          {
            right: true,
          },
          compat_module.createElement(
            RowItem,
            null,
            compat_module.createElement(
              Button,
              {
                className: !ok ? FOCUS_END_CLASS : '',
                onClick: close,
              },
              translate('cancelButton'),
            ),
          ),
          compat_module.createElement(
            RowItem,
            null,
            compat_module.createElement(
              Button,
              {
                className: ok ? FOCUS_END_CLASS : '',
                disabled: !ok,
                primary: true,
                onClick: async () => {
                  if (!(await requestPermission([state.url]))) {
                    return;
                  }
                  const subscription = {
                    name: state.name,
                    url: state.url,
                    blacklist: '',
                    updateResult: null,
                    enabled: true,
                  };
                  const id = await sendMessage('add-subscription', subscription);
                  setSubscriptions(subscriptions => ({ ...subscriptions, [id]: subscription }));
                  close();
                },
              },
              translate('options_addSubscriptionDialog_addButton'),
            ),
          ),
        ),
      ),
    );
  };
  const ShowSubscriptionDialog = ({ close, open, subscription }) => {
    var _a, _b;
    const urlClassName = utilities_useClassName(
      () => ({
        wordBreak: 'break-all',
      }),
      [],
    );
    return compat_module.createElement(
      Dialog,
      {
        'aria-labelledby': 'showSubscriptionDialogTitle',
        close,
        open,
      },
      compat_module.createElement(
        DialogHeader,
        null,
        compat_module.createElement(
          DialogTitle,
          {
            id: 'showSubscriptionDialogTitle',
          },
          (_a = subscription == null ? void 0 : subscription.name) != null ? _a : '',
        ),
      ),
      compat_module.createElement(
        DialogBody,
        null,
        compat_module.createElement(
          Row,
          null,
          compat_module.createElement(
            RowItem,
            {
              expanded: true,
            },
            compat_module.createElement(
              'span',
              {
                className: urlClassName,
              },
              compat_module.createElement(
                Link,
                {
                  className: FOCUS_START_CLASS,
                  href: subscription == null ? void 0 : subscription.url,
                },
                subscription == null ? void 0 : subscription.url,
              ),
            ),
          ),
        ),
        compat_module.createElement(
          Row,
          null,
          compat_module.createElement(
            RowItem,
            {
              expanded: true,
            },
            open &&
              compat_module.createElement(RulesetEditor, {
                height: '200px',
                readOnly: true,
                resizable: true,
                value:
                  (_b = subscription == null ? void 0 : subscription.blacklist) != null ? _b : '',
              }),
          ),
        ),
      ),
      compat_module.createElement(
        DialogFooter,
        null,
        compat_module.createElement(
          Row,
          {
            right: true,
          },
          compat_module.createElement(
            RowItem,
            null,
            compat_module.createElement(
              Button,
              {
                className: FOCUS_END_CLASS,
                primary: true,
                onClick: close,
              },
              translate('okButton'),
            ),
          ),
        ),
      ),
    );
  };
  const ManageSubscription = ({
    id,
    setSubscriptions,
    setShowSubscriptionDialogOpen,
    setShowSubscriptionDialogSubscription,
    subscription,
    updating,
  }) => {
    var _a, _b;
    return compat_module.createElement(
      TableRow,
      null,
      compat_module.createElement(
        TableCell,
        null,
        compat_module.createElement(CheckBox, {
          'aria-label': translate('options_subscriptionCheckBoxLabel'),
          checked: (_a = subscription.enabled) != null ? _a : true,
          onChange: async e => {
            const enabled = e.currentTarget.checked;
            await sendMessage('enable-subscription', id, enabled);
            setSubscriptions(subscriptions => {
              const newSubscriptions = { ...subscriptions };
              if (subscriptions[id]) {
                newSubscriptions[id] = { ...subscriptions[id], enabled };
              }
              return newSubscriptions;
            });
          },
        }),
      ),
      compat_module.createElement(TableCell, null, subscription.name),
      compat_module.createElement(
        TableCell,
        null,
        updating
          ? translate('options_subscriptionUpdateRunning')
          : !subscription.updateResult
          ? ''
          : isErrorResult(subscription.updateResult)
          ? translate('error', subscription.updateResult.message)
          : compat_module.createElement(FromNow, {
              time: esm(subscription.updateResult.timestamp),
            }),
      ),
      compat_module.createElement(
        TableCell,
        null,
        compat_module.createElement(
          Menu,
          {
            'aria-label': translate('options_subscriptionMenuButtonLabel'),
          },
          compat_module.createElement(
            MenuItem,
            {
              onClick: () => {
                requestAnimationFrame(() => {
                  setShowSubscriptionDialogOpen(true);
                  setShowSubscriptionDialogSubscription(subscription);
                });
              },
            },
            translate('options_showSubscriptionMenu'),
          ),
          compat_module.createElement(
            MenuItem,
            {
              disabled: !((_b = subscription.enabled) != null ? _b : true),
              onClick: async () => {
                if (!(await requestPermission([subscription.url]))) {
                  return;
                }
                await sendMessage('update-subscription', id);
              },
            },
            translate('options_updateSubscriptionNowMenu'),
          ),
          compat_module.createElement(
            MenuItem,
            {
              onClick: async () => {
                await sendMessage('remove-subscription', id);
                setSubscriptions(subscriptions => {
                  const newSubscriptions = { ...subscriptions };
                  delete newSubscriptions[id];
                  return newSubscriptions;
                });
              },
            },
            translate('options_removeSubscriptionMenu'),
          ),
        ),
      ),
    );
  };
  const ManageSubscriptions = ({ subscriptions, setSubscriptions }) => {
    var _a, _b;
    const { query } = useOptionsContext();
    const [updating, setUpdating] = hooks_module_p({});
    const [addSubscriptionDialogOpen, setAddSubscriptionDialogOpen] = hooks_module_p(
      query.addSubscriptionName != null || query.addSubscriptionURL != null,
    );
    const [showSubscriptionDialogOpen, setShowSubscriptionDialogOpen] = hooks_module_p(false);
    const [showSubscriptionDialogSubscription, setShowSubscriptionDialogSubscription] =
      hooks_module_p(null);
    hooks_module_(
      () =>
        addMessageListeners({
          'subscription-updating': id => {
            setUpdating(updating2 => ({ ...updating2, [id]: true }));
          },
          'subscription-updated': (id, subscription) => {
            setSubscriptions(subscriptions2 =>
              subscriptions2[id] ? { ...subscriptions2, [id]: subscription } : subscriptions2,
            );
            setUpdating(updating2 => ({ ...updating2, [id]: false }));
          },
        }),
      [subscriptions, setSubscriptions],
    );
    const emptyClass = utilities_useClassName(
      () => ({
        minHeight: '3em',
        textAlign: 'center',
      }),
      [],
    );
    return compat_module.createElement(
      SectionItem,
      null,
      compat_module.createElement(
        Row,
        null,
        compat_module.createElement(
          RowItem,
          {
            expanded: true,
          },
          compat_module.createElement(
            LabelWrapper,
            null,
            compat_module.createElement(Label, null, translate('options_subscriptionFeature')),
            compat_module.createElement(
              SubLabel,
              null,
              translate('options_subscriptionFeatureDescription'),
            ),
          ),
        ),
        compat_module.createElement(
          RowItem,
          null,
          compat_module.createElement(
            Button,
            {
              primary: true,
              onClick: () => {
                setAddSubscriptionDialogOpen(true);
              },
            },
            translate('options_addSubscriptionButton'),
          ),
        ),
      ),
      numberKeys(subscriptions).length
        ? compat_module.createElement(
            Row,
            null,
            compat_module.createElement(
              RowItem,
              {
                expanded: true,
              },
              compat_module.createElement(
                Table,
                null,
                compat_module.createElement(
                  TableHeader,
                  null,
                  compat_module.createElement(
                    TableHeaderRow,
                    null,
                    compat_module.createElement(TableHeaderCell, {
                      width: '2.25em',
                    }),
                    compat_module.createElement(
                      TableHeaderCell,
                      null,
                      translate('options_subscriptionNameHeader'),
                    ),
                    compat_module.createElement(
                      TableHeaderCell,
                      {
                        width: '20%',
                      },
                      translate('options_subscriptionUpdateResultHeader'),
                    ),
                    compat_module.createElement(TableHeaderCell, {
                      width: 'calc(0.75em + 36px)',
                    }),
                  ),
                ),
                compat_module.createElement(
                  TableBody,
                  null,
                  numberEntries(subscriptions)
                    .sort(([id1, { name: name1 }], [id2, { name: name2 }]) =>
                      name1 < name2 ? -1 : name1 > name2 ? 1 : id1 - id2,
                    )
                    .map(([id, subscription]) => {
                      var _a2;
                      return compat_module.createElement(ManageSubscription, {
                        id,
                        key: id,
                        setShowSubscriptionDialogOpen,
                        setShowSubscriptionDialogSubscription,
                        setSubscriptions,
                        subscription,
                        updating: (_a2 = updating[id]) != null ? _a2 : false,
                      });
                    }),
                ),
              ),
            ),
          )
        : compat_module.createElement(
            Row,
            {
              className: emptyClass,
            },
            compat_module.createElement(
              RowItem,
              {
                expanded: true,
              },
              translate('options_noSubscriptionsAdded'),
            ),
          ),
      compat_module.createElement(
        Row,
        {
          right: true,
        },
        compat_module.createElement(
          RowItem,
          null,
          compat_module.createElement(
            Button,
            {
              disabled: !Object.values(subscriptions).filter(subscription => {
                var _a2;
                return (_a2 = subscription.enabled) != null ? _a2 : true;
              }).length,
              onClick: async () => {
                if (!(await requestPermission(Object.values(subscriptions).map(s => s.url)))) {
                  return;
                }
                await sendMessage('update-all-subscriptions');
              },
            },
            translate('options_updateAllSubscriptionsNowButton'),
          ),
        ),
      ),
      compat_module.createElement(
        Portal,
        {
          id: 'addSubscriptionDialogPortal',
        },
        compat_module.createElement(AddSubscriptionDialog, {
          close: () => setAddSubscriptionDialogOpen(false),
          initialName: (_a = query.addSubscriptionName) != null ? _a : '',
          initialURL: (_b = query.addSubscriptionURL) != null ? _b : '',
          open: addSubscriptionDialogOpen,
          setSubscriptions,
        }),
      ),
      compat_module.createElement(
        Portal,
        {
          id: 'showSubscriptionDialogPortal',
        },
        compat_module.createElement(ShowSubscriptionDialog, {
          close: () => setShowSubscriptionDialogOpen(false),
          open: showSubscriptionDialogOpen,
          subscription: showSubscriptionDialogSubscription,
        }),
      ),
    );
  };
  const SubscriptionSection = () => {
    const {
      initialItems: { subscriptions: initialSubscriptions },
    } = useOptionsContext();
    const [subscriptions, setSubscriptions] = hooks_module_p(initialSubscriptions);
    return compat_module.createElement(
      Section,
      {
        'aria-labelledby': 'subscriptionSectionTitle',
        id: 'subscription',
      },
      compat_module.createElement(
        SectionHeader,
        null,
        compat_module.createElement(
          SectionTitle,
          {
            id: 'subscriptionSectionTitle',
          },
          translate('options_subscriptionTitle'),
        ),
      ),
      compat_module.createElement(
        SectionBody,
        null,
        compat_module.createElement(ManageSubscriptions, {
          setSubscriptions,
          subscriptions,
        }),
        compat_module.createElement(
          SectionItem,
          null,
          compat_module.createElement(SetIntervalItem, {
            disabled: !Object.values(subscriptions).filter(subscription => {
              var _a;
              return (_a = subscription.enabled) != null ? _a : true;
            }).length,
            itemKey: 'updateInterval',
            label: translate('options_updateInterval'),
            valueOptions: [60, 120, 180, 360, 720, 1440],
          }),
        ),
      ),
    );
  };

  var MILLISECONDS_A_YEAR = MILLISECONDS_A_DAY * 365;
  var MILLISECONDS_A_MONTH = MILLISECONDS_A_DAY * 30;
  var durationRegex =
    /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
  var unitToMS = {
    years: MILLISECONDS_A_YEAR,
    months: MILLISECONDS_A_MONTH,
    days: MILLISECONDS_A_DAY,
    hours: MILLISECONDS_A_HOUR,
    minutes: MILLISECONDS_A_MINUTE,
    seconds: MILLISECONDS_A_SECOND,
    milliseconds: 1,
    weeks: MILLISECONDS_A_WEEK,
  };

  var isDuration = function isDuration(d) {
    return d instanceof Duration;
  };

  var $d;
  var $u;

  var duration_wrapper = function wrapper(input, instance, unit) {
    return new Duration(input, unit, instance.$l);
  };

  var duration_prettyUnit = function prettyUnit(unit) {
    return $u.p(unit) + 's';
  };

  var isNegative = function isNegative(number) {
    return number < 0;
  };

  var roundNumber = function roundNumber(number) {
    return isNegative(number) ? Math.ceil(number) : Math.floor(number);
  };

  var absolute = function absolute(number) {
    return Math.abs(number);
  };

  var getNumberUnitFormat = function getNumberUnitFormat(number, unit) {
    if (!number) {
      return {
        negative: false,
        format: '',
      };
    }

    if (isNegative(number)) {
      return {
        negative: true,
        format: '' + absolute(number) + unit,
      };
    }

    return {
      negative: false,
      format: '' + number + unit,
    };
  };

  var Duration = (function () {
    function Duration(input, unit, locale) {
      var _this = this;

      this.$d = {};
      this.$l = locale;

      if (input === undefined) {
        this.$ms = 0;
        this.parseFromMilliseconds();
      }

      if (unit) {
        return duration_wrapper(input * unitToMS[duration_prettyUnit(unit)], this);
      }

      if (typeof input === 'number') {
        this.$ms = input;
        this.parseFromMilliseconds();
        return this;
      }

      if (typeof input === 'object') {
        Object.keys(input).forEach(function (k) {
          _this.$d[duration_prettyUnit(k)] = input[k];
        });
        this.calMilliseconds();
        return this;
      }

      if (typeof input === 'string') {
        var d = input.match(durationRegex);

        if (d) {
          var properties = d.slice(2);
          var numberD = properties.map(function (value) {
            return value != null ? Number(value) : 0;
          });
          this.$d.years = numberD[0];
          this.$d.months = numberD[1];
          this.$d.weeks = numberD[2];
          this.$d.days = numberD[3];
          this.$d.hours = numberD[4];
          this.$d.minutes = numberD[5];
          this.$d.seconds = numberD[6];
          this.calMilliseconds();
          return this;
        }
      }

      return this;
    }

    var _proto = Duration.prototype;

    _proto.calMilliseconds = function calMilliseconds() {
      var _this2 = this;

      this.$ms = Object.keys(this.$d).reduce(function (total, unit) {
        return total + (_this2.$d[unit] || 0) * unitToMS[unit];
      }, 0);
    };

    _proto.parseFromMilliseconds = function parseFromMilliseconds() {
      var $ms = this.$ms;
      this.$d.years = roundNumber($ms / MILLISECONDS_A_YEAR);
      $ms %= MILLISECONDS_A_YEAR;
      this.$d.months = roundNumber($ms / MILLISECONDS_A_MONTH);
      $ms %= MILLISECONDS_A_MONTH;
      this.$d.days = roundNumber($ms / MILLISECONDS_A_DAY);
      $ms %= MILLISECONDS_A_DAY;
      this.$d.hours = roundNumber($ms / MILLISECONDS_A_HOUR);
      $ms %= MILLISECONDS_A_HOUR;
      this.$d.minutes = roundNumber($ms / MILLISECONDS_A_MINUTE);
      $ms %= MILLISECONDS_A_MINUTE;
      this.$d.seconds = roundNumber($ms / MILLISECONDS_A_SECOND);
      $ms %= MILLISECONDS_A_SECOND;
      this.$d.milliseconds = $ms;
    };

    _proto.toISOString = function toISOString() {
      var Y = getNumberUnitFormat(this.$d.years, 'Y');
      var M = getNumberUnitFormat(this.$d.months, 'M');
      var days = +this.$d.days || 0;

      if (this.$d.weeks) {
        days += this.$d.weeks * 7;
      }

      var D = getNumberUnitFormat(days, 'D');
      var H = getNumberUnitFormat(this.$d.hours, 'H');
      var m = getNumberUnitFormat(this.$d.minutes, 'M');
      var seconds = this.$d.seconds || 0;

      if (this.$d.milliseconds) {
        seconds += this.$d.milliseconds / 1000;
      }

      var S = getNumberUnitFormat(seconds, 'S');
      var negativeMode =
        Y.negative || M.negative || D.negative || H.negative || m.negative || S.negative;
      var T = H.format || m.format || S.format ? 'T' : '';
      var P = negativeMode ? '-' : '';
      var result = P + 'P' + Y.format + M.format + D.format + T + H.format + m.format + S.format;
      return result === 'P' || result === '-P' ? 'P0D' : result;
    };

    _proto.toJSON = function toJSON() {
      return this.toISOString();
    };

    _proto.format = function format(formatStr) {
      var str = formatStr || 'YYYY-MM-DDTHH:mm:ss';
      var matches = {
        Y: this.$d.years,
        YY: $u.s(this.$d.years, 2, '0'),
        YYYY: $u.s(this.$d.years, 4, '0'),
        M: this.$d.months,
        MM: $u.s(this.$d.months, 2, '0'),
        D: this.$d.days,
        DD: $u.s(this.$d.days, 2, '0'),
        H: this.$d.hours,
        HH: $u.s(this.$d.hours, 2, '0'),
        m: this.$d.minutes,
        mm: $u.s(this.$d.minutes, 2, '0'),
        s: this.$d.seconds,
        ss: $u.s(this.$d.seconds, 2, '0'),
        SSS: $u.s(this.$d.milliseconds, 3, '0'),
      };
      return str.replace(REGEX_FORMAT, function (match, $1) {
        return $1 || String(matches[match]);
      });
    };

    _proto.as = function as(unit) {
      return this.$ms / unitToMS[duration_prettyUnit(unit)];
    };

    _proto.get = function get(unit) {
      var base = this.$ms;
      var pUnit = duration_prettyUnit(unit);

      if (pUnit === 'milliseconds') {
        base %= 1000;
      } else if (pUnit === 'weeks') {
        base = roundNumber(base / unitToMS[pUnit]);
      } else {
        base = this.$d[pUnit];
      }

      return base === 0 ? 0 : base;
    };

    _proto.add = function add(input, unit, isSubtract) {
      var another;

      if (unit) {
        another = input * unitToMS[duration_prettyUnit(unit)];
      } else if (isDuration(input)) {
        another = input.$ms;
      } else {
        another = duration_wrapper(input, this).$ms;
      }

      return duration_wrapper(this.$ms + another * (isSubtract ? -1 : 1), this);
    };

    _proto.subtract = function subtract(input, unit) {
      return this.add(input, unit, true);
    };

    _proto.locale = function locale(l) {
      var that = this.clone();
      that.$l = l;
      return that;
    };

    _proto.clone = function clone() {
      return duration_wrapper(this.$ms, this);
    };

    _proto.humanize = function humanize(withSuffix) {
      return $d().add(this.$ms, 'ms').locale(this.$l).fromNow(!withSuffix);
    };

    _proto.milliseconds = function milliseconds() {
      return this.get('milliseconds');
    };

    _proto.asMilliseconds = function asMilliseconds() {
      return this.as('milliseconds');
    };

    _proto.seconds = function seconds() {
      return this.get('seconds');
    };

    _proto.asSeconds = function asSeconds() {
      return this.as('seconds');
    };

    _proto.minutes = function minutes() {
      return this.get('minutes');
    };

    _proto.asMinutes = function asMinutes() {
      return this.as('minutes');
    };

    _proto.hours = function hours() {
      return this.get('hours');
    };

    _proto.asHours = function asHours() {
      return this.as('hours');
    };

    _proto.days = function days() {
      return this.get('days');
    };

    _proto.asDays = function asDays() {
      return this.as('days');
    };

    _proto.weeks = function weeks() {
      return this.get('weeks');
    };

    _proto.asWeeks = function asWeeks() {
      return this.as('weeks');
    };

    _proto.months = function months() {
      return this.get('months');
    };

    _proto.asMonths = function asMonths() {
      return this.as('months');
    };

    _proto.years = function years() {
      return this.get('years');
    };

    _proto.asYears = function asYears() {
      return this.as('years');
    };

    return Duration;
  })();

  const duration = function (option, Dayjs, dayjs) {
    $d = dayjs;
    $u = dayjs().$utils();

    dayjs.duration = function (input, unit) {
      var $l = dayjs.locale();
      return duration_wrapper(
        input,
        {
          $l: $l,
        },
        unit,
      );
    };

    dayjs.isDuration = isDuration;
    var oldAdd = Dayjs.prototype.add;
    var oldSubtract = Dayjs.prototype.subtract;

    Dayjs.prototype.add = function (value, unit) {
      if (isDuration(value)) value = value.asMilliseconds();
      return oldAdd.bind(this)(value, unit);
    };

    Dayjs.prototype.subtract = function (value, unit) {
      if (isDuration(value)) value = value.asMilliseconds();
      return oldSubtract.bind(this)(value, unit);
    };
  };
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
  var microstruct_esm_r = r => t => (typeof t)[0] == r,
    microstruct_esm_t = r => Array.isArray(r),
    microstruct_esm_e = r => Object.keys(r),
    microstruct_esm_a = r => r => 1,
    microstruct_esm_o = r => e => microstruct_esm_t(e) && e.every(t => r(t)),
    microstruct_esm_u = t => microstruct_esm_r('b'),
    microstruct_esm_y = r => t => r.includes(t),
    microstruct_esm_b = r => r => Number.isInteger(r),
    microstruct_esm_c = r => t => r.every(r => r(t)),
    microstruct_esm_n = r => t => t === r,
    microstruct_esm_p = r => r => 0,
    microstruct_esm_f = r => t => null === t || r(t),
    microstruct_esm_l = t => microstruct_esm_r('n'),
    microstruct_esm_s = t => a =>
      microstruct_esm_r('o')(a) && a && microstruct_esm_e(t).every(r => t[r](a[r])),
    microstruct_esm_v = t => e => microstruct_esm_r('u')(e) || t(e),
    microstruct_esm_N = (t, a) => o =>
      microstruct_esm_r('o')(o) && o && microstruct_esm_e(o).every(r => t(r) && a(o[r])),
    microstruct_esm_O = t => microstruct_esm_r('s'),
    microstruct_esm_h = r => e =>
      microstruct_esm_t(e) && e.length == r.length && e.every((t, e) => r[e](t)),
    microstruct_esm_i = r => t => r.some(r => r(t)),
    microstruct_esm_j = r => r => 1,
    microstruct_esm_m = r => r,
    microstruct_esm_x = (r, t) => !!t(r),
    microstruct_esm_A = (r, t) => {
      try {
        var e = JSON.parse(r);
        if (t(e)) return e;
      } catch (r) {}
    };

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
      if (microstruct_esm_x(redirectParams, microstruct_esm_s({ code: microstruct_esm_O() }))) {
        return { authorizationCode: redirectParams.code };
      } else if (
        microstruct_esm_x(redirectParams, microstruct_esm_s({ error: microstruct_esm_O() }))
      ) {
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
          !microstruct_esm_x(
            responseBody,
            microstruct_esm_s({
              access_token: microstruct_esm_O(),
              expires_in: microstruct_esm_l(),
              refresh_token: microstruct_esm_O(),
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
        if (
          !microstruct_esm_x(
            responseBody,
            microstruct_esm_s({
              access_token: microstruct_esm_O(),
              expires_in: microstruct_esm_l(),
            }),
          )
        ) {
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
        if (
          !microstruct_esm_x(
            responseBody,
            microstruct_esm_s({ id: microstruct_esm_O(), client_modified: microstruct_esm_O() }),
          )
        ) {
          throw new UnexpectedResponse(responseBody);
        }
        return { id: responseBody.id, modifiedTime: esm(responseBody.client_modified) };
      } else if (response.status === 409) {
        const responseBody = await response.json();
        if (
          !microstruct_esm_x(
            responseBody,
            microstruct_esm_s({
              error: microstruct_esm_s({
                '.tag': microstruct_esm_n('path'),
                path: microstruct_esm_s({ '.tag': microstruct_esm_O() }),
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
          !microstruct_esm_x(
            responseBody,
            microstruct_esm_s({
              files: microstruct_esm_o(
                microstruct_esm_s({
                  id: microstruct_esm_O(),
                  modifiedTime: microstruct_esm_O(),
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

  esm.extend(duration);
  const sync_section_altFlowRedirectURL = getWebsiteURL('/callback');
  const TurnOnSyncDialog = ({ close, open, setSyncCloudId }) => {
    const {
      platformInfo: { os },
    } = useOptionsContext();
    const [state, setState] = hooks_module_p({
      phase: 'none',
      selectedCloudId: 'googleDrive',
      useAltFlow: false,
      authCode: '',
    });
    const prevOpen = usePrevious(open);
    if (open && !prevOpen) {
      state.phase = 'none';
      state.selectedCloudId = 'googleDrive';
      state.useAltFlow = false;
      state.authCode = '';
    }
    const forceAltFlow = supportedClouds[state.selectedCloudId].shouldUseAltFlow(os);
    return compat_module.createElement(
      Dialog,
      {
        'aria-labelledby': 'turnOnSyncDialogTitle',
        close,
        open,
      },
      compat_module.createElement(
        DialogHeader,
        null,
        compat_module.createElement(
          DialogTitle,
          {
            id: 'turnOnSyncDialogTitle',
          },
          translate('options_turnOnSyncDialog_title'),
        ),
      ),
      compat_module.createElement(
        DialogBody,
        null,
        compat_module.createElement(
          Row,
          null,
          compat_module.createElement(
            RowItem,
            null,
            compat_module.createElement(
              select_Select,
              {
                className: state.phase === 'none' ? FOCUS_START_CLASS : '',
                disabled: state.phase !== 'none',
                value: state.selectedCloudId,
                onChange: e => setState(s => ({ ...s, selectedCloudId: e.currentTarget.value })),
              },
              stringEntries(supportedClouds).map(([id, cloud]) =>
                compat_module.createElement(
                  SelectOption,
                  {
                    key: id,
                    value: id,
                  },
                  translate(cloud.messageNames.sync),
                ),
              ),
            ),
          ),
        ),
        compat_module.createElement(
          Row,
          null,
          compat_module.createElement(
            RowItem,
            {
              expanded: true,
            },
            compat_module.createElement(
              Text,
              null,
              translate(supportedClouds[state.selectedCloudId].messageNames.syncDescription),
            ),
          ),
        ),
        compat_module.createElement(
          Row,
          null,
          compat_module.createElement(
            RowItem,
            null,
            compat_module.createElement(
              Indent,
              null,
              compat_module.createElement(CheckBox, {
                checked: forceAltFlow || state.useAltFlow,
                disabled: state.phase !== 'none' || forceAltFlow,
                id: 'useAltFlow',
                onChange: e => setState(s => ({ ...s, useAltFlow: e.currentTarget.checked })),
              }),
            ),
          ),
          compat_module.createElement(
            RowItem,
            {
              expanded: true,
            },
            compat_module.createElement(
              LabelWrapper,
              {
                disabled: state.phase !== 'none' || forceAltFlow,
              },
              compat_module.createElement(
                ControlLabel,
                {
                  for: 'useAltFlow',
                },
                translate('options_turnOnSyncDialog_useAltFlow'),
              ),
            ),
          ),
        ),
        (forceAltFlow || state.useAltFlow) &&
          compat_module.createElement(
            Row,
            null,
            compat_module.createElement(
              RowItem,
              {
                expanded: true,
              },
              compat_module.createElement(
                Text,
                null,
                translate(
                  'options_turnOnSyncDialog_altFlowDescription',
                  new AltURL(sync_section_altFlowRedirectURL).host,
                ),
              ),
            ),
          ),
        state.phase === 'auth-alt' || state.phase === 'conn-alt'
          ? compat_module.createElement(
              Row,
              null,
              compat_module.createElement(
                RowItem,
                {
                  expanded: true,
                },
                compat_module.createElement(
                  LabelWrapper,
                  {
                    fullWidth: true,
                  },
                  compat_module.createElement(
                    ControlLabel,
                    {
                      for: 'authCode',
                    },
                    translate('options_turnOnSyncDialog_altFlowAuthCodeLabel'),
                  ),
                ),
                compat_module.createElement(TextArea, {
                  breakAll: true,
                  className: state.phase === 'auth-alt' ? FOCUS_START_CLASS : '',
                  disabled: state.phase !== 'auth-alt',
                  id: 'authCode',
                  rows: 2,
                  value: state.authCode,
                  onChange: e => {
                    setState(s => ({ ...s, authCode: e.currentTarget.value }));
                  },
                }),
              ),
            )
          : null,
      ),
      compat_module.createElement(
        DialogFooter,
        null,
        compat_module.createElement(
          Row,
          {
            right: true,
          },
          compat_module.createElement(
            RowItem,
            null,
            compat_module.createElement(
              Button,
              {
                className:
                  state.phase === 'auth' || state.phase === 'conn' || state.phase === 'conn-alt'
                    ? `${FOCUS_START_CLASS} ${FOCUS_END_CLASS}`
                    : state.phase === 'auth-alt' && !state.authCode
                    ? FOCUS_END_CLASS
                    : '',
                onClick: close,
              },
              translate('cancelButton'),
            ),
          ),
          compat_module.createElement(
            RowItem,
            null,
            compat_module.createElement(
              Button,
              {
                className:
                  state.phase === 'none' || (state.phase === 'auth-alt' && state.authCode)
                    ? FOCUS_END_CLASS
                    : '',
                disabled: !(
                  state.phase === 'none' ||
                  (state.phase === 'auth-alt' && state.authCode)
                ),
                primary: true,
                onClick: () => {
                  void (async () => {
                    let useAltFlow;
                    let authCode;
                    if (state.phase === 'auth-alt') {
                      useAltFlow = true;
                      authCode = state.authCode;
                    } else {
                      const cloud = supportedClouds[state.selectedCloudId];
                      useAltFlow = forceAltFlow || state.useAltFlow;
                      setState(s => ({ ...s, phase: useAltFlow ? 'auth-alt' : 'auth' }));
                      try {
                        const granted = await browser_browser.permissions.request({
                          origins: [
                            ...cloud.hostPermissions,
                            ...(useAltFlow ? [sync_section_altFlowRedirectURL] : []),
                          ],
                        });
                        if (!granted) {
                          throw new Error('Not granted');
                        }
                        authCode = (await cloud.authorize(useAltFlow)).authorizationCode;
                      } catch {
                        setState(s => ({ ...s, phase: 'none' }));
                        return;
                      }
                    }
                    setState(s => ({ ...s, phase: useAltFlow ? 'conn-alt' : 'conn' }));
                    try {
                      const connected = await sendMessage(
                        'connect-to-cloud',
                        state.selectedCloudId,
                        authCode,
                        useAltFlow,
                      );
                      if (!connected) {
                        throw new Error('Not connected');
                      }
                    } catch {
                      return;
                    } finally {
                      setState(s => ({ ...s, phase: 'none' }));
                    }
                    setSyncCloudId(state.selectedCloudId);
                    close();
                  })();
                },
              },
              translate('options_turnOnSyncDialog_turnOnSyncButton'),
            ),
          ),
        ),
      ),
    );
  };
  const TurnOnSync = ({ syncCloudId, setSyncCloudId }) => {
    const [turnOnSyncDialogOpen, setTurnOnSyncDialogOpen] = hooks_module_p(false);
    return compat_module.createElement(
      SectionItem,
      null,
      compat_module.createElement(
        Row,
        null,
        compat_module.createElement(
          RowItem,
          {
            expanded: true,
          },
          syncCloudId
            ? compat_module.createElement(
                LabelWrapper,
                null,
                compat_module.createElement(
                  Label,
                  null,
                  translate(supportedClouds[syncCloudId].messageNames.syncTurnedOn),
                ),
              )
            : compat_module.createElement(
                LabelWrapper,
                null,
                compat_module.createElement(Label, null, translate('options_syncFeature')),
                compat_module.createElement(
                  SubLabel,
                  null,
                  translate('options_syncFeatureDescription'),
                ),
              ),
        ),
        compat_module.createElement(
          RowItem,
          null,
          syncCloudId
            ? compat_module.createElement(
                Button,
                {
                  onClick: () => {
                    void sendMessage('disconnect-from-cloud');
                    setSyncCloudId(false);
                  },
                },
                translate('options_turnOffSync'),
              )
            : compat_module.createElement(
                Button,
                {
                  primary: true,
                  onClick: () => {
                    setTurnOnSyncDialogOpen(true);
                  },
                },
                translate('options_turnOnSync'),
              ),
        ),
      ),
      compat_module.createElement(
        Portal,
        {
          id: 'turnOnSyncDialogPortal',
        },
        compat_module.createElement(TurnOnSyncDialog, {
          close: () => setTurnOnSyncDialogOpen(false),
          open: turnOnSyncDialogOpen,
          setSyncCloudId,
        }),
      ),
    );
  };
  const SyncNow = props => {
    const {
      initialItems: { syncResult: initialSyncResult },
    } = useOptionsContext();
    const [syncResult, setSyncResult] = hooks_module_p(initialSyncResult);
    const [updated, setUpdated] = hooks_module_p(false);
    const [syncing, setSyncing] = hooks_module_p(false);
    hooks_module_(
      () =>
        addMessageListeners({
          syncing: () => {
            setUpdated(false);
            setSyncing(true);
          },
          synced: (result, updated2) => {
            setSyncResult(result);
            setUpdated(updated2);
            setSyncing(false);
          },
        }),
      [],
    );
    return compat_module.createElement(
      SectionItem,
      null,
      compat_module.createElement(
        Row,
        null,
        compat_module.createElement(
          RowItem,
          {
            expanded: true,
          },
          compat_module.createElement(
            LabelWrapper,
            null,
            compat_module.createElement(Label, null, translate('options_syncResult')),
            compat_module.createElement(
              SubLabel,
              null,
              syncing
                ? translate('options_syncRunning')
                : !props.syncCloudId || !syncResult
                ? translate('options_syncNever')
                : isErrorResult(syncResult)
                ? translate('error', syncResult.message)
                : compat_module.createElement(FromNow, {
                    time: esm(syncResult.timestamp),
                  }),
              updated
                ? compat_module.createElement(
                    compat_module.Fragment,
                    null,
                    ' ',
                    compat_module.createElement(
                      LinkButton,
                      {
                        onClick: () => {
                          window.location.reload();
                        },
                      },
                      translate('options_syncReloadButton'),
                    ),
                  )
                : null,
            ),
          ),
        ),
        compat_module.createElement(
          RowItem,
          null,
          compat_module.createElement(
            Button,
            {
              disabled: syncing || !props.syncCloudId,
              onClick: () => {
                void sendMessage('sync');
              },
            },
            translate('options_syncNowButton'),
          ),
        ),
      ),
    );
  };
  const SyncCategories = ({ disabled }) =>
    compat_module.createElement(
      SectionItem,
      null,
      compat_module.createElement(
        Row,
        null,
        compat_module.createElement(
          RowItem,
          {
            expanded: true,
          },
          compat_module.createElement(
            LabelWrapper,
            null,
            compat_module.createElement(Label, null, translate('options_syncCategories')),
          ),
        ),
      ),
      compat_module.createElement(
        Row,
        null,
        compat_module.createElement(RowItem, null, compat_module.createElement(Indent, null)),
        compat_module.createElement(
          RowItem,
          {
            expanded: true,
          },
          compat_module.createElement(
            List,
            null,
            compat_module.createElement(
              ListItem,
              null,
              compat_module.createElement(SetBooleanItem, {
                disabled,
                itemKey: 'syncBlocklist',
                label: translate('options_syncBlocklist'),
              }),
            ),
            compat_module.createElement(
              ListItem,
              null,
              compat_module.createElement(SetBooleanItem, {
                disabled,
                itemKey: 'syncGeneral',
                label: translate('options_syncGeneral'),
              }),
            ),
            compat_module.createElement(
              ListItem,
              null,
              compat_module.createElement(SetBooleanItem, {
                disabled,
                itemKey: 'syncAppearance',
                label: translate('options_syncAppearance'),
              }),
            ),
            compat_module.createElement(
              ListItem,
              null,
              compat_module.createElement(SetBooleanItem, {
                disabled,
                itemKey: 'syncSubscriptions',
                label: translate('options_syncSubscriptions'),
              }),
            ),
          ),
        ),
      ),
    );
  const SyncSection = () => {
    const {
      initialItems: { syncCloudId: initialSyncCloudId },
    } = useOptionsContext();
    const [syncCloudId, setSyncCloudId] = hooks_module_p(initialSyncCloudId);
    return compat_module.createElement(
      Section,
      {
        'aria-labelledby': 'syncSectionTitle',
        id: 'sync',
      },
      compat_module.createElement(
        SectionHeader,
        null,
        compat_module.createElement(
          SectionTitle,
          {
            id: 'syncSectionTitle',
          },
          translate('options_syncTitle'),
        ),
      ),
      compat_module.createElement(
        SectionBody,
        null,
        compat_module.createElement(TurnOnSync, {
          setSyncCloudId,
          syncCloudId,
        }),
        compat_module.createElement(SyncNow, {
          syncCloudId,
        }),
        compat_module.createElement(SyncCategories, {
          disabled: !syncCloudId,
        }),
        compat_module.createElement(
          SectionItem,
          null,
          compat_module.createElement(SetIntervalItem, {
            disabled: !syncCloudId,
            itemKey: 'syncInterval',
            label: translate('options_syncInterval'),
            valueOptions: [5, 10, 15, 30, 60, 120],
          }),
        ),
      ),
    );
  };

  const Options = () =>
    compat_module.createElement(
      AutoThemeProvider,
      null,
      compat_module.createElement(
        Baseline,
        null,
        compat_module.createElement(
          OptionsContextProvider,
          null,
          compat_module.createElement(
            Container,
            null,
            compat_module.createElement(GeneralSection, null),
            compat_module.createElement(AppearanceSection, null),
            compat_module.createElement(SyncSection, null),
            compat_module.createElement(SubscriptionSection, null),
            compat_module.createElement(AboutSection, null),
          ),
        ),
      ),
    );
  function main() {
    document.documentElement.lang = translate('lang');
    compat_module.render(
      compat_module.createElement(Options, null),
      document.body.appendChild(document.createElement('div')),
    );
  }
  main();
})();
