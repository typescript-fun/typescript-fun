---
title: types/index.ts
nav_order: 3
parent: Modules
---

# index overview

Useful branded and domain types with run-time validations.

Domain types consist of branded typed or other domain types.
Use domain types to describe the application domain.

Branded types are helpers to build domain types. They have a type suffix,
for example `NonEmptyString`. Do not use them directly in the application
because they could not be safe. For example, `NonEmptyString` has no max length.

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Email (type alias)](#email-type-alias)
- [Password (type alias)](#password-type-alias)
- [Phone (type alias)](#phone-type-alias)
- [String512 (type alias)](#string512-type-alias)
- [String64 (type alias)](#string64-type-alias)
- [UniqueEmail (type alias)](#uniqueemail-type-alias)
- [Url (type alias)](#url-type-alias)
- [VerifiedPassword (type alias)](#verifiedpassword-type-alias)
- [Email (constant)](#email-constant)
- [EmailString (constant)](#emailstring-constant)
- [Max512String (constant)](#max512string-constant)
- [Max64String (constant)](#max64string-constant)
- [Min6String (constant)](#min6string-constant)
- [NonEmptyString (constant)](#nonemptystring-constant)
- [NonEmptyTrimmedString (constant)](#nonemptytrimmedstring-constant)
- [Password (constant)](#password-constant)
- [Phone (constant)](#phone-constant)
- [PhoneString (constant)](#phonestring-constant)
- [String512 (constant)](#string512-constant)
- [String64 (constant)](#string64-constant)
- [TrimmedString (constant)](#trimmedstring-constant)
- [UniqueEmail (constant)](#uniqueemail-constant)
- [Url (constant)](#url-constant)
- [UrlString (constant)](#urlstring-constant)
- [VerifiedPassword (constant)](#verifiedpassword-constant)

---

# Email (type alias)

**Signature**

```ts
export type Email = t.TypeOf<typeof Email>
```

Added in v2.0.0

# Password (type alias)

**Signature**

```ts
export type Password = t.TypeOf<typeof Password>
```

Added in v2.0.0

# Phone (type alias)

**Signature**

```ts
export type Phone = t.TypeOf<typeof Phone>
```

Added in v2.0.0

# String512 (type alias)

**Signature**

```ts
export type String512 = t.TypeOf<typeof String512>
```

Added in v2.0.0

# String64 (type alias)

**Signature**

```ts
export type String64 = t.TypeOf<typeof String64>
```

Added in v2.0.0

# UniqueEmail (type alias)

**Signature**

```ts
export type UniqueEmail = t.TypeOf<typeof UniqueEmail>
```

Added in v2.0.0

# Url (type alias)

**Signature**

```ts
export type Url = t.TypeOf<typeof Url>
```

Added in v2.0.0

# VerifiedPassword (type alias)

**Signature**

```ts
export type VerifiedPassword = t.TypeOf<typeof VerifiedPassword>
```

Added in v2.0.0

# Email (constant)

Non empty trimmed email string with max length 64.

**Signature**

```ts
export const Email: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.BrandC<t.StringC, NonEmptyStringBrand>, t.BrandC<t.StringC, TrimmedStringBrand>]>, t.BrandC<t.StringC, Max64StringBrand>]>, t.BrandC<t.StringC, EmailStringBrand>]> = ...
```

Added in v2.0.0

# EmailString (constant)

**Signature**

```ts
export const EmailString: t.BrandC<t.StringC, EmailStringBrand> = ...
```

Added in v2.0.0

# Max512String (constant)

**Signature**

```ts
export const Max512String: t.BrandC<t.StringC, Max512StringBrand> = ...
```

Added in v2.0.0

# Max64String (constant)

**Signature**

```ts
export const Max64String: t.BrandC<t.StringC, Max64StringBrand> = ...
```

Added in v2.0.0

# Min6String (constant)

**Signature**

```ts
export const Min6String: t.BrandC<t.StringC, Min6StringBrand> = ...
```

Added in v2.0.0

# NonEmptyString (constant)

**Signature**

```ts
export const NonEmptyString: t.BrandC<t.StringC, NonEmptyStringBrand> = ...
```

Added in v2.0.0

# NonEmptyTrimmedString (constant)

**Signature**

```ts
export const NonEmptyTrimmedString: t.IntersectionC<[t.BrandC<t.StringC, NonEmptyStringBrand>, t.BrandC<t.StringC, TrimmedStringBrand>]> = ...
```

Added in v2.0.0

# Password (constant)

Non empty trimmed string with max length 512 and min length 6.

**Signature**

```ts
export const Password: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.BrandC<t.StringC, NonEmptyStringBrand>, t.BrandC<t.StringC, TrimmedStringBrand>]>, t.BrandC<t.StringC, Max512StringBrand>]>, t.BrandC<t.StringC, Min6StringBrand>]> = ...
```

Added in v2.0.0

# Phone (constant)

Non empty trimmed phone string.

**Signature**

```ts
export const Phone: t.IntersectionC<[t.IntersectionC<[t.BrandC<t.StringC, NonEmptyStringBrand>, t.BrandC<t.StringC, TrimmedStringBrand>]>, t.BrandC<t.StringC, PhoneStringBrand>]> = ...
```

Added in v2.0.0

# PhoneString (constant)

**Signature**

```ts
export const PhoneString: t.BrandC<t.StringC, PhoneStringBrand> = ...
```

Added in v2.0.0

# String512 (constant)

Non empty trimmed string with max length 512.

**Signature**

```ts
export const String512: t.IntersectionC<[t.IntersectionC<[t.BrandC<t.StringC, NonEmptyStringBrand>, t.BrandC<t.StringC, TrimmedStringBrand>]>, t.BrandC<t.StringC, Max512StringBrand>]> = ...
```

Added in v2.0.0

# String64 (constant)

Non empty trimmed string with max length 64.

**Signature**

```ts
export const String64: t.IntersectionC<[t.IntersectionC<[t.BrandC<t.StringC, NonEmptyStringBrand>, t.BrandC<t.StringC, TrimmedStringBrand>]>, t.BrandC<t.StringC, Max64StringBrand>]> = ...
```

Added in v2.0.0

# TrimmedString (constant)

**Signature**

```ts
export const TrimmedString: t.BrandC<t.StringC, TrimmedStringBrand> = ...
```

Added in v2.0.0

# UniqueEmail (constant)

Unique Email.

**Signature**

```ts
export const UniqueEmail: t.BrandC<t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.BrandC<t.StringC, NonEmptyStringBrand>, t.BrandC<t.StringC, TrimmedStringBrand>]>, t.BrandC<t.StringC, Max64StringBrand>]>, t.BrandC<t.StringC, EmailStringBrand>]>, UniqueEmailBrand> = ...
```

**Example**

```ts
import { Email, UniqueEmail } from 'typescript-fun'
let uniqueEmail = '' as UniqueEmail
// This is ok. Any UniqueEmail is Email.
const email: Email = uniqueEmail
// @ts-ignore This is not ok. We can not assign some Email to UniqueEmail.
uniqueEmail = email
```

Added in v2.0.0

# Url (constant)

Non empty trimmed URL string.

**Signature**

```ts
export const Url: t.IntersectionC<[t.IntersectionC<[t.BrandC<t.StringC, NonEmptyStringBrand>, t.BrandC<t.StringC, TrimmedStringBrand>]>, t.BrandC<t.StringC, UrlStringBrand>]> = ...
```

Added in v2.0.0

# UrlString (constant)

**Signature**

```ts
export const UrlString: t.BrandC<t.StringC, UrlStringBrand> = ...
```

Added in v2.0.0

# VerifiedPassword (constant)

Verified Password.

**Signature**

```ts
export const VerifiedPassword: t.BrandC<t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.BrandC<t.StringC, NonEmptyStringBrand>, t.BrandC<t.StringC, TrimmedStringBrand>]>, t.BrandC<t.StringC, Max512StringBrand>]>, t.BrandC<t.StringC, Min6StringBrand>]>, VerifiedPasswordBrand> = ...
```

Added in v2.0.0
