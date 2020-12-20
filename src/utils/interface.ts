class Callback {}

/** Drinks data object */
declare interface Drinks {
    [propName: string]: string|number|boolean|undefined|[]|{}|Callback;
}

/** API response data */
declare interface ApiResponseType {
    'drinks': Drinks[];
}

/** table column setup */

declare interface TableColumnSetup{
    def:string;
    title:string;
    type: string;
}

export {
    Drinks,
    ApiResponseType,
    TableColumnSetup,
}