import TextField from '@mui/material/TextField';

export type DelayInputProps = {
  value: number,
  onChange: (value: number) => void
};

export default function DelayInput({ value, onChange }: DelayInputProps) {
  return (
    <TextField
      inputProps={{
        step: 0.1,
        min: 0
      }}
      label='遅延（秒）'
      onChange={({ currentTarget: { value } }) => onChange(Number(value))}
      type='number'
      value={value}
    />
  );
}
