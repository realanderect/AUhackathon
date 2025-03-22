import knex from 'knex';
import path from 'path';

console.log('[DEBUG] Initializing database connection');

const db = knex({
  client: 'better-sqlite3',
  connection: {
    filename: path.resolve(__dirname, '../../database.sqlite'),
  },
  useNullAsDefault: true,
});

// Initialize database with users table
async function initializeDatabase() {
  try {
    const hasUsersTable = await db.schema.hasTable('users');
    
    if (!hasUsersTable) {
      console.log('[DEBUG] Creating users table');
      await db.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.timestamp('created_at').defaultTo(db.fn.now());
      });
      console.log('[DEBUG] Users table created successfully');
    } else {
      console.log('[DEBUG] Users table already exists');
    }
  } catch (error) {
    console.error('[ERROR] Database initialization failed:', error);
    throw error;
  }
}

// Initialize database on startup
initializeDatabase().catch(console.error);

export { db, initializeDatabase };
