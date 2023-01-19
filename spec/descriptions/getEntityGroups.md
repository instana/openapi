This endpoint groups entities for a given filter and aggregates metrics for these groups

```
curl --location --request POST 'https://<Host>/api/infrastructure-monitoring/analyze/entity-groups' \
--header 'Content-Type: application/json' \
--header 'Authorization: apiToken <Token>' \
--data-raw '{
  "timeFrame": {
    "to": 1674075565075,
    "windowSize": 3600000
  },
  "tagFilterExpression": {
    "type": "EXPRESSION",
    "logicalOperator": "AND",
    "elements": []
  },
  "pagination": { "retrievalSize": 20, "fullData": false },
  "groupBy": ["host.name"],
  "type": "jvmRuntimePlatform",
  "metrics": [
    {
      "metric": "memory.used",
      "granularity": 3600000,
      "aggregation": "MEAN"
    },
    {
      "metric": "memory.used",
      "granularity": 600000,
      "aggregation": "MEAN"
    },
    {
      "metric": "threads.blocked",
      "granularity": 3600000,
      "aggregation": "MEAN"
    },
    {
      "metric": "threads.blocked",
      "granularity": 600000,
      "aggregation": "MEAN"
    }
  ],
  "order": { "by": "label", "direction": "ASC" }
}'
```
This above example retrieves JVM entities grouped with the same host name, aggregating memory used and blocked threads, with aggregates on the whole hour timeframe and by the minute.