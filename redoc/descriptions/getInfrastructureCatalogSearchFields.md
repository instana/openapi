This endpoint retrieves all available search keywords for dynamic focus queries.

These search fields can be accessed via lucene queries. Each field belongs to a context, e.g. to entity, trace or event data.
Some fields contain a set of possible fixed values, in this case a deviant value is invalid.

```
?query={keyword}:{value}
```
