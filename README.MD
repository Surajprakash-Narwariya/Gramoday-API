To run the server
cmd$ npm start

To run API test
cmd$ npm test

There are two API call this project works on
(i) /reports

-   This is a POST request
-   take the input from the Mandi Commission Agent
-   if commodityId-marketId already exists, it will update
-   Format for the input is

{
"userId" : "User-21",
"marketId" : "mkt34320",
"marketName" : "Krashi Upaj mandi sanawad",
"marketType" : "Mandi",
"commodityId" : "pt-32432",
"commodityName" : "Wheat",
"priceUnit" : "Quintal",
"conversionFactor" : "100",
"price" : 3200
}

-   expected output will be the

{
"status": "success",
"reportId": "629d002d85d32059f9930e69"
}

-   reportID will be unique for every different combination of
    marketId and commodityId

(ii) /report/:reportID {for above details reportId = 629d002d85d32059f9930e69}

-   This is a GET request
-   return the average price of commodity, and the userId who submitted details
-   Format for the OUTPUT will be

{
"\_id": "629d002d85d32059f9930e69",
"commodityName": "Wheat",
"commodityId": "pt-32432",
"marketId": "mkt34320",
"marketName": "Krashi Upaj mandi sanawad",
"users": [
"User-21",
"User-22"
],
"priceUnit": "Kg",
"price": 32,
"createdAt": "2022-06-05T19:12:45.208Z",
"updatedAt": "2022-06-05T19:35:47.538Z",
"\_\_v": 0
}
