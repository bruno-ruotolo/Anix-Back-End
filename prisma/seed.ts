import { PrismaClient } from "@prisma/client";

import {
  AnimeCreateData,
  AnimeGenreCreateData,
  GenderCreateData,
  GenreCreateData,
  SeasonCreateData,
  StatusCreateData,
  YearCreateData,
} from "../src/interfaces/createDataInterface.js";

const prisma = new PrismaClient();

async function main() {
  const status: StatusCreateData[] = [
    { name: "Watching" },
    { name: "Maybe" },
    { name: "Done" },
  ];

  const genres: GenreCreateData[] = [
    { name: "Adventure" }, //1
    { name: "Action" }, //2
    { name: "Comedy" }, //3
    { name: "Slice of Life" }, //4
    { name: "Drama" }, //5
    { name: "Fantasy" }, //6
    { name: "Supernatural" }, //7
    { name: "Magic" }, //8
    { name: "Mystery" }, //9
    { name: "Horror" }, //10
    { name: "Psychological" }, //11
    { name: "Sci-Fi" }, //12
    { name: "Romance" }, //13
    { name: "Game" }, //14
    { name: "Cyberpunk" }, //15
    { name: "Demons" }, //16
    { name: "Harem" }, //17
    { name: "Martial Arts" }, //18
    { name: "Historical" }, //19
    { name: "Josei" }, //20
    { name: "Mecha" }, //21
    { name: "Music" }, //22
    { name: "Military" }, //23
    { name: "School" }, //24
    { name: "Sports" }, //25
    { name: "Seinen" }, //26
    { name: "Shounen" }, //27
    { name: "Super Power" }, //28
    { name: "Suspense" }, //29
    { name: "Isekai" }, //30
  ];

  const years: YearCreateData[] = [
    { year: 2022 },
    { year: 2021 },
    { year: 2020 },
    { year: 2019 },
    { year: 2018 },
    { year: 2017 },
    { year: 2016 },
    { year: 2015 },
    { year: 2014 },
    { year: 2013 },
    { year: 2012 },
    { year: 2011 },
    { year: 2010 },
    { year: 2009 },
    { year: 2008 },
    { year: 2007 },
    { year: 2006 },
    { year: 2005 },
    { year: 2004 },
    { year: 2003 },
    { year: 2002 },
    { year: 2001 },
    { year: 2000 },
    { year: 1999 },
    { year: 1998 },
    { year: 1997 },
    { year: 1996 },
    { year: 1995 },
    { year: 1994 },
    { year: 1993 },
    { year: 1992 },
    { year: 1991 },
    { year: 1990 },
    { year: 1989 },
    { year: 1988 },
    { year: 1987 },
    { year: 1986 },
    { year: 1985 },
    { year: 1984 },
    { year: 1983 },
    { year: 1982 },
    { year: 1981 },
    { year: 1980 },
  ];

  const seasons: SeasonCreateData[] = [
    { name: "Winter" },
    { name: "Spring" },
    { name: "Summer" },
    { name: "Fall" },
  ];

  const userGenders: GenderCreateData[] = [
    { name: "Male" },
    { name: "Female" },
    { name: "Nonbinary" },
    { name: "Other" },
    { name: "I rather not to inform" },
  ];

  const animes: AnimeCreateData[] = [
    {
      title: "Shingeki no Kyojin",
      image: "https://media.kitsu.io/anime/poster_images/7442/original.jpg",
      episodes: 25,
      duration: 24,
      description:
        "Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called titans, forcing humans to hide in fear behind enormous concentric walls. What makes these giants truly terrifying is that their taste for human flesh is not born out of hunger but what appears to be out of pleasure. To ensure their survival, the remnants of humanity began living within defensive barriers, resulting in one hundred years without a single titan encounter. However, that fragile calm is soon shattered when a colossal titan manages to breach the supposedly impregnable outer wall, reigniting the fight for survival against the man-eating abominations.\n" +
        "\n" +
        "After witnessing a horrific personal loss at the hands of the invading creatures, Eren Yeager dedicates his life to their eradication by enlisting into the Survey Corps, an elite military unit that combats the merciless humanoids outside the protection of the walls. Based on Hajime Isayama's award-winning manga, Shingeki no Kyojin follows Eren, along with his adopted sister Mikasa Ackerman and his childhood friend Armin Arlert, as they join the brutal war against the titans and race to discover a way of defeating them before the last walls are breached.\n" +
        "\n" +
        "(Source: MAL Rewrite)",
      yearId: 10,
      seasonId: 2,
    },
    {
      title: "One Punch Man",
      image: "https://media.kitsu.io/anime/poster_images/10740/original.jpg",
      episodes: 12,
      duration: 24,
      description:
        "The seemingly ordinary and unimpressive Saitama has a rather unique hobby: being a hero. In order to pursue his childhood dream, he trained relentlessly for three years—and lost all of his hair in the process. Now, Saitama is incredibly powerful, so much so that no enemy is able to defeat him in battle. In fact, all it takes to defeat evildoers with just one punch has led to an unexpected problem—he is no longer able to enjoy the thrill of battling and has become quite bored.\n" +
        "\n" +
        "This all changes with the arrival of Genos, a 19-year-old cyborg, who wishes to be Saitama's disciple after seeing what he is capable of. Genos proposes that the two join the Hero Association in order to become certified heroes that will be recognized for their positive contributions to society, and Saitama, shocked that no one knows who he is, quickly agrees. And thus begins the story of One Punch Man, an action-comedy that follows an eccentric individual who longs to fight strong enemies that can hopefully give him the excitement he once felt and just maybe, he'll become popular in the process.\n" +
        "\n" +
        "(Source: MAL Rewrite)",
      yearId: 8,
      seasonId: 4,
    },
    {
      title: "Boku no Hero Academia",
      image: "https://media.kitsu.io/anime/poster_images/11469/original.png",
      episodes: 13,
      duration: 23,
      description:
        "What would the world be like if 80 percent of the population manifested extraordinary superpowers called “Quirks” at age four? Heroes and villains would be battling it out everywhere! Becoming a hero would mean learning to use your power, but where would you go to study? U.A. High's Hero Program of course! But what would you do if you were one of the 20 percent who were born Quirkless?\n" +
        "\n" +
        "Middle school student Izuku Midoriya wants to be a hero more than anything, but he hasn't got an ounce of power in him. With no chance of ever getting into the prestigious U.A. High School for budding heroes, his life is looking more and more like a dead end. Then an encounter with All Might, the greatest hero of them all gives him a chance to change his destiny…\n" +
        "\n" +
        "(Source: Viz Media)",
      yearId: 8,
      seasonId: 2,
    },
    {
      title: "Boku no Hero Academia 2",
      image: "https://media.kitsu.io/anime/poster_images/12268/original.jpg",
      episodes: 25,
      duration: 24,
      description:
        "Taking off right after the last episode of the first season. The school is temporarily closed due to security. When U.A. restarts, it is announced that the highly anticipated School Sports Festival will soon be taking place. All classes: Hero, Support, General and Business will be participating. Tournaments all around will decide who is the top Hero in training.\n" +
        "\n" +
        "(Source: Anime News Network)",
      yearId: 7,
      seasonId: 2,
    },
    {
      title: "Hagane no Renkinjutsushi: Fullmetal Alchemist",
      image: "https://media.kitsu.io/anime/poster_images/3936/original.png",
      episodes: 64,
      duration: 24,
      description:
        '"In order for something to be obtained, something of equal value must be lost."\n' +
        "\n" +
        `Alchemy is bound by this Law of Equivalent Exchange—something the young brothers Edward and Alphonse Elric only realize after attempting human transmutation: the one forbidden act of alchemy. They pay a terrible price for their transgression—Edward loses his left leg, Alphonse his physical body. It is only by the desperate sacrifice of Edward's right arm that he is able to affix Alphonse's soul to a suit of armor. Devastated and alone, it is the hope that they would both eventually return to their original bodies that gives Edward the inspiration to obtain metal limbs called "automail" and become a state alchemist, the Fullmetal Alchemist.\n` +
        "\n" +
        "Three years of searching later, the brothers seek the Philosopher's Stone, a mythical relic that allows an alchemist to overcome the Law of Equivalent Exchange. Even with military allies Colonel Roy Mustang, Lieutenant Riza Hawkeye, and Lieutenant Colonel Maes Hughes on their side, the brothers find themselves caught up in a nationwide conspiracy that leads them not only to the true nature of the elusive Philosopher's Stone, but their country's murky history as well. In between finding a serial killer and racing against time, Edward and Alphonse must ask themselves if what they are doing will make them human again... or take away their humanity.\n" +
        "\n" +
        "(Source: MAL Rewrite)",
      yearId: 9,
      seasonId: 2,
    },
    {
      title: "Death Note",
      image: "https://media.kitsu.io/anime/poster_images/1376/original.png",
      episodes: 37,
      duration: 23,
      description:
        "A shinigami, as a god of death, can kill any person—provided they see their victim's face and write their victim's name in a notebook called a Death Note. One day, Ryuk, bored by the shinigami lifestyle and interested in seeing how a human would use a Death Note, drops one into the human realm.\n" +
        "\n" +
        "High school student and prodigy Light Yagami stumbles upon the Death Note and—since he deplores the state of the world—tests the deadly notebook by writing a criminal's name in it. When the criminal dies immediately following his experiment with the Death Note, Light is greatly surprised and quickly recognizes how devastating the power that has fallen into his hands could be.\n" +
        "\n" +
        "With this divine capability, Light decides to extinguish all criminals in order to build a new world where crime does not exist and people worship him as a god. Police, however, quickly discover that a serial killer is targeting criminals and, consequently, try to apprehend the culprit. To do this, the Japanese investigators count on the assistance of the best detective in the world: a young and eccentric man known only by the name of L.\n" +
        "\n" +
        "(Source: MAL Rewrite)",
      yearId: 17,
      seasonId: 4,
    },
    {
      title: "Boku no Hero Academia 3",
      image: "https://media.kitsu.io/anime/poster_images/13881/original.jpg",
      episodes: 25,
      duration: 24,
      description:
        "Summer is here, and the heroes of Class 1-A and 1-B are in for the toughest training camp of their lives! A group of seasoned pros pushes everyone's Quirks to new heights as the students face one overwhelming challenge after another. Braving the elements in this secret location becomes the least of their worries when routine training turns into a critical struggle for survival.\n" +
        "\n" +
        "(Source: Crunchyroll)",
      yearId: 5,
      seasonId: 2,
    },
    {
      title: "Kimi no Na wa.",
      image: "https://media.kitsu.io/anime/poster_images/11614/original.jpg",
      episodes: 1,
      duration: 106,
      description:
        "From director Makoto Shinkai, the innovative mind behind Voices of a Distant Star and 5 Centimeters Per Second, comes a beautiful masterpiece about time, the thread of fate, and the hearts of two young souls.\n" +
        "\n" +
        "The day the stars fell, two lives changed forever. High schoolers Mitsuha and Taki are complete strangers living separate lives. But one night, they suddenly switch places. Mitsuha wakes up in Taki’s body, and he in hers. This bizarre occurrence continues to happen randomly, and the two must adjust their lives around each other. Yet, somehow, it works. They build a connection and communicate by leaving notes, messages, and more importantly, an imprint.\n" +
        "\n" +
        "When a dazzling comet lights up the night’s sky, it dawns on them. They want something more from this connection—a chance to meet, an opportunity to truly know each other. Tugging at the string of fate, they try to find a way to each other. But distance isn’t the only thing keeping them apart. Is their bond strong enough to face the cruel irony of time? Or is their meeting nothing more than a wish upon the stars?\n" +
        "\n" +
        "(Source: FUNimation Films)",
      yearId: 7,
      seasonId: 3,
    },
    {
      title: "Nanatsu no Taizai",
      image: "https://media.kitsu.io/anime/poster_images/8699/original.jpg",
      episodes: 24,
      duration: 24,
      description:
        'In a world similar to the European Middle Ages, the feared yet revered Holy Knights of Britannia use immensely powerful magic to protect the region of Britannia and its kingdoms. However, a small subset of the Knights supposedly betrayed their homeland and turned their blades against their comrades in an attempt to overthrow the ruler of Liones. They were defeated by the Holy Knights, but rumors continued to persist that these legendary knights, called the "Seven Deadly Sins," were still alive. Ten years later, the Holy Knights themselves staged a coup d’état, and thus became the new, tyrannical rulers of the Kingdom of Liones.\n' +
        "\n" +
        "Based on the best-selling manga series of the same name, Nanatsu no Taizai follows the adventures of Elizabeth, the third princess of the Kingdom of Liones, and her search for the Seven Deadly Sins. With their help, she endeavors to not only take back her kingdom from the Holy Knights, but to also seek justice in an unjust world.\n" +
        "\n" +
        "(Source: MAL Rewrite)",
      yearId: 9,
      seasonId: 4,
    },
    {
      title: "Hunter x Hunter (2011)",
      image: "https://media.kitsu.io/anime/poster_images/6448/original.png",
      episodes: 148,
      duration: 23,
      description:
        "Hunter x Hunter is set in a world where Hunters exist to perform all manner of dangerous tasks like capturing criminals and bravely searching for lost treasures in uncharted territories. Twelve-year-old Gon Freecss is determined to become the best Hunter possible in hopes of finding his father, who was a Hunter himself and had long ago abandoned his young son. However, Gon soon realizes the path to achieving his goals is far more challenging than he could have ever imagined.\n" +
        "\n" +
        "Along the way to becoming an official Hunter, Gon befriends the lively doctor-in-training Leorio, vengeful Kurapika, and rebellious ex-assassin Killua. To attain their own goals and desires, together the four of them take the Hunter Exam, notorious for its low success rate and high probability of death. Throughout their journey, Gon and his friends embark on an adventure that puts them through many hardships and struggles. They will meet a plethora of monsters, creatures, and characters—all while learning what being a Hunter truly means.\n" +
        "\n" +
        "(Source: MAL Rewrite)",
      yearId: 12,
      seasonId: 4,
    },
    {
      title: "Overlord IV",
      image: "https://media.kitsu.io/anime/poster_images/6448/original.png",
      episodes: 13,
      duration: 23,
      description: `E-Rantel, the capital city of the newly established Sorcerer Kingdom, suffers from a dire shortage of goods. Once a prosperous city known for its trade, it now faces a crisis due to its caution—or even fear—of its king, Ainz Ooal Gown. To make amends, Ainz sends Albedo to the city as a diplomatic envoy.

        Meanwhile, the cardinals of the Slane Theocracy discuss how to retaliate against Ainz after his attack crippled the Re-Estize Kingdom's army, plotting for the Baharuth Empire to take over the Sorcerer Kingdom. However, when Emperor Jircniv Rune Farlord El Nix arranges a meeting with the Theocracy's messengers at a colosseum, he is confronted by none other than Ainz himself.
        
        With their secret gathering now out in the open, the emperor and his guests learn that Ainz has challenged the Warrior King, the empire's greatest fighter, to a duel. With Ainz's motivations beyond his comprehension, Jircniv can do nothing but watch as humanity's future changes before his very eyes.`,
      yearId: 1,
      seasonId: 3,
    },
    {
      title: "Kuro no Shoukanshi",
      image:
        "https://media.kitsu.io/anime/45884/poster_image/44328a515399388c211305d5a87806a2.png",
      episodes: 13,
      duration: 23,
      description: `Waking up in a strange new place with no memory of his past life, Kelvin learns that he's bartered away those very memories in exchange for powerful new abilities during his recent transmigration. Heading out into a whole new world as a Summoner—with his first Follower being the very goddess who brought him over!—Kelvin begins his new life as an adventurer, and it isn't long before he discovers his hidden disposition as a battle junkie.

        From the Black Knight of the Ancient Castle of Evil Spirits to the demon within the Hidden Cave of the Sage, he revels in the fight against one formidable foe after another. Join this overpowered adventurer in an exhilarating and epic saga as he and his allies carve their way into the annals of history!`,
      yearId: 1,
      seasonId: 3,
    },
    {
      title: "Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e 2nd Season",
      image:
        "https://media.kitsu.io/anime/45925/poster_image/9457f76efb24610789472f646a25fb6a.png",
      episodes: 13,
      duration: 23,
      description: `The second season of Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e.`,
      yearId: 1,
      seasonId: 3,
    },
  ];

  const animeGenres: AnimeGenreCreateData[] = [
    { animeId: 1, genreId: 5 },
    { animeId: 1, genreId: 23 },
    { animeId: 1, genreId: 27 },
    { animeId: 2, genreId: 2 },
    { animeId: 2, genreId: 3 },
    { animeId: 2, genreId: 28 },
    { animeId: 2, genreId: 26 },
    { animeId: 3, genreId: 2 },
    { animeId: 3, genreId: 24 },
    { animeId: 3, genreId: 28 },
    { animeId: 3, genreId: 27 },
    { animeId: 4, genreId: 2 },
    { animeId: 4, genreId: 24 },
    { animeId: 4, genreId: 28 },
    { animeId: 4, genreId: 27 },
    { animeId: 5, genreId: 1 },
    { animeId: 5, genreId: 2 },
    { animeId: 5, genreId: 6 },
    { animeId: 5, genreId: 5 },
    { animeId: 5, genreId: 27 },
    { animeId: 6, genreId: 7 },
    { animeId: 6, genreId: 29 },
    { animeId: 6, genreId: 27 },
    { animeId: 6, genreId: 11 },
    { animeId: 7, genreId: 2 },
    { animeId: 7, genreId: 24 },
    { animeId: 7, genreId: 28 },
    { animeId: 7, genreId: 27 },
    { animeId: 8, genreId: 7 },
    { animeId: 8, genreId: 5 },
    { animeId: 8, genreId: 13 },
    { animeId: 9, genreId: 1 },
    { animeId: 9, genreId: 2 },
    { animeId: 9, genreId: 6 },
    { animeId: 9, genreId: 27 },
    { animeId: 10, genreId: 27 },
    { animeId: 10, genreId: 1 },
    { animeId: 10, genreId: 2 },
    { animeId: 10, genreId: 6 },
    { animeId: 11, genreId: 2 },
    { animeId: 11, genreId: 6 },
    { animeId: 11, genreId: 7 },
    { animeId: 11, genreId: 30 },
    { animeId: 12, genreId: 2 },
    { animeId: 12, genreId: 6 },
    { animeId: 12, genreId: 30 },
    { animeId: 13, genreId: 5 },
    { animeId: 13, genreId: 29 },
    { animeId: 13, genreId: 11 },
    { animeId: 13, genreId: 24 },
  ];

  await prisma.status.createMany({ data: status });
  await prisma.genre.createMany({ data: genres });
  await prisma.year.createMany({ data: years });
  await prisma.season.createMany({ data: seasons });
  await prisma.gender.createMany({ data: userGenders });
  await prisma.anime.createMany({ data: animes });
  await prisma.animeGenre.createMany({ data: animeGenres });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
