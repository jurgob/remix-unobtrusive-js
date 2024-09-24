import type { MetaFunction } from "@remix-run/node";
import  { Link } from "@remix-run/react";



export const meta: MetaFunction = () => {
  return [
    { title: "Remix Test app" },
    { name: "description", content: "Remix Test app!" },
  ];
};

export default function Index() {
  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">Test app</h1>
      <Link to="fetcher" >Fetcher</Link>
    </div>
  );
}
