import { MutableRefObject } from "react"

export interface Ref<T> extends MutableRefObject<T> {}

export type RefInput = Ref<HTMLInputElement | undefined>
export type RefDiv = Ref<HTMLDivElement | undefined>
export type RefButton = Ref<HTMLButtonElement | undefined>
