import {add} from "./store"

test("add",()=>{
   let value = add(1,2);
   expect(value).toBe(5)
})