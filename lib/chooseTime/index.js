import { defineComponent as f, ref as r, watch as o, resolveComponent as S, openBlock as g, createElementBlock as h, createElementVNode as u, createVNode as p, mergeProps as c, unref as v } from "vue";
const T = { style: { display: "flex" } }, y = { style: { "margin-right": "20px" } }, V = /* @__PURE__ */ f({
  __name: "index",
  props: {
    // 开始时间的占位符
    startPlaceholder: {
      type: String,
      default: "请选择开始时间"
    },
    // 结束时间的占位符
    endPlaceholder: {
      type: String,
      default: "请选择结束时间"
    },
    // 开始时间的开始选择
    startTimeStart: {
      type: String,
      default: "08:00"
    },
    // 开始时间的步进
    startStep: {
      type: String,
      default: "00:30"
    },
    // 开始时间的结束选择
    startTimeEnd: {
      type: String,
      default: "24:00"
    },
    // 结束时间的开始选择
    endTimeStart: {
      type: String,
      default: "08:00"
    },
    // 结束时间的步进
    endStep: {
      type: String,
      default: "00:30"
    },
    // 结束时间的结束选择
    endTimeEnd: {
      type: String,
      default: "24:00"
    }
  },
  emits: ["startChange", "endChange"],
  setup(e, { emit: s }) {
    const a = r(""), l = r("");
    let d = r(!0);
    return o(() => a.value, (t) => {
      t === "" ? (l.value = "", d.value = !0) : (d.value = !1, s("startChange", t));
    }), o(() => l.value, (t) => {
      t !== "" && s("endChange", {
        startTime: a.value,
        endTime: t
      });
    }), (t, n) => {
      const m = S("el-time-select");
      return g(), h("div", T, [
        u("div", y, [
          p(m, c({
            modelValue: a.value,
            "onUpdate:modelValue": n[0] || (n[0] = (i) => a.value = i),
            "max-time": l.value,
            placeholder: e.startPlaceholder,
            start: e.startTimeStart,
            step: e.startStep,
            end: e.startTimeEnd
          }, t.$attrs.startOptions), null, 16, ["modelValue", "max-time", "placeholder", "start", "step", "end"])
        ]),
        u("div", null, [
          p(m, c({
            modelValue: l.value,
            "onUpdate:modelValue": n[1] || (n[1] = (i) => l.value = i),
            "min-time": a.value,
            placeholder: e.endPlaceholder,
            start: e.endTimeStart,
            step: e.endStep,
            end: e.endTimeEnd,
            disabled: v(d)
          }, t.$attrs.endOptions), null, 16, ["modelValue", "min-time", "placeholder", "start", "step", "end", "disabled"])
        ])
      ]);
    };
  }
}), C = {
  install(e) {
    e.component("my-choose-time", V);
  }
};
export {
  C as default
};
