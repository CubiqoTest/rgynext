import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { 
  Search, 
  Users2, 
  Building2, 
  ArrowLeftRight,
  ChevronRight,
  Sparkles,
  Activity
} from "lucide-react";

// Mock data - Keywords would come from user capsule in real implementation
const MOCK_KEYWORDS = {
  green: [
    "Frontend Dev", "React", "AI/ML", "Startup", "Crypto", "Design", 
    "Marketing", "Sales", "Finance", "Legal", "Health", "Fitness"
  ],
  yellow: [
    "Gaming", "Music", "Travel", "Food", "Sports", "Movies",
    "Books", "Art", "Photography", "Hiking", "Coffee", "Pets"
  ],
  red: [
    "Coffee Dates", "Dinner", "Movies", "Adventure", "Casual",
    "Serious", "Travel Partners", "Night Life", "Concerts", "Dancing"
  ]
};

// Fixed intents
const INTENTS = [
  { 
    id: "collab", 
    label: "Collab", 
    description: "Find collaborators",
    icon: Users2,
    badgeClass: "intent-badge-collab"
  },
  { 
    id: "company", 
    label: "Company", 
    description: "Join or form groups",
    icon: Building2,
    badgeClass: "intent-badge-company"
  },
  { 
    id: "trade", 
    label: "Trade", 
    description: "Exchange & deals",
    icon: ArrowLeftRight,
    badgeClass: "intent-badge-trade"
  },
];

export const IntentKeywordList = ({ color, onRoomSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIntent, setSelectedIntent] = useState(null);
  const [hoveredRoom, setHoveredRoom] = useState(null);

  const keywords = MOCK_KEYWORDS[color] || [];

  // Generate room combinations based on intent × keyword
  const rooms = useMemo(() => {
    const result = [];
    const intentsToUse = selectedIntent 
      ? INTENTS.filter(i => i.id === selectedIntent) 
      : INTENTS;

    intentsToUse.forEach(intent => {
      keywords.forEach(keyword => {
        const roomId = `${intent.id}-${keyword.toLowerCase().replace(/\s+/g, '-')}`;
        const roomName = `${intent.label} × ${keyword}`;
        
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          if (!roomName.toLowerCase().includes(query)) return;
        }
        
        result.push({
          id: roomId,
          intent: intent,
          keyword: keyword,
          name: roomName,
          memberCount: Math.floor(Math.random() * 50) + 5,
          isActive: Math.random() > 0.5,
        });
      });
    });
    
    return result;
  }, [keywords, selectedIntent, searchQuery]);

  const handleRoomClick = (room) => {
    onRoomSelect(room);
  };

  const colorClass = {
    green: "green",
    yellow: "yellow", 
    red: "red"
  }[color];

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Sticky header with search and filters */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/50 px-4 sm:px-6 py-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search rooms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-surface-1 border-border/50 focus:border-muted-foreground/50"
            />
          </div>

          {/* Intent Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs text-muted-foreground font-mono shrink-0">FILTER:</span>
            <Badge
              variant={selectedIntent === null ? "default" : "outline"}
              className={cn(
                "cursor-pointer shrink-0 transition-colors",
                selectedIntent === null && "bg-surface-3"
              )}
              onClick={() => setSelectedIntent(null)}
            >
              All Intents
            </Badge>
            {INTENTS.map(intent => (
              <Badge
                key={intent.id}
                variant="outline"
                className={cn(
                  "cursor-pointer shrink-0 transition-all",
                  selectedIntent === intent.id && intent.badgeClass
                )}
                onClick={() => setSelectedIntent(
                  selectedIntent === intent.id ? null : intent.id
                )}
              >
                <intent.icon className="h-3 w-3 mr-1" />
                {intent.label}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Room List */}
      <ScrollArea className="flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          {/* Stats header */}
          <div className="flex items-center justify-between mb-4 text-sm">
            <span className="text-muted-foreground">
              <span className="font-mono text-foreground">{rooms.length}</span> rooms available
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Activity className="h-3.5 w-3.5" />
              <span className="font-mono">{rooms.filter(r => r.isActive).length}</span> active
            </span>
          </div>

          {/* Room items */}
          <div className="space-y-2">
            {rooms.map((room, index) => {
              const IntentIcon = room.intent.icon;
              const isHovered = hoveredRoom === room.id;

              return (
                <Card
                  key={room.id}
                  onClick={() => handleRoomClick(room)}
                  onMouseEnter={() => setHoveredRoom(room.id)}
                  onMouseLeave={() => setHoveredRoom(null)}
                  className={cn(
                    "room-item p-4 cursor-pointer border border-border/50",
                    "bg-surface-1 hover:bg-surface-2",
                    "transition-all duration-200",
                    colorClass,
                    "animate-fade-up"
                  )}
                  style={{ animationDelay: `${Math.min(index * 30, 300)}ms` }}
                >
                  <div className="flex items-center justify-between">
                    {/* Left: Intent icon and room info */}
                    <div className="flex items-center gap-4">
                      {/* Intent indicator */}
                      <div className={cn(
                        "p-2.5 rounded-lg bg-surface-2 border border-border/50",
                        "transition-all duration-200",
                        isHovered && room.intent.badgeClass.replace('text-', 'border-').replace('/15', '/30')
                      )}>
                        <IntentIcon className={cn(
                          "h-5 w-5 transition-colors",
                          isHovered ? room.intent.badgeClass.split(' ').find(c => c.startsWith('text-')) : "text-muted-foreground"
                        )} />
                      </div>

                      {/* Room name and meta */}
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-foreground">
                            {room.name}
                          </h4>
                          {room.isActive && (
                            <span className={cn(
                              "w-2 h-2 rounded-full animate-pulse",
                              `bg-rgy-${color}`
                            )} />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          <span className="font-mono">{room.memberCount}</span> participants
                        </p>
                      </div>
                    </div>

                    {/* Right: Arrow indicator */}
                    <div className={cn(
                      "flex items-center gap-2 transition-all duration-200",
                      isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                    )}>
                      <Badge variant="outline" className={room.intent.badgeClass}>
                        {room.intent.label}
                      </Badge>
                      <ChevronRight className={cn(
                        "h-5 w-5",
                        `text-rgy-${color}`
                      )} />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Empty state */}
          {rooms.length === 0 && (
            <div className="text-center py-16">
              <Sparkles className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="font-display text-lg font-medium mb-2">No rooms found</h3>
              <p className="text-muted-foreground text-sm">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
