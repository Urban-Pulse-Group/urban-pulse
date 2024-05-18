import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('posts').del();

  // Helper function to generate random date within the last month
  const getRandomDate = () => {
    const end = new Date();
    const start = new Date();
    start.setMonth(start.getMonth() - 1);
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  };

  // Helper function to generate random number of likes
  const getRandomLikes = () => {
    return Math.floor(Math.random() * 2001);
  };

  const posts = [
    {
      id: 'b1a7b6b1-327e-4a2b-b3e7-6e9a3d7f0c13',
      user_id: '80848392-cf08-4338-aa9d-bc7a67c06761',
      community_id: 'b5a7b6b1-327e-4a2b-b3e7-6e9a3d7f0c13',
      title: 'The Future of Affordable Housing in Brooklyn',
      img: 'https://images.unsplash.com/photo-1594909134223-8b5503d9fb65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGFmZm9yZGFibGUtaG91c2luZ3xlbnwwfHx8fDE2MjgwMjM5MTU&ixlib=rb-1.2.1&q=80&w=1080',
      slug: 'future-of-affordable-housing-brooklyn',
      content: `
        <h1>The Future of Affordable Housing in Brooklyn</h1>
        <p>As Brooklyn continues to grow, the need for affordable housing becomes more pressing. In this article, we explore the various initiatives and projects aimed at providing affordable housing to Brooklyn residents. Community involvement and policy changes are key to making these initiatives successful.</p>
        <p>The city's government has been working closely with developers to ensure that new projects include affordable housing units. This effort is part of a larger strategy to prevent displacement and maintain the cultural and economic diversity that Brooklyn is known for.</p>
        <p>One of the major challenges in achieving affordable housing is the rising cost of land and construction. To address this, the city is exploring various funding mechanisms and partnerships with private and non-profit organizations. These collaborations are essential for creating sustainable and long-term solutions.</p>
        <p>In addition to new construction, there are also efforts to preserve existing affordable housing. This includes initiatives to renovate and upgrade older buildings, ensuring that they remain safe and livable for residents. Preservation is a cost-effective way to maintain the current stock of affordable housing and prevent further displacement.</p>
        <p>Community engagement is a critical component of these initiatives. Residents are encouraged to participate in public meetings and provide input on proposed projects. This ensures that the needs and concerns of the community are addressed, and that the projects are designed in a way that benefits everyone.</p>
        <p>Looking ahead, the future of affordable housing in Brooklyn will depend on the continued collaboration between the government, developers, and the community. By working together, it is possible to create a more equitable and inclusive city where everyone has access to safe and affordable housing.</p>
      `,
      created_at: getRandomDate(),
      likes: getRandomLikes()
    },
    {
      id: 'b2a7b6b1-327e-4a2b-b3e7-6e9a3d7f0c14',
      user_id: 'e84473fb-6dec-4b5e-810c-53ddb2006ebb',
      community_id: 'b5a7b6b1-327e-4a2b-b3e7-6e9a3d7f0c13',
      title: 'Affordable Housing Projects in Brooklyn',
      img: 'https://images.unsplash.com/photo-1518156678433-bfe7a8360e2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDIwfHxob3VzaW5nfGVufDB8fHx8MTYyODAyNTY5OA&ixlib=rb-1.2.1&q=80&w=1080',
      slug: 'affordable-housing-projects-brooklyn',
      content: `
        <h1>Affordable Housing Projects in Brooklyn</h1>
        <p>This article highlights the ongoing and upcoming affordable housing projects in Brooklyn aimed at providing affordable living spaces to residents.</p>
        <p>Brooklyn has seen a surge in new housing developments, with a significant portion dedicated to affordable housing. These projects are designed to accommodate a diverse range of residents, from low-income families to young professionals.</p>
        <p>One notable project is the redevelopment of the Atlantic Yards, which includes thousands of new affordable housing units. This mixed-use development aims to create a vibrant community with access to amenities such as parks, schools, and public transportation.</p>
        <p>Another key project is the rezoning of East New York, which is expected to bring in over 6,000 new affordable housing units. This initiative is part of the city's broader effort to revitalize underdeveloped neighborhoods and provide more housing options for residents.</p>
        <p>The city's Department of Housing Preservation and Development (HPD) is actively involved in these projects, providing funding and support to developers. HPD's goal is to ensure that the new housing units are truly affordable and accessible to those who need them most.</p>
        <p>These projects are not without challenges. Rising construction costs and limited land availability are significant hurdles. However, the city is committed to overcoming these obstacles through innovative solutions and partnerships with the private sector.</p>
        <p>Overall, these affordable housing projects represent a significant step forward in addressing Brooklyn's housing crisis. By providing more affordable housing options, the city can help ensure that all residents have a safe and stable place to call home.</p>
      `,
      created_at: getRandomDate(),
      likes: getRandomLikes()
    },
    {
      id: 'b3a7b6b1-327e-4a2b-b3e7-6e9a3d7f0c15',
      user_id: 'e007faa7-d4c6-457a-ba42-8c9fe25cadb2',
      community_id: 'b5a7b6b1-327e-4a2b-b3e7-6e9a3d7f0c13',
      title: 'Challenges in Affordable Housing in Brooklyn',
      img: 'https://images.unsplash.com/photo-1593659444240-03e399f16f9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFmZm9yZGFibGUtaG91c2luZ3xlbnwwfHx8fDE2MjgwMjU3MTE&ixlib=rb-1.2.1&q=80&w=1080',
      slug: 'challenges-affordable-housing-brooklyn',
      content: `
        <h1>Challenges in Affordable Housing in Brooklyn</h1>
        <p>Brooklyn faces several challenges when it comes to affordable housing. This article discusses these challenges and possible solutions to overcome them.</p>
        <p>One of the primary challenges is the high cost of land and construction. As property values continue to rise, it becomes increasingly difficult to build affordable housing without significant subsidies and incentives. The city is exploring various funding mechanisms to address this issue.</p>
        <p>Another challenge is the displacement of long-time residents due to gentrification. As neighborhoods become more desirable, rents and property prices increase, pushing out lower-income residents. To combat this, the city is implementing policies to protect tenants and preserve affordable housing.</p>
        <p>There is also a need for more supportive housing for individuals with special needs, such as the elderly and disabled. These populations require housing that is not only affordable but also accessible and equipped with the necessary services and support.</p>
        <p>Community opposition to new developments is another significant challenge. While there is broad support for affordable housing in principle, proposed projects often face resistance from local residents concerned about density, traffic, and changes to neighborhood character. Effective community engagement and communication are crucial to addressing these concerns.</p>
        <p>Finally, there is the challenge of balancing the need for affordable housing with other priorities, such as economic development and environmental sustainability. The city must find ways to integrate affordable housing into broader plans for urban growth and development.</p>
        <p>Despite these challenges, there are also many opportunities. Innovative design and construction techniques, public-private partnerships, and community-based approaches all offer potential solutions. By leveraging these opportunities, Brooklyn can continue to make progress towards its goal of providing affordable housing for all residents.</p>
      `,
      created_at: getRandomDate(),
      likes: getRandomLikes()
    },
    {
      id: 'b4a7b6b1-327e-4a2b-b3e7-6e9a3d7f0c16',
      user_id: '47c684d7-f340-4e15-a932-534eb0a920b5',
      community_id: 'b5a7b6b1-327e-4a2b-b3e7-6e9a3d7f0c13',
      title: 'Affordable Housing Policies in Brooklyn',
      img: 'https://images.unsplash.com/photo-1522262251512-dc41e8fcf5c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHBvbGljaWVzfGVufDB8fHx8MTYyODAyNTc0Nw&ixlib=rb-1.2.1&q=80&w=1080',
      slug: 'affordable-housing-policies-brooklyn',
      content: `
        <h1>Affordable Housing Policies in Brooklyn</h1>
        <p>This article provides an overview of the policies in place to promote affordable housing in Brooklyn.</p>
        <p>The city's affordable housing policy is guided by several key principles, including inclusivity, sustainability, and community engagement. These principles are reflected in various initiatives and programs aimed at increasing the supply of affordable housing.</p>
        <p>One of the main policies is the Mandatory Inclusionary Housing (MIH) program, which requires developers to include affordable units in new residential projects. This policy ensures that affordable housing is integrated into neighborhoods and prevents segregation by income.</p>
        <p>The city also offers various tax incentives and subsidies to encourage the development of affordable housing. These financial tools help offset the high costs of land and construction, making it more feasible for developers to build affordable units.</p>
        <p>In addition to new construction, the city is committed to preserving existing affordable housing. This includes funding for repairs and renovations, as well as legal assistance for tenants. Preservation efforts are crucial for maintaining the current stock of affordable housing and preventing displacement.</p>
        <p>Community engagement is a cornerstone of the city's housing policy. Residents are encouraged to participate in the planning and development process, providing input on proposed projects and policies. This ensures that the needs and concerns of the community are taken into account.</p>
        <p>Environmental sustainability is another important aspect of the city's housing policy. New developments are required to meet certain environmental standards, such as energy efficiency and green building practices. This helps create healthy and sustainable living environments for residents.</p>
        <p>Overall, the city's affordable housing policies are designed to create a more equitable and inclusive Brooklyn. By promoting inclusivity, sustainability, and community engagement, the city aims to ensure that all residents have access to safe and affordable housing.</p>
      `,
      created_at: getRandomDate(),
      likes: getRandomLikes()
    },
    {
      id: 'b5a7b6b1-327e-4a2b-b3e7-6e9a3d7f0c17',
      user_id: '6cf9482e-a679-47ca-9b99-cdfcaf504b3f',
      community_id: 'b5a7b6b1-327e-4a2b-b3e7-6e9a3d7f0c13',
      title: 'Community Involvement in Affordable Housing in Brooklyn',
      slug: 'community-involvement-affordable-housing-brooklyn',
      content: `
        <h1>Community Involvement in Affordable Housing in Brooklyn</h1>
        <p>Community involvement is crucial in addressing the affordable housing crisis. This article discusses the role of community organizations and residents in promoting affordable housing in Brooklyn.</p>
        <p>Brooklyn's community organizations play a vital role in advocating for affordable housing. These groups work to ensure that the voices of residents are heard in the planning and development process. They also provide valuable services, such as tenant support, legal assistance, and educational programs.</p>
        <p>One of the key ways community organizations contribute to affordable housing is through advocacy. By organizing rallies, petitions, and public meetings, these groups raise awareness about housing issues and push for policy changes. Their efforts have led to significant victories, such as the implementation of rent control measures and increased funding for affordable housing.</p>
        <p>Residents themselves are also essential in promoting affordable housing. By participating in community meetings, providing input on proposed projects, and volunteering with local organizations, residents can help shape the future of their neighborhoods. Their involvement ensures that affordable housing developments meet the needs of the community and reflect its values.</p>
        <p>In addition to advocacy, community organizations often partner with developers and the city to create affordable housing. These partnerships can take various forms, such as joint ventures, community land trusts, and cooperative housing. By working together, these stakeholders can leverage their resources and expertise to create sustainable and affordable housing solutions.</p>
        <p>Education is another important aspect of community involvement. By educating residents about their rights, available resources, and the development process, community organizations empower individuals to take an active role in promoting affordable housing. Educational programs can include workshops, seminars, and informational campaigns.</p>
        <p>Overall, community involvement is a key factor in the success of affordable housing initiatives. By working together, community organizations, residents, developers, and the city can create a more equitable and inclusive Brooklyn where everyone has access to affordable housing.</p>
      `,
      created_at: getRandomDate(),
      likes: getRandomLikes()
    },
    {
      id: 'b6a7b6b1-327e-4a2b-b3e7-6e9a3d7f0c18',
      user_id: 'ddf87729-d8c2-465c-a7fa-a93f15ab2e7c',
      community_id: 'b5a7b6b1-327e-4a2b-b3e7-6e9a3d7f0c13',
      title: 'Affordable Housing: A Path Forward for Brooklyn',
      img: 'https://images.unsplash.com/photo-1522204519205-452f3db129b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGhvbWVzfGVufDB8fHx8MTYyODAyNTc0Nw&ixlib=rb-1.2.1&q=80&w=1080',
      slug: 'affordable-housing-path-forward-brooklyn',
      content: `
        <h1>Affordable Housing: A Path Forward for Brooklyn</h1>
        <p>Brooklyn faces significant challenges in providing affordable housing, but there are also opportunities to create lasting solutions. This article explores potential paths forward for affordable housing in Brooklyn.</p>
        <p>One promising approach is the development of mixed-income housing. By integrating affordable units into market-rate developments, the city can create economically diverse communities and reduce the stigma associated with affordable housing. Mixed-income housing also ensures that affordable units are spread throughout the city, rather than concentrated in specific areas.</p>
        <p>Another important strategy is the use of community land trusts (CLTs). CLTs are non-profit organizations that acquire and hold land for the benefit of the community, ensuring that it remains affordable in perpetuity. By removing land from the speculative market, CLTs can provide long-term affordable housing and prevent displacement.</p>
        <p>Public-private partnerships are also key to addressing the affordable housing crisis. By collaborating with private developers, the city can leverage additional resources and expertise to create affordable housing. These partnerships can take various forms, such as joint ventures, tax incentives, and regulatory flexibility.</p>
        <p>Preservation of existing affordable housing is another critical component of the strategy. This includes efforts to repair and renovate older buildings, as well as legal protections for tenants. Preservation is often more cost-effective than new construction and helps maintain the current stock of affordable housing.</p>
        <p>Community engagement is essential for the success of affordable housing initiatives. Residents should be involved in the planning and development process, providing input and feedback on proposed projects. This ensures that affordable housing meets the needs of the community and is designed in a way that benefits everyone.</p>
        <p>Overall, addressing the affordable housing crisis in Brooklyn will require a multifaceted and collaborative approach. By exploring innovative solutions and working together, the city can create a more equitable and inclusive future where everyone has access to safe and affordable housing.</p>
      `,
      created_at: getRandomDate(),
      likes: getRandomLikes()
    },
    {
      id: 'b7a7b6b1-327e-4a2b-b3e7-6e9a3d7f0c19',
      user_id: 'c2cc1029-13a5-4630-b494-af0766d95c58',
      community_id: 'b5a7b6b1-327e-4a2b-b3e7-6e9a3d7f0c13',
      title: 'Innovative Solutions for Affordable Housing in Brooklyn',
      img: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGFmZm9yZGFibGUtaG91c2luZ3xlbnwwfHx8fDE2MjgwMjM5MTU&ixlib=rb-1.2.1&q=80&w=1080',
      slug: 'innovative-solutions-affordable-housing-brooklyn',
      content: `
        <h1>Innovative Solutions for Affordable Housing in Brooklyn</h1>
        <p>Brooklyn is exploring innovative solutions to address the affordable housing crisis. This article highlights some of the most promising approaches.</p>
        <p>One innovative solution is the use of modular construction. Modular units are built off-site and then assembled on-site, significantly reducing construction time and costs. This method is particularly useful for creating affordable housing quickly and efficiently.</p>
        <p>Another promising approach is the conversion of underutilized commercial spaces into residential units. By repurposing vacant office buildings, warehouses, and retail spaces, the city can create new affordable housing without the need for new construction. This approach also helps revitalize underused areas and brings new life to neighborhoods.</p>
        <p>The city is also exploring the use of accessory dwelling units (ADUs) to increase the supply of affordable housing. ADUs are smaller, secondary units built on the same property as a single-family home. They can provide additional rental income for homeowners and create more affordable housing options.</p>
        <p>Public land banking is another innovative strategy. The city can acquire and hold land for future affordable housing development, ensuring that it remains affordable in the long term. Land banking helps prevent land speculation and provides a stable foundation for affordable housing projects.</p>
        <p>Community-based approaches are also essential. Community land trusts (CLTs) and cooperative housing models empower residents to take control of their housing and ensure that it remains affordable. These models promote community ownership and create long-term stability for residents.</p>
        <p>Overall, innovative solutions are key to addressing Brooklyn's affordable housing crisis. By thinking creatively and exploring new approaches, the city can create a more inclusive and equitable future where everyone has access to safe and affordable housing.</p>
      `,
      created_at: getRandomDate(),
      likes: getRandomLikes()
    },
    {
      id: 'b8a7b6b1-327e-4a2b-b3e7-6e9a3d7f0c20',
      user_id: 'e62da9bc-b5ec-42a8-84ea-ad642d8332ef',
      community_id: 'b5a7b6b1-327e-4a2b-b3e7-6e9a3d7f0c13',
      title: 'The Role of Non-Profits in Affordable Housing in Brooklyn',
      slug: 'role-non-profits-affordable-housing-brooklyn',
      content: `
        <h1>The Role of Non-Profits in Affordable Housing in Brooklyn</h1>
        <p>Non-profit organizations play a crucial role in addressing the affordable housing crisis in Brooklyn. This article explores their contributions and impact.</p>
        <p>Non-profit organizations provide a wide range of services to support affordable housing. These include advocacy, tenant support, and housing development. By working closely with residents and the city, non-profits help ensure that affordable housing initiatives meet the needs of the community.</p>
        <p>One notable organization is the Fifth Avenue Committee, which develops affordable housing and provides tenant services. Their holistic approach addresses both the housing and support needs of residents, creating stable and sustainable communities.</p>
        <p>Another key organization is the Brooklyn Community Housing and Services (BCHS), which provides supportive housing for individuals with special needs. BCHS offers a range of services, including healthcare, counseling, and job training, to help residents achieve stability and independence.</p>
        <p>Non-profits also play a vital role in advocating for policy changes. Organizations such as the New York Housing Conference work to raise awareness about housing issues and push for policies that support affordable housing. Their efforts have led to significant victories, such as increased funding for affordable housing and the implementation of rent control measures.</p>
        <p>Community engagement is another important aspect of non-profit work. By involving residents in the planning and development process, non-profits help ensure that affordable housing meets the needs of the community. This includes organizing public meetings, providing educational programs, and facilitating community input.</p>
        <p>Overall, non-profit organizations are essential partners in the fight for affordable housing in Brooklyn. Their dedication and expertise make a significant difference in the lives of residents and contribute to the overall well-being of the community.</p>
      `,
      created_at: getRandomDate(),
      likes: getRandomLikes()
    },
    {
      id: 'b9a7b6b1-327e-4a2b-b3e7-6e9a3d7f0c21',
      user_id: '6453333f-ae0e-4ed9-b3a5-5a3a0c1dbb1a',
      community_id: 'b5a7b6b1-327e-4a2b-b3e7-6e9a3d7f0c13',
      title: 'Affordable Housing and Public Health in Brooklyn',
      img: 'https://images.unsplash.com/photo-1508697014387-c52c817fd91b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGhvbWVzfGVufDB8fHx8MTYyODAyNTc0Nw&ixlib=rb-1.2.1&q=80&w=1080',
      slug: 'affordable-housing-public-health-brooklyn',
      content: `
        <h1>Affordable Housing and Public Health in Brooklyn</h1>
        <p>Affordable housing is not just a housing issue; it is also a public health concern. This article explores the intersection of affordable housing and public health in Brooklyn.</p>
        <p>Safe and stable housing is essential for good health. Without it, individuals are at greater risk of a range of health problems, including chronic illnesses, mental health issues, and infectious diseases. Affordable housing provides a foundation for overall well-being and helps reduce health disparities.</p>
        <p>The city's Department of Health and Mental Hygiene (DOHMH) is actively involved in affordable housing initiatives. DOHMH works to ensure that new housing developments meet health and safety standards, providing residents with healthy living environments. This includes efforts to reduce lead exposure, improve air quality, and promote energy efficiency.</p>
        <p>Supportive housing is another important aspect of the city's approach. Supportive housing combines affordable housing with on-site services such as healthcare, counseling, and job training. This model is particularly effective for individuals with special needs, helping them achieve stability and independence.</p>
        <p>Community-based organizations also play a vital role in addressing the health needs of residents. These organizations provide a range of services, including health education, screenings, and referrals to healthcare providers. By working closely with residents, they help ensure that individuals have access to the care they need.</p>
        <p>Overall, addressing the intersection of affordable housing and public health is essential for creating a healthy and equitable Brooklyn. By providing safe and stable housing, the city can improve health outcomes for residents and reduce health disparities.</p>
      `,
      created_at: getRandomDate(),
      likes: getRandomLikes()
    },
   
  ];

  await knex('posts').insert(posts);
}