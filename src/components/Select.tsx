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
    <SelectContainer>
      <SelectInput value={value} onChange={onChange}>
        {children}
      </SelectInput>
      <ArrowIcon>
        <svg
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          color="black"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 8L12 17L21 8" stroke="black" stroke-width="1.5"></path>
        </svg>
      </ArrowIcon>
    </SelectContainer>
  );
};

const SelectContainer = styled("div")`
  position: relative;
`;

const ArrowIcon = styled("div")`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  z-index: 1;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 12px;
    height: 12px;
  }
`;

const SelectInput = styled("select")`
  width: 150px;

  cursor: pointer;

  box-sizing: border-box;
  border-radius: 8px;
  padding: 8px 12px;

  font-size: 16px;

  &:focus {
    box-sizing: border-box;
    border-radius: 10px;
    outline: none;
  }

  appearance: none;
`;

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
