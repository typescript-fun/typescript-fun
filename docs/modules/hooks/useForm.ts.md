---
title: hooks/useForm.ts
nav_order: 1
parent: Modules
---

# useForm overview

The `useForm` is React Hook for typed forms.

Added in v0.2.0

---

<h2 class="text-delta">Table of contents</h2>

- [Field (interface)](#field-interface)
- [Form (interface)](#form-interface)
- [FieldMaybeOptional (type alias)](#fieldmaybeoptional-type-alias)
- [OptionalField (type alias)](#optionalfield-type-alias)
- [isOptionalField (function)](#isoptionalfield-function)
- [useForm (function)](#useform-function)

---

# Field (interface)

**Signature**

```ts
export interface Field<T, E extends string> {
  errors: E[]
  firstError: O.Option<E>
  isInvalid: boolean
  key: string
  onChange: (value: T) => void
  onHTMLInputChecked: FormEventHandler<HTMLInputElement>
  onHTMLInputValue: FormEventHandler<HTMLInputElement>
  ref: (instance: Focusable | null) => void
  submit: () => void
  value: T
}
```

Added in v0.2.0

# Form (interface)

A form instance returned from `useForm` React Hook or passed to `handleSubmit` config.
It provides useful imperative methods and current form state.

**Signature**

```ts
export interface Form<P extends t.Props> {
  asyncErrors: FormErrors<P>
  currentState: t.OutputOfProps<P>
  disable: () => void
  enable: () => void
  fields: Fields<P>
  isDisabled: boolean
  isSubmitted: boolean
  reset: () => void
  setAsyncErrors: (errors: FormErrors<P>) => void
  submit: () => void
  validated: Validated<P>
}
```

Added in v0.2.0

# FieldMaybeOptional (type alias)

**Signature**

```ts
export type FieldMaybeOptional<T, E extends string> = Field<T, E> | OptionalField<T, E>
```

Added in v0.2.0

# OptionalField (type alias)

**Signature**

```ts
export type OptionalField<T, E extends string> = Field<O.Option<T>, E>
```

Added in v0.2.0

# isOptionalField (function)

A helper for `FieldMaybeOptional` type.

**Signature**

```ts
export const isOptionalField = <T, E extends string>(
  field: FieldMaybeOptional<T, E>,
): field is OptionalField<T, E> => ...
```

Added in v0.2.0

# useForm (function)

React Hook for typed forms.

**Signature**

```ts
export const useForm = <P extends t.Props>(
  type: t.TypeC<P>,
  initialState: t.OutputOfProps<P>,
  {
    handleSubmit,
  }: {
    handleSubmit: (form: Form<P>) => void;
  } = { handleSubmit: constVoid },
): Form<P> => ...
```

Added in v0.2.0
