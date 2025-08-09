import React from 'react';

const featured = [
  {
    title: 'MLB by CANDY',
    image: '/moments/CANDY_MLB_Bryce-Harper.png',
    link: 'https://www.candy.io/mlb/editions/dff6942a-b662-4a9b-a1dd-95e07de3a9de',
  },
  {
    title: 'MLB by CANDY',
    image: '/moments/CANDY_MLB_JT-Realmuto.png',
    link: 'https://www.candy.io/mlb/editions/851115aa-a8e6-49f4-9269-7f7c539e0997',
  },
  {
    title: 'MLB by CANDY',
    image: '/moments/CANDY_MLB_Zack-Wheeler.png',
    link: 'https://www.candy.io/mlb/editions/2e771948-27ae-47ea-b4db-a50eba657c2c',
  },
  {
    title: 'MLB by CANDY',
    image: '/moments/CANDY_MLB_Trea-Turner.png',
    link: 'https://www.candy.io/mlb/editions/f9c24076-4486-4265-96dd-54904a21fc53',
  },
  {
    title: 'MLB by CANDY',
    image: '/moments/CANDY_MLB_Cal-Quantrill.png',
    link: 'https://www.candy.io/mlb/editions/2d3b2980-80dd-4217-9d56-3e65354997a7',
  },{
    title: 'MLB by CANDY',
    image: '/moments/CANDY_MLB_Julio-Rodriguez.png',
    link: 'https://www.candy.io/mlb/editions/5e49f053-f35b-49f7-8953-c0dc351871b9',
  },{
    title: 'MLB by CANDY',
    image: '/moments/CANDY_MLB_Jackson-Chourio.png',
    link: 'https://www.candy.io/mlb/editions/74fe05bc-0a99-446f-b9f5-989fa0fb6a05',
  },{
    title: 'MLB by CANDY',
    image: '/moments/CANDY_MLB_Salvador-Perez.png',
    link: 'https://www.candy.io/mlb/editions/0c75bbad-de8e-442a-adec-404f534519c2',
  },
  {
    title: 'MLB by CANDY',
    image: '/moments/CANDY_MLB_Shohei-Ohtani.png',
    link: 'https://www.candy.io/mlb/editions/25dd9df9-2ee9-4bba-8ed1-6b0037fa79a2',
  },
  {
    title: 'MLB by CANDY',
    image: '/moments/CANDY_MLB_Mookie-Betts.png',
    link: 'https://www.candy.io/mlb/editions/ac23ec2b-da83-46d4-a5f5-c325db10a031',
  },
  {
    title: 'MLB by CANDY',
    image: '/moments/CANDY_MLB_Pete-Crow-Armstrong.png',
    link: 'https://www.candy.io/mlb/editions/dfaecf7b-50c9-48b3-bd49-523b473c15a4',
  },
  {
    title: 'MLB by CANDY',
    image: '/moments/CANDY_MLB_Oneil-Cruz.png',
    link: 'https://www.candy.io/mlb/editions/001c1c13-a775-499c-8017-331bf182178e',
  },
  {
    title: 'NFL All Day by Dapper Labs',
    image: '/moments/NFL-ALLDAY_TJ-Watt.png',
    link: 'https://nflallday.com/moments/d17d06c4-becf-41dd-b34e-0b94a4e3dd1e',
  },
  {
    title: 'NFL All Day by Dapper Labs',
    image: '/moments/NFL-ALLDAY_Saquon-Barkley.png',
    link: 'https://nflallday.com/moments/d50106c0-a496-4803-9860-80c3a1d641d8',
  },
  {
    title: "NFL All Day by Dapper Labs",
    image: '/moments/NFL-ALLDAY_JaMarr-Chase.png',
    link: 'https://nflallday.com/moments/292571db-888a-4ee0-a0de-c0662dd7a458',
  },
  {
    title: 'NFL All Day by Dapper Labs',
    image: '/moments/NFL-ALLDAY_Derek-Henry.png',
    link: 'https://nflallday.com/moments/7dda3a64-4603-44e9-93dd-f19fb5aaca9b',
  },
  {
    title: 'NFL All Day by Dapper Labs',
    image: '/moments/NFL-ALLDAY_Ben-Roethlisberger.png',
    link: 'https://nflallday.com/moments/b2109dda-832b-4587-b0e6-485e39c0d141',
  },
  {
    title: 'NFL All Day by Dapper Labs',
    image: '/moments/NFL-ALLDAY_Aaron-Rodgers.png',
    link: 'https://nflallday.com/moments/baf653c1-844c-4d8c-97d2-67cc706ada94',
  },
  {
    title: 'NFL All Day by Dapper Labs',
    image: '/moments/NFL-ALLDAY_Patrick-Mahomes.png',
    link: 'https://nflallday.com/moments/ef92ca22-410a-407b-b2d4-7c2113646a4d',
  },
  {
    title: 'NFL All Day by Dapper Labs',
    image: '/moments/NFL-ALLDAY_Josh-Allen.png',
    link: 'https://nflallday.com/moments/1cbb318b-49a2-41ae-a65c-c8e9a3e961ea',
  },
  {
    title: 'NFL All Day by Dapper Labs',
    image: '/moments/NFL-ALLDAY_Tyreek-Hill.png',
    link: 'https://nflallday.com/moments/7f06e61b-5e1f-4da3-b25f-36499d502c62',
  },
  {
    title: 'NFL All Day by Dapper Labs',
    image: '/moments/NFL-ALLDAY_Bijan-Robinson.png',
    link: 'https://nflallday.com/moments/7a316581-b133-4f47-9d09-c9dd0820886f',
  },
  {
    title: 'NFL All Day by Dapper Labs',
    image: '/moments/NFL-ALLDAY_Jahmyr-Gibbs.png',
    link: 'https://nflallday.com/moments/f408e7f8-d550-4a5d-8255-15b57d283606',
  },
  {
    title: 'NFL All Day by Dapper Labs',
    image: '/moments/NFL-ALLDAY_Tua-Tagovailoa.png',
    link: 'https://nflallday.com/moments/bc5dd729-e85d-4d4e-812a-b232b4ded145',
  },
  {
    title: 'Sweet Futures - NCAA Football by CANDY',
    image: '/moments/CANDY_Sweet-Futures_Bijan-Robinson.png',
    link: 'https://www.candy.io/sweetfutures/editions/8a8d5c0e-8de9-4af3-beff-e9bdb2d63acc',
  },
  {
    title: 'Sweet Futures - NCAA Football by CANDY',
    image: '/moments/CANDY_Sweet-Futures_Bo-Nix.png',
    link: 'https://www.candy.io/sweetfutures/editions/c3d1c750-ef42-45c0-9ca8-71b91aae2b3d',
  },
  {
    title: 'NBA Top Shot by Dapper Labs',
    image: '/moments/NBA-TopShots_Nikola-Jokic_1.png',
    link: 'https://nbatopshot.com/moment/906d5b88-2cb8-4ce7-a210-7ebb3c4083aa',
  },
  {
    title: 'NBA Top Shot by Dapper Labs',
    image: '/moments/NBA-TopShots_Nikola-Jokic_2.png',
    link: 'https://nbatopshot.com/moment/f2e6c05f-2acc-4cfd-96dd-3ad976fe6704',
  },
  {
    title: 'NBA Top Shot by Dapper Labs',
    image: '/moments/NBA-TopShots_Lebron-James.png',
    link: 'https://nbatopshot.com/moment/e3830e42-2184-424f-ab34-840a614f595a',
  },
  {
    title: 'NBA Top Shot by Dapper Labs',
    image: '/moments/NBA-TopShots_Giannis_Antetokounmpo.png',
    link: 'https://nbatopshot.com/moment/099328d9-ee2b-41e4-9aa4-19fb5c101ee2',
  },
  {
    title: 'NBA Top Shot by Dapper Labs',
    image: '/moments/NBA-TopShots_Kevin-Durant.png',
    link: 'https://nbatopshot.com/moment/376c4fa2-c507-4f25-abdf-f596076c0203',
  },
  {
    title: 'NBA Top Shot by Dapper Labs',
    image: '/moments/NBA-TopShots_Steph-Curry.png',
    link: 'https://nbatopshot.com/moment/734e74e9-8a2d-4602-bb3f-d11eaf1cc05b',
  },
  {
    title: 'NASCAR by CANDY',
    image: '/moments/CANDY_NASCAR_Alex-Bowman.png',
    link: 'https://www.candy.io/racing/editions/f976cc81-54fe-4294-ae13-82570f3d03b6',
  },
  {
    title: 'NASCAR by CANDY',
    image: '/moments/CANDY_NASCAR_Denny-Hamlin.png',
    link: 'https://www.candy.io/racing/editions/66caa3fb-8592-482d-b56a-0687e62a63e4',
  },
  {
    title: 'NASCAR by CANDY',
    image: '/moments/CANDY_NASCAR_Kyle-Larson.png',
    link: 'https://www.candy.io/racing/editions/22bbaef5-888c-4fa0-95a5-aa6d4faa44d8',
  },
  {
    title: 'NASCAR by CANDY',
    image: '/moments/CANDY_NASCAR_Chase-Elliott.png',
    link: 'https://www.candy.io/racing/editions/45f52bf9-430a-4b22-ab9e-8b6707f58429',
  },
];

const FeaturedMoments = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {featured.map((moment, index) => (
            <a
                href={moment.link}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#222528] border-4 border-transparent rounded-[1rem] overflow-hidden transition duration-300 ease-in-out hover:border-[#FEDA04]"

            >
                <img
                src={moment.image}
                alt={moment.title}
                className="w-full object-contain aspect-[3/4]"
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
