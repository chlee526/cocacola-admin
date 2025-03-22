import {
    AuthBoardDataModel,
    DeleteAuthRequestModel,
    GetAuthRequestModel,
    PutAuthMultiRequestModel,
} from '@/entity/auth';

/**
 * BoardFunction 컴포넌트 props
 */
interface BoardFunctionProps {
    /**
     * 업데이트 API 요청
     * `aside`의 `editItem`에 `param`의 data를 반영 하는 작업 수행
     * @param {PutAuthMultiRequestModel[]} param
     */
    updateEvent: (param: PutAuthMultiRequestModel[]) => void;

    /**
     * 삭제 API 요청
     * `aside`의 `editItem`에 `param`의 data를 반영 하는 작업 수행
     * @param param
     */
    deleteEvent: (param: DeleteAuthRequestModel) => void;

    /**
     * `aside`와 공유하는 `selectedItem` 핸들러
     * 초기화 시 `null` 전달
     * @param selectedItem - 편집할 AuthBoardDataModel 객체
     */
    setSelectedItem: (selectedItem: AuthBoardDataModel | null) => void;

    /**
     * `Board`에서 체크된 항목들의 `seq` 배열 useState
     * `seq` 배열 또는 초기화(`[]`)
     */
    checkedItems: [readonly number[], React.Dispatch<React.SetStateAction<readonly number[]>>];

    /**
     * `aside` 열기
     * `BoardFunction`은 닫기 기능이 불필요해 해당 함수 호출 시 무조건 열기 동작
     */
    openAside: () => void;

    /**
     * `Board` 조회 파라미터
     * `searchParameter` 업데이트
     * 업데이트 시 `Board` 조회 API 호출
     *
     */
    searchParameter: [GetAuthRequestModel, (param: GetAuthRequestModel) => void];
}
export type { BoardFunctionProps };
