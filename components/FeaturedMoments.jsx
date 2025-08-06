import React from 'react';

const featured = [
  {
    title: 'T.J. Watt – NFL All Day',
    image: '/moments/NFL-ALLDAY_TJ-Watt.png',
    link: 'https://nflallday.com/moments/d17d06c4-becf-41dd-b34e-0b94a4e3dd1e',
  },
  {
    title: 'Saquon Barkley – NFL All Day',
    image: '/moments/NFL-ALLDAY_Saquon-Barkley.png',
    link: 'https://nflallday.com/moments/d50106c0-a496-4803-9860-80c3a1d641d8',
  },
  {
    title: "Ja'Marr Chase – NFL All Day",
    image: '/moments/NFL-ALLDAY_JaMarr-Chase.png',
    link: 'https://nflallday.com/moments/292571db-888a-4ee0-a0de-c0662dd7a458',
  },
  {
    title: 'Derrick Henry – NFL All Day',
    image: '/moments/NFL-ALLDAY_Derek-Henry.png',
    link: 'https://nflallday.com/moments/7dda3a64-4603-44e9-93dd-f19fb5aaca9b',
  },
  {
    title: 'Ben Roethlisberger – NFL All Day',
    image: '/moments/NFL-ALLDAY_Ben-Roethlisberger.png',
    link: 'https://nflallday.com/moments/b2109dda-832b-4587-b0e6-485e39c0d141',
  },
  {
    title: 'Aaron Rodgers – NFL All Day',
    image: '/moments/NFL-ALLDAY_Aaron-Rodgers.png',
    link: 'https://nflallday.com/moments/baf653c1-844c-4d8c-97d2-67cc706ada94',
  },
  {
    title: 'Nikola Jokic – Top Shot',
    image: '/moments/NBA-TopShots_Nikola-Jokic_1.png',
    link: 'https://nbatopshot.com/moment/906d5b88-2cb8-4ce7-a210-7ebb3c4083aa',
  },
  {
    title: 'Nikola Jokic – Top Shot',
    image: '/moments/NBA-TopShots_Nikola-Jokic_2.png',
    link: 'https://nbatopshot.com/moment/f2e6c05f-2acc-4cfd-96dd-3ad976fe6704',
  },
  {
    title: 'LeBron James – Top Shot',
    image: '/moments/NBA-TopShots_Lebron-James.png',
    link: 'https://nbatopshot.com/moment/e3830e42-2184-424f-ab34-840a614f595a',
  },
  {
    title: 'Giannis Antetokounmpo – Top Shot',
    image: '/moments/NBA-TopShots_Giannis_Antetokounmpo.png',
    link: 'https://nbatopshot.com/moment/099328d9-ee2b-41e4-9aa4-19fb5c101ee2',
  },
  {
    title: 'Kevin Durant – Top Shot',
    image: '/moments/NBA-TopShots_Kevin-Durant.png',
    link: 'https://nbatopshot.com/moment/376c4fa2-c507-4f25-abdf-f596076c0203',
  },
  {
    title: 'Steph Curry – Top Shot',
    image: '/moments/NBA-TopShots_Steph-Curry.png',
    link: 'https://nbatopshot.com/moment/734e74e9-8a2d-4602-bb3f-d11eaf1cc05b',
  },
];

const FeaturedMoments = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featured.map((moment, index) => (
            <a
                href={moment.link}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1e1e1e] border border-[#333] rounded-lg overflow-hidden hover:shadow-lg transition"
            >
                <img
                src={moment.image}
                alt={moment.title}
                className="w-full object-contain aspect-[3/4] bg-black"
                />
                <div className="p-4 text-white">
                <h3 className="text-md font-medium">{moment.title}</h3>
                </div>
            </a>
            ))}
        </div>
    </section>

  );
};

export default FeaturedMoments;
