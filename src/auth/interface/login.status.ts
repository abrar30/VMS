export interface LoginStatus {
  email: string;
  accessToken: any;
  expiresIn: any;
}

export interface JwtPayload {
  email: string;
}
