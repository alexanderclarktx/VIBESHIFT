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
  if (props.id)
    div.id = props.id;
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
// docs/index.ts
window.onSpotifyIframeApiReady = (IFrameAPI) => {
  const element = document.getElementById("embed-iframe");
  const options = {
    width: "100%",
    height: "100px",
    uri: "spotify:track:15uooxhgintp3YZq649IEr"
  };
  IFrameAPI.createController(element, options, () => {});
};
var app = Lax({
  messages: [],
  textBuffer: "",
  justSent: false
});
var spotify = LaxDiv({
  state: {},
  style: {
    width: "100%",
    height: "200px",
    border: "2px solid green",
    position: "relative",
    pointerEvents: "auto",
    touchAction: "manipulation"
  }
});
spotify.e.setAttribute("allow", "autoplay; encrypted-media;");
var wrapper = LaxDiv({
  state: {},
  style: {
    position: "absolute",
    maxWidth: "94%",
    width: "100%",
    height: "96%",
    left: "50%",
    top: "2%",
    right: "2%",
    transform: "translate(-50%)",
    flexDirection: "column",
    display: "flex",
    pointerEvents: "auto",
    touchAction: "manipulation"
  }
});
