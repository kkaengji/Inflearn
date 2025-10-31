import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import "./App.css";
import { cn } from "./lib/utils";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function App() {
  const isActive = true;
  return (
    <div className="p-5">
      <Carousel className="mx-10">
        <CarouselContent>
          <CarouselItem className="basis-1/3">1</CarouselItem>
          <CarouselItem>2</CarouselItem>
          <CarouselItem>3</CarouselItem>
          <CarouselItem>4</CarouselItem>
          <CarouselItem>5</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <Toaster />
      <Textarea />
      <Input placeholder="입력..." />

      <Button
        onClick={() => {
          toast("토스트 메시지", { position: "top-center" });
        }}
      >
        버튼!
      </Button>
      <Button variant={"destructive"}>버튼</Button>
      <Button variant={"ghost"}>버튼</Button>
      <Button variant={"link"}>버튼</Button>
      <Button variant={"outline"}>버튼</Button>
      <Button variant={"secondary"}>버튼</Button>

      <div
        className={cn(
          "w-10 text-sm",
          isActive ? "text-green-500" : "text-red-500",
        )}
      >
        isActive
      </div>
      <div className="bg-primary">Primary</div>
      <div className="bg-muted">Muted</div>
      <div className="bg-destructive">Destructive</div>
    </div>
  );
}

export default App;
