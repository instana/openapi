Retrieve the list of all groups on the tenant together with the `Permission Set` for the tenant unit.

The `Permission Set` object contains a set of permissions applied to the group.

In case `permissions` include the entry e.g. `LIMITED_APPLICATIONS_SCOPE`, this group will have limited access to application area.

The areas are included inside the `permissionSet`.

The scopeRoleId is a fixed value for each area type:

| Area                    | value         |
| ----------------------- | ------------- |
| applicationIds          | -100          |
| kubernetesClusterUUIDs  | -200          |
| kubernetesNamespaceUIDs | -300          |
| websiteIds              | -400          |
| mobileAppIds            | -500          |
| infraDfqFilter          | -600          |

For example:

```
[
    {
        "id": "7hwdhtt7TU2CJDgYXgwwww",
        "name": "Scoped Group",
        "members": [
            {
                "userId": "61892cfdfcffab03016b2950",
                "email": "jhon@example.com"
            }
        ],
        "permissionSet": {
        "permissions": [
            "CAN_VIEW_LOGS",
            "CAN_VIEW_TRACE_DETAILS",
            "CAN_EDIT_ALL_ACCESSIBLE_CUSTOM_DASHBOARDS",
            "ACCESS_APPLICATIONS",
            "LIMITED_APPLICATIONS_SCOPE",            
            "ACCESS_KUBERNETES",
            "LIMITED_KUBERNETES_SCOPE",
            "ACCESS_INFRASTRUCTURE_APPS",
            "LIMITED_INFRASTRUCTURE_SCOPE",
            "LIMITED_WEBSITES_SCOPE",
            
        ],
        "applicationIds": [
            {
            "scopeId": "1qvWgVfLTNqi9gGTcCaNUw",
            "scopeRoleId": "-100"
            }
        ],
        "kubernetesClusterUUIDs": [
            {
            "scopeId": "induced",
            "scopeRoleId": "-200"
            }
        ],
        "kubernetesNamespaceUIDs": [],
        "websiteIds": [],
        "mobileAppIds": [],
        "infraDfqFilter": {
            "scopeId": "production",
            "scopeRoleId": "-600"
        }
    }
]
```
In this case `Scoped Group` has no access to websites due to having `LIMITED_WEBSITES_SCOPE` but not `ACCESS_WEBSITES`.

Also due to having `LIMITED_APPLICATIONS_SCOPE`, the only visible application is the one with this id: `1qvWgVfLTNqi9gGTcCaNUw`.

Same applies to `kubernetesClusterUUIDs`, `kubernetesNamespaceUIDs` and `infraDfqFilter`, with the only difference is that `infraDfqFilter`
uses a filter "production" instead of an id.