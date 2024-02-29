This API endpoint creates a credential to be used on Synthetic API Script Tests.

## Mandatory Parameters:

- **credentialName** The name identifying the credential. Credential names must start with a letter and can only contain letters, numbers and underscores. Maximum length is 64.

- **credentialValue:** Value of the credential to be used on the API Script execution. Credential values are stored encrypted and cannot be queried after creation.


## Sample script and payload:
- A sample script to create a new credential

```
curl -k -v -X POST \
https://<Host>/api/synthetics/settings/credentials \
-H 'authorization: apiToken <Token>' \
-H 'content-type: application/json' \
-d '{
    "credentialName" : "user1_password", 
    "credentialValue" : "123456"
  }'
```
