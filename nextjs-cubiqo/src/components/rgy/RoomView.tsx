"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { 
  List, 
  LayoutGrid, 
  Square, 
  MapPin,
  Send,
  MoreHorizontal,
  Settings,
  Users,
  Clock,
  Activity,
  Sparkles,
  LucideIcon
} from "lucide-react";
import type { Room } from "./IntentKeywordList";

type ColorType = "green" | "yellow" | "red";

interface DisplayMode {
  id: string;
  label: string;
  icon: LucideIcon;
}

// Display modes
const DISPLAY_MODES: DisplayMode[] = [
  { id: "list", label: "List", icon: List },
  { id: "card", label: "Card", icon: Square },
  { id: "grid", label: "Grid", icon: LayoutGrid },
  { id: "map", label: "Map", icon: MapPin },
];

interface Message {
  id: number;
  type: "system" | "capsule";
  capsuleId?: string;
  content: string;
  timestamp: Date;
  isOwn?: boolean;
}

// Mock messages for demo
const generateMockMessages = (roomName: string): Message[] => [
  {
    id: 1,
    type: "system",
    content: `Room "${roomName}" joined. Messages are end-to-end encrypted.`,
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: 2,
    type: "capsule",
    capsuleId: "CQ-7829",
    content: "Looking for collaborators on a React/TypeScript project. Need frontend expertise.",
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
  },
  {
    id: 3,
    type: "capsule",
    capsuleId: "CQ-4521",
    content: "Interested! What's the scope? I have 3 years of React experience.",
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
  },
  {
    id: 4,
    type: "capsule",
    capsuleId: "CQ-9103",
    content: "Building something similar. Open to knowledge exchange if helpful.",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    id: 5,
    type: "system",
    content: "CQ-2847 has entered the room",
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
  },
  {
    id: 6,
    type: "capsule",
    capsuleId: "CQ-2847",
    content: "Anyone here working on AI integration? Looking for trade opportunities.",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
];

interface RoomViewProps {
  room: Room;
  color: ColorType;
  onBack: () => void;
}

export const RoomView = ({ room, color, onBack }: RoomViewProps) => {
  const [displayMode, setDisplayMode] = useState("list");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load mock messages
    setMessages(generateMockMessages(room.name));
  }, [room.name]);

  useEffect(() => {
    // Auto-scroll to bottom on new messages
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      type: "capsule",
      capsuleId: "CQ-YOU",
      content: inputValue,
      timestamp: new Date(),
      isOwn: true,
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const IntentIcon = room.intent.icon;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Room Header */}
      <div className="border-b border-border/50 bg-surface-1/50 backdrop-blur-sm px-4 sm:px-6 py-3">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Room info */}
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-2 rounded-lg border border-border/50",
                room.intent.badgeClass.replace('text-', 'bg-').replace('/15', '/10')
              )}>
                <IntentIcon className={cn(
                  "h-5 w-5",
                  room.intent.badgeClass.split(' ').find(c => c.startsWith('text-'))
                )} />
              </div>
              <div>
                <h2 className="font-display font-semibold text-lg">{room.name}</h2>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {room.memberCount}
                  </span>
                  <span className="flex items-center gap-1">
                    <Activity className="h-3.5 w-3.5" />
                    Active
                  </span>
                </div>
              </div>
            </div>

            {/* Display mode switcher */}
            <div className="flex items-center gap-2">
              <Tabs value={displayMode} onValueChange={setDisplayMode}>
                <TabsList className="bg-surface-2 border border-border/50">
                  {DISPLAY_MODES.map((mode) => (
                    <TabsTrigger
                      key={mode.id}
                      value={mode.id}
                      className="data-[state=active]:bg-surface-3 px-2.5"
                    >
                      <mode.icon className="h-4 w-4" />
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1" ref={scrollRef}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          {displayMode === "list" && (
            <ListViewMessages messages={messages} formatTime={formatTime} color={color} />
          )}
          {displayMode === "card" && (
            <CardViewMessages messages={messages} formatTime={formatTime} color={color} />
          )}
          {displayMode === "grid" && (
            <GridViewMessages messages={messages} formatTime={formatTime} color={color} />
          )}
          {displayMode === "map" && (
            <MapViewPlaceholder />
          )}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="border-t border-border/50 bg-surface-1/50 backdrop-blur-sm px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                placeholder="Type a message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pr-12 bg-surface-2 border-border/50 focus:border-muted-foreground/50"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className={cn(
                "shrink-0",
                `bg-rgy-${color} hover:bg-rgy-${color}/90 text-primary-foreground`
              )}
            >
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
          <p className="text-xs text-muted-foreground/60 mt-2 font-mono">
            Messages are anonymous. CQ-to-CQ private chats happen outside RGY.
          </p>
        </div>
      </div>
    </div>
  );
};

