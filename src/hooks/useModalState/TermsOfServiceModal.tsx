type TermsOfServiceModalProps = {
  onClose: () => void;
};

const TermsOfServiceModal = ({ onClose }: TermsOfServiceModalProps) => {
  return (
    <div onClick={onClose} className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='w-full max-w-lg rounded-lg bg-white p-8 shadow-lg'>
        <h2>개인정보 처리방침</h2>
        <p>어쩌고 저쩌고</p>
      </div>
    </div>
  );
};

export default TermsOfServiceModal;
