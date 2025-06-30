export type User = {
  id: string;
  name: string;
  password: string;
  email: string | null;
  token: string;
  isAdmin: boolean;
  standardPostureId: number | null;
  createdAt: Date;
};

export type UserCreateRequest = Pick<User, "name" | "email">;

export type Project = {
  id: number;
  appId: string;
  name: string;
  ownerUserToken: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ProjectCreateRequest = Pick<Project, "name" | "ownerUserToken">;
