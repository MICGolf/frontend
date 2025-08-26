export const decodeJwt = (token: string) => {
  const base64Url = token.split('.')[1]; // Payload Data
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const paddedBase64 = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
  const jsonPayload = atob(paddedBase64);

  return JSON.parse(jsonPayload);
};
