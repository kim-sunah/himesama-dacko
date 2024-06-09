import { Input } from "../v0/input"
import { Label } from "../v0/label"
 
export function InputWithLabel(props : {title : string}) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="number">{props.title}</Label>
      <Input type="number" id="number" />
    </div>
  )
}