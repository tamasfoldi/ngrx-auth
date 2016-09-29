export class User {
  constructor(
    public username: string = null,
    public password: string = null,
    public id_token: string = localStorage.getItem('id_token'),
    public access_token: string = null
  ) {  }
}
