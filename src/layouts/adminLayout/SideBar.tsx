import logoWhite from '@/assets/imgs/logoWhite.svg';
import arrowDropDown from '@/assets/icons/arrowDropDown.svg';
import arrowDropUp from '@/assets/icons/arrowDropUp.svg';
import { Input } from '@/components/Input';
import { useSidebarStorage } from '@/hooks/useSidebarStorage';
import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';

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
  {
    title: '문의리뷰관리',
    sibTitle: [
      { title: '문의관리', link: '/admin/inquiry' },
      { title: '리뷰관리', link: '/admin/review' },
    ],
  },
  {
    title: '스토어관리',
    sibTitle: [
      { title: '로고관리', link: '/admin/store/logo' },
      { title: '배너관리', link: '/admin/store/banner' },
      { title: 'Best Item', link: '/admin/store/bestitem' },
      { title: 'New Arrival', link: '/admin/store/newarrival' },
      { title: 'MD’s Choice', link: '/admin/store/mdschoice' },
    ],
  },
  {
    title: '이벤트관리',
    sibTitle: [
      { title: '이벤트 조회/수정', link: '/admin/event/edit' },
      { title: '이벤트 등록', link: '/admin/event/add' },
    ],
  },
  {
    title: '회원관리',
    link: '/admin/user',
  },
  {
    title: '통계',
    link: '/admin/statistics',
  },
  {
    title: '공지사항',
    link: '/admin/notification',
  },
];
// 68번 타입 정해야함
export const SideBar = () => {
  const { handleSubmit, register } = useForm();
  const handlerSubmit = (data: any) => console.log(data);
  const { selectMenu, toggleMenu } = useSidebarStorage();
  const location = useLocation();
  return (
    <aside className='min-w-72 bg-primary py-8'>
      <div className='mb-11 flex content-center justify-center'>
        <img src={logoWhite} alt='믹골프 로고' />
      </div>
      <div>
        <p className='text-center'>믹골프</p>
        <p className='text-center'>계정 : ddd </p>
      </div>
      <form onSubmit={handleSubmit(handlerSubmit)} className='px-8'>
        <Input
          type='text'
          defaultValue=''
          placeholder='수취인 명'
          formRegister={register('content', {
            required: '필수 입력 항목입니다',
          })}
        />
        <Input type='text' defaultValue='' placeholder='입력 후 검색' formRegister={register('content')} />
      </form>
      <ul className='mt-4 bg-neutral-800 py-3'>
        {sideBarMenu.map((menuItem, index) => {
          const isLastItem = index === sideBarMenu.length - 1;
          return (
            <li
              key={menuItem.title}
              className={`mx-2 cursor-pointer px-2 py-3 ${isLastItem ? '' : 'border-b-2 border-neutral-700'}`}
            >
              {menuItem.link ? (
                <Link
                  to={menuItem.link}
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
