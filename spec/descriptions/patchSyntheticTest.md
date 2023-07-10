This API endpoint updates selected attributes of a Synthetic Test.

- All attributes listed as in the schema, including the required ones, are optional for this call.
- Synthetic Test configuration properties set to null will be removed from the configuration.
- For major updates to the Synthetic Test or to remove main attributes, see "Update a Synthetic test"

## Sample script and payload: 
- A sample script to patch a simple HTTP Script Test to enable it and to switch from multi-scripts to single script.

```
curl -k -v -X PATCH \
https://<Host>/api/synthetics/settings/tests/Ilfs9bW97KkTxuyGtxBF \
-H 'authorization: apiToken <Token>' \
-H 'content-type: application/json' \
-d '{
    "active" : true,
    "configuration" : { 
      "scripts" : null,
      "script" : "//script goes here"
    }
  }'
```