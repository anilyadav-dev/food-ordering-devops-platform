export const isAdminEmail = (email = '') => {
  const normalized = email.trim().toLowerCase();
  return normalized.includes('admin');
};
