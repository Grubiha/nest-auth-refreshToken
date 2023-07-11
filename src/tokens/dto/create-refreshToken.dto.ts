export class CreateRefreshTokenDto{
  refreshToken: string;
  userId: number;
  constructor({refreshToken, userId}){
    this.refreshToken = refreshToken;
    this.userId = userId;
  }
}