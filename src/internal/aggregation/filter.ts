import { ObjectId, ObjectIdLike } from "bson";
import { isValidObjectId, Types } from "mongoose";

const arrayFilterQuery = (values: any[], key: any) => {
    const filterQueries: any = [];
    let index = 0;
  
    for (const value of values) {
      filterQueries[index] = {};
      filterQueries[index][key] = value;
      index++;
    }
  
    return filterQueries;
  };

const numberQueryBuilder = (filterQuery: { [x: string]: any; }, key: string | number, lowerValue?: number, upperValue?: number)  => {
    if (lowerValue || lowerValue === 0) {
      filterQuery[key] = { $gte: lowerValue };
    }
    if (upperValue || upperValue === 0) {
      filterQuery[key] = { ...filterQuery[key], ...{ $lte: upperValue } };
    }
    return filterQuery;
}

const dateQueryBuilder = (filterQuery: { [x: string]: any; }, key: string | number , lowerValue?: Date, upperValue?: Date) => {
    // ?: If wrong format comes then it will break the code.
    if (lowerValue) {
      filterQuery[key] = { $gte: new Date(lowerValue) };
    }
    if (upperValue) {
      filterQuery[key] = { ...filterQuery[key], ...{ $lte: new Date(upperValue) } };
    }
}

const objectIdQueryBuilder = (filterQuery: { [x: string]: { $eq: Types.ObjectId; }; }, key: string | number, value: string | any[] | ObjectId | ObjectIdLike | Uint8Array | undefined) => {
    if (Array.isArray(value)) {
      for (const valueData in value) {
        // Check Object
        if (!isValidObjectId(value[valueData])) {
          throw new Error("Invalid Object Id given")
        }
        value[valueData] = new Types.ObjectId(value[valueData]);
      }

      // Get Array filter query
      filterQuery = arrayFilterQuery(value, key);
    } else {
      // Check Object
      if (!isValidObjectId(value)) {
        throw new Error("Invalid Object Id given")
      }
      value = new Types.ObjectId(value);
      filterQuery[key] = { $eq: new Types.ObjectId(value) };
    }
    return filterQuery
}

const customQueryBuilder = (filterQuery: { [x: string]: any; }, key: string | number, value: any) => {
    filterQuery[key] = value;
    return filterQuery
}

const defaultQueryBuilder = (filterQuery: { [x: string]: { $eq: any; }; },key: string | number, value: any[]) => {
    if (Array.isArray(value)) {
        filterQuery = arrayFilterQuery(value, key);
      } else {
        filterQuery[key] = { $eq: value };
      }
}

const typesBasedQuery = {
    number:  numberQueryBuilder,
    date: dateQueryBuilder,
    id: objectIdQueryBuilder,
    custom: customQueryBuilder
}

let MATCH_INDEX
const filtersPipeline = (pipeline: any, filters: any) => {
    let filterQuery: any;
    let type;
    let key: string;
    let value;
    let upperValue;
    let lowerValue;
    let operation;
    let isArray;
  
    /* -1 is used to save index of pipeline array */
    MATCH_INDEX = pipeline.push({ $match: { $and: [{ $or: [] }, { $and: [] }] } }) - 1;
  
    for (const filter of filters) {
      filterQuery = {};
      type = filter.type;
      key = filter.key;
      value = filter.value;
      upperValue = filter.upperValue;
      lowerValue = filter.lowerValue;
      operation = filter.operation;
      isArray = false;
    
    //   filterQuery = typesBasedQuery[type](filterQuery, key, value, upperValue, lowerValue)  
  
      // Default Operation is AND
      filterQuery = isArray ? { $or: filterQuery } : filterQuery;
      if (operation && operation === "$or") {
        pipeline[MATCH_INDEX]["$match"]["$and"][0]["$or"].push(filterQuery);
      } else {
        pipeline[MATCH_INDEX]["$match"]["$and"][1]["$and"].push(filterQuery);
      }
    }
  };