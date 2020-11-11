You can use these API endpoints to manage custom dashboards. We recommend
that you leverage the `Edit as JSON` feature found within our user interface
to construct the desired request payloads. Specifically to help you build
correct widget configurations and access rules.

To identify the correct values for the `relatedId` field of the access rules,
we recommend using the `/api/custom-dashboard/shareable-users` and
`/api/custom-dashboard/shareable-api-tokens` endpoints. These endpoints return
our internal IDs for users and API tokens.