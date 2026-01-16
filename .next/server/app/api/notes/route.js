"use strict";
(() => {
var exports = {};
exports.id = 175;
exports.ids = [175,898];
exports.modules = {

/***/ 3524:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ 2037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 7257:
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

// NAMESPACE OBJECT: ./app/api/notes/route.ts
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
;// CONCATENATED MODULE: ./app/api/notes/route.ts


// Hardcoded initial user for immediate saving
const INITIAL_USER_ID = "init-user-id";
async function getAuthenticatedUser() {
    return {
        id: INITIAL_USER_ID,
        email: "init@example.com"
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
        const category = searchParams.get("category");
        const where = {
            userId: user.id
        };
        if (category) where.category = category;
        const notes = await prisma.prisma.note.findMany({
            where,
            orderBy: {
                createdAt: "desc"
            }
        });
        return next_response/* default */.Z.json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        return next_response/* default */.Z.json({
            error: "Failed to fetch notes"
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
        const { title, content, category = "general", tags = [] } = body;
        if (!title || !content) {
            return next_response/* default */.Z.json({
                error: "Title and content are required"
            }, {
                status: 400
            });
        }
        const note = await prisma.prisma.note.create({
            data: {
                title,
                content,
                category,
                tags,
                userId: user.id
            }
        });
        return next_response/* default */.Z.json(note, {
            status: 201
        });
    } catch (error) {
        console.error("Error creating note:", error);
        return next_response/* default */.Z.json({
            error: "Failed to create note"
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
            error: "Note ID required"
        }, {
            status: 400
        });
        const body = await request.json();
        const { title, content, category, tags } = body;
        const existingNote = await prisma.prisma.note.findFirst({
            where: {
                id,
                userId: user.id
            }
        });
        if (!existingNote) return next_response/* default */.Z.json({
            error: "Note not found"
        }, {
            status: 404
        });
        const updatedNote = await prisma.prisma.note.update({
            where: {
                id
            },
            data: {
                title: title || existingNote.title,
                content: content || existingNote.content,
                category: category || existingNote.category,
                tags: tags || existingNote.tags
            }
        });
        return next_response/* default */.Z.json(updatedNote);
    } catch (error) {
        console.error("Error updating note:", error);
        return next_response/* default */.Z.json({
            error: "Failed to update note"
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
            error: "Note ID required"
        }, {
            status: 400
        });
        const existingNote = await prisma.prisma.note.findFirst({
            where: {
                id,
                userId: user.id
            }
        });
        if (!existingNote) return next_response/* default */.Z.json({
            error: "Note not found"
        }, {
            status: 404
        });
        await prisma.prisma.note.delete({
            where: {
                id
            }
        });
        return next_response/* default */.Z.json({
            message: "Note deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting note:", error);
        return next_response/* default */.Z.json({
            error: "Failed to delete note"
        }, {
            status: 500
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/next@13.4.19_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fnotes%2Froute&name=app%2Fapi%2Fnotes%2Froute&pagePath=private-next-app-dir%2Fapi%2Fnotes%2Froute.ts&appDir=%2Fdata%2Fdata%2Fcom.termux%2Ffiles%2Fhome%2Ffnote%2Fapp&appPaths=%2Fapi%2Fnotes%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

// @ts-ignore this need to be imported from next/dist to be external


// @ts-expect-error - replaced by webpack/turbopack loader

const AppRouteRouteModule = app_route_module.AppRouteRouteModule;
// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/api/notes/route",
        pathname: "/api/notes",
        filename: "route",
        bundlePath: "app/api/notes/route"
    },
    resolvedPagePath: "/data/data/com.termux/files/home/fnote/app/api/notes/route.ts",
    nextConfigOutput,
    userland: route_namespaceObject
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage , staticGenerationAsyncStorage , serverHooks , headerHooks , staticGenerationBailout  } = routeModule;
const originalPathname = "/api/notes/route";


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
var __webpack_exports__ = __webpack_require__.X(0, [595,310,344], () => (__webpack_exec__(7257)));
module.exports = __webpack_exports__;

})();