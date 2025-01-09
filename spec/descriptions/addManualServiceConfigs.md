Use this API endpoint if one wants to add a manual service configuration. This endpoint requires `CanConfigureServiceMapping` permission. 

One can use `Create or update an API token` endpoint to update the permission by setting `canConfigureServiceMapping` to `true`.
If one wants to enable the permission from Instana UI, go to Settings -> Security & Access -> Access Control -> API Token.
There one can update the existing token or create a new token and set `Customize service rules and endpoint mapping` to `true`.

**This is an experimental endpoint to workaround service mapping issues.**

### Use cases

The manual service configuration APIs enables mapping calls to services using tag filter expressions based on call tags.

There are two use cases on the usage of these APIs:

1. Map to an Unmonitored Service with a Custom Name. For example, Map HTTP calls to different Google domains (`www.ibm.com`, `www.ibm.fr`) into a single service named `IBM` using the `call.http.host tag`.
2. Link Calls to an Existing Monitored Service. For example, Link database calls (`jdbc:mysql://10.128.0.1:3306`) to an existing service like `MySQL@3306` on demo-host by referencing its service ID.

### Important Note

1. Use `tagfilterExpression` to match calls on which the manual service configuration will be applied. **Only call tags are allowed** in the tag filter expression.

2.  Either `unmonitoredServiceName` or `existingServiceId` should be specified in a configuration.