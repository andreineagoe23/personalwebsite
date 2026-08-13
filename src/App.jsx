import { Backdrop } from "./components/Backdrop";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Hero } from "./sections/Hero";
import { Work } from "./sections/Work";
import { Experience } from "./sections/Experience";
import { Stack } from "./sections/Stack";
import { Background } from "./sections/Background";
import { Contact } from "./sections/Contact";
import { useHashLanding } from "./lib/useHashLanding";

export default function App() {
  useHashLanding();

  return (
    <>
      <Backdrop />
      <Nav />
      <main>
        <Hero />
        <Work />
        <Experience />
        <Stack />
        <Background />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