// List View Component
interface MessageViewProps {
  messages: Message[];
  formatTime: (date: Date) => string;
  color: ColorType;
}

const ListViewMessages = ({ messages, formatTime, color }: MessageViewProps) => (
  <div className="space-y-3">
    {messages.map((msg) => (
      <div
        key={msg.id}
        className={cn(
          "animate-fade-up",
          msg.isOwn && "flex justify-end"
        )}
      >
        {msg.type === "system" ? (
          <div className="flex items-center justify-center py-2">
            <span className="text-xs text-muted-foreground/60 font-mono bg-surface-2 px-3 py-1 rounded-full">
              {msg.content}
            </span>
          </div>
        ) : (
          <Card className={cn(
            "max-w-[80%] p-3 border border-border/50",
            msg.isOwn 
              ? `bg-rgy-${color}/10 border-rgy-${color}/30` 
              : "bg-surface-2"
          )}>
            <div className="flex items-start justify-between gap-4 mb-1">
              <Badge variant="outline" className="font-mono text-xs">
                {msg.capsuleId}
              </Badge>
              <span className="text-xs text-muted-foreground font-mono">
                {formatTime(msg.timestamp)}
              </span>
            </div>
            <p className="text-sm text-foreground/90">{msg.content}</p>
          </Card>
        )}
      </div>
    ))}
  </div>
);

// Card View Component
const CardViewMessages = ({ messages, formatTime, color }: MessageViewProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {messages.filter(m => m.type !== "system").map((msg) => (
      <Card
        key={msg.id}
        className={cn(
          "p-4 border border-border/50 animate-scale-in",
          msg.isOwn 
            ? `bg-rgy-${color}/10 border-rgy-${color}/30` 
            : "bg-surface-2"
        )}
      >
        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline" className="font-mono text-xs">
            {msg.capsuleId}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {formatTime(msg.timestamp)}
          </div>
        </div>
        <p className="text-sm text-foreground/90 line-clamp-3">{msg.content}</p>
      </Card>
    ))}
  </div>
);

// Grid View Component  
const GridViewMessages = ({ messages, formatTime, color }: MessageViewProps) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
    {messages.filter(m => m.type !== "system").map((msg) => (
      <Card
        key={msg.id}
        className={cn(
          "p-3 border border-border/50 animate-scale-in aspect-square flex flex-col",
          msg.isOwn 
            ? `bg-rgy-${color}/10 border-rgy-${color}/30` 
            : "bg-surface-2"
        )}
      >
        <Badge variant="outline" className="font-mono text-xs self-start mb-2">
          {msg.capsuleId}
        </Badge>
        <p className="text-xs text-foreground/90 flex-1 line-clamp-4">{msg.content}</p>
        <span className="text-[10px] text-muted-foreground font-mono mt-auto">
          {formatTime(msg.timestamp)}
        </span>
      </Card>
    ))}
  </div>
);

// Map View Placeholder
const MapViewPlaceholder = () => (
  <div className="flex flex-col items-center justify-center py-20">
    <div className="p-4 rounded-2xl bg-surface-2 border border-border/50 mb-4">
      <MapPin className="h-10 w-10 text-muted-foreground" />
    </div>
    <h3 className="font-display text-lg font-medium mb-2">Map View</h3>
    <p className="text-sm text-muted-foreground text-center max-w-xs">
      Geographic visualization available when room content is geo-relevant. 
      This room doesn&apos;t have location data.
    </p>
    <Badge variant="outline" className="mt-4 font-mono text-xs">
      <Sparkles className="h-3 w-3 mr-1" />
      Coming soon
    </Badge>
  </div>
);
