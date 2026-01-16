"use strict";
(() => {
var exports = {};
exports.id = 493;
exports.ids = [493];
exports.modules = {

/***/ 3524:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ 2037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 8105:
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

// NAMESPACE OBJECT: ./app/api/learned/[id]/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  DELETE: () => (DELETE)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.19_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(6536);
// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.19_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(3469);
// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.19_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/next/dist/server/future/route-kind.js
var route_kind = __webpack_require__(8543);
// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.19_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/next/dist/server/web/exports/next-response.js
var next_response = __webpack_require__(7344);
;// CONCATENATED MODULE: ./app/api/learned/[id]/route.ts

const MOCK_USER_ID = "mock-user-id";
async function getAuthenticatedUser() {
    return {
        id: MOCK_USER_ID,
        email: "test@example.com"
    };
}
async function DELETE(request, { params }) {
    try {
        const user = await getAuthenticatedUser();
        if (!user) return next_response/* default */.Z.json({
            error: "Unauthorized"
        }, {
            status: 401
        });
        const { id } = await params;
        if ( true && process.env.POSTGRES_PRISMA_URL) {
            const { prisma } = await __webpack_require__.e(/* import() */ 898).then(__webpack_require__.bind(__webpack_require__, 3898));
            const existing = await prisma.learnedItem.findFirst({
                where: {
                    id,
                    userId: user.id
                }
            });
            if (!existing) return next_response/* default */.Z.json({
                error: "Not found"
            }, {
                status: 404
            });
            await prisma.learnedItem.delete({
                where: {
                    id
                }
            });
            return next_response/* default */.Z.json({
                message: "Deleted successfully"
            });
        }
        return next_response/* default */.Z.json({
            message: "Deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting learned item:", error);
        return next_response/* default */.Z.json({
            error: "Failed to delete learned item"
        }, {
            status: 500
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/next@13.4.19_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Flearned%2F%5Bid%5D%2Froute&name=app%2Fapi%2Flearned%2F%5Bid%5D%2Froute&pagePath=private-next-app-dir%2Fapi%2Flearned%2F%5Bid%5D%2Froute.ts&appDir=%2Fdata%2Fdata%2Fcom.termux%2Ffiles%2Fhome%2Ffnote%2Fapp&appPaths=%2Fapi%2Flearned%2F%5Bid%5D%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

// @ts-ignore this need to be imported from next/dist to be external


// @ts-expect-error - replaced by webpack/turbopack loader

const AppRouteRouteModule = app_route_module.AppRouteRouteModule;
// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/api/learned/[id]/route",
        pathname: "/api/learned/[id]",
        filename: "route",
        bundlePath: "app/api/learned/[id]/route"
    },
    resolvedPagePath: "/data/data/com.termux/files/home/fnote/app/api/learned/[id]/route.ts",
    nextConfigOutput,
    userland: route_namespaceObject
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage , staticGenerationAsyncStorage , serverHooks , headerHooks , staticGenerationBailout  } = routeModule;
const originalPathname = "/api/learned/[id]/route";


//# sourceMappingURL=app-route.js.map

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [595,310,344], () => (__webpack_exec__(8105)));
module.exports = __webpack_exports__;

})();