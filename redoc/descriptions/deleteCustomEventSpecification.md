This endpoint deletes a Custom Event Specification.

By default, the ID of a deleted configuration cannot be reused anymore to enable links in previous Issues or Incidents to stay valid.
However, check out the docs for [updating a configuration](#operation/putCustomEventSpecification) how this default behavior can be changed using the `allowRestore` query parameter.


## Mandatory Parameters:

- **eventSpecificationId (Path Parameter):** A unique identifier for the custom event specification to delete.


# Example:

```
curl --request DELETE 'https://<Host>/api/events/settings/event-specifications/custom/<EventSpecificationId>' \
--header 'Authorization: apiToken <Token>' \
--header 'Content-Type: application/json'
```
