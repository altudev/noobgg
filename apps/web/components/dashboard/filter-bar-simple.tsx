"use client";

import React, { useState, useRef, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multi-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Grid3X3, List, X, Shield, Award, Star, Gem, Zap, Trophy, Target, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavigationTabs } from '@/components/dashboard/navigation-tabs';
import { Button } from '@/components/ui/button';

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedGame: string;
  onGameChange: (value: string) => void;
  selectedGames: string[]; // Keep for backward compatibility
  onGamesChange: (value: string[]) => void; // Keep for backward compatibility
  selectedRegion: string;
  onRegionChange: (value: string) => void;
  selectedRegions: string[];
  onRegionsChange: (value: string[]) => void;
  selectedMode: string;
  onModeChange: (value: string) => void;
  selectedModes: string[];
  onModesChange: (value: string[]) => void;  selectedLanguages: string[];
  onLanguagesChange: (value: string[]) => void;
  selectedPlatform?: string; // Add single platform selection
  onPlatformChange?: (value: string) => void; // Add single platform selection
  selectedPlatforms: string[]; // Keep for backward compatibility
  onPlatformsChange: (value: string[]) => void; // Keep for backward compatibility
  selectedMicRequired: string[];
  onMicRequiredChange: (value: string[]) => void;
  minRank?: string;
  maxRank?: string;
  onRankRangeChange?: (minRank: string, maxRank: string) => void;
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
  activeFilters?: string[];
  onClearFilters?: () => void;
}

const gameOptions = [
  { value: "all", label: "All Games" },
  { value: "valorant", label: "Valorant" },
  { value: "lol", label: "League of Legends" },
  { value: "fortnite", label: "Fortnite" },
  { value: "pubg", label: "PUBG" },
  { value: "cs2", label: "Counter-Strike 2" },
];

const regionOptions = [
  { value: "all", label: "All Regions" },
  { value: "eu-west", label: "EU West" },
  { value: "eu-east", label: "EU East" },
  { value: "na", label: "North America" },
  { value: "asia", label: "Asia" },
];

const modeOptions = [
  { value: "all", label: "All Modes" },
  { value: "competitive", label: "Competitive" },
  { value: "casual", label: "Casual" },
  { value: "ranked", label: "Ranked" },
];

