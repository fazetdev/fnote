"use strict";
(() => {
var exports = {};
exports.id = 490;
exports.ids = [490];
exports.modules = {

/***/ 3524:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ 2037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 8931:
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

// NAMESPACE OBJECT: ./app/api/learned/route.ts
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
;// CONCATENATED MODULE: ./app/api/learned/route.ts

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
        const category = searchParams.get("category");
        if ( true && process.env.POSTGRES_PRISMA_URL) {
            const { prisma } = await __webpack_require__.e(/* import() */ 898).then(__webpack_require__.bind(__webpack_require__, 3898));
            const where = {
                userId: user.id
            };
            if (date) where.date = new Date(date);
            if (category) where.category = category;
            const learnedItems = await prisma.learnedItem.findMany({
                where,
                orderBy: {
                    createdAt: "desc"
                }
            });
            return next_response/* default */.Z.json(learnedItems);
        }
        // Mock data
        const mockLearned = [
            {
                id: "1",
                title: "Next.js 13 App Router",
                content: "Learned about new App Router structure and server components",
                category: "technology",
                tags: [
                    "nextjs",
                    "react",
                    "webdev"
                ],
                date: new Date().toISOString(),
                userId: user.id,
                createdAt: new Date().toISOString()
            },
            {
                id: "2",
                title: "Prisma with PostgreSQL",
                content: "Setting up Prisma ORM with Neon PostgreSQL database",
                category: "technology",
                tags: [
                    "prisma",
                    "database",
                    "postgresql"
                ],
                date: new Date().toISOString(),
                userId: user.id,
                createdAt: new Date().toISOString()
            }
        ];
        return next_response/* default */.Z.json(mockLearned);
    } catch (error) {
        console.error("Error fetching learned items:", error);
        return next_response/* default */.Z.json({
            error: "Failed to fetch learned items"
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
        const { title, content, category = "general", tags = [], date } = body;
        if (!title || !content) return next_response/* default */.Z.json({
            error: "Title and content are required"
        }, {
            status: 400
        });
        if ( true && process.env.POSTGRES_PRISMA_URL) {
            const { prisma } = await __webpack_require__.e(/* import() */ 898).then(__webpack_require__.bind(__webpack_require__, 3898));
            const learnedItem = await prisma.learnedItem.create({
                data: {
                    title,
                    content,
                    category,
                    tags,
                    date: date ? new Date(date) : new Date(),
                    userId: user.id
                }
            });
            return next_response/* default */.Z.json(learnedItem, {
                status: 201
            });
        }
        const mockLearned = {
            id: Date.now().toString(),
            title,
            content,
            category,
            tags,
            date: date || new Date().toISOString(),
            userId: user.id,
            createdAt: new Date().toISOString()
        };
        return next_response/* default */.Z.json(mockLearned, {
            status: 201
        });
    } catch (error) {
        console.error("Error creating learned item:", error);
        return next_response/* default */.Z.json({
            error: "Failed to create learned item"
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
            error: "Learned item ID is required"
        }, {
            status: 400
        });
        const body = await request.json();
        const { title, content, category, tags, date } = body;
        if ( true && process.env.POSTGRES_PRISMA_URL) {
            const { prisma } = await __webpack_require__.e(/* import() */ 898).then(__webpack_require__.bind(__webpack_require__, 3898));
            const existingItem = await prisma.learnedItem.findFirst({
                where: {
                    id,
                    userId: user.id
                }
            });
            if (!existingItem) return next_response/* default */.Z.json({
                error: "Learned item not found"
            }, {
                status: 404
            });
            const learnedItem = await prisma.learnedItem.update({
                where: {
                    id
                },
                data: {
                    title: title || existingItem.title,
                    content: content || existingItem.content,
                    category: category || existingItem.category,
                    tags: tags || existingItem.tags,
                    date: date ? new Date(date) : existingItem.date
                }
            });
            return next_response/* default */.Z.json(learnedItem);
        }
        const mockLearned = {
            id,
            title: title || "Updated title",
            content: content || "Updated content...",
            category: category || "general",
            tags: tags || [],
            date: date || new Date().toISOString(),
            userId: user.id,
            createdAt: new Date().toISOString()
        };
        return next_response/* default */.Z.json(mockLearned);
    } catch (error) {
        console.error("Error updating learned item:", error);
        return next_response/* default */.Z.json({
            error: "Failed to update learned item"
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
            error: "Learned item ID is required"
        }, {
            status: 400
        });
        if ( true && process.env.POSTGRES_PRISMA_URL) {
            const { prisma } = await __webpack_require__.e(/* import() */ 898).then(__webpack_require__.bind(__webpack_require__, 3898));
            const existingItem = await prisma.learnedItem.findFirst({
                where: {
                    id,
                    userId: user.id
                }
            });
            if (!existingItem) return next_response/* default */.Z.json({
                error: "Learned item not found"
            }, {
                status: 404
            });
            await prisma.learnedItem.delete({
                where: {
                    id
                }
            });
            return next_response/* default */.Z.json({
                message: "Learned item deleted successfully"
            });
        }
        return next_response/* default */.Z.json({
            message: "Learned item deleted successfully"
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

;// CONCATENATED MODULE: ./node_modules/.pnpm/next@13.4.19_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Flearned%2Froute&name=app%2Fapi%2Flearned%2Froute&pagePath=private-next-app-dir%2Fapi%2Flearned%2Froute.ts&appDir=%2Fdata%2Fdata%2Fcom.termux%2Ffiles%2Fhome%2Ffnote%2Fapp&appPaths=%2Fapi%2Flearned%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

// @ts-ignore this need to be imported from next/dist to be external


// @ts-expect-error - replaced by webpack/turbopack loader

const AppRouteRouteModule = app_route_module.AppRouteRouteModule;
// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/api/learned/route",
        pathname: "/api/learned",
        filename: "route",
        bundlePath: "app/api/learned/route"
    },
    resolvedPagePath: "/data/data/com.termux/files/home/fnote/app/api/learned/route.ts",
    nextConfigOutput,
    userland: route_namespaceObject
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage , staticGenerationAsyncStorage , serverHooks , headerHooks , staticGenerationBailout  } = routeModule;
const originalPathname = "/api/learned/route";


//# sourceMappingURL=app-route.js.map

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [595,310,344], () => (__webpack_exec__(8931)));
module.exports = __webpack_exports__;

})();