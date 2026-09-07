import { Link } from 'react-router-dom';
import { siteConfig } from '../config';
import { categories } from '../data/services';
import { ArrowRight, Image as ImageIcon, Sparkles } from 'lucide-react';
import { getWhatsAppLink } from '../config';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* SECTION 1 — HERO */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 flex flex-col items-start z-10 lg:pr-4">
            <span className="text-[12px] font-bold text-[#D4AF37] uppercase tracking-[0.4em] mb-6 block">Premium Creative Studio</span>
            <h1 className="text-6xl md:text-[102px] leading-[0.9] font-extrabold tracking-tight mb-8">
              Ideas.<br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #0D0D0F' }}>Made</span> Visual.
            </h1>
            <p className="text-lg text-foreground/70 mb-10 max-w-md leading-relaxed font-light">
              From imagination to finished visuals — we specialize in AI Images, Photo Restoration, 3D Visualization, Invitations, Product Creatives, and Video Ads.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Link 
                to="/services" 
                className="bg-[#D4AF37] text-white px-8 py-4 font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-foreground transition-all"
              >
                Start a Project
              </Link>
              <Link 
                to="/gallery" 
                className="px-8 py-4 bg-transparent border border-foreground/20 text-foreground text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-foreground/5 transition-colors"
              >
                Explore Our Work
              </Link>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative z-10 bg-foreground p-8 flex flex-col gap-6 -mx-4 sm:mx-0 sm:rounded-sm overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="flex flex-col gap-4 translate-y-6">
                <div className="relative aspect-[4/5] rounded-sm border-b-2 border-[#D4AF37] overflow-hidden bg-zinc-800 flex items-end p-4">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600" alt="AI Images" className="absolute inset-0 object-cover w-full h-full opacity-70" />
                  <span className="absolute bottom-4 left-0 text-white/30 text-5xl font-bold -mb-3 -ml-3 italic z-10">01</span>
                  <span className="relative z-10 text-white font-bold text-xs uppercase tracking-tighter drop-shadow-md">AI Images</span>
                </div>
                <div className="relative aspect-square rounded-sm border-r-2 border-[#D4AF37]/30 overflow-hidden bg-zinc-900 flex items-end p-4">
                  <img src="https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&q=80&w=600" alt="Restoration" className="absolute inset-0 object-cover w-full h-full opacity-70" />
                  <span className="absolute bottom-4 left-0 text-white/30 text-5xl font-bold -mb-3 -ml-3 italic z-10">02</span>
                  <span className="relative z-10 text-white font-bold text-xs uppercase tracking-tighter drop-shadow-md">Restoration</span>
                </div>
                <div className="relative aspect-[4/5] rounded-sm border-t-2 border-[#D4AF37]/30 overflow-hidden bg-zinc-800 flex items-end p-4">
                  <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600" alt="3D" className="absolute inset-0 object-cover w-full h-full opacity-70" />
                  <span className="absolute bottom-4 left-0 text-white/30 text-5xl font-bold -mb-3 -ml-3 italic z-10">03</span>
                  <span className="relative z-10 text-white font-bold text-xs uppercase tracking-tighter drop-shadow-md">3D</span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="relative aspect-square rounded-sm border-t-2 border-[#D4AF37]/30 overflow-hidden bg-zinc-900 flex items-end p-4">
                  <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=600" alt="Invitations" className="absolute inset-0 object-cover w-full h-full opacity-70" />
                  <span className="absolute bottom-4 left-0 text-white/30 text-5xl font-bold -mb-3 -ml-3 italic z-10">04</span>
                  <span className="relative z-10 text-white font-bold text-xs uppercase tracking-tighter drop-shadow-md">Invitations</span>
                </div>
                <div className="relative aspect-[4/5] rounded-sm border-l-2 border-[#D4AF37] overflow-hidden bg-zinc-800 flex items-end p-4">
                  <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600" alt="Products" className="absolute inset-0 object-cover w-full h-full opacity-70" />
                  <span className="absolute bottom-4 left-0 text-white/30 text-5xl font-bold -mb-3 -ml-3 italic z-10">05</span>
                  <span className="relative z-10 text-white font-bold text-xs uppercase tracking-tighter drop-shadow-md">Products</span>
                </div>
                <div className="relative aspect-square rounded-sm border-b-2 border-[#D4AF37]/30 overflow-hidden bg-zinc-900 flex items-end p-4">
                  <img src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=600" alt="Video" className="absolute inset-0 object-cover w-full h-full opacity-70" />
                  <span className="absolute bottom-4 left-0 text-white/30 text-5xl font-bold -mb-3 -ml-3 italic z-10">06</span>
                  <span className="relative z-10 text-white font-bold text-xs uppercase tracking-tighter drop-shadow-md">Video</span>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-between items-center text-background/50 text-[10px] uppercase tracking-[0.2em] relative z-10">
              <span>© 2026 AP Visual House</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — POSITIONING STRIP */}
      <section className="border-y-2 border-foreground/10 bg-foreground/5 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <p className="text-[10px] tracking-[0.2em] font-bold text-foreground/50 uppercase mb-4">Creative Services For</p>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-4">
            PEOPLE <span className="text-[#D4AF37] mx-2">·</span> EVENTS <span className="text-[#D4AF37] mx-2">·</span> HOMES <span className="text-[#D4AF37] mx-2">·</span> BRANDS
          </h2>
          <p className="text-foreground/70 font-light text-lg">Simple process. Personal service. Beautiful results.</p>
        </div>
      </section>

      {/* SECTION 9 — SERVICES SECTION */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[0.9]">
              What Can We<br/>
              <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #0D0D0F' }}>Create</span> For You?
            </h2>
            <p className="text-lg text-foreground/70 font-light">
              Choose an idea, share your requirements, and we'll turn it into a finished visual.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link 
                key={category.id}
                to={`/services#${category.id}`}
                className="group flex flex-col border-2 border-foreground/10 rounded-sm overflow-hidden bg-white hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0 bg-foreground/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
                  <img src={category.image} alt={category.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-3xl font-extrabold tracking-tight mb-3 group-hover:text-[#D4AF37] transition-colors">{category.title}</h3>
                  <p className="text-foreground/70 mb-6 flex-1 font-light">{category.description}</p>
                  <div className="flex items-center text-xs font-bold uppercase tracking-widest text-foreground">
                    Explore Services <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 16 — BEFORE / AFTER SECTION */}
      <section className="py-24 bg-background border-t border-foreground/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
                See the <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #0D0D0F' }}>Difference</span>
              </h2>
              <p className="text-lg text-foreground/70 mb-8 max-w-lg font-light">
                From old to renewed. From simple to stunning. See how we transform everyday references into professional, premium visuals.
              </p>
              <div className="flex flex-col gap-4">
                {['Old Photo Restoration', '2D to 3D Visualization', 'Product Enhancement'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <BeforeAfterSlider 
                beforeImage="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800"
                afterImage="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800"
                beforeLabel="Reference"
                afterLabel="Final Visual"
                beforeImageClass="grayscale sepia-[.30] contrast-125 opacity-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 17 & 18 — WHY / HOW IT WORKS */}
      <section className="py-24 bg-foreground text-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                Creative Work,<br />
                <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #F7F7F5' }}>Without</span> the Complication.
              </h2>
              <div className="w-12 h-1 bg-[#D4AF37] mb-12"></div>
              
              <div className="flex flex-col gap-8">
                {[
                  { title: 'Imagine', desc: 'You bring the idea.' },
                  { title: 'Create', desc: 'We turn the idea into a visual.' },
                  { title: 'Refine', desc: 'We work with you until it feels right.' },
                  { title: 'Deliver', desc: 'You receive a polished, ready-to-use final file.' },
                ].map((step, idx) => (
                  <div key={idx} className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-8 h-8 rounded-sm border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-2xl font-extrabold tracking-tight mb-1">{step.title}</h4>
                      <p className="text-background/70 font-light">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-background/5 p-10 md:p-14 rounded-sm border border-background/10">
              <h3 className="text-4xl font-extrabold tracking-tight mb-10">From Idea to Final Visual</h3>
              <div className="flex flex-col gap-6 mb-12">
                {[
                  '01 — Choose a Service',
                  '02 — Tell Us What You Want',
                  '03 — We Review & Quote',
                  '04 — We Create',
                  '05 — Review & Deliver'
                ].map((step, idx) => (
                  <div key={idx} className="text-lg font-bold text-background/90 border-b border-background/10 pb-4">
                    {step}
                  </div>
                ))}
              </div>
              <Link 
                to="/services" 
                className="w-full py-4 bg-[#D4AF37] text-foreground text-xs uppercase tracking-widest text-center font-bold rounded-sm hover:bg-background transition-colors block"
              >
                Start Your Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 21 — FINAL CTA */}
      <section className="py-32 bg-foreground relative overflow-hidden">
        {/* Decorative subtle spark */}
        <div className="absolute top-0 right-0 p-32 opacity-5 pointer-events-none">
          <Sparkles className="w-96 h-96 text-[#D4AF37]" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-4 text-background">
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #F7F7F5' }}>Have an</span> idea?
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-[#D4AF37] mb-6 tracking-tight">Let's make it visual.</h3>
          <p className="text-xl text-background/70 max-w-2xl mx-auto mb-12 font-light">
            Tell us what you're imagining. We'll take it from there.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              to="/services" 
              className="px-8 py-4 w-full sm:w-auto bg-background text-foreground text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-background/90 transition-colors"
            >
              Start a Project
            </Link>
            <a 
              href={getWhatsAppLink()}
              target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 w-full sm:w-auto bg-transparent border border-background/20 text-background text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-background/10 transition-colors flex items-center justify-center gap-2"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
