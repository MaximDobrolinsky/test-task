export const config = {
  port: process.env.PORT || 3000,
  db_url: 'mongodb://localhost:27017/test',
  passwordSaltRound: 0.5,
};