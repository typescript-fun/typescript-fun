import { sequenceS } from 'fp-ts/lib/Apply';
import * as A from 'fp-ts/lib/Array';
import * as E from 'fp-ts/lib/Either';
import { absurd, constVoid } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import * as R from 'fp-ts/lib/Record';
import * as t from 'io-ts';
import {
  FormEventHandler,
  Reducer,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';

export type BrandedMaybeOptionalTypeName<T> = T extends t.Brand<infer B>
  ? keyof B
  : T extends O.Option<t.Brand<infer C>>
  ? keyof C
  : never;

export type FormErrors<P extends t.Props> = Partial<
  {
    [K in keyof P]: BrandedMaybeOptionalTypeName<t.TypeOf<P[K]>>[];
  }
>;

// t.Errors is very raw format, but manageable.
const errorsToFormErrors = <P extends t.Props>(
  errors: t.Errors,
): FormErrors<P> =>
  errors.reduce(
    (acc, error) =>
      pipe(
        // Shallow clone to convert ReadonlyArray to Array.
        [...error.context],
        context =>
          // When wrong type is passed, object to string etc., length === 2.
          // It can not happen until type checking is disabled.
          context.length < 3
            ? O.none
            : sequenceS(O.option)({
                key: pipe(
                  // Always use lookup for arrays and objects. It's type safe. Plain TS is not.
                  A.lookup(1, context),
                  O.map(({ key }) => key),
                ),
                error: pipe(
                  A.last(context),
                  O.map(entry => entry.type),
                  O.chain(type =>
                    (type as any)._tag === 'RefinementType'
                      ? O.some(type.name)
                      : O.none,
                  ),
                ),
              }),
        O.fold(
          () => acc,
          ({ key, error }) => ({ ...acc, [key]: [...(acc[key] || []), error] }),
        ),
      ),
    {} as FormErrors<P>,
  );

type Action<P extends t.Props> =
  | { type: 'disable' }
  | { type: 'enable' }
  | { type: 'reset' }
  | { type: 'set'; value: Partial<t.OutputOfProps<P>> }
  | { type: 'setAsyncErrors'; errors: FormErrors<P> }
  | { type: 'submit' };

type Validated<P extends t.Props> = E.Either<FormErrors<P>, t.TypeOfProps<P>>;

interface State<P extends t.Props> {
  asyncErrors: FormErrors<P>;
  currentState: t.OutputOfProps<P>;
  isDisabled: boolean;
  isSubmitted: boolean;
  validated: Validated<P>;
}

type Focusable = { focus: () => void };
type FocusablesRef<P extends t.Props> = Partial<{ [K in keyof P]: Focusable }>;

export interface Field<T, E extends string> {
  errors: E[];
  firstError: O.Option<E>;
  isInvalid: boolean;
  key: string;
  onChange: (value: T) => void;
  onHTMLInputChecked: FormEventHandler<HTMLInputElement>;
  onHTMLInputValue: FormEventHandler<HTMLInputElement>;
  ref: (instance: Focusable | null) => void;
  submit: () => void;
  value: T;
}

export type OptionalField<T, E extends string> = Field<O.Option<T>, E>;

export type FieldMaybeOptional<T, E extends string> =
  | Field<T, E>
  | OptionalField<T, E>;

export const isOptionalField = <T, E extends string>(
  field: FieldMaybeOptional<T, E>,
): field is OptionalField<T, E> =>
  typeof field.value === 'object' &&
  (O.isSome(field.value as O.Some<T>) || O.isNone(field.value as O.None));

export type Fields<P extends t.Props> = {
  [K in keyof P]: Field<
    t.OutputOf<P[K]>,
    BrandedMaybeOptionalTypeName<t.TypeOf<P[K]>>
  >;
};

/**
 * Useful for callbacks:
 * `const handleSubmit = useCallback((form: Form<typeof LoginForm['props']>) => {`
 */
export interface Form<P extends t.Props> {
  asyncErrors: FormErrors<P>;
  currentState: t.OutputOfProps<P>;
  disable: () => void;
  enable: () => void;
  fields: Fields<P>;
  isDisabled: boolean;
  isSubmitted: boolean;
  reset: () => void;
  setAsyncErrors: (errors: FormErrors<P>) => void;
  submit: () => void;
  validated: Validated<P>;
}

interface Config<P extends t.Props> {
  handleSubmit: (form: Form<P>) => void;
}

export const useForm = <P extends t.Props>(
  type: t.TypeC<P>,
  initialState: t.OutputOfProps<P>,
  { handleSubmit }: Config<P> = { handleSubmit: constVoid },
): Form<P> => {
  const formRef = useRef<Form<P>>();
  const focusablesRef = useRef<FocusablesRef<P>>({});

  const validate = (state: t.OutputOfProps<P>): Validated<P> =>
    pipe(
      type.decode(state),
      E.mapLeft(errors => errorsToFormErrors<P>(errors)),
    );

  const init = (): State<P> => ({
    asyncErrors: {},
    currentState: initialState,
    isDisabled: false,
    isSubmitted: false,
    validated: validate(initialState),
  });

  // The reducer is generic, it needs P, fortunately having it here is ok.
  // https://twitter.com/dan_abramov/status/1102010979611746304
  const reducer: Reducer<State<P>, Action<P>> = (state, action) => {
    switch (action.type) {
      case 'disable':
        return { ...state, isDisabled: true };
      case 'enable':
        return { ...state, isDisabled: false };
      case 'reset':
        return init();
      case 'set': {
        if (state.isDisabled) return state;
        const currentState = { ...state.currentState, ...action.value };
        const validated = validate(currentState);
        return {
          ...state,
          currentState,
          validated,
          // Reset async error on sync validation.
          asyncErrors: {},
        };
      }
      case 'setAsyncErrors':
        return { ...state, asyncErrors: action.errors };
      case 'submit':
        return { ...state, isSubmitted: true };
      default:
        return absurd(action);
    }
  };

  const [
    { asyncErrors, currentState, isDisabled, isSubmitted, validated },
    dispatch,
  ] = useReducer(reducer, initialState, init);

  const focusFirstInvalidField = useCallback((errors: FormErrors<P>) => {
    pipe(
      // A.head is type-safe. Foo[0] can be undefined while TS says it's not.
      A.head(Object.keys(errors)),
      // R.lookup is also type-safe. Foo[key] can be undefined while TS says it's not.
      O.chain(key => R.lookup(key, focusablesRef.current)),
      // Value is nullable too, because focusablesRef current is partial.
      O.chain(O.fromNullable),
      O.fold(constVoid, focusable => {
        // Here we have type-safe focusable.
        focusable.focus();
      }),
    );
  }, []);

  const submit = useCallback(() => {
    if (!formRef.current) return;
    dispatch({ type: 'submit' });
    pipe(validated, E.fold(focusFirstInvalidField, constVoid));
    handleSubmit(formRef.current);
  }, [focusFirstInvalidField, handleSubmit, validated]);

  const disable = useCallback(() => {
    dispatch({ type: 'disable' });
  }, []);

  const enable = useCallback(() => {
    dispatch({ type: 'enable' });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'reset' });
  }, []);

  const setAsyncErrors = useCallback(
    (errors: FormErrors<P>) => {
      dispatch({ type: 'setAsyncErrors', errors });
      focusFirstInvalidField(errors);
    },
    [focusFirstInvalidField],
  );

  const getFieldErrors = useCallback(
    <K extends keyof P>(
      key: K,
    ): O.Option<BrandedMaybeOptionalTypeName<t.TypeOf<P[K]>>[]> =>
      pipe(
        O.fromEither(E.swap(validated)),
        O.chain(formErrors => R.lookup(key as string, formErrors)),
        O.chain(O.fromNullable),
      ),
    [validated],
  );

  const getFieldAsyncErrors = useCallback(
    <K extends keyof P>(
      key: K,
    ): O.Option<BrandedMaybeOptionalTypeName<t.TypeOf<P[K]>>[]> =>
      pipe(R.lookup(key as string, asyncErrors), O.chain(O.fromNullable)),
    [asyncErrors],
  );

  const createField = useCallback(
    <K extends keyof P>(
      key: K,
    ): Field<
      t.OutputOf<P[K]>,
      BrandedMaybeOptionalTypeName<t.TypeOf<P[K]>>
    > => {
      const errors =
        isSubmitted === false
          ? []
          : pipe(
              getFieldAsyncErrors(key),
              O.alt(() => getFieldErrors(key)),
              O.getOrElse(() => []),
            );
      return {
        errors,
        firstError: O.fromNullable(errors[0]),
        isInvalid: errors.length > 0,
        key: String(key),
        onChange(value) {
          dispatch({ type: 'set', value: { [key as any]: value } });
        },
        onHTMLInputChecked({ currentTarget: { checked } }) {
          dispatch({ type: 'set', value: { [key as any]: checked } });
        },
        onHTMLInputValue({ currentTarget: { value } }) {
          dispatch({ type: 'set', value: { [key as any]: value } });
        },
        ref(instance) {
          if (instance) focusablesRef.current[key] = instance;
          else delete focusablesRef.current[key];
        },
        submit,
        value: currentState[key],
      };
    },
    [currentState, getFieldAsyncErrors, getFieldErrors, isSubmitted, submit],
  );

  // Any state change will recreate fields, but that's fine, React is fast enough.
  // Sure we can optimize it via refs, but I don't think it's necessary.
  const fields = useMemo<Fields<P>>(
    () =>
      Object.keys(type.props).reduce(
        (acc, key) => ({ ...acc, [key]: createField(key) }),
        {} as Fields<P>,
      ),
    [createField, type.props],
  );

  const form = useMemo(
    () => ({
      asyncErrors,
      currentState,
      disable,
      enable,
      fields,
      isDisabled,
      isSubmitted,
      reset,
      setAsyncErrors,
      submit,
      validated,
    }),
    [
      asyncErrors,
      currentState,
      disable,
      enable,
      fields,
      isDisabled,
      isSubmitted,
      reset,
      setAsyncErrors,
      submit,
      validated,
    ],
  );

  useEffect(() => {
    formRef.current = form;
  });

  return form;
};
