import { DATA_TYPE, OPERATION_TYPE } from "../../constant";
import { IQueryOption } from "../../interface/init"
import { applyCustomFilter } from "../common/customFilter";
import { applyDateFilter } from "../common/dateFilter";
import { applyNumberFilter } from "../common/numberFilter";
import { applyIdFilter } from "../common/objectIdFilter";


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
        // If false, then
        if(!queryObject) {
            throw new Error("Wrong value is passed to find")
        }

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