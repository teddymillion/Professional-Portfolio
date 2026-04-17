import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { UnfilteredNotes } from '@/features/notes/UnfilteredNotes'
import { Projects } from '@/components/Projects'
import { BuilderTimeline } from '@/features/timeline/BuilderTimeline'
import { Experience } from '@/components/Experience'
import { Skills } from '@/components/Skills'
import { Education } from '@/components/Education'
import { Certifications } from '@/components/Certifications'
import { BeyondCode } from '@/components/premium/BeyondCode'
import { Vision } from '@/components/Vision'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        <Hero />
        <UnfilteredNotes />
        <About />
        <Projects />
        <BuilderTimeline />
        <Experience />
        <Skills />
        <Education />
        <Certifications />
        <BeyondCode />
        <Vision />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
