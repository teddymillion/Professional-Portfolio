import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Projects } from '@/components/Projects'
import { Experience } from '@/components/Experience'
import { Education } from '@/components/Education'
import { Skills } from '@/components/Skills'
import { Certifications } from '@/components/Certifications'
import { Vision } from '@/components/Vision'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Education />
        <Certifications />
        <Vision />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
