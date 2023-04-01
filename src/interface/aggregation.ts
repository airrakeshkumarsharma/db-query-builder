export interface IAggregation { 
    $match: { 
        $and: [
            { $or: any[], $and: any[] }
        ] 
    } 
}