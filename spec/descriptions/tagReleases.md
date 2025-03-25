These APIs can be used to create, update, delete and fetch releases.

## Mandatory Parameters when sending a request:

1. **Create release**
    - `name` and `start` are mandatory parameters to create a release with Global scope.
    - `applications` is a mandatory parameter **along with** Global scope mandatory parameters to create a release with Application Perspective scope.
    - `services.name` is a mandatory parameter **along with** Global scope mandatory parameters to create a release with Service scope.
    - `services.scopedTo.applications` is a mandatory parameter **along with Service scope** mandatory parameters to create a release with Service within an Application Perspective scope.

2. **Delete release**
    - `releaseId` is a mandatory path parameter.

3. **Get release**
    - `releaseId` is a mandatory path parameter.

4. **Update release**
    - `releaseId` is a mandatory path parameter.
    - Same mandatory parameters as **Create release**.