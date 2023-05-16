This endpoint creates or updates a maintenance configuration given its ID.

### Path Parameters:

- **id:** The ID of the maintenance config to create or update.

### Types of Maintenance Configurations
- One-Time Maintenance Window
- Recurrent Maintenance Window

### **Recurrent Maintenance Window - RRULE Limitations**

_NOTE: Not all `RRULE` options from the [iCalendar Spec](https://datatracker.ietf.org/doc/html/rfc5545) are supported._

#### **Supported** ✅
- [FREQ](https://datatracker.ietf.org/doc/html/rfc5545#:~:text=RECUR%20value.%0A%0A%20%20%20%20%20%20The-,FREQ,-rule%20part%20identifies)
    - [DAILY](https://datatracker.ietf.org/doc/html/rfc5545#:~:text=hour%20or%20more%3B-,DAILY,-%2C%20to%20specify%0A%20%20%20%20%20%20repeating)
    - [MONTHLY](https://datatracker.ietf.org/doc/html/rfc5545#:~:text=week%20or%20more%3B-,MONTHLY,-%2C%20to%20specify%20repeating)
        - (monthly by day) `BYDAY` → one specified, not multiple
        - (monthly by date) `BYMONTHDAY` → one specified, not multiple
    - [YEARLY](https://datatracker.ietf.org/doc/html/rfc5545#:~:text=or%20more%3B%20and-,YEARLY,-%2C%20to%20specify%20repeating)
        - (monthly by day) `BYDAY` → one specified, not multiple
        - (monthly by date) `BYMONTHDAY` → one specified, not multiple
- [UNTIL](https://datatracker.ietf.org/doc/html/rfc5545#:~:text=eight%20days.%0A%0A%20%20%20%20%20%20The-,UNTIL,-rule%20part%20defines)
    - if provided, only UTC specification
- [INTERVAL](https://datatracker.ietf.org/doc/html/rfc5545#:~:text=September%202009%0A%0A%0A%20%20%20%20%20%20The-,INTERVAL,-rule%20part%20contains)
    - for `YEARLY`, always 1

#### **Unsupported** ❌

- SKIP
- RSCALE
- BYHOUR
- BYMINUTE
- BYSECOND
- BYYEARDAY
- BYWEEKNO
- WKST
- BYSETPOS    