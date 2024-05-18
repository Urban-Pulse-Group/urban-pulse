import type { Knex } from "knex";
import bcrypt from "bcryptjs";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Insert seed entries
  const users = [
    {
      id: '80848392-cf08-4338-aa9d-bc7a67c06761',
      name: 'John Doe',
      username: 'johndoe',
      email: 'john.doe@example.com',
      password: await bcrypt.hash('password123', 10),
      img: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      id: 'e84473fb-6dec-4b5e-810c-53ddb2006ebb',
      name: 'Jane Smith',
      username: 'janesmith',
      email: 'jane.smith@example.com',
      password: await bcrypt.hash('password123', 10),
      img: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
      id: 'e007faa7-d4c6-457a-ba42-8c9fe25cadb2',
      name: 'Alice Johnson',
      username: 'alicejohnson',
      email: 'alice.johnson@example.com',
      password: await bcrypt.hash('password123', 10),
      img: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    {
      id: '47c684d7-f340-4e15-a932-534eb0a920b5',
      name: 'Bob Brown',
      username: 'bobbrown',
      email: 'bob.brown@example.com',
      password: await bcrypt.hash('password123', 10),
      img: 'https://randomuser.me/api/portraits/men/2.jpg'
    },
    {
      id: '6cf9482e-a679-47ca-9b99-cdfcaf504b3f',
      name: 'Charlie Davis',
      username: 'charliedavis',
      email: 'charlie.davis@example.com',
      password: await bcrypt.hash('password123', 10),
      img: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    {
      id: 'ddf87729-d8c2-465c-a7fa-a93f15ab2e7c',
      name: 'Diana Evans',
      username: 'dianaevans',
      email: 'diana.evans@example.com',
      password: await bcrypt.hash('password123', 10),
      img: 'https://randomuser.me/api/portraits/women/3.jpg'
    },
    {
      id: 'c2cc1029-13a5-4630-b494-af0766d95c58',
      name: 'Edward Wilson',
      username: 'edwardwilson',
      email: 'edward.wilson@example.com',
      password: await bcrypt.hash('password123', 10),
      img: 'https://randomuser.me/api/portraits/men/4.jpg'
    },
    {
      id: 'e62da9bc-b5ec-42a8-84ea-ad642d8332ef',
      name: 'Fiona White',
      username: 'fionawhite',
      email: 'fiona.white@example.com',
      password: await bcrypt.hash('password123', 10),
      img: 'https://randomuser.me/api/portraits/women/4.jpg'
    },
    {
      id: '6453333f-ae0e-4ed9-b3a5-5a3a0c1dbb1a',
      name: 'George Harris',
      username: 'georgeharris',
      email: 'george.harris@example.com',
      password: await bcrypt.hash('password123', 10),
      img: 'https://randomuser.me/api/portraits/men/5.jpg'
    },
    {
      id: '1db7ef72-4ed0-4ea7-a073-32b73d05f55d',
      name: 'Hannah Martin',
      username: 'hannahmartin',
      email: 'hannah.martin@example.com',
      password: await bcrypt.hash('password123', 10),
      img: 'https://randomuser.me/api/portraits/women/5.jpg'
    }
  ];

  await knex('users').insert(users);
}
