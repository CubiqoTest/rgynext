"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, RotateCcw, Hexagon } from "lucide-react";
import { cn } from "@/lib/utils";

type ColorType = "green" | "yellow" | "red" | null;

const COLOR_CONFIG: Record<string, { label: string; badgeClass: string }> = {
  green: {
    label: "Work",
    badgeClass: "bg-rgy-green/15 text-rgy-green border-rgy-green/30 border",
  },
  yellow: {
    label: "Social",
    badgeClass: "bg-rgy-yellow/15 text-rgy-yellow border-rgy-yellow/30 border",
  },
  red: {
    label: "Dating",
    badgeClass: "bg-rgy-red/15 text-rgy-red border-rgy-red/30 border",
  },
};

interface AppHeaderProps {
  currentState: string;
  selectedColor: ColorType;
  onBack: () => void;
  onReset: () => void;
}

export const AppHeader = ({ currentState, selectedColor, onBack, onReset }: AppHeaderProps) => {
  const showBack = currentState !== "color_select";
  const colorConfig = selectedColor ? COLOR_CONFIG[selectedColor] : null;

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center gap-3">
          {showBack ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="h-9 w-9 text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          ) : (
            <div className="h-9 w-9 flex items-center justify-center">
              <Hexagon className="h-6 w-6 text-foreground" />
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <h1 className="font-display text-lg font-semibold tracking-tight">
              CubiQo
            </h1>
            <span className="text-muted-foreground font-mono text-sm">/</span>
            <span className="text-muted-foreground text-sm font-medium">
              RGY Chats
            </span>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          {colorConfig && (
            <Badge className={cn("font-mono text-xs", colorConfig.badgeClass)}>
              {colorConfig.label}
            </Badge>
          )}
          
          {showBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onReset}
              className="h-9 w-9 text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
