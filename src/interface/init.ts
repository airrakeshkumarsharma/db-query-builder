import { DATABASE, DATA_TYPE, OPERATION_TYPE } from "../constant"

export type DB_ENUMS = keyof typeof DATABASE

export interface IOptions {
}

type dataTypes = keyof typeof DATA_TYPE
type operationType  = keyof typeof OPERATION_TYPE

export interface IQueryOption {
    key: string
    value?: string | string[] | number[] | boolean
    lowerValue?: number | Date
    upperValue?: number | Date
    dataTypes: dataTypes
    operations?: operationType
}

interface ISort {
    key: string
    order: -1 | 1
}

interface IPagination {
    perPage: number & { minLength: 0; }
    pageNumber: number & { minLength: 0; }
}

interface IProject {
    [key: string]: 1 | 0
}

export interface IQuery {
    filter?: IQueryOption[]

    search?: IQueryOption[]

    sort?: ISort[]

    project?: IProject

    pagination?: IPagination
}