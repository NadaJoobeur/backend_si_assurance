
// src/middlewares/errorHandler.js

function errorHandler(err, req, res, next) {
  console.error(err.stack); // Affiche l'erreur dans le terminal

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    success: false,
    error: {
      message,
      status
    }
  });
}

export default errorHandler;
