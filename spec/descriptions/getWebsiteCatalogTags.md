This endpoint retrieves all available tags for your monitored system.

These tags can be used to group metric results.
```
"group": {
  "groupbyTag": "beacon.page.name"
}
```

These tags can be used to filter metric results.
```
"tagFilters": [{
	"name": "beacon.website.name",
	"operator": "EQUALS",
	"value": "example"
}]
```
