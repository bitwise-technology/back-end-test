import { HttpService, Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GithubUser, GraphqlResponse } from '../../model';

const GITHUB_API_URL = 'https://api.github.com/graphql';

@Injectable()
export class GithubApiService {
  public constructor(protected httpClient: HttpService) {}

  private getHeaders() {
    return { Authorization: `bearer ${process.env.O_AUTH_TOKEN}` };
  }

  protected getBodyGraphql(
    query: string,
    variables?: { [key: string]: any }
  ): { query: string; variables: any } {
    const body = {
      query,
      variables
    };
    return body;
  }

  /**
   * Pega as informações do usuário salvas no github atráves de seu login
   * @param login login unico usado pelo usuário
   */
  public getUserInfo(login: string) {
    const headers = this.getHeaders();

    const body = this.getBodyGraphql(
      `query getUser($login: String!){
        user(login:$login){
          name
          avatarUrl
          email
          login
          bio
        }
      }`,
      { login }
    );
    return this.httpClient
      .post<GraphqlResponse<GithubUser>>(GITHUB_API_URL, JSON.stringify(body), {
        headers
      })
      .pipe(
        map(
          ({
            data: {
              data: { user }
            }
          }) => user
        )
      );
  }
}
