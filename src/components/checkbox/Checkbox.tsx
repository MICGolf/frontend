interface CheckboxProps {
  disabled: boolean;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox = ({ disabled, checked, onChange }: CheckboxProps) => {
  return (
    <label>
      <input
        className='h-4 w-4'
        type='checkbox'
        disabled={disabled}
        checked={checked}
        onChange={({ target: { checked } }) => {
          console.log('checked', checked);
          onChange(checked);
        }}
      />
    </label>
  );
};

export default Checkbox;
