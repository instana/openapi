Searching for answers and best pratices? Check our [IBM Instana Community](https://community.ibm.com/community/user/aiops/communities/community-home?CommunityKey=58f324a3-3104-41be-9510-5b7c413cc48f).

## Instana REST API documentation

### Overview
The Instana REST API provides programmatic access to the Instana platform. It can be used to retrieve data available through the Instana UI Dashboard -- metrics, events, traces, etc -- and also to automate configuration tasks such as user management.

#### Navigating the API Docs
The API endpoints are grouped by product area and functionality. This generally maps to how our UI Dashboard is organized making it easier to locate which endpoints you'd use to fetch the data you see visualized in our UI. These areas include:
- Websites & Mobile Apps
- (Business Monitoring)
- Applications
- (Platforms)
- Infrastructure
- Synthetic Monitoring
- (Analytics)
- Events
- Automation
- Service Levels
- Settings
- etc

#### Rate Limiting
A rate limit is applied to API usage. Up to 5,000 calls per hour can be made. How many remaining calls can be made and when this call limit resets, can inspected via three headers that are part of the responses of the API server.

**X-RateLimit-Limit:** Shows the maximum number of calls that may be executed per hour.

**X-RateLimit-Remaining:** How many calls may still be executed within the current hour.

**X-RateLimit-Reset:** Time when the remaining calls will be reset to the limit. For compatibility reasons with other rate limited APIs, this date is not the date in milliseconds, but instead in seconds since 1970-01-01T00:00:00+00:00.

#### Further Reading
We provide additional documentation for our REST API in our [product documentation](https://www.ibm.com/docs/en/instana-observability/current?topic=apis-web-rest-api). Here you'll also find some common queries for accessing data using our API endpoints.

### Getting Started with the REST API

#### API base URL
The base URL for an specific instance of Instana can be determined using the tenant and unit information.
- `base`: This is the base URL of a tenant unit, e.g. `https://test-example.instana.io`. This is the same URL that is used to access the Instana user interface.
- `apiToken`: Requests against the Instana API require valid API tokens. An initial API token can be generated via the Instana user interface. Any additional API tokens can be generated via the API itself.

#### Curl Example
Here is an Example to use the REST API with Curl. First lets get all the available metrics with possible aggregations with a GET call.

```bash
curl --request GET \
  --url https://test-instana.instana.io/api/application-monitoring/catalog/metrics \
  --header 'authorization: apiToken xxxxxxxxxxxxxxxx'
```

Next we can get every call grouped by the endpoint name that has an error count greater then zero. As a metric we could get the mean error rate for example.

```bash
curl --request POST \
  --url https://test-instana.instana.io/api/application-monitoring/analyze/call-groups \
  --header 'authorization: apiToken xxxxxxxxxxxxxxxx' \
  --header 'content-type: application/json' \
  --data '{
  "group":{
      "groupbyTag":"endpoint.name"
  },
  "tagFilters":[
  	{
  		"name":"call.error.count",
  		"value":"0",
  		"operator":"GREATER_THAN"
  	}
  ],
  "metrics":[
  	{
  		"metric":"errors",
  		"aggregation":"MEAN"
  	}
  ]
  }'
```




## Generating REST API clients

The API is specified using the [OpenAPI v3](https://github.com/OAI/OpenAPI-Specification) (previously known as Swagger) format.
You can download the current specification at our [GitHub API documentation](https://instana.github.io/openapi/openapi.yaml).

OpenAPI tries to solve the issue of ever-evolving APIs and clients lagging behind. Please make sure that you always use the latest version of the generator, as a number of improvements are regularly made.
To generate a client library for your language, you can use the [OpenAPI client generators](https://github.com/OpenAPITools/openapi-generator).

### Go
For example, to generate a client library for Go to interact with our backend, you can use the following script; mind replacing the values of the `UNIT_NAME` and `TENANT_NAME` environment variables using those for your tenant unit:

```bash
#!/bin/bash

### This script assumes you have the `java` and `wget` commands on the path

export UNIT_NAME='myunit' # for example: prod
export TENANT_NAME='mytenant' # for example: awesomecompany

//Download the generator to your current working directory:
wget https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/4.3.1/openapi-generator-cli-4.3.1.jar -O openapi-generator-cli.jar --server-variables "tenant=${TENANT_NAME},unit=${UNIT_NAME}"

//generate a client library that you can vendor into your repository
java -jar openapi-generator-cli.jar generate -i https://instana.github.io/openapi/openapi.yaml -g go \
    -o pkg/instana/openapi \
    --skip-validate-spec

//(optional) format the Go code according to the Go code standard
gofmt -s -w pkg/instana/openapi
```

The generated clients contain comprehensive READMEs, and you can start right away using the client from the example above:

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

	tags, _, err := client.ApplicationCatalogApi.GetApplicationTagCatalog(auth)
	if err != nil {
		fmt.Fatalf("Error calling the API, aborting.")
	}

	for _, tag := range tags {
		fmt.Printf("%s (%s): %s\n", tag.Category, tag.Type, tag.Name)
	}
}
```

### Java
Download the latest openapi generator cli:
```
wget https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/4.3.1/openapi-generator-cli-4.3.1.jar -O openapi-generator-cli.jar
```

A list for calls for different java http client implementations, which creates a valid generated source code for our spec.
```
//Nativ Java HTTP Client
java -jar openapi-generator-cli.jar generate -i https://instana.github.io/openapi/openapi.yaml -g java -o pkg/instana/openapi --skip-validate-spec  -p dateLibrary=java8 --library native

//Spring WebClient
java -jar openapi-generator-cli.jar generate -i https://instana.github.io/openapi/openapi.yaml -g java -o pkg/instana/openapi --skip-validate-spec  -p dateLibrary=java8,hideGenerationTimestamp=true --library webclient

//Spring RestTemplate
java -jar openapi-generator-cli.jar generate -i https://instana.github.io/openapi/openapi.yaml -g java -o pkg/instana/openapi --skip-validate-spec  -p dateLibrary=java8,hideGenerationTimestamp=true --library resttemplate

```
