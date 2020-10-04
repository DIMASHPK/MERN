module.exports = {
  serverError: (res) =>
    res.status(500).send("Что-то пошло не так попробуйте снова"),
  clientError: (res, error) => res.status(400).send(error),
};
