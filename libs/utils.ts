// 클래스명 쫙 입력받아서 그대로 돌려주기 ( 타일랜드 css에 적합 )
export function cls(...classnames: string[]) {
  return classnames.join(" ");
}
