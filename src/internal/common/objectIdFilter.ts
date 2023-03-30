import { IQueryOption } from "../../interface/init";

export const applyIdFilter = (filter: IQueryOption) => {
    let queryObject: { [key: string]: any } = {}
    const { key, value } = filter;
    queryObject[key] = { $eq: value };

    return queryObject
}