(() => {
var exports = {};
exports.id = 570;
exports.ids = [570];
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

/***/ 3847:
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
        'notebook',
        {
        children: ['__PAGE__', {}, {
          page: [() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 9318)), "/data/data/com.termux/files/home/fnote/app/notebook/page.tsx"],
          
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
const pages = ["/data/data/com.termux/files/home/fnote/app/notebook/page.tsx"];

// @ts-expect-error - replaced by webpack/turbopack loader

const __next_app_require__ = __webpack_require__
const __next_app_load_chunk__ = () => Promise.resolve()
const originalPathname = "/notebook/page";
const __next_app__ = {
    require: __next_app_require__,
    loadChunk: __next_app_load_chunk__
};

// Create and export the route module that will be consumed.
const routeModule = new AppPageRouteModule({
    definition: {
        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_PAGE,
        page: "/notebook/page",
        pathname: "/notebook",
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

/***/ 4940:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 768))

/***/ }),

/***/ 768:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NotebookPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8079);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3657);
/* harmony import */ var _utils_sync__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6385);
/* __next_internal_client_entry_do_not_use__ default auto */ 




function NotebookPage() {
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const [notes, setNotes] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [newNote, setNewNote] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        title: "",
        content: "",
        category: "ideas",
        tagInput: ""
    });
    const [activeCategory, setActiveCategory] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("all");
    const [editingNote, setEditingNote] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [viewingNoteId, setViewingNoteId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [isOnline, setIsOnline] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [pendingSyncs, setPendingSyncs] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const categories = [
        {
            id: "ideas",
            name: "Ideas",
            emoji: "\uD83D\uDCA1"
        },
        {
            id: "growth",
            name: "Growth",
            emoji: "\uD83C\uDF31"
        },
        {
            id: "business",
            name: "Business",
            emoji: "\uD83D\uDCBC"
        },
        {
            id: "work",
            name: "Work",
            emoji: "\uD83D\uDEE0️"
        },
        {
            id: "personal",
            name: "Personal",
            emoji: "\uD83D\uDC64"
        }
    ];
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const checkOnlineStatus = ()=>setIsOnline(navigator.onLine);
        checkOnlineStatus();
        window.addEventListener("online", checkOnlineStatus);
        window.addEventListener("offline", checkOnlineStatus);
        loadNotes();
        checkPendingSyncs();
        return ()=>{
            window.removeEventListener("online", checkOnlineStatus);
            window.removeEventListener("offline", checkOnlineStatus);
        };
    }, []);
    const checkPendingSyncs = ()=>{
        setPendingSyncs(_utils_sync__WEBPACK_IMPORTED_MODULE_4__/* .syncService */ .R.getQueueSize());
    };
    const loadNotes = async ()=>{
        try {
            const data = await _utils_api__WEBPACK_IMPORTED_MODULE_3__/* .api */ .h.getNotes();
            setNotes(data);
            saveNotesToBackup(data);
        } catch (error) {
            console.error("Failed to load notes:", error);
            const savedNotes = localStorage.getItem("fnote_notes");
            if (savedNotes) setNotes(JSON.parse(savedNotes));
        }
    };
    const saveNotesToBackup = (updatedNotes)=>{
        localStorage.setItem("fnote_notes", JSON.stringify(updatedNotes));
    };
    const handleAddNote = async ()=>{
        if (!newNote.title.trim() || !newNote.content.trim()) return;
        const noteData = {
            title: newNote.title,
            content: newNote.content,
            category: newNote.category,
            tags: newNote.tagInput.split(",").map((tag)=>tag.trim()).filter((tag)=>tag)
        };
        const localNote = {
            id: Date.now().toString(),
            ...noteData,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        // Always update UI and LocalStorage immediately (Optimistic UI)
        const updatedNotes = [
            localNote,
            ...notes
        ];
        setNotes(updatedNotes);
        saveNotesToBackup(updatedNotes);
        try {
            if (isOnline) {
                await _utils_api__WEBPACK_IMPORTED_MODULE_3__/* .api */ .h.createNote(noteData);
                // Refresh from server to get real IDs and dates
                loadNotes();
            } else {
                throw new Error("Offline mode");
            }
        } catch (error) {
            console.warn("API Sync failed, keeping local and queuing:", error);
            _utils_sync__WEBPACK_IMPORTED_MODULE_4__/* .syncService */ .R.addToQueue({
                type: "CREATE",
                entityType: "note",
                entityId: localNote.id,
                data: noteData
            });
            checkPendingSyncs();
        }
        setNewNote({
            title: "",
            content: "",
            category: "ideas",
            tagInput: ""
        });
    };
    const handleDeleteNote = async (id)=>{
        const updatedNotes = notes.filter((note)=>note.id !== id);
        setNotes(updatedNotes);
        saveNotesToBackup(updatedNotes);
        try {
            if (isOnline) {
                await _utils_api__WEBPACK_IMPORTED_MODULE_3__/* .api */ .h.deleteNote(id);
            } else {
                throw new Error("Offline mode");
            }
        } catch (error) {
            _utils_sync__WEBPACK_IMPORTED_MODULE_4__/* .syncService */ .R.addToQueue({
                type: "DELETE",
                entityType: "note",
                entityId: id,
                data: {
                    id
                }
            });
            checkPendingSyncs();
        }
        if (viewingNoteId === id) setViewingNoteId(null);
    };
    const handleEditNote = (note)=>{
        setEditingNote(note);
        setNewNote({
            title: note.title,
            content: note.content,
            category: note.category,
            tagInput: note.tags.join(", ")
        });
        setViewingNoteId(null);
    };
    const handleUpdateNote = async ()=>{
        if (!editingNote || !newNote.title.trim() || !newNote.content.trim()) return;
        const updateData = {
            title: newNote.title,
            content: newNote.content,
            category: newNote.category,
            tags: newNote.tagInput.split(",").map((tag)=>tag.trim()).filter((tag)=>tag)
        };
        const updatedNotes = notes.map((note)=>note.id === editingNote.id ? {
                ...note,
                ...updateData,
                updatedAt: new Date()
            } : note);
        setNotes(updatedNotes);
        saveNotesToBackup(updatedNotes);
        try {
            if (isOnline) {
                await _utils_api__WEBPACK_IMPORTED_MODULE_3__/* .api */ .h.updateNote(editingNote.id, updateData);
            } else {
                throw new Error("Offline mode");
            }
        } catch (error) {
            _utils_sync__WEBPACK_IMPORTED_MODULE_4__/* .syncService */ .R.addToQueue({
                type: "UPDATE",
                entityType: "note",
                entityId: editingNote.id,
                data: updateData
            });
            checkPendingSyncs();
        }
        setEditingNote(null);
        setNewNote({
            title: "",
            content: "",
            category: "ideas",
            tagInput: ""
        });
    };
    const toggleViewNote = (id)=>{
        setViewingNoteId(viewingNoteId === id ? null : id);
    };
    const handleSyncNow = async ()=>{
        try {
            await _utils_sync__WEBPACK_IMPORTED_MODULE_4__/* .syncService */ .R.syncIfOnline();
            checkPendingSyncs();
            loadNotes();
        } catch (error) {
            console.error("Sync failed:", error);
        }
    };
    const filteredNotes = activeCategory === "all" ? notes : notes.filter((note)=>note.category === activeCategory);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "min-h-screen flex flex-col bg-[#0f2e1f] text-white px-4 py-6",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between mb-6",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                                className: "text-2xl font-bold text-[#d4af37]",
                                children: "\uD83D\uDCD3 Notebook"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "text-gray-300 text-sm",
                                children: "Save and organize notes"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-4 mt-2",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: `px-2 py-1 rounded text-xs ${isOnline ? "bg-green-600" : "bg-red-600"}`,
                                        children: isOnline ? "\uD83D\uDFE2 Online" : "\uD83D\uDD34 Offline"
                                    }),
                                    pendingSyncs > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: handleSyncNow,
                                        className: "px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs flex items-center gap-1",
                                        children: [
                                            "\uD83D\uDD04 Sync Pending (",
                                            pendingSyncs,
                                            ")"
                                        ]
                                    })
                                ]
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
                className: "flex flex-col lg:flex-row gap-6 flex-grow",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "lg:w-1/3",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "bg-[#143b28] border border-[#1f5a3d] rounded-xl p-6",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                    className: "text-xl font-semibold mb-4 text-[#d4af37]",
                                    children: editingNote ? "✏️ Edit Note" : "➕ Add New Note"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                            type: "text",
                                            placeholder: "Title",
                                            value: newNote.title,
                                            onChange: (e)=>setNewNote({
                                                    ...newNote,
                                                    title: e.target.value
                                                }),
                                            className: "w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37]"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("select", {
                                            value: newNote.category,
                                            onChange: (e)=>setNewNote({
                                                    ...newNote,
                                                    category: e.target.value
                                                }),
                                            className: "w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white focus:outline-none focus:border-[#d4af37]",
                                            children: categories.map((cat)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("option", {
                                                    value: cat.id,
                                                    className: "bg-[#143b28]",
                                                    children: [
                                                        cat.emoji,
                                                        " ",
                                                        cat.name
                                                    ]
                                                }, cat.id))
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
                                            placeholder: "Content",
                                            value: newNote.content,
                                            onChange: (e)=>setNewNote({
                                                    ...newNote,
                                                    content: e.target.value
                                                }),
                                            rows: 5,
                                            className: "w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37]"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                            type: "text",
                                            placeholder: "Tags (comma separated)",
                                            value: newNote.tagInput,
                                            onChange: (e)=>setNewNote({
                                                    ...newNote,
                                                    tagInput: e.target.value
                                                }),
                                            className: "w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37]"
                                        }),
                                        editingNote ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex gap-2",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                    onClick: handleUpdateNote,
                                                    className: "flex-1 bg-[#d4af37] text-black py-3 rounded-lg font-medium hover:bg-[#c9a633] transition",
                                                    children: "Update Note"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                    onClick: ()=>{
                                                        setEditingNote(null);
                                                        setNewNote({
                                                            title: "",
                                                            content: "",
                                                            category: "ideas",
                                                            tagInput: ""
                                                        });
                                                    },
                                                    className: "px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition",
                                                    children: "Cancel"
                                                })
                                            ]
                                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                            onClick: handleAddNote,
                                            disabled: !newNote.title.trim() || !newNote.content.trim(),
                                            className: "w-full bg-[#d4af37] text-black py-3 rounded-lg font-medium hover:bg-[#c9a633] transition disabled:opacity-50 disabled:cursor-not-allowed",
                                            children: "Save Note"
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
                                    className: "flex flex-wrap gap-2",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                            onClick: ()=>setActiveCategory("all"),
                                            className: `px-4 py-2 rounded-lg ${activeCategory === "all" ? "bg-[#d4af37] text-black" : "bg-[#143b28] text-white border border-[#1f5a3d]"}`,
                                            children: "All Notes"
                                        }),
                                        categories.map((cat)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                onClick: ()=>setActiveCategory(cat.id),
                                                className: `px-4 py-2 rounded-lg flex items-center gap-2 ${activeCategory === cat.id ? "bg-[#d4af37] text-black" : "bg-[#143b28] text-white border border-[#1f5a3d]"}`,
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                        children: cat.emoji
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                        children: cat.name
                                                    })
                                                ]
                                            }, cat.id))
                                    ]
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "space-y-3",
                                children: filteredNotes.length === 0 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "bg-[#143b28] border border-[#1f5a3d] rounded-xl p-8 text-center",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: "text-gray-300",
                                        children: "No notes yet"
                                    })
                                }) : filteredNotes.map((note)=>{
                                    const categoryInfo = categories.find((c)=>c.id === note.category);
                                    const isViewing = viewingNoteId === note.id;
                                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "bg-[#143b28] border border-[#1f5a3d] rounded-xl p-4 hover:border-[#d4af37] transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "flex items-center gap-4 flex-1",
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                className: `w-10 h-10 rounded-lg flex items-center justify-center ${categoryInfo?.id === "ideas" ? "bg-blue-500/20" : categoryInfo?.id === "growth" ? "bg-green-500/20" : categoryInfo?.id === "business" ? "bg-purple-500/20" : categoryInfo?.id === "work" ? "bg-yellow-500/20" : "bg-pink-500/20"}`,
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                    className: "text-lg",
                                                                    children: categoryInfo?.emoji
                                                                })
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                className: "flex-1",
                                                                children: [
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                                                        className: "text-lg font-semibold text-white",
                                                                        children: note.title
                                                                    }),
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                        className: "flex items-center gap-3 mt-1",
                                                                        children: [
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                                className: "text-sm text-gray-300",
                                                                                children: new Date(note.createdAt).toLocaleDateString()
                                                                            }),
                                                                            note.tags.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                                className: "text-sm text-gray-400",
                                                                                children: [
                                                                                    note.tags.length,
                                                                                    " tags"
                                                                                ]
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
                                                                onClick: ()=>toggleViewNote(note.id),
                                                                className: `px-3 py-1 rounded-lg text-sm transition ${isViewing ? "bg-gray-600" : "bg-emerald-600"} text-white`,
                                                                children: isViewing ? "Close" : "View"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                className: "flex gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                                        onClick: ()=>handleEditNote(note),
                                                                        className: "px-3 py-1 bg-blue-600 text-white rounded-lg text-sm flex-1",
                                                                        children: "Edit"
                                                                    }),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                                        onClick: ()=>handleDeleteNote(note.id),
                                                                        className: "px-3 py-1 bg-red-600 text-white rounded-lg text-sm flex-1",
                                                                        children: "Delete"
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            isViewing && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: "mt-4 pt-4 border-t border-[#1f5a3d]",
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: "bg-[#0f2e1f] rounded-lg p-4",
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                        className: "text-gray-300 whitespace-pre-line",
                                                        children: note.content
                                                    })
                                                })
                                            })
                                        ]
                                    }, note.id);
                                })
                            })
                        ]
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 9318:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $$typeof: () => (/* binding */ $$typeof),
/* harmony export */   __esModule: () => (/* binding */ __esModule),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2989);

const proxy = (0,next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__.createProxy)(String.raw`/data/data/com.termux/files/home/fnote/app/notebook/page.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__default__);

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [595,806,563,941,705], () => (__webpack_exec__(3847)));
module.exports = __webpack_exports__;

})();