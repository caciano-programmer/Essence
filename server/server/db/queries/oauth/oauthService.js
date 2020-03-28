import { initDB as db } from '../../dbConfig';

export const oauthService = type => {
  return {
    createGithubUser: ({ name, email }) => db(type).insert({ name, email }),
    checkGithubUserExists: email =>
      db(type)
        .where({ email })
        .select('email'),
    async createWhenNewUser({ name, email }) {
      const isNewUser = (await this.checkGithubUserExists(email)).length === 0;
      if (isNewUser) await this.createGithubUser({ name, email });
    },
  };
};
