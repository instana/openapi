Use this API endpoint to update a Synthetic Smart Alert by ID. Effectively, it creates a new revision instead of replacing the previous configuration.

#### Example

```bash
curl -k --request POST \
  --url https://<Host>/api/events/settings/global-alert-configs/synthetics/<ID> \
  --header 'authorization: apiToken <Token>' -H 'Content-Type: application/json' \
  --data '{
      "id":"<ID>",
      "name":"Updated Synthetics Smart Alert via API",
      "description":"Synthetic test failed.",
      "syntheticTestIds":["CKAGfbW0xMakCNUHlVlr"],
      "severity":5,
      "rule":{"alertType":"failure","metricName":"status"},
      "alertChannelIds":["qyCAhNzNnYPCzzmm"],
      "timeThreshold":{"type":"violationsInSequence","violationsCount":1}
    }'
```
