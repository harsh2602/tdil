let instance;

class DBConnection {
  constructor(uri) {
    if (instance) {
      throw new Error('Only one DB connection is allowed');
    }
    this.uri = uri;
    instance = this;
  }

  connect() {
    console.log(`DB ${this.uri} has been connected!`);
  }

  disconnect() {
    console.log('DB disconnected');
  }
}

const connection = Object.freeze(new DBConnection('mongodb://...'));
export default connection;

// Will throw error
// const anotherConnection = new DBConnection('mongodb://...');
