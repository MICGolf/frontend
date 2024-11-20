import facebook from '@/assets/icons/facebook.svg';
import instagram from '@/assets/icons/instagram.svg';
import youtube from '@/assets/icons/youTube.svg';
import logoWhite from '@/assets/imgs/logoWhite.svg';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

type LinkIcon = {
  id?: number;
  name?: string;
  link: string;
  target: '_blank' | '_self' | '_parent' | '_top' | 'origin';
  icon?: string;
};

const linkIcons: LinkIcon[] = [
  {
    id: 1,
    name: '페이스북',
    link: 'https://www.facebook.com/',
    target: '_blank',
    icon: facebook,
  },
  {
    id: 2,
    name: '인스타그램',
    link: 'https://www.instagram.com/',
    target: '_blank',
    icon: instagram,
  },
  {
    id: 3,
    name: '유튜브',
    link: 'https://www.youtube.com/',
    target: '_blank',
    icon: youtube,
  },
];

type FooterLink = {
  id: number;
  title: string;
  links: LinkIcon[];
};

const footerLinks: FooterLink[] = [
  // {
  //   id: 1,
  //   title: 'SNS',
  //   links: linkIcons,
  // },
  {
    id: 2,
    title: '서비스',
    links: [
      { id: 1, name: '문의하기', link: '/', target: 'origin' },
      { id: 2, name: '교환/환불', link: '/', target: 'origin' },
      { id: 3, name: 'FAQ', link: '/', target: 'origin' },
    ],
  },
  {
    id: 3,
    title: '회사',
    links: [
      { id: 1, name: 'PAPATALABS', link: 'https://papatalabs.com/', target: '_blank' },
      { id: 2, name: 'FACTORY', link: 'https://papatalabs.com/', target: '_blank' },
      { id: 3, name: 'MIC GOLF', link: '/', target: 'origin' },
      { id: 4, name: '채용정보', link: '/', target: 'origin' },
    ],
  },
  {
    id: 4,
    title: '이용약관',
    links: [
      { id: 1, name: '이용 약관', link: '/', target: 'origin' },
      { id: 2, name: '개인정보 처리방침', link: '/', target: 'origin' },
      { id: 3, name: '쿠키 정책', link: '/', target: 'origin' },
      { id: 4, name: '판매 약관', link: '/', target: 'origin' },
    ],
  },
];

const MobileFooter = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);

  // 드롭다운 열기 및 닫기 토글
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // 드롭다운 열리면 스크롤을 최하단으로 부드럽게
  useEffect(() => {
    let id: NodeJS.Timeout;
    if (isDropdownOpen && dropdownRef.current) {
      id = setTimeout(() => {
        dropdownRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }, 300);
    }

    return () => {
      clearTimeout(id);
    };
  }, [isDropdownOpen]);

  return (
    <footer
      className={`relative flex min-h-[57px] w-full flex-col items-center justify-between gap-4 bg-primary px-6 py-4 text-gray700`}
      ref={dropdownRef}
    >
      {/* 회색 토글 */}
      {isDropdownOpen && (
        <button onClick={toggleDropdown} className='absolute left-0 right-0 z-50 w-full h-8 -top-8 bg-primary'>
          <div className='absolute top-0 left-0 right-0 flex items-center justify-center w-full h-full'>
            <p className='h-[3px] w-[84px] rounded-full border bg-white'></p>
          </div>
        </button>
      )}
      {/* logo */}
      <div
        className={`flex w-full ${isDropdownOpen ? 'flex-col items-center justify-center gap-6' : 'justify-between'}`}
      >
        <div className={`flex w-full gap-1 ${isDropdownOpen && 'items-center justify-between'}`}>
          <img src={logoWhite} alt='믹골프 로고' className={`${isDropdownOpen ? 'w-[70px]' : 'w-[32px]'} `} />

          <ul className='flex gap-2'>
            {linkIcons.map((link) => (
              <li key={link.id} className='flex h-[25px] w-[25px] items-center justify-center'>
                <a href={link.link} target={link.target} className='flex items-center justify-center w-full h-full'>
                  <img src={link.icon} alt={link.name} className='object-cover' />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* companyInfo */}
        <div className={`flex w-full ${isDropdownOpen ? 'justify-between gap-4' : 'justify-end gap-2'}`}>
          <ul
            className={`flex ${isDropdownOpen ? 'justify-between gap-4' : 'justify-end gap-4'} w-full text-[14px] text-white`}
          >
            {footerLinks.map((el) => (
              <li key={el.id}>
                {isDropdownOpen ? (
                  <h4 className={`${isDropdownOpen && 'mb-2'} whitespace-nowrap font-semibold`}>{el.title}</h4>
                ) : (
                  <h4
                    className={`${isDropdownOpen && 'mb-2'} cursor-pointer whitespace-nowrap font-semibold text-gray200 transition-colors duration-300 hover:text-white`}
                    onClick={toggleDropdown}
                  >
                    {el.title}
                  </h4>
                )}
                {isDropdownOpen && (
                  <ul className='flex flex-col gap-1 whitespace-nowrap'>
                    {el.links.map((link) => {
                      const isOrigin = link.target === 'origin';
                      return (
                        <li
                          key={link.id}
                          className='transition-color text-[12px] text-gray500 duration-300 hover:text-white'
                        >
                          {isOrigin ? (
                            <Link to={link.link}>{link.name}</Link>
                          ) : (
                            <a href={link.link} target={link.target}>
                              {link.name}
                            </a>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* copyrights */}
      {isDropdownOpen && (
        <>
          <p className='w-full whitespace-nowrap border-y border-white py-2 text-center text-[10px] text-white'>
            &copy; MICGOLF 2024
          </p>
          <div className='flex flex-col w-full gap-2'>
            <p className='w-full text-center text-[16px] font-semibold'>고객센터: 070-8827-6220</p>
            <p className='w-full text-center text-[10px]'>
              상호: 믹골프 MICGOLF | 대표: 신강식 | 주소: 서울시 강서구 양천로30길 67 3층 통신판매업신고증:
              2021-서울강서-4168호 | 사업자등록증: 173-27-01298 | 개인정보책임자: 신강식
            </p>
          </div>
        </>
      )}
    </footer>
  );
};

export default MobileFooter;
