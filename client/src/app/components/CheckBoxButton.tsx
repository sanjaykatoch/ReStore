import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useState } from "react";

interface Props {
  items: string[];
  checked?: string[];
  onChange: (items: string[]) => void;
}
const CheckBoxButton = ({ items, checked, onChange }: Props) => {
  const [checkedItems, setCheckedItems] = useState(checked || []);
  function handledChecked(value: string) {
    const currentIndex = checkedItems.findIndex((x) => x == value);
    let newChecked: string[] = [];
    if (currentIndex === -1) newChecked = [...checkedItems, value];
    else newChecked = checkedItems.filter((item) => item != value);
    setCheckedItems(newChecked);
    onChange(newChecked);
  }
  return (
    <FormGroup>
      {items?.map((item: any) => (
        <FormControlLabel
          control={<Checkbox checked={checkedItems?.indexOf(item) != -1} />}
          onChange={() => handledChecked(item)}
          label={item}
          key={item}
        />
      ))}
    </FormGroup>
  );
};

export default CheckBoxButton;
