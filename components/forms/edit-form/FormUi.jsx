import { Input } from "@/components/ui/input";
import React, { useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Label } from "@/app/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Button } from "@/app/components/ui/button";
import FieldEdit from "./FieldEdit";
import { db } from "@/lib/utils/db";
import { userResponses } from "@/lib/utils/schema";
import moment from "moment";
import { toast } from "sonner";
import { SignInButton, useUser } from "@clerk/nextjs";

function FormUi({
  jsonForm,
  selectedTheme,
  selectedStyle,
  onFieldUpdate,
  deleteField,
  editable = true,
  formId = 0,
  enabledSignIn = false,
}) {
  const [formData, setFormData] = useState();
  let formRef = useRef();
  const { isSignedIn } = useUser();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const hadleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);

    const result = await db.insert(userResponses).values({
      jsonResponse: formData,
      createdAt: moment().format("DD/MM/yyy"),
      formRef: formId,
    });

    if (result) {
      formRef.reset();
      toast.success("Response Submitted Successfully !");
    } else {
      toast.error("Error while saving your form !");
    }
  };

  const handleCheckboxChange = (fieldName, itemName, value) => {
    const list = formData?.[fieldName] ? formData?.[fieldName] : [];

    if (value) {
      list.push({
        label: itemName,
        value: value,
      });
      setFormData({
        ...formData,
        [fieldName]: list,
      });
    } else {
      const result = list.filter((item) => item.label == itemName);
      setFormData({
        ...formData,
        [fieldName]: result,
      });
    }
  };

  return (
    <form
      ref={(e) => (formRef = e)}
      onSubmit={onFormSubmit}
      className="border p-5 md:w-[600px] rounded-lg"
      data-theme={selectedTheme}
      style={{
        boxShadow: selectedStyle?.key == "boxshadow" && "5px 5px 0px black",
        border: selectedStyle?.key == "border" && selectedStyle.value,
      }}
    >
      <h2 className="font-bold text-center pb-2 text-pretty break-words text-2xl md:text-3xl">
        {jsonForm?.formTitle}
      </h2>
      <h2 className="text-sm md:text-base text-muted-foreground text-center">
        {jsonForm?.formHeading}
      </h2>

      {jsonForm?.fields?.map((field, index) => (
        <div key={index} className="flex items-center gap-2">
          {field.fieldType == "select" ? (
            <div className="my-3 w-full">
              <label className="text-xs text-muted-foreground">
                {field.label}
              </label>

              <Select
                required={field?.required}
                onValueChange={(v) => hadleSelectChange(field.fieldName, v)}
              >
                <SelectTrigger className="w-full bg-transparent">
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((item, index) => (
                    <SelectItem
                      key={index}
                      value={item.label ? item.label : item}
                    >
                      {item.label ? item.label : item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : field.fieldType == "radio" ? (
            <div className="w-full my-3">
              <label className="text-xs text-muted-foreground">
                {field.label}
              </label>

              <RadioGroup required={field?.required}>
                {field.options.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={item.label}
                      id={item.label}
                      onClick={() =>
                        hadleSelectChange(field.fieldName, item.label)
                      }
                    />
                    <Label htmlFor={item.label}>{item.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : field.fieldType == "checkbox" ? (
            <div className="my-3 w-full">
              <label className="text-xs text-muted-foreground">
                {field?.label}
              </label>
              {field?.options ? (
                field?.options?.map((item, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Checkbox
                      onCheckedChange={(v) =>
                        handleCheckboxChange(
                          field?.label,
                          item.label ? item.label : item,
                          v
                        )
                      }
                    />
                    <h2>{item.label ? item.label : item}</h2>
                  </div>
                ))
              ) : (
                <div className="flex gap-2 items-center">
                  <Checkbox required={field.required} />
                  <h2>{field.label}</h2>
                </div>
              )}
            </div>
          ) : (
            <div className="my-3 w-full">
              <label className="text-xs text-muted-foreground">
                {field.label}
              </label>
              <Input
                type={field?.type}
                placeholder={field.placeholder}
                name={field.fieldName}
                className="bg-transparent"
                required={field?.required}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
          )}

          {editable && (
            <div>
              <FieldEdit
                defaultValue={field}
                onUpdate={(value) => onFieldUpdate(value, index)}
                deleteField={() => deleteField(index)}
              />
            </div>
          )}
        </div>
      ))}
      {!enabledSignIn ? (
        <button className="btn btn-primary">Submit</button>
      ) : isSignedIn ? (
        <button className="btn btn-primary">Submit</button>
      ) : (
        <Button>
          <SignInButton mode="modal">Sign In before Submit</SignInButton>
        </Button>
      )}
    </form>
  );
}

export default FormUi;
