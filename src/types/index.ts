export interface dbFile {
  _id: string;
  userId: string;
  fileName: string;
  mimeType: string;
  fileSize: number;
  starred: boolean;
  inTrash: boolean;
  downloadLink: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface userType {
  _id: string;
  userName: string;
  email: string;
  avatar: string;
  about: string;
  createdAt: Date;
  updatedAt: Date;
}
