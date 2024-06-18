This API updates the endpoint associations of a Synthetic Credential.

- Credential values cannot be patched.
- Credentials can be associated to multiple application ids.
- Patching a credential association will replace the entire array with the full set of values provided.

## Sample script and payload: 
- A sample script to patch a DB2 Admin password and associate it to application ids 'Ss2FBjSTQVef5LsqhPiYkg' and 'KJ8MdZVqK4odMUoBaClH'.

```
curl -k -v -X PATCH \
https://<Host>/api/synthetics/settings/credentials/associations/db2AdminPwd \
-H 'authorization: apiToken <Token>' \
-H 'content-type: application/json' \
-d '{
    "applications" : [ "Ss2FBjSTQVef5LsqhPiYkg", "KJ8MdZVqK4odMUoBaClH" ]
  }'
```