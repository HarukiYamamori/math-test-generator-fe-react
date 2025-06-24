import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Buton.module.css"

type Props = {
    children: ReactNode;
    onClick?: () => void;
    type?: "primary" | "secondary";
    htmlType?: "button" | "submit" | "reset";
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>;

export const Button = ({ children, onClick, type = "primary", htmlType = "button", ...rest }: Props) => {
    return (
        <button
            type={htmlType}
            className={`${styles.button} ${styles[type]}`}
            onClick={onClick}
            {...rest}
        >
            {children}
        </button>
    );
}