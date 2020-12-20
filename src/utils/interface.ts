class Callback {}

/** Drinks data object */
declare interface Drinks {
    [propName: string]: string|number|boolean|undefined|[]|{}|Callback;
}

/** API response data */
declare interface ApiResponseType {
    'drinks': Drinks[];
}

export {
    Drinks,
    ApiResponseType,
}