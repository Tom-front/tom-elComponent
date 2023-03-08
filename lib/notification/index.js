import { defineComponent as s, resolveComponent as a, openBlock as i, createElementBlock as d, createVNode as r, withCtx as l, createBlock as u, resolveDynamicComponent as _, unref as f, renderSlot as m } from "vue";
const p = (e) => {
  let t = e.replace(/[A-Z]/g, function(o) {
    return "-" + o.toLowerCase();
  });
  return t.slice(0, 1) === "-" && (t = t.slice(1)), t;
}, v = { class: "" }, x = /* @__PURE__ */ s({
  __name: "index",
  props: {
    // 显示图标
    icon: {
      type: String,
      default: "Bell"
    },
    // 通知数量
    value: {
      type: [String, Number],
      default: ""
    },
    // 最大值
    max: {
      type: Number,
      default: 99
    },
    // 是否显示小圆点
    isDot: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    return (t, o) => {
      const n = a("el-badge"), c = a("el-popover");
      return i(), d("div", v, [
        r(c, {
          width: 300,
          trigger: "click"
        }, {
          reference: l(() => [
            r(n, {
              value: e.value,
              max: e.max,
              "is-dot": e.isDot,
              class: "item"
            }, {
              default: l(() => [
                (i(), u(_(`el-icon-${f(p)(e.icon)}`)))
              ]),
              _: 1
            }, 8, ["value", "max", "is-dot"])
          ]),
          default: l(() => [
            m(t.$slots, "default", {}, void 0, !0)
          ]),
          _: 3
        })
      ]);
    };
  }
});
const g = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [n, c] of t)
    o[n] = c;
  return o;
}, y = /* @__PURE__ */ g(x, [["__scopeId", "data-v-5fdb1de1"]]), k = {
  install(e) {
    e.component("my-notification", y);
  }
};
export {
  k as default
};
