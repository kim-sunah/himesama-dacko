import { Input } from "../v0/input"
import { Label } from "../v0/label"
 
export function InputWithoutLabel() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  )
}