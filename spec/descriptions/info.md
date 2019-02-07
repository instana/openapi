## Agent REST API
### Event SDK REST Web Service
Using the Event SDK REST Web Service, it is possible to integrate custom health checks and other event sources into Instana. Each one running the Instana Agent can be used to feed in manual events. The agent has an endpoint which listens on `http://localhost:42699/com.instana.plugin.generic.event` and accepts the following JSON via a POST request:

```json
{
    "title": <string>,
    "text": <string>,
    "severity": <integer> , -1, 5 or 10
    "timestamp": <integer>, timestamp in milliseconds from epoch
    "duration": <integer>, duration in milliseconds
}
```

*Title* and *text* are used for display purposes.

*Severity* is an optional integer of -1, 5 and 10. A value of -1 or EMPTY will generate a Change. A value of 5 will generate a *warning Issue*, and a value of 10 will generate a *critical Issue*.

When absent, the event is treated as a change without severity. *Timestamp* is the timestamp of the event, but it is optional, in which case the current time is used. *Duration* can be used to mark a timespan for the event. It also is optional, in which case the event will be marked as "instant" rather than "from-to."

The endpoint also accepts a batch of events, which then need to be given as an array:

```json
[
    {
    // event as above
    },
    {
    // event as above
    }
]
```

#### Ruby Example

```ruby
duration = (Time.now.to_f * 1000).floor - deploy_start_time_in_ms
payload = {}
payload[:title] = 'Deployed MyApp'
payload[:text] = 'pglombardo deployed MyApp@revision'
payload[:duration] = duration

uri = URI('http://localhost:42699/com.instana.plugin.generic.event')
req = Net::HTTP::Post.new(uri, 'Content-Type' => 'application/json')
req.body = payload.to_json
Net::HTTP.start(uri.hostname, uri.port) do |http|
    http.request(req)
end
```

#### Curl Example

```bash
curl -XPOST http://localhost:42699/com.instana.plugin.generic.event -H "Content-Type: application/json" -d '{"title":"Custom API Events ", "text": "Failure Redeploying Service Duration", "duration": 5000, "severity": -1}'
```

#### PowerShell Example

For Powershell you can either use the standard Cmdlets `Invoke-WebRequest` or `Invoke-RestMethod`. The parameters to be provided are basically the same.

```bash
Invoke-RestMethod
    -Uri http://localhost:42699/com.instana.plugin.generic.event
    -Method POST
    -Body '{"title":"PowerShell Event ", "text": "You used PowerShell to create this event!", "duration": 5000, "severity": -1}'
```

```bash
Invoke-WebRequest
    -Uri http://localhost:42699/com.instana.plugin.generic.event
    -Method Post
    -Body '{"title":"PowerShell Event ", "text": "You used PowerShell to create this event!", "duration": 5000, "severity": -1}'
```
## Backend REST API
The Instana API allows retrieval and configuration of key data points. Among others, this API enables automatic reaction and further analysis of identified incidents as well as reporting capabilities.

The API documentation referes to two crucial parameters that you need to know about before reading further:
base: This is the base URL of a tenant unit, e.g. `https://test-example.instana.io`. This is the same URL that is used to access the Instana user interface.
apiToken: Requests against the Instana API require valid API tokens. An initial API token can be generated via the Instana user interface. Any additional API tokens can be generated via the API itself.

### Example of a REST API call with Curl

This is an example to get the metrics of traces grouped by a certain tag.
First you can checkout all possible group tags and metrics with:

```bash
curl --request GET \
  --url https://test-instana.instana.io/api/application-monitoring/catalog/tags \
  --header 'authorization: apiToken xxxxxxxxxxxxxxxx'

curl --request GET \
    --url https://test-instana.instana.io/api/application-monitoring/catalog/metrics \
    --header 'authorization: apiToken xxxxxxxxxxxxxxxx'
```

Then you are able to use a groupbyTag and up to five metrics to get a list of items with the metrics.

```bash
curl --request POST \
  --url https://test-instana.instana.io/api/application-monitoring/analyze/trace-groups \
  --header 'authorization: apiToken xxxxxxxxxxxxxxxx' \
  --header 'content-type: application/json' \
  --data '{
    "group":{
      "groupbyTag":"trace.name"
    },
    "metrics":[{
      "metric":"traces", "aggregation":"SUM","granularity":1
    }]
  }'
```


### Rate Limiting
A rate limit is applied to API usage. Up to 5,000 calls per hour can be made. How many remaining calls can be made and when this call limit resets, can inspected via three headers that are part of the responses of the API server.

**X-RateLimit-Limit:** Shows the maximum number of calls that may be executed per hour.

**X-RateLimit-Remaining:** How many calls may still be executed within the current hour.

**X-RateLimit-Reset:** Time when the remaining calls will be reset to the limit. For compatibility reasons with other rate limited APIs, this date is not the date in milliseconds, but instead in seconds since 1970-01-01T00:00:00+00:00.

## Generating REST API clients

The API is specified using the [OpenAPI v3](https://github.com/OAI/OpenAPI-Specification) (previously known as Swagger) format. You can download the current specification at our [GitHub API documentation](https://instana.github.io/openapi/openapi.yaml).

OpenAPI tries to solve the issue of ever-evolving APIs and clients lagging behind. To generate a client library for your language, you can use the [OpenAPI client generators](https://github.com/OpenAPITools/openapi-generator).

To generate a client library for Go to interact with our backend, you can use the following script (you need a JDK and `wget`):

```bash
# Download the generator to your current working directory:
wget http://central.maven.org/maven2/org/openapitools/openapi-generator-cli/3.2.3/openapi-generator-cli-3.2.3.jar -O openapi-generator-cli.jar

# generate a client library that you can vendor into your repository
java -jar openapi-generator-cli.jar generate -i https://instana.github.io/openapi/openapi.yaml -g go \
    -o pkg/instana/openapi \
    --skip-validate-spec

# (optional) format the Go code according to the Go code standard
gofmt -s -w pkg/instana/openapi
```

The generated clients contain comprehensive READMEs. To use the client from the example above, you can start right away:

```go
import instana "./pkg/instana/openapi"

// readTags will read all available application monitoring tags along with their type and category
func readTags() {
	configuration := instana.NewConfiguration()
	configuration.Host = "tenant-unit.instana.io"
	configuration.BasePath = "https://tenant-unit.instana.io"

	client := instana.NewAPIClient(configuration)
	auth := context.WithValue(context.Background(), instana.ContextAPIKey, instana.APIKey{
		Key:    apiKey,
		Prefix: "apiToken",
	})

	tags, _, err := client.ApplicationCatalogApi.GetTagsForApplication(auth)
	if err != nil {
		fmt.Fatalf("Error calling the API, aborting.")
	}

	for _, tag := range tags {
		fmt.Printf("%s (%s): %s\n", tag.Category, tag.Type, tag.Name)
	}
}
```
