The endpoints of this group retrieve the results for defined Synthetic tests.
These endpoints are only available for invited customers for the Synthetic Monitoring Technology Preview.

## Get Synthetic test playback results 
The endpoint returns the aggregated Synthetic test result data

### Mandatory Parameters  

**testId** An array of the unique identifiers of Synthetic tests

**metrics** A list of metric objects that define which metric should be returned, with the defined aggregation. Each metrics objects consists of minimum two items:
1. *metric* select a particular metric. This is the list of available metrics for all types of Synthetic Tests: 
   response_time (ms), response_size (bytes), status_code (an integer represents an HTTP response code, e.g., 200, 401, 500), request_size (bytes), 
   upload_speed (bytes per second), download_speed (bytes per second), 
   redirect_time (ms), redirect_count, connect_count, and status (an integer, 1-success or 0-failure). 
   The following metrics are only available for the HTTPAction type Synthetic Tests: blocking (bytes), dns (bytes), connect (bytes), ssl (bytes), 
   sending (bytes), waiting (bytes), and receiving (bytes).
2. *aggregation* Depending on the selected metric, different aggregations are available e.g., SUM, MEAN, P90 (90th percentile), and DISTINCT_COUNT. 

**timeFrame** As in our UI you can specify the timeframe for metrics retrieval.
```
  windowSize           to
     (ms)       (unix-timestamp)
<----------------------|
```
The timeFrame might be adjusted to fit the metric granularity so that there is no partial bucket. For example, if the query timeFrame is 08:02 - 09:02 and the metric granularity is 5 minutes, the timeFrame will be adjusted to 08:05 - 09:00. The adjusted timeFrame will be returned in the response payload. If the query does not have any metric with granularity, a default granularity will be used for adjustment.

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

To narrow down the result set you have two options to search for a test.

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
    "testId": ["tUmWgvzdo1Q1vpVRpzR5", "Pg0Q1UqHRd7OMysohVLd"],
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

**timeFrame** As in our UI you can specify the timeframe for metrics retrieval.
```
  windowSize           to
     (ms)       (unix-timestamp)
<----------------------|
```

### Optional Parameters
**pagination** if you use pagination you most probably want to fix the timeFrame for the retrieved metrics
1. *page* select the page number you want to retrieve
2. *pageSize* set the number of Synthetic test results you want to return with one query

**order** You can order the returned items alphanumerical by label, either ascending or descending
1. *by* Use the metric name, e.g. "response_time" to order by that value
2. *direction* either ascending (ASC) or descending (DESC)

**tagFilters** It serves as a filter to narrow down return results. The name of a tagFilter is the metric name. 
It will be replaced by **tagFilterExpression**.

**tagFilterExpression** It serves as a filter to narrow down return results. Its type can be either EXPRESSION or TAG_FILTER with 
logical operators AND or OR.`

A payload only needs either tagFilters or tagFilterExpression as a filter, not both. 

### Sample payload to get a list of Synthetic test results with tagFilters
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

### Sample payload to get a list of Synthetic test results with tagFilterExpression
```json
{
  "syntheticMetrics":["response_time","response_size"],
  "order":{
    "by":"response_time",
    "direction":"DESC"
  },
  "tagFilterExpression": { 
    "type":"EXPRESSION",
    "logicalOperator":"AND",
    "elements":[{
      "stringValue":"hYziqsaXSJmQsehOWg1S",
      "name":"testId",
      "operator":"EQUALS"
    }, {
      "name": "location_id", 
      "operator": "EQUALS", 
      "stringValue": "abcdefgXSJmQsehOWg1S"
    }]
  },
  "timeFrame": {
    "to": 0,
    "windowSize": 1800000
  }
}
```

## Get a list of Synthetic tests with Success Rate and Average Response Time data
The endpoint returns a list of Synthetic tests with Success Rate and Average Response Time result data

### Mandatory Parameters

**metrics**
1. *metric* select a particular metric. Right now, only response_time (ms) is supported.
2. *aggregation* MEAN
3. *granularity* 60

**timeFrame** As in our UI you can specify the timeframe for metrics retrieval.
```
  windowSize           to
     (ms)       (unix-timestamp)
<----------------------|

"timeFrame": {
	"windowSize": 60000,
	"to": {current timestamp}
}
```

### Optional Parameters

**pagination** if you use pagination you most probably want to fix the timeFrame for the retrieved metrics
1. *page* select the page number you want to retrieve
2. *pageSize* set the number of Synthetic test results you want to return with one query

**order** You can order the returned items alphanumerical by label, either ascending or descending
1. *by* Use the metric name, "response_time", to order by its value
2. *direction* either ascending (ASC) or descending (DESC)

**tagFilters** It serves as a filter to narrow down return results. The name of a tagFilter is one of the following: synthetic_type, location_id, and application_id.
It will be replaced by **tagFilterExpression**.
```
"tagFilters":[{
  "stringValue":"hYziqsaXSJmQsehOWg1S",
  "name":"application_id",
  "operator":"EQUALS"
}]
```

**tagFilterExpression** It serves as a filter to narrow down return results. Its type can be either EXPRESSION or TAG_FILTER with
logical operators AND or OR.
```
"tagFilterExpression": { 
  "type":"EXPRESSION",
  "logicalOperator":"AND",
  "elements":[{
    "name": "status", 
    "operator": "EQUALS", 
    "numberValue": 1
  }, {
    "name": "location_id", 
    "operator": "EQUALS", 
    "stringValue":"WnjlKKbgzLDnyGra6PAs"
  }]
}
```

A payload only needs either tagFilters or tagFilterExpression as a filter, not both.

To narrow down the result set you have three options to search for a test.

**synthetic_type | location_id | application_id**

* *synthetic_type:* filter by syntheticType, either HTTPAction or HTTPScript

* *location_id:* filter by locationId

* *application_id:* filter by applicationId

### Defaults

**synthetic_type | location_id | application_id**
* no filters are applied in the default call

### Sample payload to get a list of Synthetic tests with SuccessRate and Average Response Time results
```
{
    "metrics": [
     {
        "aggregation": "MEAN",
        "granularity": 60,    
        "metric": "response_time"
     }],
     "timeFrame": {
       "to": 0,
       "windowSize": 3600000  
     }
}
```

## Get Synthetic test playback result detail data

### Query Parameters
**type** The type of the detailed data. Its value is one of these types: SUBTRANSACTIONS, LOGS, and HAR.

**name** The name of the file to be retrieved, if more than one file available for the same type. Used when the type equals to LOGS or IMAGES

## Download a Synthetic test playback result detail data file

### Query Parameter
**type** The type of a single compressed file. Its value is one of these types: SUBTRANSACTIONS, LOGS, IMAGES, VIDEOS, and HAR.