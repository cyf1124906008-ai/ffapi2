import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AIChip } from "./components/AIChip";
import { LandingPage } from "./components/LandingPage";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    
    // 初始化 Lenis (高阻尼平滑滚动)
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 全局滚动进度驱动 3D
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => setScrollProgress(self.progress)
    });

    // 文字遮罩入场动画
    const sections = gsap.utils.toArray(".section") as HTMLElement[];
    sections.forEach((section) => {
      const title = section.querySelector(".reveal-text");
      if (title) {
        gsap.to(title, { 
          clipPath: "inset(0% 0% 0% 0%)", 
          y: 0,
          duration: 1.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      }
    });

    // 3D 芯片空间位移 (更微妙)
    gsap.to(".chip-canvas", {
      x: "10%",
      y: "5%",
      rotate: 5,
      scrollTrigger: {
        trigger: "#models",
        start: "top bottom",
        end: "top top",
        scrub: 1
      }
    });

    gsap.to(".chip-canvas", {
      x: "-10%",
      scale: 1.1,
      scrollTrigger: {
        trigger: "#pricing",
        start: "top bottom",
        end: "top top",
        scrub: 1
      }
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative bg-black text-white font-sans">
      {/* 3D 背景层 */}
      <div className="fixed inset-0 z-0 pointer-events-none chip-canvas">
        <Canvas camera={{ position: [0, 0, 5], fov: 35 }}>
          <ambientLight intensity={0.1} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
          <AIChip progress={scrollProgress} />
          <Environment preset="night" />
        </Canvas>
      </div>

      {/* DOM 内容层 (FFapi 落地页) */}
      <LandingPage />

      {/* 进度条 */}
      <div className="fixed left-0 bottom-0 h-1 bg-[#00f3ff] z-50 transition-all duration-100 ease-out" style={{ width: `${scrollProgress * 100}%` }} />
    </div>
  );
}
