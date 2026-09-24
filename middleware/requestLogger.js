const requestLogger = (req, res, next) => {
  const started = Date.now();

  res.on("finish", () => {
    const time = Date.now() - started;
    console.log(
      `${req.method} ${req.originalUrl} -> ${res.statusCode} (${time}ms)`
    );
  });

  next();
};

module.exports = requestLogger;
