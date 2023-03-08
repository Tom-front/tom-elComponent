import { defineComponent as b, ref as m, watch as d, resolveComponent as c, openBlock as g, createElementBlock as O, normalizeClass as R, createVNode as u, mergeProps as h, unref as f, isRef as B, withCtx as t, renderSlot as l } from "vue";
const C = /* @__PURE__ */ b({
  __name: "index",
  props: {
    visible: {
      type: Boolean,
      default: !1
    },
    // 是否只在可视区域内滚动
    isScroll: {
      type: Boolean,
      default: !1
    },
    // 表单的配置项
    options: {
      type: Array,
      required: !0
    },
    onChange: {
      type: Function
    },
    beforeUpload: {
      type: Function
    },
    onPreview: {
      type: Function
    },
    onRemove: {
      type: Function
    },
    beforeRemove: {
      type: Function
    },
    onSuccess: {
      type: Function
    },
    onExceed: {
      type: Function
    }
  },
  emits: ["update:visible"],
  setup(e, { emit: p }) {
    const i = e;
    let a = m(), n = m(i.visible);
    return d(() => i.visible, (o) => {
      n.value = o;
    }), d(() => n.value, (o) => {
      p("update:visible", o);
    }), (o, r) => {
      const v = c("my-form"), y = c("el-dialog");
      return g(), O("div", {
        class: R({ "my-choose-icon-dialog-body-height": e.isScroll })
      }, [
        u(y, h({
          modelValue: f(n),
          "onUpdate:modelValue": r[0] || (r[0] = (s) => B(n) ? n.value = s : n = s)
        }, o.$attrs), {
          default: t(() => [
            u(v, {
              ref_key: "form",
              ref: a,
              options: e.options,
              onOnChange: e.onChange,
              onBeforeUpload: e.beforeUpload,
              onOnPreview: e.onPreview,
              onOnRemove: e.onRemove,
              onBeforeRemove: e.beforeRemove,
              onOnSuccess: e.onSuccess,
              onOnExceed: e.onExceed
            }, {
              uploadArea: t(() => [
                l(o.$slots, "uploadArea")
              ]),
              uploadTip: t(() => [
                l(o.$slots, "uploadTip")
              ]),
              _: 3
            }, 8, ["options", "onOnChange", "onBeforeUpload", "onOnPreview", "onOnRemove", "onBeforeRemove", "onOnSuccess", "onOnExceed"])
          ]),
          footer: t(() => [
            l(o.$slots, "footer", { form: f(a) })
          ]),
          _: 3
        }, 16, ["modelValue"])
      ], 2);
    };
  }
}), S = {
  install(e) {
    e.component("my-modalForm", C);
  }
};
export {
  S as default
};
