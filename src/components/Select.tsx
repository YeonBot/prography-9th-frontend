import styled from "styled-components";

interface SelectProps {
  value: number | string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}

export const Select = function Select({
  value,
  onChange,
  children,
}: SelectProps) {
  return (
    <SelectInput value={value} onChange={onChange}>
      {children}
    </SelectInput>
  );
};

const SelectInput = styled("select")``;

export const Option = function Option({
  value,
  children,
}: {
  value: string | number;
  children: React.ReactNode;
}) {
  return <SelectOption value={value}>{children}</SelectOption>;
};

const SelectOption = styled("option")``;
