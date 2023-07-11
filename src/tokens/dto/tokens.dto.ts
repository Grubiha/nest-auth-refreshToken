export class Tokens{
  accessToken: string;
  refreshToken: string;
  constructor(data = null){
    this.accessToken = data?.accessToken;
    this.refreshToken = data?.refreshToken;
  }
}