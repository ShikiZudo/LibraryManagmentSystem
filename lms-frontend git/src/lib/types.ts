import { filterOptions } from "./enums";

export type FilterProps = {
  filter: {
    type: filterOptions;
    filterElement: string[];
  }[];

  filterName: filterOptions;
  selected: {
    type: filterOptions;
    state: boolean[];
  }[];
  setSelected: React.Dispatch<
    React.SetStateAction<
      {
        type: filterOptions;
        state: boolean[];
      }[]
    >
  >;
};
