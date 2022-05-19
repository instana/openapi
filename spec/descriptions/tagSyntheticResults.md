The endpoints of this group retrieve the results for defined Synthetic tests.
These endpoints are only available for invited customers for the Synthetic Monitoring Technology Preview.

## Get Synthetic test playback results 
The endpoint returns the aggregated Synthetic test result data

### Mandatory Parameters  

**testId** The unique identifier of a Synthetic test
**metrics** A list of metric objects that define which metric should be returned, with the defined aggregation. Each metrics objects consists of minimum two items:
1. *metric* select a particular metric. This is the list of available metrics for all types of Synthetic Tests: 
   response_time (ms), response_size (bytes), status_code (an integer represents an HTTP response code, e.g., 200, 401, 500), request_size (bytes), 
   upload_speed (bytes per second), download_speed (bytes per second), 
   redirect_time (ms), redirect_count, connect_count, and status (an integer, 1-success or 0-failure). 
   The following metrics are only available for the HTTPAction type Synthetic Tests: blocking (bytes), dns (bytes), connect (bytes), ssl (bytes), 
   sending (bytes), waiting (bytes), and receiving (bytes).
2. *aggregation* Depending on the selected metric, different aggregations are available e.g., SUM, MEAN, P90 (90th percentile), and DISTINCT_COUNT. 

### Optional Parameters

**metrics** By default you will get an aggregated metric for the selected timeframe

* *granularity*
    * If it is not set you will get an aggregated value for the selected timeframe
    * If the granularity is set you will get data points with the specified granularity **in seconds**
    * The granularity should not be greater than the `windowSize` (important: `windowSize` is expressed in **milliseconds**)
    * The granularity should not be set too small relative to the `windowSize` to avoid creating an excessively large number of data points (max 600)
    * The granularity values are the same for all metrics

**pagination** if you use pagination you most probably want to fix the timeFrame for the retrieved metrics
1. *page* select the page number you want to retrieve
2. *pageSize* set the number of Synthetic test results you want to return with one query

**order** You can order the returned items alphanumerical by label, either ascending or descending
1. *by* Use the metric name, e.g. "response_time", to order by its value
2. *direction* either ascending (ASC) or descending (DESC)

**timeFrame** As in our UI you can specify the timeframe for metrics retrieval.
```
  windowSize           to
     (ms)       (unix-timestamp)
<----------------------|
```

The timeFrame might be adjusted to fit the metric granularity so that there is no partial bucket. For example, if the query timeFrame is 08:02 - 09:02 and the metric granularity is 5 minutes, the timeFrame will be adjusted to 08:05 - 09:00. The adjusted timeFrame will be returned in the response payload. If the query does not have any metric with granularity, a default granularity will be used for adjustment.

To narrow down the result set you have three options to search for a test.

**locationId | applicationId**

* *locationId:* filter by locationId

* *applicationId:* filter by applicationId

### Defaults

**metrics**
* *granularity:* 0

**timeFrame**
```
"timeFrame": {
	"windowSize": 60000,
	"to": {current timestamp}
}
```
**locationId | applicationId**
* no filters are applied in the default call

### Sample payload to get a Synthetic test result
```
{
    "testId": "tUmWgvzdo1Q1vpVRpzR5",
    "//comment1": "Get test results from last 30 minutes (windowSize), data are aggregated every 10 minutes (granularity)",
    "//comment2": "The granularity values for response_time and response_size must be the same
    "metrics": [
     {
        "aggregation": "MEAN",
        "granularity": 600,    
        "metric": "response_time"
     },
     {
        "aggregation": "MEAN",
        "granularity": 600,    
        "metric": "response_size"
     }],
     "timeFrame": {
       "to": 0,
       "windowSize": 1800000  
     }
}
```

## Get a list of Synthetic test playback results (no aggregation)
### Mandatory Parameters
**syntheticMetrics** It is an array of metrics. The available metrics for all types of Synthetic Tests: id (a string representing the test result ID), 
response_time (ms), response_size (bytes), status_code (an integer represents an HTTP response code, e.g., 200, 401, 500), request_size (bytes),
upload_speed (bytes per second), download_speed (bytes per second),
redirect_time (ms), redirect_count, connect_count, and status (an integer, 1-success or 0-failure).
The following metrics are only available for the HTTPAction type Synthetic Tests: blocking (bytes), dns (bytes), connect (bytes), ssl (bytes),
sending (bytes), waiting (bytes), and receiving (bytes).

### Optional Parameters
**pagination** if you use pagination you most probably want to fix the timeFrame for the retrieved metrics
1. *page* select the page number you want to retrieve
2. *pageSize* set the number of Synthetic test results you want to return with one query

**order** You can order the returned items alphanumerical by label, either ascending or descending
1. *by* Use the metric name, e.g. "response_time" to order by that value
2. *direction* either ascending (ASC) or descending (DESC)

**timeFrame** As in our UI you can specify the timeframe for metrics retrieval.
```
  windowSize           to
     (ms)       (unix-timestamp)
<----------------------|
```

**tagFilters** It serves as a filter to narrow down return results. The name of a tagFilter is the metric name. 

### Sample payload to get a list of Synthetic test results
```json
{
  "syntheticMetrics":["response_time","response_size"],
  "order":{
    "by":"response_time",
    "direction":"DESC"
  },
  "tagFilters":[{
    "stringValue":"hYziqsaXSJmQsehOWg1S",
    "name":"testId",
    "operator":"EQUALS"
  }],
  "timeFrame": {
    "to": 0,
    "windowSize": 1800000
  }
}
```