const languageOptions = [
  { value: "english", label: "English" },
  { value: "turkish", label: "Turkish" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
];

const platformOptions = [
  { value: "pc", label: "PC" },
  { value: "playstation", label: "PlayStation" },
  { value: "xbox", label: "Xbox" },
  { value: "nintendo", label: "Nintendo Switch" },
  { value: "mobile", label: "Mobile" },
];

const playingForOptions = [
  { value: "fun", label: "Fun" },
  { value: "competitive", label: "Competitive" },
  { value: "ranked", label: "Ranked" },
  { value: "casual", label: "Casual" },
];

const micRequiredOptions = [
  { value: "required", label: "Required" },
  { value: "optional", label: "Optional" },
  { value: "not-required", label: "Not Required" },
];

const rankOptions = [
  { value: "iron", label: "Iron", name: "Iron", order: 1 },
  { value: "bronze", label: "Bronze", name: "Bronze", order: 2 },
  { value: "silver", label: "Silver", name: "Silver", order: 3 },
  { value: "gold", label: "Gold", name: "Gold", order: 4 },
  { value: "platinum", label: "Platinum", name: "Platinum", order: 5 },
  { value: "diamond", label: "Diamond", name: "Diamond", order: 6 },
  { value: "ascendant", label: "Ascendant", name: "Ascendant", order: 7 },
  { value: "immortal", label: "Immortal", name: "Immortal", order: 8 },
  { value: "radiant", label: "Radiant", name: "Radiant", order: 9 },
];

export function FilterBarSimple({
  searchTerm,
  onSearchChange,
  selectedGame,
  onGameChange,
  selectedGames,
  onGamesChange,
  selectedRegion,
  onRegionChange,
  selectedRegions,
  onRegionsChange,
  selectedMode,
  onModeChange,
  selectedModes,
  onModesChange,  selectedLanguages,
  onLanguagesChange,
  selectedPlatform = "all",
  onPlatformChange = () => {},
  selectedPlatforms,
  onPlatformsChange,
  selectedMicRequired,
  onMicRequiredChange,
  minRank = "bronze",
  maxRank = "platinum",
  onRankRangeChange,
  viewMode = 'grid',
  onViewModeChange,
  activeFilters = [],
  onClearFilters,
}: FilterBarProps) {
  const [activeTab, setActiveTab] = useState('find');
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Map rank names to Lucide icons
  const getRankIcon = (rankName: string) => {
    const normalized = rankName.toLowerCase();
    if (normalized.includes('iron') || normalized.includes('bronze')) return Shield;
    if (normalized.includes('silver') || normalized.includes('gold')) return Award;
    if (normalized.includes('platinum') || normalized.includes('master')) return Star;
    if (normalized.includes('diamond') || normalized.includes('legendary')) return Gem;
    if (normalized.includes('ascendant') || normalized.includes('champion')) return Zap;
    if (normalized.includes('immortal') || normalized.includes('unreal')) return Trophy;
    if (normalized.includes('radiant')) return Sparkles;
    return Target; // fallback
  };

  const getRankColor = (rankName: string) => {
    const normalized = rankName.toLowerCase();
    if (normalized.includes('iron')) return 'text-gray-500';
    if (normalized.includes('bronze')) return 'text-orange-500';
    if (normalized.includes('silver')) return 'text-gray-300';
    if (normalized.includes('gold') || normalized.includes('master')) return 'text-yellow-500';
    if (normalized.includes('platinum') || normalized.includes('legendary')) return 'text-cyan-400';
    if (normalized.includes('diamond')) return 'text-blue-500';
    if (normalized.includes('ascendant') || normalized.includes('champion')) return 'text-green-500';
    if (normalized.includes('immortal') || normalized.includes('unreal')) return 'text-red-500';
    if (normalized.includes('radiant')) return 'text-purple-500';
    return 'text-gray-400';
  };

  const handleRankClick = (clickedRank: string) => {
    if (!onRankRangeChange) return;
    
    const clickedOrder = rankOptions.find(r => r.value === clickedRank)?.order ?? 0;
    const minOrder = rankOptions.find(r => r.value === minRank)?.order ?? 0;
    const maxOrder = rankOptions.find(r => r.value === maxRank)?.order ?? 0;
    
    // If clicked rank is below min, set as new min
    if (clickedOrder < minOrder) {
      onRankRangeChange(clickedRank, maxRank);
    }
    // If clicked rank is above max, set as new max
    else if (clickedOrder > maxOrder) {
      onRankRangeChange(minRank, clickedRank);
    }
    // If clicked rank is between min and max, determine which end to move
    else {
      const distanceToMin = Math.abs(clickedOrder - minOrder);
      const distanceToMax = Math.abs(clickedOrder - maxOrder);
      
      if (distanceToMin <= distanceToMax) {
        onRankRangeChange(clickedRank, maxRank);
      } else {
        onRankRangeChange(minRank, clickedRank);
      }
    }
  };

  const handleSliderDrag = useCallback((clientX: number) => {
    if (!sliderRef.current || !onRankRangeChange) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const rankIndex = Math.round(percentage * (rankOptions.length - 1));
    const selectedRank = rankOptions[rankIndex];
    
    if (!selectedRank) return;
    
    const minOrder = getSelectedRankOrder(minRank);
    const maxOrder = getSelectedRankOrder(maxRank);
    
    if (isDragging === 'min') {
      // Don't allow min to go above max
      if (selectedRank.order <= maxOrder) {
        onRankRangeChange(selectedRank.value, maxRank);
      }
    } else if (isDragging === 'max') {
      // Don't allow max to go below min
      if (selectedRank.order >= minOrder) {
        onRankRangeChange(minRank, selectedRank.value);
      }
    }
  }, [isDragging, minRank, maxRank, onRankRangeChange]);

  const handleMouseDown = (type: 'min' | 'max') => {
    setIsDragging(type);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      handleSliderDrag(e.clientX);
    }
  }, [isDragging, handleSliderDrag]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  // Add global mouse event listeners
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const isRankInRange = (rank: string) => {
    const rankOrder = rankOptions.find(r => r.value === rank)?.order ?? 0;
    const minOrder = rankOptions.find(r => r.value === minRank)?.order ?? 0;
    const maxOrder = rankOptions.find(r => r.value === maxRank)?.order ?? 0;
    return rankOrder >= minOrder && rankOrder <= maxOrder;
  };

  const getSelectedRankDisplay = (rankValue: string) => {
    return rankOptions.find(r => r.value === rankValue)?.name ?? "Unknown";
  };

  const getSelectedRankOrder = (rankValue: string) => {
    return rankOptions.find(r => r.value === rankValue)?.order ?? 1;
  };

  return (
    <div className="mb-8">      {/* Navigation Tabs */}
      <NavigationTabs 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        type="tabs"
      />{/* Headers for each tab */}
      {activeTab === 'find' && (
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Find a Gaming Lobby
            </h1>
            <p className="text-lg text-gray-400">Discover and join lobbies matching your play style.</p>
          </div>
            {/* View Toggle Buttons */}
          {onViewModeChange && (
            <NavigationTabs 
              viewMode={viewMode || 'grid'}
              onViewModeChange={onViewModeChange}
              type="view"
            />
          )}
        </div>
      )}

      {activeTab === 'open' && (
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-green-400 via-green-300 to-green-500 bg-clip-text text-transparent">
            Open a Gaming Lobby
          </h1>
          <p className="text-lg text-gray-400">Create a new lobby for other players to join.</p>
        </div>
      )}

      {activeTab === 'groups' && (
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent">
            My Groups
          </h1>
          <p className="text-lg text-gray-400">Manage your gaming groups and communities.</p>
        </div>
      )}

      {activeTab === 'clans' && (
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent">
            Clans
          </h1>
          <p className="text-lg text-gray-400">Discover and join gaming clans.</p>
        </div>
      )}

      {activeTab === 'tournaments' && (
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
            Tournaments
          </h1>
          <p className="text-lg text-gray-400">Participate in competitive tournaments.</p>
        </div>
      )}

      {/* Content for Find Lobbies tab */}
      {activeTab === 'find' && (
        <div className="space-y-6">          {/* Modern Filter Container */}
          <div className="relative bg-white/[0.03] backdrop-blur-3xl rounded-2xl p-5 border border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.12)] overflow-visible">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-black/[0.02] rounded-2xl pointer-events-none"></div>
              <div className="relative z-10 overflow-visible">              {/* First Row - Main Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 overflow-visible">                {/* Search */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-white/80 tracking-wide uppercase">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search lobbies..."
                      value={searchTerm}
                      onChange={(e) => onSearchChange(e.target.value)}
                      className={cn(
                        "pl-10 pr-3 py-2 h-10 rounded-xl text-sm font-medium",
                        "bg-black/30 backdrop-blur-xl border-white/20",
                        "text-white placeholder:text-gray-400",
                        "focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/60",
                        "hover:bg-black/40 hover:border-white/30",
                        "transition-all duration-300"
                      )}
                    />
                  </div>
                </div>                {/* Game */}
                <div className="space-y-2 relative" style={{ zIndex: 150 }}>
                  <label className="block text-xs font-semibold text-white/80 tracking-wide uppercase">
                    Game
                  </label>
                  <MultiSelect
                    options={gameOptions.filter(opt => opt.value !== 'all')}
                    value={selectedGames}
                    onValueChange={onGamesChange}
                    placeholder="All Games"
                    className={cn(
                      "h-10 rounded-xl bg-black/30 backdrop-blur-xl",
                      "border-white/20 text-white text-sm font-medium",
                      "focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/60",
                      "hover:bg-black/40 hover:border-white/30",
                      "transition-all duration-300"
                    )}
                  />
                </div>                {/* Platform */}
                <div className="space-y-2 relative" style={{ zIndex: 140 }}>
                  <label className="block text-xs font-semibold text-white/80 tracking-wide uppercase">
                    Platform
                  </label>
                  <MultiSelect
                    options={platformOptions}
                    value={selectedPlatforms}
                    onValueChange={onPlatformsChange}
                    placeholder="All Platforms"
                    className={cn(
                      "h-10 rounded-xl bg-black/30 backdrop-blur-xl",
                      "border-white/20 text-white text-sm font-medium",
                      "focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/60",
                      "hover:bg-black/40 hover:border-white/30",
                      "transition-all duration-300"
                    )}
                  />
                </div>{/* Region */}
                <div className="space-y-2 relative" style={{ zIndex: 130 }}>
                  <label className="block text-xs font-semibold text-white/80 tracking-wide uppercase">
                    Region
                  </label>
                  <MultiSelect
                    options={regionOptions.filter(opt => opt.value !== 'all')}
                    value={selectedRegions}
                    onValueChange={onRegionsChange}                    placeholder="All Regions"
                    className={cn(
                      "h-10 rounded-xl bg-black/30 backdrop-blur-xl",
                      "border-white/20 text-white text-sm font-medium",
                      "focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/60",
                      "hover:bg-black/40 hover:border-white/30",
                      "transition-all duration-300"
                    )}
                  />
                </div>
              </div>              {/* Second Row - Additional Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-visible">                {/* Language */}
                <div className="space-y-2 relative" style={{ zIndex: 120 }}>
                  <label className="block text-xs font-semibold text-white/80 tracking-wide uppercase">
                    Language
                  </label>
                  <MultiSelect
                    options={languageOptions}
                    value={selectedLanguages}
                    onValueChange={onLanguagesChange}                    placeholder="All Languages"
                    className={cn(
                      "h-10 rounded-xl bg-black/30 backdrop-blur-xl",
                      "border-white/20 text-white text-sm font-medium",
                      "focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/60",
                      "hover:bg-black/40 hover:border-white/30",
                      "transition-all duration-300"
                    )}
                  />
                </div>                {/* Game Mode */}
                <div className="space-y-2 relative" style={{ zIndex: 110 }}>
                  <label className="block text-xs font-semibold text-white/80 tracking-wide uppercase">
                    Game Mode
                  </label>
                  <MultiSelect
                    options={modeOptions.filter(opt => opt.value !== 'all')}
                    value={selectedModes}
                    onValueChange={onModesChange}                    placeholder="All Modes"
                    className={cn(
                      "h-10 rounded-xl bg-black/30 backdrop-blur-xl",
                      "border-white/20 text-white text-sm font-medium",
                      "focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/60",
                      "hover:bg-black/40 hover:border-white/30",
                      "transition-all duration-300"
                    )}
                  />
                </div>{/* Mic Required */}
                <div className="space-y-2 relative" style={{ zIndex: 100 }}>
                  <label className="block text-xs font-semibold text-white/80 tracking-wide uppercase">
                    Mic Required
                  </label>
                  <MultiSelect
                    options={micRequiredOptions}
                    value={selectedMicRequired}
                    onValueChange={onMicRequiredChange}                    placeholder="Any"
                    className={cn(
                      "h-10 rounded-xl bg-black/30 backdrop-blur-xl",
                      "border-white/20 text-white text-sm font-medium",
                      "focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/60",
                      "hover:bg-black/40 hover:border-white/30",
                      "transition-all duration-300"
                    )}
                  />
                </div>
              </div>
            </div>
          </div>          {/* Active Filters Display - REMOVED */}{/* Modern Rank Range Card */}
          <div className="relative bg-white/[0.02] backdrop-blur-3xl rounded-2xl p-4 border border-white/8 shadow-[0_15px_30px_rgba(0,0,0,0.10)]">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-black/[0.01] rounded-2xl pointer-events-none"></div>
            
            <div className="relative z-10 space-y-4">
              <label className="block text-xs font-semibold text-white/90 tracking-wide uppercase">
                Rank Range
              </label>              {/* Range Slider with Draggable Handles */}
              <div className="relative px-2 py-4">
                {/* Slider Track */}
                <div 
                  ref={sliderRef}
                  className="relative w-full h-2 bg-white/10 rounded-full cursor-pointer"
                  onClick={(e) => {
                    if (!isDragging) {
                      handleSliderDrag(e.clientX);
                    }
                  }}
                >
                  {/* Active Range Track */}
                  <div 
                    className="absolute top-0 h-full bg-gradient-to-r from-orange-500 to-blue-500 rounded-full transition-all duration-200"
                    style={{
                      left: `${((getSelectedRankOrder(minRank) - 1) / (rankOptions.length - 1)) * 100}%`,
                      width: `${((getSelectedRankOrder(maxRank) - getSelectedRankOrder(minRank)) / (rankOptions.length - 1)) * 100}%`
                    }}
                  ></div>                  {/* Min Range Handle with Icon */}
                  <div                    className={cn(
                      "absolute top-1/2 w-6 h-6 bg-white/95 backdrop-blur rounded-full shadow-lg border-2 border-orange-500 transform -translate-y-1/2 -translate-x-1/2 cursor-grab transition-all duration-200 flex items-center justify-center",
                      isDragging === 'min' ? "scale-125 cursor-grabbing shadow-xl ring-2 ring-orange-300/50" : "hover:scale-110"
                    )}
                    style={{
                      left: `${((getSelectedRankOrder(minRank) - 1) / (rankOptions.length - 1)) * 100}%`
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      handleMouseDown('min');
                    }}                  >
                    {React.createElement(getRankIcon(minRank), {
                      className: `w-3 h-3 ${getRankColor(minRank)}`
                    })}
                  </div>                  {/* Max Range Handle with Icon */}
                  <div                    className={cn(
                      "absolute top-1/2 w-6 h-6 bg-white/95 backdrop-blur rounded-full shadow-lg border-2 border-blue-500 transform -translate-y-1/2 -translate-x-1/2 cursor-grab transition-all duration-200 flex items-center justify-center",
                      isDragging === 'max' ? "scale-125 cursor-grabbing shadow-xl ring-2 ring-blue-300/50" : "hover:scale-110"
                    )}
                    style={{
                      left: `${((getSelectedRankOrder(maxRank) - 1) / (rankOptions.length - 1)) * 100}%`
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      handleMouseDown('max');
                    }}                  >
                    {React.createElement(getRankIcon(maxRank), {
                      className: `w-3 h-3 ${getRankColor(maxRank)}`
                    })}
                  </div>

                  {/* Rank Markers on Track */}
                  {rankOptions.map((rank, index) => (
                    <div 
                      key={rank.value}
                      className="absolute top-1/2 w-2 h-2 bg-white/30 rounded-full transform -translate-y-1/2 -translate-x-1/2 pointer-events-none"
                      style={{
                        left: `${(index / (rankOptions.length - 1)) * 100}%`
                      }}
                    ></div>
                  ))}
                </div>                {/* Rank Labels Below Slider */}
                <div className="relative flex justify-between items-center mt-3">
                  {rankOptions.map((rank, index) => (
                    <div 
                      key={rank.value} 
                      className={cn(
                        "flex flex-col items-center cursor-pointer transition-all duration-300 group",
                        isRankInRange(rank.value) ? "scale-105" : "group-hover:scale-100"
                      )}
                      onClick={() => handleRankClick(rank.value)}
                    >                      {/* Rank Icon */}
                      <div className={cn(                        "mb-0.5 transition-all duration-300 rounded-full p-0.5",
                        isRankInRange(rank.value) 
                          ? "ring-1 ring-white/40 shadow-lg bg-white/10"
                          : "opacity-70 group-hover:opacity-100 group-hover:bg-white/5"
                      )}>
                        {React.createElement(getRankIcon(rank.value), {
                          className: cn(
                            "w-4 h-4 transition-all duration-300",
                            getRankColor(rank.value),
                            isRankInRange(rank.value) ? "drop-shadow-lg" : ""
                          )
                        })}
                      </div>
                      
                      {/* Rank Name */}
                      <span className={cn(
                        "text-[9px] font-medium transition-colors duration-300 uppercase tracking-wider",
                        isRankInRange(rank.value) ? "text-white font-semibold" : "text-white/50 group-hover:text-white/80"
                      )}>
                        {rank.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>              {/* Selected Range Display with Icons */}
              <div className="flex items-center justify-center space-x-4 mt-4"><div className="flex items-center space-x-2 bg-white/5 backdrop-blur rounded-2xl px-4 py-2 border border-white/10">                  {React.createElement(getRankIcon(minRank), {
                    className: `w-3 h-3 ${getRankColor(minRank)}`
                  })}
                  <div className="flex flex-col">                    <span className="text-[9px] text-white/60 uppercase tracking-wide">From</span>
                    <span className="text-xs font-semibold text-white">{getSelectedRankDisplay(minRank)}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-white/40">
                  <div className="w-8 border-t border-dashed border-white/20"></div>
                  <span className="text-xs">to</span>
                  <div className="w-8 border-t border-dashed border-white/20"></div>
                </div>
                  <div className="flex items-center space-x-1.5 bg-white/5 backdrop-blur rounded-xl px-3 py-1.5 border border-white/10">                  {React.createElement(getRankIcon(maxRank), {
                    className: `w-3 h-3 ${getRankColor(maxRank)}`
                  })}
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/60 uppercase tracking-wide">To</span>
                    <span className="text-sm font-semibold text-white">{getSelectedRankDisplay(maxRank)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content for other tabs */}
      {activeTab === 'open' && (
        <div className="bg-white/[0.02] backdrop-blur-3xl rounded-3xl p-8 border border-green-500/20">
          <h3 className="text-2xl font-bold text-white mb-4">Create New Lobby</h3>
          <p className="text-gray-300">Lobby creation form will be displayed here.</p>
        </div>
      )}

      {activeTab === 'groups' && (
        <div className="bg-white/[0.02] backdrop-blur-3xl rounded-3xl p-8 border border-blue-500/20">
          <h3 className="text-2xl font-bold text-white mb-4">My Groups</h3>
          <p className="text-gray-300">Your gaming groups will be displayed here.</p>
        </div>
      )}

      {activeTab === 'clans' && (
        <div className="bg-white/[0.02] backdrop-blur-3xl rounded-3xl p-8 border border-purple-500/20">
          <h3 className="text-2xl font-bold text-white mb-4">Available Clans</h3>
          <p className="text-gray-300">Discover and join gaming clans here.</p>
        </div>
      )}

      {activeTab === 'tournaments' && (
        <div className="bg-white/[0.02] backdrop-blur-3xl rounded-3xl p-8 border border-yellow-500/20">
          <h3 className="text-2xl font-bold text-white mb-4">Tournaments</h3>
          <p className="text-gray-300">Tournament information and registration will be displayed here.</p>
        </div>
      )}
    </div>
  );
}
