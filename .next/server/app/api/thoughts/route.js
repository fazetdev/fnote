"use strict";
(() => {
var exports = {};
exports.id = 411;
exports.ids = [411];
exports.modules = {

/***/ 3524:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ 2037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 8599:
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

// NAMESPACE OBJECT: ./app/api/thoughts/route.ts
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
;// CONCATENATED MODULE: ./app/api/thoughts/route.ts

async function getAuthenticatedUser(request) {
    try {
        const userData = request.headers.get("x-user-data");
        if (userData) return JSON.parse(userData);
        return null;
    } catch  {
        return null;
    }
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
        const date = searchParams.get("date");
        const type = searchParams.get("type");
        if ( true && process.env.POSTGRES_PRISMA_URL) {
            const { prisma } = await __webpack_require__.e(/* import() */ 898).then(__webpack_require__.bind(__webpack_require__, 3898));
            const where = {
                userId: user.id
            };
            if (date) where.date = new Date(date);
            if (type) where.type = type;
            const thoughts = await prisma.thought.findMany({
                where,
                orderBy: {
                    createdAt: "desc"
                }
            });
            return next_response/* default */.Z.json(thoughts);
        }
        // Mock data
        const mockThoughts = [
            {
                id: "1",
                content: "Offline-first apps provide better user experience",
                type: "insight",
                mood: "\uD83E\uDD14",
                tags: [
                    "development",
                    "ux"
                ],
                date: new Date().toISOString(),
                userId: user.id,
                createdAt: new Date().toISOString()
            },
            {
                id: "2",
                content: "Progress tracking should be visual and intuitive",
                type: "observation",
                mood: "\uD83C\uDFAF",
                tags: [
                    "design",
                    "productivity"
                ],
                date: new Date().toISOString(),
                userId: user.id,
                createdAt: new Date().toISOString()
            }
        ];
        return next_response/* default */.Z.json(mockThoughts);
    } catch (error) {
        console.error("Error fetching thoughts:", error);
        return next_response/* default */.Z.json({
            error: "Failed to fetch thoughts"
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
        const { content, type = "thought", mood = "\uD83D\uDE0A", tags = [] } = body;
        if (!content) return next_response/* default */.Z.json({
            error: "Content is required"
        }, {
            status: 400
        });
        if ( true && process.env.POSTGRES_PRISMA_URL) {
            const { prisma } = await __webpack_require__.e(/* import() */ 898).then(__webpack_require__.bind(__webpack_require__, 3898));
            const thought = await prisma.thought.create({
                data: {
                    content,
                    type,
                    mood,
                    tags,
                    date: new Date(),
                    userId: user.id
                }
            });
            return next_response/* default */.Z.json(thought, {
                status: 201
            });
        }
        const mockThought = {
            id: Date.now().toString(),
            content,
            type,
            mood,
            tags,
            date: new Date().toISOString(),
            userId: user.id,
            createdAt: new Date().toISOString()
        };
        return next_response/* default */.Z.json(mockThought, {
            status: 201
        });
    } catch (error) {
        console.error("Error creating thought:", error);
        return next_response/* default */.Z.json({
            error: "Failed to create thought"
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
            error: "Thought ID is required"
        }, {
            status: 400
        });
        const body = await request.json();
        const { content, type, mood, tags } = body;
        if ( true && process.env.POSTGRES_PRISMA_URL) {
            const { prisma } = await __webpack_require__.e(/* import() */ 898).then(__webpack_require__.bind(__webpack_require__, 3898));
            const existingThought = await prisma.thought.findFirst({
                where: {
                    id,
                    userId: user.id
                }
            });
            if (!existingThought) return next_response/* default */.Z.json({
                error: "Thought not found"
            }, {
                status: 404
            });
            const thought = await prisma.thought.update({
                where: {
                    id
                },
                data: {
                    content: content || existingThought.content,
                    type: type || existingThought.type,
                    mood: mood || existingThought.mood,
                    tags: tags || existingThought.tags
                }
            });
            return next_response/* default */.Z.json(thought);
        }
        const mockThought = {
            id,
            content: content || "Updated thought",
            type: type || "thought",
            mood: mood || "\uD83D\uDE0A",
            tags: tags || [],
            date: new Date().toISOString(),
            userId: user.id,
            createdAt: new Date().toISOString()
        };
        return next_response/* default */.Z.json(mockThought);
    } catch (error) {
        console.error("Error updating thought:", error);
        return next_response/* default */.Z.json({
            error: "Failed to update thought"
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
            error: "Thought ID is required"
        }, {
            status: 400
        });
        if ( true && process.env.POSTGRES_PRISMA_URL) {
            const { prisma } = await __webpack_require__.e(/* import() */ 898).then(__webpack_require__.bind(__webpack_require__, 3898));
            const existingThought = await prisma.thought.findFirst({
                where: {
                    id,
                    userId: user.id
                }
            });
            if (!existingThought) return next_response/* default */.Z.json({
                error: "Thought not found"
            }, {
                status: 404
            });
            await prisma.thought.delete({
                where: {
                    id
                }
            });
            return next_response/* default */.Z.json({
                message: "Thought deleted successfully"
            });
        }
        return next_response/* default */.Z.json({
            message: "Thought deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting thought:", error);
        return next_response/* default */.Z.json({
            error: "Failed to delete thought"
        }, {
            status: 500
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/next@13.4.19_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fthoughts%2Froute&name=app%2Fapi%2Fthoughts%2Froute&pagePath=private-next-app-dir%2Fapi%2Fthoughts%2Froute.ts&appDir=%2Fdata%2Fdata%2Fcom.termux%2Ffiles%2Fhome%2Ffnote%2Fapp&appPaths=%2Fapi%2Fthoughts%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

// @ts-ignore this need to be imported from next/dist to be external


// @ts-expect-error - replaced by webpack/turbopack loader

const AppRouteRouteModule = app_route_module.AppRouteRouteModule;
// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/api/thoughts/route",
        pathname: "/api/thoughts",
        filename: "route",
        bundlePath: "app/api/thoughts/route"
    },
    resolvedPagePath: "/data/data/com.termux/files/home/fnote/app/api/thoughts/route.ts",
    nextConfigOutput,
    userland: route_namespaceObject
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage , staticGenerationAsyncStorage , serverHooks , headerHooks , staticGenerationBailout  } = routeModule;
const originalPathname = "/api/thoughts/route";


//# sourceMappingURL=app-route.js.map

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [595,310,344], () => (__webpack_exec__(8599)));
module.exports = __webpack_exports__;

})();