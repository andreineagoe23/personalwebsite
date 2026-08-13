import { Hero } from "../sections/Hero";
import { Work } from "../sections/Work";
import { Experience } from "../sections/Experience";
import { Stack } from "../sections/Stack";
import { Background } from "../sections/Background";
import { Contact } from "../sections/Contact";

export function Home() {
  return (
    <>
      <Hero />
      <Work />
      <Experience />
      <Stack />
      <Background />
      <Contact />
    </>
  );
}
