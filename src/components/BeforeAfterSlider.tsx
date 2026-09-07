import React, { useState, useRef, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeImageClass?: string;
}

export default function BeforeAfterSlider({ 
  beforeImage, 
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  beforeImageClass = ""
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) handleMove(e.touches[0].clientX);
  };

  const handleInteractionStart = () => setIsDragging(true);
  const handleInteractionEnd = () => setIsDragging(false);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between text-sm font-semibold tracking-widest uppercase text-foreground/50">
        <span>{beforeLabel}</span>
        <span>{afterLabel}</span>
      </div>
      
      <div 
        ref={containerRef}
        className="relative w-full aspect-[4/3] rounded-sm overflow-hidden select-none touch-none cursor-ew-resize bg-foreground/5"
        onMouseDown={handleInteractionStart}
        onMouseMove={handleMouseMove}
        onTouchStart={handleInteractionStart}
        onTouchMove={handleTouchMove}
      >
        {/* Before Image */}
        <div className="absolute inset-0 z-0">
          <img src={beforeImage} alt={beforeLabel} draggable={false} className={`w-full h-full object-cover ${beforeImageClass}`} />
        </div>
        
        {/* After Image */}
        <div 
          className="absolute inset-0 z-10" 
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        >
          <img src={afterImage} alt={afterLabel} draggable={false} className="w-full h-full object-cover" />
        </div>

        {/* Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 z-20 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.5)]"
          style={{ left: `calc(${sliderPosition}% - 2px)` }}
        >
          <div className="w-8 h-8 bg-white text-foreground rounded-full shadow-lg flex items-center justify-center shrink-0 border border-foreground/10 absolute">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-foreground/50">Drag the slider to compare.</p>
    </div>
  );
}
