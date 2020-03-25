import { v4 as uuidv4 } from 'uuid';
import { hash } from '../../server/auth/hash';

test('hash function should produce a 60 character hash', async () => {
  const random = uuidv4();
  await expect(hash(random)).resolves.toHaveLength(60);
});
