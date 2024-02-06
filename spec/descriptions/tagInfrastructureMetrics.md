This endpoint retrieves the metrics for infrastructure components.

### Mandatory Parameters
**plugin:** Plugins are entities' for which we collect metrics, for example : "Host", "Cassandra node", "Cassandra Connection".

The available plugins are depending on the system you are monitoring. Therefore you will need to [retrieve plugins](#operation/getInfrastructureCatalogPlugins) where we have data for you.

**query or snapshotIds:** choose between dynamic focus query or [snapshotId](#operation/getSnapshots) (a unique identifier the metrics are assigned to)

To make the it easy to get started this endpoint has two modes that can be used for metrics retrieval:
1. Search metrics with a query
  You are using the [Dynamic Focus](https://www.ibm.com/docs/en/instana-observability/current?topic=instana-filtering-dynamic-focus) query to filter the result.
  To get usable search parameters you can either query the search [catalog endpoint](#operation/getInfrastructureCatalogSearchFields) or use the UI

1. Search for metrics for snapshotIds
  For advanced use cases, pagination for example, its recommended to use fixed snapshotIds.

**metrics:** Id of the exact metric you want to retrieve, eg. "cpu.user", "clientrequests.read.mean"

Once you have selected the plugin you can define up to five metrics you want to retrieve with the call.
Please use our [metrics catalog call](#operation/getInfrastructureCatalogMetrics) to get the available metrics for the selected plugin.

### Optional Parameters
**timeFrame** As in our UI you can specify the timeframe for metrics retrieval.
```
  windowSize           to
     (ms)       (unix-timestamp)
<----------------------|
```

**rollup:** Depending on the selected timeFrame its possible to selected the rollup.

The available rollup is depending on two factors:
1. [Retention times](https://docs.instana.io/core_concepts/data_collection/#data-retention)

	For example if you select a to timestamp that is 3 Weeks in the past the most accurate rollup you can query for would be 1min
1. Size of the selected windowSize

	The limitation is that we only return 600 Data points per call, thus if you select a windowSize of 1hour the most accurate rollup you can query for would be 5s

Valid rollups are:

| rollup  | value |
| ------------- | ------------- |
| 1 second  | 1 |
| 5 seconds  | 5  |
| 1 minute  | 60 |
| 5 minutes  | 300  |
| 1 hour  | 3600  |


### Defaults
**timeframe:**
```
"timeFrame": {
	"windowSize": 60000,
	"to": {current timestamp}
}
```

**rollup**: 1

### Limits
1000 Calls per Hour

To keep the response size reasonable the limit is set to 30 retrieved items. To implement pagination see [1]

A maximum of 600 data points are returned per metric.

You can only retrieve metrics [above](https://docs.instana.io/core_concepts/dynamic_graph/) the selected Dynamic Focus filter. Work around can be found under [2]

The following example will return an empty result, because the selected plugin "host" is below the dynamic focus filter "java" :
```
query=entity.selfType:java
plugin=host
metric=cpu.steal
```
### Tips
[1] **Pagination**
Sometimes the query you are interested in returns more than 30 items, you have to use the [find snapshots](#operation/getSnapshots) endpoint to get a full list of Ids for your query and then use the [metrics endpoint](#operation/getInfrastructureMetrics) with the returned snapshotIds


[2] **Application filter**
You can work around the aforementioned limitation by querying one of the crosscutting entities like applications, services and endpoints. For the example above you could create an Application with jvm.version isPresent filter. And search Query then for the created application name
```
query=entity.application.name:"Java Applications"
```
