This endpoint retrieves available metrics on an entity type

```
curl --location --request POST 'https://<Host>/api/infrastructure-monitoring/analyze/metrics' \
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
  },
  "query": "",
  "type": "jvmRuntimePlatform"
}'
```
The above example retrieves all available metrics on JVM entities.