The API endpoint retrieves metrics for traces that are grouped in the endpoint or service name.

The supported `groupbyTag` are `trace.endpoint.name` and `trace.service.name`. 

## Supported Aggregation on Get grouped trace metrics

| Metric           | Description                                                                                | Allowed Aggregations |
|------------------|--------------------------------------------------------------------------------------------|----------------------|
| `erroneousCalls` | The number of erroneous calls                                                              |`PER_SECOND`, `SUM`   |
| `latency`        | Latency of received calls in milliseconds                                                  | `P25`, `P50`, `P75`, `P90`, `P95`, `P98`, `P99`, `SUM`, `MEAN`, `MAX`, `MIN`        |
| `errors`         | Error rate of received calls. A value between 0 and 1                                      | `MEAN`               |
