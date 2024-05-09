
export interface User {
  id?: string;
  name: string;
  username: string;
  created_at: string;
  roles: string[] | null;
  password?: string;
}

