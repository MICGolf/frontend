import logoWhite from '@/assets/imgs/logoWhite.svg';
import arrowDropDown from '@/assets/icons/arrowDropDown.svg';
import arrowDropUp from '@/assets/icons/arrowDropUp.svg';
import { useSidebarStorage } from '@/hooks/useSidebarStorage';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const sideBarMenu = [
  {
    title: '상품관리',
    sibTitle: [
      { title: '상품 조회/수정', link: '/admin/product/edit' },
      { title: '상품 등록', link: '/admin/product/add' },
    ],
  },
  {
    title: '판매관리',
    sibTitle: [
      { title: '주문통합검색', link: '/admin/sale/search' },
      { title: '미결제확인', link: '/admin/sale/payment' },
      { title: '발주(주문)확인, 발송관리', link: '/admin/sale/ordering' },
      { title: '배송현황관리', link: '/admin/sale/delivery' },
      { title: '취소관리', link: '/admin/sale/cancel' },
      { title: '반품관리', link: '/admin/sale/return' },
      { title: '교환관리', link: '/admin/sale/exchange' },
    ],
  },
  // {
  //   title: '문의리뷰관리',
  //   sibTitle: [
  //     { title: '문의관리', link: '/admin/inquiry' },
  //     { title: '리뷰관리', link: '/admin/review' },
  //   ],
  // },
  {
    title: '스토어관리',
    sibTitle: [
      // { title: '로고관리', link: '/admin/store/logo' },
      { title: '배너관리', link: '/admin/store/banner' },
      { title: 'Best Item', link: '/admin/store/bestitem' },
      // { title: 'New Arrival', link: '/admin/store/newarrival' },
      { title: 'MD’s Choice', link: '/admin/store/mdschoice' },
    ],
  },
  // {
  //   title: '이벤트관리',
  //   sibTitle: [
  //     { title: '이벤트 조회/수정', link: '/admin/event/edit' },
  //     { title: '이벤트 등록', link: '/admin/event/add' },
  //   ],
  // },
  // {
  //   title: '회원관리',
  //   link: '/admin/user',
  // },
  // {
  //   title: '통계',
  //   link: '/admin/statistics',
  // },
  // {
  //   title: '공지사항',
  //   link: '/admin/notification',
  // },
];
export const SideBar = () => {
  // const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  // const {
  //   handleSubmit,
  //   register,
  //   formState: { errors },
  // } = useForm();
  // const handlerSubmit = (data: any) => {
  //   console.log(data);
  //   navigate('/admin/sale/search');
  // };
  const { selectMenu, toggleMenu } = useSidebarStorage();
  const location = useLocation();

  return (
    <aside className='h-full py-8 w-72 bg-primary'>
      <div className='flex content-center justify-center mb-11' onClick={() => navigate('/admin')}>
        <img src={logoWhite} alt='믹골프 로고' />
      </div>
      <div>
        <p className='text-center'>믹골프</p>
        <p className='text-center'>계정 : ddd </p>
      </div>
      {/* FIX
       <form onSubmit={handleSubmit(handlerSubmit)} className='px-8'>
        <select
          {...register('productStatus', { required: '검색옵션을 선택해주세요' })}
          className={`mt-4 w-full appearance-none rounded-lg border border-neutral-300 bg-[length:36px_36px] bg-[center_right_1rem] bg-no-repeat px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300`}
          style={{
            backgroundImage: `url(${isOpen ? arrowDropUp : arrowDropDown})`,
          }}
          onClick={(prev) => setIsOpen(!prev)}
          defaultValue=''
        >
          <option value='' disabled>
            판매정보 검색
          </option>
          <option value='recipientName'>수취인명</option>
          <option value='recipientPhone'>수취인 연락처</option>
          <option value='trackingNumber'>송장번호</option>
          <option value='productCode'>상품코드</option>
        </select>
        {errors && <p className='ml-1 text-sm text-red-700'>{errors.productStatus?.message as string}</p>}
        <input
          type='text'
          placeholder='입력 후 엔터로 검색'
          {...register('searchText_input')}
          className='w-full px-3 py-2 mt-4 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300'
        />
      </form> */}
      <ul className='py-3 mt-8 bg-neutral-800'>
        {sideBarMenu.map((menuItem, index) => {
          const isLastItem = index === sideBarMenu.length - 1;
          return (
            <li
              key={menuItem.title}
              className={`mx-2 cursor-pointer px-2 py-3 ${isLastItem ? '' : 'border-b-2 border-neutral-700'}`}
            >
              {menuItem.sibTitle ? (
                <Link
                  to={menuItem.sibTitle[0].link}
                  className='flex justify-between'
                  onClick={(e) => {
                    if (menuItem.sibTitle) {
                      e.preventDefault();
                      toggleMenu(index);
                    }
                  }}
                >
                  {menuItem.title}
                  {menuItem.sibTitle && (
                    <img src={selectMenu === index ? arrowDropUp : arrowDropDown} alt='메뉴 화살표' />
                  )}
                </Link>
              ) : (
                <div className='flex justify-between' onClick={() => menuItem.sibTitle && toggleMenu(index)}>
                  {menuItem.title}
                  {menuItem.sibTitle && (
                    <img src={selectMenu === index ? arrowDropUp : arrowDropDown} alt='메뉴 화살표' />
                  )}
                </div>
              )}
              {menuItem.sibTitle && (
                <ul
                  className={`mt-1 transform overflow-hidden text-neutral-300 transition-all duration-300 ${
                    selectMenu === index ? 'max-h-40 translate-y-0 opacity-100' : 'max-h-0 -translate-y-4 opacity-0'
                  }`}
                >
                  {menuItem.sibTitle.map((item, subIndex) => {
                    const isSubActive = item.link === location.pathname;

                    return (
                      <li
                        key={`${index}-${subIndex}`}
                        className={`block px-1 py-2 ${isSubActive ? 'font-bold text-blue-400' : ''}`}
                      >
                        <Link to={item.link} className='block'>
                          {item.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};
