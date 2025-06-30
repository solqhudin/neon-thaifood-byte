
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'โปรโมชั่นพิเศษ',
      subtitle: 'ลด 20% สำหรับเมนูแนะนำ',
      description: 'สั่งเมนูแนะนำวันนี้ รับส่วนลดทันที 20%',
      image: '/lovable-uploads/470df029-e7e6-4bfd-82e2-d1c9fc387d6b.png',
      discount: '20% OFF'
    },
    {
      id: 2,
      title: 'เมนูใหม่มาแล้ว!',
      subtitle: 'ลิ้มรสชาติอาหารไทยต้นตำรับ',
      description: 'เชฟพิเศษคัดสรรเมนูอาหารไทยรสชาติเข้มข้น',
      image: '/lovable-uploads/ae2f51db-dcd5-440e-8c12-702f777f6071.png',
      discount: 'NEW'
    },
    {
      id: 3,
      title: 'สั่งง่าย ส่งเร็ว',
      subtitle: 'ใช้เทคโนโลยีล้ำสมัย',
      description: 'ระบบสั่งอาหารอัจฉริยะ ส่งถึงมือคุณภายใน 30 นาที',
      image: '/lovable-uploads/f536494c-f87b-4060-af19-e115847ec848.png',
      discount: 'FAST'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="w-full flex-shrink-0 relative"
            style={{
              background: `linear-gradient(135deg, rgba(26, 0, 51, 0.9), rgba(0, 0, 17, 0.9)), url('${slide.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/40" />
            
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`
                      px-4 py-2 rounded-full text-sm font-orbitron font-bold
                      ${slide.discount === '20% OFF' ? 'bg-red-500/20 text-red-400 border border-red-500/50' : ''}
                      ${slide.discount === 'NEW' ? 'bg-neon-green/20 text-neon-green border border-neon-green/50' : ''}
                      ${slide.discount === 'FAST' ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50' : ''}
                      animate-neon-pulse
                    `}>
                      {slide.discount}
                    </div>
                  </div>
                  
                  <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-neon mb-4 animate-slide-up">
                    {slide.title}
                  </h2>
                  
                  <h3 className="text-xl md:text-2xl font-exo text-neon-pink mb-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    {slide.subtitle}
                  </h3>
                  
                  <p className="text-gray-300 text-lg mb-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                    {slide.description}
                  </p>
                  
                  <Button className="cyber-button px-8 py-3 text-lg font-orbitron font-bold text-cyber-primary border-cyber-primary/50 hover:border-cyber-primary animate-slide-up" style={{ animationDelay: '0.6s' }}>
                    สั่งเลย
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <Button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 border border-neon-blue/30 hover:border-neon-blue/70 text-neon-blue"
        size="sm"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      
      <Button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 border border-neon-blue/30 hover:border-neon-blue/70 text-neon-blue"
        size="sm"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-neon-blue shadow-[0_0_10px_theme(colors.neon-blue)]' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
