"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Mic, 
  MicOff, 
  Crown,
  Clock
} from 'lucide-react';

interface LobbyCardSimpleProps {
  lobby: {
    id: number;
    game: { name: string; icon: string; logo?: string };
    owner: { username: string; avatar?: string };
    players?: Array<{
      id: string;
      username: string;
      avatar: string;
      level?: number;
      rank?: string;
    }>;
    mode: string;
    region: string;
    currentSize: number;
    maxSize: number;
    minRank: string;
    maxRank: string;
    isMicRequired: boolean;
    type: "public" | "private";
    status: "waiting" | "in-game" | "full";
    note?: string;
    createdAt: string;
    tags?: string[];
  };
  onJoin: (lobbyId: number) => void;
  onEdit: (lobbyId: number) => void;
  onDelete: (lobbyId: number) => void;
}

export function LobbyCardSimple({ lobby, onJoin, onEdit, onDelete }: LobbyCardSimpleProps) {
  const [imageError, setImageError] = useState(false);
  const isJoinable = lobby.status === 'waiting' && lobby.currentSize < lobby.maxSize;
  
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getStatusColor = () => {
    switch (lobby.status) {
      case 'waiting': return 'bg-green-600';
      case 'in-game': return 'bg-yellow-600';
      case 'full': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };  return (
    <div className="relative group h-full">
      {/* Clean glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-[20px] blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative bg-white/[0.02] backdrop-blur-3xl rounded-[20px] p-5 border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.2)] transition-all duration-500 group-hover:bg-white/[0.03] h-full min-h-[300px] flex flex-col">
        
        <div className="flex-1 flex flex-col">
          {/* Header - Game + Status */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-[16px] p-2 flex items-center justify-center border border-white/20">
                {!imageError ? (
                  <img 
                    src={lobby.game.icon} 
                    alt={lobby.game.name}
                    className="w-full h-full object-contain"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <span className="text-sm font-bold text-white">
                    {lobby.game.name[0]}
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">{lobby.game.name}</h3>
                <p className="text-gray-400 text-sm">{lobby.mode} • {lobby.region}</p>
              </div>
            </div>
            <div className={`w-3 h-3 rounded-full ${getStatusColor()} shadow-lg`}></div>
          </div>

          {/* Owner */}
          <div className="flex items-center space-x-2 mb-4 p-2 bg-white/5 rounded-lg border border-white/10">
            <Avatar className="w-6 h-6">
              <AvatarImage src={lobby.owner.avatar} />
              <AvatarFallback className="bg-black/40 text-white text-xs">
                {lobby.owner.username[0]}
              </AvatarFallback>
            </Avatar>
            <span className="text-gray-300 text-sm font-medium">{lobby.owner.username}</span>
            <Crown className="w-4 h-4 text-yellow-500" />
          </div>

          {/* Players Section - Cleaner Layout */}
          <div className="bg-black/10 backdrop-blur rounded-[16px] p-4 border border-white/5 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300 text-sm font-medium">Players</span>
              </div>
              <span className="text-white font-semibold">{lobby.currentSize}/{lobby.maxSize}</span>
            </div>
            
            {/* Player Grid */}
            {lobby.players && lobby.players.length > 0 ? (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  {lobby.players.slice(0, 4).map((player) => (
                    <div key={player.id} className="flex items-center gap-2 bg-white/5 rounded-lg px-2 py-1.5 border border-white/10">
                      <Avatar className="w-5 h-5">
                        <AvatarImage src={player.avatar} />
                        <AvatarFallback className="bg-black/40 text-white text-xs">
                          {player.username[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-gray-300 text-xs font-medium truncate">
                        {player.username}
                      </span>
                    </div>
                  ))}
                </div>
                
                {lobby.players.length > 4 && (
                  <div className="text-center text-xs text-gray-400 bg-white/5 rounded-lg py-1">
                    +{lobby.players.length - 4} more players
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-400 text-sm py-2">
                No players joined yet
              </div>
            )}
          </div>

          {/* Essential Info - Minimal */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Rank Range</span>
              <span className="text-white font-medium">{lobby.minRank} - {lobby.maxRank}</span>
            </div>
            
            {lobby.isMicRequired && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Voice Chat</span>
                <Mic className="w-4 h-4 text-green-500" />
              </div>
            )}
          </div>

          {/* Note - Compact */}
          {lobby.note && (
            <div className="mb-4 p-3 bg-black/20 backdrop-blur rounded-lg border-l-4 border-blue-500/50">
              <p className="text-gray-300 text-sm line-clamp-2">{lobby.note}</p>
            </div>
          )}

          {/* Tags - Compact */}
          {lobby.tags && lobby.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {lobby.tags.slice(0, 3).map((tag, index) => (
                <Badge 
                  key={index}
                  variant="secondary"
                  className="bg-black/20 backdrop-blur text-gray-300 text-xs border border-white/10 px-2 py-1 rounded-lg"
                >
                  {tag}
                </Badge>
              ))}
              {lobby.tags.length > 3 && (
                <span className="text-gray-500 text-xs self-center">+{lobby.tags.length - 3}</span>
              )}
            </div>
          )}

          {/* Footer - Join Button + Time */}
          <div className="flex items-center justify-between pt-3 border-t border-white/10 mt-auto">
            <div className="flex items-center space-x-1 text-gray-400 text-xs">
              <Clock className="w-3 h-3" />
              <span>{formatTimeAgo(lobby.createdAt)}</span>
            </div>
            
            {isJoinable ? (
              <Button
                onClick={() => onJoin(lobby.id)}
                className="bg-blue-600/90 hover:bg-blue-700 text-white border-0 transition-all duration-200 rounded-[16px] shadow-lg hover:shadow-blue-500/25 px-6"
              >
                Join Lobby
              </Button>
            ) : (
              <Button
                disabled
                className="bg-gray-600/50 text-gray-400 border-0 rounded-[16px] px-6"
              >
                {lobby.status === 'full' ? 'Full' : 'In Game'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
