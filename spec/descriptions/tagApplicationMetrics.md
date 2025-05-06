The endpoints of this group retrieve the metrics for defined applications, discovered services and endpoints.
### Mandatory Parameters

**metrics** A list of metric objects that define which metric should be returned, with the defined aggregation. Each metrics objects consists of minimum two items:
1. *metric* select a particular metric to get a list of available metrics query the [catalog endpoint](#operation/getApplicationCatalogMetrics).
2. *aggregation* depending on the selected metric different aggregations are available e.g. SUM, MEAN, P95. The aforementioned [catalog endpoint](#operation/getApplicationCatalogMetrics) gives you the metrics with the available aggregations.

**Note**: The above mentioned list of available metrics with its supported metrics can also be found in the section **Supported Aggregation on Application metrics** below.

### Optional Parameters

**metrics** Default you will get an aggregated metric with for the selected timeframe 

* *granularity* 
   * If it is not set you will get a an aggregated value for the selected timeframe
   * If the granularity is set you will get data points with the specified granularity **in seconds**
    * The granularity should not be greater than the `windowSize` (important: `windowSize` is expressed in **milliseconds**)
    * The granularity should not be set too small relative to the `windowSize` to avoid creating an excessively large number of data points (max 600)
   
**pagination** if you use pagination you most probably want to fix the timeFrame for the retrieved metrics
1. *page* select the page number you want to retrieve
2. *pageSize* set the number of applications you want to return with one query

**order** You can order the returned items alphanumerical by label, either ascending or descending
1. *by* if the granularity is set to 1 you can use the metric name eg. "latency.p95" to order by that value
1. *direction* either ascending or descending

**timeFrame** As in our UI you can specify the timeframe for metrics retrieval.
```
  windowSize           to
     (ms)       (unix-timestamp)
<----------------------|
```

The timeFrame might be adjusted to fit the metric granularity so that there is no partial bucket. For example, if the query timeFrame is 08:02 - 09:02 and the metric granularity is 5 minutes, the timeFrame will be adjusted to 08:05 - 09:00. The adjusted timeFrame will be returned in the response payload. If the query does not have any metric with granularity, a default granularity will be used for adjustment.

To narrow down the result set you have four options to search for an application.

**nameFilter | applicationId | serviceId | endpointId**

* *nameFilter:* filter by name with "contains" semantic.

* *applicationId:* search directly for an application by applicationId 

* *serviceId:* search for applications that include a particular service by serviceId

* *endpointId:* search for applications that include a particular endpoint by endpointId

### Defaults

**metrics**
* *granularity:* 1

**order**
* by application label ascending.

**timeFrame**
```
"timeFrame": {
	"windowSize": 60000,
	"to": {current timestamp}
}
```
**nameFilter | applicationId | serviceId | endpointId**
* no filters are applied in the default call


### Supported Aggregation on Application Metrics

| Metric           | Description                                                                                | Allowed Aggregations |
|------------------|--------------------------------------------------------------------------------------------|----------------------|
| `calls`          | Number of received calls                                                                   | `PER_SECOND`, `SUM`  |
| `erroneousCalls` | The number of erroneous calls                                                              |`PER_SECOND`, `SUM`   |
| `latency`        | Latency of received calls in milliseconds                                                  | `P25`, `P50`, `P75`, `P90`, `P95`, `P98`, `P99`, `SUM`, `MEAN`, `MAX`, `MIN`        |
| `errors`         | Error rate of received calls. A value between 0 and 1                                      | `MEAN`               |
| `applications`   | The number of Application Perspectives                                                     |`DISTINCT_COUNT`      |
| `services`       | The number of Services                                                                     |`DISTINCT_COUNT`      |
| `endpoints`      | The number of Endpoints                                                                    |`DISTINCT_COUNT`      |
| `http.1xx`       | Counts the number of occurrences of HTTP status codes where 100 <= status code <= 199      |`PER_SECOND`, `SUM`   |
| `http.2xx`       | Counts the number of occurrences of HTTP status codes where 200 <= status code <= 299      |`PER_SECOND`, `SUM`   |
| `http.3xx`       | Counts the number of occurrences of HTTP status codes where 300 <= status code <= 399      |`PER_SECOND`, `SUM`   |
| `http.4xx`       | Counts the number of occurrences of HTTP status codes where 400 <= status code <= 499      |`PER_SECOND`, `SUM`   |
| `http.5xx`       | Counts the number of occurrences of HTTP status codes where 500 <= status code <= 599      |`PER_SECOND`, `SUM`   |

