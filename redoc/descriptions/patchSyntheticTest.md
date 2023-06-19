This API endpoint updates selected attributes of a Synthetic Test.

- All attributes listed as in the schema, including the required ones, are optional for this call.

## Sample script and payload: 
- A sample script to patch a simple Ping API test to disable it.

```
curl -k -v -X PATCH \
https://<Host>/api/synthetics/settings/tests/Ilfs9bW97KkTxuyGtxBF \
-H 'authorization: apiToken <Token>' \
-H 'content-type: application/json' \
-d '{
    "active":false
  }'
```