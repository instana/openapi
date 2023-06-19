This endpoint retrieves all available metric definitions of the requested plugin.

### Path Parameters:

**plugin** The plugin id from [available plugins](#operation/getInfrastructureCatalogPlugins)

### Optional Parameters:

**filter** You can restrict the returned metric definitions by passing a filter.

* `custom` to retrieve custom metric definitions only.
* `builtin` to retrieve built-in metric definitions only.
