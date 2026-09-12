import { Role } from '../../common/enums/role.enum';

export interface ActiveUserData {
  userId: number;
  email: string;
  role: Role;
}
