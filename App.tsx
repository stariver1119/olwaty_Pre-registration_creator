import React, { useEffect, useRef, useState } from 'react';
import { PAIN_POINTS, FEATURES } from './constants';
import EmailForm from './components/EmailForm';
import { ArrowDown, Play, Sparkles, Star, Banknote } from 'lucide-react';

type MotionPreset = {
  heroSequence: boolean;
  parallax: boolean;
  revealCards: boolean;
  mockupInteractive: boolean;
  ctaMotion: boolean;
  formMicro: boolean;
  progress: boolean;
  storytelling: boolean;
};

const MOTION: MotionPreset = {
  heroSequence: true,
  parallax: true,
  revealCards: true,
  mockupInteractive: true,
  ctaMotion: true,
  formMicro: true,
  progress: true,
  storytelling: false,
};

const useScrollY = (enabled: boolean): number => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [enabled]);

  return scrollY;
};

const useScrollProgress = (
  enabled: boolean,
  targetRef?: React.RefObject<HTMLElement | null>
): number => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    const onScroll = () => {
      const targetElement = targetRef?.current;
      if (!targetElement) {
        const totalHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        setProgress(Math.min(100, (window.scrollY / totalHeight) * 100));
        return;
      }

      const targetTop = targetElement.getBoundingClientRect().top + window.scrollY;
      // 100% when the CTA form enters viewport area (not when it reaches top edge)
      const pointForFull = Math.max(1, targetTop - window.innerHeight + 120);
      const nextProgress = Math.min(100, (window.scrollY / pointForFull) * 100);
      setProgress(nextProgress);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [enabled, targetRef]);

  return progress;
};

const Reveal: React.FC<{ enabled: boolean; delay?: number; className?: string; children: React.ReactNode }> = ({
  enabled,
  delay = 0,
  className = '',
  children,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(!enabled);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.18 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [enabled]);

  return (
    <div
      ref={ref}
      className={className}
      style={
        enabled
          ? {
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0px) scale(1)' : 'translateY(28px) scale(0.985)',
            filter: isVisible ? 'blur(0px)' : 'blur(2px)',
            transition: `opacity 700ms ease ${delay}ms, transform 700ms ease ${delay}ms, filter 700ms ease ${delay}ms`,
          }
          : undefined
      }
    >
      {children}
    </div>
  );
};

