import { defineComponent as z, resolveComponent as _, openBlock as t, createElementBlock as s, createElementVNode as a, createVNode as x, withCtx as p, Fragment as k, renderList as y, createBlock as v, unref as h, createCommentVNode as i, toDisplayString as d, createTextVNode as B, normalizeClass as L, resolveDynamicComponent as $ } from "vue";
const w = (n) => {
  let c = n.replace(/[A-Z]/g, function(o) {
    return "-" + o.toLowerCase();
  });
  return c.slice(0, 1) === "-" && (c = c.slice(1)), c;
}, D = { class: "list" }, E = { class: "list-tabs__item" }, T = ["onClick"], q = { class: "avatar" }, F = { class: "content" }, O = {
  key: 0,
  class: "title"
}, S = {
  key: 1,
  class: "time"
}, Z = {
  key: 2,
  class: "time"
}, j = { class: "actions" }, G = ["onClick"], H = {
  key: 0,
  class: "a-icon"
}, J = { class: "a-text" }, K = /* @__PURE__ */ z({
  __name: "index",
  props: {
    // 列表的内容
    list: {
      type: Array,
      require: !0
    },
    // 操作的内容
    actions: {
      type: Array,
      default: () => []
    }
  },
  emits: ["clickItem", "clickAction"],
  setup(n, { emit: c }) {
    let o = (l, u) => {
      c("clickItem", { item: l, index: u });
    }, m = (l, u) => {
      c("clickAction", { item: l, index: u });
    };
    return (l, u) => {
      const g = _("el-avatar"), C = _("el-tag"), b = _("el-scrollbar"), A = _("el-tab-pane"), I = _("el-tabs");
      return t(), s("div", D, [
        a("div", E, [
          x(I, null, {
            default: p(() => [
              (t(!0), s(k, null, y(n.list, (f, N) => (t(), v(A, {
                key: N,
                label: f.title
              }, {
                default: p(() => [
                  x(b, { "max-height": "300px" }, {
                    default: p(() => [
                      (t(!0), s(k, null, y(f.content, (e, r) => (t(), s("div", {
                        class: "container",
                        onClick: (V) => h(o)(e, r)
                      }, [
                        a("div", q, [
                          e.avatar ? (t(), v(g, {
                            key: 0,
                            size: "small",
                            src: e.avatar
                          }, null, 8, ["src"])) : i("", !0)
                        ]),
                        a("div", F, [
                          e.title ? (t(), s("div", O, [
                            a("div", null, d(e.title), 1),
                            e.tag ? (t(), v(C, {
                              key: 0,
                              size: "small",
                              type: e.tagType
                            }, {
                              default: p(() => [
                                B(d(e.tag), 1)
                              ]),
                              _: 2
                            }, 1032, ["type"])) : i("", !0)
                          ])) : i("", !0),
                          e.desc ? (t(), s("div", S, d(e.desc), 1)) : i("", !0),
                          e.time ? (t(), s("div", Z, d(e.time), 1)) : i("", !0)
                        ])
                      ], 8, T))), 256))
                    ]),
                    _: 2
                  }, 1024),
                  a("div", j, [
                    (t(!0), s(k, null, y(n.actions, (e, r) => (t(), s("div", {
                      class: L(["a-item", { border: r !== n.actions.length }]),
                      onClick: (V) => h(m)(e, r),
                      key: r
                    }, [
                      e.icon ? (t(), s("div", H, [
                        (t(), v($(`el-icon-${h(w)(e.icon)}`)))
                      ])) : i("", !0),
                      a("div", J, d(e.text), 1)
                    ], 10, G))), 128))
                  ])
                ]),
                _: 2
              }, 1032, ["label"]))), 128))
            ]),
            _: 1
          })
        ])
      ]);
    };
  }
});
const M = (n, c) => {
  const o = n.__vccOpts || n;
  for (const [m, l] of c)
    o[m] = l;
  return o;
}, P = /* @__PURE__ */ M(K, [["__scopeId", "data-v-402ed1f2"]]), R = {
  install(n) {
    n.component("my-list", P);
  }
};
export {
  R as default
};
