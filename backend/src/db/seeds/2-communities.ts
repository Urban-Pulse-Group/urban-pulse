import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('communities').del();

  // Insert seed entries
  const communities = [
    {
      id: 'b5a7b6b1-327e-4a2b-b3e7-6e9a3d7f0c13',
      user_id: '80848392-cf08-4338-aa9d-bc7a67c06761', // John Doe
      title: 'Affordable Housing. Brooklyn, NY',
      img: 'https://www.brownstoner.com/wp-content/uploads/2016/10/affordable-housing-brooklyn-greenpoint-5-blue-slip-rend-2.jpg',
      description: 'Discussion about affordable housing options in Brooklyn, NY.',
      slugs: 'affordable-housing-brooklyn-ny'
    },
    {
      id: '9d1f3b4c-4c58-4b8d-9bfc-eda2f83e5f97',
      user_id: 'e84473fb-6dec-4b5e-810c-53ddb2006ebb', // Jane Smith
      title: 'Homelessness Crisis. Los Angeles, CA',
      img: 'https://cdn.vox-cdn.com/thumbor/C57to2p4k3_gv1JTFUnTquacLGo=/0x0:3000x2000/1720x0/filters:focal(0x0:3000x2000):format(webp):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/22512691/GettyImages_1147031674.jpg',
      description: 'Addressing the homelessness crisis in Los Angeles, CA.',
      slugs: 'homelessness-crisis-los-angeles-ca'
    },
    {
      id: 'b68f2c8a-2b29-453a-aea0-62c0db6eb5a1',
      user_id: 'e007faa7-d4c6-457a-ba42-8c9fe25cadb2', // Alice Johnson
      title: 'Income Inequality. Chicago, IL',
      img: 'https://www.brookings.edu/wp-content/uploads/2015/12/Reeves-1221001.png',
      description: 'Discussions on income inequality issues in Chicago, IL.',
      slugs: 'income-inequality-chicago-il'
    },
    {
      id: '19ad4e0b-2c4c-4a2c-9c57-65c6d69b5f7d',
      user_id: '47c684d7-f340-4e15-a932-534eb0a920b5', // Bob Brown
      title: 'Wages and Employment. San Francisco, CA',
      img: 'https://www.openthebooks.com/assets/1/14/66_san_fran.jpg?71303',
      description: 'Conversations about wages and employment in San Francisco, CA.',
      slugs: 'wages-employment-san-francisco-ca'
    },
    {
      id: '713c0b9f-30c4-4b4a-a752-2a7c96d8c98b',
      user_id: '6cf9482e-a679-47ca-9b99-cdfcaf504b3f', // Charlie Davis
      title: 'Crime and Safety. Detroit, MI',
      img: 'https://www.bridgemi.com/sites/default/files/styles/full_width_image/public/2022-08/antionette.jpg?itok=WAPXXceh',
      description: 'Discussions on crime and safety issues in Detroit, MI.',
      slugs: 'crime-safety-detroit-mi'
    },
    {
      id: 'bb69a5d9-1dc4-4c45-a779-b70b22d42f79',
      user_id: 'ddf87729-d8c2-465c-a7fa-a93f15ab2e7c', // Diana Evans
      title: 'Public Health. Seattle, WA',
      img: 'https://hiprc.org/wp-content/uploads/2022/06/Download-need-to-find-new.png',
      description: 'Discussion on public health concerns in Seattle, WA.',
      slugs: 'public-health-seattle-wa'
    },
    {
      id: 'c98d7a3b-6866-422e-8702-8e3390c67e30',
      user_id: 'c2cc1029-13a5-4630-b494-af0766d95c58', // Edward Wilson
      title: 'Education System. Boston, MA',
      img: 'https://media.wbur.org/wp/2023/07/0530_savannah-10-2-1920x1280.jpg',
      description: 'Discussion on the education system in Boston, MA.',
      slugs: 'education-system-boston-ma'
    },
    {
      id: 'f1e47b90-1c75-49f8-a8f2-53b90f798084',
      user_id: 'e62da9bc-b5ec-42a8-84ea-ad642d8332ef', // Fiona White
      title: 'Transportation Issues. Austin, TX',
      img: 'https://austin.culturemap.com/media-library/austin-traffic-highway-i-35-congestion.jpg?id=31482740&width=2000&height=1500&quality=85&coordinates=0%2C0%2C0%2C0',
      description: 'Discussion on transportation issues in Austin, TX.',
      slugs: 'transportation-issues-austin-tx'
    },
    {
      id: '0f7d1db7-5de1-4568-bb36-b77d8d0b1789',
      user_id: '6453333f-ae0e-4ed9-b3a5-5a3a0c1dbb1a', // George Harris
      title: 'Environmental Concerns. Denver, CO',
      img: 'https://wp-denverite.s3.amazonaws.com/wp-content/uploads/sites/4/2018/08/180820-AIR-QUALITY-SKYLINE-CITYSCAPE-POLLUTION-WEATHER-COWX-KEVINJBEATY-02.jpg',
      description: 'Discussion on environmental concerns in Denver, CO.',
      slugs: 'environmental-concerns-denver-co'
    },
    {
      id: '5feff8e5-43a1-47ea-9b8e-fc6e810394e1',
      user_id: '1db7ef72-4ed0-4ea7-a073-32b73d05f55d', // Hannah Martin
      title: 'Community Events. Miami, FL',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3Hzi1Gsklm10fm1SoAO8OnV61GI0l2rSjHg&s',
      description: 'Discussion on community events in Miami, FL.',
      slugs: 'community-events-miami-fl'
    }
  ];

  await knex('communities').insert(communities);
}