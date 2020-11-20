/// <reference types="react-scripts" />

type JSXElementT = React.PropsWithChildren<any>;

type FormikOnSubmitT<T> = (values: T, helpers: import("formik").FormikHelpers<T>) => any | Promise<any>;

type VoteHandlerT = (value: -1 | 0 | 1, postId: number) => Promise<void>;
