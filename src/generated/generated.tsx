import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
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

/** Required field to add a pokemon to a nuzlocke */
export type AddPokemonInput = {
  location: Scalars["String"];
  locationId: Scalars["Int"];
  nickname: Scalars["String"];
  nuzlockeId: Scalars["String"];
  pokemonId: Scalars["Int"];
  status: PokemonStatus;
  types: Array<Scalars["Int"]>;
};

/** Arguments needed to creaste a new nuzlocke */
export type CreateNuzlockeInput = {
  description?: Maybe<Scalars["String"]>;
  gameId: Scalars["Int"];
  title: Scalars["String"];
  type: NuzlockeType;
};

export type Mutation = {
  __typename?: "Mutation";
  addPokemonToNuzlocke: Pokemon;
  changePokemonStatus: Pokemon;
  createNuzlocke: Nuzlocke;
  deleteNuzlocke: Scalars["String"];
  removePokemonFromNuzlocke: Scalars["String"];
  signup: User;
};

export type MutationAddPokemonToNuzlockeArgs = {
  input?: Maybe<AddPokemonInput>;
};

export type MutationChangePokemonStatusArgs = {
  id?: Maybe<Scalars["ID"]>;
  status?: Maybe<PokemonStatus>;
};

export type MutationCreateNuzlockeArgs = {
  input?: Maybe<CreateNuzlockeInput>;
};

export type MutationDeleteNuzlockeArgs = {
  id?: Maybe<Scalars["ID"]>;
};

export type MutationRemovePokemonFromNuzlockeArgs = {
  id?: Maybe<Scalars["ID"]>;
};

export type MutationSignupArgs = {
  email: Scalars["String"];
  username: Scalars["String"];
};

export type Nuzlocke = {
  __typename?: "Nuzlocke";
  createdAt: Scalars["DateTime"];
  description?: Maybe<Scalars["String"]>;
  gameId: Scalars["Int"];
  id: Scalars["String"];
  /** List of valid encounter pokemons */
  pokemons: Array<Pokemon>;
  /** A title for your nuzlocke */
  title: Scalars["String"];
  type: NuzlockeType;
  updatedAt: Scalars["DateTime"];
};

/** Type of nuzlocke */
export enum NuzlockeType {
  Cagelocke = "CAGELOCKE",
  Normal = "NORMAL",
  SoulLink = "SOUL_LINK",
}

/** Any valid pokemon encounter during the nuzlocke */
export type Pokemon = {
  __typename?: "Pokemon";
  id: Scalars["String"];
  location: Scalars["String"];
  locationId: Scalars["Int"];
  nickname: Scalars["String"];
  pokemonId: Scalars["Int"];
  status: PokemonStatus;
  types: Array<Maybe<Scalars["Int"]>>;
};

/** Pokemon status */
export enum PokemonStatus {
  Dead = "DEAD",
  InPc = "IN_PC",
  InTeam = "IN_TEAM",
  Seen = "SEEN",
}

export type Query = {
  __typename?: "Query";
  getNuzlocke: Nuzlocke;
  getNuzlockes: Array<Nuzlocke>;
};

export type QueryGetNuzlockeArgs = {
  id: Scalars["ID"];
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
  nuzlockes: Array<{
    __typename?: "Nuzlocke";
    id: string;
    title: string;
    type: NuzlockeType;
    createdAt: any;
    updatedAt: any;
    gameId: number;
    pokemons: Array<{
      __typename?: "Pokemon";
      id: string;
      pokemonId: number;
      status: PokemonStatus;
      locationId: number;
      location: string;
      types: Array<Maybe<number>>;
      nickname: string;
    }>;
  }>;
};

export type CreateNuzlockeMutationVariables = Exact<{
  input?: Maybe<CreateNuzlockeInput>;
}>;

export type CreateNuzlockeMutation = {
  __typename?: "Mutation";
  createNuzlocke: {
    __typename?: "Nuzlocke";
    id: string;
    title: string;
    type: NuzlockeType;
    createdAt: any;
    updatedAt: any;
    gameId: number;
    description?: Maybe<string>;
    pokemons: Array<{
      __typename?: "Pokemon";
      id: string;
      pokemonId: number;
      status: PokemonStatus;
      nickname: string;
    }>;
  };
};

export type AddPokemonToNuzlockeMutationVariables = Exact<{
  input?: Maybe<AddPokemonInput>;
}>;

