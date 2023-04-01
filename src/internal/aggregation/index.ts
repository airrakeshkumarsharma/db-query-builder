import { DATA_TYPE, OPERATION_TYPE } from "../../constant";
import { IAggregation } from "../../interface/aggregation";
import { IQueryOption } from "../../interface/init"
import { applyBoolFilter } from "../common/boolFilter";
import { applyCustomFilter } from "../common/customFilter";
import { applyDateFilter } from "../common/dateFilter";
import { applyNumberFilter } from "../common/numberFilter";
import { applyIdFilter } from "../common/objectIdFilter";
import { applyStringFilter } from "../common/stringFilter";


const { DATE, NUMBER, CUSTOM, ID, STRING, BOOL } = DATA_TYPE

const filterFunctionMapper = {
    [DATE]: applyDateFilter,
    [NUMBER]: applyNumberFilter,
    [ID]: applyIdFilter,
    [STRING]: applyStringFilter,
    [BOOL]: applyBoolFilter,
    [CUSTOM]: applyCustomFilter
}

export const aggregationQueryBuilder = (filters: IQueryOption[]) => {
    const query: IAggregation = { $match: { $and: [{ $or: [], $and: [] }] } }

    for (let index = 0; index < filters.length; index++) {
        const filter = filters[index];
        const queryObject = filterFunctionMapper[filter.dataTypes](filter)
        // If false, then
        if (!queryObject) {
            throw new Error("Wrong value is passed to find")
        }

        if (filter?.operations === OPERATION_TYPE.$OR) {
            query.$match.$and[0].$or.push(queryObject)
        } else {
            query.$match.$and[0].$and.push(queryObject)
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