export function requestInterval(fn, delay) {
  let requestAnimFrame = (function () {
    return (
      window.requestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();
  let start = new Date().getTime();
  let handle = { value: 0 };
  function loop() {
    handle.value = requestAnimFrame(loop);
    var current = new Date().getTime(),
      delta = current - start;
    if (delta >= delay) {
      fn.call(null);
      start = new Date().getTime();
    }
  }
  handle.value = requestAnimFrame(loop);
  return handle;
}
