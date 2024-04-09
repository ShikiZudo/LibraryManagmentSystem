import { useAuthorization } from "@/context/AuthorizationProvider";
import { useEffect, useState } from "react";
import UserServices from "@/services/UserServices";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

type formDataProps = {
  firstName: string;
  lastName: string;
  contactNo: string;
  address: string;
  gender: string;
};

enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

const UpdateProfile = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const userdata = useAuthorization().getAuthData;

  const [formData, setFormData] = useState<formDataProps>({} as formDataProps);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await UserServices.updateUser({
      id: userdata.id,
      requestData: formData,
    }).then((res) => {
      toast({
        title: "Profile Updated!.",
        description: "Your Profile have been Updated Successfully.",
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
      queryClient.invalidateQueries({ queryKey: ["details"] });
    });
  };
  useEffect(() => {
    setFormData({
      firstName: userdata?.firstName,
      lastName: userdata?.lastName,
      contactNo: userdata?.contactNo,
      address: userdata?.address,
      gender: userdata?.gender,
    });
  }, [userdata]);
  // console.log(userdata);
  console.log(formData);

  return (
    <div className="w-full px-6">
      <div className=" my-14 flex justify-center items-center text-3xl font-semibold text-gray-600">
        Update Profile
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2"
      >
        <div>
          <label className="block mb-2 text-sm text-gray-600">First Name</label>
          <input
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            type="text"
            placeholder="John"
            className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm text-gray-600 ">Last name</label>
          <input
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            type="text"
            placeholder="Snow"
            className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm text-gray-600">
            Phone number
          </label>
          <input
            value={formData.contactNo}
            onChange={(e) =>
              setFormData({ ...formData, contactNo: e.target.value })
            }
            type="text"
            placeholder="XXX-XX-XXXX-XXX"
            className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm text-gray-600">
            Email address
          </label>
          <input
            value={userdata?.email}
            disabled={true}
            type="email"
            placeholder="johnsnow@example.com"
            className="block w-full px-5 py-3 mt-2 text-gray-500 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-400focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div className="mt-4 md:mt-0">
          <label className="text-gray-500">Select Gender</label>
          <div className="mt-3 py-1 text-gray-600 rounded-lg md:w-auto">
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={""}
              name="radio-buttons-group"
              style={{ display: "flex", flexDirection: "row" }}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            >
              <FormControlLabel
                value={Gender.FEMALE}
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value={Gender.MALE}
                control={<Radio />}
                label="Male"
              />
              <FormControlLabel
                value={Gender.OTHER}
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </div>
        </div>
        <div>
          <label className="block mb-2 text-sm text-gray-600">Address</label>
          <textarea
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            placeholder="johnsnow@example.com"
            className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>

        <Button
          type={"submit"}
          className=" col-span-2 mx-auto w-[40%] h-12 bg-violet-950 hover:bg-violet-800"
        >
          <span>Update </span>
        </Button>
      </form>
    </div>
  );
};

export default UpdateProfile;
