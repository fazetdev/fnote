"use strict";
(() => {
var exports = {};
exports.id = 618;
exports.ids = [618,898];
exports.modules = {

/***/ 3524:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ 2037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 1204:
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

// NAMESPACE OBJECT: ./app/api/auth/passkey/register/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  POST: () => (POST)
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
;// CONCATENATED MODULE: ./app/api/auth/passkey/register/route.ts


async function POST(request) {
    try {
        const body = await request.json();
        const { userId, credential, publicKey, deviceType, transports } = body;
        if (!userId || !credential || !publicKey) {
            return next_response/* default */.Z.json({
                error: "Missing required fields"
            }, {
                status: 400
            });
        }
        // Check if user exists
        const user = await prisma.prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if (!user) {
            return next_response/* default */.Z.json({
                error: "User not found"
            }, {
                status: 404
            });
        }
        // Check if credential already exists
        const existingCredential = await prisma.prisma.passkey.findUnique({
            where: {
                credentialId: credential.id
            }
        });
        if (existingCredential) {
            return next_response/* default */.Z.json({
                error: "Credential already registered"
            }, {
                status: 400
            });
        }
        // Create new passkey
        const passkey = await prisma.prisma.passkey.create({
            data: {
                credentialId: credential.id,
                userId: userId,
                publicKey: publicKey,
                deviceType: deviceType || "platform",
                transports: transports || [
                    "internal"
                ],
                counter: 0
            }
        });
        return next_response/* default */.Z.json({
            success: true,
            message: "Passkey registered successfully",
            passkey: {
                id: passkey.id,
                credentialId: passkey.credentialId,
                deviceType: passkey.deviceType
            }
        }, {
            status: 201
        });
    } catch (error) {
        console.error("Passkey registration error:", error);
        return next_response/* default */.Z.json({
            error: "Failed to register passkey"
        }, {
            status: 500
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/next@13.4.19_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fauth%2Fpasskey%2Fregister%2Froute&name=app%2Fapi%2Fauth%2Fpasskey%2Fregister%2Froute&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fpasskey%2Fregister%2Froute.ts&appDir=%2Fdata%2Fdata%2Fcom.termux%2Ffiles%2Fhome%2Ffnote%2Fapp&appPaths=%2Fapi%2Fauth%2Fpasskey%2Fregister%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

// @ts-ignore this need to be imported from next/dist to be external


// @ts-expect-error - replaced by webpack/turbopack loader

const AppRouteRouteModule = app_route_module.AppRouteRouteModule;
// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/api/auth/passkey/register/route",
        pathname: "/api/auth/passkey/register",
        filename: "route",
        bundlePath: "app/api/auth/passkey/register/route"
    },
    resolvedPagePath: "/data/data/com.termux/files/home/fnote/app/api/auth/passkey/register/route.ts",
    nextConfigOutput,
    userland: route_namespaceObject
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage , staticGenerationAsyncStorage , serverHooks , headerHooks , staticGenerationBailout  } = routeModule;
const originalPathname = "/api/auth/passkey/register/route";


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
var __webpack_require__ = require("../../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [595,310,344], () => (__webpack_exec__(1204)));
module.exports = __webpack_exports__;

})();