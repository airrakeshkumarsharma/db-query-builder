# Database Query builder
### Why does this repository exist? As developers use databases and build more complex queries as their applications grow, this code repository simplifies the querying process. All you have to do is pass the data you need to build, and the repository will return the data. The best part of this query builder library is that you can customize the query after it has been built to your specific needs.

# How to use the query builder
- Step 1: Install the query builder library
  
   ```bash
   npm i build-query   
   ```
- Step 2: Create instance of the query builder library
   ```js
    const buildQuery = new BuildQuery("MONGO") //Here mongo is passed to queryBuilder because query builder will use the mongo database.

    const filter = []
    filter.push({{ key: "marks", lowerValue: 66, upperValue: 99, dataTypes: "NUMBER" }})
    const queryBuilderOutput =  buildQuery.find(filter)

    // Customize the query if necessary otherwise pass it to mongo model 
    ```


