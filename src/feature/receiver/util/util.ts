import { PostAuthRequestMseqModel } from '@/entity/auth/model/adminModel';
import { MenuType } from '@/entity/menu/model/model';

/**
 * 내부에서 사용하는 값을 외부데이터 형태로 변환
 * @param authLevels
 * @returns
 */
const transformAuthLevels = (authLevels: Record<string, string>): PostAuthRequestMseqModel[] => {
    return Object.entries(authLevels).map(([menuSeq, level]) => ({
        menuSeq: parseInt(menuSeq, 10),
        level: parseInt(level, 10),
    }));
};
/**
 * 외부데이터를 내부 데이터 형태로 변환
 * @param authLevelsArray
 * @returns
 */
const transformAuthLevelsToRecord = (
    authLevelsArray: PostAuthRequestMseqModel[],
): Record<string, string> => {
    return authLevelsArray.reduce(
        (acc, { menuSeq, level }) => {
            acc[menuSeq.toString()] = level.toString();
            return acc;
        },
        {} as Record<string, string>,
    );
};

// getMenuAuthAllEnabled 인터페이스
interface GetMenuAuthType {
    seq?: number; // 1뎁스 메뉴 시퀀스
    level: number; // 설정할 권한 레벨
    list?: MenuType[]; // 전체 메뉴 목록
}
/**
 * 메뉴 목록에서 level(권한레벨)을 변경한 값 전달
 * @param param0
 * @returns
 */
const getMenuAuthAllEnabled = ({ seq, level, list }: GetMenuAuthType) => {
    const lists = () => {
        if (seq) {
            return list?.filter(item => item.seq === seq)[0].child;
        }
        return (
            list?.reduce((acc, item) => {
                if (item.child) {
                    acc.push(...item.child);
                }
                return acc;
            }, [] as MenuType[]) || []
        );
    };
    const result: Record<string, string> = {};
    lists()?.forEach(item => {
        result[String(item.seq)] = String(level);
    });
    return result;
};

export { transformAuthLevels, transformAuthLevelsToRecord, getMenuAuthAllEnabled };
