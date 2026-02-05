
import React from 'react';
import { COLORS, PAIN_POINTS, FEATURES } from './constants';
import EmailForm from './components/EmailForm';
import { ArrowDown, Play, Sparkles, Star, Banknote } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#0d0c12] flex justify-center selection:bg-[#5CA6CE]/30 selection:text-white overflow-x-hidden font-sans">
      {/* App Container (Simulating Mobile View) */}
      <main
        className="w-full max-w-[480px] bg-[#16151D] min-h-screen relative shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col no-scrollbar overflow-y-auto overflow-x-hidden"
      >
        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-[#263056]/60 via-[#16151D] to-transparent pointer-events-none" />
        <div className="absolute top-40 left-[-20%] w-80 h-80 bg-[#5CA6CE] blur-[120px] rounded-full opacity-10 pointer-events-none animate-pulse-glow" />
        <div className="absolute top-[60%] right-[-20%] w-80 h-80 bg-[#5A5B9F] blur-[120px] rounded-full opacity-10 pointer-events-none animate-pulse-glow" />

        {/* Hero Section */}
        <section className="relative pt-12 pb-16 px-8 flex flex-col items-center text-center">

          {/* Interactive App Mockup - TOP POSITION */}
          <div className="relative w-full mb-16 animate-float z-20">
            {/* Glowing Background for Mockup */}
            <div className="absolute inset-0 bg-[#5CA6CE] blur-[60px] opacity-10 rounded-full" />

            <div className="relative p-[1px] rounded-[42px] bg-gradient-to-b from-white/20 via-white/5 to-transparent shadow-[0_40px_80px_rgba(0,0,0,0.7)] overflow-hidden">
              <div className="bg-[#1A1924]/90 backdrop-blur-xl rounded-[41px] p-6 border border-white/5">

                {/* App Header Inside Mockup */}
                <div className="flex justify-between items-center mb-6 px-1">
                  <div className="h-4 w-16 bg-white/5 rounded-full" />
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#5CA6CE]" />
                  </div>
                </div>

                {/* Infinite Scrolling Avatars */}
                <div className="relative mb-8 overflow-hidden py-1">
                  <div className="animate-scroll-x flex gap-4">
                    {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((i, idx) => (
                      <div key={idx} className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-[#5CA6CE] to-[#5A5B9F] p-[1.5px] shadow-lg">
                        <div className="w-full h-full rounded-full bg-[#16151D] border-2 border-[#16151D] overflow-hidden">
                          <img src={`https://picsum.photos/seed/crea${i}${idx}/100/100`} alt="Avatar" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all" />
                        </div>
                        {idx % 3 === 0 && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#5CA6CE] rounded-full border-2 border-[#1A1924] flex items-center justify-center">
                            <Star size={8} className="text-white fill-white" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Animated Content List */}
                <div className="space-y-5">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex gap-4 items-center group cursor-default">
                      <div className="w-20 h-12 bg-gray-800/60 rounded-xl overflow-hidden relative shadow-inner">
                        <img src={`https://picsum.photos/seed/vidhero${i}/200/120`} className="opacity-30 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play size={14} className="text-white fill-white opacity-40 animate-pulse" />
                        </div>
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-[#5CA6CE]/30 w-1/2 rounded-full" />
                        </div>
                        <div className="h-1.5 w-1/3 bg-white/5 rounded-full" />
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center">
                        <div className="w-1 h-3 bg-white/10 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Bar */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-white/10 rounded-full" />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-4 right-4 bg-gradient-to-r from-[#5CA6CE] to-[#5A5B9F] text-white px-4 py-2 rounded-2xl text-[9px] font-black shadow-2xl tracking-[0.2em] uppercase border border-white/10">
              Prototype
            </div>
          </div>

          {/* Main Headings */}
          <h1 className="text-[32px] font-black tracking-tight mb-6 text-glow leading-[1.2] bg-clip-text text-transparent bg-gradient-to-r from-[#5CA6CE] to-[#A0D4F0]">
            팬과 진짜로 연결되는 순간
          </h1>

          <p className="text-gray-400 font-bold text-base tracking-widest mb-12 uppercase">
            올와티 <span className="mx-2 opacity-30">|</span> OlWATY
          </p>

          <EmailForm />

          <div className="mt-16 animate-bounce text-gray-500/50">
            <ArrowDown size={24} strokeWidth={1.5} />
          </div>
        </section>

        {/* Problem Section */}
        <section className="px-6 py-16 relative z-10">
          <div className="flex flex-col items-center mb-12">
            <div className="bg-[#5A5B9F]/20 text-[#5A5B9F] px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] mb-4 border border-[#5A5B9F]/20 uppercase">Points</div>
            <h2 className="text-3xl font-black text-white leading-tight">왜 팬에게 안 닿을까요</h2>
          </div>

          <div className="space-y-6">
            {PAIN_POINTS.map((point, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#263056]/30 to-transparent border border-white/5 rounded-[32px] p-8 transition-all hover:border-[#5CA6CE]/30 group backdrop-blur-md shadow-2xl"
              >
                <div className="flex items-start gap-6">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#5CA6CE]/10 text-[#5CA6CE] font-black text-sm border border-[#5CA6CE]/20 flex-shrink-0">
                    0{index + 1}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl mb-3 group-hover:text-[#5CA6CE] transition-colors">{point.scenario}</h3>
                    <p className="text-gray-400 text-[15px] leading-relaxed font-normal">{point.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Brand Philosophy Section */}
        <section className="px-10 py-24 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#5CA6CE]/5 to-transparent" />
          <div className="relative z-10">
            <Sparkles className="mx-auto mb-6 text-[#5CA6CE] opacity-60" size={32} />
            <h2 className="text-2xl font-black text-white mb-6 leading-snug">
              시청자가<br />
              <span className="text-[#5CA6CE]"> 진짜 팬</span>이 되는 순간
            </h2>
            <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-[#5CA6CE] to-transparent mx-auto" />
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-20 bg-[#0d0c12]/80 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#5CA6CE]/40 to-transparent" />

          <div className="flex flex-col items-center mb-16">
            <div className="bg-[#5CA6CE]/20 text-[#5CA6CE] px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] mb-4 border border-[#5CA6CE]/20 uppercase">Solution</div>
            <h2 className="text-3xl font-black text-white">올와티의 접근법</h2>
          </div>

          <div className="space-y-12 mb-10">
            {FEATURES.map((feature, index) => (
              <div key={index} className="flex gap-6 items-start group">
                <div className="bg-[#1A1924] p-4 rounded-2xl h-fit border border-white/5 group-hover:bg-[#263056]/40 transition-colors shadow-xl flex-shrink-0">
                  {feature.icon}
                </div>
                <div className="pt-1">
                  <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                  <p className="text-[15px] text-gray-400 leading-relaxed font-normal">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Visual - simplified since we moved the big one to the top */}
          <div className="mt-20 p-8 rounded-[40px] bg-white/[0.02] border border-white/5 text-center">
            <div className="w-16 h-16 bg-[#5CA6CE]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Banknote size={32} className="text-[#5CA6CE]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">기존 수익 유지, 추가 수익화도 가능</h3>
            <div className="text-gray-400 font-medium leading-relaxed flex flex-col gap-2">
              <p>*임베드 재생도 크리에이터 수익에 포함됩니다.</p>
              <p className="text-xs opacity-50">(자체 수익화 기능은 올해 중반 출시 예정)</p>
              <p className="text-[#5CA6CE] font-bold mt-1">테스터부터 올와티 미리보기 수익화 기능 사용가능</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-8 py-28 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#263056]/40 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <p className="text-[#5A5B9F] font-black text-[10px] tracking-[0.4em] uppercase mb-4 opacity-80">When True Fans Connect</p>
            <h2 className="text-2xl font-black text-white mb-10 leading-[1.3] tracking-tight">
              팬과<span className="text-[#5CA6CE] text-glow"> 진짜로 </span>연결되는 순간<br />
              <span className="block mt-3 text-4xl bg-clip-text text-transparent bg-gradient-to-r from-[#5CA6CE] to-[#A0D4F0]">올와티  OlWATY</span>
            </h2>

            <div className="w-12 h-1 bg-gradient-to-r from-transparent via-[#5CA6CE]/40 to-transparent mb-12" />

            <p className="text-gray-200 text-lg mb-12 font-semibold">
              2026년, 곧 만나요.<br />
              <span className="text-gray-400 font-normal text-base mt-2 block">런칭 알림을 예약하세요.</span>
            </p>

            <EmailForm />
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20 px-8 border-t border-white/5 text-center bg-[#0d0c12]">
          <div className="flex justify-center gap-8 mb-10 text-gray-500 font-bold tracking-[0.2em] text-[10px]">
            <span className="hover:text-[#5CA6CE] cursor-pointer transition-colors">INSTAGRAM</span>
            <span className="hover:text-[#5CA6CE] cursor-pointer transition-colors">TWITTER</span>
            <span className="hover:text-[#5CA6CE] cursor-pointer transition-colors">CONTACT</span>
          </div>
          <p className="text-[11px] text-gray-600 font-medium mb-1.5">© 2026 OLWaty Inc. All rights reserved.</p>
          <p className="text-[10px] text-gray-700 tracking-wide font-light italic">Premium Curation Service for Creators.</p>
        </footer>

        {/* Floating Indicator */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 pointer-events-none z-50">
          <div className="bg-[#16151D]/90 backdrop-blur-2xl border border-white/10 px-6 py-3 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#5CA6CE] animate-pulse shadow-[0_0_10px_rgba(92,166,206,0.8)]" />
            <span className="text-[11px] font-black text-[#5CA6CE] uppercase tracking-[0.25em]">Launching 2026</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
