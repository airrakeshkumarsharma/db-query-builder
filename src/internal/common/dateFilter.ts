import { IQueryOption } from "../../interface/init";

export const applyDateFilter = (filter: IQueryOption) => {
    let queryObject: { [key: string]: any } = {}
    const { key, lowerValue, upperValue } = filter;
    let numberExist = false
    if (lowerValue) {
        queryObject[key] = { $gte: new Date(lowerValue) };
        numberExist = true
    }
    if (upperValue) {
        queryObject[key] = { ...queryObject[key], ...{ $lte: new Date(upperValue) } };
        numberExist = true
    }

    // TODO: Improve this logic by ts
    if (!numberExist) {
        return numberExist
    }

    return queryObject
}