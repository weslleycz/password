// @ts-nocheck
export class Credential {
  id: string;
  serviceName: string;
  username: string;
  password: string;
  url?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  category?: string;
  isFavorite: boolean;
}
