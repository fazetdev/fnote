(() => {
var exports = {};
exports.id = 136;
exports.ids = [136];
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

/***/ 9144:
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
        'planner',
        {
        children: ['__PAGE__', {}, {
          page: [() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 4757)), "/data/data/com.termux/files/home/fnote/app/planner/page.tsx"],
          
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
const pages = ["/data/data/com.termux/files/home/fnote/app/planner/page.tsx"];

// @ts-expect-error - replaced by webpack/turbopack loader

const __next_app_require__ = __webpack_require__
const __next_app_load_chunk__ = () => Promise.resolve()
const originalPathname = "/planner/page";
const __next_app__ = {
    require: __next_app_require__,
    loadChunk: __next_app_load_chunk__
};

// Create and export the route module that will be consumed.
const routeModule = new AppPageRouteModule({
    definition: {
        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_PAGE,
        page: "/planner/page",
        pathname: "/planner",
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

/***/ 1458:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 8790))

/***/ }),

/***/ 8790:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PlannerPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* __next_internal_client_entry_do_not_use__ default auto */ 

function PlannerPage() {
    const [plans, setPlans] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [todayPlan, setTodayPlan] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [newTask, setNewTask] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        text: "",
        time: "09:00",
        priority: "medium"
    });
    const [mounted, setMounted] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [todayDate, setTodayDate] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [formattedDate, setFormattedDate] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setMounted(true);
        // Set dates on client only
        const now = new Date();
        const todayStr = now.toISOString().split("T")[0];
        const formatted = now.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
        });
        setTodayDate(todayStr);
        setFormattedDate(formatted);
        const savedPlans = localStorage.getItem("fnote_plans");
        if (savedPlans) {
            try {
                const parsedPlans = JSON.parse(savedPlans);
                setPlans(parsedPlans);
                const found = parsedPlans.find((p)=>p.date === todayStr);
                if (found) {
                    setTodayPlan(found);
                } else {
                    setTodayPlan({
                        date: todayStr,
                        focus: "",
                        tasks: []
                    });
                }
            } catch (error) {
                console.error("Error parsing saved plans:", error);
                setTodayPlan({
                    date: todayStr,
                    focus: "",
                    tasks: []
                });
            }
        } else {
            setTodayPlan({
                date: todayStr,
                focus: "",
                tasks: []
            });
        }
    }, []);
    // Save today plan
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!mounted || !todayPlan) return;
        const otherPlans = plans.filter((p)=>p.date !== todayPlan.date);
        const updatedPlans = [
            ...otherPlans,
            todayPlan
        ];
        setPlans(updatedPlans);
        localStorage.setItem("fnote_plans", JSON.stringify(updatedPlans));
    }, [
        todayPlan,
        plans,
        mounted
    ]);
    const handleAddTask = ()=>{
        if (!newTask.text.trim() || !todayPlan) return;
        const task = {
            id: Date.now().toString(),
            text: newTask.text,
            completed: false,
            time: newTask.time,
            priority: newTask.priority,
            createdAt: new Date()
        };
        setTodayPlan({
            ...todayPlan,
            tasks: [
                ...todayPlan.tasks,
                task
            ]
        });
        setNewTask({
            text: "",
            time: "09:00",
            priority: "medium"
        });
    };
    const toggleTask = (id)=>{
        if (!todayPlan) return;
        setTodayPlan({
            ...todayPlan,
            tasks: todayPlan.tasks.map((t)=>t.id === id ? {
                    ...t,
                    completed: !t.completed
                } : t)
        });
    };
    const deleteTask = (id)=>{
        if (!todayPlan) return;
        setTodayPlan({
            ...todayPlan,
            tasks: todayPlan.tasks.filter((t)=>t.id !== id)
        });
    };
    const getPriorityColor = (p)=>{
        switch(p){
            case "high":
                return "bg-red-500/20 text-red-400 border-red-500/30";
            case "medium":
                return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
            case "low":
                return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
        }
    };
    const handleBackToDashboard = ()=>{
        // Use direct navigation which we know works
        window.location.href = "/dashboard";
    };
    const handleAddTaskKeyPress = (e)=>{
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleAddTask();
        }
    };
    if (!mounted || !todayPlan) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "min-h-screen bg-[#0f2e1f] flex items-center justify-center",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "text-white",
                children: "Loading..."
            })
        });
    }
    const completedTasks = todayPlan.tasks.filter((t)=>t.completed).length;
    const totalTasks = todayPlan.tasks.length;
    const progress = totalTasks > 0 ? Math.round(completedTasks / totalTasks * 100) : 0;
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
                                children: "\uD83D\uDCC5 Daily Planner"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "text-gray-300 text-sm",
                                children: formattedDate
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        onClick: handleBackToDashboard,
                        className: "px-4 py-2 bg-[#143b28] hover:bg-[#1f5a3d] text-white rounded-lg border border-[#1f5a3d] transition",
                        children: "← Back to Dashboard"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "bg-[#143b28] border border-[#1f5a3d] rounded-xl p-4 mb-6",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center justify-between mb-2",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: "font-medium text-gray-300",
                                children: "Today's Progress"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "text-[#d4af37] font-bold text-lg",
                                children: [
                                    progress,
                                    "%"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "w-full bg-[#0f2e1f] h-2.5 rounded-full overflow-hidden",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: `h-2.5 ${progress < 30 ? "bg-red-500" : progress < 70 ? "bg-yellow-500" : "bg-emerald-500"}`,
                            style: {
                                width: `${progress}%`
                            }
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        className: "text-sm text-gray-400 mt-2",
                        children: [
                            completedTasks,
                            " of ",
                            totalTasks,
                            " tasks completed"
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex flex-col lg:flex-row gap-6",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "lg:w-1/3 space-y-6",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "bg-[#143b28] border border-[#1f5a3d] rounded-xl p-6",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                        className: "text-xl font-semibold mb-4 text-[#d4af37]",
                                        children: "\uD83C\uDFAF Today's Focus"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
                                        rows: 4,
                                        className: "w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37]",
                                        placeholder: "What is your main goal for today?",
                                        value: todayPlan.focus,
                                        onChange: (e)=>setTodayPlan({
                                                ...todayPlan,
                                                focus: e.target.value
                                            })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: "text-sm text-gray-400 mt-2",
                                        children: "Write your most important goal for the day"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "bg-[#143b28] border border-[#1f5a3d] rounded-xl p-6",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                        className: "text-xl font-semibold mb-4 text-[#d4af37]",
                                        children: "➕ Add Task"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                type: "text",
                                                placeholder: "Task description",
                                                className: "w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37]",
                                                value: newTask.text,
                                                onChange: (e)=>setNewTask({
                                                        ...newTask,
                                                        text: e.target.value
                                                    }),
                                                onKeyDown: handleAddTaskKeyPress
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "grid grid-cols-2 gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                                className: "block text-sm text-gray-300 mb-2",
                                                                children: "Time"
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                                type: "time",
                                                                className: "w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white focus:outline-none focus:border-[#d4af37]",
                                                                value: newTask.time,
                                                                onChange: (e)=>setNewTask({
                                                                        ...newTask,
                                                                        time: e.target.value
                                                                    })
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                                className: "block text-sm text-gray-300 mb-2",
                                                                children: "Priority"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                                                                className: "w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white focus:outline-none focus:border-[#d4af37]",
                                                                value: newTask.priority,
                                                                onChange: (e)=>setNewTask({
                                                                        ...newTask,
                                                                        priority: e.target.value
                                                                    }),
                                                                children: [
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                                        value: "low",
                                                                        children: "Low"
                                                                    }),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                                        value: "medium",
                                                                        children: "Medium"
                                                                    }),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                                        value: "high",
                                                                        children: "High"
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                className: "w-full bg-[#d4af37] text-black py-3 rounded-lg font-medium hover:bg-[#c9a633] transition",
                                                onClick: handleAddTask,
                                                children: "Add Task"
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "lg:w-2/3",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "bg-[#143b28] border border-[#1f5a3d] rounded-xl p-6",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center justify-between mb-6",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                            className: "text-xl font-semibold text-[#d4af37]",
                                            children: "\uD83D\uDCCB Today's Tasks"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "text-sm text-gray-400",
                                            children: [
                                                todayPlan.tasks.length,
                                                " task",
                                                todayPlan.tasks.length !== 1 ? "s" : ""
                                            ]
                                        })
                                    ]
                                }),
                                todayPlan.tasks.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "text-center py-12",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "text-gray-300 mb-2",
                                            children: "No tasks for today"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "text-sm text-gray-400",
                                            children: "Add your first task using the form on the left"
                                        })
                                    ]
                                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "space-y-3",
                                    children: todayPlan.tasks.sort((a, b)=>a.time.localeCompare(b.time)).map((task)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: `flex items-start p-4 rounded-lg border ${task.completed ? "bg-[#0f2e1f] border-[#1f5a3d]" : "bg-[#0f2e1f] border-[#1f5a3d] hover:border-[#d4af37]"} transition-colors`,
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                    onClick: ()=>toggleTask(task.id),
                                                    className: `flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center mr-4 mt-1 ${task.completed ? "bg-emerald-500 border-emerald-500" : "border-gray-500 hover:border-gray-400"}`,
                                                    children: task.completed && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
                                                        className: "w-4 h-4 text-white",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24",
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: "3",
                                                            d: "M5 13l4 4L19 7"
                                                        })
                                                    })
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: "flex-1",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "flex items-start justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                children: [
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                                        className: `font-medium ${task.completed ? "text-gray-500 line-through" : "text-white"}`,
                                                                        children: task.text
                                                                    }),
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                        className: "flex items-center gap-3 mt-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                                className: "text-sm text-gray-400",
                                                                                children: [
                                                                                    "⏰ ",
                                                                                    task.time
                                                                                ]
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                                className: `text-xs px-2 py-1 rounded-full border ${getPriorityColor(task.priority)}`,
                                                                                children: task.priority
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                                className: "text-xs text-gray-500",
                                                                                children: new Date(task.createdAt).toLocaleTimeString([], {
                                                                                    hour: "2-digit",
                                                                                    minute: "2-digit"
                                                                                })
                                                                            })
                                                                        ]
                                                                    })
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                                onClick: ()=>deleteTask(task.id),
                                                                className: "text-gray-500 hover:text-red-400 p-1 ml-2",
                                                                title: "Delete task",
                                                                children: "\uD83D\uDDD1️"
                                                            })
                                                        ]
                                                    })
                                                })
                                            ]
                                        }, task.id))
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "mt-8 pt-6 border-t border-[#1f5a3d]",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                            className: "text-sm font-medium text-[#d4af37] mb-2",
                                            children: "\uD83D\uDCA1 Tips"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                                            className: "text-sm text-gray-400 space-y-1",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                    children: "• Click the circle to mark tasks complete"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                    children: "• Set priorities to focus on important tasks"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                    children: "• Plan your day around your main focus"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                    children: "• Delete tasks you won't complete"
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 4757:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $$typeof: () => (/* binding */ $$typeof),
/* harmony export */   __esModule: () => (/* binding */ __esModule),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2989);

const proxy = (0,next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__.createProxy)(String.raw`/data/data/com.termux/files/home/fnote/app/planner/page.tsx`)

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
var __webpack_exports__ = __webpack_require__.X(0, [595,806,563,941], () => (__webpack_exec__(9144)));
module.exports = __webpack_exports__;

})();