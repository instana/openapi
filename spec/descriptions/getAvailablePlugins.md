This endpoint retrieves available entity types.

```
curl --location --request POST 'https://<Host>/api/infrastructure-monitoring/analyze/entity-types' \
--header 'Content-Type: application/json' \
--header 'Authorization: apiToken <Token>' \
--data-raw '{
  "tagFilterExpression": {
    "type": "EXPRESSION",
    "logicalOperator": "AND",
    "elements": []
  },
  "timeFrame": {
    "to": 1673969562715,
    "windowSize": 3600000
  }
}'
```
The above example retrieves all entity types.