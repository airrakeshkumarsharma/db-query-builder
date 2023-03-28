import { DB_ENUMS, IOptions, IQuery } from "./interface/init";

export default class QueryBuilder {
    dbName: string
    options: IOptions

    constructor(dbName: DB_ENUMS, options?: IOptions) {
        this.dbName = dbName
        this.options = options || {}
    }

    find(query: IQuery) {
        
    }

    aggregation () {

    }
}