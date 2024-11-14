export const Toggle = ({ isEnabled, onToggle }: { isEnabled: boolean; onToggle: () => void }) => {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full ${isEnabled ? 'bg-accent' : 'bg-gray-200'} transition-colors duration-200`}
    >
      <span className='sr-only'>토글 버튼</span>
      <span
        className={`inline-block h-6 w-6 transform rounded-full border-2 border-neutral-50 bg-white transition-transform duration-200 ease-in-out ${isEnabled ? 'translate-x-6' : 'translate-x-0'} `}
      />
    </button>
  );
};

export default Toggle;
