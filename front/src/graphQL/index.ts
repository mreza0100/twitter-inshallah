import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  posts?: Maybe<PaginatedPosts>;
  post?: Maybe<Post>;
  postTest?: Maybe<Array<Post>>;
  me: UserResponse;
  user: UserResponse;
  users: UserResponseMultiUsers;
  userTest?: Maybe<Array<User>>;
};


export type QueryPostsArgs = {
  textPattern?: Maybe<Scalars['String']>;
  titlePattern?: Maybe<Scalars['String']>;
  uniqueProfileId?: Maybe<Scalars['String']>;
  cursor?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryPostTestArgs = {
  deleteAll?: Maybe<Scalars['Boolean']>;
};


export type QueryUserArgs = {
  uniqueId: Scalars['String'];
};


export type QueryUsersArgs = {
  limit?: Maybe<Scalars['Float']>;
};


export type QueryUserTestArgs = {
  deleteAll?: Maybe<Scalars['Boolean']>;
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  posts: Array<Post>;
  left: Scalars['Float'];
  hasMore: Scalars['Boolean'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Int'];
  points: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  text: Scalars['String'];
  userId: Scalars['Int'];
  user: User;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  bio?: Maybe<Scalars['String']>;
  uniqueId: Scalars['String'];
  location?: Maybe<Scalars['String']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<FieldError>;
  user?: Maybe<User>;
  OK: Scalars['Boolean'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UserResponseMultiUsers = {
  __typename?: 'UserResponseMultiUsers';
  errors?: Maybe<FieldError>;
  users?: Maybe<Array<User>>;
  OK: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  vote?: Maybe<Post>;
  createPost?: Maybe<Post>;
  deletePost?: Maybe<Scalars['Boolean']>;
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponseMultiError;
  logout: Scalars['Boolean'];
  editProfile: UserResponse;
};


export type MutationVoteArgs = {
  value: Scalars['Int'];
  postId: Scalars['Int'];
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  inputs: RegisterInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  uniqueIdOrEmail: Scalars['String'];
};


export type MutationEditProfileArgs = {
  inputs: EditProfielInput;
};

export type PostInput = {
  text: Scalars['String'];
};

export type RegisterInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
  uniqueId: Scalars['String'];
};

export type UserResponseMultiError = {
  __typename?: 'UserResponseMultiError';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
  OK: Scalars['Boolean'];
};

export type EditProfielInput = {
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  uniqueId?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
};

export type ErrorsDataFFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type PostDataFFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'createdAt' | 'text' | 'points'>
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'uniqueId'>
  ) }
);

export type UserDataFFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'email' | 'bio' | 'uniqueId' | 'location' | 'createdAt'>
);

export type CreatePostMutationVariables = Exact<{
  text: Scalars['String'];
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost?: Maybe<(
    { __typename?: 'Post' }
    & PostDataFFragment
  )> }
);

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePost'>
);

export type VoteMutationVariables = Exact<{
  value: Scalars['Int'];
  postId: Scalars['Int'];
}>;


export type VoteMutation = (
  { __typename?: 'Mutation' }
  & { vote?: Maybe<(
    { __typename?: 'Post' }
    & PostDataFFragment
  )> }
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'OK'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserDataFFragment
    )>, errors?: Maybe<(
      { __typename?: 'FieldError' }
      & ErrorsDataFFragment
    )> }
  ) }
);

export type EditProfileMutationVariables = Exact<{
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  uniqueId?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
}>;


export type EditProfileMutation = (
  { __typename?: 'Mutation' }
  & { editProfile: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'OK'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserDataFFragment
    )>, errors?: Maybe<(
      { __typename?: 'FieldError' }
      & ErrorsDataFFragment
    )> }
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  uniqueIdOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponseMultiError' }
    & Pick<UserResponseMultiError, 'OK'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserDataFFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorsDataFFragment
    )>> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
  uniqueId: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'OK'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserDataFFragment
    )>, errors?: Maybe<(
      { __typename?: 'FieldError' }
      & ErrorsDataFFragment
    )> }
  ) }
);

export type PostQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PostQuery = (
  { __typename?: 'Query' }
  & { post?: Maybe<(
    { __typename?: 'Post' }
    & PostDataFFragment
  )> }
);

export type PostsQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['String']>;
  titlePattern?: Maybe<Scalars['String']>;
  textPattern?: Maybe<Scalars['String']>;
  uniqueProfileId?: Maybe<Scalars['String']>;
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts?: Maybe<(
    { __typename?: 'PaginatedPosts' }
    & Pick<PaginatedPosts, 'hasMore' | 'left'>
    & { posts: Array<(
      { __typename?: 'Post' }
      & PostDataFFragment
    )> }
  )> }
);

export type InternalPostsQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['String']>;
  titlePattern?: Maybe<Scalars['String']>;
  textPattern?: Maybe<Scalars['String']>;
  uniqueProfileId?: Maybe<Scalars['String']>;
  textSize?: Maybe<Scalars['Int']>;
}>;


export type InternalPostsQuery = (
  { __typename?: 'Query' }
  & { posts?: Maybe<(
    { __typename?: 'PaginatedPosts' }
    & { posts: Array<(
      { __typename?: 'Post' }
      & Pick<Post, 'id'>
    )> }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'OK'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserDataFFragment
    )>, errors?: Maybe<(
      { __typename?: 'FieldError' }
      & ErrorsDataFFragment
    )> }
  ) }
);

