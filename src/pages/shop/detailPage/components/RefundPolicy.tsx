const RefundPolicy = () => {
  return (
    <section className='h-full max-h-[500px] w-full overflow-auto px-1 py-4 text-gray700'>
      <h2 className='mt-6 mb-2 text-xl font-semibold'>
        <strong>환불이 가능한 조건</strong>
      </h2>
      <ul className='pl-5 mb-4 list-disc'>
        <li className='mb-4'>상품 미배송</li>
        <li className='mb-4'>고객 변심</li>
      </ul>

      <h2 className='mt-6 mb-2 text-xl font-semibold'>
        <strong>교환 및 반품이 가능한 경우</strong>
      </h2>
      <ul className='pl-5 mb-4 list-disc'>
        <li className='mb-4'>상품을 공급 받으신 날로부터 7일 이내</li>
        <li className='mb-4'>공급받으신 상품 및 용역의 내용이 표시·광고 내용과 다르거나 다르게 이행된 경우:</li>
        <li className='mb-4'>공급받은 날로부터 3개월 이내</li>
        <li className='mb-4'>그 사실을 알게 된 날로부터 30일 이내</li>
      </ul>
      <p className='mb-2'>
        <strong>주의:</strong> 가전제품의 경우 포장을 개봉하였거나 포장이 훼손되어 상품가치가 상실된 경우에는
        교환/반품이 불가능합니다.
      </p>
      <p className='mb-4'>
        <strong>참고:</strong> 고객님의 마음이 바뀌어 교환, 반품을 하실 경우 상품반송 비용은 고객님께서 부담하셔야
        합니다. (색상 교환, 사이즈 교환 등 포함)
      </p>

      <h2 className='mt-6 mb-2 text-xl font-semibold'>
        <strong>교환 및 반품이 불가능한 경우</strong>
      </h2>
      <ul className='pl-5 mb-4 list-disc'>
        <li className='mb-4'>
          고객님의 책임 있는 사유로 상품 등이 멸실 또는 훼손된 경우. 단, 상품의 내용을 확인하기 위하여 포장 등을 훼손한
          경우는 제외
        </li>
        <li className='mb-4'>
          포장을 개봉하였거나 포장이 훼손되어 상품가치가 상실된 경우 (예 : 가전제품, 식품, 음반 등, 단 액정화면이 부착된
          노트북, LCD모니터, 디지털 카메라 등의 불량화소에 따른 반품/교환은 제조사 기준에 따릅니다.)
        </li>
        <li className='mb-4'>
          고객님의 사용 또는 일부 소비에 의하여 상품의 가치가 현저히 감소한 경우 단, 화장품등의 경우 시용제품을 제공한
          경우에 한 합니다.
        </li>
        <li>시간의 경과에 의하여 재판매가 곤란할 정도로 상품등의 가치가 현저히 감소한 경우</li>
        <li>복제가 가능한 상품등의 포장을 훼손한 경우 (자세한 내용은 고객센터에 문의를 해주시길 바랍니다)</li>
      </ul>

      <h2 className='mt-6 mb-2 text-xl font-semibold'>
        <strong>환불 요청 절차</strong>
      </h2>
      <ul className="'mb-4 list-disc pl-5">
        <li className='mb-4'>주문 내역에서 요청</li>
      </ul>

      <h2 className='mt-6 mb-2 text-xl font-semibold'>
        <strong>환불 방식</strong>
      </h2>
      <ul className='pl-5 mb-4 list-disc'>
        <li className='mb-4'>결제 방식에 따른 환불</li>
        <li className='mb-4'>
          신용카드로 결제하신 경우는 신용카드 승인을 취소하여 결제 대금이 청구되지 않게 합니다. (단, 신용카드 결제일자에
          맞추어 대금이 청구 될수 있으면 이경우 익월 신용카드 대금청구시 카드사에서 환급처리 됩니다.)
        </li>
      </ul>

      <h2 className='mt-6 mb-2 text-xl font-semibold'>
        <strong>환불 처리 기간</strong>
      </h2>
      <ul className='pl-5 mb-4 list-disc'>
        <li className='mb-4'>3일 이내 처리</li>
      </ul>

      <h2 className='mt-6 mb-2 text-xl font-semibold'>
        <strong>환불 시 발생하는 수수료 설정 여부</strong>
      </h2>
      <ul className='pl-5 mb-4 list-disc'>
        <li className='mb-4'>없음</li>
      </ul>
    </section>
  );
};

export default RefundPolicy;
