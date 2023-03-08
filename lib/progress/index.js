import { defineComponent as s, ref as l, onMounted as p, resolveComponent as c, openBlock as i, createElementBlock as m, createVNode as u, mergeProps as g, unref as d } from "vue";
const f = { class: "progress" }, _ = /* @__PURE__ */ s({
  __name: "index",
  props: {
    // 进度条进度
    percentage: {
      type: Number,
      required: !0
    },
    // 是否有动画效果
    isAnimate: {
      type: Boolean,
      default: !1
    },
    // 动画时长(毫秒)
    time: {
      type: Number,
      default: 3e3
    }
  },
  setup(r) {
    const e = r;
    let t = l(0);
    return p(() => {
      if (e.isAnimate) {
        let n = Math.ceil(e.time / e.percentage), o = setInterval(() => {
          t.value += 1, t.value >= e.percentage && (t.value = e.percentage, clearInterval(o));
        }, n);
      } else
        t.value = e.percentage;
    }), (n, o) => {
      const a = c("el-progress");
      return i(), m("div", f, [
        u(a, g({ percentage: d(t) }, n.$attrs), null, 16, ["percentage"])
      ]);
    };
  }
}), y = {
  install(r) {
    r.component("my-progress", _);
  }
};
export {
  y as default
};
