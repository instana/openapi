Use this API endpoint if one wants to create a new Application Perspective. This endpoint requires `canConfigureApplications` permission. 

One can use `Create or update an API token` endpoint to update the permission by setting `canConfigureApplications` to `true`.
If one wants to enable the permission from Instana UI, go to Settings -> Security & Access -> Access Control -> API Token.
There one can update the existing token or create a new token and set `Configuration of applications` to `true`.


## Deprecated Parameters
**matchSpecification:** A binary tree sturcture of match expression connected with binary operator AND or OR. It is replaced by **tagFilterExpression** which is also used in Application Analyze API endpoints.