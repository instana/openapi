The following four endpoints expose our analyze functionality.

Part of this are two group endpoints to retrieve metrics for traces and calls rolled up and filtered individually. 

Furthermore you can [search and filter all traces](#operation/getTraces) and retrieve [all details](#operation/getTrace) attached to the trace.

## Mandatory Parameters (only for group Endpoints):

**group** It is mandatory to select a tag by which the calls and traces are grouped for the distinct endpoint call
* *groupByTag* select a tag by which the calls and traces are grouped 
  * a full list of available tags can be retrieved from [tags catalogue](#operation/getTagsForApplication)
  * for the trace endpoint only two tags are reasonable and working: `trace.endpoint.name` and `trace.service.name` which indicate the entry endpoint or service for the trace
* *groupByTagSecondLevelKey* tags of type KEY_VALUE_PAIR need a second parameter e.g for `kubernetes.deployment.label` you would need provide the label you want to groupBy here.

## Optional Parameters:

**pagination**
* *offset* set the starting point for the data retrieval
* *retrievalSize* you set the number of returned values
* *ingestionTime* if you want to paginate through your result set you are interested in having the data for a fixed time point, the results set has a `cursor` class that has a ingestionTime property that indicates what you have to enter here.

**order**

**timeFrame** As in our UI you can specify the timeframe for metrics retrieval.
```
  windowSize           to
     (ms)       (unix-timestamp)
<----------------------|
```

**tagFilters** As in the UI you able to filter your query by a tag. To get a list of all available tags you can query the [tag catalog](#operation/getApplicationCatalogTags)
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
2. *aggregation* depending on the selected metric different aggregations are available e.g. SUM, MEAN, P95. The aforementioned [catalogue endpoint](#operation/getApplicationCatalogMetrics) gives you the metrics with the available aggregations.
3. *granularity* 
   * if it is not set you will get a an aggregated value for the selected timeframe. 
   * if the granularity is set you will get data points with the specified granularity in seconds
   * The value can be selected freely between 1 - selected windowSize.
 

## Defaults:

**timeFrame**
```
"timeFrame": {
	"windowSize": 60000,
	"to": {current timestamp}
}
```
