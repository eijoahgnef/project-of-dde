import type { MenuProps } from "antd";

export interface ITheme {
    theme: "light" | "dark"
}

export type MenuItem = Required<MenuProps>['items'][number];

export interface MenuOptions {
    path: string,
    title: string,
    icon?: string,
    isLink?: String,
    close?: boolean,
    children?: MenuOptions[]
}

export interface ITabs {
    label: string,
    children?: string,
    path: string,
    key: string,
    closable?: boolean
}