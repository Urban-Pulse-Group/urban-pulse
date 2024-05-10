import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE');

  return await knex.raw(`
    INSERT INTO users ( name, username, email, password, roles)
    VALUES
    ('Gonzalo Ramero', 'Goatzalo', 'DontUseVar@marcy.org', 'DoYouMind123', ARRAY['Admin']),
    ( 'Ben Spector', 'benspector', 'ben@marcy.org', 'ImGoodAtEverythingSomehow123', ARRAY['Admin']),
    ( 'Motun Bolumole', 'motunbolumole', 'L&D@Marcy.org', 'DoYourL&DHomework', ARRAY['admin'])
  `);
}
