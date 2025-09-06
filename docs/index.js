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
      document.body.style.backgroundColor = "white";
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
// src/lax/LaxDiv.ts
var defaults = {
  position: "absolute",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  outline: "none",
  touchAction: "none"
};
var LaxDiv = (props) => {
  const div = document.createElement("div");
  Object.assign(div.style, defaults);
  Object.assign(div.style, props.style);
  div.oncontextmenu = (e) => e.preventDefault();
  if (props.style?.touchAction === undefined) {
    div.ontouchstart = (e) => e.preventDefault();
    div.ontouchend = (e) => e.preventDefault();
    div.ontouchmove = (e) => e.preventDefault();
    div.ontouchcancel = (e) => e.preventDefault();
  }
  if (props.callbacks) {
    const { onPointerDown, onPointerOver, onPointerOut } = props.callbacks;
    if (onPointerDown)
      div.onpointerdown = onPointerDown;
    if (onPointerOver)
      div.onpointerover = onPointerOver;
    if (onPointerOut)
      div.onpointerout = onPointerOut;
  }
  return { e: div, update: props.update, state: props.state, callbacks: props.callbacks };
};
// docs/index.ts
var lax = Lax({});
var textInput = LaxDiv({
  state: {
    text: "hello world"
  },
  style: {
    border: "2px solid black",
    borderRadius: "8px",
    bottom: "100px",
    left: "50%",
    transform: "translate(-50%)",
    width: "90%",
    height: "5%",
    wordBreak: "break-all"
  },
  update: (_, state) => {
    textInput.e.textContent = textInput.state.text;
    console.log(textInput.state);
  }
});
lax.append(textInput);
