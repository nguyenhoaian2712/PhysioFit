import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles as SparklesIcon, Music } from 'lucide-react';
import { audioService } from '../services/audioService';

interface AudioPlayerProps {
  sparklesEnabled: boolean;
  onToggleSparkles: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ sparklesEnabled, onToggleSparkles }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showControls, setShowControls] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      audioService.stop();
      setIsPlaying(false);
    } else {
      audioService.start(volume);
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioService.setVolume(val);
    if (!isPlaying && val > 0) {
      audioService.start(val);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      audioService.stop();
    };
  }, []);

  return (
    <div className="relative inline-flex items-center">
      <div className="flex items-center gap-1.5 bg-[#FFFDF7]/90 backdrop-blur-md border border-[#89B9E6]/30 px-3 py-1.5 rounded-full shadow-sm">
        {/* Relaxing Audio Button */}
        <button
          onClick={togglePlay}
          title={isPlaying ? 'Tạm dừng nhạc thiền thư giãn' : 'Bật âm thanh thư giãn (Sóng alpha/174Hz)'}
          className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium transition-all ${
            isPlaying
              ? 'bg-[#C7DFA3] text-[#31465A] shadow-inner'
              : 'text-[#31465A]/80 hover:bg-[#D9F0FF]'
          }`}
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#31465A] animate-pulse" />
              <span className="hidden sm:inline">Nhạc thư giãn (Đang bật)</span>
            </>
          ) : (
            <>
              <Music className="w-3.5 h-3.5 text-[#31465A]/70" />
              <span className="hidden sm:inline">Nhạc thư giãn</span>
            </>
          )}
        </button>

        {/* Volume Slider trigger */}
        <button
          onClick={() => setShowControls(!showControls)}
          className="p-1 text-[#31465A]/70 hover:text-[#31465A] rounded-full hover:bg-[#D9F0FF] transition-colors"
          title="Điều chỉnh âm lượng"
        >
          {volume === 0 || !isPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>

        {/* Sparkles toggle */}
        <button
          onClick={onToggleSparkles}
          title={sparklesEnabled ? 'Tắt hiệu ứng lấp lánh' : 'Bật hiệu ứng lấp lánh nhẹ'}
          className={`p-1 rounded-full transition-colors ${
            sparklesEnabled ? 'text-[#31465A] bg-[#C7DFA3]/50' : 'text-[#31465A]/40 hover:bg-[#D9F0FF]'
          }`}
        >
          <SparklesIcon className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Floating Volume Dropdown */}
      {showControls && (
        <div className="absolute right-0 top-full mt-2 w-48 p-3 bg-[#FFFDF7] border border-[#89B9E6]/40 rounded-2xl shadow-lg z-50 animate-fadeIn">
          <div className="flex justify-between items-center text-xs font-semibold text-[#31465A] mb-2">
            <span>Âm lượng thiền</span>
            <span>{Math.round(volume * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full h-2 bg-[#D9F0FF] rounded-lg appearance-none cursor-pointer accent-[#31465A]"
          />
          <p className="text-[10px] text-[#31465A]/70 mt-2 text-center">
            Âm thanh sóng Alpha 174Hz hỗ trợ phục hồi và giảm căng thẳng.
          </p>
        </div>
      )}
    </div>
  );
};
