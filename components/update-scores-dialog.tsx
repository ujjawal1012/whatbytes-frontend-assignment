"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface UpdateScoresDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  testData: any;
  onUpdate: (newData: any) => void;
}

export function UpdateScoresDialog({
  open,
  onOpenChange,
  testData,
  onUpdate,
}: UpdateScoresDialogProps) {
  const [formData, setFormData] = useState({
    correctAnswers: testData.correctAnswers,
    percentile: testData.percentile,
    rank: testData.rank,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setFormData({
      correctAnswers: testData.correctAnswers,
      percentile: testData.percentile,
      rank: testData.rank,
    });
  }, [testData]);

  const validateInput = (name: string, value: number) => {
    if (value < 0) return "Value cannot be negative.";
    if (name === "correctAnswers" && (value > 15 || value < 0))
      return "Must be between 0-15.";
    if (name === "percentile" && (value > 100 || value < 0))
      return "Must be between 0-100.";
    return "";
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    if (value === "") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: "",
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Value cannot be empty.",
      }));
      return;
    }

    const numValue = Number.parseInt(value, 10);
    const errorMsg = validateInput(name, numValue);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg,
    }));

    setFormData((prevData) => ({
      ...prevData,
      [name]: numValue,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    Object.keys(formData).forEach((key) => {
      const errorMsg = validateInput(
        key,
        formData[key as keyof typeof formData]
      );
      if (errorMsg) newErrors[key] = errorMsg;
    });

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) return;

    onUpdate(formData);
    onOpenChange(false);
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/55  z-40"></div> // Lighter Blur
      )}
      <Modal
        hideCloseButton
        isOpen={open}
        onClose={() => onOpenChange(false)}
        className="z-50"
        placement="center"
      >
        <ModalContent className="bg-white p-6 rounded-lg w-[650px] shadow-xl">
          <ModalHeader className="text-[28px] font-bold flex justify-between items-center">
            Update Scores
            <Image
              width={32}
              height={32}
              src="https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg"
              alt="HTML5"
              className="w-8"
            />
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: "Rank", name: "rank", value: formData.rank },
                {
                  label: "Percentile",
                  name: "percentile",
                  value: formData.percentile,
                },
                {
                  label: "Current Score (out of 15)",
                  name: "correctAnswers",
                  value: formData.correctAnswers,
                },
              ].map((field, index) => (
                <div key={field.name} className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-6 h-6 bg-[#132379] text-white rounded-full text-sm font-bold">
                      {index + 1}
                    </div>

                    <label className="font-semibold flex-1">
                      Update your{" "}
                      <span className="font-bold">{field.label}</span>
                    </label>

                    <Input
                      name={field.name}
                      type="number"
                      value={field.value}
                      onChange={handleInputChange}
                      className={`w-48 border-2 rounded-lg px-2 ${
                        errors[field.name]
                          ? "border-red-500"
                          : "border-[#a3bef0]"
                      }`}
                      classNames={{
                        inputWrapper: "!bg-transparent !p-0 !shadow-none", // Removes unwanted styles
                      }}
                    />
                  </div>

                  {/* Error Message */}
                  {errors[field.name] && (
                    <span className="text-red-500 text-xs pr-10 text-end">
                      {errors[field.name]}
                    </span>
                  )}
                </div>
              ))}
            </form>
          </ModalBody>
          <ModalFooter className="flex justify-end space-x-4">
            <Button
              className="text-[#132379] font-bold text-sm py-3 border-2 px-3 !min-h-fit rounded-md cursor-pointer"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex cursor-pointer text-white !min-h-fit items-center space-x-4 bg-[#132379] py-3 border-[3px] border-black text-sm rounded-md px-4 font-bold"
              onClick={handleSubmit}
              disabled={Object.values(errors).some((error) => error !== "")}
            >
              Save
              <Image
                width={20}
                height={20}
                src="https://img.icons8.com/?size=512w&id=355&format=png&color=FFFFFF"
                alt="HTML5"
              />
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
