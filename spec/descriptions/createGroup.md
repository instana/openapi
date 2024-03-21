Creates a group on the tenant. Each group entry also needs a `Permission Set` per unit.

The `Permission Set` object contains a set of permissions applied to the group.

In case `permissions` include the entry e.g. `LIMITED_APPLICATIONS_SCOPE`, this group will have limited access to application area.

Possible access permissions values are:

- `ACCESS_APPLICATIONS`
- `ACCESS_INFRASTRUCTURE`
- `ACCESS_KUBERNETES`
- `ACCESS_MOBILE_APPS`
- `ACCESS_WEBSITES`
- `LIMITED_APPLICATIONS_SCOPE`
- `LIMITED_INFRASTRUCTURE_SCOPE`
- `LIMITED_KUBERNETES_SCOPE`
- `LIMITED_MOBILE_APPS_SCOPE`
- `LIMITED_WEBSITES_SCOPE`

The `id` value for the group is ignored, a new id is generated.

The `scopeRoleId` is ignored, the id corresponding to the area is used.

The `scopeId` is the id for the corresponding resource.