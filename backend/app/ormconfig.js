const path = require(`path`)
const {
  ASP_POSTGRES_HOST,
  ASP_POSTGRES_PORT,
  ASP_POSTGRES_USER,
  ASP_POSTGRES_PASSWORD,
  ASP_POSTGRES_DATABASE,
  NODE_ENV
} = process.env
const IS_DEV = NODE_ENV === `development`
const IS_TEST = NODE_ENV === `test`
const entitiesSource = IS_TEST ? `.` : `dist`

// default directories
const ENTITIES_DIR = 'src/entities/postgres'
const MIGRATION_DIR = 'src/migrations'
const MIGRATION_SCHEMA_DIR = `schema`
const MIGRATION_PROD_SEED_DIR = `seed/prod`
const MIGRATION_TEST_SEED_DIR = `seed/test`

const migrations = [
  path.join(
    __dirname,
    `/dist/${MIGRATION_DIR}/${MIGRATION_SCHEMA_DIR}/*{.ts,.js}`
  ),
  path.join(
    __dirname,
    `/dist/${MIGRATION_DIR}/${MIGRATION_PROD_SEED_DIR}/*{.ts,.js}`
  )
]

if (IS_DEV || IS_TEST) {
  migrations.push(
    path.join(
      __dirname,
      `/dist/${MIGRATION_DIR}/${MIGRATION_TEST_SEED_DIR}/*{.ts,.js}`
    )
  )
}

module.exports = {
  type: `postgres`,
  host: ASP_POSTGRES_HOST,
  port: parseInt(ASP_POSTGRES_PORT),
  username: ASP_POSTGRES_USER,
  password: ASP_POSTGRES_PASSWORD,
  database: ASP_POSTGRES_DATABASE,
  synchronize: false,
  // eslint-disable-next-line node/no-path-concat
  entities: [__dirname + `/${entitiesSource}/${ENTITIES_DIR}/**/*{.ts,.js}`],
  // eslint-disable-next-line node/no-path-concat
  migrations: migrations,
  migrationsTableName: `migrations_typeorm`,
  migrationsRun: true,
  cli: {
    // eslint-disable-next-line node/no-path-concat
    entitiesDir: ENTITIES_DIR,
    // eslint-disable-next-line node/no-path-concat
    migrationsDir: `${MIGRATION_DIR}/${MIGRATION_SCHEMA_DIR}`
  }
}
