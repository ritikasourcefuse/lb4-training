import {ProductServicesApplication} from './application';

export async function migrate(args: string[]) {
  const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter';
  console.log('Migrating schemas (%s existing schema)', existingSchema);

  const app = new ProductServicesApplication();
  await app.boot();

  // Debug: Inspect data sources and models
  const dataSources = app.find('datasources.*');
  console.log('Registered datasources:', dataSources.map(ds => ds.key));

  const models = app.find('models.*');
  console.log('Registered models:', models.map(m => m.key));

  await app.migrateSchema({existingSchema});

  console.log('Migration completed.');
  process.exit(0);
}

migrate(process.argv).catch(err => {
  console.error('Cannot migrate database schema', err);
  process.exit(1);
});
