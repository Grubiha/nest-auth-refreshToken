import { SetMetadata } from "@nestjs/common";

export const ROLE_KEY = 'role';

export const RoleDecorator = (role: string) => SetMetadata(ROLE_KEY, role);