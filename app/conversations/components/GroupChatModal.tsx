"use client";

import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/inputs/Input";
import { Select } from "@/app/components/inputs/Select";
import { Model } from "@/app/components/Model";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface GroupChatModalProps {
  isOpen?: boolean;
  OnClose: () => void;
  users: User[];
}

export const GroupChatModal: React.FC<GroupChatModalProps> = ({
  isOpen,
  OnClose,
  users,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/conversations", {
        ...data,
        isGroup: true,
      })
      .then(() => {
        router.refresh();
        OnClose();
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => setIsLoading(true));
  };

  return (
    <Model isOpen={isOpen} onClose={OnClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              {" "}
              Create a group chat
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Create a chat of more than 2 people.
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                register={register}
                label="Name"
                id="name"
                disable={isLoading}
                required
                errors={errors}
              />
              <Select
                disable={isLoading}
                label="Members"
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                onChange={(value) =>
                  setValue("members", value, {
                    shouldValidate: true,
                  })
                }
                value={members}
              />
            </div>
          </div>
        </div>
        <div
          className="
        mt-6 flex
        items-center
        justify-end
        gap-x-6

        "
        >
          <Button disable={isLoading} onclick={OnClose} type="button" seconday>
            Cancel
          </Button>
          <Button disable={isLoading} type="submit">
            Create
          </Button>
        </div>
      </form>
    </Model>
  );
};
