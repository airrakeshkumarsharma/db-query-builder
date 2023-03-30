import { IQueryOption } from "../../interface/init";

export const applyBoolFilter = (filter: IQueryOption) => {
    let queryObject: { [key: string]: any } = {}
    const { key, value } = filter;
    queryObject[key] = value;

    return queryObject
}