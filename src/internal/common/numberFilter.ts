import { IQueryOption } from "../../interface/init";


export const applyNumberFilter = (filter: IQueryOption) => {
    let queryObject: { [key: string]: any } = {}
    const { key, lowerValue, upperValue } = filter;
    let dateExist = false
    if (lowerValue || lowerValue === 0) {
        queryObject[key] = { $gte: lowerValue };
        dateExist = true
    }
    if (upperValue || upperValue === 0) {
        queryObject[key] = { ...queryObject[key], ...{ $lte: upperValue } };
        dateExist = true
    }
    // TODO: Improve this logic by ts
    if (!dateExist) {
        return dateExist
    }
    return queryObject
}