const asyncWrapper = (fn) => {
  return async (req, res) => {
      await fn(req, res);
  };
};

module.exports = asyncWrapper;
