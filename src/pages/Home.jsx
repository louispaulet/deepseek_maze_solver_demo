import { Link } from 'react-router-dom';
import { Grid3x3, Route, Sparkles, Dices, Play, Monitor, Bell, Layout, CheckCircle, GitBranch, Network, Binary } from 'lucide-react';
import { GENERATION_ALGOS, PATHFINDING_ALGOS, FEATURES } from './homeData';
import HeroSection from '../components/HeroSection';
import Section from '../components/Section';
import InfoCard from '../components/InfoCard';

const GEN_ICONS = [Network, GitBranch, Binary];
const FEAT_ICONS = [Dices, Play, Monitor, Bell, Layout, CheckCircle];

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 space-y-20">
      <HeroSection />

      <Section title="Maze" highlight="Generation" icon={<Grid3x3 size={28} className="text-indigo-400" />}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GENERATION_ALGOS.map(({ title, desc }, i) => {
            const Icon = GEN_ICONS[i];
            return (
            <InfoCard key={title} icon={<Icon size={18} className="text-indigo-400 shrink-0" />} title={title}>
              <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
            </InfoCard>
          )})}
        </div>
      </Section>

      <Section title="Pathfinding" highlight="Comparison" icon={<Route size={28} className="text-indigo-400" />}>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-8">
          Select up to four algorithms and run them side-by-side on the same
          maze. Watch each one explore the grid cell by cell, and compare
          how many cells each visits before finding the path.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PATHFINDING_ALGOS.map(({ title, subtitle, desc, badge }) => (
            <div key={title}
              className="rounded-xl border border-gray-800 bg-gray-900/50 p-5 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-indigo-400 font-bold text-lg">{title}</h3>
                <span className="text-xs rounded-full bg-indigo-500/10 border
                  border-indigo-500/30 text-indigo-300 px-2 py-0.5">{badge}</span>
              </div>
              <p className="text-xs text-gray-500 mb-1">{subtitle}</p>
              <p className="text-sm text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Other" highlight="Features" icon={<Sparkles size={28} className="text-indigo-400" />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FEATURES.map(({ title, desc }, i) => {
            const Icon = FEAT_ICONS[i];
            return (
            <InfoCard key={title} icon={<Icon size={16} className="text-indigo-400 shrink-0" />} title={title} small>
              <p className="text-sm text-gray-400">{desc}</p>
            </InfoCard>
          )})}
        </div>
      </Section>

      <section className="text-center border-t border-gray-800 pt-12">
        <p className="text-gray-400 mb-6">Want to learn more about how this project was built?</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/about"
            className="rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700
              px-6 py-2.5 text-sm font-medium text-gray-200 transition-colors">
            Read the About page →
          </Link>
          <Link to="/maze-solver"
            className="rounded-lg bg-indigo-600 hover:bg-indigo-500 px-6 py-2.5
              text-sm font-semibold text-white transition-colors">
            Launch the Demo
          </Link>
        </div>
      </section>
    </div>
  );
}
