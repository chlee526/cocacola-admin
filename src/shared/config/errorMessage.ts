import { PATH_KEY } from './pathKey';

type PathKey = (typeof PATH_KEY)[keyof typeof PATH_KEY];

interface ErrorMessage {
    title: string;
    txt: string;
    btn: string;
    link: PathKey;
}

interface ErrorMessages {
    '400': ErrorMessage;
    '401': ErrorMessage;
    '403': ErrorMessage;
    '404': ErrorMessage;
    '500': ErrorMessage;
}

const ERROR_MESSAGES: ErrorMessages = {
    '400': {
        title: '해당 멤버를 찾을 수 없습니다.',
        txt: '아래 버튼을 클릭하시면 로그인 페이지로 이동합니다.',
        btn: '로그인',
        link: PATH_KEY.LOGIN,
    },
    '401': {
        title: '인증 세션이 만료되어 로그아웃되었습니다.',
        txt: '아래 버튼을 클릭하시면 로그인 페이지로 이동합니다.',
        btn: '로그인',
        link: PATH_KEY.LOGIN,
    },
    '403': {
        title: '접근 권한이 없습니다.',
        txt: '아래 버튼을 클릭하시면 메인 페이지로 이동합니다.',
        btn: '메인페이지로 이동',
        link: PATH_KEY.ROOT,
    },
    '404': {
        title: '페이지를 찾을 수 없습니다.',
        txt: '아래 버튼을 클릭하면 메인페이지로 이동합니다.',
        btn: '메인페이지로 이동',
        link: PATH_KEY.ROOT,
    },
    '500': {
        title: '일시적인 서버 에러 입니다.',
        txt: '문제가 지속될 경우, 관리자에게 문의하세요. <br>아래 버튼을 클릭하시면 로그인 페이지로 이동합니다.',
        btn: '로그인',
        link: PATH_KEY.LOGIN,
    },
} as const;

export { ERROR_MESSAGES };
