export declare const FunHide: {
    hide: (selector: any) => void;
    show: (selector: any) => void;
    toggle: (selector: any) => void;
};
export declare const FunGet: {
    text: (selector: any, data: any) => any;
    html: (selector: any, data: any) => any;
    val: (selector: any, data: any) => any;
};
export declare const FunStyle: {
    css: (selector: any, css: any) => void;
};
export declare const FunEvent: {
    event: (selector: any, eventType: any, callBack: any) => void;
};
export declare const FunClass: {
    add: (selector: any, newClass: any) => void;
    remove: (selector: any, newClass: any) => void;
};
export declare const FunAdd: {
    append: (selector: any, child: any) => void;
    prepend: (selector: any, child: any) => void;
};
export declare const FunRequest: {
    get: (url: any, headers: any) => Promise<unknown>;
    post: (url: any, body: any, headers: any) => Promise<unknown>;
    patch: (url: any, body: any, headers: any) => Promise<unknown>;
    delete: (url: any, headers: any) => Promise<unknown>;
};
export declare const FunQuery: {
    query: (data: any, fields: any) => Promise<unknown>;
};
