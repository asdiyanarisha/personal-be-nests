export default () => ({
  port: parseInt(process.env.PORT!, 10) || 3000,
  database: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT!, 10) || 5432,
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PWD || 'postgres',
    name: process.env.POSTGRES_DB || 'scrape',
  },
  jwt_key: process.env.JWT_KEY,
});
