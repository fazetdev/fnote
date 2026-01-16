(() => {
var exports = {};
exports.id = 244;
exports.ids = [244];
exports.modules = {

/***/ 8038:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/react");

/***/ }),

/***/ 8704:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/react-dom/server-rendering-stub");

/***/ }),

/***/ 7897:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/react-server-dom-webpack/client");

/***/ }),

/***/ 6786:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/react/jsx-runtime");

/***/ }),

/***/ 5868:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/app-render");

/***/ }),

/***/ 1844:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/get-segment-param");

/***/ }),

/***/ 6624:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/future/helpers/interception-routes");

/***/ }),

/***/ 5281:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/future/route-modules/route-module");

/***/ }),

/***/ 7085:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context");

/***/ }),

/***/ 199:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/hash");

/***/ }),

/***/ 9569:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/hooks-client-context");

/***/ }),

/***/ 893:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix");

/***/ }),

/***/ 7887:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/handle-smooth-scroll");

/***/ }),

/***/ 8735:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-bot");

/***/ }),

/***/ 8231:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path");

/***/ }),

/***/ 4614:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix");

/***/ }),

/***/ 3750:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash");

/***/ }),

/***/ 9618:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/server-inserted-html");

/***/ }),

/***/ 1017:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 7310:
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ 269:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GlobalError: () => (/* reexport default from dynamic */ next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2___default.a),
/* harmony export */   __next_app__: () => (/* binding */ __next_app__),
/* harmony export */   originalPathname: () => (/* binding */ originalPathname),
/* harmony export */   pages: () => (/* binding */ pages),
/* harmony export */   routeModule: () => (/* binding */ routeModule),
/* harmony export */   tree: () => (/* binding */ tree)
/* harmony export */ });
/* harmony import */ var next_dist_server_future_route_modules_app_page_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4807);
/* harmony import */ var next_dist_server_future_route_modules_app_page_module__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_page_module__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8543);
/* harmony import */ var next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7247);
/* harmony import */ var next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8638);
/* harmony import */ var next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__) if(["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
// @ts-ignore this need to be imported from next/dist to be external


const AppPageRouteModule = next_dist_server_future_route_modules_app_page_module__WEBPACK_IMPORTED_MODULE_0__.AppPageRouteModule;
// We inject the tree and pages here so that we can use them in the route
// module.
const tree = {
        children: [
        '',
        {
        children: [
        'thoughts',
        {
        children: ['__PAGE__', {}, {
          page: [() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 5040)), "/data/data/com.termux/files/home/fnote/app/thoughts/page.tsx"],
          
        }]
      },
        {
        
        metadata: {
    icon: [(async (props) => (await Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 9352))).default(props))],
    apple: [],
    openGraph: [],
    twitter: [],
    manifest: undefined
  }
      }
      ]
      },
        {
        'layout': [() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 531)), "/data/data/com.termux/files/home/fnote/app/layout.tsx"],
'not-found': [() => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 6706, 23)), "next/dist/client/components/not-found-error"],
        metadata: {
    icon: [(async (props) => (await Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 9352))).default(props))],
    apple: [],
    openGraph: [],
    twitter: [],
    manifest: undefined
  }
      }
      ]
      }.children;
const pages = ["/data/data/com.termux/files/home/fnote/app/thoughts/page.tsx"];

// @ts-expect-error - replaced by webpack/turbopack loader

const __next_app_require__ = __webpack_require__
const __next_app_load_chunk__ = () => Promise.resolve()
const originalPathname = "/thoughts/page";
const __next_app__ = {
    require: __next_app_require__,
    loadChunk: __next_app_load_chunk__
};

// Create and export the route module that will be consumed.
const routeModule = new AppPageRouteModule({
    definition: {
        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_PAGE,
        page: "/thoughts/page",
        pathname: "/thoughts",
        // The following aren't used in production.
        bundlePath: "",
        filename: "",
        appPaths: []
    },
    userland: {
        loaderTree: tree
    }
});

//# sourceMappingURL=app-page.js.map

/***/ }),

/***/ 4388:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 4410))

/***/ }),

/***/ 4410:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ThoughtsPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8079);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);
/* __next_internal_client_entry_do_not_use__ default auto */ 


