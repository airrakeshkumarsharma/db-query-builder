import BuildQuery from "../src"
import { IQueryOptions } from "../src"

const queryBuilder = new BuildQuery("MONGO")

test("Find | number | lower & upper | +ve", () => {
    const findQueryWithString = queryBuilder.find({ filter: [{ key: "marks", lowerValue: 66, upperValue: 99, dataTypes: "NUMBER" }] })

    const andQuery = findQueryWithString.filter.$and[0].$and

    expect(andQuery.length).toEqual(1)
    expect(andQuery[0]).toEqual({ marks: { $gte: 66, $lte: 99 } })
})

test("Find | number | lowerValue | +ve", () => {
    const findQueryWithString = queryBuilder.find({ filter: [{ key: "marks", lowerValue: 66, dataTypes: "NUMBER" }] })

    const andQuery = findQueryWithString.filter.$and[0].$and

    expect(andQuery.length).toEqual(1)
    expect(andQuery[0]).toEqual({ marks: { $gte: 66 } })
})

test("Find | number | upperValue | +ve", () => {
    const findQueryWithString = queryBuilder.find({ filter: [{ key: "marks", upperValue: 66, dataTypes: "NUMBER" }] })

    const andQuery = findQueryWithString.filter.$and[0].$and

    expect(andQuery.length).toEqual(1)
    expect(andQuery[0]).toEqual({ marks: { $lte: 66 } })
})

test("Find | number | value | -ve", () => {
    try {
        queryBuilder.find({ filter: [{ key: "marks", value: "66", dataTypes: "NUMBER" }] })
    } catch (error) {
        expect(error.message).toEqual("Wrong value is passed to find")
    }
})

test("Find | number | value not passed | -ve", () => {
    try {
        queryBuilder.find({ filter: [{ key: "marks", dataTypes: "NUMBER" }] })
    } catch (error) {
        expect(error.message).toEqual("Wrong value is passed to find")
    }
})



test("Find | string | value | +ve", () => {
    const filter: IQueryOptions = []
    filter.push({ key: "name", value: "rohit", dataTypes: "STRING" })
    filter.push({ key: "class", value: "matric", dataTypes: "STRING" })
    const findQueryWithString = queryBuilder.find({ filter })

    const andQuery = findQueryWithString.filter.$and[0].$and

    expect(andQuery.length).toEqual(2)
    expect(andQuery[0]).toEqual({ name: "rohit" })
    expect(andQuery[1]).toEqual({ class: "matric" })
})

test("Find | string | lower & upper | -ve", () => {
    const filter: IQueryOptions = []
    filter.push({ key: "name", lowerValue: 1, dataTypes: "STRING" })
    filter.push({ key: "class", value: "matric", dataTypes: "STRING" })

    try {
        queryBuilder.find({ filter })
    } catch(error) {
        expect(error.message).toEqual("Wrong value is passed to find")
    }
})


test("Find | Date | upper & lower | +ve", () => {
    const filter: IQueryOptions = []
    const date = new Date()
    filter.push({ key: "createdAt", lowerValue: date, dataTypes: "DATE" })
    filter.push({ key: "class", value: "matric", dataTypes: "STRING" })

    const findQueryWithString = queryBuilder.find({ filter })

    const andQuery = findQueryWithString.filter.$and[0].$and

    expect(andQuery.length).toEqual(2)
    expect(andQuery[0]).toEqual({ createdAt: { $gte: date } })
    expect(andQuery[1]).toEqual({ class: "matric" })
})

// Combination of all
test("Find | Date, number, string, bool | upper & lower | +ve", () => {
    const filter: IQueryOptions = []
    const date = new Date()
    filter.push({ key: "createdAt", lowerValue: date, dataTypes: "DATE" })
    filter.push({ key: "class", value: "matric", dataTypes: "STRING" })
    filter.push({key: "marks", lowerValue: 100, upperValue: 105, dataTypes: "NUMBER" })
    filter.push({ key: "isDeleted", value: false, dataTypes: "BOOL" })

    const findQueryWithString = queryBuilder.find({ filter })

    const andQuery = findQueryWithString.filter.$and[0].$and

    expect(andQuery.length).toEqual(4)
    expect(andQuery[0]).toEqual({ createdAt: { $gte: date } })
    expect(andQuery[1]).toEqual({ class: "matric" })
    expect(andQuery[2]).toEqual({ marks: {$gte: 100, $lte: 105} })
    expect(andQuery[3]).toEqual({ isDeleted: false })
})
