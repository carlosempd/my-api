import { SetMetadata } from "@nestjs/common";
import { PermissionEnum } from "../enums/permission.enum";

export const PERMISSION_KEY = 'permission';
export const Permission = (...permissions: PermissionEnum[]) => SetMetadata(
    PERMISSION_KEY,
    permissions
)