import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectGroup,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) {
  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );

        break;
      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );

        break;
      case "textarea":
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );

      break;
      case "multiselect":
        element = (
          <div>
            {getControlItem.options && getControlItem.options.length > 0
              ? getControlItem.options.map((optionItem) => (
                  <div key={optionItem.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={optionItem.id}
                      name={getControlItem.name}
                      value={optionItem.id}
                      checked={formData[getControlItem.name]?.includes(optionItem.id)}
                      onChange={(event) => {
                        const selectedValues = formData[getControlItem.name] || [];
                        if (event.target.checked) {
                          setFormData({
                            ...formData,
                            [getControlItem.name]: [...selectedValues, optionItem.id],
                          });
                        } else {
                          setFormData({
                            ...formData,
                            [getControlItem.name]: selectedValues.filter(
                              (selectedValue) => selectedValue !== optionItem.id
                            ),
                          });
                        }
                      }}
                    />
                    <label htmlFor={optionItem.id} className="ml-2">
                      {optionItem.label}
                    </label>
                  </div>
                ))
              : null}
          </div>
        );
        break;
      
      

      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb-1">{controlItem.label}</Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button
  disabled={isBtnDisabled}
  type="submit"
  className="mt-2 w-full border-2 border-white text-white"
>
  {buttonText || "Submit"}
</Button>

    </form>
  );
}

export default CommonForm;
