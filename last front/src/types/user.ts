export interface User {
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'editor' | 'user';
  avatar?: string;
}
