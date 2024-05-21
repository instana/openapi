This endpoint retrieves Synthetic Locations.

## Optional Parameters:

- **filter** Filters the Synthetic Locations to retrieve only the ones that match the specified filter condition. 
  Users are allowed to specify more than one filter parameter, and they will be combined in a single expression using logical operator 'AND'.
  The filter parameter is formatted as '**_{\<attribute>\<operator>\<value}_**'. For example, '_{label=MyPoP}_'
  
### Supported filter attributes and operators:

| | = | != | \> | < | \>= | <= | Example |
|-|---|----|---|---|---|-|--------------------------------------------------------|
| label | &check; | &check; | - | - | - | - | /api/synthetics/settings/locations?filter={label=MyPoP} |
| displayLabel | &check; | &check; | - | - | - | - | /api/synthetics/settings/locations?filter={displayLabel=My PoP} |
| popVersion | &check; | &check; | - | - | - | - | /api/synthetics/settings/tests?filter={popVersion=1.1.9} |
| description | &check; | &check; | - | - | - | - | /api/synthetics/settings/tests?filter={description=My Test PoP} |
| locationType | &check; | &check; | - | - | - | - | /api/synthetics/settings/locations?filter={locationType=Private} |
| playbackCapabilities.syntheticType | &check; | &check; | - | - | - | - | /api/synthetics/settings/locations?filter={playbackCapabilities.syntheticType=HTTPAction} |
| playbackCapabilities.browserType | &check; | &check; | - | - | - | - | /api/synthetics/settings/locations?filter={playbackCapabilities.browserType=chrome} |
| configuration.clusterName | &check; | &check; | - | - | - | - | /api/synthetics/settings/locations?filter={configuration.clusterName=qa_cluster} |
| configuration.namespace | &check; | &check; | - | - | - | - | /api/synthetics/settings/locations?filter={configuration.namespace=test_pop} |
| customProperties.\<all properties> | &check; | &check; | - | - | - | - | /api/ynthetics/settings/locations?filter={customProperty.usage=Test} |
| createdAt | &check; | &check; | &check; | &check; | &check; | &check; | /api/synthetics/settings/locations?filter={createdAt>1715190462000} |
| modifiedAt | &check; | &check; | &check; | &check; | &check; | &check; | /api/synthetics/settings/locations?filter={modifiedAt<=1715190462000} |
| observerdAt | &check; | &check; | &check; | &check; | &check; | &check; | /api/synthetics/settings/locations?filter={observedAt>=1715190462000} |

