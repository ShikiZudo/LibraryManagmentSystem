import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { FilterProps } from "@/lib/types";
import { useState } from "react";

export const MobileFilterBox = ({
  filter,
  filterName,
  selected,
  setSelected,
}: FilterProps) => {
  console.log(filter, filterName, selected, setSelected);

  const [input, setInput] = useState<string>();
  let filterIndex = -1;
  let selectedIndex = -1;
  for (let i = 0; i < selected.length; i++) {
    const element = selected[i];
    if (element.type === filterName) {
      selectedIndex = i;
      break;
    }
  }
  for (let i = 0; i < filter.length; i++) {
    const element = filter[i];
    if (element.type === filterName) {
      filterIndex = i;
      break;
    }
  }

  if (filterIndex === -1 || selectedIndex === -1)
    return <div>filter index not found</div>;

  const handleChecked = (ind: number) => {
    const temp = [...selected];
    temp[selectedIndex] = {
      ...temp[selectedIndex],
      state: [...temp[selectedIndex].state],
    };
    temp[selectedIndex].state[ind] = !temp[selectedIndex].state[ind];
    setSelected(temp);
  };

  return (
    <div className="h-full w-full  flex flex-col justify-start items-start px-4">
      <div className="flex flex-row justify-between w-full">
        <p>{filterName}</p>
      </div>
      <div className="flex flex-row gap-2 my-4">
        <Input
          type="email"
          placeholder="Type to Add Filter"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className=" bg-indigo-50 border-gray-300"
        />
      </div>
      {filter[filterIndex].filterElement.map((ele, ind) => (
        <div key={ind} className=" flex space-x-2 mt-3">
          <Checkbox
            id={ind.toString()}
            checked={selected[selectedIndex].state[ind]}
            onCheckedChange={() => handleChecked(ind)}
          />
          <label
            htmlFor="terms1"
            className="text-md leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {ele}
          </label>
        </div>
      ))}
    </div>
  );
};
