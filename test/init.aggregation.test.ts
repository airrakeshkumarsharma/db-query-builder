import { IQueryOptions } from "../src"
import { queryBuilder } from "./config"


test("Aggregation | number | lower & upper | +ve", () => {
    const findQueryWithString = queryBuilder.aggregation({ filter: [{ key: "marks", lowerValue: 66, upperValue: 99, dataTypes: "NUMBER" }] })

    const andQuery = findQueryWithString.filter.$match.$and[0].$and

    expect(andQuery.length).toEqual(1)
    expect(andQuery[0]).toEqual({ marks: { $gte: 66, $lte: 99 } })
})

test("Aggregation | number | lowerValue | +ve", () => {
    const findQueryWithString = queryBuilder.aggregation({ filter: [{ key: "marks", lowerValue: 66, dataTypes: "NUMBER" }] })

    const andQuery = findQueryWithString.filter.$match.$and[0].$and

    expect(andQuery.length).toEqual(1)
    expect(andQuery[0]).toEqual({ marks: { $gte: 66 } })
})

test("Aggregation | number | upperValue | +ve", () => {
    const findQueryWithString = queryBuilder.aggregation({ filter: [{ key: "marks", upperValue: 66, dataTypes: "NUMBER" }] })

    const andQuery = findQueryWithString.filter.$match.$and[0].$and

    expect(andQuery.length).toEqual(1)
    expect(andQuery[0]).toEqual({ marks: { $lte: 66 } })
})

test("Aggregation | number | value | -ve", () => {
    try {
        queryBuilder.aggregation({ filter: [{ key: "marks", value: "66", dataTypes: "NUMBER" }] })
    } catch (error) {
        expect(error.message).toEqual("Wrong value is passed to find")
    }
})

test("Aggregation | number | value not passed | -ve", () => {
    try {
        queryBuilder.aggregation({ filter: [{ key: "marks", dataTypes: "NUMBER" }] })
    } catch (error) {
        expect(error.message).toEqual("Wrong value is passed to find")
    }
})



test("Aggregation | string | value | +ve", () => {
    const filter: IQueryOptions = []
    filter.push({ key: "name", value: "rohit", dataTypes: "STRING" })
    filter.push({ key: "class", value: "matric", dataTypes: "STRING" })
    const findQueryWithString = queryBuilder.aggregation({ filter })

    const andQuery = findQueryWithString.filter.$match.$and[0].$and

    expect(andQuery.length).toEqual(2)
    expect(andQuery[0]).toEqual({ name: "rohit" })
    expect(andQuery[1]).toEqual({ class: "matric" })
})

test("Aggregation | string | lower & upper | -ve", () => {
    const filter: IQueryOptions = []
    filter.push({ key: "name", lowerValue: 1, dataTypes: "STRING" })
    filter.push({ key: "class", value: "matric", dataTypes: "STRING" })

    try {
        queryBuilder.aggregation({ filter })
    } catch(error) {
        expect(error.message).toEqual("Wrong value is passed to find")
    }
})


test("Aggregation | Date | upper & lower | +ve", () => {
    const filter: IQueryOptions = []
    const date = new Date()
    filter.push({ key: "createdAt", lowerValue: date, dataTypes: "DATE" })
    filter.push({ key: "class", value: "matric", dataTypes: "STRING" })

    const findQueryWithString = queryBuilder.aggregation({ filter })

    const andQuery = findQueryWithString.filter.$match.$and[0].$and

    expect(andQuery.length).toEqual(2)
    expect(andQuery[0]).toEqual({ createdAt: { $gte: date } })
    expect(andQuery[1]).toEqual({ class: "matric" })
})

// Combination of all
test("Aggregation | Date, number, string, bool | upper & lower | +ve", () => {
    const filter: IQueryOptions = []
    const date = new Date()
    filter.push({ key: "createdAt", lowerValue: date, dataTypes: "DATE" })
    filter.push({ key: "class", value: "matric", dataTypes: "STRING" })
    filter.push({key: "marks", lowerValue: 100, upperValue: 105, dataTypes: "NUMBER" })
    filter.push({ key: "isDeleted", value: false, dataTypes: "BOOL" })

    const findQueryWithString = queryBuilder.aggregation({ filter })

    const andQuery = findQueryWithString.filter.$match.$and[0].$and

    expect(andQuery.length).toEqual(4)
    expect(andQuery[0]).toEqual({ createdAt: { $gte: date } })
    expect(andQuery[1]).toEqual({ class: "matric" })
    expect(andQuery[2]).toEqual({ marks: {$gte: 100, $lte: 105} })
    expect(andQuery[3]).toEqual({ isDeleted: false })
})
