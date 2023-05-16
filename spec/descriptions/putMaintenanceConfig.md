This endpoint creates or updates a maintenance configuration given its ID.

### Path Parameters:

- **id:** The ID of the maintenance config to create or update.

### Types of Maintenance Configurations
- One-Time Maintenance Window
- Recurrent Maintenance Window

### **Recurrent Maintenance Window - RRULE Limitations**

NOTE: Not all `RRULE` options from the [iCalendar Spec](https://datatracker.ietf.org/doc/html/rfc5545) are supported.

#### **Supported** ✅
- FREQ
- UNTIL
    - if provided, only UTC specification
- INTERVAL
    - for YEARLY, always 1
- MONTHLY FREQ
    - (monthly by day) BYDAY → one specified, not multiple
    - (monthly by date) BYMONTHDAY → one specified, not multiple
- YEARLY FREQ
    - (monthly by day) BYDAY → one specified, not multiple
        - **Q:** which day of the month we want? Is it always 1st day, or should the customer chose a day?
    - (monthly by date) BYMONTHDAY → one specified, not multiple

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