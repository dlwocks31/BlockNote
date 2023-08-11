var Lt = Object.defineProperty;
var Nt = (n, e, t) => e in n ? Lt(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var u = (n, e, t) => (Nt(n, typeof e != "symbol" ? e + "" : e, t), t);
import { Extension as B, Mark as at, Node as V, InputRule as Y, mergeAttributes as x, combineTransactionSteps as Pt, getChangedRanges as Ot, findChildrenInRange as Dt, findChildren as Q, findParentNode as Rt, extensions as L, isTextSelection as zt, isNodeSelection as Vt, posToDOMRect as j, getMarkRange as tt, Editor as Ut } from "@tiptap/core";
import { Bold as Ft } from "@tiptap/extension-bold";
import { Code as Gt } from "@tiptap/extension-code";
import $t from "@tiptap/extension-collaboration";
import jt from "@tiptap/extension-collaboration-cursor";
import { Dropcursor as qt } from "@tiptap/extension-dropcursor";
import { Gapcursor as Wt } from "@tiptap/extension-gapcursor";
import { HardBreak as Yt } from "@tiptap/extension-hard-break";
import { History as Jt } from "@tiptap/extension-history";
import { Italic as Kt } from "@tiptap/extension-italic";
import { Link as Xt } from "@tiptap/extension-link";
import { Strike as Zt } from "@tiptap/extension-strike";
import { Text as Qt } from "@tiptap/extension-text";
import { Underline as te } from "@tiptap/extension-underline";
import { Slice as T, Fragment as I, DOMSerializer as q, DOMParser as ee } from "prosemirror-model";
import { PluginKey as S, Plugin as y, TextSelection as et, Selection as $, NodeSelection as oe } from "prosemirror-state";
import { v4 as ne } from "uuid";
import * as re from "prosemirror-view";
import { Decoration as R, DecorationSet as z } from "prosemirror-view";
import lt from "rehype-parse";
import ie from "rehype-remark";
import dt from "rehype-stringify";
import ct from "remark-gfm";
import se from "remark-parse";
import ae from "remark-rehype";
import le from "remark-stringify";
import { unified as J } from "unified";
import { fromDom as ot } from "hast-util-from-dom";
const de = "_bnEditor_4vj2p_3", ce = "_bnRoot_4vj2p_20", ue = "_defaultStyles_4vj2p_35", pe = "_dragPreview_4vj2p_68", H = {
  bnEditor: de,
  bnRoot: ce,
  defaultStyles: ue,
  dragPreview: pe,
  "collaboration-cursor__caret": "_collaboration-cursor__caret_4vj2p_74",
  "collaboration-cursor__label": "_collaboration-cursor__label_4vj2p_85"
};
function g(n, e) {
  const o = n.nodeSize - 2;
  if (e <= 1)
    for (e = 1; n.resolve(e).parent.type.name !== "blockContainer" && e < o; )
      e++;
  else if (e >= o)
    for (e = o - 1; n.resolve(e).parent.type.name !== "blockContainer" && e > 1; )
      e--;
  n.resolve(e).parent.type.name === "blockGroup" && e++;
  const r = n.resolve(e), i = r.depth;
  let s = r.node(i), l = i;
  for (; ; ) {
    if (l < 0)
      throw new Error(
        "Could not find blockContainer node. This can only happen if the underlying BlockNote schema has been edited."
      );
    if (s.type.name === "blockContainer")
      break;
    l -= 1, s = r.node(l);
  }
  const a = s.attrs.id, d = s.firstChild, c = d.type, p = s.childCount === 2 ? s.lastChild.childCount : 0, h = r.start(l), f = r.end(l);
  return {
    id: a,
    node: s,
    contentNode: d,
    contentType: c,
    numChildBlocks: p,
    startPos: h,
    endPos: f,
    depth: l
  };
}
const he = B.create({
  name: "blockBackgroundColor",
  addGlobalAttributes() {
    return [
      {
        types: ["blockContainer"],
        attributes: {
          backgroundColor: {
            default: "default",
            parseHTML: (n) => n.hasAttribute("data-background-color") ? n.getAttribute("data-background-color") : "default",
            renderHTML: (n) => n.backgroundColor !== "default" && {
              "data-background-color": n.backgroundColor
            }
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setBlockBackgroundColor: (n, e) => ({ state: t, view: o }) => {
        const r = g(t.doc, n);
        return r === void 0 ? !1 : (t.tr.setNodeAttribute(
          r.startPos - 1,
          "backgroundColor",
          e
        ), o.focus(), !0);
      }
    };
  }
}), fe = at.create({
  name: "backgroundColor",
  addAttributes() {
    return {
      color: {
        default: void 0,
        parseHTML: (n) => n.getAttribute("data-background-color"),
        renderHTML: (n) => ({
          "data-background-color": n.color
        })
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (n) => typeof n == "string" ? !1 : n.hasAttribute("data-background-color") ? { color: n.getAttribute("data-background-color") } : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["span", n, 0];
  },
  addCommands() {
    return {
      setBackgroundColor: (n) => ({ commands: e }) => n !== "default" ? e.setMark(this.name, { color: n }) : e.unsetMark(this.name)
    };
  }
}), ut = "_blockOuter_xgzwr_5", pt = "_block_xgzwr_5", ht = "_reactNodeViewRenderer_xgzwr_17", ft = "_blockContent_xgzwr_22", mt = "_blockGroup_xgzwr_42", gt = "_isEmpty_xgzwr_240", kt = "_inlineContent_xgzwr_240", bt = "_isFilter_xgzwr_241", yt = "_hasAnchor_xgzwr_263", k = {
  blockOuter: ut,
  block: pt,
  reactNodeViewRenderer: ht,
  blockContent: ft,
  blockGroup: mt,
  isEmpty: gt,
  inlineContent: kt,
  isFilter: bt,
  hasAnchor: yt
}, jo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  block: pt,
  blockContent: ft,
  blockGroup: mt,
  blockOuter: ut,
  default: k,
  hasAnchor: yt,
  inlineContent: kt,
  isEmpty: gt,
  isFilter: bt,
  reactNodeViewRenderer: ht
}, Symbol.toStringTag, { value: "Module" }));
function nt(n) {
  return "data-" + n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function me(n) {
  const e = {};
  return Object.entries(n.propSchema).forEach(([t, o]) => {
    e[t] = {
      default: o.default,
      keepOnSplit: !0,
      // Props are displayed in kebab-case as HTML attributes. If a prop's
      // value is the same as its default, we don't display an HTML
      // attribute for it.
      parseHTML: (r) => r.getAttribute(nt(t)),
      renderHTML: (r) => r[t] !== o.default ? {
        [nt(t)]: r[t]
      } : {}
    };
  }), e;
}
function ge(n) {
  return [
    {
      tag: "div[data-content-type=" + n.type + "]"
    }
  ];
}
function ke(n, e) {
  const t = document.createElement("div");
  t.setAttribute("data-content-type", n.type);
  for (const [r, i] of Object.entries(e))
    t.setAttribute(r, i);
  let o;
  return n.containsInlineContent ? (o = document.createElement("div"), t.appendChild(o)) : o = void 0, o !== void 0 ? {
    dom: t,
    contentDOM: o
  } : {
    dom: t
  };
}
function qo(n) {
  return {
    node: P({
      name: n.type,
      content: n.containsInlineContent ? "inline*" : "",
      selectable: n.containsInlineContent,
      addOptions() {
        return {
          editor: void 0
        };
      },
      addAttributes() {
        return me(n);
      },
      parseHTML() {
        return ge(n);
      },
      renderHTML({ HTMLAttributes: t }) {
        return ke(n, t);
      },
      addNodeView() {
        return ({ HTMLAttributes: t, getPos: o }) => {
          const r = document.createElement("div");
          r.className = k.blockContent, r.setAttribute("data-content-type", n.type);
          for (const [h, f] of Object.entries(t))
            r.setAttribute(h, f);
          const i = this.options.editor;
          if (typeof o == "boolean")
            throw new Error(
              "Cannot find node position as getPos is a boolean, not a function."
            );
          const s = o(), d = i._tiptapEditor.state.doc.resolve(s).node().attrs.id, c = i.getBlock(d);
          if (c.type !== n.type)
            throw new Error("Block type does not match");
          const p = n.render(c, i);
          return "contentDOM" in p && (p.contentDOM.className = `${p.contentDOM.className ? p.contentDOM.className + " " : ""}${k.inlineContent}`), r.appendChild(p.dom), "contentDOM" in p ? {
            dom: r,
            contentDOM: p.contentDOM
          } : {
            dom: r
          };
        };
      }
    }),
    propSchema: n.propSchema
  };
}
function P(n) {
  return V.create({
    ...n,
    group: "blockContent"
  });
}
const be = P({
  name: "heading",
  content: "inline*",
  addAttributes() {
    return {
      level: {
        default: "1",
        // instead of "level" attributes, use "data-level"
        parseHTML: (n) => n.getAttribute("data-level"),
        renderHTML: (n) => ({
          "data-level": n.level
        })
      }
    };
  },
  addInputRules() {
    return [
      ...["1", "2", "3"].map((n) => new Y({
        find: new RegExp(`^(#{${parseInt(n)}})\\s$`),
        handler: ({ state: e, chain: t, range: o }) => {
          t().BNUpdateBlock(e.selection.from, {
            type: "heading",
            props: {
              level: n
            }
          }).deleteRange({ from: o.from, to: o.to });
        }
      }))
    ];
  },
  parseHTML() {
    return [
      {
        tag: "h1",
        attrs: { level: "1" },
        node: "heading"
      },
      {
        tag: "h2",
        attrs: { level: "2" },
        node: "heading"
      },
      {
        tag: "h3",
        attrs: { level: "3" },
        node: "heading"
      }
    ];
  },
  renderHTML({ node: n, HTMLAttributes: e }) {
    return [
      "div",
      x(e, {
        class: k.blockContent,
        "data-content-type": this.name
      }),
      ["h" + n.attrs.level, { class: k.inlineContent }, 0]
    ];
  }
}), vt = (n) => {
  const { node: e, contentType: t } = g(
    n.state.doc,
    n.state.selection.from
  ), o = n.state.selection.anchor === n.state.selection.head;
  return !t.name.endsWith("ListItem") || !o ? !1 : n.commands.first(({ state: r, chain: i, commands: s }) => [
    () => (
      // Changes list item block to a text block if the content is empty.
      s.command(() => e.textContent.length === 0 ? s.BNUpdateBlock(r.selection.from, {
        type: "paragraph",
        props: {}
      }) : !1)
    ),
    () => (
      // Splits the current block, moving content inside that's after the cursor to a new block of the same type
      // below.
      s.command(() => e.textContent.length > 0 ? (i().deleteSelection().BNSplitBlock(r.selection.from, !0).run(), !0) : !1)
    )
  ]);
}, ye = P({
  name: "bulletListItem",
  content: "inline*",
  addInputRules() {
    return [
      // Creates an unordered list when starting with "-", "+", or "*".
      new Y({
        find: new RegExp("^[-+*]\\s$"),
        handler: ({ state: n, chain: e, range: t }) => {
          e().BNUpdateBlock(n.selection.from, {
            type: "bulletListItem",
            props: {}
          }).deleteRange({ from: t.from, to: t.to });
        }
      })
    ];
  },
  addKeyboardShortcuts() {
    return {
      Enter: () => vt(this.editor)
    };
  },
  parseHTML() {
    return [
      // Case for regular HTML list structure.
      {
        tag: "li",
        getAttrs: (n) => {
          if (typeof n == "string")
            return !1;
          const e = n.parentElement;
          return e === null ? !1 : e.tagName === "UL" ? {} : !1;
        },
        node: "bulletListItem"
      },
      // Case for BlockNote list structure.
      {
        tag: "p",
        getAttrs: (n) => {
          if (typeof n == "string")
            return !1;
          const e = n.parentElement;
          return e === null ? !1 : e.getAttribute("data-content-type") === "bulletListItem" ? {} : !1;
        },
        priority: 300,
        node: "bulletListItem"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return [
      "div",
      x(n, {
        class: k.blockContent,
        "data-content-type": this.name
      }),
      ["p", { class: k.inlineContent }, 0]
    ];
  }
}), ve = new S("numbered-list-indexing"), we = () => new y({
  key: ve,
  appendTransaction: (n, e, t) => {
    const o = t.tr;
    o.setMeta("numberedListIndexing", !0);
    let r = !1;
    return t.doc.descendants((i, s) => {
      if (i.type.name === "blockContainer" && i.firstChild.type.name === "numberedListItem") {
        let l = "1";
        const a = s === 1, d = g(o.doc, s + 1);
        if (d === void 0)
          return;
        if (!a) {
          const h = g(o.doc, s - 2);
          if (h === void 0)
            return;
          if (!(d.depth !== h.depth)) {
            const m = h.contentNode;
            if (h.contentType.name === "numberedListItem") {
              const w = m.attrs.index;
              l = (parseInt(w) + 1).toString();
            }
          }
        }
        d.contentNode.attrs.index !== l && (r = !0, o.setNodeMarkup(s + 1, void 0, {
          index: l
        }));
      }
    }), r ? o : null;
  }
}), Se = P({
  name: "numberedListItem",
  content: "inline*",
  addAttributes() {
    return {
      index: {
        default: null,
        parseHTML: (n) => n.getAttribute("data-index"),
        renderHTML: (n) => ({
          "data-index": n.index
        })
      }
    };
  },
  addInputRules() {
    return [
      // Creates an ordered list when starting with "1.".
      new Y({
        find: new RegExp("^1\\.\\s$"),
        handler: ({ state: n, chain: e, range: t }) => {
          e().BNUpdateBlock(n.selection.from, {
            type: "numberedListItem",
            props: {}
          }).deleteRange({ from: t.from, to: t.to });
        }
      })
    ];
  },
  addKeyboardShortcuts() {
    return {
      Enter: () => vt(this.editor)
    };
  },
  addProseMirrorPlugins() {
    return [we()];
  },
  parseHTML() {
    return [
      // Case for regular HTML list structure.
      // (e.g.: when pasting from other apps)
      {
        tag: "li",
        getAttrs: (n) => {
          if (typeof n == "string")
            return !1;
          const e = n.parentElement;
          return e === null ? !1 : e.tagName === "OL" ? {} : !1;
        },
        node: "numberedListItem"
      },
      // Case for BlockNote list structure.
      // (e.g.: when pasting from blocknote)
      {
        tag: "p",
        getAttrs: (n) => {
          if (typeof n == "string")
            return !1;
          const e = n.parentElement;
          return e === null ? !1 : e.getAttribute("data-content-type") === "numberedListItem" ? {} : !1;
        },
        priority: 300,
        node: "numberedListItem"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return [
      "div",
      x(n, {
        class: k.blockContent,
        "data-content-type": this.name
      }),
      // we use a <p> tag, because for <li> tags we'd need to add a <ul> parent for around siblings to be semantically correct,
      // which would be quite cumbersome
      ["p", { class: k.inlineContent }, 0]
    ];
  }
}), Ce = P({
  name: "paragraph",
  content: "inline*",
  parseHTML() {
    return [
      {
        tag: "p",
        priority: 200,
        node: "paragraph"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return [
      "div",
      x(n, {
        class: k.blockContent,
        "data-content-type": this.name
      }),
      ["p", { class: k.inlineContent }, 0]
    ];
  }
}), N = {
  backgroundColor: {
    default: "transparent"
  },
  textColor: {
    default: "black"
    // TODO
  },
  textAlignment: {
    default: "left",
    values: ["left", "center", "right", "justify"]
  }
}, wt = {
  paragraph: {
    propSchema: N,
    node: Ce
  },
  heading: {
    propSchema: {
      ...N,
      level: { default: "1", values: ["1", "2", "3"] }
    },
    node: be
  },
  bulletListItem: {
    propSchema: N,
    node: ye
  },
  numberedListItem: {
    propSchema: N,
    node: Se
  }
};
function Me(n, e = JSON.stringify) {
  const t = {};
  return n.filter((o) => {
    const r = e(o);
    return Object.prototype.hasOwnProperty.call(t, r) ? !1 : t[r] = !0;
  });
}
function Ee(n) {
  const e = n.filter(
    (o, r) => n.indexOf(o) !== r
  );
  return Me(e);
}
const U = B.create({
  name: "uniqueID",
  // we’ll set a very high priority to make sure this runs first
  // and is compatible with `appendTransaction` hooks of other extensions
  priority: 1e4,
  addOptions() {
    return {
      attributeName: "id",
      types: [],
      generateID: () => window.__TEST_OPTIONS ? (window.__TEST_OPTIONS.mockID === void 0 ? window.__TEST_OPTIONS.mockID = 0 : window.__TEST_OPTIONS.mockID++, window.__TEST_OPTIONS.mockID.toString()) : ne(),
      filterTransaction: null
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          [this.options.attributeName]: {
            default: null,
            parseHTML: (n) => n.getAttribute(`data-${this.options.attributeName}`),
            renderHTML: (n) => ({
              [`data-${this.options.attributeName}`]: n[this.options.attributeName]
            })
          }
        }
      }
    ];
  },
  // check initial content for missing ids
  // onCreate() {
  //   // Don’t do this when the collaboration extension is active
  //   // because this may update the content, so Y.js tries to merge these changes.
  //   // This leads to empty block nodes.
  //   // See: https://github.com/ueberdosis/tiptap/issues/2400
  //   if (
  //     this.editor.extensionManager.extensions.find(
  //       (extension) => extension.name === "collaboration"
  //     )
  //   ) {
  //     return;
  //   }
  //   const { view, state } = this.editor;
  //   const { tr, doc } = state;
  //   const { types, attributeName, generateID } = this.options;
  //   const nodesWithoutId = findChildren(doc, (node) => {
  //     return (
  //       types.includes(node.type.name) && node.attrs[attributeName] === null
  //     );
  //   });
  //   nodesWithoutId.forEach(({ node, pos }) => {
  //     tr.setNodeMarkup(pos, undefined, {
  //       ...node.attrs,
  //       [attributeName]: generateID(),
  //     });
  //   });
  //   tr.setMeta("addToHistory", false);
  //   view.dispatch(tr);
  // },
  addProseMirrorPlugins() {
    let n = null, e = !1;
    return [
      new y({
        key: new S("uniqueID"),
        appendTransaction: (t, o, r) => {
          const i = t.some((m) => m.docChanged) && !o.doc.eq(r.doc), s = this.options.filterTransaction && t.some((m) => {
            var b, v;
            return !(!((v = (b = this.options).filterTransaction) === null || v === void 0) && v.call(b, m));
          });
          if (!i || s)
            return;
          const { tr: l } = r, { types: a, attributeName: d, generateID: c } = this.options, p = Pt(
            o.doc,
            t
          ), { mapping: h } = p;
          if (Ot(p).forEach(({ newRange: m }) => {
            const b = Dt(
              r.doc,
              m,
              (C) => a.includes(C.type.name)
            ), v = b.map(({ node: C }) => C.attrs[d]).filter((C) => C !== null), w = Ee(v);
            b.forEach(({ node: C, pos: D }) => {
              var G;
              const Z = (G = l.doc.nodeAt(D)) === null || G === void 0 ? void 0 : G.attrs[d];
              if (Z === null) {
                l.setNodeMarkup(D, void 0, {
                  ...C.attrs,
                  [d]: c()
                });
                return;
              }
              const { deleted: At } = h.invert().mapResult(D);
              At && w.includes(Z) && l.setNodeMarkup(D, void 0, {
                ...C.attrs,
                [d]: c()
              });
            });
          }), !!l.steps.length)
            return l;
        },
        // we register a global drag handler to track the current drag source element
        view(t) {
          const o = (r) => {
            var i;
            n = !((i = t.dom.parentElement) === null || i === void 0) && i.contains(r.target) ? t.dom.parentElement : null;
          };
          return window.addEventListener("dragstart", o), {
            destroy() {
              window.removeEventListener("dragstart", o);
            }
          };
        },
        props: {
          // `handleDOMEvents` is called before `transformPasted`
          // so we can do some checks before
          handleDOMEvents: {
            // only create new ids for dropped content while holding `alt`
            // or content is dragged from another editor
            drop: (t, o) => {
              var r;
              return (n !== t.dom.parentElement || ((r = o.dataTransfer) === null || r === void 0 ? void 0 : r.effectAllowed) === "copy") && (n = null, e = !0), !1;
            },
            // always create new ids on pasted content
            paste: () => (e = !0, !1)
          },
          // we’ll remove ids for every pasted node
          // so we can create a new one within `appendTransaction`
          transformPasted: (t) => {
            if (!e)
              return t;
            const { types: o, attributeName: r } = this.options, i = (s) => {
              const l = [];
              return s.forEach((a) => {
                if (a.isText) {
                  l.push(a);
                  return;
                }
                if (!o.includes(a.type.name)) {
                  l.push(a.copy(i(a.content)));
                  return;
                }
                const d = a.type.create(
                  {
                    ...a.attrs,
                    [r]: null
                  },
                  i(a.content),
                  a.marks
                );
                l.push(d);
              }), I.from(l);
            };
            return e = !1, new T(
              i(t.content),
              t.openStart,
              t.openEnd
            );
          }
        }
      })
    ];
  }
});
class Be extends Error {
  constructor(e) {
    super(`Unreachable case: ${e}`);
  }
}
const St = /* @__PURE__ */ new Set([
  "bold",
  "italic",
  "underline",
  "strike",
  "code"
]), Ct = /* @__PURE__ */ new Set(["textColor", "backgroundColor"]);
function rt(n, e) {
  const t = [];
  for (const [o, r] of Object.entries(n.styles))
    St.has(o) ? t.push(e.mark(o)) : Ct.has(o) && t.push(e.mark(o, { color: r }));
  return n.text.split(/(\n)/g).filter((o) => o.length > 0).map((o) => o === `
` ? e.nodes.hardBreak.create() : e.text(o, t));
}
function Te(n, e) {
  const t = e.marks.link.create({
    href: n.href
  });
  return Mt(n.content, e).map((o) => {
    if (o.type.name === "text")
      return o.mark([...o.marks, t]);
    if (o.type.name === "hardBreak")
      return o;
    throw new Error("unexpected node type");
  });
}
function Mt(n, e) {
  let t = [];
  if (typeof n == "string")
    return t.push(
      ...rt({ type: "text", text: n, styles: {} }, e)
    ), t;
  for (const o of n)
    t.push(...rt(o, e));
  return t;
}
function Et(n, e) {
  let t = [];
  for (const o of n)
    if (o.type === "link")
      t.push(...Te(o, e));
    else if (o.type === "text")
      t.push(...Mt([o], e));
    else
      throw new Be(o);
  return t;
}
function O(n, e) {
  let t = n.id;
  t === void 0 && (t = U.options.generateID());
  let o = n.type;
  o === void 0 && (o = "paragraph");
  let r;
  if (!n.content)
    r = e.nodes[o].create(n.props);
  else if (typeof n.content == "string")
    r = e.nodes[o].create(
      n.props,
      e.text(n.content)
    );
  else {
    const l = Et(n.content, e);
    r = e.nodes[o].create(n.props, l);
  }
  const i = [];
  if (n.children)
    for (const l of n.children)
      i.push(O(l, e));
  const s = e.nodes.blockGroup.create({}, i);
  return e.nodes.blockContainer.create(
    {
      id: t,
      ...n.props
    },
    i.length > 0 ? [r, s] : r
  );
}
function xe(n) {
  const e = [];
  let t;
  return n.content.forEach((o) => {
    if (o.type.name === "hardBreak") {
      t ? t.type === "text" ? t.text += `
` : t.type === "link" && (t.content[t.content.length - 1].text += `
`) : t = {
        type: "text",
        text: `
`,
        styles: {}
      };
      return;
    }
    const r = {};
    let i;
    for (const s of o.marks)
      if (s.type.name === "link")
        i = s;
      else if (St.has(s.type.name))
        r[s.type.name] = !0;
      else if (Ct.has(s.type.name))
        r[s.type.name] = s.attrs.color;
      else
        throw Error("Mark is of an unrecognized type: " + s.type.name);
    t ? t.type === "text" ? i ? (e.push(t), t = {
      type: "link",
      href: i.attrs.href,
      content: [
        {
          type: "text",
          text: o.textContent,
          styles: r
        }
      ]
    }) : JSON.stringify(t.styles) === JSON.stringify(r) ? t.text += o.textContent : (e.push(t), t = {
      type: "text",
      text: o.textContent,
      styles: r
    }) : t.type === "link" && (i ? t.href === i.attrs.href ? JSON.stringify(
      t.content[t.content.length - 1].styles
    ) === JSON.stringify(r) ? t.content[t.content.length - 1].text += o.textContent : t.content.push({
      type: "text",
      text: o.textContent,
      styles: r
    }) : (e.push(t), t = {
      type: "link",
      href: i.attrs.href,
      content: [
        {
          type: "text",
          text: o.textContent,
          styles: r
        }
      ]
    }) : (e.push(t), t = {
      type: "text",
      text: o.textContent,
      styles: r
    })) : i ? t = {
      type: "link",
      href: i.attrs.href,
      content: [
        {
          type: "text",
          text: o.textContent,
          styles: r
        }
      ]
    } : t = {
      type: "text",
      text: o.textContent,
      styles: r
    };
  }), t && e.push(t), e;
}
function M(n, e, t) {
  if (n.type.name !== "blockContainer")
    throw Error(
      "Node must be of type blockContainer, but is of type" + n.type.name + "."
    );
  const o = t == null ? void 0 : t.get(n);
  if (o)
    return o;
  const r = g(n, 0);
  let i = r.id;
  i === null && (i = U.options.generateID());
  const s = {};
  for (const [c, p] of Object.entries({
    ...r.node.attrs,
    ...r.contentNode.attrs
  })) {
    const h = e[r.contentType.name];
    if (!h)
      throw Error(
        "Block is of an unrecognized type: " + r.contentType.name
      );
    const f = h.propSchema;
    c in f ? s[c] = p : c !== "id" && !(c in N) && console.warn("Block has an unrecognized attribute: " + c);
  }
  const l = xe(r.contentNode), a = [];
  for (let c = 0; c < r.numChildBlocks; c++)
    a.push(
      M(r.node.lastChild.child(c), e, t)
    );
  const d = {
    id: i,
    type: r.contentType.name,
    props: s,
    content: l,
    children: a
  };
  return t == null || t.set(n, d), d;
}
const it = new S("previous-blocks"), _e = {
  // Numbered List Items
  index: "index",
  // Headings
  level: "level",
  // All Blocks
  type: "type",
  depth: "depth",
  "depth-change": "depth-change"
}, Ie = () => {
  let n;
  return new y({
    key: it,
    view(e) {
      return {
        update: async (t, o) => {
          var r;
          ((r = this.key) == null ? void 0 : r.getState(t.state).updatedBlocks.size) > 0 && (n = setTimeout(() => {
            t.dispatch(
              t.state.tr.setMeta(it, { clearUpdate: !0 })
            );
          }, 0));
        },
        destroy: () => {
          n && clearTimeout(n);
        }
      };
    },
    state: {
      init() {
        return {
          // Block attributes, by block ID, from just before the previous transaction.
          prevTransactionOldBlockAttrs: {},
          // Block attributes, by block ID, from just before the current transaction.
          currentTransactionOldBlockAttrs: {},
          // Set of IDs of blocks whose attributes changed from the current transaction.
          updatedBlocks: /* @__PURE__ */ new Set()
        };
      },
      apply(e, t, o, r) {
        if (t.currentTransactionOldBlockAttrs = {}, t.updatedBlocks.clear(), !e.docChanged || o.doc.eq(r.doc))
          return t;
        const i = {}, s = Q(o.doc, (d) => d.attrs.id), l = new Map(
          s.map((d) => [d.node.attrs.id, d])
        ), a = Q(r.doc, (d) => d.attrs.id);
        for (let d of a) {
          const c = l.get(d.node.attrs.id), p = c == null ? void 0 : c.node.firstChild, h = d.node.firstChild;
          if (c && p && h) {
            const f = {
              index: h.attrs.index,
              level: h.attrs.level,
              type: h.type.name,
              depth: r.doc.resolve(d.pos).depth
            };
            let m = {
              index: p.attrs.index,
              level: p.attrs.level,
              type: p.type.name,
              depth: o.doc.resolve(c.pos).depth
            };
            i[d.node.attrs.id] = m, e.getMeta("numberedListIndexing") && (d.node.attrs.id in t.prevTransactionOldBlockAttrs && (m = t.prevTransactionOldBlockAttrs[d.node.attrs.id]), f.type === "numberedListItem" && (m.index = f.index)), t.currentTransactionOldBlockAttrs[d.node.attrs.id] = m, JSON.stringify(m) !== JSON.stringify(f) && (m["depth-change"] = m.depth - f.depth, t.updatedBlocks.add(d.node.attrs.id));
          }
        }
        return t.prevTransactionOldBlockAttrs = i, t;
      }
    },
    props: {
      decorations(e) {
        const t = this.getState(e);
        if (t.updatedBlocks.size === 0)
          return;
        const o = [];
        return e.doc.descendants((r, i) => {
          if (!r.attrs.id || !t.updatedBlocks.has(r.attrs.id))
            return;
          const s = t.currentTransactionOldBlockAttrs[r.attrs.id], l = {};
          for (let [d, c] of Object.entries(s))
            l["data-prev-" + _e[d]] = c || "none";
          const a = R.node(i, i + r.nodeSize, {
            ...l
          });
          o.push(a);
        }), z.create(e.doc, o);
      }
    }
  });
}, He = {
  blockColor: "data-block-color",
  blockStyle: "data-block-style",
  id: "data-id",
  depth: "data-depth",
  depthChange: "data-depth-change"
}, Ae = V.create({
  name: "blockContainer",
  group: "blockContainer",
  // A block always contains content, and optionally a blockGroup which contains nested blocks
  content: "blockContent blockGroup?",
  // Ensures content-specific keyboard handlers trigger first.
  priority: 50,
  defining: !0,
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "div",
        getAttrs: (n) => {
          if (typeof n == "string")
            return !1;
          const e = {};
          for (let [t, o] of Object.entries(He))
            n.getAttribute(o) && (e[t] = n.getAttribute(o));
          return n.getAttribute("data-node-type") === "blockContainer" ? e : !1;
        }
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return [
      "div",
      x(n, {
        class: k.blockOuter,
        "data-node-type": "block-outer"
      }),
      [
        "div",
        x(n, {
          // TODO: maybe remove html attributes from inner block
          class: k.block,
          "data-node-type": this.name
        }),
        0
      ]
    ];
  },
  addCommands() {
    return {
      // Creates a new text block at a given position.
      BNCreateBlock: (n) => ({ state: e, dispatch: t }) => {
        const o = e.schema.nodes.blockContainer.createAndFill();
        return t && e.tr.insert(n, o), !0;
      },
      // Deletes a block at a given position.
      BNDeleteBlock: (n) => ({ state: e, dispatch: t }) => {
        const o = g(e.doc, n);
        if (o === void 0)
          return !1;
        const { startPos: r, endPos: i } = o;
        return t && e.tr.deleteRange(r, i), !0;
      },
      // Updates a block at a given position.
      BNUpdateBlock: (n, e) => ({ state: t, dispatch: o }) => {
        const r = g(t.doc, n);
        if (r === void 0)
          return !1;
        const { startPos: i, endPos: s, node: l, contentNode: a } = r;
        if (o) {
          if (e.children !== void 0) {
            const d = [];
            for (const c of e.children)
              d.push(O(c, t.schema));
            l.childCount === 2 ? t.tr.replace(
              i + a.nodeSize + 1,
              s - 1,
              new T(I.from(d), 0, 0)
            ) : t.tr.insert(
              i + a.nodeSize,
              t.schema.nodes.blockGroup.create({}, d)
            );
          }
          if (e.content !== void 0) {
            let d = [];
            typeof e.content == "string" ? d.push(t.schema.text(e.content)) : d = Et(e.content, t.schema), t.tr.replace(
              i + 1,
              i + a.nodeSize - 1,
              new T(I.from(d), 0, 0)
            );
          }
          t.tr.setNodeMarkup(
            i,
            e.type === void 0 ? void 0 : t.schema.nodes[e.type],
            {
              ...a.attrs,
              ...e.props
            }
          ), t.tr.setNodeMarkup(i - 1, void 0, {
            ...l.attrs,
            ...e.props
          });
        }
        return !0;
      },
      // Appends the text contents of a block to the nearest previous block, given a position between them. Children of
      // the merged block are moved out of it first, rather than also being merged.
      //
      // In the example below, the position passed into the function is between Block1 and Block2.
      //
      // Block1
      //    Block2
      // Block3
      //    Block4
      //        Block5
      //
      // Becomes:
      //
      // Block1
      //    Block2Block3
      // Block4
      //     Block5
      BNMergeBlocks: (n) => ({ state: e, dispatch: t }) => {
        const o = e.doc.resolve(n + 1).node().type.name === "blockContainer", r = e.doc.resolve(n - 1).node().type.name === "blockContainer";
        if (!o || !r)
          return !1;
        const i = g(
          e.doc,
          n + 1
        ), { node: s, contentNode: l, startPos: a, endPos: d, depth: c } = i;
        if (s.childCount === 2) {
          const f = e.doc.resolve(
            a + l.nodeSize + 1
          ), m = e.doc.resolve(d - 1), b = f.blockRange(m);
          t && e.tr.lift(b, c - 1);
        }
        let p = n - 1, h = g(e.doc, p);
        for (; h.numChildBlocks > 0; )
          if (p--, h = g(e.doc, p), h === void 0)
            return !1;
        return t && (t(
          e.tr.deleteRange(a, a + l.nodeSize).replace(
            p - 1,
            a,
            new T(l.content, 0, 0)
          ).scrollIntoView()
        ), e.tr.setSelection(
          new et(e.doc.resolve(p - 1))
        )), !0;
      },
      // Splits a block at a given position. Content after the position is moved to a new block below, at the same
      // nesting level.
      BNSplitBlock: (n, e) => ({ state: t, dispatch: o }) => {
        const r = g(t.doc, n);
        if (r === void 0)
          return !1;
        const { contentNode: i, contentType: s, startPos: l, endPos: a, depth: d } = r, c = t.doc.cut(l + 1, n), p = t.doc.cut(n, a - 1), h = t.schema.nodes.blockContainer.createAndFill(), f = a + 1, m = f + 2;
        return o && (t.tr.insert(f, h), t.tr.replace(
          m,
          m + 1,
          p.content.size > 0 ? new T(
            I.from(p),
            d + 2,
            d + 2
          ) : void 0
        ), e && t.tr.setBlockType(
          m,
          m,
          t.schema.node(s).type,
          i.attrs
        ), t.tr.setSelection(
          new et(t.doc.resolve(m))
        ), t.tr.replace(
          l + 1,
          a - 1,
          c.content.size > 0 ? new T(
            I.from(c),
            d + 2,
            d + 2
          ) : void 0
        )), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    return [Ie()];
  },
  addKeyboardShortcuts() {
    return {
      Backspace: () => this.editor.commands.first(({ commands: t }) => [
        // Deletes the selection if it's not empty.
        () => t.deleteSelection(),
        // Undoes an input rule if one was triggered in the last editor state change.
        () => t.undoInputRule(),
        // Reverts block content type to a paragraph if the selection is at the start of the block.
        () => t.command(({ state: o }) => {
          const { contentType: r } = g(
            o.doc,
            o.selection.from
          ), i = o.selection.$anchor.parentOffset === 0, s = r.name === "paragraph";
          return i && !s ? t.BNUpdateBlock(o.selection.from, {
            type: "paragraph",
            props: {}
          }) : !1;
        }),
        // Removes a level of nesting if the block is indented if the selection is at the start of the block.
        () => t.command(({ state: o }) => o.selection.$anchor.parentOffset === 0 ? t.liftListItem("blockContainer") : !1),
        // Merges block with the previous one if it isn't indented, isn't the first block in the doc, and the selection
        // is at the start of the block.
        () => t.command(({ state: o }) => {
          const { depth: r, startPos: i } = g(
            o.doc,
            o.selection.from
          ), s = o.selection.$anchor.parentOffset === 0, l = o.selection.anchor === o.selection.head, a = i === 2, d = i - 1;
          return !a && s && l && r === 2 ? t.BNMergeBlocks(d) : !1;
        })
      ]),
      Enter: () => this.editor.commands.first(({ commands: t }) => [
        // Removes a level of nesting if the block is empty & indented, while the selection is also empty & at the start
        // of the block.
        () => t.command(({ state: o }) => {
          const { node: r, depth: i } = g(
            o.doc,
            o.selection.from
          ), s = o.selection.$anchor.parentOffset === 0, l = o.selection.anchor === o.selection.head, a = r.textContent.length === 0, d = i > 2;
          return s && l && a && d ? t.liftListItem("blockContainer") : !1;
        }),
        // Creates a new block and moves the selection to it if the current one is empty, while the selection is also
        // empty & at the start of the block.
        () => t.command(({ state: o, chain: r }) => {
          const { node: i, endPos: s } = g(
            o.doc,
            o.selection.from
          ), l = o.selection.$anchor.parentOffset === 0, a = o.selection.anchor === o.selection.head, d = i.textContent.length === 0;
          if (l && a && d) {
            const c = s + 1, p = c + 2;
            return r().BNCreateBlock(c).setTextSelection(p).run(), !0;
          }
          return !1;
        }),
        // Splits the current block, moving content inside that's after the cursor to a new text block below. Also
        // deletes the selection beforehand, if it's not empty.
        () => t.command(({ state: o, chain: r }) => {
          const { node: i } = g(
            o.doc,
            o.selection.from
          );
          return i.textContent.length === 0 ? !1 : (r().deleteSelection().BNSplitBlock(o.selection.from, !1).run(), !0);
        })
      ]),
      // Always returning true for tab key presses ensures they're not captured by the browser. Otherwise, they blur the
      // editor since the browser will try to use tab for keyboard navigation.
      Tab: () => (this.editor.commands.sinkListItem("blockContainer"), !0),
      "Shift-Tab": () => (this.editor.commands.liftListItem("blockContainer"), !0),
      "Mod-Alt-0": () => this.editor.commands.BNCreateBlock(
        this.editor.state.selection.anchor + 2
      ),
      "Mod-Alt-1": () => this.editor.commands.BNUpdateBlock(this.editor.state.selection.anchor, {
        type: "heading",
        props: {
          level: "1"
        }
      }),
      "Mod-Alt-2": () => this.editor.commands.BNUpdateBlock(this.editor.state.selection.anchor, {
        type: "heading",
        props: {
          level: "2"
        }
      }),
      "Mod-Alt-3": () => this.editor.commands.BNUpdateBlock(this.editor.state.selection.anchor, {
        type: "heading",
        props: {
          level: "3"
        }
      }),
      "Mod-Shift-7": () => this.editor.commands.BNUpdateBlock(this.editor.state.selection.anchor, {
        type: "bulletListItem",
        props: {}
      }),
      "Mod-Shift-8": () => this.editor.commands.BNUpdateBlock(this.editor.state.selection.anchor, {
        type: "numberedListItem",
        props: {}
      })
    };
  }
}), Le = V.create({
  name: "blockGroup",
  group: "blockGroup",
  content: "blockContainer+",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "div",
        getAttrs: (n) => typeof n == "string" ? !1 : n.getAttribute("data-node-type") === "blockGroup" ? null : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return [
      "div",
      x(this.options.HTMLAttributes, n, {
        class: k.blockGroup,
        "data-node-type": "blockGroup"
      }),
      0
    ];
  }
}), Ne = [
  Ae,
  Le,
  V.create({
    name: "doc",
    topNode: !0,
    content: "blockGroup"
  })
], Pe = (n) => {
  const e = q.fromSchema(n);
  return new q(
    {
      ...e.nodes
      // TODO: If a serializer is defined in the config for a custom block, it
      //  should be added here. We still need to figure out how the serializer
      //  should be defined in the custom blocks API though, and implement that,
      //  before we can do this.
    },
    e.marks
  );
}, Oe = B.create({
  addProseMirrorPlugins() {
    return [
      new y({
        props: {
          clipboardSerializer: Pe(this.editor.schema)
        }
      })
    ];
  }
});
class F {
  constructor() {
    u(this, "callbacks", {});
  }
  on(e, t) {
    return this.callbacks[e] || (this.callbacks[e] = []), this.callbacks[e].push(t), () => this.off(e, t);
  }
  emit(e, ...t) {
    const o = this.callbacks[e];
    o && o.forEach((r) => r.apply(this, t));
  }
  off(e, t) {
    const o = this.callbacks[e];
    o && (t ? this.callbacks[e] = o.filter((r) => r !== t) : delete this.callbacks[e]);
  }
  removeAllListeners() {
    this.callbacks = {};
  }
}
const De = Rt(
  (n) => n.type.name === "blockContainer"
);
class Re {
  constructor(e, t, o = () => {
  }) {
    u(this, "suggestionsMenuState");
    u(this, "updateSuggestionsMenu");
    u(this, "pluginState");
    u(this, "handleScroll", () => {
      var e;
      if ((e = this.suggestionsMenuState) != null && e.show) {
        const t = document.querySelector(
          `[data-decoration-id="${this.pluginState.decorationId}"]`
        );
        this.suggestionsMenuState.referencePos = t.getBoundingClientRect(), this.updateSuggestionsMenu();
      }
    });
    this.editor = e, this.pluginKey = t, this.pluginState = W(), this.updateSuggestionsMenu = () => {
      if (!this.suggestionsMenuState)
        throw new Error("Attempting to update uninitialized suggestions menu");
      o(this.suggestionsMenuState);
    }, document.addEventListener("scroll", this.handleScroll);
  }
  update(e, t) {
    const o = this.pluginKey.getState(t), r = this.pluginKey.getState(e.state), i = !o.active && r.active, s = o.active && !r.active, l = o.active && r.active;
    if (!i && !l && !s)
      return;
    if (this.pluginState = s ? o : r, s || !this.editor.isEditable) {
      this.suggestionsMenuState.show = !1, this.updateSuggestionsMenu();
      return;
    }
    const a = document.querySelector(
      `[data-decoration-id="${this.pluginState.decorationId}"]`
    );
    this.editor.isEditable && (this.suggestionsMenuState = {
      show: !0,
      referencePos: a.getBoundingClientRect(),
      filteredItems: this.pluginState.items,
      keyboardHoveredItemIndex: this.pluginState.keyboardHoveredItemIndex
    }, this.updateSuggestionsMenu());
  }
  destroy() {
    document.removeEventListener("scroll", this.handleScroll);
  }
}
function W() {
  return {
    active: !1,
    triggerCharacter: void 0,
    queryStartPos: void 0,
    items: [],
    keyboardHoveredItemIndex: void 0,
    notFoundCount: 0,
    decorationId: void 0
  };
}
const ze = (n, e, t, o, r = () => [], i = () => {
}) => {
  if (o.length !== 1)
    throw new Error("'char' should be a single character");
  let s;
  const l = (a) => {
    a.dispatch(a.state.tr.setMeta(t, { deactivate: !0 }));
  };
  return {
    plugin: new y({
      key: t,
      view: () => (s = new Re(
        n,
        t,
        e
      ), s),
      state: {
        // Initialize the plugin's internal state.
        init() {
          return W();
        },
        // Apply changes to the plugin state from an editor transaction.
        apply(a, d, c, p) {
          var f, m, b, v;
          if (a.getMeta("orderedListIndexing") !== void 0)
            return d;
          if ((f = a.getMeta(t)) != null && f.activate)
            return {
              active: !0,
              triggerCharacter: ((m = a.getMeta(t)) == null ? void 0 : m.triggerCharacter) || "",
              queryStartPos: p.selection.from,
              items: r(""),
              keyboardHoveredItemIndex: 0,
              // TODO: Maybe should be 1 if the menu has no possible items? Probably redundant since a menu with no items
              //  is useless in practice.
              notFoundCount: 0,
              decorationId: `id_${Math.floor(Math.random() * 4294967295)}`
            };
          if (!d.active)
            return d;
          const h = { ...d };
          if (h.items = r(
            p.doc.textBetween(
              d.queryStartPos,
              p.selection.from
            )
          ), h.notFoundCount = 0, h.items.length === 0 && (h.notFoundCount = Math.max(
            0,
            d.notFoundCount + (p.selection.from - c.selection.from)
          )), // Highlighting text should hide the menu.
          p.selection.from !== p.selection.to || // Transactions with plugin metadata {deactivate: true} should hide the menu.
          (b = a.getMeta(t)) != null && b.deactivate || // Certain mouse events should hide the menu.
          // TODO: Change to global mousedown listener.
          a.getMeta("focus") || a.getMeta("blur") || a.getMeta("pointer") || // Moving the caret before the character which triggered the menu should hide it.
          d.active && p.selection.from < d.queryStartPos || // Entering more than 3 characters, after the last query that matched with at least 1 menu item, should hide
          // the menu.
          h.notFoundCount > 3)
            return W();
          if (((v = a.getMeta(t)) == null ? void 0 : v.selectedItemIndexChanged) !== void 0) {
            let w = a.getMeta(t).selectedItemIndexChanged;
            w < 0 ? w = d.items.length - 1 : w >= d.items.length && (w = 0), h.keyboardHoveredItemIndex = w;
          } else
            c.selection.from !== p.selection.from && (h.keyboardHoveredItemIndex = 0);
          return h;
        }
      },
      props: {
        handleKeyDown(a, d) {
          const c = this.getState(a.state).active;
          if (d.key === o && !c)
            return a.dispatch(
              a.state.tr.insertText(o).scrollIntoView().setMeta(t, {
                activate: !0,
                triggerCharacter: o
              })
            ), !0;
          if (!c)
            return !1;
          const {
            triggerCharacter: p,
            queryStartPos: h,
            items: f,
            keyboardHoveredItemIndex: m
          } = t.getState(a.state);
          return d.key === "ArrowUp" ? (a.dispatch(
            a.state.tr.setMeta(t, {
              selectedItemIndexChanged: m - 1
            })
          ), !0) : d.key === "ArrowDown" ? (a.dispatch(
            a.state.tr.setMeta(t, {
              selectedItemIndexChanged: m + 1
            })
          ), !0) : d.key === "Enter" ? (l(a), n._tiptapEditor.chain().focus().deleteRange({
            from: h - p.length,
            to: n._tiptapEditor.state.selection.from
          }).run(), i({
            item: f[m],
            editor: n
          }), !0) : d.key === "Escape" ? (l(a), !0) : !1;
        },
        // Setup decorator on the currently active suggestion.
        decorations(a) {
          const { active: d, decorationId: c, queryStartPos: p, triggerCharacter: h } = this.getState(a);
          if (!d)
            return null;
          if (h === "") {
            const f = De(a.selection);
            if (f)
              return z.create(a.doc, [
                R.node(
                  f.pos,
                  f.pos + f.node.nodeSize,
                  {
                    nodeName: "span",
                    class: "suggestion-decorator",
                    "data-decoration-id": c
                  }
                )
              ]);
          }
          return z.create(a.doc, [
            R.inline(
              p - h.length,
              p,
              {
                nodeName: "span",
                class: "suggestion-decorator",
                "data-decoration-id": c
              }
            )
          ]);
        }
      }
    }),
    itemCallback: (a) => {
      l(n._tiptapEditor.view), n._tiptapEditor.chain().focus().deleteRange({
        from: s.pluginState.queryStartPos - s.pluginState.triggerCharacter.length,
        to: n._tiptapEditor.state.selection.from
      }).run(), i({
        item: a,
        editor: n
      });
    }
  };
}, K = new S("SlashMenuPlugin");
class Ve extends F {
  constructor(t, o) {
    super();
    u(this, "plugin");
    u(this, "itemCallback");
    const r = ze(
      t,
      (i) => {
        this.emit("update", i);
      },
      K,
      "/",
      (i) => o.filter(
        ({ name: s, aliases: l }) => s.toLowerCase().startsWith(i.toLowerCase()) || l && l.filter(
          (a) => a.toLowerCase().startsWith(i.toLowerCase())
        ).length !== 0
      ),
      ({ item: i, editor: s }) => i.execute(s)
    );
    this.plugin = r.plugin, this.itemCallback = r.itemCallback;
  }
  onUpdate(t) {
    return this.on("update", t);
  }
}
const Ue = new S("blocknote-placeholder"), Fe = B.create({
  name: "placeholder",
  addOptions() {
    return {
      emptyEditorClass: "is-editor-empty",
      emptyNodeClass: "is-empty",
      isFilterClass: "is-filter",
      hasAnchorClass: "has-anchor",
      placeholder: "Write something …",
      showOnlyWhenEditable: !0,
      showOnlyCurrent: !0,
      includeChildren: !1
    };
  },
  addProseMirrorPlugins() {
    return [
      new y({
        key: Ue,
        props: {
          decorations: (n) => {
            const { doc: e, selection: t } = n, o = K.getState(n), r = this.editor.isEditable || !this.options.showOnlyWhenEditable, { anchor: i } = t, s = [];
            if (r)
              return e.descendants((l, a) => {
                const d = i >= a && i <= a + l.nodeSize, c = !l.isLeaf && !l.childCount;
                if ((d || !this.options.showOnlyCurrent) && c) {
                  const p = [this.options.emptyNodeClass];
                  this.editor.isEmpty && p.push(this.options.emptyEditorClass), d && p.push(this.options.hasAnchorClass), (o == null ? void 0 : o.triggerCharacter) === "" && (o != null && o.active) && p.push(this.options.isFilterClass);
                  const h = R.node(a, a + l.nodeSize, {
                    class: p.join(" ")
                  });
                  s.push(h);
                }
                return this.options.includeChildren;
              }), z.create(e, s);
          }
        }
      })
    ];
  }
}), Ge = B.create({
  name: "textAlignment",
  addGlobalAttributes() {
    return [
      {
        // Attribute is applied to block content instead of container so that child blocks don't inherit the text
        // alignment styling.
        types: ["paragraph", "heading", "bulletListItem", "numberedListItem"],
        attributes: {
          textAlignment: {
            default: "left",
            parseHTML: (n) => n.getAttribute("data-text-alignment"),
            renderHTML: (n) => n.textAlignment !== "left" && {
              "data-text-alignment": n.textAlignment
            }
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setTextAlignment: (n) => ({ state: e }) => {
        const t = [], o = g(
          e.doc,
          e.selection.from
        );
        if (o === void 0)
          return !1;
        let r = o.startPos;
        for (; r < e.selection.to; )
          e.doc.resolve(r).node().type.spec.group === "blockContent" ? (t.push(r - 1), r += e.doc.resolve(r).node().nodeSize - 1) : r += 1;
        for (const i of t)
          e.tr.setNodeAttribute(i, "textAlignment", n);
        return !0;
      }
    };
  }
}), $e = B.create({
  name: "blockTextColor",
  addGlobalAttributes() {
    return [
      {
        types: ["blockContainer"],
        attributes: {
          textColor: {
            default: "default",
            parseHTML: (n) => n.hasAttribute("data-text-color") ? n.getAttribute("data-text-color") : "default",
            renderHTML: (n) => n.textColor !== "default" && {
              "data-text-color": n.textColor
            }
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setBlockTextColor: (n, e) => ({ state: t, view: o }) => {
        const r = g(t.doc, n);
        return r === void 0 ? !1 : (t.tr.setNodeAttribute(r.startPos - 1, "textColor", e), o.focus(), !0);
      }
    };
  }
}), je = at.create({
  name: "textColor",
  addAttributes() {
    return {
      color: {
        default: void 0,
        parseHTML: (n) => n.getAttribute("data-text-color"),
        renderHTML: (n) => ({
          "data-text-color": n.color
        })
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (n) => typeof n == "string" ? !1 : n.hasAttribute("data-text-color") ? { color: n.getAttribute("data-text-color") } : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["span", n, 0];
  },
  addCommands() {
    return {
      setTextColor: (n) => ({ commands: e }) => n !== "default" ? e.setMark(this.name, { color: n }) : e.unsetMark(this.name)
    };
  }
}), qe = B.create({
  name: "trailingNode",
  addProseMirrorPlugins() {
    const n = new S(this.name);
    return [
      new y({
        key: n,
        appendTransaction: (e, t, o) => {
          const { doc: r, tr: i, schema: s } = o, l = n.getState(o), a = r.content.size - 2, d = s.nodes.blockContainer, c = s.nodes.paragraph;
          if (l)
            return i.insert(
              a,
              d.create(void 0, c.create())
            );
        },
        state: {
          init: (e, t) => {
          },
          apply: (e, t) => {
            if (!e.docChanged)
              return t;
            let o = e.doc.lastChild;
            if (!o || o.type.name !== "blockGroup")
              throw new Error("Expected blockGroup");
            if (o = o.lastChild, !o || o.type.name !== "blockContainer")
              throw new Error("Expected blockContainer");
            return o.nodeSize > 4;
          }
        }
      })
    ];
  }
}), We = (n) => {
  const e = [
    L.ClipboardTextSerializer,
    L.Commands,
    L.Editable,
    L.FocusEvents,
    L.Tabindex,
    // DevTools,
    Wt,
    // DropCursor,
    Fe.configure({
      emptyNodeClass: k.isEmpty,
      hasAnchorClass: k.hasAnchor,
      isFilterClass: k.isFilter,
      includeChildren: !0,
      showOnlyCurrent: !1
    }),
    U.configure({
      types: ["blockContainer"]
    }),
    Yt,
    // Comments,
    // basics:
    Qt,
    // marks:
    Ft,
    Gt,
    Kt,
    Zt,
    te,
    Xt,
    je,
    $e,
    fe,
    he,
    Ge,
    // custom blocks:
    ...Ne,
    ...Object.values(n.blockSchema).map(
      (t) => t.node.configure({ editor: n.editor })
    ),
    Oe,
    qt.configure({ width: 5, color: "#ddeeff" }),
    // This needs to be at the bottom of this list, because Key events (such as enter, when selecting a /command),
    // should be handled before Enter handlers in other components like splitListItem
    qe
  ];
  if (n.collaboration) {
    e.push(
      $t.configure({
        fragment: n.collaboration.fragment
      })
    );
    const t = (o) => {
      const r = document.createElement("span");
      r.classList.add(H["collaboration-cursor__caret"]), r.setAttribute("style", `border-color: ${o.color}`);
      const i = document.createElement("span");
      i.classList.add(H["collaboration-cursor__label"]), i.setAttribute("style", `background-color: ${o.color}`), i.insertBefore(document.createTextNode(o.name), null);
      const s = document.createTextNode("⁠"), l = document.createTextNode("⁠");
      return r.insertBefore(s, null), r.insertBefore(i, null), r.insertBefore(l, null), r;
    };
    e.push(
      jt.configure({
        user: n.collaboration.user,
        render: n.collaboration.renderCursor || t,
        provider: n.collaboration.provider
      })
    );
  } else
    e.push(Jt);
  return e;
};
function X(n, e) {
  let t, o;
  if (e.firstChild.descendants((r, i) => t ? !1 : r.type.name !== "blockContainer" || r.attrs.id !== n ? !0 : (t = r, o = i + 1, !1)), t === void 0 || o === void 0)
    throw Error("Could not find block in the editor with matching ID.");
  return {
    node: t,
    posBeforeNode: o
  };
}
function Bt(n, e, t = "before", o) {
  const r = typeof e == "string" ? e : e.id, i = [];
  for (const d of n)
    i.push(O(d, o.schema));
  let s = -1;
  const { node: l, posBeforeNode: a } = X(r, o.state.doc);
  if (t === "before" && (s = a), t === "after" && (s = a + l.nodeSize), t === "nested") {
    if (l.childCount < 2) {
      s = a + l.firstChild.nodeSize + 1;
      const d = o.state.schema.nodes.blockGroup.create(
        {},
        i
      );
      o.view.dispatch(
        o.state.tr.insert(s, d)
      );
      return;
    }
    s = a + l.firstChild.nodeSize + 2;
  }
  o.view.dispatch(o.state.tr.insert(s, i));
}
function Ye(n, e, t) {
  const o = typeof n == "string" ? n : n.id, { posBeforeNode: r } = X(o, t.state.doc);
  t.commands.BNUpdateBlock(r + 1, e);
}
function Tt(n, e) {
  const t = new Set(
    n.map(
      (r) => typeof r == "string" ? r : r.id
    )
  );
  let o = 0;
  if (e.state.doc.descendants((r, i) => {
    if (t.size === 0)
      return !1;
    if (r.type.name !== "blockContainer" || !t.has(r.attrs.id))
      return !0;
    t.delete(r.attrs.id);
    const s = e.state.doc.nodeSize;
    e.commands.BNDeleteBlock(i - o + 1);
    const l = e.state.doc.nodeSize;
    return o += s - l, !1;
  }), t.size > 0) {
    let r = [...t].join(`
`);
    throw Error(
      "Blocks with the following IDs could not be found in the editor: " + r
    );
  }
}
function Je(n, e, t) {
  Bt(e, n[0], "before", t), Tt(n, t);
}
function Ke() {
  const n = (e) => {
    let t = e.children.length;
    for (let o = 0; o < t; o++) {
      const r = e.children[o];
      if (r.type === "element" && (n(r), r.tagName === "u"))
        if (r.children.length > 0) {
          e.children.splice(o, 1, ...r.children);
          const i = r.children.length - 1;
          t += i, o += i;
        } else
          e.children.splice(o, 1), t--, o--;
    }
  };
  return n;
}
function Xe(n) {
  const e = /* @__PURE__ */ new Set([
    ...n.orderedListItemBlockTypes,
    ...n.unorderedListItemBlockTypes
  ]), t = (o) => {
    let r = o.children.length, i;
    for (let s = 0; s < r; s++) {
      const a = o.children[s].children[0], d = a.children[0], c = a.children.length === 2 ? a.children[1] : null, p = e.has(
        d.properties.dataContentType
      ), h = p ? n.orderedListItemBlockTypes.has(
        d.properties.dataContentType
      ) ? "ol" : "ul" : null;
      if (c !== null && t(c), i && i.tagName !== h) {
        o.children.splice(
          s - i.children.length,
          i.children.length,
          i
        );
        const f = i.children.length - 1;
        s -= f, r -= f, i = void 0;
      }
      if (p) {
        i || (i = ot(
          document.createElement(h)
        ));
        const f = ot(
          document.createElement("li")
        );
        f.children.push(d.children[0]), c !== null && f.children.push(...c.children), i.children.push(f);
      } else if (c !== null) {
        o.children.splice(s + 1, 0, ...c.children), o.children[s] = d.children[0];
        const f = c.children.length;
        s += f, r += f;
      } else
        o.children[s] = d.children[0];
    }
    i && o.children.splice(
      r - i.children.length,
      i.children.length,
      i
    );
  };
  return t;
}
async function xt(n, e) {
  const t = document.createElement("div"), o = q.fromSchema(e);
  for (const i of n) {
    const s = O(i, e), l = o.serializeNode(s);
    t.appendChild(l);
  }
  return (await J().use(lt, { fragment: !0 }).use(Xe, {
    orderedListItemBlockTypes: /* @__PURE__ */ new Set(["numberedListItem"]),
    unorderedListItemBlockTypes: /* @__PURE__ */ new Set(["bulletListItem"])
  }).use(dt).process(t.innerHTML)).value;
}
async function _t(n, e, t) {
  const o = document.createElement("div");
  o.innerHTML = n.trim();
  const i = ee.fromSchema(t).parse(o), s = [];
  for (let l = 0; l < i.firstChild.childCount; l++)
    s.push(M(i.firstChild.child(l), e));
  return s;
}
async function Ze(n, e) {
  return (await J().use(lt, { fragment: !0 }).use(Ke).use(ie).use(ct).use(le).process(await xt(n, e))).value;
}
async function Qe(n, e, t) {
  const o = await J().use(se).use(ct).use(ae).use(dt).process(n);
  return _t(o.value, e, t);
}
class to {
  constructor(e, t, o) {
    u(this, "formattingToolbarState");
    u(this, "updateFormattingToolbar");
    u(this, "preventHide", !1);
    u(this, "preventShow", !1);
    u(this, "prevWasEditable", null);
    u(this, "shouldShow", ({ view: e, state: t, from: o, to: r }) => {
      const { doc: i, selection: s } = t, { empty: l } = s, a = !i.textBetween(o, r).length && zt(t.selection);
      return !(!e.hasFocus() || l || a);
    });
    u(this, "viewMousedownHandler", () => {
      this.preventShow = !0;
    });
    u(this, "viewMouseupHandler", () => {
      this.preventShow = !1, setTimeout(() => this.update(this.pmView));
    });
    // For dragging the whole editor.
    u(this, "dragstartHandler", () => {
      var e;
      (e = this.formattingToolbarState) != null && e.show && (this.formattingToolbarState.show = !1, this.updateFormattingToolbar());
    });
    u(this, "focusHandler", () => {
      setTimeout(() => this.update(this.pmView));
    });
    u(this, "blurHandler", (e) => {
      var o;
      if (this.preventHide) {
        this.preventHide = !1;
        return;
      }
      const t = this.pmView.dom.parentElement;
      // An element is clicked.
      e && e.relatedTarget && // Element is inside the editor.
      (t === e.relatedTarget || t.contains(e.relatedTarget)) || (o = this.formattingToolbarState) != null && o.show && (this.formattingToolbarState.show = !1, this.updateFormattingToolbar());
    });
    u(this, "scrollHandler", () => {
      var e;
      (e = this.formattingToolbarState) != null && e.show && (this.formattingToolbarState.referencePos = this.getSelectionBoundingBox(), this.updateFormattingToolbar());
    });
    this.editor = e, this.pmView = t, this.updateFormattingToolbar = () => {
      if (!this.formattingToolbarState)
        throw new Error(
          "Attempting to update uninitialized formatting toolbar"
        );
      o(this.formattingToolbarState);
    }, t.dom.addEventListener("mousedown", this.viewMousedownHandler), t.dom.addEventListener("mouseup", this.viewMouseupHandler), t.dom.addEventListener("dragstart", this.dragstartHandler), t.dom.addEventListener("focus", this.focusHandler), t.dom.addEventListener("blur", this.blurHandler), document.addEventListener("scroll", this.scrollHandler);
  }
  update(e, t) {
    var h, f;
    const { state: o, composing: r } = e, { doc: i, selection: s } = o, l = t && t.doc.eq(i) && t.selection.eq(s);
    if ((this.prevWasEditable === null || this.prevWasEditable === this.editor.isEditable) && (r || l))
      return;
    this.prevWasEditable = this.editor.isEditable;
    const { ranges: a } = s, d = Math.min(...a.map((m) => m.$from.pos)), c = Math.max(...a.map((m) => m.$to.pos)), p = (h = this.shouldShow) == null ? void 0 : h.call(this, {
      view: e,
      state: o,
      from: d,
      to: c
    });
    if (this.editor.isEditable && !this.preventShow && (p || this.preventHide)) {
      this.formattingToolbarState = {
        show: !0,
        referencePos: this.getSelectionBoundingBox()
      }, this.updateFormattingToolbar();
      return;
    }
    if ((f = this.formattingToolbarState) != null && f.show && !this.preventHide && (!p || this.preventShow || !this.editor.isEditable)) {
      this.formattingToolbarState.show = !1, this.updateFormattingToolbar();
      return;
    }
  }
  destroy() {
    this.pmView.dom.removeEventListener("mousedown", this.viewMousedownHandler), this.pmView.dom.removeEventListener("mouseup", this.viewMouseupHandler), this.pmView.dom.removeEventListener("dragstart", this.dragstartHandler), this.pmView.dom.removeEventListener("focus", this.focusHandler), this.pmView.dom.removeEventListener("blur", this.blurHandler), document.removeEventListener("scroll", this.scrollHandler);
  }
  getSelectionBoundingBox() {
    const { state: e } = this.pmView, { selection: t } = e, { ranges: o } = t, r = Math.min(...o.map((s) => s.$from.pos)), i = Math.max(...o.map((s) => s.$to.pos));
    if (Vt(t)) {
      const s = this.pmView.nodeDOM(r);
      if (s)
        return s.getBoundingClientRect();
    }
    return j(this.pmView, r, i);
  }
}
const eo = new S(
  "FormattingToolbarPlugin"
);
class oo extends F {
  constructor(t) {
    super();
    u(this, "view");
    u(this, "plugin");
    this.plugin = new y({
      key: eo,
      view: (o) => (this.view = new to(t, o, (r) => {
        this.emit("update", r);
      }), this.view)
    });
  }
  onUpdate(t) {
    return this.on("update", t);
  }
}
class no {
  constructor(e, t, o) {
    u(this, "hyperlinkToolbarState");
    u(this, "updateHyperlinkToolbar");
    u(this, "menuUpdateTimer");
    u(this, "startMenuUpdateTimer");
    u(this, "stopMenuUpdateTimer");
    u(this, "mouseHoveredHyperlinkMark");
    u(this, "mouseHoveredHyperlinkMarkRange");
    u(this, "keyboardHoveredHyperlinkMark");
    u(this, "keyboardHoveredHyperlinkMarkRange");
    u(this, "hyperlinkMark");
    u(this, "hyperlinkMarkRange");
    u(this, "mouseOverHandler", (e) => {
      if (this.mouseHoveredHyperlinkMark = void 0, this.mouseHoveredHyperlinkMarkRange = void 0, this.stopMenuUpdateTimer(), e.target instanceof HTMLAnchorElement && e.target.nodeName === "A") {
        const t = e.target, o = this.pmView.posAtDOM(t, 0) + 1, r = this.pmView.state.doc.resolve(
          o
        ), i = r.marks();
        for (const s of i)
          if (s.type.name === this.pmView.state.schema.mark("link").type.name) {
            this.mouseHoveredHyperlinkMark = s, this.mouseHoveredHyperlinkMarkRange = tt(
              r,
              s.type,
              s.attrs
            ) || void 0;
            break;
          }
      }
      return this.startMenuUpdateTimer(), !1;
    });
    u(this, "clickHandler", (e) => {
      var o;
      const t = this.pmView.dom.parentElement;
      // Toolbar is open.
      this.hyperlinkMark && // An element is clicked.
      e && e.target && // The clicked element is not the editor.
      !(t === e.target || t.contains(e.target)) && (o = this.hyperlinkToolbarState) != null && o.show && (this.hyperlinkToolbarState.show = !1, this.updateHyperlinkToolbar());
    });
    u(this, "scrollHandler", () => {
      var e;
      this.hyperlinkMark !== void 0 && (e = this.hyperlinkToolbarState) != null && e.show && (this.hyperlinkToolbarState.referencePos = j(
        this.pmView,
        this.hyperlinkMarkRange.from,
        this.hyperlinkMarkRange.to
      ), this.updateHyperlinkToolbar());
    });
    this.editor = e, this.pmView = t, this.updateHyperlinkToolbar = () => {
      if (!this.hyperlinkToolbarState)
        throw new Error("Attempting to update uninitialized hyperlink toolbar");
      o(this.hyperlinkToolbarState);
    }, this.startMenuUpdateTimer = () => {
      this.menuUpdateTimer = setTimeout(() => {
        this.update();
      }, 250);
    }, this.stopMenuUpdateTimer = () => (this.menuUpdateTimer && (clearTimeout(this.menuUpdateTimer), this.menuUpdateTimer = void 0), !1), this.pmView.dom.addEventListener("mouseover", this.mouseOverHandler), document.addEventListener("click", this.clickHandler, !0), document.addEventListener("scroll", this.scrollHandler);
  }
  editHyperlink(e, t) {
    var r;
    const o = this.pmView.state.tr.insertText(
      t,
      this.hyperlinkMarkRange.from,
      this.hyperlinkMarkRange.to
    );
    o.addMark(
      this.hyperlinkMarkRange.from,
      this.hyperlinkMarkRange.from + t.length,
      this.pmView.state.schema.mark("link", { href: e })
    ), this.pmView.dispatch(o), this.pmView.focus(), (r = this.hyperlinkToolbarState) != null && r.show && (this.hyperlinkToolbarState.show = !1, this.updateHyperlinkToolbar());
  }
  deleteHyperlink() {
    var e;
    this.pmView.dispatch(
      this.pmView.state.tr.removeMark(
        this.hyperlinkMarkRange.from,
        this.hyperlinkMarkRange.to,
        this.hyperlinkMark.type
      ).setMeta("preventAutolink", !0)
    ), this.pmView.focus(), (e = this.hyperlinkToolbarState) != null && e.show && (this.hyperlinkToolbarState.show = !1, this.updateHyperlinkToolbar());
  }
  update() {
    var t;
    if (!this.pmView.hasFocus())
      return;
    const e = this.hyperlinkMark;
    if (this.hyperlinkMark = void 0, this.hyperlinkMarkRange = void 0, this.keyboardHoveredHyperlinkMark = void 0, this.keyboardHoveredHyperlinkMarkRange = void 0, this.pmView.state.selection.empty) {
      const o = this.pmView.state.selection.$from.marks();
      for (const r of o)
        if (r.type.name === this.pmView.state.schema.mark("link").type.name) {
          this.keyboardHoveredHyperlinkMark = r, this.keyboardHoveredHyperlinkMarkRange = tt(
            this.pmView.state.selection.$from,
            r.type,
            r.attrs
          ) || void 0;
          break;
        }
    }
    if (this.mouseHoveredHyperlinkMark && (this.hyperlinkMark = this.mouseHoveredHyperlinkMark, this.hyperlinkMarkRange = this.mouseHoveredHyperlinkMarkRange), this.keyboardHoveredHyperlinkMark && (this.hyperlinkMark = this.keyboardHoveredHyperlinkMark, this.hyperlinkMarkRange = this.keyboardHoveredHyperlinkMarkRange), this.hyperlinkMark && this.editor.isEditable) {
      this.hyperlinkToolbarState = {
        show: !0,
        referencePos: j(
          this.pmView,
          this.hyperlinkMarkRange.from,
          this.hyperlinkMarkRange.to
        ),
        url: this.hyperlinkMark.attrs.href,
        text: this.pmView.state.doc.textBetween(
          this.hyperlinkMarkRange.from,
          this.hyperlinkMarkRange.to
        )
      }, this.updateHyperlinkToolbar();
      return;
    }
    if ((t = this.hyperlinkToolbarState) != null && t.show && e && (!this.hyperlinkMark || !this.editor.isEditable)) {
      this.hyperlinkToolbarState.show = !1, this.updateHyperlinkToolbar();
      return;
    }
  }
  destroy() {
    this.pmView.dom.removeEventListener("mouseover", this.mouseOverHandler), document.removeEventListener("scroll", this.scrollHandler), document.removeEventListener("click", this.clickHandler, !0);
  }
}
const ro = new S(
  "HyperlinkToolbarPlugin"
);
class io extends F {
  constructor(t) {
    super();
    u(this, "view");
    u(this, "plugin");
    /**
     * Edit the currently hovered hyperlink.
     */
    u(this, "editHyperlink", (t, o) => {
      this.view.editHyperlink(t, o);
    });
    /**
     * Delete the currently hovered hyperlink.
     */
    u(this, "deleteHyperlink", () => {
      this.view.deleteHyperlink();
    });
    /**
     * When hovering on/off hyperlinks using the mouse cursor, the hyperlink
     * toolbar will open & close with a delay.
     *
     * This function starts the delay timer, and should be used for when the mouse cursor enters the hyperlink toolbar.
     */
    u(this, "startHideTimer", () => {
      this.view.startMenuUpdateTimer();
    });
    /**
     * When hovering on/off hyperlinks using the mouse cursor, the hyperlink
     * toolbar will open & close with a delay.
     *
     * This function stops the delay timer, and should be used for when the mouse cursor exits the hyperlink toolbar.
     */
    u(this, "stopHideTimer", () => {
      this.view.stopMenuUpdateTimer();
    });
    this.plugin = new y({
      key: ro,
      view: (o) => (this.view = new no(t, o, (r) => {
        this.emit("update", r);
      }), this.view)
    });
  }
  onUpdate(t) {
    return this.on("update", t);
  }
}
class A extends $ {
  constructor(t, o) {
    super(t, o);
    u(this, "nodes");
    const r = t.node();
    this.nodes = [], t.doc.nodesBetween(t.pos, o.pos, (i, s, l) => {
      if (l !== null && l.eq(r))
        return this.nodes.push(i), !1;
    });
  }
  static create(t, o, r = o) {
    return new A(t.resolve(o), t.resolve(r));
  }
  content() {
    return new T(I.from(this.nodes), 0, 0);
  }
  eq(t) {
    if (!(t instanceof A) || this.nodes.length !== t.nodes.length || this.from !== t.from || this.to !== t.to)
      return !1;
    for (let o = 0; o < this.nodes.length; o++)
      if (!this.nodes[o].eq(t.nodes[o]))
        return !1;
    return !0;
  }
  map(t, o) {
    let r = o.mapResult(this.from), i = o.mapResult(this.to);
    return i.deleted ? $.near(t.resolve(r.pos)) : r.deleted ? $.near(t.resolve(i.pos)) : new A(
      t.resolve(r.pos),
      t.resolve(i.pos)
    );
  }
  toJSON() {
    return { type: "node", anchor: this.anchor, head: this.head };
  }
}
const so = re.__serializeForClipboard;
let E;
function It(n, e) {
  var r;
  if (!e.dom.isConnected)
    return;
  let t = e.posAtCoords(n);
  if (!t)
    return;
  let o = e.domAtPos(t.pos).node;
  if (o !== e.dom) {
    for (; o && o.parentNode && o.parentNode !== e.dom && !((r = o.hasAttribute) != null && r.call(o, "data-id")); )
      o = o.parentNode;
    if (o)
      return { node: o, id: o.getAttribute("data-id") };
  }
}
function ao(n, e) {
  let t = It(n, e);
  if (t && t.node.nodeType === 1) {
    const o = e.docView;
    let r = o.nearestDesc(t.node, !0);
    return !r || r === o ? null : r.posBefore;
  }
  return null;
}
function lo(n, e) {
  let t, o;
  const r = e.resolve(n.from).node().type.spec.group === "blockContent", i = e.resolve(n.to).node().type.spec.group === "blockContent", s = Math.min(n.$anchor.depth, n.$head.depth);
  if (r && i) {
    const l = n.$from.start(s - 1), a = n.$to.end(s - 1);
    t = e.resolve(l - 1).pos, o = e.resolve(a + 1).pos;
  } else
    t = n.from, o = n.to;
  return { from: t, to: o };
}
function st(n, e, t = e) {
  e === t && (t += n.state.doc.resolve(e + 1).node().nodeSize);
  const o = n.domAtPos(e).node.cloneNode(!0), r = n.domAtPos(e).node, i = (c, p) => Array.prototype.indexOf.call(c.children, p), s = i(
    r,
    // Expects from position to be just before the first selected block.
    n.domAtPos(e + 1).node.parentElement
  ), l = i(
    r,
    // Expects to position to be just after the last selected block.
    n.domAtPos(t - 1).node.parentElement
  );
  for (let c = r.childElementCount - 1; c >= 0; c--)
    (c > l || c < s) && o.removeChild(o.children[c]);
  Ht(), E = o;
  const d = n.dom.className.split(" ").filter(
    (c) => !c.includes("bn") && !c.includes("ProseMirror") && !c.includes("editor")
  ).join(" ");
  E.className = E.className + " " + H.dragPreview + " " + d, document.body.appendChild(E);
}
function Ht() {
  E !== void 0 && (document.body.removeChild(E), E = void 0);
}
function co(n, e) {
  if (!n.dataTransfer)
    return;
  const t = e.dom.getBoundingClientRect();
  let o = {
    left: t.left + t.width / 2,
    // take middle of editor
    top: n.clientY
  }, r = ao(o, e);
  if (r != null) {
    const i = e.state.selection, s = e.state.doc, { from: l, to: a } = lo(i, s), d = l <= r && r < a, c = i.$anchor.node() !== i.$head.node() || i instanceof A;
    d && c ? (e.dispatch(
      e.state.tr.setSelection(A.create(s, l, a))
    ), st(e, l, a)) : (e.dispatch(
      e.state.tr.setSelection(oe.create(e.state.doc, r))
    ), st(e, r));
    let p = e.state.selection.content(), { dom: h, text: f } = so(e, p);
    n.dataTransfer.clearData(), n.dataTransfer.setData("text/html", h.innerHTML), n.dataTransfer.setData("text/plain", f), n.dataTransfer.effectAllowed = "move", n.dataTransfer.setDragImage(E, 0, 0), e.dragging = { slice: p, move: !0 };
  }
}
class uo {
  constructor(e, t, o) {
    u(this, "sideMenuState");
    // When true, the drag handle with be anchored at the same level as root elements
    // When false, the drag handle with be just to the left of the element
    // TODO: Is there any case where we want this to be false?
    u(this, "horizontalPosAnchoredAtRoot");
    u(this, "horizontalPosAnchor");
    u(this, "hoveredBlock");
    // Used to check if currently dragged content comes from this editor instance.
    u(this, "isDragging", !1);
    u(this, "menuFrozen", !1);
    /**
     * Sets isDragging when dragging text.
     */
    u(this, "onDragStart", () => {
      this.isDragging = !0;
    });
    /**
     * If the event is outside the editor contents,
     * we dispatch a fake event, so that we can still drop the content
     * when dragging / dropping to the side of the editor
     */
    u(this, "onDrop", (e) => {
      if (this.editor._tiptapEditor.commands.blur(), e.synthetic || !this.isDragging)
        return;
      let t = this.pmView.posAtCoords({
        left: e.clientX,
        top: e.clientY
      });
      if (this.isDragging = !1, !t || t.inside === -1) {
        const o = new Event("drop", e), r = this.pmView.dom.firstChild.getBoundingClientRect();
        o.clientX = r.left + r.width / 2, o.clientY = e.clientY, o.dataTransfer = e.dataTransfer, o.preventDefault = () => e.preventDefault(), o.synthetic = !0, this.pmView.dom.dispatchEvent(o);
      }
    });
    /**
     * If the event is outside the editor contents,
     * we dispatch a fake event, so that we can still drop the content
     * when dragging / dropping to the side of the editor
     */
    u(this, "onDragOver", (e) => {
      if (e.synthetic || !this.isDragging)
        return;
      let t = this.pmView.posAtCoords({
        left: e.clientX,
        top: e.clientY
      });
      if (!t || t.inside === -1) {
        const o = new Event("dragover", e), r = this.pmView.dom.firstChild.getBoundingClientRect();
        o.clientX = r.left + r.width / 2, o.clientY = e.clientY, o.dataTransfer = e.dataTransfer, o.preventDefault = () => e.preventDefault(), o.synthetic = !0, this.pmView.dom.dispatchEvent(o);
      }
    });
    u(this, "onKeyDown", (e) => {
      var t;
      (t = this.sideMenuState) != null && t.show && (this.sideMenuState.show = !1, this.updateSideMenu(this.sideMenuState)), this.menuFrozen = !1;
    });
    u(this, "onMouseMove", (e) => {
      var d, c, p, h, f;
      if (this.menuFrozen)
        return;
      const t = this.pmView.dom.firstChild.getBoundingClientRect(), o = this.pmView.dom.getBoundingClientRect(), r = e.clientX >= o.left && e.clientX <= o.right && e.clientY >= o.top && e.clientY <= o.bottom, i = this.pmView.dom.parentElement;
      if (
        // Cursor is within the editor area
        r && // An element is hovered
        e && e.target && // Element is outside the editor
        !(i === e.target || i.contains(e.target))
      ) {
        (d = this.sideMenuState) != null && d.show && (this.sideMenuState.show = !1, this.updateSideMenu(this.sideMenuState));
        return;
      }
      this.horizontalPosAnchor = t.x;
      const s = {
        left: t.left + t.width / 2,
        // take middle of editor
        top: e.clientY
      }, l = It(s, this.pmView);
      if (!l || !this.editor.isEditable) {
        (c = this.sideMenuState) != null && c.show && (this.sideMenuState.show = !1, this.updateSideMenu(this.sideMenuState));
        return;
      }
      if ((p = this.sideMenuState) != null && p.show && ((h = this.hoveredBlock) != null && h.hasAttribute("data-id")) && ((f = this.hoveredBlock) == null ? void 0 : f.getAttribute("data-id")) === l.id)
        return;
      this.hoveredBlock = l.node;
      const a = l.node.firstChild;
      if (a && this.editor.isEditable) {
        const m = a.getBoundingClientRect();
        this.sideMenuState = {
          show: !0,
          referencePos: new DOMRect(
            this.horizontalPosAnchoredAtRoot ? this.horizontalPosAnchor : m.x,
            m.y,
            m.width,
            m.height
          ),
          block: this.editor.getBlock(
            this.hoveredBlock.getAttribute("data-id")
          )
        }, this.updateSideMenu(this.sideMenuState);
      }
    });
    u(this, "onScroll", () => {
      var e;
      if ((e = this.sideMenuState) != null && e.show) {
        const o = this.hoveredBlock.firstChild.getBoundingClientRect();
        this.sideMenuState.referencePos = new DOMRect(
          this.horizontalPosAnchoredAtRoot ? this.horizontalPosAnchor : o.x,
          o.y,
          o.width,
          o.height
        ), this.updateSideMenu(this.sideMenuState);
      }
    });
    this.editor = e, this.pmView = t, this.updateSideMenu = o, this.horizontalPosAnchoredAtRoot = !0, this.horizontalPosAnchor = this.pmView.dom.firstChild.getBoundingClientRect().x, document.body.addEventListener("drop", this.onDrop, !0), document.body.addEventListener("dragover", this.onDragOver), this.pmView.dom.addEventListener("dragstart", this.onDragStart), document.body.addEventListener("mousemove", this.onMouseMove, !0), document.addEventListener("scroll", this.onScroll), document.body.addEventListener("keydown", this.onKeyDown, !0);
  }
  destroy() {
    var e;
    (e = this.sideMenuState) != null && e.show && (this.sideMenuState.show = !1, this.updateSideMenu(this.sideMenuState)), document.body.removeEventListener("mousemove", this.onMouseMove), document.body.removeEventListener("dragover", this.onDragOver), this.pmView.dom.removeEventListener("dragstart", this.onDragStart), document.body.removeEventListener("drop", this.onDrop, !0), document.removeEventListener("scroll", this.onScroll), document.body.removeEventListener("keydown", this.onKeyDown, !0);
  }
  addBlock() {
    var l;
    (l = this.sideMenuState) != null && l.show && (this.sideMenuState.show = !1, this.updateSideMenu(this.sideMenuState)), this.menuFrozen = !0;
    const t = this.hoveredBlock.firstChild.getBoundingClientRect(), o = this.pmView.posAtCoords({
      left: t.left + t.width / 2,
      top: t.top + t.height / 2
    });
    if (!o)
      return;
    const r = g(
      this.editor._tiptapEditor.state.doc,
      o.pos
    );
    if (r === void 0)
      return;
    const { contentNode: i, endPos: s } = r;
    if (i.textContent.length !== 0) {
      const a = s + 1, d = a + 2;
      this.editor._tiptapEditor.chain().BNCreateBlock(a).BNUpdateBlock(d, { type: "paragraph", props: {} }).setTextSelection(d).run();
    } else
      this.editor._tiptapEditor.commands.setTextSelection(s);
    this.pmView.focus(), this.pmView.dispatch(
      this.pmView.state.tr.scrollIntoView().setMeta(K, {
        // TODO import suggestion plugin key
        activate: !0,
        type: "drag"
      })
    );
  }
}
const po = new S("SideMenuPlugin");
class ho extends F {
  constructor(t) {
    super();
    u(this, "sideMenuView");
    u(this, "plugin");
    /**
     * If the block is empty, opens the slash menu. If the block has content,
     * creates a new block below and opens the slash menu in it.
     */
    u(this, "addBlock", () => this.sideMenuView.addBlock());
    /**
     * Handles drag & drop events for blocks.
     */
    u(this, "blockDragStart", (t) => {
      this.sideMenuView.isDragging = !0, co(t, this.editor.prosemirrorView);
    });
    /**
     * Handles drag & drop events for blocks.
     */
    u(this, "blockDragEnd", () => Ht());
    /**
     * Freezes the side menu. When frozen, the side menu will stay
     * attached to the same block regardless of which block is hovered by the
     * mouse cursor.
     */
    u(this, "freezeMenu", () => this.sideMenuView.menuFrozen = !0);
    /**
     * Unfreezes the side menu. When frozen, the side menu will stay
     * attached to the same block regardless of which block is hovered by the
     * mouse cursor.
     */
    u(this, "unfreezeMenu", () => this.sideMenuView.menuFrozen = !1);
    this.editor = t, this.plugin = new y({
      key: po,
      view: (o) => (this.sideMenuView = new uo(
        t,
        o,
        (r) => {
          this.emit("update", r);
        }
      ), this.sideMenuView)
    });
  }
  onUpdate(t) {
    return this.on("update", t);
  }
}
function _(n, e) {
  const t = n.getTextCursorPosition().block;
  t.content.length === 1 && t.content[0].type === "text" && t.content[0].text === "/" || t.content.length === 0 ? n.updateBlock(t, e) : (n.insertBlocks([e], t, "after"), n.setTextCursorPosition(n.getTextCursorPosition().nextBlock));
}
const fo = (n = wt) => {
  var t, o, r;
  const e = [];
  return "heading" in n && "level" in n.heading.propSchema && ((t = n.heading.propSchema.level.values) != null && t.includes("1") && e.push({
    name: "Heading",
    aliases: ["h", "heading1", "h1"],
    execute: (i) => _(i, {
      type: "heading",
      props: { level: "1" }
    })
  }), (o = n.heading.propSchema.level.values) != null && o.includes("2") && e.push({
    name: "Heading 2",
    aliases: ["h2", "heading2", "subheading"],
    execute: (i) => _(i, {
      type: "heading",
      props: { level: "2" }
    })
  }), (r = n.heading.propSchema.level.values) != null && r.includes("3") && e.push({
    name: "Heading 3",
    aliases: ["h3", "heading3", "subheading"],
    execute: (i) => _(i, {
      type: "heading",
      props: { level: "3" }
    })
  })), "bulletListItem" in n && e.push({
    name: "Bullet List",
    aliases: ["ul", "list", "bulletlist", "bullet list"],
    execute: (i) => _(i, {
      type: "bulletListItem"
    })
  }), "numberedListItem" in n && e.push({
    name: "Numbered List",
    aliases: ["li", "list", "numberedlist", "numbered list"],
    execute: (i) => _(i, {
      type: "numberedListItem"
    })
  }), "paragraph" in n && e.push({
    name: "Paragraph",
    aliases: ["p"],
    execute: (i) => _(i, {
      type: "paragraph"
    })
  }), e;
}, mo = {
  enableInputRules: !0,
  enablePasteRules: !0,
  enableCoreExtensions: !1
};
class Wo {
  constructor(e = {}) {
    u(this, "_tiptapEditor");
    u(this, "blockCache", /* @__PURE__ */ new WeakMap());
    u(this, "schema");
    u(this, "ready", !1);
    u(this, "sideMenu");
    u(this, "formattingToolbar");
    u(this, "slashMenu");
    u(this, "hyperlinkToolbar");
    var l, a, d;
    this.options = e;
    const t = {
      defaultStyles: !0,
      // TODO: There's a lot of annoying typing stuff to deal with here. If
      //  BSchema is specified, then options.blockSchema should also be required.
      //  If BSchema is not specified, then options.blockSchema should also not
      //  be defined. Unfortunately, trying to implement these constraints seems
      //  to be a huge pain, hence the `as any` casts.
      blockSchema: e.blockSchema || wt,
      ...e
    };
    this.sideMenu = new ho(this), this.formattingToolbar = new oo(this), this.slashMenu = new Ve(
      this,
      t.slashMenuItems || fo(t.blockSchema)
    ), this.hyperlinkToolbar = new io(this);
    const o = We({
      editor: this,
      blockSchema: t.blockSchema,
      collaboration: t.collaboration
    }), r = B.create({
      name: "BlockNoteUIExtension",
      addProseMirrorPlugins: () => [
        this.sideMenu.plugin,
        this.formattingToolbar.plugin,
        this.slashMenu.plugin,
        this.hyperlinkToolbar.plugin
      ]
    });
    o.push(r), this.schema = t.blockSchema;
    const i = t.initialContent || (e.collaboration ? void 0 : [
      {
        type: "paragraph",
        id: U.options.generateID()
      }
    ]), s = {
      ...mo,
      ...t._tiptapOptions,
      onCreate: () => {
        var c;
        (c = t.onEditorReady) == null || c.call(t, this), this.ready = !0;
      },
      onBeforeCreate(c) {
        if (!i)
          return;
        const p = c.editor.schema, h = i.map((m) => O(m, p)), f = p.node(
          "doc",
          void 0,
          p.node("blockGroup", void 0, h)
        );
        c.editor.options.content = f.toJSON();
      },
      onUpdate: () => {
        var c;
        this.ready && ((c = t.onEditorContentChange) == null || c.call(t, this));
      },
      onSelectionUpdate: () => {
        var c;
        this.ready && ((c = t.onTextCursorPositionChange) == null || c.call(t, this));
      },
      editable: e.editable === void 0 ? !0 : e.editable,
      extensions: t.enableBlockNoteExtensions === !1 ? (l = t._tiptapOptions) == null ? void 0 : l.extensions : [...((a = t._tiptapOptions) == null ? void 0 : a.extensions) || [], ...o],
      editorProps: {
        attributes: {
          "data-theme": e.theme || "light",
          ...t.editorDOMAttributes || {},
          class: [
            H.bnEditor,
            H.bnRoot,
            t.defaultStyles ? H.defaultStyles : "",
            ((d = t.editorDOMAttributes) == null ? void 0 : d.class) || ""
          ].join(" ")
        }
      }
    };
    t.parentElement && (s.element = t.parentElement), this._tiptapEditor = new Ut(s);
  }
  get prosemirrorView() {
    return this._tiptapEditor.view;
  }
  get domElement() {
    return this._tiptapEditor.view.dom;
  }
  isFocused() {
    return this._tiptapEditor.view.hasFocus();
  }
  focus() {
    this._tiptapEditor.view.focus();
  }
  /**
   * Gets a snapshot of all top-level (non-nested) blocks in the editor.
   * @returns A snapshot of all top-level (non-nested) blocks in the editor.
   */
  get topLevelBlocks() {
    const e = [];
    return this._tiptapEditor.state.doc.firstChild.descendants((t) => (e.push(M(t, this.schema, this.blockCache)), !1)), e;
  }
  /**
   * Gets a snapshot of an existing block from the editor.
   * @param blockIdentifier The identifier of an existing block that should be retrieved.
   * @returns The block that matches the identifier, or `undefined` if no matching block was found.
   */
  getBlock(e) {
    const t = typeof e == "string" ? e : e.id;
    let o;
    return this._tiptapEditor.state.doc.firstChild.descendants((r) => typeof o < "u" ? !1 : r.type.name !== "blockContainer" || r.attrs.id !== t ? !0 : (o = M(r, this.schema, this.blockCache), !1)), o;
  }
  /**
   * Traverses all blocks in the editor depth-first, and executes a callback for each.
   * @param callback The callback to execute for each block. Returning `false` stops the traversal.
   * @param reverse Whether the blocks should be traversed in reverse order.
   */
  forEachBlock(e, t = !1) {
    const o = this.topLevelBlocks.slice();
    t && o.reverse();
    function r(i) {
      for (const s of i) {
        if (!e(s))
          return !1;
        const l = t ? s.children.slice().reverse() : s.children;
        if (!r(l))
          return !1;
      }
      return !0;
    }
    r(o);
  }
  /**
   * Executes a callback whenever the editor's contents change.
   * @param callback The callback to execute.
   */
  onEditorContentChange(e) {
    this._tiptapEditor.on("update", e);
  }
  /**
   * Executes a callback whenever the editor's selection changes.
   * @param callback The callback to execute.
   */
  onEditorSelectionChange(e) {
    this._tiptapEditor.on("selectionUpdate", e);
  }
  /**
   * Gets a snapshot of the current text cursor position.
   * @returns A snapshot of the current text cursor position.
   */
  getTextCursorPosition() {
    const { node: e, depth: t, startPos: o, endPos: r } = g(
      this._tiptapEditor.state.doc,
      this._tiptapEditor.state.selection.from
    ), i = this._tiptapEditor.state.doc.resolve(r).index(t - 1), s = this._tiptapEditor.state.doc.resolve(r + 1).node().childCount;
    let l;
    i > 0 && (l = this._tiptapEditor.state.doc.resolve(o - 2).node());
    let a;
    return i < s - 1 && (a = this._tiptapEditor.state.doc.resolve(r + 2).node()), {
      block: M(e, this.schema, this.blockCache),
      prevBlock: l === void 0 ? void 0 : M(l, this.schema, this.blockCache),
      nextBlock: a === void 0 ? void 0 : M(a, this.schema, this.blockCache)
    };
  }
  /**
   * Sets the text cursor position to the start or end of an existing block. Throws an error if the target block could
   * not be found.
   * @param targetBlock The identifier of an existing block that the text cursor should be moved to.
   * @param placement Whether the text cursor should be placed at the start or end of the block.
   */
  setTextCursorPosition(e, t = "start") {
    const o = typeof e == "string" ? e : e.id, { posBeforeNode: r } = X(o, this._tiptapEditor.state.doc), { startPos: i, contentNode: s } = g(
      this._tiptapEditor.state.doc,
      r + 2
    );
    t === "start" ? this._tiptapEditor.commands.setTextSelection(i + 1) : this._tiptapEditor.commands.setTextSelection(
      i + s.nodeSize - 1
    );
  }
  /**
   * Gets a snapshot of the current selection.
   */
  getSelection() {
    if (this._tiptapEditor.state.selection.from === this._tiptapEditor.state.selection.to)
      return;
    const e = [];
    return this._tiptapEditor.state.doc.descendants((t, o) => t.type.spec.group !== "blockContent" || o + t.nodeSize < this._tiptapEditor.state.selection.from || o > this._tiptapEditor.state.selection.to ? !0 : (e.push(
      M(
        this._tiptapEditor.state.doc.resolve(o).node(),
        this.schema,
        this.blockCache
      )
    ), !1)), { blocks: e };
  }
  /**
   * Checks if the editor is currently editable, or if it's locked.
   * @returns True if the editor is editable, false otherwise.
   */
  get isEditable() {
    return this._tiptapEditor.isEditable;
  }
  /**
   * Makes the editor editable or locks it, depending on the argument passed.
   * @param editable True to make the editor editable, or false to lock it.
   */
  set isEditable(e) {
    this._tiptapEditor.setEditable(e);
  }
  /**
   * Inserts new blocks into the editor. If a block's `id` is undefined, BlockNote generates one automatically. Throws an
   * error if the reference block could not be found.
   * @param blocksToInsert An array of partial blocks that should be inserted.
   * @param referenceBlock An identifier for an existing block, at which the new blocks should be inserted.
   * @param placement Whether the blocks should be inserted just before, just after, or nested inside the
   * `referenceBlock`. Inserts the blocks at the start of the existing block's children if "nested" is used.
   */
  insertBlocks(e, t, o = "before") {
    Bt(e, t, o, this._tiptapEditor);
  }
  /**
   * Updates an existing block in the editor. Since updatedBlock is a PartialBlock object, some fields might not be
   * defined. These undefined fields are kept as-is from the existing block. Throws an error if the block to update could
   * not be found.
   * @param blockToUpdate The block that should be updated.
   * @param update A partial block which defines how the existing block should be changed.
   */
  updateBlock(e, t) {
    Ye(e, t, this._tiptapEditor);
  }
  /**
   * Removes existing blocks from the editor. Throws an error if any of the blocks could not be found.
   * @param blocksToRemove An array of identifiers for existing blocks that should be removed.
   */
  removeBlocks(e) {
    Tt(e, this._tiptapEditor);
  }
  /**
   * Replaces existing blocks in the editor with new blocks. If the blocks that should be removed are not adjacent or
   * are at different nesting levels, `blocksToInsert` will be inserted at the position of the first block in
   * `blocksToRemove`. Throws an error if any of the blocks to remove could not be found.
   * @param blocksToRemove An array of blocks that should be replaced.
   * @param blocksToInsert An array of partial blocks to replace the old ones with.
   */
  replaceBlocks(e, t) {
    Je(e, t, this._tiptapEditor);
  }
  /**
   * Gets the active text styles at the text cursor position or at the end of the current selection if it's active.
   */
  getActiveStyles() {
    const e = {}, t = this._tiptapEditor.state.selection.$to.marks(), o = /* @__PURE__ */ new Set([
      "bold",
      "italic",
      "underline",
      "strike",
      "code"
    ]), r = /* @__PURE__ */ new Set(["textColor", "backgroundColor"]);
    for (const i of t)
      o.has(i.type.name) ? e[i.type.name] = !0 : r.has(i.type.name) && (e[i.type.name] = i.attrs.color);
    return e;
  }
  /**
   * Adds styles to the currently selected content.
   * @param styles The styles to add.
   */
  addStyles(e) {
    const t = /* @__PURE__ */ new Set([
      "bold",
      "italic",
      "underline",
      "strike",
      "code"
    ]), o = /* @__PURE__ */ new Set(["textColor", "backgroundColor"]);
    this._tiptapEditor.view.focus();
    for (const [r, i] of Object.entries(e))
      t.has(r) ? this._tiptapEditor.commands.setMark(r) : o.has(r) && this._tiptapEditor.commands.setMark(r, { color: i });
  }
  /**
   * Removes styles from the currently selected content.
   * @param styles The styles to remove.
   */
  removeStyles(e) {
    this._tiptapEditor.view.focus();
    for (const t of Object.keys(e))
      this._tiptapEditor.commands.unsetMark(t);
  }
  /**
   * Toggles styles on the currently selected content.
   * @param styles The styles to toggle.
   */
  toggleStyles(e) {
    const t = /* @__PURE__ */ new Set([
      "bold",
      "italic",
      "underline",
      "strike",
      "code"
    ]), o = /* @__PURE__ */ new Set(["textColor", "backgroundColor"]);
    this._tiptapEditor.view.focus();
    for (const [r, i] of Object.entries(e))
      t.has(r) ? this._tiptapEditor.commands.toggleMark(r) : o.has(r) && this._tiptapEditor.commands.toggleMark(r, { color: i });
  }
  /**
   * Gets the currently selected text.
   */
  getSelectedText() {
    return this._tiptapEditor.state.doc.textBetween(
      this._tiptapEditor.state.selection.from,
      this._tiptapEditor.state.selection.to
    );
  }
  /**
   * Gets the URL of the last link in the current selection, or `undefined` if there are no links in the selection.
   */
  getSelectedLinkUrl() {
    return this._tiptapEditor.getAttributes("link").href;
  }
  /**
   * Creates a new link to replace the selected content.
   * @param url The link URL.
   * @param text The text to display the link with.
   */
  createLink(e, t) {
    if (e === "")
      return;
    let { from: o, to: r } = this._tiptapEditor.state.selection;
    t || (t = this._tiptapEditor.state.doc.textBetween(o, r));
    const i = this._tiptapEditor.schema.mark("link", { href: e });
    this._tiptapEditor.view.dispatch(
      this._tiptapEditor.view.state.tr.insertText(t, o, r).addMark(o, o + t.length, i)
    );
  }
  /**
   * Checks if the block containing the text cursor can be nested.
   */
  canNestBlock() {
    const { startPos: e, depth: t } = g(
      this._tiptapEditor.state.doc,
      this._tiptapEditor.state.selection.from
    );
    return this._tiptapEditor.state.doc.resolve(e).index(t - 1) > 0;
  }
  /**
   * Nests the block containing the text cursor into the block above it.
   */
  nestBlock() {
    this._tiptapEditor.commands.sinkListItem("blockContainer");
  }
  /**
   * Checks if the block containing the text cursor is nested.
   */
  canUnnestBlock() {
    const { depth: e } = g(
      this._tiptapEditor.state.doc,
      this._tiptapEditor.state.selection.from
    );
    return e > 2;
  }
  /**
   * Lifts the block containing the text cursor out of its parent.
   */
  unnestBlock() {
    this._tiptapEditor.commands.liftListItem("blockContainer");
  }
  /**
   * Serializes blocks into an HTML string. To better conform to HTML standards, children of blocks which aren't list
   * items are un-nested in the output HTML.
   * @param blocks An array of blocks that should be serialized into HTML.
   * @returns The blocks, serialized as an HTML string.
   */
  async blocksToHTML(e) {
    return xt(e, this._tiptapEditor.schema);
  }
  /**
   * Parses blocks from an HTML string. Tries to create `Block` objects out of any HTML block-level elements, and
   * `InlineNode` objects from any HTML inline elements, though not all element types are recognized. If BlockNote
   * doesn't recognize an HTML element's tag, it will parse it as a paragraph or plain text.
   * @param html The HTML string to parse blocks from.
   * @returns The blocks parsed from the HTML string.
   */
  async HTMLToBlocks(e) {
    return _t(e, this.schema, this._tiptapEditor.schema);
  }
  /**
   * Serializes blocks into a Markdown string. The output is simplified as Markdown does not support all features of
   * BlockNote - children of blocks which aren't list items are un-nested and certain styles are removed.
   * @param blocks An array of blocks that should be serialized into Markdown.
   * @returns The blocks, serialized as a Markdown string.
   */
  async blocksToMarkdown(e) {
    return Ze(e, this._tiptapEditor.schema);
  }
  /**
   * Creates a list of blocks from a Markdown string. Tries to create `Block` and `InlineNode` objects based on
   * Markdown syntax, though not all symbols are recognized. If BlockNote doesn't recognize a symbol, it will parse it
   * as text.
   * @param markdown The Markdown string to parse blocks from.
   * @returns The blocks parsed from the Markdown string.
   */
  async markdownToBlocks(e) {
    return Qe(e, this.schema, this._tiptapEditor.schema);
  }
  /**
   * Updates the user info for the current user that's shown to other collaborators.
   */
  updateCollaborationUserInfo(e) {
    if (!this.options.collaboration)
      throw new Error(
        "Cannot update collaboration user info when collaboration is disabled."
      );
    this._tiptapEditor.commands.updateUser(e);
  }
}
export {
  Wo as BlockNoteEditor,
  Oe as CustomBlockSerializerExtension,
  oo as FormattingToolbarProsemirrorPlugin,
  to as FormattingToolbarView,
  io as HyperlinkToolbarProsemirrorPlugin,
  ho as SideMenuProsemirrorPlugin,
  uo as SideMenuView,
  Ve as SlashMenuProsemirrorPlugin,
  jo as blockStyles,
  nt as camelToDataKebab,
  qo as createBlockSpec,
  P as createTipTapBlock,
  wt as defaultBlockSchema,
  N as defaultProps,
  eo as formattingToolbarPluginKey,
  We as getBlockNoteExtensions,
  fo as getDefaultSlashMenuItems,
  ro as hyperlinkToolbarPluginKey,
  ge as parse,
  me as propsToAttributes,
  ke as render,
  ze as setupSuggestionsMenu,
  po as sideMenuPluginKey,
  K as slashMenuPluginKey
};
//# sourceMappingURL=blocknote.js.map
