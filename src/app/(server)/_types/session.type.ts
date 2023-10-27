import { Role } from '../_db/schema';

export interface TSession {
  id: string;
  username: string;
  roles: Role[];
}
