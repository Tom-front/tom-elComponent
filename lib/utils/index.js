const n = (t) => {
  let e = t.replace(/[A-Z]/g, function(r) {
    return "-" + r.toLowerCase();
  });
  return e.slice(0, 1) === "-" && (e = e.slice(1)), e;
};
export {
  n as toLine
};
