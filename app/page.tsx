import { Header } from '@/components/Header'
import { About } from '@/components/About'
import { Education } from '@/components/Education'
import { Experience } from '@/components/Experience'
import { Skills } from '@/components/Skills'
import { Certifications } from '@/components/Certifications'
import { Projects } from '@/components/Projects'
import { Footer } from '@/components/Footer'
import { Contact } from '@/components/Contact'
import { Hero } from '@/components/Hero'

export default function Home() {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        
        <Hero/>
        <About />
        <Education />
        <Experience />
        <Skills />
        <Certifications />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

