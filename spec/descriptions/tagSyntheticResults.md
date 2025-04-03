The endpoints of this group retrieve the results for defined Synthetic tests.

**Note on names in TagFilter/TagFilterExpression**: From R243, the name used in a TagFilter or a TagFilterExpression has the format: synthetic.\<name\>.
It can be one of the following: synthetic.id (id is the test result id), synthetic.testId,
synthetic.testName, synthetic.locationId, synthetic.applicationId, synthetic.serviceId, synthetic.syntheticType,
synthetic.locationName, and synthetic.locationLabel. If it is a metric name, then the format is: synthetic.metrics\<MetricName\>.
For example, synthetic.metricsResponseTime, synthetic.metricsStatus.

The names used prior to R243 should be considered as deprecated. They will be accepted temporarily and will be removed in an upcoming release.

## Get Synthetic test playback results 
The endpoint returns the aggregated Synthetic test result data

### Mandatory Parameters  

**testId** An array of the unique identifiers of Synthetic tests

**metrics** A list of metric objects that define which metric should be returned, with the defined aggregation. Each metrics objects consists of minimum two items:
1. *metric* select a particular metric. This is the list of available metrics for all types of Synthetic Tests: 
   synthetic.metricsResponseTime (ms), synthetic.metricsResponseSize (bytes), synthetic.metricsStatusCode (an integer represents an HTTP response code, e.g., 200, 401, 500), synthetic.metricsRequestSize (bytes), 
   synthetic.metricsUploadSpeed (bytes per second), synthetic.metricsDownloadSpeed (bytes per second), 
   synthetic.metricsRedirectTime (ms), synthetic.metricsRedirectCount, synthetic.metricsConnectCount, synthetic.metricsStatus (an integer, 1-success or 0-failure), and synthetic.tags (list of custom properties and values). 
   
   The following metrics are only available for the HTTPAction type Synthetic Tests: synthetic.metricsBlocking (bytes), synthetic.metricsDns (bytes), synthetic.metricsConnect (bytes), synthetic.metricsSsl (bytes), 
   synthetic.metricsSending (bytes), synthetic.metricsWaiting (bytes), and synthetic.metricsReceiving (bytes).

   The metric synthetic.customMetrics (list of custom metrics and values) is only available for SSLCertificate and DNS tests.  For SSLCertificate, the custom metrics are returned as metrics.  For DNS, the custom metrics are returned in the *ismDetails* field.

   The metric synthetic.tags adds the latest list of custom properties to the response.

2. *aggregation* Depending on the selected metric, different aggregations are available e.g., SUM, MEAN, P90 (90th percentile), DISTINCT_COUNT, and MAX.  MAX is only allowed for synthetic.tags.

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
1. *by* Use the metric name, e.g. "synthetic.metricsResponseTime", to order by its value
2. *direction* either ascending (ASC) or descending (DESC)

**tagFilters** It serves as a filter to narrow down return results.
It will be replaced by **tagFilterExpression**.

**tagFilterExpression** It serves as a filter to narrow down return results. Its type can be either EXPRESSION or TAG_FILTER with
logical operators AND or OR.

A payload only needs either tagFilters or tagFilterExpression as a filter, not both.

Either tagFilters or tagFilterExpression can specify a custom property by its key and value.
```
"tagFilters":[{
  "name":"synthetic.tags",
  "key":"location",
  "value":"Denver",
  "operator":"EQUALS"
}]
```

To narrow down the result set you have two options to search for a test.

**locationId | applicationId**

* *synthetic.locationId:* filter by locationId

