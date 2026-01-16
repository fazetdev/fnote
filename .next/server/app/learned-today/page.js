(() => {
var exports = {};
exports.id = 895;
exports.ids = [895];
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

/***/ 3399:
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
        'learned-today',
        {
        children: ['__PAGE__', {}, {
          page: [() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 8679)), "/data/data/com.termux/files/home/fnote/app/learned-today/page.tsx"],
          
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
const pages = ["/data/data/com.termux/files/home/fnote/app/learned-today/page.tsx"];

// @ts-expect-error - replaced by webpack/turbopack loader

const __next_app_require__ = __webpack_require__
const __next_app_load_chunk__ = () => Promise.resolve()
const originalPathname = "/learned-today/page";
const __next_app__ = {
    require: __next_app_require__,
    loadChunk: __next_app_load_chunk__
};

// Create and export the route module that will be consumed.
const routeModule = new AppPageRouteModule({
    definition: {
        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_PAGE,
        page: "/learned-today/page",
        pathname: "/learned-today",
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

/***/ 5721:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 5858))

/***/ }),

/***/ 5858:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LearnedTodayPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8079);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);
/* __next_internal_client_entry_do_not_use__ default auto */ 


function LearnedTodayPage() {
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const [items, setItems] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [newItem, setNewItem] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        title: "",
        content: "",
        category: "general",
        tagInput: ""
    });
    const [editingItem, setEditingItem] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [activeDate, setActiveDate] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(new Date().toISOString().split("T")[0]);
    const categories = [
        {
            id: "technology",
            name: "Technology",
            emoji: "\uD83D\uDCBB",
            color: "bg-blue-500/20 text-blue-400 border-blue-500/30"
        },
        {
            id: "business",
            name: "Business",
            emoji: "\uD83D\uDCBC",
            color: "bg-purple-500/20 text-purple-400 border-purple-500/30"
        },
        {
            id: "personal",
            name: "Personal",
            emoji: "\uD83D\uDC64",
            color: "bg-pink-500/20 text-pink-400 border-pink-500/30"
        },
        {
            id: "skills",
            name: "Skills",
            emoji: "\uD83C\uDFAF",
            color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
        },
        {
            id: "ideas",
            name: "Ideas",
            emoji: "\uD83D\uDCA1",
            color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
        },
        {
            id: "general",
            name: "General",
            emoji: "\uD83D\uDCDA",
            color: "bg-gray-500/20 text-gray-400 border-gray-500/30"
        }
    ];
    // Load from localStorage
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const savedItems = localStorage.getItem("fnote_learned");
        if (savedItems) setItems(JSON.parse(savedItems));
    }, []);
    const saveItemsToStorage = (updatedItems)=>{
        localStorage.setItem("fnote_learned", JSON.stringify(updatedItems));
    };
    const handleAddItem = ()=>{
        if (!newItem.title.trim() || !newItem.content.trim()) return;
        const item = {
            id: Date.now().toString(),
            title: newItem.title,
            content: newItem.content,
            category: newItem.category,
            date: activeDate,
            tags: newItem.tagInput.split(",").map((tag)=>tag.trim()).filter((tag)=>tag),
            createdAt: new Date()
        };
        const updatedItems = [
            item,
            ...items
        ];
        setItems(updatedItems);
        saveItemsToStorage(updatedItems);
        setNewItem({
            title: "",
            content: "",
            category: "general",
            tagInput: ""
        });
    };
    const handleEditItem = (item)=>{
        setEditingItem(item);
        setNewItem({
            title: item.title,
            content: item.content,
            category: item.category,
            tagInput: item.tags.join(", ")
        });
    };
    const handleUpdateItem = ()=>{
        if (!editingItem || !newItem.title.trim() || !newItem.content.trim()) return;
        const updatedItem = {
            ...editingItem,
            title: newItem.title,
            content: newItem.content,
            category: newItem.category,
            tags: newItem.tagInput.split(",").map((tag)=>tag.trim()).filter((tag)=>tag)
        };
        const updatedItems = items.map((item)=>item.id === editingItem.id ? updatedItem : item);
        setItems(updatedItems);
        saveItemsToStorage(updatedItems);
        setEditingItem(null);
        setNewItem({
            title: "",
            content: "",
            category: "general",
            tagInput: ""
        });
    };
    const handleDeleteItem = (id)=>{
        const updatedItems = items.filter((item)=>item.id !== id);
        setItems(updatedItems);
        saveItemsToStorage(updatedItems);
        if (editingItem?.id === id) setEditingItem(null);
    };
    const filteredItems = items.filter((item)=>item.date === activeDate);
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
                                children: "\uD83D\uDCDA Learned Today"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "text-gray-300 text-sm",
                                children: "Track what you learn each day"
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
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "lg:w-1/3",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "bg-[#143b28] border border-[#1f5a3d] rounded-xl p-6",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                    className: "text-xl font-semibold mb-4 text-[#d4af37]",
                                    children: editingItem ? "✏️ Edit Item" : "➕ Add Learned Item"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                    className: "block text-sm text-gray-300 mb-2",
                                                    children: "Date"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                    type: "date",
                                                    value: activeDate,
                                                    onChange: (e)=>setActiveDate(e.target.value),
                                                    className: "w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white focus:outline-none focus:border-[#d4af37]"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                            type: "text",
                                            placeholder: "What did you learn?",
                                            value: newItem.title,
                                            onChange: (e)=>setNewItem({
                                                    ...newItem,
                                                    title: e.target.value
                                                }),
                                            className: "w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37]"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                    className: "block text-sm text-gray-300 mb-2",
                                                    children: "Category"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: "grid grid-cols-3 gap-2",
                                                    children: categories.map((cat)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                            type: "button",
                                                            onClick: ()=>setNewItem({
                                                                    ...newItem,
                                                                    category: cat.id
                                                                }),
                                                            className: `p-3 rounded-lg border flex flex-col items-center ${newItem.category === cat.id ? "border-[#d4af37] bg-[#d4af37]/10" : "border-[#1f5a3d] bg-[#0f2e1f] hover:bg-[#1f5a3d]"}`,
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                    className: "text-xl",
                                                                    children: cat.emoji
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                    className: "text-xs mt-1 text-gray-300",
                                                                    children: cat.name
                                                                })
                                                            ]
                                                        }, cat.id))
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
                                            placeholder: "Details about what you learned...",
                                            value: newItem.content,
                                            onChange: (e)=>setNewItem({
                                                    ...newItem,
                                                    content: e.target.value
                                                }),
                                            rows: 5,
                                            className: "w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37]"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                            type: "text",
                                            placeholder: "Tags (comma separated)",
                                            value: newItem.tagInput,
                                            onChange: (e)=>setNewItem({
                                                    ...newItem,
                                                    tagInput: e.target.value
                                                }),
                                            className: "w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37]"
                                        }),
                                        editingItem ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex gap-2",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                    onClick: handleUpdateItem,
                                                    className: "flex-1 bg-[#d4af37] text-black py-3 rounded-lg font-medium hover:bg-[#c9a633] transition",
                                                    children: "Update Item"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                    onClick: ()=>{
                                                        setEditingItem(null);
                                                        setNewItem({
                                                            title: "",
                                                            content: "",
                                                            category: "general",
                                                            tagInput: ""
                                                        });
                                                    },
                                                    className: "px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition",
                                                    children: "Cancel"
                                                })
                                            ]
                                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                            onClick: handleAddItem,
                                            className: "w-full bg-[#d4af37] text-black py-3 rounded-lg font-medium hover:bg-[#c9a633] transition",
                                            children: "Save Learned Item"
                                        })
                                    ]
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "lg:w-2/3",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "mb-6",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h2", {
                                            className: "text-lg font-semibold text-[#d4af37]",
                                            children: [
                                                "Learned on ",
                                                new Date(activeDate).toLocaleDateString("en-US", {
                                                    weekday: "long",
                                                    month: "long",
                                                    day: "numeric"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                            onClick: ()=>setActiveDate(new Date().toISOString().split("T")[0]),
                                            className: "text-sm text-gray-400 hover:text-white",
                                            children: "Today"
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "space-y-4",
                                children: filteredItems.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "bg-[#143b28] border border-[#1f5a3d] rounded-xl p-8 text-center",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "text-gray-300",
                                            children: "Nothing learned on this day yet"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "text-gray-400 text-sm mt-1",
                                            children: "Add what you learned using the form on the left"
                                        })
                                    ]
                                }) : filteredItems.map((item)=>{
                                    const categoryInfo = categories.find((c)=>c.id === item.category);
                                    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "bg-[#143b28] border border-[#1f5a3d] rounded-xl p-5 hover:border-[#d4af37] transition-colors",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-start justify-between",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex items-start gap-4 flex-1",
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            className: `w-12 h-12 rounded-lg flex items-center justify-center ${categoryInfo?.color}`,
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                className: "text-xl",
                                                                children: categoryInfo?.emoji
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                    className: "flex items-center gap-3 mb-1",
                                                                    children: [
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                                                            className: "text-lg font-semibold text-white",
                                                                            children: item.title
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                            className: `text-xs px-2 py-1 rounded-full ${categoryInfo?.color}`,
                                                                            children: categoryInfo?.name
                                                                        })
                                                                    ]
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                                    className: "text-gray-300 mt-2",
                                                                    children: item.content
                                                                }),
                                                                item.tags.length > 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                    className: "flex flex-wrap gap-2 mt-3",
                                                                    children: item.tags.map((tag)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
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
                                                                        "Added ",
                                                                        new Date(item.createdAt).toLocaleTimeString([], {
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
                                                            onClick: ()=>handleEditItem(item),
                                                            className: "px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition",
                                                            children: "Edit"
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                            onClick: ()=>handleDeleteItem(item.id),
                                                            className: "px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition",
                                                            children: "Delete"
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    }, item.id);
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "mt-8 bg-[#143b28] border border-[#1f5a3d] rounded-xl p-6",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                        className: "text-lg font-semibold text-[#d4af37] mb-4",
                                        children: "Learning Stats"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "grid grid-cols-2 md:grid-cols-3 gap-4",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "text-center",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: "text-2xl text-white mb-2",
                                                        children: filteredItems.length
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: "text-sm text-gray-300",
                                                        children: "Today's Items"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "text-center",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: "text-2xl text-white mb-2",
                                                        children: items.length
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: "text-sm text-gray-300",
                                                        children: "Total Items"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "text-center",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: "text-2xl text-white mb-2",
                                                        children: [
                                                            ...new Set(items.map((item)=>item.date))
                                                        ].length
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: "text-sm text-gray-300",
                                                        children: "Days Tracked"
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

/***/ 8679:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $$typeof: () => (/* binding */ $$typeof),
/* harmony export */   __esModule: () => (/* binding */ __esModule),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2989);

const proxy = (0,next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__.createProxy)(String.raw`/data/data/com.termux/files/home/fnote/app/learned-today/page.tsx`)

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
var __webpack_exports__ = __webpack_require__.X(0, [595,806,563,941], () => (__webpack_exec__(3399)));
module.exports = __webpack_exports__;

})();