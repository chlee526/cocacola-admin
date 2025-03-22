import {
    DeleteReplaceRequestModel,
    GetReplaceRequestModel,
    ReplaceBoardDataModel,
    UpdateReplaceRequestModel,
} from '@/entity/replace';

/**
 * BoardFunction 컴포넌트 props
 */
interface BoardFunctionProps {
    /**
     * 업데이트 API 요청
     * `aside`의 `editItem`에 `param`의 data를 반영 하는 작업 수행
     * API 요청 성공여부를 `Promise<boolean>`로 반환
     * @param {UpdateReplaceRequestModel[]} param
     * @returns 업데이트 성공 여부를 나타내는 boolean 값을 반환하는 Promise
     */
    updateEvent: (param: UpdateReplaceRequestModel[]) => Promise<boolean>;

    /**
     * 삭제 API 요청
     * `aside`의 `editItem`에 `param`의 data를 반영 하는 작업 수행
     * API 요청 성공여부를 `Promise<boolean>`로 반환
     * @param param
     * @returns 삭제 성공 여부를 나타내는 boolean 값을 반환하는 Promise
     */
    deleteEvent: (param: DeleteReplaceRequestModel) => Promise<boolean>;

    /**
     * `aside`와 공유하는 `selectedItem` 핸들러
     * 초기화 시 `null` 전달
     * @param selectedItem - 편집할 ReplaceBoardDataModel 객체
     */
    setSelectedItem: (selectedItem: ReplaceBoardDataModel | null) => void;

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
    searchParameter: [GetReplaceRequestModel, (param: GetReplaceRequestModel) => void];
}
export type { BoardFunctionProps };
