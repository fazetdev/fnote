"use strict";
(() => {
var exports = {};
exports.id = 677;
exports.ids = [677,898];
exports.modules = {

/***/ 3524:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ 2037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 6773:
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

// NAMESPACE OBJECT: ./app/api/goals/route.ts
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
;// CONCATENATED MODULE: ./app/api/goals/route.ts


const MOCK_USER_ID = "mock-user-id";
async function getAuthenticatedUser() {
    return {
        id: MOCK_USER_ID,
        email: "test@example.com"
    };
}
async function GET(request) {
    try {
        const user = await getAuthenticatedUser();
        if (!user) return next_response/* default */.Z.json({
            error: "Unauthorized"
        }, {
            status: 401
        });
        const { searchParams } = new URL(request.url);
        const type = searchParams.get("type");
        const parentId = searchParams.get("parentId");
        const where = {
            userId: user.id
        };
        if (type) where.type = type;
        if (parentId) where.parentId = parentId;
        if (!parentId) where.parentId = null;
        const goals = await prisma.prisma.goal.findMany({
            where,
            orderBy: {
                createdAt: "desc"
            },
            include: {
                children: true
            }
        });
        return next_response/* default */.Z.json(goals);
    } catch (error) {
        console.error("Error fetching goals:", error);
        return next_response/* default */.Z.json({
            error: "Failed to fetch goals"
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const user = await getAuthenticatedUser();
        if (!user) return next_response/* default */.Z.json({
            error: "Unauthorized"
        }, {
            status: 401
        });
        const body = await request.json();
        const { title, description, type, targetDate, progress = 0, parentId, periodLabel } = body;
        if (!title || !type || !targetDate) {
            return next_response/* default */.Z.json({
                error: "Title, type, and targetDate are required"
            }, {
                status: 400
            });
        }
        const status = progress === 0 ? "not-started" : progress === 100 ? "completed" : "in-progress";
        const goal = await prisma.prisma.goal.create({
            data: {
                title,
                description,
                type,
                targetDate: new Date(targetDate),
                progress,
                status,
                parentId,
                periodLabel,
                userId: user.id
            }
        });
        return next_response/* default */.Z.json(goal, {
            status: 201
        });
    } catch (error) {
        console.error("Error creating goal:", error);
        return next_response/* default */.Z.json({
            error: "Failed to create goal"
        }, {
            status: 500
        });
    }
}
async function PUT(request) {
    try {
        const user = await getAuthenticatedUser();
        if (!user) return next_response/* default */.Z.json({
            error: "Unauthorized"
        }, {
            status: 401
        });
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) return next_response/* default */.Z.json({
            error: "Goal ID is required"
        }, {
            status: 400
        });
        const body = await request.json();
        const { title, description, type, targetDate, progress, parentId, periodLabel } = body;
        const existingGoal = await prisma.prisma.goal.findFirst({
            where: {
                id,
                userId: user.id
            }
        });
        if (!existingGoal) return next_response/* default */.Z.json({
            error: "Goal not found"
        }, {
            status: 404
        });
        const status = progress === 0 ? "not-started" : progress === 100 ? "completed" : "in-progress";
        const goal = await prisma.prisma.goal.update({
            where: {
                id
            },
            data: {
                title: title || existingGoal.title,
                description: description || existingGoal.description,
                type: type || existingGoal.type,
                targetDate: targetDate ? new Date(targetDate) : existingGoal.targetDate,
                progress: progress !== undefined ? progress : existingGoal.progress,
                status,
                parentId: parentId !== undefined ? parentId : existingGoal.parentId,
                periodLabel: periodLabel || existingGoal.periodLabel
            }
        });
        return next_response/* default */.Z.json(goal);
    } catch (error) {
        console.error("Error updating goal:", error);
        return next_response/* default */.Z.json({
            error: "Failed to update goal"
        }, {
            status: 500
        });
    }
}
async function DELETE(request) {
    try {
        const user = await getAuthenticatedUser();
        if (!user) return next_response/* default */.Z.json({
            error: "Unauthorized"
        }, {
            status: 401
        });
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) return next_response/* default */.Z.json({
            error: "Goal ID is required"
        }, {
            status: 400
        });
        const existingGoal = await prisma.prisma.goal.findFirst({
            where: {
                id,
                userId: user.id
            }
        });
        if (!existingGoal) return next_response/* default */.Z.json({
            error: "Goal not found"
        }, {
            status: 404
        });
        await prisma.prisma.goal.delete({
            where: {
                id
            }
        });
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

;// CONCATENATED MODULE: ./node_modules/.pnpm/next@13.4.19_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fgoals%2Froute&name=app%2Fapi%2Fgoals%2Froute&pagePath=private-next-app-dir%2Fapi%2Fgoals%2Froute.ts&appDir=%2Fdata%2Fdata%2Fcom.termux%2Ffiles%2Fhome%2Ffnote%2Fapp&appPaths=%2Fapi%2Fgoals%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

// @ts-ignore this need to be imported from next/dist to be external


// @ts-expect-error - replaced by webpack/turbopack loader

const AppRouteRouteModule = app_route_module.AppRouteRouteModule;
// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/api/goals/route",
        pathname: "/api/goals",
        filename: "route",
        bundlePath: "app/api/goals/route"
    },
    resolvedPagePath: "/data/data/com.termux/files/home/fnote/app/api/goals/route.ts",
    nextConfigOutput,
    userland: route_namespaceObject
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage , staticGenerationAsyncStorage , serverHooks , headerHooks , staticGenerationBailout  } = routeModule;
const originalPathname = "/api/goals/route";


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
var __webpack_exports__ = __webpack_require__.X(0, [595,310,344], () => (__webpack_exec__(6773)));
module.exports = __webpack_exports__;

})();