import { initDB as db } from '../../dbConfig';
import { AccountTypes } from '../../accountTypes';

export const oauthService = type => {
  if (type === AccountTypes.GITHUB || type === AccountTypes.GOOGLE)
    return {
      createOauthUser: ({ name, email }) => db(type).insert({ name, email }),
      checkOauthUserExists: async email =>
        (
          await db(type)
            .where({ email })
            .select('email')
        ).length > 0,
      async createWhenNewUser({ name, email }) {
        const isNewUser = !(await this.checkOauthUserExists(email));
        if (isNewUser) await this.createOauthUser({ name, email });
      },
    };
  throw new Error('Server Error');
};
