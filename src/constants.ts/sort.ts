export const sortOptions = [
  { value: "new", label: "최신순" },
  { value: "asc", label: "이름: 오름차순" },
  { value: "desc", label: "이름: 내림차순" },
] as const;

export type SortOption = (typeof sortOptions)[number]["value"];
