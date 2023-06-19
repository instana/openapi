This endpoint exposes the Releases functionality.

These APIs can be used to create, update, delete and fetch already existing releases.

## Mandatory Parameters:

**releaseId:** A unique identifier assigned to each release.

## Optional Parameters:

**name:** Name of the exact release you want to retrieve, eg. "Release-161", "Release-162".

**start:** Start time of the particular release (as UNIX timestamp in milliseconds).

**from:** Filters the releases to retrieve only the releases which have "start" time greater than or equal to this value (as UNIX timestamp in milliseconds).

**to:** Filters the releases to retrieve only the releases which have "start" time lesser than or equal to this value (as UNIX timestamp in milliseconds).

**maxResults:** Maximum number of releases to be retrieved.

## Defaults:

**from, to, maxResults:** By default these parameters are not set.  