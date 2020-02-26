// takes in a string in form 'Basic base64encoded(email:password)', return array containing user and pass decoded
export async function decode(string) {
  const err = new Error('Send Credentials in proper format');
  const authHeader = string.split(' ');
  if (authHeader.length !== 2) throw err;

  const [authType, encodedString] = authHeader;
  if (authType !== 'Basic') throw err;

  const base64Decoded = Buffer.from(encodedString, 'base64').toString();
  const decodedCredentials = base64Decoded.split(':');
  if (decodedCredentials.length !== 2) throw err;

  return decodedCredentials;
}
