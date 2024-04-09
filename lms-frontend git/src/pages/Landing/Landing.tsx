import { Hero } from "./Hero";
import { CategoryCarosel } from "./CategoryCarosel";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export const Landing = () => {
  const filterCaroselData = [
    {
      type: "fantasy",
      filterList: {
        categoryList: ["fantasy"],
        authorList: [],
        languageList: [],
      },
    },
    {
      type: "mystery",
      filterList: {
        categoryList: ["mystery"],
        authorList: [],
        languageList: [],
      },
    },
    {
      type: "romance",
      filterList: {
        categoryList: ["romance"],
        authorList: [],
        languageList: [],
      },
    },
  ];
  return (
    <MaxWidthWrapper className="max-w-[85rem]">
      <div className="min-h-[92vh] flex flex-col justify-between items-center gap-20 lg:gap-32">
        <Hero />

        <div className="w-[99vw] mb-[-70px] mt-[-50px] bg-violet-200 h-20 text-violet-600 flex justify-around items-center">
          <p className="text-6xl font-black">CATEGORIES</p>
        </div>
        <div className=" lg:mt-[-3.3rem] mb-[-4.5rem] lg:mb-[-7.5rem] rounded-full h-8 bg-violet-50 w-[99vw]"></div>

        <div className=" flex flex-col justify-center items-center gap-14 bg-violet-100 w-[99vw] pb-12 pt-8">
          {filterCaroselData.map((ele, index) => (
            <>
              <CategoryCarosel
                key={index}
                ind={index}
                filterList={ele.filterList}
                filterType={ele.type}
              />
              {filterCaroselData.length - 1 !== index && (
                <div className="p-0 m-0 my-[-3rem] rounded-full w-full h-8 bg-violet-50 max-w-[85rem]"></div>
              )}
            </>
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};
