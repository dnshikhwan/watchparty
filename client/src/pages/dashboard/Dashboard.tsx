import { Avatar } from "../../components/avatar";
import { Divider } from "../../components/divider";
import { Heading, Subheading } from "../../components/heading";
import Layout from "../../components/Layout";

const posts = [
  {
    id: 1,
    title: "Moana 2",
    imageUrl:
      "https://lumiere-a.akamaihd.net/v1/images/p_moana2_v3_94b2f083.jpeg",
  },
  {
    id: 2,
    title: "Back In Action",
    imageUrl:
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQkjWUD3sI-bKXU8XPw1PcHmUJ1UqWJ4RC4umVdawfHFYzZaNezOWW6Zs2Kquh5Kcn1b12-Nw",
  },
  {
    id: 3,
    title: "Avengers",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BNGE0YTVjNzUtNzJjOS00NGNlLTgxMzctZTY4YTE1Y2Y1ZTU4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  },
  {
    id: 4,
    title: "Avengers",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BNGE0YTVjNzUtNzJjOS00NGNlLTgxMzctZTY4YTE1Y2Y1ZTU4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  },
  {
    id: 5,
    title: "Back In Action",
    imageUrl:
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQkjWUD3sI-bKXU8XPw1PcHmUJ1UqWJ4RC4umVdawfHFYzZaNezOWW6Zs2Kquh5Kcn1b12-Nw",
  },
];

const Dashboard = () => {
  return (
    <>
      <Layout>
        <Heading>Dashboard</Heading>
        <Divider className="my-6" />
        <div>
          <Subheading>Active friends</Subheading>
          <div className="my-4 flex flex-wrap gap-5">
            <Avatar
              initials="DI"
              className="size-10"
              src={"https://avatar.iran.liara.run/public/55"}
            />
            <Avatar
              initials="DI"
              className="size-10"
              src={"https://avatar.iran.liara.run/public/11"}
            />
            <Avatar
              initials="DI"
              className="size-10"
              src={"https://avatar.iran.liara.run/public/60"}
            />
            <Avatar
              initials="DI"
              className="size-10"
              src={"https://avatar.iran.liara.run/public/99"}
            />
            <Avatar
              initials="DI"
              className="size-10"
              src={"https://avatar.iran.liara.run/public/76"}
            />
            <Avatar
              initials="DI"
              className="size-10"
              src={"https://avatar.iran.liara.run/public/21"}
            />
          </div>
        </div>
        <div className="mt-10">
          <Subheading>Live rooms</Subheading>
          <div className=" mt-5 grid max-w-2xl gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            {posts.map((post) => (
              <article
                key={post.id}
                className="flex flex-col items-start justify-between"
              >
                <div className="relative w-full">
                  <img
                    alt=""
                    src={post.imageUrl}
                    className="aspect-video w-3/4 max-sm:w-full rounded-2xl bg-gray-100 object-cover sm:aspect-2/1 lg:aspect-3/2"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />
                </div>
                <div className="max-w-xl">
                  <div className="group relative">
                    <Subheading className="mt-3">{post.title}</Subheading>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
