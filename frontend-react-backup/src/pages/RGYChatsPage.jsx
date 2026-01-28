import { useState, useCallback } from "react";
import { ColorSelector } from "@/components/rgy/ColorSelector";
import { IntentKeywordList } from "@/components/rgy/IntentKeywordList";
import { RoomView } from "@/components/rgy/RoomView";
import { AppHeader } from "@/components/rgy/AppHeader";
import { cn } from "@/lib/utils";

// Application states
const STATES = {
  COLOR_SELECT: "color_select",
  INTENT_LIST: "intent_list", 
  ROOM_VIEW: "room_view"
};

export const RGYChatsPage = () => {
  const [currentState, setCurrentState] = useState(STATES.COLOR_SELECT);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Handle color selection - Step 1 → Step 2
  const handleColorSelect = useCallback((color) => {
    setSelectedColor(color);
    setCurrentState(STATES.INTENT_LIST);
  }, []);

  // Handle room selection - Step 2 → Step 3
  const handleRoomSelect = useCallback((room) => {
    setSelectedRoom(room);
    setCurrentState(STATES.ROOM_VIEW);
  }, []);

  // Navigate back
  const handleBack = useCallback(() => {
    if (currentState === STATES.ROOM_VIEW) {
      setSelectedRoom(null);
      setCurrentState(STATES.INTENT_LIST);
    } else if (currentState === STATES.INTENT_LIST) {
      setSelectedColor(null);
      setCurrentState(STATES.COLOR_SELECT);
    }
  }, [currentState]);

  // Reset to start
  const handleReset = useCallback(() => {
    setSelectedColor(null);
    setSelectedRoom(null);
    setCurrentState(STATES.COLOR_SELECT);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader 
        currentState={currentState}
        selectedColor={selectedColor}
        onBack={handleBack}
        onReset={handleReset}
      />
      
      <main className="flex-1 flex flex-col">
        {/* Step 1: Color Selection */}
        <div className={cn(
          "transition-opacity duration-300",
          currentState === STATES.COLOR_SELECT ? "opacity-100" : "opacity-0 absolute pointer-events-none"
        )}>
          {currentState === STATES.COLOR_SELECT && (
            <ColorSelector onColorSelect={handleColorSelect} />
          )}
        </div>

        {/* Step 2: Intent + Keyword List */}
        <div className={cn(
          "transition-opacity duration-300 flex-1",
          currentState === STATES.INTENT_LIST ? "opacity-100" : "opacity-0 absolute pointer-events-none"
        )}>
          {currentState === STATES.INTENT_LIST && (
            <IntentKeywordList 
              color={selectedColor} 
              onRoomSelect={handleRoomSelect}
            />
          )}
        </div>

        {/* Step 3: Room View with Chat */}
        <div className={cn(
          "transition-opacity duration-300 flex-1 flex flex-col",
          currentState === STATES.ROOM_VIEW ? "opacity-100" : "opacity-0 absolute pointer-events-none"
        )}>
          {currentState === STATES.ROOM_VIEW && (
            <RoomView 
              room={selectedRoom}
              color={selectedColor}
              onBack={handleBack}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default RGYChatsPage;
