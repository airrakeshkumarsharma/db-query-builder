import { IQueryOption } from "../../interface/init";

export const applyStringFilter = (filter: IQueryOption) => {
    if(!filter.value) {
        return false
    }
    
    let queryObject: { [key: string]: any } = {}
    const { key, value } = filter;
    queryObject[key] = value;

    return queryObject
}