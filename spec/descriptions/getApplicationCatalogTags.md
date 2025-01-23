**Note:** This API Endpoint is deprecated. Use `Get application tag catalog` endpoint instead.

This endpoint retrieves all available tags for your monitored system.

These tags can be used to group metric results.
```
"group": {
  "groupbyTag": "service.name"
}
```

These tags can be used to filter metric results.
```
"tagFilters": [{
	"name": "application.name",
	"operator": "EQUALS",
	"value": "example"
}]
```
