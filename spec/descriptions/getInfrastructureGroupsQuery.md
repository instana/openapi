## Example

Show the 99th percentage of all Docker containers memory usage in a Kubernetes cluster per Kubernetes namespace for the last week.

```bash
curl --request POST \
  --url https://test-instana.instana.io/api/infrastructure-monitoring/explore/groups \
  --header 'Authorization: apiToken xxxxxxxxxxxxxxxx' \
  --header 'Content-Type: application/json' \
  --data '{
	"timeFrame": {
		"to": 1614594081406,
		"windowSize": 604800000
	},
	"tagFilterExpression": {
		"type": "TAG_FILTER",
		"name": "kubernetes.cluster.name",
		"value": "my-cluster",
		"operator": "EQUALS"
	},
    "pagination": {
		"retrievalSize": 200
	},
    "groupBy": ["kubernetes.namespace.name"],
	"type": "docker",
	"metrics": [
		{
			"metric": "memory.usage",
			"aggregation": "P99"
		}
	]
}'
```