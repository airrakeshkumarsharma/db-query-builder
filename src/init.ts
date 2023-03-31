import { DB_ENUMS, IOptions, IQuery } from "./interface/init";
import { filterQueryBuilder } from "./internal/find";

export default class BuildQuery {
    dbName: string
    options: IOptions

    constructor(dbName: DB_ENUMS, options?: IOptions) {
        this.dbName = dbName
        this.options = options || {}
    }

    find(query: IQuery) {
        let buildQuery: { filter: any, search: any, sort: any } = { filter: {}, search: {}, sort: {} }
        if(query.filter) buildQuery.filter = filterQueryBuilder(query.filter)

        return buildQuery
    }
}