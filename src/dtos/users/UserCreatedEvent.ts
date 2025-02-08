export class UserCreatedEvent {
  constructor(email: string) {
    this.email = email;
  }
  email: string;
}