export type UserQueryVariables = Exact<{
  uniqueId: Scalars['String'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'OK'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserDataFFragment
    )>, errors?: Maybe<(
      { __typename?: 'FieldError' }
      & ErrorsDataFFragment
    )> }
  ) }
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: (
    { __typename?: 'UserResponseMultiUsers' }
    & Pick<UserResponseMultiUsers, 'OK'>
    & { users?: Maybe<Array<(
      { __typename?: 'User' }
      & UserDataFFragment
    )>>, errors?: Maybe<(
      { __typename?: 'FieldError' }
      & ErrorsDataFFragment
    )> }
  ) }
);

export const ErrorsDataFFragmentDoc = gql`
    fragment ErrorsDataF on FieldError {
  field
  message
}
    `;
export const PostDataFFragmentDoc = gql`
    fragment PostDataF on Post {
  id
  createdAt
  text
  points
  user {
    id
    username
    uniqueId
  }
}
    `;
export const UserDataFFragmentDoc = gql`
    fragment UserDataF on User {
  id
  username
  email
  bio
  uniqueId
  location
  createdAt
}
    `;
export const CreatePostDocument = gql`
    mutation CreatePost($text: String!) {
  createPost(input: {text: $text}) {
    ...PostDataF
  }
}
    ${PostDataFFragmentDoc}`;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const DeletePostDocument = gql`
    mutation DeletePost($id: Int!) {
  deletePost(id: $id)
}
    `;

export function useDeletePostMutation() {
  return Urql.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument);
};
export const VoteDocument = gql`
    mutation Vote($value: Int!, $postId: Int!) {
  vote(value: $value, postId: $postId) {
    ...PostDataF
  }
}
    ${PostDataFFragmentDoc}`;

export function useVoteMutation() {
  return Urql.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument);
};
export const ChangePasswordDocument = gql`
    mutation changePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    OK
    user {
      ...UserDataF
    }
    errors {
      ...ErrorsDataF
    }
  }
}
    ${UserDataFFragmentDoc}
${ErrorsDataFFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const EditProfileDocument = gql`
    mutation EditProfile($username: String, $email: String, $uniqueId: String, $bio: String, $location: String) {
  editProfile(
    inputs: {username: $username, email: $email, uniqueId: $uniqueId, bio: $bio, location: $location}
  ) {
    OK
    user {
      ...UserDataF
    }
    errors {
      ...ErrorsDataF
    }
  }
}
    ${UserDataFFragmentDoc}
${ErrorsDataFFragmentDoc}`;

export function useEditProfileMutation() {
  return Urql.useMutation<EditProfileMutation, EditProfileMutationVariables>(EditProfileDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($uniqueIdOrEmail: String!, $password: String!) {
  login(uniqueIdOrEmail: $uniqueIdOrEmail, password: $password) {
    OK
    user {
      ...UserDataF
    }
    errors {
      ...ErrorsDataF
    }
  }
}
    ${UserDataFFragmentDoc}
${ErrorsDataFFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!, $email: String!, $uniqueId: String!) {
  register(
    inputs: {username: $username, password: $password, email: $email, uniqueId: $uniqueId}
  ) {
    OK
    user {
      ...UserDataF
    }
    errors {
      ...ErrorsDataF
    }
  }
}
    ${UserDataFFragmentDoc}
${ErrorsDataFFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const PostDocument = gql`
    query Post($id: Int!) {
  post(id: $id) {
    ...PostDataF
  }
}
    ${PostDataFFragmentDoc}`;

export function usePostQuery(options: Omit<Urql.UseQueryArgs<PostQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostQuery>({ query: PostDocument, ...options });
};
export const PostsDocument = gql`
    query Posts($limit: Int, $cursor: String, $titlePattern: String, $textPattern: String, $uniqueProfileId: String) {
  posts(
    limit: $limit
    cursor: $cursor
    titlePattern: $titlePattern
    textPattern: $textPattern
    uniqueProfileId: $uniqueProfileId
  ) {
    hasMore
    left
    posts {
      ...PostDataF
    }
  }
}
    ${PostDataFFragmentDoc}`;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};
export const InternalPostsDocument = gql`
    query InternalPosts($limit: Int, $cursor: String, $titlePattern: String, $textPattern: String, $uniqueProfileId: String, $textSize: Int) {
  posts(
    limit: $limit
    cursor: $cursor
    textPattern: $textPattern
    titlePattern: $titlePattern
    uniqueProfileId: $uniqueProfileId
  ) {
    posts {
      id
    }
  }
}
    `;

export function useInternalPostsQuery(options: Omit<Urql.UseQueryArgs<InternalPostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<InternalPostsQuery>({ query: InternalPostsDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    OK
    user {
      ...UserDataF
    }
    errors {
      ...ErrorsDataF
    }
  }
}
    ${UserDataFFragmentDoc}
${ErrorsDataFFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const UserDocument = gql`
    query User($uniqueId: String!) {
  user(uniqueId: $uniqueId) {
    user {
      ...UserDataF
    }
    errors {
      ...ErrorsDataF
    }
    OK
  }
}
    ${UserDataFFragmentDoc}
${ErrorsDataFFragmentDoc}`;

export function useUserQuery(options: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserQuery>({ query: UserDocument, ...options });
};
export const UsersDocument = gql`
    query Users {
  users {
    OK
    users {
      ...UserDataF
    }
    errors {
      ...ErrorsDataF
    }
  }
}
    ${UserDataFFragmentDoc}
${ErrorsDataFFragmentDoc}`;

export function useUsersQuery(options: Omit<Urql.UseQueryArgs<UsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UsersQuery>({ query: UsersDocument, ...options });
};