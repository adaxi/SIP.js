<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [sip.js](./sip.js.md) &gt; [SubscriptionState](./sip.js.subscriptionstate.md)

## SubscriptionState enum

[Subscription](./sip.js.subscription.md) state.

<b>Signature:</b>

```typescript
export declare enum SubscriptionState 
```

## Enumeration Members

|  Member | Value | Description |
|  --- | --- | --- |
|  Initial | <code>&quot;Initial&quot;</code> |  |
|  NotifyWait | <code>&quot;NotifyWait&quot;</code> |  |
|  Subscribed | <code>&quot;Subscribed&quot;</code> |  |
|  Terminated | <code>&quot;Terminated&quot;</code> |  |

## Remarks

Valid state transitions:

```
1. "initial" --> "notify-wait" --> "subscribed" --> "terminated"
2. "initial" --> "notify-wait" --> "terminated"
3. "initial" --> "terminated"

```

