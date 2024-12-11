import axios from 'axios';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { DeliveryCompanyType } from '../type';
const sweetTrackerApiKey = import.meta.env.VITE_SWEETTRACKER_API_KEY;

const DeliveryCompony = () => {
  const [deliveryCompanyList, setDeliveryCompanyList] = useState<DeliveryCompanyType[]>([]);
  const { register, watch, setValue } = useFormContext();
  const deliveryCompany = watch('deliveryCompany');
  const [isShowList, setIsShowList] = useState<boolean>(false);
  const handleCompanyClick = (name: string) => {
    setValue('deliveryCompany', name);
    setIsShowList(false);
  };
  const handleInputFocus = () => {
    setIsShowList(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsShowList(false);
    }, 1000);
  };
  useEffect(() => {
    axios
      .get(`https://info.sweettracker.co.kr/api/v1/companylist?t_key=${sweetTrackerApiKey}`)
      .then((data) => {
        setDeliveryCompanyList(data.data.Company);
      })
      .catch(() => {});
  }, []);
  const filteredDeliveryCompanyList = deliveryCompanyList.filter((company) => company.Name.includes(deliveryCompany));
  return (
    <div className='relative grid grid-cols-1 gap-2 md:grid-cols-2'>
      <label className='mr-2 flex items-center text-sm font-semibold text-neutral-500'>
        <span className='mr-2'>택배사</span>
        <input
          {...register('deliveryCompany')}
          placeholder='배송사 검색'
          type='text'
          className='grow rounded-md border border-neutral-300 p-2'
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        <div
          className={`absolute left-0 top-11 flex max-h-40 w-60 flex-col gap-2 overflow-y-auto rounded-md border border-gray-300 bg-white p-2 ${
            isShowList && deliveryCompany ? 'block' : 'hidden'
          }`}
        >
          {filteredDeliveryCompanyList.length === 0 && <div>검색된 배송사가 없습니다.</div>}
          {filteredDeliveryCompanyList.map((company) => (
            <div onClick={() => handleCompanyClick(company.Name)} key={company.Code}>
              {company.Name}
            </div>
          ))}
        </div>
      </label>
      <label className='flex items-center text-sm font-semibold text-neutral-500'>
        <span className='mr-2'>송장번호</span>
        <input
          {...register('deliveryCode')}
          placeholder='송장번호'
          type='text'
          className='grow justify-items-stretch rounded-md border border-neutral-300 p-2'
        />
      </label>
    </div>
  );
};

export default DeliveryCompony;
