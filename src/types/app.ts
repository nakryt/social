export type Nullable<T> = null | T
export type PropsType<T> = T extends {[key: string]: infer U} ? U : never