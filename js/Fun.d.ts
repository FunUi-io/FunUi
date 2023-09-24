export declare const FunHide: {
    hide: (selector?: string) => void;
    show: (selector?: string) => void;
    toggle: (selector?: string) => void;
};
export declare const FunVisible: {
    hide: (selector?: string) => void;
    show: (selector?: string) => void;
    toggle: (selector?: string) => void;
};
export declare const FunGet: {
    text: (selector?: string, data?: string) => string;
    html: (selector?: string, data?: string) => string;
    val: (selector?: string, data?: string) => string;
};
export declare const FunStyle: {
    css: (selector?: string, css?: {}) => void;
};
export declare const FunEvent: {
    event: (selector?: string, eventType?: string, callBack?: EventListenerOrEventListenerObject | null) => void;
};
export declare const FunClass: {
    add: (selector?: string, newClass?: string) => void;
    remove: (selector?: string, newClass?: string) => void;
};
export declare const FunAdd: {
    append: (selector?: string, child?: Node | null) => void;
    prepend: (selector?: string, child?: Node | null) => void;
};
export declare const FunRequest: {
    get: (url: string, headers?: HeadersInit) => Promise<unknown>;
    post: (url: string, body?: any, headers?: HeadersInit) => Promise<unknown>;
    patch: (url: string, body?: any, headers?: HeadersInit) => Promise<unknown>;
    delete: (url: string, headers?: HeadersInit) => Promise<unknown>;
};
export declare const FunQuery: {
    query: (data: any, fields?: {}) => Promise<unknown>;
};
