const asyncWrapper = (fn) => {
  return async (req, res) => {
    try {
      await fn(req, res);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
};
module.exports = asyncWrapper;
