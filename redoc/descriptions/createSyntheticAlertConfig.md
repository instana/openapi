Use this API endpoint to create a Synthetic Smart Alert.

#### Example

```bash
curl -k --request POST \
  --url https://<Host>/api/events/settings/global-alert-configs/synthetics \
  --header 'authorization: apiToken <Token>' -H 'Content-Type: application/json' \
  --data '{
      "name":"Synthetics Smart Alert via API",
      "description":"Synthetic test failed at least 3 times in sequence.",
      "syntheticTestIds":["CKAGfbW0xMakCNUHlVlr"],
      "severity":10,
      "rule":{"alertType":"failure","metricName":"status"},
      "alertChannelIds":["qyCAhNzNnYPCzzmm"],
      "timeThreshold":{"type":"violationsInSequence","violationsCount":3}
    }'
```
