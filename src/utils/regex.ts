function verifyEmail(email: string): boolean {
  const regex = new RegExp('[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+');
  return regex.test(email);
}

function verifyUsername(username: string): boolean {
  const regex = new RegExp('^[a-zA-Z0-9_-]{5,30}$');
  return regex.test(username);
}

function verifyUrl(url: string): boolean {
  const regex = new RegExp(
    'https?://(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&//=]*)',
  );
  return regex.test(url);
}

function verifyField(field: string): boolean {
  const regex = new RegExp('^[a-zA-Z ]{3,30}$');
  return regex.test(field);
}

export { verifyEmail, verifyUsername, verifyUrl, verifyField };
