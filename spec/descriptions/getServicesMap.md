This endpoint retrieves services and connections (call paths) between them for calls in the scope given by the parameters.

## Errata:

The following fields are unsupported but documented in the schema for the result `services`:
- The `applications` field is always missing, even though it is declared as required in the result schema.
- The `maxSeverity` and `numberOfOpenIssues` fields are always missing.
- The `snapshotIds` field is always empty.
