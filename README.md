## IMPORTANT SETUP NOTES

#### Setup for local environment

1. Clone the project and npm install required packages.
2. Setup your localhost database.
3. Create and configure .env file in root folder. Please refer [here](#environment-variables-staging).
4. Generate migration file.
   `npm run migration:generate:dev`
5. Run data migration to sync your local database schema.
   `npm run migration:run:dev`
6. Start the application with `npm run start`.

#### Environment variables (local)

```typescript
DB_HOST="localhost"
DB_PORT="5432"
DB_USER="postgres"
DB_PASSWORD="sharon001104"
DB_DATABASE="MOTOR_INSURANCE_WEBSITE"
```

#### Solution
Kindly refer to the requirements [here](/notes/MS%20Assessment.pdf).

##### Database Setup
1. Configure typeorm & establish a connnection to database. Environment variales is used here to control over different environments.

2. Setup database migration scripts, including migration generate & migration run command. Migration is chosen over auto schema synchronization to prevent data lost in production environment. 

##### Project Setup 
1. Standardize responses using interceptor for mapping responses to a common DTO.

2. Define a generic and reusable API response for Swagger use.

##### Product Module
1. Create a product entity with common columns (eg. created date, updated date, etc) and appropriate column options, including column type, length, and precision & scale for price.

2. Declare DTOs for all requests & responses with data validation. Implement inheritance here for better code maintainability.