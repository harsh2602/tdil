class CreateUser {
  constructor(firstName, lastName, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = `${this.firstName} ${this.lastName}`;
    this.email = email;
  }

  checkLastOnline() {
    console.log(`${this.fullName} was last online at ${Date.now()}`);
  }

  sendEmail() {
    console.log(`Email sent to ${this.email}`);
  }

  delete() {
    console.log('User removed');
  }
}

export const user1 = new CreateUser('John', 'Doe', 'john@doe.com');

export const user2 = new CreateUser('Jane', 'Doe', 'jane@doe.com');
