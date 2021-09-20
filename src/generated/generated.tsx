import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
};

export type Nuzlocke = {
  __typename?: "Nuzlocke";
  createdAt: Scalars["DateTime"];
  description?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
  title: Scalars["String"];
  updatedAt: Scalars["DateTime"];
  user?: Maybe<User>;
};

export type Query = {
  __typename?: "Query";
  getNuzlockes?: Maybe<Array<Maybe<Nuzlocke>>>;
};

export type User = {
  __typename?: "User";
  email?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["String"]>;
  nuzlockes?: Maybe<Array<Maybe<Nuzlocke>>>;
  username?: Maybe<Scalars["String"]>;
};

export type GetNuzlockesQueryVariables = Exact<{ [key: string]: never }>;

export type GetNuzlockesQuery = {
  __typename?: "Query";
  nuzlockes?: Maybe<
    Array<Maybe<{ __typename?: "Nuzlocke"; id: string; title: string }>>
  >;
};

export const GetNuzlockesDocument = gql`
  query GetNuzlockes {
    nuzlockes: getNuzlockes {
      id
      title
    }
  }
`;

/**
 * __useGetNuzlockesQuery__
 *
 * To run a query within a React component, call `useGetNuzlockesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNuzlockesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNuzlockesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNuzlockesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetNuzlockesQuery,
    GetNuzlockesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetNuzlockesQuery, GetNuzlockesQueryVariables>(
    GetNuzlockesDocument,
    options
  );
}
export function useGetNuzlockesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetNuzlockesQuery,
    GetNuzlockesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetNuzlockesQuery, GetNuzlockesQueryVariables>(
    GetNuzlockesDocument,
    options
  );
}
export type GetNuzlockesQueryHookResult = ReturnType<
  typeof useGetNuzlockesQuery
>;
export type GetNuzlockesLazyQueryHookResult = ReturnType<
  typeof useGetNuzlockesLazyQuery
>;
export type GetNuzlockesQueryResult = Apollo.QueryResult<
  GetNuzlockesQuery,
  GetNuzlockesQueryVariables
>;
