interface IHandlerProps {
  handler: () => string;
}

const Test = ({ handler }: IHandlerProps) => {
  return (
    <button type="submit" onClick={handler}>
      Test
    </button>
  );
};

export default Test;
