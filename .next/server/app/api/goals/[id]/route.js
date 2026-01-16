"use strict";
(() => {
var exports = {};
exports.id = 322;
exports.ids = [322];
exports.modules = {

/***/ 3524:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ 2037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 7049:
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

// NAMESPACE OBJECT: ./app/api/goals/[id]/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  DELETE: () => (DELETE),
  GET: () => (GET),
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
;// CONCATENATED MODULE: ./app/api/goals/[id]/route.ts

// Mock user ID for development
const MOCK_USER_ID = "mock-user-id";
async function getAuthenticatedUser() {
    // TODO: Implement real authentication
    return {
        id: MOCK_USER_ID,
        email: "test@example.com"
    };
}
async function GET(request, { params }) {
    try {
        const user = await getAuthenticatedUser();
        if (!user) {
            return next_response/* default */.Z.json({
                error: "Unauthorized"
            }, {
                status: 401
            });
        }
        const { id } = await params;
        // In production, use real Prisma
        if ( true && process.env.POSTGRES_PRISMA_URL) {
            const { prisma } = await __webpack_require__.e(/* import() */ 898).then(__webpack_require__.bind(__webpack_require__, 3898));
            const goal = await prisma.goal.findFirst({
                where: {
                    id,
                    userId: user.id
                },
                include: {
                    children: {
                        select: {
                            id: true,
                            title: true,
                            type: true,
                            progress: true,
                            status: true,
                            periodLabel: true,
                            targetDate: true
                        },
                        orderBy: {
                            targetDate: "asc"
                        }
                    },
                    parent: {
                        select: {
                            id: true,
                            title: true,
                            type: true
                        }
                    }
                }
            });
            if (!goal) {
                return next_response/* default */.Z.json({
                    error: "Goal not found"
                }, {
                    status: 404
                });
            }
            return next_response/* default */.Z.json(goal);
        }
        // Local development: mock response
        const mockGoal = {
            id,
            title: "Sample Goal",
            description: "This is a sample goal description",
            type: "yearly",
            targetDate: new Date("2024-12-31").toISOString(),
            progress: 30,
            status: "in-progress",
            parentId: null,
            periodLabel: "2024",
            userId: user.id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            children: [],
            parent: null
        };
        return next_response/* default */.Z.json(mockGoal);
    } catch (error) {
        console.error("Error fetching goal:", error);
        return next_response/* default */.Z.json({
            error: "Failed to fetch goal"
        }, {
            status: 500
        });
    }
}
async function PUT(request, { params }) {
    try {
        const user = await getAuthenticatedUser();
        if (!user) {
            return next_response/* default */.Z.json({
                error: "Unauthorized"
            }, {
                status: 401
            });
        }
        const { id } = await params;
        const body = await request.json();
        const { title, description, type, targetDate, progress, parentId, periodLabel } = body;
        if (!title || !type || !targetDate) {
            return next_response/* default */.Z.json({
                error: "Title, type, and targetDate are required"
            }, {
                status: 400
            });
        }
        // Determine status based on progress
        const status = progress === 0 ? "not-started" : progress === 100 ? "completed" : "in-progress";
        // In production, use real Prisma
        if ( true && process.env.POSTGRES_PRISMA_URL) {
            const { prisma } = await __webpack_require__.e(/* import() */ 898).then(__webpack_require__.bind(__webpack_require__, 3898));
            // Check if goal exists and belongs to user
            const existingGoal = await prisma.goal.findFirst({
                where: {
                    id,
                    userId: user.id
                }
            });
            if (!existingGoal) {
                return next_response/* default */.Z.json({
                    error: "Goal not found"
                }, {
                    status: 404
                });
            }
            const updatedGoal = await prisma.goal.update({
                where: {
                    id
                },
                data: {
                    title,
                    description,
                    type,
                    targetDate: new Date(targetDate),
                    progress,
                    status,
                    parentId,
                    periodLabel
                }
            });
            return next_response/* default */.Z.json(updatedGoal);
        }
        // Local development: mock response
        const mockGoal = {
            id,
            title,
            description,
            type,
            targetDate: new Date(targetDate).toISOString(),
            progress: progress || 0,
            status,
            parentId,
            periodLabel,
            userId: user.id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        return next_response/* default */.Z.json(mockGoal);
    } catch (error) {
        console.error("Error updating goal:", error);
        return next_response/* default */.Z.json({
            error: "Failed to update goal"
        }, {
            status: 500
        });
    }
}
async function DELETE(request, { params }) {
    try {
        const user = await getAuthenticatedUser();
        if (!user) {
            return next_response/* default */.Z.json({
                error: "Unauthorized"
            }, {
                status: 401
            });
        }
        const { id } = await params;
        // In production, use real Prisma
        if ( true && process.env.POSTGRES_PRISMA_URL) {
            const { prisma } = await __webpack_require__.e(/* import() */ 898).then(__webpack_require__.bind(__webpack_require__, 3898));
            // Check if goal exists and belongs to user
            const existingGoal = await prisma.goal.findFirst({
                where: {
                    id,
                    userId: user.id
                }
            });
            if (!existingGoal) {
                return next_response/* default */.Z.json({
                    error: "Goal not found"
                }, {
                    status: 404
                });
            }
            // Delete goal and all its children (cascade delete in Prisma schema)
            await prisma.goal.delete({
                where: {
                    id
                }
            });
            return next_response/* default */.Z.json({
                message: "Goal deleted successfully"
            });
        }
        // Local development: mock response
        return next_response/* default */.Z.json({
            message: "Goal deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting goal:", error);
        return next_response/* default */.Z.json({
            error: "Failed to delete goal"
        }, {
            status: 500
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/next@13.4.19_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fgoals%2F%5Bid%5D%2Froute&name=app%2Fapi%2Fgoals%2F%5Bid%5D%2Froute&pagePath=private-next-app-dir%2Fapi%2Fgoals%2F%5Bid%5D%2Froute.ts&appDir=%2Fdata%2Fdata%2Fcom.termux%2Ffiles%2Fhome%2Ffnote%2Fapp&appPaths=%2Fapi%2Fgoals%2F%5Bid%5D%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

// @ts-ignore this need to be imported from next/dist to be external


// @ts-expect-error - replaced by webpack/turbopack loader

const AppRouteRouteModule = app_route_module.AppRouteRouteModule;
// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/api/goals/[id]/route",
        pathname: "/api/goals/[id]",
        filename: "route",
        bundlePath: "app/api/goals/[id]/route"
    },
    resolvedPagePath: "/data/data/com.termux/files/home/fnote/app/api/goals/[id]/route.ts",
    nextConfigOutput,
    userland: route_namespaceObject
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage , staticGenerationAsyncStorage , serverHooks , headerHooks , staticGenerationBailout  } = routeModule;
const originalPathname = "/api/goals/[id]/route";


//# sourceMappingURL=app-route.js.map

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [595,310,344], () => (__webpack_exec__(7049)));
module.exports = __webpack_exports__;

})();