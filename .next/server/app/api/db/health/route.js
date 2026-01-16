"use strict";
(() => {
var exports = {};
exports.id = 749;
exports.ids = [749];
exports.modules = {

/***/ 3524:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ 2037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 7494:
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

// NAMESPACE OBJECT: ./app/api/db/health/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  GET: () => (GET)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.19_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(6536);
// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.19_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(3469);
// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.19_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/next/dist/server/future/route-kind.js
var route_kind = __webpack_require__(8543);
// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.19_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/next/dist/server/web/exports/next-response.js
var next_response = __webpack_require__(7344);
;// CONCATENATED MODULE: ./app/api/db/health/route.ts

// For production: Use real Prisma
// For local: Use mock
async function getProductionHealth() {
    try {
        const { prisma } = await __webpack_require__.e(/* import() */ 898).then(__webpack_require__.bind(__webpack_require__, 3898));
        // Test database connection
        await prisma.$queryRaw`SELECT 1`;
        // Get some basic stats
        const [notesCount, goalsCount, thoughtsCount] = await Promise.all([
            prisma.note.count(),
            prisma.goal.count(),
            prisma.thought.count()
        ]);
        return {
            status: "healthy",
            database: "connected",
            stats: {
                notes: notesCount,
                goals: goalsCount,
                thoughts: thoughtsCount
            },
            timestamp: new Date().toISOString(),
            environment: "production"
        };
    } catch (error) {
        console.error("Database health check failed:", error);
        return {
            status: "unhealthy",
            database: "disconnected",
            error: error instanceof Error ? error.message : "Unknown error",
            timestamp: new Date().toISOString(),
            environment: "production"
        };
    }
}
function getLocalHealth() {
    return {
        status: "healthy",
        database: "mock",
        stats: {
            notes: 0,
            goals: 0,
            thoughts: 0
        },
        timestamp: new Date().toISOString(),
        environment: "development"
    };
}
async function GET() {
    // Check if we're in production (has DATABASE_URL)
    const isProduction = process.env.DATABASE_URL && "production" === "production";
    const healthData = isProduction ? await getProductionHealth() : getLocalHealth();
    return next_response/* default */.Z.json(healthData);
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/next@13.4.19_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fdb%2Fhealth%2Froute&name=app%2Fapi%2Fdb%2Fhealth%2Froute&pagePath=private-next-app-dir%2Fapi%2Fdb%2Fhealth%2Froute.ts&appDir=%2Fdata%2Fdata%2Fcom.termux%2Ffiles%2Fhome%2Ffnote%2Fapp&appPaths=%2Fapi%2Fdb%2Fhealth%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

// @ts-ignore this need to be imported from next/dist to be external


// @ts-expect-error - replaced by webpack/turbopack loader

const AppRouteRouteModule = app_route_module.AppRouteRouteModule;
// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/api/db/health/route",
        pathname: "/api/db/health",
        filename: "route",
        bundlePath: "app/api/db/health/route"
    },
    resolvedPagePath: "/data/data/com.termux/files/home/fnote/app/api/db/health/route.ts",
    nextConfigOutput,
    userland: route_namespaceObject
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage , staticGenerationAsyncStorage , serverHooks , headerHooks , staticGenerationBailout  } = routeModule;
const originalPathname = "/api/db/health/route";


//# sourceMappingURL=app-route.js.map

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [595,310,344], () => (__webpack_exec__(7494)));
module.exports = __webpack_exports__;

})();