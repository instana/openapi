The following four endpoints expose our analyze functionality.

## Mandatory Parameters :

**type** 

**group (only for group Endpoints)** It is mandatory to select a tag by which the beacons are grouped for the distinct endpoint call
* *groupByTag* select a tag by which the beacons are grouped 
  * a full list of available tags can be retrieved from [tags catalogue](#operation/getWebsiteCatalogTags)
* *groupByTagSecondLevelKey* tags of type KEY_VALUE_PAIR need a second parameter e.g for `beacon.meta` you would need provide the label you want to groupBy here.


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

**tagFilterExpression** As in the UI you are able to filter your query using tags and operators such as `AND` and `OR`. To get a list of all available tags you can query the [tag catalog](#operation/getWebsiteCatalogTags)
* *name* The name of the tag as returned by the catalog, e.g `beacon.meta`, `beacon.http.path`
* *value* The filter value of the tag, possible types are:
  * "STRING" alphanumerical values, valid operators: "EQUALS", "CONTAINS", "NOT_EQUAL", "NOT_CONTAIN", "NOT_EMPTY",  "IS_EMPTY"
  * "NUMBER" numerical values, valid operators: "EQUALS", "LESS_THAN" "GREATER_THAN"
  * "KEY_VALUE_PAIR" of you are using meta tags `beacon.meta` you can filter for those by setting `yourMetaTagName=foo` in the value field, valid operators: "EQUALS", "CONTAINS", "NOT_EQUAL", "NOT_CONTAIN", "NOT_EMPTY",  "IS_EMPTY"
* *operator* one of the valid operators for the type of the selected tag

**metrics** A list of metric objects that define which metric should be returned, with the defined aggregation. Each metrics objects consists of minimum two items:
1. *metric* select a particular metric, available metrics in this context are
   * Latency Mean
   * Error Rate
2. *aggregation* depending on the selected metric different aggregations are available e.g. SUM, MEAN, P95. The aforementioned [catalogue endpoint](#operation/getWebsiteCatalogMetrics) gives you the metrics with the available aggregations.
3. *granularity* 
   * If it is not set you will get a an aggregated value for the selected timeframe
   * If the granularity is set you will get data points with the specified granularity **in seconds**
    * The granularity should not be greater than the `windowSize` (important: `windowSize` is expressed in **milliseconds**)
    * The granularity should not be set too small relative to the `windowSize` to avoid creating an excessively large number of data points (max 600)
 

## Defaults:

**timeFrame**
```
"timeFrame": {
	"windowSize": 60000,
	"to": {current timestamp}
}
```
