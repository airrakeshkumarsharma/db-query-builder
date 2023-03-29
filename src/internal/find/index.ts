import { DATA_TYPE, OPERATION_TYPE } from "../../constant";
import { IQueryOption } from "../../interface/init"

const applyDateFilter = (filter: IQueryOption) => {
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
        new Error("Upper value or lower value is missing")
    }

    return queryObject
}

const applyNumberFilter = (filter: IQueryOption) => {
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
        new Error("Upper value or lower value is missing")
    }
    return queryObject
}


const applyIdFilter = (filter: IQueryOption) => {
    let queryObject: { [key: string]: any } = {}
    const { key, value } = filter;
    queryObject[key] = { $eq: value };

    return queryObject
}

const applyCustomFilter = (filter: IQueryOption) => {
    let queryObject: { [key: string]: any } = {}
    const { key, value } = filter;
    queryObject[key] = value;

    return queryObject
}

const { DATE, NUMBER, CUSTOM, ID } = DATA_TYPE

const filterFunctionMapper = {
    [DATE]: applyDateFilter,
    [NUMBER]: applyNumberFilter,
    [ID]: applyIdFilter,
    [CUSTOM]: applyCustomFilter
}

export const filterQueryBuilder = (filters: IQueryOption[]) => {
    const query: { $and: [{ $or: any[], $and: any[] }] } = { $and: [{ $or: [], $and: [] }] }

    for (let index = 0; index < filters.length; index++) {
        const filter = filters[index];
        const queryObject = filterFunctionMapper[filter.dataTypes](filter)

        if (filter?.operations === OPERATION_TYPE.$OR) {
            query.$and[0].$or.push(queryObject)
        } else {
            query.$and[0].$and.push(queryObject)
        }
    }

    return query
}

// const searchQuery = (search: IQueryOption[]) => {

// }

// const sort = () => {

// }


// const startBuilding = () => {

// }