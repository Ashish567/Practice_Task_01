class MongoStream {
  write(log) {
    const logData = JSON.parse(log);
    const { method, url, status, responseTime } = logData;

    const newLog = new Log({
      method,
      url,
      status,
      responseTime,
    });

    newLog
      .save()
      .then(() => console.log("Log saved to database"))
      .catch((err) => console.error("Error saving log:", err));
  }
}

module.exports = new MongoStream();
