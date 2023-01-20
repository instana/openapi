This endpoint group exposes the functions that are used by the Instana **Analyze Infrastructure** dashboards.
Two of the endpoints provide a [list of entity types](#operation/getAvailablePlugins) and [metrics for an entity type](#operation/getAvailableMetrics).
It is also possible to [search and filter entities](#operation/getEntities) and [aggregate metrics on similar entities](#operation/getEntityGroups).

## Important notes

### Timeframe

**timeFrame** As in the Instana dashboards, you can specify the timeframe for metrics retrieval.
```
  windowSize           to
     (ms)       (unix-timestamp)
<----------------------|
```
The timeFrame might be adjusted to fit the metric granularity so that there is no partial bucket. For example, if the query timeFrame is 08:02 - 09:02 and the metric granularity is 5 minutes, the timeFrame will be adjusted to 08:05 - 09:00. The adjusted timeFrame will be returned in the response payload. If the query does not have any metric with specified granularity, a default granularity will be used for adjustment.

### Metrics

**metric** refers to the metric name. Query the [list of available metrics](#operation/getAvailableMetrics) for existing metrics on an entity type.
This is to be used when requesting metrics or when ordering by a metric. For **order.by**, `label` may also be used.

### Filtering

As in the Instana dashboards, you can **filter by a tag**. Query the [infrastructure tag catalog](#operation/getInfrastructureCatalogMetrics) to retrieve a list of available tags.