const ListHeader = ({ HeaderListArray }: { HeaderListArray: { className: string; title: string }[] }) => {
  return (
    <div className='flex items-center justify-stretch justify-items-center self-stretch border-b border-neutral-400 bg-neutral-100 text-center'>
      {HeaderListArray.map((item) => (
        <div key={item.title} className={`${item.className} py-2`}>
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default ListHeader;
