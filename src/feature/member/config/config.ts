import { MemberConfigModel } from '../model/model';

const MemberConfig: MemberConfigModel = {
    InputFiledOpts: [
        { field: 'authSeq', label: '권한명', require: true, type: 'select' },
        { field: 'id', label: '아이디', require: true },
        { field: 'pw', label: '비밀번호', require: true, type: 'password' },
        { field: 'name', label: '이름', require: true },
        { field: 'position', label: '직급', require: false },
        { field: 'dept', label: '부서', require: true },
        { field: 'phone', label: '연락처', require: false },
        { field: 'email', label: 'E-Mail', require: false },
        { field: 'state', label: '사용여부', require: false },
    ],
};

export { MemberConfig };
