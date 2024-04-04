class ProcessError extends Error {
  constructor(errorTag, error) {
    super(error);
    this.errorTag = errorTag;
    this.name = error.name;
    this.message = error.message;
    if (error.name && error.message) console.error(error.name, error.message);
  }
}

module.exports = ProcessError;
