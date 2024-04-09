import { Button } from "@/components/ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import AdminServices, { CategoryResponse } from "@/services/AdminServices";

const AddCategory = () => {
  const queryClient = useQueryClient();
  const [newCategory, setNewCategory] = React.useState<string>("");
  const [categories, setcategories] = useState<CategoryResponse>([]);
  const {
    data: Categorydata,
    status,
    error,
  } = useQuery({
    queryKey: ["admin", "categories"],
    queryFn: () => AdminServices.getCategory(),
  });

  useEffect(() => {
    if (status === "success") setcategories(Categorydata);
  }, [Categorydata]);

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error")
    return <div>An error has occoured {JSON.stringify(error)}</div>;
  console.log(Categorydata);
  console.log(categories);

  const handleAddCategory = () => {
    try {
      AdminServices.addCategory(newCategory).then((res) => {
        setNewCategory("");
        console.log(res);
        queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
      });
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleDeleteCategory = (id: number) => {
    try {
      AdminServices.deleteCategory(id).then((res) => {
        console.log(res);
        queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
      });
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex jc items-center h-20 text-4xl p-4 py-12">
        <p className="text-gray-500 font-bold">Category</p>
      </div>
      <div>
        <Card className="mr-4 mb-10">
          <CardHeader>
            <CardTitle className="text-gray-500">Add Category</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-row">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter new category name"
              className="mb-2 w-full p-2 mr-4 border rounded"
            />
            <div className="flex justify-center">
              {" "}
              {/* Flex container */}
              <Button
                className="bg-violet-950 w-24 hover:bg-violet-900"
                onClick={handleAddCategory}
              >
                Add
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-row flex-wrap overflow-y-scroll p-2 mb-1 justify-center border rounded-lg">
        {categories.map((category, index) => (
          <Card
            key={index}
            className="w-56 bg-violet-50 h-44 rounded-lg flex flex-col justify-center items-center m-4"
          >
            <CardContent className="flex justify-between h-full flex-col">
              <CardHeader>
                <CardTitle className="text-gray-500 font-bold">
                  {category.category.toUpperCase()}
                </CardTitle>
              </CardHeader>

              <Button
                onClick={() => {
                  handleDeleteCategory(category.id);
                }}
                className="mb-2 bg-violet-950 hover:bg-violet-900"
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AddCategory;