function ThoughtsPage() {
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const [thoughts, setThoughts] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [newThought, setNewThought] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        content: "",
        type: "insight",
        mood: "\uD83E\uDD14",
        tagInput: "",
        date: new Date().toISOString().split("T")[0]
    });
    const [filterType, setFilterType] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("all");
    const [filterDate, setFilterDate] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [editingThought, setEditingThought] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const thoughtTypes = [
        {
            id: "insight",
            name: "Insight",
            emoji: "\uD83D\uDCA1",
            color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
        },
        {
            id: "pattern",
            name: "Pattern",
            emoji: "\uD83D\uDD04",
            color: "bg-blue-500/20 text-blue-400 border-blue-500/30"
        },
        {
            id: "idea",
            name: "Idea",
            emoji: "✨",
            color: "bg-purple-500/20 text-purple-400 border-purple-500/30"
        },
        {
            id: "reflection",
            name: "Reflection",
            emoji: "\uD83E\uDD14",
            color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
        },
        {
            id: "question",
            name: "Question",
            emoji: "❓",
            color: "bg-red-500/20 text-red-400 border-red-500/30"
        },
        {
            id: "observation",
            name: "Observation",
            emoji: "\uD83D\uDC40",
            color: "bg-gray-500/20 text-gray-400 border-gray-500/30"
        }
    ];
    const moods = [
        "\uD83D\uDE0A",
        "\uD83D\uDE10",
        "\uD83D\uDE14",
        "\uD83D\uDE21",
        "\uD83E\uDD14",
        "\uD83C\uDFAF",
        "\uD83D\uDCA1"
    ];
    // Load thoughts
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const saved = localStorage.getItem("fnote_thoughts");
        if (saved) setThoughts(JSON.parse(saved));
    }, []);
    const saveThoughtsToStorage = (updatedThoughts)=>{
        localStorage.setItem("fnote_thoughts", JSON.stringify(updatedThoughts));
    };
    const handleAddThought = ()=>{
        if (!newThought.content.trim()) return;
        const thought = {
            id: Date.now().toString(),
            content: newThought.content,
            type: newThought.type,
            mood: newThought.mood,
            tags: newThought.tagInput.split(",").map((t)=>t.trim()).filter((t)=>t),
            createdAt: new Date(),
            date: newThought.date
        };
        const updated = [
            thought,
            ...thoughts
        ];
        setThoughts(updated);
        saveThoughtsToStorage(updated);
        setNewThought({
            content: "",
            type: "insight",
            mood: "\uD83E\uDD14",
            tagInput: "",
            date: new Date().toISOString().split("T")[0]
        });
    };
    const handleEditThought = (thought)=>{
        setEditingThought(thought);
        setNewThought({
            content: thought.content,
            type: thought.type,
            mood: thought.mood,
            tagInput: thought.tags.join(", "),
            date: thought.date
        });
    };
    const handleUpdateThought = ()=>{
        if (!editingThought || !newThought.content.trim()) return;
        const updatedThought = {
            ...editingThought,
            content: newThought.content,
            type: newThought.type,
            mood: newThought.mood,
            tags: newThought.tagInput.split(",").map((t)=>t.trim()).filter((t)=>t),
            date: newThought.date
        };
        const updated = thoughts.map((t)=>t.id === editingThought.id ? updatedThought : t);
        setThoughts(updated);
        saveThoughtsToStorage(updated);
        setEditingThought(null);
        setNewThought({
            content: "",
            type: "insight",
            mood: "\uD83E\uDD14",
            tagInput: "",
            date: new Date().toISOString().split("T")[0]
        });
    };
    const deleteThought = (id)=>{
        const updated = thoughts.filter((t)=>t.id !== id);
        setThoughts(updated);
        saveThoughtsToStorage(updated);
        if (editingThought?.id === id) setEditingThought(null);
    };
    const filteredThoughts = thoughts.filter((t)=>{
        if (filterType !== "all" && t.type !== filterType) return false;
        if (filterDate && t.date !== filterDate) return false;
        return true;
    });
    const getThoughtCountByType = (type)=>thoughts.filter((t)=>t.type === type).length;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "min-h-screen bg-[#0f2e1f] text-white px-4 py-6",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between mb-6",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                                className: "text-2xl font-bold text-[#d4af37]",
                                children: "\uD83D\uDCAD Thinking Tracker"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "text-gray-300 text-sm",
                                children: "Log insights, patterns, and reflections"
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        onClick: ()=>router.push("/dashboard"),
                        className: "text-gray-400 hover:text-white text-sm",
                        children: "← Back to Dashboard"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex flex-col lg:flex-row gap-6",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "lg:w-1/3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "bg-[#143b28] border border-[#1f5a3d] rounded-xl p-6",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                        className: "text-xl font-semibold mb-4 text-[#d4af37]",
                                        children: editingThought ? "✏️ Edit Thought" : "➕ Record Thought"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                type: "date",
                                                value: newThought.date,
                                                onChange: (e)=>setNewThought({
                                                        ...newThought,
                                                        date: e.target.value
                                                    }),
                                                className: "w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white focus:outline-none focus:border-[#d4af37]"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                        className: "block text-sm text-gray-300 mb-2",
                                                        children: "Thought Type"
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: "grid grid-cols-3 gap-2",
                                                        children: thoughtTypes.map((t)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                                onClick: ()=>setNewThought({
                                                                        ...newThought,
                                                                        type: t.id
                                                                    }),
                                                                className: `p-3 rounded-lg border flex flex-col items-center ${newThought.type === t.id ? "border-[#d4af37] bg-[#d4af37]/10" : "border-[#1f5a3d] bg-[#0f2e1f] hover:bg-[#1f5a3d]"}`,
                                                                children: [
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                        className: "text-xl",
                                                                        children: t.emoji
                                                                    }),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                        className: "text-xs mt-1 text-gray-300",
                                                                        children: t.name
                                                                    })
                                                                ]
                                                            }, t.id))
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                        className: "block text-sm text-gray-300 mb-2",
                                                        children: "Mood/Feeling"
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: "flex flex-wrap gap-2",
                                                        children: moods.map((m)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                                onClick: ()=>setNewThought({
                                                                        ...newThought,
                                                                        mood: m
                                                                    }),
                                                                className: `text-2xl p-2 rounded-lg ${newThought.mood === m ? "border-2 border-[#d4af37] bg-[#d4af37]/10" : "bg-[#0f2e1f] border border-[#1f5a3d] hover:bg-[#1f5a3d]"}`,
                                                                children: m
                                                            }, m))
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
                                                placeholder: "What's on your mind? Insights, patterns, questions?",
                                                value: newThought.content,
                                                onChange: (e)=>setNewThought({
                                                        ...newThought,
                                                        content: e.target.value
                                                    }),
                                                className: "w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37]",
                                                rows: 5
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                type: "text",
                                                placeholder: "Tags (comma separated)",
                                                value: newThought.tagInput,
                                                onChange: (e)=>setNewThought({
                                                        ...newThought,
                                                        tagInput: e.target.value
                                                    }),
                                                className: "w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37]"
                                            }),
                                            editingThought ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex gap-2",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                        onClick: handleUpdateThought,
                                                        className: "flex-1 bg-[#d4af37] text-black py-3 rounded-lg font-medium hover:bg-[#c9a633] transition",
                                                        children: "Update Thought"
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                        onClick: ()=>{
                                                            setEditingThought(null);
                                                            setNewThought({
                                                                content: "",
                                                                type: "insight",
                                                                mood: "\uD83E\uDD14",
                                                                tagInput: "",
                                                                date: new Date().toISOString().split("T")[0]
                                                            });
                                                        },
                                                        className: "px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition",
                                                        children: "Cancel"
                                                    })
                                                ]
                                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                onClick: handleAddThought,
                                                className: "w-full bg-[#d4af37] text-black py-3 rounded-lg font-medium hover:bg-[#c9a633] transition",
                                                children: "Save Thought"
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "bg-[#143b28] border border-[#1f5a3d] rounded-xl p-6 mt-6",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                        className: "text-lg font-semibold text-[#d4af37] mb-4",
                                        children: "\uD83D\uDCCA Thought Stats"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex justify-between items-center",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                        className: "text-gray-300",
                                                        children: "Total Thoughts"
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                        className: "text-[#d4af37] font-bold",
                                                        children: thoughts.length
                                                    })
                                                ]
                                            }),
                                            thoughtTypes.map((t)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex justify-between items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                    children: t.emoji
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                    className: "text-gray-300",
                                                                    children: t.name
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                            className: "font-medium text-white",
                                                            children: getThoughtCountByType(t.id)
                                                        })
                                                    ]
                                                }, t.id))
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "lg:w-2/3",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "bg-[#143b28] border border-[#1f5a3d] rounded-xl p-6 mb-6",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex flex-col md:flex-row md:items-center justify-between gap-4",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                                    className: "text-sm font-medium text-gray-300 mb-2",
                                                    children: "Filter by Type"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex flex-wrap gap-2",
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                            onClick: ()=>setFilterType("all"),
                                                            className: `px-3 py-1.5 rounded-lg text-sm ${filterType === "all" ? "bg-[#d4af37] text-black" : "bg-[#0f2e1f] text-gray-300 border border-[#1f5a3d] hover:border-[#d4af37]"}`,
                                                            children: "All Types"
                                                        }),
                                                        thoughtTypes.map((t)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                                onClick: ()=>setFilterType(t.id),
                                                                className: `px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 ${filterType === t.id ? t.color.replace("bg-", "bg-").replace("text-", "text-") : "bg-[#0f2e1f] text-gray-300 border border-[#1f5a3d] hover:border-[#d4af37]"}`,
                                                                children: [
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                        children: t.emoji
                                                                    }),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                        children: t.name
                                                                    })
                                                                ]
                                                            }, t.id))
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                    className: "block text-sm font-medium text-gray-300 mb-2",
                                                    children: "Filter by Date"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                            type: "date",
                                                            value: filterDate,
                                                            onChange: (e)=>setFilterDate(e.target.value),
                                                            className: "px-4 py-2 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white focus:outline-none focus:border-[#d4af37]"
                                                        }),
                                                        filterDate && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                            onClick: ()=>setFilterDate(""),
                                                            className: "text-sm text-gray-400 hover:text-white",
                                                            children: "Clear"
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "space-y-4",
                                children: filteredThoughts.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "bg-[#143b28] border border-[#1f5a3d] rounded-xl p-8 text-center",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "text-gray-300",
                                            children: "No thoughts yet"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "text-gray-400 text-sm mt-1",
                                            children: "Record your first thought using the form on the left"
                                        })
                                    ]
                                }) : filteredThoughts.map((t)=>{
                                    const typeInfo = thoughtTypes.find((tt)=>tt.id === t.type);
                                    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "bg-[#143b28] border border-[#1f5a3d] rounded-xl p-5 hover:border-[#d4af37] transition-colors",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-start justify-between",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex items-start gap-4 flex-1",
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            className: "text-3xl",
                                                            children: t.mood
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                    className: "flex items-center gap-3 mb-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                            className: `text-xs px-2 py-1 rounded-full ${typeInfo?.color}`,
                                                                            children: [
                                                                                typeInfo?.emoji,
                                                                                " ",
                                                                                typeInfo?.name
                                                                            ]
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                            className: "text-sm text-gray-400",
                                                                            children: new Date(t.date).toLocaleDateString("en-US", {
                                                                                weekday: "short",
                                                                                month: "short",
                                                                                day: "numeric"
                                                                            })
                                                                        })
                                                                    ]
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                                    className: "text-gray-200 whitespace-pre-line",
                                                                    children: t.content
                                                                }),
                                                                t.tags.length > 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                    className: "flex flex-wrap gap-2 mt-3",
                                                                    children: t.tags.map((tag)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                            className: "px-2 py-1 text-sm rounded bg-[#0f2e1f] text-gray-300 border border-[#1f5a3d]",
                                                                            children: [
                                                                                "#",
                                                                                tag
                                                                            ]
                                                                        }, tag))
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                    className: "text-sm text-gray-400 mt-3",
                                                                    children: [
                                                                        "Recorded ",
                                                                        new Date(t.createdAt).toLocaleTimeString([], {
                                                                            hour: "2-digit",
                                                                            minute: "2-digit"
                                                                        })
                                                                    ]
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex flex-col gap-2",
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                            onClick: ()=>handleEditThought(t),
                                                            className: "px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition",
                                                            children: "Edit"
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                            onClick: ()=>deleteThought(t.id),
                                                            className: "px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition",
                                                            children: "Delete"
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    }, t.id);
                                })
                            }),
                            thoughts.length > 10 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "mt-8 bg-[#143b28] border border-[#1f5a3d] rounded-xl p-6",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                        className: "text-lg font-semibold text-[#d4af37] mb-4",
                                        children: "\uD83D\uDD0D Patterns & Insights"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "p-4 bg-emerald-900/20 rounded-lg border border-emerald-500/30",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                                                        className: "font-medium text-emerald-400 mb-2",
                                                        children: "Most Common Type"
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                        className: "text-3xl font-bold text-emerald-300",
                                                        children: thoughtTypes.reduce((prev, current)=>getThoughtCountByType(prev.id) > getThoughtCountByType(current.id) ? prev : current).emoji
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                        className: "text-sm text-emerald-400 mt-1",
                                                        children: [
                                                            "You think in ",
                                                            thoughtTypes.reduce((prev, current)=>getThoughtCountByType(prev.id) > getThoughtCountByType(current.id) ? prev : current).name.toLowerCase(),
                                                            " patterns"
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "p-4 bg-blue-900/20 rounded-lg border border-blue-500/30",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                                                        className: "font-medium text-blue-400 mb-2",
                                                        children: "Recent Activity"
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                        className: "text-3xl font-bold text-blue-300",
                                                        children: thoughts.filter((t)=>{
                                                            const thoughtDate = new Date(t.createdAt);
                                                            const weekAgo = new Date();
                                                            weekAgo.setDate(weekAgo.getDate() - 7);
                                                            return thoughtDate > weekAgo;
                                                        }).length
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                        className: "text-sm text-blue-400 mt-1",
                                                        children: "thoughts in the last 7 days"
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 5040:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $$typeof: () => (/* binding */ $$typeof),
/* harmony export */   __esModule: () => (/* binding */ __esModule),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2989);

const proxy = (0,next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__.createProxy)(String.raw`/data/data/com.termux/files/home/fnote/app/thoughts/page.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__default__);

/***/ }),

/***/ 8079:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(5563)


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [595,806,563,941], () => (__webpack_exec__(269)));
module.exports = __webpack_exports__;

})();