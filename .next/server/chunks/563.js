exports.id = 563;
exports.ids = [563];
exports.modules = {

/***/ 8837:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 9343));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 8149));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 2771));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 7062))

/***/ }),

/***/ 2771:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ InstallPrompt)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* __next_internal_client_entry_do_not_use__ default auto */ 

function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [showPrompt, setShowPrompt] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [mounted, setMounted] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setMounted(true);
        const handleBeforeInstallPrompt = (e)=>{
            e.preventDefault();
            setDeferredPrompt(e);
            // Show prompt after 5 seconds if not dismissed before
            setTimeout(()=>{
                const hasDismissed = localStorage.getItem("fnote_install_dismissed");
                if (!hasDismissed) {
                    setShowPrompt(true);
                }
            }, 5000);
        };
        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        // Check if app is already installed
        if (window.matchMedia("(display-mode: standalone)").matches) {
            console.log("App is running in standalone mode");
        }
        return ()=>{
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);
    const handleInstallClick = async ()=>{
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User ${outcome} the install prompt`);
        setDeferredPrompt(null);
        setShowPrompt(false);
        if (outcome === "dismissed") {
            localStorage.setItem("fnote_install_dismissed", "true");
        }
    };
    const handleDismiss = ()=>{
        setShowPrompt(false);
        localStorage.setItem("fnote_install_dismissed", "true");
    };
    if (!mounted || !showPrompt || !deferredPrompt) {
        return null;
    }
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "fixed bottom-20 left-4 right-4 z-50 md:left-auto md:right-4 md:w-80",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "bg-[#143b28] text-white p-4 rounded-xl shadow-xl border border-[#d4af37]/30",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-start gap-3",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "text-2xl",
                        children: "\uD83D\uDCF1"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex-1",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                className: "font-semibold text-[#d4af37]",
                                children: "Install FNote"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "text-sm text-gray-300 mt-1",
                                children: "Install this app on your device for faster access and offline use."
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex gap-2 mt-3",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        onClick: handleInstallClick,
                                        className: "flex-1 bg-[#d4af37] text-black py-2 rounded-lg font-medium hover:bg-[#c9a633] transition",
                                        children: "Install"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        onClick: handleDismiss,
                                        className: "px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition",
                                        children: "Later"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        onClick: handleDismiss,
                        className: "text-gray-400 hover:text-white",
                        "aria-label": "Close",
                        children: "✕"
                    })
                ]
            })
        })
    });
}


/***/ }),

/***/ 7062:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OfflineIndicator)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* __next_internal_client_entry_do_not_use__ default auto */ 

function OfflineIndicator() {
    const [isOnline, setIsOnline] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [showOffline, setShowOffline] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [showReconnected, setShowReconnected] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        // Set initial state
        const onlineStatus = navigator.onLine;
        setIsOnline(onlineStatus);
        if (!onlineStatus) {
            setShowOffline(true);
        }
        // Update state when connectivity changes
        const handleOnline = ()=>{
            setIsOnline(true);
            setShowOffline(false);
            // Show reconnected message briefly
            setShowReconnected(true);
            setTimeout(()=>{
                setShowReconnected(false);
            }, 3000);
        };
        const handleOffline = ()=>{
            setIsOnline(false);
            setShowOffline(true);
            // Auto-hide offline message after 5 seconds
            setTimeout(()=>{
                setShowOffline(false);
            }, 5000);
        };
        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);
        return ()=>{
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            showOffline && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "fixed bottom-4 right-4 z-50 animate-fade-in",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "bg-yellow-600/90 text-white px-3 py-2 rounded-lg shadow-lg backdrop-blur-sm border border-yellow-500/50",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: "text-xs",
                                children: "\uD83D\uDCE1"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: "text-xs font-medium",
                                children: "Offline mode"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                onClick: ()=>setShowOffline(false),
                                className: "ml-2 text-xs opacity-70 hover:opacity-100",
                                "aria-label": "Dismiss",
                                children: "✕"
                            })
                        ]
                    })
                })
            }),
            showReconnected && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "fixed bottom-4 right-4 z-50 animate-fade-in",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "bg-emerald-600/90 text-white px-3 py-2 rounded-lg shadow-lg backdrop-blur-sm border border-emerald-500/50",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: "text-xs",
                                children: "✅"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: "text-xs font-medium",
                                children: "Back online"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                onClick: ()=>setShowReconnected(false),
                                className: "ml-2 text-xs opacity-70 hover:opacity-100",
                                "aria-label": "Dismiss",
                                children: "✕"
                            })
                        ]
                    })
                })
            })
        ]
    });
}


/***/ }),

/***/ 8149:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ServiceWorkerRegistration)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* __next_internal_client_entry_do_not_use__ default auto */ 
function ServiceWorkerRegistration() {
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if ("serviceWorker" in navigator && "production" === "production") {
            window.addEventListener("load", ()=>{
                navigator.serviceWorker.register("/sw.js").then((registration)=>{
                    console.log("ServiceWorker registration successful:", registration.scope);
                }).catch((error)=>{
                    console.log("ServiceWorker registration failed:", error);
                });
            });
        }
    }, []);
    return null // This component doesn't render anything
    ;
}


/***/ }),

/***/ 9343:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ SyncStatus)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(6786);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(8038);
;// CONCATENATED MODULE: ./lib/sync.ts
// Proper sync service for FNote - Works with actual backend API
class SyncService {
    constructor(){
        this.queue = [];
        this.isOnline = false;
        this.isSyncing = false;
        this.maxRetries = 3;
        if (true) return;
        this.isOnline = navigator.onLine;
        this.loadQueue();
        this.setupListeners();
        // Clean up old items on startup
        this.cleanupOldItems();
    }
    loadQueue() {
        try {
            const saved = localStorage.getItem("fnote_sync_queue");
            if (saved) {
                const parsed = JSON.parse(saved);
                // Only keep valid items from last 7 days
                const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
                this.queue = parsed.filter((item)=>item && item.id && item.type && item.timestamp > sevenDaysAgo && item.retries < this.maxRetries);
                this.saveQueue() // Save cleaned version
                ;
            }
        } catch (error) {
            console.error("Error loading sync queue:", error);
            this.queue = [];
        }
    }
    saveQueue() {
        localStorage.setItem("fnote_sync_queue", JSON.stringify(this.queue));
    }
    setupListeners() {
        window.addEventListener("online", ()=>{
            this.isOnline = true;
            this.processQueue();
        });
        window.addEventListener("offline", ()=>{
            this.isOnline = false;
        });
    }
    cleanupOldItems() {
        // Remove items older than 7 days or with too many retries
        const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
        this.queue = this.queue.filter((item)=>item.timestamp > sevenDaysAgo && item.retries < this.maxRetries);
        this.saveQueue();
    }
    // Only add to queue for actual changes, not all localStorage writes
    addToQueue(type, action, data) {
        if (true) return;
        // Don't sync authentication data
        if (type === "note" && data?.includes("password")) return;
        if (type === "note" && data?.includes("logged_in")) return;
        const syncItem = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            type,
            action,
            data,
            timestamp: Date.now(),
            synced: false,
            retries: 0
        };
        this.queue.push(syncItem);
        this.saveQueue();
        // Try to sync immediately if online
        if (this.isOnline && !this.isSyncing) {
            this.processQueue();
        }
    }
    async syncToAPI(item) {
        try {
            // Map to your actual API endpoints
            const endpoints = {
                note: "/api/notes",
                goal: "/api/goals",
                plan: "/api/planner",
                thought: "/api/thoughts",
                learned: "/api/learned"
            };
            const endpoint = endpoints[item.type];
            if (!endpoint) return false;
            // Get user data for authentication
            const userData = localStorage.getItem("fnote_user");
            const user = userData ? JSON.parse(userData) : null;
            if (!user) {
                console.warn("No user data for sync");
                return false;
            }
            const response = await fetch(endpoint, {
                method: item.action === "delete" ? "DELETE" : item.action === "update" ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-user-data": JSON.stringify(user)
                },
                body: JSON.stringify(item.data)
            });
            return response.ok;
        } catch (error) {
            console.error("Sync to API failed:", error);
            return false;
        }
    }
    async processQueue() {
        if (true) return;
        if (this.isSyncing || !this.isOnline || this.queue.length === 0) {
            return;
        }
        this.isSyncing = true;
        try {
            const unsyncedItems = this.queue.filter((item)=>!item.synced);
            for (const item of unsyncedItems){
                const success = await this.syncToAPI(item);
                if (success) {
                    item.synced = true;
                    item.retries = 0;
                } else {
                    item.retries += 1;
                    if (item.retries >= this.maxRetries) {
                        console.warn(`Max retries reached for item: ${item.id}`);
                    }
                }
                // Small delay between requests
                await new Promise((resolve)=>setTimeout(resolve, 100));
            }
            // Clean up synced items
            this.queue = this.queue.filter((item)=>!item.synced || item.retries < this.maxRetries);
            this.saveQueue();
            console.log(`Sync completed. ${unsyncedItems.filter((i)=>i.synced).length} items synced`);
        } catch (error) {
            console.error("Sync process failed:", error);
        } finally{
            this.isSyncing = false;
        }
    }
    getPendingCount() {
        return this.queue.filter((item)=>!item.synced).length;
    }
    clearQueue() {
        this.queue = [];
        this.saveQueue();
    }
}
// Create instance only in browser
const syncService =  false ? 0 : null;
// Helper to manually trigger sync for specific actions
function trackChange(type, action, data) {
    if (syncService) {
        syncService.addToQueue(type, action, data);
    }
}

;// CONCATENATED MODULE: ./app/components/SyncStatus.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 


function SyncStatus() {
    const [pendingCount, setPendingCount] = (0,react_.useState)(0);
    const [isSyncing, setIsSyncing] = (0,react_.useState)(false);
    const [mounted, setMounted] = (0,react_.useState)(false);
    (0,react_.useEffect)(()=>{
        setMounted(true);
        if (!syncService) return;
        const updateStatus = ()=>{
            if (syncService) {
                const count = syncService.getPendingCount();
                setPendingCount(count);
            }
            setIsSyncing(false);
        };
        // Initial update
        updateStatus();
        // Update every 10 seconds
        const interval = setInterval(updateStatus, 10000);
        return ()=>{
            clearInterval(interval);
        };
    }, []);
    const handleManualSync = async ()=>{
        if (!navigator.onLine) {
            alert("You need to be online to sync");
            return;
        }
        if (!syncService) return;
        setIsSyncing(true);
        await syncService.processQueue();
        setIsSyncing(false);
        // Update count after sync
        if (syncService) {
            setPendingCount(syncService.getPendingCount());
        }
    };
    // Don't show anything if no pending syncs
    if (!mounted || pendingCount === 0) {
        return null;
    }
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "fixed bottom-4 left-4 z-40 animate-fade-in",
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "bg-gradient-to-r from-[#143b28] to-[#1f5a3d] text-white px-3 py-2 rounded-lg shadow-lg border border-[#d4af37]/30",
            children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "flex items-center gap-2",
                children: isSyncing ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                            className: "text-xs",
                            children: "Syncing to server..."
                        })
                    ]
                }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                            className: "text-xs",
                            children: "\uD83D\uDCE1"
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                            className: "text-xs",
                            children: [
                                pendingCount,
                                " change",
                                pendingCount !== 1 ? "s" : "",
                                " pending"
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("button", {
                            onClick: handleManualSync,
                            className: "ml-2 text-xs text-[#d4af37] hover:underline",
                            disabled: !navigator.onLine,
                            children: "Sync now"
                        })
                    ]
                })
            })
        })
    });
}


/***/ }),

/***/ 531:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ RootLayout),
  metadata: () => (/* binding */ metadata)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(6786);
// EXTERNAL MODULE: ./app/globals.css
var globals = __webpack_require__(9330);
// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.19_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/module-proxy.js
var module_proxy = __webpack_require__(2989);
;// CONCATENATED MODULE: ./app/components/ServiceWorkerRegistration.tsx

const proxy = (0,module_proxy.createProxy)(String.raw`/data/data/com.termux/files/home/fnote/app/components/ServiceWorkerRegistration.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;


/* harmony default export */ const ServiceWorkerRegistration = (__default__);
;// CONCATENATED MODULE: ./app/components/OfflineIndicator.tsx

const OfflineIndicator_proxy = (0,module_proxy.createProxy)(String.raw`/data/data/com.termux/files/home/fnote/app/components/OfflineIndicator.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule: OfflineIndicator_esModule, $$typeof: OfflineIndicator_$$typeof } = OfflineIndicator_proxy;
const OfflineIndicator_default_ = OfflineIndicator_proxy.default;


/* harmony default export */ const OfflineIndicator = (OfflineIndicator_default_);
;// CONCATENATED MODULE: ./app/components/SyncStatus.tsx

const SyncStatus_proxy = (0,module_proxy.createProxy)(String.raw`/data/data/com.termux/files/home/fnote/app/components/SyncStatus.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule: SyncStatus_esModule, $$typeof: SyncStatus_$$typeof } = SyncStatus_proxy;
const SyncStatus_default_ = SyncStatus_proxy.default;


/* harmony default export */ const SyncStatus = (SyncStatus_default_);
;// CONCATENATED MODULE: ./app/components/InstallPrompt.tsx

const InstallPrompt_proxy = (0,module_proxy.createProxy)(String.raw`/data/data/com.termux/files/home/fnote/app/components/InstallPrompt.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule: InstallPrompt_esModule, $$typeof: InstallPrompt_$$typeof } = InstallPrompt_proxy;
const InstallPrompt_default_ = InstallPrompt_proxy.default;


/* harmony default export */ const InstallPrompt = (InstallPrompt_default_);
;// CONCATENATED MODULE: ./app/layout.tsx






const metadata = {
    title: "FNote",
    description: "Your personal knowledge base - Works offline"
};
function RootLayout({ children }) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("html", {
        lang: "en",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("head", {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("link", {
                        rel: "manifest",
                        href: "/manifest.json"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        name: "apple-mobile-web-app-capable",
                        content: "yes"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        name: "apple-mobile-web-app-status-bar-style",
                        content: "black-translucent"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        name: "apple-mobile-web-app-title",
                        content: "FNote"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("link", {
                        rel: "apple-touch-icon",
                        href: "/icon-192.svg"
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("body", {
                children: [
                    children,
                    /*#__PURE__*/ jsx_runtime_.jsx(OfflineIndicator, {}),
                    /*#__PURE__*/ jsx_runtime_.jsx(SyncStatus, {}),
                    /*#__PURE__*/ jsx_runtime_.jsx(InstallPrompt, {}),
                    /*#__PURE__*/ jsx_runtime_.jsx(ServiceWorkerRegistration, {})
                ]
            })
        ]
    });
}


/***/ }),

/***/ 9352:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(938);
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__);
  

  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((props) => {
    const imageData = {"type":"image/x-icon","sizes":"16x16"}
    const imageUrl = (0,next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__.fillMetadataSegment)(".", props.params, "favicon.ico")

    return [{
      ...imageData,
      url: imageUrl + "",
    }]
  });

/***/ }),

/***/ 9330:
/***/ (() => {



/***/ })

};
;