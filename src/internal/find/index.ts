import { DATA_TYPE } from "../../constant";
import { IQueryOption } from "../../interface/init"

const filterQuery = (filters: IQueryOption[]) => {
    const QUERY_INDEX = { $and: [{ $or: [], $and: [] }] }

    for (let index = 0; index < filters.length; index++) {
        const filter = filters[index];

        switch(filter.dataTypes) {
            case DATA_TYPE.DATE:
                // DO SOME STUFF
                break
            case DATA_TYPE.NUMBER:
                // DO SOME STUFF
                break
            case DATA_TYPE.ID:
                // DO SOME STUFF
                break

            default: 
                // Do code for boolean and string
        }

        // To add the code here according to operation
    }
}

const searchQuery = (search: IQueryOption[]) => {

}

const sort = () => {

}


const startBuilding = () => {

}