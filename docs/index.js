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
      width: "84%",
      minHeight: "5%",
      wordBreak: "break-all",
      fontFamily: "Courier New",
      fontSize: "1em",
      textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",
      pointerEvents: "auto",
      display: "flex",
      whiteSpace: "pre-line",
      touchAction: "manipulation",
      flexDirection: "column"
    },
    update: (e, lax) => {
      const enter = lax.keysDown.get("enter");
      if (lax.state.justSent) {
        e.value = "";
        lax.state.justSent = false;
        return;
      }
      if (enter && !enter.hold) {
        const { value } = e;
        if (value)
          lax.state.messages.push({ from: "user", text: e.value });
        e.value = "";
      }
      lax.state.textBuffer = e.value;
    }
  }, true);
  return chatInput;
};
var ChatSend = () => {
  let state = undefined;
  const send = LaxDiv({
    state: {},
    style: {
      border: "2px solid green",
      borderRadius: "8px",
      bottom: "0%",
      width: "10%",
      right: "0%",
      minHeight: "5.5%"
    },
    update: (_, lax) => {
      if (!state)
        state = lax.state;
    },
    callbacks: {
      onPointerDown: () => {
        if (!state)
          return;
        if (state.textBuffer) {
          state.messages.push({ from: "user", text: state.textBuffer });
          state.justSent = true;
        }
      }
    }
  });
  return send;
};
// src/ChatHistory.ts
var UserChatBubble = (msg) => {
  const div = LaxDiv({
    state: {},
    style: {
      fontSize: "1em",
      border: "2px solid black",
      borderRadius: "8px",
      position: "relative",
      maxWidth: "80%",
      display: "flex",
      wordBreak: "break-word",
      marginRight: "2%",
      marginTop: "2%",
      marginLeft: "auto",
      flexDirection: "row-reverse",
      flexShrink: 2,
      paddingTop: "2px",
      paddingBottom: "2px",
      paddingLeft: "4px",
      paddingRight: "4px"
    }
  });
  div.e.textContent = msg.text;
  return div;
};
var ChatHistory = () => {
  let count = 0;
  const chatHistory = LaxDiv({
    state: {},
    style: {
      border: "2px solid black",
      borderRadius: "8px",
      width: "99%",
      height: "100%",
      display: "flex",
      flex: 0.9,
      left: "0px",
      position: "relative",
      alignSelf: "center",
      flexDirection: "column",
      overflowY: "scroll"
    },
    update: (_, lax) => {
      const { messages } = lax.state;
      if (count !== messages.length) {
        for (let i = count;i < messages.length; i++) {
          const bubble = UserChatBubble(messages[i]);
          chatHistory.e.appendChild(bubble.e);
          console.log("new", messages[i]);
        }
      }
      count = messages.length;
    }
  });
  return chatHistory;
};
// docs/index.ts
var app = Lax({
  messages: [],
  textBuffer: "",
  justSent: false
});
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
  },
  children: [ChatHistory(), ChatInput(), ChatSend()]
});
app.append(wrapper);
