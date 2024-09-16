import { getRevenues } from "./data/services/revenue";

export default function Home() {
  const revenues = await getRevenues();
  return <div>Hola Mundo JIJIJI {revenues.length}</div>;
}
