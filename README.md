# MONGODB TEST PROJECT
Exposes an HTTP rest API that calls a mongodb database.

Queries a collection with similar documents inside:
```
{
    key: "AkcKkrLs",
    value: "qnfSodsuvVzc",
    createdAt: ISODate("2015-03-08T07:29:46.532Z"),
    counts: [1964, 1870, 1011],
}
```

## RUN

### LOCALLY
Set env variables:

* `MONGODB_URL`: the url to the mongodb instance
* `STORE_DB_NAME`: the name of the database in the mongodb instance
* `STORE_COLLECTION_NAME`: the name of the collection to query on

then run
* `npm run build`
* `npm run start`

### WITH DOCKER COMPOSE (dev mode)
* `docker-compose build`
* `docker-compose up`

## API

POST `http://{host}:{port}/get_data`
### REQUEST
```json
{
    "startDate": "2021-01-01",
    "endDate": "2021-12-31",
    "minCount": 0,
    "maxCount": 4,
}
```

### SUCCESS RESPONSE
```json
{
    "code": 0,
    "msg": "Success",
    "records": [
        {
          "key": "foo",
          "createdAt": "2021-01-01T00:00:00.000Z",
          "totalCount": 3,
        }
    ]
}
```

## USAGE EXAMPLES

### with HTTPie
```sh
http POST http://localhost:8080/get_data \
  startDate=2015-01-01 \
  endDate=2015-12-31 \
  minCount:=0 \
  maxCount:=4
```

### with cURL
```sh
curl -X POST --header "Content-Type: application/json" \
  -d "{\"startDate\": \"2015-01-01\",\"endDate\": \"2015-12-31\",\"minCount\": 0,\"maxCount\": 4}" \
  http://localhost:8080/get_data
```
