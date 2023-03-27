export interface IOptions {}


type operationType  = "$and" | "$or"
type dataTypes = "id" | "date" | "number"

interface filterOptions {
    key: string
    value: string | number[] | Date[]
    dataTypes?: dataTypes
    operations?: operationType
}

export interface findQuery {
    filter: filterOptions | filterOptions[]
}

export enum DB_ENUMS {
    MONGODB = "MONGODB"
}
