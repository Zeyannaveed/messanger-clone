"use client";

import { User } from "@prisma/client";
import axios, { Axios } from "axios";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "../Button";
import { Input } from "../inputs/Input";
import { Model } from "../Model";

interface SettingModalProps {
  isOpen?: boolean;
  onClose: () => void;
  currentUser: User;
}

const SettingModal: React.FC<SettingModalProps> = ({
  isOpen,
  onClose,
  currentUser,
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
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch("image");

  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/settings", data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error("Something went Wrong!"))
      .finally(() => setIsLoading(false));
  };

  return (
    <Model isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Edit your public information.
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                disable={isLoading}
                label="Name"
                id="name"
                errors={errors}
                required
                register={register}
              />
              <div>
                <label
                  className="
                block 
                text-sm
                font-medium
                leading-6
                text-gray-900
                "
                >
                  Photo
                </label>
                <div
                  className="mt-2
                    flex
                    items-center
                    gap-x-3
                    "
                >
                  <Image
                    width={48}
                    height={48}
                    className="rounded-full"
                    src={
                      image || currentUser?.image || "/images/placeholder.jpg"
                    }
                    alt="Avatar"
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset="messenger"
                  >
                    <Button disable={isLoading} seconday type="button">
                      Change
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
          <div
            className="mt-6
            flex
            items-center
            justify-end
            gap-x-6
            "
          >
            <Button disable={isLoading} seconday onclick={onClose}>
              Cancel
            </Button>
            <Button disable={isLoading} type="submit">
              Save
            </Button>
          </div>
        </div>
      </form>
    </Model>
  );
};

export default SettingModal;
