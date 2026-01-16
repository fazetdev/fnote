(() => {
var exports = {};
exports.id = 639;
exports.ids = [639];
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

/***/ 3333:
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
        'goals',
        {
        children: ['__PAGE__', {}, {
          page: [() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 9573)), "/data/data/com.termux/files/home/fnote/app/goals/page.tsx"],
          
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
const pages = ["/data/data/com.termux/files/home/fnote/app/goals/page.tsx"];

// @ts-expect-error - replaced by webpack/turbopack loader

const __next_app_require__ = __webpack_require__
const __next_app_load_chunk__ = () => Promise.resolve()
const originalPathname = "/goals/page";
const __next_app__ = {
    require: __next_app_require__,
    loadChunk: __next_app_load_chunk__
};

// Create and export the route module that will be consumed.
const routeModule = new AppPageRouteModule({
    definition: {
        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_PAGE,
        page: "/goals/page",
        pathname: "/goals",
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

/***/ 9616:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 3613))

/***/ }),

/***/ 3613:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GoalsPage)
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




function GoalsPage() {
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const [goals, setGoals] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [newGoal, setNewGoal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        title: "",
        description: "",
        type: "yearly",
        targetDate: new Date().toISOString().split("T")[0],
        progress: 0,
        parentId: null,
        periodLabel: ""
    });
    const [activeType, setActiveType] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("all");
    const [editingGoal, setEditingGoal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [selectedParent, setSelectedParent] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [expandedGoalId, setExpandedGoalId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [isOnline, setIsOnline] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [pendingSyncs, setPendingSyncs] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const goalTypes = [
        {
            id: "yearly",
            name: "Yearly",
            emoji: "\uD83D\uDCC5",
            color: "bg-purple-600/20 border-purple-500/30 text-purple-400",
            childType: "quarterly"
        },
        {
            id: "quarterly",
            name: "Quarterly",
            emoji: "\uD83C\uDFAF",
            color: "bg-blue-600/20 border-blue-500/30 text-blue-400",
            childType: "monthly"
        },
        {
            id: "monthly",
            name: "Monthly",
            emoji: "\uD83D\uDCCA",
            color: "bg-emerald-600/20 border-emerald-500/30 text-emerald-400",
            childType: "weekly"
        },
        {
            id: "weekly",
            name: "Weekly",
            emoji: "\uD83D\uDDD3️",
            color: "bg-amber-600/20 border-amber-500/30 text-amber-400",
            childType: null
        }
    ];
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const checkOnlineStatus = ()=>setIsOnline(navigator.onLine);
        checkOnlineStatus();
        window.addEventListener("online", checkOnlineStatus);
        window.addEventListener("offline", checkOnlineStatus);
        loadGoals();
        checkPendingSyncs();
        return ()=>{
            window.removeEventListener("online", checkOnlineStatus);
            window.removeEventListener("offline", checkOnlineStatus);
        };
    }, []);
    const checkPendingSyncs = ()=>{
        setPendingSyncs(_utils_sync__WEBPACK_IMPORTED_MODULE_4__/* .syncService */ .R.getQueueSize());
    };
    const loadGoals = async ()=>{
        setLoading(true);
        try {
            const data = await _utils_api__WEBPACK_IMPORTED_MODULE_3__/* .api */ .h.getGoals();
            setGoals(data);
            saveGoalsToBackup(data);
        } catch (error) {
            console.error("Failed to load goals:", error);
            const savedGoals = localStorage.getItem("fnote_goals");
            if (savedGoals) setGoals(JSON.parse(savedGoals));
        } finally{
            setLoading(false);
        }
    };
    const saveGoalsToBackup = (updatedGoals)=>{
        localStorage.setItem("fnote_goals", JSON.stringify(updatedGoals));
    };
    const calculatePeriodLabel = (type, date)=>{
        const d = new Date(date);
        switch(type){
            case "yearly":
                return d.getFullYear().toString();
            case "quarterly":
                const quarter = Math.floor(d.getMonth() / 3) + 1;
                return `Q${quarter} ${d.getFullYear()}`;
            case "monthly":
                return d.toLocaleString("default", {
                    month: "long"
                }) + " " + d.getFullYear();
            case "weekly":
                const weekNumber = Math.ceil(d.getDate() / 7);
                return `Week ${weekNumber}, ${d.toLocaleString("default", {
                    month: "short"
                })} ${d.getFullYear()}`;
            default:
                return "";
        }
    };
    const getStatusFromProgress = (progress)=>{
        return progress === 0 ? "not-started" : progress === 100 ? "completed" : "in-progress";
    };
    const handleAddGoal = async ()=>{
        if (!newGoal.title.trim() || !newGoal.targetDate) return;
        const periodLabel = newGoal.periodLabel || calculatePeriodLabel(newGoal.type, newGoal.targetDate);
        const status = getStatusFromProgress(newGoal.progress);
        const goalData = {
            title: newGoal.title,
            description: newGoal.description,
            type: newGoal.type,
            targetDate: newGoal.targetDate,
            progress: newGoal.progress,
            status: status,
            parentId: newGoal.parentId,
            periodLabel
        };
        const localGoal = {
            id: Date.now().toString(),
            ...goalData,
            createdAt: new Date()
        };
        // Optimistic Update
        const updatedGoals = [
            localGoal,
            ...goals
        ];
        setGoals(updatedGoals);
        saveGoalsToBackup(updatedGoals);
        try {
            if (isOnline) {
                await _utils_api__WEBPACK_IMPORTED_MODULE_3__/* .api */ .h.createGoal(goalData);
                loadGoals();
            } else {
                throw new Error("Offline");
            }
        } catch (error) {
            console.warn("Goal API sync failed, queuing:", error);
            _utils_sync__WEBPACK_IMPORTED_MODULE_4__/* .syncService */ .R.addToQueue({
                type: "CREATE",
                entityType: "goal",
                entityId: localGoal.id,
                data: goalData
            });
            checkPendingSyncs();
        }
        setNewGoal({
            title: "",
            description: "",
            type: "yearly",
            targetDate: new Date().toISOString().split("T")[0],
            progress: 0,
            parentId: null,
            periodLabel: ""
        });
        setSelectedParent(null);
    };
    const handleDeleteGoal = async (id)=>{
        const updatedGoals = goals.filter((goal)=>goal.id !== id);
        setGoals(updatedGoals);
        saveGoalsToBackup(updatedGoals);
        try {
            if (isOnline) {
                await _utils_api__WEBPACK_IMPORTED_MODULE_3__/* .api */ .h.deleteGoal(id);
            } else {
                throw new Error("Offline");
            }
        } catch (error) {
            _utils_sync__WEBPACK_IMPORTED_MODULE_4__/* .syncService */ .R.addToQueue({
                type: "DELETE",
                entityType: "goal",
                entityId: id,
                data: {
                    id
                }
            });
            checkPendingSyncs();
        }
        if (expandedGoalId === id) setExpandedGoalId(null);
    };
    const handleEditGoal = (goal)=>{
        setEditingGoal(goal);
        setNewGoal({
            title: goal.title,
            description: goal.description,
            type: goal.type,
            targetDate: goal.targetDate.split("T")[0],
            progress: goal.progress,
            parentId: goal.parentId,
            periodLabel: goal.periodLabel
        });
        if (goal.parentId) setSelectedParent(goal.parentId);
    };
    const handleUpdateGoal = async ()=>{
        if (!editingGoal || !newGoal.title.trim() || !newGoal.targetDate) return;
        const periodLabel = newGoal.periodLabel || calculatePeriodLabel(newGoal.type, newGoal.targetDate);
        const status = getStatusFromProgress(newGoal.progress);
        const updateData = {
            title: newGoal.title,
            description: newGoal.description,
            type: newGoal.type,
            targetDate: newGoal.targetDate,
            progress: newGoal.progress,
            status: status,
            parentId: newGoal.parentId,
            periodLabel
        };
        const updatedGoals = goals.map((goal)=>goal.id === editingGoal.id ? {
                ...goal,
                ...updateData
            } : goal);
        setGoals(updatedGoals);
        saveGoalsToBackup(updatedGoals);
        try {
            if (isOnline) {
                await _utils_api__WEBPACK_IMPORTED_MODULE_3__/* .api */ .h.updateGoal(editingGoal.id, updateData);
            } else {
                throw new Error("Offline");
            }
        } catch (error) {
            _utils_sync__WEBPACK_IMPORTED_MODULE_4__/* .syncService */ .R.addToQueue({
                type: "UPDATE",
                entityType: "goal",
                entityId: editingGoal.id,
                data: updateData
            });
            checkPendingSyncs();
        }
        setEditingGoal(null);
        setNewGoal({
            title: "",
            description: "",
            type: "yearly",
            targetDate: new Date().toISOString().split("T")[0],
            progress: 0,
            parentId: null,
            periodLabel: ""
        });
        setSelectedParent(null);
    };
    const toggleExpandGoal = (id)=>{
        setExpandedGoalId(expandedGoalId === id ? null : id);
    };
    const handleSyncNow = async ()=>{
        try {
            await _utils_sync__WEBPACK_IMPORTED_MODULE_4__/* .syncService */ .R.syncIfOnline();
            checkPendingSyncs();
            loadGoals();
        } catch (error) {
            console.error("Sync failed:", error);
        }
    };
    const getTopLevelGoals = ()=>goals.filter((goal)=>!goal.parentId);
    const getChildGoals = (parentId)=>goals.filter((goal)=>goal.parentId === parentId);
    const filteredGoals = activeType === "all" ? getTopLevelGoals() : getTopLevelGoals().filter((goal)=>goal.type === activeType);
    const getProgressColor = (progress)=>{
        if (progress === 0) return "bg-gray-600";
        if (progress < 30) return "bg-red-600";
        if (progress < 70) return "bg-yellow-600";
        return "bg-green-600";
    };
    const getStatusColor = (status)=>{
        switch(status){
            case "not-started":
                return "bg-gray-500";
            case "in-progress":
                return "bg-blue-500";
            case "completed":
                return "bg-green-500";
            default:
                return "bg-gray-500";
        }
    };
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
                                children: "\uD83C\uDFAF Goals"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "text-gray-300 text-sm",
                                children: "Set and track your goals"
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
                                    children: editingGoal ? "✏️ Edit Goal" : "➕ Add New Goal"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                            type: "text",
                                            placeholder: "Goal Title",
                                            value: newGoal.title,
                                            onChange: (e)=>setNewGoal({
                                                    ...newGoal,
                                                    title: e.target.value
                                                }),
                                            className: "w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37]"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
                                            placeholder: "Description (optional)",
                                            value: newGoal.description,
                                            onChange: (e)=>setNewGoal({
                                                    ...newGoal,
                                                    description: e.target.value
                                                }),
                                            rows: 3,
                                            className: "w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37]"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("select", {
                                            value: newGoal.type,
                                            onChange: (e)=>{
                                                const newType = e.target.value;
                                                setNewGoal({
                                                    ...newGoal,
                                                    type: newType,
                                                    periodLabel: calculatePeriodLabel(newType, newGoal.targetDate)
                                                });
                                            },
                                            className: "w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white focus:outline-none focus:border-[#d4af37]",
                                            children: goalTypes.map((type)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("option", {
                                                    value: type.id,
                                                    className: "bg-[#143b28]",
                                                    children: [
                                                        type.emoji,
                                                        " ",
                                                        type.name
                                                    ]
                                                }, type.id))
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                    className: "block text-sm text-gray-300 mb-2",
                                                    children: "Target Date"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                    type: "date",
                                                    value: newGoal.targetDate,
                                                    onChange: (e)=>{
                                                        setNewGoal({
                                                            ...newGoal,
                                                            targetDate: e.target.value,
                                                            periodLabel: calculatePeriodLabel(newGoal.type, e.target.value)
                                                        });
                                                    },
                                                    className: "w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white focus:outline-none focus:border-[#d4af37]"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                                    className: "block text-sm text-gray-300 mb-2",
                                                    children: [
                                                        "Progress: ",
                                                        newGoal.progress,
                                                        "%"
                                                    ]
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                    type: "range",
                                                    min: "0",
                                                    max: "100",
                                                    value: newGoal.progress,
                                                    onChange: (e)=>setNewGoal({
                                                            ...newGoal,
                                                            progress: parseInt(e.target.value)
                                                        }),
                                                    className: "w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                    className: "block text-sm text-gray-300 mb-2",
                                                    children: "Parent Goal (optional)"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                                                    value: selectedParent || "",
                                                    onChange: (e)=>{
                                                        const parentId = e.target.value || null;
                                                        setSelectedParent(parentId);
                                                        setNewGoal({
                                                            ...newGoal,
                                                            parentId
                                                        });
                                                    },
                                                    className: "w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white focus:outline-none focus:border-[#d4af37]",
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                            value: "",
                                                            children: "No parent"
                                                        }),
                                                        goals.filter((goal)=>goal.type === goalTypes.find((t)=>t.id === newGoal.type)?.childType).map((goal)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                                value: goal.id,
                                                                className: "bg-[#143b28]",
                                                                children: goal.title
                                                            }, goal.id))
                                                    ]
                                                })
                                            ]
                                        }),
                                        editingGoal ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex gap-2",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                    onClick: handleUpdateGoal,
                                                    className: "flex-1 bg-[#d4af37] text-black py-3 rounded-lg font-medium hover:bg-[#c9a633] transition",
                                                    children: "Update Goal"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                    onClick: ()=>{
                                                        setEditingGoal(null);
                                                        setNewGoal({
                                                            title: "",
                                                            description: "",
                                                            type: "yearly",
                                                            targetDate: new Date().toISOString().split("T")[0],
                                                            progress: 0,
                                                            parentId: null,
                                                            periodLabel: ""
                                                        });
                                                        setSelectedParent(null);
                                                    },
                                                    className: "px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition",
                                                    children: "Cancel"
                                                })
                                            ]
                                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                            onClick: handleAddGoal,
                                            disabled: !newGoal.title.trim() || !newGoal.targetDate,
                                            className: "w-full bg-[#d4af37] text-black py-3 rounded-lg font-medium hover:bg-[#c9a633] transition disabled:opacity-50",
                                            children: "Save Goal"
                                        })
                                    ]
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "lg:w-2/3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "mb-6 flex flex-wrap gap-2",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        onClick: ()=>setActiveType("all"),
                                        className: `px-4 py-2 rounded-lg ${activeType === "all" ? "bg-[#d4af37] text-black" : "bg-[#143b28] text-white border border-[#1f5a3d]"}`,
                                        children: "All Goals"
                                    }),
                                    goalTypes.map((type)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                            onClick: ()=>setActiveType(type.id),
                                            className: `px-4 py-2 rounded-lg flex items-center gap-2 ${activeType === type.id ? "bg-[#d4af37] text-black" : "bg-[#143b28] text-white border border-[#1f5a3d]"}`,
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    children: type.emoji
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    children: type.name
                                                })
                                            ]
                                        }, type.id))
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "space-y-4",
                                children: loading ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "text-center py-8",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#d4af37]"
                                    })
                                }) : filteredGoals.length === 0 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "bg-[#143b28] border border-[#1f5a3d] rounded-xl p-8 text-center",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: "text-gray-300",
                                        children: "No goals yet"
                                    })
                                }) : filteredGoals.map((goal)=>{
                                    const childGoals = getChildGoals(goal.id);
                                    const isExpanded = expandedGoalId === goal.id;
                                    const goalType = goalTypes.find((t)=>t.id === goal.type);
                                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "bg-[#143b28] border border-[#1f5a3d] rounded-xl p-4",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-start justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                className: "flex items-center gap-3 mb-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                        className: `px-3 py-1 rounded-lg ${goalType?.color} border flex items-center gap-2`,
                                                                        children: [
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                                children: goalType?.emoji
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                                className: "text-sm font-medium",
                                                                                children: goalType?.name
                                                                            })
                                                                        ]
                                                                    }),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                        className: "text-sm text-gray-300",
                                                                        children: goal.periodLabel
                                                                    }),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                        className: `px-2 py-1 text-xs rounded ${getStatusColor(goal.status)}`,
                                                                        children: goal.status.replace("-", " ")
                                                                    })
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                                                className: "text-lg font-semibold text-white mb-1",
                                                                children: goal.title
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                className: "flex items-center gap-4 mb-3",
                                                                children: [
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                        className: "flex-1",
                                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                            className: "h-2 bg-gray-700 rounded-full overflow-hidden",
                                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                                className: `h-full ${getProgressColor(goal.progress)} transition-all duration-300`,
                                                                                style: {
                                                                                    width: `${goal.progress}%`
                                                                                }
                                                                            })
                                                                        })
                                                                    }),
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                        className: "text-sm text-gray-300",
                                                                        children: [
                                                                            goal.progress,
                                                                            "%"
                                                                        ]
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "flex flex-col gap-2 ml-4",
                                                        children: [
                                                            childGoals.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                                onClick: ()=>toggleExpandGoal(goal.id),
                                                                className: "px-3 py-1 bg-gray-600 text-white rounded-lg text-sm",
                                                                children: [
                                                                    isExpanded ? "Hide" : "Show",
                                                                    " Children (",
                                                                    childGoals.length,
                                                                    ")"
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                className: "flex gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                                        onClick: ()=>handleEditGoal(goal),
                                                                        className: "px-3 py-1 bg-blue-600 text-white rounded-lg text-sm flex-1",
                                                                        children: "Edit"
                                                                    }),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                                        onClick: ()=>handleDeleteGoal(goal.id),
                                                                        className: "px-3 py-1 bg-red-600 text-white rounded-lg text-sm flex-1",
                                                                        children: "Delete"
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            isExpanded && childGoals.length > 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: "mt-4 pt-4 border-t border-[#1f5a3d] space-y-3",
                                                children: childGoals.map((child)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "bg-[#0f2e1f] rounded-lg p-3 flex items-center justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                children: [
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h5", {
                                                                        className: "text-white font-medium",
                                                                        children: child.title
                                                                    }),
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                        className: "text-xs text-gray-300",
                                                                        children: [
                                                                            "Progress: ",
                                                                            child.progress,
                                                                            "%"
                                                                        ]
                                                                    })
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                className: "flex gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                                        onClick: ()=>handleEditGoal(child),
                                                                        className: "px-2 py-1 bg-blue-600 text-white rounded text-xs",
                                                                        children: "Edit"
                                                                    }),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                                        onClick: ()=>handleDeleteGoal(child.id),
                                                                        className: "px-2 py-1 bg-red-600 text-white rounded text-xs",
                                                                        children: "Delete"
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    }, child.id))
                                            })
                                        ]
                                    }, goal.id);
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

/***/ 9573:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $$typeof: () => (/* binding */ $$typeof),
/* harmony export */   __esModule: () => (/* binding */ __esModule),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2989);

const proxy = (0,next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__.createProxy)(String.raw`/data/data/com.termux/files/home/fnote/app/goals/page.tsx`)

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
var __webpack_exports__ = __webpack_require__.X(0, [595,806,563,941,705], () => (__webpack_exec__(3333)));
module.exports = __webpack_exports__;

})();