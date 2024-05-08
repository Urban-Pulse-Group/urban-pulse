/**
 * @desc User Interface including password
 */
export interface User {
  id: string;
  name: string;
  username: string;
  created_at: string;
  roles: string[] | null;
  password: string;
}

/**
 * @desc User Interface excluding password for use on the client
 */
export interface UserData {
  id: string;
  name: string;
  username: string;
  created_at: string;
  roles: string[] | null;
}
