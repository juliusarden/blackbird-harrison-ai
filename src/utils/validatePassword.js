// Password rules, in the order they should be reported.
const RULES = [
  {
    message: 'at least 8 characters',
    test: (password) => password.length >= 8,
  },
  {
    message: 'a lowercase letter',
    test: (password) => /[a-z]/.test(password),
  },
  {
    message: 'an uppercase letter',
    test: (password) => /[A-Z]/.test(password),
  },
  {
    message: 'a number',
    test: (password) => /[0-9]/.test(password),
  },
  {
    message: 'a special character (e.g. !@#$%^&*)',
    test: (password) => /[!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~\\]/.test(password),
  },
];

/**
 * Validates a password against the required rules:
 * - minimum 8 characters
 * - at least one uppercase and one lowercase letter
 * - at least one numerical digit
 * - at least one special character
 *
 * @param {string} password
 * @returns {{ isValid: boolean, message: string }}
 */
export function validatePassword(password = '') {
  const failedRules = RULES.filter((rule) => !rule.test(password));

  if (failedRules.length === 0) {
    return { isValid: true, message: '' };
  }

  return {
    isValid: false,
    message: `Password must contain ${failedRules.map((rule) => rule.message).join(', ')}.`,
  };
}

export default validatePassword;
