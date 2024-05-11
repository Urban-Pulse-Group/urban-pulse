import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE');

  return  knex.raw(`
    INSERT INTO users (id, name, username, email, password, roles)
    VALUES
    ('e1e9f5f6-3bb2-4412-8fc6-6047a6b2c676', 'Gonzalo Ramero', 'Goatzalo', 'DontUseVar@marcy.org', 'DoYouMind123', ARRAY['Admin']),
    ('d8b8b6c7-e487-4761-8d5c-4d56e6e95c62', 'Ben Spector', 'benspector', 'ben@marcy.org', 'ImGoodAtEverythingSomehow123', ARRAY['Admin']),
    ('b39619b5-688b-4c9e-965d-2e3ae7b25b47', 'Motun Bolumole', 'motunbolumole', 'L&D@Marcy.org', 'DoYourL&DHomework', ARRAY['admin'])
  `);
}
