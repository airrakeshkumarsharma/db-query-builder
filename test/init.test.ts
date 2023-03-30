import QueryBuilder from "../src/init"

const queryBuilder = new QueryBuilder("MONGO")

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
    queryBuilder.find({ filter: [{ key: "marks", dataTypes: "NUMBER" }] })
    try {
    } catch (error) {
        expect(error.message).toEqual("Wrong value is passed to find")
    }
})

