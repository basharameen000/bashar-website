import Hero from '../components/Hero';
import About from '../components/About';
import Resume from '../components/Resume';
import Certificates from '../components/Certificates';
import Services from '../components/Services';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import CtaBanner from '../components/CtaBanner';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Resume />
      <Certificates />
      <Services />
      <Projects />
      <Contact />
      <CtaBanner />
    </>
  );
}
