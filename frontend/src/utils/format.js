export const currency = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(value || 0));

export const dateTime = (value) =>
  value ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) : 'Not set';

export const roleLabel = (roles = []) => {
  const role = roles[0] || '';
  return role.replace('ROLE_', '').toLowerCase().replace(/^\w/, (letter) => letter.toUpperCase());
};

export const statusTone = (status = '') => {
  const normalized = status.toUpperCase();
  if (['APPROVED', 'AVAILABLE', 'COMPLETED'].includes(normalized)) return 'success';
  if (['PENDING', 'MAINTENANCE'].includes(normalized)) return 'warning';
  if (['REJECTED', 'CANCELLED', 'OCCUPIED'].includes(normalized)) return 'danger';
  return 'secondary';
};
