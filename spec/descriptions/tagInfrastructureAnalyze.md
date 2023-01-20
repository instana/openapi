This endpoint group exposes the functions that used by the Instana **Analyze Infrastructure** dashboards.
Two of the endpoints provide a [list of entity types](#operation/getAvailablePlugins) and [metrics for an entity type](#operation/getAvailableMetrics).
It is possible to [search and filter entities](#operation/getEntities) and even to [aggregate metrics on similar entities](#operation/getEntityGroups)

## Common Parameters

### Mandatory Parameters

**timeFrame** As in our UI you can specify the timeframe for metrics retrieval.
```
  windowSize           to
     (ms)       (unix-timestamp)
<----------------------|
```
The timeFrame might be adjusted to fit the metric granularity so that there is no partial bucket. For example, if the query timeFrame is 08:02 - 09:02 and the metric granularity is 5 minutes, the timeFrame will be adjusted to 08:05 - 09:00. The adjusted timeFrame will be returned in the response payload. If the query does not have any metric with granularity, a default granularity will be used for adjustment.

### Optional Parameters

**pagination**
* *offset* set the starting point for the data retrieval
* *retrievalSize* you set the number of returned values
* *ingestionTime* if you want to paginate through your result set you are interested in having the data for a fixed time point, the results set has a `cursor` class that has a ingestionTime property that indicates what you have to enter here.

**order**
* *by* metric name or `label`

**tagFilters** As in the UI you able to filter your query by a tag. To get a list of all available tags you can query the [infrastructure tag catalog](#operation/getInfrastructureCatalogMetrics)
* *name* The name of the tag as returned by the catalog
* *value* The filter value of the tag, possible types are:
  * "STRING" alphanumerical values, valid operators: "EQUALS", "CONTAINS", "NOT_EQUAL", "NOT_CONTAIN", "NOT_EMPTY",  "IS_EMPTY"
  * "NUMBER" numerical values, valid operators: "EQUALS", "LESS_THAN" "GREATER_THAN"
  * "KEY_VALUE_PAIR" 
* *operator* one of the valid operators for the type of the selected tag

**metrics** A list of metric objects that define which metric should be returned, with the defined aggregation. Each metrics objects consists of minimum two items:
1. *metric* select a particular metric, available metrics in this context are
   * Latency Mean
   * Error Rate
   * Traces Sum
2. *aggregation* depending on the selected metric different aggregations are available e.g. SUM, MEAN, P95. The aforementioned [catalog endpoint](#operation/getApplicationCatalogMetrics) gives you the metrics with the available aggregations.
3. *granularity* 
   * If it is not set you will get a an aggregated value for the selected timeframe
   * If the granularity is set you will get data points with the specified granularity **in seconds**
    * The granularity should not be greater than the `windowSize` (important: `windowSize` is expressed in **milliseconds**)
    * The granularity should not be set too small relative to the `windowSize` to avoid creating an excessively large number of data points (max 600)
