import { AnimatePresence, motion } from 'framer-motion';

type TermsOfServiceModalProps = {
  onClose: () => void;
  isOpen: boolean;
};

const TermsOfServiceModal = ({ isOpen, onClose }: TermsOfServiceModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className='fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: {
                type: 'spring',
                damping: 20,
                stiffness: 300,
                duration: 0.3,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              y: 20,
              transition: {
                type: 'spring',
                damping: 18,
                stiffness: 300,
                duration: 0.3,
              },
            }}
            onClick={(e) => e.stopPropagation()}
            className='w-full max-w-lg bg-white p-8 shadow-lg'
          >
            <section className='h-full max-h-[500px] w-full overflow-auto px-1 py-4 text-gray700'>
              <h2 className='mb-6 text-xl font-semibold'>
                <strong>믹골프 구매이용약관</strong>
              </h2>
              <ul className='mb-4 list-decimal pl-5'>
                <li className='mb-4'>
                  이 약관은 Hilight Brands(전자상거래 사업자)(이)가 운영하는 말본골프 | malbon golf(이하 "몰"이라
                  한다)에서 제공하는 인터넷 관련 서비스(이하 "서비스"라 한다)를 이용함에 있어 사이버 몰과 이용자의
                  권리·의무 및 책임사항을 규정함을 목적으로 합니다.※「PC통신, 무선 등을 이용하는 전자상거래에 대해서도
                  그 성질에 반하지 않는 한 이 약관을 준용합니다」
                </li>
                <li className='mb-4'>
                  제2조(정의)① "몰" 이란 Hilight Brands(이)가 재화 또는 용역(이하 "재화등"이라 함)을 이용자에게 제공하기
                  위하여 컴퓨터등 정보통신설비를 이용하여 재화등을 거래할 수 있도록 설정한 가상의 영업장을 말하며,
                  아울러 사이버몰을 운영하는 사업자의 의미로도 사용합니다.② "이용자"란 "몰"에 접속하여 이 약관에 따라
                  "몰"이 제공하는 서비스를 받는 회원 및 비회원을 말합니다.③ '회원'이라 함은 "몰"
                </li>
                <li className='mb-4'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.
                  Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae
                  mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum
                  eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus
                  at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis
                  arcu eros, eget tempus orci facilisis id.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  et massa mi. Aliquam in hendrerit urna.
                </li>
                <li className='mb-4'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.
                  Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae
                  mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum
                  eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus
                  at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis
                  arcu eros, eget tempus orci facilisis id.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  et massa mi. Aliquam in hendrerit urna.
                </li>
                <li className='mb-4'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.
                  Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae
                  mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum
                  eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus
                  at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis
                  arcu eros, eget tempus orci facilisis id.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  et massa mi. Aliquam in hendrerit urna.
                </li>
                <li className='mb-4'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.
                  Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae
                  mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum
                  eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus
                  at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis
                  arcu eros, eget tempus orci facilisis id.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  et massa mi. Aliquam in hendrerit urna.
                </li>
              </ul>
            </section>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TermsOfServiceModal;
