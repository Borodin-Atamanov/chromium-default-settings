(() => {
  'use strict';
  var __webpack_exports__ = {};

  var n,
    l,
    u,
    i,
    t,
    o,
    r,
    f = {},
    e = [],
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
      x = (i && i.__k) || e,
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
      __c: (l = '__cC' + r++),
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
  (n = e.slice),
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
    (r = 0);
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

  const icon_namespaceObject =
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4Ij48Y2lyY2xlIGN4PSI2NCIgY3k9IjY0IiByPSI2NCIgZmlsbD0iI2ZmZiIvPjxjaXJjbGUgY3g9IjY0IiBjeT0iNjQiIHI9IjQ4IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMTYiLz48cGF0aCBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMTYiIGQ9Ik05NiAzMkwzMiA5NiIvPjwvc3ZnPg==';
  const maxInt = 2147483647;

  const base = 36;
  const tMin = 1;
  const tMax = 26;
  const skew = 38;
  const damp = 700;
  const initialBias = 72;
  const initialN = 128;
  const delimiter = '-';

  const regexPunycode = /^xn--/;
  const regexNonASCII = /[^\0-\x7E]/;
  const regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g;

  const errors = {
    overflow: 'Overflow: input needs wider integers to process',
    'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
    'invalid-input': 'Invalid input',
  };

  const baseMinusTMin = base - tMin;
  const floor = Math.floor;
  const stringFromCharCode = String.fromCharCode;

  function error(type) {
    throw new RangeError(errors[type]);
  }

  function map(array, fn) {
    const result = [];
    let length = array.length;
    while (length--) {
      result[length] = fn(array[length]);
    }
    return result;
  }

  function mapDomain(string, fn) {
    const parts = string.split('@');
    let result = '';
    if (parts.length > 1) {
      result = parts[0] + '@';
      string = parts[1];
    }
    string = string.replace(regexSeparators, '\x2E');
    const labels = string.split('.');
    const encoded = map(labels, fn).join('.');
    return result + encoded;
  }

  function ucs2decode(string) {
    const output = [];
    let counter = 0;
    const length = string.length;
    while (counter < length) {
      const value = string.charCodeAt(counter++);
      if (value >= 0xd800 && value <= 0xdbff && counter < length) {
        const extra = string.charCodeAt(counter++);
        if ((extra & 0xfc00) == 0xdc00) {
          output.push(((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000);
        } else {
          output.push(value);
          counter--;
        }
      } else {
        output.push(value);
      }
    }
    return output;
  }

  const ucs2encode = array => String.fromCodePoint(...array);

  const basicToDigit = function (codePoint) {
    if (codePoint - 0x30 < 0x0a) {
      return codePoint - 0x16;
    }
    if (codePoint - 0x41 < 0x1a) {
      return codePoint - 0x41;
    }
    if (codePoint - 0x61 < 0x1a) {
      return codePoint - 0x61;
    }
    return base;
  };

  const digitToBasic = function (digit, flag) {
    return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
  };

  const adapt = function (delta, numPoints, firstTime) {
    let k = 0;
    delta = firstTime ? floor(delta / damp) : delta >> 1;
    delta += floor(delta / numPoints);
    for (; delta > (baseMinusTMin * tMax) >> 1; k += base) {
      delta = floor(delta / baseMinusTMin);
    }
    return floor(k + ((baseMinusTMin + 1) * delta) / (delta + skew));
  };

  const decode = function (input) {
    const output = [];
    const inputLength = input.length;
    let i = 0;
    let n = initialN;
    let bias = initialBias;

    let basic = input.lastIndexOf(delimiter);
    if (basic < 0) {
      basic = 0;
    }

    for (let j = 0; j < basic; ++j) {
      if (input.charCodeAt(j) >= 0x80) {
        error('not-basic');
      }
      output.push(input.charCodeAt(j));
    }

    for (let index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
      let oldi = i;
      for (let w = 1, k = base; ; k += base) {
        if (index >= inputLength) {
          error('invalid-input');
        }

        const digit = basicToDigit(input.charCodeAt(index++));

        if (digit >= base || digit > floor((maxInt - i) / w)) {
          error('overflow');
        }

        i += digit * w;
        const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

        if (digit < t) {
          break;
        }

        const baseMinusT = base - t;
        if (w > floor(maxInt / baseMinusT)) {
          error('overflow');
        }

        w *= baseMinusT;
      }

      const out = output.length + 1;
      bias = adapt(i - oldi, out, oldi == 0);

      if (floor(i / out) > maxInt - n) {
        error('overflow');
      }

      n += floor(i / out);
      i %= out;

      output.splice(i++, 0, n);
    }

    return String.fromCodePoint(...output);
  };

  const encode = function (input) {
    const output = [];

    input = ucs2decode(input);

    let inputLength = input.length;

    let n = initialN;
    let delta = 0;
    let bias = initialBias;

    for (const currentValue of input) {
      if (currentValue < 0x80) {
        output.push(stringFromCharCode(currentValue));
      }
    }

    let basicLength = output.length;
    let handledCPCount = basicLength;

    if (basicLength) {
      output.push(delimiter);
    }

    while (handledCPCount < inputLength) {
      let m = maxInt;
      for (const currentValue of input) {
        if (currentValue >= n && currentValue < m) {
          m = currentValue;
        }
      }

      const handledCPCountPlusOne = handledCPCount + 1;
      if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
        error('overflow');
      }

      delta += (m - n) * handledCPCountPlusOne;
      n = m;

      for (const currentValue of input) {
        if (currentValue < n && ++delta > maxInt) {
          error('overflow');
        }
        if (currentValue == n) {
          let q = delta;
          for (let k = base; ; k += base) {
            const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
            if (q < t) {
              break;
            }
            const qMinusT = q - t;
            const baseMinusT = base - t;
            output.push(stringFromCharCode(digitToBasic(t + (qMinusT % baseMinusT), 0)));
            q = floor(qMinusT / baseMinusT);
          }

          output.push(stringFromCharCode(digitToBasic(q, 0)));
          bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
          delta = 0;
          ++handledCPCount;
        }
      }

      ++delta;
      ++n;
    }
    return output.join('');
  };

  const toUnicode = function (input) {
    return mapDomain(input, function (string) {
      return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
    });
  };

  const toASCII = function (input) {
    return mapDomain(input, function (string) {
      return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
    });
  };

  const punycode = {
    version: '2.1.0',
    ucs2: {
      decode: ucs2decode,
      encode: ucs2encode,
    },
    decode: decode,
    encode: encode,
    toASCII: toASCII,
    toUnicode: toUnicode,
  };

  const punycode_es6 = punycode;

  const mpsl_modern_o = JSON.parse(
    '{"ac":{"com":1,"edu":1,"gov":1,"net":1,"mil":1,"org":1,"drr":1},"ad":{"nom":1},"ae":{"co":1,"net":1,"org":1,"sch":1,"ac":1,"gov":1,"mil":1,"blogspot":1},"aero":{"accident-investigation":1,"accident-prevention":1,"aerobatic":1,"aeroclub":1,"aerodrome":1,"agents":1,"aircraft":1,"airline":1,"airport":1,"air-surveillance":1,"airtraffic":1,"air-traffic-control":1,"ambulance":1,"amusement":1,"association":1,"author":1,"ballooning":1,"broker":1,"caa":1,"cargo":1,"catering":1,"certification":1,"championship":1,"charter":1,"civilaviation":1,"club":1,"conference":1,"consultant":1,"consulting":1,"control":1,"council":1,"crew":1,"design":1,"dgca":1,"educator":1,"emergency":1,"engine":1,"engineer":1,"entertainment":1,"equipment":1,"exchange":1,"express":1,"federation":1,"flight":1,"fuel":1,"gliding":1,"government":1,"groundhandling":1,"group":1,"hanggliding":1,"homebuilt":1,"insurance":1,"journal":1,"journalist":1,"leasing":1,"logistics":1,"magazine":1,"maintenance":1,"media":1,"microlight":1,"modelling":1,"navigation":1,"parachuting":1,"paragliding":1,"passenger-association":1,"pilot":1,"press":1,"production":1,"recreation":1,"repbody":1,"res":1,"research":1,"rotorcraft":1,"safety":1,"scientist":1,"services":1,"show":1,"skydiving":1,"software":1,"student":1,"trader":1,"trading":1,"trainer":1,"union":1,"workinggroup":1,"works":1},"af":{"gov":1,"com":1,"org":1,"net":1,"edu":1},"ag":{"com":1,"org":1,"net":1,"co":1,"nom":1},"ai":{"off":1,"com":1,"net":1,"org":1,"uwu":1},"al":{"com":1,"edu":1,"gov":1,"mil":1,"net":1,"org":1,"blogspot":1},"am":{"co":1,"com":1,"commune":1,"net":1,"org":1,"radio":1,"blogspot":1,"neko":1,"nyaa":1},"ao":{"ed":1,"gv":1,"og":1,"co":1,"pb":1,"it":1},"ar":{"bet":1,"com":{"blogspot":1},"coop":1,"edu":1,"gob":1,"gov":1,"int":1,"mil":1,"musica":1,"mutual":1,"net":1,"org":1,"senasa":1,"tur":1},"arpa":{"e164":1,"in-addr":1,"ip6":1,"iris":1,"uri":1,"urn":1},"as":{"gov":1},"asia":{"cloudns":1},"at":{"ac":{"sth":1},"co":{"blogspot":1},"gv":1,"or":1,"funkfeuer":{"wien":1},"futurecms":{"*":1,"ex":{"*":1},"in":{"*":1}},"futurehosting":1,"futuremailing":1,"ortsinfo":{"":1,"ex":{"*":1},"kunden":{"*":1}},"biz":1,"info":1,"priv":1,"myspreadshop":1,"12hp":1,"2ix":1,"4lima":1,"lima-city":1},"au":{"com":{"blogspot":1,"cloudlets":{"mel":1},"myspreadshop":1},"net":1,"org":1,"edu":{"act":1,"catholic":1,"nsw":{"schools":1},"nt":1,"qld":1,"sa":1,"tas":1,"vic":1,"wa":1},"gov":{"qld":1,"sa":1,"tas":1,"vic":1,"wa":1},"asn":1,"id":1,"info":1,"conf":1,"oz":1,"act":1,"nsw":1,"nt":1,"qld":1,"sa":1,"tas":1,"vic":1,"wa":1},"aw":{"com":1},"ax":{"be":1,"cat":1,"es":1,"eu":1,"gg":1,"mc":1,"us":1,"xy":1},"az":{"com":1,"net":1,"int":1,"gov":1,"org":1,"edu":1,"info":1,"pp":1,"mil":1,"name":1,"pro":1,"biz":1},"ba":{"com":1,"edu":1,"gov":1,"mil":1,"net":1,"org":1,"rs":1,"blogspot":1},"bb":{"biz":1,"co":1,"com":1,"edu":1,"gov":1,"info":1,"net":1,"org":1,"store":1,"tv":1},"bd":{"*":1},"be":{"ac":1,"webhosting":1,"blogspot":1,"interhostsolutions":{"cloud":1},"kuleuven":{"ezproxy":1},"myspreadshop":1,"transurl":{"*":1}},"bf":{"gov":1},"bg":{"0":1,"1":1,"2":1,"3":1,"4":1,"5":1,"6":1,"7":1,"8":1,"9":1,"a":1,"b":1,"c":1,"d":1,"e":1,"f":1,"g":1,"h":1,"i":1,"j":1,"k":1,"l":1,"m":1,"n":1,"o":1,"p":1,"q":1,"r":1,"s":1,"t":1,"u":1,"v":1,"w":1,"x":1,"y":1,"z":1,"blogspot":1,"barsy":1},"bh":{"com":1,"edu":1,"net":1,"org":1,"gov":1},"bi":{"co":1,"com":1,"edu":1,"or":1,"org":1},"biz":{"cloudns":1,"jozi":1,"dyndns":1,"for-better":1,"for-more":1,"for-some":1,"for-the":1,"selfip":1,"webhop":1,"orx":1,"mmafan":1,"myftp":1,"no-ip":1,"dscloud":1},"bj":{"asso":1,"barreau":1,"gouv":1,"blogspot":1},"bm":{"com":1,"edu":1,"gov":1,"net":1,"org":1},"bn":{"com":1,"edu":1,"gov":1,"net":1,"org":1,"co":1},"bo":{"com":1,"edu":1,"gob":1,"int":1,"org":1,"net":1,"mil":1,"tv":1,"web":1,"academia":1,"agro":1,"arte":1,"blog":1,"bolivia":1,"ciencia":1,"cooperativa":1,"democracia":1,"deporte":1,"ecologia":1,"economia":1,"empresa":1,"indigena":1,"industria":1,"info":1,"medicina":1,"movimiento":1,"musica":1,"natural":1,"nombre":1,"noticias":1,"patria":1,"politica":1,"profesional":1,"plurinacional":1,"pueblo":1,"revista":1,"salud":1,"tecnologia":1,"tksat":1,"transporte":1,"wiki":1},"br":{"9guacu":1,"abc":1,"adm":1,"adv":1,"agr":1,"aju":1,"am":1,"anani":1,"aparecida":1,"app":1,"arq":1,"art":1,"ato":1,"b":1,"barueri":1,"belem":1,"bhz":1,"bib":1,"bio":1,"blog":1,"bmd":1,"boavista":1,"bsb":1,"campinagrande":1,"campinas":1,"caxias":1,"cim":1,"cng":1,"cnt":1,"com":{"blogspot":1,"virtualcloud":{"":1,"scale":{"users":1}}},"contagem":1,"coop":1,"coz":1,"cri":1,"cuiaba":1,"curitiba":1,"def":1,"des":1,"det":1,"dev":1,"ecn":1,"eco":1,"edu":1,"emp":1,"enf":1,"eng":1,"esp":1,"etc":1,"eti":1,"far":1,"feira":1,"flog":1,"floripa":1,"fm":1,"fnd":1,"fortal":1,"fot":1,"foz":1,"fst":1,"g12":1,"geo":1,"ggf":1,"goiania":1,"gov":{"ac":1,"al":1,"am":1,"ap":1,"ba":1,"ce":1,"df":1,"es":1,"go":1,"ma":1,"mg":1,"ms":1,"mt":1,"pa":1,"pb":1,"pe":1,"pi":1,"pr":1,"rj":1,"rn":1,"ro":1,"rr":1,"rs":1,"sc":1,"se":1,"sp":1,"to":1},"gru":1,"imb":1,"ind":1,"inf":1,"jab":1,"jampa":1,"jdf":1,"joinville":1,"jor":1,"jus":1,"leg":{"ac":1,"al":1,"am":1,"ap":1,"ba":1,"ce":1,"df":1,"es":1,"go":1,"ma":1,"mg":1,"ms":1,"mt":1,"pa":1,"pb":1,"pe":1,"pi":1,"pr":1,"rj":1,"rn":1,"ro":1,"rr":1,"rs":1,"sc":1,"se":1,"sp":1,"to":1},"lel":1,"log":1,"londrina":1,"macapa":1,"maceio":1,"manaus":1,"maringa":1,"mat":1,"med":1,"mil":1,"morena":1,"mp":1,"mus":1,"natal":1,"net":1,"niteroi":1,"nom":{"*":1},"not":1,"ntr":1,"odo":1,"ong":1,"org":1,"osasco":1,"palmas":1,"poa":1,"ppg":1,"pro":1,"psc":1,"psi":1,"pvh":1,"qsl":1,"radio":1,"rec":1,"recife":1,"rep":1,"ribeirao":1,"rio":1,"riobranco":1,"riopreto":1,"salvador":1,"sampa":1,"santamaria":1,"santoandre":1,"saobernardo":1,"saogonca":1,"seg":1,"sjc":1,"slg":1,"slz":1,"sorocaba":1,"srv":1,"taxi":1,"tc":1,"tec":1,"teo":1,"the":1,"tmp":1,"trd":1,"tur":1,"tv":1,"udi":1,"vet":1,"vix":1,"vlog":1,"wiki":1,"zlg":1},"bs":{"com":1,"net":1,"org":1,"edu":1,"gov":1,"we":1},"bt":{"com":1,"edu":1,"gov":1,"net":1,"org":1},"bw":{"co":1,"org":1},"by":{"gov":1,"mil":1,"com":{"blogspot":1},"of":1,"mycloud":1,"mediatech":1},"bz":{"com":1,"net":1,"org":1,"edu":1,"gov":1,"za":1,"gsj":1},"ca":{"ab":1,"bc":1,"mb":1,"nb":1,"nf":1,"nl":1,"ns":1,"nt":1,"nu":1,"on":1,"pe":1,"qc":1,"sk":1,"yk":1,"gc":1,"barsy":1,"awdev":{"*":1},"co":1,"blogspot":1,"no-ip":1,"myspreadshop":1},"cc":{"cloudns":1,"ftpaccess":1,"game-server":1,"myphotos":1,"scrapping":1,"twmail":1,"csx":1,"fantasyleague":1,"spawn":{"instances":1}},"cd":{"gov":1},"cf":{"blogspot":1},"ch":{"square7":1,"blogspot":1,"flow":{"ae":{"alp1":1},"appengine":1},"linkyard-cloud":1,"dnsking":1,"gotdns":1,"myspreadshop":1,"firenet":{"*":1,"svc":{"*":1}},"12hp":1,"2ix":1,"4lima":1,"lima-city":1},"ci":{"org":1,"or":1,"com":1,"co":1,"edu":1,"ed":1,"ac":1,"net":1,"go":1,"asso":1,"xn--aroport-bya":1,"int":1,"presse":1,"md":1,"gouv":1,"fin":1,"nl":1},"ck":{"*":1,"www":2},"cl":{"co":1,"gob":1,"gov":1,"mil":1,"blogspot":1},"cm":{"co":1,"com":1,"gov":1,"net":1},"cn":{"ac":1,"com":{"amazonaws":{"":1,"compute":{"*":1},"eb":{"cn-north-1":1,"cn-northwest-1":1},"elb":{"*":1},"cn-north-1":{"s3":1}}},"edu":1,"gov":1,"net":1,"org":1,"mil":1,"xn--55qx5d":1,"xn--io0a7i":1,"xn--od0alg":1,"ah":1,"bj":1,"cq":1,"fj":1,"gd":1,"gs":1,"gz":1,"gx":1,"ha":1,"hb":1,"he":1,"hi":1,"hl":1,"hn":1,"jl":1,"js":1,"jx":1,"ln":1,"nm":1,"nx":1,"qh":1,"sc":1,"sd":1,"sh":1,"sn":1,"sx":1,"tj":1,"xj":1,"xz":1,"yn":1,"zj":1,"hk":1,"mo":1,"tw":1,"instantcloud":1,"quickconnect":{"direct":1}},"co":{"arts":1,"com":{"blogspot":1},"edu":1,"firm":1,"gov":1,"info":1,"int":1,"mil":1,"net":1,"nom":1,"org":1,"rec":1,"web":1,"carrd":1,"crd":1,"otap":{"*":1},"leadpages":1,"lpages":1,"mypi":1,"n4t":1,"repl":{"id":1},"supabase":1},"com":{"devcdnaccesso":{"*":1},"adobeaemcloud":{"dev":{"*":1}},"airkitapps":1,"airkitapps-au":1,"aivencloud":1,"kasserver":1,"amazonaws":{"compute":{"*":1},"compute-1":{"*":1},"us-east-1":{"dualstack":{"s3":1}},"elb":{"*":1},"s3":1,"s3-ap-northeast-1":1,"s3-ap-northeast-2":1,"s3-ap-south-1":1,"s3-ap-southeast-1":1,"s3-ap-southeast-2":1,"s3-ca-central-1":1,"s3-eu-central-1":1,"s3-eu-west-1":1,"s3-eu-west-2":1,"s3-eu-west-3":1,"s3-external-1":1,"s3-fips-us-gov-west-1":1,"s3-sa-east-1":1,"s3-us-gov-west-1":1,"s3-us-east-2":1,"s3-us-west-1":1,"s3-us-west-2":1,"ap-northeast-2":{"s3":1,"dualstack":{"s3":1},"s3-website":1},"ap-south-1":{"s3":1,"dualstack":{"s3":1},"s3-website":1},"ca-central-1":{"s3":1,"dualstack":{"s3":1},"s3-website":1},"eu-central-1":{"s3":1,"dualstack":{"s3":1},"s3-website":1},"eu-west-2":{"s3":1,"dualstack":{"s3":1},"s3-website":1},"eu-west-3":{"s3":1,"dualstack":{"s3":1},"s3-website":1},"us-east-2":{"s3":1,"dualstack":{"s3":1},"s3-website":1},"ap-northeast-1":{"":1,"dualstack":{"s3":1}},"ap-southeast-1":{"":1,"dualstack":{"s3":1}},"ap-southeast-2":{"":1,"dualstack":{"s3":1}},"eu-west-1":{"":1,"dualstack":{"s3":1}},"sa-east-1":{"":1,"dualstack":{"s3":1}},"s3-website-us-east-1":1,"s3-website-us-west-1":1,"s3-website-us-west-2":1,"s3-website-ap-northeast-1":1,"s3-website-ap-southeast-1":1,"s3-website-ap-southeast-2":1,"s3-website-eu-west-1":1,"s3-website-sa-east-1":1},"elasticbeanstalk":{"ap-northeast-1":1,"ap-northeast-2":1,"ap-northeast-3":1,"ap-south-1":1,"ap-southeast-1":1,"ap-southeast-2":1,"ca-central-1":1,"eu-central-1":1,"eu-west-1":1,"eu-west-2":1,"eu-west-3":1,"sa-east-1":1,"us-east-1":1,"us-east-2":1,"us-gov-west-1":1,"us-west-1":1,"us-west-2":1},"awsglobalaccelerator":1,"siiites":1,"appspacehosted":1,"appspaceusercontent":1,"on-aptible":1,"myasustor":1,"balena-devices":1,"betainabox":1,"boutir":1,"bplaced":1,"cafjs":1,"br":1,"cn":1,"de":1,"eu":1,"jpn":1,"mex":1,"ru":1,"sa":1,"uk":1,"us":1,"za":1,"ar":1,"hu":1,"kr":1,"no":1,"qc":1,"uy":1,"africa":1,"gr":1,"co":1,"jdevcloud":1,"wpdevcloud":1,"cloudcontrolled":1,"cloudcontrolapp":1,"trycloudflare":1,"customer-oci":{"*":1,"oci":{"*":1},"ocp":{"*":1},"ocs":{"*":1}},"dattolocal":1,"dattorelay":1,"dattoweb":1,"mydatto":1,"builtwithdark":1,"datadetect":{"demo":1,"instance":1},"ddns5":1,"discordsays":1,"discordsez":1,"drayddns":1,"dreamhosters":1,"mydrobo":1,"dyndns-at-home":1,"dyndns-at-work":1,"dyndns-blog":1,"dyndns-free":1,"dyndns-home":1,"dyndns-ip":1,"dyndns-mail":1,"dyndns-office":1,"dyndns-pics":1,"dyndns-remote":1,"dyndns-server":1,"dyndns-web":1,"dyndns-wiki":1,"dyndns-work":1,"blogdns":1,"cechire":1,"dnsalias":1,"dnsdojo":1,"doesntexist":1,"dontexist":1,"doomdns":1,"dyn-o-saur":1,"dynalias":1,"est-a-la-maison":1,"est-a-la-masion":1,"est-le-patron":1,"est-mon-blogueur":1,"from-ak":1,"from-al":1,"from-ar":1,"from-ca":1,"from-ct":1,"from-dc":1,"from-de":1,"from-fl":1,"from-ga":1,"from-hi":1,"from-ia":1,"from-id":1,"from-il":1,"from-in":1,"from-ks":1,"from-ky":1,"from-ma":1,"from-md":1,"from-mi":1,"from-mn":1,"from-mo":1,"from-ms":1,"from-mt":1,"from-nc":1,"from-nd":1,"from-ne":1,"from-nh":1,"from-nj":1,"from-nm":1,"from-nv":1,"from-oh":1,"from-ok":1,"from-or":1,"from-pa":1,"from-pr":1,"from-ri":1,"from-sc":1,"from-sd":1,"from-tn":1,"from-tx":1,"from-ut":1,"from-va":1,"from-vt":1,"from-wa":1,"from-wi":1,"from-wv":1,"from-wy":1,"getmyip":1,"gotdns":1,"hobby-site":1,"homelinux":1,"homeunix":1,"iamallama":1,"is-a-anarchist":1,"is-a-blogger":1,"is-a-bookkeeper":1,"is-a-bulls-fan":1,"is-a-caterer":1,"is-a-chef":1,"is-a-conservative":1,"is-a-cpa":1,"is-a-cubicle-slave":1,"is-a-democrat":1,"is-a-designer":1,"is-a-doctor":1,"is-a-financialadvisor":1,"is-a-geek":1,"is-a-green":1,"is-a-guru":1,"is-a-hard-worker":1,"is-a-hunter":1,"is-a-landscaper":1,"is-a-lawyer":1,"is-a-liberal":1,"is-a-libertarian":1,"is-a-llama":1,"is-a-musician":1,"is-a-nascarfan":1,"is-a-nurse":1,"is-a-painter":1,"is-a-personaltrainer":1,"is-a-photographer":1,"is-a-player":1,"is-a-republican":1,"is-a-rockstar":1,"is-a-socialist":1,"is-a-student":1,"is-a-teacher":1,"is-a-techie":1,"is-a-therapist":1,"is-an-accountant":1,"is-an-actor":1,"is-an-actress":1,"is-an-anarchist":1,"is-an-artist":1,"is-an-engineer":1,"is-an-entertainer":1,"is-certified":1,"is-gone":1,"is-into-anime":1,"is-into-cars":1,"is-into-cartoons":1,"is-into-games":1,"is-leet":1,"is-not-certified":1,"is-slick":1,"is-uberleet":1,"is-with-theband":1,"isa-geek":1,"isa-hockeynut":1,"issmarterthanyou":1,"likes-pie":1,"likescandy":1,"neat-url":1,"saves-the-whales":1,"selfip":1,"sells-for-less":1,"sells-for-u":1,"servebbs":1,"simple-url":1,"space-to-rent":1,"teaches-yoga":1,"writesthisblog":1,"digitaloceanspaces":{"*":1},"ddnsfree":1,"ddnsgeek":1,"giize":1,"gleeze":1,"kozow":1,"loseyourip":1,"ooguy":1,"theworkpc":1,"mytuleap":1,"tuleap-partners":1,"encoreapi":1,"evennode":{"eu-1":1,"eu-2":1,"eu-3":1,"eu-4":1,"us-1":1,"us-2":1,"us-3":1,"us-4":1},"onfabrica":1,"fbsbx":{"apps":1},"fastly-terrarium":1,"fastvps-server":1,"mydobiss":1,"firebaseapp":1,"fldrv":1,"forgeblocks":1,"framercanvas":1,"freebox-os":1,"freeboxos":1,"freemyip":1,"gentapps":1,"gentlentapis":1,"githubusercontent":1,"0emm":{"*":1},"appspot":{"r":{"*":1}},"codespot":1,"googleapis":1,"googlecode":1,"pagespeedmobilizer":1,"publishproxy":1,"withgoogle":1,"withyoutube":1,"blogspot":1,"awsmppl":1,"herokuapp":1,"herokussl":1,"myravendb":1,"impertrixcdn":1,"impertrix":1,"smushcdn":1,"wphostedmail":1,"wpmucdn":1,"pixolino":1,"amscompute":1,"clicketcloud":1,"dopaas":1,"hidora":1,"hosted-by-previder":{"paas":1},"hosteur":{"rag-cloud":1,"rag-cloud-ch":1},"ik-server":{"jcloud":1,"jcloud-ver-jpc":1},"jelastic":{"demo":1},"kilatiron":1,"massivegrid":{"paas":1},"wafaicloud":{"jed":1,"lon":1,"ryd":1},"joyent":{"":1,"cns":{"*":1}},"ktistory":1,"lpusercontent":1,"lmpm":{"app":1},"linode":{"members":1,"nodebalancer":{"*":1}},"linodeobjects":{"*":1},"linodeusercontent":{"ip":1},"barsycenter":1,"barsyonline":1,"mazeplay":1,"miniserver":1,"meteorapp":{"eu":1},"hostedpi":1,"mythic-beasts":{"customer":1,"caracal":1,"fentiger":1,"lynx":1,"ocelot":1,"oncilla":1,"onza":1,"sphinx":1,"vs":1,"x":1,"yali":1},"nospamproxy":{"cloud":1},"4u":1,"nfshost":1,"001www":1,"ddnslive":1,"myiphost":1,"blogsyte":1,"ciscofreak":1,"damnserver":1,"ditchyourip":1,"dnsiskinky":1,"dynns":1,"geekgalaxy":1,"health-carereform":1,"homesecuritymac":1,"homesecuritypc":1,"myactivedirectory":1,"mysecuritycamera":1,"net-freaks":1,"onthewifi":1,"point2this":1,"quicksytes":1,"securitytactics":1,"serveexchange":1,"servehumour":1,"servep2p":1,"servesarcasm":1,"stufftoread":1,"unusualperson":1,"workisboring":1,"3utilities":1,"ddnsking":1,"myvnc":1,"servebeer":1,"servecounterstrike":1,"serveftp":1,"servegame":1,"servehalflife":1,"servehttp":1,"serveirc":1,"servemp3":1,"servepics":1,"servequake":1,"observableusercontent":{"static":1},"orsites":1,"operaunite":1,"authgear-staging":1,"authgearapps":1,"skygearapp":1,"outsystemscloud":1,"ownprovider":1,"pgfog":1,"pagefrontapp":1,"pagexl":1,"paywhirl":{"*":1},"gotpantheon":1,"platter-app":1,"pleskns":1,"postman-echo":1,"prgmr":{"xen":1},"pythonanywhere":{"eu":1},"qualifioapp":1,"qbuser":1,"qa2":1,"dev-myqnapcloud":1,"alpha-myqnapcloud":1,"myqnapcloud":1,"quipelements":{"*":1},"rackmaze":1,"rhcloud":1,"render":{"app":1},"onrender":1,"code":{"":1,"builder":{"*":1},"dev-builder":{"*":1},"stg-builder":{"*":1}},"logoip":1,"scrysec":1,"firewall-gateway":1,"myshopblocks":1,"myshopify":1,"shopitsite":1,"1kapp":1,"appchizi":1,"applinzi":1,"sinaapp":1,"vipsinaapp":1,"bounty-full":{"alpha":1,"beta":1},"try-snowplow":1,"stackhero-network":1,"playstation-cloud":1,"myspreadshop":1,"stdlib":{"api":1},"temp-dns":1,"dsmynas":1,"familyds":1,"tb-hosting":{"site":1},"reservd":1,"thingdustdata":1,"bloxcms":1,"townnews-staging":1,"typeform":{"pro":1},"hk":1,"vultrobjects":{"*":1},"wafflecell":1,"reserve-online":1,"hotelwithflight":1,"remotewd":1,"wiardweb":{"pages":1},"messwithdns":1,"woltlab-demo":1,"wpenginepowered":{"js":1},"wixsite":1,"xnbay":{"u2":1,"u2-local":1},"yolasite":1},"cr":{"ac":1,"co":1,"ed":1,"fi":1,"go":1,"or":1,"sa":1},"cu":{"com":1,"edu":1,"org":1,"net":1,"gov":1,"inf":1},"cv":{"com":1,"edu":1,"int":1,"nome":1,"org":1,"blogspot":1},"cw":{"com":1,"edu":1,"net":1,"org":1},"cx":{"gov":1,"ath":1,"info":1},"cy":{"ac":1,"biz":1,"com":{"blogspot":1,"scaleforce":{"j":1}},"ekloges":1,"gov":1,"ltd":1,"mil":1,"net":1,"org":1,"press":1,"pro":1,"tm":1},"cz":{"co":1,"realm":1,"e4":1,"blogspot":1,"metacentrum":{"cloud":{"*":1},"custom":1},"muni":{"":1,"cloud":{"flt":1,"usr":1}}},"de":{"bplaced":1,"square7":1,"com":1,"cosidns":{"dyn":1},"dynamisches-dns":1,"dnsupdater":1,"internet-dns":1,"l-o-g-i-n":1,"dnshome":1,"fuettertdasnetz":1,"isteingeek":1,"istmein":1,"lebtimnetz":1,"leitungsen":1,"traeumtgerade":1,"ddnss":{"dyn":1,"dyndns":1},"dyndns1":1,"dyn-ip24":1,"home-webserver":{"dyn":1},"myhome-server":1,"frusky":{"*":1},"goip":1,"blogspot":1,"xn--gnstigbestellen-zvb":1,"xn--gnstigliefern-wob":1,"hs-heilbronn":{"":1,"it":{"pages":1}},"dyn-berlin":1,"in-berlin":1,"in-brb":1,"in-butter":1,"in-dsl":1,"in-vpn":1,"iservschule":1,"mein-iserv":1,"schulplattform":1,"schulserver":1,"test-iserv":1,"keymachine":1,"git-repos":1,"lcube-server":1,"svn-repos":1,"barsy":1,"logoip":1,"firewall-gateway":1,"my-gateway":1,"my-router":1,"spdns":1,"speedpartner":{"customer":1},"myspreadshop":1,"taifun-dns":1,"12hp":1,"2ix":1,"4lima":1,"lima-city":1,"dd-dns":1,"dray-dns":1,"draydns":1,"dyn-vpn":1,"dynvpn":1,"mein-vigor":1,"my-vigor":1,"my-wan":1,"syno-ds":1,"synology-diskstation":1,"synology-ds":1,"uberspace":{"*":1},"virtualuser":1,"virtual-user":1,"community-pro":1,"diskussionsbereich":1},"dk":{"biz":1,"co":1,"firm":1,"reg":1,"store":1,"blogspot":1,"myspreadshop":1},"dm":{"com":1,"net":1,"org":1,"edu":1,"gov":1},"do":{"art":1,"com":1,"edu":1,"gob":1,"gov":1,"mil":1,"net":1,"org":1,"sld":1,"web":1},"dz":{"art":1,"asso":1,"com":1,"edu":1,"gov":1,"org":1,"net":1,"pol":1,"soc":1,"tm":1},"ec":{"com":1,"info":1,"net":1,"fin":1,"k12":1,"med":1,"pro":1,"org":1,"edu":1,"gov":1,"gob":1,"mil":1,"base":1,"official":1},"edu":{"rit":{"git-pages":1}},"ee":{"edu":1,"gov":1,"riik":1,"lib":1,"med":1,"com":{"blogspot":1},"pri":1,"aip":1,"org":1,"fie":1},"eg":{"com":{"blogspot":1},"edu":1,"eun":1,"gov":1,"mil":1,"name":1,"net":1,"org":1,"sci":1},"er":{"*":1},"es":{"com":{"blogspot":1},"nom":1,"org":1,"gob":1,"edu":1,"myspreadshop":1},"et":{"com":1,"gov":1,"org":1,"edu":1,"biz":1,"name":1,"info":1,"net":1},"eu":{"airkitapps":1,"mycd":1,"cloudns":1,"dogado":{"jelastic":1},"barsy":1,"wellbeingzone":1,"spdns":1,"transurl":{"*":1},"diskstation":1},"fi":{"aland":1,"dy":1,"blogspot":1,"xn--hkkinen-5wa":1,"iki":1,"cloudplatform":{"fi":1},"datacenter":{"demo":1,"paas":1},"kapsi":1,"myspreadshop":1},"fj":{"ac":1,"biz":1,"com":1,"gov":1,"info":1,"mil":1,"name":1,"net":1,"org":1,"pro":1},"fk":{"*":1},"fm":{"com":1,"edu":1,"net":1,"org":1,"radio":1},"fr":{"asso":1,"com":1,"gouv":1,"nom":1,"prd":1,"tm":1,"aeroport":1,"avocat":1,"avoues":1,"cci":1,"chambagri":1,"chirurgiens-dentistes":1,"experts-comptables":1,"geometre-expert":1,"greta":1,"huissier-justice":1,"medecin":1,"notaires":1,"pharmacien":1,"port":1,"veterinaire":1,"en-root":1,"fbx-os":1,"fbxos":1,"freebox-os":1,"freeboxos":1,"blogspot":1,"goupile":1,"on-web":1,"chirurgiens-dentistes-en-france":1,"dedibox":1,"myspreadshop":1,"ynh":1},"gd":{"edu":1,"gov":1},"ge":{"com":1,"edu":1,"gov":1,"org":1,"mil":1,"net":1,"pvt":1},"gg":{"co":1,"net":1,"org":1,"kaas":1,"cya":1,"panel":{"daemon":1}},"gh":{"com":1,"edu":1,"gov":1,"org":1,"mil":1},"gi":{"com":1,"ltd":1,"gov":1,"mod":1,"edu":1,"org":1},"gl":{"co":1,"com":1,"edu":1,"net":1,"org":1,"biz":1,"xx":1},"gn":{"ac":1,"com":1,"edu":1,"gov":1,"org":1,"net":1},"gp":{"com":1,"net":1,"mobi":1,"edu":1,"org":1,"asso":1,"app":1},"gr":{"com":1,"edu":1,"net":1,"org":1,"gov":1,"blogspot":1},"gt":{"com":1,"edu":1,"gob":1,"ind":1,"mil":1,"net":1,"org":1,"blog":1,"de":1,"to":1},"gu":{"com":1,"edu":1,"gov":1,"guam":1,"info":1,"net":1,"org":1,"web":1},"gy":{"co":1,"com":1,"edu":1,"gov":1,"net":1,"org":1,"be":1},"hk":{"com":1,"edu":1,"gov":1,"idv":1,"net":1,"org":1,"xn--55qx5d":1,"xn--wcvs22d":1,"xn--lcvr32d":1,"xn--mxtq1m":1,"xn--gmqw5a":1,"xn--ciqpn":1,"xn--gmq050i":1,"xn--zf0avx":1,"xn--io0a7i":1,"xn--mk0axi":1,"xn--od0alg":1,"xn--od0aq3b":1,"xn--tn0ag":1,"xn--uc0atv":1,"xn--uc0ay4a":1,"blogspot":1,"secaas":1,"ltd":1,"inc":1},"hn":{"com":1,"edu":1,"org":1,"net":1,"mil":1,"gob":1,"cc":1},"hr":{"iz":1,"from":1,"name":1,"com":1,"blogspot":1,"free":1},"ht":{"com":1,"shop":1,"firm":1,"info":1,"adult":1,"net":1,"pro":1,"org":1,"med":1,"art":1,"coop":1,"pol":1,"asso":1,"edu":1,"rel":1,"gouv":1,"perso":1},"hu":{"2000":1,"co":1,"info":1,"org":1,"priv":1,"sport":1,"tm":1,"agrar":1,"bolt":1,"casino":1,"city":1,"erotica":1,"erotika":1,"film":1,"forum":1,"games":1,"hotel":1,"ingatlan":1,"jogasz":1,"konyvelo":1,"lakas":1,"media":1,"news":1,"reklam":1,"sex":1,"shop":1,"suli":1,"szex":1,"tozsde":1,"utazas":1,"video":1,"blogspot":1},"id":{"ac":1,"biz":1,"co":{"blogspot":1},"desa":1,"go":1,"mil":1,"my":{"rss":{"*":1}},"net":1,"or":1,"ponpes":1,"sch":1,"web":1,"flap":1,"forte":1},"ie":{"gov":1,"blogspot":1,"myspreadshop":1},"il":{"ac":1,"co":{"ravpage":1,"blogspot":1,"tabitorder":1},"gov":1,"idf":1,"k12":1,"muni":1,"net":1,"org":1},"im":{"ac":1,"co":{"ltd":1,"plc":1},"com":1,"net":1,"org":1,"tt":1,"tv":1,"ro":1},"in":{"5g":1,"6g":1,"ac":1,"ai":1,"am":1,"bihar":1,"biz":1,"business":1,"ca":1,"cn":1,"co":1,"com":1,"coop":1,"cs":1,"delhi":1,"dr":1,"edu":1,"er":1,"firm":1,"gen":1,"gov":1,"gujarat":1,"ind":1,"info":1,"int":1,"internet":1,"io":1,"me":1,"mil":1,"net":1,"nic":1,"org":1,"pg":1,"post":1,"pro":1,"res":1,"travel":1,"tv":1,"uk":1,"up":1,"us":1,"web":1,"cloudns":1,"blogspot":1,"barsy":1,"supabase":1},"info":{"cloudns":1,"dynamic-dns":1,"dyndns":1,"barrel-of-knowledge":1,"barrell-of-knowledge":1,"for-our":1,"groks-the":1,"groks-this":1,"here-for-more":1,"knowsitall":1,"selfip":1,"webhop":1,"barsy":1,"mayfirst":1,"forumz":1,"nsupdate":1,"dvrcam":1,"ilovecollege":1,"no-ip":1,"dnsupdate":1,"v-info":1},"int":{"eu":1},"io":{"2038":1,"com":1,"apigee":1,"b-data":1,"backplaneapp":1,"banzaicloud":{"app":1,"backyards":{"*":1}},"bitbucket":1,"bluebite":1,"boxfuse":1,"browsersafetymark":1,"bigv":{"uk0":1},"cleverapps":1,"dappnode":{"dyndns":1},"dedyn":1,"drud":1,"definima":1,"fh-muenster":1,"shw":1,"forgerock":{"id":1},"ghost":1,"github":1,"gitlab":1,"lolipop":1,"hasura-app":1,"hostyhosting":1,"moonscale":{"*":1},"beebyte":{"paas":1},"beebyteapp":{"sekd1":1},"jele":1,"unispace":{"cloud-fr1":1},"webthings":1,"loginline":1,"barsy":1,"azurecontainer":{"*":1},"ngrok":1,"nodeart":{"stage":1},"nid":1,"pantheonsite":1,"dyn53":1,"pstmn":{"mock":1},"protonet":1,"qoto":1,"qcx":{"sys":{"*":1}},"vaporcloud":1,"vbrplsbx":{"g":1},"on-k3s":{"*":1},"on-rio":{"*":1},"readthedocs":1,"resindevice":1,"resinstaging":{"devices":1},"hzc":1,"sandcats":1,"shiftcrypto":1,"shiftedit":1,"mo-siemens":1,"musician":1,"lair":{"apps":1},"stolos":{"*":1},"spacekit":1,"utwente":1,"s5y":{"*":1},"edugit":1,"telebit":1,"thingdust":{"":1,"dev":{"cust":1,"reservd":1},"disrec":{"cust":1,"reservd":1},"prod":{"cust":1},"testing":{"cust":1,"reservd":1}},"tickets":1,"upli":1,"wedeploy":1,"editorx":1,"basicserver":1,"virtualserver":1},"iq":{"gov":1,"edu":1,"mil":1,"com":1,"org":1,"net":1},"ir":{"ac":1,"co":1,"gov":1,"id":1,"net":1,"org":1,"sch":1,"xn--mgba3a4f16a":1,"xn--mgba3a4fra":1},"is":{"net":1,"com":1,"edu":1,"gov":1,"org":1,"int":1,"cupcake":1,"blogspot":1},"it":{"gov":1,"edu":1,"abr":1,"abruzzo":1,"aosta-valley":1,"aostavalley":1,"bas":1,"basilicata":1,"cal":1,"calabria":1,"cam":1,"campania":1,"emilia-romagna":1,"emiliaromagna":1,"emr":1,"friuli-v-giulia":1,"friuli-ve-giulia":1,"friuli-vegiulia":1,"friuli-venezia-giulia":1,"friuli-veneziagiulia":1,"friuli-vgiulia":1,"friuliv-giulia":1,"friulive-giulia":1,"friulivegiulia":1,"friulivenezia-giulia":1,"friuliveneziagiulia":1,"friulivgiulia":1,"fvg":1,"laz":1,"lazio":1,"lig":1,"liguria":1,"lom":1,"lombardia":1,"lombardy":1,"lucania":1,"mar":1,"marche":1,"mol":1,"molise":1,"piedmont":1,"piemonte":1,"pmn":1,"pug":1,"puglia":1,"sar":1,"sardegna":1,"sardinia":1,"sic":1,"sicilia":1,"sicily":1,"taa":1,"tos":1,"toscana":1,"trentin-sud-tirol":1,"xn--trentin-sd-tirol-rzb":1,"trentin-sudtirol":1,"xn--trentin-sdtirol-7vb":1,"trentin-sued-tirol":1,"trentin-suedtirol":1,"trentino-a-adige":1,"trentino-aadige":1,"trentino-alto-adige":1,"trentino-altoadige":1,"trentino-s-tirol":1,"trentino-stirol":1,"trentino-sud-tirol":1,"xn--trentino-sd-tirol-c3b":1,"trentino-sudtirol":1,"xn--trentino-sdtirol-szb":1,"trentino-sued-tirol":1,"trentino-suedtirol":1,"trentino":1,"trentinoa-adige":1,"trentinoaadige":1,"trentinoalto-adige":1,"trentinoaltoadige":1,"trentinos-tirol":1,"trentinostirol":1,"trentinosud-tirol":1,"xn--trentinosd-tirol-rzb":1,"trentinosudtirol":1,"xn--trentinosdtirol-7vb":1,"trentinosued-tirol":1,"trentinosuedtirol":1,"trentinsud-tirol":1,"xn--trentinsd-tirol-6vb":1,"trentinsudtirol":1,"xn--trentinsdtirol-nsb":1,"trentinsued-tirol":1,"trentinsuedtirol":1,"tuscany":1,"umb":1,"umbria":1,"val-d-aosta":1,"val-daosta":1,"vald-aosta":1,"valdaosta":1,"valle-aosta":1,"valle-d-aosta":1,"valle-daosta":1,"valleaosta":1,"valled-aosta":1,"valledaosta":1,"vallee-aoste":1,"xn--valle-aoste-ebb":1,"vallee-d-aoste":1,"xn--valle-d-aoste-ehb":1,"valleeaoste":1,"xn--valleaoste-e7a":1,"valleedaoste":1,"xn--valledaoste-ebb":1,"vao":1,"vda":1,"ven":1,"veneto":1,"ag":1,"agrigento":1,"al":1,"alessandria":1,"alto-adige":1,"altoadige":1,"an":1,"ancona":1,"andria-barletta-trani":1,"andria-trani-barletta":1,"andriabarlettatrani":1,"andriatranibarletta":1,"ao":1,"aosta":1,"aoste":1,"ap":1,"aq":1,"aquila":1,"ar":1,"arezzo":1,"ascoli-piceno":1,"ascolipiceno":1,"asti":1,"at":1,"av":1,"avellino":1,"ba":1,"balsan-sudtirol":1,"xn--balsan-sdtirol-nsb":1,"balsan-suedtirol":1,"balsan":1,"bari":1,"barletta-trani-andria":1,"barlettatraniandria":1,"belluno":1,"benevento":1,"bergamo":1,"bg":1,"bi":1,"biella":1,"bl":1,"bn":1,"bo":1,"bologna":1,"bolzano-altoadige":1,"bolzano":1,"bozen-sudtirol":1,"xn--bozen-sdtirol-2ob":1,"bozen-suedtirol":1,"bozen":1,"br":1,"brescia":1,"brindisi":1,"bs":1,"bt":1,"bulsan-sudtirol":1,"xn--bulsan-sdtirol-nsb":1,"bulsan-suedtirol":1,"bulsan":1,"bz":1,"ca":1,"cagliari":1,"caltanissetta":1,"campidano-medio":1,"campidanomedio":1,"campobasso":1,"carbonia-iglesias":1,"carboniaiglesias":1,"carrara-massa":1,"carraramassa":1,"caserta":1,"catania":1,"catanzaro":1,"cb":1,"ce":1,"cesena-forli":1,"xn--cesena-forl-mcb":1,"cesenaforli":1,"xn--cesenaforl-i8a":1,"ch":1,"chieti":1,"ci":1,"cl":1,"cn":1,"co":1,"como":1,"cosenza":1,"cr":1,"cremona":1,"crotone":1,"cs":1,"ct":1,"cuneo":1,"cz":1,"dell-ogliastra":1,"dellogliastra":1,"en":1,"enna":1,"fc":1,"fe":1,"fermo":1,"ferrara":1,"fg":1,"fi":1,"firenze":1,"florence":1,"fm":1,"foggia":1,"forli-cesena":1,"xn--forl-cesena-fcb":1,"forlicesena":1,"xn--forlcesena-c8a":1,"fr":1,"frosinone":1,"ge":1,"genoa":1,"genova":1,"go":1,"gorizia":1,"gr":1,"grosseto":1,"iglesias-carbonia":1,"iglesiascarbonia":1,"im":1,"imperia":1,"is":1,"isernia":1,"kr":1,"la-spezia":1,"laquila":1,"laspezia":1,"latina":1,"lc":1,"le":1,"lecce":1,"lecco":1,"li":1,"livorno":1,"lo":1,"lodi":1,"lt":1,"lu":1,"lucca":1,"macerata":1,"mantova":1,"massa-carrara":1,"massacarrara":1,"matera":1,"mb":1,"mc":1,"me":1,"medio-campidano":1,"mediocampidano":1,"messina":1,"mi":1,"milan":1,"milano":1,"mn":1,"mo":1,"modena":1,"monza-brianza":1,"monza-e-della-brianza":1,"monza":1,"monzabrianza":1,"monzaebrianza":1,"monzaedellabrianza":1,"ms":1,"mt":1,"na":1,"naples":1,"napoli":1,"no":1,"novara":1,"nu":1,"nuoro":1,"og":1,"ogliastra":1,"olbia-tempio":1,"olbiatempio":1,"or":1,"oristano":1,"ot":1,"pa":1,"padova":1,"padua":1,"palermo":1,"parma":1,"pavia":1,"pc":1,"pd":1,"pe":1,"perugia":1,"pesaro-urbino":1,"pesarourbino":1,"pescara":1,"pg":1,"pi":1,"piacenza":1,"pisa":1,"pistoia":1,"pn":1,"po":1,"pordenone":1,"potenza":1,"pr":1,"prato":1,"pt":1,"pu":1,"pv":1,"pz":1,"ra":1,"ragusa":1,"ravenna":1,"rc":1,"re":1,"reggio-calabria":1,"reggio-emilia":1,"reggiocalabria":1,"reggioemilia":1,"rg":1,"ri":1,"rieti":1,"rimini":1,"rm":1,"rn":1,"ro":1,"roma":1,"rome":1,"rovigo":1,"sa":1,"salerno":1,"sassari":1,"savona":1,"si":1,"siena":1,"siracusa":1,"so":1,"sondrio":1,"sp":1,"sr":1,"ss":1,"suedtirol":1,"xn--sdtirol-n2a":1,"sv":1,"ta":1,"taranto":1,"te":1,"tempio-olbia":1,"tempioolbia":1,"teramo":1,"terni":1,"tn":1,"to":1,"torino":1,"tp":1,"tr":1,"trani-andria-barletta":1,"trani-barletta-andria":1,"traniandriabarletta":1,"tranibarlettaandria":1,"trapani":1,"trento":1,"treviso":1,"trieste":1,"ts":1,"turin":1,"tv":1,"ud":1,"udine":1,"urbino-pesaro":1,"urbinopesaro":1,"va":1,"varese":1,"vb":1,"vc":1,"ve":1,"venezia":1,"venice":1,"verbania":1,"vercelli":1,"verona":1,"vi":1,"vibo-valentia":1,"vibovalentia":1,"vicenza":1,"viterbo":1,"vr":1,"vs":1,"vt":1,"vv":1,"blogspot":1,"ibxos":1,"iliadboxos":1,"neen":{"jc":1},"tim":{"":1,"open":{"":1,"jelastic":{"cloud":1}}},"16-b":1,"32-b":1,"64-b":1,"myspreadshop":1,"syncloud":1},"je":{"co":1,"net":1,"org":1,"of":1},"jm":{"*":1},"jo":{"com":1,"org":1,"net":1,"edu":1,"sch":1,"gov":1,"mil":1,"name":1},"jp":{"ac":1,"ad":1,"co":1,"ed":1,"go":1,"gr":1,"lg":1,"ne":{"aseinet":{"user":1},"gehirn":1},"or":1,"aichi":{"aisai":1,"ama":1,"anjo":1,"asuke":1,"chiryu":1,"chita":1,"fuso":1,"gamagori":1,"handa":1,"hazu":1,"hekinan":1,"higashiura":1,"ichinomiya":1,"inazawa":1,"inuyama":1,"isshiki":1,"iwakura":1,"kanie":1,"kariya":1,"kasugai":1,"kira":1,"kiyosu":1,"komaki":1,"konan":1,"kota":1,"mihama":1,"miyoshi":1,"nishio":1,"nisshin":1,"obu":1,"oguchi":1,"oharu":1,"okazaki":1,"owariasahi":1,"seto":1,"shikatsu":1,"shinshiro":1,"shitara":1,"tahara":1,"takahama":1,"tobishima":1,"toei":1,"togo":1,"tokai":1,"tokoname":1,"toyoake":1,"toyohashi":1,"toyokawa":1,"toyone":1,"toyota":1,"tsushima":1,"yatomi":1},"akita":{"akita":1,"daisen":1,"fujisato":1,"gojome":1,"hachirogata":1,"happou":1,"higashinaruse":1,"honjo":1,"honjyo":1,"ikawa":1,"kamikoani":1,"kamioka":1,"katagami":1,"kazuno":1,"kitaakita":1,"kosaka":1,"kyowa":1,"misato":1,"mitane":1,"moriyoshi":1,"nikaho":1,"noshiro":1,"odate":1,"oga":1,"ogata":1,"semboku":1,"yokote":1,"yurihonjo":1},"aomori":{"aomori":1,"gonohe":1,"hachinohe":1,"hashikami":1,"hiranai":1,"hirosaki":1,"itayanagi":1,"kuroishi":1,"misawa":1,"mutsu":1,"nakadomari":1,"noheji":1,"oirase":1,"owani":1,"rokunohe":1,"sannohe":1,"shichinohe":1,"shingo":1,"takko":1,"towada":1,"tsugaru":1,"tsuruta":1},"chiba":{"abiko":1,"asahi":1,"chonan":1,"chosei":1,"choshi":1,"chuo":1,"funabashi":1,"futtsu":1,"hanamigawa":1,"ichihara":1,"ichikawa":1,"ichinomiya":1,"inzai":1,"isumi":1,"kamagaya":1,"kamogawa":1,"kashiwa":1,"katori":1,"katsuura":1,"kimitsu":1,"kisarazu":1,"kozaki":1,"kujukuri":1,"kyonan":1,"matsudo":1,"midori":1,"mihama":1,"minamiboso":1,"mobara":1,"mutsuzawa":1,"nagara":1,"nagareyama":1,"narashino":1,"narita":1,"noda":1,"oamishirasato":1,"omigawa":1,"onjuku":1,"otaki":1,"sakae":1,"sakura":1,"shimofusa":1,"shirako":1,"shiroi":1,"shisui":1,"sodegaura":1,"sosa":1,"tako":1,"tateyama":1,"togane":1,"tohnosho":1,"tomisato":1,"urayasu":1,"yachimata":1,"yachiyo":1,"yokaichiba":1,"yokoshibahikari":1,"yotsukaido":1},"ehime":{"ainan":1,"honai":1,"ikata":1,"imabari":1,"iyo":1,"kamijima":1,"kihoku":1,"kumakogen":1,"masaki":1,"matsuno":1,"matsuyama":1,"namikata":1,"niihama":1,"ozu":1,"saijo":1,"seiyo":1,"shikokuchuo":1,"tobe":1,"toon":1,"uchiko":1,"uwajima":1,"yawatahama":1},"fukui":{"echizen":1,"eiheiji":1,"fukui":1,"ikeda":1,"katsuyama":1,"mihama":1,"minamiechizen":1,"obama":1,"ohi":1,"ono":1,"sabae":1,"sakai":1,"takahama":1,"tsuruga":1,"wakasa":1},"fukuoka":{"ashiya":1,"buzen":1,"chikugo":1,"chikuho":1,"chikujo":1,"chikushino":1,"chikuzen":1,"chuo":1,"dazaifu":1,"fukuchi":1,"hakata":1,"higashi":1,"hirokawa":1,"hisayama":1,"iizuka":1,"inatsuki":1,"kaho":1,"kasuga":1,"kasuya":1,"kawara":1,"keisen":1,"koga":1,"kurate":1,"kurogi":1,"kurume":1,"minami":1,"miyako":1,"miyama":1,"miyawaka":1,"mizumaki":1,"munakata":1,"nakagawa":1,"nakama":1,"nishi":1,"nogata":1,"ogori":1,"okagaki":1,"okawa":1,"oki":1,"omuta":1,"onga":1,"onojo":1,"oto":1,"saigawa":1,"sasaguri":1,"shingu":1,"shinyoshitomi":1,"shonai":1,"soeda":1,"sue":1,"tachiarai":1,"tagawa":1,"takata":1,"toho":1,"toyotsu":1,"tsuiki":1,"ukiha":1,"umi":1,"usui":1,"yamada":1,"yame":1,"yanagawa":1,"yukuhashi":1},"fukushima":{"aizubange":1,"aizumisato":1,"aizuwakamatsu":1,"asakawa":1,"bandai":1,"date":1,"fukushima":1,"furudono":1,"futaba":1,"hanawa":1,"higashi":1,"hirata":1,"hirono":1,"iitate":1,"inawashiro":1,"ishikawa":1,"iwaki":1,"izumizaki":1,"kagamiishi":1,"kaneyama":1,"kawamata":1,"kitakata":1,"kitashiobara":1,"koori":1,"koriyama":1,"kunimi":1,"miharu":1,"mishima":1,"namie":1,"nango":1,"nishiaizu":1,"nishigo":1,"okuma":1,"omotego":1,"ono":1,"otama":1,"samegawa":1,"shimogo":1,"shirakawa":1,"showa":1,"soma":1,"sukagawa":1,"taishin":1,"tamakawa":1,"tanagura":1,"tenei":1,"yabuki":1,"yamato":1,"yamatsuri":1,"yanaizu":1,"yugawa":1},"gifu":{"anpachi":1,"ena":1,"gifu":1,"ginan":1,"godo":1,"gujo":1,"hashima":1,"hichiso":1,"hida":1,"higashishirakawa":1,"ibigawa":1,"ikeda":1,"kakamigahara":1,"kani":1,"kasahara":1,"kasamatsu":1,"kawaue":1,"kitagata":1,"mino":1,"minokamo":1,"mitake":1,"mizunami":1,"motosu":1,"nakatsugawa":1,"ogaki":1,"sakahogi":1,"seki":1,"sekigahara":1,"shirakawa":1,"tajimi":1,"takayama":1,"tarui":1,"toki":1,"tomika":1,"wanouchi":1,"yamagata":1,"yaotsu":1,"yoro":1},"gunma":{"annaka":1,"chiyoda":1,"fujioka":1,"higashiagatsuma":1,"isesaki":1,"itakura":1,"kanna":1,"kanra":1,"katashina":1,"kawaba":1,"kiryu":1,"kusatsu":1,"maebashi":1,"meiwa":1,"midori":1,"minakami":1,"naganohara":1,"nakanojo":1,"nanmoku":1,"numata":1,"oizumi":1,"ora":1,"ota":1,"shibukawa":1,"shimonita":1,"shinto":1,"showa":1,"takasaki":1,"takayama":1,"tamamura":1,"tatebayashi":1,"tomioka":1,"tsukiyono":1,"tsumagoi":1,"ueno":1,"yoshioka":1},"hiroshima":{"asaminami":1,"daiwa":1,"etajima":1,"fuchu":1,"fukuyama":1,"hatsukaichi":1,"higashihiroshima":1,"hongo":1,"jinsekikogen":1,"kaita":1,"kui":1,"kumano":1,"kure":1,"mihara":1,"miyoshi":1,"naka":1,"onomichi":1,"osakikamijima":1,"otake":1,"saka":1,"sera":1,"seranishi":1,"shinichi":1,"shobara":1,"takehara":1},"hokkaido":{"abashiri":1,"abira":1,"aibetsu":1,"akabira":1,"akkeshi":1,"asahikawa":1,"ashibetsu":1,"ashoro":1,"assabu":1,"atsuma":1,"bibai":1,"biei":1,"bifuka":1,"bihoro":1,"biratori":1,"chippubetsu":1,"chitose":1,"date":1,"ebetsu":1,"embetsu":1,"eniwa":1,"erimo":1,"esan":1,"esashi":1,"fukagawa":1,"fukushima":1,"furano":1,"furubira":1,"haboro":1,"hakodate":1,"hamatonbetsu":1,"hidaka":1,"higashikagura":1,"higashikawa":1,"hiroo":1,"hokuryu":1,"hokuto":1,"honbetsu":1,"horokanai":1,"horonobe":1,"ikeda":1,"imakane":1,"ishikari":1,"iwamizawa":1,"iwanai":1,"kamifurano":1,"kamikawa":1,"kamishihoro":1,"kamisunagawa":1,"kamoenai":1,"kayabe":1,"kembuchi":1,"kikonai":1,"kimobetsu":1,"kitahiroshima":1,"kitami":1,"kiyosato":1,"koshimizu":1,"kunneppu":1,"kuriyama":1,"kuromatsunai":1,"kushiro":1,"kutchan":1,"kyowa":1,"mashike":1,"matsumae":1,"mikasa":1,"minamifurano":1,"mombetsu":1,"moseushi":1,"mukawa":1,"muroran":1,"naie":1,"nakagawa":1,"nakasatsunai":1,"nakatombetsu":1,"nanae":1,"nanporo":1,"nayoro":1,"nemuro":1,"niikappu":1,"niki":1,"nishiokoppe":1,"noboribetsu":1,"numata":1,"obihiro":1,"obira":1,"oketo":1,"okoppe":1,"otaru":1,"otobe":1,"otofuke":1,"otoineppu":1,"oumu":1,"ozora":1,"pippu":1,"rankoshi":1,"rebun":1,"rikubetsu":1,"rishiri":1,"rishirifuji":1,"saroma":1,"sarufutsu":1,"shakotan":1,"shari":1,"shibecha":1,"shibetsu":1,"shikabe":1,"shikaoi":1,"shimamaki":1,"shimizu":1,"shimokawa":1,"shinshinotsu":1,"shintoku":1,"shiranuka":1,"shiraoi":1,"shiriuchi":1,"sobetsu":1,"sunagawa":1,"taiki":1,"takasu":1,"takikawa":1,"takinoue":1,"teshikaga":1,"tobetsu":1,"tohma":1,"tomakomai":1,"tomari":1,"toya":1,"toyako":1,"toyotomi":1,"toyoura":1,"tsubetsu":1,"tsukigata":1,"urakawa":1,"urausu":1,"uryu":1,"utashinai":1,"wakkanai":1,"wassamu":1,"yakumo":1,"yoichi":1},"hyogo":{"aioi":1,"akashi":1,"ako":1,"amagasaki":1,"aogaki":1,"asago":1,"ashiya":1,"awaji":1,"fukusaki":1,"goshiki":1,"harima":1,"himeji":1,"ichikawa":1,"inagawa":1,"itami":1,"kakogawa":1,"kamigori":1,"kamikawa":1,"kasai":1,"kasuga":1,"kawanishi":1,"miki":1,"minamiawaji":1,"nishinomiya":1,"nishiwaki":1,"ono":1,"sanda":1,"sannan":1,"sasayama":1,"sayo":1,"shingu":1,"shinonsen":1,"shiso":1,"sumoto":1,"taishi":1,"taka":1,"takarazuka":1,"takasago":1,"takino":1,"tamba":1,"tatsuno":1,"toyooka":1,"yabu":1,"yashiro":1,"yoka":1,"yokawa":1},"ibaraki":{"ami":1,"asahi":1,"bando":1,"chikusei":1,"daigo":1,"fujishiro":1,"hitachi":1,"hitachinaka":1,"hitachiomiya":1,"hitachiota":1,"ibaraki":1,"ina":1,"inashiki":1,"itako":1,"iwama":1,"joso":1,"kamisu":1,"kasama":1,"kashima":1,"kasumigaura":1,"koga":1,"miho":1,"mito":1,"moriya":1,"naka":1,"namegata":1,"oarai":1,"ogawa":1,"omitama":1,"ryugasaki":1,"sakai":1,"sakuragawa":1,"shimodate":1,"shimotsuma":1,"shirosato":1,"sowa":1,"suifu":1,"takahagi":1,"tamatsukuri":1,"tokai":1,"tomobe":1,"tone":1,"toride":1,"tsuchiura":1,"tsukuba":1,"uchihara":1,"ushiku":1,"yachiyo":1,"yamagata":1,"yawara":1,"yuki":1},"ishikawa":{"anamizu":1,"hakui":1,"hakusan":1,"kaga":1,"kahoku":1,"kanazawa":1,"kawakita":1,"komatsu":1,"nakanoto":1,"nanao":1,"nomi":1,"nonoichi":1,"noto":1,"shika":1,"suzu":1,"tsubata":1,"tsurugi":1,"uchinada":1,"wajima":1},"iwate":{"fudai":1,"fujisawa":1,"hanamaki":1,"hiraizumi":1,"hirono":1,"ichinohe":1,"ichinoseki":1,"iwaizumi":1,"iwate":1,"joboji":1,"kamaishi":1,"kanegasaki":1,"karumai":1,"kawai":1,"kitakami":1,"kuji":1,"kunohe":1,"kuzumaki":1,"miyako":1,"mizusawa":1,"morioka":1,"ninohe":1,"noda":1,"ofunato":1,"oshu":1,"otsuchi":1,"rikuzentakata":1,"shiwa":1,"shizukuishi":1,"sumita":1,"tanohata":1,"tono":1,"yahaba":1,"yamada":1},"kagawa":{"ayagawa":1,"higashikagawa":1,"kanonji":1,"kotohira":1,"manno":1,"marugame":1,"mitoyo":1,"naoshima":1,"sanuki":1,"tadotsu":1,"takamatsu":1,"tonosho":1,"uchinomi":1,"utazu":1,"zentsuji":1},"kagoshima":{"akune":1,"amami":1,"hioki":1,"isa":1,"isen":1,"izumi":1,"kagoshima":1,"kanoya":1,"kawanabe":1,"kinko":1,"kouyama":1,"makurazaki":1,"matsumoto":1,"minamitane":1,"nakatane":1,"nishinoomote":1,"satsumasendai":1,"soo":1,"tarumizu":1,"yusui":1},"kanagawa":{"aikawa":1,"atsugi":1,"ayase":1,"chigasaki":1,"ebina":1,"fujisawa":1,"hadano":1,"hakone":1,"hiratsuka":1,"isehara":1,"kaisei":1,"kamakura":1,"kiyokawa":1,"matsuda":1,"minamiashigara":1,"miura":1,"nakai":1,"ninomiya":1,"odawara":1,"oi":1,"oiso":1,"sagamihara":1,"samukawa":1,"tsukui":1,"yamakita":1,"yamato":1,"yokosuka":1,"yugawara":1,"zama":1,"zushi":1},"kochi":{"aki":1,"geisei":1,"hidaka":1,"higashitsuno":1,"ino":1,"kagami":1,"kami":1,"kitagawa":1,"kochi":1,"mihara":1,"motoyama":1,"muroto":1,"nahari":1,"nakamura":1,"nankoku":1,"nishitosa":1,"niyodogawa":1,"ochi":1,"okawa":1,"otoyo":1,"otsuki":1,"sakawa":1,"sukumo":1,"susaki":1,"tosa":1,"tosashimizu":1,"toyo":1,"tsuno":1,"umaji":1,"yasuda":1,"yusuhara":1},"kumamoto":{"amakusa":1,"arao":1,"aso":1,"choyo":1,"gyokuto":1,"kamiamakusa":1,"kikuchi":1,"kumamoto":1,"mashiki":1,"mifune":1,"minamata":1,"minamioguni":1,"nagasu":1,"nishihara":1,"oguni":1,"ozu":1,"sumoto":1,"takamori":1,"uki":1,"uto":1,"yamaga":1,"yamato":1,"yatsushiro":1},"kyoto":{"ayabe":1,"fukuchiyama":1,"higashiyama":1,"ide":1,"ine":1,"joyo":1,"kameoka":1,"kamo":1,"kita":1,"kizu":1,"kumiyama":1,"kyotamba":1,"kyotanabe":1,"kyotango":1,"maizuru":1,"minami":1,"minamiyamashiro":1,"miyazu":1,"muko":1,"nagaokakyo":1,"nakagyo":1,"nantan":1,"oyamazaki":1,"sakyo":1,"seika":1,"tanabe":1,"uji":1,"ujitawara":1,"wazuka":1,"yamashina":1,"yawata":1},"mie":{"asahi":1,"inabe":1,"ise":1,"kameyama":1,"kawagoe":1,"kiho":1,"kisosaki":1,"kiwa":1,"komono":1,"kumano":1,"kuwana":1,"matsusaka":1,"meiwa":1,"mihama":1,"minamiise":1,"misugi":1,"miyama":1,"nabari":1,"shima":1,"suzuka":1,"tado":1,"taiki":1,"taki":1,"tamaki":1,"toba":1,"tsu":1,"udono":1,"ureshino":1,"watarai":1,"yokkaichi":1},"miyagi":{"furukawa":1,"higashimatsushima":1,"ishinomaki":1,"iwanuma":1,"kakuda":1,"kami":1,"kawasaki":1,"marumori":1,"matsushima":1,"minamisanriku":1,"misato":1,"murata":1,"natori":1,"ogawara":1,"ohira":1,"onagawa":1,"osaki":1,"rifu":1,"semine":1,"shibata":1,"shichikashuku":1,"shikama":1,"shiogama":1,"shiroishi":1,"tagajo":1,"taiwa":1,"tome":1,"tomiya":1,"wakuya":1,"watari":1,"yamamoto":1,"zao":1},"miyazaki":{"aya":1,"ebino":1,"gokase":1,"hyuga":1,"kadogawa":1,"kawaminami":1,"kijo":1,"kitagawa":1,"kitakata":1,"kitaura":1,"kobayashi":1,"kunitomi":1,"kushima":1,"mimata":1,"miyakonojo":1,"miyazaki":1,"morotsuka":1,"nichinan":1,"nishimera":1,"nobeoka":1,"saito":1,"shiiba":1,"shintomi":1,"takaharu":1,"takanabe":1,"takazaki":1,"tsuno":1},"nagano":{"achi":1,"agematsu":1,"anan":1,"aoki":1,"asahi":1,"azumino":1,"chikuhoku":1,"chikuma":1,"chino":1,"fujimi":1,"hakuba":1,"hara":1,"hiraya":1,"iida":1,"iijima":1,"iiyama":1,"iizuna":1,"ikeda":1,"ikusaka":1,"ina":1,"karuizawa":1,"kawakami":1,"kiso":1,"kisofukushima":1,"kitaaiki":1,"komagane":1,"komoro":1,"matsukawa":1,"matsumoto":1,"miasa":1,"minamiaiki":1,"minamimaki":1,"minamiminowa":1,"minowa":1,"miyada":1,"miyota":1,"mochizuki":1,"nagano":1,"nagawa":1,"nagiso":1,"nakagawa":1,"nakano":1,"nozawaonsen":1,"obuse":1,"ogawa":1,"okaya":1,"omachi":1,"omi":1,"ookuwa":1,"ooshika":1,"otaki":1,"otari":1,"sakae":1,"sakaki":1,"saku":1,"sakuho":1,"shimosuwa":1,"shinanomachi":1,"shiojiri":1,"suwa":1,"suzaka":1,"takagi":1,"takamori":1,"takayama":1,"tateshina":1,"tatsuno":1,"togakushi":1,"togura":1,"tomi":1,"ueda":1,"wada":1,"yamagata":1,"yamanouchi":1,"yasaka":1,"yasuoka":1},"nagasaki":{"chijiwa":1,"futsu":1,"goto":1,"hasami":1,"hirado":1,"iki":1,"isahaya":1,"kawatana":1,"kuchinotsu":1,"matsuura":1,"nagasaki":1,"obama":1,"omura":1,"oseto":1,"saikai":1,"sasebo":1,"seihi":1,"shimabara":1,"shinkamigoto":1,"togitsu":1,"tsushima":1,"unzen":1},"nara":{"ando":1,"gose":1,"heguri":1,"higashiyoshino":1,"ikaruga":1,"ikoma":1,"kamikitayama":1,"kanmaki":1,"kashiba":1,"kashihara":1,"katsuragi":1,"kawai":1,"kawakami":1,"kawanishi":1,"koryo":1,"kurotaki":1,"mitsue":1,"miyake":1,"nara":1,"nosegawa":1,"oji":1,"ouda":1,"oyodo":1,"sakurai":1,"sango":1,"shimoichi":1,"shimokitayama":1,"shinjo":1,"soni":1,"takatori":1,"tawaramoto":1,"tenkawa":1,"tenri":1,"uda":1,"yamatokoriyama":1,"yamatotakada":1,"yamazoe":1,"yoshino":1},"niigata":{"aga":1,"agano":1,"gosen":1,"itoigawa":1,"izumozaki":1,"joetsu":1,"kamo":1,"kariwa":1,"kashiwazaki":1,"minamiuonuma":1,"mitsuke":1,"muika":1,"murakami":1,"myoko":1,"nagaoka":1,"niigata":1,"ojiya":1,"omi":1,"sado":1,"sanjo":1,"seiro":1,"seirou":1,"sekikawa":1,"shibata":1,"tagami":1,"tainai":1,"tochio":1,"tokamachi":1,"tsubame":1,"tsunan":1,"uonuma":1,"yahiko":1,"yoita":1,"yuzawa":1},"oita":{"beppu":1,"bungoono":1,"bungotakada":1,"hasama":1,"hiji":1,"himeshima":1,"hita":1,"kamitsue":1,"kokonoe":1,"kuju":1,"kunisaki":1,"kusu":1,"oita":1,"saiki":1,"taketa":1,"tsukumi":1,"usa":1,"usuki":1,"yufu":1},"okayama":{"akaiwa":1,"asakuchi":1,"bizen":1,"hayashima":1,"ibara":1,"kagamino":1,"kasaoka":1,"kibichuo":1,"kumenan":1,"kurashiki":1,"maniwa":1,"misaki":1,"nagi":1,"niimi":1,"nishiawakura":1,"okayama":1,"satosho":1,"setouchi":1,"shinjo":1,"shoo":1,"soja":1,"takahashi":1,"tamano":1,"tsuyama":1,"wake":1,"yakage":1},"okinawa":{"aguni":1,"ginowan":1,"ginoza":1,"gushikami":1,"haebaru":1,"higashi":1,"hirara":1,"iheya":1,"ishigaki":1,"ishikawa":1,"itoman":1,"izena":1,"kadena":1,"kin":1,"kitadaito":1,"kitanakagusuku":1,"kumejima":1,"kunigami":1,"minamidaito":1,"motobu":1,"nago":1,"naha":1,"nakagusuku":1,"nakijin":1,"nanjo":1,"nishihara":1,"ogimi":1,"okinawa":1,"onna":1,"shimoji":1,"taketomi":1,"tarama":1,"tokashiki":1,"tomigusuku":1,"tonaki":1,"urasoe":1,"uruma":1,"yaese":1,"yomitan":1,"yonabaru":1,"yonaguni":1,"zamami":1},"osaka":{"abeno":1,"chihayaakasaka":1,"chuo":1,"daito":1,"fujiidera":1,"habikino":1,"hannan":1,"higashiosaka":1,"higashisumiyoshi":1,"higashiyodogawa":1,"hirakata":1,"ibaraki":1,"ikeda":1,"izumi":1,"izumiotsu":1,"izumisano":1,"kadoma":1,"kaizuka":1,"kanan":1,"kashiwara":1,"katano":1,"kawachinagano":1,"kishiwada":1,"kita":1,"kumatori":1,"matsubara":1,"minato":1,"minoh":1,"misaki":1,"moriguchi":1,"neyagawa":1,"nishi":1,"nose":1,"osakasayama":1,"sakai":1,"sayama":1,"sennan":1,"settsu":1,"shijonawate":1,"shimamoto":1,"suita":1,"tadaoka":1,"taishi":1,"tajiri":1,"takaishi":1,"takatsuki":1,"tondabayashi":1,"toyonaka":1,"toyono":1,"yao":1},"saga":{"ariake":1,"arita":1,"fukudomi":1,"genkai":1,"hamatama":1,"hizen":1,"imari":1,"kamimine":1,"kanzaki":1,"karatsu":1,"kashima":1,"kitagata":1,"kitahata":1,"kiyama":1,"kouhoku":1,"kyuragi":1,"nishiarita":1,"ogi":1,"omachi":1,"ouchi":1,"saga":1,"shiroishi":1,"taku":1,"tara":1,"tosu":1,"yoshinogari":1},"saitama":{"arakawa":1,"asaka":1,"chichibu":1,"fujimi":1,"fujimino":1,"fukaya":1,"hanno":1,"hanyu":1,"hasuda":1,"hatogaya":1,"hatoyama":1,"hidaka":1,"higashichichibu":1,"higashimatsuyama":1,"honjo":1,"ina":1,"iruma":1,"iwatsuki":1,"kamiizumi":1,"kamikawa":1,"kamisato":1,"kasukabe":1,"kawagoe":1,"kawaguchi":1,"kawajima":1,"kazo":1,"kitamoto":1,"koshigaya":1,"kounosu":1,"kuki":1,"kumagaya":1,"matsubushi":1,"minano":1,"misato":1,"miyashiro":1,"miyoshi":1,"moroyama":1,"nagatoro":1,"namegawa":1,"niiza":1,"ogano":1,"ogawa":1,"ogose":1,"okegawa":1,"omiya":1,"otaki":1,"ranzan":1,"ryokami":1,"saitama":1,"sakado":1,"satte":1,"sayama":1,"shiki":1,"shiraoka":1,"soka":1,"sugito":1,"toda":1,"tokigawa":1,"tokorozawa":1,"tsurugashima":1,"urawa":1,"warabi":1,"yashio":1,"yokoze":1,"yono":1,"yorii":1,"yoshida":1,"yoshikawa":1,"yoshimi":1},"shiga":{"aisho":1,"gamo":1,"higashiomi":1,"hikone":1,"koka":1,"konan":1,"kosei":1,"koto":1,"kusatsu":1,"maibara":1,"moriyama":1,"nagahama":1,"nishiazai":1,"notogawa":1,"omihachiman":1,"otsu":1,"ritto":1,"ryuoh":1,"takashima":1,"takatsuki":1,"torahime":1,"toyosato":1,"yasu":1},"shimane":{"akagi":1,"ama":1,"gotsu":1,"hamada":1,"higashiizumo":1,"hikawa":1,"hikimi":1,"izumo":1,"kakinoki":1,"masuda":1,"matsue":1,"misato":1,"nishinoshima":1,"ohda":1,"okinoshima":1,"okuizumo":1,"shimane":1,"tamayu":1,"tsuwano":1,"unnan":1,"yakumo":1,"yasugi":1,"yatsuka":1},"shizuoka":{"arai":1,"atami":1,"fuji":1,"fujieda":1,"fujikawa":1,"fujinomiya":1,"fukuroi":1,"gotemba":1,"haibara":1,"hamamatsu":1,"higashiizu":1,"ito":1,"iwata":1,"izu":1,"izunokuni":1,"kakegawa":1,"kannami":1,"kawanehon":1,"kawazu":1,"kikugawa":1,"kosai":1,"makinohara":1,"matsuzaki":1,"minamiizu":1,"mishima":1,"morimachi":1,"nishiizu":1,"numazu":1,"omaezaki":1,"shimada":1,"shimizu":1,"shimoda":1,"shizuoka":1,"susono":1,"yaizu":1,"yoshida":1},"tochigi":{"ashikaga":1,"bato":1,"haga":1,"ichikai":1,"iwafune":1,"kaminokawa":1,"kanuma":1,"karasuyama":1,"kuroiso":1,"mashiko":1,"mibu":1,"moka":1,"motegi":1,"nasu":1,"nasushiobara":1,"nikko":1,"nishikata":1,"nogi":1,"ohira":1,"ohtawara":1,"oyama":1,"sakura":1,"sano":1,"shimotsuke":1,"shioya":1,"takanezawa":1,"tochigi":1,"tsuga":1,"ujiie":1,"utsunomiya":1,"yaita":1},"tokushima":{"aizumi":1,"anan":1,"ichiba":1,"itano":1,"kainan":1,"komatsushima":1,"matsushige":1,"mima":1,"minami":1,"miyoshi":1,"mugi":1,"nakagawa":1,"naruto":1,"sanagochi":1,"shishikui":1,"tokushima":1,"wajiki":1},"tokyo":{"adachi":1,"akiruno":1,"akishima":1,"aogashima":1,"arakawa":1,"bunkyo":1,"chiyoda":1,"chofu":1,"chuo":1,"edogawa":1,"fuchu":1,"fussa":1,"hachijo":1,"hachioji":1,"hamura":1,"higashikurume":1,"higashimurayama":1,"higashiyamato":1,"hino":1,"hinode":1,"hinohara":1,"inagi":1,"itabashi":1,"katsushika":1,"kita":1,"kiyose":1,"kodaira":1,"koganei":1,"kokubunji":1,"komae":1,"koto":1,"kouzushima":1,"kunitachi":1,"machida":1,"meguro":1,"minato":1,"mitaka":1,"mizuho":1,"musashimurayama":1,"musashino":1,"nakano":1,"nerima":1,"ogasawara":1,"okutama":1,"ome":1,"oshima":1,"ota":1,"setagaya":1,"shibuya":1,"shinagawa":1,"shinjuku":1,"suginami":1,"sumida":1,"tachikawa":1,"taito":1,"tama":1,"toshima":1},"tottori":{"chizu":1,"hino":1,"kawahara":1,"koge":1,"kotoura":1,"misasa":1,"nanbu":1,"nichinan":1,"sakaiminato":1,"tottori":1,"wakasa":1,"yazu":1,"yonago":1},"toyama":{"asahi":1,"fuchu":1,"fukumitsu":1,"funahashi":1,"himi":1,"imizu":1,"inami":1,"johana":1,"kamiichi":1,"kurobe":1,"nakaniikawa":1,"namerikawa":1,"nanto":1,"nyuzen":1,"oyabe":1,"taira":1,"takaoka":1,"tateyama":1,"toga":1,"tonami":1,"toyama":1,"unazuki":1,"uozu":1,"yamada":1},"wakayama":{"arida":1,"aridagawa":1,"gobo":1,"hashimoto":1,"hidaka":1,"hirogawa":1,"inami":1,"iwade":1,"kainan":1,"kamitonda":1,"katsuragi":1,"kimino":1,"kinokawa":1,"kitayama":1,"koya":1,"koza":1,"kozagawa":1,"kudoyama":1,"kushimoto":1,"mihama":1,"misato":1,"nachikatsuura":1,"shingu":1,"shirahama":1,"taiji":1,"tanabe":1,"wakayama":1,"yuasa":1,"yura":1},"yamagata":{"asahi":1,"funagata":1,"higashine":1,"iide":1,"kahoku":1,"kaminoyama":1,"kaneyama":1,"kawanishi":1,"mamurogawa":1,"mikawa":1,"murayama":1,"nagai":1,"nakayama":1,"nanyo":1,"nishikawa":1,"obanazawa":1,"oe":1,"oguni":1,"ohkura":1,"oishida":1,"sagae":1,"sakata":1,"sakegawa":1,"shinjo":1,"shirataka":1,"shonai":1,"takahata":1,"tendo":1,"tozawa":1,"tsuruoka":1,"yamagata":1,"yamanobe":1,"yonezawa":1,"yuza":1},"yamaguchi":{"abu":1,"hagi":1,"hikari":1,"hofu":1,"iwakuni":1,"kudamatsu":1,"mitou":1,"nagato":1,"oshima":1,"shimonoseki":1,"shunan":1,"tabuse":1,"tokuyama":1,"toyota":1,"ube":1,"yuu":1},"yamanashi":{"chuo":1,"doshi":1,"fuefuki":1,"fujikawa":1,"fujikawaguchiko":1,"fujiyoshida":1,"hayakawa":1,"hokuto":1,"ichikawamisato":1,"kai":1,"kofu":1,"koshu":1,"kosuge":1,"minami-alps":1,"minobu":1,"nakamichi":1,"nanbu":1,"narusawa":1,"nirasaki":1,"nishikatsura":1,"oshino":1,"otsuki":1,"showa":1,"tabayama":1,"tsuru":1,"uenohara":1,"yamanakako":1,"yamanashi":1},"xn--4pvxs":1,"xn--vgu402c":1,"xn--c3s14m":1,"xn--f6qx53a":1,"xn--8pvr4u":1,"xn--uist22h":1,"xn--djrs72d6uy":1,"xn--mkru45i":1,"xn--0trq7p7nn":1,"xn--8ltr62k":1,"xn--2m4a15e":1,"xn--efvn9s":1,"xn--32vp30h":1,"xn--4it797k":1,"xn--1lqs71d":1,"xn--5rtp49c":1,"xn--5js045d":1,"xn--ehqz56n":1,"xn--1lqs03n":1,"xn--qqqt11m":1,"xn--kbrq7o":1,"xn--pssu33l":1,"xn--ntsq17g":1,"xn--uisz3g":1,"xn--6btw5a":1,"xn--1ctwo":1,"xn--6orx2r":1,"xn--rht61e":1,"xn--rht27z":1,"xn--djty4k":1,"xn--nit225k":1,"xn--rht3d":1,"xn--klty5x":1,"xn--kltx9a":1,"xn--kltp7d":1,"xn--uuwu58a":1,"xn--zbx025d":1,"xn--ntso0iqx3a":1,"xn--elqq16h":1,"xn--4it168d":1,"xn--klt787d":1,"xn--rny31h":1,"xn--7t0a264c":1,"xn--5rtq34k":1,"xn--k7yn95e":1,"xn--tor131o":1,"xn--d5qv7z876c":1,"kawasaki":{"*":1,"city":2},"kitakyushu":{"*":1,"city":2},"kobe":{"*":1,"city":2},"nagoya":{"*":1,"city":2},"sapporo":{"*":1,"city":2},"sendai":{"*":1,"city":2},"yokohama":{"*":1,"city":2},"buyshop":1,"fashionstore":1,"handcrafted":1,"kawaiishop":1,"supersale":1,"theshop":1,"usercontent":1,"angry":1,"babyblue":1,"babymilk":1,"backdrop":1,"bambina":1,"bitter":1,"blush":1,"boo":1,"boy":1,"boyfriend":1,"but":1,"candypop":1,"capoo":1,"catfood":1,"cheap":1,"chicappa":1,"chillout":1,"chips":1,"chowder":1,"chu":1,"ciao":1,"cocotte":1,"coolblog":1,"cranky":1,"cutegirl":1,"daa":1,"deca":1,"deci":1,"digick":1,"egoism":1,"fakefur":1,"fem":1,"flier":1,"floppy":1,"fool":1,"frenchkiss":1,"girlfriend":1,"girly":1,"gloomy":1,"gonna":1,"greater":1,"hacca":1,"heavy":1,"her":1,"hiho":1,"hippy":1,"holy":1,"hungry":1,"icurus":1,"itigo":1,"jellybean":1,"kikirara":1,"kill":1,"kilo":1,"kuron":1,"littlestar":1,"lolipopmc":1,"lolitapunk":1,"lomo":1,"lovepop":1,"lovesick":1,"main":1,"mods":1,"mond":1,"mongolian":1,"moo":1,"namaste":1,"nikita":1,"nobushi":1,"noor":1,"oops":1,"parallel":1,"parasite":1,"pecori":1,"peewee":1,"penne":1,"pepper":1,"perma":1,"pigboat":1,"pinoko":1,"punyu":1,"pupu":1,"pussycat":1,"pya":1,"raindrop":1,"readymade":1,"sadist":1,"schoolbus":1,"secret":1,"staba":1,"stripper":1,"sub":1,"sunnyday":1,"thick":1,"tonkotsu":1,"under":1,"upper":1,"velvet":1,"verse":1,"versus":1,"vivian":1,"watson":1,"weblike":1,"whitesnow":1,"zombie":1,"blogspot":1},"ke":{"ac":1,"co":{"blogspot":1},"go":1,"info":1,"me":1,"mobi":1,"ne":1,"or":1,"sc":1},"kg":{"org":1,"net":1,"com":1,"edu":1,"gov":1,"mil":1,"blog":1,"io":1,"jp":1,"tv":1,"uk":1,"us":1},"kh":{"*":1},"ki":{"edu":1,"biz":1,"net":1,"org":1,"gov":1,"info":1,"com":1},"km":{"org":1,"nom":1,"gov":1,"prd":1,"tm":1,"edu":1,"mil":1,"ass":1,"com":1,"coop":1,"asso":1,"presse":1,"medecin":1,"notaires":1,"pharmaciens":1,"veterinaire":1,"gouv":1},"kn":{"net":1,"org":1,"edu":1,"gov":1},"kp":{"com":1,"edu":1,"gov":1,"org":1,"rep":1,"tra":1},"kr":{"ac":1,"co":1,"es":1,"go":1,"hs":1,"kg":1,"mil":1,"ms":1,"ne":1,"or":1,"pe":1,"re":1,"sc":1,"busan":1,"chungbuk":1,"chungnam":1,"daegu":1,"daejeon":1,"gangwon":1,"gwangju":1,"gyeongbuk":1,"gyeonggi":1,"gyeongnam":1,"incheon":1,"jeju":1,"jeonbuk":1,"jeonnam":1,"seoul":1,"ulsan":1,"blogspot":1},"kw":{"com":1,"edu":1,"emb":1,"gov":1,"ind":1,"net":1,"org":1},"ky":{"com":1,"edu":1,"net":1,"org":1},"kz":{"org":1,"edu":1,"net":1,"gov":1,"mil":1,"com":1,"jcloud":1,"kazteleport":{"upaas":1}},"la":{"int":1,"net":1,"info":1,"edu":1,"gov":1,"per":1,"com":1,"org":1,"bnr":1,"c":1},"lb":{"com":1,"edu":1,"gov":1,"net":1,"org":1},"lc":{"com":1,"net":1,"co":1,"org":1,"edu":1,"gov":1,"oy":1},"li":{"blogspot":1,"caa":1},"lk":{"gov":1,"sch":1,"net":1,"int":1,"com":1,"org":1,"edu":1,"ngo":1,"soc":1,"web":1,"ltd":1,"assn":1,"grp":1,"hotel":1,"ac":1},"lr":{"com":1,"edu":1,"gov":1,"org":1,"net":1},"ls":{"ac":1,"biz":1,"co":1,"edu":1,"gov":1,"info":1,"net":1,"org":1,"sc":1,"de":1},"lt":{"gov":1,"blogspot":1},"lu":{"blogspot":1},"lv":{"com":1,"edu":1,"gov":1,"org":1,"mil":1,"id":1,"net":1,"asn":1,"conf":1},"ly":{"com":1,"net":1,"gov":1,"plc":1,"edu":1,"sch":1,"med":1,"org":1,"id":1},"ma":{"co":1,"net":1,"gov":1,"org":1,"ac":1,"press":1},"mc":{"tm":1,"asso":1},"md":{"blogspot":1,"at":1,"de":1,"jp":1,"to":1},"me":{"co":1,"net":1,"org":1,"edu":1,"ac":1,"gov":1,"its":1,"priv":1,"c66":1,"daplie":{"localhost":1},"edgestack":1,"filegear":1,"filegear-au":1,"filegear-de":1,"filegear-gb":1,"filegear-ie":1,"filegear-jp":1,"filegear-sg":1,"glitch":1,"ravendb":1,"lohmus":1,"barsy":1,"mcpe":1,"mcdir":1,"soundcast":1,"tcp4":1,"brasilia":1,"ddns":1,"dnsfor":1,"hopto":1,"loginto":1,"noip":1,"webhop":1,"vp4":1,"diskstation":1,"dscloud":1,"i234":1,"myds":1,"synology":1,"tbits":1,"transip":{"site":1},"wedeploy":1,"yombo":1,"nohost":1},"mg":{"org":1,"nom":1,"gov":1,"prd":1,"tm":1,"edu":1,"mil":1,"com":1,"co":1},"mk":{"com":1,"org":1,"net":1,"edu":1,"gov":1,"inf":1,"name":1,"blogspot":1},"ml":{"com":1,"edu":1,"gouv":1,"gov":1,"net":1,"org":1,"presse":1},"mm":{"*":1},"mn":{"gov":1,"edu":1,"org":1,"nyc":1},"mo":{"com":1,"net":1,"org":1,"edu":1,"gov":1},"mobi":{"barsy":1,"dscloud":1},"mp":{"ju":1},"mr":{"gov":1,"blogspot":1},"ms":{"com":1,"edu":1,"gov":1,"net":1,"org":1,"lab":1,"minisite":1},"mt":{"com":{"blogspot":1},"edu":1,"net":1,"org":1},"mu":{"com":1,"net":1,"org":1,"gov":1,"ac":1,"co":1,"or":1},"museum":{"academy":1,"agriculture":1,"air":1,"airguard":1,"alabama":1,"alaska":1,"amber":1,"ambulance":1,"american":1,"americana":1,"americanantiques":1,"americanart":1,"amsterdam":1,"and":1,"annefrank":1,"anthro":1,"anthropology":1,"antiques":1,"aquarium":1,"arboretum":1,"archaeological":1,"archaeology":1,"architecture":1,"art":1,"artanddesign":1,"artcenter":1,"artdeco":1,"arteducation":1,"artgallery":1,"arts":1,"artsandcrafts":1,"asmatart":1,"assassination":1,"assisi":1,"association":1,"astronomy":1,"atlanta":1,"austin":1,"australia":1,"automotive":1,"aviation":1,"axis":1,"badajoz":1,"baghdad":1,"bahn":1,"bale":1,"baltimore":1,"barcelona":1,"baseball":1,"basel":1,"baths":1,"bauern":1,"beauxarts":1,"beeldengeluid":1,"bellevue":1,"bergbau":1,"berkeley":1,"berlin":1,"bern":1,"bible":1,"bilbao":1,"bill":1,"birdart":1,"birthplace":1,"bonn":1,"boston":1,"botanical":1,"botanicalgarden":1,"botanicgarden":1,"botany":1,"brandywinevalley":1,"brasil":1,"bristol":1,"british":1,"britishcolumbia":1,"broadcast":1,"brunel":1,"brussel":1,"brussels":1,"bruxelles":1,"building":1,"burghof":1,"bus":1,"bushey":1,"cadaques":1,"california":1,"cambridge":1,"can":1,"canada":1,"capebreton":1,"carrier":1,"cartoonart":1,"casadelamoneda":1,"castle":1,"castres":1,"celtic":1,"center":1,"chattanooga":1,"cheltenham":1,"chesapeakebay":1,"chicago":1,"children":1,"childrens":1,"childrensgarden":1,"chiropractic":1,"chocolate":1,"christiansburg":1,"cincinnati":1,"cinema":1,"circus":1,"civilisation":1,"civilization":1,"civilwar":1,"clinton":1,"clock":1,"coal":1,"coastaldefence":1,"cody":1,"coldwar":1,"collection":1,"colonialwilliamsburg":1,"coloradoplateau":1,"columbia":1,"columbus":1,"communication":1,"communications":1,"community":1,"computer":1,"computerhistory":1,"xn--comunicaes-v6a2o":1,"contemporary":1,"contemporaryart":1,"convent":1,"copenhagen":1,"corporation":1,"xn--correios-e-telecomunicaes-ghc29a":1,"corvette":1,"costume":1,"countryestate":1,"county":1,"crafts":1,"cranbrook":1,"creation":1,"cultural":1,"culturalcenter":1,"culture":1,"cyber":1,"cymru":1,"dali":1,"dallas":1,"database":1,"ddr":1,"decorativearts":1,"delaware":1,"delmenhorst":1,"denmark":1,"depot":1,"design":1,"detroit":1,"dinosaur":1,"discovery":1,"dolls":1,"donostia":1,"durham":1,"eastafrica":1,"eastcoast":1,"education":1,"educational":1,"egyptian":1,"eisenbahn":1,"elburg":1,"elvendrell":1,"embroidery":1,"encyclopedic":1,"england":1,"entomology":1,"environment":1,"environmentalconservation":1,"epilepsy":1,"essex":1,"estate":1,"ethnology":1,"exeter":1,"exhibition":1,"family":1,"farm":1,"farmequipment":1,"farmers":1,"farmstead":1,"field":1,"figueres":1,"filatelia":1,"film":1,"fineart":1,"finearts":1,"finland":1,"flanders":1,"florida":1,"force":1,"fortmissoula":1,"fortworth":1,"foundation":1,"francaise":1,"frankfurt":1,"franziskaner":1,"freemasonry":1,"freiburg":1,"fribourg":1,"frog":1,"fundacio":1,"furniture":1,"gallery":1,"garden":1,"gateway":1,"geelvinck":1,"gemological":1,"geology":1,"georgia":1,"giessen":1,"glas":1,"glass":1,"gorge":1,"grandrapids":1,"graz":1,"guernsey":1,"halloffame":1,"hamburg":1,"handson":1,"harvestcelebration":1,"hawaii":1,"health":1,"heimatunduhren":1,"hellas":1,"helsinki":1,"hembygdsforbund":1,"heritage":1,"histoire":1,"historical":1,"historicalsociety":1,"historichouses":1,"historisch":1,"historisches":1,"history":1,"historyofscience":1,"horology":1,"house":1,"humanities":1,"illustration":1,"imageandsound":1,"indian":1,"indiana":1,"indianapolis":1,"indianmarket":1,"intelligence":1,"interactive":1,"iraq":1,"iron":1,"isleofman":1,"jamison":1,"jefferson":1,"jerusalem":1,"jewelry":1,"jewish":1,"jewishart":1,"jfk":1,"journalism":1,"judaica":1,"judygarland":1,"juedisches":1,"juif":1,"karate":1,"karikatur":1,"kids":1,"koebenhavn":1,"koeln":1,"kunst":1,"kunstsammlung":1,"kunstunddesign":1,"labor":1,"labour":1,"lajolla":1,"lancashire":1,"landes":1,"lans":1,"xn--lns-qla":1,"larsson":1,"lewismiller":1,"lincoln":1,"linz":1,"living":1,"livinghistory":1,"localhistory":1,"london":1,"losangeles":1,"louvre":1,"loyalist":1,"lucerne":1,"luxembourg":1,"luzern":1,"mad":1,"madrid":1,"mallorca":1,"manchester":1,"mansion":1,"mansions":1,"manx":1,"marburg":1,"maritime":1,"maritimo":1,"maryland":1,"marylhurst":1,"media":1,"medical":1,"medizinhistorisches":1,"meeres":1,"memorial":1,"mesaverde":1,"michigan":1,"midatlantic":1,"military":1,"mill":1,"miners":1,"mining":1,"minnesota":1,"missile":1,"missoula":1,"modern":1,"moma":1,"money":1,"monmouth":1,"monticello":1,"montreal":1,"moscow":1,"motorcycle":1,"muenchen":1,"muenster":1,"mulhouse":1,"muncie":1,"museet":1,"museumcenter":1,"museumvereniging":1,"music":1,"national":1,"nationalfirearms":1,"nationalheritage":1,"nativeamerican":1,"naturalhistory":1,"naturalhistorymuseum":1,"naturalsciences":1,"nature":1,"naturhistorisches":1,"natuurwetenschappen":1,"naumburg":1,"naval":1,"nebraska":1,"neues":1,"newhampshire":1,"newjersey":1,"newmexico":1,"newport":1,"newspaper":1,"newyork":1,"niepce":1,"norfolk":1,"north":1,"nrw":1,"nyc":1,"nyny":1,"oceanographic":1,"oceanographique":1,"omaha":1,"online":1,"ontario":1,"openair":1,"oregon":1,"oregontrail":1,"otago":1,"oxford":1,"pacific":1,"paderborn":1,"palace":1,"paleo":1,"palmsprings":1,"panama":1,"paris":1,"pasadena":1,"pharmacy":1,"philadelphia":1,"philadelphiaarea":1,"philately":1,"phoenix":1,"photography":1,"pilots":1,"pittsburgh":1,"planetarium":1,"plantation":1,"plants":1,"plaza":1,"portal":1,"portland":1,"portlligat":1,"posts-and-telecommunications":1,"preservation":1,"presidio":1,"press":1,"project":1,"public":1,"pubol":1,"quebec":1,"railroad":1,"railway":1,"research":1,"resistance":1,"riodejaneiro":1,"rochester":1,"rockart":1,"roma":1,"russia":1,"saintlouis":1,"salem":1,"salvadordali":1,"salzburg":1,"sandiego":1,"sanfrancisco":1,"santabarbara":1,"santacruz":1,"santafe":1,"saskatchewan":1,"satx":1,"savannahga":1,"schlesisches":1,"schoenbrunn":1,"schokoladen":1,"school":1,"schweiz":1,"science":1,"scienceandhistory":1,"scienceandindustry":1,"sciencecenter":1,"sciencecenters":1,"science-fiction":1,"sciencehistory":1,"sciences":1,"sciencesnaturelles":1,"scotland":1,"seaport":1,"settlement":1,"settlers":1,"shell":1,"sherbrooke":1,"sibenik":1,"silk":1,"ski":1,"skole":1,"society":1,"sologne":1,"soundandvision":1,"southcarolina":1,"southwest":1,"space":1,"spy":1,"square":1,"stadt":1,"stalbans":1,"starnberg":1,"state":1,"stateofdelaware":1,"station":1,"steam":1,"steiermark":1,"stjohn":1,"stockholm":1,"stpetersburg":1,"stuttgart":1,"suisse":1,"surgeonshall":1,"surrey":1,"svizzera":1,"sweden":1,"sydney":1,"tank":1,"tcm":1,"technology":1,"telekommunikation":1,"television":1,"texas":1,"textile":1,"theater":1,"time":1,"timekeeping":1,"topology":1,"torino":1,"touch":1,"town":1,"transport":1,"tree":1,"trolley":1,"trust":1,"trustee":1,"uhren":1,"ulm":1,"undersea":1,"university":1,"usa":1,"usantiques":1,"usarts":1,"uscountryestate":1,"usculture":1,"usdecorativearts":1,"usgarden":1,"ushistory":1,"ushuaia":1,"uslivinghistory":1,"utah":1,"uvic":1,"valley":1,"vantaa":1,"versailles":1,"viking":1,"village":1,"virginia":1,"virtual":1,"virtuel":1,"vlaanderen":1,"volkenkunde":1,"wales":1,"wallonie":1,"war":1,"washingtondc":1,"watchandclock":1,"watch-and-clock":1,"western":1,"westfalen":1,"whaling":1,"wildlife":1,"williamsburg":1,"windmill":1,"workshop":1,"york":1,"yorkshire":1,"yosemite":1,"youth":1,"zoological":1,"zoology":1,"xn--9dbhblg6di":1,"xn--h1aegh":1},"mv":{"aero":1,"biz":1,"com":1,"coop":1,"edu":1,"gov":1,"info":1,"int":1,"mil":1,"museum":1,"name":1,"net":1,"org":1,"pro":1},"mw":{"ac":1,"biz":1,"co":1,"com":1,"coop":1,"edu":1,"gov":1,"int":1,"museum":1,"net":1,"org":1},"mx":{"com":1,"org":1,"gob":1,"edu":1,"net":1,"blogspot":1},"my":{"biz":1,"com":1,"edu":1,"gov":1,"mil":1,"name":1,"net":1,"org":1,"blogspot":1},"mz":{"ac":1,"adv":1,"co":1,"edu":1,"gov":1,"mil":1,"net":1,"org":1},"na":{"info":1,"pro":1,"name":1,"school":1,"or":1,"dr":1,"us":1,"mx":1,"ca":1,"in":1,"cc":1,"tv":1,"ws":1,"mobi":1,"co":1,"com":1,"org":1},"name":{"her":{"forgot":1},"his":{"forgot":1}},"nc":{"asso":1,"nom":1},"net":{"adobeaemcloud":1,"alwaysdata":1,"cloudfront":1,"t3l3p0rt":1,"appudo":1,"atlassian-dev":{"":1,"prod":{"cdn":1}},"myfritz":1,"onavstack":1,"shopselect":1,"blackbaudcdn":1,"boomla":1,"bplaced":1,"square7":1,"gb":1,"hu":1,"jp":1,"se":1,"uk":1,"in":1,"clickrising":1,"cloudaccess":1,"cdn77-ssl":1,"cdn77":{"r":1},"feste-ip":1,"knx-server":1,"static-access":1,"cryptonomic":{"*":1},"dattolocal":1,"mydatto":1,"debian":1,"bitbridge":1,"at-band-camp":1,"blogdns":1,"broke-it":1,"buyshouses":1,"dnsalias":1,"dnsdojo":1,"does-it":1,"dontexist":1,"dynalias":1,"dynathome":1,"endofinternet":1,"from-az":1,"from-co":1,"from-la":1,"from-ny":1,"gets-it":1,"ham-radio-op":1,"homeftp":1,"homeip":1,"homelinux":1,"homeunix":1,"in-the-band":1,"is-a-chef":1,"is-a-geek":1,"isa-geek":1,"kicks-ass":1,"office-on-the":1,"podzone":1,"scrapper-site":1,"selfip":1,"sells-it":1,"servebbs":1,"serveftp":1,"thruhere":1,"webhop":1,"definima":1,"casacam":1,"dynu":1,"dynv6":1,"twmail":1,"ru":1,"channelsdvr":{"u":1},"fastlylb":{"map":1},"fastly":{"freetls":1,"map":1,"prod":{"a":1,"global":1},"ssl":{"a":1,"b":1,"global":1}},"edgeapp":1,"flynnhosting":1,"cdn-edges":1,"heteml":1,"cloudfunctions":1,"moonscale":1,"in-dsl":1,"in-vpn":1,"ipifony":1,"iobb":1,"cloudjiffy":{"fra1-de":1,"west1-us":1},"elastx":{"jls-sto1":1,"jls-sto2":1,"jls-sto3":1},"faststacks":1,"massivegrid":{"":1,"paas":{"fr-1":1,"lon-1":1,"lon-2":1,"ny-1":1,"ny-2":1,"sg-1":1}},"saveincloud":{"jelastic":1,"nordeste-idc":1},"scaleforce":{"j":1},"tsukaeru":{"jelastic":1},"kinghost":1,"uni5":1,"krellian":1,"barsy":1,"memset":1,"azurewebsites":1,"azure-mobile":1,"cloudapp":1,"azurestaticapps":{"1":1,"centralus":1,"eastasia":1,"eastus2":1,"westeurope":1,"westus2":1},"dnsup":1,"hicam":1,"now-dns":1,"ownip":1,"vpndns":1,"eating-organic":1,"mydissent":1,"myeffect":1,"mymediapc":1,"mypsx":1,"mysecuritycamera":1,"nhlfan":1,"no-ip":1,"pgafan":1,"privatizehealthinsurance":1,"bounceme":1,"ddns":1,"redirectme":1,"serveblog":1,"serveminecraft":1,"sytes":1,"cloudycluster":1,"ovh":{"":1,"webpaas":{"*":1},"hosting":{"*":1}},"bar0":1,"bar1":1,"bar2":1,"rackmaze":1,"schokokeks":1,"firewall-gateway":1,"seidat":1,"senseering":1,"siteleaf":1,"vps-host":{"jelastic":{"atl":1,"njs":1,"ric":1}},"myspreadshop":1,"srcf":{"soc":1,"user":1},"supabase":1,"dsmynas":1,"familyds":1,"tailscale":{"beta":1},"ts":1,"torproject":{"pages":1},"reserve-online":1,"community-pro":1,"meinforum":1,"yandexcloud":{"storage":1,"website":1},"za":1},"nf":{"com":1,"net":1,"per":1,"rec":1,"web":1,"arts":1,"firm":1,"info":1,"other":1,"store":1},"ng":{"com":{"blogspot":1},"edu":1,"gov":1,"i":1,"mil":1,"mobi":1,"name":1,"net":1,"org":1,"sch":1,"col":1,"firm":1,"gen":1,"ltd":1,"ngo":1},"ni":{"ac":1,"biz":1,"co":1,"com":1,"edu":1,"gob":1,"in":1,"info":1,"int":1,"mil":1,"net":1,"nom":1,"org":1,"web":1},"nl":{"co":1,"hosting-cluster":1,"blogspot":1,"gov":1,"khplay":1,"myspreadshop":1,"transurl":{"*":1},"cistron":1,"demon":1},"no":{"fhs":1,"vgs":1,"fylkesbibl":1,"folkebibl":1,"museum":1,"idrett":1,"priv":1,"mil":1,"stat":1,"dep":1,"kommune":1,"herad":1,"aa":{"gs":1},"ah":{"gs":1},"bu":{"gs":1},"fm":{"gs":1},"hl":{"gs":1},"hm":{"gs":1},"jan-mayen":{"gs":1},"mr":{"gs":1},"nl":{"gs":1},"nt":{"gs":1},"of":{"gs":1},"ol":{"gs":1},"oslo":{"gs":1},"rl":{"gs":1},"sf":{"gs":1},"st":{"gs":1},"svalbard":{"gs":1},"tm":{"gs":1},"tr":{"gs":1},"va":{"gs":1},"vf":{"gs":1},"akrehamn":1,"xn--krehamn-dxa":1,"algard":1,"xn--lgrd-poac":1,"arna":1,"brumunddal":1,"bryne":1,"bronnoysund":1,"xn--brnnysund-m8ac":1,"drobak":1,"xn--drbak-wua":1,"egersund":1,"fetsund":1,"floro":1,"xn--flor-jra":1,"fredrikstad":1,"hokksund":1,"honefoss":1,"xn--hnefoss-q1a":1,"jessheim":1,"jorpeland":1,"xn--jrpeland-54a":1,"kirkenes":1,"kopervik":1,"krokstadelva":1,"langevag":1,"xn--langevg-jxa":1,"leirvik":1,"mjondalen":1,"xn--mjndalen-64a":1,"mo-i-rana":1,"mosjoen":1,"xn--mosjen-eya":1,"nesoddtangen":1,"orkanger":1,"osoyro":1,"xn--osyro-wua":1,"raholt":1,"xn--rholt-mra":1,"sandnessjoen":1,"xn--sandnessjen-ogb":1,"skedsmokorset":1,"slattum":1,"spjelkavik":1,"stathelle":1,"stavern":1,"stjordalshalsen":1,"xn--stjrdalshalsen-sqb":1,"tananger":1,"tranby":1,"vossevangen":1,"afjord":1,"xn--fjord-lra":1,"agdenes":1,"al":1,"xn--l-1fa":1,"alesund":1,"xn--lesund-hua":1,"alstahaug":1,"alta":1,"xn--lt-liac":1,"alaheadju":1,"xn--laheadju-7ya":1,"alvdal":1,"amli":1,"xn--mli-tla":1,"amot":1,"xn--mot-tla":1,"andebu":1,"andoy":1,"xn--andy-ira":1,"andasuolo":1,"ardal":1,"xn--rdal-poa":1,"aremark":1,"arendal":1,"xn--s-1fa":1,"aseral":1,"xn--seral-lra":1,"asker":1,"askim":1,"askvoll":1,"askoy":1,"xn--asky-ira":1,"asnes":1,"xn--snes-poa":1,"audnedaln":1,"aukra":1,"aure":1,"aurland":1,"aurskog-holand":1,"xn--aurskog-hland-jnb":1,"austevoll":1,"austrheim":1,"averoy":1,"xn--avery-yua":1,"balestrand":1,"ballangen":1,"balat":1,"xn--blt-elab":1,"balsfjord":1,"bahccavuotna":1,"xn--bhccavuotna-k7a":1,"bamble":1,"bardu":1,"beardu":1,"beiarn":1,"bajddar":1,"xn--bjddar-pta":1,"baidar":1,"xn--bidr-5nac":1,"berg":1,"bergen":1,"berlevag":1,"xn--berlevg-jxa":1,"bearalvahki":1,"xn--bearalvhki-y4a":1,"bindal":1,"birkenes":1,"bjarkoy":1,"xn--bjarky-fya":1,"bjerkreim":1,"bjugn":1,"bodo":1,"xn--bod-2na":1,"badaddja":1,"xn--bdddj-mrabd":1,"budejju":1,"bokn":1,"bremanger":1,"bronnoy":1,"xn--brnny-wuac":1,"bygland":1,"bykle":1,"barum":1,"xn--brum-voa":1,"telemark":{"bo":1,"xn--b-5ga":1},"nordland":{"bo":1,"xn--b-5ga":1,"heroy":1,"xn--hery-ira":1},"bievat":1,"xn--bievt-0qa":1,"bomlo":1,"xn--bmlo-gra":1,"batsfjord":1,"xn--btsfjord-9za":1,"bahcavuotna":1,"xn--bhcavuotna-s4a":1,"dovre":1,"drammen":1,"drangedal":1,"dyroy":1,"xn--dyry-ira":1,"donna":1,"xn--dnna-gra":1,"eid":1,"eidfjord":1,"eidsberg":1,"eidskog":1,"eidsvoll":1,"eigersund":1,"elverum":1,"enebakk":1,"engerdal":1,"etne":1,"etnedal":1,"evenes":1,"evenassi":1,"xn--eveni-0qa01ga":1,"evje-og-hornnes":1,"farsund":1,"fauske":1,"fuossko":1,"fuoisku":1,"fedje":1,"fet":1,"finnoy":1,"xn--finny-yua":1,"fitjar":1,"fjaler":1,"fjell":1,"flakstad":1,"flatanger":1,"flekkefjord":1,"flesberg":1,"flora":1,"fla":1,"xn--fl-zia":1,"folldal":1,"forsand":1,"fosnes":1,"frei":1,"frogn":1,"froland":1,"frosta":1,"frana":1,"xn--frna-woa":1,"froya":1,"xn--frya-hra":1,"fusa":1,"fyresdal":1,"forde":1,"xn--frde-gra":1,"gamvik":1,"gangaviika":1,"xn--ggaviika-8ya47h":1,"gaular":1,"gausdal":1,"gildeskal":1,"xn--gildeskl-g0a":1,"giske":1,"gjemnes":1,"gjerdrum":1,"gjerstad":1,"gjesdal":1,"gjovik":1,"xn--gjvik-wua":1,"gloppen":1,"gol":1,"gran":1,"grane":1,"granvin":1,"gratangen":1,"grimstad":1,"grong":1,"kraanghke":1,"xn--kranghke-b0a":1,"grue":1,"gulen":1,"hadsel":1,"halden":1,"halsa":1,"hamar":1,"hamaroy":1,"habmer":1,"xn--hbmer-xqa":1,"hapmir":1,"xn--hpmir-xqa":1,"hammerfest":1,"hammarfeasta":1,"xn--hmmrfeasta-s4ac":1,"haram":1,"hareid":1,"harstad":1,"hasvik":1,"aknoluokta":1,"xn--koluokta-7ya57h":1,"hattfjelldal":1,"aarborte":1,"haugesund":1,"hemne":1,"hemnes":1,"hemsedal":1,"more-og-romsdal":{"heroy":1,"sande":1},"xn--mre-og-romsdal-qqb":{"xn--hery-ira":1,"sande":1},"hitra":1,"hjartdal":1,"hjelmeland":1,"hobol":1,"xn--hobl-ira":1,"hof":1,"hol":1,"hole":1,"holmestrand":1,"holtalen":1,"xn--holtlen-hxa":1,"hornindal":1,"horten":1,"hurdal":1,"hurum":1,"hvaler":1,"hyllestad":1,"hagebostad":1,"xn--hgebostad-g3a":1,"hoyanger":1,"xn--hyanger-q1a":1,"hoylandet":1,"xn--hylandet-54a":1,"ha":1,"xn--h-2fa":1,"ibestad":1,"inderoy":1,"xn--indery-fya":1,"iveland":1,"jevnaker":1,"jondal":1,"jolster":1,"xn--jlster-bya":1,"karasjok":1,"karasjohka":1,"xn--krjohka-hwab49j":1,"karlsoy":1,"galsa":1,"xn--gls-elac":1,"karmoy":1,"xn--karmy-yua":1,"kautokeino":1,"guovdageaidnu":1,"klepp":1,"klabu":1,"xn--klbu-woa":1,"kongsberg":1,"kongsvinger":1,"kragero":1,"xn--krager-gya":1,"kristiansand":1,"kristiansund":1,"krodsherad":1,"xn--krdsherad-m8a":1,"kvalsund":1,"rahkkeravju":1,"xn--rhkkervju-01af":1,"kvam":1,"kvinesdal":1,"kvinnherad":1,"kviteseid":1,"kvitsoy":1,"xn--kvitsy-fya":1,"kvafjord":1,"xn--kvfjord-nxa":1,"giehtavuoatna":1,"kvanangen":1,"xn--kvnangen-k0a":1,"navuotna":1,"xn--nvuotna-hwa":1,"kafjord":1,"xn--kfjord-iua":1,"gaivuotna":1,"xn--givuotna-8ya":1,"larvik":1,"lavangen":1,"lavagis":1,"loabat":1,"xn--loabt-0qa":1,"lebesby":1,"davvesiida":1,"leikanger":1,"leirfjord":1,"leka":1,"leksvik":1,"lenvik":1,"leangaviika":1,"xn--leagaviika-52b":1,"lesja":1,"levanger":1,"lier":1,"lierne":1,"lillehammer":1,"lillesand":1,"lindesnes":1,"lindas":1,"xn--linds-pra":1,"lom":1,"loppa":1,"lahppi":1,"xn--lhppi-xqa":1,"lund":1,"lunner":1,"luroy":1,"xn--lury-ira":1,"luster":1,"lyngdal":1,"lyngen":1,"ivgu":1,"lardal":1,"lerdal":1,"xn--lrdal-sra":1,"lodingen":1,"xn--ldingen-q1a":1,"lorenskog":1,"xn--lrenskog-54a":1,"loten":1,"xn--lten-gra":1,"malvik":1,"masoy":1,"xn--msy-ula0h":1,"muosat":1,"xn--muost-0qa":1,"mandal":1,"marker":1,"marnardal":1,"masfjorden":1,"meland":1,"meldal":1,"melhus":1,"meloy":1,"xn--mely-ira":1,"meraker":1,"xn--merker-kua":1,"moareke":1,"xn--moreke-jua":1,"midsund":1,"midtre-gauldal":1,"modalen":1,"modum":1,"molde":1,"moskenes":1,"moss":1,"mosvik":1,"malselv":1,"xn--mlselv-iua":1,"malatvuopmi":1,"xn--mlatvuopmi-s4a":1,"namdalseid":1,"aejrie":1,"namsos":1,"namsskogan":1,"naamesjevuemie":1,"xn--nmesjevuemie-tcba":1,"laakesvuemie":1,"nannestad":1,"narvik":1,"narviika":1,"naustdal":1,"nedre-eiker":1,"akershus":{"nes":1},"buskerud":{"nes":1},"nesna":1,"nesodden":1,"nesseby":1,"unjarga":1,"xn--unjrga-rta":1,"nesset":1,"nissedal":1,"nittedal":1,"nord-aurdal":1,"nord-fron":1,"nord-odal":1,"norddal":1,"nordkapp":1,"davvenjarga":1,"xn--davvenjrga-y4a":1,"nordre-land":1,"nordreisa":1,"raisa":1,"xn--risa-5na":1,"nore-og-uvdal":1,"notodden":1,"naroy":1,"xn--nry-yla5g":1,"notteroy":1,"xn--nttery-byae":1,"odda":1,"oksnes":1,"xn--ksnes-uua":1,"oppdal":1,"oppegard":1,"xn--oppegrd-ixa":1,"orkdal":1,"orland":1,"xn--rland-uua":1,"orskog":1,"xn--rskog-uua":1,"orsta":1,"xn--rsta-fra":1,"hedmark":{"os":1,"valer":1,"xn--vler-qoa":1},"hordaland":{"os":1},"osen":1,"osteroy":1,"xn--ostery-fya":1,"ostre-toten":1,"xn--stre-toten-zcb":1,"overhalla":1,"ovre-eiker":1,"xn--vre-eiker-k8a":1,"oyer":1,"xn--yer-zna":1,"oygarden":1,"xn--ygarden-p1a":1,"oystre-slidre":1,"xn--ystre-slidre-ujb":1,"porsanger":1,"porsangu":1,"xn--porsgu-sta26f":1,"porsgrunn":1,"radoy":1,"xn--rady-ira":1,"rakkestad":1,"rana":1,"ruovat":1,"randaberg":1,"rauma":1,"rendalen":1,"rennebu":1,"rennesoy":1,"xn--rennesy-v1a":1,"rindal":1,"ringebu":1,"ringerike":1,"ringsaker":1,"rissa":1,"risor":1,"xn--risr-ira":1,"roan":1,"rollag":1,"rygge":1,"ralingen":1,"xn--rlingen-mxa":1,"rodoy":1,"xn--rdy-0nab":1,"romskog":1,"xn--rmskog-bya":1,"roros":1,"xn--rros-gra":1,"rost":1,"xn--rst-0na":1,"royken":1,"xn--ryken-vua":1,"royrvik":1,"xn--ryrvik-bya":1,"rade":1,"xn--rde-ula":1,"salangen":1,"siellak":1,"saltdal":1,"salat":1,"xn--slt-elab":1,"xn--slat-5na":1,"samnanger":1,"vestfold":{"sande":1},"sandefjord":1,"sandnes":1,"sandoy":1,"xn--sandy-yua":1,"sarpsborg":1,"sauda":1,"sauherad":1,"sel":1,"selbu":1,"selje":1,"seljord":1,"sigdal":1,"siljan":1,"sirdal":1,"skaun":1,"skedsmo":1,"ski":1,"skien":1,"skiptvet":1,"skjervoy":1,"xn--skjervy-v1a":1,"skierva":1,"xn--skierv-uta":1,"skjak":1,"xn--skjk-soa":1,"skodje":1,"skanland":1,"xn--sknland-fxa":1,"skanit":1,"xn--sknit-yqa":1,"smola":1,"xn--smla-hra":1,"snillfjord":1,"snasa":1,"xn--snsa-roa":1,"snoasa":1,"snaase":1,"xn--snase-nra":1,"sogndal":1,"sokndal":1,"sola":1,"solund":1,"songdalen":1,"sortland":1,"spydeberg":1,"stange":1,"stavanger":1,"steigen":1,"steinkjer":1,"stjordal":1,"xn--stjrdal-s1a":1,"stokke":1,"stor-elvdal":1,"stord":1,"stordal":1,"storfjord":1,"omasvuotna":1,"strand":1,"stranda":1,"stryn":1,"sula":1,"suldal":1,"sund":1,"sunndal":1,"surnadal":1,"sveio":1,"svelvik":1,"sykkylven":1,"sogne":1,"xn--sgne-gra":1,"somna":1,"xn--smna-gra":1,"sondre-land":1,"xn--sndre-land-0cb":1,"sor-aurdal":1,"xn--sr-aurdal-l8a":1,"sor-fron":1,"xn--sr-fron-q1a":1,"sor-odal":1,"xn--sr-odal-q1a":1,"sor-varanger":1,"xn--sr-varanger-ggb":1,"matta-varjjat":1,"xn--mtta-vrjjat-k7af":1,"sorfold":1,"xn--srfold-bya":1,"sorreisa":1,"xn--srreisa-q1a":1,"sorum":1,"xn--srum-gra":1,"tana":1,"deatnu":1,"time":1,"tingvoll":1,"tinn":1,"tjeldsund":1,"dielddanuorri":1,"tjome":1,"xn--tjme-hra":1,"tokke":1,"tolga":1,"torsken":1,"tranoy":1,"xn--trany-yua":1,"tromso":1,"xn--troms-zua":1,"tromsa":1,"romsa":1,"trondheim":1,"troandin":1,"trysil":1,"trana":1,"xn--trna-woa":1,"trogstad":1,"xn--trgstad-r1a":1,"tvedestrand":1,"tydal":1,"tynset":1,"tysfjord":1,"divtasvuodna":1,"divttasvuotna":1,"tysnes":1,"tysvar":1,"xn--tysvr-vra":1,"tonsberg":1,"xn--tnsberg-q1a":1,"ullensaker":1,"ullensvang":1,"ulvik":1,"utsira":1,"vadso":1,"xn--vads-jra":1,"cahcesuolo":1,"xn--hcesuolo-7ya35b":1,"vaksdal":1,"valle":1,"vang":1,"vanylven":1,"vardo":1,"xn--vard-jra":1,"varggat":1,"xn--vrggt-xqad":1,"vefsn":1,"vaapste":1,"vega":1,"vegarshei":1,"xn--vegrshei-c0a":1,"vennesla":1,"verdal":1,"verran":1,"vestby":1,"vestnes":1,"vestre-slidre":1,"vestre-toten":1,"vestvagoy":1,"xn--vestvgy-ixa6o":1,"vevelstad":1,"vik":1,"vikna":1,"vindafjord":1,"volda":1,"voss":1,"varoy":1,"xn--vry-yla5g":1,"vagan":1,"xn--vgan-qoa":1,"voagat":1,"vagsoy":1,"xn--vgsy-qoa0j":1,"vaga":1,"xn--vg-yiab":1,"ostfold":{"valer":1},"xn--stfold-9xa":{"xn--vler-qoa":1},"co":1,"blogspot":1,"myspreadshop":1},"np":{"*":1},"nr":{"biz":1,"info":1,"gov":1,"edu":1,"org":1,"net":1,"com":1},"nu":{"merseine":1,"mine":1,"shacknet":1,"enterprisecloud":1},"nz":{"ac":1,"co":{"blogspot":1},"cri":1,"geek":1,"gen":1,"govt":1,"health":1,"iwi":1,"kiwi":1,"maori":1,"mil":1,"xn--mori-qsa":1,"net":1,"org":1,"parliament":1,"school":1},"om":{"co":1,"com":1,"edu":1,"gov":1,"med":1,"museum":1,"net":1,"org":1,"pro":1},"org":{"altervista":1,"amune":{"tele":1},"pimienta":1,"poivron":1,"potager":1,"sweetpepper":1,"ae":1,"us":1,"certmgr":1,"cdn77":{"c":1,"rsc":1},"cdn77-secure":{"":1,"origin":{"ssl":1}},"cloudns":1,"duckdns":1,"tunk":1,"dyndns":{"go":1,"home":1},"blogdns":1,"blogsite":1,"boldlygoingnowhere":1,"dnsalias":1,"dnsdojo":1,"doesntexist":1,"dontexist":1,"doomdns":1,"dvrdns":1,"dynalias":1,"endofinternet":1,"endoftheinternet":1,"from-me":1,"game-host":1,"gotdns":1,"hobby-site":1,"homedns":1,"homeftp":1,"homelinux":1,"homeunix":1,"is-a-bruinsfan":1,"is-a-candidate":1,"is-a-celticsfan":1,"is-a-chef":1,"is-a-geek":1,"is-a-knight":1,"is-a-linux-user":1,"is-a-patsfan":1,"is-a-soxfan":1,"is-found":1,"is-lost":1,"is-saved":1,"is-very-bad":1,"is-very-evil":1,"is-very-good":1,"is-very-nice":1,"is-very-sweet":1,"isa-geek":1,"kicks-ass":1,"misconfused":1,"podzone":1,"readmyblog":1,"selfip":1,"sellsyourhome":1,"servebbs":1,"serveftp":1,"servegame":1,"stuff-4-sale":1,"webhop":1,"ddnss":1,"accesscam":1,"camdvr":1,"freeddns":1,"mywire":1,"webredirect":1,"eu":{"al":1,"asso":1,"at":1,"au":1,"be":1,"bg":1,"ca":1,"cd":1,"ch":1,"cn":1,"cy":1,"cz":1,"de":1,"dk":1,"edu":1,"ee":1,"es":1,"fi":1,"fr":1,"gr":1,"hr":1,"hu":1,"ie":1,"il":1,"in":1,"int":1,"is":1,"it":1,"jp":1,"kr":1,"lt":1,"lu":1,"lv":1,"mc":1,"me":1,"mk":1,"mt":1,"my":1,"net":1,"ng":1,"nl":1,"no":1,"nz":1,"paris":1,"pl":1,"pt":1,"q-a":1,"ro":1,"ru":1,"se":1,"si":1,"sk":1,"tr":1,"uk":1,"us":1},"twmail":1,"fedorainfracloud":1,"fedorapeople":1,"fedoraproject":{"cloud":1,"os":{"app":1},"stg":{"":1,"os":{"app":1}}},"freedesktop":1,"hepforge":1,"in-dsl":1,"in-vpn":1,"js":1,"barsy":1,"mayfirst":1,"mozilla-iot":1,"bmoattachments":1,"dynserv":1,"now-dns":1,"cable-modem":1,"collegefan":1,"couchpotatofries":1,"mlbfan":1,"mysecuritycamera":1,"nflfan":1,"read-books":1,"ufcfan":1,"hopto":1,"myftp":1,"no-ip":1,"zapto":1,"httpbin":1,"pubtls":1,"my-firewall":1,"myfirewall":1,"spdns":1,"small-web":1,"dsmynas":1,"familyds":1,"teckids":{"s3":1},"tuxfamily":1,"diskstation":1,"hk":1,"wmflabs":1,"toolforge":1,"wmcloud":1,"za":1},"pa":{"ac":1,"gob":1,"com":1,"org":1,"sld":1,"edu":1,"net":1,"ing":1,"abo":1,"med":1,"nom":1},"pe":{"edu":1,"gob":1,"nom":1,"mil":1,"org":1,"com":1,"net":1,"blogspot":1},"pf":{"com":1,"org":1,"edu":1},"pg":{"*":1},"ph":{"com":1,"net":1,"org":1,"gov":1,"edu":1,"ngo":1,"mil":1,"i":1},"pk":{"com":1,"net":1,"edu":1,"org":1,"fam":1,"biz":1,"web":1,"gov":1,"gob":1,"gok":1,"gon":1,"gop":1,"gos":1,"info":1},"pl":{"com":1,"net":1,"org":1,"aid":1,"agro":1,"atm":1,"auto":1,"biz":1,"edu":1,"gmina":1,"gsm":1,"info":1,"mail":1,"miasta":1,"media":1,"mil":1,"nieruchomosci":1,"nom":1,"pc":1,"powiat":1,"priv":1,"realestate":1,"rel":1,"sex":1,"shop":1,"sklep":1,"sos":1,"szkola":1,"targi":1,"tm":1,"tourism":1,"travel":1,"turystyka":1,"gov":{"ap":1,"ic":1,"is":1,"us":1,"kmpsp":1,"kppsp":1,"kwpsp":1,"psp":1,"wskr":1,"kwp":1,"mw":1,"ug":1,"um":1,"umig":1,"ugim":1,"upow":1,"uw":1,"starostwo":1,"pa":1,"po":1,"psse":1,"pup":1,"rzgw":1,"sa":1,"so":1,"sr":1,"wsa":1,"sko":1,"uzs":1,"wiih":1,"winb":1,"pinb":1,"wios":1,"witd":1,"wzmiuw":1,"piw":1,"wiw":1,"griw":1,"wif":1,"oum":1,"sdn":1,"zp":1,"uppo":1,"mup":1,"wuoz":1,"konsulat":1,"oirm":1},"augustow":1,"babia-gora":1,"bedzin":1,"beskidy":1,"bialowieza":1,"bialystok":1,"bielawa":1,"bieszczady":1,"boleslawiec":1,"bydgoszcz":1,"bytom":1,"cieszyn":1,"czeladz":1,"czest":1,"dlugoleka":1,"elblag":1,"elk":1,"glogow":1,"gniezno":1,"gorlice":1,"grajewo":1,"ilawa":1,"jaworzno":1,"jelenia-gora":1,"jgora":1,"kalisz":1,"kazimierz-dolny":1,"karpacz":1,"kartuzy":1,"kaszuby":1,"katowice":1,"kepno":1,"ketrzyn":1,"klodzko":1,"kobierzyce":1,"kolobrzeg":1,"konin":1,"konskowola":1,"kutno":1,"lapy":1,"lebork":1,"legnica":1,"lezajsk":1,"limanowa":1,"lomza":1,"lowicz":1,"lubin":1,"lukow":1,"malbork":1,"malopolska":1,"mazowsze":1,"mazury":1,"mielec":1,"mielno":1,"mragowo":1,"naklo":1,"nowaruda":1,"nysa":1,"olawa":1,"olecko":1,"olkusz":1,"olsztyn":1,"opoczno":1,"opole":1,"ostroda":1,"ostroleka":1,"ostrowiec":1,"ostrowwlkp":1,"pila":1,"pisz":1,"podhale":1,"podlasie":1,"polkowice":1,"pomorze":1,"pomorskie":1,"prochowice":1,"pruszkow":1,"przeworsk":1,"pulawy":1,"radom":1,"rawa-maz":1,"rybnik":1,"rzeszow":1,"sanok":1,"sejny":1,"slask":1,"slupsk":1,"sosnowiec":1,"stalowa-wola":1,"skoczow":1,"starachowice":1,"stargard":1,"suwalki":1,"swidnica":1,"swiebodzin":1,"swinoujscie":1,"szczecin":1,"szczytno":1,"tarnobrzeg":1,"tgory":1,"turek":1,"tychy":1,"ustka":1,"walbrzych":1,"warmia":1,"warszawa":1,"waw":1,"wegrow":1,"wielun":1,"wlocl":1,"wloclawek":1,"wodzislaw":1,"wolomin":1,"wroclaw":1,"zachpomor":1,"zagan":1,"zarow":1,"zgora":1,"zgorzelec":1,"beep":1,"ecommerce-shop":1,"shoparena":1,"homesklep":1,"sdscloud":1,"unicloud":1,"krasnik":1,"leczna":1,"lubartow":1,"lublin":1,"poniatowa":1,"swidnik":1,"co":1,"art":1,"gliwice":1,"krakow":1,"poznan":1,"wroc":1,"zakopane":1,"myspreadshop":1,"gda":1,"gdansk":1,"gdynia":1,"med":1,"sopot":1},"pm":{"own":1,"name":1},"pn":{"gov":1,"co":1,"org":1,"edu":1,"net":1},"pr":{"com":1,"net":1,"org":1,"gov":1,"edu":1,"isla":1,"pro":1,"biz":1,"info":1,"name":1,"est":1,"prof":1,"ac":1},"pro":{"aaa":1,"aca":1,"acct":1,"avocat":1,"bar":1,"cpa":1,"eng":1,"jur":1,"law":1,"med":1,"recht":1,"cloudns":1,"dnstrace":{"bci":1},"barsy":1},"ps":{"edu":1,"gov":1,"sec":1,"plo":1,"com":1,"org":1,"net":1},"pt":{"net":1,"gov":1,"org":1,"edu":1,"int":1,"publ":1,"com":1,"nome":1,"blogspot":1},"pw":{"co":1,"ne":1,"or":1,"ed":1,"go":1,"belau":1,"cloudns":1,"x443":1},"py":{"com":1,"coop":1,"edu":1,"gov":1,"mil":1,"net":1,"org":1},"qa":{"com":1,"edu":1,"gov":1,"mil":1,"name":1,"net":1,"org":1,"sch":1,"blogspot":1},"re":{"asso":1,"com":1,"nom":1,"blogspot":1},"ro":{"arts":1,"com":1,"firm":1,"info":1,"nom":1,"nt":1,"org":1,"rec":1,"store":1,"tm":1,"www":1,"co":1,"shop":1,"blogspot":1,"barsy":1},"rs":{"ac":1,"co":1,"edu":1,"gov":1,"in":1,"org":1,"brendly":{"shop":1},"blogspot":1,"ua":1,"ox":1},"ru":{"ac":1,"edu":1,"gov":1,"int":1,"mil":1,"test":1,"eurodir":1,"adygeya":1,"bashkiria":1,"bir":1,"cbg":1,"com":1,"dagestan":1,"grozny":1,"kalmykia":1,"kustanai":1,"marine":1,"mordovia":1,"msk":1,"mytis":1,"nalchik":1,"nov":1,"pyatigorsk":1,"spb":1,"vladikavkaz":1,"vladimir":1,"blogspot":1,"na4u":1,"mircloud":1,"regruhosting":{"jelastic":1},"myjino":{"hosting":{"*":1},"landing":{"*":1},"spectrum":{"*":1},"vps":{"*":1}},"cldmail":{"hb":1},"mcdir":{"vps":1},"mcpre":1,"net":1,"org":1,"pp":1,"lk3":1,"ras":1},"rw":{"ac":1,"co":1,"coop":1,"gov":1,"mil":1,"net":1,"org":1},"sa":{"com":1,"net":1,"org":1,"gov":1,"med":1,"pub":1,"edu":1,"sch":1},"sb":{"com":1,"edu":1,"gov":1,"net":1,"org":1},"sc":{"com":1,"gov":1,"net":1,"org":1,"edu":1},"sd":{"com":1,"net":1,"org":1,"edu":1,"med":1,"tv":1,"gov":1,"info":1},"se":{"a":1,"ac":1,"b":1,"bd":1,"brand":1,"c":1,"d":1,"e":1,"f":1,"fh":1,"fhsk":1,"fhv":1,"g":1,"h":1,"i":1,"k":1,"komforb":1,"kommunalforbund":1,"komvux":1,"l":1,"lanbib":1,"m":1,"n":1,"naturbruksgymn":1,"o":1,"org":1,"p":1,"parti":1,"pp":1,"press":1,"r":1,"s":1,"t":1,"tm":1,"u":1,"w":1,"x":1,"y":1,"z":1,"com":1,"blogspot":1,"conf":1,"iopsys":1,"itcouldbewor":1,"myspreadshop":1,"paba":{"su":1}},"sg":{"com":1,"net":1,"org":1,"gov":1,"edu":1,"per":1,"blogspot":1,"enscaled":1},"sh":{"com":1,"net":1,"gov":1,"org":1,"mil":1,"bip":1,"hashbang":1,"platform":{"bc":1,"ent":1,"eu":1,"us":1},"now":1,"vxl":1,"wedeploy":1},"si":{"gitapp":1,"gitpage":1,"blogspot":1},"sk":{"blogspot":1},"sl":{"com":1,"net":1,"edu":1,"gov":1,"org":1},"sn":{"art":1,"com":1,"edu":1,"gouv":1,"org":1,"perso":1,"univ":1,"blogspot":1},"so":{"com":1,"edu":1,"gov":1,"me":1,"net":1,"org":1,"sch":1},"ss":{"biz":1,"com":1,"edu":1,"gov":1,"me":1,"net":1,"org":1,"sch":1},"st":{"co":1,"com":1,"consulado":1,"edu":1,"embaixada":1,"mil":1,"net":1,"org":1,"principe":1,"saotome":1,"store":1,"noho":1},"su":{"abkhazia":1,"adygeya":1,"aktyubinsk":1,"arkhangelsk":1,"armenia":1,"ashgabad":1,"azerbaijan":1,"balashov":1,"bashkiria":1,"bryansk":1,"bukhara":1,"chimkent":1,"dagestan":1,"east-kazakhstan":1,"exnet":1,"georgia":1,"grozny":1,"ivanovo":1,"jambyl":1,"kalmykia":1,"kaluga":1,"karacol":1,"karaganda":1,"karelia":1,"khakassia":1,"krasnodar":1,"kurgan":1,"kustanai":1,"lenug":1,"mangyshlak":1,"mordovia":1,"msk":1,"murmansk":1,"nalchik":1,"navoi":1,"north-kazakhstan":1,"nov":1,"obninsk":1,"penza":1,"pokrovsk":1,"sochi":1,"spb":1,"tashkent":1,"termez":1,"togliatti":1,"troitsk":1,"tselinograd":1,"tula":1,"tuva":1,"vladikavkaz":1,"vladimir":1,"vologda":1},"sv":{"com":1,"edu":1,"gob":1,"org":1,"red":1},"sx":{"gov":1},"sy":{"edu":1,"gov":1,"net":1,"mil":1,"com":1,"org":1},"sz":{"co":1,"ac":1,"org":1},"tc":{"ch":1,"me":1,"we":1},"td":{"blogspot":1},"tf":{"sch":1},"th":{"ac":1,"co":1,"go":1,"in":1,"mi":1,"net":1,"or":1,"online":1,"shop":1},"tj":{"ac":1,"biz":1,"co":1,"com":1,"edu":1,"go":1,"gov":1,"int":1,"mil":1,"name":1,"net":1,"nic":1,"org":1,"test":1,"web":1},"tl":{"gov":1},"tm":{"com":1,"co":1,"org":1,"net":1,"nom":1,"gov":1,"mil":1,"edu":1},"tn":{"com":1,"ens":1,"fin":1,"gov":1,"ind":1,"info":1,"intl":1,"mincom":1,"nat":1,"net":1,"org":1,"perso":1,"tourism":1,"orangecloud":1},"to":{"611":1,"com":1,"gov":1,"net":1,"org":1,"edu":1,"mil":1,"oya":1,"rdv":1,"vpnplus":1,"quickconnect":{"direct":1},"nyan":1},"tr":{"av":1,"bbs":1,"bel":1,"biz":1,"com":{"blogspot":1},"dr":1,"edu":1,"gen":1,"gov":1,"info":1,"mil":1,"k12":1,"kep":1,"name":1,"net":1,"org":1,"pol":1,"tel":1,"tsk":1,"tv":1,"web":1,"nc":{"gov":1}},"tt":{"co":1,"com":1,"org":1,"net":1,"biz":1,"info":1,"pro":1,"int":1,"coop":1,"jobs":1,"mobi":1,"travel":1,"museum":1,"aero":1,"name":1,"gov":1,"edu":1},"tv":{"dyndns":1,"better-than":1,"on-the-web":1,"worse-than":1},"tw":{"edu":1,"gov":1,"mil":1,"com":{"mymailer":1},"net":1,"org":1,"idv":1,"game":1,"ebiz":1,"club":1,"xn--zf0ao64a":1,"xn--uc0atv":1,"xn--czrw28b":1,"url":1,"blogspot":1},"tz":{"ac":1,"co":1,"go":1,"hotel":1,"info":1,"me":1,"mil":1,"mobi":1,"ne":1,"or":1,"sc":1,"tv":1},"ua":{"com":1,"edu":1,"gov":1,"in":1,"net":1,"org":1,"cherkassy":1,"cherkasy":1,"chernigov":1,"chernihiv":1,"chernivtsi":1,"chernovtsy":1,"ck":1,"cn":1,"cr":1,"crimea":1,"cv":1,"dn":1,"dnepropetrovsk":1,"dnipropetrovsk":1,"donetsk":1,"dp":1,"if":1,"ivano-frankivsk":1,"kh":1,"kharkiv":1,"kharkov":1,"kherson":1,"khmelnitskiy":1,"khmelnytskyi":1,"kiev":1,"kirovograd":1,"km":1,"kr":1,"krym":1,"ks":1,"kv":1,"kyiv":1,"lg":1,"lt":1,"lugansk":1,"lutsk":1,"lv":1,"lviv":1,"mk":1,"mykolaiv":1,"nikolaev":1,"od":1,"odesa":1,"odessa":1,"pl":1,"poltava":1,"rivne":1,"rovno":1,"rv":1,"sb":1,"sebastopol":1,"sevastopol":1,"sm":1,"sumy":1,"te":1,"ternopil":1,"uz":1,"uzhgorod":1,"vinnica":1,"vinnytsia":1,"vn":1,"volyn":1,"yalta":1,"zaporizhzhe":1,"zaporizhzhia":1,"zhitomir":1,"zhytomyr":1,"zp":1,"zt":1,"cc":1,"inf":1,"ltd":1,"cx":1,"biz":1,"co":1,"pp":1,"v":1},"ug":{"co":1,"or":1,"ac":1,"sc":1,"go":1,"ne":1,"com":1,"org":1,"blogspot":1},"uk":{"ac":1,"co":{"bytemark":{"dh":1,"vm":1},"blogspot":1,"layershift":{"j":1},"barsy":1,"barsyonline":1,"retrosnub":{"cust":1},"nh-serv":1,"no-ip":1,"wellbeingzone":1,"adimo":1,"myspreadshop":1,"gwiddle":1},"gov":{"campaign":1,"service":1,"api":1,"homeoffice":1},"ltd":1,"me":1,"net":1,"nhs":1,"org":{"glug":1,"lug":1,"lugs":1,"affinitylottery":1,"raffleentry":1,"weeklylottery":1},"plc":1,"police":1,"sch":{"*":1},"conn":1,"copro":1,"hosp":1,"independent-commission":1,"independent-inquest":1,"independent-inquiry":1,"independent-panel":1,"independent-review":1,"public-inquiry":1,"royal-commission":1,"pymnt":1,"barsy":1},"us":{"dni":1,"fed":1,"isa":1,"kids":1,"nsn":1,"ak":{"k12":1,"cc":1,"lib":1},"al":{"k12":1,"cc":1,"lib":1},"ar":{"k12":1,"cc":1,"lib":1},"as":{"k12":1,"cc":1,"lib":1},"az":{"k12":1,"cc":1,"lib":1},"ca":{"k12":1,"cc":1,"lib":1},"co":{"k12":1,"cc":1,"lib":1},"ct":{"k12":1,"cc":1,"lib":1},"dc":{"k12":1,"cc":1,"lib":1},"de":{"k12":1,"cc":1,"lib":1},"fl":{"k12":1,"cc":1,"lib":1},"ga":{"k12":1,"cc":1,"lib":1},"gu":{"k12":1,"cc":1,"lib":1},"hi":{"cc":1,"lib":1},"ia":{"k12":1,"cc":1,"lib":1},"id":{"k12":1,"cc":1,"lib":1},"il":{"k12":1,"cc":1,"lib":1},"in":{"k12":1,"cc":1,"lib":1},"ks":{"k12":1,"cc":1,"lib":1},"ky":{"k12":1,"cc":1,"lib":1},"la":{"k12":1,"cc":1,"lib":1},"ma":{"k12":{"pvt":1,"chtr":1,"paroch":1},"cc":1,"lib":1},"md":{"k12":1,"cc":1,"lib":1},"me":{"k12":1,"cc":1,"lib":1},"mi":{"k12":1,"cc":1,"lib":1,"ann-arbor":1,"cog":1,"dst":1,"eaton":1,"gen":1,"mus":1,"tec":1,"washtenaw":1},"mn":{"k12":1,"cc":1,"lib":1},"mo":{"k12":1,"cc":1,"lib":1},"ms":{"k12":1,"cc":1,"lib":1},"mt":{"k12":1,"cc":1,"lib":1},"nc":{"k12":1,"cc":1,"lib":1},"nd":{"cc":1,"lib":1},"ne":{"k12":1,"cc":1,"lib":1},"nh":{"k12":1,"cc":1,"lib":1},"nj":{"k12":1,"cc":1,"lib":1},"nm":{"k12":1,"cc":1,"lib":1},"nv":{"k12":1,"cc":1,"lib":1},"ny":{"k12":1,"cc":1,"lib":1},"oh":{"k12":1,"cc":1,"lib":1},"ok":{"k12":1,"cc":1,"lib":1},"or":{"k12":1,"cc":1,"lib":1},"pa":{"k12":1,"cc":1,"lib":1},"pr":{"k12":1,"cc":1,"lib":1},"ri":{"cc":1,"lib":1},"sc":{"k12":1,"cc":1,"lib":1},"sd":{"cc":1,"lib":1},"tn":{"k12":1,"cc":1,"lib":1},"tx":{"k12":1,"cc":1,"lib":1},"ut":{"k12":1,"cc":1,"lib":1},"vi":{"k12":1,"cc":1,"lib":1},"vt":{"k12":1,"cc":1,"lib":1},"va":{"k12":1,"cc":1,"lib":1},"wa":{"k12":1,"cc":1,"lib":1},"wi":{"k12":1,"cc":1,"lib":1},"wv":{"cc":1},"wy":{"k12":1,"cc":1,"lib":1},"graphox":1,"cloudns":1,"drud":1,"is-by":1,"land-4-sale":1,"stuff-4-sale":1,"enscaled":{"phx":1},"mircloud":1,"freeddns":1,"golffan":1,"noip":1,"pointto":1,"platterp":1},"uy":{"com":{"blogspot":1},"edu":1,"gub":1,"mil":1,"net":1,"org":1},"uz":{"co":1,"com":1,"net":1,"org":1},"vc":{"com":1,"net":1,"org":1,"gov":1,"mil":1,"edu":1,"gv":{"d":1},"0e":1},"ve":{"arts":1,"bib":1,"co":1,"com":1,"e12":1,"edu":1,"firm":1,"gob":1,"gov":1,"info":1,"int":1,"mil":1,"net":1,"nom":1,"org":1,"rar":1,"rec":1,"store":1,"tec":1,"web":1},"vg":{"at":1},"vi":{"co":1,"com":1,"k12":1,"net":1,"org":1},"vn":{"com":1,"net":1,"org":1,"edu":1,"gov":1,"int":1,"ac":1,"biz":1,"info":1,"name":1,"pro":1,"health":1,"blogspot":1},"vu":{"com":1,"edu":1,"net":1,"org":1,"cn":1,"blog":1,"dev":1,"me":1},"wf":{"biz":1,"sch":1},"ws":{"com":1,"net":1,"org":1,"gov":1,"edu":1,"advisor":{"*":1},"cloud66":1,"dyndns":1,"mypets":1},"yt":{"org":1},"xn--j6w193g":{"xn--55qx5d":1,"xn--wcvs22d":1,"xn--mxtq1m":1,"xn--gmqw5a":1,"xn--od0alg":1,"xn--uc0atv":1},"xn--90a3ac":{"xn--o1ac":1,"xn--c1avg":1,"xn--90azh":1,"xn--d1at":1,"xn--o1ach":1,"xn--80au":1},"xn--o3cw4h":{"xn--12c1fe0br":1,"xn--12co0c3b4eva":1,"xn--h3cuzk1di":1,"xn--o3cyx2a":1,"xn--m3ch0j3a":1,"xn--12cfi8ixb8l":1},"ye":{"com":1,"edu":1,"gov":1,"net":1,"mil":1,"org":1},"za":{"ac":1,"agric":1,"alt":1,"co":{"blogspot":1},"edu":1,"gov":1,"grondar":1,"law":1,"mil":1,"net":1,"ngo":1,"nic":1,"nis":1,"nom":1,"org":1,"school":1,"tm":1,"web":1},"zm":{"ac":1,"biz":1,"co":1,"com":1,"edu":1,"gov":1,"info":1,"mil":1,"net":1,"org":1,"sch":1},"zw":{"ac":1,"co":1,"gov":1,"mil":1,"org":1},"academy":{"official":1},"app":{"beget":{"*":1},"clerk":1,"clerkstage":1,"wnext":1,"platform0":1,"deta":1,"ondigitalocean":1,"encr":1,"edgecompute":1,"fireweb":1,"onflashdrive":1,"framer":1,"run":{"a":1},"web":1,"hasura":1,"loginline":1,"messerli":1,"netlify":1,"developer":{"*":1},"noop":1,"northflank":{"*":1},"telebit":1,"typedream":1,"vercel":1,"bookonline":1},"basketball":{"aus":1,"nz":1},"builders":{"cloudsite":1},"business":{"co":1},"casa":{"nabu":{"ui":1}},"cloud":{"banzai":{"*":1},"elementor":1,"encoway":{"eu":1},"statics":{"*":1},"ravendb":1,"axarnet":{"es-1":1},"diadem":1,"jelastic":{"vip":1},"jele":1,"jenv-aruba":{"aruba":{"":1,"eur":{"it1":1}},"it1":1},"keliweb":{"cs":1},"oxa":{"tn":1,"uk":1},"primetel":{"uk":1},"reclaim":{"ca":1,"uk":1,"us":1},"trendhosting":{"ch":1,"de":1},"jotelulu":1,"kuleuven":1,"linkyard":1,"magentosite":{"*":1},"perspecta":1,"vapor":1,"on-rancher":{"*":1},"scw":{"baremetal":{"fr-par-1":1,"fr-par-2":1,"nl-ams-1":1},"fr-par":{"fnc":{"functions":1},"k8s":{"nodes":1},"s3":1,"s3-website":1,"whm":1},"instances":{"priv":1,"pub":1},"k8s":1,"nl-ams":{"k8s":{"nodes":1},"s3":1,"s3-website":1,"whm":1},"pl-waw":{"k8s":{"nodes":1},"s3":1,"s3-website":1},"scalebook":1,"smartlabeling":1},"sensiosite":{"*":1},"trafficplex":1,"urown":1,"voorloper":1},"club":{"cloudns":1,"jele":1,"barsy":1,"pony":1},"codes":{"owo":{"*":1}},"community":{"nog":1,"ravendb":1,"myforum":1},"cool":{"elementor":1,"de":1},"design":{"bss":1},"dev":{"lcl":{"*":1},"lclstage":{"*":1},"stg":{"*":1},"stgstage":{"*":1},"pages":1,"workers":1,"curv":1,"deno":1,"deno-staging":1,"deta":1,"fly":1,"githubpreview":1,"gateway":{"*":1},"iserv":1,"localcert":{"":1,"user":{"*":1}},"loginline":1,"mediatech":1,"platter-app":1,"shiftcrypto":1,"vercel":1,"webhare":{"*":1}},"digital":{"cloudapps":{"london":1}},"earth":{"dapps":{"*":1,"bzz":{"*":1}}},"education":{"co":1},"estate":{"compute":{"*":1}},"eus":{"party":{"user":1}},"events":{"koobin":1,"co":1},"faith":{"ybo":1},"farm":{"storj":1},"fashion":{"of":1},"financial":{"co":1},"gdn":{"cnpy":1},"goog":{"cloud":1,"translate":1,"usercontent":{"*":1}},"group":{"discourse":1},"health":{"hra":1},"host":{"cloudaccess":1,"freesite":1,"fastvps":1,"myfast":1,"tempurl":1,"wpmudev":1,"jele":1,"mircloud":1,"pcloud":1,"half":1},"hosting":{"opencraft":1},"krd":{"co":1,"edu":1},"land":{"static":{"dev":1,"sites":1}},"link":{"cyon":1,"mypep":1,"dweb":{"*":1}},"live":{"hlx":1},"lol":{"omg":1},"london":{"in":1,"of":1},"management":{"router":1},"marketing":{"from":1,"with":1},"men":{"for":1,"repair":1},"menu":{"barsy":1},"mom":{"and":1,"for":1},"network":{"alces":{"*":1},"co":1,"arvo":1,"azimuth":1,"tlon":1},"news":{"noticeable":1},"one":{"onred":{"staging":1},"for":1,"under":1,"service":1,"homelink":1},"online":{"eero":1,"eero-stage":1,"barsy":1},"orange":{"tech":1},"ovh":{"nerdpol":1},"page":{"hlx":1,"hlx3":1,"translated":1,"codeberg":1,"pdns":1,"plesk":1,"prvcy":1,"rocky":1,"magnet":1},"party":{"ybo":1},"pictures":{"1337":1},"place":{"co":1},"porn":{"indie":1},"pub":{"barsy":1},"review":{"ybo":1},"rip":{"clan":1},"rocks":{"myddns":1,"lima-city":1,"webspace":1},"run":{"hs":1,"development":1,"ravendb":1,"servers":1,"build":{"*":1},"code":{"*":1},"database":{"*":1},"migration":{"*":1},"onporter":1,"repl":1},"sale":{"for":1},"science":{"ybo":1},"scot":{"edu":1,"gov":{"service":1}},"services":{"loginline":1},"shop":{"base":1,"hoplix":1,"barsy":1},"site":{"cloudera":{"*":1},"cyon":1,"fnwk":1,"folionetwork":1,"fastvps":1,"jele":1,"lelux":1,"loginline":1,"barsy":1,"mintere":1,"omniwe":1,"opensocial":1,"platformsh":{"*":1},"tst":{"*":1},"byen":1,"srht":1,"novecore":1},"solutions":{"diher":{"*":1}},"space":{"myfast":1,"uber":1,"xs4all":1},"store":{"sellfy":1,"shopware":1,"storebase":1},"support":{"barsy":1},"systems":{"knightpoint":1},"team":{"discourse":1,"jelastic":1},"technology":{"co":1},"today":{"prequalifyme":1},"top":{"now-dns":1,"ntdll":1},"trade":{"ybo":1},"win":{"that":1},"work":{"from":1,"to":1},"xn--p1acf":{"xn--90amc":1,"xn--j1aef":1,"xn--j1ael8b":1,"xn--h1ahn":1,"xn--j1adp":1,"xn--c1avg":1,"xn--80aaa0cvac":1,"xn--h1aliz":1,"xn--90a1af":1,"xn--41a":1},"xyz":{"blogsite":1,"localzone":1,"crafting":1,"zapto":1,"telebit":{"*":1}},"zone":{"cloud66":1,"hs":1,"triton":{"*":1},"lima":1}}',
  );
  function mpsl_modern_i(i) {
    if ('string' != typeof i) return null;
    const e = i.toLowerCase().split('.').reverse();
    if (e.includes('')) return null;
    let s = null,
      n = mpsl_modern_o;
    for (let o = 0; o < e.length; ++o) {
      const i = n[punycode_es6.toASCII(e[o])] || n['*'];
      if (!i) break;
      if (1 === i) {
        s = o;
        break;
      }
      if (2 === i) {
        s = o - 1;
        break;
      }
      i[''] || (s = o), (n = i);
    }
    return (
      null == s && (s = 0),
      s + 2 > e.length
        ? null
        : {
            tld: e
              .slice(0, s + 1)
              .reverse()
              .join('.'),
            sld: e[s + 1],
            domain: e
              .slice(0, s + 2)
              .reverse()
              .join('.'),
            subdomain:
              e
                .slice(s + 2)
                .reverse()
                .join('.') || null,
          }
    );
  }
  function mpsl_modern_e(a) {
    var o, e;
    return null != (o = null == (e = mpsl_modern_i(a)) ? void 0 : e.domain) ? o : null;
  }
  function mpsl_modern_s(a) {
    return null != mpsl_modern_i(a);
  }

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
  const styles_StylesProvider = ({ children, target }) => {
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

  const theme_darkTheme = {
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
  const theme_lightTheme = {
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
  const ThemeContext = compat_module.createContext({ theme: theme_lightTheme });
  const theme_ThemeProvider = ({ children, theme }) => {
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
      theme_ThemeProvider,
      {
        theme: dark ? theme_darkTheme : theme_lightTheme,
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
  const baseline_ScopedBaseline = ({ children, fontSize = '13px' }) => {
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
    const className = useClassName(
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
    return React.createElement('div', {
      className,
    });
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

  const FOCUS_START_CLASS = 'js-focus-start';
  const FOCUS_END_CLASS = 'js-focus-end';
  const FOCUS_DEFAULT_CLASS = 'js-focus-default';
  const MENU_ITEM_CLASS = 'js-menu-item';
  const DISABLED_OPACITY = 0.38;
  const INPUT_Z_INDEX = 1;
  const COLOR_PICKER_Z_INDEX = 2;
  const MENU_Z_INDEX = 2;
  const DIALOG_Z_INDEX = 1e5;

  const Details = compat_module.forwardRef(function Details2(props, ref) {
    return compat_module.createElement('details', {
      ...props,
      ref,
    });
  });
  const DetailsSummary = compat_module.forwardRef(function DetailsSummary2(props, ref) {
    const className = utilities_useClassName(
      theme => ({
        cursor: 'pointer',
        outline: 'none',
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
    return compat_module.createElement('summary', {
      ...applyClassName(props, className),
      ref,
    });
  });
  const DetailsBody = compat_module.forwardRef(function DetailsBody2(props, ref) {
    const className = utilities_useClassName(
      () => ({
        marginTop: '1em',
      }),
      [],
    );
    return compat_module.createElement('div', {
      ...applyClassName(props, className),
      ref,
    });
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
  const dialog_Dialog = compat_module.forwardRef(function Dialog2(
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
    browser.runtime.onMessage.addListener(listener);
    return () => {
      browser.runtime.onMessage.removeListener(listener);
    };
  }

  class PathDepth {
    constructor(url) {
      this.scheme = url.scheme;
      this.host = url.host;
      this.dirs = url.path.split('?', 1)[0].split('/').slice(1, -1);
    }
    maxDepth() {
      return this.dirs.length;
    }
    suggestMatchPattern(depth, unblock) {
      if (depth < 0 || depth > this.maxDepth()) {
        throw new Error('Invalid depth');
      }
      const at = unblock ? '@' : '';
      const scheme = this.scheme === 'http' || this.scheme === 'https' ? '*' : this.scheme;
      const host = this.host;
      const path = ['', ...this.dirs.slice(0, depth), '*'].join('/');
      return `${at}${scheme}://${host}${path}`;
    }
  }

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
  const esm = null && esm_dayjs;
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
  function lines(s) {
    return s ? s.split('\n') : [];
  }
  function unlines(ss) {
    return ss.join('\n');
  }
  const utilities_r = String.raw.bind(String);

  const BlockDialogContent = ({
    ruleset,
    blockWholeSite,
    close,
    enablePathDepth,
    open,
    title,
    url: entryURL,
    onBlocked,
  }) => {
    var _a, _b, _c;
    const [state, setState] = hooks_module_p({
      disabled: false,
      unblock: false,
      host: '',
      detailsOpen: false,
      pathDepth: null,
      depth: '',
      rulesToAdd: '',
      rulesToAddValid: false,
      rulesToRemove: '',
    });
    const prevOpen = usePrevious(open);
    if (open && !prevOpen) {
      const url = makeAltURL(entryURL);
      if (url && /^(https?|ftp)$/.test(url.scheme)) {
        const patch = ruleset.createPatch({ url, title }, blockWholeSite);
        state.disabled = false;
        state.unblock = patch.unblock;
        state.host = toUnicode(
          blockWholeSite ? ((_a = mpsl_modern_e(url.host)) != null ? _a : url.host) : url.host,
        );
        state.detailsOpen = false;
        state.pathDepth = enablePathDepth ? new PathDepth(url) : null;
        state.depth = '0';
        state.rulesToAdd = patch.rulesToAdd;
        state.rulesToAddValid = true;
        state.rulesToRemove = patch.rulesToRemove;
      } else {
        state.disabled = true;
        state.unblock = false;
        state.host = entryURL;
        state.detailsOpen = false;
        state.pathDepth = null;
        state.depth = '';
        state.rulesToAdd = '';
        state.rulesToAddValid = false;
        state.rulesToRemove = '';
      }
    }
    const ok = !state.disabled && state.rulesToAddValid;
    const hostClass = utilities_useClassName(
      () => ({
        wordBreak: 'break-all',
      }),
      [],
    );
    return compat_module.createElement(
      compat_module.Fragment,
      null,
      compat_module.createElement(
        DialogHeader,
        null,
        compat_module.createElement(
          DialogTitle,
          {
            id: 'title',
          },
          compat_module.createElement(
            Row,
            null,
            compat_module.createElement(
              RowItem,
              null,
              compat_module.createElement(Icon, {
                iconSize: '24px',
                url: icon_namespaceObject,
              }),
            ),
            compat_module.createElement(
              RowItem,
              {
                expanded: true,
              },
              translate(state.unblock ? 'popup_unblockSiteTitle' : 'popup_blockSiteTitle'),
            ),
          ),
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
                className: hostClass,
              },
              state.host,
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
              Details,
              {
                open: state.detailsOpen,
                onToggle: e => setState(s => ({ ...s, detailsOpen: e.currentTarget.open })),
              },
              compat_module.createElement(
                DetailsSummary,
                {
                  className: FOCUS_START_CLASS,
                },
                translate('popup_details'),
              ),
              compat_module.createElement(
                DetailsBody,
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
                          for: 'url',
                        },
                        translate('popup_pageURLLabel'),
                      ),
                    ),
                    open &&
                      compat_module.createElement(TextArea, {
                        breakAll: true,
                        id: 'url',
                        readOnly: true,
                        rows: 2,
                        value: entryURL,
                      }),
                  ),
                ),
                enablePathDepth &&
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
                          disabled: state.disabled,
                          fullWidth: true,
                        },
                        compat_module.createElement(
                          ControlLabel,
                          {
                            for: 'depth',
                          },
                          translate('popup_pathDepth'),
                        ),
                      ),
                      open &&
                        compat_module.createElement(Input, {
                          disabled: state.disabled,
                          id: 'depth',
                          max:
                            (_c = (_b = state.pathDepth) == null ? void 0 : _b.maxDepth()) != null
                              ? _c
                              : 0,
                          min: 0,
                          type: 'number',
                          value: state.depth,
                          onChange: e => {
                            const depth = e.currentTarget.value;
                            if (!state.pathDepth || !depth || !e.currentTarget.validity.valid) {
                              setState(s => ({ ...s, depth }));
                              return;
                            }
                            const rulesToAdd = state.pathDepth.suggestMatchPattern(
                              Number(depth),
                              state.unblock,
                            );
                            const patch = ruleset.modifyPatch({ rulesToAdd });
                            setState(s => ({
                              ...s,
                              depth,
                              rulesToAdd,
                              rulesToAddValid: Boolean(patch),
                            }));
                          },
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
                          for: 'pageTitle',
                        },
                        translate('popup_pageTitleLabel'),
                      ),
                    ),
                    compat_module.createElement(TextArea, {
                      id: 'pageTitle',
                      readOnly: true,
                      rows: 2,
                      spellCheck: 'false',
                      value: title != null ? title : '',
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
                        disabled: state.disabled,
                        fullWidth: true,
                      },
                      compat_module.createElement(
                        ControlLabel,
                        {
                          for: 'rulesToAdd',
                        },
                        translate('popup_addedRulesLabel'),
                      ),
                    ),
                    open &&
                      compat_module.createElement(TextArea, {
                        breakAll: true,
                        disabled: state.disabled,
                        id: 'rulesToAdd',
                        rows: 2,
                        spellCheck: 'false',
                        value: state.rulesToAdd,
                        onChange: e => {
                          const rulesToAdd = e.currentTarget.value;
                          const patch = ruleset.modifyPatch({ rulesToAdd });
                          setState(s => ({ ...s, rulesToAdd, rulesToAddValid: Boolean(patch) }));
                        },
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
                        disabled: state.disabled,
                        fullWidth: true,
                      },
                      compat_module.createElement(
                        ControlLabel,
                        {
                          for: 'rulesToRemove',
                        },
                        translate('popup_removedRulesLabel'),
                      ),
                    ),
                    open &&
                      compat_module.createElement(TextArea, {
                        breakAll: true,
                        disabled: state.disabled,
                        id: 'rulesToRemove',
                        readOnly: true,
                        rows: 2,
                        value: state.rulesToRemove,
                      }),
                  ),
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
            multiline: true,
            right: true,
          },
          compat_module.createElement(
            RowItem,
            {
              expanded: true,
            },
            compat_module.createElement(
              LinkButton,
              {
                onClick: () => sendMessage('open-options-page'),
              },
              translate('popup_openOptionsLink'),
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
                    className: ok
                      ? `${FOCUS_END_CLASS} ${FOCUS_DEFAULT_CLASS}`
                      : FOCUS_DEFAULT_CLASS,
                    disabled: !ok,
                    primary: true,
                    onClick: async () => {
                      ruleset.applyPatch();
                      await Promise.resolve(onBlocked());
                      close();
                    },
                  },
                  translate(state.unblock ? 'popup_unblockSiteButton' : 'popup_blockSiteButton'),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  };
  const BlockDialog = ({ target, theme, ...props }) =>
    React.createElement(
      StylesProvider,
      {
        target,
      },
      React.createElement(
        ThemeProvider,
        {
          theme: theme === 'light' ? lightTheme : darkTheme,
        },
        React.createElement(
          ScopedBaseline,
          null,
          React.createElement(
            Dialog,
            {
              'aria-labelledby': 'title',
              close: props.close,
              open: props.open,
              width: '360px',
            },
            React.createElement(BlockDialogContent, {
              ...props,
            }),
          ),
        ),
      ),
    );
  const BlockEmbeddedDialog = props =>
    compat_module.createElement(
      EmbeddedDialog,
      {
        close: props.close,
        width: '360px',
      },
      compat_module.createElement(BlockDialogContent, {
        open: true,
        ...props,
      }),
    );

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

  function unlinesNullable(lines2) {
    return unlines(lines2.filter(line => line != null));
  }
  function suggestMatchPattern(url, unblock, blockWholeSite) {
    const at = unblock ? '@' : '';
    const scheme = url.scheme === 'http' || url.scheme === 'https' ? '*' : url.scheme;
    let host;
    if (blockWholeSite) {
      const domain = mpsl_modern_e(url.host);
      host = domain != null ? `*.${domain}` : url.host;
    } else {
      host = url.host;
    }
    const path = '/*';
    return `${at}${scheme}://${host}${path}`;
  }
  class InteractiveRuleset {
    constructor(userRules, userCompiledRules, subscriptionCompiledRules) {
      this.patch = null;
      this.userRules = lines(userRules);
      this.userRuleset = new Ruleset(userCompiledRules);
      this.subscriptionRulesets = subscriptionCompiledRules.map(compiled => new Ruleset(compiled));
    }
    toString() {
      return unlinesNullable(this.userRules);
    }
    test(props) {
      const userResults = this.userRuleset.test(props);
      if (userResults >= 0) {
        return userResults;
      }
      return Math.max(-1, ...this.subscriptionRulesets.map(ruleset => ruleset.test(props)));
    }
    createPatch(props, blockWholeSite) {
      const patch = { props };
      const userResults = this.userRuleset.exec(props);
      if (userResults.some(([, value]) => value >= 1)) {
        patch.unblock = false;
        if (userResults.some(([, value]) => value === 0)) {
          patch.requireRulesToAdd = false;
          patch.rulesToAdd = '';
        } else if (this.subscriptionRulesets.some(ruleset => ruleset.test(props) >= 1)) {
          patch.requireRulesToAdd = true;
          patch.rulesToAdd = suggestMatchPattern(props.url, false, blockWholeSite);
        } else if (this.subscriptionRulesets.some(ruleset => ruleset.test(props) === 0)) {
          patch.requireRulesToAdd = false;
          patch.rulesToAdd = '';
        } else {
          patch.requireRulesToAdd = true;
          patch.rulesToAdd = suggestMatchPattern(props.url, false, blockWholeSite);
        }
        patch.rulesToRemove = unlinesNullable(
          userResults.flatMap(([index, value]) => (value >= 1 ? [this.userRules[index]] : [])),
        );
        patch.ruleRemovers = userResults.flatMap(([index, value, remove]) =>
          value >= 1 ? [() => (this.userRules[index] = null), remove] : [],
        );
      } else if (userResults.some(([, value]) => value === 0)) {
        patch.unblock = true;
        if (this.subscriptionRulesets.some(ruleset => ruleset.test(props) >= 1)) {
          patch.requireRulesToAdd = false;
          patch.rulesToAdd = '';
        } else if (this.subscriptionRulesets.some(ruleset => ruleset.test(props) === 0)) {
          patch.requireRulesToAdd = true;
          patch.rulesToAdd = suggestMatchPattern(props.url, true, blockWholeSite);
        } else {
          patch.requireRulesToAdd = false;
          patch.rulesToAdd = '';
        }
        patch.rulesToRemove = unlinesNullable(
          userResults.flatMap(([index, value]) => (value === 0 ? [this.userRules[index]] : [])),
        );
        patch.ruleRemovers = userResults.flatMap(([index, value, remove]) =>
          value === 0 ? [() => (this.userRules[index] = null), remove] : [],
        );
      } else if (this.subscriptionRulesets.some(ruleset => ruleset.test(props) >= 1)) {
        patch.unblock = false;
        patch.requireRulesToAdd = true;
        patch.rulesToAdd = suggestMatchPattern(props.url, false, blockWholeSite);
        patch.rulesToRemove = '';
        patch.ruleRemovers = [];
      } else if (this.subscriptionRulesets.some(ruleset => ruleset.test(props) === 0)) {
        patch.unblock = true;
        patch.requireRulesToAdd = true;
        patch.rulesToAdd = suggestMatchPattern(props.url, true, blockWholeSite);
        patch.rulesToRemove = '';
        patch.ruleRemovers = [];
      } else {
        patch.unblock = false;
        patch.requireRulesToAdd = true;
        patch.rulesToAdd = suggestMatchPattern(props.url, false, blockWholeSite);
        patch.rulesToRemove = '';
        patch.ruleRemovers = [];
      }
      this.patch = patch;
      return patch;
    }
    modifyPatch(patch) {
      if (!this.patch) {
        throw new Error('Patch not created');
      }
      const rulesetToAdd = new Ruleset(Ruleset.compile(patch.rulesToAdd));
      let rulesAddable;
      if (this.patch.unblock) {
        if (this.patch.requireRulesToAdd) {
          rulesAddable = rulesetToAdd.test(this.patch.props) >= 1;
        } else {
          rulesAddable = rulesetToAdd.test(this.patch.props) !== 0;
        }
      } else {
        if (this.patch.requireRulesToAdd) {
          rulesAddable = rulesetToAdd.test(this.patch.props) === 0;
        } else {
          rulesAddable = rulesetToAdd.test(this.patch.props) < 1;
        }
      }
      if (!rulesAddable) {
        return null;
      }
      this.patch.rulesToAdd = patch.rulesToAdd;
      return this.patch;
    }
    applyPatch() {
      if (!this.patch) {
        throw new Error('Patch not created');
      }
      for (const removeRule of this.patch.ruleRemovers) {
        removeRule();
      }
      this.userRules.push(...lines(this.patch.rulesToAdd));
      this.userRuleset.add(this.patch.rulesToAdd);
      this.patch = null;
    }
    deletePatch() {
      this.patch = null;
    }
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
    return browser_browser.storage.local.get(defaultItemsForKeys);
  }
  function loadAllFromLocalStorage() {
    return browser.storage.local.get(defaultLocalStorageItems);
  }
  function saveToLocalStorage(items, source) {
    return sendMessage('save-to-local-storage', items, source);
  }

  const Loading = () => {
    const className = utilities_useClassName(
      () => ({
        height: 'calc(12.5em + 24px)',
        width: '360px',
      }),
      [],
    );
    return compat_module.createElement('div', {
      className,
    });
  };
  const ActivateEmbeddedDialog = ({ active, match, tabId }) =>
    compat_module.createElement(
      EmbeddedDialog,
      {
        close: () => window.close(),
        width: '360px',
      },
      compat_module.createElement(
        DialogHeader,
        null,
        compat_module.createElement(
          DialogTitle,
          {
            id: 'title',
          },
          compat_module.createElement(
            Row,
            null,
            compat_module.createElement(
              RowItem,
              null,
              compat_module.createElement(Icon, {
                iconSize: '24px',
                url: icon_namespaceObject,
              }),
            ),
            compat_module.createElement(
              RowItem,
              {
                expanded: true,
              },
              translate(active ? 'popup_active' : 'popup_inactive'),
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
            multiline: true,
            right: true,
          },
          compat_module.createElement(
            RowItem,
            {
              expanded: true,
            },
            compat_module.createElement(
              LinkButton,
              {
                className: FOCUS_START_CLASS,
                onClick: () => sendMessage('open-options-page'),
              },
              translate('popup_openOptionsLink'),
            ),
          ),
          compat_module.createElement(
            RowItem,
            null,
            active
              ? compat_module.createElement(
                  Row,
                  null,
                  compat_module.createElement(
                    RowItem,
                    null,
                    compat_module.createElement(
                      Button,
                      {
                        className: `${FOCUS_END_CLASS} ${FOCUS_DEFAULT_CLASS}`,
                        primary: true,
                        onClick: () => window.close(),
                      },
                      translate('okButton'),
                    ),
                  ),
                )
              : compat_module.createElement(
                  Row,
                  null,
                  compat_module.createElement(
                    RowItem,
                    null,
                    compat_module.createElement(
                      Button,
                      {
                        onClick: () => window.close(),
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
                        className: `${FOCUS_END_CLASS} ${FOCUS_DEFAULT_CLASS}`,
                        primary: true,
                        onClick: async () => {
                          const [granted] = await Promise.all([
                            browser_browser.permissions.request({ origins: [match] }),
                            browser_browser.scripting.executeScript({
                              target: { tabId },
                              files: ['/scripts/content-script.js'],
                            }),
                          ]);
                          if (!granted) {
                            return;
                          }
                          await sendMessage('register-content-scripts');
                          window.close();
                        },
                      },
                      translate('popup_activateButton'),
                    ),
                  ),
                ),
          ),
        ),
      ),
    );
  const Popup = () => {
    const [state, setState] = hooks_module_p({ type: 'loading' });
    hooks_module_(() => {
      void (async () => {
        const [{ id: tabId, url, title = null }] = await browser_browser.tabs.query({
          active: true,
          currentWindow: true,
        });
        if (tabId == null || url == null) {
          return;
        }
        const altURL = makeAltURL(url);
        const match =
          altURL &&
          Object.values(SEARCH_ENGINES)
            .flatMap(({ contentScripts }) => contentScripts.flatMap(({ matches }) => matches))
            .find(match2 => new MatchPattern(match2).test(altURL));
        if (match != null) {
          const [{ result: active }] = await browser_browser.scripting.executeScript({
            target: { tabId },
            files: ['/scripts/active.js'],
          });
          setState({
            type: 'activate',
            props: {
              active: Boolean(active),
              match,
              tabId,
            },
          });
        } else {
          const options = await loadFromLocalStorage([
            'blacklist',
            'compiledRules',
            'subscriptions',
            'enablePathDepth',
            'blockWholeSite',
          ]);
          const ruleset = new InteractiveRuleset(
            options.blacklist,
            options.compiledRules !== false
              ? options.compiledRules
              : Ruleset.compile(options.blacklist),
            Object.values(options.subscriptions)
              .filter(subscription => {
                var _a;
                return (_a = subscription.enabled) != null ? _a : true;
              })
              .map(subscription => {
                var _a;
                return (_a = subscription.compiledRules) != null
                  ? _a
                  : Ruleset.compile(subscription.blacklist);
              }),
          );
          setState({
            type: 'block',
            props: {
              blockWholeSite: options.blockWholeSite,
              close: () => window.close(),
              enablePathDepth: options.enablePathDepth,
              ruleset,
              title,
              url,
              onBlocked: () => saveToLocalStorage({ blacklist: ruleset.toString() }, 'popup'),
            },
          });
        }
      })();
    }, []);
    return compat_module.createElement(
      AutoThemeProvider,
      null,
      compat_module.createElement(
        Baseline,
        null,
        state.type === 'loading'
          ? compat_module.createElement(Loading, null)
          : state.type === 'activate'
          ? compat_module.createElement(ActivateEmbeddedDialog, {
              ...state.props,
            })
          : compat_module.createElement(BlockEmbeddedDialog, {
              ...state.props,
            }),
      ),
    );
  };
  function main() {
    document.documentElement.lang = translate('lang');
    compat_module.render(
      compat_module.createElement(Popup, null),
      document.body.appendChild(document.createElement('div')),
    );
  }
  void main();
})();
