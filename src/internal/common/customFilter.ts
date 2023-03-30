import { IQueryOption } from "../../interface/init";

export const applyCustomFilter = (filter: IQueryOption) => {
    let queryObject: { [key: string]: any } = {}
    const { key, value } = filter;
    queryObject[key] = value;

    return queryObject
}