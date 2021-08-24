import { SetMetadata } from '@nestjs/common';

export const RBAC_KEY = 'authorization_access';
export const RBAC = (permissions: string[], roles: string[]) =>
  SetMetadata(RBAC_KEY, { roles, permissions });
