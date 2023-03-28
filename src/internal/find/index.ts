import { DATA_TYPE } from "../../constant";
import { IQueryOption } from "../../interface/init"

const applyDateFilter = (queryObject: any, filter: IQueryOption): void => {
    const { key, lowerValue, upperValue } = filter;
    if (lowerValue) {
        queryObject[key] = { $gte: new Date(lowerValue) };
    }
    if (upperValue) {
        queryObject[key] = { ...queryObject[key], ...{ $lte: new Date(upperValue) } };
    }
}

const applyNumberFilter = (queryObject: any, filter: IQueryOption): void  => {
    const { key, lowerValue, upperValue } = filter;
    if (lowerValue || lowerValue === 0) {
        queryObject[key] = { $gte: lowerValue };
    }
    if (upperValue || upperValue === 0) {
        queryObject[key] = { ...queryObject[key], ...{ $lte: upperValue } };
    }
}


const applyIdFilter = (queryObject: any, filter: IQueryOption): void => {
    const { key, value } = filter;
    queryObject[key] = { $eq: value };
}

const applyCustomFilter = (queryObject: any, filter: IQueryOption): void => {
    const { key, value } = filter;
    queryObject[key] = value;
}


const { DATE, NUMBER, CUSTOM, ID } = DATA_TYPE

const filterFunctionMapper = {
    [DATE]: applyDateFilter,
    [NUMBER]: applyNumberFilter,
    [ID]: applyIdFilter,
    [CUSTOM]: applyCustomFilter
}

const filterQuery = (filters: IQueryOption[]) => {
    const QUERY_INDEX = { $and: [{ $or: [], $and: [] }] }

    for (let index = 0; index < filters.length; index++) {
        const filter = filters[index];
        const queryObject = {}
        filterFunctionMapper[filter.key].bind(queryObject, filter)
    }
}

const searchQuery = (search: IQueryOption[]) => {

}

const sort = () => {

}


const startBuilding = () => {

}