import { useCountStore } from "@/store/count";
import { Button } from "../ui/button";

export default function Controller() {
  const { increase, decrease } = useCountStore((store) => store.actions);

  return (
    <div>
      <Button onClick={decrease}>-</Button>
      <Button onClick={increase}>+</Button>
    </div>
  );
}
