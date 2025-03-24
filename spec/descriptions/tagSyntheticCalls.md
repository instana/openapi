The API endpoints of this group can fetch, update and delete the synthetic endpoint configuration rules.

**Note:** There are some following restrictions to use `matchSpecification` parameter for Synthetic endpoint configuration: 

1. `matchSpecification.type` should be `LEAF`.
2. `matchSpecification.key` should be always be `endpoint.name`.
3. `matchSpecification.operator` should be among the following options: `EQUALS`, `CONTAINS`, `STARTS_WITH`, `ENDS_WITH`, `NOT_STARTS_WITH`, `NOT_ENDS_WITH`.
4. `matchSpecification.entity` should be `DESTINATION` as health check endpoint is considered as a destination endpoint.