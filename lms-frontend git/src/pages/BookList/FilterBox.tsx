import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FilterProps } from "@/lib/types";

export const FilterBox = ({
  filter,
  filterName,
  selected,
  setSelected,
}: FilterProps) => {
  const [input, setInput] = useState<string>();
  const [showNElement, setShowNElement] = useState<number>(6);
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
  const showMore = () => {
    if (showNElement === 6) {
      setShowNElement(filter[filterIndex].filterElement.length);
    } else {
      setShowNElement(6);
    }
  };

  return (
    <div className="mt-2 mr-2">
      <p className=" text-md text-gray-600 font-bold ">
        {filterName.toUpperCase()}
      </p>
      <div className="flex flex-row gap-2 mt-4">
        <Input
          type="email"
          placeholder="Type to Search Filter"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className=" bg-violet-50 border-violet-300 text-sm"
        />
      </div>
      <div className="mt-5">
        {filter[filterIndex].filterElement.map((ele, ind) => {
          if (input !== undefined && input.length !== 0) {
            if (ele.toLowerCase().includes(input.toLowerCase())) {
              return (
                <div key={ind} className=" flex space-x-2 mt-3">
                  <Checkbox
                    id={ind.toString()}
                    checked={selected[selectedIndex].state[ind]}
                    onCheckedChange={() => handleChecked(ind)}
                    className=" "
                  />
                  <label
                    htmlFor="terms1"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {ele}
                  </label>
                </div>
              );
            }
          } else {
            if (ind < showNElement) {
              return (
                <div key={ind} className=" flex space-x-2 mt-3">
                  <Checkbox
                    id={ind.toString()}
                    checked={selected[selectedIndex].state[ind]}
                    onCheckedChange={() => handleChecked(ind)}
                    className=" "
                  />
                  <label
                    htmlFor="terms1"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {ele}
                  </label>
                </div>
              );
            }
          }
        })}
        <div className="flex flex-row justify-end">
          <Button variant={"ghost"} onClick={showMore}>
            {showNElement === 6 ? "more" : "less"}
          </Button>
        </div>
      </div>
    </div>
  );
};
