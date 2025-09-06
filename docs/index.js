// src/lax/Lax.ts
var Lax = (state) => {
  let ready = false;
  const lax = {
    state,
    elements: [],
    keysDown: KeyBuffer(),
    append: (element) => {
      document.body.appendChild(element.e);
      lax.elements.push(element);
      if (element.children) {
        for (const child of element.children) {
          element.e.appendChild(child.e);
          lax.elements.push(child);
        }
      }
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
      element.update?.(element.e, lax);
      if (element.children) {
        for (const child of element.children) {
          child.update?.(child.e, lax);
        }
      }
      lax.keysDown.updateHold();
    }
  };
  document.addEventListener("keydown", (event) => {
    if (document.hasFocus()) {
      let key = event.key.toLowerCase();
      if (!lax.keysDown.get(key)) {
        lax.keysDown.push({ key, hold: 0 });
      }
    }
  });
  document.addEventListener("keyup", (event) => {
    const key = event.key.toLowerCase();
    lax.keysDown.remove(key);
  });
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
var LaxDiv = (props, input = false) => {
  const div = document.createElement(input ? "input" : "div");
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
  return {
    e: div,
    update: props.update,
    state: props.state,
    callbacks: props.callbacks,
    children: props.children ?? []
  };
};
// src/lax/KeyBuffer.ts
var KeyBuffer = (b) => {
  let buffer = b ? [...b] : [];
  return {
    all: () => [...buffer],
    get: (key) => {
      return buffer.find((b2) => b2.key === key);
    },
    copy: () => KeyBuffer(buffer),
    clear: () => {
      buffer = [];
    },
    push: (km) => {
      if (!buffer.find((b2) => b2.key === km.key))
        return buffer.push(km);
    },
    remove: (key) => {
      buffer = buffer.filter((b2) => b2.key !== key);
    },
    updateHold: () => {
      for (const b2 of buffer) {
        b2.hold += 1;
      }
    }
  };
};
// src/ChatInput.ts
var ChatInput = () => {
  const chatInput = LaxDiv({
    state: {},
    style: {
      alignItems: "center",
      border: "2px solid black",
      borderRadius: "8px",
      bottom: "0%",
      left: "50%",
      transform: "translate(-50%)",
      width: "100%",
      minHeight: "5%",
      wordBreak: "break-all",
      fontFamily: "Courier New",
      fontSize: "20px",
      textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",
      pointerEvents: "auto",
      display: "flex",
      whiteSpace: "pre-line"
    },
    update: (_, lax) => {
      const enter = lax.keysDown.get("enter");
      if (enter && !enter.hold) {
        console.log(enter);
      }
    }
  }, true);
  return chatInput;
};
// docs/index.ts
var lax = Lax({
  messages: []
});
var wrapper = LaxDiv({
  state: {},
  style: {
    alignItems: "flex-end",
    position: "absolute",
    width: "96%",
    height: "96%",
    left: "50%",
    top: "0px",
    transform: "translate(-50%)",
    flexDirection: "column",
    display: "flex"
  },
  children: [ChatInput()]
});
lax.append(wrapper);
