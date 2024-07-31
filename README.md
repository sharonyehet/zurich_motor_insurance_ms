## IMPORTANT SETUP NOTES

#### Setup for local environment

1. Clone the project and npm install required packages.
2. Setup your localhost database.
3. Configure .env file in root folder. Please refer to below.
4. Generate migration file.
   `npm run migration:generate:dev`
5. Run data migration to sync your local database schema.
   `npm run migration:run:dev`
6. Start the application with `npm run start`.
7. Access swagger from `{endPoint}/swagger`.
e.g. http://localhost:3000/swagger

#### Environment variables (local)

```typescript
DB_HOST="localhost"
DB_PORT="5432"
DB_USER="postgres"
DB_PASSWORD="sharon001104"
DB_DATABASE="MOTOR_INSURANCE_WEBSITE"
TOKEN_SECRET="f8947d88022172aee1b250abf64df78a1d65aac6c4f82ced2e45cccd6c327041"
```

## Solution
Kindly refer to the requirements [here](/notes/MS%20Assessment.pdf).

_Please get a header token from `/token` api with your preferred role to access the product endpoints._

#### Database Setup
1. Configure typeorm & establish a connnection to database. Environment variales is used here to control over different environments.

2. Setup database migration scripts, including migration generate & migration run command. Migration is chosen over auto schema synchronization to prevent data lost in production environment. 

#### Project Setup 
1. Standardize communication using  `ResponseMappingInterceptor` for mapping responses to a common DTO.

2. Define a generic and reusable API response, `ApiOkCommonResponse` for Swagger use.

#### Authentication & Authorization
JWT is used here for authentication & authorization purpose.

`AuthMiddleware`

This middleware extracts JWT from request auth header and performs various checking on token validity. It checks if:
1. a token is provided
2. a token is valid; 
If valid, it retrieves user role from the token then attach role properties to the coming request for further authorization.

`Roles` decorator

This is a reusable decorator which serves the purpose of assigning required roles to endpoints.

`RoleGuard`

This is a guard which secures an access to a route based on role. It gets required role from the handler metadata and performs a role checking.

#### Product Module
`Product` Entity

Create a product entity with common columns (eg. created date, updated date, etc) and appropriate column options, including column type, length, and precision & scale for price.

`DTOs`

Declare DTOs for all requests & responses with data validation using `class-validator`. Implement inheritance here for better code maintainability.

`ProductRepository`

A custom repository with basic CRUD operations for product entities.

`ProductService`

A service which performs business logic related to products.

`ProductController`

- All endpoints are defined here. A path prefix `/product` is specified at controller level to avoid duplication in each route.

- `RoleGuard` is used at controller level to perform role checking on each route to ensure authorized access.

- `@Roles([Role.Admin])` decorator is used for POST, PUT, DELETE method to restrict only admin access to these routes.

- `@ApiOkCommonResponse()` decorator is used in each route for standardization across communication.