* *synthetic.applicationId:* filter by applicationId

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
    "//comment2": "The granularity values for responseTime and responseSize must be the same"
    "metrics": [
     {
        "aggregation": "MEAN",
        "granularity": 600,    
        "metric": "synthetic.metricsResponseTime"
     },
     {
        "aggregation": "MEAN",
        "granularity": 600,    
        "metric": "synthetic.metricsResponseSize"
     }],
     "timeFrame": {
       "to": 0,
       "windowSize": 1800000  
     }
}
```

## Get a list of Synthetic test playback results (no aggregation)
### Mandatory Parameters
**syntheticMetrics** It is an array of metrics. The available metrics for all types of Synthetic Tests: synthetic.id (a string representing the test result ID), 
synthetic.metricsResponseTime (ms), synthetic.metricsResponseSize (bytes), synthetic.metricsStatusCode (an integer represents an HTTP response code, e.g., 200, 401, 500), synthetic.metricsRequestSize (bytes),
synthetic.metricsUploadSpeed (bytes per second), synthetic.metricsDownloadSpeed (bytes per second),
synthetic.metricsRedirectTime (ms), synthetic.metricsRedirectCount, synthetic.metricsConnectCount, synthetic.metricsStatus (an integer, 1-success or 0-failure), and synthetic.tags (list of custom properties and values).

The following metrics are only available for the HTTPAction type Synthetic Tests: synthetic.metricsBlocking (bytes), synthetic.metricsDns (bytes), synthetic.metricsConnect (bytes), synthetic.metricsSsl (bytes),
synthetic.metricsSending (bytes), synthetic.metricsWaiting (bytes), and synthetic.metricsReceiving (bytes).

The metric synthetic.customMetrics (list of custom metrics and values) is only available for SSLCertificate and DNS tests.  For SSLCertificate, the custom metrics are returned as metrics.  For DNS, the custom metrics are returned in the *ismDetails* field.

The metric synthetic.tags adds the latest list of custom properties to the response.

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
1. *by* Use the metric name, e.g. "synthetic.metricsResponseTime" to order by that value
2. *direction* either ascending (ASC) or descending (DESC)

**tagFilters** It serves as a filter to narrow down return results. 
It will be replaced by **tagFilterExpression**.

**tagFilterExpression** It serves as a filter to narrow down return results. Its type can be either EXPRESSION or TAG_FILTER with 
logical operators AND or OR.

A payload only needs either tagFilters or tagFilterExpression as a filter, not both.

Either tagFilters or tagFilterExpression can specify a custom property by its key and value.
```
"tagFilters":[{
  "name":"synthetic.tags",
  "key":"location",
  "value":"Denver",
  "operator":"EQUALS"
}]
```

### Sample payload to get a list of Synthetic test results with tagFilters
```json
{
  "syntheticMetrics":["synthetic.metricsResponseTime","synthetic.metricsResponseSize"],
  "order":{
    "by":"synthetic.metricsResponseTime",
    "direction":"DESC"
  },
  "tagFilters":[{
    "stringValue":"hYziqsaXSJmQsehOWg1S",
    "name":"synthetic.testId",
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
  "syntheticMetrics":["synthetic.metricsResponseTime","synthetic.metricsResponseSize"],
  "order":{
    "by":"synthetic.metricsResponseTime",
    "direction":"DESC"
  },
  "tagFilterExpression": { 
    "type":"EXPRESSION",
    "logicalOperator":"AND",
    "elements":[{
      "stringValue":"hYziqsaXSJmQsehOWg1S",
      "name":"synthetic.testId",
      "operator":"EQUALS"
    }, {
      "name": "synthetic.locationId", 
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

### Sample payload to get the custom metrics of a Synthetic SSLCertificate test
```json
{
  "syntheticMetrics":["synthetic.customMetrics"],
  "tagFilters":[{
    "stringValue":"dk6yzb9fxCDlB6axIhUu",
    "name":"synthetic.testId",
    "operator":"EQUALS"
  }],
  "timeFrame": {
    "to": 0,
    "windowSize": 172800000
  }
}
```

## Get a list of Synthetic tests with Success Rate and Average Response Time data
The endpoint returns a list of Synthetic tests with Success Rate and Average Response Time result data

### Mandatory Parameters

**metrics**
1. *metric* select a particular metric. Right now, only synthetic.metricsResponseTime (ms) is supported.
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
1. *by* Use the metric name, "synthetic.metricsResponseTime", to order by its value
2. *direction* either ascending (ASC) or descending (DESC)

**tagFilters** It serves as a filter to narrow down return results. The name of a tagFilter is one of the following: 
synthetic.syntheticType, synthetic.locationId, and synthetic.applicationId.
It will be replaced by **tagFilterExpression**.
```
"tagFilters":[{
  "stringValue":"hYziqsaXSJmQsehOWg1S",
  "name":"synthetic.applicationId",
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
    "name": "synthetic.metricsStatus", 
    "operator": "EQUALS", 
    "numberValue": 1
  }, {
    "name": "synthetic.locationId", 
    "operator": "EQUALS", 
    "stringValue":"WnjlKKbgzLDnyGra6PAs"
  }]
}
```

A payload only needs either tagFilters or tagFilterExpression as a filter, not both.

Either tagFilters or tagFilterExpression can specify a custom property by its key and value.
```
"tagFilters":[{
  "name":"synthetic.tags",
  "key":"location",
  "value":"Denver",
  "operator":"EQUALS"
}]
```

To narrow down the result set you have three options to search for a test.

**syntheticType | locationId | applicationId**

* *synthetic.syntheticType:* filter by syntheticType, either HTTPAction or HTTPScript

* *synthetic.locationId:* filter by locationId

* *synthetic.applicationId:* filter by applicationId


Tests can also be filtered by their active state (`true`/`false`) using the custom property label `synthetic.testActive`.
```
"tagFilters": [{ 
  "name":"synthetic.testActive", 
  "operator":"EQUALS",
  "booleanValue": false 
}]
```

### Defaults

**syntheticType | locationId | applicationId**
* no filters are applied in the default call

### Sample payload to get a list of active Synthetic tests with SuccessRate and Average Response Time results
```
{
    "metrics": [
     {
        "aggregation": "MEAN",
        "granularity": 60,    
        "metric": "synthetic.metricsResponseTime"
     }],
     "tagFilterExpression": { 
        "type":"EXPRESSION",
        "logicalOperator":"AND",
        "elements":[{
          "name": "synthetic.locationId", 
          "operator": "EQUALS", 
          "stringValue": "abcdefgXSJmQsehOWg1S"
        }, {
          "name": "synthetic.testActive",
          "operator": "EQUALS",
          "booleanValue": true
        }]
     },
     "timeFrame": {
       "to": 0,
       "windowSize": 3600000  
     }
}
```

## Get a list of Synthetic locations with Last Test Run on (each location) data
The endpoint returns a list of Synthetic locations with Last Test Run on (each location) result data

### Mandatory Parameters

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

**pagination** if you use pagination you should use the same timeFrame for all of the pages you want to query
1. *page* select the page number you want to retrieve
2. *pageSize* set the number of Synthetic locations you want to return with one query

**order** You can order the returned items alphanumerically by label, either ascending or descending
1. *by* Use the metric name, e.g., "location_name", to order by its value
2. *direction* either ascending (ASC) or descending (DESC)

   The sorting can be done on the following metrics: location_name, location_label, status, type, total_tests,
   last_test_run, and namespace

**tagFilters** It serves as a filter to narrow down return results. The name of a tagFilter is one of the following: 
synthetic.locationName, synthetic.locationLabel, and synthetic.locationId.
It will be replaced by **tagFilterExpression**.
```
"tagFilters":[{
  "stringValue":"hYziqsaXSJmQsehOWg1S",
  "name":"synthetic.locationId",
  "operator":"EQUALS"
}]
```

**tagFilterExpression** It serves as a filter to narrow down return results. Its type can be either EXPRESSION or TAG_FILTER with
logical operators AND or OR.
```
"tagFilterExpression": { 
  "type":"EXPRESSION",
  "logicalOperator":"OR",
  "elements":[{
    "name": "synthetic.locationId", 
    "operator": "EQUALS", 
    "stringValue":"WnjlKKbgzLDnyGra6PAs"
  }]
}
```

A payload only needs either tagFilters or tagFilterExpression as a filter, not both.

### Sample payload to get a list of Synthetic locations with Last Test Run on (each location) data
```
{
    "order": {
     	"by": "status", 
     	"direction": "Desc"
     },
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
