This endpoint retrieves the metrics for calls.

## Deprecated Parameters
**tagFilters:** The list of tag filters. It is replaced by **tagFilterExpression**, **includeInternal** and **includeSynthetic**.

## Supported Aggregation on Get Grouped call metrics

| Metric           | Description                                                                                | Allowed Aggregations |
|------------------|--------------------------------------------------------------------------------------------|----------------------|
| `calls`          | Number of received calls                                                                   | `PER_SECOND`, `SUM`  |
| `erroneousCalls` | The number of erroneous calls                                                              |`PER_SECOND`, `SUM`   |
| `latency`        | Latency of received calls in milliseconds                                                  | `P25`, `P50`, `P75`, `P90`, `P95`, `P98`, `P99`, `SUM`, `MEAN`, `MAX`, `MIN`        |
| `errors`         | Error rate of received calls. A value between 0 and 1                                      | `MEAN`               |
| `services`       | The number of Services                                                                     |`DISTINCT_COUNT`      |