export type AddPokemonToNuzlockeMutation = {
  __typename?: "Mutation";
  pokemon: {
    __typename?: "Pokemon";
    id: string;
    nickname: string;
    pokemonId: number;
    location: string;
    locationId: number;
    types: Array<Maybe<number>>;
    status: PokemonStatus;
  };
};

export type RemovePokemonFromNuzlockeMutationVariables = Exact<{
  id?: Maybe<Scalars["ID"]>;
}>;

export type RemovePokemonFromNuzlockeMutation = {
  __typename?: "Mutation";
  removePokemonFromNuzlocke: string;
};

export type UpdatePokemonStatusMutationVariables = Exact<{
  id?: Maybe<Scalars["ID"]>;
  status?: Maybe<PokemonStatus>;
}>;

export type UpdatePokemonStatusMutation = {
  __typename?: "Mutation";
  updatePokemonStatus: {
    __typename?: "Pokemon";
    id: string;
    nickname: string;
    pokemonId: number;
    location: string;
    locationId: number;
    types: Array<Maybe<number>>;
    status: PokemonStatus;
  };
};

export type GetNuzlockeQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetNuzlockeQuery = {
  __typename?: "Query";
  nuzlocke: {
    __typename?: "Nuzlocke";
    id: string;
    title: string;
    type: NuzlockeType;
    createdAt: any;
    updatedAt: any;
    gameId: number;
    description?: Maybe<string>;
    pokemons: Array<{
      __typename?: "Pokemon";
      id: string;
      pokemonId: number;
      status: PokemonStatus;
      locationId: number;
      location: string;
      types: Array<Maybe<number>>;
      nickname: string;
    }>;
  };
};

export const GetNuzlockesDocument = gql`
  query GetNuzlockes {
    nuzlockes: getNuzlockes {
      id
      title
      type
      createdAt
      updatedAt
      pokemons {
        id
        pokemonId
        status
        locationId
        location
        types
        nickname
      }
      gameId
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
export const CreateNuzlockeDocument = gql`
  mutation CreateNuzlocke($input: CreateNuzlockeInput) {
    createNuzlocke(input: $input) {
      id
      title
      type
      createdAt
      updatedAt
      pokemons {
        id
        pokemonId
        status
        nickname
      }
      gameId
      description
    }
  }
`;
export type CreateNuzlockeMutationFn = Apollo.MutationFunction<
  CreateNuzlockeMutation,
  CreateNuzlockeMutationVariables
>;

/**
 * __useCreateNuzlockeMutation__
 *
 * To run a mutation, you first call `useCreateNuzlockeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNuzlockeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNuzlockeMutation, { data, loading, error }] = useCreateNuzlockeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateNuzlockeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateNuzlockeMutation,
    CreateNuzlockeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateNuzlockeMutation,
    CreateNuzlockeMutationVariables
  >(CreateNuzlockeDocument, options);
}
export type CreateNuzlockeMutationHookResult = ReturnType<
  typeof useCreateNuzlockeMutation
>;
export type CreateNuzlockeMutationResult =
  Apollo.MutationResult<CreateNuzlockeMutation>;
export type CreateNuzlockeMutationOptions = Apollo.BaseMutationOptions<
  CreateNuzlockeMutation,
  CreateNuzlockeMutationVariables
>;
export const AddPokemonToNuzlockeDocument = gql`
  mutation AddPokemonToNuzlocke($input: AddPokemonInput) {
    pokemon: addPokemonToNuzlocke(input: $input) {
      id
      nickname
      pokemonId
      location
      locationId
      types
      status
    }
  }
`;
export type AddPokemonToNuzlockeMutationFn = Apollo.MutationFunction<
  AddPokemonToNuzlockeMutation,
  AddPokemonToNuzlockeMutationVariables
>;

