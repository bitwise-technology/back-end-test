export interface GithubUser {
  name: string;
  avatarUrl: string;
  email: string;
  bio: string;
  login: string;
}

export interface GraphqlPayload<T> {
  [key: string]: T;
}

export interface GraphqlResponse<T = any> {
  data: GraphqlPayload<T>;
}
