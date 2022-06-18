
interface IRadioValueTimeItem {
  label: string;
  value: number;
}

export const radioValueTime: IRadioValueTimeItem[] = [
  {
    label: "昨天",
    value: 1
  },
  {
    label: "前15天",
    value: 15
  },
  {
    label: "前30天",
    value: 30
  }
];
