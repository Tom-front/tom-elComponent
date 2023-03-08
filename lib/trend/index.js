import { defineComponent as f, useSlots as p, computed as C, openBlock as n, createElementBlock as d, createElementVNode as u, normalizeStyle as s, unref as l, renderSlot as v, toDisplayString as x, createBlock as i, resolveDynamicComponent as a } from "vue";
const y = (e) => {
  let t = e.replace(/[A-Z]/g, function(o) {
    return "-" + o.toLowerCase();
  });
  return t.slice(0, 1) === "-" && (t = t.slice(1)), t;
}, g = { class: "trend" }, m = { key: 1 }, w = { class: "icon" }, S = /* @__PURE__ */ f({
  __name: "index",
  props: {
    //标记当前趋势是上升（up）还是下降（down）
    type: {
      type: String,
      default: "up"
    },
    //趋势显示的文字
    //1. 父组件传递过来的值
    //2.插槽
    text: {
      type: String,
      default: "趋势文字"
    },
    // 上升趋势图标颜色
    upIconColor: {
      type: String,
      default: "#f5222d"
    },
    // 下降趋势的图标颜色
    downIconColor: {
      type: String,
      default: "#52c41a"
    },
    // 上升趋势文字颜色
    upTextColor: {
      type: String,
      default: "rbg(0,0,0)"
    },
    // 下降趋势的文字颜色
    downTextColor: {
      type: String,
      default: "rbg(0,0,0)"
    },
    reverseColor: {
      type: Boolean,
      default: !1
    },
    upIcon: {
      type: String,
      default: "ArrowUp"
    },
    downIcon: {
      type: String,
      default: "ArrowDown"
    }
  },
  setup(e) {
    const t = e;
    let o = p();
    console.log(o);
    let r = C(() => t.type === "up" ? t.reverseColor ? t.downTextColor : t.upTextColor : t.reverseColor ? t.upTextColor : t.downTextColor);
    return (c, T) => (n(), d("div", g, [
      u("div", {
        class: "text",
        style: s({ color: l(r) })
      }, [
        l(o).default ? v(c.$slots, "default", { key: 0 }, void 0, !0) : (n(), d("div", m, x(e.text), 1))
      ], 4),
      u("div", w, [
        e.type === "up" ? (n(), i(a(`el-icon-${l(y)(e.upIcon)}`), {
          key: 0,
          style: s({ color: e.reverseColor ? e.downIconColor : e.upIconColor })
        }, null, 8, ["style"])) : (n(), i(a(`el-icon-${l(y)(e.downIcon)}`), {
          key: 1,
          style: s({ color: e.reverseColor ? e.upIconColor : e.downIconColor })
        }, null, 8, ["style"]))
      ])
    ]));
  }
});
const I = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [r, c] of t)
    o[r] = c;
  return o;
}, k = /* @__PURE__ */ I(S, [["__scopeId", "data-v-cbf85877"]]), b = {
  install(e) {
    e.component("my-trend", k);
  }
};
export {
  b as default
};
