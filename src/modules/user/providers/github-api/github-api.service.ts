import { HttpService, Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  GithubResponseUserMetrics,
  GithubUser,
  GithubUserMetrics,
  GraphqlResponse,
  SeachUserByString
} from '../../model';

@Injectable()
export class GithubApiService {
  public constructor(protected httpClient: HttpService) {}
  /**
   * URL de acesso a api do github
   */
  private GITHUB_API_URL = 'https://api.github.com/graphql';

  private getHeaders() {
    return { Authorization: `bearer ${process.env.O_AUTH_TOKEN}` };
  }

  protected getBodyGraphql(
    query: string,
    variables?: { [key: string]: any }
  ): { query: string; variables?: { [key: string]: any } } {
    const body = {
      query,
      variables
    };
    return { ...body };
  }

  /**
   * Baixa as informações do usuário
   * @param login login de acesso ao usuário
   */
  public getUserMetrics(login: string) {
    const headers = this.getHeaders();

    const body = this.getBodyGraphql(
      `
       query getDetailProfile($login:String!){
         user(login:$login){
           url 
           
           repositories {
             totalCount
           }
           followers {
             totalCount
           }
           
           following {
             totalCount
           }
        }
      }
      `,
      { login }
    );

    return this.httpClient
      .post<GraphqlResponse<GithubResponseUserMetrics>>(
        this.GITHUB_API_URL,
        JSON.stringify(body),
        {
          headers
        }
      )
      .pipe(
        map(
          ({
            data: {
              data: { user }
            }
          }) => user
        ),

        map(user => {
          if (!user) return null;
          return {
            totalFollowers: user.followers.totalCount,
            totalFollowing: user.following.totalCount,
            totalPublicRepositories: user.repositories.totalCount,
            profileUrl: user.url
          } as GithubUserMetrics;
        })
      );
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
      .post<GraphqlResponse<GithubUser>>(
        this.GITHUB_API_URL,
        JSON.stringify(body),
        {
          headers
        }
      )
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

  /**
   * Pega uma lista de usuários a partir do seu nome
   * @param login login do usuário
   */
  public getUsersByQuery(login: string, limit = 50): Observable<GithubUser[]> {
    const headers = this.getHeaders();
    const body = this.getBodyGraphql(
      `query getUsersByLogin($login : String!, $limit: Int!){
        search(type:USER,first:$limit,query:$login){
            nodes {
                ... on User{
                    name
                    avatarUrl
                    email
                    login
                    bio
                }
            }
        }
      }
      `,
      { login, limit }
    );

    return this.httpClient
      .post<GraphqlResponse<SeachUserByString>>(
        this.GITHUB_API_URL,
        JSON.stringify(body),
        {
          headers
        }
      )
      .pipe(
        map(
          ({
            data: {
              data: {
                search: { nodes }
              }
            }
          }) => nodes
        )
      );
  }
}
