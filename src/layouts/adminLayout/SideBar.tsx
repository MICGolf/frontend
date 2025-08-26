import logoWhite from '@/assets/imgs/logoWhite.svg';
import arrowDropDown from '@/assets/icons/arrowDropDown.svg';
import arrowDropUp from '@/assets/icons/arrowDropUp.svg';
import { useSidebarStorage } from '@/hooks/useSidebarStorage';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const sideBarMenu = [
  {
    title: '상품관리',
    sibTitle: [
      { title: '상품 조회', link: '/admin/product/search' },
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
    title: '스토어관리',
    sibTitle: [
      { title: '배너관리', link: '/admin/store/banner' },
      { title: 'Best Item', link: '/admin/store/bestitem' },
      { title: 'Promotion', link: '/admin/store/promotion' },
      { title: 'MD’s Choice', link: '/admin/store/mdschoice' },
    ],
  },
];
export const SideBar = () => {
  const navigate = useNavigate();

  const { selectMenu, toggleMenu } = useSidebarStorage();
  const location = useLocation();

  return (
    <aside className='h-full w-72 bg-primary py-8'>
      <div className='mb-11 flex content-center justify-center' onClick={() => navigate('/admin')}>
        <img src={logoWhite} alt='믹골프 로고' />
      </div>
      <ul className='mt-8 bg-neutral-800 py-3'>
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
