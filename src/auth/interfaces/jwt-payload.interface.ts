import { Role } from '../../common/enums/role.enum';

export interface JwtPayload {
  email: string;
  sub: number;
  role: Role;
}
