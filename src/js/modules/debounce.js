export const debounce = function (fn, ms) {
  let timeout
  return () => {
    const fnCall = () => {
      fn.apply(this, arguments)
    }
    clearTimeout(timeout)
    timeout = setTimeout(fnCall, ms)
  }
}
