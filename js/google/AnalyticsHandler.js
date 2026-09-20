'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AnalyticsHandler;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
function AnalyticsHandler(_a) {
    var id = _a.id;
    var pathname = (0, navigation_1.usePathname)();
    var searchParams = (0, navigation_1.useSearchParams)();
    (0, react_1.useEffect)(function () {
        var url = pathname + '?' + searchParams.toString();
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('config', id, {
                page_path: url,
            });
        }
    }, [pathname, searchParams, id]);
    return null;
}