const App: React.FC = () => {
  const ctaFormRef = useRef<HTMLDivElement | null>(null);
  const scrollY = useScrollY(MOTION.parallax || MOTION.progress || MOTION.storytelling);
  const progress = useScrollProgress(MOTION.progress, ctaFormRef);

  const [heroReady, setHeroReady] = useState(!MOTION.heroSequence);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Sequential Video Data
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isTransitioning = useRef(false);

  useEffect(() => {
    isTransitioning.current = false;
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeVideoIndex) {
        video.currentTime = 0;
        video.play().catch(() => { });
      } else {
        video.pause();
        if (progressRefs.current[index]) {
          progressRefs.current[index]!.style.width = '0%';
        }
      }
    });
  }, [activeVideoIndex]);

  const handleVideoTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>, index: number) => {
    if (activeVideoIndex !== index) return;
    const video = e.currentTarget;
    if (!video.duration) return;

    // Use half of the video's actual duration to skip the end and cycle faster
    const targetDuration = video.duration / 2;

    if (progressRefs.current[index]) {
      const currentProgress = Math.min((video.currentTime / targetDuration) * 100, 100);
      progressRefs.current[index]!.style.width = `${currentProgress}%`;
    }

    if (!isTransitioning.current && video.currentTime >= targetDuration) {
      isTransitioning.current = true;
      video.pause();
      setActiveVideoIndex((prev) => (prev + 1) % 3);
    }
  };

  useEffect(() => {
    if (!MOTION.heroSequence) return;
    const timer = window.setTimeout(() => setHeroReady(true), 120);
    return () => window.clearTimeout(timer);
  }, []);

  const heroStyle = (delay: number): React.CSSProperties | undefined => {
    if (!MOTION.heroSequence) return undefined;
    return {
      opacity: heroReady ? 1 : 0,
      transform: heroReady ? 'translateY(0px)' : 'translateY(24px)',
      transition: `opacity 600ms ease ${delay}ms, transform 600ms ease ${delay}ms`,
    };
  };

  const handleMockupMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!MOTION.mockupInteractive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (0.5 - py) * 8,
      y: (px - 0.5) * 10,
    });
  };

  const resetMockup = () => {
    if (!MOTION.mockupInteractive) return;
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="min-h-screen w-full bg-[#000000] flex justify-center selection:bg-[#a78bfa]/30 selection:text-white overflow-x-hidden font-sans">
      {MOTION.progress && (
        <div className="fixed right-3 top-1/2 -translate-y-1/2 z-[60] flex flex-col items-center gap-3">
          <div className="w-1 h-36 bg-white/10 rounded-full overflow-hidden">
            <div
              className="w-full bg-gradient-to-b from-[#a78bfa] to-[#a78bfa] rounded-full transition-[height] duration-150"
              style={{ height: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <main className="w-full max-w-[480px] bg-[#050505] min-h-screen relative shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col no-scrollbar overflow-y-auto overflow-x-hidden">
        <div
          className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-[#222222]/60 via-[#050505] to-transparent pointer-events-none"
          style={MOTION.parallax ? { transform: `translateY(${scrollY * 0.12}px)` } : undefined}
        />
        <div
          className="absolute top-40 left-[-20%] w-80 h-80 bg-[#a78bfa] blur-[120px] rounded-full opacity-10 pointer-events-none animate-pulse-glow"
          style={MOTION.parallax ? { transform: `translateY(${scrollY * 0.08}px)` } : undefined}
        />
        <div
          className="absolute top-[60%] right-[-20%] w-80 h-80 bg-[#a78bfa] blur-[120px] rounded-full opacity-10 pointer-events-none animate-pulse-glow"
          style={MOTION.parallax ? { transform: `translateY(${-scrollY * 0.06}px)` } : undefined}
        />

        <section className="relative pt-12 pb-16 px-8 flex flex-col items-center text-center">
          <Reveal enabled={MOTION.revealCards} delay={40} className="w-full">
            <div
              className={`relative w-full mb-16 z-20 ${MOTION.mockupInteractive ? '' : 'animate-float'}`}
              style={heroStyle(0)}
              onMouseMove={handleMockupMove}
              onMouseLeave={resetMockup}
            >
              <div className="absolute inset-0 bg-[#a78bfa] blur-[60px] opacity-10 rounded-full" />

              <div
                className="relative p-[1px] rounded-[42px] bg-gradient-to-b from-white/20 via-white/5 to-transparent shadow-[0_40px_80px_rgba(0,0,0,0.7)] overflow-hidden"
                style={
                  MOTION.mockupInteractive
                    ? {
                      transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                      transition: 'transform 120ms ease-out',
                    }
                    : undefined
                }
              >
                <div className="bg-[#111111]/90 backdrop-blur-xl rounded-[41px] p-6 border border-white/5">
                  <div className="flex justify-between items-center mb-6 px-1">
                    <div className="h-4 w-16 bg-white/5 rounded-full" />
                    <div className="flex gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#a78bfa]" />
                    </div>
                  </div>

                  <div className="relative mb-8 overflow-hidden py-1">
                    <div className="animate-scroll-x flex gap-4">
                      {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((i, idx) => (
                        <div key={idx} className="relative flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-[#a78bfa] to-[#a78bfa] p-[1.5px] shadow-lg">
                          <div className="w-full h-full rounded-full bg-[#050505] border-2 border-[#050505] overflow-hidden">
                            <img
                              src={`https://picsum.photos/seed/crea${i}${idx}/100/100`}
                              alt="Avatar"
                              className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all"
                            />
                          </div>
                          {idx % 3 === 0 && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#a78bfa] rounded-full border-2 border-[#111111] flex items-center justify-center">
                              <Star size={8} className="text-white fill-white" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[1, 2, 3].map((i, index) => (
                      <div
                        key={i}
                        className={`flex gap-4 items-center group cursor-default transition-all duration-300 ${activeVideoIndex === index ? 'opacity-100 scale-[1.02]' : 'opacity-40 hover:opacity-70 scale-100'}`}
                      >
                        <div className="w-20 h-12 bg-[#050505] rounded-xl overflow-hidden relative shadow-inner border border-white/5">
                          {(() => {
                            const videoUrls = [
                              "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
                              "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
                              "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
                            ];
                            return (
                              <video
                                ref={(el) => { if (el) videoRefs.current[index] = el; }}
                                src={videoUrls[index]}
                                muted
                                playsInline
                                onTimeUpdate={(e) => handleVideoTimeUpdate(e, index)}
                                className={`w-full h-full object-cover transition-transform duration-700 ${MOTION.mockupInteractive && activeVideoIndex === index ? 'group-hover:scale-110' : ''}`}
                              />
                            );
                          })()}
                          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${activeVideoIndex === index ? 'opacity-0' : 'opacity-100'}`}>
                            <Play size={14} className="text-white fill-white opacity-40" />
                          </div>
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <div
                              ref={(el) => { if (el) progressRefs.current[index] = el; }}
                              className={`h-full ${activeVideoIndex === index ? 'bg-[#a78bfa] shadow-[0_0_10px_rgba(167,139,250,0.8)]' : 'bg-white/20'} rounded-full transition-all duration-75`}
                              style={{ width: '0%' }}
                            />
                          </div>
                          <div className="h-1.5 w-1/3 bg-white/5 rounded-full" />
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center">
                          <div className={`w-1 h-3 rounded-full transition-colors duration-300 ${activeVideoIndex === index ? 'bg-[#a78bfa] animate-pulse' : 'bg-white/10'}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-white/10 rounded-full" />
              </div>

              <div className="absolute -bottom-4 right-4 bg-gradient-to-r from-[#a78bfa] to-[#a78bfa] text-white px-4 py-2 rounded-2xl text-[9px] font-black shadow-2xl tracking-[0.2em] uppercase border border-white/10">
                Prototype
              </div>
            </div>
          </Reveal>

          <Reveal enabled={MOTION.revealCards} delay={80} className="w-full">
            <h1
              className="text-[32px] font-black tracking-tight mb-6 text-glow leading-[1.2] bg-clip-text text-transparent bg-gradient-to-r from-[#a78bfa] to-[#ffffff] animate-heading-unify"
              style={heroStyle(120)}
            >
              팬과 진짜로 연결되는 순간
            </h1>
          </Reveal>

          <p className="text-gray-400 font-bold text-base tracking-widest mb-12 uppercase" style={heroStyle(240)}>
            올와티 <span className="mx-2 opacity-30">|</span> OLWATY
          </p>

          <div className="w-full flex justify-center" style={heroStyle(340)}>
            <EmailForm enhanced={MOTION.formMicro} />
          </div>

          <div className="mt-16 animate-bounce text-gray-500/50" style={heroStyle(460)}>
            <ArrowDown size={24} strokeWidth={1.5} />
          </div>
        </section>

        <section className="px-6 py-16 relative z-10">
          <div className="flex flex-col items-center mb-12">
            <div className="bg-[#a78bfa]/20 text-[#a78bfa] px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] mb-4 border border-[#a78bfa]/20 uppercase">Points</div>
            <Reveal enabled={MOTION.revealCards} delay={20}>
              <h2 className="text-3xl font-black text-white leading-tight animate-heading-unify">왜 팬에게 안 닿을까요</h2>
            </Reveal>
          </div>

          <div className="space-y-6">
            {PAIN_POINTS.map((point, index) => (
              <Reveal key={index} enabled={MOTION.revealCards} delay={index * 90}>
                <div className="bg-gradient-to-br from-[#222222]/30 to-transparent border border-white/5 rounded-[32px] p-8 transition-all hover:border-[#a78bfa]/30 group backdrop-blur-md shadow-2xl">
                  <div className="flex items-start gap-6">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#a78bfa]/10 text-[#a78bfa] font-black text-sm border border-[#a78bfa]/20 flex-shrink-0">
                      0{index + 1}
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl mb-3 group-hover:text-[#a78bfa] transition-colors">{point.scenario}</h3>
                      <p className="text-gray-400 text-[15px] leading-relaxed font-normal">{point.content}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="px-10 py-24 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#a78bfa]/5 to-transparent" />
          <div className="relative z-10">
            <Sparkles className="mx-auto mb-6 text-[#a78bfa] opacity-60" size={32} />
            <Reveal enabled={MOTION.revealCards} delay={20}>
              <h2 className="text-2xl font-black text-white mb-6 leading-snug animate-heading-unify">
                시청자가
                <br />
                <span className="text-[#a78bfa]"> 진짜 팬</span>이 되는 공간
              </h2>
            </Reveal>
            <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-[#a78bfa] to-transparent mx-auto" />
          </div>
        </section>

        <section className="px-6 py-20 bg-[#000000]/80 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#a78bfa]/40 to-transparent" />

          <div className="flex flex-col items-center mb-16">
            <div className="bg-[#a78bfa]/20 text-[#a78bfa] px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] mb-4 border border-[#a78bfa]/20 uppercase">Solution</div>
            <Reveal enabled={MOTION.revealCards} delay={20}>
              <h2 className="text-3xl font-black text-white animate-heading-unify">올와티의 접근법</h2>
            </Reveal>
          </div>

          <div className="space-y-12 mb-10">
            {FEATURES.map((feature, index) => (
              <Reveal key={index} enabled={MOTION.revealCards} delay={index * 90}>
                <div className="flex gap-6 items-start group">
                  <div className="bg-[#111111] p-4 rounded-2xl h-fit border border-white/5 group-hover:bg-[#222222]/40 transition-colors shadow-xl flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div className="pt-1">
                    <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                    <p className="text-[15px] text-gray-400 leading-relaxed font-normal">{feature.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal enabled={MOTION.revealCards} delay={120}>
            <div className="mt-20 p-8 rounded-[40px] bg-white/[0.02] border border-white/5 text-center">
              <div className="w-16 h-16 bg-[#a78bfa]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Banknote size={32} className="text-[#a78bfa]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">기존 수익 유지, 추가 수익화도 가능</h3>
              <div className="text-gray-400 font-medium leading-relaxed flex flex-col gap-2">
                <p>*임베드 재생도 크리에이터 수익에 포함됩니다.</p>
                <p className="text-xs opacity-50">(자체 수익화 기능은 올해 중반 출시 예정)</p>
                <p className="text-[#a78bfa] font-bold mt-1">테스터부터 올와티 미리보기 수익화 기능 사용가능</p>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="px-8 py-28 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#222222]/40 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <p className="text-[#a78bfa] font-black text-[10px] tracking-[0.4em] uppercase mb-4 opacity-80">When True Fans Connect</p>
            <Reveal enabled={MOTION.revealCards} delay={20} className="w-full">
              <h2
                className={`text-2xl font-black text-white mb-10 leading-[1.3] tracking-tight ${MOTION.ctaMotion ? 'animate-gradient-heading' : ''
                  } animate-heading-unify`}
              >
                팬과<span className="text-[#a78bfa] text-glow"> 진짜로 </span>연결되는 순간
                <br />
                <span className="block mt-3 text-4xl bg-clip-text text-transparent bg-gradient-to-r from-[#a78bfa] to-[#ffffff]">올와티 OLWATY</span>
              </h2>
            </Reveal>

            <div className="w-12 h-1 bg-gradient-to-r from-transparent via-[#a78bfa]/40 to-transparent mb-12" />

            <p className="text-gray-200 text-lg mb-12 font-semibold">
              2026년, 곧 만나요.
              <br />
              <span className="text-gray-400 font-normal text-base mt-2 block">런칭 알림을 예약하세요.</span>
            </p>

            <Reveal enabled={MOTION.revealCards} delay={100} className="w-full">
              <div ref={ctaFormRef} className="w-full flex justify-center">
                <EmailForm enhanced={MOTION.formMicro} />
              </div>
            </Reveal>
          </div>
        </section>

        <footer className="py-20 px-8 border-t border-white/5 text-center bg-[#000000]">
          <div className="flex justify-center gap-8 mb-10 text-gray-500 font-bold tracking-[0.2em] text-[10px]">
            <a href="mailto:contact@olwaty.com" className="hover:text-[#a78bfa] cursor-pointer transition-colors">CONTACT@OLWATY.COM</a>
          </div>
          <p className="text-[11px] text-gray-600 font-medium mb-1.5">© 2026 OLWATY Inc. All rights reserved.</p>
          <p className="text-[10px] text-gray-700 tracking-wide font-light italic">Premium Curation Service for Creators.</p>
        </footer>

        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 pointer-events-none z-50">
          <div
            className={`bg-[#050505]/90 backdrop-blur-2xl border border-white/10 px-6 py-3 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex items-center gap-3 ${MOTION.ctaMotion ? 'animate-glow-soft' : ''
              }`}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#a78bfa] animate-pulse shadow-[0_0_10px_rgba(92,166,206,0.8)]" />
            <span className="text-[11px] font-black text-[#a78bfa] uppercase tracking-[0.25em]">
              SOON 03.2026
            </span>
          </div>
        </div>

        {MOTION.parallax && (
          <div
            className="fixed bottom-0 left-0 w-full h-20 pointer-events-none"
            style={{
              background: `linear-gradient(to top, rgba(13,12,18,0.9), rgba(13,12,18,0.2) ${Math.min(
                100,
                30 + scrollY * 0.03
              )}%, transparent)`,
            }}
          />
        )}
      </main>
    </div>
  );
};

export default App;
