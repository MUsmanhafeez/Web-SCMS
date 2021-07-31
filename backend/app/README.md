# Hasura Backend App

This is the Amoxt solution plan backend. All the backend related functionality will be perform in this app.

## create a new module using nestjs cli

**To create new Module follow the step:**

- First attach a terminal to the hasura backend container
- Goto the directory of modules
- Create a new folder with name of desire module to be add
- Then run bellow commands which will generate service, resolver and module file.

```
nest generate module [Module name]
nest generate resolver [Resolver name]
nest generate service [Service name]
```

## Shortcuts for generating files

```
ngm # shortcut of nest generate module
ngr # shortcut of nest generate resolver
ngs # shortcut of nest generate service
ngc # shortcut of nest generate controller
```

To generate other files below command will be used:

```
nest generate app # Generate a new application within a monorepo
nest generate library # Generate a new library within a monorepo
nest generate class # Generate a new class.
nest generate controller # Generate a controller declaration.
nest generate decorator # Generate a custom decorator.
nest generate filter # Generate a filter declaration.
nest generate gateway # Generate a gateway declaration.
nest generate guard # Generate a guard declaration.
nest generate interface # Generate an interface.
nest generate interceptor Generate an interceptor declaration.
nest generate middleware # Generate a middleware declaration.
nest generate module # Generate a module declaration.
nest generate pipe # Generate a pipe declaration.
nest generate provider # Generate a provider declaration.
nest generate resolver # Generate a resolver declaration.
nest generate service # Generate a service declaration.
```

For further info about nest-cli [click here](https://docs.nestjs.com/cli/usages)

## Typeorm

TypeORM is an [ORM](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping) that can run in NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms and can be used with TypeScript and JavaScript (ES5, ES6, ES7, ES8). Its goal is to always support the latest JavaScript features and provide additional features that help you to develop any kind of application that uses databases - from small applications with a few tables to large scale enterprise applications with multiple databases.

TypeORM supports both [Active Record](https://typeorm.io/#/active-record-data-mapper/what-is-the-active-record-pattern) and [Data Mapper](https://typeorm.io/#/active-record-data-mapper/what-is-the-data-mapper-pattern) patterns, unlike all other JavaScript ORMs currently in existence, which means you can write high quality, loosely coupled, scalable, maintainable applications the most productive way.

## Typeorm Migrations

### Commands:

```
typeorm schema:sync // Synchronizes your entities with database schema.

typeorm schema:log // It shows sql log only for your default connection.

typeorm schema:drop // It shows sql log only for your default connection.

typeorm query [query] // Executes given SQL query on a default connection.

typeorm entity:create // Generates a new entity.

typeorm entity:create -- -n [entity name] // Generates a new entity with name.

typeorm subscriber:create // typeorm subscriber:create

typeorm subscriber:create -- -n [subscriber name] // typeorm subscriber:create with name.

typeorm migration:create // Creates a new migration file.

typeorm migration:create -- -n [migration name] // Creates a new migration file with name.

typeorm migration:generate // Generates a new migration file with sql

typeorm migration:generate -- -n [migration name] // Generates a new migration file with filename through sql

typeorm migration:run // Runs all pending migrations.
typeorm migration:show // Show all migrations and whether they have been run or not

typeorm migration:revert // Reverts last executed migration.
```

### Commands detail:

**typeorm schema sync:**  
Synchronizes your entities with database schema. It runs schema update queries on all connections you have. To run update queries on a concrete connection use -c option.

**typeorm schema:log:**  
 Shows sql to be executed by schema:sync command. It shows sql log only for your default connection. To run update queries on a concrete connection use -c option.

**typeorm schema:drop:**  
Drops all tables in the database on your default connection. To drop table of a concrete connection's database use -c option.

**typeorm query [query]:**  
Executes given SQL query on a default connection. Specify connection name to run query on a specific connection.

**typeorm entity:create:**  
Generates a new entity.

**typeorm subscriber:create:**  
Generates a new subscriber.

**typeorm migration:create:**  
Creates a new migration file. [aliases: migrations:create]

**typeorm migration:generate:**  
Generates a new migration file with sql needs to be executed to update schema. [aliases: migrations:generate]

**typeorm migration:run:**  
Runs all pending migrations. [aliases: migrations:run]

**typeorm migration:show:**  
Show all migrations and whether they have been run or not.

**typeorm migration:revert:**  
Reverts last executed migration.[aliases: migrations:revert]
