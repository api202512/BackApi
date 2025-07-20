import { SetMetadata } from '@nestjs/common';

/**
 * Clave utilizada por el RolesGuard para identificar los metadatos de roles.
 */
export const ROLES_KEY = 'roles';

/**
 * Decorador personalizado que asigna uno o más roles a un controlador o handler.
 *
 * Ejemplo de uso:
 * @Roles('admin')
 * @Get()
 * findAll() {}
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
