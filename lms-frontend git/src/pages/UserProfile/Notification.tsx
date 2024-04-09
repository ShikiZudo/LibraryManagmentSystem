import { Button } from "@/components/ui/button";
import { useAuthorization } from "@/context/AuthorizationProvider";
import { cn } from "@/lib/utils";
import UserServices from "@/services/UserServices";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Mail, MailOpen } from "lucide-react";
import React, { useEffect } from "react";

export const Notification = () => {
  const queryClient = useQueryClient();
  const user = useAuthorization().getAuthData;
  const notification = user ? user.notification : [];
  console.log(notification);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center my-16">
        <p className="text-4xl font-bold text-gray-700">Notification</p>
        <Button
          variant={"link"}
          onClick={() => {
            UserServices.allNotificationSeen(user.id);
            queryClient.invalidateQueries({ queryKey: ["details"] });
          }}
        >
          Mark All as seen
        </Button>
      </div>
      <div className="flex flex-col">
        {notification.map((ele, ind) => (
          <div
            className={cn(
              "flex flex-row justify-between h-20 items-center rounded-md hover:bg-violet-50 my-1",
              {
                "bg-gray-200": ele.seen === true,
              }
            )}
          >
            <div className="flex flex-row my-6 justify-between w-[80%] pr-10">
              <div className="flex flex-row px-2">
                {ele.seen === true ? <MailOpen /> : <Mail />}
                <p className="px-6">{ele.message}</p>
              </div>
              <p>{ele.type}</p>
            </div>
            <Button
              variant={"ghost"}
              disabled={ele.seen === true}
              className="bg-white hover:bg-violet-100 mr-4"
              onClick={() => {
                UserServices.oneNotificationSeen(ele.id);
                queryClient.invalidateQueries({ queryKey: ["details"] });
              }}
            >
              Mark as seen
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
