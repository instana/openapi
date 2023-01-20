This endpoint retrieves entities for a given entity type along with the requested metrics.

```
curl --location --request POST 'https://<Host>/api/infrastructure-monitoring/analyze/entities' \
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
  "order": { "by": "label", "direction": "ASC" },
  "pagination": { "retrievalSize": 200, "fullData": false },
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
  ]
}'
```
The above example retrieves JVM entities ordered by label with metrics on memory and threads aggregated the whole hour timeframe and aggregated by the minute.