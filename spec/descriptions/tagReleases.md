These APIs can be used to create, update, delete and fetch releases.

## Mandatory Parameters when sending a request:

1. **Create release**
    - If one wants to create a release with Global scope, then `name` and `start` are mandatory parameters.
    - If one wants to create a release with Application Perspective scope, then `applications` is mandatory **along with** Global scope mandatory parameters.
    - If one wants to create a release with Service scope, then `services.name` is mandatory **along with** Global scope mandatory parameters.
    - If one wants to create a release with Service within an Application Perspective scope, then `services.scopedTo.applications` is mandatory **along with Service scope** mandatory parameters.

2. **Delete release**
    - `releaseId` is a mandatory path parameter.

3. **Get release**
    - `releaseId` is a mandatory path parameter.

4. **Update release**
    - `releaseId` is a mandatory path parameter.
    - Mandatory parameters as **Create release**