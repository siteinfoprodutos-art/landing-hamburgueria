import { MotionConfig } from 'motion/react';
import { Header } from './components/Header';
import { HeroScrollCanvas } from './components/HeroScrollCanvas';
import { BurgerSections } from './components/BurgerSections';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-dvh bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground">
        {/* 3. CINEMATIC OVERLAYS: Film Grain Noise + Vignette */}
        <div className="film-grain-overlay fixed inset-0 z-30 pointer-events-none" />
        <div className="vignette-overlay fixed inset-0 z-30 pointer-events-none" />

        <Header />
        <main>
          <HeroScrollCanvas />
          <BurgerSections />
        </main>
      </div>
    </MotionConfig>
  );
}
