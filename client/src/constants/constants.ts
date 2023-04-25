/* Page Sizes */
export const HEADER_HEIGHT = '10vh';
export const HEADER_WIDTH = '100vw';
export const PAGE_HEIGHT = '90vh';
export const PAGE_WIDTH = '100vw';

/* User Login Type */
export type LoginUser = { name: string; email: string; password: string };
export const emptyLoginUser: LoginUser = { name: '', email: '', password: '' };

/* User type*/
export type User = { name: string; email: string };
