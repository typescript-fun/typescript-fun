/**
 * Useful branded and domain types with run-time validations.
 *
 * Domain types consist of branded typed or other domain types.
 * Use domain types to describe the application domain.
 *
 * Branded types are helpers to build domain types. They have a type suffix,
 * for example `NonEmptyString`. Do not use them directly in the application
 * because they could not be safe. For example, `NonEmptyString` has no max length.
 *
 * @since 2.0.0
 */
import * as t from 'io-ts';

// ES6 version does not work.
// https://github.com/validatorjs/validator.js/issues/1208
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
import isURL from 'validator/lib/isURL';

// Branded types.
// We do not export branded types. They shall be created only via the `decode`
// method to ensure correctness.

interface NonEmptyStringBrand {
  readonly NonEmptyString: unique symbol;
}

/**
 * @since 2.0.0
 */
export const NonEmptyString = t.brand(
  t.string,
  (s): s is t.Branded<string, NonEmptyStringBrand> => s.length > 0,
  'NonEmptyString',
);

interface TrimmedStringBrand {
  readonly TrimmedString: unique symbol;
}

/**
 * @since 2.0.0
 */
export const TrimmedString = t.brand(
  t.string,
  (s): s is t.Branded<string, TrimmedStringBrand> =>
    s.trim().length === s.length,
  'TrimmedString',
);

/**
 * @since 2.0.0
 */
export const NonEmptyTrimmedString = t.intersection([
  // The order matters. UI can show the first error only.
  NonEmptyString,
  TrimmedString,
]);

interface Max64StringBrand {
  readonly Max64String: unique symbol;
}

/**
 * @since 2.0.0
 */
export const Max64String = t.brand(
  t.string,
  (s): s is t.Branded<string, Max64StringBrand> => s.length <= 64,
  'Max64String',
);

interface Max512StringBrand {
  readonly Max512String: unique symbol;
}

/**
 * @since 2.0.0
 */
export const Max512String = t.brand(
  t.string,
  (s): s is t.Branded<string, Max512StringBrand> => s.length <= 512,
  'Max512String',
);

interface Min6StringBrand {
  readonly Min6String: unique symbol;
}

/**
 * @since 2.0.0
 */
export const Min6String = t.brand(
  t.string,
  (s): s is t.Branded<string, Min6StringBrand> => s.length >= 6,
  'Min6String',
);

interface EmailStringBrand {
  readonly EmailString: unique symbol;
}

/**
 * @since 2.0.0
 */
export const EmailString = t.brand(
  t.string,
  (s): s is t.Branded<string, EmailStringBrand> => isEmail(s),
  'EmailString',
);

interface PhoneStringBrand {
  readonly PhoneString: unique symbol;
}

/**
 * @since 2.0.0
 */
export const PhoneString = t.brand(
  t.string,
  (s): s is t.Branded<string, PhoneStringBrand> => isMobilePhone(s),
  'PhoneString',
);

interface UrlStringBrand {
  readonly UrlString: unique symbol;
}

/**
 * @since 2.0.0
 */
export const UrlString = t.brand(
  t.string,
  (s): s is t.Branded<string, UrlStringBrand> => isURL(s),
  'UrlString',
);

// Domain types.

/**
 * Non empty trimmed string with max length 64.
 *
 * @since 2.0.0
 */
export const String64 = t.intersection([NonEmptyTrimmedString, Max64String]);

/**
 * @since 2.0.0
 */
export type String64 = t.TypeOf<typeof String64>;

/**
 * Non empty trimmed string with max length 512.
 *
 * @since 2.0.0
 */
export const String512 = t.intersection([NonEmptyTrimmedString, Max512String]);

/**
 * @since 2.0.0
 */
export type String512 = t.TypeOf<typeof String512>;

/**
 * Non empty trimmed email string with max length 64.
 *
 * @since 2.0.0
 */
export const Email = t.intersection([String64, EmailString]);

/**
 * @since 2.0.0
 */
export type Email = t.TypeOf<typeof Email>;

interface UniqueEmailBrand {
  readonly UniqueEmail: unique symbol;
}

/**
 * Unique Email.
 *
 * @example
 * import { Email, UniqueEmail } from 'typescript-fun';
 * let uniqueEmail = '' as UniqueEmail;
 * // This is ok. Any UniqueEmail is Email.
 * const email: Email = uniqueEmail;
 * // @ts-ignore This is not ok. We can not assign some Email to UniqueEmail.
 * uniqueEmail = email;
 *
 * @since 2.0.0
 */
export const UniqueEmail = t.brand(
  Email,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (s): s is t.Branded<Email, UniqueEmailBrand> => true,
  'UniqueEmail',
);

/**
 * @since 2.0.0
 */
export type UniqueEmail = t.TypeOf<typeof UniqueEmail>;

/**
 * Non empty trimmed string with max length 512 and min length 6.
 *
 * @since 2.0.0
 */
export const Password = t.intersection([String512, Min6String]);

/**
 * @since 2.0.0
 */
export type Password = t.TypeOf<typeof Password>;

interface VerifiedPasswordBrand {
  readonly VerifiedPassword: unique symbol;
}

/**
 * Verified Password.
 *
 * @since 2.0.0
 */
export const VerifiedPassword = t.brand(
  Password,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (s): s is t.Branded<Password, VerifiedPasswordBrand> => true,
  'VerifiedPassword',
);

/**
 * @since 2.0.0
 */
export type VerifiedPassword = t.TypeOf<typeof VerifiedPassword>;

/**
 * Non empty trimmed phone string.
 *
 * @since 2.0.0
 */
export const Phone = t.intersection([NonEmptyTrimmedString, PhoneString]);

/**
 * @since 2.0.0
 */
export type Phone = t.TypeOf<typeof Phone>;

/**
 * Non empty trimmed URL string.
 *
 * @since 2.0.0
 */
export const Url = t.intersection([NonEmptyTrimmedString, UrlString]);

/**
 * @since 2.0.0
 */
export type Url = t.TypeOf<typeof Url>;
