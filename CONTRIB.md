
# TESTS
To run tests, execute the following commands:

## RUNNING UNIT TESTS
```sh
npm run unit
```

## RUNNING INTEGRATION TESTS
```sh
docker-compose up --build -d
npm run integration
docker-compose down
```

## RUNNING ALL TESTS
```sh
docker-compose up --build -d
docker-compose up
npm run test
docker-compose down
```