/**
 * __useAddPokemonToNuzlockeMutation__
 *
 * To run a mutation, you first call `useAddPokemonToNuzlockeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPokemonToNuzlockeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPokemonToNuzlockeMutation, { data, loading, error }] = useAddPokemonToNuzlockeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddPokemonToNuzlockeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddPokemonToNuzlockeMutation,
    AddPokemonToNuzlockeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddPokemonToNuzlockeMutation,
    AddPokemonToNuzlockeMutationVariables
  >(AddPokemonToNuzlockeDocument, options);
}
export type AddPokemonToNuzlockeMutationHookResult = ReturnType<
  typeof useAddPokemonToNuzlockeMutation
>;
export type AddPokemonToNuzlockeMutationResult =
  Apollo.MutationResult<AddPokemonToNuzlockeMutation>;
export type AddPokemonToNuzlockeMutationOptions = Apollo.BaseMutationOptions<
  AddPokemonToNuzlockeMutation,
  AddPokemonToNuzlockeMutationVariables
>;
export const RemovePokemonFromNuzlockeDocument = gql`
  mutation RemovePokemonFromNuzlocke($id: ID) {
    removePokemonFromNuzlocke(id: $id)
  }
`;
export type RemovePokemonFromNuzlockeMutationFn = Apollo.MutationFunction<
  RemovePokemonFromNuzlockeMutation,
  RemovePokemonFromNuzlockeMutationVariables
>;

/**
 * __useRemovePokemonFromNuzlockeMutation__
 *
 * To run a mutation, you first call `useRemovePokemonFromNuzlockeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePokemonFromNuzlockeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePokemonFromNuzlockeMutation, { data, loading, error }] = useRemovePokemonFromNuzlockeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemovePokemonFromNuzlockeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemovePokemonFromNuzlockeMutation,
    RemovePokemonFromNuzlockeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RemovePokemonFromNuzlockeMutation,
    RemovePokemonFromNuzlockeMutationVariables
  >(RemovePokemonFromNuzlockeDocument, options);
}
export type RemovePokemonFromNuzlockeMutationHookResult = ReturnType<
  typeof useRemovePokemonFromNuzlockeMutation
>;
export type RemovePokemonFromNuzlockeMutationResult =
  Apollo.MutationResult<RemovePokemonFromNuzlockeMutation>;
export type RemovePokemonFromNuzlockeMutationOptions =
  Apollo.BaseMutationOptions<
    RemovePokemonFromNuzlockeMutation,
    RemovePokemonFromNuzlockeMutationVariables
  >;
export const UpdatePokemonStatusDocument = gql`
  mutation UpdatePokemonStatus($id: ID, $status: PokemonStatus) {
    updatePokemonStatus: changePokemonStatus(id: $id, status: $status) {
      id
      nickname
      pokemonId
      location
      locationId
      types
      status
    }
  }
`;
export type UpdatePokemonStatusMutationFn = Apollo.MutationFunction<
  UpdatePokemonStatusMutation,
  UpdatePokemonStatusMutationVariables
>;

/**
 * __useUpdatePokemonStatusMutation__
 *
 * To run a mutation, you first call `useUpdatePokemonStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePokemonStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePokemonStatusMutation, { data, loading, error }] = useUpdatePokemonStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdatePokemonStatusMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdatePokemonStatusMutation,
    UpdatePokemonStatusMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdatePokemonStatusMutation,
    UpdatePokemonStatusMutationVariables
  >(UpdatePokemonStatusDocument, options);
}
export type UpdatePokemonStatusMutationHookResult = ReturnType<
  typeof useUpdatePokemonStatusMutation
>;
export type UpdatePokemonStatusMutationResult =
  Apollo.MutationResult<UpdatePokemonStatusMutation>;
export type UpdatePokemonStatusMutationOptions = Apollo.BaseMutationOptions<
  UpdatePokemonStatusMutation,
  UpdatePokemonStatusMutationVariables
>;
export const GetNuzlockeDocument = gql`
  query GetNuzlocke($id: ID!) {
    nuzlocke: getNuzlocke(id: $id) {
      id
      title
      type
      createdAt
      updatedAt
      pokemons {
        id
        pokemonId
        status
        locationId
        location
        types
        nickname
      }
      gameId
      description
    }
  }
`;

/**
 * __useGetNuzlockeQuery__
 *
 * To run a query within a React component, call `useGetNuzlockeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNuzlockeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNuzlockeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetNuzlockeQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetNuzlockeQuery,
    GetNuzlockeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetNuzlockeQuery, GetNuzlockeQueryVariables>(
    GetNuzlockeDocument,
    options
  );
}
export function useGetNuzlockeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetNuzlockeQuery,
    GetNuzlockeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetNuzlockeQuery, GetNuzlockeQueryVariables>(
    GetNuzlockeDocument,
    options
  );
}
export type GetNuzlockeQueryHookResult = ReturnType<typeof useGetNuzlockeQuery>;
export type GetNuzlockeLazyQueryHookResult = ReturnType<
  typeof useGetNuzlockeLazyQuery
>;
export type GetNuzlockeQueryResult = Apollo.QueryResult<
  GetNuzlockeQuery,
  GetNuzlockeQueryVariables
>;
