This endpoint group exposes the functions that used by the Instana **Analyze Infrastructure** dashboards.
Two of the endpoints provide a [list of entity types](#operation/getAvailablePlugins) and [metrics for an entity type](#operation/getAvailableMetrics).
It is also possible to [search and filter entities](#operation/getEntities) and [aggregate metrics on similar entities](#operation/getEntityGroups).

## Common Parameters

### Mandatory Parameters

**timeFrame** As in the Instana dashboards, you can specify the timeframe for metrics retrieval.
```
  windowSize           to
     (ms)       (unix-timestamp)
<----------------------|
```
The timeFrame might be adjusted to fit the metric granularity so that there is no partial bucket. For example, if the query timeFrame is 08:02 - 09:02 and the metric granularity is 5 minutes, the timeFrame will be adjusted to 08:05 - 09:00. The adjusted timeFrame will be returned in the response payload. If the query does not have any metric with specified granularity, a default granularity will be used for adjustment.

### Optional Parameters

**pagination**
* *offset* specifies the starting point for the data retrieval
* *retrievalSize* sets the number of values to return
* *ingestionTime* this parameter indicates where data retrieval should begin for the next data retrieval request. The results set ingestionTime property from the `cursor` class needs to be used to set this parameter value.

**order**
* *by* metric name or `label`

**tagFilters** As in the Instana dashboards, you can filter by a tag. Query the [infrastructure tag catalog](#operation/getInfrastructureCatalogMetrics) to retrieve a list of available tags.
* *name* The name of the tag as returned by the tag catalog
* *value* The filter value of the tag, possible types are:
  * "STRING" alphanumerical values.  Valid operators: "EQUALS", "CONTAINS", "NOT_EQUAL", "NOT_CONTAIN", "NOT_EMPTY",  "IS_EMPTY"
  * "NUMBER" numerical values. Valid operators: "EQUALS", "LESS_THAN" "GREATER_THAN"
  * "KEY_VALUE_PAIR" 
* *operator* one of the valid operators for the tag filter type *value*

**metrics** A list of objects that specify the metrics to retrieve. Each object must specify at minimum the *metric* and the *aggregation*. 
1. *metric* select a particular metric, available metrics in this context are
   * Latency Mean
   * Error Rate
   * Traces Sum
2. *aggregation* depending on the selected metric different aggregations are available e.g. SUM, MEAN, P95. The aforementioned [catalog endpoint](#operation/getApplicationCatalogMetrics) gives you the metrics with the available aggregations.
3. *granularity* 
   * If granularity is not specified an aggregated value for the selected timeframe is returned.
   * If granularity is specified data points are returned with the specified granularity **in seconds**
    * The granularity should not be greater than the `windowSize` (important: `windowSize` is expressed in **milliseconds**)
    * The granularity should not be set too small relative to the `windowSize` to avoid creating an excessively large number of data points (max 600)
