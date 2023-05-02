!function(e, t, n) {
    "use strict";
    function s(e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return e.prop ? e.prop.apply(e, t) : e.attr.apply(e, t)
    }
    function a(e, t, n) {
        var s, a;
        for (s in n)
            n.hasOwnProperty(s) && (a = s.replace(/ |$/g, t.eventNamespace),
            e.bind(a, n[s]))
    }
    function i(e, t, n) {
        a(e, n, {
            focus: function() {
                t.addClass(n.focusClass)
            },
            blur: function() {
                t.removeClass(n.focusClass),
                t.removeClass(n.activeClass)
            },
            mouseenter: function() {
                t.addClass(n.hoverClass)
            },
            mouseleave: function() {
                t.removeClass(n.hoverClass),
                t.removeClass(n.activeClass)
            },
            "mousedown touchbegin": function() {
                e.is(":disabled") || t.addClass(n.activeClass)
            },
            "mouseup touchend": function() {
                t.removeClass(n.activeClass)
            }
        })
    }
    function r(e, t) {
        e.removeClass(t.hoverClass + " " + t.focusClass + " " + t.activeClass)
    }
    function u(e, t, n) {
        n ? e.addClass(t) : e.removeClass(t)
    }
    function l(e, t, n) {
        setTimeout(function() {
            var s = "checked"
              , a = t.is(":" + s);
            t.prop ? t.prop(s, a) : a ? t.attr(s, s) : t.removeAttr(s),
            u(e, n.checkedClass, a)
        }, 1)
    }
    function o(e, t, n) {
        u(e, n.disabledClass, t.is(":disabled"))
    }
    function c(e, t, n) {
        switch (n) {
        case "after":
            return e.after(t),
            e.next();
        case "before":
            return e.before(t),
            e.prev();
        case "wrap":
            return e.wrap(t),
            e.parent()
        }
        return null
    }
    function d(e, n, a) {
        var i, r, u;
        return a || (a = {}),
        a = t.extend({
            bind: {},
            divClass: null,
            divWrap: "wrap",
            spanClass: null,
            spanHtml: null,
            spanWrap: "wrap"
        }, a),
        i = t("<div />"),
        r = t("<span />"),
        n.autoHide && e.is(":hidden") && "none" === e.css("display") && i.hide(),
        a.divClass && i.addClass(a.divClass),
        n.wrapperClass && i.addClass(n.wrapperClass),
        a.spanClass && r.addClass(a.spanClass),
        u = s(e, "id"),
        n.useID && u && s(i, "id", n.idPrefix + "-" + u),
        a.spanHtml && r.html(a.spanHtml),
        i = c(e, i, a.divWrap),
        r = c(e, r, a.spanWrap),
        o(i, e, n),
        {
            div: i,
            span: r
        }
    }
    function f(e, n) {
        var s;
        return n.wrapperClass ? (s = t("<span />").addClass(n.wrapperClass),
        s = c(e, s, "wrap")) : null
    }
    function p() {
        var n, s, a, i;
        return i = "rgb(120,2,153)",
        s = t('<div style="width:0;height:0;color:' + i + '">'),
        t("body").append(s),
        a = s.get(0),
        n = e.getComputedStyle ? e.getComputedStyle(a, "").color : (a.currentStyle || a.style || {}).color,
        s.remove(),
        n.replace(/ /g, "") !== i
    }
    function m(e) {
        return e ? t("<span />").text(e).html() : ""
    }
    function v() {
        return navigator.cpuClass && !navigator.product
    }
    function h() {
        return void 0 !== e.XMLHttpRequest
    }
    function C(e) {
        var t;
        return !!e[0].multiple || (t = s(e, "size"),
        !(!t || t <= 1))
    }
    function b() {
        return !1
    }
    function y(e, t) {
        var n = "none";
        a(e, t, {
            "selectstart dragstart mousedown": b
        }),
        e.css({
            MozUserSelect: n,
            msUserSelect: n,
            webkitUserSelect: n,
            userSelect: n
        })
    }
    function w(e, t, n) {
        var s = e.val();
        "" === s ? s = n.fileDefaultHtml : (s = s.split(/[\/\\]+/),
        s = s[s.length - 1]),
        t.text(s)
    }
    function g(e, t, n) {
        var s, a;
        for (s = [],
        e.each(function() {
            var e;
            for (e in t)
                Object.prototype.hasOwnProperty.call(t, e) && (s.push({
                    el: this,
                    name: e,
                    old: this.style[e]
                }),
                this.style[e] = t[e])
        }),
        n(); s.length; )
            a = s.pop(),
            a.el.style[a.name] = a.old
    }
    function k(e, t) {
        var n;
        n = e.parents(),
        n.push(e[0]),
        n = n.not(":visible"),
        g(n, {
            visibility: "hidden",
            display: "block",
            position: "absolute"
        }, t)
    }
    function x(e, t) {
        return function() {
            e.unwrap().unwrap().unbind(t.eventNamespace)
        }
    }
    var H = !0
      , A = !1
      , W = [{
        match: function(e) {
            return e.is("a, button, :submit, :reset, input[type='button']")
        },
        apply: function(t, n) {
            var u, l, c, f, p;
            return l = n.submitDefaultHtml,
            t.is(":reset") && (l = n.resetDefaultHtml),
            f = t.is("a, button") ? function() {
                return t.html() || l
            }
            : function() {
                return m(s(t, "value")) || l
            }
            ,
            c = d(t, n, {
                divClass: n.buttonClass,
                spanHtml: f()
            }),
            u = c.div,
            i(t, u, n),
            p = !1,
            a(u, n, {
                "click touchend": function() {
                    var n, a, i, r;
                    return !p && (!t.is(":disabled") && (p = !0,
                    t[0].dispatchEvent ? (n = document.createEvent("MouseEvents"),
                    n.initEvent("click", !0, !0),
                    a = t[0].dispatchEvent(n),
                    t.is("a") && a && (i = s(t, "target"),
                    r = s(t, "href"),
                    i && "_self" !== i ? e.open(r, i) : document.location.href = r)) : t.click(),
                    void (p = !1)))
                }
            }),
            y(u, n),
            {
                remove: function() {
                    return u.after(t),
                    u.remove(),
                    t.unbind(n.eventNamespace),
                    t
                },
                update: function() {
                    r(u, n),
                    o(u, t, n),
                    t.detach(),
                    c.span.html(f()).append(t)
                }
            }
        }
    }, {
        match: function(e) {
            return e.is(":checkbox")
        },
        apply: function(e, t) {
            var n, s, u;
            return n = d(e, t, {
                divClass: t.checkboxClass
            }),
            s = n.div,
            u = n.span,
            i(e, s, t),
            a(e, t, {
                "click touchend": function() {
                    l(u, e, t)
                }
            }),
            l(u, e, t),
            {
                remove: x(e, t),
                update: function() {
                    r(s, t),
                    u.removeClass(t.checkedClass),
                    l(u, e, t),
                    o(s, e, t)
                }
            }
        }
    }, {
        match: function(e) {
            return e.is(":file")
        },
        apply: function(e, n) {
            function u() {
                w(e, p, n)
            }
            var l, f, p, m;
            return l = d(e, n, {
                divClass: n.fileClass,
                spanClass: n.fileButtonClass,
                spanHtml: n.fileButtonHtml,
                spanWrap: "after"
            }),
            f = l.div,
            m = l.span,
            p = t("<span />").html(n.fileDefaultHtml),
            p.addClass(n.filenameClass),
            p = c(e, p, "after"),
            s(e, "size") || s(e, "size", f.width() / 10),
            i(e, f, n),
            u(),
            v() ? a(e, n, {
                click: function() {
                    e.trigger("change"),
                    setTimeout(u, 0)
                }
            }) : a(e, n, {
                change: u
            }),
            y(p, n),
            y(m, n),
            {
                remove: function() {
                    return p.remove(),
                    m.remove(),
                    e.unwrap().unbind(n.eventNamespace)
                },
                update: function() {
                    r(f, n),
                    w(e, p, n),
                    o(f, e, n)
                }
            }
        }
    }, {
        match: function(e) {
            if (e.is("input")) {
                var t = (" " + s(e, "type") + " ").toLowerCase()
                  , n = " color date datetime datetime-local email month number password search tel text time url week ";
                return n.indexOf(t) >= 0
            }
            return !1
        },
        apply: function(e, t) {
            var n, a;
            return n = s(e, "type"),
            e.addClass(t.inputClass),
            a = f(e, t),
            i(e, e, t),
            t.inputAddTypeAsClass && e.addClass(n),
            {
                remove: function() {
                    e.removeClass(t.inputClass),
                    t.inputAddTypeAsClass && e.removeClass(n),
                    a && e.unwrap()
                },
                update: b
            }
        }
    }, {
        match: function(e) {
            return e.is(":radio")
        },
        apply: function(e, n) {
            var u, c, f;
            return u = d(e, n, {
                divClass: n.radioClass
            }),
            c = u.div,
            f = u.span,
            i(e, c, n),
            a(e, n, {
                "click touchend": function() {
                    void 0 != e.attr("name") ? t.uniform.update(t(':radio[name="' + s(e, "name") + '"]')) : t.uniform.update(e)
                }
            }),
            l(f, e, n),
            {
                remove: x(e, n),
                update: function() {
                    r(c, n),
                    l(f, e, n),
                    o(c, e, n)
                }
            }
        }
    }, {
        match: function(e) {
            return !(!e.is("select") || C(e))
        },
        apply: function(e, n) {
            var s, u, l, c;
            return n.selectAutoWidth && k(e, function() {
                c = e.width()
            }),
            s = d(e, n, {
                divClass: n.selectClass,
                spanHtml: (e.find(":selected:first") || e.find("option:first")).html(),
                spanWrap: "before"
            }),
            u = s.div,
            l = s.span,
            n.selectAutoWidth ? k(e, function() {
                g(t([l[0], u[0]]), {
                    display: "block"
                }, function() {
                    var e;
                    e = l.outerWidth() - l.width(),
                    u.width(c + e),
                    l.width(c)
                })
            }) : u.addClass("fixedWidth"),
            i(e, u, n),
            a(e, n, {
                change: function() {
                    l.html(e.find(":selected").html()),
                    u.removeClass(n.activeClass)
                },
                "click touchend": function() {
                    var t = e.find(":selected").html();
                    l.html() !== t && e.trigger("change")
                },
                keyup: function() {
                    l.html(e.find(":selected").html())
                }
            }),
            y(l, n),
            {
                remove: function() {
                    return l.remove(),
                    e.unwrap().unbind(n.eventNamespace),
                    e
                },
                update: function() {
                    n.selectAutoWidth ? (t.uniform.restore(e),
                    e.uniform(n)) : (r(u, n),
                    e[0].selectedIndex = e[0].selectedIndex,
                    l.html(e.find(":selected").html()),
                    o(u, e, n))
                }
            }
        }
    }, {
        match: function(e) {
            return !(!e.is("select") || !C(e))
        },
        apply: function(e, t) {
            var n;
            return e.addClass(t.selectMultiClass),
            n = f(e, t),
            i(e, e, t),
            {
                remove: function() {
                    e.removeClass(t.selectMultiClass),
                    n && e.unwrap()
                },
                update: b
            }
        }
    }, {
        match: function(e) {
            return e.is("textarea")
        },
        apply: function(e, t) {
            var n;
            return e.addClass(t.textareaClass),
            n = f(e, t),
            i(e, e, t),
            {
                remove: function() {
                    e.removeClass(t.textareaClass),
                    n && e.unwrap()
                },
                update: b
            }
        }
    }];
    v() && !h() && (H = !1),
    t.uniform = {
        defaults: {
            activeClass: "active",
            autoHide: !0,
            buttonClass: "button",
            checkboxClass: "checker",
            checkedClass: "checked",
            disabledClass: "disabled",
            eventNamespace: ".uniform",
            fileButtonClass: "action",
            fileButtonHtml: "Choose File",
            fileClass: "uploader",
            fileDefaultHtml: "No file selected",
            filenameClass: "filename",
            focusClass: "focus",
            hoverClass: "hover",
            idPrefix: "uniform",
            inputAddTypeAsClass: !0,
            inputClass: "uniform-input",
            radioClass: "radio",
            resetDefaultHtml: "Reset",
            resetSelector: !1,
            selectAutoWidth: !0,
            selectClass: "selector",
            selectMultiClass: "uniform-multiselect",
            submitDefaultHtml: "Submit",
            textareaClass: "uniform",
            useID: !0,
            wrapperClass: null
        },
        elements: []
    },
    t.fn.uniform = function(n) {
        var s = this;
        return n = t.extend({}, t.uniform.defaults, n),
        A || (A = !0,
        p() && (H = !1)),
        H ? (n.resetSelector && t(n.resetSelector).mouseup(function() {
            e.setTimeout(function() {
                t.uniform.update(s)
            }, 10)
        }),
        this.each(function() {
            var e, s, a, i = t(this);
            if (i.data("uniformed"))
                return void t.uniform.update(i);
            for (e = 0; e < W.length; e += 1)
                if (s = W[e],
                s.match(i, n))
                    return a = s.apply(i, n),
                    i.data("uniformed", a),
                    void t.uniform.elements.push(i.get(0))
        })) : this
    }
    ,
    t.uniform.restore = t.fn.uniform.restore = function(e) {
        e === n && (e = t.uniform.elements),
        t(e).each(function() {
            var e, n, s = t(this);
            n = s.data("uniformed"),
            n && (n.remove(),
            e = t.inArray(this, t.uniform.elements),
            e >= 0 && t.uniform.elements.splice(e, 1),
            s.removeData("uniformed"))
        })
    }
    ,
    t.uniform.update = t.fn.uniform.update = function(e) {
        e === n && (e = t.uniform.elements),
        t(e).each(function() {
            var e, n = t(this);
            e = n.data("uniformed"),
            e && e.update(n, e.options)
        })
    }
}(this, jQuery);
