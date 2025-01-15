export const generatePassword = (length = 8) => {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*()+:;?><,.-=';
  let password = '';
  for (let i = 0; i < length; i++) {
    const at = Math.floor(Math.random() * (charset.length + 1));
    password += charset.charAt(at);
  }
  return password;
};
