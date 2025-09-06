// src/lax/Lax.ts
var Lax = (state) => {
  let ready = false;
  const lax = {
    state,
    elements: [],
    append: (element) => {
      document.body.appendChild(element.e);
      lax.elements.push(element);
      return true;
    }
  };
  const update = () => {
    requestAnimationFrame(update);
    if (!ready && document.body) {
      document.body.style.backgroundColor = "black";
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "hidden";
      ready = true;
    }
    for (const element of lax.elements) {
      element.update?.(element.e, element.state);
    }
  };
  requestAnimationFrame(update);
  return lax;
};
// docs/index.ts
var lax = Lax({});
