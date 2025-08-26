import axios from 'axios';

// 공통 에러 처리 함수
export const handleApiError = (err: unknown) => {
  // 'any'를 'unknown'으로 변경
  if (axios.isAxiosError(err)) {
    // Axios 에러인지 확인하는 조건 추가
    const { response } = err;
    if (response) {
      const { status } = response;
      switch (status) {
        case 400:
          throw new Error('잘못된 요청입니다. 요청 내용을 확인하세요.');
        case 401:
        case 403:
          throw new Error('로그인 후 이용가능해요.');
        case 404:
          throw new Error('해당하는 상품이 없어요.');
        case 500:
          throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도하세요.');
        default:
          throw new Error(response.data?.error || '알 수 없는 오류가 발생했습니다.');
      }
    } else if (err.request) {
      throw new Error('서버와 연결할 수 없습니다. 인터넷 연결을 확인하세요.');
    } else if (typeof err === 'object' && err !== null && 'message' in err) {
      // 오류 메시지 처리 개선
      throw new Error((err as any).message);
    } else {
      throw new Error('요청 중 오류가 발생했습니다.');
    }
  } else {
    throw err;
  }
};
