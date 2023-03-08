//把驼峰转成横杠连接
export const toLine = (value: string) => {
  let temp = value.replace(/[A-Z]/g, function (i) {
    return '-' + i.toLowerCase();
  })
  if (temp.slice(0, 1) === '-') {
    temp = temp.slice(1);   //如果首字母是大写，执行replace时会多一个_，需要去掉
  }
  return temp;
}