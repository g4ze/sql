import { Client } from 'pg'
 
const client = new Client({
  connectionString: "postgresql://postgres:mysecretpassword@localhost/postgres"
})

async function createUsersTable() {
    await client.connect()
    const result = await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `)
    console.log(result)
    client.end()
}

// Async function to insert data into a table
async function insertData(username: string, email: string, password: string) {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'mysecretpassword',
  });

  try {
    await client.connect(); // Ensure client connection is established
    // Use parameterized query to prevent SQL injection
    const insertQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
    const values = [username, email, password];
    const res = await client.query(insertQuery, values);
    console.log('Insertion success:', res); // Output insertion result
  } catch (err) {
    console.error('Error during the insertion:', err);
  } finally {
    await client.end(); // Close the client connection
  }
}

async function getUser(email: string) {
  const client = new Client({
    connectionString: "postgresql://postgres:mysecretpassword@localhost/postgres"
  });
  

try {
  await client.connect(); // Ensure client connection is established
  const query = 'SELECT * FROM users WHERE email = $1';
  const values = [email];
  const result = await client.query(query, values);
  
  if (result.rows.length > 0) {
    console.log('User found:', result.rows[0]); // Output user data
    return result.rows[0]; // Return the user data
  } else {
    console.log('No user found with the given email.');
    return null; // Return null if no user was found
  }
} catch (err) {
  console.error('Error during fetching user:', err);
  throw err; // Rethrow or handle error appropriately
} finally {
  await client.end(); // Close the client connection
}
}

// STEP 1 : 
createUsersTable();
// STEP : 2
// insertData('username5', 'user5@example.com', 'user_password').catch(console.error);
// STEP 3 :
// getUser('user5@example.com').catch(console.error);


