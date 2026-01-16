"use strict";
(() => {
var exports = {};
exports.id = 915;
exports.ids = [915,898];
exports.modules = {

/***/ 3524:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ 2037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 2489:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  headerHooks: () => (/* binding */ headerHooks),
  originalPathname: () => (/* binding */ originalPathname),
  requestAsyncStorage: () => (/* binding */ requestAsyncStorage),
  routeModule: () => (/* binding */ routeModule),
  serverHooks: () => (/* binding */ serverHooks),
  staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),
  staticGenerationBailout: () => (/* binding */ staticGenerationBailout)
});

// NAMESPACE OBJECT: ./app/api/planner/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  DELETE: () => (DELETE),
  GET: () => (GET),
  POST: () => (POST),
  PUT: () => (PUT)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.19_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(6536);
// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.19_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(3469);
// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.19_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/next/dist/server/future/route-kind.js
var route_kind = __webpack_require__(8543);
// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.19_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/next/dist/server/web/exports/next-response.js
var next_response = __webpack_require__(7344);
// EXTERNAL MODULE: ./lib/prisma.ts
var prisma = __webpack_require__(3898);
;// CONCATENATED MODULE: ./app/api/planner/route.ts


async function getAuthenticatedUser(request) {
    try {
        const userData = request.headers.get("x-user-data");
        if (!userData) return null;
        const parsed = JSON.parse(userData);
        if (!parsed?.id) return null;
        return parsed;
    } catch  {
        return null;
    }
}
async function requireUser(userId) {
    const user = await prisma.prisma.user.findUnique({
        where: {
            id: userId
        }
    });
    return user;
}
async function GET(request) {
    try {
        const user = await getAuthenticatedUser(request);
        if (!user) return next_response/* default */.Z.json({
            error: "Unauthorized"
        }, {
            status: 401
        });
        const { searchParams } = new URL(request.url);
        const date = searchParams.get("date") || new Date().toISOString().split("T")[0];
        if (true) {
            const dbUser = await requireUser(user.id);
            if (!dbUser) return next_response/* default */.Z.json({
                error: "Invalid user"
            }, {
                status: 401
            });
            const plan = await prisma.prisma.dailyPlan.findFirst({
                where: {
                    userId: user.id,
                    date: new Date(date)
                },
                include: {
                    tasks: {
                        orderBy: {
                            time: "asc"
                        }
                    }
                }
            });
            return next_response/* default */.Z.json(plan || {
                date,
                focus: "",
                tasks: []
            });
        }
        return next_response/* default */.Z.json({
            date,
            focus: "",
            tasks: []
        });
    } catch (error) {
        console.error("Error fetching planner:", error);
        return next_response/* default */.Z.json({
            error: "Failed to fetch planner"
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const user = await getAuthenticatedUser(request);
        if (!user) return next_response/* default */.Z.json({
            error: "Unauthorized"
        }, {
            status: 401
        });
        const body = await request.json();
        const { date, focus, tasks } = body;
        if (!date) return next_response/* default */.Z.json({
            error: "Date is required"
        }, {
            status: 400
        });
        if (true) {
            const dbUser = await requireUser(user.id);
            if (!dbUser) return next_response/* default */.Z.json({
                error: "Invalid user"
            }, {
                status: 401
            });
            const existingPlan = await prisma.prisma.dailyPlan.findFirst({
                where: {
                    userId: user.id,
                    date: new Date(date)
                }
            });
            let plan;
            if (existingPlan) {
                plan = await prisma.prisma.dailyPlan.update({
                    where: {
                        id: existingPlan.id
                    },
                    data: {
                        focus,
                        tasks: {
                            deleteMany: {},
                            create: tasks || []
                        }
                    },
                    include: {
                        tasks: true
                    }
                });
            } else {
                plan = await prisma.prisma.dailyPlan.create({
                    data: {
                        date: new Date(date),
                        focus: focus || "",
                        userId: user.id,
                        tasks: {
                            create: tasks || []
                        }
                    },
                    include: {
                        tasks: true
                    }
                });
            }
            return next_response/* default */.Z.json(plan, {
                status: 201
            });
        }
        return next_response/* default */.Z.json({
            id: Date.now().toString(),
            date,
            focus: focus || "",
            userId: user.id,
            tasks: tasks || [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }, {
            status: 201
        });
    } catch (error) {
        console.error("Error saving planner:", error);
        return next_response/* default */.Z.json({
            error: "Failed to save planner"
        }, {
            status: 500
        });
    }
}
async function PUT(request) {
    try {
        const user = await getAuthenticatedUser(request);
        if (!user) return next_response/* default */.Z.json({
            error: "Unauthorized"
        }, {
            status: 401
        });
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) return next_response/* default */.Z.json({
            error: "Plan ID is required"
        }, {
            status: 400
        });
        const body = await request.json();
        const { focus, tasks } = body;
        if (true) {
            const dbUser = await requireUser(user.id);
            if (!dbUser) return next_response/* default */.Z.json({
                error: "Invalid user"
            }, {
                status: 401
            });
            const existingPlan = await prisma.prisma.dailyPlan.findFirst({
                where: {
                    id,
                    userId: user.id
                }
            });
            if (!existingPlan) return next_response/* default */.Z.json({
                error: "Plan not found"
            }, {
                status: 404
            });
            const plan = await prisma.prisma.dailyPlan.update({
                where: {
                    id
                },
                data: {
                    focus: focus ?? existingPlan.focus,
                    ...tasks && {
                        tasks: {
                            deleteMany: {},
                            create: tasks
                        }
                    }
                },
                include: {
                    tasks: true
                }
            });
            return next_response/* default */.Z.json(plan);
        }
        return next_response/* default */.Z.json({
            message: "Updated (dev)"
        });
    } catch (error) {
        console.error("Error updating planner:", error);
        return next_response/* default */.Z.json({
            error: "Failed to update planner"
        }, {
            status: 500
        });
    }
}
async function DELETE(request) {
    try {
        const user = await getAuthenticatedUser(request);
        if (!user) return next_response/* default */.Z.json({
            error: "Unauthorized"
        }, {
            status: 401
        });
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) return next_response/* default */.Z.json({
            error: "Plan ID is required"
        }, {
            status: 400
        });
        if (true) {
            const dbUser = await requireUser(user.id);
            if (!dbUser) return next_response/* default */.Z.json({
                error: "Invalid user"
            }, {
                status: 401
            });
            const existingPlan = await prisma.prisma.dailyPlan.findFirst({
                where: {
                    id,
                    userId: user.id
                }
            });
            if (!existingPlan) return next_response/* default */.Z.json({
                error: "Plan not found"
            }, {
                status: 404
            });
            await prisma.prisma.dailyPlan.delete({
                where: {
                    id
                }
            });
            return next_response/* default */.Z.json({
                message: "Plan deleted successfully"
            });
        }
        return next_response/* default */.Z.json({
            message: "Deleted (dev)"
        });
    } catch (error) {
        console.error("Error deleting planner:", error);
        return next_response/* default */.Z.json({
            error: "Failed to delete planner"
        }, {
            status: 500
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/next@13.4.19_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fplanner%2Froute&name=app%2Fapi%2Fplanner%2Froute&pagePath=private-next-app-dir%2Fapi%2Fplanner%2Froute.ts&appDir=%2Fdata%2Fdata%2Fcom.termux%2Ffiles%2Fhome%2Ffnote%2Fapp&appPaths=%2Fapi%2Fplanner%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

// @ts-ignore this need to be imported from next/dist to be external


// @ts-expect-error - replaced by webpack/turbopack loader

const AppRouteRouteModule = app_route_module.AppRouteRouteModule;
// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/api/planner/route",
        pathname: "/api/planner",
        filename: "route",
        bundlePath: "app/api/planner/route"
    },
    resolvedPagePath: "/data/data/com.termux/files/home/fnote/app/api/planner/route.ts",
    nextConfigOutput,
    userland: route_namespaceObject
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage , staticGenerationAsyncStorage , serverHooks , headerHooks , staticGenerationBailout  } = routeModule;
const originalPathname = "/api/planner/route";


//# sourceMappingURL=app-route.js.map

/***/ }),

/***/ 3898:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   prisma: () => (/* binding */ prisma)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3524);
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);

const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();
if (false) {}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [595,310,344], () => (__webpack_exec__(2489)));
module.exports = __webpack_exports__;

})();